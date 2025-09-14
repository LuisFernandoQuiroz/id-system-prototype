const templateAdminPage = () => /*html*/`
    <div>
        <h1>Student info chart</h1>
        <br>
        
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
            <br>

            <div id="search-results"></div>
        </div>
        <br>

        <div class="view-section">
            <button hx-get="/student-list" 
                    hx-target="#student-list" 
                    hx-swap="innerHTML" 
                    class="dropdown-buttons">Alumnos</button>

            <div id="full-student-list" style="display:none;">
                <div id="student-list"></div>
            </div>
        </div>
        <br>
        <div class="view-section">
            <button hx-get="/" 
                    hx-target="#generated-list" 
                    hx-swap="innerHTML" 
                    class="dropdown-buttons">Students</button>

            <div id="other-category" style="display:none;">
                <div id="generated-list"></div>
            </div>
        </div>

        
    </div>

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
            }
        });
    </script>
`

export default templateAdminPage;