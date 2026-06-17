// appfilter.js
import { projects, calc_worktime } from "./Data.js";
import { ProjectSorter } from "./ProjectSorter.js";

// Test-Ausgaben zur Kontrolle
console.log("Worktime P1:", calc_worktime('Project1'));
console.log("Worktime P2:", calc_worktime('Project2'));
console.log("Worktime P3:", calc_worktime('Project3'));



function init() {
    const filterFormLocal = document.getElementById('filterForm');
    if (filterFormLocal) {
        filterFormLocal.addEventListener('change', filterChange);
        console.log("Event Listener fertig");
    } else {
        console.error("Dom micht gefunden");
    }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function filterChange(event){
    let filterValue = event.target.value;
    console.log("Filter:", filterValue);

    if (filterValue === 'Datum'){
        const sorter = new ProjectSorter([...projects]);
        const sorted = sorter.sortbydate();
        console.log("Sortiert nach Datum:", sorted);
    }
    else if (filterValue === 'Zeit'){
        const sorter = new ProjectSorter([...projects]);
        const sorted = sorter.sortbyworktime();
        console.log("Sortiert nach Arbeitszeit:", sorted);
    }
}