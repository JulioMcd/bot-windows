# IA DERIV Avançada - Script de Instalação Automatizada
# PowerShell Script para Windows 10/11

param(
    [switch]$SkipNodeCheck,
    [switch]$DevMode,
    [switch]$BuildOnly,
    [string]$InstallPath = ""
)

# Configurações
$AppName = "IA DERIV Avançada"
$MinNodeVersion = "18.0.0"
$RepoUrl = "https://github.com/ia-trading-team/ia-deriv-avancada.git"

# Cores para output
$Red = [System.ConsoleColor]::Red
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Blue
$White = [System.ConsoleColor]::White

function Write-ColoredOutput {
    param($Message, $Color = $White)
    Write-Host $Message -ForegroundColor $Color
}

function Write-Header {
    param($Title)
    Write-Host ""
    Write-ColoredOutput "========================================" $Blue
    Write-ColoredOutput "    $Title" $Blue
    Write-ColoredOutput "========================================" $Blue
    Write-Host ""
}

function Test-NodeVersion {
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            $version = $nodeVersion.TrimStart('v')
            $currentVersion = [System.Version]$version
            $minVersion = [System.Version]$MinNodeVersion
            
            if ($currentVersion -ge $minVersion) {
                Write-ColoredOutput "✅ Node.js $nodeVersion encontrado" $Green
                return $true
            } else {
                Write-ColoredOutput "❌ Node.js versão $nodeVersion é muito antiga (mínimo: $MinNodeVersion)" $Red
                return $false
            }
        }
    } catch {
        Write-ColoredOutput "❌ Node.js não encontrado" $Red
        return $false
    }
}

function Install-NodeJS {
    Write-Header "Instalando Node.js"
    
    $downloadUrl = "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi"
    $installerPath = "$env:TEMP\nodejs-installer.msi"
    
    Write-ColoredOutput "📥 Baixando Node.js..." $Yellow
    try {
        Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
        Write-ColoredOutput "✅ Download concluído" $Green
        
        Write-ColoredOutput "🔧 Instalando Node.js..." $Yellow
        Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait
        
        # Atualizar PATH
        $env:PATH = [System.Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH", "User")
        
        # Verificar instalação
        Start-Sleep -Seconds 3
        if (Test-NodeVersion) {
            Write-ColoredOutput "✅ Node.js instalado com sucesso!" $Green
            Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
            return $true
        } else {
            Write-ColoredOutput "❌ Falha na instalação do Node.js" $Red
            return $false
        }
    } catch {
        Write-ColoredOutput "❌ Erro ao instalar Node.js: $($_.Exception.Message)" $Red
        return $false
    }
}

function Test-GitInstalled {
    try {
        $gitVersion = git --version 2>$null
        if ($gitVersion) {
            Write-ColoredOutput "✅ Git encontrado: $gitVersion" $Green
            return $true
        }
    } catch {
        Write-ColoredOutput "⚠️ Git não encontrado (opcional)" $Yellow
        return $false
    }
}

function New-ProjectDirectory {
    if ($InstallPath -eq "") {
        $InstallPath = "$env:USERPROFILE\Desktop\IA-DERIV-Avancada"
    }
    
    Write-ColoredOutput "📁 Criando diretório: $InstallPath" $Yellow
    
    if (Test-Path $InstallPath) {
        $response = Read-Host "Diretório já existe. Sobrescrever? (s/N)"
        if ($response -notmatch '^[sS]') {
            Write-ColoredOutput "❌ Instalação cancelada pelo usuário" $Red
            exit 1
        }
        Remove-Item $InstallPath -Recurse -Force
    }
    
    New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null
    Set-Location $InstallPath
    
    Write-ColoredOutput "✅ Diretório criado: $InstallPath" $Green
    return $InstallPath
}

function Install-Dependencies {
    Write-Header "Instalando Dependências"
    
    Write-ColoredOutput "📦 Executando npm install..." $Yellow
    
    try {
        # Configurar npm para melhor performance
        npm config set fund false
        npm config set audit false
        
        # Instalar dependências
        npm install --no-optional --no-fund --no-audit
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColoredOutput "✅ Dependências instaladas com sucesso!" $Green
            return $true
        } else {
            Write-ColoredOutput "❌ Falha na instalação das dependências" $Red
            return $false
        }
    } catch {
        Write-ColoredOutput "❌ Erro ao instalar dependências: $($_.Exception.Message)" $Red
        return $false
    }
}

