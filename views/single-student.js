export default function templateSingleStudent(key, value) {
    return /*html*/`
        <li>
            <textarea name="" id="">${key}</textarea>
            <textarea name="" id="">${value.firstName}</textarea>
            <textarea name="" id="">${value.fatherSurname}</textarea>
            <textarea name="" id="">${value.motherSurname}</textarea>
            <button>Edit</button>
        </li>
    `
}