document.addEventListener("DOMContentLoaded", () => {
    const loginArea = document.querySelector(".login-header");
    const loginForm = document.querySelector(".login-form");

    // Falls die Elemente auf einer Unterseite gar nicht existieren, bricht das Skript nicht ab
    if (!loginArea) return;

    // 1. ZUERST PRÜFEN: Ist der Benutzer bereits eingeloggt?
    if (localStorage.getItem("isLoggedIn") === "true") {
        // Wenn ja, direkt das Fieldset durch den Logout-Button ersetzen
        showLogoutButton(loginArea);
    }

    // 2. EVENT-LISTENER: Für den Login-Vorgang (falls das Formular da ist)
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Status im Browser-Speicher hinterlegen
            localStorage.setItem("isLoggedIn", "true");

            // UI anpassen
            showLogoutButton(loginArea);
        });
    }
});

// Hilfsfunktion, um den Button zu erstellen und das Fieldset zu ersetzen
function showLogoutButton(targetElement) {
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'button logout-btn';

    // Event-Listener für das Ausloggen
    logoutBtn.addEventListener('click', () => {
        // Status aus dem Speicher löschen
        localStorage.removeItem("isLoggedIn");
        // Seite neu laden, damit das originale Login-Feld wieder erscheint
        window.location.reload();
    });

    // Ersetzen durchführen
    targetElement.replaceWith(logoutBtn);
}