import express from 'express';
import xlsx from 'xlsx';
import templateHomePage from './views/index.js';
import templateStudentPage from './views/student.js';
import templateAdminPage from './views/admin.js';
import templateTeacherPage from './views/teacher.js';
import templateStudentList from './views/student list/student-list.js';
import { convertStudentExcelFileToMap } from './control/excel-to-map.js';
import templateTeacherList from './views/teacher list/teacher-list.js';
import { convertTeacherExcelToMap } from './control/excel-to-map.js';

const app = express();
const port = 80;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//ROUTES
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
    
    if(searchText != ""){
        const unfilteredMap = convertStudentExcelFileToMap();
        const filteredMap = new Map(
            Array.from(unfilteredMap).filter(([key, value]) => 
            value.nombre.toUpperCase().includes(searchText)
            ).map(([key, value]) => [
            key, 
                {
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

    } else if(searchText == ("" || " ")){
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

app.get('/teacher-list', (req, res) => {
    const map = convertTeacherExcelToMap();
    const fragment = templateTeacherList(map);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//PORT
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});