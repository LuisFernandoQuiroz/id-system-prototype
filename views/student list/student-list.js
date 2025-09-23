import templateSingleStudent from "./single-student.js";

export default function templateStudentList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleStudent(key, value);
    });

    return /*html*/`
        <div>
            <br>
            <table>
                <tr>
                    <th>No. Control</th>
                    <th>Carrera</th>
                    <th>Grupo</th>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>CURP</th>
                </tr>
                ${items}
            </table>
        </div>
    `;
}