// ── DADOS DOS COMBOS ──
const COMBOS = {
  UNO:    { mens: 4500,  alu: 1200 },
  DUO:    { mens: 7200,  alu: 1800 },
  TRIPLE: { mens: 10200, alu: 2400 },
  PRIME:  { mens: 13500, alu: 3000 },
  ELITE:  { mens: 17000, alu: 3600 },
};

const BASE       = 0.005;
const BONUS      = 0.015;
const CSS_SPLIT  = 0.25;
const COMBOS_PENDENTES = [];

const CATALOGO = {
  UNO: {
    tag: "Combo Entrada", nome: "UNO",
    categorias: [
      { nome: "Cardio", itens: [["Esteira Olímpica Professional","×1"],["Bicicleta Spinning Magnética","×1"]] },
      { nome: "Máquinas de Força", itens: [["Dual Cable Crossover","×1"]] },
      { nome: "Pesos Livres", itens: [["Halteres 1–10kg","×1"],["Anilhas variadas","×1"]] },
      { nome: "Acessórios", itens: [["Step Ajustável","×1"],["Colchonetes","×1"],["Tornozeleira Polia","×1"]] },
    ]
  },
  DUO: {
    tag: "Combo Intermediário", nome: "DUO",
    categorias: [
      { nome: "Cardio", itens: [["Esteira Olímpica Professional","×2"],["Bicicleta Spinning Magnética","×2"]] },
      { nome: "Máquinas de Força", itens: [["Dual Cable Crossover","×1"],["Supino Articulado","×1"]] },
      { nome: "Pesos Livres", itens: [["Halteres 1–15kg","×1"],["Anilhas variadas","×1"],["Barra Olímpica","×1"]] },
      { nome: "Acessórios", itens: [["Step Ajustável","×2"],["Colchonetes","×2"],["Tornozeleira Polia","×1"]] },
    ]
  },
  TRIPLE: {
    tag: "Combo Avançado", nome: "TRIPLE",
    categorias: [
      { nome: "Cardio", itens: [["Esteira Olímpica Professional","×3"],["Bicicleta Spinning Magnética","×2"],["Elíptico","×1"]] },
      { nome: "Máquinas de Força", itens: [["Dual Cable Crossover","×2"],["Supino Articulado","×1"],["Leg Press","×1"]] },
      { nome: "Pesos Livres", itens: [["Halteres 1–20kg","×1"],["Anilhas variadas","×1"],["Barra Olímpica","×2"]] },
      { nome: "Acessórios", itens: [["Step Ajustável","×2"],["Colchonetes","×4"],["Tornozeleira Polia","×2"]] },
    ]
  },
  PRIME: {
    tag: "Combo Premium", nome: "PRIME",
    categorias: [
      { nome: "Cardio", itens: [["Esteira Olímpica Professional","×4"],["Bicicleta Spinning Magnética","×3"],["Elíptico","×2"]] },
      { nome: "Máquinas de Força", itens: [["Dual Cable Crossover","×2"],["Supino Articulado","×2"],["Leg Press","×1"],["Puxador Alto/Remada Baixa","×1"]] },
      { nome: "Pesos Livres", itens: [["Halteres 1–25kg","×1"],["Anilhas variadas","×2"],["Barra Olímpica","×2"]] },
      { nome: "Acessórios", itens: [["Step Ajustável","×3"],["Colchonetes","×6"],["Tornozeleira Polia","×2"]] },
    ]
  },
  ELITE: {
    tag: "Combo Elite", nome: "ELITE",
    categorias: [
      { nome: "Cardio", itens: [["Esteira Olímpica Professional","×5"],["Bicicleta Spinning Magnética","×4"],["Elíptico","×3"],["Remo Indoor","×1"]] },
      { nome: "Máquinas de Força", itens: [["Dual Cable Crossover","×3"],["Supino Articulado","×2"],["Leg Press","×2"],["Puxador Alto/Remada Baixa","×2"],["Voador Peitoral","×1"]] },
      { nome: "Pesos Livres", itens: [["Halteres 1–30kg","×1"],["Anilhas variadas","×2"],["Barra Olímpica","×3"],["Barra W","×1"]] },
      { nome: "Acessórios", itens: [["Step Ajustável","×4"],["Colchonetes","×8"],["Tornozeleira Polia","×2"],["Corda de Pular","×4"]] },
    ]
  },
};

