const { app, BrowserWindow } = require('electron');
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('will-navigate', (e, url) => {
    e.preventDefault();
    console.log(url);

    const realPath = url.slice(7);

    mainWindow.webContents.send('open-file', realPath);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
