var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var firstName = (s) => reg(/^\S+/.exec(s.replace(/\s*\(.+?\)\s*/g,'').trim()),0);
var lastName = (s) => reg(/\S+$/.exec(s.replace(/\s*\(.+?\)\s*/g,'').replace(/\W+$/,'').trim()),0);
var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var unqHsh = (a, o) => a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));

var svgs = {
    close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function dragElement() {
  if(this.id == 'resume_head_dragable'){
    var el = this.parentElement.parentElement;
  }else{
    var el = this.parentElement;
  }
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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

var cont_id = `audio_file_manager_view`;
function createUploadHTML(){
  if(gi(document,cont_id)) gi(document,cont_id).outerHTML = '';
  var rect = document.body.getBoundingClientRect();
  var cont = ele('div');
  a(cont,[['id',cont_id],['style', `padding: 0; position: fixed; top: ${rect.top+5}px; left: ${rect.left+5}px; z-index: ${new Date().getTime()}; width: ${rect.width*0.8}px; border: 1px solid #004471; border-radius: 0.4em; background: rgba(5, 37, 51, 0.6);`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: 1fr 29px; width: 100%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('div');
  a(txt, [['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; padding: 4px;`]]);
  head.appendChild(txt);
  txt.innerText = 'Upload Files';

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod,[['id','audio_file_manager_view_cbod'],['style',`display: grid; grid-template-rows: auto; grid-gap: 6px; padding: 2px; max-height: 440px; overflow-y: auto;`]]);
  cont.appendChild(cbod);

  var uploadElm = ele("input");
  a(uploadElm, [['id', 'customFileInput'],['type', 'file'],['name','file[]'],['multiple','true']])
  cbod.appendChild(uploadElm);
  uploadElm.addEventListener("change", handleFiles);

}

createUploadHTML();

var twitch_sound_files_storage = {};

async function handleFiles() {
  var files = this.files;
  var cont = [];
  for(var i=0; i<files.length; i++){
    var uri = await getAsMp3(files[i]);
    cont.push(uri);
  }
  var audio_map = cont;
  console.log(audio_map);
  
  audio_map.forEach(r=> {
    if(twitch_sound_files_storage[r.filename] != true){
      twitch_sound_files_storage[r.filename] = r;
    }
  })
  console.log(twitch_sound_files_storage);
  createTriggerAssignmentHTML(twitch_sound_files_storage);
}

function getAsMp3(f) {
  console.log(f.name);
  var reader = new FileReader();
  reader.readAsDataURL(f);
  return new Promise((resolve, reject) =>{
    reader.onload = (e) => {
      var ob = {
        uri: e.target.result, filename:'audio_'+f.name.replace(/\..+/, '').replace(/\W+/g, '_'), triggers:[]
      };
      resolve(ob)
    };
  })
}

async function createAudioPlayer(uri,ref){
  var audio = ele('audio');
  a(audio,[['controls',''],['src',uri],['style',`padding: 0; background: #052533;`]]);
  ref.appendChild(audio);
}

async function playAudioAndStop(uri){
  var audio = ele('audio');
  a(audio,[['controls',''],['src',uri],['style',`padding: 0; position: fixed; top: 10px; left: 10px; z-index: ${new Date().getTime()}; width: 300px; border: 1px solid #004471; border-radius: 0.4em; background: #052533;`]]);
  document.body.appendChild(audio);
  audio.play();
  await delay(4000);
  audio.outerHTML = '';
}

function createTriggerAssignmentHTML(audio_map){
  var cont = gi(document,cont_id);
  if(gi(document,cont_id+'_cbod')) gi(document,cont_id+'_cbod').innerHTML = '';
  var cbod = gi(document,'audio_file_manager_view_cbod');
console.log(cbod);
  createTriggerCards(audio_map,cbod);
}

function createTriggerCards(obj,ref){
  var rect = gi(document,cont_id).getBoundingClientRect();
  var keys = Object.keys(obj);
  for(var i=0; i<keys.length; i++){
      var cont = ele('div');
      a(cont,[['class','audio_trigger_card'],['style',`display: grid; grid-template-columns: ${rect.width*0.25}px ${rect.width*0.40}px ${rect.width*0.30}px; grid-gap: 2px; padding: 2px; background: #052533;`]]);
      ref.appendChild(cont);

      var pill_cont = ele('div');
      a(pill_cont,[['class','trigger_pill_cont'],['style',`display: grid; grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); grid-gap: 2px; padding: 2px;`]]);
      cont.appendChild(pill_cont);

      var inpcont = ele('div');
      a(inpcont, [['style','width: 100%; padding: 22px;']])
      cont.appendChild(inpcont);

      var inp = ele('input');
      a(inp,[['placeholder','what will trigger this file?'],['filename',keys[i]],['style',`width: 100%; border: 1px solid transparent; border-radius: 0.3em; height: 40px;`]]);
      inpcont.appendChild(inp);
      inp.onkeyup = createTriggerPill;

      var player = ele('div');
    //   a(filename,[['style',`border: 1px solid transparent; border-radius: 0.3em;`]]);
      cont.appendChild(player);
      player.innerHTML = `<div style="padding: 2px;">${keys[i]}</div>`;
      createAudioPlayer(twitch_sound_files_storage[keys[i]].uri,player);
  }
}

function createTriggerPill(e){
  if(e.key == "Enter"){
    var trigger = this.value.trim();
    var filename = this.getAttribute('filename');
    var ref = cn(this.parentElement.parentElement,'trigger_pill_cont')[0];
    var pill = ele('div');
    a(pill,[['filename',filename],['trigger',trigger],['style',`border: 1px solid transparent; border-radius: 0.4em; background: #5c16c5; padding: 2px;`]])
    ref.appendChild(pill);
    pill.innerText = trigger;
    twitch_sound_files_storage[filename].triggers.push(trigger);
    this.value = '';
    pill.onclick = removeTrigger;
  }
}

function removeTrigger(){
  var filename = this.getAttribute('filename');
  var trigger = this.getAttribute('trigger');
  console.log(twitch_sound_files_storage[filename].triggers);
  twitch_sound_files_storage[filename].triggers[twitch_sound_files_storage[filename].triggers.indexOf(trigger)] = 0;
  twitch_sound_files_storage[filename].triggers = twitch_sound_files_storage[filename].triggers.filter(r=> r);
  console.log(twitch_sound_files_storage[filename].triggers);
  this.outerHTML = '';
}
