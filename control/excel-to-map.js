import xlsx from "xlsx";

export function convertStudentExcelFileToMap() {
    var workbook = xlsx.readFile("./data/ordered data/ordered-data.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const studentMap = new Map();

    let noControl;
    let generacion;
    let carrera;
    let grupo;    
    let nombre;
    let apellidoPaterno;
    let apellidoMaterno;
    let CURP;
    
    for(let index = 2; ( ( (worksheet[`A${index}`]) || 
                           (worksheet[`B${index}`]) || 
                           (worksheet[`C${index}`]) || 
                           (worksheet[`D${index}`]) || 
                           (worksheet[`E${index}`]) || 
                           (worksheet[`F${index}`]) || 
                           (worksheet[`G${index}`]) || 
                           (worksheet[`H${index}`]) ) != undefined ); index++){
        noControl = worksheet[`A${index}`].v;

        if(![...studentMap.keys()].includes(noControl)){
            generacion = worksheet[`B${index}`].v.toUpperCase();
            carrera = worksheet[`C${index}`].v.toUpperCase();
            grupo = worksheet[`D${index}`].v.toUpperCase();
            nombre = worksheet[`E${index}`].v.toUpperCase();
            apellidoPaterno = worksheet[`F${index}`].v.toUpperCase();
            if (worksheet[`G${index}`] === undefined){
                apellidoMaterno = "";
            } else{
                apellidoMaterno = worksheet[`G${index}`].v.toUpperCase();
            }
            CURP = worksheet[`H${index}`].v.toUpperCase();
            

            studentMap.set(noControl, {generacion, carrera, grupo, nombre, apellidoPaterno, apellidoMaterno, CURP});
        };
    }

    return studentMap;
}

export function convertTeacherExcelToMap() {
    let workbook = xlsx.readFile("./data/ordered data/ordered-data.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[1]];

    const teacherMap = new Map();

    let teacherID;
    let teacherName;

    for(let index = 2; ((worksheet[`A${index}`] || worksheet[`B${index}`]) != undefined); index++){
        let count = 0;

        if(worksheet[`A${index}`] != ''){
            teacherID = worksheet[`A${index}`].v.toUpperCase();
            count+=1;
        }

        if(worksheet[`B${index}`] != ''){
            teacherName = worksheet[`B${index}`].v.toUpperCase();
        }

        if(![...teacherMap.keys()].includes(teacherID) && count == 1 && ((teacherID || teacherName) != '')){
            teacherMap.set(teacherID,teacherName);
        }
    }

    return teacherMap;
}