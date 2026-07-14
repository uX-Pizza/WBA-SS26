import { ProjectSorter } from "./ProjectSorter.js";

let allProjects = [];

function getApiUrl() {
    return "http://localhost:8080/api/projectsdata/getAllProjects";
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

function buildProjectLink(projectId) {
    return `SingleProject.html?id=${projectId}`;
}

function createRow(project) {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    const titleLink = document.createElement("a");
    const projectId = getProjectValue(project, ["id", "ID", "projectId", "project_id"]);
    const projectName = getProjectValue(project, ["name", "projectName", "title", "projekt_name"]);

    titleLink.href = buildProjectLink(projectId);
    titleLink.textContent = projectName || `Projekt ${projectId || ""}`.trim();
    titleCell.appendChild(titleLink);
    row.appendChild(titleCell);

    const descriptionCell = document.createElement("td");
    const description = getProjectValue(project, ["shortdesc", "shortDescription", "description", "kurzbeschreibung"]);
    descriptionCell.textContent = description || "Keine Kurzbeschreibung vorhanden";
    row.appendChild(descriptionCell);

    const linkCell = document.createElement("td");
    const detailLink = document.createElement("a");
    detailLink.href = buildProjectLink(projectId);
    detailLink.textContent = "Zu den Projektdetails";
    linkCell.appendChild(detailLink);
    row.appendChild(linkCell);

    return row;
}

function renderProjects(projects) {
    const tbody = document.querySelector("#projectsTableBody");

    if (!tbody) {
        return;
    }

    tbody.innerHTML = "";

    if (!Array.isArray(projects) || projects.length === 0) {
        tbody.innerHTML = "<tr><td colspan='3'>Keine Projekte verfügbar</td></tr>";
        return;
    }

    projects.forEach((project) => {
        tbody.appendChild(createRow(project));
    });
}

function applySort(mode) {
    if (!Array.isArray(allProjects) || allProjects.length === 0) {
        return;
    }

    const sorter = new ProjectSorter([...allProjects]);
    const sortedProjects = mode === "duration" ? sorter.sortbyduration() : sorter.sortbydate();

    renderProjects(sortedProjects);
    return sortedProjects;
}

async function getAllProjects() {
    try {
        const response = await fetch(getApiUrl());

        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Fehler beim Laden der Projekte:", error);
        return [];
    }
}

async function initProjectOverview() {
    allProjects = await getAllProjects();
    renderProjects(allProjects);

    const filterForm = document.getElementById("filterForm");
    if (filterForm) {
        filterForm.addEventListener("change", (event) => {
            if (event.target.name === "filter") {
                applySort(event.target.value);
                console.log("Sorting Apllied");
            }
        });
    }
}

export { initProjectOverview, getAllProjects, renderProjects, applySort };
