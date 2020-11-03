async function requestFromBackground(obj){
    return new Promise((res,rej) => {
        chrome.runtime.sendMessage(obj, response=> {
            res(response)
        })
    })
}

function test(){
    
    const reg = (o, n) => o ? o[n] : '';
    const cn = (o, s) => o?.getElementsByClassName(s);
    const tn = (o, s) => o?.getElementsByTagName(s);
    const gi = (o, s) => o?.getElementById(s);
    const rando = (n) => Math.round(Math.random() * n);
    const unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
    const delay = (ms) => new Promise(res => setTimeout(res, ms));
    const ele = (t) => document.createElement(t);
    const attr = (o, k, v) => {
      try{o.setAttribute(k, v);}
      catch(err){
        console.log([err,o,k,v]);
      }
    };
    const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

    function inlineStyler(elm,css){
      Object.entries(JSON.parse(
      css.replace(/(?<=:)\s*(\b|\B)(?=.+?;)/g,'"')
        .replace(/(?<=:\s*.+?);/g,'",')
        .replace(/[a-zA-Z-]+(?=:)/g, k=> k.replace(/^\b/,'"').replace(/\b$/,'"'))
        .replace(/\s*,\s*\}/g,'}')
      )).forEach(kv=> { elm.style[kv[0]] = kv[1]});
    }
  
    function aninCloseBtn() {
        var l1 = tn(this, 'path')[0];
        var l2 = tn(this, 'path')[1];
        l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
        l1.style.transition = "all 433ms";
        l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
        l2.style.transition = "all 133ms";
    }
    
    function anoutCloseBtn() {
        var l1 = tn(this, 'path')[0];
        var l2 = tn(this, 'path')[1];
        l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
        l1.style.transition = "all 433ms";
        l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
        l2.style.transition = "all 133ms";
    }
    
    function dragElement() {
        var el = this.parentElement.getAttribute('dragme') ? this.parentElement : this.parentElement.parentElement;
        var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
        if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
        else this.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
            el.style.opacity = "0.85";
            el.style.transition = "opacity 700ms";
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            el.style.opacity = "1";
        }
    }
    
    function adjustElementSize(){
        var cont = this.parentElement.parentElement.parentElement;
        var main = this.parentElement.parentElement;
        var cbod = main.firstChild;
        var foot = this.parentElement;
        var head_height = cont.firstChild.getBoundingClientRect().height;
        var foot_height = foot.getBoundingClientRect().height;
        var pos1 = 0,    pos2 = 0,    pos3 = 0,    pos4 = 0;
        var width = parseFloat(cont.style.width.replace(/px/,''));
        var height = parseFloat(cont.getBoundingClientRect().height);
        if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
        else this.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            cont.style.width = width - (pos3 - e.clientX) + 'px';
            cont.style.height = ((height - (pos4 - e.clientY)) )+ 'px';
            cbod.style.height = ((height - (pos4 - e.clientY)) - (head_height+foot_height)) + 'px';
            var rect = main.getBoundingClientRect();
            var edge = 15;
            inlineStyler(foot,`{display: grid; grid-template-columns: ${(rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;}`)
            cont.style.opacity = '0.95';
            cont.style.transition = 'opacity 200ms';
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            cont.style.opacity = '1';
        }
    }
    
    const svgs = {
        micon: `<svg transform="translate(-2, 5)" width="18px" height="18px" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="#007862" d="M37.341,37.567c0.264,0,0.526-0.104,0.724-0.31c2.852-2.987,4.487-7.332,4.487-11.922c0-4.589-1.636-8.934-4.486-11.921  c-0.381-0.399-1.016-0.414-1.414-0.033c-0.399,0.382-0.414,1.015-0.033,1.414c2.5,2.619,3.934,6.461,3.934,10.54  c0,4.08-1.434,7.922-3.935,10.541c-0.381,0.399-0.366,1.032,0.033,1.414C36.844,37.476,37.093,37.567,37.341,37.567z"/><path fill="#007862" d="M34.016,34.482c0.252,0,0.504-0.095,0.698-0.284c2.225-2.172,3.501-5.401,3.501-8.861c0-3.461-1.276-6.69-3.501-8.862  c-0.395-0.385-1.027-0.378-1.414,0.018c-0.386,0.396-0.378,1.028,0.018,1.414c1.841,1.797,2.897,4.506,2.897,7.431  s-1.057,5.633-2.897,7.43c-0.396,0.386-0.403,1.019-0.018,1.414C33.496,34.382,33.756,34.482,34.016,34.482z"/><path fill="#007862" d="M30.084,29.571c-0.424,0.354-0.479,0.985-0.126,1.409c0.198,0.236,0.482,0.358,0.769,0.358c0.226,0,0.453-0.076,0.641-0.232  c1.572-1.314,2.511-3.472,2.511-5.77c0-2.333-0.961-4.508-2.57-5.82c-0.428-0.35-1.058-0.282-1.407,0.144  c-0.349,0.428-0.284,1.058,0.144,1.407c1.148,0.936,1.834,2.532,1.834,4.27C31.878,27.05,31.207,28.633,30.084,29.571z"/><path fill="#007862" d="M24.03,12.536l-8.203,6.134h-4.275c-0.553,0-1,0.447-1,1v11.334c0,0.553,0.447,1,1,1h4.275l8.203,6.134  c0.176,0.132,0.387,0.199,0.599,0.199c0.152,0,0.307-0.035,0.448-0.105c0.338-0.17,0.552-0.516,0.552-0.895v-24  c0-0.379-0.214-0.725-0.552-0.895C24.739,12.275,24.332,12.31,24.03,12.536z M23.629,35.341l-6.87-5.138  c-0.173-0.129-0.383-0.199-0.599-0.199h-3.608V20.67h3.608c0.216,0,0.426-0.07,0.599-0.199l6.87-5.138V35.341z"/></svg>`,
        close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
        resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">  <g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">  <path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>  <path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>  <path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>  <path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>  </g>  </svg>`,    resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">  <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#43de6d" stroke="none">  <path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>  <path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>  <path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>  </g>  </svg>`,
        check: `<svg width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 80.588 61.158" style="enable-background:new 0 0 80.588 61.158;" xml:space="preserve"><path style="fill:#43de6d;" d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611  c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374  c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z  "/></svg>`,
        menu: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 12" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-885.000000, -3438.000000)"><g transform="translate(100.000000, 3378.000000)"><g transform="translate(782.000000, 54.000000)"><g transform="translate(0.000000, 0.000000)"><polygon points="0 0 24 0 24 24 0 24"/><path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" fill="#1D1D1D"/></g></g></g></g></g></svg>`,
        edit: `<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>`,
        add: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 14" version="1.1">    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g transform="translate(-411.000000, -1487.000000)">            <g transform="translate(100.000000, 1428.000000)">                <g transform="translate(306.000000, 54.000000)">                    <g transform="translate(0.000000, 0.000000)">                        <polygon points="0 0 24 0 24 24 0 24"/>                        <path d="M18,13 L13,13 L13,18 C13,18.55 12.55,19 12,19 C11.45,19 11,18.55 11,18 L11,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L11,11 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,11 L18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 Z" fill="#1D1D1D"/>                    </g>                </g>            </g>        </g>    </g></svg>`,
        del: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e21212" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" ><line x1="0" y1="18" x2="22" y2="18"/></svg>`,
    };
    const unqHsh = (a, o) => a?.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));

    const current_chatters = {};

    const chat_actor_options = {
        mod_chatter: true,
        vip_chatter: true,
        sub_chatter: true,
        cheer_chatter: true,
        pleb_chatter: true,
    };
/*

    *********************************************************
                        TWITCH DOM CLASSES
    *********************************************************

*/

    const chat_window_class = 'chat-scrollable-area__message-container';
    const chat_chat_msg_class = 'chat-line__message';
    const chat_emote_class = 'chat-image chat-line__message--emote';
    const chat_badge_class = 'chat-badge';
    const chat_username_class = 'chat-author__display-name';
    const chat_text_class = 'text-fragment';
    const chat_mention_class = 'mention-fragment';
    const chat_link_class = 'link-fragment';
    const chat_highlighted = 'chat-line__message-body--highlighted';
    const chat_cheer_amount = 'chat-line__message--cheer-amount';


/*

    *********************************************************
                        EXTENSION ACTIONS
    *********************************************************

*/






/*

    *********************************************************
                        EXTENSION DOM ACTIONS
    *********************************************************

*/
    const cleanTalk = (str) => str?.replace(/^.{0,24}say.{0,24}:/i, '').replace(/fu[ck]+\s+(u|y[ou]+|(go|get|)\s*fu[ck]+(ed|)\s*(your\s*self|ur\*self|))/g, '. I love you. ').replace(/\bpuss[iey]+\b|\bpoos[iey]+\b|\bcunt\b/g, 'beep').replace(/.*n[iea]+[g]+(a|er).*|n[iae]+[ck]+\s*er/g, '').replace(/MAGA|Make\s*\S*merica\s*\S*great\s*\S*again/gi, 'chuds chuds everywhere').replace(/\bretard\b|\blibtard\b|\btard\b/g, 'beep').replace(/\bcunt\b/g, 'beep').replace(/\bT\s*r\s*u\s*m\s*p\s*\d+/ig, 'Bernie Twenty Twenty').replace(/\bT\s*r\s*u\s*m\s*p\s*/ig, ' a Florida man, ').replace(/.*\bb\s*i\s*d\s*e\s*n\s*\d+.*/ig, 'Bernie Twenty Twenty').replace(/\bAmy\b|cloud\s*boot\s*jar|klobuchar/ig, 'boot off my cloud jar').replace(/\w+[_\W]*2[_\W]*0[_\W]*[2-3]][_\W]*(0|4|8|2)/g, 'Bernie Twenty Twenty').replace(/\w+\W*Twenty\W*Twenty|\w+\W*Tw[iae]n\W*t[ey]+\W*Tw[iae]+n\W*t[eay]+/gi, 'Bernie Twenty Twenty');

    function parseTTSOptions(obj) {
        const {    chattext    } = obj;
        const langOptionMatch = (s, o) => new RegExp(wordsNearEachother(`${s}~say`, '.{0,9}') + '|' + wordsNearEachother(`${s}~define`, '.{0,9}') + '.{0,9}:', 'i').test(o);
        const langs = [    ['net', 'nl-NL'],    ['dut', 'de-DE'],    ['brit', 'en-GB'],    ['fren', 'fr-FR'],    ['ital', 'it-IT'],    ['span', 'es-ES'],    ['russ', 'ru-RU']    ]; 
        const lang_index = langs.findIndex(r => langOptionMatch(r[0], chattext));
        return {    lang: lang_index > -1 ? langs[lang_index[1]] : 'en-US',    pitch: /slow.*?:/i.test(chattext) ? 0.3 : /fast.*?:/i.test(chattext) ? 1.9 : 1,    }
    }
    function getLastChatObj(el) {
        const classArray = (o, k) => cn(o, k).length ? Array.from(cn(o, k)) : [];
        const floatORZero = (s) => parseFloat(s) != NaN ? parseFloat(s) : 0
        const badges = el ? classArray(el, chat_badge_class).map(el => el.getAttribute('alt') && el.getAttribute('alt').toLowerCase()) : [];
        const chatObj = el ? {
            badges: badges,
            months_subscribed: badges?.length ? badges.map(m=> parseFloat(m.replace(/(?<=\d+).+/,''))).filter(m=> m > 0)[0] : 0,
            timestamp: new Date().getTime(),
            username: cn(el, chat_username_class) && cn(el, chat_username_class).length ? cn(el, chat_username_class)[0].innerText?.trim().toLowerCase() : null,
            chattext: cn(el, chat_text_class) && cn(el, chat_text_class).length ? Array.from(cn(el, chat_text_class)).map(r => r?.innerText).reduce((a, b) => a + b).trim() : null,
            emotes: classArray(el, chat_emote_class).map(r => r?.getAttribute('alt')),
            mentions: classArray(el, chat_mention_class).map(r => r?.innerText),
            links: classArray(el, chat_link_class).map(r => r?.innerText),
            cheer_amount: cn(el, chat_cheer_amount) && cn(el, chat_cheer_amount).length ? Array.from(cn(el, chat_cheer_amount)).map(r => floatORZero(r?.innerText?.trim())).reduce((a, b) => a + b).trim() : null,
            is_highlighted: classArray(el, chat_highlighted).length > 0,
        } : null;
        return chatObj;
    }

    function runChatFunctionsOnNewMessage() {
        const chat_container_elm = cn(document, chat_window_class) && cn(document, chat_window_class)[(cn(document, chat_window_class).length - 1)]?.parentElement;
        const chat_chat_msg_elm = chat_container_elm && cn(chat_container_elm, chat_chat_msg_class) && cn(chat_container_elm, chat_chat_msg_class)[(cn(chat_container_elm, chat_chat_msg_class).length - 1)];
        if (chat_chat_msg_elm && chat_chat_msg_elm.getAttribute('msg_is_read') == null) {
            let last_chat_obj = getLastChatObj(chat_chat_msg_elm);
            chat_chat_msg_elm.setAttribute('msg_is_read', 'read');
            let first_span = tn(chat_chat_msg_elm, 'span')[0];
            let mic_elm = ele('span');
            a(mic_elm, [['jdat', `${JSON.stringify(last_chat_obj)}`],['style', `cursor: pointer;`]]);
            mic_elm.innerHTML = svgs.micon;
            first_span?.insertAdjacentElement('beforebegin', mic_elm);
            mic_elm.onclick = manualChatTTS;
    console.log(last_chat_obj);
            if (last_chat_obj?.chattext && /\bsay.{0,18}:/i.test(last_chat_obj?.chattext)) {
                let tts_opt = parseTTSOptions(last_chat_obj);
                runTTSSyth(last_chat_obj.chattext, tts_opt);
            }
        }
    }
    function manualChatTTS() {
        const jdat = JSON.parse(this.getAttribute('jdat'));
        const tts_opt = parseTTSOptions(jdat);
        console.log(jdat.chattext);
        runTTSSyth(jdat, tts_opt);
    }
    async function runTTSSyth(chat_obj, tts_opt) {
        if (chat_obj.chattext ) {
        cancelTTSsynth();
        await delay(111);
        let synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(cleanTalk(chat_obj.chattext));
        utterThis.lang = tts_opt?.lang || 'us-EN';
        utterThis.pitch = tts_opt?.pitch || 1;
        utterThis.rate = 1;
        utterThis.onend = (e) => {
            synth.cancel();
        };
        synth.speak(utterThis);
        }
    }

/*

    *********************************************************
                        TEXT PROCESSING 
    *********************************************************

*/

    function canChat(chat_obj){
      if(chat_actor_options?.pleb_chatter) return true;
      if(chat_actor_options?.vip_chatter && chat_obj.badges.some(b=> b == 'vip')) return true;
      if(chat_actor_options?.mod_chatter && chat_obj.badges.some(b=> b == 'moderator')) return true;
      if(chat_actor_options?.sub_chatter && chat_obj.months_subscribed > 0) return true;
      if(chat_actor_options?.cheer_chatter && chat_obj.cheer_amount > 0) return true;
    }

    function initChatObserver() {
      let chat_window_elm = cn(document, chat_window_class) && cn(document, chat_window_class)[0];
      let twitch_domObserver = new MutationObserver(() => {
        runChatFunctionsOnNewMessage();
      });
      if (chat_window_elm) {
        twitch_domObserver.observe(chat_window_elm, {
          childList: true,
          subtree: true
        });
      }
    }

    initChatObserver()

/*

    *********************************************************
                        TEXT PROCESSING 
    *********************************************************

*/
    const regXready = (str) => str && typeof str == 'string' ? str
    .replace(/\[/g, '\[')
    .replace(/\]/g, '\]')
    .replace(/\{/g, '\{')
    .replace(/\}/g, '\}')
    .replace(/\\/g, '\\')
    .replace(/\//g, '\/')
    .replace(/\?/g, '\?')
    .replace(/\+/g, '\+').replace(/\*/g, '.{0,4}').trim() : '';

    const fuzzify = (s) => '\\b' + regXready(s.split('').reduce((a, b) => a + ' ' + b)).replace(/\s+/g, '\\W*') + '(s|)\\b';

    function wordsNearEachother(str, joiner) {
        const arr = str.split(/~/);
        if (arr.length > 5) {
        return str.replace(/[~]+/, '.');
        } else {
        var cont = [];
        var containArr = [];
        function comboLoop(arr, cont) {
            if (arr.length == 0) {
            var row = cont.join(joiner);
            containArr.push(row)
            }
            for (var i = 0; i < arr.length; i++) {
            var x = arr.splice(i, 1);
            cont.push(x);
            comboLoop(arr, cont);
            cont.pop();
            arr.splice(i, 0, x);
            }
        }
        comboLoop(arr, cont);
        return containArr.reduce((a, b) => a + '|' + b);
        }
    }

    runChatFunctionsOnNewMessage()
}
test()
