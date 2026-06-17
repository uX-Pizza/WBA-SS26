export class Project {
    constructor(title, description, path, startdate) {
        this.title = this.check_length(title);
        this.shortDescription = description;
        this.projectLogoPath = path;
        this.startDate = startdate;
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

