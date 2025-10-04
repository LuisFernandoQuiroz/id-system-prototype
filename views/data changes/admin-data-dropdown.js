export default function templateDataDropdown(){
    return /*html*/`
        <div>
            <form hx-post="/file-upload" hx-encoding="multipart/form-data">
                <label for="xlsxFile">Ingrese documento Excel:</label>
                <input type="file" name="xlsxFile" accept=".xlsx,.xls">
                <button type="submit">Upload</button>
            </form>
        </div>
    `;
}