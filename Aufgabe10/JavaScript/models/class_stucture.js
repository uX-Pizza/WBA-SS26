export class Project {
    constructor(id,name, shortdesc, longdesc, logourl, maintainer, start,end) {
        this.id = id;
        this.name = this.check_length(name);
        this.shortdesc = shortdesc;
        this.logourl = logourl;
        this.maintainer = maintainer
        this.start = start;
        this.end = end
    }

    check_length(title) {
        if (typeof title !== 'string' || title.length > 255) {
            alert('Invalid');
            return '';
        }
        return title;
    }

    get startDateAsDate() {
        const [day, month, year] = this.startDate.split('.');
        return new Date(year, month - 1, day);
    }
}


export class Artefakt{
    constructor(id, name, shortdesc, longdesc, planedtime, realtime, taskid){
        this.id = id;
        this.titel = name;
        this.shortdesc = shortdesc;
        this.longdesc = longdesc;
        this.planedtime = planedtime;
        this.realtime = realtime;
        this.taskid = taskid;
    }
}

export class Task{

    constructor(id, name, shortdesc, project){
        this.id = id;
        this.name = name;
        this.shortdesc = shortdesc;
        this.project = project;
    }
}