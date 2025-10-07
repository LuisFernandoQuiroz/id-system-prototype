export default function templateDataDropdown(){
    return /*html*/`
        <div>
            <form hx-post="/file-upload" hx-encoding="multipart/form-data" id="excel-input-form">
                <label for="xlsxFile">Ingrese documento Excel:</label>
                <input type="file" name="xlsxFile" accept=".xlsx,.xls">
                <input type="submit" value="Submit">
            </form>
        </div>
    `;
}