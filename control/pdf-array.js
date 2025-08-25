import data from "../data/data.xlsx";

var XLSX = require("xlsx");
var workbook = XLSX.readfie(data);
const students =[];

let worksheet = workbook.Sheets[workbook.SheetNames[0]];

for (let index = 2; (worksheet[`A${index}`].v != null) && (worksheet[`B${index}`].v != null) && (worksheet[`C${index}`].v != null) && (worksheet[`D${index}`].v != null); index++){
    
}