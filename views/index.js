const templateHomePage = () => /*html*/`
    <!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ID System</title>
            
            
            <link rel="stylesheet" href="/style.css">
            <link rel="stylesheet" href="/style-view-dropdowns.css">
            <link rel="stylesheet" href="/style-table.css">
            

            <script src="https://unpkg.com/htmx.org" defer></script>
        </head>
        <body>
            <header>
                <div id="header-main" hx-get="/" hx-target="body" hx-swap="innerHTML">
                    <img id="header-main-logo" src="./resources/Imagotipo_DGETI-1.png" height="75px" width="75px">
                    <h1 id="header-main-text">CBTis 220</h1>
                </div>
            </header>

            <main id="main">
                <ul class="home-button-list">
                    <li>
                        <button hx-get="/student" hx-target="#main" hx-swap="innerHTML" class="home-button">Alumnos</button>
                    </li>
                    <li>
                        <button hx-get="/teacher" hx-target="#main" hx-swap="innerHTML" class="home-button">Docentes</button>
                    </li>
                    <li>
                        <button hx-get="/admin" hx-target="#main" hx-swap="innerHTML" class="home-button">Administrador</button>
                    </li>
                </ul>
            </main>
        </body>
        <footer>
        </footer>
    </html>
`

export default templateHomePage;