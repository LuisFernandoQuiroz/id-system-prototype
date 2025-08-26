export default function templateSingleStudent(key, value) {
    return /*html*/`
        <li><h2>${key}: </h2>
            ${value.firstName} ${value.fatherSurname} ${value.motherSurname}
        </li>
    `
}