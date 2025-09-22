export default function templateSingleTeacher(key, value) {
    return /*html*/`
        <tr>
            <td style="border: 1px solid black"><textarea>${key}</textarea></td>
            <td style="border: 1px solid black"><textarea>${value}</textarea></td>
        </tr>
    `
}