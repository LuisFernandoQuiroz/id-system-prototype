import express from 'express';
import templateHomePage from './views/index.js';
import templateStudentPage from './views/student.js';
import templateAdminPage from './views/admin.js';
import templateTeacherPage from './views/teacher.js';
import templateStudentList from './views/student-list.js';
import { convertStudentExcelFileToMap } from './control/excel-to-map.js';


const app = express();
const port = 80;

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//ROUTES
app.get('', (req, res) => {
    res.send(templateHomePage());
});

//student related routes
app.get('/student', (req, res) => {
    const fragment = templateStudentPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//teacher related routes
app.get('/teacher', (req, res) => {
    const fragment = templateTeacherPage();
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

//admin related routes
app.get('/admin', (req, res) => {
    const fragment = templateAdminPage();
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

app.post('/student-list/search', (req, res) => {
    const unfilteredMap = convertStudentExcelFileToMap();
    const searchText = req.body.search.toUpperCase();

    const filteredMap = new Map(
        Array.from(unfilteredMap).filter(([key, value]) => 
            value.firstName.toUpperCase().includes(searchText)
        ).map(([key, value]) => [
            key, 
            {
                firstName: value.firstName.toUpperCase(),
                fatherSurname: value.fatherSurname.toUpperCase(),
                motherSurname: value.motherSurname.toUpperCase()
            }
        ])
    );

    const fragment = templateStudentList(filteredMap);
    if (req.headers['hx-request']) {
        res.send(fragment);
    } else {
        res.send(wrapLayout(fragment));
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});