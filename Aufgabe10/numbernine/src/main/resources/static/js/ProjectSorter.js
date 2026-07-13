import { projects } from "../../../../../../../Aufgabe4/javaScript/Data.js";
import { relations } from "../../../../../../../Aufgabe4/javaScript/Data.js";


export class ProjectSorter {
    constructor(projects){
        this.projects = projects;
    }

    sortbydate(){
        const getComparableValue = (dateString) => {
        const [day, month, year] = dateString.split('.');

        return Number(year + month + day); 
        };
    for (let i = 0; i < this.projects.length; i++) {
        
        
        for (let j = 0; j < this.projects.length - 1 - i; j++) {
            
           
            const [dayA, monthA, yearA] = this.projects[j].startDate.split('.');
            const dateA = new Date(yearA, monthA - 1, dayA);

   
            const [dayB, monthB, yearB] = this.projects[j + 1].startDate.split('.');
            const dateB = new Date(yearB, monthB - 1, dayB);


            if (dateA > dateB) {
            
                let temp = this.projects[j];
                this.projects[j] = this.projects[j + 1];
                this.projects[j + 1] = temp;
            }
        }
    }
    return this.projects;
    }

    calc_worktime(projectName) {
        let time = 0;
    
        for (let relation of relations) {
            
            if (relation.projektId === projectName) {
                time += Number(relation.actualHours);
            }
        }
        
        console.log(`Gesamtzeit für ${projectName}:`, time);
        return time;
    }

    sortbyworktime() {
        const n = this.projects.length;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - 1 - i; j++) {
                
                let timeA = this.calc_worktime(this.projects[j].title);
                let timeB = this.calc_worktime(this.projects[j + 1].title);
                console.log(timeA);
                console.log(timeB);
                
                if (timeA > timeB) {
                    let temp = this.projects[j];
                    this.projects[j] = this.projects[j + 1];
                    this.projects[j + 1] = temp;
                }
            }
        }
        return this.projects;
    }
}