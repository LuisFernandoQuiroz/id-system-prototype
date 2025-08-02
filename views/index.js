const templateHomePage = () => /*html*/`
    <html>
        <head>
            <title>ID System</title>
            <link rel="stylesheet" href="/style.css">
            <script src="https://unpkg.com/htmx.org" defer></script>
        </head>
        <body>
            <header>
                <h1>[School name]</h1>
            </header>

            <main id="main">
                <ul>
                    <li>
                        <button hx-get="/student" hx-target="#main" hx-swap="innerHTML">Alumnos</button>
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