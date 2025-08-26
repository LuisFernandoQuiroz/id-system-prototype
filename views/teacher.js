const templateTeacherPage = () => /*html*/`
    <div>
        <h1>Test</h1>
        <button id="excelData">Load data</button>
        <br>
        <div id="output"></div>
    </div>
<!--
    <script>
        document.getElementById("excelData").addEventListener("click", async () => {
            const res = await fetch("/read-excel");
            const data = await res.json();
            document.getElementById("output").innerText = JSON.stringify(data, null, 2)
        });
    </script>
-->
`

export default templateTeacherPage;