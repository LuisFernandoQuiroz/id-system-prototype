export default function templateDataDropdown(){
    return /*html*/`
    <!--ade = add, delete, edit-->
        <div id="ade-student">
            <h2>Editar alumno</h2>
        </div>

        <div id="ade-teacher">
            <h2>Editar profesor</h2>
        </div>
        
        <div id="initial-data-input">
            <p>Ingreso de datos iniciales</p><br>
            <form hx-post="/file-upload" hx-encoding="multipart/form-data">
                <label for="xlsxFile">Seleccione Excel:</label><br>
                <input type="file" name="xlsxFile" accept=".xlsx,.xls"><br>
                <input type="submit" value="Submit">
            </form>
        </div>
    `;
}