// Data.js
import { Project } from "./models.js/Project.js";
import { Artefakt } from "../../Aufgabe10/numbernine/src/main/resources/static/js/Artefakt.js";
import { ProjektArtefakt } from "./models.js/Relations.js";

export const projects = [
  new Project("Project1", "Spacestation", "pfad", "15.06.2026"),
  new Project("Project2", "Bildverarbeitung", "pfad", "10.06.2026"),
  new Project("Project3", "Webseite", "pfad", "25.06.2026"),
];


export const artefacts = [
    new Artefakt("Start", "Rakete muss fliegen", "p1", "4", "1"),
    new Artefakt("Landung", "Rakete muss landen", "p1", "10", "2"),

    new Artefakt("Bild suchen", "unendlich viele Formeln", "p2", "20h", "3"),
    new Artefakt("Klausur vorbereiten", "viel zu lange", "p2", "30h", "4"),

    new Artefakt("JavaScript lernen", "Syntax, Logic, Klassen etc", "p3", "20h", "5"),
    new Artefakt("Projekt schreiben", "Alles implementieren", "p3", "30h", "6"),
];

export const relations = [
    
    new ProjektArtefakt("Project1", "1", 30),
    new ProjektArtefakt("Project1", "2", 20),

    new ProjektArtefakt("Project2", "3", 10),
    new ProjektArtefakt("Project2", "4", 10),

   
    new ProjektArtefakt("Project3", "5", 15),
    new ProjektArtefakt("Project3", "6", 10),
];

export function calc_worktime(project_name){
    let time = 0;
    for (let relation of relations) {
        if(relation.projektId === project_name) {
            // Sicherstellen, dass es als echte Zahl addiert wird
            time += Number(relation.actualHours); 
        }
    }
    return time;
}