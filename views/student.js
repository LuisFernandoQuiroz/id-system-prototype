const templateStudentPage = () => /*html*/`
    <div>
        <h1>Scan ID</h1>
        <input id="student-id-input">

        <button hx-disable onclick="window.location='/student-list-download'" class="student-button">Enter</button>

        <input type="file" id="input-file">
    </div>
`

export default templateStudentPage;