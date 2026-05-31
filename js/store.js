/* ============================================================
   Кофе-принт — хранилище заказов и программы лояльности.
   Данные живут в localStorage браузера: витрина создаёт заказы,
   кабинет управляющего их читает и меняет статусы.
   ============================================================ */
window.CPStore = (function () {
  const ORDERS_KEY = 'cp_orders';
  const LOYALTY_KEY = 'cp_loyalty';
  const SEED_KEY = 'cp_seeded_v1';

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  // ---------- Заказы ----------
  function getOrders() {
    return read(ORDERS_KEY).sort((a, b) => b.createdAt - a.createdAt);
  }

  function addOrder(order) {
    const orders = read(ORDERS_KEY);
    const number = 1000 + orders.length + 1;
    const full = Object.assign({
      id: 'CP-' + number,
      createdAt: Date.now(),
      status: 'new'
    }, order);
    orders.push(full);
    write(ORDERS_KEY, orders);
    return full;
  }

  function updateOrderStatus(id, status) {
    const orders = read(ORDERS_KEY);
    const o = orders.find(x => x.id === id);
    if (o) { o.status = status; write(ORDERS_KEY, orders); }
    return o;
  }

  function clearOrders() { write(ORDERS_KEY, []); }

  // ---------- Лояльность ----------
  function getMembers() { return read(LOYALTY_KEY); }

  function findMember(phone) {
    return read(LOYALTY_KEY).find(m => m.phone === phone);
  }

  function upsertMember(phone, name) {
    const members = read(LOYALTY_KEY);
    let m = members.find(x => x.phone === phone);
    if (!m) {
      m = { phone, name: name || 'Гость', stamps: 0, freeCups: 0, spent: 0, createdAt: Date.now() };
      members.push(m);
    } else if (name) {
      m.name = name;
    }
    write(LOYALTY_KEY, members);
    return m;
  }

  function addStamp(phone) {
    const members = read(LOYALTY_KEY);
    const m = members.find(x => x.phone === phone);
    if (!m) return null;
    m.stamps += 1;
    if (m.stamps >= 6) { m.stamps = 0; m.freeCups += 1; }
    write(LOYALTY_KEY, members);
    return m;
  }

  // ---------- Демо-данные для кабинета ----------
  function seedDemoIfEmpty() {
    if (localStorage.getItem(SEED_KEY)) return;
    if (read(ORDERS_KEY).length === 0) {
      const day = 86400000, now = Date.now();
      const demo = [
        { service: 'print', summary: 'Цветная печать А4, 24 стр × 1', total: 288, name: 'Анна (студентка)', phone: '+79161112233', fulfillment: 'pickup', status: 'ready', createdAt: now - 0.3 * day },
        { service: 'binding', summary: 'Твёрдый переплёт диплома × 1', total: 450, name: 'Дмитрий', phone: '+79165554433', fulfillment: 'pickup', status: 'in_progress', createdAt: now - 0.6 * day },
        { service: 'cafe', summary: 'Капучино + круассан', total: 320, name: 'Семья Орловых', phone: '+79160001122', fulfillment: 'pickup', status: 'done', createdAt: now - 0.9 * day },
        { service: 'photoPrint', summary: 'Печать фото 10×15 × 30', total: 600, name: 'Мария', phone: '+79167778899', fulfillment: 'delivery', status: 'new', createdAt: now - 1.2 * day },
        { service: 'print', summary: 'Ч/б печать А4, 120 стр (срочно)', total: 720, name: 'Школа №7', phone: '+74951230000', fulfillment: 'pickup', status: 'done', createdAt: now - 1.8 * day },
        { service: 'laminate', summary: 'Ламинирование А4 × 10', total: 400, name: 'Игорь', phone: '+79164445566', fulfillment: 'pickup', status: 'done', createdAt: now - 2.1 * day },
        { service: 'souvenir', summary: 'Кружка с фото × 2', total: 1200, name: 'Подарок маме', phone: '+79169998877', fulfillment: 'delivery', status: 'new', createdAt: now - 2.5 * day }
      ];
      let i = 0;
      demo.forEach(d => write(ORDERS_KEY, read(ORDERS_KEY).concat(Object.assign({ id: 'CP-' + (1001 + i++) }, d))));
    }
    if (read(LOYALTY_KEY).length === 0) {
      write(LOYALTY_KEY, [
        { phone: '+79161112233', name: 'Анна', stamps: 4, freeCups: 1, spent: 2380, createdAt: Date.now() - 10 * 86400000 },
        { phone: '+79160001122', name: 'Семья Орловых', stamps: 2, freeCups: 0, spent: 1640, createdAt: Date.now() - 5 * 86400000 },
        { phone: '+79167778899', name: 'Мария', stamps: 5, freeCups: 2, spent: 3120, createdAt: Date.now() - 20 * 86400000 }
      ]);
    }
    localStorage.setItem(SEED_KEY, '1');
  }

  function resetAll() {
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(LOYALTY_KEY);
    localStorage.removeItem(SEED_KEY);
  }

  return {
    getOrders, addOrder, updateOrderStatus, clearOrders,
    getMembers, findMember, upsertMember, addStamp,
    seedDemoIfEmpty, resetAll
  };
})();
