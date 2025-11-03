const templateAdminPage = () => /*html*/`
    <div>
        <br>

<!-- SEARCH STUDENT -->
        <div class="search">
            <input 
                type="search" 
                name="search"
                placeholder="Buscar ID"
                hx-post="/student-list/search"
                hx-trigger="keyup changed delay:500ms"
                hx-target="#search-results"
            />
            <br>
            <div id="search-results" style="display:none;"></div>
        </div>
        <br>

<!-- FULL STUDENT LIST -->
        <div>
            <button class="dropdown-buttons"
                    id="student-button"
                    hx-get="/student-list" 
                    hx-target="#student-list" 
                    hx-swap="innerHTML">Alumnos</button>
            
            <div id="student-list" style="display:none;"></div>
        </div>
        <br>

<!-- FULL TEACHER LIST -->
        <div>
            <button class="dropdown-buttons"
                    id="teacher-button"
                    hx-get="/teacher-list" 
                    hx-target="#teacher-list" 
                    hx-swap="innerHTML">Docentes</button>
            
            <div id="teacher-list" style="display:none;"></div>
        </div>
        <br>

<!-- ACTIVE CLASSES -->
        <div>
            <button class="dropdown-buttons"
                    id="class-button"
                    hx-get="/active-class-list" 
                    hx-target="#class-list" 
                    hx-swap="innerHTML">Materias</button>

            <div id="class-list" style="display:none;"></div>
        </div>
        <br>

<!-- INSERT DATA -->
        <div>
            <button class="dropdown-buttons"
                    id="input-data-button"
                    hx-get="/input-data"
                    hx-target="#input-data" 
                    hx-swap="innerHTML">Modificar datos</button>

            <div id="input-data" style="display:none;"></div>
        </div>
    </div>
    <br><br>

    
<!-- VISIBILITY CHANGE -->
    <script>
        document.addEventListener("htmx:afterOnLoad", function initToggle(evt) {
            if(document.getElementById("student-button")) {
                const button = document.getElementById("student-button");
                const targetElement = document.getElementById("student-list");

                button.onClick = null;

                button.addEventListener("click", async (e) => {
                    const isHidden = window.getComputedStyle(targetElement).display === "none";

                    if(isHidden && targetElement.innerHTML.trim() === "") {
                        await htmx.ajax("GET", button.getAttribute("hx-get"), {
                            target: targetElement,
                            swap: "innerHTML"
                        });
                    }

                    targetElement.style.display = isHidden ? "block" : "none";
                });

                document.removeEventListener("htmx:afterOnLoad", initToggle);
            }
            
            if(document.getElementById("teacher-button")) {
                const button = document.getElementById("teacher-button");
                const targetElement = document.getElementById("teacher-list");

                button.onClick = null;

                button.addEventListener("click", async (e) => {
                    const isHidden = window.getComputedStyle(targetElement).display === "none";

                    if(isHidden && targetElement.innerHTML.trim() === "") {
                        await htmx.ajax("GET", button.getAttribute("hx-get"), {
                            target: targetElement,
                            swap: "innerHTML"
                        });
                    }

                    targetElement.style.display = isHidden ? "block" : "none";
                });

                document.removeEventListener("htmx:afterOnLoad", initToggle);
            }

            if(document.getElementById("class-button")) {
                const button = document.getElementById("class-button");
                const targetElement = document.getElementById("class-list");

                button.onClick = null;

                button.addEventListener("click", async (e) => {
                    const isHidden = window.getComputedStyle(targetElement).display === "none";

                    if(isHidden && targetElement.innerHTML.trim() === "") {
                        await htmx.ajax("GET", button.getAttribute("hx-get"), {
                            target: targetElement,
                            swap: "innerHTML"
                        });
                    }

                    targetElement.style.display = isHidden ? "block" : "none";
                });

                document.removeEventListener("htmx:afterOnLoad", initToggle);
            }

            if(document.getElementById("input-data-button")) {
                const button = document.getElementById("input-data-button");
                const targetElement = document.getElementById("input-data");

                button.onClick = null;

                button.addEventListener("click", async (e) => {
                    const isHidden = window.getComputedStyle(targetElement).display === "none";

                    if(isHidden && targetElement.innerHTML.trim() === "") {
                        await htmx.ajax("GET", button.getAttribute("hx-get"), {
                            target: targetElement,
                            swap: "innerHTML"
                        });
                    }

                    targetElement.style.display = isHidden ? "block" : "none";
                });

                document.removeEventListener("htmx:afterOnLoad", initToggle);
            }
        });
    </script>
`

export default templateAdminPage;