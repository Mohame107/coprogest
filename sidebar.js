// ═══════════════════════════════════════════
//  CoproGest — Sidebar dynamique partagée
//  Inclure après firebase-config.js dans chaque page
// ═══════════════════════════════════════════

const SIDEBAR_MENUS = {
  syndic: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'📨', label:'Demandes',        url:'demandes.html'},
    {icon:'💬', label:'Messages',        url:'messages.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'💰', label:'Finances',         url:'finances.html'},
    {icon:'🏢', label:'Immeubles',        url:'lots.html'},
    {icon:'📋', label:'Carnet entretien', url:'carnet.html'},
    {icon:'📑', label:'Baux',             url:'baux.html'},
    {icon:'🔧', label:'Incidents',        url:'incidents.html'},
    {icon:'📄', label:'Documents',        url:'documents.html'},
    {icon:'📢', label:'Annonces',         url:'annonces.html'},
    {icon:'👥', label:'Résidents',        url:'admin.html', section:'Administration'},
  ],
  proprietaire: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'💬', label:'Messages',        url:'messages.html'},
    {icon:'🏠', label:'Mes lots',        url:'lots.html'},
    {icon:'💰', label:'Mes charges',     url:'finances.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'🔧', label:'Incidents',       url:'incidents.html'},
    {icon:'📄', label:'Documents',       url:'documents.html'},
    {icon:'📢', label:'Annonces',        url:'annonces.html'},
  ],
  conseil: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'💬', label:'Messages',        url:'messages.html'},
    {icon:'🗳️', label:'Assemblées',      url:'vote.html'},
    {icon:'💰', label:'Finances',        url:'finances.html'},
    {icon:'🏢', label:'Immeubles',       url:'lots.html'},
    {icon:'📋', label:'Carnet entretien',url:'carnet.html'},
    {icon:'📑', label:'Baux',            url:'baux.html'},
    {icon:'🔧', label:'Incidents',       url:'incidents.html'},
    {icon:'📄', label:'Documents',       url:'documents.html'},
    {icon:'📢', label:'Annonces',        url:'annonces.html'},
    {icon:'👥', label:'Résidents',       url:'admin.html', section:'Administration'},
  ],
  locataire: [
    {icon:'⊞', label:'Tableau de bord', url:'dashboard.html'},
    {icon:'💬', label:'Messages',        url:'messages.html'},
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
    const badgeId  = item.url.replace('.html','');
    navHtml += `<a class="nav-item${isActive?' active':''}" href="${item.url}" style="justify-content:space-between">
      <span style="display:flex;align-items:center;gap:.75rem"><span class="nav-icon">${item.icon}</span>${item.label}</span>
      <span id="badge-${badgeId}" style="display:none;background:#ef4444;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center;flex-shrink:0"></span>
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
    <div style="padding:8px 12px;border-bottom:1px solid var(--border,rgba(99,130,255,.15));position:relative">
      <div style="position:relative">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:12px;pointer-events:none;opacity:.6">🔍</span>
        <input id="globalSearch" type="text" placeholder="Rechercher..."
          style="width:100%;padding:7px 10px 7px 30px;background:var(--card2,#1a2540);border:1px solid var(--border,rgba(99,130,255,.15));border-radius:8px;color:var(--text,#e8eaf6);font-size:12px;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s"
          onfocus="this.style.borderColor='#5b7fff';document.getElementById('searchResults').style.display=this.value.length>1?'block':'none'"
          onkeydown="if(event.key==='Escape'){document.getElementById('searchResults').style.display='none';this.blur()}"
          oninput="globalSearchHandler(this.value)">
      </div>
      <div id="searchResults" style="display:none;position:absolute;left:12px;right:12px;top:44px;background:var(--card2,#1a2540);border:1px solid var(--border,rgba(99,130,255,.15));border-radius:10px;z-index:9999;max-height:320px;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,.6)"></div>
    </div>
    <nav style="flex:1;padding:10px 8px;overflow-y:auto">
      ${navHtml}
    </nav>
    <div style="padding:12px 16px;border-top:1px solid var(--border,rgba(99,130,255,.15));margin-top:auto">
      <a href="profil.html" style="display:flex;align-items:center;gap:8px;width:100%;padding:9px 12px;border-radius:8px;background:transparent;border:1px solid var(--border,rgba(99,130,255,.15));color:var(--text-muted,#4b5563);font-size:13px;cursor:pointer;transition:all .2s;font-family:'Outfit','DM Sans',sans-serif;text-decoration:none;margin-bottom:8px"
        onmouseover="this.style.background='rgba(91,127,255,.1)';this.style.color='#5b7fff';this.style.borderColor='rgba(91,127,255,.3)'"
        onmouseout="this.style.background='transparent';this.style.color='var(--text-muted,#4b5563)';this.style.borderColor='var(--border,rgba(99,130,255,.15))'">
        👤 Mon profil
      </a>
      <button onclick="auth.signOut().then(()=>window.location.href='login.html')"
        style="display:flex;align-items:center;gap:8px;width:100%;padding:9px 12px;border-radius:8px;background:transparent;border:1px solid var(--border,rgba(99,130,255,.15));color:var(--text-muted,#4b5563);font-size:13px;cursor:pointer;transition:all .2s;font-family:'Outfit','DM Sans',sans-serif"
        onmouseover="this.style.background='rgba(239,68,68,.12)';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,.3)'"
        onmouseout="this.style.background='transparent';this.style.color='var(--text-muted,#4b5563)';this.style.borderColor='var(--border,rgba(99,130,255,.15))'">
        🚪 Se déconnecter
      </button>
    </div>
  `;

  // Charger les badges après injection du HTML
  setTimeout(() => {
    const user = auth.currentUser;
    if (user) loadNotificationBadges(profile, user.uid);
  }, 300);
}

