
//Referenz von Oben nach Unten: Projekt hat Referenzen zu Taks. 
// Tasks haben Regerenzen zu Artefakten
//ReferenzArtefakt(Artefakt Name, Task id)
//ReferenzTask(Name, Projekt id)
export class Referenz{
    constructor(name, referenz){
        this.name = name;
        this.referenz = referenz;
    }
}