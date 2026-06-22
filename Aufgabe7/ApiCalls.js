import { Project, Artefakt, Task } from "./models/class_stucture.js";
import { Referenz } from "./models/references.js";

const projectdata_url = 'https://scl.fh-bielefeld.de/WBA/projects.json';
const tasks_url = 'https://scl.fh-bielefeld.de/WBA/tasks.json';
const artefacts_data = 'https://scl.fh-bielefeld.de/WBA/artefacts.json';
const send_project_data_to = 'https://scl.fh-bielefeld.de/WBA/projectsAPI';

//node --use-system-ca
async function get_Project_data(url) {
    let request_data = await fetch(url)
    .catch(function(err){
        console.log("Error while fetching the Data from api: " , url);
    });
    let ret = await request_data.json();
    return ret;
}

const project_data = await get_Project_data(projectdata_url);
//console.log('------------- PROJECT DATA -----------------')
//console.log(project_data);
//console.log('')

const task_data = await get_Project_data(tasks_url);
//console.log('------------- TASKS -----------------')
//console.log(task_data);
//console.log('')

const artefact_data = await get_Project_data(artefacts_data);
//console.log('------------- ARTEFACTS -----------------')
//console.log(artefact_data);

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
//console.log(refrences_task_id);

const [task_name, project_id] = create_Taks_Classes(task_data);
//console.log(project_id);

async function post_data(url, data){
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

async function checkBackupReaload() {
    const savedData = localStorage.getItem('offline_data');

    if (savedData){
        const dataToSend = JSON.parse(savedData);

        const success = await post_data(send_project_data_to, dataToSend);

        if (success){
            localStorage.removeItem('offline_data');
            console.log("removed Data from local storage");
        }
        else {
            console.log("Resend failed");
        }
    }
}
await checkBackupReaload();
await post_data(send_project_data_to, project_data);
await checkBackupReaload();