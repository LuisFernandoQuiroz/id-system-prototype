import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

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
        "GENERACION":row[3].replace(/\s/g, ""),
        "CARRERA":row[2].trim(),
        "GRUPO":row[6].replace(/\s/g, ""),
        "NOMBRE": row[8].trim(),
        "PATERNO":row[9].trim(),
        "MATERNO":row[10].trim(),
        "CURP":row[11].replace(/\s/g, "")
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
        "NOMBRE DOCENTE": row[13 || ""].toUpperCase()
    }));

    for (let row of filteredSheetData){
        if (!repeatData.has(row["RFC DOCENTE"])){
            repeatData.add(row["RFC DOCENTE"]);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "DOCENTES");

    //Reset to create active class list
    uniqueData = [];
    repeatData = new Set();

    filteredSheetData = inputData.slice(1).map(row => ({
        "ID": `${row[12 || ""].toUpperCase()}_${row[2 || ""].toUpperCase()}_${row[6 || ""].toUpperCase()}`,
        "MATERIA":row[12 || ""].toUpperCase(),
        "CARRERA":row[2 || ""].toUpperCase(),
        "GRUPO":row[6 || ""].toUpperCase(),
        "PROFESOR":row[13 || ""].toUpperCase()
    }));

    for (let row of filteredSheetData){
        if (row["PROFESOR"] == (undefined || null || "")){
            row["PROFESOR"] = "-";
        }
        
        const key = `${row["MATERIA"]}|${row["CARRERA"]}|${row["GRUPO"]}|${row["PROFESOR"]}`;

        if (!repeatData.has(key)){
            repeatData.add(key);
            uniqueData.push(row);
        }
    }

    newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "MATERIAS ACTIVAS");

    //Reset to create active classes tables and sheets
    


    

    //Write file
    const outputDirectory = path.join(__dirname, "data", "ordered data");
    
    if (!fs.existsSync(outputDirectory)){
        fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const outputPath = path.join(outputDirectory, "ordered-data.xlsx");

    xlsx.writeFile(newWorkbook, outputPath);

    return;
}

export function cleanAndArchiveData() {
    const orderedPath = "data/ordered data";
    const archivePath = "data/archive";
    fs.mkdirSync(orderedPath, { recursive:true });
    fs.mkdirSync(archivePath, { recursive:true });
    
    const currentFiles = fs.readdirSync(orderedPath);
    if (currentFiles.length === 0) return Promise.resolve();
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const zipFile = path.join(archivePath, `Datos-${timestamp}.zip`);
    const output = fs.createWriteStream(zipFile);
    const archive = archiver("zip", { zlib:{ level:7 } });

    return new Promise((resolve, reject) => {
        output.on("close", () => {
            console.log(`Archived ${archive.pointer()} bytes.`);
            
            fs.readdirSync(orderedPath).forEach(item => {
                const itemPath = path.join(orderedPath, item);
                const stat = fs.statSync(itemPath);

                if(stat.isDirectory()) {
                    fs.rmSync(itemPath, { recursive: true, force: false });
                } else {
                    fs.unlinkSync(itemPath);
                }
            });

            resolve();
        });

        archive.on("error", reject);
        archive.pipe(output);
        archive.directory(orderedPath, false);
        archive.finalize();
    });
}

export function createActiveClasses() {
    
}