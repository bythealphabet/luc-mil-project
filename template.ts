export default () => {
  return `<!doctype html>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <!--app-head-->
  </head>
  <body>
    <div id="root" class="base-grid main-layout"><!--app-html--></div>
    <script type="module" src="client/main.tsx"></script>
  </body>
</html>`;
};
