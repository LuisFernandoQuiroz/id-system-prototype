const templateStudentPage = () => /*html*/`
    <div>
        <h1>Scan ID</h1>
        <input
            type="search" 
            name="search"
            placeholder="Buscar ID"
            hx-post="/student-list/search"
            hx-trigger="keyup changed delay:500ms"
            hx-target="#search-results"
        />
        <br>
        <div></div>
    </div>
`

export default templateStudentPage;