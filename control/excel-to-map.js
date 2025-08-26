import xlsx from "xlsx";

export function convertStudentExcelFileToMap() {
    var workbook = xlsx.readFile("./data/datos.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const studentMap = new Map();

    let firstName;
    let fatherSurname;
    let motherSurname;
    let CURP;

    for(let index = 2; (((worksheet[`A${index}`]) || (worksheet[`B${index}`]) || (worksheet[`D${index}`])) != (null || undefined)); index++){
        firstName = worksheet[`A${index}`].v;
        fatherSurname = worksheet[`B${index}`].v;
        CURP = worksheet[`D${index}`].v;

        if (worksheet[`C${index}`] === undefined){
            motherSurname = "";
        } else{
            motherSurname = worksheet[`C${index}`].v;
        }
        
        studentMap.set(CURP, {firstName, fatherSurname, motherSurname});
    }

    return studentMap;
}