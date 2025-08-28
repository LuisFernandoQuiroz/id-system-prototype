const templateAdminPage = () => /*html*/`
    <div>
        <h1>Student info chart</h1>
        <div>
            <button hx-get="/student-list" hx-target="#generated-list" hx-swap="innerHTML" class="student-list-button" onclick="toggleContent()">Lista de estudiantes</button>
            <div id="generated-list"></div>
        </div>
    </div>

    <script>
        function toggleContent() {
            var x = document.getElementById("generated-list");

            if(x.style.display === "none"){
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
        }
    </script>
`

export default templateAdminPage;