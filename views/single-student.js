export default function templateSingleStudent(key, value) {
    return /*html*/`
        <li>
            <textarea name="" id="">${key}</textarea>
            <textarea name="" id="">${value.nombre}</textarea>
            <textarea name="" id="">${value.apellidoPaterno}</textarea>
            <textarea name="" id="">${value.apellidoMaterno}</textarea>
            <button>Edit</button>
        </li>
    `
}