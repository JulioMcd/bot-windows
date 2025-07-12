# 🚀 IA DERIV Avançada - Guia Completo de Instalação

## 📋 Resumo do Projeto

O **IA DERIV Avançada** é um sistema desktop avançado de trading automatizado para a plataforma Deriv, desenvolvido em Electron com tecnologias modernas:

- 🧠 **Q-Learning**: IA que aprende com recompensas
- 🔄 **Inversão Adaptativa**: Sistema que se ajusta automaticamente
- 📈 **Aprendizado Contínuo**: Análise temporal e correlações
- 🖥️ **App Desktop Nativo**: Performance otimizada para Windows
- 🔔 **Notificações Sistema**: Alertas nativos do Windows
- 💾 **Armazenamento Local**: Configurações persistentes
- ⌨️ **Atalhos de Teclado**: Controle completo via hotkeys

---

## 🛠️ Instalação Rápida (Recomendada)

### Opção 1: Script PowerShell Automatizado

1. **Abrir PowerShell como Administrador**
   ```powershell
   # Pressione Win + X e escolha "Windows PowerShell (Admin)"
   ```

2. **Executar script de instalação**
   ```powershell
   # Baixar e executar o script automatizado
   irm https://raw.githubusercontent.com/ia-trading-team/ia-deriv-avancada/main/setup.ps1 | iex
   ```

3. **Aguardar instalação completa** (5-10 minutos)

### Opção 2: Download Direto dos Executáveis

