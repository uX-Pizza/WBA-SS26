class Aufgabenbereich {
   constructor(title, shortdescription){
        this.title = title;
        if (typeof shortDescription !== 'string' || shortdescription.length > 255) {
            alert('Invalid');
            return '';
        }
        else 
            this.shortdescription = shortdescription
    }
}