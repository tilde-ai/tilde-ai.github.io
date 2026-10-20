class Component extends DCLogic {
  constructor(props) {
    super(props);
    this.state = {
      mod: 'web', menuOpen: false,
      qty: { a: 1, b: 4, c: 1 }, desc: 10, pdf: false,
      onlyFollow: false, cliQ: '',
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
      q: '', newName: '', newQty: '', stockMsg: '', stockErr: false, moves: 6,
      products: [
        { code: 'A-101', name: 'Tornillo 6x40 (caja x100)', qty: 48, min: 20 },
        { code: 'A-102', name: 'Tarugo 8 mm (caja x100)', qty: 12, min: 20 },
        { code: 'B-210', name: 'Cinta métrica 5 m', qty: 7, min: 5 },
        { code: 'B-305', name: 'Guantes de trabajo', qty: 3, min: 10 },
        { code: 'C-012', name: 'Pintura látex 20 L', qty: 9, min: 4 },
        { code: 'C-044', name: 'Rodillo 23 cm', qty: 15, min: 6 }
      ],
      planView: 'gantt',
      tasks: [
        { id: 1, name: 'Relevar pedidos', who: 'Ana', start: 0, len: 2, done: true },
        { id: 2, name: 'Comprar materiales', who: 'Juan', start: 1, len: 2, done: false },
        { id: 3, name: 'Producción lote 14', who: 'Equipo', start: 2, len: 3, done: false },
        { id: 4, name: 'Control de calidad', who: 'Ana', start: 3, len: 1, done: false },
        { id: 5, name: 'Entregas zona norte', who: 'Juan', start: 4, len: 1, done: false }
      ],
      orders: [
        { id: 'OT-0581', title: 'Service de aire acondicionado', client: 'Ferretería El Tornillo', who: 'JP', prio: 'Alta', due: 'Vence 17/10', stage: 0 },
        { id: 'OT-0582', title: 'Instalación de cortinas', client: 'Laura Fernández', who: 'AG', prio: 'Media', due: 'Vence 18/10', stage: 0 },
        { id: 'OT-0583', title: 'Reparación de portón', client: 'Diego Paz', who: 'JP', prio: 'Alta', due: 'Vence 16/10', stage: 1 },
        { id: 'OT-0584', title: 'Mantenimiento mensual', client: 'Taller San Martín', who: 'AG', prio: 'Baja', due: 'Vence 20/10', stage: 1 },
        { id: 'OT-0585', title: 'Cambio de cerradura', client: 'Sofía Ruiz', who: 'EQ', prio: 'Media', due: 'Entregada 15/10', stage: 2 }
      ],
      checkDone: 2, chkMeta: ['Ana G. · 09:12', 'Juan P. · 10:47'],
      movs: [
        { concept: 'Cobro Laura Fernández', amount: 240000, type: 'in', time: '11:05' },
        { concept: 'Pago a proveedor', amount: 120000, type: 'out', time: '10:40' },
        { concept: 'Venta mostrador', amount: 85000, type: 'in', time: '09:15' }
      ],
      cConcept: '', cAmount: '', cajaMsg: '', cajaErr: false,
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
    const seg = (on) => ({ bg: on ? '#5A5048' : 'transparent', fg: on ? '#FFFFFF' : '#9A9A9A' });
    const wa = (msg) => 'https://wa.me/?text=' + encodeURIComponent(msg);
    const now = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
    const PILL = {
      green: ['rgba(130,190,140,0.14)', '#A5D6AA'],
      amber: ['rgba(232,200,100,0.14)', '#E8CC7A'],
      red: ['rgba(226,95,120,0.14)', '#F59DB0'],
      blue: ['rgba(96,150,230,0.16)', '#8DB6F2'],
      grey: ['rgba(255,255,255,0.08)', '#D3CAC2']
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
        bg: on ? '#3A3430' : 'transparent', fg: on ? '#FFFFFF' : '#D3CAC2',
        bd: on ? '#4C443E' : 'transparent', ic: on ? '#E07A45' : '#9C9087'
      };
    });
    const cur = MODS.find((m) => m.id === S.mod) || MODS[0];
    const NAV_ORDER = ['web', 'cotizador', 'clientes', 'stock', 'plan', 'agenda', 'ordenes', 'checklist', 'caja', 'cobranzas', 'kpi', 'idea'];
    const navIdx = Math.max(0, NAV_ORDER.indexOf(S.mod));
    const navName = (i) => (MODS.find((m) => m.id === NAV_ORDER[(i + NAV_ORDER.length) % NAV_ORDER.length]) || MODS[0]).name;
    const navGo = (d) => () => set({ mod: NAV_ORDER[(navIdx + d + NAV_ORDER.length) % NAV_ORDER.length], menuOpen: false });
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
      { id: 'a', code: 'MUE-160', name: 'Mesa de roble 1,60 m', price: 480000 },
      { id: 'b', code: 'MUE-022', name: 'Silla tapizada', price: 95000 },
      { id: 'c', code: 'SRV-010', name: 'Envío e instalación', price: 60000 }
    ];
    let subtotal = 0;
    const changeQty = (id, d) => {
      const n = Object.assign({}, this.state.qty);
      n[id] = Math.max(0, (n[id] || 0) + d);
      set({ qty: n, pdf: false });
    };
    const cotRows = ITEMS.map((it) => {
      const q = S.qty[it.id] || 0;
      subtotal += it.price * q;
      return { name: it.name, code: it.code, price: fmt(it.price), qty: q, sub: fmt(it.price * q), inc: () => changeQty(it.id, 1), dec: () => changeQty(it.id, -1) };
    });
    const descAmt = subtotal * S.desc / 100;
    const neto = subtotal - descAmt;
    const iva = neto * 0.21;
    const needsApproval = S.desc > 15;
    const cotEmpty = subtotal === 0;
    const descBtns = [0, 10, 20].map((d) => Object.assign({ label: d + '%', pick: () => set({ desc: d, pdf: false }) }, seg(d === S.desc)));
    let cotStatus;
    if (S.pdf && needsApproval) cotStatus = { label: 'Pendiente de aprobación', bg: PILL.amber[0], fg: PILL.amber[1] };
    else if (S.pdf) cotStatus = { label: 'PDF generado', bg: PILL.green[0], fg: PILL.green[1] };
    else cotStatus = { label: 'Borrador', bg: PILL.grey[0], fg: PILL.grey[1] };

    /* ---------- Página web ---------- */
    const SITES = [
      { label: 'Mueblería', domain: 'muebleriaroble.com.ar' },
      { label: 'Peluquería', domain: 'studiobruma.com.ar' },
      { label: 'Farmacia', domain: 'farmaciadelparque.com.ar' }
    ];
    const goSite = (i) => set({ site: (i + 3) % 3, webElapsed: 0 });
    const webTabs = SITES.map((x, i) => Object.assign({ label: x.label, on: i === S.site, pick: () => goSite(i) }, seg(i === S.site)));
    const webDots = SITES.map((x, i) => ({ label: 'Ver sitio de ' + x.label.toLowerCase(), pick: () => goSite(i), w: i === S.site ? 22 : 8, bg: i === S.site ? '#E07A45' : '#AA9F96' }));
    const WEB_DUR = 8;
    const webStopped = S.webPaused || S.webHover;
    const SLOTS = ['15:30', '16:00', '17:30', '18:00', '19:00'];
    const slots = SLOTS.map((t) => ({
      label: t, on: t === S.slot, pick: () => set({ slot: t, webPaused: true }),
      bg: t === S.slot ? '#A44D61' : '#FFFFFF', fg: t === S.slot ? '#FFFFFF' : '#1E1718', bd: t === S.slot ? '#A44D61' : '#E2CDD0'
    }));

    /* ---------- Clientes ---------- */
    const BASE = [
      { ini: 'MG', name: 'Martín Gómez', sub: 'Particular', status: 'Presupuesto enviado', tone: 'amber', last: 'Hace 5 días', alert: true, next: 'Seguimiento de presupuesto', av: '#5A5048', msg: 'Hola Martín, ¿cómo estás? Te escribo por el presupuesto que te envié la semana pasada. ¿Pudiste verlo? Quedo atento a cualquier consulta.' },
      { ini: 'LF', name: 'Laura Fernández', sub: 'Particular', status: 'En negociación', tone: 'blue', last: 'Hace 2 días', alert: false, next: 'Cerrar propuesta final', av: '#2F5E91', msg: 'Hola Laura, ¿cómo estás? Te comparto la propuesta con los cambios que hablamos. ¿Te parece si lo cerramos esta semana?' },
      { ini: 'ET', name: 'Ferretería El Tornillo', sub: 'Comercio', status: 'Cliente activo', tone: 'green', last: 'Hace 12 días', alert: true, next: 'Ofrecer reposición', av: '#5E9468', msg: 'Hola, ¿cómo andan? Les escribo para saber si necesitan reponer mercadería este mes. ¡Saludos!' },
      { ini: 'SR', name: 'Sofía Ruiz', sub: 'Particular', status: 'Nuevo contacto', tone: 'grey', last: 'Hoy', alert: false, next: 'Enviar presupuesto', av: '#8A5A00', msg: 'Hola Sofía, gracias por tu consulta. Te cuento cómo trabajamos y te paso un presupuesto sin compromiso.' },
      { ini: 'DP', name: 'Diego Paz', sub: 'Empresa', status: 'Presupuesto enviado', tone: 'amber', last: 'Hace 8 días', alert: true, next: 'Ajustar presupuesto', av: '#5B4B8A', msg: 'Hola Diego, ¿cómo estás? Quería saber si pudiste revisar el presupuesto. Si querés, lo ajustamos a lo que necesites.' }
    ];
    const CLIENTS = BASE;
    const followCount = CLIENTS.filter((c) => c.alert).length;
    const cq = (S.cliQ || '').toLowerCase().trim();
    const cliRows = CLIENTS
      .filter((c) => (!S.onlyFollow || c.alert) && (!cq || c.name.toLowerCase().indexOf(cq) !== -1))
      .map((c) => Object.assign({}, c, {
        wa: wa(c.msg), sbg: PILL[c.tone][0], sfg: PILL[c.tone][1],
        lastC: c.alert ? '#F59DB0' : '#D3CAC2', lastW: c.alert ? '600' : '400'
      }));
    const cliFilters = [
      Object.assign({ label: 'Todos', pick: () => set({ onlyFollow: false }) }, seg(!S.onlyFollow)),
      Object.assign({ label: 'Para seguir hoy · ' + followCount, pick: () => set({ onlyFollow: true }) }, seg(S.onlyFollow))
    ];

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
            bg: sel ? 'rgba(224,122,69,0.14)' : '#3A3430', bd: sel ? '#E07A45' : '#4A423C',
            aria: a.client + ', ' + a.service + ' a las ' + hh(h) + ' con ' + p.name,
            pick: () => set({ agSel: key, agErr: '', agMsg: '' })
          };
        }
        agFree += 1;
        return {
          isAppt: false, isFree: true, isBlocked: false,
          label: sel ? 'Nuevo turno' : '+ Libre',
          bg: sel ? 'rgba(224,122,69,0.14)' : 'transparent', bd: sel ? '#E07A45' : '#50473F', bs: sel ? 'solid' : 'dashed', fg: sel ? '#F2A57A' : '#AA9F96',
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
      bg: v === S.agSvc ? '#E07A45' : 'transparent', fg: v === S.agSvc ? '#22150E' : '#F3EDE7', bd: v === S.agSvc ? '#E07A45' : '#5A5048'
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
      return { label: IDEAS[k].label, on: on, pick: () => set({ idea: k, ideaErr: '' }), bg: on ? '#E8B04A' : 'transparent', fg: on ? '#1A1200' : '#F3EDE7', bd: on ? '#E8B04A' : '#5A5048' };
    });
    const ideaBuild = () => {
      const t = (this.state.ideaDraft || '').trim();
      if (t.length < 4) return set({ ideaErr: 'Contanos un poco más tu idea.' });
      set({ idea: 'custom', ideaText: t, ideaErr: '' });
    };

    /* ---------- Stock ---------- */
    const q = (S.q || '').toLowerCase().trim();
    const moveStock = (code, d) => {
      let changed = false;
      const products = this.state.products.map((p) => {
        if (p.code !== code) return p;
        const nq = Math.max(0, p.qty + d);
        if (nq !== p.qty) changed = true;
        return Object.assign({}, p, { qty: nq });
      });
      set({ products: products, stockMsg: '', moves: this.state.moves + (changed ? 1 : 0) });
    };
    const stockRows = S.products
      .filter((p) => !q || (p.code + ' ' + p.name).toLowerCase().indexOf(q) !== -1)
      .map((p) => {
        const low = p.qty <= p.min;
        return {
          code: p.code, name: p.name, qty: p.qty, min: p.min,
          qc: low ? '#F59DB0' : '#FBF7F3',
          status: low ? 'Reponer' : 'Normal',
          sbg: low ? PILL.red[0] : PILL.green[0], sfg: low ? PILL.red[1] : PILL.green[1],
          inc: () => moveStock(p.code, 1), dec: () => moveStock(p.code, -1)
        };
      });
    const lowCount = S.products.filter((p) => p.qty <= p.min).length;
    const addProduct = () => {
      const name = (this.state.newName || '').trim();
      const qn = parseInt(this.state.newQty, 10);
      if (!name) return set({ stockMsg: 'Punto de control: falta el nombre del producto.', stockErr: true });
      if (isNaN(qn) || qn < 0) return set({ stockMsg: 'Punto de control: la cantidad tiene que ser un número.', stockErr: true });
      if (this.state.products.some((p) => p.name.toLowerCase() === name.toLowerCase())) return set({ stockMsg: 'Punto de control: ese producto ya existe.', stockErr: true });
      const code = 'N-' + String(100 + this.state.products.length + 1);
      set({ products: [{ code: code, name: name, qty: qn, min: 5 }].concat(this.state.products), newName: '', newQty: '', q: '', moves: this.state.moves + 1, stockMsg: 'Producto dado de alta: ' + name + ' (' + code + ').', stockErr: false });
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
      barBg: t.done ? '#5E9468' : WHO[t.who][0],
      barLabel: t.done ? 'Hecha' : t.who,
      whoBg: WHO[t.who][0],
      boxBg: t.done ? '#E07A45' : 'transparent', boxBd: t.done ? '#E07A45' : '#7D7168',
      deco: t.done ? 'line-through' : 'none', tc: t.done ? '#9C9087' : '#F3EDE7',
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
    const DOTS = ['#8A8A8A', '#E8B04A', '#E07A45'];
    const ACTIONS = ['Iniciar', 'Finalizar', 'Reabrir'];
    const PRIO = { Alta: PILL.red, Media: PILL.amber, Baja: PILL.grey };
    const AV = { JP: '#2F6FB0', AG: '#5A6B80', EQ: '#9A6A10' };
    const advance = (id) => set({ orders: this.state.orders.map((o) => o.id === id ? Object.assign({}, o, { stage: o.stage < 2 ? o.stage + 1 : 0 }) : o) });
    const ordCols = STAGES.map((title, i) => {
      const cards = S.orders.filter((o) => o.stage === i).map((o) => Object.assign({}, o, {
        action: ACTIONS[i], advance: () => advance(o.id),
        pbg: PRIO[o.prio][0], pfg: PRIO[o.prio][1], av: AV[o.who]
      }));
      return { title: title, count: cards.length, cards: cards, dot: DOTS[i] };
    });
    const openOrders = S.orders.filter((o) => o.stage < 2).length;

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
      hasLine: i < STEPS.length - 1, lineC: i < cd ? '#E07A45' : '#403934',
      tc: i > cd ? '#9C9087' : '#F3EDE7',
      meta: i < cd ? 'Hecho por ' + (S.chkMeta[i] || '') : (i === cd ? 'Se registra quién lo hizo y a qué hora' : 'Se habilita al completar el paso anterior')
    }));
    const chkComplete = cd >= STEPS.length;

    /* ---------- Caja ---------- */
    const SALDO_INICIAL = 150000;
    let tin = 0, tout = 0;
    S.movs.forEach((m) => { if (m.type === 'in') tin += m.amount; else tout += m.amount; });
    const saldo = SALDO_INICIAL + tin - tout;
    const parseAmt = (v) => parseFloat(String(v || '').replace(/[$\s]/g, '').replace(/\./g, '').replace(',', '.'));
    const addMov = (type) => {
      const c = (this.state.cConcept || '').trim();
      const a = parseAmt(this.state.cAmount);
      if (!c) return set({ cajaMsg: 'Punto de control: completá el concepto.', cajaErr: true });
      if (!(a > 0)) return set({ cajaMsg: 'Punto de control: el monto tiene que ser mayor a cero.', cajaErr: true });
      if (type === 'out' && a > saldo) return set({ cajaMsg: 'Punto de control: el egreso supera el saldo disponible.', cajaErr: true });
      set({ movs: [{ concept: c, amount: a, type: type, time: now() }].concat(this.state.movs), cConcept: '', cAmount: '', cajaMsg: (type === 'in' ? 'Ingreso' : 'Egreso') + ' registrado por ' + fmt(a) + '.', cajaErr: false });
    };
    const movRows = S.movs.map((m) => ({
      concept: m.concept, time: m.time,
      type: m.type === 'in' ? 'Ingreso' : 'Egreso',
      amount: (m.type === 'in' ? '+ ' : '− ') + fmt(m.amount),
      bg: m.type === 'in' ? PILL.green[0] : PILL.red[0],
      fg: m.type === 'in' ? PILL.green[1] : PILL.red[1]
    }));

    /* ---------- Cobranzas ---------- */
    const DEBTS = [
      { name: 'Ferretería El Tornillo', comp: 'FC A 0001-00452', vto: '02/10', amount: 320000, days: 15 },
      { name: 'Diego Paz', comp: 'FC B 0001-01187', vto: '13/10', amount: 145000, days: 4 },
      { name: 'Laura Fernández', comp: 'FC B 0001-01203', vto: '20/10', amount: 240000, days: -3 },
      { name: 'Taller San Martín', comp: 'FC A 0001-00461', vto: '29/10', amount: 98000, days: -12 }
    ];
    let cobTotal = 0, cobVenc = 0, cobProx = 0, overdueCount = 0;
    const debtRows = DEBTS.map((d) => {
      cobTotal += d.amount;
      let status, tone, msg;
      if (d.days > 0) {
        cobVenc += d.amount; overdueCount += 1;
        status = 'Vencida hace ' + d.days + ' días'; tone = 'red';
        msg = 'Hola, ¿cómo estás? Te recuerdo que la factura ' + d.comp + ' por ' + fmt(d.amount) + ' venció el ' + d.vto + '. ¿Me confirmás cuándo podés abonarla? ¡Gracias!';
      } else if (d.days >= -7) {
        cobProx += d.amount;
        status = 'Vence en ' + (-d.days) + ' días'; tone = 'amber';
        msg = 'Hola, ¿cómo estás? Te recuerdo que la factura ' + d.comp + ' por ' + fmt(d.amount) + ' vence el ' + d.vto + '. ¡Gracias!';
      } else {
        status = 'Al día'; tone = 'green';
        msg = 'Hola, ¿cómo estás? Te paso el detalle de tu cuenta: factura ' + d.comp + ' por ' + fmt(d.amount) + ', con vencimiento el ' + d.vto + '.';
      }
      return { name: d.name, comp: d.comp, vto: d.vto, amount: fmt(d.amount), status: status, bg: PILL[tone][0], fg: PILL[tone][1], wa: wa(msg) };
    });

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
      bg: i === series.vals.length - 1 ? '#E07A45' : '#5A5048'
    }));
    const periodBtns = [
      Object.assign({ label: 'Semana', pick: () => set({ period: 'semana' }) }, seg(!isMes)),
      Object.assign({ label: 'Mes', pick: () => set({ period: 'mes' }) }, seg(isMes))
    ];
    const alerts = [
      { text: '5 consultas desde la web', mod: 'Página web', dot: '#6FA3E8', go: () => set({ mod: 'web' }) },
      { text: agPend + ' turnos sin confirmar', mod: 'Agenda y turnos', dot: '#E8B04A', go: () => set({ mod: 'agenda' }) },
      { text: followCount + ' clientes para seguir', mod: 'Clientes', dot: '#E8B04A', go: () => set({ mod: 'clientes', onlyFollow: true }) },
      { text: lowCount + ' productos para reponer', mod: 'Stock', dot: '#E8607C', go: () => set({ mod: 'stock' }) },
      { text: overdueCount + ' facturas vencidas', mod: 'Cobranzas', dot: '#E8607C', go: () => set({ mod: 'cobranzas' }) },
      { text: openOrders + ' órdenes abiertas', mod: 'Órdenes de trabajo', dot: '#E07A45', go: () => set({ mod: 'ordenes' }) }
    ];

    return {
      tm: tm, cur: cur,
      heroMods: heroMods,
      menuOpen: S.menuOpen, menuClosed: !S.menuOpen,
      menuCls: S.menuOpen ? 'open' : '', contentCls: S.menuOpen ? 'is-hidden' : '',
      menuBd: S.menuOpen ? '#E07A45' : '#50473F',
      menuToggle: () => set({ menuOpen: !this.state.menuOpen }),
      navPos: (navIdx + 1) + ' de ' + NAV_ORDER.length,
      navPrev: navGo(-1), navNext: navGo(1),
      prevName: navName(navIdx - 1), nextName: navName(navIdx + 1),
      isCot: S.mod === 'cotizador', isCli: S.mod === 'clientes', isWeb: S.mod === 'web', isStock: S.mod === 'stock', isPlan: S.mod === 'plan',
      isOrd: S.mod === 'ordenes', isChk: S.mod === 'checklist', isCaja: S.mod === 'caja', isCob: S.mod === 'cobranzas', isKpi: S.mod === 'kpi',

      cotRows: cotRows, descBtns: descBtns, cotStatus: cotStatus,
      cotSubtotal: fmt(subtotal), cotDescLabel: 'Descuento ' + S.desc + '%', cotDesc: '− ' + fmt(descAmt),
      cotIva: fmt(iva), cotTotal: fmt(neto + iva),
      cotEmpty: cotEmpty,
      showApprovalWarn: needsApproval && !S.pdf && !cotEmpty,
      cotBtnLabel: needsApproval ? 'Enviar a aprobación' : 'Generar PDF',
      cotBtnBg: cotEmpty ? '#403934' : (needsApproval ? '#E8B04A' : '#E07A45'),
      cotBtnFg: cotEmpty ? '#9C9087' : (needsApproval ? '#1A1200' : '#22150E'),
      cotGenerate: () => { if (!cotEmpty) set({ pdf: true }); },
      pdfDone: S.pdf && !needsApproval, approvalSent: S.pdf && needsApproval,

      cliRows: cliRows, cliFilters: cliFilters, cliEmpty: cliRows.length === 0,
      cliQ: S.cliQ, onCliQ: (e) => set({ cliQ: e.target.value }),
      cliSummary: CLIENTS.length + ' clientes · ' + followCount + ' para seguir hoy',

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
      webDot: webStopped ? '#E8B04A' : '#E07A45',
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

      stockQ: S.q, onStockQ: (e) => set({ q: e.target.value }),
      stockRows: stockRows, stockNoResults: stockRows.length === 0,
      stockTotal: S.products.length, lowCount: lowCount, movesToday: S.moves,
      newName: S.newName, newQty: S.newQty,
      onNewName: (e) => set({ newName: e.target.value }), onNewQty: (e) => set({ newQty: e.target.value }),
      addProduct: addProduct,
      stockMsgShow: !!S.stockMsg, stockMsg: S.stockMsg,
      stockMsgBg: S.stockErr ? PILL.red[0] : PILL.green[0], stockMsgFg: S.stockErr ? PILL.red[1] : PILL.green[1],

      taskRows: taskRows, planToggles: planToggles,
      planIsGantt: S.planView === 'gantt', planIsTasks: S.planView === 'lista',
      planProgress: doneCount + ' de ' + S.tasks.length + ' tareas',
      planPct: Math.round(doneCount / S.tasks.length * 100),

      ordCols: ordCols, ordSummary: openOrders + ' abiertas · ' + (S.orders.length - openOrders) + ' terminadas esta semana',

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

      cajaInicial: fmt(SALDO_INICIAL),
      cajaSaldo: fmt(saldo), cajaIn: fmt(tin), cajaOut: fmt(tout),
      cConcept: S.cConcept, cAmount: S.cAmount,
      onConcept: (e) => set({ cConcept: e.target.value }), onAmount: (e) => set({ cAmount: e.target.value }),
      addIn: () => addMov('in'), addOut: () => addMov('out'),
      cajaMsgShow: !!S.cajaMsg, cajaMsg: S.cajaMsg,
      cajaMsgBg: S.cajaErr ? PILL.red[0] : PILL.green[0], cajaMsgFg: S.cajaErr ? PILL.red[1] : PILL.green[1],
      movRows: movRows,

      cobTotal: fmt(cobTotal), cobVencido: fmt(cobVenc), cobProx: fmt(cobProx), debtRows: debtRows,

      kpis: kpis, bars: bars, periodBtns: periodBtns, alerts: alerts,
      chartTitle: isMes ? 'Ventas por mes · millones de $' : 'Ventas por semana · millones de $'
    };
  }
}

DCMount(Component, document.getElementById('tpl'), document.getElementById('app'));