function Build-Application {
    Write-Header "Construindo Aplicação"
    
    Write-ColoredOutput "🔧 Criando assets..." $Yellow
    npm run create-assets
    
    if ($LASTEXITCODE -ne 0) {
        Write-ColoredOutput "❌ Falha ao criar assets" $Red
        return $false
    }
    
    Write-ColoredOutput "🏗️ Construindo aplicação Windows..." $Yellow
    npm run build-win
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColoredOutput "✅ Build concluído com sucesso!" $Green
        
        # Listar arquivos gerados
        $distPath = ".\dist"
        if (Test-Path $distPath) {
            Write-ColoredOutput "📁 Arquivos gerados em: $distPath" $Green
            Get-ChildItem $distPath -Filter "*.exe" | ForEach-Object {
                $size = [math]::Round($_.Length / 1MB, 2)
                Write-ColoredOutput "   📦 $($_.Name) ($size MB)" $White
            }
        }
        return $true
    } else {
        Write-ColoredOutput "❌ Falha no build da aplicação" $Red
        return $false
    }
}

function Test-Application {
    Write-Header "Testando Aplicação"
    
    Write-ColoredOutput "🧪 Executando testes básicos..." $Yellow
    
    # Verificar se o executável foi criado
    $exePath = ".\dist\IA-DERIV-Avancada-Setup-*.exe"
    $installerFiles = Get-ChildItem $exePath -ErrorAction SilentlyContinue
    
    if ($installerFiles.Count -gt 0) {
        Write-ColoredOutput "✅ Instalador criado com sucesso!" $Green
        
        # Verificar integridade básica
        $installer = $installerFiles[0]
        if ($installer.Length -gt 50MB) {
            Write-ColoredOutput "✅ Tamanho do instalador OK ($([math]::Round($installer.Length / 1MB, 2)) MB)" $Green
        } else {
            Write-ColoredOutput "⚠️ Instalador parece pequeno ($([math]::Round($installer.Length / 1MB, 2)) MB)" $Yellow
        }
        
        return $true
    } else {
        Write-ColoredOutput "❌ Instalador não encontrado" $Red
        return $false
    }
}

function Show-Instructions {
    Write-Header "Instalação Concluída!"
    
    Write-ColoredOutput "🎉 $AppName foi construído com sucesso!" $Green
    Write-Host ""
    
    Write-ColoredOutput "📁 Localização dos arquivos:" $Blue
    Write-ColoredOutput "   Projeto: $(Get-Location)" $White
    Write-ColoredOutput "   Executáveis: $(Get-Location)\dist\" $White
    Write-Host ""
    
    Write-ColoredOutput "🚀 Como usar:" $Blue
    Write-ColoredOutput "   1. Navegue até a pasta 'dist'" $White
    Write-ColoredOutput "   2. Execute 'IA-DERIV-Avancada-Setup-*.exe' para instalar" $White
    Write-ColoredOutput "   3. Ou use 'IA-DERIV-Avancada-Portable-*.exe' sem instalação" $White
    Write-Host ""
    
    Write-ColoredOutput "⚙️ Para desenvolvimento:" $Blue
    Write-ColoredOutput "   • npm start          - Executar em modo desenvolvimento" $White
    Write-ColoredOutput "   • npm run dev        - Executar com hot-reload" $White
    Write-ColoredOutput "   • npm run build-win  - Reconstruir executáveis" $White
    Write-Host ""
    
    Write-ColoredOutput "🔗 Links úteis:" $Blue
    Write-ColoredOutput "   • Token API: https://app.deriv.com/account/api-token" $White
    Write-ColoredOutput "   • Documentação: README.md" $White
    Write-Host ""
    
    Write-ColoredOutput "⚠️ IMPORTANTE:" $Yellow
    Write-ColoredOutput "   • Use sempre conta DEMO para testes" $White
    Write-ColoredOutput "   • Trading envolve riscos financeiros" $White
    Write-ColoredOutput "   • Leia a documentação antes de usar" $White
    Write-Host ""
}

