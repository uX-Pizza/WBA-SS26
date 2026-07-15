// GET-Parameter auslesen
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");

async function loadSingleProject() {
    console.log("Suche Projekt mit ID:", projectId);
    
    if (!projectId) {
        document.getElementById("projectTitle").textContent = "Kein Projekt ausgewählt.";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/projectsdata/getProject?id=${projectId}`);
        if (!response.ok) throw new Error("Projekt nicht gefunden");
        
        const project = await response.json();
        
        // UI füllen
        document.getElementById("projectTitle").textContent = project.name;
        document.getElementById("projectShortDesc").textContent = project.shortdesc;
        const maintainerEl = document.getElementById("projectMaintainer");
        if(maintainerEl) maintainerEl.textContent = "Projektleiter: " + project.maintainer;

        // Langbeschreibung einfügen
        const longDescContainer = document.getElementById("projectLongDesc");
        longDescContainer.innerHTML = project.longdesc; 
        
        // JETZT ist generateTOC bekannt und wird aufgerufen
        generateTOC(longDescContainer);
        
        loadComments();

    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
}

// DIE FEHLENDE METHODE: Inhaltsverzeichnis generieren
function generateTOC(contentContainer) {
    const tocContainer = document.getElementById("tocMenu");
    tocContainer.innerHTML = ""; // Altes Menü löschen

    // Alle h1, h2, h3 in der Langbeschreibung finden
    const headers = contentContainer.querySelectorAll("h1, h2, h3");

    if (headers.length === 0) {
        tocContainer.innerHTML = "Keine Abschnitte gefunden.";
        return;
    }

    const tocList = document.createElement("ul");
    
    headers.forEach((header, index) => {
        // Jedem Header eine ID geben, damit der Link zum Springen funktioniert
        if (!header.id) {
            header.id = `section-${index}`;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        
        link.href = `#${header.id}`; // Sprungmarke
        link.textContent = header.textContent;

        // Einrückung basierend auf der Ebene (h1=0px, h2=20px, h3=40px)
        const level = parseInt(header.tagName.substring(1)); 
        listItem.style.marginLeft = `${(level - 1) * 20}px`;
        
        // Schriftgröße für H1 hervorheben
        if (level === 1) listItem.style.fontWeight = "bold";

        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });

    tocContainer.appendChild(tocList);
}

// ... restliche Funktionen (loadComments, submitComment) ...

document.addEventListener("DOMContentLoaded", () => {
    // Nur EINMALIG aufrufen
    loadSingleProject();

    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", submitComment);
    }
});