// ── CLOUDCONVERT (mover para backend após testes) ──
const CC_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTU0N2E1MTM0ZjkyMTcyMDM0YTVhNWMxMGVkNTAwZDU1OTllMzExMmQzYmM1ZTAyOWZkZmVmMGZlOGM4NGYyZWM0ZmYzMzMzNDE5OWYyOTciLCJpYXQiOjE3ODIyNDQ5MDMuNzg4NDM1LCJuYmYiOjE3ODIyNDQ5MDMuNzg4NDM3LCJleHAiOjQ5Mzc5MTg1MDMuNzgyODMsInN1YiI6Ijc2MDgxNzM4Iiwic2NvcGVzIjpbInRhc2sucmVhZCIsInRhc2sud3JpdGUiXX0.F-UpVeBsx7MsWlaMosNw_TtT_6HjZjtAkGpa8p3MInY_NjTiEYWyHwpf2rhKa1TyHaVOyEOBia3bebuYvJUajS9gPOVQv85oIcYBQQHc6MNDR6ug80KOIX3Uzb2yj3T-g5GIq4s7duTYL3ZItM0Emn-bjlIuBkjl2yiGh_6EA8piW9J-oyDBKauCSFx9xi-WJg96b7V2Vt0wSJfSNM2-OubeUS8UOMTP2HTIZb8vhOfTv8ex_6H-CRDn0zPCbpoZnd1DYaXnL1t9oPD9l2lu-aF6fj9YIMpBjD49v6FJzx28C9yEPc0mfSbRekpnI0i4-FfQK59YDr5TGm4o0rR69reln6LK-Td431UK-y1-xqKOXKca5km8fcLZtKSM82JjEfbJtPwCgZdSeMWHWL-7R9y0DDSqP9b-j4Mv2upY7ORN0bJjJVXllAarofOjaICGcjSF2jJbypLGEaYV2ZVU_xjHgPPhIUPbu07g-bB1R7NEm58Q0VBAIBukhuYoP26rCWCy68Uoa3_sWjOP8cScu-AHTvaksBxlG1I5N-2hwPlSCJBKzUIVmKEmNBNdsoOgo9fGuk5Zn5lsfbXkDHMztbkKOaNGGxuL6Qo808NpQTJhrR1DxdLXZavqrAWlUjA8tyvYvlpAuaCrONuO2omN3YBrdYC3EZaDjaCcw7jdaRk';

let promoOn = false;

function togglePromo() {
  promoOn = !promoOn;
  document.getElementById('switchPill').classList.toggle('on', promoOn);
  document.getElementById('promoToggleRow').classList.toggle('ativo', promoOn);
  document.getElementById('promoCampos').classList.toggle('aberto', promoOn);
  atualizar();
}

