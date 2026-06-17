export class ProjektAufgabenbereich{
    constructor(projektId, aufgabenbereichId){
        this.projektId = projektId;
        this.aufgabenbereichId = aufgabenbereichId;
    }
    toObject(){
        return {
            projektId: this.projektId,
            aufgabenbereichId: this.aufgabenbereichId
        };
    }
    static fromObject(obj){
        return new ProjektAufgabenbereich(obj.projektId, obj.aufgabenbereichId);
    }
}

export class ProjektArtefakt{
    constructor(projektId, artefaktId, actualHours){
        this.projektId = projektId;
        this.artefaktId = artefaktId;
        this.actualHours = actualHours;
    }
    addHours(hours){
        const n = Number(hours);
        this.actualHours += n;
    }
    toObject(){
        return {
            projektId: this.projektId,
            artefaktId: this.artefaktId,
            actualHours: this.actualHours
        };
    }
    static fromObject(obj){
        return new ProjektArtefakt(obj.projektId, obj.artefaktId, obj.actualHours || 0);
    }
}