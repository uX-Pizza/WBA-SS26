async function fetchMinMaxJava() {
    try {
        const response = await fetch('http://localhost:8080/api/statistic/minmaxspanjava');

        if (!response.ok){
            throw new Error('Fehler: ', response.status);
        }

        const data = response.json();

        return data;
    }
    catch(error) {
        console.error("Fehler", error);
    }
}

async function fetchMinMaxSql() {
    try {
        const response = await fetch('http://localhost:8080/api/statistic/minmaxspansql');

        if (!response.ok){
            throw new Error('Fehler: ', response.status);
        }

        const data = await response.json();

        return data;
    }
    catch(error) {
        console.error("Fehler", error);
    }
}

const javadata = fetchMinMaxJava();

console.log("Java Data: ", javadata);

const sqldata = fetchMinMaxSql();

console.log("Sql Data" ,sqldata);

function calcTimeInDays(start_date, end_date){
    const start = new Date(start_date);
    const ende = new Date(end_date);
    const diffMilliseconds = Math.abs(ende - start);
    return Math.ceil(diffMilliseconds / (1000 * 60 * 60 * 24));
}

async function calcProjectTime(){

    const response = await fetch('http://localhost:8080/api/statistic/getProject?id=proj-01');

    if (!response.ok){
        throw new Error(response.status);
    }

    const data = await response.json()

    const start_date = response['start_date'];
    const end_date = response['end_date'];

    const timeInDays = calcTimeInDays(start_date, end_date);

    return timeInDays;
}

const project = {
    id: "PROJ-09",
    name: "WBA Praktikum",
    start_date: "2026-04-01",
    end_date: "2026-07-09"
};

async function verarbeiteProjektdaten() {
    
    const statistik = await fetchMinMaxSql();

    if (statistik) {
        
        project.min = statistik.min_val;
        project.max = statistik.max_val;
        project.span = statistik.span_val;
        
        project.projektdauer = calcTimeInDays(project.start_date, project.end_date);

        console.log(project);
    }
}

await verarbeiteProjektdaten();
