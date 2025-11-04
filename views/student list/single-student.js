export default function templateSingleStudent(key, value) {
    return /*html*/`
        <tr id="${key}">
            <form>
                <td><input type="text" name="id" value="${key}"></td>
                <td><input type="text" name="generacion" value="${value.generacion}"></td>
                <td><input type="text" name="carrera" value="${value.carrera}"></td>
                <td><input type="text" name="grupo" value="${value.grupo}"></td>
                <td><input type="text" name="nombre" value="${value.nombre}"></td>
                <td><input type="text" name="apellidoP" value="${value.apellidoPaterno}"></td>
                <td><input type="text" name="apellidoM" value="${value.apellidoMaterno}"></td>
                <td><input type="text" name="CURP" value="${value.CURP}"></td>
                <td id="table-button-column"><input type="submit" id="table-button" hx-post="/edit-student/${key}" 
                                                                                    hx-target="closest tr" 
                                                                                    hx-swap="outerHTML" 
                                                                                    hx-include="closest tr" value="Editar"></td>
            </form>
        </tr>
    `
}