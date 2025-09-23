import templateSingleTeacher from "./single-teacher.js";

export default function templateTeacherList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleTeacher(key, value);
    });

    return /*html*/`
        <div>
            <br>
            <table>
                <tr>
                    <th>RFC Docente</th>
                    <th>Nombre</th>
                </tr>
                ${items}
            </table>
        </div>
    `;
}