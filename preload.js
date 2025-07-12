const { contextBridge, ipcRenderer } = require('electron');

// API segura para a aplicação web
contextBridge.exposeInMainWorld('electronAPI', {
  // Informações do app
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Armazenamento local seguro
  getStoredData: (key) => ipcRenderer.invoke('get-stored-data', key),
  setStoredData: (key, value) => ipcRenderer.invoke('set-stored-data', key, value),
  
  // Notificações nativas
  showNotification: (title, body) => ipcRenderer.invoke('show-notification', title, body),
  
  // Diálogos do sistema
  showErrorDialog: (title, content) => ipcRenderer.invoke('show-error-dialog', title, content),
  showMessageDialog: (options) => ipcRenderer.invoke('show-message-dialog', options),
  
  // Links externos
  openExternalLink: (url) => ipcRenderer.invoke('open-external-link', url),
  
  // Eventos do menu para a página web
  onMenuAction: (callback) => {
    const validEvents = [
      'connect-api',
      'disconnect-api', 
      'place-trade',
      'toggle-auto-trading',
      'ai-analyze',
      'ai-advanced-signal',
      'ai-risk-assessment',
      'ai-qlearning-stats',
      'ai-inversion-status',
      'toggle-ai-mode',
      'toggle-martingale',
      'reset-martingale',
      'open-settings'
    ];
    
    validEvents.forEach(event => {
      ipcRenderer.on(event, (e, ...args) => callback(event, ...args));
    });
  },
  
  // Remover listeners
  removeAllListeners: () => {
    const validEvents = [
      'connect-api',
      'disconnect-api',
      'place-trade', 
      'toggle-auto-trading',
      'ai-analyze',
      'ai-advanced-signal',
      'ai-risk-assessment',
      'ai-qlearning-stats',
      'ai-inversion-status',
      'toggle-ai-mode',
      'toggle-martingale',
      'reset-martingale',
      'open-settings'
    ];
    
    validEvents.forEach(event => {
      ipcRenderer.removeAllListeners(event);
    });
  }
});

// API para configurações específicas do trading
contextBridge.exposeInMainWorld('tradingConfig', {
  // Configurações persistentes
  saveApiToken: (token) => ipcRenderer.invoke('set-stored-data', 'apiToken', token),
  getApiToken: () => ipcRenderer.invoke('get-stored-data', 'apiToken'),
  
  saveLastSymbol: (symbol) => ipcRenderer.invoke('set-stored-data', 'lastSymbol', symbol),
  getLastSymbol: () => ipcRenderer.invoke('get-stored-data', 'lastSymbol'),
  
  saveMartingaleSettings: (settings) => ipcRenderer.invoke('set-stored-data', 'martingaleSettings', settings),
  getMartingaleSettings: () => ipcRenderer.invoke('get-stored-data', 'martingaleSettings'),
  
  saveAISettings: (settings) => ipcRenderer.invoke('set-stored-data', 'aiSettings', settings),
  getAISettings: () => ipcRenderer.invoke('get-stored-data', 'aiSettings'),
  
  saveWindowBounds: (bounds) => ipcRenderer.invoke('set-stored-data', 'windowBounds', bounds),
  getWindowBounds: () => ipcRenderer.invoke('get-stored-data', 'windowBounds'),
  
  // Trading session data
  saveSessionStats: (stats) => ipcRenderer.invoke('set-stored-data', 'sessionStats', stats),
  getSessionStats: () => ipcRenderer.invoke('get-stored-data', 'sessionStats'),
  
  saveTradingHistory: (history) => ipcRenderer.invoke('set-stored-data', 'tradingHistory', history),
  getTradingHistory: () => ipcRenderer.invoke('get-stored-data', 'tradingHistory'),
  
  // AI data
  saveAIAdvancedData: (data) => ipcRenderer.invoke('set-stored-data', 'aiAdvancedData', data),
  getAIAdvancedData: () => ipcRenderer.invoke('get-stored-data', 'aiAdvancedData')
});

// Logs de debug para desenvolvimento
console.log('🔗 Preload script carregado');
console.log('🛡️ Context bridge configurado com segurança');
console.log('📡 APIs expostas: electronAPI, tradingConfig');