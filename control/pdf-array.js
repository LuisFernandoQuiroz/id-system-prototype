import xlsx from "xlsx";

export function readStudentTable() {
    var workbook = xlsx.readFile("./data/datos.xlsx");
    let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const arrayRange = xlsx.utils.decode_range(worksheet['!ref']);

    let studentsArray = [];

    for (let index = 2; ((worksheet[`A${index}`]) != null) || ((worksheet[`B${index}`]) != null) || ((worksheet[`D${index}`]) != null); index++){
        studentsArray.push([(worksheet[`A${index}`].v),
                            (worksheet[`B${index}`].v),   
                            (worksheet[`C${index}`].v), 
                            (worksheet[`D${index}`]).v]);
    };

    console.log(studentsArray);
}