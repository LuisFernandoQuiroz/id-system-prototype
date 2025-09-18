import xlsx from "xlsx";

export function convertStudentExcelFileToMap() {
    var workbook = xlsx.readFile("./data/detalle_calificaciones (51).xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const studentMap = new Map();

    let CURP;
    let carrera;
    let grupo;
    let nombre;
    let apellidoPaterno;
    let apellidoMaterno;

    for(let index = 2; ( ( (worksheet[`G${index}`]) || (worksheet[`C${index}`]) || (worksheet[`I${index}`]) || (worksheet[`J${index}`]) || (worksheet[`K${index}`]) || (worksheet[`L${index}`]) ) != undefined ); index++){
        /* (((worksheet[`A${index}`]) || (worksheet[`B${index}`]) || (worksheet[`D${index}`])) != (null || undefined)) */
        CURP = worksheet[`L${index}`].v;

        if(![...studentMap.keys()].includes(CURP)){
            grupo = worksheet[`G${index}`].v;
            carrera = worksheet[`C${index}`].v;
            nombre = worksheet[`I${index}`].v;
            apellidoPaterno = worksheet[`J${index}`].v;
            
            if (worksheet[`K${index}`] === undefined){
                apellidoMaterno = "";
            } else{
                apellidoMaterno = worksheet[`K${index}`].v;
            }
            
            studentMap.set(CURP, {nombre, apellidoPaterno, apellidoMaterno});
        };
    }

    return studentMap;
}