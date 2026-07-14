export class Artefakt{
    constructor(titel,shortDescription,referenz,estimetedWork, id){
        this.titel = titel;
        this.shortDescription = shortDescription;
        this.referenz = referenz;
        this.estimetedWork = estimetedWork;
        this.id = id;
    }
}

export function getFormData(){
    return {
        taskname: document.getElementById('taskname')?.value.trim() ?? '',
        time: document.getElementById('time')?.value.trim() ?? ''
    };
}

export function addTask() {
    const { taskname, time } = getFormData();
    console.log(taskname);
    console.log(time);

    if (!taskname || !time) {
        alert('Bitte Task Name und Zeit eingeben.');
        return false;
    }

    const tbody = document.querySelector('.worktime table tbody');
    const row = document.createElement('tr');

    const taskCell = document.createElement('td');
    taskCell.textContent = taskname;
    const timeCell = document.createElement('td');
    timeCell.textContent = `${time}h`;

    row.appendChild(taskCell);
    row.appendChild(timeCell);
    tbody.appendChild(row);

    updateOverall();

    document.getElementById('taskname').value = '';
    document.getElementById('time').value = '';
    
    return false;
}

export function updateOverall() {
    const rows = document.querySelectorAll('.worktime table tbody tr');
    let total = 0;

    rows.forEach(row => {
        const cell = row.cells[1];
        if (!cell) return;
        const value = parseFloat(cell.textContent.replace('h', '').trim());
        if (!isNaN(value)) {
            total += value;
        }
    });

    const overallCell = document.getElementById('overall-time');
    if (overallCell) {
        overallCell.textContent = `${total}h`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            // 1. Neuladen verhindern
            event.preventDefault(); 
            
            // 2. Deine Funktion ausführen
            addTask(); 
        });
    }
});