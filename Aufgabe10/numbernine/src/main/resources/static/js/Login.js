document.addEventListener("DOMContentLoaded", () => {
    const loginArea = document.querySelector(".login-header");
    const loginForm = document.querySelector(".login-form");


    if (!loginArea) return;


    if (localStorage.getItem("isLoggedIn") === "true") {
        
        showLogoutButton(loginArea);
    }


    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

         
            localStorage.setItem("isLoggedIn", "true");

    
            showLogoutButton(loginArea);
        });
    }
});

function showLogoutButton(targetElement) {
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'button logout-btn';

   
    logoutBtn.addEventListener('click', () => {
     
        localStorage.removeItem("isLoggedIn");
       
        window.location.reload();
    });

  
    targetElement.replaceWith(logoutBtn);
}