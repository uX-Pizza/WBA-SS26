async function saveProject(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const payload = new URLSearchParams();
    payload.append("name", formData.get("projekt_name")?.toString().trim() || "");
    payload.append("shortdesc", formData.get("kurzbeschreibung")?.toString().trim() || "");
    payload.append("longdesc", formData.get("langbeschreibung")?.toString().trim() || "");
    payload.append("logourl", formData.get("logo")?.name ? `uploads/${formData.get("logo").name}` : "");
    payload.append("maintainer", formData.get("maintainer")?.toString().trim() || "");
    payload.append("start_date", formData.get("startdatum")?.toString() || "");
    payload.append("end_date", formData.get("enddatum")?.toString() || "");

    try {
        const response = await fetch("http://localhost:8080/api/projectsdata/sendToDatabase", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: payload.toString()
        });
        
        if (!response.ok) {
            throw new Error(`Speichern fehlgeschlagen (${response.status})`);
        }
        const createdId = await response.text();
        window.location.href = `SingleProject.html?id=${createdId}`;
    } catch (error) {
        console.error("Fehler beim Speichern des Projekts:", error);
        alert("Das Projekt konnte nicht gespeichert werden.");
    }
    
}

const form = document.querySelector(".inline-edit");
if (form) {
    form.addEventListener("submit", saveProject);
}
