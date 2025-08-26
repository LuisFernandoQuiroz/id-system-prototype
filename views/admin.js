const templateAdminPage = () => /*html*/`
    <div>
        <h1>Student info chart</h1>
        <div>
            <button hx-get="/student-list" hx-target="#generated-list" hx-swap="innerHTML" class="student-list-button">Lista de estudiantes</button>
            <div id="generated-list"></div>
        </div>
    </div>
`

export default templateAdminPage;