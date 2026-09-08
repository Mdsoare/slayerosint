'use strict';

// Proteção contra Clickjacking (Frame Busting)
if (self !== top) {
    top.location = self.location;
}

document.addEventListener('DOMContentLoaded', () => {
    const targetEngineSelect = document.getElementById('targetEngine');
    const globalQueryInput = document.getElementById('globalQueryInput');
    const extensionFilter = document.getElementById('extensionFilter');
    const btnExecute = document.getElementById('btnExecute');
    const btnClear = document.getElementById('btnClear');
    const statusMessage = document.getElementById('statusMessage');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTableBody = document.getElementById('resultsTableBody');

    // Atualiza dinamicamente o estado e o rótulo do botão principal
    function adaptUserActionInterface() {
        const engine = targetEngineSelect.value;
        resultsContainer.style.display = 'none';

        btnExecute.className = 'btn';

        if (engine === 'cloud') {
            btnExecute.classList.add('btn-storage');
            btnExecute.textContent = '⚡ Gerar Escopo Cloud (OSINT)';
        } else if (engine === 'leaks') {
            btnExecute.classList.add('btn-leak');
            btnExecute.textContent = '🚨 Mapear Superfície de Exposição & Leaks';
        } else {
            btnExecute.classList.add('btn-accent');
            btnExecute.textContent = '🔍 Varrer Repositórios Nativos Git';
        }
    }

    // Injeção segura no DOM prevenindo falhas de XSS
    function injectRow(tbody, system, title, url, desc, bgColor, textColor = '#fff', btnText = 'Analisar Fonte') {
        const tr = document.createElement('tr');

        const badgeClass = system.toLowerCase().split('/')[0];
        const tdSys = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `platform-badge bg-${badgeClass}`;
        badge.textContent = system;
        tdSys.appendChild(badge);

        const tdInfo = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = title;
        const descDiv = document.createElement('div');
        descDiv.style.color = 'var(--text-muted)';
        descDiv.style.fontSize = '12px';
        descDiv.style.marginTop = '3px';
        descDiv.textContent = desc;
        tdInfo.appendChild(strong);
        tdInfo.appendChild(descDiv);

        const tdAction = document.createElement('td');
        tdAction.style.textAlign = 'right';

        const actionLink = document.createElement('a');
        actionLink.href = url;
        actionLink.target = '_blank';
        actionLink.rel = 'noopener noreferrer';
        actionLink.className = 'btn';
        actionLink.style.padding = '6px 12px';
        actionLink.style.fontSize = '12px';
        actionLink.style.display = 'inline-block';
        actionLink.style.background = bgColor;
        actionLink.style.color = textColor;
        actionLink.textContent = btnText;

        tdAction.appendChild(actionLink);
        tr.appendChild(tdSys);
        tr.appendChild(tdInfo);
        tr.appendChild(tdAction);
        tbody.appendChild(tr);
    }

    // Engine de Varredura Native Git
    async function searchRepositoriesEngine(query) {
        const ext = extensionFilter.value;
        resultsTableBody.textContent = '';
        resultsContainer.style.display = 'none';
        statusMessage.style.display = 'block';

        let ghQuery = query;
        if (ext) {
            ghQuery += ` extension:${ext}`;
        }

        try {
            const [ghRes, glRes] = await Promise.all([
                fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(ghQuery)}&per_page=15`)
                    .then(r => (r.ok ? r.json() : { items: [] })),
                fetch(`https://gitlab.com/api/v4/projects?search=${encodeURIComponent(query)}&visibility=public&per_page=15`)
                    .then(r => (r.ok ? r.json() : []))
            ]);

            let itemsCount = 0;
            if (ghRes.items) {
                ghRes.items.forEach(r => {
                    itemsCount++;
                    injectRow(resultsTableBody, 'GitHub', r.full_name, r.html_url, 'Repositório Público de Código', 'var(--accent)');
                });
            }

            if (Array.isArray(glRes)) {
                glRes.forEach(r => {
                    itemsCount++;
                    injectRow(resultsTableBody, 'GitLab', r.path_with_namespace, r.web_url, 'Projeto Público de Código', 'var(--accent)');
                });
            }

            statusMessage.style.display = 'none';
            if (itemsCount > 0) {
                resultsContainer.style.display = 'block';
            } else {
                alert('Nenhum artefato Git localizado.');
            }
        } catch {
            statusMessage.style.display = 'none';
            alert('Falha ao comunicar com os endpoints de pesquisa.');
        }
    }

    // Engine Cloud Dorking
    function executeCloudDorking(query) {
        resultsTableBody.textContent = '';

        const structures = [
            { name: 'Google Drive', site: 'drive.google.com', desc: 'Documentos e pastas corporativas indexadas publicamente' },
            { name: 'Dropbox Shared', site: 'dropbox.com/sh', desc: 'Diretórios e links de download direto compartilhados' },
            { name: 'OneDrive Public', site: 'onedrive.live.com', desc: 'Armazenamento em nuvem pessoal exposto nos buscadores' },
            { name: 'SharePoint Server', site: 'sharepoint.com', desc: 'Intranets e repositórios documentais de organizações' }
        ];

        structures.forEach(s => {
            const dork = `site:${s.site} "${query}"`;
            const url = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;
            injectRow(resultsTableBody, 'Cloud', `${s.name} [${query}]`, url, s.desc, 'var(--storage-color)', '#000', 'Pesquisar Alvo');
        });

        resultsContainer.style.display = 'block';
    }

    // Engine Leaks & Infraestrutura
    function executeLeakAndInfraDorking(query) {
        resultsTableBody.textContent = '';

        const leakVectors = [
            { type: 'Pastebin Hunter', url: `https://www.google.com/search?q=${encodeURIComponent(`site:pastebin.com "${query}"`)}`, desc: 'Varre dumps de senhas, logs de erro e códigos colados publicamente.' },
            { type: 'Trello Boards', url: `https://www.google.com/search?q=${encodeURIComponent(`site:trello.com "${query}"`)}`, desc: 'Identifica quadros de projetos corporativos expostos sem controle de privacidade.' },
            { type: 'Shodan Engine', url: `https://www.shodan.io/search?query=${encodeURIComponent(query)}`, desc: 'Localiza IPs e servidores ativos na internet respondendo com este termo no cabeçalho.' },
            { type: 'Censys Intel', url: `https://search.censys.io/search?resource=hosts&q=${encodeURIComponent(query)}`, desc: 'Audita certificados digitais SSL e portas de infraestrutura associadas ao termo.' },
            { type: 'Telegram Chats', url: `https://www.google.com/search?q=${encodeURIComponent(`site:t.me "${query}"`)}`, desc: 'Busca menções em canais ou grupos públicos do Telegram (comum em monitoramento de ameaças).' }
        ];

        leakVectors.forEach(v => {
            injectRow(resultsTableBody, 'Leak/Infra', v.type, v.url, v.desc, 'var(--leak-color)', '#fff', 'Auditar Canal');
        });

        resultsContainer.style.display = 'block';
    }

    // Mapeamento de Ação Principal
    function handleExecution() {
        const query = globalQueryInput.value.trim();
        if (!query) {
            alert('Insira um termo/alvo válido para auditoria.');
            return;
        }

        const engine = targetEngineSelect.value;
        if (engine === 'cloud') {
            executeCloudDorking(query);
        } else if (engine === 'leaks') {
            executeLeakAndInfraDorking(query);
        } else {
            searchRepositoriesEngine(query);
        }
    }

    // Reset completo dos filtros e área de resultados
    function clearForm() {
        globalQueryInput.value = '';
        extensionFilter.value = '';
        targetEngineSelect.value = 'git';
        resultsTableBody.textContent = '';
        resultsContainer.style.display = 'none';
        statusMessage.style.display = 'none';
        adaptUserActionInterface();
    }

    // Registros de Eventos
    targetEngineSelect.addEventListener('change', adaptUserActionInterface);
    btnExecute.addEventListener('click', handleExecution);
    btnClear.addEventListener('click', clearForm);

    adaptUserActionInterface();
});