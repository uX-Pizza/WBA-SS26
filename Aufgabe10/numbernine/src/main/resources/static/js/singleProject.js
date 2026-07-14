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
        console.log("Projekt-Daten:", project);


        document.getElementById("projectTitle").textContent = project.name;
        document.getElementById("projectShortDesc").textContent = project.shortdesc;
   
        const maintainerEl = document.getElementById("projectMaintainer");
        if(maintainerEl) maintainerEl.textContent = "Projektleiter: " + project.maintainer;

        const longDescContainer = document.getElementById("projectLongDesc");
        longDescContainer.innerHTML = project.longdesc; 
        generateTOC(longDescContainer);
        
        // Kommentare laden
        loadComments();

    } catch (error) {
        console.error("Fehler beim Laden:", error);
        document.getElementById("projectTitle").textContent = "Projekt konnte nicht geladen werden.";
    }
}

function loadComments() {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); 
    
    const commentList = document.getElementById("commentList");
    if (!commentList) return;
    
    commentList.innerHTML = ""; 
    

    const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`)) || [];

    savedComments.forEach(commentText => {
        const p = document.createElement("p");
        p.textContent = commentText;
        p.style.borderBottom = "1px solid #ccc";
        commentList.appendChild(p);
    });
}


function submitComment(event) {
    event.preventDefault();
    const commentInput = document.getElementById("commentInput");
    const text = commentInput.value.trim();

    if (text !== "") {
        const savedComments = JSON.parse(localStorage.getItem(`comments_${projectId}`)) || [];
        savedComments.push(text);
        localStorage.setItem(`comments_${projectId}`, JSON.stringify(savedComments));
        commentInput.value = "";
        loadComments();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadSingleProject();

    loadSingleProject();

    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
        commentForm.addEventListener("submit", submitComment);
    }
});

loadComments();