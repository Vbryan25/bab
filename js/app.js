/* ================= APP / ROUTING ================= */
const PAGES = {
  'inbox':                    {sidenav:'inbox',     secondary:null, bare:true,                   content:pageInbox},
  'knowledge-sources':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-sources'), content:pageKnowledgeSources},
  'knowledge-content':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-content'), content:pageKnowledgeContent},
  'knowledge-articles':       {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-articles'),content:pageKnowledgeArticles},
  'reports-overview':         {sidenav:'reports',    secondary:()=>reportsNav('reports-overview'),content:pageReportsOverview},
  'reports-all':              {sidenav:'reports',    secondary:()=>reportsNav('reports-all'),     content:pageReportsAll},
  'reports-topics':           {sidenav:'reports',    secondary:()=>reportsNav('reports-topics'),  content:pageReportsTopics},
  'reports-conversations-by-role': {sidenav:'reports', secondary:()=>reportsNav('reports-conversations-by-role'), content:pageReportsConversationsByRole},
  'reports-response-time':    {sidenav:'reports',    secondary:()=>reportsNav('reports-response-time'), content:pageReportsResponseTime},
  'reports-csat':             {sidenav:'reports',    secondary:()=>reportsNav('reports-csat'),    content:pageReportsCsat},
  'reports-flagged-sessions': {sidenav:'reports',    secondary:()=>reportsNav('reports-flagged-sessions'),content:pageReportsFlagged},
  'reports-room-scan':        {sidenav:'reports',    secondary:()=>reportsNav('reports-room-scan'),content:pageReportsRoomScan},
  'reports-lockdown-browser': {sidenav:'reports',    secondary:()=>reportsNav('reports-lockdown-browser'), content:pageReportsLockdownBrowser},
  'reports-extension-violations': {sidenav:'reports', secondary:()=>reportsNav('reports-extension-violations'), content:pageReportsExtensionViolations},
  'reports-screen-share':     {sidenav:'reports',    secondary:()=>reportsNav('reports-screen-share'), content:pageReportsScreenShare},
  'reports-exam-completion':  {sidenav:'reports',    secondary:()=>reportsNav('reports-exam-completion'), content:pageReportsExamCompletion},
  'reports-ai-assist':        {sidenav:'reports',    secondary:()=>reportsNav('reports-ai-assist'),content:pageReportsAiAssist},
  'contacts-all':             {sidenav:'contacts',   secondary:()=>contactsNav('contacts-all'),         content:()=>pageContactsPeople('all')},
  'contacts-students':        {sidenav:'contacts',   secondary:()=>contactsNav('contacts-students'),    content:()=>pageContactsPeople('student')},
  'contacts-instructors':     {sidenav:'contacts',   secondary:()=>contactsNav('contacts-instructors'), content:()=>pageContactsPeople('instructor')},
  'contacts-administrators':  {sidenav:'contacts',   secondary:()=>contactsNav('contacts-administrators'), content:()=>pageContactsPeople('admin')},
  'settings-home':            {sidenav:'settings',   secondary:()=>settingsNav('settings-home'),  content:pageSettingsHome},
  'settings-general':         {sidenav:'settings',   secondary:()=>settingsNav('settings-general'),content:pageSettingsGeneral},
  'settings-institutions':    {sidenav:'settings',   secondary:()=>settingsNav('settings-institutions'), content:pageSettingsInstitutions},
  'settings-integrations':    {sidenav:'settings',   secondary:()=>settingsNav('settings-integrations'), content:pageSettingsIntegrations},
  'integrity-review':         {sidenav:null,         secondary:null,                              content:pageIntegrityReview},
};
const DEFAULT_FOR_ICON = {inbox:'inbox', knowledge:'knowledge-sources', reports:'reports-overview', contacts:'contacts-all', settings:'settings-home'};

function renderShell(key){
  const cfg = PAGES[key];
  if(!cfg) return;
  const app = document.getElementById('app');
  // Every page body sits inside one white card, except the inbox, which composes
  // its own pair of cards (conversation list + chat window) and opts out.
  const body = cfg.bare ? cfg.content() : '<div class="content-card">' + cfg.content() + '</div>';
  app.innerHTML = sidenav(cfg.sidenav) + (cfg.secondary ? cfg.secondary() : '')
    + `<div class="content${cfg.bare?' bare':''}">` + body + '</div>';
}
// Mirrors renderShell, swapping real content for a shimmer stand-in — nav
// stays live (instant highlight) while only the content pane "loads".
function renderSkeleton(key){
  const cfg = PAGES[key];
  if(!cfg) return;
  const app = document.getElementById('app');
  const mock = cfg.bare ? skeletonInbox() : skeletonStandard();
  const body = cfg.bare ? mock : '<div class="content-card">' + mock + '</div>';
  app.innerHTML = sidenav(cfg.sidenav) + (cfg.secondary ? cfg.secondary() : '')
    + `<div class="content${cfg.bare?' bare':''}">` + body + '</div>';
}

let appBooted = false;
let skeletonTimer = null;
function showPage(key){
  if(!PAGES[key]) return;
  closeCommandMenu();
  closeModal();
  window.scrollTo(0,0);
  clearTimeout(skeletonTimer);
  // The very first paint shouldn't skeleton — only page-to-page navigation
  // mocks a fetch delay, matching what a real data-backed page would need.
  if(!appBooted){
    appBooted = true;
    renderShell(key);
    return;
  }
  renderSkeleton(key);
  skeletonTimer = setTimeout(function(){ renderShell(key); }, 300);
}

document.addEventListener('click', function(e){
  const iconBtn = e.target.closest('[data-page-icon]');
  if(iconBtn){
    const target = DEFAULT_FOR_ICON[iconBtn.dataset.pageIcon];
    if(target){ showPage(target); }
    return;
  }
  const pageBtn = e.target.closest('[data-page]');
  if(pageBtn){
    e.preventDefault();
    showPage(pageBtn.dataset.page);
    return;
  }
  // click-away closes the views popover
  const popover = document.getElementById('views-popover');
  if(popover && popover.classList.contains('open')){
    const withinPopover = e.target.closest('#views-popover');
    const isToggle = e.target.closest('.convo-header-btn');
    if(!withinPopover && !isToggle) popover.classList.remove('open');
  }
  // click-away closes composer flyouts (command menu / emoji / AI)
  if(!e.target.closest('.composer-wrap')){
    closeCommandMenu();
    closeEmojiMenu();
    closeAiMenu();
  }
  // click-away closes the chat header "more" menu
  const moreMenu = document.getElementById('chat-more-menu');
  if(moreMenu && moreMenu.classList.contains('open')){
    const withinMore = e.target.closest('#chat-more-menu');
    const isMoreToggle = e.target.closest('.chat-more-wrap > .icon-btn-square');
    if(!withinMore && !isMoreToggle) moreMenu.classList.remove('open');
  }
  // click-away closes the status filter / sort dropdowns
  const filterMenu = document.getElementById('filter-menu');
  if(filterMenu && filterMenu.classList.contains('open')){
    const within = e.target.closest('#filter-menu');
    const isToggle = e.target.closest('[data-role="filter"]');
    if(!within && !isToggle) filterMenu.classList.remove('open');
  }
  const sortMenu = document.getElementById('sort-menu');
  if(sortMenu && sortMenu.classList.contains('open')){
    const within = e.target.closest('#sort-menu');
    const isToggle = e.target.closest('[data-role="sort"]');
    if(!within && !isToggle) sortMenu.classList.remove('open');
  }
  // click-away closes any open report filter dropdown (Reports pages)
  document.querySelectorAll('.report-filter-menu.open').forEach(function(menu){
    const within = e.target.closest('#'+menu.id);
    const isToggle = e.target.closest('[data-filter-toggle="'+menu.id+'"]');
    if(!within && !isToggle) menu.classList.remove('open');
  });
  // click-away closes the search field, but only if it's still empty —
  // don't discard a query the user is mid-typing.
  const searchWrap = document.getElementById('convo-search-wrap');
  if(searchWrap && searchWrap.classList.contains('open')){
    const withinSearch = e.target.closest('#convo-search-wrap');
    const input = document.getElementById('convo-search-input');
    if(!withinSearch && input && input.value === '') closeConvoSearch();
  }
});

// These five popovers all live in the header/list area (as opposed to the
// composer flyouts, which are spatially separate) — each one's toggle closes
// the other four, since stopPropagation() below means the document-level
// click-away listener never runs for these clicks, only for genuine
// click-aways.
function closeViews(){ const p = document.getElementById('views-popover'); if(p) p.classList.remove('open'); }
function closeChatMoreMenu(){ const m = document.getElementById('chat-more-menu'); if(m) m.classList.remove('open'); }
function closeConvoSearch(){
  const wrap = document.getElementById('convo-search-wrap');
  if(!wrap || !wrap.classList.contains('open')) return;
  wrap.classList.remove('open');
  const btn = wrap.querySelector('.convo-header-btn.round');
  if(btn){ btn.setAttribute('aria-expanded','false'); btn.title = 'Search'; btn.innerHTML = I('search',16); }
  const input = document.getElementById('convo-search-input');
  if(input) input.value = '';
}
function toggleViews(e){
  e.stopPropagation();
  closeChatMoreMenu(); closeFilterMenu(); closeSortMenu(); closeConvoSearch();
  const popover = document.getElementById('views-popover');
  if(popover) popover.classList.toggle('open');
}
function selectView(e, key){
  e.stopPropagation();
  document.querySelectorAll('.view-item').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.getElementById('views-popover').classList.remove('open');
  showHint(key==='your-inbox' ? 'Showing Your Inbox' : 'This is a prototype — only Your Inbox has live data');
}
function toggleChatMoreMenu(e){
  e.stopPropagation();
  closeViews(); closeFilterMenu(); closeSortMenu(); closeConvoSearch();
  const menu = document.getElementById('chat-more-menu');
  if(!menu) return;
  const open = menu.classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
}
function chatMoreAction(e, key){
  e.stopPropagation();
  document.getElementById('chat-more-menu').classList.remove('open');
  const labels = {screenshare:'Screen share',transfer:'Transfer conversation',assign:'Assign to teammate',spam:'Mark as spam'};
  showHint('This is a prototype — ' + (labels[key]||'this action') + ' isn’t wired up yet');
}
function toggleFilterMenu(e){ e.stopPropagation(); closeSortMenu(); closeViews(); closeChatMoreMenu(); closeConvoSearch(); document.getElementById('filter-menu').classList.toggle('open'); }
function toggleSortMenu(e){ e.stopPropagation(); closeFilterMenu(); closeViews(); closeChatMoreMenu(); closeConvoSearch(); document.getElementById('sort-menu').classList.toggle('open'); }
function toggleConvoSearch(e){
  e.stopPropagation();
  closeViews(); closeChatMoreMenu(); closeFilterMenu(); closeSortMenu();
  const wrap = document.getElementById('convo-search-wrap');
  const btn = e.currentTarget;
  const open = wrap.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(open));
  btn.title = open ? 'Close search' : 'Search';
  btn.innerHTML = open ? I('x',16) : I('search',16);
  if(open){
    setTimeout(function(){ const input = document.getElementById('convo-search-input'); if(input) input.focus(); }, 120);
  } else {
    const input = document.getElementById('convo-search-input');
    if(input) input.value = '';
  }
}
function onConvoSearchKeydown(e){
  e.stopPropagation();
  if(e.key === 'Escape'){
    closeConvoSearch();
    e.currentTarget.blur();
  } else if(e.key === 'Enter' && e.currentTarget.value.trim()){
    showHint('This is a prototype — search isn’t wired up yet');
  }
}
function closeFilterMenu(){ const m=document.getElementById('filter-menu'); if(m) m.classList.remove('open'); }
function closeSortMenu(){ const m=document.getElementById('sort-menu'); if(m) m.classList.remove('open'); }
function selectFilter(e, key){
  e.stopPropagation();
  inboxStatusFilter = key;
  document.querySelector('[data-role="filter"] .filter-tab-label').textContent = FILTER_LABELS[key];
  document.querySelectorAll('#filter-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['open','closed','all'][i]===key); });
  closeFilterMenu();
  showHint('This is a prototype — filtering isn’t wired up yet');
}
function selectSort(e, key){
  e.stopPropagation();
  inboxSortBy = key;
  document.querySelector('[data-role="sort"] .filter-tab-label').textContent = SORT_LABELS[key];
  document.querySelectorAll('#sort-menu .menu-check-item').forEach(function(el,i){ el.classList.toggle('active', ['last-activity','date-started','waiting-since'][i]===key); });
  closeSortMenu();
  showHint('This is a prototype — sorting isn’t wired up yet');
}
// Selecting a row marks it read and moves the selected state — the open
// thread itself doesn't change, since only Jordan Lee's conversation has
// live data in this prototype.
function selectChatItem(e, row){
  if(row.classList.contains('selected')) return;
  cancelInboxDemo(); // a real click always takes control back from the auto-demo
  const key = row.dataset.convo;
  document.querySelectorAll('.chat-item.selected').forEach(function(el){
    el.classList.remove('selected');
    el.setAttribute('aria-current','false');
  });
  row.classList.remove('unread');
  row.classList.add('selected');
  row.setAttribute('aria-current','true');
  if(key && CONVERSATIONS[key]){
    renderConversation(key);
  } else {
    showHint('This is a prototype — only a few conversations have live data');
  }
}
// Swaps the chat window's header/thread/side-panel to a different
// CONVERSATIONS entry in place — the composer, command menu, and emoji/AI
// menus are left untouched so nothing mid-interaction gets reset.
function renderConversation(key){
  const conv = CONVERSATIONS[key];
  if(!conv) return;
  activeConvo = key;
  const nameEl = document.querySelector('.chat-header-id strong');
  if(nameEl) nameEl.textContent = conv.name;
  const badgesEl = document.querySelector('.chat-header-badges');
  if(badgesEl){
    badgesEl.innerHTML = roleBadge(conv.role) + (conv.canvas
      ? `<span class="icon-btn-square" style="border:.5px solid var(--border-soft);" title="Canvas">${Ilms('canvas',16)}</span>`
      : '');
  }
  const threadEl = document.querySelector('.chat-thread');
  if(threadEl) threadEl.innerHTML = convoThreadHtml(conv);
  const fieldsEl = document.querySelector('.field-row-list');
  if(fieldsEl) fieldsEl.innerHTML = conv.fields
    ? conv.fields.map(f=>`<div class="field-row"><span>${f[0]}</span><strong>${f[1]}</strong></div>`).join('')
    : '<div class="field-row-empty">No details to show for this message.</div>';
  const accEl = document.getElementById('side-panel-accordions');
  if(accEl) accEl.innerHTML = convoAccordionsHtml(conv);
  const composer = document.getElementById('composer-input');
  if(composer){ composer.innerHTML = ''; updateSendBtn(); }
}

/* ---------------- inbox intro trickle ---------------- */
// The inbox starts with only the pinned Welcome message. Every other
// conversation trickles in one at a time, at a randomized interval, so the
// arrival rate reads as live traffic rather than a scripted batch. Rows land
// just below the pinned Welcome row (which never moves). Arrivals never
// select themselves — the agent stays on whatever they're reading (Welcome,
// by default) until they choose to click into something. Any real click
// cancels every pending timer immediately.
function startInboxTrickle(){
  const queue = INBOX_ARRIVALS.concat(INBOX_TAIL_ARRIVALS);
  let i = 0;
  function next(){
    if(i >= queue.length) return;
    const item = queue[i++];
    if(document.querySelector('.inbox-shell')) demoAddChatter(item);
    const delay = 1400 + Math.random()*2600;
    inboxDemoTimers.push(setTimeout(next, delay));
  }
  inboxDemoTimers.push(setTimeout(next, 1800));
}
function cancelInboxDemo(){
  inboxDemoTimers.forEach(clearTimeout);
  inboxDemoTimers = [];
}
function demoAddChatter(item){
  const scroll = document.querySelector('.convo-scroll');
  if(!scroll) return;
  const pinned = scroll.querySelector('.chat-item.pinned');
  // Every arrival lands unread until the agent opens it — enforced here
  // rather than trusted per-entry, since a live inbox never receives a
  // conversation that's already "read".
  const opts = Object.assign({}, item.opts, {unread:true});
  const html = inboxChatItem(item.role, item.label, item.time, item.preview, opts);
  if(pinned) pinned.insertAdjacentHTML('afterend', html);
  else scroll.insertAdjacentHTML('afterbegin', html);
  FILTER_LABELS.open = FILTER_LABELS.open.replace(/\d+/, m => String(Number(m)+1));
  FILTER_LABELS.all = FILTER_LABELS.all.replace(/\d+/, m => String(Number(m)+1));
  if(inboxStatusFilter !== 'closed'){
    const label = document.querySelector('[data-role="filter"] .filter-tab-label');
    if(label) label.textContent = FILTER_LABELS[inboxStatusFilter];
  }
}
function onChatItemKeydown(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    e.currentTarget.click();
  }
}
function toggleAccordion(e, id){
  e.stopPropagation();
  const header = e.currentTarget;
  const body = document.getElementById(id);
  header.classList.toggle('open');
  if(body) body.classList.toggle('open');
}
function toggleSidePanel(e){
  if(e) e.stopPropagation();
  sidePanelCollapsed = !sidePanelCollapsed;
  const panel = document.querySelector('.side-panel');
  if(panel){
    panel.classList.toggle('collapsed', sidePanelCollapsed);
    panel.setAttribute('aria-hidden', String(sidePanelCollapsed));
  }
  document.querySelectorAll('[data-panel-toggle]').forEach(btn=>{
    btn.classList.toggle('show', sidePanelCollapsed);
    btn.setAttribute('aria-expanded', String(!sidePanelCollapsed));
  });
  // Whichever control was clicked is the one that just disappeared, so hand
  // focus to its counterpart rather than dropping it on <body>.
  const next = sidePanelCollapsed
    ? document.querySelector('[data-panel-toggle]')
    : document.querySelector('.side-tabs-actions [aria-label="Collapse context panel"]');
  if(next) next.focus();
}
function selectSideTab(e, key){
  e.stopPropagation();
  document.querySelectorAll('.side-tab').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  if(key !== 'user') showHint('This is a prototype — only the User tab has live data');
}
function selectTopicTab(e, key){
  e.stopPropagation();
  document.querySelectorAll('.segment-pill[data-topic]').forEach(el=>el.classList.remove('active'));
  e.currentTarget.classList.add('active');
  document.querySelectorAll('.topic-examples').forEach(el=>el.classList.remove('active'));
  const panel = document.getElementById('topic-examples-'+key);
  if(panel) panel.classList.add('active');
}

