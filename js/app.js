/* ================= APP / ROUTING ================= */
const PAGES = {
  'inbox':                    {sidenav:'inbox',     secondary:null, bare:true,                   content:pageInbox},
  'knowledge-sources':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-sources'), content:pageKnowledgeSources},
  'knowledge-content':        {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-content'), content:pageKnowledgeContent},
  'knowledge-articles':       {sidenav:'knowledge',  secondary:()=>knowledgeNav('knowledge-articles'),content:pageKnowledgeArticles},
  'reports-overview':         {sidenav:'reports',    secondary:()=>reportsNav('reports-overview'),content:pageReportsOverview},
  'reports-all':              {sidenav:'reports',    secondary:()=>reportsNav('reports-all'),     content:pageReportsAll},
  'reports-flagged-sessions': {sidenav:'reports',    secondary:()=>reportsNav('reports-flagged-sessions'),content:pageReportsFlagged},
  'reports-room-scan':        {sidenav:'reports',    secondary:()=>reportsNav('reports-room-scan'),content:pageReportsRoomScan},
  'reports-ai-assist':        {sidenav:'reports',    secondary:()=>reportsNav('reports-ai-assist'),content:pageReportsAiAssist},
  'contacts-administrators':  {sidenav:'contacts',   secondary:contactsNav,                       content:pageContactsAdministrators},
  'settings-home':            {sidenav:'settings',   secondary:()=>settingsNav('home'),           content:pageSettingsHome},
  'settings-general':         {sidenav:'settings',   secondary:()=>settingsNav('general'),        content:pageSettingsGeneral},
  'integrity-review':         {sidenav:null,         secondary:null,                              content:pageIntegrityReview},
};
const DEFAULT_FOR_ICON = {inbox:'inbox', knowledge:'knowledge-sources', reports:'reports-overview', contacts:'contacts-administrators', settings:'settings-home'};

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

function showPage(key){
  if(!PAGES[key]) return;
  closeCommandMenu();
  closeModal();
  renderShell(key);
  window.scrollTo(0,0);
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
});

function toggleViews(e){
  e.stopPropagation();
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

showPage('inbox');
