# Testes de Performance com K6

Projeto de estudo com testes de performance usando [k6](https://grafana.com/docs/k6/latest/) cobrindo diferentes tipos de teste: smoke, load, stress, soak, breakpoint e testes de browser.

## Pre-requisitos

- [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) instalado
- Chromium (instalado automaticamente pelo k6 nos testes de browser)

## Estrutura do Projeto

```
├── browser/                # Testes de browser (Chromium)
│   └── testeWeb.js
├── smoke/                  # Testes smoke (validacao basica)
│   ├── smoke-geral.js
│   └── smoke-produtos.js
├── load/                   # Testes de carga
│   ├── load-geral.js
│   └── load-produtos.js
├── stress/                 # Testes de stress
│   ├── stress-geral.js
│   └── stress-usuarios.js
├── soak/                   # Testes de resistencia (longa duracao)
│   └── soak-produto.js
├── breakpoint/             # Testes de ponto de ruptura
│   └── breakpoint-usuarios.js
├── thresholds/             # Exemplos de thresholds
├── http/                   # Exemplos de requisicoes HTTP
├── stores/                 # Dados de teste (JSON)
├── utils/                  # Funcoes utilitarias (auth, etc.)
├── primeiro-teste.js
├── crud_produtos.js
├── login.js
├── metricas-customizadas.js
├── groups-tags.js
├── executores.js
└── timings.js
```

## Como Rodar os Testes

### Comando basico

```bash
k6 run <caminho-do-teste>
```

Exemplos:

```bash
# Smoke test
k6 run smoke/smoke-geral.js

# Load test
k6 run load/load-geral.js

# Stress test
k6 run stress/stress-geral.js

# Teste de browser
k6 run browser/testeWeb.js
```

### Usando variaveis de ambiente

Use `-e` ou `--env` para passar variaveis na linha de comando:

```bash
k6 run -e BASE_URL=http://localhost:3000 crud_produtos.js
```

No script, acesse com `__ENV.BASE_URL`:

```javascript
const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
```

#### PowerShell

```powershell
k6 run -e BASE_URL=http://localhost:3000 crud_produtos.js
```

Ou definindo a variavel de ambiente antes:

```powershell
$env:BASE_URL = "http://localhost:3000"; k6 run crud_produtos.js
```

#### Linux / macOS

```bash
BASE_URL=http://localhost:3000 k6 run crud_produtos.js
```

## Web Dashboard

O k6 tem um dashboard web integrado para visualizar as metricas em tempo real.

### Ativando o dashboard

#### PowerShell

```powershell
$env:K6_WEB_DASHBOARD = "true"; k6 run smoke/smoke-geral.js
```

#### Linux / macOS

```bash
K6_WEB_DASHBOARD=true k6 run smoke/smoke-geral.js
```

O dashboard abre automaticamente em **http://127.0.0.1:5665** durante a execucao do teste.

### Exportando o relatorio em HTML

Para salvar o dashboard como arquivo HTML apos o teste:

#### PowerShell

```powershell
$env:K6_WEB_DASHBOARD = "true"; $env:K6_WEB_DASHBOARD_EXPORT = "relatorio.html"; k6 run smoke/smoke-geral.js
```

#### Linux / macOS

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run smoke/smoke-geral.js
```

O arquivo `relatorio.html` sera gerado na pasta atual ao final do teste.

### Combinando dashboard com variaveis de ambiente

#### PowerShell

```powershell
$env:K6_WEB_DASHBOARD = "true"; $env:K6_WEB_DASHBOARD_EXPORT = "relatorio.html"; k6 run -e BASE_URL=http://localhost:3000 crud_produtos.js
```

#### Linux / macOS

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run -e BASE_URL=http://localhost:3000 crud_produtos.js
```

## Tipos de Teste

| Tipo       | Objetivo                                    | Exemplo                          |
|------------|---------------------------------------------|----------------------------------|
| Smoke      | Validar que o sistema funciona com carga minima | `smoke/smoke-geral.js`       |
| Load       | Avaliar performance com carga esperada      | `load/load-geral.js`            |
| Stress     | Encontrar o limite do sistema               | `stress/stress-geral.js`        |
| Soak       | Detectar problemas em execucoes prolongadas | `soak/soak-produto.js`          |
| Breakpoint | Encontrar o ponto de ruptura do sistema     | `breakpoint/breakpoint-usuarios.js` |
| Browser    | Testar fluxos reais no navegador            | `browser/testeWeb.js`           |
