import { Project, Artefakt, Task } from "./models/class_stucture.js";
import { Referenz } from "./models/references.js";

//Lokale Dateien, weil ich sonst einen CORS Fehler bekomme
const projectdata_url = './ApiData/projects.json';
const tasks_url = './ApiData/tasks.json';
const artefacts_data = './ApiData/artefacts.json';

const send_project_data_to = 'https://scl.fh-bielefeld.de/WBA/projectsAPI'; //Gibt immer 404
const simulate_success_url = 'https://scl.fh-bielefeld.de/WBA/projects.json'; //Gibt 200 OK, da lokale Datei

//node --use-system-ca
async function get_Project_data(url) {
    try {
            let request_data = await fetch(url);
            if (!request_data.ok) {
                throw new Error(`Failed to fetch: ${request_data.status}`);
            }
            return await request_data.json();
        } catch (err) {
            console.error("Error while fetching the Data from api: ", url, err);
            return [];
        }
}

const project_data = await get_Project_data(projectdata_url);
console.log('------------- PROJECT DATA -----------------')
console.log(project_data);
console.log('')

const task_data = await get_Project_data(tasks_url);
console.log('------------- TASKS -----------------')
console.log(task_data);
console.log('')

const artefact_data = await get_Project_data(artefacts_data);
console.log('------------- ARTEFACTS -----------------')
console.log(artefact_data);

function create_Project_Classes(fetched_data) {

    let projects = [];
    for (let key of fetched_data){
        let project_class = new Project(key['id'], key['name'], key['shortdesc'], key['longdesc'],key['logourl'], key['maintainer'], key['start'] ,key['end']);
        projects.push(project_class)
    }
    return projects;
}

function create_Artefact_Classes(fetched_data) {

    let artefacts = [];
    let references = [];

    for (let key of fetched_data){
        let artefact_class = new Artefakt(key['id'], key['name'], key['shortdesc'], key['longdesc'], key['planedtime'], key['realtime'], key['taskid']);
        let task_referenz = new Referenz(key['name'], key['taskid'])
        artefacts.push(artefact_class);
        references.push(task_referenz);
    }
    return [artefacts, references];
}

function create_Taks_Classes(fetched_data) {

    let tasks = [];
    let references = [];
    for (let key of fetched_data){
        let task_class = new Task(key['id'], key['name'], key['shortdesc'], key['longdesc'],key['logourl'], key['maintainer'], key['start'] ,key['end']);
        let project_referenz = new Referenz(key['name'], key['project'])
        tasks.push(task_class);
        references.push(project_referenz);
    }
    return [tasks, references];
}

const [artefact_name, refrences_task_id] = create_Artefact_Classes(artefact_data);
console.log(refrences_task_id);

const [task_name, project_id] = create_Taks_Classes(task_data);
console.log(project_id);

export async function post_data(url, data){
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),

            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        if (!response.ok){
            localStorage.setItem("offline_data", JSON.stringify(data));
            return false;
        }
        return true;

    } catch(error){
        console.log("Fehler bei post", error);
        localStorage.setItem('offline_data', JSON.stringify(data));
        return false;
     } 
}

export async function checkBackupReaload() {
    const savedData = localStorage.getItem('offline_data');

    if (savedData){
        const dataToSend = JSON.parse(savedData);

        const success = await post_data(simulate_success_url, dataToSend);

        if (success){
            localStorage.removeItem('offline_data');
            console.log("removed Data from local storage");
        }
        else {
            console.log("Resend failed");
        }
    }
}

document.getElementById('btn-post').addEventListener('click', async () => {
    console.log("Send Data");
    await post_data(send_project_data_to, project_data);
})

document.getElementById('btn-backup').addEventListener('click', async() => {
    console.log("Check localstorage");
    await checkBackupReaload();
})

//Automatisches Neuladen
checkBackupReaload();