1. **Ir para [Releases](https://github.com/ia-trading-team/ia-deriv-avancada/releases)**
2. **Baixar a versão mais recente:**
   - `IA-DERIV-Avancada-Setup-1.0.0.exe` (Instalador completo)
   - `IA-DERIV-Avancada-Portable-1.0.0.exe` (Versão portátil)
3. **Executar o arquivo baixado**
4. **Seguir o assistente de instalação**

---

## 🔧 Instalação Manual (Desenvolvedores)

### Pré-requisitos
- **Windows 10/11** (64-bit recomendado)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** (opcional) - [Download](https://git-scm.com/)

### Passo a Passo

1. **Clonar/Baixar o Projeto**
   ```bash
   # Via Git
   git clone https://github.com/ia-trading-team/ia-deriv-avancada.git
   cd ia-deriv-avancada
   
   # Ou baixar ZIP e extrair
   ```

2. **Instalar Dependências**
   ```bash
   npm install
   ```

3. **Criar Assets**
   ```bash
   npm run create-assets
   ```

4. **Executar em Desenvolvimento**
   ```bash
   npm start
   # ou para modo desenvolvimento com hot-reload
   npm run dev
   ```

5. **Construir Executável (Opcional)**
   ```bash
   # Windows 64-bit + 32-bit
   npm run build-win
   
   # Apenas 64-bit
   npm run build-win-64
   
   # Apenas versão portátil
   npm run build-portable
   ```

---

## ⚙️ Configuração Inicial

### 1. Obter Token da API Deriv

1. **Acessar** [app.deriv.com/account/api-token](https://app.deriv.com/account/api-token)
2. **Fazer login** na sua conta Deriv
3. **Clicar em "Create New Token"**
4. **Configurar permissões:**
   - ✅ **Read**: Para ler dados da conta
   - ✅ **Trade**: Para executar trades  
   - ✅ **Trading Information**: Para informações de trading
   - ✅ **Payments**: Para transações (opcional)
5. **Nomear o token** (ex: "IA DERIV Desktop")
6. **Copiar o token gerado** (guarde com segurança!)

### 2. Primeira Conexão

1. **Abrir o app IA DERIV Avançada**
2. **Escolher tipo de conta:**
   - 🎮 **DEMO**: Dinheiro virtual (recomendado para testes)
   - 💰 **REAL**: Dinheiro real (apenas após dominar o sistema)
3. **Colar o token de API**
4. **Clicar "Conectar API + IA Avançada"**
5. **Aguardar conexão** (status ficará verde)

### 3. Configuração da IA

1. **Ativar sistemas IA:**
   - 🧠 **Modo IA**: Trades automáticos com Q-Learning
   - ⏱️ **Duração IA**: IA escolhe duração ideal automaticamente
   - 🎛️ **Gerenciamento IA**: IA controla stake e gerencia risco

2. **Configurar Martingale:**
   - **Ativar/Desativar** conforme tolerância ao risco
   - **Stake Base**: Valor inicial das apostas
   - **Nível Máximo**: Até 8 níveis (padrão)

3. **Escolher Símbolo:**
   - **Iniciantes**: Volatility 50 Index (R_50)
   - **Avançados**: Qualquer símbolo disponível

---

## 🎮 Como Usar o Sistema

### Trading Manual

1. **Selecionar símbolo** (ex: R_50)
2. **Definir valor da aposta** (mínimo $0.35)
3. **Escolher duração** (ticks ou minutos)
4. **Clicar RISE (📈) ou FALL (📉)**
5. **Monitorar resultado** na tabela de trades

### Trading Automático

1. **Configurar modo de trading:**
   - **Manual**: Você decide cada trade
   - **Automático**: Sistema decide aleatoriamente
   - **IA Avançada**: IA toma decisões inteligentes

2. **Ativar Auto Trading:**
   - Clicar **"Iniciar Auto"**
   - Sistema executará trades automaticamente
   - Monitorar performance em tempo real

### Funcionalidades da IA

#### 🔍 Analisar Mercado
- Análise técnica avançada
- Identificação de padrões
- Recomendações de entrada

#### 🧠 Sinal Avançado  
- Sinal baseado em Q-Learning
- Inversão adaptativa automática
- Feedback contínuo de aprendizado

#### ⚠️ Avaliar Risco
- Análise de risco em tempo real
- Recomendações de gerenciamento
- Alertas de alto risco

#### 📊 Estatísticas de Aprendizado
- Estados Q-Learning aprendidos
- Performance da inversão adaptativa
- Accuracy do sistema de IA
- Padrões descobertos

---

## ⌨️ Atalhos de Teclado

### Conexão
- `Ctrl + N` - Conectar API
- `Ctrl + D` - Desconectar  
- `Ctrl + ,` - Configurações

### Trading
- `Ctrl + ↑` - Trade CALL (Higher)
- `Ctrl + ↓` - Trade PUT (Lower)  
- `Ctrl + A` - Toggle Auto Trading

### IA Avançada
- `Ctrl + 1` - Analisar Mercado
- `Ctrl + 2` - Sinal Avançado
- `Ctrl + 3` - Avaliar Risco
- `Ctrl + 4` - Stats Q-Learning
- `Ctrl + 5` - Status Inversão
- `Ctrl + Shift + A` - Toggle Modo IA

### Martingale
- `Ctrl + M` - Toggle Martingale
- `Ctrl + R` - Reset Manual

### Interface
- `F5` - Recarregar
- `F11` - Tela Cheia
- `F12` - Developer Tools
- `Ctrl + Plus/Minus` - Zoom

---

## 📊 Métricas e Monitoramento

### Indicadores Principais

- **💰 Saldo**: Saldo atual da conta
- **📈 P&L Hoje**: Lucro/Prejuízo da sessão
- **🎯 Taxa de Acerto**: Percentual de trades ganhos
- **⚡ Trades Hoje**: Total de trades executados
- **⏱️ IA Duração**: Status do controle de duração
- **🎯 Status**: Estado atual do sistema

### Tabela de Trades

Visualização completa de todos os trades:
- **ID**: Identificador único
- **Horário**: Timestamp da execução
- **Símbolo**: Ativo negociado
- **Tipo**: CALL ou PUT
- **Valor**: Stake utilizado
- **Duração**: Tempo do trade
- **Entry**: Preço de entrada
- **Status**: OPEN/WON/LOST
- **P&L**: Lucro/Prejuízo
- **Signal ID**: ID do sinal da IA

---

## ⚠️ Avisos Importantes

### 🚨 DISCLAIMER LEGAL
- **RISCO FINANCEIRO**: Trading envolve risco de perda total do capital
- **EDUCACIONAL**: Software destinado a fins educacionais e de teste
- **SEM GARANTIAS**: Resultados passados não garantem resultados futuros
- **RESPONSABILIDADE**: Use por sua conta e risco

### 🛡️ Recomendações de Segurança

1. **SEMPRE TESTE EM DEMO** antes de usar dinheiro real
2. **NÃO COMPARTILHE** seu token de API
3. **CONFIGURE LIMITES** de perda diária na Deriv
4. **MONITORE REGULARMENTE** as operações
5. **MANTENHA BACKUPS** das configurações importantes
6. **USE VALORES BAIXOS** até dominar o sistema

### 🔧 Troubleshooting Comum

#### ❌ "Erro de Conexão WebSocket"
```bash
# Verificar conectividade
ping ws.derivws.com

# Verificar firewall - adicionar exceção para o app
# Reiniciar aplicação
```

#### ❌ "IA Avançada Não Conecta"  
- App funcionará em modo simulação
- Todas as funcionalidades principais mantidas
- Recomendações baseadas em algoritmos locais

#### ❌ "Token Inválido"
1. Verificar se token foi copiado corretamente
2. Confirmar permissões na Deriv
3. Verificar se token não expirou
4. Gerar novo token se necessário

#### ❌ "Trades Não Executam"
1. Verificar saldo suficiente na conta
2. Confirmar se mercado está aberto
3. Verificar valor mínimo ($0.35)
4. Checar se não há ordem ativa

---

## 📞 Suporte e Comunidade

### 🆘 Suporte Técnico
- 📧 **Email**: suporte@iatrading.com
- 💬 **Discord**: [IA Trading Community](https://discord.gg/iatrading)
- 📱 **Telegram**: [@IADerivSupporte](https://t.me/IADerivSupporte)
- 🐛 **Issues**: [GitHub Issues](https://github.com/ia-trading-team/ia-deriv-avancada/issues)

### 🔗 Links Úteis
- **Deriv Platform**: [app.deriv.com](https://app.deriv.com)
- **API Tokens**: [app.deriv.com/account/api-token](https://app.deriv.com/account/api-token)
- **Documentação Deriv**: [developers.deriv.com](https://developers.deriv.com)
- **Código Fonte**: [GitHub Repository](https://github.com/ia-trading-team/ia-deriv-avancada)

### 🤝 Contribuir
- Abra issues para bugs ou sugestões
- Faça fork e envie pull requests
- Ajude na documentação
- Compartilhe sua experiência

---

## 🎯 Próximos Passos

### Após Instalação
1. ✅ **Conectar com conta DEMO**
2. ✅ **Executar alguns trades manuais**
3. ✅ **Testar funcionalidades da IA**
4. ✅ **Configurar Martingale**
5. ✅ **Experimentar Auto Trading**
6. ✅ **Analisar resultados**
7. ✅ **Ajustar configurações**

### Para Uso Avançado
- Estudar padrões nos dados de aprendizado
- Otimizar configurações baseado na performance
- Desenvolver estratégias personalizadas
- Contribuir com melhorias no código

---

## 🏆 Dicas de Sucesso

### 🧠 Estratégia
- Comece sempre com valores baixos
- Monitore a taxa de acerto da IA
- Ajuste parâmetros baseado na performance
- Diversifique símbolos para reduzir risco

### ⏰ Timing
- Observe horários de maior volatilidade
- Evite horários de baixa liquidez
- Use a análise temporal da IA

### 💰 Gerenciamento
- Nunca invista mais do que pode perder
- Configure stop-loss mental
- Use o Martingale com moderação
- Retire lucros regularmente

---

## 🎉 Conclusão

O **IA DERIV Avançada** representa o estado da arte em trading automatizado, combinando:

- **Inteligência Artificial** de última geração
- **Interface Desktop** intuitiva e poderosa  
- **Sistema de Segurança** robusto e confiável
- **Performance Otimizada** para Windows

Com este guia, você tem todas as informações necessárias para aproveitar ao máximo o potencial do sistema. Lembre-se sempre: **o conhecimento é o seu melhor ativo no trading**.

**🚀 BOA SORTE E BOM TRADING! 🚀**

---

*Última atualização: $(Get-Date -Format 'dd/MM/yyyy')*  
*Versão: 1.0.0*  
*© 2024 IA Trading Team. Todos os direitos reservados.*