const templateAdminPage = () => /*html*/`
    <div>
        <h1>Student info chart</h1>
        <div>
            <button hx-get="/read-excel" hx-target="#student-list" hx-swap="innerHTML" class="student-list">Lista de estudiantes</button>
            <div id="student-list"></div>
        </div>
        

    </div>
`

export default templateAdminPage;