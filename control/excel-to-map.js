import xlsx from "xlsx";

export function convertStudentExcelFileToMap() {
    var workbook = xlsx.readFile("./data/detalle_calificaciones (51).xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const studentMap = new Map();

    let noControl;
    let CURP;
    let carrera;
    let grupo;
    let nombre;
    let apellidoPaterno;
    let apellidoMaterno;

    for(let index = 2; ( ( (worksheet[`H${index}`]) || (worksheet[`G${index}`]) || (worksheet[`C${index}`]) || (worksheet[`I${index}`]) || (worksheet[`J${index}`]) || (worksheet[`K${index}`]) || (worksheet[`L${index}`]) ) != undefined ); index++){
        noControl = worksheet[`H${index}`].v;

        if(![...studentMap.keys()].includes(noControl)){
            CURP = worksheet[`L${index}`].v.toUpperCase();
            grupo = worksheet[`G${index}`].v.toUpperCase();
            carrera = worksheet[`C${index}`].v.toUpperCase();
            nombre = worksheet[`I${index}`].v.toUpperCase();
            apellidoPaterno = worksheet[`J${index}`].v.toUpperCase();
            
            if (worksheet[`K${index}`] === undefined){
                apellidoMaterno = "";
            } else{
                apellidoMaterno = worksheet[`K${index}`].v.toUpperCase();
            }
            
            studentMap.set(noControl, {nombre, apellidoPaterno, apellidoMaterno, carrera, grupo, CURP});
        };
    }

    return studentMap;
}

export function convertTeacherExcelToMap() {
    var workbook = xlsx.readFile("./data/detalle_calificaciones (51).xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const teacherMap = new Map();

    let teacherID;
    let teacherName;

    for(let index = 2; (((worksheet[`M${index}`])||(worksheet[`N${index}`])||(worksheet[`O${index}`])) != undefined); index++){
        let count = 0;

        if(worksheet[`O${index}`] != undefined){
            teacherID = worksheet[`O${index}`].v.toUpperCase();
            count+=1;
        };

        if(worksheet[`N${index}`] != undefined){
            teacherName = worksheet[`N${index}`].v.toUpperCase();
        };

        if(![...teacherMap.keys()].includes(teacherID) && count == 1){
            teacherMap.set(teacherID,teacherName);
        };
    }

    return teacherMap;
}