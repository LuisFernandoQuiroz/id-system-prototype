export default function templateSingleStudent(key, value) {
    return /*html*/`
        <tr id="${key}">
            <form>
                <td><input type="text" name="id" value="${key}" readonly></td>
                <td><input type="text" name="generacion" value="${value.generacion}" readonly></td>
                <td><input type="text" name="carrera" value="${value.carrera}" readonly></td>
                <td><input type="text" name="grupo" value="${value.grupo}" readonly></td>
                <td><input type="text" name="nombre" value="${value.nombre}" readonly></td>
                <td><input type="text" name="apellidoPaterno" value="${value.apellidoPaterno}" readonly></td>
                <td><input type="text" name="apellidoMaterno" value="${value.apellidoMaterno}" readonly></td>
                <td><input type="text" name="CURP" value="${value.CURP}" readonly></td>
                <td id="table-button-column">
                    <input type="submit" id="table-button-edit" hx-post="/edit-student/${key}" 
                                                           hx-target="closest tr" 
                                                           hx-swap="outerHTML" 
                                                           hx-include="closest tr" value="Editar">
                </td>
            </form>
        </tr>
    `;
}

export function templateSingleStudentEdit(key, value) {
    return /*html*/`
        <tr id="${key}">
            <form>
                <td><input type="text" name="id" value="${key}"></td>
                <td><input type="text" name="generacion" value="${value.generacion}"></td>
                <td><input type="text" name="carrera" value="${value.carrera}"></td>
                <td><input type="text" name="grupo" value="${value.grupo}"></td>
                <td><input type="text" name="nombre" value="${value.nombre}"></td>
                <td><input type="text" name="apellidoPaterno" value="${value.apellidoPaterno}"></td>
                <td><input type="text" name="apellidoMaterno" value="${value.apellidoMaterno}"></td>
                <td><input type="text" name="CURP" value="${value.CURP}"></td>
                <td id="table-button-column">
                    <input type="submit" id="table-button-confirm" hx-post="/edit-student-confirm/${key}" 
                                                           hx-target="closest tr" 
                                                           hx-swap="outerHTML" 
                                                           hx-include="closest tr" value="Confirmar"><br><br>
                    <input type="submit" id="table-button-delete" hx-post="/edit-student-delete/${key}"
                                                                  hx-target="closest tr"
                                                                  hx-swap="outerHTML"
                                                                  hx-include="closest tr" value="Borrar">
                </td>
            </form>
        </tr>
    `;
}