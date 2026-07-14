import { initProjectOverview } from "./displayProjects.js";

function init() {
    initProjectOverview();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}