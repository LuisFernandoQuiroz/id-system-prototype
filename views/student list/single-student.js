export default function templateSingleStudent(key, value) {
    return /*html*/`
        <tr id="${key}">
            <form hx-post="/update-student-row" hx-target="#response" enctype="multipart/form-data">
                <td><input type="text" value="${key}"></td>
                <td>${value.generacion}</td>
                <td>${value.carrera}</td>
                <td>${value.grupo}</td>
                <td>${value.nombre}</td>
                <td>${value.apellidoPaterno}</td>
                <td>${value.apellidoMaterno}</td>
                <td>${value.CURP}</td>
                <td id="table-button-column"><input type="submit" value="EDIT" id="table-button"></td>
            </form>
        </tr>
    `
}