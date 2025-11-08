//LIBRARY IMPORTS
import express from 'express';
import xlsx from 'xlsx';
import multer from 'multer';
import path from 'path';
import fs, { readdirSync } from 'fs';
import archiver from 'archiver';

//IN-APP IMPORTS
import templateHomePage from './views/index.js';
import templateStudentPage from './views/student.js';
import templateAdminPage from './views/admin.js';
import templateTeacherPage from './views/teacher.js';
import templateStudentList from './views/student list/student-list.js';
import { convertStudentExcelFileToMap } from './control/excel-to-map.js';
import templateTeacherList from './views/teacher list/teacher-list.js';
import { convertTeacherExcelToMap } from './control/excel-to-map.js';
import templateDataDropdown from './views/data changes/admin-data-dropdown.js';
import { cleanAndArchiveData, readExcelFile } from './control/order-excel-data.js';
import templateSingleStudent from './views/student list/single-student.js';

//APP CONSTANTS
const app = express();
const port = 80;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "data/input data/";

        fs.mkdirSync(uploadPath, { recursive: true });
        fs,readdirSync(uploadPath).forEach(existingFile => {
            fs.unlinkSync(path.join(uploadPath, existingFile));
        });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, "mixedData" + extension);
    }
});
const upload = multer({ storage });

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//MAIN ROUTES
app.get('', (req, res) => {
    res.send(templateHomePage());
});

app.get('/student', (req, res) => {
    const fragment = templateStudentPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/teacher', (req, res) => {
    const fragment = templateTeacherPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/admin', (req, res) => {
    const fragment = templateAdminPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});


//STUDENT ROUTES
app.get('/student-list-download', (req, res) => {
    const workbook = xlsx.readFile("./data/detalle_calificaciones (51).xlsx");
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    let filteredData = data.map(row => ({
        id: row["NO CONTROL"],
        name: row["NOMBRE"]
    }));

    let uniqueData = [];
    let repeatData = new Set();

    for (let row of filteredData){
        if(!repeatData.has(row.id)){
            repeatData.add(row.id);
            uniqueData.push(row);
        }
    }

    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.json_to_sheet(uniqueData);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "studentList");
    
    const buffer = xlsx.write(newWorkbook, {
        type: "buffer",
        bookType: "xlsx"
    });

    res.setHeader("Content-Disposition", "attachment; filename=student-list.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

    res.send(buffer);
});


//TEACHER ROUTES


//ADMIN ROUTES
app.post('/student-list/search', (req, res) => {
    const searchText = req.body.search.toUpperCase();
    let fragment;
    
    if(searchText.replace(/\s/g,"") != ""){
        const unfilteredMap = convertStudentExcelFileToMap();
        const filteredMap = new Map(
            Array.from(unfilteredMap).filter(([key, value]) => 
            (value.nombre.toUpperCase().trim().includes(searchText) || key == searchText)
            ).map(([key, value]) => [
            key, 
                {
                    generacion: value.generacion.toUpperCase(),
                    carrera: value.carrera.toUpperCase(),
                    grupo: value.grupo.toUpperCase(),
                    nombre: value.nombre.toUpperCase(),
                    apellidoPaterno: value.apellidoPaterno.toUpperCase(),
                    apellidoMaterno: value.apellidoMaterno.toUpperCase(),
                    CURP: value.CURP.toUpperCase()
                }
            ])
        );

        fragment = templateStudentList(filteredMap);

    } else{
        const noSearch = () => /*HTML*/`
            <div></div>
        `
        fragment = noSearch(); 
    }

    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }  
});

app.get('/student-list', (req, res) => {
    const map = convertStudentExcelFileToMap();
    const fragment = templateStudentList(map);

    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.post('/edit-student/:id', (req, res) => {
    let fragment;
    let id = req.params.id.toString();
    let { generacion, carrera, grupo, nombre, apellidoP, apellidoM, CURP } = req.body;
    const DATA_FILE = "./data/ordered data/ordered-data.xlsx"
    
    generacion = generacion.toUpperCase();
    carrera = carrera.toUpperCase();
    grupo = grupo.toUpperCase();
    nombre = nombre.toUpperCase();
    let apellidoPaterno = apellidoP.toUpperCase();
    let apellidoMaterno = apellidoM.toUpperCase();
    CURP = CURP.toUpperCase();

    let updateStudent = new Map();
    updateStudent.set(id, {generacion, carrera, grupo, nombre, apellidoPaterno, apellidoMaterno, CURP});

    try {
        const workbook = xlsx.readFile(DATA_FILE);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { defval: "" });
        const rowIndex = data.findIndex((r) => String(r["NO CONTROL"]) === id);
        
        if(rowIndex === -1){
            return res.status(404).send(`<tr><td colspan="9">Datos no encontrados (ID: ${id})</td></tr>`);
        }

        data[rowIndex]["GENERACION"]= generacion;
        data[rowIndex]["CARRERA"] = carrera;
        data[rowIndex]["GRUPO"] = grupo;
        data[rowIndex]["NOMBRE"] = nombre;
        data[rowIndex]["PATERNO"] = apellidoPaterno;
        data[rowIndex]["MATERNO"] = apellidoMaterno;
        data[rowIndex]["CURP"] = CURP;

        const newSheet = xlsx.utils.json_to_sheet(data);

        workbook.Sheets[sheetName] = newSheet;
        xlsx.writeFile(workbook, DATA_FILE);

        updateStudent.forEach((value, key) => {
            fragment = templateSingleStudent(key, value);
        });

        /*const fragment = 
        `
            <tr id="${id}">
                <form>
                    <td><input type="text" name="id" value="${id}"></td>
                    <td><input type="text" name="generacion" value="${generacion}"></td>
                    <td><input type="text" name="carrera" value="${carrera}"></td>
                    <td><input type="text" name="grupo" value="${grupo}"></td>
                    <td><input type="text" name="nombre" value="${nombre}"></td>
                    <td><input type="text" name="apellidoP" value="${apellidoP}"></td>
                    <td><input type="text" name="apellidoM" value="${apellidoM}"></td>
                    <td><input type="text" name="CURP" value="${CURP}"></td>
                    <td id="table-button-column"><input type="submit" id="table-button" hx-post="/edit-student/${id}" 
                                                                                        hx-target="closest tr" 
                                                                                        hx-swap="outerHTML" 
                                                                                        hx-include="closest tr" value="Editar"></td>
                </form>
            </tr>
        `;*/
        
        res.send(fragment);
    } catch (err) {
        console.error("Error updating row: ", err);
        res.status(500).send(`<tr><td colspan="9">Error actualizando alumno</td></tr>`);
    }
});

app.get('/teacher-list', (req, res) => {
    const map = convertTeacherExcelToMap();
    const fragment = templateTeacherList(map);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.get('/input-data', (req, res) => {
    const fragment = templateDataDropdown();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//EXCEL DATA UPLOAD
app.post('/file-upload', upload.single("xlsxFile"), async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        await cleanAndArchiveData();

        await readExcelFile(req.file.path);

        /*await createActiveClasses();*/
        
        res.send("Files uploaded and archived");
    } catch (err){
        console.error(err);
        res.status(500).send("Error processing file");
    }
    
});

//PORT
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});