// Alias
SIDEBAR_MENUS.coproprietaire = SIDEBAR_MENUS.proprietaire;

// ═══════════════════════════════════════════
// BADGES DE NOTIFICATION
// ═══════════════════════════════════════════
function setBadge(id, count) {
  const el = document.getElementById(`badge-${id}`);
  if (!el) return;
  if (count > 0) {
    el.textContent = count > 99 ? '99+' : count;
    el.style.display = 'inline-block';
  } else {
    el.style.display = 'none';
  }
}

async function loadNotificationBadges(profile, currentUserUid) {
  if (!db || !currentUserUid) return;
  try {
    // ── Votes ouverts (tous les profils sauf locataire) ──
    if (profile !== 'locataire') {
      const votesSnap = await db.collection('votes').get();
      const votesOuverts = votesSnap.docs.filter(d => {
        const v = d.data();
        return new Date(v.dateCloture) > new Date() && !(v.votes||{})[currentUserUid];
      }).length;
      setBadge('vote', votesOuverts);
    }

    // ── Messages non lus ──
    db.collection('conversations')
      .where('participants','array-contains', currentUserUid)
      .onSnapshot(snap => {
        const nonLus = snap.docs.reduce((s,d) => s + ((d.data().nonLus||{})[currentUserUid]||0), 0);
        setBadge('messages', nonLus);
      });

    // ── Incidents urgents ouverts (Syndic et Conseil) ──
    if (['syndic','conseil'].includes(profile)) {
      db.collection('incidents')
        .where('priorite','==','urgente')
        .where('statut','in',['signale','assigne','en_cours'])
        .onSnapshot(snap => setBadge('incidents', snap.size));
    }

    // ── Demandes d'adhésion en attente (Syndic uniquement) ──
    if (profile === 'syndic') {
      db.collection('demandes')
        .where('statut','==','en_attente')
        .onSnapshot(snap => setBadge('demandes', snap.size));
    }

    // ── Annonces non lues (toutes nouvelles annonces du jour) ──
    const hier = new Date(); hier.setDate(hier.getDate() - 1);
    const annSnap = await db.collection('annonces')
      .where('archivee','==',false)
      .get();
    const nouvelles = annSnap.docs.filter(d => {
      const ts = d.data().createdAt?.toDate?.();
      return ts && ts > hier;
    }).length;
    setBadge('annonces', nouvelles);

  } catch(e) {}
}

// ═══════════════════════════════════════════
// RECHERCHE GLOBALE
// ═══════════════════════════════════════════
let _searchTimer = null;

