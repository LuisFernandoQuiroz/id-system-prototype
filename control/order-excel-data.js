import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

export function readExcelFile(filepath) {
    const __dirname = path.resolve();
    const inputWorkbook = xlsx.readFile(filepath);
    const inputWorksheet = inputWorkbook.Sheets[inputWorkbook.SheetNames[0]];
    
    let inputData = xlsx.utils.sheet_to_json(inputWorksheet, { header: 1, blankrows: false ,defval:"" });

    let newWorkbook = xlsx.utils.book_new();
    let newWorksheet;
    let uniqueData = [];
    let repeatData = new Set();

    let filteredSheetData = inputData.slice(1).map(row => ({
        "NO CONTROL": row[7],
        "GENERACION":row[3],
        "CARRERA":row[2],
        "GRUPO":row[6],
        "NOMBRE": row[8],
        "PATERNO":row[9],
        "MATERNO":row[10],
        "CURP":row[11]
    }));

    for (let row of filteredSheetData){
        if (!repeatData.has(row["NO CONTROL"])){
            repeatData.add(row["NO CONTROL"]);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "ALUMNOS");

    //Reset to create teacher sheet
    uniqueData = [];
    repeatData = new Set();

    filteredSheetData = inputData.slice(1).map(row => ({
        "RFC DOCENTE":row[14],
        "NOMBRE DOCENTE": row[13]
    }));

    for (let row of filteredSheetData){
        if (!repeatData.has(row["RFC DOCENTE"])){
            repeatData.add(row["RFC DOCENTE"]);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "DOCENTES");

    const outputDirectory = path.join(__dirname, "data", "ordered data");
    
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    //Reset to create active class list
    uniqueData = [];
    repeatData = new Set();

    filteredSheetData = inputData.slice(1).map(row => ({
        "RFC":row[14],
        "PROFESOR":row[14]
    }));


    //Write file
    const outputPath = path.join(outputDirectory, "sorted-data.xlsx");

    xlsx.writeFile(newWorkbook, outputPath);

    return outputPath;
}