function Main {
    Write-Header "$AppName - Instalação Automatizada"
    
    Write-ColoredOutput "🖥️ Sistema: Windows $(if ([Environment]::Is64BitOperatingSystem) {'64-bit'} else {'32-bit'})" $Blue
    Write-ColoredOutput "📅 Data: $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')" $Blue
    Write-ColoredOutput "👤 Usuário: $env:USERNAME" $Blue
    Write-Host ""
    
    # Verificar Node.js
    if (-not $SkipNodeCheck) {
        Write-Header "Verificando Pré-requisitos"
        
        if (-not (Test-NodeVersion)) {
            $response = Read-Host "Deseja instalar Node.js automaticamente? (S/n)"
            if ($response -notmatch '^[nN]') {
                if (-not (Install-NodeJS)) {
                    Write-ColoredOutput "❌ Não foi possível instalar Node.js. Instalação abortada." $Red
                    exit 1
                }
            } else {
                Write-ColoredOutput "❌ Node.js é obrigatório. Instale manualmente de https://nodejs.org/" $Red
                exit 1
            }
        }
        
        Test-GitInstalled | Out-Null
    }
    
    # Criar diretório do projeto
    $projectPath = New-ProjectDirectory
    
    # Criar arquivos do projeto
    Write-Header "Criando Arquivos do Projeto"
    
    # Criar package.json
    $packageJson = @"
{
  "name": "ia-deriv-avancada",
  "version": "1.0.0",
  "description": "IA DERIV Avançada - Sistema de Trading com Q-Learning + Inversão Adaptativa",
  "main": "main.js",
  "author": "IA Trading Team",
  "license": "MIT",
  "homepage": ".",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --dev",
    "build": "electron-builder",
    "build-win": "electron-builder --win",
    "create-assets": "node scripts/create-assets.js",
    "setup": "npm install && npm run create-assets"
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  },
  "dependencies": {
    "electron-store": "^8.1.0",
    "ws": "^8.14.2"
  }
}
"@
    
    Set-Content -Path "package.json" -Value $packageJson -Encoding UTF8
    Write-ColoredOutput "✅ package.json criado" $Green
    
    # Criar estrutura de diretórios
    New-Item -ItemType Directory -Path "assets" -Force | Out-Null
    New-Item -ItemType Directory -Path "scripts" -Force | Out-Null
    Write-ColoredOutput "✅ Estrutura de diretórios criada" $Green
    
    # Instalar dependências
    if (-not (Install-Dependencies)) {
        Write-ColoredOutput "❌ Falha na instalação. Verifique sua conexão com a internet." $Red
        exit 1
    }
    
    # Build da aplicação (se não for apenas setup)
    if (-not $BuildOnly -or $BuildOnly) {
        if (-not (Build-Application)) {
            Write-ColoredOutput "❌ Falha no build da aplicação" $Red
            exit 1
        }
        
        # Testar aplicação
        if (Test-Application) {
            Show-Instructions
        }
    }
    
    # Abrir pasta no explorer se não for modo dev
    if (-not $DevMode) {
        Start-Process explorer.exe -ArgumentList $projectPath
    }
    
    Write-ColoredOutput "🎯 Instalação concluída com sucesso!" $Green
}

# Verificar se está executando como administrador para algumas operações
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-ColoredOutput "ℹ️ Executando sem privilégios administrativos (normal)" $Blue
}

# Capturar erros não tratados
trap {
    Write-ColoredOutput "❌ Erro não tratado: $($_.Exception.Message)" $Red
    Write-ColoredOutput "📍 Linha: $($_.InvocationInfo.ScriptLineNumber)" $Red
    exit 1
}

# Executar instalação
try {
    Main
} catch {
    Write-ColoredOutput "❌ Erro durante a instalação: $($_.Exception.Message)" $Red
    exit 1
}

Write-Host ""
Write-ColoredOutput "Pressione qualquer tecla para continuar..." $Blue
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")