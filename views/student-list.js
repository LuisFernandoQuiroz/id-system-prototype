import templateSingleStudent from "./single-student.js";

export default function templateStudentList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleStudent(key, value);
    });

    return /*html*/`
        <div>
            <h3 class="admin-section-header">STUDENT INFO</h3>
            <p>Buscar alumno:</p>
            <input type="text" placeholder="ID">
            <ul>
                ${items}
            </ul>
        </div>
    `;
}