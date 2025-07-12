const { app, BrowserWindow, Menu, shell, ipcMain, dialog, Notification } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Configuração do armazenamento local
const store = new Store({
  name: 'ia-deriv-config',
  defaults: {
    windowBounds: { width: 1400, height: 1000 },
    apiToken: '',
    lastSymbol: 'R_50',
    martingaleSettings: {
      isActive: true,
      baseStake: 1,
      maxLevel: 8
    },
    aiSettings: {
      durationControl: false,
      managementActive: false,
      modeActive: false
    }
  }
});

let mainWindow;
let isDevMode = process.argv.includes('--dev');

// Configuração para desenvolvimento
if (isDevMode) {
  try {
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
    });
  } catch (_) {}
}

function createMainWindow() {
  const { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 1200,
    minHeight: 800,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'IA DERIV Avançada - Sistema de Trading com Q-Learning',
    show: false, // Não mostrar até estar pronto
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false
    },
    titleBarStyle: 'default',
    autoHideMenuBar: false,
    backgroundColor: '#000000',
    darkTheme: true
  });

  // Carregar o arquivo HTML principal
  mainWindow.loadFile('index.html');

  // Mostrar janela quando pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Mostrar notificação de boas-vindas
    if (Notification.isSupported()) {
      new Notification({
        title: '🚀 IA DERIV Avançada',
        body: 'Sistema de Trading com Q-Learning iniciado!',
        icon: path.join(__dirname, 'assets', 'icon.png')
      }).show();
    }

    // Abrir DevTools em modo desenvolvimento
    if (isDevMode) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Salvar posição da janela quando fechada
  mainWindow.on('close', () => {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', bounds);
  });

  // Interceptar links externos
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Prevenir navegação externa
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'file://') {
      event.preventDefault();
      shell.openExternal(navigationUrl);
    }
  });

  return mainWindow;
}

