import templateSingleTeacher from "./single-teacher.js";

export default function templateTeacherList(map){
    let items = "";
    map.forEach((value, key) => {
        items += templateSingleTeacher(key, value);
    });

    return /*html*/`
        <div>
            <table style="border: 1px solid black">
                ${items}
            </table>
        </div>
    `;
}