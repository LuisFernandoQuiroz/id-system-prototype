export default function templateSingleStudent(key, value) {
    return /*html*/`
        <tr id="${key}">
            <td><input type="text" value="${key}"></td>
            <td>${value.generacion}</td>
            <td>${value.carrera}</td>
            <td>${value.grupo}</td>
            <td>${value.nombre}</td>
            <td>${value.apellidoPaterno}</td>
            <td>${value.apellidoMaterno}</td>
            <td>${value.CURP}</td>
            <td id="table-button-column"><button id="table-button" hx-get="/student/edit/${key}" hx-target="closest tr">Editar</button></td>
        </tr>
    `
}