async function globalSearchHandler(q) {
  const box = document.getElementById('searchResults');
  if (!q || q.trim().length < 2) { box.style.display = 'none'; return; }
  q = q.trim().toLowerCase();

  box.style.display = 'block';
  box.innerHTML = `<div style="padding:10px 12px;font-size:12px;color:var(--text-muted,#4b5563)">Recherche...</div>`;

  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(async () => {
    const results = [];

    try {
      // Chercher dans les résidents
      const usersSnap = await db.collection('users').get();
      usersSnap.docs.forEach(d => {
        const u = d.data();
        const nom = `${u.prenom||''} ${u.nom||''}`.trim().toLowerCase();
        if (nom.includes(q) || (u.email||'').toLowerCase().includes(q) || (u.lot||'').toLowerCase().includes(q)) {
          results.push({ icon:'👤', label:`${u.prenom||''} ${u.nom||''}`.trim(), sub: u.email||'', url:'admin.html', cat:'Résident' });
        }
      });

      // Chercher dans les incidents
      const incSnap = await db.collection('incidents').get();
      incSnap.docs.forEach(d => {
        const inc = d.data();
        if ((inc.titre||'').toLowerCase().includes(q) || (inc.description||'').toLowerCase().includes(q)) {
          results.push({ icon:'🔧', label: inc.titre||'—', sub: inc.statut||'', url:'incidents.html', cat:'Incident' });
        }
      });

      // Chercher dans les lots
      const lotsSnap = await db.collection('lots').get();
      lotsSnap.docs.forEach(d => {
        const l = d.data();
        if ((l.numero||'').toLowerCase().includes(q) || (l.proprio||'').toLowerCase().includes(q)) {
          results.push({ icon:'🏢', label:`Lot ${l.numero||'—'}`, sub: l.proprio||'Vacant', url:'lots.html', cat:'Lot' });
        }
      });

      // Chercher dans les documents
      const docsSnap = await db.collection('documents').get();
      docsSnap.docs.forEach(d => {
        const doc = d.data();
        if ((doc.nom||'').toLowerCase().includes(q) || (doc.categorie||'').toLowerCase().includes(q)) {
          results.push({ icon:'📄', label: doc.nom||'—', sub: doc.categorie||'', url:'documents.html', cat:'Document' });
        }
      });

      // Chercher dans les annonces
      const annSnap = await db.collection('annonces').get();
      annSnap.docs.forEach(d => {
        const ann = d.data();
        if ((ann.titre||'').toLowerCase().includes(q) || (ann.texte||'').toLowerCase().includes(q)) {
          results.push({ icon:'📢', label: ann.titre||'—', sub: ann.type||'', url:'annonces.html', cat:'Annonce' });
        }
      });

    } catch(e) {}

    if (!results.length) {
      box.innerHTML = `<div style="padding:14px 12px;font-size:12px;color:var(--text-muted,#4b5563);text-align:center">Aucun résultat pour "${q}"</div>`;
      return;
    }

    // Grouper par catégorie
    const grouped = {};
    results.slice(0, 12).forEach(r => {
      if (!grouped[r.cat]) grouped[r.cat] = [];
      grouped[r.cat].push(r);
    });

    box.innerHTML = Object.entries(grouped).map(([cat, items]) => `
      <div style="padding:6px 12px 2px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted,#4b5563)">${cat}</div>
      ${items.map(r => `
        <a href="${r.url}" target="_self"
          style="display:flex;align-items:center;gap:9px;padding:8px 12px;text-decoration:none;cursor:pointer;transition:background .15s"
          onmouseover="this.style.background='rgba(91,127,255,.12)'"
          onmouseout="this.style.background='transparent'">
          <span style="font-size:15px;flex-shrink:0">${r.icon}</span>
          <div style="overflow:hidden;flex:1">
            <div style="font-size:12px;font-weight:600;color:var(--text,#e8eaf6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.label}</div>
            <div style="font-size:11px;color:var(--text-muted,#4b5563);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.sub}</div>
          </div>
          <span style="font-size:11px;color:var(--text-muted,#4b5563)">→</span>
        </a>`).join('')}
    `).join('') + (results.length > 12 ? `<div style="padding:8px 12px;font-size:11px;color:var(--text-muted,#4b5563);border-top:1px solid var(--border,rgba(99,130,255,.1))">+${results.length-12} autres résultats</div>` : '');

  }, 350);
}