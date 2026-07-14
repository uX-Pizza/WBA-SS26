async function getNewest() {
    try {
        const response = await fetch('http://localhost:8080/api/projectsdata/getnewest');


        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Fehler beim Laden der neuesten Projekte:", error);
        return [];
    }
}

function getProjectValue(project, keys) {
    for (const key of keys) {
        const value = project?.[key];
        if (value !== undefined && value !== null && value !== "") {
            return value;
        }
    }
    return "";
}

function renderNewestProjects(projects) {
    const tbody = document.querySelector("#latest-projects-body");
    console.log(tbody);
    if (!tbody) {
        return;
    }

    if (!Array.isArray(projects) || projects.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>Keine Projekte verfügbar</td></tr>";
        return;
    }

    tbody.innerHTML = "";

    projects.forEach((project) => {
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        const titleLink = document.createElement("a");
        const projectId = getProjectValue(project, ["id", "ID", "projectId", "project_id"]);
        const projectName = getProjectValue(project, ["name", "projectName", "title", "projekt_name"]);

        titleLink.href = `SingleProject.html?id=${projectId}`;
        titleLink.textContent = projectName || `Projekt ${projectId || ""}`.trim();
        titleCell.appendChild(titleLink);
        row.appendChild(titleCell);

        const dueCell = document.createElement("td");
        const dueDate = getProjectValue(project, ["end_date", "endDate", "deadline", "enddatum"]);
        dueCell.textContent = dueDate ? `Due ${dueDate}` : "Due -";
        row.appendChild(dueCell);

        const timeCell = document.createElement("td");
        const duration = getProjectValue(project, ["duration", "estimatedWork", "estimated_work", "projektzeit"]);
        timeCell.textContent = duration ? `Projektzeit: ${duration}h` : "Projektzeit: -";
        row.appendChild(timeCell);

        tbody.appendChild(row);
    });
}

let newestProjectsInitialized = false;

async function initNewestProjects() {
    if (newestProjectsInitialized) {
        return;
    }

    newestProjectsInitialized = true;
    const projects = await getNewest();
    renderNewestProjects(projects);
}

initNewestProjects();

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNewestProjects);
    window.addEventListener("load", initNewestProjects);
} else {
    initNewestProjects();
}
