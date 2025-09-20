import templateSingleStudent from "./single-student.js";

export default function templateStudentList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleStudent(key, value);
    });

    return /*html*/`
        <div>
            <ul>
                ${items}
            </ul>
        </div>
    `;
}