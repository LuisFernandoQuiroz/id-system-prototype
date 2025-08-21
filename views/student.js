const templateStudentPage = () => /*html*/`
    <div>
        <h1>Alumno</h1>
        <input value="12345">

        <button hx-get="/student" hx-target="#main" hx-swap="innerHTML" class="home-button">Alumnos</button>
    </div>
`

export default templateStudentPage;