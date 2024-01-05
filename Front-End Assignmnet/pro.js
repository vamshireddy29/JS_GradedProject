document.addEventListener("DOMContentLoaded", function () {
    const appContainer = document.getElementById("app");

    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        renderResumePage();
    } else {
        renderLoginPage();
    }

    function renderLoginPage() {
        appContainer.innerHTML = `
            <div class="container">
                <div class="login-form">
                    <h2>Login</h2>
                    <form id="loginForm">
                        <label for="username">Username:</label>
                        <input type="text" id="username" required>
                        <br>
                        <br>
                      
                        <label for="password">Password:</label>
                        <input type="password" id="password" required>
                        <br>
                        <br>
                        <button type="submit">Login</button>
                    </form>
                    <div class="error-message" id="errorMessage"></div>
                </div>
            </div>
        `;

        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "yourUsername" && password === "yourPassword") {
                localStorage.setItem("loggedIn", true);
                renderResumePage();
            } else {
                document.getElementById("errorMessage").innerText = "Invalid username/password";
            }
        });
    }

    function renderResumePage() {
        appContainer.innerHTML = `
            <div class="container">
                <div class="resume-form">
                    <h2>Resume Page</h2>
                    <input type="text" id="filterInput" class="filter-input" placeholder="Search by job opening">
                    <div id="resumeContent"></div>
                    <div class="navigation-buttons" id="navigationButtons"></div>
                </div>
            </div>
        `;

        const resumeContent = document.getElementById("resumeContent");
        const navigationButtons = document.getElementById("navigationButtons");
        const filterInput = document.getElementById("filterInput");

        let filteredApplications = []; 
        function renderResume(index) {
            const applicant = filteredApplications[index];
            if (applicant) {
                resumeContent.innerHTML = `
                    <h3>${applicant.name}</h3>
                    <p>Job: ${applicant.job}</p>
                    <p>Email: ${applicant.email}</p>
                    <p>Experience: ${applicant.experience}</p>
                `;
            } else {
                resumeContent.innerHTML = "No applications for this job";
            }
        }

        function renderNavigationButtons(index) {
            navigationButtons.innerHTML = `
                <button onclick="prevResume(${index})" ${index === 0 ? 'style="display:none;"' : ''}>Previous</button>
                <button onclick="nextResume(${index})" ${index === filteredApplications.length - 1 ? 'style="display:none;"' : ''}>Next</button>
            `;
        }

        function filterApplications(searchValue) {
            filteredApplications = applications.filter(applicant =>
                applicant.job.toLowerCase().includes(searchValue.toLowerCase())
            );
            renderResume(0);
            renderNavigationButtons(0);
        }

        renderResume(0);
        renderNavigationButtons(0);

        filterInput.addEventListener("input", function () {
            const searchValue = filterInput.value.trim();
            if (searchValue) {
                filterApplications(searchValue);
            } else {
                filteredApplications = [...applications];
                renderResume(0);
                renderNavigationButtons(0);
            }
        });
    }

    window.prevResume = function (currentIndex) {
        renderResume(currentIndex - 1);
        renderNavigationButtons(currentIndex - 1);
    };

    window.nextResume = function (currentIndex) {
        renderResume(currentIndex + 1);
        renderNavigationButtons(currentIndex + 1);
    };
});
