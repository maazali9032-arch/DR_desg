export function renderErrorPage(notFound = false): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${notFound ? "Invitation not found" : "Unable to load invitation"}</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-icon-180x180.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #30161c; color: #E8C982; box-sizing: border-box; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #D6A85F; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: transparent; color: #E8C982; border-color: #A87838; }
      .secondary { background: transparent; color: #E8C982; border-color: #A87838; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>${notFound ? "Invitation not found" : "Unable to load invitation"}</h1>
      <p>${notFound ? "This invitation link is invalid." : "Please try refreshing in a moment."}</p>
      <div class="actions">
        ${notFound ? "" : '<button class="primary" onclick="location.reload()">Try again</button>'}
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
