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
            <div id="search-results"></div>
        </div>
        <br>

<!-- FULL STUDENT LIST -->
        <div>
            <button hx-get="/student-list" 
                    hx-target="#student-list" 
                    hx-swap="innerHTML" 
                    class="dropdown-buttons">Alumnos</button>

            <div id="full-student-list" style="display:none;">
                <div id="student-list"></div>
            </div>
        </div>
        <br>

<!-- FULL TEACHER LIST -->
        <div>
            <button hx-get="/teacher-list" 
                    hx-target="#teacher-list" 
                    hx-swap="innerHTML" 
                    class="dropdown-buttons">Docentes</button>

            <div id="full-teacher-list" style="display:none;">
                <div id="teacher-list"></div>
            </div>
        </div>
        <br>

<!-- INSERT DATA -->
        <div>
            <button hx-get="/input-data"
                    hx-target="#input-data" 
                    hx-swap="innerHTML" 
                    class="dropdown-buttons">Modificar datos</button>

            <div id="full-data-options" style="display:none;">
                <div id="input-data"></div>
            </div>
        </div>
    </div>
    <br><br>

    
<!-- VISIBILITY CHANGE -->
    <script>
        document.body.addEventListener("htmx:afterSwap", (evt) => {
            var targetElement = evt.target.id;
            
            if(targetElement === "student-list"){
                var visibilityTarget = document.getElementById("full-student-list");
                
                if(visibilityTarget.style.display === "none") {
                    visibilityTarget.style.display = "block";
                } else {
                    visibilityTarget.style.display = "none";
                }
            } else if(targetElement === "teacher-list"){
                var visibilityTarget = document.getElementById("full-teacher-list");
                
                if(visibilityTarget.style.display === "none") {
                    visibilityTarget.style.display = "block";
                } else {
                    visibilityTarget.style.display = "none";
                }
            } else if(targetElement === "input-data"){
                var visibilityTarget = document.getElementById("full-data-options");
                
                if(visibilityTarget.style.display === "none") {
                    visibilityTarget.style.display = "block";
                } else {
                    visibilityTarget.style.display = "none";
                }
            }
        });
    </script>
`

export default templateAdminPage;