/* ============================================================
   Кофе-принт — витрина для клиентов.
   Требует: js/data.js (window.CP), js/store.js (window.CPStore)
   ============================================================ */
(function () {
  const CP = window.CP;
  const Store = window.CPStore;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const fmt = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(Math.round(n));

  /* ---------------- Тосты ---------------- */
  let toastTimer;
  function toast(msg) {
    let el = $('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3500);
  }

  /* ---------------- Меню кофейни ---------------- */
  function renderMenu() {
    const tabsEl = $('#menu-tabs');
    const gridEl = $('#menu-grid');
    if (!tabsEl) return;
    const keys = Object.keys(CP.menu);

    function drawGrid(key) {
      gridEl.innerHTML = '';
      CP.menu[key].items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.innerHTML = `
          <div class="menu-item__emoji">${item.emoji}</div>
          <div class="menu-item__body">
            <div class="menu-item__top">
              <span class="menu-item__name">${item.name}</span>
              <span class="menu-item__price">${item.price} ₽</span>
            </div>
            <p class="menu-item__desc">${item.desc || ''}</p>
            ${item.tag ? `<span class="menu-item__tag">${item.tag}</span>` : ''}
          </div>`;
        gridEl.appendChild(card);
      });
    }

    keys.forEach((key, i) => {
      const btn = document.createElement('button');
      btn.className = 'tab' + (i === 0 ? ' is-active' : '');
      btn.textContent = CP.menu[key].label;
      btn.addEventListener('click', () => {
        $$('.tab', tabsEl).forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        drawGrid(key);
      });
      tabsEl.appendChild(btn);
    });
    drawGrid(keys[0]);
  }

  /* ---------------- Услуги печати ---------------- */
  function renderServices() {
    const el = $('#services');
    if (!el) return;
    CP.services.forEach(s => {
      const card = document.createElement('div');
      card.className = 'service';
      card.innerHTML = `
        <div class="service__icon">${s.icon}</div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <div class="service__price"><b>${s.price}</b> <small>${s.unit}</small></div>
        <button class="btn btn--ink" data-calc="${s.calc}">Рассчитать</button>`;
      el.appendChild(card);
    });
    el.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-calc]');
      if (!btn) return;
      selectCalcService(btn.dataset.calc);
      $('#calculator').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------- Акции / удобства / FAQ ---------------- */
  function renderOffers() {
    const el = $('#offers'); if (!el) return;
    CP.offers.forEach(o => {
      const d = document.createElement('div');
      d.className = 'offer ' + (o.mod || '');
      d.innerHTML = `<div class="emoji">${o.emoji}</div><h3>${o.title}</h3><p>${o.text}</p>`;
      el.appendChild(d);
    });
  }
  function renderPerks() {
    const el = $('#perks'); if (!el) return;
    CP.perks.forEach(p => {
      const d = document.createElement('div');
      d.className = 'perk';
      d.innerHTML = `<div class="emoji">${p.emoji}</div><h3>${p.title}</h3><p>${p.text}</p>`;
      el.appendChild(d);
    });
  }
  function renderFaq() {
    const el = $('#faq'); if (!el) return;
    CP.faq.forEach(f => {
      const d = document.createElement('details');
      d.innerHTML = `<summary>${f.q}</summary><p>${f.a}</p>`;
      el.appendChild(d);
    });
  }
  function renderContacts() {
    const c = CP.contacts;
    const el = $('#contact-info'); if (!el) return;
    el.innerHTML = `
      <div class="contact-line"><span class="emoji">📍</span><div><b>Адрес</b><span>${c.address}</span></div></div>
      <div class="contact-line"><span class="emoji">🕗</span><div><b>Часы работы</b><span>${c.hours}</span></div></div>
      <div class="contact-line"><span class="emoji">📞</span><div><b>Телефон</b><span><a href="tel:${c.phoneHref}" style="text-decoration:none;color:inherit">${c.phone}</a></span></div></div>
      <div class="contact-line"><span class="emoji">💬</span><div><b>WhatsApp</b><span>${c.whatsapp}</span></div></div>
      <div class="contact-line"><span class="emoji">✉️</span><div><b>Почта</b><span>${c.email}</span></div></div>
      <div class="socials">${c.socials.map(s => `<a href="${s.href}" aria-label="${s.label}">${s.label}</a>`).join('')}</div>`;
    $$('[data-phone]').forEach(a => { a.href = 'tel:' + c.phoneHref; a.textContent = c.phone; });
  }

  /* ---------------- Калькулятор печати ---------------- */
  const P = CP.pricing;
  const sel = (opts) => ({ type: 'select', options: opts });

  // Схемы услуг: поля формы + функция расчёта.
  const calcServices = {
    print: {
      label: 'Печать', emoji: '🖨️',
      fields: [
        { name: 'color', label: 'Цвет', ...sel([['bw', 'Чёрно-белая'], ['color', 'Цветная']]) },
        { name: 'format', label: 'Формат', ...sel([['a4', 'A4'], ['a3', 'A3']]) },
        { name: 'sides', label: 'Печать', ...sel([['single', 'Односторонняя'], ['double', 'Двусторонняя']]) },
        { name: 'paper', label: 'Бумага', ...sel([['80', 'Обычная 80 г'], ['160', 'Плотная 160 г'], ['photo', 'Фотобумага']]) },
        { name: 'pages', label: 'Страниц в документе', type: 'number', min: 1, value: 10 },
        { name: 'copies', label: 'Копий', type: 'number', min: 1, value: 1 },
        { name: 'urgent', label: 'Срочно (5 минут)', type: 'check' }
      ],
      compute(v) {
        const per = (v.color === 'color' ? P.print.color : P.print.bw)
          * (v.format === 'a3' ? P.print.a3mult : 1)
          * (P.print.paper[v.paper] || 1)
          * (v.sides === 'double' ? P.print.duplexMult : 1)
          * (v.urgent ? P.print.urgentMult : 1);
        const qty = v.pages * v.copies;
        return {
          rows: [
            ['Тип', v.color === 'color' ? 'Цветная' : 'Чёрно-белая'],
            ['Формат / бумага', `${v.format.toUpperCase()} · ${v.paper === 'photo' ? 'фото' : v.paper + ' г'}`],
            ['Объём', `${qty} стр · ${v.sides === 'double' ? '2-стор.' : '1-стор.'}`],
            ['Цена за страницу', fmt(per)],
            ...(v.urgent ? [['Срочный тариф', '×1.5']] : [])
          ],
          total: per * qty,
          summary: `${v.color === 'color' ? 'Цветная' : 'Ч/б'} печать ${v.format.toUpperCase()}, ${v.pages} стр × ${v.copies}${v.urgent ? ' (срочно)' : ''}`
        };
      }
    },
    copy: {
      label: 'Копирование', emoji: '📑',
      fields: [
        { name: 'color', label: 'Цвет', ...sel([['bw', 'Чёрно-белая'], ['color', 'Цветная']]) },
        { name: 'format', label: 'Формат', ...sel([['a4', 'A4'], ['a3', 'A3']]) },
        { name: 'pages', label: 'Страниц', type: 'number', min: 1, value: 10 },
        { name: 'copies', label: 'Копий', type: 'number', min: 1, value: 1 }
      ],
      compute(v) {
        const per = (v.color === 'color' ? P.copy.color : P.copy.bw) * (v.format === 'a3' ? P.copy.a3mult : 1);
        const qty = v.pages * v.copies;
        return {
          rows: [['Тип', v.color === 'color' ? 'Цветная' : 'Ч/б'], ['Формат', v.format.toUpperCase()], ['Объём', qty + ' стр'], ['Цена за стр.', fmt(per)]],
          total: per * qty,
          summary: `Копирование ${v.format.toUpperCase()}, ${qty} стр`
        };
      }
    },
    scan: {
      label: 'Скан', emoji: '📷',
      fields: [{ name: 'pages', label: 'Страниц', type: 'number', min: 1, value: 10 }],
      compute(v) {
        return { rows: [['Сканирование', v.pages + ' стр'], ['Цена за стр.', fmt(P.scan.perPage)]], total: P.scan.perPage * v.pages, summary: `Сканирование, ${v.pages} стр` };
      }
    },
    binding: {
      label: 'Переплёт', emoji: '🎓',
      fields: [
        { name: 'type', label: 'Тип переплёта', ...sel([['spring', 'Пружина'], ['soft', 'Мягкий'], ['hard', 'Твёрдый (диплом)']]) },
        { name: 'qty', label: 'Количество работ', type: 'number', min: 1, value: 1 }
      ],
      compute(v) {
        const per = P.binding[v.type];
        const t = { spring: 'Пружина', soft: 'Мягкий', hard: 'Твёрдый' }[v.type];
        return { rows: [['Тип', t], ['Кол-во', v.qty + ' шт'], ['Цена за работу', fmt(per)]], total: per * v.qty, summary: `${t} переплёт × ${v.qty}` };
      }
    },
    laminate: {
      label: 'Ламинация', emoji: '🛡️',
      fields: [
        { name: 'format', label: 'Формат', ...sel([['a4', 'A4'], ['a3', 'A3']]) },
        { name: 'qty', label: 'Листов', type: 'number', min: 1, value: 1 }
      ],
      compute(v) {
        const per = P.laminate[v.format];
        return { rows: [['Формат', v.format.toUpperCase()], ['Листов', v.qty], ['Цена за лист', fmt(per)]], total: per * v.qty, summary: `Ламинирование ${v.format.toUpperCase()} × ${v.qty}` };
      }
    },
    docphoto: {
      label: 'Фото на док.', emoji: '🪪',
      fields: [{ name: 'sets', label: 'Комплектов', type: 'number', min: 1, value: 1 }],
      compute(v) { return { rows: [['Комплектов', v.sets], ['Цена комплекта', fmt(P.docphoto.set)]], total: P.docphoto.set * v.sets, summary: `Фото на документы × ${v.sets}` }; }
    },
    wideformat: {
      label: 'Широкоформат', emoji: '📐',
      fields: [
        { name: 'size', label: 'Размер', ...sel([['a2', 'A2'], ['a1', 'A1'], ['a0', 'A0']]) },
        { name: 'qty', label: 'Количество', type: 'number', min: 1, value: 1 }
      ],
      compute(v) {
        const per = P.wideformat[v.size];
        return { rows: [['Размер', v.size.toUpperCase()], ['Кол-во', v.qty], ['Цена', fmt(per)]], total: per * v.qty, summary: `Широкоформат ${v.size.toUpperCase()} × ${v.qty}` };
      }
    },
    photoPrint: {
      label: 'Печать фото', emoji: '🖼️',
      fields: [
        { name: 'size', label: 'Размер', ...sel([['10x15', '10×15'], ['15x21', '15×21'], ['a4', 'A4']]) },
        { name: 'qty', label: 'Количество', type: 'number', min: 1, value: 10 }
      ],
      compute(v) {
        const per = P.photoPrint[v.size];
        return { rows: [['Размер', v.size.replace('x', '×').toUpperCase()], ['Кол-во', v.qty + ' шт'], ['Цена за шт.', fmt(per)]], total: per * v.qty, summary: `Печать фото ${v.size} × ${v.qty}` };
      }
    },
    souvenir: {
      label: 'Сувениры', emoji: '🎁',
      fields: [
        { name: 'item', label: 'Изделие', ...sel([['mug', 'Кружка'], ['tshirt', 'Футболка']]) },
        { name: 'qty', label: 'Количество', type: 'number', min: 1, value: 1 }
      ],
      compute(v) {
        const per = P.souvenir[v.item];
        const t = v.item === 'mug' ? 'Кружка' : 'Футболка';
        return { rows: [['Изделие', t], ['Кол-во', v.qty + ' шт'], ['Цена за шт.', fmt(per)]], total: per * v.qty, summary: `${t} с печатью × ${v.qty}` };
      }
    }
  };

  let currentService = 'print';
  let currentResult = null;

  function buildServiceButtons() {
    const wrap = $('#calc-services'); if (!wrap) return;
    Object.entries(calcServices).forEach(([id, s]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'calc__service-btn' + (id === currentService ? ' is-active' : '');
      b.dataset.id = id;
      b.innerHTML = `<span class="emoji">${s.emoji}</span>${s.label}`;
      b.addEventListener('click', () => selectCalcService(id));
      wrap.appendChild(b);
    });
  }

  function selectCalcService(id) {
    if (!calcServices[id]) return;
    currentService = id;
    $$('#calc-services .calc__service-btn').forEach(b => b.classList.toggle('is-active', b.dataset.id === id));
    renderFields();
    recalc();
  }

  function renderFields() {
    const form = $('#calc-fields'); if (!form) return;
    form.innerHTML = '';
    calcServices[currentService].fields.forEach(f => {
      const wrap = document.createElement('div');
      wrap.className = 'field' + (f.type === 'check' ? ' field--check' : '');
      if (f.type === 'select') {
        wrap.innerHTML = `<label for="cf-${f.name}">${f.label}</label>
          <select id="cf-${f.name}" name="${f.name}">${f.options.map(o => `<option value="${o[0]}">${o[1]}</option>`).join('')}</select>`;
      } else if (f.type === 'number') {
        wrap.innerHTML = `<label for="cf-${f.name}">${f.label}</label>
          <input id="cf-${f.name}" name="${f.name}" type="number" min="${f.min || 1}" value="${f.value || 1}">`;
      } else if (f.type === 'check') {
        wrap.innerHTML = `<input id="cf-${f.name}" name="${f.name}" type="checkbox">
          <label for="cf-${f.name}">${f.label}</label>`;
      }
      form.appendChild(wrap);
    });
    form.querySelectorAll('input, select').forEach(el => el.addEventListener('input', recalc));
  }

  function readValues() {
    const v = {};
    $$('#calc-fields [name]').forEach(el => {
      if (el.type === 'checkbox') v[el.name] = el.checked;
      else if (el.type === 'number') v[el.name] = Math.max(Number(el.min || 1), Number(el.value) || 0);
      else v[el.name] = el.value;
    });
    return v;
  }

  function recalc() {
    const result = calcServices[currentService].compute(readValues());
    const student = $('#calc-student') && $('#calc-student').checked;
    let total = result.total;
    const rows = result.rows.slice();
    if (student) {
      const disc = total * P.studentDiscount;
      rows.push(['Студенческая скидка', '−' + fmt(disc)]);
      total -= disc;
    }
    currentResult = { service: currentService, summary: result.summary + (student ? ' · студ. −10%' : ''), total };

    $('#calc-rows').innerHTML = rows.map(r => `<div class="calc__row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
    $('#calc-total-value').textContent = fmt(total);
  }

  /* ---------------- Оформление заказа ---------------- */
  const modal = $('#order-modal');
  function openOrder(prefill) {
    if (!modal) return;
    const r = prefill || currentResult;
    $('#order-summary-text').textContent = r ? r.summary : 'Заказ из калькулятора';
    $('#order-total').textContent = r ? fmt(r.total) : '—';
    modal.dataset.service = r ? r.service : 'print';
    modal.dataset.summary = r ? r.summary : '';
    modal.dataset.total = r ? r.total : 0;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeOrder() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); }

  function initOrderModal() {
    if (!modal) return;
    $('#order-modal .modal__close').addEventListener('click', closeOrder);
    modal.addEventListener('click', e => { if (e.target === modal) closeOrder(); });

    // выбор доставки → показать адрес
    const fulfillment = $('#order-fulfillment');
    const addressField = $('#order-address-field');
    fulfillment.addEventListener('change', () => {
      addressField.style.display = fulfillment.value === 'delivery' ? '' : 'none';
    });

    // загрузка файлов (имена)
    const fileInput = $('#order-files');
    const fileList = $('#order-file-list');
    $('#order-file-drop').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      fileList.innerHTML = Array.from(fileInput.files).map(f => `<li>📎 ${f.name}</li>`).join('');
    });

    $('#order-form').addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const files = Array.from(fileInput.files).map(f => f.name);
      const order = Store.addOrder({
        service: modal.dataset.service || 'print',
        summary: modal.dataset.summary || 'Заказ',
        total: Number(modal.dataset.total) || 0,
        name: fd.get('name'),
        phone: fd.get('phone'),
        fulfillment: fd.get('fulfillment'),
        address: fd.get('address') || '',
        time: fd.get('time') || '',
        comment: fd.get('comment') || '',
        files
      });
      closeOrder();
      e.target.reset();
      fileList.innerHTML = '';
      addressField.style.display = 'none';
      toast(`Заказ ${order.id} принят! Мы позвоним для подтверждения ☕`);
    });
  }

  /* ---------------- Программа лояльности ---------------- */
  function renderLoyaltyCard(member) {
    const card = $('#loy-card'); if (!card) return;
    const stamps = [];
    for (let i = 0; i < 6; i++) {
      if (i === 5) stamps.push(`<div class="loy-stamp ${member.stamps >= 5 ? 'is-gift' : ''}">🎁</div>`);
      else stamps.push(`<div class="loy-stamp ${i < member.stamps ? 'is-filled' : ''}">${i < member.stamps ? '☕' : ''}</div>`);
    }
    card.innerHTML = `
      <h3>Карта «Кофе-принт»</h3>
      <p class="loy-card__name">${member.name} · ${member.phone}</p>
      <div class="loy-stamps">${stamps.join('')}</div>
      <p class="loy-card__hint">${member.stamps}/6 до бесплатного кофе · бесплатных чашек получено: <b>${member.freeCups}</b></p>
      <button class="btn btn--amber" id="loy-stamp-btn">+ Отметить покупку</button>`;
    $('#loy-stamp-btn').addEventListener('click', () => {
      const updated = Store.addStamp(member.phone);
      if (updated.stamps === 0 && member.stamps === 5) toast('🎉 Поздравляем! Следующий кофе — бесплатно!');
      renderLoyaltyCard(updated);
    });
  }

  function initLoyalty() {
    const form = $('#loy-form'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const phone = (fd.get('phone') || '').trim();
      if (!phone) return;
      const member = Store.upsertMember(phone, (fd.get('name') || '').trim());
      renderLoyaltyCard(member);
      $('#loy-form-wrap').style.display = 'none';
      toast(`Карта готова! Накоплено штампов: ${member.stamps}/6`);
    });
  }

  /* ---------------- Контактная форма ---------------- */
  function initContactForm() {
    const form = $('#contact-form'); if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      Store.addOrder({
        service: 'cafe',
        summary: 'Обращение с сайта: ' + (fd.get('message') || '').slice(0, 60),
        total: 0,
        name: fd.get('name'), phone: fd.get('phone'), fulfillment: 'pickup',
        comment: fd.get('message') || '', files: []
      });
      form.reset();
      toast('Спасибо! Мы свяжемся с вами в ближайшее время 🙌');
    });
  }

  /* ---------------- Навигация (бургер) ---------------- */
  function initNav() {
    const burger = $('#burger'), nav = $('#nav');
    if (burger) burger.addEventListener('click', () => nav.classList.toggle('is-open'));
    $$('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));
    $$('[data-open-order]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); openOrder(); }));
  }

  /* ---------------- Старт ---------------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderServices();
    renderOffers();
    renderPerks();
    renderFaq();
    renderContacts();
    buildServiceButtons();
    renderFields();
    recalc();
    if ($('#calc-student')) $('#calc-student').addEventListener('change', recalc);
    if ($('#calc-order-btn')) $('#calc-order-btn').addEventListener('click', () => openOrder());
    initOrderModal();
    initLoyalty();
    initContactForm();
    initNav();
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOrder(); });
  });
})();
