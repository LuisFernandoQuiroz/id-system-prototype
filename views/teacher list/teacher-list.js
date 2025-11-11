import templateSingleTeacher from "./single-teacher.js";

export default function templateTeacherList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleTeacher(key, value);
    });

    return /*html*/`
        <div id="table-container">
            <br>
            <table id="full-teacher-table">
                <tr>
                    <th>RFC DOCENTE</th>
                    <th>NOMBRE DOCENTE</th>
                    <th id="table-button-column"></th>
                </tr>
                ${items}
            </table>
        </div>
    `;
}