function toggleCommandMenu(e){
  if(e) e.stopPropagation();
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.toggle('open');
}
function closeCommandMenu(){
  const menu = document.getElementById('command-menu');
  if(menu) menu.classList.remove('open');
}
function closeEmojiMenu(){
  const menu = document.getElementById('emoji-menu');
  if(menu) menu.classList.remove('open');
}
function closeAiMenu(){
  const menu = document.getElementById('ai-menu');
  if(menu) menu.classList.remove('open');
}

/* ---------------- composer ---------------- */
function placeCaretAtEnd(el){
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
function updateSendBtn(){
  const el = document.getElementById('composer-input');
  const btn = document.getElementById('send-btn');
  if(!el || !btn) return;
  btn.disabled = el.textContent.trim().length === 0;
}
function filterCommandMenu(query){
  document.querySelectorAll('#command-menu .command-item').forEach(item=>{
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.style.display = match ? '' : 'none';
  });
}
function onComposerInput(e){
  const el = e.currentTarget;
  updateSendBtn();
  const text = el.textContent;
  if(text.trim().startsWith('!')){
    closeEmojiMenu();
    closeAiMenu();
    document.getElementById('command-menu').classList.add('open');
    filterCommandMenu(text.trim().slice(1).toLowerCase());
  } else {
    closeCommandMenu();
  }
}
function onComposerKeydown(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendComposerMessage(e);
  } else if(e.key === 'Escape'){
    closeCommandMenu();
  }
}
function formatNowTime(){
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2,'0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; if(h === 0) h = 12;
  return h + ':' + m + ' ' + ampm;
}
function appendMineMessage(text){
  const thread = document.querySelector('.chat-thread');
  if(!thread) return;
  const row = document.createElement('div');
  row.className = 'msg-row mine';
  const col = document.createElement('div');
  col.className = 'msg-col mine';
  const bubble = document.createElement('div');
  bubble.className = 'bubble mine';
  bubble.textContent = text;
  const time = document.createElement('span');
  time.className = 'msg-time';
  time.textContent = formatNowTime();
  col.appendChild(bubble);
  col.appendChild(time);
  row.appendChild(col);
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
}
function sendComposerMessage(e){
  if(e) e.preventDefault();
  const el = document.getElementById('composer-input');
  if(!el) return;
  const text = el.textContent.trim();
  if(!text) return;
  appendMineMessage(text);
  el.textContent = '';
  updateSendBtn();
  closeCommandMenu();
  el.focus();
}
function toggleEmojiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeAiMenu();
  document.getElementById('emoji-menu').classList.toggle('open');
}
function insertEmoji(e, emoji){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent += emoji;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeEmojiMenu();
}
function toggleAiMenu(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  document.getElementById('ai-menu').classList.toggle('open');
}
function useAiSuggestion(e, btn){
  e.stopPropagation();
  const el = document.getElementById('composer-input');
  el.textContent = btn.textContent;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeAiMenu();
}
function useCommand(e){
  e.stopPropagation();
  const key = e.currentTarget.dataset.cmd;
  const text = COMMAND_TEXTS[key];
  if(!text) return;
  const el = document.getElementById('composer-input');
  el.textContent = text;
  placeCaretAtEnd(el);
  updateSendBtn();
  closeCommandMenu();
}
/* ---------------- dictation (Web Speech API, with simulated fallback) ---------------- */
let recognition = null;
let micBaseText = '';
let micFallbackTimer = null;
function getSpeechRecognitionCtor(){
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}
function startSimulatedDictation(btn, el){
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  btn.classList.add('mic-recording');
  el.setAttribute('data-placeholder','Listening…');
  micFallbackTimer = setTimeout(function(){
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    const phrase = "Sure — I’ll walk you through the restart steps now.";
    el.textContent = micBaseText + phrase;
    placeCaretAtEnd(el);
    updateSendBtn();
  }, 1400);
}
function toggleMic(e){
  e.stopPropagation();
  closeCommandMenu();
  closeEmojiMenu();
  closeAiMenu();
  const btn = document.getElementById('mic-btn');
  const el = document.getElementById('composer-input');
  if(btn.classList.contains('mic-recording')){
    clearTimeout(micFallbackTimer);
    if(recognition){ recognition.stop(); recognition = null; }
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    return;
  }
  const SpeechRecognitionCtor = getSpeechRecognitionCtor();
  if(!SpeechRecognitionCtor){
    // no browser support at all — keep the demo alive with a simulated transcript
    startSimulatedDictation(btn, el);
    return;
  }
  micBaseText = el.textContent.trim() ? el.textContent.trim() + ' ' : '';
  let finalTranscript = '';
  let started = false;
  let settled = false; // true once this session has been resolved exactly once (real or fallback)
  recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.onstart = function(){
    started = true;
    btn.classList.add('mic-recording');
    el.setAttribute('data-placeholder','Listening…');
  };
  recognition.onresult = function(event){
    let interimTranscript = '';
    for(let i = event.resultIndex; i < event.results.length; i++){
      const transcript = event.results[i][0].transcript;
      if(event.results[i].isFinal){
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    el.textContent = micBaseText + finalTranscript + interimTranscript;
    placeCaretAtEnd(el);
    updateSendBtn();
  };
  recognition.onerror = function(event){
    if(settled) return; // watchdog (or a prior error) already resolved this session
    settled = true;
    recognition = null;
    if(event.error === 'no-speech'){
      showHint('No speech detected.');
      btn.classList.remove('mic-recording');
      el.setAttribute('data-placeholder','Type a message or ! for commands');
    } else {
      // permission denied, or blocked by this page's embed context — fall back to a simulated transcript
      startSimulatedDictation(btn, el);
    }
  };
  recognition.onend = function(){
    if(settled) return;
    settled = true;
    btn.classList.remove('mic-recording');
    el.setAttribute('data-placeholder','Type a message or ! for commands');
    recognition = null;
  };
  try {
    recognition.start();
  } catch(err){
    settled = true;
    recognition = null;
    startSimulatedDictation(btn, el);
    return;
  }
  // watchdog: some embed contexts silently block the mic (no onstart, no onerror ever fires) —
  // fall back to a simulated transcript rather than leaving the button looking unresponsive
  setTimeout(function(){
    if(started || settled) return;
    settled = true;
    const stale = recognition;
    recognition = null;
    try { stale.abort(); } catch(err){}
    startSimulatedDictation(btn, el);
  }, 700);
}

function openModal(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  document.getElementById('backdrop').classList.add('open');
  document.getElementById('remedy-modal').classList.add('open');
}
function closeModal(){
  const backdrop = document.getElementById('backdrop');
  const modal = document.getElementById('remedy-modal');
  if(backdrop) backdrop.classList.remove('open');
  if(modal) modal.classList.remove('open');
}
document.getElementById('backdrop').addEventListener('click', closeModal);

function goToIntegrityReview(e){
  if(e) e.stopPropagation();
  closeCommandMenu();
  showPage('integrity-review');
}

let hintTimer = null;
function showHint(msg){
  const toast = document.getElementById('hint-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(hintTimer);
  hintTimer = setTimeout(()=>toast.classList.remove('show'), 2200);
}

/* ---------------- Settings > General ---------------- */
// Real local state (see settingsFields/settingsToggles in icons.js) — edits
// and toggles genuinely stick for the session, they just never leave the browser.
function updateSettingsField(e, key){ settingsFields[key] = e.currentTarget.value; }
function toggleSetting(e, key){
  settingsToggles[key] = !settingsToggles[key];
  e.currentTarget.classList.toggle('on', settingsToggles[key]);
  e.currentTarget.classList.toggle('off', !settingsToggles[key]);
}

/* ---------------- report filter/search controls ---------------- */
// Generic handlers for searchField()/reportFilterDropdown() (js/chrome.js).
// Report pages are mostly stat/chart summaries with nothing underneath to
// actually filter, so the default path here just confirms the interaction
// — same idiom as the inbox's own selectFilter/selectSort. All Reports and
// Conversation Topics pass their own handlers instead (below) since they
// have real underlying data.
function onReportSearchKeydown(e){
  if(e.key === 'Escape'){
    e.currentTarget.value = '';
    e.currentTarget.blur();
  } else if(e.key === 'Enter' && e.currentTarget.value.trim()){
    showHint('This is a prototype — search isn’t wired up yet');
  }
}
function toggleReportFilter(e, id){
  e.stopPropagation();
  document.querySelectorAll('.report-filter-menu.open').forEach(function(m){
    if(m.id !== id) m.classList.remove('open');
  });
  const menu = document.getElementById(id);
  if(menu) menu.classList.toggle('open');
}
function closeReportFilters(){
  document.querySelectorAll('.report-filter-menu.open').forEach(function(m){ m.classList.remove('open'); });
}
function selectReportFilter(e, id, value){
  e.stopPropagation();
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  showHint('This is a prototype — filtering isn’t wired up yet');
}
// "Compare to last period" toggles the delta badges already sitting in the
// page's stat tiles — the one report-page control with real data to act on
// without fabricating anything new.
function toggleCompareRow(e){
  const btn = e.currentTarget;
  const on = btn.classList.toggle('active');
  const grid = document.querySelector('.scroll-body .stat-grid');
  if(grid) grid.querySelectorAll('.stat-delta').forEach(function(el){ el.style.display = on ? 'none' : ''; });
}

/* All Reports: search + category actually filter the table. */
function filterAllReportsTable(){
  const q = (document.getElementById('all-reports-search')||{}).value?.trim().toLowerCase() || '';
  const cat = window.allReportsCategory || 'All categories';
  const rows = document.querySelectorAll('#all-reports-tbody tr[data-name]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.name||'').includes(q);
    const matchesCat = cat === 'All categories' || tr.dataset.category === cat;
    const show = matchesQ && matchesCat;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('all-reports-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onAllReportsSearch(e){ filterAllReportsTable(); }
function selectAllReportsCategory(e, id, value){
  e.stopPropagation();
  window.allReportsCategory = value;
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  filterAllReportsTable();
}

/* Conversation Topics: category filter selects the matching theme tab. */
function onTopicCategorySelect(e, id, value){
  e.stopPropagation();
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  if(value === 'All categories') return;
  const tab = [...document.querySelectorAll('.segment-pill[data-topic]')].find(function(el){ return el.textContent.trim()===value; });
  if(tab){ tab.click(); tab.scrollIntoView({block:'nearest', inline:'center'}); }
}

/* Knowledge > Content: search + type actually filter the table. */
function filterKnowledgeContentTable(){
  const q = (document.getElementById('content-search')||{}).value?.trim().toLowerCase() || '';
  const type = window.knowledgeContentType || 'All types';
  const rows = document.querySelectorAll('#content-tbody tr[data-name]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.name||'').includes(q);
    const matchesType = type === 'All types' || tr.dataset.type === type;
    const show = matchesQ && matchesType;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('content-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onKnowledgeContentSearch(e){ filterKnowledgeContentTable(); }
function selectContentType(e, id, value){
  e.stopPropagation();
  window.knowledgeContentType = value;
  const label = document.getElementById(id+'-label');
  if(label) label.textContent = value;
  const menu = document.getElementById(id);
  if(menu){
    menu.querySelectorAll('.menu-check-item').forEach(function(item){
      item.classList.toggle('active', item.textContent.trim()===value);
    });
    menu.classList.remove('open');
  }
  filterKnowledgeContentTable();
}

/* Knowledge > Articles: search + status tabs actually filter the table. */
function filterKnowledgeArticlesTable(){
  const q = (document.getElementById('articles-search')||{}).value?.trim().toLowerCase() || '';
  const status = window.knowledgeArticleStatus || 'All';
  const rows = document.querySelectorAll('#articles-tbody tr[data-title]');
  let visible = 0;
  rows.forEach(function(tr){
    const matchesQ = !q || (tr.dataset.title||'').includes(q);
    const matchesStatus = status === 'All' || tr.dataset.status === status;
    const show = matchesQ && matchesStatus;
    tr.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  const empty = document.getElementById('articles-empty');
  if(empty) empty.style.display = visible ? 'none' : '';
}
function onKnowledgeArticlesSearch(e){ filterKnowledgeArticlesTable(); }
function selectArticleTab(e, status){
  window.knowledgeArticleStatus = status;
  document.querySelectorAll('.tabs-row .tab').forEach(function(t){ t.classList.remove('active'); });
  e.currentTarget.classList.add('active');
  filterKnowledgeArticlesTable();
}

/* ---------------- chart hover tooltip ---------------- */
// One shared floating tooltip, positioned from delegated pointer events —
// works against every re-render of the reports pages without re-wiring.
function chartTooltipEl(){
  let el = document.getElementById('chart-tooltip');
  if(!el){
    el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.className = 'chart-tooltip';
    document.body.appendChild(el);
  }
  return el;
}
function clearChartMarks(){
  document.querySelectorAll('.chart-crosshair.show, .chart-hover-dot.show').forEach(function(mark){ mark.classList.remove('show'); });
}
function hideChartTooltip(){
  const el = document.getElementById('chart-tooltip');
  if(el) el.classList.remove('show');
  clearChartMarks();
}
function positionChartTooltip(tip, clientX, clientY){
  const pad = 14;
  const rect = tip.getBoundingClientRect();
  let left = clientX + pad, top = clientY + pad;
  if(left + rect.width > window.innerWidth - 8) left = clientX - rect.width - pad;
  if(top + rect.height > window.innerHeight - 8) top = clientY - rect.height - pad;
  tip.style.left = left+'px';
  tip.style.top = top+'px';
}
function showBarTooltip(bar, e){
  let data; try{ data = JSON.parse(bar.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);
}
function showLineTooltip(hit, e){
  const svg = hit.closest('svg.mini-chart');
  if(!svg) return;
  let data; try{ data = JSON.parse(hit.dataset.tip); } catch(err){ return; }
  clearChartMarks();
  const tip = chartTooltipEl();
  tip.innerHTML = chartTooltipHtml(data);
  tip.classList.add('show');
  positionChartTooltip(tip, e.clientX, e.clientY);

  const cx = hit.getAttribute('data-cx');
  const cross = svg.querySelector('.chart-crosshair');
  if(cross){ cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.classList.add('show'); }
  let cys = []; try{ cys = JSON.parse(hit.getAttribute('data-cy')); } catch(err){}
  svg.querySelectorAll('.chart-hover-dot').forEach(function(dot){
    const si = Number(dot.dataset.series);
    if(cys[si] === undefined) return;
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cys[si]);
    dot.classList.add('show');
  });
}
function chartTooltipHtml(data){
  const rows = (data.entries||[]).map(function(en){
    return '<div class="chart-tip-row"><span class="chart-tip-dot" style="background:'+en.color+'"></span>'
      + '<span class="chart-tip-name">'+en.name+'</span><span class="chart-tip-value">'+en.value+'</span></div>';
  }).join('');
  return (data.label ? '<div class="chart-tip-label">'+data.label+'</div>' : '') + rows;
}
function initChartTooltip(){
  document.addEventListener('mousemove', function(e){
    const hit = e.target.closest && e.target.closest('.chart-hit');
    if(hit){ showLineTooltip(hit, e); return; }
    const bar = e.target.closest && e.target.closest('.chart-bar');
    if(bar){ showBarTooltip(bar, e); return; }
    hideChartTooltip();
  });
  // mousemove alone won't fire once the pointer leaves the window entirely.
  document.addEventListener('mouseout', function(e){
    if(!e.relatedTarget) hideChartTooltip();
  });
}
initChartTooltip();

showPage('inbox');
startInboxTrickle();
