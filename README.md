# 🔍 SlayerOSINT — Client-Side & DevSecOps Hardened

[![CI Pipeline](https://github.com/Mdsoare/slayerosint/actions/workflows/ci-pipeline.yml/badge.svg)](https://github.com/Mdsoare/slayerosint/actions/workflows/ci-pipeline.yml)
[![Deploy to GitHub Pages](https://github.com/Mdsoare/slayerosint/actions/workflows/deploy.yml/badge.svg)](https://github.com/Mdsoare/slayerosint/actions/workflows/deploy.yml)
[![Security Rating](https://img.shields.io/badge/Security-DevSecOps%20Hardened-green?style=flat&logo=github)](https://github.com/Mdsoare/slayerosint/security/code-scanning)
![Security: CSP Compliant](https://img.shields.io/badge/Security-CSP--Compliant-success.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-264DE4?style=for-the-badge&logo=stylelint&logoColor=white)
![SAST & SCA](https://img.shields.io/badge/DevSecOps-SAST%20%26%20SCA-red?style=for-the-badge&logo=shield&logoColor=white)

---

Uma aplicação web **100% client-side**, leve e centrada em privacidade para investigações de Inteligência de Fontes Abertas (OSINT), análise forense e extração de dados.

Projetada sob o paradigma **Zero-Trust** e princípios de **Privacy by Design**, a aplicação opera inteiramente no navegador do usuário — **nenhuma consulta, artefato ou dado inserido é enviado para servidores externos ou armazenado na rede**.

---

## Demonstração & Live Access

Acesse a versão estável diretamente via GitHub Pages:  
👉 **[https://mdsoare.github.io/slayerosint/](https://mdsoare.github.io/slayerosint/)**

---

## O Problema e a Solução

Em investigações cibernéticas, perícias digitais e auditorias de segurança, submeter artefatos, alvos ou IOCs (Indicadores de Comprometimento) em utilitários *online* terceirizados representa um risco crítico de vazamento de informações sensíveis, rastreamento indevido e quebra de confidencialidade.

O **SlayerOSINT** resolve essa vulnerabilidade ao realizar toda a extração, higienização, cruzamento e formatação de dados estritamente na memória local do browser, garantindo isolamento total de rede e conformidade com boas práticas de segurança da informação.

---

## Principais Funcionalidades

- ⚡ **Processamento Local Instantâneo:** Extração e manipulação rápida de artefatos OSINT sem dependência de servidores centrais.
- 🧹 **Sanitização e Normalização:** Limpeza automatizada de strings, remoção de caracteres inválidos e validação de padrões em tempo real.
- 🛡️ **Privacidade Absoluta:** Operação em memória local sem requisições de API para terceiros nem persistência em bancos remotos.
- 📥 **Exportação Estruturada:** Utilitários para cópia rápida e download dos resultados processados.
- 🚀 **Build & Bundling Otimizado:** Compilação e minificação via Vite, entregando carregamento ultra-rápido.

---

## Tecnologias Utilizadas

- **Vite:** Bundler de alta performance para gerenciamento de assets e build de produção otimizado.
- **HTML5 Semantic:** Estrutura focada em acessibilidade, usabilidade e navegação intuitiva.
- **CSS3 Moderno:** Layout responsivo e estilizado construído com CSS Grid e Flexbox.
- **Vanilla JavaScript (ES6+):** Manipulação eficiente do DOM e algoritmos otimizados para processamento em memória.

---

## Postura de Segurança (DevSecOps)

O repositório adota uma pipeline rigorosa de DevSecOps integrada ao GitHub Actions, cobrindo SAST, SCA, DAST e validações de integridade:

| Vetor de Risco | Status | Ação / Mitigação Aplicada |
| :--- | :---: | :--- |
| **Data Exfiltration** | 🛡️ Protegido | Processamento 100% Client-Side. Validação estrita de CSP impedindo chamadas externas não autorizadas. |
| **DOM-XSS** | 🛡️ Protegido | Manipulação do DOM segura utilizando estritamente APIs puras (`textContent`, `createElement`). |
| **Secret Leakage** | 🛡️ Protegido | Varredura automatizada contra credenciais e segredos em commits via **TruffleHog** e **Gitleaks**. |
| **Análise Estática (SAST)** | 🛡️ Protegido | Análise profunda de vulnerabilidades via **CodeQL**, **Semgrep** e **Horusec**. |
| **Gestão de Dependências (SCA)** | 🛡️ Protegido | Auditoria contínua de bibliotecas vulneráveis via **npm audit**, **OSV-Scanner** e **Trivy**. |
| **Análise Dinâmica (DAST)** | 🛡️ Protegido | Testes dinâmicos automatizados pós-deploy via **OWASP ZAP** e **Nuclei**. |
| **Linter & Quality** | 🛡️ Protegido | Garantia da qualidade de código via ESLint, Stylelint, HTMLHint e markdownlint. |

---

## Como Executar Localmente

### Pré-requisitos

- Node.js (v20 LTS)
- NPM

### Passos

1. Clone o repositório

   ```bash
   git clone https://github.com/Mdsoare/slayerosint.git
   cd slayerosint
   ```

2. Instale as dependências

    ```bash
    npm ci
    ```

3. Inicie o servidor de desenvolvimento

    ```bash
    npm run dev
    ```
4. Acesse a URL exibida no terminal

    - geralmente `http://localhost:5173/slayerosint/`

---

## 📜 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

*Desenvolvido por **Marcelo Soares** | Especialista em Segurança da Informação e Computação Forense.*