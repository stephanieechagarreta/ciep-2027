/**
 * CIEP 2027 - CONGRESO INTERNACIONAL DE ECONOMÍA PLATEADA
 * Lógica de Interacciones, Contador Regresivo, Filtros y Modales
 * Mérida, Venezuela · 6, 7 y 8 de Septiembre de 2027
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initSpeakerGrid();
  initPillarModals();
  initRegistrationModal();
  initHeroVideoControls();
  initMobileMenu();
});

/* ==========================================================================
   1. CONTADOR REGRESIVO (Cuenta hacia el 6 de Septiembre de 2027, 09:00 AM)
   ========================================================================== */
function initCountdown() {
  const targetDate = new Date('2027-09-06T09:00:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. CUADRÍCULA UNIFICADA DE 25 PONENTES MAGISTRALES CON FILTROS
   ========================================================================== */
const SPEAKERS_DATA = [
  // 1-7 Gobernanza & Políticas Públicas
  {
    id: 1,
    name: "Dr. Luis Antonio Yánez",
    role: "Presidente del Comité Organizador CIEP 2027",
    institution: "Comisión Presidencial de Economía Plateada",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    topic: "Estrategias de Estado y marco normativo para la longevidad activa"
  },
  {
    id: 2,
    name: "Lic. Richard Ujueta",
    role: "Vicepresidente CIEP 2027 & Presidente CAVECOME-E",
    institution: "Cámara Venezolana de Comercio Electrónico",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    topic: "El dividendo demográfico y el ecosistema fintech para adultos mayores"
  },
  {
    id: 3,
    name: "Dra. María Ángeles Durán",
    role: "Catedrática y Pionera en Sociología del Cuidado",
    institution: "CSIC - Consejo Superior de Investigaciones Científicas",
    country: "España",
    flag: "🇪🇸",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    topic: "La economía del cuidado y el impacto en el PIB iberoamericano"
  },
  {
    id: 4,
    name: "Dr. Juan Carlos Morales",
    role: "Director de Políticas Públicas de Longevidad",
    institution: "Universidad Nacional de Colombia",
    country: "Colombia",
    flag: "🇨🇴",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    topic: "Modelos descentralizados de gestión urbana inclusiva"
  },
  {
    id: 5,
    name: "Dra. Carmen Gloria Parodi",
    role: "Especialista en Derechos de las Personas Mayores",
    institution: "SENAMA / Pontificia Universidad Católica",
    country: "Chile",
    flag: "🇨🇱",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    topic: "Protección jurídica internacional y convenios interamericanos"
  },
  {
    id: 6,
    name: "Dra. Teresa Martínez",
    role: "Consultora en Modelos de Atención Integral",
    institution: "Fundación Pilares para la Autonomía",
    country: "España",
    flag: "🇪🇸",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    topic: "Atención centrada en la persona: de la teoría a la política pública"
  },
  {
    id: 7,
    name: "Mag. Rafael Rondón",
    role: "Coordinador de Relaciones Institucionales",
    institution: "Gobernación del Estado Mérida",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "gobernanza",
    pillarName: "Gobernanza",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    topic: "Mérida como primer polo andino de ciudades amigables con la edad"
  },

  // 8-13 Salud & Bienestar
  {
    id: 8,
    name: "Dr. Alexandre Kalache",
    role: "Ex-Director del Programa de Envejecimiento de la OMS",
    institution: "Centro Internacional de Longevidad (ILC-Brasil)",
    country: "Internacional",
    flag: "🌐",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80",
    topic: "La revolución de la longevidad: Década del Envejecimiento Saludable"
  },
  {
    id: 9,
    name: "Dra. Valentina Briceño",
    role: "Jefa de Geriatría y Medicina Regenerativa",
    institution: "Universidad de Los Andes (ULA Mérida)",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
    topic: "Prevención del deterioro cognitivo y nutrición de montaña"
  },
  {
    id: 10,
    name: "Dr. Fernando Gómez",
    role: "Investigador en Fragilidad y Sarcopenia",
    institution: "Universidad de Caldas",
    country: "Colombia",
    flag: "🇨🇴",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80",
    topic: "Biomarcadores de envejecimiento biológico en América Latina"
  },
  {
    id: 11,
    name: "Dra. Elena Larrea",
    role: "Directora de Telemedicina y Cuidados Digitales",
    institution: "Hospital Clínic de Barcelona",
    country: "España",
    flag: "🇪🇸",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1594824813624-9b2f67ee4294?auto=format&fit=crop&w=500&q=80",
    topic: "Monitorización remota y wearables médicos para personas mayores"
  },
  {
    id: 12,
    name: "Dr. Arturo Silva",
    role: "Presidente Sociedad Venezolana de Geriatría",
    institution: "SVGG",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    topic: "Abordaje integral de la multimorbilidad en la tercera edad"
  },
  {
    id: 13,
    name: "Dra. Sofía Valenzuela",
    role: "Investigadora en Neurociencias y Bienestar Emocional",
    institution: "Universidad de Chile",
    country: "Chile",
    flag: "🇨🇱",
    pillar: "salud",
    pillarName: "Salud y Bienestar",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
    topic: "Soledad no deseada: salud mental, redes comunitarias y apego social"
  },

  // 14-19 Economía, Finanzas y Turismo Plateado
  {
    id: 14,
    name: "Mag. Iñaki Ortega",
    role: "Codirector de Madrid Silver Economy Forum",
    institution: "Universidad de Deusto / MAPFRE",
    country: "España",
    flag: "🇪🇸",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    topic: "El mapa de oportunidades de la Silver Economy global"
  },
  {
    id: 15,
    name: "Ec. Beatriz Paredes",
    role: "Especialista en Productos Financieros y Pensiones",
    institution: "Banco Interamericano de Desarrollo (BID Lab)",
    country: "Colombia",
    flag: "🇨🇴",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=500&q=80",
    topic: "Hipotecas inversas, seguros de longevidad y microcréditos sénior"
  },
  {
    id: 16,
    name: "Lic. Carlos Mendoza",
    role: "Presidente de la Cámara Hotelera y Turística de Mérida",
    institution: "CORMETUR / Hotel Convención Mérida",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
    topic: "Turismo plateado de bienestar y termalismo en los Andes venezolanos"
  },
  {
    id: 17,
    name: "Dr. Rodrigo Vergara",
    role: "Economista Principal y Asesor de Inversión",
    institution: "Centro de Estudios Públicos (CEP)",
    country: "Chile",
    flag: "🇨🇱",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
    topic: "Mercado laboral plateado: retención de talento y jubilación activa"
  },
  {
    id: 18,
    name: "Lic. Patricia Cárdenas",
    role: "Directora de Innovación en Seguros de Salud y Vida",
    institution: "Oceánica de Seguros",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&w=500&q=80",
    topic: "Pólizas integrales y planes de asistencia 60+ en Venezuela"
  },
  {
    id: 19,
    name: "Mag. Javier Gómez",
    role: "Emprendedor y Fundador de Red Senior Tech",
    institution: "Silver Valley Iberoamérica",
    country: "España",
    flag: "🇪🇸",
    pillar: "economia",
    pillarName: "Economía y Finanzas",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=500&q=80",
    topic: "Inversión ángel y fondos de capital de riesgo para startups plateadas"
  },

  // 20-25 Educación, Tecnología y Alfabetización Digital
  {
    id: 20,
    name: "Dra. Isabel Quintero",
    role: "Directora de Tecnología Asistencial e IA Aplicada",
    institution: "Universidad Central de Venezuela (UCV)",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=500&q=80",
    topic: "Inteligencia Artificial generativa amigable para la autonomía sénior"
  },
  {
    id: 21,
    name: "Prof. Manuel Del Río",
    role: "Coordinador del Programa Universitarios Mayores",
    institution: "Universidad Complutense de Madrid",
    country: "España",
    flag: "🇪🇸",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    topic: "Aprendizaje a lo largo de la vida: programas universitarios permanentes"
  },
  {
    id: 22,
    name: "Mag. Catalina Restrepo",
    role: "Líder de Transformación Digital Inclusiva",
    institution: "Ruta N Medellín",
    country: "Colombia",
    flag: "🇨🇴",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    topic: "Alfabetización digital comunitaria y cierre de brechas de usabilidad"
  },
  {
    id: 23,
    name: "Ing. Pablo Echeverría",
    role: "Director de I+D en Domótica y Hogares Adaptados",
    institution: "Centro de Envejecimiento Positivo",
    country: "Chile",
    flag: "🇨🇱",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    topic: "Casas inteligentes: sensores de caídas y accesibilidad universal"
  },
  {
    id: 24,
    name: "Prof. Andrés Zambrano",
    role: "Docente de Nuevas Tecnologías e Inclusión Social",
    institution: "Universidad Pedagógica Experimental Libertador",
    country: "Venezuela",
    flag: "🇻🇪",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    topic: "Gamificación y estimulación cognitiva a través de tablets y apps"
  },
  {
    id: 25,
    name: "Dra. Lucía Domínguez",
    role: "Especialista en Ética de la IA y Longevidad Humana",
    institution: "Instituto Europeo de Innovación Tecnológica (EIT)",
    country: "Internacional",
    flag: "🌐",
    pillar: "educacion",
    pillarName: "Educación y Tecnología",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    topic: "El futuro de los robots de acompañamiento y ética en el cuidado"
  }
];

function createSpeakerCard(speaker) {
  const card = document.createElement('div');
  card.className = 'ciep-speaker-credential cursor-pointer group';
  card.innerHTML = `
    <div class="ciep-credential-top">
      <!-- Header: Logo & Badge país -->
      <div class="flex items-center justify-between w-full mb-1 sm:mb-2">
        <div class="flex items-center gap-1">
          <img src="assets/isotipo-ciep.png" alt="CIEP" class="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain">
          <span class="text-[9px] sm:text-[11px] font-black text-oxford tracking-tight">CIEP <span class="text-sinopia">2027</span></span>
        </div>
        <div class="flex items-center gap-1 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-oxford">
          <span>${speaker.flag}</span>
          <span class="truncate max-w-[65px] sm:max-w-[85px]">${speaker.country}</span>
        </div>
      </div>

      <!-- Badge Conferencista Internacional / Magistral -->
      <div class="text-center my-1 sm:my-1.5">
        <div class="text-[8px] sm:text-[10px] font-extrabold uppercase tracking-widest text-sinopia leading-none">CONFERENCISTA</div>
        <div class="text-[10px] sm:text-xs font-black text-sinopia tracking-tight mt-0.5">MAGISTRAL</div>
      </div>

      <!-- Foto con marco Sinopia oficial (Limpia sin franjas en la cara) -->
      <div class="ciep-credential-photo-frame">
        <img src="${speaker.img}" alt="${speaker.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
      </div>

      <!-- Nombre y afiliación ubicados limpiamente DEBAJO de la imagen -->
      <div class="w-full text-center mt-2 px-1">
        <div class="inline-block bg-oxford text-white px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold truncate max-w-full shadow-sm">
          ${speaker.name}
        </div>
        <div class="text-[9px] sm:text-[10px] text-sinopia font-semibold truncate mt-0.5">
          ${speaker.institution}
        </div>
      </div>
    </div>

    <!-- Zona inferior oscura con datos institucionales -->
    <div class="ciep-credential-bottom">
      <div>
        <h4 class="text-xs sm:text-sm lg:text-base font-bold text-white group-hover:text-champagne transition-colors leading-tight line-clamp-1">
          ${speaker.name}
        </h4>
        <p class="text-[10px] sm:text-xs text-slate-300 mt-1 line-clamp-2 leading-tight">
          ${speaker.role}
        </p>
      </div>
      
      <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
        <span class="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-green-sheen">
          ${speaker.pillarName}
        </span>
        <span class="text-sinopia text-[10px] font-bold flex items-center gap-0.5">
          Ver Info <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </div>
      
      <!-- Línea roja/sinopia al fondo idéntica al diseño de referencia -->
      <div class="w-8 h-1 bg-sinopia rounded-full mx-auto mt-2 sm:mt-3"></div>
    </div>
  `;
  card.addEventListener('click', () => openSpeakerModal(speaker));
  return card;
}

function initSpeakerGrid() {
  const container = document.getElementById('speakers-container') || document.getElementById('speakers-grid');
  const countEl = document.getElementById('speakers-visible-count');
  if (!container) return;

  const PILLARS_CONFIG = [
    {
      key: 'gobernanza',
      name: 'Gobernanza y Políticas Públicas',
      subtitle: 'Marco normativo, ciudades amigables y modelos de cuidado integral de largo plazo',
      num: '01',
      tag: 'Eje Temático 01',
      borderLeft: 'border-l-sinopia',
      iconColor: 'text-sinopia',
      iconBoxBg: 'rgba(228, 59, 0, 0.12)',
      iconBoxBorder: 'rgba(228, 59, 0, 0.35)',
      badgeClass: 'bg-sinopia/15 text-champagne border-sinopia/30',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 18h16M4 10l8-6 8 6M6 10v8M10 10v8M14 10v8M18 10v8"/></svg>`
    },
    {
      key: 'salud',
      name: 'Salud Integral y Bienestar',
      subtitle: 'Medicina preventiva, longevidad saludable y autonomía funcional andina',
      num: '02',
      tag: 'Eje Temático 02',
      borderLeft: 'border-l-green-sheen',
      iconColor: 'text-green-sheen',
      iconBoxBg: 'rgba(129, 178, 154, 0.12)',
      iconBoxBorder: 'rgba(129, 178, 154, 0.35)',
      badgeClass: 'bg-green-sheen/15 text-green-sheen border-green-sheen/30',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 9v6M9 12h6"/></svg>`
    },
    {
      key: 'economia',
      name: 'Economía, Finanzas y Emprendimiento',
      subtitle: 'Mercado sénior, inclusión fintech, seguros y comercio electrónico',
      num: '03',
      tag: 'Eje Temático 03',
      borderLeft: 'border-l-champagne',
      iconColor: 'text-champagne',
      iconBoxBg: 'rgba(242, 204, 143, 0.12)',
      iconBoxBorder: 'rgba(242, 204, 143, 0.35)',
      badgeClass: 'bg-champagne/15 text-champagne border-champagne/30',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M18 9l-5 5-4-4-6 6"/><path d="M14 9h4v4"/></svg>`
    },
    {
      key: 'educacion',
      name: 'Educación, Tecnología y Cultura',
      subtitle: 'Inteligencia Artificial adaptada, domótica y programas universitarios mayores',
      num: '04',
      tag: 'Eje Temático 04',
      borderLeft: 'border-l-sky',
      iconColor: 'text-sky-400',
      iconBoxBg: 'rgba(56, 189, 248, 0.12)',
      iconBoxBorder: 'rgba(56, 189, 248, 0.35)',
      badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
      iconSvg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`
    }
  ];

  function renderSpeakers() {
    container.innerHTML = '';
    let totalVisible = 0;

    PILLARS_CONFIG.forEach(p => {
      const speakers = SPEAKERS_DATA.filter(s => s.pillar === p.key);
      totalVisible += speakers.length;

      const block = document.createElement('div');
      block.className = 'ciep-pillar-block mb-12 sm:mb-16';

      block.innerHTML = `
        <!-- Cabecera Institucional Premium (Tarjeta de Eje Temático) -->
        <div class="ciep-pillar-header flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl mb-5 shadow-xl ${p.borderLeft}">
          <!-- Izquierda: Ícono Oficial + Eyebrow + Título + Subtítulo -->
          <div class="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md ${p.iconColor}" style="background-color: ${p.iconBoxBg}; border: 1.5px solid ${p.iconBoxBorder};">
              ${p.iconSvg}
            </div>
            <div>
              <div class="flex items-center gap-2 mb-1 flex-wrap">
                <span class="text-[10px] sm:text-[11px] font-black uppercase tracking-widest ${p.iconColor}">
                  ${p.tag}
                </span>
                <span class="w-1 h-1 rounded-full bg-white/30 hidden sm:inline-block"></span>
                <span class="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${p.badgeClass}">
                  ${speakers.length} Conferencistas Magistrales
                </span>
              </div>
              <h3 class="font-serif text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                ${p.name}
              </h3>
              <p class="text-xs sm:text-sm text-slate-300 font-light mt-0.5 max-w-2xl leading-normal">
                ${p.subtitle}
              </p>
            </div>
          </div>

          <!-- Derecha: Cápsula de Navegación de Carrusel -->
          <div class="flex items-center gap-2 self-end md:self-center flex-shrink-0">
            <div class="flex items-center gap-1.5 bg-oxford/90 px-2.5 py-1.5 rounded-full border border-white/15 shadow-inner">
              <button type="button" class="ciep-carousel-btn ciep-btn-prev w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-sinopia text-white transition-all shadow cursor-pointer active:scale-95 disabled:opacity-30 disabled:pointer-events-none" title="Ver anteriores">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <span class="text-[11px] font-bold text-slate-200 uppercase tracking-wider px-1.5 hidden sm:inline-block">Explorar</span>
              <button type="button" class="ciep-carousel-btn ciep-btn-next w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-sinopia hover:bg-sinopia/85 text-white transition-all shadow cursor-pointer active:scale-95 disabled:opacity-30 disabled:pointer-events-none" title="Ver siguientes">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Contenedor con carrusel horizontal lineal y flechas laterales flotantes -->
        <div class="relative group/track">
          <!-- Flecha lateral flotante izquierda (Desktop) -->
          <button type="button" class="ciep-track-arrow ciep-track-prev hidden md:flex items-center justify-center absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-oxford/95 hover:bg-sinopia text-white border border-white/25 shadow-2xl transition-all cursor-pointer backdrop-blur-md active:scale-95" title="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
          </button>

          <!-- Pista lineal horizontal de conferencistas -->
          <div class="ciep-speakers-track"></div>

          <!-- Flecha lateral flotante derecha (Desktop) -->
          <button type="button" class="ciep-track-arrow ciep-track-next hidden md:flex items-center justify-center absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-oxford/95 hover:bg-sinopia text-white border border-white/25 shadow-2xl transition-all cursor-pointer backdrop-blur-md active:scale-95" title="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      `;

      const track = block.querySelector('.ciep-speakers-track');
      speakers.forEach(speaker => {
        track.appendChild(createSpeakerCard(speaker));
      });

      // Controladores de navegación para las flechas
      const btnPrev = block.querySelector('.ciep-btn-prev');
      const btnNext = block.querySelector('.ciep-btn-next');
      const trackPrev = block.querySelector('.ciep-track-prev');
      const trackNext = block.querySelector('.ciep-track-next');

      const scrollStep = () => {
        // Desplaza exactamente el ancho visible (2 tarjetas en móvil, 4 en escritorio)
        return track.clientWidth;
      };

      const doScroll = (direction) => {
        track.scrollBy({ left: direction * scrollStep(), behavior: 'smooth' });
      };

      if (btnPrev) btnPrev.addEventListener('click', () => doScroll(-1));
      if (btnNext) btnNext.addEventListener('click', () => doScroll(1));
      if (trackPrev) trackPrev.addEventListener('click', () => doScroll(-1));
      if (trackNext) trackNext.addEventListener('click', () => doScroll(1));

      const updateArrows = () => {
        const maxScroll = track.scrollWidth - track.clientWidth - 5;
        const current = track.scrollLeft;

        const isStart = current <= 5;
        const isEnd = current >= maxScroll;

        [btnPrev, trackPrev].forEach(btn => {
          if (btn) {
            btn.style.opacity = isStart ? '0.35' : '1';
            btn.style.pointerEvents = isStart ? 'none' : 'auto';
          }
        });

        [btnNext, trackNext].forEach(btn => {
          if (btn) {
            btn.style.opacity = isEnd ? '0.35' : '1';
            btn.style.pointerEvents = isEnd ? 'none' : 'auto';
          }
        });
      };

      track.addEventListener('scroll', updateArrows, { passive: true });
      setTimeout(updateArrows, 150);

      container.appendChild(block);
    });

    if (countEl) {
      countEl.textContent = `${totalVisible} Ponentes Magistrales`;
    }
  }

  // Render inicial
  renderSpeakers();
}

/* ==========================================================================
   3. MODAL DE PONENTES
   ========================================================================== */
function openSpeakerModal(speaker) {
  const modal = document.getElementById('speaker-detail-modal');
  if (!modal) return;

  document.getElementById('spk-modal-img').src = speaker.img;
  document.getElementById('spk-modal-name').textContent = speaker.name;
  document.getElementById('spk-modal-role').textContent = speaker.role;
  document.getElementById('spk-modal-institution').textContent = speaker.institution;
  document.getElementById('spk-modal-country').textContent = `${speaker.flag} ${speaker.country}`;
  document.getElementById('spk-modal-pillar').textContent = speaker.pillarName;
  document.getElementById('spk-modal-topic').textContent = speaker.topic;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSpeakerModal() {
  const modal = document.getElementById('speaker-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   4. MODALES DE EJES / PILARES TEMÁTICOS
   ========================================================================== */
const PILLAR_CONTENTS = {
  gobernanza: {
    title: "Pilar 1: Gobernanza y Políticas Públicas",
    subtitle: "Construyendo marcos institucionales para la longevidad activa y derechos garantizados.",
    color: "#032A53",
    items: [
      "Marco regulatorio internacional de la economía plateada y adecuación legislativa en Iberoamérica.",
      "Plan Nacional de Ciudades y Comunidades Amigables con las Personas Mayores (Mérida como pionera).",
      "Modelos de cuidado público-privado y sostenibilidad de los sistemas de pensiones.",
      "Articulación intergubernamental y descentralización de servicios sociales."
    ]
  },
  salud: {
    title: "Pilar 2: Salud Integral y Bienestar",
    subtitle: "Medicina preventiva, longevidad saludable y autonomía funcional en los Andes.",
    color: "#81B29A",
    items: [
      "Medicina regenerativa, prevención de la fragilidad y sarcopenia en adultos mayores.",
      "Telemedicina y monitoreo digital para áreas remotas y comunidades andinas.",
      "Salud mental, bienestar emocional y combate a la soledad no deseada.",
      "Turismo de salud, termalismo y programas de bienestar integral en Mérida."
    ]
  },
  economia: {
    title: "Pilar 3: Economía, Finanzas y Emprendimiento",
    subtitle: "El dividendo demográfico como motor económico y creación de nuevos mercados.",
    color: "#E43B00",
    items: [
      "El poder adquisitivo sénior: nuevos modelos de consumo de la economía plateada.",
      "Inclusión financiera, seguros de longevidad, hipotecas inversas y productos fintech 60+.",
      "Emprendimiento sénior e incubación de empresas lideradas por profesionales jubilados.",
      "Comercio electrónico inclusivo y plataformas accesibles impulsadas por CAVECOME-E."
    ]
  },
  educacion: {
    title: "Pilar 4: Educación, Tecnología y Cultura",
    subtitle: "Cerrando la brecha digital y fomentando el aprendizaje continuo.",
    color: "#F2CC8F",
    items: [
      "Alfabetización digital acelerada y uso de Inteligencia Artificial para la autonomía diaria.",
      "Programas universitarios de educación continua y universidades de la tercera edad.",
      "Domótica, hogares inteligentes y tecnologías asistenciales no invasivas.",
      "Cultura, patrimonio andino y transmisión intergeneracional de saberes."
    ]
  }
};

function initPillarModals() {
  const modal = document.getElementById('pillar-detail-modal');
  if (!modal) return;

  const triggerButtons = document.querySelectorAll('.open-pillar-modal-btn');
  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pilarKey = btn.getAttribute('data-pillar');
      const data = PILLAR_CONTENTS[pilarKey];
      if (!data) return;

      document.getElementById('plr-modal-title').textContent = data.title;
      document.getElementById('plr-modal-subtitle').textContent = data.subtitle;

      const listContainer = document.getElementById('plr-modal-list');
      listContainer.innerHTML = '';
      data.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-3 text-slate-700 text-sm';
        li.innerHTML = `
          <span class="mt-1 flex-shrink-0 text-sinopia">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </span>
          <span>${item}</span>
        `;
        listContainer.appendChild(li);
      });

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeBtns = modal.querySelectorAll('.close-pillar-modal');
  closeBtns.forEach(b => {
    b.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   5. MODAL DE PRE-REGISTRO CON CREDENCIAL DIGITAL
   ========================================================================== */
function initRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  const openBtns = document.querySelectorAll('.open-reg-modal');
  const closeBtns = document.querySelectorAll('.close-reg-modal');
  const regForm = document.getElementById('ciep-registration-form');
  const ticketPreview = document.getElementById('digital-ticket-preview');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value || 'Participante Oficial';
      const email = document.getElementById('reg-email').value || 'contacto@ciepvzla.com';
      const org = document.getElementById('reg-org').value || 'Institución Participante';
      const country = document.getElementById('reg-country').value || 'Venezuela';
      const role = document.getElementById('reg-role').value || 'Congresista';

      // Código de acreditación
      const randomId = 'CIEP-2027-' + Math.floor(100000 + Math.random() * 900000);

      document.getElementById('tkt-name').textContent = name;
      document.getElementById('tkt-email').textContent = email;
      document.getElementById('tkt-org').textContent = org;
      document.getElementById('tkt-country').textContent = country;
      document.getElementById('tkt-role').textContent = role;
      document.getElementById('tkt-code').textContent = randomId;

      // QR Code
      const qrData = encodeURIComponent(`CIEP2027|${randomId}|${name}|${role}`);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;
      document.getElementById('tkt-qr-img').src = qrUrl;

      regForm.classList.add('hidden');
      ticketPreview.classList.remove('hidden');
    });
  }
}

/* ==========================================================================
   6. CONTROL DE AUDIO / VIDEO DEL HERO
   ========================================================================== */
function initHeroVideoControls() {
  const video = document.getElementById('hero-background-video');
  const soundBtn = document.getElementById('hero-sound-toggle');
  const soundIcon = document.getElementById('hero-sound-icon');
  const soundText = document.getElementById('hero-sound-text');

  if (!video || !soundBtn) return;

  soundBtn.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      if (soundText) soundText.textContent = 'Silenciar Video';
      if (soundIcon) {
        soundIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;
      }
    } else {
      video.muted = true;
      if (soundText) soundText.textContent = 'Activar Sonido';
      if (soundIcon) {
        soundIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        `;
      }
    }
  });
}

/* ==========================================================================
   7. MENÚ RESPONSIVO MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-nav-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// Global expose para cierres desde onclick en modales si aplica
window.closeSpeakerModal = closeSpeakerModal;

