export default function templateSingleTeacher(key, value) {
    return /*html*/`
        <tr>
            <td>${key}</td>
            <td>${value}</td>
            <td id="table-button-column"><button id="table-button-edit">Editar</button></td>
        </tr>
    `
}