function fmt(v) {
  return 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function construirTabelaRef(cont, aptos) {
  const corpo = document.getElementById('tabelaRefBody');
  const comboAtivo = document.getElementById('combo').value;
  corpo.innerHTML = '';
  Object.entries(COMBOS).forEach(([nome, d]) => {
    const mensCli = d.mens - (cont === 'NAO' ? d.alu : 0);
    const minApto = aptos > 0 ? mensCli / aptos : 0;
    const tr = document.createElement('tr');
    if (nome === comboAtivo) tr.classList.add('ativo');
    tr.innerHTML = `<td>${nome}</td><td>${fmt(mensCli)}</td><td>${aptos > 0 ? fmt(minApto) : '—'}</td>`;
    corpo.appendChild(tr);
  });
}

function setVazio() {
  document.getElementById('statusBadge').className = 'status-badge status-vazio';
  document.getElementById('statusBadge').textContent = '← Preencha os campos para simular';
  document.getElementById('prevPremiacao').className = 'preview-value muted';
  document.getElementById('prevPremiacao').textContent = '—';
  document.getElementById('prevMensTotal').className = 'preview-value muted';
  document.getElementById('prevMensTotal').textContent = '—';
}

function atualizar() {
  const combo   = document.getElementById('combo').value;
  const prazo   = parseInt(document.getElementById('prazo').value);
  const cont    = document.getElementById('container').value;
  const aptos   = parseFloat(document.getElementById('aptos').value) || 0;
  const vApto   = parseFloat(document.getElementById('valorApto').value);
  const mPromo  = parseFloat(document.getElementById('mesesPromo').value) || 0;
  const mPromoV = parseFloat(document.getElementById('mensPromo').value) || 0;

  const d = COMBOS[combo];
  const mensCli = d.mens - (cont === 'NAO' ? d.alu : 0);
  const recLiq  = d.mens - d.alu;
  const minApto = aptos > 0 ? mensCli / aptos : 0;

  document.getElementById('minValDisplay').textContent = aptos > 0 ? fmt(minApto) : '—';
  construirTabelaRef(cont, aptos);

  if (!vApto || aptos === 0) { setVazio(); return; }

  const mensNeg = vApto * aptos;
  let contNeg;
  if (promoOn && mPromo > 0 && mPromoV > 0) {
    const mensPromoTotal = mPromoV * aptos;
    contNeg = (mPromo * mensPromoTotal) + ((prazo - mPromo) * mensNeg);
  } else {
    contNeg = mensNeg * prazo;
  }

  const contMin  = recLiq * prazo;
  const extra    = Math.max(0, contNeg - contMin);
  const comBase  = contNeg * BASE;
  const comBonus = extra * BONUS;
  const comTotal = comBase + comBonus;
  const comCSS   = comTotal * CSS_SPLIT;
  const pct = vApto / minApto - 1;

  let statusClass, statusTxt;
  if (vApto < minApto) {
    statusClass = 'status-bloqueado';
    statusTxt = '❌ BLOQUEADO — Valor abaixo do mínimo para este combo.';
  } else if (pct < 0.05) {
    statusClass = 'status-minimo';
    statusTxt = '⚠ NO MÍNIMO — Premiação mínima. Tente subir o valor!';
  } else if (pct < 0.15) {
    statusClass = 'status-bom';
    statusTxt = '✔ BOM NEGÓCIO — Aprovado! Ainda há margem para crescer.';
  } else if (pct < 0.25) {
    statusClass = 'status-otimo';
    statusTxt = '🚀 ÓTIMO NEGÓCIO — Excelente! Sua premiação está crescendo.';
  } else {
    statusClass = 'status-maximo';
    statusTxt = '⭐ MÁXIMO — Premiação no topo! Melhor proposta possível.';
  }

  const badge = document.getElementById('statusBadge');
  badge.className = 'status-badge ' + statusClass;
  badge.textContent = statusTxt;

  const elPrem = document.getElementById('prevPremiacao');
  if (vApto < minApto) {
    elPrem.textContent = 'R$ 0,00';
    elPrem.className = 'preview-value vermelho';
  } else {
    elPrem.textContent = fmt(comCSS);
    elPrem.className = 'preview-value ' + (pct >= 0.25 ? 'amarelo' : 'verde');
  }

  const elMens = document.getElementById('prevMensTotal');
  elMens.textContent = fmt(mensNeg);
  elMens.className = 'preview-value ' + (vApto < minApto ? 'vermelho' : 'amarelo');
}

function abrirModal() {
  const combo = document.getElementById('combo').value;
  const cat = CATALOGO[combo];
  if (!cat) return;
  document.getElementById('modalNomeCombo').textContent = cat.nome;
  document.getElementById('modalTagCombo').textContent = cat.tag;
  const grid = document.getElementById('modalEquipGrid');
  grid.innerHTML = '';
  cat.categorias.forEach(c => {
    const card = document.createElement('div');
    card.className = 'modal-equip-card';
    card.innerHTML = `<div class="modal-equip-titulo">${c.nome}</div>` +
      c.itens.map(([nome, qty]) =>
        `<div class="modal-equip-item"><span>${nome}</span><span class="modal-equip-qty">${qty}</span></div>`
      ).join('');
    grid.appendChild(card);
  });
  document.getElementById('modalOverlay').classList.add('aberto');
}

function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('aberto');
}

function fecharModalFora(e) {
  if (e.target === document.getElementById('modalOverlay')) fecharModal();
}

