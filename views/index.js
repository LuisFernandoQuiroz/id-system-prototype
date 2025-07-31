const templateHomePage = () => /*html*/`
    <html>
        <head>
            <title>ID System</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <header>
                <h1>[Nombre de escuela]</h1>
            </header>

            <main>
                <ul>
                    <li>
                        <button>Alumnos</button>
                    </li>
                    <li>
                        <button>Docentes</button>
                    </li>
                    <li>
                        <button>Administrador</button>
                    </li>
                </ul>
            </main>
        </body>
    </html>
`

export default templateHomePage;