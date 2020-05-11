const electron = require('electron');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

app.allowRendererProcessReuse = true;

app.on('ready', () => {
  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(`file://${__dirname}/main.html`)
  mainWindow.setIcon(`${__dirname}/assets/code.png`);
  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  if (addWindow !== undefined) {
    addWindow.close();
  }

  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add new Todo'
  });

  addWindow.setMenuBarVisibility(false);

  addWindow.loadURL(`file://${__dirname}/add.html`)
}

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        click() {
          createAddWindow();
        }
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({})
}

if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}