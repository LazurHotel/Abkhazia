/* ============================================================
   Кофе-принт — кабинет управляющего.
   Требует: js/data.js (window.CP), js/store.js (window.CPStore)
   ============================================================ */
(function () {
  const CP = window.CP;
  const Store = window.CPStore;
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(Math.round(n));
  const dt = (ts) => new Date(ts).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

  let filter = 'all';

  function isToday(ts) {
    const d = new Date(ts), n = new Date();
    return d.getDate() === n.getDate() && d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
  }

  /* ---------- KPI ---------- */
  function renderKpis(orders, members) {
    const todays = orders.filter(o => isToday(o.createdAt));
    const revenue = orders.reduce((s, o) => s + (o.total || 0), 0);
    const paidOrders = orders.filter(o => (o.total || 0) > 0);
    const avg = paidOrders.length ? revenue / paidOrders.length : 0;
    const pending = orders.filter(o => o.status === 'new' || o.status === 'in_progress').length;
    const freeCups = members.reduce((s, m) => s + (m.freeCups || 0), 0);

    const data = [
      [orders.length, 'Всего заказов'],
      [fmt(revenue), 'Выручка (всего)'],
      [fmt(avg), 'Средний чек'],
      [todays.length, 'Заказов сегодня'],
      [pending, 'В работе / новые'],
      [members.length, 'Гостей в лояльности']
    ];
    $('#kpis').innerHTML = data.map(([v, l]) => `<div class="kpi"><div class="kpi__value">${v}</div><div class="kpi__label">${l}</div></div>`).join('');
    void freeCups;
  }

  /* ---------- Таблица заказов ---------- */
  function renderOrders(orders) {
    const list = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    const tbody = $('#orders-body');
    if (!list.length) { tbody.innerHTML = `<tr><td colspan="7" class="empty">Заказов нет</td></tr>`; return; }

    tbody.innerHTML = list.map(o => {
      const title = CP.serviceTitles[o.service] || o.service;
      const files = (o.files && o.files.length) ? `<br><small>📎 ${o.files.join(', ')}</small>` : '';
      const ful = o.fulfillment === 'delivery' ? `🚚 ${o.address || 'доставка'}` : '🏪 самовывоз';
      return `<tr>
        <td><span class="mono">${o.id}</span><br><small>${dt(o.createdAt)}</small></td>
        <td><span class="badge badge--${o.service === 'cafe' ? 'cafe' : 'new'}" style="background:#efe2d3;color:#6f4332">${title}</span></td>
        <td>${o.summary || ''}${files}<br><small>${ful}${o.time ? ' · ' + o.time : ''}</small></td>
        <td>${o.name || ''}<br><small>${o.phone || ''}</small></td>
        <td class="cell-total">${fmt(o.total || 0)}</td>
        <td><span class="badge badge--${o.status}">${CP.statusTitles[o.status]}</span></td>
        <td>${statusButtons(o)}</td>
      </tr>`;
    }).join('');

    tbody.querySelectorAll('[data-advance]').forEach(b => b.addEventListener('click', () => {
      Store.updateOrderStatus(b.dataset.id, b.dataset.advance);
      refresh();
    }));
  }

  function statusButtons(o) {
    const idx = CP.statusFlow.indexOf(o.status);
    let html = '<div class="status-actions">';
    if (idx < CP.statusFlow.length - 1) {
      const next = CP.statusFlow[idx + 1];
      html += `<button class="btn btn--ink btn--sm" data-id="${o.id}" data-advance="${next}">→ ${CP.statusTitles[next]}</button>`;
    } else {
      html += '<span class="badge badge--done">завершён</span>';
    }
    html += '</div>';
    return html;
  }

  /* ---------- Выручка по услугам ---------- */
  function renderRevenueBars(orders) {
    const byCat = {};
    orders.forEach(o => { byCat[o.service] = (byCat[o.service] || 0) + (o.total || 0); });
    const entries = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const max = Math.max(1, ...entries.map(e => e[1]));
    if (!entries.length) { $('#revenue-bars').innerHTML = '<p class="empty">Нет данных</p>'; return; }
    $('#revenue-bars').innerHTML = entries.map(([cat, sum]) =>
      `<div class="bar-row">
        <span>${CP.serviceTitles[cat] || cat}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${(sum / max * 100).toFixed(0)}%"></div></div>
        <b>${fmt(sum)}</b>
      </div>`).join('');
  }

  /* ---------- Очередь печати ---------- */
  function renderQueue(orders) {
    const q = orders.filter(o => o.service !== 'cafe' && (o.status === 'new' || o.status === 'in_progress'))
      .sort((a, b) => a.createdAt - b.createdAt);
    if (!q.length) { $('#queue').innerHTML = '<p class="empty">Очередь пуста — всё напечатано ✅</p>'; return; }
    $('#queue').innerHTML = q.map(o =>
      `<div class="queue-item queue-item--${o.status}">
        <div class="queue-item__top"><b>${o.id} · ${CP.serviceTitles[o.service] || o.service}</b><span class="badge badge--${o.status}">${CP.statusTitles[o.status]}</span></div>
        <div>${o.summary || ''}</div>
        <small>${o.name || ''} · ${o.phone || ''}${o.time ? ' · к ' + o.time : ''}</small>
      </div>`).join('');
  }

  /* ---------- Лояльность ---------- */
  function renderMembers(members) {
    const tbody = $('#members-body');
    if (!members.length) { tbody.innerHTML = `<tr><td colspan="4" class="empty">Гостей пока нет</td></tr>`; return; }
    tbody.innerHTML = members.sort((a, b) => (b.freeCups - a.freeCups) || (b.stamps - a.stamps)).map(m =>
      `<tr><td>${m.name}</td><td><small>${m.phone}</small></td><td>${m.stamps}/6</td><td>🎁 ${m.freeCups}</td></tr>`).join('');
  }

  /* ---------- CSV ---------- */
  function exportCsv(orders) {
    const head = ['ID', 'Дата', 'Услуга', 'Описание', 'Имя', 'Телефон', 'Получение', 'Сумма', 'Статус'];
    const rows = orders.map(o => [o.id, dt(o.createdAt), CP.serviceTitles[o.service] || o.service, o.summary, o.name, o.phone, o.fulfillment, o.total, CP.statusTitles[o.status]]);
    const csv = [head, ...rows].map(r => r.map(c => `"${String(c == null ? '' : c).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'coffee-print-orders.csv';
    a.click();
  }

  /* ---------- Refresh ---------- */
  function refresh() {
    const orders = Store.getOrders();
    const members = Store.getMembers();
    renderKpis(orders, members);
    renderOrders(orders);
    renderRevenueBars(orders);
    renderQueue(orders);
    renderMembers(members);
  }

  document.addEventListener('DOMContentLoaded', () => {
    Store.seedDemoIfEmpty();

    document.querySelectorAll('.filter').forEach(f => f.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('is-active'));
      f.classList.add('is-active');
      filter = f.dataset.status;
      renderOrders(Store.getOrders());
    }));

    $('#btn-refresh').addEventListener('click', refresh);
    $('#btn-export').addEventListener('click', () => exportCsv(Store.getOrders()));
    $('#btn-demo').addEventListener('click', () => { Store.resetAll(); Store.seedDemoIfEmpty(); refresh(); });
    $('#btn-reset').addEventListener('click', () => {
      if (confirm('Удалить все заказы и карты лояльности? Действие необратимо.')) { Store.resetAll(); refresh(); }
    });

    refresh();
    // живое обновление, если заказ оформили в другой вкладке
    window.addEventListener('storage', refresh);
  });
})();
