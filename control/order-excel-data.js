import xlsx from 'xlsx';

export function readExcelFile(filepath) {
    const inputWorkbook = xlsx.readFile(filepath);
    let inputWorksheet = inputWorkbook.Sheets[inputWorkbook.SheetNames[0]];
    let inputData = xlsx.utils.sheet_to_json(inputWorksheet, { header: 1, defval:"" });

    let filteredSheetData = DataTransfer.slice(1).map(row => ({
        "NO CONTROL": row[7],
        "CARRERA":row[9],
        "GRUPO":row[9],
        "NOMBRE": row[8],
        "APELLIDO PATERNO":row[9],
        "APELLIDO MATERNO":row[10]
    }));

    let uniqueData = [];
    let repeatData = new Set();

    for (let row of filteredSheetData){
        
    }
    
    return inputData;
}