function createApplicationMenu() {
  const template = [
    {
      label: '🚀 IA DERIV',
      submenu: [
        {
          label: 'Sobre',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre IA DERIV Avançada',
              message: 'IA DERIV Avançada v1.0.0',
              detail: 'Sistema de Trading com:\n\n🧠 Q-Learning\n🔄 Inversão Adaptativa\n📈 Aprendizado Contínuo\n🤖 IA Avançada\n\nDesenvolvido com Electron + Deriv API',
              buttons: ['OK']
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Configurações',
          accelerator: 'Ctrl+,',
          click: () => {
            // Enviar evento para a página web
            mainWindow.webContents.send('open-settings');
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: '📊 Trading',
      submenu: [
        {
          label: 'Conectar API',
          accelerator: 'Ctrl+N',
          click: () => {
            mainWindow.webContents.send('connect-api');
          }
        },
        {
          label: 'Desconectar',
          accelerator: 'Ctrl+D',
          click: () => {
            mainWindow.webContents.send('disconnect-api');
          }
        },
        { type: 'separator' },
        {
          label: 'Trade CALL',
          accelerator: 'Ctrl+Up',
          click: () => {
            mainWindow.webContents.send('place-trade', 'CALL');
          }
        },
        {
          label: 'Trade PUT',
          accelerator: 'Ctrl+Down',
          click: () => {
            mainWindow.webContents.send('place-trade', 'PUT');
          }
        },
        { type: 'separator' },
        {
          label: 'Auto Trading ON/OFF',
          accelerator: 'Ctrl+A',
          click: () => {
            mainWindow.webContents.send('toggle-auto-trading');
          }
        }
      ]
    },
    {
      label: '🤖 IA Avançada',
      submenu: [
        {
          label: 'Analisar Mercado',
          accelerator: 'Ctrl+1',
          click: () => {
            mainWindow.webContents.send('ai-analyze');
          }
        },
        {
          label: 'Sinal Avançado',
          accelerator: 'Ctrl+2',
          click: () => {
            mainWindow.webContents.send('ai-advanced-signal');
          }
        },
        {
          label: 'Avaliar Risco',
          accelerator: 'Ctrl+3',
          click: () => {
            mainWindow.webContents.send('ai-risk-assessment');
          }
        },
        { type: 'separator' },
        {
          label: 'Estatísticas Q-Learning',
          accelerator: 'Ctrl+4',
          click: () => {
            mainWindow.webContents.send('ai-qlearning-stats');
          }
        },
        {
          label: 'Status Inversão',
          accelerator: 'Ctrl+5',
          click: () => {
            mainWindow.webContents.send('ai-inversion-status');
          }
        },
        { type: 'separator' },
        {
          label: 'Modo IA ON/OFF',
          accelerator: 'Ctrl+Shift+A',
          click: () => {
            mainWindow.webContents.send('toggle-ai-mode');
          }
        }
      ]
    },
    {
      label: '🎰 Martingale',
      submenu: [
        {
          label: 'Toggle Martingale',
          accelerator: 'Ctrl+M',
          click: () => {
            mainWindow.webContents.send('toggle-martingale');
          }
        },
        {
          label: 'Reset Manual',
          accelerator: 'Ctrl+R',
          click: () => {
            mainWindow.webContents.send('reset-martingale');
          }
        }
      ]
    },
    {
      label: '📈 Visualização',
      submenu: [
        {
          label: 'Recarregar',
          accelerator: 'Ctrl+F5',
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: 'Forçar Recarregamento',
          accelerator: 'Ctrl+Shift+F5',
          click: () => {
            mainWindow.webContents.reloadIgnoringCache();
          }
        },
        { type: 'separator' },
        {
          label: 'Zoom In',
          accelerator: 'Ctrl+Plus',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomLevel();
            mainWindow.webContents.setZoomLevel(currentZoom + 0.5);
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'Ctrl+-',
          click: () => {
            const currentZoom = mainWindow.webContents.getZoomLevel();
            mainWindow.webContents.setZoomLevel(currentZoom - 0.5);
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'Ctrl+0',
          click: () => {
            mainWindow.webContents.setZoomLevel(0);
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          click: () => {
            const isFullScreen = mainWindow.isFullScreen();
            mainWindow.setFullScreen(!isFullScreen);
          }
        },
        {
          label: 'Developer Tools',
          accelerator: 'F12',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: '❓ Ajuda',
      submenu: [
        {
          label: 'Documentação Deriv API',
          click: () => {
            shell.openExternal('https://developers.deriv.com/');
          }
        },
        {
          label: 'Como Obter Token API',
          click: () => {
            shell.openExternal('https://app.deriv.com/account/api-token');
          }
        },
        { type: 'separator' },
        {
          label: 'Suporte',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Suporte IA DERIV Avançada',
              message: 'Suporte e Contato',
              detail: '📧 Email: suporte@iatrading.com\n🌐 Website: https://iatrading.com\n📱 Telegram: @IADerivSupporte\n\n⚠️ AVISO IMPORTANTE:\nEste software é para fins educacionais.\nTrading envolve riscos financeiros.\nUse sempre conta DEMO primeiro.',
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Event handlers do IPC
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-stored-data', (event, key) => {
  return store.get(key);
});

ipcMain.handle('set-stored-data', (event, key, value) => {
  store.set(key, value);
  return true;
});

ipcMain.handle('show-notification', (event, title, body) => {
  if (Notification.isSupported()) {
    new Notification({
      title: title,
      body: body,
      icon: path.join(__dirname, 'assets', 'icon.png')
    }).show();
  }
  return true;
});

ipcMain.handle('show-error-dialog', (event, title, content) => {
  return dialog.showErrorBox(title, content);
});

ipcMain.handle('show-message-dialog', (event, options) => {
  return dialog.showMessageBox(mainWindow, options);
});

ipcMain.handle('open-external-link', (event, url) => {
  shell.openExternal(url);
  return true;
});

// Event listeners do app
app.whenReady().then(() => {
  createMainWindow();
  createApplicationMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Salvar configurações antes de fechar
  if (mainWindow) {
    const bounds = mainWindow.getBounds();
    store.set('windowBounds', bounds);
  }
});

// Prevenir navegação externa no app todo
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Log de inicialização
console.log('🚀 IA DERIV Avançada - Electron App iniciado');
console.log('📁 User Data:', app.getPath('userData'));
console.log('🔧 App Version:', app.getVersion());
console.log('⚡ Electron Version:', process.versions.electron);
console.log('🟢 Node Version:', process.versions.node);
console.log('🌐 Chrome Version:', process.versions.chrome);