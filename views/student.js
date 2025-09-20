const templateStudentPage = () => /*html*/`
    <div>
        <h1>Scan ID</h1>
        <input id="student-id-input">

        <button hx-get="/student" hx-target="#main" hx-swap="innerHTML" class="student-button">Enter</button>
    </div>
`

export default templateStudentPage;