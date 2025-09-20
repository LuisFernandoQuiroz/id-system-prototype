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
        /* (((worksheet[`A${index}`]) || (worksheet[`B${index}`]) || (worksheet[`D${index}`])) != (null || undefined)) */
        noControl = worksheet[`H${index}`].v;

        if(![...studentMap.keys()].includes(noControl)){
            CURP = worksheet[`L${index}`].v;
            grupo = worksheet[`G${index}`].v;
            carrera = worksheet[`C${index}`].v;
            nombre = worksheet[`I${index}`].v;
            apellidoPaterno = worksheet[`J${index}`].v;
            
            if (worksheet[`K${index}`] === undefined){
                apellidoMaterno = "";
            } else{
                apellidoMaterno = worksheet[`K${index}`].v;
            }
            
            studentMap.set(noControl, {nombre, apellidoPaterno, apellidoMaterno, CURP});
        };
    }

    return studentMap;
}

export function convertTeacherExcelToMap() {
    var workbook = xlsx.readFile("./data/detalle_calificaciones (51).xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const teacherMap = new Map();

    let teacherName;
    let teacherClass;

    for(let index = 2; (((worksheet[`M${index}`])||(worksheet[`N${index}`])||(worksheet[`O${index}`])) != undefined); index++){
        teacherName = worksheet[`O${index}`].v;


    }

}