const templateAdminPage = () => /*html*/`
    <div>
        <h1>Student info chart</h1>
        <button hx-get="/student-list" 
                hx-target="#student-list" 
                hx-swap="innerHTML" 
                class="admin-buttons">Alumnos</button>

        <div id="full-student-list" style="display:none;">
            <div id="student-list"></div>
        </div>

        <button hx-get="/" 
            hx-target="#generated-list" 
            hx-swap="innerHTML" 
            class="admin-buttons">Students</button>
        
        <div id="other-category" style="display:none;">
            <div id="generated-list"></div>
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