import xlsx from 'xlsx';

export function readExcelFile(filepath) {
    const inputWorkbook = xlsx.readFile(filepath);
    const newWorkbook = xlsx.utils.book_new();
    const inputWorksheet = inputWorkbook.Sheets[inputWorkbook.SheetNames[0]];
    let inputData = xlsx.utils.sheet_to_json(inputWorksheet, { header: 1, defval:"" });
    
    let newWorksheet;
    let uniqueData = [];
    let repeatData = new Set();

    let filteredSheetData = inputData.slice(1).map(row => ({
        "NO CONTROL": row[7] ? String(row["NO CONTROL"]).toUpperCase(): "",
        "CARRERA":row[9] ? String(row["CARRERA"]).toUpperCase(): "",
        "GRUPO":row[9] ? String(row["GRUPO"]).toUpperCase(): "",
        "NOMBRE": row[8] ? String(row["NOMBRE"]).toUpperCase(): "",
        "APELLIDO PATERNO":row[9] ? String(row["APELLIDO PATERNO"]).toUpperCase(): "",
        "APELLIDO MATERNO":row[10] ? String(row["APELLIDO MATERNO"]).toUpperCase(): ""
    }));

    for (let row of filteredSheetData){
        if (!repeatData.has(row["NO CONTROL"])){
            repeatData.add(row["NO CONTROL"]);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "ALUMNOS");

    uniqueData = [];
    repeatData = new Set();

    filteredSheetData = inputData.slice(1).map(row => ({
        "RFC":row[14],
        "PROFESOR": row[13]
    }));

    for (let row of filteredSheetData){
        if (!repeatData.has(row["RFC"])){
            repeatData.add(row["RFC"]);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "PROFESORES");

    let buffer = xlsx.write(newWorkbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    return buffer;
}