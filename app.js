class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      mod: 'web', menuOpen: false,
      qty: { a: 1, b: 4, c: 1 }, desc: 10, pdf: false,
      onlyFollow: false, cliQ: '', cliStage: 'all', cotPay: 'transf',
      site: 0, webPaused: false, webHover: false, webElapsed: 0, slot: '',
      agAppts: {
        'carla-10': { client: 'Lucía Pérez', service: 'Color', status: 'Confirmado' },
        'carla-14': { client: 'Romina Sosa', service: 'Color', status: 'Sin confirmar' },
        'carla-16': { client: 'Ana Torres', service: 'Color', status: 'Confirmado' },
        'nico-10': { client: 'Diego Paz', service: 'Barbería', status: 'Asistió' },
        'nico-12': { client: 'Martín Gómez', service: 'Corte', status: 'Confirmado' },
        'nico-15': { client: 'Julián Ríos', service: 'Barbería', status: 'Sin confirmar' },
        'nico-17': { client: 'Tomás Vera', service: 'Corte', status: 'Confirmado' },
        'vale-11': { client: 'Sofía Ruiz', service: 'Brushing', status: 'Confirmado' },
        'vale-15': { client: 'Laura Fernández', service: 'Peinado', status: 'Sin confirmar' },
        'vale-18': { client: 'Camila Díaz', service: 'Corte', status: 'Confirmado' }
      },
      agSel: '', agName: '', agSvc: '', agErr: '', agMsg: '',
      idea: 'vehiculos', ideaText: '', ideaDraft: '', ideaErr: '',
      q: '', newName: '', newQty: '', stockMsg: '', stockErr: false, moves: 6, stockCat: 'Todas',
      products: [
        { code: 'A-101', name: 'Tornillo 6x40 (caja x100)', cat: 'Fijaciones', qty: 48, min: 20, cost: 6500 },
        { code: 'A-102', name: 'Tarugo 8 mm (caja x100)', cat: 'Fijaciones', qty: 12, min: 20, cost: 4200 },
        { code: 'A-120', name: 'Clavo punta paris 2" (kg)', cat: 'Fijaciones', qty: 30, min: 10, cost: 5200 },
        { code: 'B-118', name: 'Martillo carpintero', cat: 'Herramientas', qty: 6, min: 4, cost: 15500 },
        { code: 'B-210', name: 'Cinta métrica 5 m', cat: 'Herramientas', qty: 7, min: 5, cost: 9800 },
        { code: 'B-305', name: 'Guantes de trabajo', cat: 'Herramientas', qty: 3, min: 10, cost: 3500 },
        { code: 'C-012', name: 'Pintura látex 20 L', cat: 'Pinturería', qty: 9, min: 4, cost: 68000 },
        { code: 'C-044', name: 'Rodillo 23 cm', cat: 'Pinturería', qty: 15, min: 6, cost: 7900 }
      ],
      stockLog: [
        { code: 'B-305', name: 'Guantes de trabajo', d: -2, who: 'Juan P.', time: '11:20' },
        { code: 'C-012', name: 'Pintura látex 20 L', d: 6, who: 'Ana G.', time: '10:05' },
        { code: 'A-102', name: 'Tarugo 8 mm (caja x100)', d: -8, who: 'Juan P.', time: '09:30' },
        { code: 'A-101', name: 'Tornillo 6x40 (caja x100)', d: 24, who: 'Ana G.', time: '08:50' }
      ],
      planView: 'gantt',
      tasks: [
        { id: 1, name: 'Relevar pedidos', who: 'Ana', start: 0, len: 2, done: true },
        { id: 2, name: 'Comprar materiales', who: 'Juan', start: 1, len: 2, done: false },
        { id: 3, name: 'Producción lote 14', who: 'Equipo', start: 2, len: 3, done: false },
        { id: 4, name: 'Control de calidad', who: 'Ana', start: 3, len: 1, done: false },
        { id: 5, name: 'Entregas zona norte', who: 'Juan', start: 4, len: 1, done: false }
      ],
      ordWho: 'all', ordSeq: 587,
      orders: [
        { id: 'OT-0581', title: 'Service de aire acondicionado', client: 'Ferretería El Tornillo', who: 'JP', prio: 'Alta', date: '17/10', dd: 2, stage: 0, done: 0, steps: 4 },
        { id: 'OT-0582', title: 'Instalación de cortinas', client: 'Laura Fernández', who: 'AG', prio: 'Media', date: '18/10', dd: 3, stage: 0, done: 0, steps: 3 },
        { id: 'OT-0586', title: 'Pintura de oficina', client: 'Carpintería Los Andes', who: 'EQ', prio: 'Baja', date: '21/10', dd: 6, stage: 0, done: 0, steps: 5 },
        { id: 'OT-0583', title: 'Reparación de portón', client: 'Diego Paz', who: 'JP', prio: 'Alta', date: '14/10', dd: -1, stage: 1, done: 2, steps: 5 },
        { id: 'OT-0584', title: 'Mantenimiento mensual', client: 'Taller San Martín', who: 'AG', prio: 'Media', date: '15/10', dd: 0, stage: 1, done: 3, steps: 4 },
        { id: 'OT-0585', title: 'Cambio de cerradura', client: 'Sofía Ruiz', who: 'EQ', prio: 'Media', date: '13/10', dd: -2, stage: 2, done: 3, steps: 3, end: '13/10' }
      ],
      checkDone: 2, chkMeta: ['Ana G. · 09:12', 'Juan P. · 10:47'],
      movs: [
        { concept: 'Seña Martín Gómez', amount: 240000, type: 'in', time: '11:05', method: 'tr' },
        { concept: 'Pago a proveedor de maderas', amount: 120000, type: 'out', time: '10:40', method: 'tr' },
        { concept: 'Insumos de limpieza', amount: 18000, type: 'out', time: '10:10', method: 'ef' },
        { concept: 'Venta mostrador', amount: 42500, type: 'in', time: '09:52', method: 'tj' },
        { concept: 'Venta mostrador', amount: 85000, type: 'in', time: '09:15', method: 'ef' }
      ],
      cConcept: '', cAmount: '', cajaMsg: '', cajaErr: false, cajaMethod: 'ef', cajaCount: '', cajaClosed: '',
      debts: [
        { id: 'd1', name: 'Ferretería El Tornillo', comp: 'FC A 0001-00452', vto: '30/09', amount: 320000, days: 15, paid: '' },
        { id: 'd2', name: 'Diego Paz', comp: 'FC B 0001-01187', vto: '13/10', amount: 145000, days: 2, paid: '' },
        { id: 'd3', name: 'Construcciones Ríos', comp: 'FC A 0001-00433', vto: '05/09', amount: 210000, days: 40, paid: '' },
        { id: 'd4', name: 'Laura Fernández', comp: 'FC B 0001-01203', vto: '20/10', amount: 240000, days: -5, paid: '' },
        { id: 'd5', name: 'Carpintería Los Andes', comp: 'FC A 0001-00470', vto: '18/10', amount: 175000, days: -3, paid: '' },
        { id: 'd6', name: 'Taller San Martín', comp: 'FC A 0001-00461', vto: '29/10', amount: 98000, days: -14, paid: '' }
      ],
      cobFilter: 'todas', cobMsg: '',
      period: 'mes'
    };
  }

  componentDidMount() {
    this._webTimer = setInterval(() => {
      const st = this.state;
      if (st.mod !== 'web' || st.webPaused || st.webHover) return;
      const e = st.webElapsed + 1;
      if (e >= 8) this.setState({ site: (st.site + 1) % 3, webElapsed: 0 });
      else this.setState({ webElapsed: e });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._webTimer);
  }

  renderVals() {
    const S = this.state;
    const set = (o) => this.setState(o);
    const fmt = (n) => '$ ' + Math.round(n).toLocaleString('es-AR');
    const seg = (on) => ({ bg: on ? '#FFFFFF' : 'transparent', fg: on ? '#2A2421' : '#6B5E54', sh: on ? '0 1px 2px rgba(42,36,33,0.12)' : 'none' });
    const wa = (msg) => 'https://wa.me/?text=' + encodeURIComponent(msg);
    const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
    const PILL = {
      green: ['rgba(62,140,84,0.14)', '#2E6B3E'],
      amber: ['rgba(214,160,40,0.14)', '#8A5A00'],
      red: ['rgba(200,60,90,0.14)', '#A3284A'],
      blue: ['rgba(47,94,145,0.16)', '#2F5E91'],
      grey: ['rgba(42,36,33,0.06)', '#5C5049']
    };

    const MODS = [
      { id: 'cotizador', group: 'Comercial', name: 'Cotizador', integra: 'Clientes · Stock · Órdenes de trabajo' },
      { id: 'clientes', group: 'Comercial', name: 'Clientes', integra: 'Cotizador · Página web · Cobranzas' },
      { id: 'web', group: 'Comercial', name: 'Página web', integra: 'Clientes · Stock · Agenda y turnos' },
      { id: 'stock', group: 'Operaciones', name: 'Stock', integra: 'Cotizador · Página web · Órdenes de trabajo' },
      { id: 'plan', group: 'Operaciones', name: 'Planificación', integra: 'Órdenes de trabajo · Personal' },
      { id: 'agenda', group: 'Operaciones', name: 'Agenda y turnos', integra: 'Clientes · Página web · Caja' },
      { id: 'ordenes', group: 'Operaciones', name: 'Órdenes de trabajo', integra: 'Cotizador · Stock · Control de calidad' },
      { id: 'checklist', group: 'Operaciones', name: 'Control de calidad', integra: 'Órdenes de trabajo · Procedimientos' },
      { id: 'caja', group: 'Administración', name: 'Caja', integra: 'Cobranzas · Indicadores' },
      { id: 'cobranzas', group: 'Administración', name: 'Cobranzas', integra: 'Clientes · Caja' },
      { id: 'kpi', group: 'Gestión', name: 'Indicadores', integra: 'Todos los módulos' },
      { id: 'idea', group: 'A medida', name: 'Tu idea', integra: 'Lo que tu negocio necesite' }
    ];
    const tm = {};
    MODS.forEach((m) => {
      const on = m.id === S.mod;
      tm[m.id] = {
        on: on, pick: () => set({ mod: m.id, menuOpen: false }),
        bg: on ? 'rgba(168,72,31,0.09)' : 'transparent', fg: on ? '#2A2421' : '#4A403A',
        bd: on ? 'rgba(168,72,31,0.22)' : 'transparent', ic: on ? '#A8481F' : '#9A8D82'
      };
    });
    const cur = MODS.find((m) => m.id === S.mod) || MODS[0];
    const NAV_ORDER = ['web', 'cotizador', 'clientes', 'stock', 'plan', 'agenda', 'ordenes', 'checklist', 'caja', 'cobranzas', 'kpi', 'idea'];
    const navIdx = Math.max(0, NAV_ORDER.indexOf(S.mod));
    const navName = (i) => (MODS.find((m) => m.id === NAV_ORDER[(i + NAV_ORDER.length) % NAV_ORDER.length]) || MODS[0]).name;
    const navGo = (d) => () => set({ mod: NAV_ORDER[(navIdx + d + NAV_ORDER.length) % NAV_ORDER.length], menuOpen: false });
    const hp = {};
    const goMods = () => { const el = typeof document !== 'undefined' && document.getElementById('modulos'); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20); };
    NAV_ORDER.forEach((id) => { hp[id] = (e) => { if (e && e.preventDefault) e.preventDefault(); set({ mod: id, menuOpen: false }); goMods(); }; });
    const heroMods = NAV_ORDER.map((id) => {
      const isIdea = id === 'idea';
      const mm = MODS.find((x) => x.id === id) || MODS[0];
      return {
        name: isIdea ? '+ Tu idea' : mm.name,
        pick: () => set({ mod: id, menuOpen: false }),
        bg: isIdea ? '#A8481F' : '#FFFFFF', fg: isIdea ? '#FFFFFF' : '#2A2421', bd: isIdea ? '#A8481F' : '#E2D6C6'
      };
    });

    /* ---------- Cotizador ---------- */
    const ITEMS = [
      { id: 'a', code: 'MUE-160', name: 'Mesa de roble 1,60 m', price: 480000, stock: 4 },
      { id: 'b', code: 'MUE-022', name: 'Silla tapizada', price: 95000, stock: 22 },
      { id: 'd', code: 'MUE-075', name: 'Aparador 3 puertas', price: 390000, stock: 2 },
      { id: 'e', code: 'DEC-031', name: 'Lámpara colgante', price: 58000, stock: 9 },
      { id: 'c', code: 'SRV-010', name: 'Envío e instalación', price: 60000, stock: null }
    ];
    let subtotal = 0;
    const changeQty = (id, d) => {
      const n = Object.assign({}, this.state.qty);
      n[id] = Math.max(0, (n[id] || 0) + d);
      set({ qty: n, pdf: false });
    };
    const cotRows = ITEMS.filter((it) => (S.qty[it.id] || 0) > 0).map((it) => {
      const q = S.qty[it.id];
      subtotal += it.price * q;
      const short = it.stock !== null && q > it.stock;
      return {
        name: it.name, code: it.code, price: fmt(it.price), qty: q, sub: fmt(it.price * q), short: short,
        isSrv: it.stock === null, isProd: it.stock !== null,
        stock: it.stock === null ? 'Servicio' : (short ? 'Stock insuficiente: hay ' + it.stock : 'En stock: ' + it.stock),
        stC: short ? '#A3284A' : '#7A6D63',
        inc: () => changeQty(it.id, 1), dec: () => changeQty(it.id, -1)
      };
    });
    const cotAdd = ITEMS.filter((it) => !((S.qty[it.id] || 0) > 0)).map((it) => ({ name: it.name, add: () => changeQty(it.id, 1) }));
    const descAmt = subtotal * S.desc / 100;
    const neto = subtotal - descAmt;
    const iva = neto * 0.21;
    const cotTotalN = neto + iva;
    const needsApproval = S.desc > 15;
    const cotEmpty = subtotal === 0;
    const descBtns = [0, 10, 20].map((d) => Object.assign({ label: d + '%', pick: () => set({ desc: d, pdf: false }) }, seg(d === S.desc)));
    const payBtns = [['transf', 'Contado'], ['cuotas', '3 cuotas']].map((p) => Object.assign({ label: p[1], pick: () => set({ cotPay: p[0] }) }, seg(S.cotPay === p[0])));
    let cotStatus;
    if (S.pdf && needsApproval) cotStatus = { label: 'Pendiente de aprobación', bg: PILL.amber[0], fg: PILL.amber[1] };
    else if (S.pdf) cotStatus = { label: 'PDF generado', bg: PILL.green[0], fg: PILL.green[1] };
    else cotStatus = { label: 'Borrador', bg: PILL.grey[0], fg: PILL.grey[1] };
    const vCot = {
      cotRows: cotRows, cotAdd: cotAdd, cotAllIn: cotAdd.length === 0, descBtns: descBtns, payBtns: payBtns, cotStatus: cotStatus,
      cotSubtotal: fmt(subtotal), cotDescLabel: 'Descuento ' + S.desc + '%', cotDesc: '− ' + fmt(descAmt),
      cotIva: fmt(iva), cotTotal: fmt(cotTotalN),
      cotPayNote: S.cotPay === 'cuotas' ? '3 cuotas sin interés de ' + fmt(cotTotalN / 3) : 'Transferencia o efectivo',
      cotEmpty: cotEmpty, cotShort: cotRows.some((r) => r.short),
      showApprovalWarn: needsApproval && !S.pdf && !cotEmpty,
      cotBtnLabel: needsApproval ? 'Enviar a aprobación' : 'Generar PDF',
      cotBtnBg: cotEmpty ? '#E6DDD2' : (needsApproval ? '#8A5A00' : '#A8481F'),
      cotBtnFg: cotEmpty ? '#9A8D82' : '#FFFFFF',
      cotGenerate: () => { if (!cotEmpty) set({ pdf: true }); },
      pdfDone: S.pdf && !needsApproval, approvalSent: S.pdf && needsApproval,
      cotWa: wa('Hola Martín, ¿cómo estás? Te envío el presupuesto N.º 0143 por ' + fmt(cotTotalN) + ' con IVA incluido, válido hasta el 30/10. Quedo atento a cualquier consulta.')
    };

    /* ---------- Página web ---------- */
    const SITES = [
      { label: 'Mueblería', domain: 'muebleriaroble.com.ar' },
      { label: 'Peluquería', domain: 'studiobruma.com.ar' },
      { label: 'Farmacia', domain: 'farmaciadelparque.com.ar' }
    ];
    const goSite = (i) => set({ site: (i + 3) % 3, webElapsed: 0 });
    const webTabs = SITES.map((x, i) => Object.assign({ label: x.label, on: i === S.site, pick: () => goSite(i) }, seg(i === S.site)));
    const webDots = SITES.map((x, i) => ({ label: 'Ver sitio de ' + x.label.toLowerCase(), pick: () => goSite(i), w: i === S.site ? 22 : 8, bg: i === S.site ? '#A8481F' : '#6B5E54' }));
    const WEB_DUR = 8;
    const webStopped = S.webPaused || S.webHover;
    const SLOTS = ['15:30', '16:00', '17:30', '18:00', '19:00'];
    const slots = SLOTS.map((t) => ({
      label: t, on: t === S.slot, pick: () => set({ slot: t, webPaused: true }),
      bg: t === S.slot ? '#A44D61' : '#FFFFFF', fg: t === S.slot ? '#FFFFFF' : '#1E1718', bd: t === S.slot ? '#A44D61' : '#E2CDD0'
    }));

    /* ---------- Clientes ---------- */
    const PILLX = Object.assign({ purple: ['rgba(91,75,138,0.12)', '#5B4B8A'] }, PILL);
    const STAGE = {
      nuevo: { label: 'Nuevo contacto', tone: 'blue', bar: '#3D78C0' },
      pres: { label: 'Presupuesto enviado', tone: 'amber', bar: '#D19A2A' },
      neg: { label: 'En negociación', tone: 'purple', bar: '#6B5AA6' },
      activo: { label: 'Cliente activo', tone: 'green', bar: '#3E8C54' }
    };
    const CLIENTS = [
      { ini: 'MG', name: 'Martín Gómez', sub: 'Particular', tag: 'Muebles', stage: 'pres', value: 1235000, last: 'Hace 5 días', alert: true, next: 'Seguimiento de presupuesto', av: '#5A5048', msg: 'Hola Martín, ¿cómo estás? Te escribo por el presupuesto que te envié la semana pasada. ¿Pudiste verlo? Quedo atento a cualquier consulta.' },
      { ini: 'CA', name: 'Carpintería Los Andes', sub: 'Empresa', tag: 'Carpintería', stage: 'activo', value: 1450000, last: 'Hace 3 días', alert: false, next: 'Entrega del pedido el 22/10', av: '#2F6FB0', msg: 'Hola, ¿cómo andan? Les confirmo la entrega del pedido para el 22/10. ¡Saludos!' },
      { ini: 'DP', name: 'Diego Paz', sub: 'Empresa', tag: 'Construcción', stage: 'pres', value: 870000, last: 'Hace 8 días', alert: true, next: 'Ajustar presupuesto', av: '#5B4B8A', msg: 'Hola Diego, ¿cómo estás? Quería saber si pudiste revisar el presupuesto. Si querés, lo ajustamos a lo que necesites.' },
      { ini: 'LF', name: 'Laura Fernández', sub: 'Particular', tag: 'Cortinas', stage: 'neg', value: 640000, last: 'Hace 2 días', alert: false, next: 'Cerrar propuesta final', av: '#2F5E91', msg: 'Hola Laura, ¿cómo estás? Te comparto la propuesta con los cambios que hablamos. ¿Te parece si lo cerramos esta semana?' },
      { ini: 'ET', name: 'Ferretería El Tornillo', sub: 'Comercio', tag: 'Ferretería', stage: 'activo', value: 320000, last: 'Hace 12 días', alert: true, next: 'Ofrecer reposición mensual', av: '#3E8C54', msg: 'Hola, ¿cómo andan? Les escribo para saber si necesitan reponer mercadería este mes. ¡Saludos!' },
      { ini: 'SR', name: 'Sofía Ruiz', sub: 'Particular', tag: 'Cerrajería', stage: 'nuevo', value: 180000, last: 'Hoy', alert: false, next: 'Enviar presupuesto', av: '#8A5A00', msg: 'Hola Sofía, gracias por tu consulta. Te cuento cómo trabajamos y te paso un presupuesto sin compromiso.' },
      { ini: 'VO', name: 'Valeria Ortiz', sub: 'Particular', tag: 'Decoración', stage: 'nuevo', value: 95000, last: 'Ayer', alert: false, next: 'Llamar para relevar', av: '#9A6A10', msg: 'Hola Valeria, gracias por escribirnos. ¿Te queda bien una llamada corta para entender qué necesitás?' }
    ];
    const followCount = CLIENTS.filter((c) => c.alert).length;
    const cq = (S.cliQ || '').toLowerCase().trim();
    const cliRows = CLIENTS
      .filter((c) => (!S.onlyFollow || c.alert) && (S.cliStage === 'all' || c.stage === S.cliStage) && (!cq || (c.name + ' ' + c.tag).toLowerCase().indexOf(cq) !== -1))
      .map((c) => {
        const p = PILLX[STAGE[c.stage].tone];
        return Object.assign({}, c, {
          wa: wa(c.msg), status: STAGE[c.stage].label, sbg: p[0], sfg: p[1], valueTxt: fmt(c.value),
          lastC: c.alert ? '#A3284A' : '#5C5049', lastW: c.alert ? '600' : '400'
        });
      });
    const cliStages = Object.keys(STAGE).map((k) => {
      const list = CLIENTS.filter((c) => c.stage === k);
      const on = S.cliStage === k;
      const p = PILLX[STAGE[k].tone];
      return {
        label: STAGE[k].label, count: list.length, value: fmt(list.reduce((a, c) => a + c.value, 0)), on: on,
        pick: () => set({ cliStage: this.state.cliStage === k ? 'all' : k }),
        bg: on ? 'rgba(168,72,31,0.05)' : '#FFFFFF', bd: on ? '#A8481F' : '#E6DDD2', fg: p[1], cbg: p[0], bar: STAGE[k].bar
      };
    });
    const openValue = CLIENTS.filter((c) => c.stage !== 'activo').reduce((a, c) => a + c.value, 0);
    const vCli = {
      cliRows: cliRows, cliStages: cliStages, cliEmpty: cliRows.length === 0,
      cliQ: S.cliQ, onCliQ: (e) => set({ cliQ: e.target.value }),
      cliSummary: CLIENTS.length + ' clientes · ' + fmt(openValue) + ' en oportunidades abiertas',
      cliCount: 'Mostrando ' + cliRows.length + ' de ' + CLIENTS.length,
      cliFiltered: S.onlyFollow || S.cliStage !== 'all' || !!cq,
      cliClear: () => set({ onlyFollow: false, cliStage: 'all', cliQ: '' }),
      cliFollowToggle: () => set({ onlyFollow: !this.state.onlyFollow }), cliFollowOn: S.onlyFollow,
      cliFollowBg: S.onlyFollow ? '#A8481F' : '#FFFFFF', cliFollowFg: S.onlyFollow ? '#FFFFFF' : '#2A2421', cliFollowBd: S.onlyFollow ? '#A8481F' : '#DDD2C5',
      followCount: followCount
    };

    /* ---------- Agenda y turnos ---------- */
    const PROS = [
      { id: 'carla', name: 'Carla', ini: 'CA', role: 'Color', av: '#A44D61' },
      { id: 'nico', name: 'Nico', ini: 'NI', role: 'Barbería', av: '#2F6FB0' },
      { id: 'vale', name: 'Vale', ini: 'VA', role: 'Corte y peinado', av: '#9A6A10' }
    ];
    const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    const AG_ST = { 'Confirmado': PILL.green, 'Sin confirmar': PILL.amber, 'Asistió': PILL.blue };
    const hh = (h) => String(h).padStart(2, '0') + ':00';
    let agTotal = 0, agConf = 0, agPend = 0, agFree = 0;
    const agRows = HOURS.map((h) => ({
      time: hh(h),
      cells: PROS.map((p) => {
        const key = p.id + '-' + h;
        const a = S.agAppts[key];
        const sel = S.agSel === key;
        if (h === 13) return { isAppt: false, isFree: false, isBlocked: true };
        if (a) {
          agTotal += 1;
          if (a.status === 'Confirmado') agConf += 1;
          if (a.status === 'Sin confirmar') agPend += 1;
          return {
            isAppt: true, isFree: false, isBlocked: false,
            client: a.client, service: a.service, status: a.status, sfg: AG_ST[a.status][1], proC: p.av,
            bg: sel ? 'rgba(168,72,31,0.14)' : '#EFE8E0', bd: sel ? '#A8481F' : '#E1D7CB',
            aria: a.client + ', ' + a.service + ' a las ' + hh(h) + ' con ' + p.name,
            pick: () => set({ agSel: key, agErr: '', agMsg: '' })
          };
        }
        agFree += 1;
        return {
          isAppt: false, isFree: true, isBlocked: false,
          label: sel ? 'Nuevo turno' : '+ Libre',
          bg: sel ? 'rgba(168,72,31,0.14)' : 'transparent', bd: sel ? '#A8481F' : '#DDD2C5', bs: sel ? 'solid' : 'dashed', fg: sel ? '#A8481F' : '#6B5E54',
          aria: 'Cargar turno con ' + p.name + ' a las ' + hh(h),
          pick: () => set({ agSel: key, agName: '', agSvc: '', agErr: '', agMsg: '' })
        };
      })
    }));
    const selParts = S.agSel ? S.agSel.split('-') : null;
    const selPro = selParts ? PROS.find((p) => p.id === selParts[0]) : null;
    const selH = selParts ? parseInt(selParts[1], 10) : 0;
    const selAppt = S.agSel ? S.agAppts[S.agSel] : null;
    const SVCS = ['Corte', 'Color', 'Barbería', 'Brushing', 'Peinado'];
    const agSvcs = SVCS.map((v) => ({
      label: v, on: v === S.agSvc, pick: () => set({ agSvc: v, agErr: '' }),
      bg: v === S.agSvc ? '#A8481F' : 'transparent', fg: v === S.agSvc ? '#FFFFFF' : '#2A2421', bd: v === S.agSvc ? '#A8481F' : '#CFC2B3'
    }));
    const setAppt = (key, val) => {
      const n = Object.assign({}, this.state.agAppts);
      if (val) n[key] = val; else delete n[key];
      return n;
    };
    const agBook = () => {
      const key = this.state.agSel;
      const name = (this.state.agName || '').trim();
      if (!name) return set({ agErr: 'Punto de control: falta el nombre del cliente.' });
      if (!this.state.agSvc) return set({ agErr: 'Punto de control: elegí un servicio.' });
      if (this.state.agAppts[key]) return set({ agErr: 'Punto de control: ese horario ya está ocupado.' });
      set({
        agAppts: setAppt(key, { client: name, service: this.state.agSvc, status: 'Sin confirmar' }),
        agErr: '', agName: '', agSvc: '',
        agMsg: 'Turno agendado. El recordatorio por WhatsApp sale solo 24 h antes.'
      });
    };
    let agD = { client: '', service: '', pro: '', time: '', status: '', sbg: '', sfg: '', wa: '', canConfirm: false, canAttend: false };
    if (selAppt && selPro) {
      const first = selAppt.client.split(' ')[0];
      agD = {
        client: selAppt.client, service: selAppt.service, pro: selPro.name, time: hh(selH) + ' a ' + hh(selH + 1),
        status: selAppt.status, sbg: AG_ST[selAppt.status][0], sfg: AG_ST[selAppt.status][1],
        wa: wa('Hola ' + first + ', te recordamos tu turno de ' + selAppt.service.toLowerCase() + ' hoy a las ' + hh(selH) + ' con ' + selPro.name + ' en Studio Bruma. ¿Nos confirmás tu asistencia? ¡Gracias!'),
        canConfirm: selAppt.status === 'Sin confirmar', canAttend: selAppt.status === 'Confirmado'
      };
    }
    const agStatus = (st, msg) => () => {
      const key = this.state.agSel;
      const a = this.state.agAppts[key];
      if (!a) return;
      set({ agAppts: setAppt(key, Object.assign({}, a, { status: st })), agMsg: msg });
    };

    /* ---------- Tu idea ---------- */
    const P = (st, tone) => ({ st: st, bg: PILL[tone][0], fg: PILL[tone][1] });
    const row = (a, b, c, st, tone) => Object.assign({ a: a, b: b, c: c }, P(st, tone));
    const xs = (arr) => arr.map((x) => ({ x: x }));
    const IDEAS = {
      vehiculos: {
        label: 'Control de vehículos', title: 'Control de flota y vehículos',
        c1: 'Patente', c2: 'Chofer', c3: 'Kilometraje', c4: 'Estado',
        rows: [row('AB 123 CD', 'Juan P.', '84.200 km', 'Service en 800 km', 'amber'), row('AC 456 EF', 'Ana G.', '31.050 km', 'VTV vence 02/11', 'amber'), row('AE 789 GH', 'Nico R.', '12.400 km', 'Al día', 'green')],
        reg: ['Kilometraje y combustible por viaje', 'Vencimientos de VTV y seguro', 'Services y reparaciones'],
        ctl: ['No deja cargar un kilometraje menor al anterior', 'Vencimientos obligatorios para cada vehículo'],
        al: ['Aviso 15 días antes de cada vencimiento', 'Costo por kilómetro de cada vehículo']
      },
      canchas: {
        label: 'Reservas de canchas', title: 'Reservas de canchas',
        c1: 'Cancha', c2: 'Horario', c3: 'Cliente', c4: 'Estado',
        rows: [row('Cancha 1', 'Hoy 19:00', 'Grupo Martínez', 'Seña pagada', 'green'), row('Cancha 2', 'Hoy 20:00', 'Fede L.', 'Sin seña', 'amber'), row('Cancha 1', 'Hoy 21:00', '—', 'Libre', 'grey')],
        reg: ['Reservas por cancha y horario', 'Señas y pagos', 'Clientes frecuentes'],
        ctl: ['No permite reservas superpuestas', 'Seña obligatoria para confirmar'],
        al: ['Recordatorio por WhatsApp 2 h antes', 'Ocupación por día y por cancha']
      },
      mayorista: {
        label: 'Pedidos mayoristas', title: 'Pedidos mayoristas',
        c1: 'Cliente', c2: 'Pedido', c3: 'Entrega', c4: 'Estado',
        rows: [row('Almacén Don José', '24 bultos', '18/10', 'Preparando', 'blue'), row('Kiosco La Esquina', '9 bultos', '19/10', 'Confirmado', 'green'), row('Súper Norte', '40 bultos', '—', 'Supera el crédito', 'red')],
        reg: ['Pedidos con lista de precios por cliente', 'Fechas de entrega', 'Saldos y límites de crédito'],
        ctl: ['Precio tomado de la lista de cada cliente', 'Bloqueo si supera el límite de crédito'],
        al: ['Pedidos pendientes de entrega', 'Clientes que no compran hace 30 días']
      },
      alumnos: {
        label: 'Seguimiento de alumnos', title: 'Seguimiento de alumnos',
        c1: 'Alumno', c2: 'Curso', c3: 'Asistencia', c4: 'Cuota',
        rows: [row('Mica Torres', 'Inglés B1', '92%', 'Al día', 'green'), row('Lucas Gil', 'Guitarra', '68%', 'Cuota vencida', 'red'), row('Sol Romero', 'Inglés A2', '85%', 'Vence el 20/10', 'amber')],
        reg: ['Asistencia por clase', 'Cuotas y pagos', 'Notas y avances'],
        ctl: ['Asistencia obligatoria en cada clase', 'Inscripción solo con cuota al día'],
        al: ['Aviso tras 2 faltas seguidas', 'Cuotas vencidas para recordar']
      },
      mantenimiento: {
        label: 'Mantenimiento de equipos', title: 'Mantenimiento de equipos',
        c1: 'Equipo', c2: 'Ubicación', c3: 'Última revisión', c4: 'Estado',
        rows: [row('Compresor 2', 'Planta', 'Hace 12 días', 'Al día', 'green'), row('Horno 1', 'Cocina', 'Hace 40 días', 'Revisión vencida', 'red'), row('Autoelevador', 'Depósito', 'Hace 25 días', 'Revisar pronto', 'amber')],
        reg: ['Equipos y su ubicación', 'Revisiones con checklist y fotos', 'Fallas y repuestos usados'],
        ctl: ['Checklist obligatorio en cada revisión', 'Foto del equipo para cerrar la tarea'],
        al: ['Revisiones vencidas o próximas', 'Equipos con fallas repetidas']
      },
      herramientas: {
        label: 'Préstamo de herramientas', title: 'Préstamo de herramientas',
        c1: 'Herramienta', c2: 'La tiene', c3: 'Desde', c4: 'Estado',
        rows: [row('Amoladora 115 mm', 'Juan P.', 'Hace 3 días', 'Sin devolver', 'red'), row('Taladro percutor', 'Depósito', '—', 'Disponible', 'green'), row('Escalera 6 m', 'Ana G.', 'Hoy', 'En uso', 'blue')],
        reg: ['Quién retira y quién devuelve', 'Estado de cada herramienta', 'Historial por persona'],
        ctl: ['Confirmación al retirar y al devolver', 'No se presta lo que está en reparación'],
        al: ['Aviso si no se devuelve en 48 h', 'Herramientas más usadas']
      }
    };
    let ideaSel;
    if (S.idea === 'custom' && S.ideaText) {
      const t = S.ideaText.charAt(0).toUpperCase() + S.ideaText.slice(1);
      ideaSel = {
        title: t, c1: 'Registro', c2: 'Responsable', c3: 'Fecha', c4: 'Estado',
        rows: [row('Registro #001', 'Ana G.', 'Hoy', 'En curso', 'blue'), row('Registro #002', 'Juan P.', 'Ayer', 'Pendiente', 'amber'), row('Registro #003', 'Ana G.', '15/10', 'Terminado', 'green')],
        reg: ['Todos los datos que hoy anotás a mano', 'Quién hizo cada cosa y cuándo', 'Historial completo y buscable'],
        ctl: ['Campos obligatorios para no olvidar nada', 'Estados claros para saber en qué está cada cosa'],
        al: ['Avisos de lo pendiente y lo vencido', 'Resumen semanal automático']
      };
    } else {
      ideaSel = IDEAS[S.idea] || IDEAS.vehiculos;
    }
    const idea = Object.assign({}, ideaSel, {
      rows: ideaSel.rows, reg: xs(ideaSel.reg), ctl: xs(ideaSel.ctl), al: xs(ideaSel.al),
      wa: 'https://wa.me/5493514076087?text=' + encodeURIComponent('Hola, ¿cómo estás? Tengo una idea para mi negocio: ' + ideaSel.title.toLowerCase() + '. ¿Se podría armar algo así?')
    });
    const ideaChips = Object.keys(IDEAS).map((k) => {
      const on = S.idea === k;
      return { label: IDEAS[k].label, on: on, pick: () => set({ idea: k, ideaErr: '' }), bg: on ? '#A8481F' : '#FFFFFF', fg: on ? '#FFFFFF' : '#2A2421', bd: on ? '#A8481F' : '#DDD2C5' };
    });
    const ideaBuild = () => {
      const t = (this.state.ideaDraft || '').trim();
      if (t.length < 4) return set({ ideaErr: 'Contanos un poco más tu idea.' });
      set({ idea: 'custom', ideaText: t, ideaErr: '' });
    };

    /* ---------- Stock ---------- */
    const q = (S.q || '').toLowerCase().trim();
    const CATS = ['Todas', 'Fijaciones', 'Herramientas', 'Pinturería'];
    const moveStock = (code, d) => {
      const st = this.state;
      const prod = st.products.find((p) => p.code === code);
      if (!prod || prod.qty + d < 0) return;
      const products = st.products.map((p) => p.code === code ? Object.assign({}, p, { qty: p.qty + d }) : p);
      let log = st.stockLog.slice();
      if (log.length && log[0].code === code && log[0].who === 'Vos') {
        const nd = log[0].d + d;
        log = nd === 0 ? log.slice(1) : [Object.assign({}, log[0], { d: nd, time: now() })].concat(log.slice(1));
      } else {
        log = [{ code: code, name: prod.name, d: d, who: 'Vos', time: now() }].concat(log);
      }
      set({ products: products, stockLog: log.slice(0, 12), stockMsg: '', moves: st.moves + 1 });
    };
    const LV = { out: ['Sin stock', 'red', '#C8405F'], low: ['Reponer', 'red', '#C8405F'], warn: ['Stock bajo', 'amber', '#D19A2A'], ok: ['Normal', 'green', '#3E8C54'] };
    const levelOf = (p) => p.qty === 0 ? 'out' : (p.qty <= p.min ? 'low' : (p.qty <= p.min * 1.5 ? 'warn' : 'ok'));
    const stockRows = S.products
      .filter((p) => (S.stockCat === 'Todas' || p.cat === S.stockCat) && (!q || (p.code + ' ' + p.name).toLowerCase().indexOf(q) !== -1))
      .map((p) => {
        const lv = LV[levelOf(p)];
        const low = p.qty <= p.min;
        return {
          code: p.code, name: p.name, cat: p.cat, qty: p.qty, min: p.min,
          costTxt: p.cost ? fmt(p.cost) + ' c/u' : 'sin costo cargado',
          pct: Math.min(100, Math.round(p.qty / (p.min * 3) * 100)), minPct: 33,
          barC: lv[2], qc: low ? '#A3284A' : '#2A2421',
          cover: low ? 'Mínimo ' + p.min + ' · sugerido pedir ' + (p.min * 2 - p.qty) : 'Mínimo ' + p.min,
          status: lv[0], sbg: PILL[lv[1]][0], sfg: PILL[lv[1]][1],
          inc: () => moveStock(p.code, 1), dec: () => moveStock(p.code, -1)
        };
      });
    const lowList = S.products.filter((p) => p.qty <= p.min);
    const lowCount = lowList.length;
    const stockValueN = S.products.reduce((a, p) => a + p.qty * (p.cost || 0), 0);
    const stockCatBtns = CATS.map((c) => Object.assign({ label: c, pick: () => set({ stockCat: c }) }, seg(S.stockCat === c)));
    const stockLog = S.stockLog.slice(0, 4).map((l) => ({
      name: l.name, who: l.who, time: l.time, qty: (l.d > 0 ? '+' : '−') + Math.abs(l.d),
      sign: l.d > 0 ? '+' : '−', kind: l.d > 0 ? 'Entrada' : 'Salida',
      bg: l.d > 0 ? PILL.green[0] : PILL.red[0], fg: l.d > 0 ? PILL.green[1] : PILL.red[1]
    }));
    const newCat = S.stockCat !== 'Todas' ? S.stockCat : 'Varios';
    const addProduct = () => {
      const st = this.state;
      const name = (st.newName || '').trim();
      const qn = parseInt(st.newQty, 10);
      if (!name) return set({ stockMsg: 'Punto de control: falta el nombre del producto.', stockErr: true });
      if (isNaN(qn) || qn < 0) return set({ stockMsg: 'Punto de control: la cantidad tiene que ser un número.', stockErr: true });
      if (st.products.some((p) => p.name.toLowerCase() === name.toLowerCase())) return set({ stockMsg: 'Punto de control: ese producto ya existe.', stockErr: true });
      const code = 'N-' + String(100 + st.products.length + 1);
      set({
        products: [{ code: code, name: name, cat: newCat, qty: qn, min: 5, cost: 0 }].concat(st.products),
        stockLog: [{ code: code, name: name, d: qn, who: 'Vos', time: now() }].concat(st.stockLog).slice(0, 12),
        newName: '', newQty: '', q: '', moves: st.moves + 1,
        stockMsg: 'Producto dado de alta: ' + name + ' (' + code + ').', stockErr: false
      });
    };
    const poMsg = 'Hola, ¿cómo están? Les paso el pedido de reposición:\n' + lowList.map((p) => '• ' + p.name + ': ' + (p.min * 2 - p.qty) + ' u.').join('\n') + '\n¡Gracias!';
    const vStock = {
      stockQ: S.q, onStockQ: (e) => set({ q: e.target.value }),
      stockRows: stockRows, stockNoResults: stockRows.length === 0,
      stockTotal: S.products.length, stockCats: CATS.length - 1, stockValue: fmt(stockValueN),
      lowCount: lowCount, movesToday: S.moves, stockCatBtns: stockCatBtns, stockLog: stockLog,
      stockHasLow: lowCount > 0, stockPoWa: wa(poMsg), stockNewCat: newCat,
      newName: S.newName, newQty: S.newQty,
      onNewName: (e) => set({ newName: e.target.value }), onNewQty: (e) => set({ newQty: e.target.value }),
      addProduct: addProduct,
      stockMsgShow: !!S.stockMsg, stockMsg: S.stockMsg,
      stockMsgBg: S.stockErr ? PILL.red[0] : PILL.green[0], stockMsgFg: S.stockErr ? PILL.red[1] : PILL.green[1]
    };

    /* ---------- Planificación ---------- */
    const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const WHO = { Ana: ['#5A6B80', 'AG'], Juan: ['#2F6FB0', 'JP'], Equipo: ['#9A6A10', 'EQ'] };
    const doneCount = S.tasks.filter((t) => t.done).length;
    const toggleTask = (id) => set({ tasks: this.state.tasks.map((t) => t.id === id ? Object.assign({}, t, { done: !t.done }) : t) });
    const taskRows = S.tasks.map((t) => ({
      name: t.name, who: t.who, ini: WHO[t.who][1], done: t.done,
      when: DAYS[t.start] + (t.len > 1 ? ' – ' + DAYS[t.start + t.len - 1] : ''),
      toggle: () => toggleTask(t.id),
      left: t.start * 20, width: t.len * 20,
      barBg: t.done ? '#3E8C54' : WHO[t.who][0],
      barLabel: t.done ? 'Hecha' : t.who,
      whoBg: WHO[t.who][0],
      boxBg: t.done ? '#A8481F' : 'transparent', boxBd: t.done ? '#A8481F' : '#9A8D82',
      deco: t.done ? 'line-through' : 'none', tc: t.done ? '#7A6D63' : '#2A2421',
      status: t.done ? 'Hecha' : (t.start <= 2 ? 'En curso' : 'Pendiente'),
      sbg: t.done ? PILL.green[0] : (t.start <= 2 ? PILL.blue[0] : PILL.grey[0]),
      sfg: t.done ? PILL.green[1] : (t.start <= 2 ? PILL.blue[1] : PILL.grey[1])
    }));
    const planToggles = [
      Object.assign({ label: 'Gantt', pick: () => set({ planView: 'gantt' }) }, seg(S.planView === 'gantt')),
      Object.assign({ label: 'Lista', pick: () => set({ planView: 'lista' }) }, seg(S.planView === 'lista'))
    ];

    /* ---------- Órdenes ---------- */
    const STAGES = ['Pendientes', 'En proceso', 'Terminadas'];
    const DOTS = ['#9A8D82', '#D19A2A', '#3E8C54'];
    const ACTIONS = ['Iniciar', 'Finalizar', 'Reabrir'];
    const PRIO = { Alta: PILL.red, Media: PILL.amber, Baja: PILL.grey };
    const PRIOC = { Alta: '#C8405F', Media: '#D19A2A', Baja: '#CFC2B3' };
    const AV = { JP: '#2F6FB0', AG: '#5A6B80', EQ: '#9A6A10' };
    const WHO_N = { all: 'Todos', JP: 'Juan P.', AG: 'Ana G.', EQ: 'Equipo' };
    const advance = (id) => set({ orders: this.state.orders.map((o) => {
      if (o.id !== id) return o;
      if (o.stage === 0) return Object.assign({}, o, { stage: 1, done: Math.max(o.done, 1) });
      if (o.stage === 1) return Object.assign({}, o, { stage: 2, done: o.steps, end: '15/10' });
      return Object.assign({}, o, { stage: 0, done: 0, end: '' });
    }) });
    const dueOf = (o) => {
      if (o.stage === 2) return { txt: 'Entregada ' + (o.end || o.date), tone: 'green' };
      if (o.dd < 0) return { txt: 'Atrasada · ' + o.date, tone: 'red' };
      if (o.dd === 0) return { txt: 'Vence hoy', tone: 'amber' };
      return { txt: 'Vence ' + o.date, tone: 'grey' };
    };
    const ordCols = STAGES.map((title, i) => {
      const cards = S.orders.filter((o) => o.stage === i && (S.ordWho === 'all' || o.who === S.ordWho)).map((o) => {
        const du = dueOf(o);
        return Object.assign({}, o, {
          action: ACTIONS[i], advance: () => advance(o.id), whoN: WHO_N[o.who], prioL: o.prio.toLowerCase(),
          pbg: PRIO[o.prio][0], pfg: PRIO[o.prio][1], pc: PRIOC[o.prio], av: AV[o.who],
          pct: Math.round(o.done / o.steps * 100), chkTxt: o.done + '/' + o.steps + ' tareas',
          barC: o.stage === 2 ? '#3E8C54' : '#A8481F',
          dueTxt: du.txt, dbg: PILL[du.tone][0], dfg: PILL[du.tone][1]
        });
      });
      return { title: title, count: cards.length, cards: cards, dot: DOTS[i], empty: cards.length === 0 };
    });
    const openOrders = S.orders.filter((o) => o.stage < 2).length;
    const ordLate = S.orders.filter((o) => o.stage < 2 && o.dd < 0).length;
    const ordToday = S.orders.filter((o) => o.stage < 2 && o.dd === 0).length;
    const ordDone = S.orders.filter((o) => o.stage === 2).length;
    const vOrd = {
      ordCols: ordCols, openOrders: openOrders, ordLate: ordLate, ordToday: ordToday, ordDone: ordDone,
      ordSummary: openOrders + ' abiertas · ' + ordLate + (ordLate === 1 ? ' atrasada' : ' atrasadas') + ' · hoy 15/10',
      ordWhoBtns: Object.keys(WHO_N).map((k) => Object.assign({ label: WHO_N[k], pick: () => set({ ordWho: k }) }, seg(S.ordWho === k))),
      ordNew: () => {
        const st = this.state;
        const who = st.ordWho === 'all' ? 'AG' : st.ordWho;
        set({ ordSeq: st.ordSeq + 1, orders: st.orders.concat([{ id: 'OT-0' + st.ordSeq, title: 'Nueva orden de trabajo', client: 'Cliente a definir', who: who, prio: 'Media', date: '22/10', dd: 7, stage: 0, done: 0, steps: 3 }]) });
      }
    };

    /* ---------- Control de calidad ---------- */
    const STEPS = [
      'Verificar medidas según plano',
      'Lijado y terminación sin marcas',
      'Color igual a la muestra aprobada',
      'Fotos del producto terminado',
      'Embalaje y etiqueta con datos del cliente'
    ];
    const cd = S.checkDone;
    const chkRows = STEPS.map((text, i) => ({
      num: String(i + 1), text: text,
      isDone: i < cd, isNext: i === cd, isLocked: i > cd,
      hasLine: i < STEPS.length - 1, lineC: i < cd ? '#A8481F' : '#E6DDD2',
      tc: i > cd ? '#7A6D63' : '#2A2421',
      meta: i < cd ? 'Hecho por ' + (S.chkMeta[i] || '') : (i === cd ? 'Se registra quién lo hizo y a qué hora' : 'Se habilita al completar el paso anterior')
    }));
    const chkComplete = cd >= STEPS.length;

    /* ---------- Caja ---------- */
    const SALDO_INICIAL = 150000;
    const METHODS = { ef: ['Efectivo', '#3E8C54'], tr: ['Transferencia', '#3D78C0'], tj: ['Tarjeta', '#C98A1E'] };
    let tin = 0, tout = 0, efIn = 0, efOut = 0;
    const byM = { ef: 0, tr: 0, tj: 0 };
    S.movs.forEach((m) => {
      if (m.type === 'in') { tin += m.amount; byM[m.method] += m.amount; if (m.method === 'ef') efIn += m.amount; }
      else { tout += m.amount; if (m.method === 'ef') efOut += m.amount; }
    });
    const saldo = SALDO_INICIAL + tin - tout;
    const efEsp = SALDO_INICIAL + efIn - efOut;
    const parseAmt = (v) => parseFloat(String(v || '').replace(/[$\s]/g, '').replace(/\./g, '').replace(',', '.'));
    const addMov = (type) => {
      const st = this.state;
      if (st.cajaClosed) return set({ cajaMsg: 'La caja está cerrada. Reabrila para registrar movimientos.', cajaErr: true });
      const c = (st.cConcept || '').trim();
      const a = parseAmt(st.cAmount);
      if (!c) return set({ cajaMsg: 'Punto de control: completá el concepto.', cajaErr: true });
      if (!(a > 0)) return set({ cajaMsg: 'Punto de control: el monto tiene que ser mayor a cero.', cajaErr: true });
      if (type === 'out' && st.cajaMethod === 'ef' && a > efEsp) return set({ cajaMsg: 'Punto de control: el egreso supera el efectivo disponible en caja.', cajaErr: true });
      if (type === 'out' && a > saldo) return set({ cajaMsg: 'Punto de control: el egreso supera el saldo disponible.', cajaErr: true });
      set({
        movs: [{ concept: c, amount: a, type: type, time: now(), method: st.cajaMethod }].concat(st.movs), cConcept: '', cAmount: '',
        cajaMsg: (type === 'in' ? 'Ingreso' : 'Egreso') + ' registrado: ' + fmt(a) + ' en ' + METHODS[st.cajaMethod][0].toLowerCase() + '.', cajaErr: false
      });
    };
    const movRows = S.movs.map((m) => ({
      concept: m.concept, time: m.time, method: METHODS[m.method][0], mc: METHODS[m.method][1],
      isIn: m.type === 'in', isOut: m.type !== 'in', kind: m.type === 'in' ? 'Ingreso' : 'Egreso',
      amount: (m.type === 'in' ? '+ ' : '− ') + fmt(m.amount),
      bg: m.type === 'in' ? PILL.green[0] : PILL.red[0], fg: m.type === 'in' ? PILL.green[1] : PILL.red[1]
    }));
    const pctOf = (v) => tin ? Math.round(v / tin * 100) : 0;
    const counted = parseAmt(S.cajaCount);
    const hasCount = String(S.cajaCount || '').trim() !== '' && !isNaN(counted);
    let cajaDiff = { txt: '', bg: '', fg: '' };
    if (hasCount) {
      const df = counted - efEsp;
      if (Math.abs(df) < 1) cajaDiff = { txt: 'Coincide con lo esperado. Sin diferencias.', bg: PILL.green[0], fg: PILL.green[1] };
      else if (df < 0) cajaDiff = { txt: 'Faltante de ' + fmt(-df) + '. Queda registrado en el cierre.', bg: PILL.red[0], fg: PILL.red[1] };
      else cajaDiff = { txt: 'Sobrante de ' + fmt(df) + '. Queda registrado en el cierre.', bg: PILL.amber[0], fg: PILL.amber[1] };
    }
    const nIn = S.movs.filter((m) => m.type === 'in').length;
    const nOut = S.movs.length - nIn;
    const vCaja = {
      cajaInicial: fmt(SALDO_INICIAL), cajaSaldo: fmt(saldo), cajaIn: fmt(tin), cajaOut: fmt(tout), cajaEfEsp: fmt(efEsp),
      cajaInN: nIn + (nIn === 1 ? ' cobro o venta' : ' cobros y ventas'), cajaOutN: nOut + (nOut === 1 ? ' pago' : ' pagos'),
      cConcept: S.cConcept, cAmount: S.cAmount,
      onConcept: (e) => set({ cConcept: e.target.value }), onAmount: (e) => set({ cAmount: e.target.value }),
      addIn: () => addMov('in'), addOut: () => addMov('out'),
      cajaMsgShow: !!S.cajaMsg, cajaMsg: S.cajaMsg,
      cajaMsgBg: S.cajaErr ? PILL.red[0] : PILL.green[0], cajaMsgFg: S.cajaErr ? PILL.red[1] : PILL.green[1],
      movRows: movRows,
      cajaMix: Object.keys(METHODS).map((k) => ({ label: METHODS[k][0], c: METHODS[k][1], amt: fmt(byM[k]), pct: pctOf(byM[k]), pctTxt: pctOf(byM[k]) + '%' })),
      cajaMethodBtns: Object.keys(METHODS).map((k) => Object.assign({ label: METHODS[k][0], pick: () => set({ cajaMethod: k }) }, seg(S.cajaMethod === k))),
      cajaCount: S.cajaCount, onCajaCount: (e) => set({ cajaCount: e.target.value }), cajaCountShow: hasCount, cajaDiff: cajaDiff,
      cajaClose: () => {
        const st = this.state;
        const c2 = parseAmt(st.cajaCount);
        if (String(st.cajaCount || '').trim() === '' || isNaN(c2)) return set({ cajaMsg: 'Punto de control: ingresá el efectivo contado antes de cerrar la caja.', cajaErr: true });
        set({ cajaClosed: now(), cajaMsg: '', cajaErr: false });
      },
      cajaClosed: !!S.cajaClosed, cajaOpen: !S.cajaClosed,
      cajaClosedMsg: 'Caja cerrada a las ' + S.cajaClosed + '. El resumen del día queda guardado y le llega al responsable.',
      cajaReopen: () => set({ cajaClosed: '', cajaCount: '' }),
      cajaState: S.cajaClosed ? { label: 'Cerrada', bg: PILL.grey[0], fg: PILL.grey[1] } : { label: 'Abierta', bg: PILL.green[0], fg: PILL.green[1] }
    };

    /* ---------- Cobranzas ---------- */
    const COBRADO_MES = 1860000;
    let cobTotal = 0, cobVenc = 0, cobProx = 0, overdueCount = 0, cobHoy = 0, cobOpenN = 0;
    const AGE = [
      { k: 'ok', label: 'Al día', c: '#3E8C54' },
      { k: 'soon', label: 'Vence en 7 días', c: '#D19A2A' },
      { k: 'late', label: '1 a 30 días', c: '#C8405F' },
      { k: 'old', label: 'Más de 30 días', c: '#8E1F3B' }
    ];
    const ageSum = { ok: 0, soon: 0, late: 0, old: 0 };
    const ageOf = (d) => d.days > 30 ? 'old' : (d.days > 0 ? 'late' : (d.days >= -7 ? 'soon' : 'ok'));
    const payDebt = (id) => {
      const st = this.state;
      const d = st.debts.find((x) => x.id === id);
      if (!d || d.paid) return;
      set({
        debts: st.debts.map((x) => x.id === id ? Object.assign({}, x, { paid: now() }) : x),
        movs: [{ concept: 'Cobro ' + d.name, amount: d.amount, type: 'in', time: now(), method: 'tr', ref: id }].concat(st.movs),
        cobMsg: 'Pago registrado: ' + fmt(d.amount) + ' de ' + d.name + '. Se sumó a la Caja del día como transferencia.'
      });
    };
    const undoDebt = (id) => {
      const st = this.state;
      set({ debts: st.debts.map((x) => x.id === id ? Object.assign({}, x, { paid: '' }) : x), movs: st.movs.filter((m) => m.ref !== id), cobMsg: '' });
    };
    const allDebts = S.debts.slice().sort((a, b) => ((a.paid ? 1 : 0) - (b.paid ? 1 : 0)) || (b.days - a.days)).map((d) => {
      let status, tone, msg = '', when, group;
      if (d.paid) {
        cobHoy += d.amount; status = 'Cobrada'; tone = 'green'; when = 'Pagada hoy ' + d.paid; group = 'paid';
      } else {
        cobTotal += d.amount; cobOpenN += 1; ageSum[ageOf(d)] += d.amount;
        if (d.days > 0) {
          cobVenc += d.amount; overdueCount += 1; group = 'late';
          status = 'Vencida'; tone = 'red'; when = 'hace ' + d.days + ' días';
          msg = 'Hola, ¿cómo estás? Te recuerdo que la factura ' + d.comp + ' por ' + fmt(d.amount) + ' venció el ' + d.vto + '. ¿Me confirmás cuándo podés abonarla? ¡Gracias!';
        } else if (d.days >= -7) {
          cobProx += d.amount; group = 'next';
          status = 'Por vencer'; tone = 'amber'; when = d.days === 0 ? 'vence hoy' : 'en ' + (-d.days) + ' días';
          msg = 'Hola, ¿cómo estás? Te recuerdo que la factura ' + d.comp + ' por ' + fmt(d.amount) + ' vence el ' + d.vto + '. ¡Gracias!';
        } else {
          group = 'next'; status = 'Al día'; tone = 'green'; when = 'en ' + (-d.days) + ' días';
          msg = 'Hola, ¿cómo estás? Te paso el detalle de tu cuenta: factura ' + d.comp + ' por ' + fmt(d.amount) + ', con vencimiento el ' + d.vto + '.';
        }
      }
      return {
        name: d.name, comp: d.comp, vto: d.vto, when: when, amount: fmt(d.amount), status: status, group: group,
        bg: PILL[tone][0], fg: PILL[tone][1], amtC: d.paid ? '#9A8D82' : '#2A2421', wa: wa(msg),
        isPaid: !!d.paid, isOpen: !d.paid, pay: () => payDebt(d.id), undo: () => undoDebt(d.id)
      };
    });
    const debtRows = allDebts.filter((r) => S.cobFilter === 'todas' || r.group === S.cobFilter);
    const vCob = {
      cobTotal: fmt(cobTotal), cobVencido: fmt(cobVenc), cobProx: fmt(cobProx), debtRows: debtRows, cobEmpty: debtRows.length === 0,
      cobOpenN: cobOpenN + (cobOpenN === 1 ? ' comprobante' : ' comprobantes'),
      cobVencN: overdueCount + (overdueCount === 1 ? ' factura vencida' : ' facturas vencidas'),
      cobCobrado: fmt(COBRADO_MES + cobHoy), cobHoyTxt: cobHoy ? '+ ' + fmt(cobHoy) + ' hoy' : 'hasta hoy',
      cobAging: AGE.map((a) => ({ label: a.label, c: a.c, amt: fmt(ageSum[a.k]), pct: cobTotal ? (ageSum[a.k] / cobTotal * 100).toFixed(1) : 0 })),
      cobAgingNote: 'Saldo pendiente ' + fmt(cobTotal),
      cobFilters: [['todas', 'Todas'], ['late', 'Vencidas'], ['next', 'Por vencer'], ['paid', 'Cobradas']].map((f) => Object.assign({ label: f[1], pick: () => set({ cobFilter: f[0] }) }, seg(S.cobFilter === f[0]))),
      cobMsgShow: !!S.cobMsg, cobMsg: S.cobMsg
    };

    /* ---------- Indicadores ---------- */
    const isMes = S.period === 'mes';
    const up = { nbg: PILL.green[0], nfg: PILL.green[1] };
    const warn = { nbg: PILL.red[0], nfg: PILL.red[1] };
    const kpis = isMes ? [
      Object.assign({ label: 'Ventas del mes', value: '$ 5.380.000', note: '↑ 12% vs. septiembre' }, up),
      Object.assign({ label: 'Presupuestos abiertos', value: '23', note: '↑ 5 nuevos' }, up),
      Object.assign({ label: 'Tasa de cierre', value: '41%', note: '↑ 4 puntos' }, up),
      Object.assign({ label: 'A cobrar', value: fmt(cobTotal), note: fmt(cobVenc) + ' vencido' }, warn)
    ] : [
      Object.assign({ label: 'Ventas de la semana', value: '$ 1.240.000', note: '↑ 8% vs. semana 41' }, up),
      Object.assign({ label: 'Presupuestos abiertos', value: '8', note: '↑ 2 nuevos' }, up),
      Object.assign({ label: 'Tasa de cierre', value: '38%', note: '↑ 2 puntos' }, up),
      Object.assign({ label: 'A cobrar', value: fmt(cobTotal), note: fmt(cobVenc) + ' vencido' }, warn)
    ];
    const series = isMes
      ? { labels: ['May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'], vals: [3.9, 4.3, 4.1, 4.6, 4.8, 5.38] }
      : { labels: ['S37', 'S38', 'S39', 'S40', 'S41', 'S42'], vals: [0.95, 1.08, 0.9, 1.12, 1.15, 1.24] };
    const maxV = Math.max.apply(null, series.vals);
    const bars = series.vals.map((v, i) => ({
      label: series.labels[i],
      val: v.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + ' M',
      h: Math.round((v / maxV) * 82),
      bg: i === series.vals.length - 1 ? '#A8481F' : '#CFC2B3'
    }));
    const periodBtns = [
      Object.assign({ label: 'Semana', pick: () => set({ period: 'semana' }) }, seg(!isMes)),
      Object.assign({ label: 'Mes', pick: () => set({ period: 'mes' }) }, seg(isMes))
    ];
    const alerts = [
      { text: '5 consultas desde la web', mod: 'Página web', dot: '#3D78C0', go: () => set({ mod: 'web' }) },
      { text: agPend + ' turnos sin confirmar', mod: 'Agenda y turnos', dot: '#C98A1E', go: () => set({ mod: 'agenda' }) },
      { text: followCount + ' clientes para seguir', mod: 'Clientes', dot: '#C98A1E', go: () => set({ mod: 'clientes', onlyFollow: true }) },
      { text: lowCount + ' productos para reponer', mod: 'Stock', dot: '#C8405F', go: () => set({ mod: 'stock' }) },
      { text: overdueCount + ' facturas vencidas', mod: 'Cobranzas', dot: '#C8405F', go: () => set({ mod: 'cobranzas' }) },
      { text: openOrders + ' órdenes abiertas', mod: 'Órdenes de trabajo', dot: '#A8481F', go: () => set({ mod: 'ordenes' }) }
    ];

    return Object.assign({
      tm: tm, cur: cur,
      heroMods: heroMods, hp: hp,
      menuOpen: S.menuOpen, menuClosed: !S.menuOpen,
      menuCls: S.menuOpen ? 'open' : '', contentCls: S.menuOpen ? 'is-hidden' : '',
      menuBd: S.menuOpen ? '#A8481F' : '#DDD2C5',
      menuToggle: () => set({ menuOpen: !this.state.menuOpen }),
      navPos: (navIdx + 1) + ' de ' + NAV_ORDER.length,
      navPrev: navGo(-1), navNext: navGo(1),
      prevName: navName(navIdx - 1), nextName: navName(navIdx + 1),
      isCot: S.mod === 'cotizador', isCli: S.mod === 'clientes', isWeb: S.mod === 'web', isStock: S.mod === 'stock', isPlan: S.mod === 'plan',
      isOrd: S.mod === 'ordenes', isChk: S.mod === 'checklist', isCaja: S.mod === 'caja', isCob: S.mod === 'cobranzas', isKpi: S.mod === 'kpi',

      site: S.site, siteDomain: SITES[S.site].domain,
      isSite0: S.site === 0, isSite1: S.site === 1, isSite2: S.site === 2,
      webTabs: webTabs, webDots: webDots,
      webPrev: () => goSite(S.site - 1), webNext: () => goSite(S.site + 1),
      webToggle: () => set({ webPaused: !this.state.webPaused }),
      webPlaying: !S.webPaused, webPaused: S.webPaused,
      webPauseLabel: S.webPaused ? 'Reanudar' : 'Pausar',
      webEnter: () => set({ webHover: true }), webLeave: () => set({ webHover: false }),
      webProg: Math.round(S.webElapsed / WEB_DUR * 100),
      webStatusTxt: S.webPaused ? 'Pausado' : (S.webHover ? 'Pausado mientras mirás' : 'Siguiente en ' + (WEB_DUR - S.webElapsed) + ' s'),
      webDot: webStopped ? '#C98A1E' : '#A8481F',
      waRoble: wa('Hola Mueblería Roble, quiero pedir un presupuesto.'),
      waBruma: wa('Hola Studio Bruma, quiero reservar un turno.'),
      waFarma: wa('Hola Farmacia del Parque, les envío mi receta.'),
      slots: slots, slotChosen: !!S.slot,
      slotMsg: 'Turno de las ' + S.slot + ' reservado. Se agenda solo y te llega la confirmación por WhatsApp.',

      isAg: S.mod === 'agenda',
      agPros: PROS, agRows: agRows,
      agTotal: agTotal, agConf: agConf, agPend: agPend, agFree: agFree,
      agPanelNone: !S.agSel, agPanelNew: !!S.agSel && !selAppt, agPanelAppt: !!selAppt,
      agSelTitle: selPro ? selPro.name + ' · ' + hh(selH) + ' a ' + hh(selH + 1) : '',
      agName: S.agName, onAgName: (e) => set({ agName: e.target.value, agErr: '' }),
      agSvcs: agSvcs, agBook: agBook,
      agErrShow: !!S.agErr, agErr: S.agErr,
      agMsgShow: !!S.agMsg, agMsg: S.agMsg,
      agClose: () => set({ agSel: '', agErr: '' }),
      agD: agD,
      agConfirm: agStatus('Confirmado', 'Turno confirmado.'),
      agAttend: agStatus('Asistió', 'Asistencia registrada. El cobro queda listo en Caja.'),
      agCancel: () => set({ agAppts: setAppt(this.state.agSel, null), agSel: '', agMsg: 'Turno cancelado: el horario quedó libre.' }),

      isIdea: S.mod === 'idea',
      idea: idea, ideaChips: ideaChips, ideaBuild: ideaBuild,
      ideaDraft: S.ideaDraft, onIdeaDraft: (e) => set({ ideaDraft: e.target.value, ideaErr: '' }),
      ideaErrShow: !!S.ideaErr, ideaErr: S.ideaErr,

      taskRows: taskRows, planToggles: planToggles,
      planIsGantt: S.planView === 'gantt', planIsTasks: S.planView === 'lista',
      planProgress: doneCount + ' de ' + S.tasks.length + ' tareas',
      planPct: Math.round(doneCount / S.tasks.length * 100),

      chkRows: chkRows, chkPct: Math.round(cd / STEPS.length * 100),
      chkProgress: cd + ' de ' + STEPS.length + ' pasos',
      chkComplete: chkComplete, chkNotComplete: !chkComplete,
      chkBadge: chkComplete ? { label: 'Aprobada', bg: PILL.green[0], fg: PILL.green[1] } : { label: 'En control', bg: PILL.amber[0], fg: PILL.amber[1] },
      chkNext: () => {
        const n = this.state.checkDone;
        if (n >= STEPS.length) return;
        const meta = this.state.chkMeta.slice(0, n).concat(['Vos · ' + now()]);
        set({ checkDone: n + 1, chkMeta: meta });
      },
      chkReset: () => set({ checkDone: 0, chkMeta: [] }),

      kpis: kpis, bars: bars, periodBtns: periodBtns, alerts: alerts,
      chartTitle: isMes ? 'Ventas por mes · millones de $' : 'Ventas por semana · millones de $'
    }, vCot, vCli, vStock, vOrd, vCaja, vCob);
  }
}

DCMount(Component, document.getElementById('tpl'), document.getElementById('app'));
