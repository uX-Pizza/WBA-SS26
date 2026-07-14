export class ProjectSorter {
    constructor(projects) {
        this.projects = projects;
    }

    getFirstValue(project, keys) {
        for (const key of keys) {
            const value = project?.[key];
            if (value !== undefined && value !== null && value !== "") {
                return value;
            }
        }
        return "";
    }

    parseDate(value) {
        if (!value) {
            return new Date(0);
        }

        if (typeof value === "string") {
            const trimmed = value.trim();
            const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            if (isoMatch) {
                const [, year, month, day] = isoMatch;
                return new Date(Number(year), Number(month) - 1, Number(day));
            }

            const germanMatch = trimmed.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
            if (germanMatch) {
                const [, day, month, year] = germanMatch;
                return new Date(Number(year), Number(month) - 1, Number(day));
            }
        }

        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? new Date(0) : date;
    }

    getDuration(project) {
        const startValue = this.getFirstValue(project, ["start_date", "startDate", "startdatum"]);
        const endValue = this.getFirstValue(project, ["end_date", "endDate", "deadline", "enddatum"]);

        const startDate = this.parseDate(startValue);
        const endDate = this.parseDate(endValue);

        if (startDate.getTime() === 0 || endDate.getTime() === 0) {
            return 0;
        }

        const diffInDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        return diffInDays > 0 ? diffInDays : 0;
    }

    sortbydate() {
        return [...this.projects].sort((a, b) => {
            const dateA = this.parseDate(this.getFirstValue(a, ["start_date", "startDate", "startdatum"]));
            const dateB = this.parseDate(this.getFirstValue(b, ["start_date", "startDate", "startdatum"]));
            return dateA - dateB;
        });
    }

    sortbyduration() {
        return [...this.projects].sort((a, b) => this.getDuration(b) - this.getDuration(a));
    }
}