export default function templateSingleStudent(key, value) {
    return /*html*/`
        <tr>
            <td>${key}</td>
            <td>${value.carrera}</td>
            <td>${value.grupo}</td>
            <td>${value.nombre}</td>
            <td>${value.apellidoPaterno}</td>
            <td>${value.apellidoMaterno}</td>
            <td>${value.CURP}</td>
        </tr>
    `
}