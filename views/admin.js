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
            console.log("0");

            if(x.style.display != "none"){
                console.log("1");
                x.style.display = "none";
            } else {
                x.style.display = "block";
                console.log("2");
            }
        }
    </script>
`

export default templateAdminPage;