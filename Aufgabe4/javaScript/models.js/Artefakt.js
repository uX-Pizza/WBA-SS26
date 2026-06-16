class Artefakt{
    titel;
    shortDescription;
    referenz;
    estimetedWork;
    constructor(titel,shortDescription,referenz,estimetedWork){
        this.titel = titel;
        this.shortDescription = shortDescription;
        this.referenz = referenz;
        this.estimetedWork = estimetedWork;
    }
}

function getFormData(){
    return {
        taskname: document.getElementById('taskname')?.value.trim() ?? '',
        time: document.getElementById('time')?.value.trim() ?? ''
    };
}

function addTask() {
    const { taskname, time } = getFormData();

    if (!taskname || !time) {
        alert('Bitte Task Name und Zeit eingeben.');
        return false;
    }

    const tbody = document.querySelector('.worktime table tbody');
    const row = document.createElement('tr');

    const taskCell = document.createElement('th');
    taskCell.textContent = taskname;
    const timeCell = document.createElement('th');
    timeCell.textContent = `${time}h`;

    row.appendChild(taskCell);
    row.appendChild(timeCell);
    tbody.appendChild(row);

    updateOverall();

    document.getElementById('taskname').value = '';
    document.getElementById('time').value = '';
    
    return false;
}

function updateOverall() {
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

