class Project {
    titel;
    shortDescription;
    projectLogoPath;
    startDate
    constructor(title, description,path,startdate){
        this.titel = title;
        this.shortDescription = description;
        this.projectLogoPath = path;
        this.startDate = startdate;
    }
}

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

