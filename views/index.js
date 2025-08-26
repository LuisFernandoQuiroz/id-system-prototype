const templateHomePage = () => /*html*/`
    <!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ID System</title>
            <link rel="stylesheet" href="/style.css">
            <script src="https://unpkg.com/htmx.org" defer></script>
            
        </head>
        <body>
            <header class="header">
                <h1 class="header-text">CBTis 220</h1>
            </header>

            <main id="main">
                <ul class="home-list">
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
    </html>
`

export default templateHomePage;