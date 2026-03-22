// ═══════════════════════════════════════════
//  CoproGest — Sidebar dynamique partagée
//  Inclure après firebase-config.js dans chaque page
// ═══════════════════════════════════════════

const SIDEBAR_MENUS = {
  syndic: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'💰', label:'Finances',         url:'finances.html'},
    {icon:'🏢', label:'Immeubles',        url:'lots.html'},
    {icon:'📋', label:'Baux',             url:'baux.html'},
    {icon:'🔧', label:'Incidents',        url:'incidents.html'},
    {icon:'📄', label:'Documents',        url:'documents.html'},
    {icon:'📢', label:'Annonces',         url:'annonces.html'},
    {icon:'👥', label:'Résidents',        url:'admin.html', section:'Administration'},
  ],
  proprietaire: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'🏠', label:'Mes lots',        url:'lots.html'},
    {icon:'💰', label:'Mes charges',     url:'finances.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'🔧', label:'Incidents',       url:'incidents.html'},
    {icon:'📄', label:'Documents',       url:'documents.html'},
    {icon:'📢', label:'Annonces',        url:'annonces.html'},
  ],
  conseil: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'💰', label:'Finances',        url:'finances.html'},
    {icon:'🏢', label:'Immeubles',       url:'lots.html'},
    {icon:'🔧', label:'Incidents',       url:'incidents.html'},
    {icon:'📄', label:'Documents',       url:'documents.html'},
    {icon:'📢', label:'Annonces',        url:'annonces.html'},
    {icon:'👥', label:'Résidents',       url:'admin.html', section:'Administration'},
  ],
  locataire: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'🏠', label:'Mon logement',   url:'lots.html'},
    {icon:'💶', label:'Mes paiements',  url:'finances.html'},
    {icon:'🔧', label:'Incidents',      url:'incidents.html'},
    {icon:'📄', label:'Documents',      url:'documents.html'},
    {icon:'📢', label:'Annonces',       url:'annonces.html'},
  ],
};

const SIDEBAR_ROLE_LABELS = {
  syndic:'Syndic', proprietaire:'Copropriétaire', coproprietaire:'Copropriétaire',
  conseil:'Conseil Syndical', locataire:'Locataire'
};

const SIDEBAR_AVATAR_COLORS = {
  syndic:'#8b5cf6', proprietaire:'#3b82f6', coproprietaire:'#3b82f6', coproprietaire:'#3b82f6',
  conseil:'#06b6d4', locataire:'#10b981'
};

// Génère et injecte la sidebar dans l'élément #sidebar
function buildSidebar(profile, fullName, email, currentPage) {
  const menu   = SIDEBAR_MENUS[profile] || SIDEBAR_MENUS.locataire;
  const color  = SIDEBAR_AVATAR_COLORS[profile] || '#3b82f6';
  const role   = SIDEBAR_ROLE_LABELS[profile] || profile;
  const page   = currentPage || window.location.pathname.split('/').pop();

  let navHtml = '<div class="nav-section-label">Navigation</div>';
  let inAdmin = false;

  menu.forEach(item => {
    // Ajouter le label de section "Administration" si nécessaire
    if (item.section && !inAdmin) {
      navHtml += `<div class="nav-section-label">${item.section}</div>`;
      inAdmin = true;
    }
    const isActive = page === item.url;
    navHtml += `<a class="nav-item${isActive?' active':''}" href="${item.url}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`;
  });

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sb-header" style="padding:18px 16px 14px;border-bottom:1px solid var(--border,rgba(99,130,255,.15))">
      <a href="dashboard.html" style="display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--text,#e8eaf6)">
        <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">🏢</div>
        <div>
          <div style="font-weight:800;font-size:17px;font-family:'Outfit','Syne',sans-serif">CoproGest</div>
          <div style="color:var(--text-muted,#4b5563);font-size:10px">Gestion copropriété</div>
        </div>
      </a>
    </div>
    <div style="padding:12px 16px;border-bottom:1px solid var(--border,rgba(99,130,255,.15));display:flex;align-items:center;gap:9px">
      <div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,${color},${color}99);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:#fff;flex-shrink:0">${fullName.charAt(0).toUpperCase()}</div>
      <div style="overflow:hidden">
        <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text,#e8eaf6)">${fullName}</div>
        <div style="font-size:11px;color:var(--text-muted,#4b5563)">${role}</div>
      </div>
    </div>
    <nav style="flex:1;padding:10px 8px">${navHtml}</nav>
    <div style="padding:12px 16px;border-top:1px solid var(--border,rgba(99,130,255,.15));margin-top:auto">
      <button onclick="auth.signOut().then(()=>window.location.href='login.html')"
        style="display:flex;align-items:center;gap:8px;width:100%;padding:9px 12px;border-radius:8px;background:transparent;border:1px solid var(--border,rgba(99,130,255,.15));color:var(--text-muted,#4b5563);font-size:13px;cursor:pointer;transition:all .2s;font-family:'Outfit','DM Sans',sans-serif"
        onmouseover="this.style.background='rgba(239,68,68,.12)';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,.3)'"
        onmouseout="this.style.background='transparent';this.style.color='var(--text-muted,#4b5563)';this.style.borderColor='var(--border,rgba(99,130,255,.15))'">
        🚪 Se déconnecter
      </button>
    </div>
  `;
}

// Alias
SIDEBAR_MENUS.coproprietaire = SIDEBAR_MENUS.proprietaire;