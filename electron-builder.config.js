const { version } = require('./package.json');

module.exports = {
  appId: 'com.iatrading.deriv-avancada',
  productName: 'IA DERIV Avançada',
  
  // Metadados
  copyright: 'Copyright © 2024 IA Trading Team',
  
  // Diretórios
  directories: {
    output: 'dist',
    buildResources: 'build'
  },
  
  // Arquivos a incluir
  files: [
    '**/*',
    '!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}',
    '!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}',
    '!**/node_modules/*.d.ts',
    '!**/node_modules/.bin',
    '!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}',
    '!.editorconfig',
    '!**/._*',
    '!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}',
    '!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}',
    '!**/{appveyor.yml,.travis.yml,circle.yml}',
    '!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}',
    '!src/**/*',
    '!docs/**/*',
    '!screenshots/**/*',
    '!*.md',
    '!.github/**/*'
  ],
  
  // Configuração Windows
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      },
      {
        target: 'portable',
        arch: ['x64']
      },
      {
        target: 'zip',
        arch: ['x64', 'ia32']
      }
    ],
    icon: 'assets/icon.ico',
    requestedExecutionLevel: 'asInvoker',
    publisherName: 'IA Trading Team',
    verifyUpdateCodeSignature: false,
    
    // Configurações específicas do Windows
    fileAssociations: [
      {
        ext: 'iaconfig',
        name: 'IA DERIV Config',
        description: 'Arquivo de configuração IA DERIV',
        role: 'Editor'
      }
    ],
    
    // Protocolos personalizados
    protocols: [
      {
        name: 'ia-deriv',
        schemes: ['ia-deriv']
      }
    ]
  },
  
  // Configuração NSIS (Instalador Windows)
  nsis: {
    oneClick: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'IA DERIV Avançada',
    
    // Páginas do instalador
    installerIcon: 'assets/icon.ico',
    uninstallerIcon: 'assets/icon.ico',
    installerHeaderIcon: 'assets/icon.ico',
    installerSidebar: 'assets/installer-sidebar.bmp',
    uninstallerSidebar: 'assets/uninstaller-sidebar.bmp',
    
    // Textos do instalador
    installerHeader: 'IA DERIV Avançada',
    installerHeaderDescription: 'Sistema de Trading com IA Avançada',
    
    // Licença
    license: 'LICENSE.txt',
    
    // Configurações avançadas
    deleteAppDataOnUninstall: false,
    menuCategory: 'Trading & Finance',
    
    // Scripts personalizados NSIS
    include: 'build/installer.nsh',
    
    // Registro Windows
    perMachine: false,
    runAfterFinish: true,
    
    // Compressão
    compression: 'maximum',
    
    // Idiomas
    installerLanguages: ['en_US', 'pt_BR'],
    
    // Recursos adicionais
    artifactName: 'IA-DERIV-Avancada-Setup-${version}.${ext}',
    
    // Verificações
    differentialPackage: false
  },
  
  // Configuração Portable
  portable: {
    artifactName: 'IA-DERIV-Avancada-Portable-${version}.${ext}',
    requestedExecutionLevel: 'asInvoker',
    unpackDirName: 'IA-DERIV-Avancada'
  },
  
  // Configuração ZIP
  zip: {
    compression: 'maximum'
  },
  
  // Auto-updater (se necessário no futuro)
  publish: {
    provider: 'generic',
    url: 'https://releases.iatrading.com/'
  },
  
  // Assinatura de código (para releases oficiais)
  forceCodeSigning: false,
  
  // Configurações de build
  buildDependenciesFromSource: false,
  nodeGypRebuild: false,
  npmRebuild: true,
  
  // Configuração de compressão
  compression: 'maximum',
  
  // Configurações de segurança
  electronDownload: {
    cache: './electron-cache'
  },
  
  // Metadados adicionais
  extraMetadata: {
    main: 'main.js',
    homepage: 'https://iatrading.com',
    author: {
      name: 'IA Trading Team',
      email: 'dev@iatrading.com',
      url: 'https://iatrading.com'
    },
    repository: {
      type: 'git',
      url: 'https://github.com/ia-trading-team/ia-deriv-avancada.git'
    },
    bugs: {
      url: 'https://github.com/ia-trading-team/ia-deriv-avancada/issues'
    },
    keywords: [
      'trading',
      'deriv',
      'ai',
      'q-learning',
      'automated-trading',
      'desktop-app',
      'electron',
      'windows'
    ]
  },
  
  // Hooks de build
  beforeBuild: async (context) => {
    console.log('🔧 Preparando build...');
    // Verificações pré-build
  },
  
  afterPack: async (context) => {
    console.log('📦 Empacotamento concluído');
    // Pós-processamento
  },
  
  afterAllArtifactBuild: async (buildResult) => {
    console.log('✅ Build concluído com sucesso!');
    console.log('📁 Arquivos gerados:', buildResult.artifactPaths);
    return buildResult.artifactPaths;
  }
};