function fmtBRL(v) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── GERA O ZIP COM O PPTX PREENCHIDO (reutilizado por PPTX e PDF) ──
async function gerarZip(combo, nomeRaw, aptos, vApto) {
  const arquivo = combo.toLowerCase();

  if (!window.JSZip) {
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  const response = await fetch(`templates/${arquivo}.pptx`);
  if (!response.ok) throw new Error(`Template ${arquivo}.pptx não encontrado.`);
  const arrayBuffer = await response.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const nome     = nomeRaw.toUpperCase();
  const mensApto = 'R$ ' + fmtBRL(vApto);
  const mensCond = 'R$ ' + fmtBRL(vApto * aptos);
  const aptosStr = String(Math.round(aptos));

  const valores = {
    NOME:       nome,
    VALOR:      mensApto,
    VALOR_COND: mensCond,
    UNIDADES:   aptosStr,
  };

  const slides = Object.keys(zip.files).filter(
    f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml')
  );

  for (const slidePath of slides) {
    let xml = await zip.file(slidePath).async('string');
    Object.entries(valores).forEach(([chave, valor]) => {
      xml = xml.replaceAll(`[${chave}]`, valor);
    });
    zip.file(slidePath, xml);
  }

  return { zip, nome: nomeRaw };
}

// ── BAIXAR PPTX ──
async function gerarProposta() {
  const btn     = document.getElementById('btnGerar');
  const nomeRaw = (document.getElementById('nomeCondominio').value || '').trim();
  const aptos   = parseFloat(document.getElementById('aptos').value) || 0;
  const vApto   = parseFloat(document.getElementById('valorApto').value) || 0;
  const combo   = document.getElementById('combo').value;

  if (!nomeRaw) { alert('Preencha o nome do condomínio.'); return; }
  if (!vApto || aptos === 0) { alert('Preencha o valor por unidade e o número de unidades.'); return; }
  if (COMBOS_PENDENTES.includes(combo)) { alert('Combo ' + combo + ' ainda não disponível.'); return; }

  btn.classList.add('loading'); btn.disabled = true;

  try {
    const { zip } = await gerarZip(combo, nomeRaw, aptos, vApto);

    const blob = await zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposta Duo Fitness ${combo} - ${nomeRaw}.pptx`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);

  } catch(e) {
    alert('Erro ao gerar proposta: ' + e.message); console.error(e);
  } finally {
    btn.classList.remove('loading'); btn.disabled = false;
  }
}

// ── BAIXAR PDF VIA CLOUDCONVERT ──
async function gerarPDF() {
  const btnPdf  = document.getElementById('btnGerarPdf');
  const nomeRaw = (document.getElementById('nomeCondominio').value || '').trim();
  const aptos   = parseFloat(document.getElementById('aptos').value) || 0;
  const vApto   = parseFloat(document.getElementById('valorApto').value) || 0;
  const combo   = document.getElementById('combo').value;

  if (!nomeRaw) { alert('Preencha o nome do condomínio.'); return; }
  if (!vApto || aptos === 0) { alert('Preencha o valor por unidade e o número de unidades.'); return; }
  if (COMBOS_PENDENTES.includes(combo)) { alert('Combo ' + combo + ' ainda não disponível.'); return; }

  btnPdf.classList.add('loading'); btnPdf.disabled = true;

  try {
    // 1. Gerar o PPTX preenchido em memória
    const { zip } = await gerarZip(combo, nomeRaw, aptos, vApto);
    const pptxBlob = await zip.generateAsync({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    // 2. Criar job no CloudConvert
    const jobRes = await fetch('https://api.cloudconvert.com/v2/jobs', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CC_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasks: {
          'upload-pptx': { operation: 'import/upload' },
          'convert-pdf': {
            operation: 'convert',
            input: 'upload-pptx',
            input_format: 'pptx',
            output_format: 'pdf'
          },
          'export-pdf': {
            operation: 'export/url',
            input: 'convert-pdf'
          }
        }
      })
    });

    if (!jobRes.ok) throw new Error('Erro ao criar job no CloudConvert.');
    const job = await jobRes.json();

    // 3. Fazer upload do PPTX
    const uploadTask = job.data.tasks.find(t => t.name === 'upload-pptx');
    const uploadUrl  = uploadTask.result.form.url;
    const uploadParams = uploadTask.result.form.parameters;

    const formData = new FormData();
    Object.entries(uploadParams).forEach(([k, v]) => formData.append(k, v));
    formData.append('file', pptxBlob, `proposta_${combo.toLowerCase()}.pptx`);

    const upRes = await fetch(uploadUrl, { method: 'POST', body: formData });
    if (!upRes.ok) throw new Error('Erro ao fazer upload para o CloudConvert.');

    // 4. Aguardar conversão (polling)
    const jobId = job.data.id;
    let exportTask = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const statusRes = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${CC_KEY}` }
      });
      const statusData = await statusRes.json();
      const tasks = statusData.data.tasks;
      const exp = tasks.find(t => t.name === 'export-pdf');
      if (exp && exp.status === 'finished') {
        exportTask = exp;
        break;
      }
      const failed = tasks.find(t => t.status === 'error');
      if (failed) throw new Error('Falha na conversão: ' + (failed.message || 'erro desconhecido'));
    }

    if (!exportTask) throw new Error('Tempo esgotado aguardando conversão.');

    // 5. Baixar o PDF
    const pdfUrl = exportTask.result.files[0].url;
    const pdfRes = await fetch(pdfUrl);
    const pdfBlob = await pdfRes.blob();

    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Proposta Duo Fitness ${combo} - ${nomeRaw}.pdf`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);

  } catch(e) {
    alert('Erro ao gerar PDF: ' + e.message); console.error(e);
  } finally {
    btnPdf.classList.remove('loading'); btnPdf.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  construirTabelaRef('SIM', 100);
  atualizar();
});
