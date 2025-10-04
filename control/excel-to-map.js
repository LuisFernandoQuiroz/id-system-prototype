import xlsx from "xlsx";

export function convertStudentExcelFileToMap() {
    var workbook = xlsx.readFile("./data/ordered data/sorted-data.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const studentMap = new Map();

    let noControl;
    let CURP;
    let carrera;
    let grupo;
    let nombre;
    let apellidoPaterno;
    let apellidoMaterno;

    for(let index = 2; ( ( (worksheet[`A${index}`]) || (worksheet[`B${index}`]) || (worksheet[`C${index}`]) || (worksheet[`D${index}`]) || (worksheet[`E${index}`]) || (worksheet[`F${index}`]) || (worksheet[`G${index}`]) ) != undefined ); index++){
        noControl = worksheet[`A${index}`].v;

        if(![...studentMap.keys()].includes(noControl)){
            CURP = worksheet[`G${index}`].v.toUpperCase();
            grupo = worksheet[`C${index}`].v.toUpperCase();
            carrera = worksheet[`B${index}`].v.toUpperCase();
            nombre = worksheet[`D${index}`].v.toUpperCase();
            apellidoPaterno = worksheet[`E${index}`].v.toUpperCase();
            
            if (worksheet[`F${index}`] === undefined){
                apellidoMaterno = "";
            } else{
                apellidoMaterno = worksheet[`F${index}`].v.toUpperCase();
            }
            
            studentMap.set(noControl, {nombre, apellidoPaterno, apellidoMaterno, carrera, grupo, CURP});
        };
    }

    return studentMap;
}

export function convertTeacherExcelToMap() {
    let workbook = xlsx.readFile("./data/ordered data/sorted-data.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[1]];

    const teacherMap = new Map();

    let teacherID;
    let teacherName;

    for(let index = 2; ((worksheet[`A${index}`] || worksheet[`B${index}`]) != undefined); index++){
        let count = 0;

        if(worksheet[`B${index}`] != ''){
            teacherID = worksheet[`B${index}`].v.toUpperCase();
            count+=1;
        }

        if(worksheet[`A${index}`] != ''){
            teacherName = worksheet[`A${index}`].v.toUpperCase();
        }

        if(![...teacherMap.keys()].includes(teacherID) && count == 1 && ((teacherID || teacherName) != '')){
            teacherMap.set(teacherID,teacherName);
        }
    }

    return teacherMap;
}