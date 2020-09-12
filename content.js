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
  if (this.id == 'resume_head_dragable') {
    var el = this.parentElement.parentElement;
  } else {
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


function adjustElementSize() {
  var cont = this.parentElement.parentElement.parentElement;
  var main = this.parentElement.parentElement;
  var cbod = main.firstChild;
  var foot = this.parentElement;
  var head_height = cont.firstChild.getBoundingClientRect().height;
  var foot_height = foot.getBoundingClientRect().height;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var width = parseFloat(cont.style.width.replace(/px/, ''));
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
    main.style.width = width - (pos3 - e.clientX) + 'px';
    cbod.style.height = width - (pos3 - e.clientX) + 'px';
    cont.style.height = height - (pos4 - e.clientY) + 'px';
    main.style.height = height - (pos4 - e.clientY) + 'px';
    cbod.style.height = (height - (pos4 - e.clientY)) - (head_height + foot_height) + 'px';
    var rect = main.getBoundingClientRect();
    var edge = 15;
    cbod.style.height = `${(height - (pos4 - e.clientY))-(head_height+foot_height)}px`;
    cbod.style.width = `${(width - (pos3 - e.clientX))-(head_height+foot_height)}px;`;
    a(foot, [
      ['style', `display: grid; grid-template-columns: ${(rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]
    ]);
    cont.style.opacity = '0.95';
    cont.style.transition = 'opacity 200ms';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    cont.style.opacity = '1';
  }

}



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
}
const firstName = (s) => reg(/^\S+/.exec(s.replace(/\s*\(.+?\)\s*/g, '').trim()), 0);
const lastName = (s) => reg(/\S+$/.exec(s.replace(/\s*\(.+?\)\s*/g, '').replace(/\W+$/, '').trim()), 0);
const a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

const unqHsh = (a, o) => a?.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true));
const fixNameCase = (s) => s?.split(/(?=[^áàâäãåÁÀÂÄÃæéèêëÉÈÊËíìîïñÑóòôöõøœÓÒÔÖÕØŒßÚÙÛÜúùûüa-zA-Z])\b/).map(el => el.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('').replace(/(?<=\bMc)\w/ig, t => t.charAt(0).toUpperCase());


const regXready = (str) => str && typeof str == 'string' ? str
  .replace(/\[/g, '\[')
  .replace(/\]/g, '\]')
  .replace(/\{/g, '\{')
  .replace(/\}/g, '\}')
  .replace(/\\/g, '\\')
  .replace(/\//g, '\/')
  .replace(/\?/g, '\?')
  .replace(/\+/g, '\+').replace(/\*/g, '.{0,4}').trim() : '';

const fuzzify = (s) => '\\b' + regXready(s.split('').reduce((a, b) => a + ' ' + b)).replace(/\s+/g, '\\W*') + '(s|)\\b'; //new RegExp(, 'i');

function wordsNearEachother(str, joiner) {
  var arr = str.split(/~/);
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


const chat_window_class = 'chat-scrollable-area__message-container';
const chat_chat_msg_class = 'chat-line__message';
const chat_emote_class = 'chat-image chat-line__message--emote';
const chat_badge_class = 'chat-badge';
const chat_username_class = 'chat-author__display-name';
const chat_text_class = 'text-fragment';
const chat_mention_class = 'mention-fragment';
const chat_link_class = 'link-fragment';



function getLastChatObj(el) {
  const classArray = (o, k) => cn(o, k).length ? Array.from(cn(o, k)) : [];
  const chatObj = el ? {
    badges: classArray(el, chat_badge_class).map(el => el.getAttribute('alt')),
    timestamp: new Date().getTime(),
    username: cn(el, chat_username_class) && cn(el, chat_username_class).length ? cn(el, chat_username_class)[0].innerText.trim().toLowerCase() : null,
    chattext: cn(el, chat_text_class) && cn(el, chat_text_class).length ? Array.from(cn(el, chat_text_class)).map(r => r?.innerText).reduce((a, b) => a + b).trim() : null,
    emotes: classArray(el, chat_emote_class).map(r => r?.getAttribute('alt')),
    mentions: classArray(el, chat_mention_class).map(r => r?.innerText),
    links: classArray(el, chat_link_class).map(r => r?.innerText),
  } : null;
  return chatObj;
}

function runChatFunctionsOnNewMessage() {
  let chat_container_elm = cn(document, chat_window_class) && cn(document, chat_window_class)[(cn(document, chat_window_class).length - 1)]?.parentElement;
  let chat_chat_msg_elm = chat_container_elm && cn(chat_container_elm, chat_chat_msg_class) && cn(chat_container_elm, chat_chat_msg_class)[(cn(chat_container_elm, chat_chat_msg_class).length - 1)];
  if (chat_chat_msg_elm && chat_chat_msg_elm.getAttribute('msg_is_read') == null) {
    let last_chat_obj = getLastChatObj(chat_chat_msg_elm);
    console.log(last_chat_obj);
    let msg_rect = cn(chat_chat_msg_elm, chat_username_class)[0].getBoundingClientRect();
    chat_chat_msg_elm.setAttribute('msg_is_read', 'read');

    let first_span = tn(chat_chat_msg_elm, 'span')[0];
    let mic_elm = ele('span');
    a(mic_elm, [
      ['jdat', `${JSON.stringify(last_chat_obj)}`],
      ['style', `cursor: pointer;`]
    ]);
    mic_elm.innerHTML = svgs.micon.replace(/width="\d+px" height="\d+px"/, `width="${(msg_rect.height*0.6)}px" height="${(msg_rect.height*0.6)}px"`);
    first_span?.insertAdjacentElement('beforebegin', mic_elm);
    mic_elm.onclick = manualChatTTS;
    if (last_chat_obj?.chattext && /say.{0,18}:/i.test(last_chat_obj?.chattext)) {
      let tts_opt = parseTTSOptions(last_chat_obj);
      runTTSSyth(last_chat_obj.chattext, tts_opt);
    }
  }

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
      TEXT TO SPEECH FUNCTIONS
*/

const cleanTalk = (str) => str?.replace(/^.{0,24}say.{0,24}:/i, '').replace(/fu[ck]+\s+(u|y[ou]+|(go|get|)\s*fu[ck]+(ed|)\s*(your\s*self|ur\*self|))/g, '. I love you. ').replace(/\bpuss[iey]+\b|\bpoos[iey]+\b|\bcunt\b/g, 'beep').replace(/.*n[iea]+[g]+(a|er).*|n[iae]+[ck]+\s*er/g, '').replace(/MAGA|Make\s*\S*merica\s*\S*great\s*\S*again/gi, 'chuds chuds everywhere').replace(/\bretard\b|\blibtard\b|\btard\b/g, 'beep').replace(/\bcunt\b/g, 'beep').replace(/\bT\s*r\s*u\s*m\s*p\s*\d+/ig, 'Bernie Twenty Twenty').replace(/\bT\s*r\s*u\s*m\s*p\s*/ig, 'donny tiny hands').replace(/.*\bb\s*i\s*d\s*e\s*n\s*\d+.*/ig, 'Bernie Twenty Twenty').replace(/\bAmy\b|cloud\s*boot\s*jar|klobuchar/ig, 'boot off my cloud jar').replace(/\w+[_\W]*2[_\W]*0[_\W]*[2-3]][_\W]*(0|4|8|2)/g, 'Bernie Twenty Twenty').replace(/\w+\W*Twenty\W*Twenty|\w+\W*Tw[iae]n\W*t[ey]+\W*Tw[iae]+n\W*t[eay]+/gi, 'Bernie Twenty Twenty');

function validateDefinedWords(word) {
  var snp = ["Baby Box – A jam-packed box of baby essentials to help new parents at the start of a child’s life.", "Childcare – 600 hours of early learning and childcare, saving families up to £2,500 per child per year.", "Free Tuition – Students in England face tuition fees up to £27,750 – Scottish students receive university tuition free.", "Period Poverty – Scotland is the first in the world to make sanitary products available free to all pupils and students.", "Prescriptions – Prescription charges abolished in Scotland – now £9 per item south of the border.", "Cheaper Council Tax – Every Scottish household benefits from cheaper tax bills – on average £500 less than England.", "Care For All – Free personal and nursing care extended to everyone who needs it, regardless of age.", "Free Bus Travel – Over one million Scots now enjoy free travel, including over-60s and disabled people.", "Record health funding – spending will exceed £14 billion in 2019/20.", "13,200 more staff in Scotland’s NHS, that’s over 10 per cent more since 2007.", "Health spending in Scotland is £185 per person higher than in England.", "Patient satisfaction is at a five-year high in Scotland, with 86 per cent of patients rating their inpatient experience positively.", "Scotland’s A&E services are the best performing in the UK – for four years running.", "We are investing £110 million to support implementation of a new GP contract to support wider primary care reform.", "We are investing £200 million in a network of elective and diagnostic treatment centres across the country, as well as expanding the Golden Jubilee, to help meet the needs of an ageing population. ", "Over £5 billion has been invested in Scotland’s health infrastructure since 2007, including Scotland’s superhospital in Glasgow, Dumfries Infirmary, Orkney Hospital and Aberdeen’s Emergency Care Centre. ", "Most nurses in Scotland are better paid than anywhere else in the UK, and none are paid less than their counterparts in NHS England. ", "We’ve committed £40 million for 2,600 extra nursing and midwifery training places over this Parliament and are investing £3 million more to train 500 advanced nurse practitioners. ", "Scotland has the highest number of GPs per head of population in the UK.", "We’re training more paramedics, with a commitment to train 1,000 more by 2021.", "We’ve expanded IVF to more families – making access in Scotland the fairest and most generous in the UK.", "Scotland is leading the world on alcohol pricing, being the first country to implement minimum unit pricing.", "Our patient safety record is amongst the best in the world. Infection from C.Diff and MRSA has dramatically reduced in over 65s by 88 per cent and 94 per cent under our Government.", "We are implementing our new Cancer Strategy, investing £100 million to improve the prevention, early diagnosis and treatment of cancer.", "The risk from cervical cancer for the next generation of young women has been cut by providing the HPV vaccine for girls in second year of secondary school. ", "Parking charges at all NHS-run hospitals scrapped – saving patients and staff around £27 million. ", "Scotland led the UK by introducing a mental health waiting times target, and our spending on mental health services exceeded £1 billion in 2018. ", "94 per cent of the Scottish population are now registered with an NHS dentist – double what it was when we took office in 2007. ", "Free tuition and bursaries for student nurses have been scrapped in England. In Scotland, we’ve protected free tuition and the nursing and midwifery bursary rises to £8,100 for 2019 and £10,000 for 2020. ", "Irresponsible alcohol discounts in supermarkets and off-licences are now banned, and we’ve raised the legal age for buying tobacco to 18.", "We’ve made it illegal to smoke in a car with anyone under the age of 18.", "Everyone who uses social care services can now control their individual care budget through the Self-directed Support Act.", "We’ve provided extra funding for Scotland’s veteran charities, and ensured our ex-service men and women receive priority treatment in the NHS and other services.", "We are investing record amounts in schools to close the attainment gap – £120 million going direct to schools in 2019 alone. ", "All 135,000 pupils in primaries 1 to 3 now benefit from free school meals, saving families around £380 per child per year. ", "We’ve launched the Scottish Attainment Challenge, with investment of £750 million over the life of this Parliament. ", "We have provided extra resources to local councils, allowing spending on education to increase in real terms for the past three years – up by £189 million in 2018/19. ", "928 schools upgraded since 2007, providing well-designed, accessible and inclusive learning environments for pupils. ", "Record numbers of Scots are being accepted to study at university with record numbers from our most deprived communities too.", "We’ve launched the First Minister’s Reading Challenge to encourage all children to read for pleasure.", "We’ve introduced a national £100 school clothing grant to help relieve family pressure.", "Since 2012, we have invested over £1 billion per year in Scotland’s universities.", "We have protected the Disabled Students Allowance and bursaries for students, both abolished elsewhere in the UK.", "We’ve expanded the Education Maintenance Allowance in Scotland – now scrapped south of the border – to support even more school pupils and college students from low income families.", "We maintain the funding for at least 116,000 full-time college places.", "We’re providing our further education students with record levels of support. £111 million in 2018/19 – up 33 per cent under the SNP. ", "We are supporting the college sector to maintain colleges and to deliver new campuses, including investment of over £228 million in the new City of Glasgow College supercampus. ", "The number of higher education qualifiers from college is at an all-time high. ", "Graduates from Scottish universities are earning more than their counterparts in the rest of the UK. ", "Full-time college students in Scotland can now benefit from the highest bursary of anywhere in the UK. ", "Scotland provides the best package of support for university students in the UK – with free tuition; low interest rates for student loan repayments; and a minimum income guarantee of £7,625. ", "We’ve introduced a £20,000 bursary for career changers aiming to become teachers in priority science, technology, engineering or maths (STEM) subjects, with home-economics included for the first time this year.", "Scotland’s unemployment rate has fallen to its lowest rate on record, under the SNP.", "Scotland is the top destination in the UK, outside of London, for foreign direct investment.", "We have delivered a new progressive tax system, supporting additional investment in our public services while safeguarding those on lower incomes.", "Scotland has the most generous business rates relief package in the UK – worth more than £750 million.", "Scotland’s international exports are up 57.2 per cent under the SNP – valued at £32.4 billion in 2017. ", "We’re leading the way on fair pay. Over 1,500 organisations are now accredited Living Wage employers – over one quarter of the total across the UK. ", "We’ve met our target to reduce youth unemployment by 40 per cent – four years early. ", "Business research and development spend in Scotland increased by 13.9 per cent in 2017 to reach a record £1.25 billion, compared to a UK increase of just 2.9 per cent. ", "To help protect jobs and businesses through the recession, we’ve slashed or abolished business rates for over 100,000 premises – saving small businesses around £1.7 billion to date. ", "Scotland has the highest pay anywhere in the UK outside of London, the South East and East regions. City Region Deal, with £254 million more for infrastructure projects across the north east of Scotland. ", "Scotland’s productivity is outperforming the UK as a whole. Since 2007 productivity in Scotland has grown 10.3 per cent, compared to growth of 2.9 per cent in the UK.", "Over 230,000 young people have had the opportunity to undertake a Modern Apprenticeship since 2007. And by 2020, a further 30,000 opportunities will be available every year.", "We’ve made relentless efforts to protect manufacturing jobs, notably saving Scotland’s remaining steel works from closure.", "The number of private sector businesses in Scotland is at the highest level since records began.", "£500 million to stimulate and support economic growth in Glasgow and the Clyde Valley.", "£125 million to stimulate and support economic growth in the city as part of the Aberdeen", "£135 million in the Inverness and Highland City Region Deal – two and a half times the UK government investment. ", "£300 million to deliver inclusive economic growth in Edinburgh and the south east of Scotland. ", "£200 million for the Tay Cities Region Deal, focusing on inclusion, innovation, internationalisation, connectivity and empowerment. ", "£45 million for the Stirling and Clackmannanshire City Region Deal to unlock investment, deliver new jobs and economic growth, alongside an additional £5 million for infrastructure projects in the region. ", "£85 million for the Borderlands Growth Deal – £20 million more than the UK government.", "By the end of 2021 we will have committed £1 billion to tackling fuel poverty, and over one million energy efficiency measures have already been installed in almost one million households across Scotland.", "Our reforms to Land and Buildings Transaction Tax mean that more than 80 per cent of taxpayers either paid less tax compared to Stamp Duty Land Tax or no tax at all.", "We are establishing a Scottish National Investment Bank, with funds for pre-cursor activities of £130 million.", "Public sector procurement has been simplified, with more small and medium-sized enterprises now competing for and winning public sector contracts.", "Scotland’s tourism industry is going from strength to strength – spending by tourists in Scotland generates around £12 billion, and in 2015 the tourism industry accounted for around 8.5 per cent of employment in Scotland. ", "We have established Innovation and Investment Hubs in London, Brussels, Dublin, Berlin and Paris. ", "We have introduced a new £50 million fund for regenerating run down high streets. ", "We are providing support for our manufacturing sector – £48 million for the National Manufacturing Institute to deliver benefits for companies of all sizes in sectors across Scotland. ", "We are investing a further £60 million to deliver innovative low carbon energy solutions, such as electricity storage and sustainable heating systems – to improve energy efficiency as we look to a low carbon future. ", "We have begun delivering new and improved social security benefits through Social Security Scotland, the first new Scottish public service since devolution. Our mission is to bring a new culture of fairness, dignity, and respect to Scottish social security.", "£226 carers allowance paid twice yearly to over 77,000 carers.", "Best Start baby grant paid to over 7,000 families – £600 on the birth of a first child, and £300 on the birth of any siblings. From 2019, low income families will get a further £250 when their child starts nursery, and the same again when their child starts school.", "We have delivered more than 87,000 affordable homes since 2007, including nearly 60,000 for social rent.", "Scotland’s same-sex marriage legislation is widely considered to be one of the most progressive equal marriage laws in the world. ", "Scotland is best in Europe, second only to Malta, for LGBTI equality and human rights. ", "We introduced the first gender-balanced Cabinet in the UK, one of only a handful of gender parity cabinets around the world. ", "In 2011, we became the first government in the UK to pay the real Living Wage to our staff, including all NHS workers. We have now extended the real Living Wage to all adult social care workers. ", "We have mitigated the Bedroom Tax, protecting over 70,000 Scottish households from the charge. ", "We have introduced a Fair Work Action Plan to support employers to embed fairer working practices. ", "Over 316,000 low income households in crisis have been helped to buy essentials such as nappies, food and cookers through our Scottish Welfare Fund since it was established in 2013.", "We are investing £50 million to support the delivery of our Ending Homelessness Together action plan.", "We have passed a Child Poverty Act that set targets to end child poverty by 2030, and introduced a new £50 million fund to tackle poverty at a grassroots level.", "We’ve kept Scottish Water in public hands. Customers pay less for a better service in Scotland – saving £46 on average compared to the privatised services in England and Wales.", "We have introduced the Scottish Government’s first Gender Pay Gap Action Plan, with steps to tackle gender discrimination and inequalities in the workplace.", "We are investing an extra £5 million over the next three years to support around 2,000 women to return to work after career breaks. ", "Almost 600 companies have signed the Scottish Business Pledge – a voluntary code for companies to commit to policies that boost productivity, recognise fairness and increase diversity. ", "A £300,000 Sports Equality Fund has benefited 14 projects with the aim of increasing women’s engagement in sport. ", "Councils have been enabled to build new homes for the first time in years – with over 22,000 council homes delivered since 2007. ", "We have passed a new law requiring public bodies to work towards gender balance on their boards – the only part of the UK with such a statutory objective. ", "15,500 social houses for rent have been safeguarded by ending Right to Buy.", "Last year, almost half a million households were supported by Scotland’s Council Tax Reduction scheme.", "We have safeguarded the rights of 2,600 of the most severely disabled by establishing the Scottish Independent Living Fund.", "Since 2007, more than 28,000 households have been supported into affordable home ownership through our help to buy scheme.", "We are helping first-time buyers get on the property ladder by lending them a chunk of their deposit. The new £150 million scheme provides loans of up to £25,000 to those who have managed to save up 5 per cent of the value of their first home.", "Since taking office, recorded crime is down 42 per cent in Scotland – this is the lowest level ever estimated by the Scottish Crime and Justice Survey. ", "We are protecting the police revenue budget in real terms – delivering an additional £100 million of investment over the course of this parliament. ", "Police forces in England and Wales have lost more than 20,000 officers over the last decade. In Scotland, officer numbers have increased significantly since the SNP came into power. ", "We have invested more than £17 million in violence prevention since 2007. ", "Violent crime is down by 46 per cent, and property crime by 41 per cent since we took office. ", "The Scottish Crime Campus provides a focal point for excellence in intelligence-sharing, evidence gathering and forensic science to tackle serious organised crime.", "Automatic early release has been ended, meaning that long-term prisoners who pose an unacceptable risk to public safety will serve their sentence in full.", "The reconviction rate has been reduced to its lowest level in 19 years, thanks to tough community sentences.", "Since 2008, £92 million has been seized from criminals and has been reinvested in community projects for young people across Scotland.", "We’ve introduced the world leading Domestic Abuse Act that makes psychological domestic abuse and controlling behaviour a crime.", "HMP Low Moss opened in March 2012 and HMP Grampian opened in March 2014, two major parts of our prison building programme.", "Since 2012, we have invested record funding of £13.5 million to support anti-sectarian education in schools, prisons, workplaces and communities. ", "The new Scottish Fire and Rescue Service has been created. ", "We have made the sharing of so-called ‘revenge porn’ a specific criminal offence, carrying a maximum penalty of five years imprisonment. ", "Scotland has the UK’s first national action plan on human rights, showing our ambition to be an example of how to realise human rights and tackle injustice at home and abroad. ", "We have introduced a Bill to the Scottish Parliament to raise the minimum age a child can be held criminally responsible from eight to 12, keeping children out of the court system and reinforcing Scotland’s commitment to international human rights standards. ", "We have doubled the walking and cycling budget to £80 million per year.", "We delivered the £1.35 billion marvel on the Forth – the Queensferry Crossing.", "We’ve connected Glasgow to Edinburgh with continuous motorway for the first time.", "We scrapped bridge tolls on the Forth and Tay crossings – saving individual commuters around £2,280 to date.", "£8 billion has been invested in our rail infrastructure since 2007.", "We delivered the Borders Railway, the longest new domestic railway to be built in Britain in over 100 years. 4 million passengers have used the service to date.", "Our £5 billion investment programme in Scotland’s railways will deliver longer, greener trains, new stations, new track upgrades, more seats, and more services. ", "The first section – between Kincraig and Dalraddy – of our £3 billion project to dual the A9 from Perth to Inverness has been completed. ", "The £745 million Aberdeen Bypass opened in February 2019, cutting the 36-mile journey time by half. ", "In the South of Scotland we’re taking forward the construction of the Maybole bypass on the A77, making further improvements to the A75 and exploring how to better connect Dumfries and the M74. ", "Scotland has now achieved 95 per cent fibre broadband coverage – and we’ll reach 100 per cent superfast coverage by 2021. ", "We have demonstrated global leadership on climate change, and were the first part of the UK to declare a ‘climate emergency’.", "Scotland has a target of net zero greenhouse gas emissions by 2045, one of the toughest statutory targets in the world.", "Scotland outperforms the UK as a whole in cutting greenhouse gas emissions. Only Sweden has achieved greater reductions in western Europe.", "Renewable energy generation in Scotland reached record levels in 2018, providing the equivalent of 75 per cent of gross electricity consumption.", "In 2016, our low carbon and renewable energy sector supported 49,000 jobs and generated £11 billion in turnover.", "No fracking and other unconventional oil and gas activity can take place in Scotland. ", "We are on track to achieve our target of recycling 70 per cent of all waste by 2025. ", "Scotland was one of the first countries to commit to the United Nations Sustainable Development Goals. ", "Carrier bag use was reduced by 80 per cent – the equivalent of 650 million bags – in the first year of the carrier bag charge. ", "We have passed a law to ban the use of wild animals in travelling circuses in Scotland. ", "We’ve helped make our communities safer from flooding with investment in flood defences and new measures in the Flooding Act. Since 2008, we have made £42 million available each year to help local authorities invest in flood protection measures. ", "By 2021, £21 million will have been distributed through the world-leading Climate Justice Fund, which is now supporting projects in Malawi, Zambia and Rwanda.", "We are ensuring the clean, green status of our valuable food and drink sector is protected by opting out of the cultivation of genetically modified crops.", "We passed a law to fully devolve forestry to Scotland, helping us make more effective use of Scotland’s land.", "We are introducing Low Emissions Zones in our four largest cities by 2020 to improve urban air quality.", "We invest £20 million per year in support of animal health and welfare.", "In 2017/18, Scotland created 78 per cent of all new woodland in the UK, and we are on track to meet our target of creating 15,000 hectares per year from 2024/25. ", "Scotland’s Natural Capital Accounts estimate that Scotland’s natural capital is valued at over £273 billion – 34 per cent of the UK figure. ", "Scotland’s independence referendum was the biggest democratic exercise in Scotland’s history – with a turnout of 85 per cent of all electors.", "16 and 17 year olds now have the right to vote in Scottish Parliament and local government elections.", "We launched a £200,000 Access to Politics Fund to help disabled people stand for the 2017 local government elections – continuing the fund for the Scottish Parliament elections in 2021.", "Local communities have been given a voice in the planning and delivery of local services – backed up by an annual £20 million of funding – through the Community Empowerment Act.", "The Scottish Land Fund has already helped over 100 communities across the country to purchase land. ", "The radical and ambitious Land Reform Act has been passed to transform rules around the ownership, accessibility and benefits of land in Scotland.", "A record £1 billion has been invested in vessels, ports and ferry services since 2007 as part of our commitment to our islands and remote communities.", "We introduced and are implementing Scotland’s first ever Islands Act to help our island communities thrive.", "Road Equivalent Tariff has been rolled out to all ferry routes in the Clyde and Hebrides network, delivering significantly reduced ferry fares and the highest passenger numbers since 1997.", "Residents of Caithness and north-west Sutherland, Colonsay, Islay, Jura, Orkney, Shetland and the Western Isles are eligible for a 50 per cent discount on air fares.", "With produce output worth around £2.3 billion a year and around 65,000 people directly employed, we work tirelessly to get the best deal for Scotland’s farmers, crofters and growers. ", "We are legislating to create a new South of Scotland Enterprise Agency to support businesses, jobs, economic growth and skills in the region. ", "With food and drink worth almost £6 billion in 2017 and 14,000 new jobs estimated to be created in the sector by 2020, we strive to promote Scotland’s top quality produce. ", "Through funding from the EU and the Scottish Government, we are investing over £92 million in our fisheries fleet, in harbours, equipment and facilities. ", "The clean, green status of our valuable food and drink sector has been protected by opting out of the cultivation of genetically modified crops in Scotland. ", "Scotland’s first National Marine Plan aims to achieve the sustainable development of our seas.", "We are investing £6 million in a Rural Tourism Infrastructure Fund to help ensure the services and facilities tourists and communities need are provided.", "To support the building of new affordable housing in island communities, we are investing £5 million in an Islands Housing Fund.", "We have published a new National Forestry Strategy and invested over £20 million to plant trees on Scotland’s national forests.", "In 2018/19, we invested nearly £118 million to help grow Scotland’s food and drink sector – supporting production, marketing, promotion, collaboration, research and innovation.", "We are investing almost £270 million in Scotland’s culture and heritage. ", "Free access has been maintained to our national museums and galleries, which now welcome over five million visitors every year. ", "We have provided £21 million investment in Edinburgh’s major festivals since 2008, and have now opened up funding to Glasgow’s Celtic Connections. ", "Following the success of the Commonwealth Games and Ryder Cup in 2014, we are ensuring Scotland is on the centre stage for major events, providing funding for the European Championships in 2018, the Solheim Cup 2019 and the UEFA Euro 2020. ", "We invested £38 million in the construction of the world-class V&A Museum of Design in Dundee which opened in 2018. We are investing an additional £1 million a year for the next 10 years to ensure it reaches its full potential.", "Glasgow will host the inaugural UCI Cycling World Championships in 2023 – reaffirming Scotland’s place as a world leader for major events.", "Over 900 schools and nurseries take part in the ‘Daily Mile’ challenge. We want Scotland to become the first ‘Daily Mile Nation’, with all nurseries and schools plus colleges, universities and workplaces involved across the country.", "99 per cent of primary and secondary schools across Scotland are now providing two hours of physical education a week – up from just 10 per cent in 2005.", "Since 2007 our screen sector has gone from strength to strength and production spend in Scotland has increased by 200 per cent. ", "We have invested £20 million to support the establishment of Screen Scotland – a dedicated unit for film and television – and funded the establishment of a National Film & Television School for Scotland in Glasgow. ", "We have improved the supporting infrastructure for sport in Scotland, including investing £24 million in the National Sports Performance Centre, Oriam. ", "We are committed to supporting MG Alba, which operates BBC Alba and receives £12.8 million a year from the Scottish Government."];

  var rando = (n) => Math.round(Math.random() * n);
  var snp_i = rando(snp.length);
  var ancap = ['ancaps are a lot of things. none of which are coherent', 'Where the justification for hierarchies is who has the best guns.'];
  var definition = /phronesis/i.test(word) ? 'an ancient Greek word for a type of wisdom or intelligence. It is more specifically a type of wisdom relevant to practical action, implying both good judgement and excellence of character and habits, sometimes referred to as -- practical virtue.' :
    /Trumple|Trumpel|Trumpal/i.test(word) ? 'A slur which typically refers to a low intellect individual. Typically with an overly inflated ego, or an unfounded fear of people who are different.' :
    /libertarian\b/i.test(word) ? 'Noun: Someone who believes in magical market fairies.' :
    /libertarianism/i.test(word) ? `A collection of political philosophies that uphold liberty as the highest value. See Schrodinger's liberty` :
    /florida/i.test(word) ? 'a state in southeastern United States between the Atlantic and the Gulf of Mexico. Also used as an adjective referring to men who make bad decisions.' :
    /\bchud\b/.test(word) ? `a person who is angry at everyone else for their own gullibility.` :
    /\bbrexit\b/.test(word) ? `The process the united kingdom is undergoing to separate from the european union.` :
    /\bsnp\b/i.test(word) ? `random S N P accomplishment ${(snp_i+1)} of ${snp.length}: ${snp[snp_i]}`.trim() :
    /\bancap[s]*\b/.test(word) ? ancap[rando(ancap.length)] :
    /billionaire/i.test(word) ? 'noun: A sign of a failing society' :
    /commie|communis/i.test(word) ? 'someone who likes government action or anyone I do not like.' :
    /\broads\b/i.test(word) ? `Libertarian kryptonite` :
    /capitalist/i.test(word) ? `Lazy mother fuckers with pockets` :
    /\bBernie\b/i.test(word) ? `your dad` :
    /progress/i.test(word) ? `Bernie Sanders` :
    /yang\s*gang/i.test(word) ? `someone who likes the concept of math, but struggles with the practical application of it.` :
    /\ba[l]+e[p]+o\b/i.test(word) ? `sorry. I am not sure what you are talking about. Is that some kind of large cat?` :
    /freewill/i.test(word) ? `an illusion that makes people feel better about their lives` :
    /choice/i.test(word) ? `an illusion that makes people feel better about their lives` :
    /socdem/.test(word) ? 'a possible entry point into further left ideas.' :
    /walterblock/i.test(word) ? `when you speak for 30 min and dont say anything` :
    /adhom/i.test(word) ? `I don't need to say what ad hominem means because you're ugly` :
    /kleptocra/i.test(word) ? 'Kleptocracy is a government with corrupt leaders that use their power to exploit the people and natural resources of their own territory in order to extend their personal wealth and political power' :
    /gravity/i.test(word) ? 'the basis for property rights' :
    /socialis/i.test(word) ? 'see communism' : null;
  return definition;
}

function parseTTSOptions(obj) {
  let {
    chattext
  } = obj;
  const langOptionMatch = (s, o) => new RegExp(wordsNearEachother(`${s}~say`, '.{0,9}') + '|' + wordsNearEachother(`${s}~define`, '.{0,9}') + '.{0,9}:', 'i').test(o);
  let langs = [
    ['net', 'nl-NL'],
    ['dut', 'de-DE'],
    ['brit', 'en-GB'],
    ['fren', 'fr-FR'],
    ['ital', 'it-IT'],
    ['span', 'es-ES'],
    ['russ', 'ru-RU']
  ]; //,
  let lang_index = langs.findIndex(r => langOptionMatch(r[0], chattext));
  return {
    lang: lang_index > -1 ? langs[lang_index[1]] : 'en-US',
    pitch: /slow.*?:/i.test(chattext) ? 0.3 : /fast.*?:/i.test(chattext) ? 1.9 : 1,
  }
}

function manualChatTTS() {
  let jdat = JSON.parse(this.getAttribute('jdat'));
  let tts_opt = parseTTSOptions(jdat);
  console.log(jdat.chattext);
  runTTSSyth(jdat.chattext, tts_opt);
}

async function runTTSSyth(text, opt) {
  if (text) {
    cancelTTSsynth();
    await delay(111);
    let synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance(cleanTalk(text));
    utterThis.lang = opt?.lang || 'us-EN';
    utterThis.pitch = opt?.pitch || 1;
    utterThis.rate = 1;
    utterThis.onend = (e) => {
      synth.cancel();
    };
    synth.speak(utterThis);
  }
}

function cancelTTSsynth() {
  let synth = window.speechSynthesis
  synth.cancel();
}




/*

AUDIO FILE MANAGEMENT

*/
var twitch_sound_files_storage = {};

async function setMp3Files(obj) {
  var target_key = 'twitch_sound_files_storage';
  var jsonfile = {};
  jsonfile[target_key] = JSON.stringify(obj);
  chrome.storage.local.set(jsonfile);
  return true;
}

async function addTwitchClipToStorageAndInitTriggerView(msg) {
  var sound_storage = await getMp3FilesFromStorage();
  twitch_sound_files_storage = sound_storage;
  twitch_sound_files_storage[`audio_${msg.filename}`] = {
    filename: `audio_${msg.filename}`,
    triggers: [],
    uri: `data:audio/mpeg;base64,${msg.twitch_clip_base64}`
  };
  // sound object keys are the filename (filename is snake_cased at time of upload)
  //   await setMp3Files(twitch_sound_files_storage);
  //   createTriggerAssignmentHTML(twitch_sound_files_storage);
}

async function getMp3FilesFromStorage() {
  var twitch_sound_files_storage = await getStorageData('twitch_sound_files_storage');
  if (twitch_sound_files_storage == undefined || Object.getOwnPropertyNames(twitch_sound_files_storage).length === 0) {
    setMp3Files({});
    return {};
  } else {
    var output = JSON.parse(twitch_sound_files_storage.twitch_sound_files_storage);
    return output;
  }
}









/*
      USER INTERFACE
*/




function searchAllowedList(e) { //allowed_list
  let allowed_list = [{
    username: 'sourcingsupport',
    can_speak: true
  }, {
    username: '27dollars',
    can_speak: true,
  }];
  if (e.key == 'ArrowUp' || e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'Enter') {
    autoKeySelector(this, 'form_data_auto_search_res_pill', e.key);
  } else {
    if (this.value.trim().length > 2) {
      var matches = allowed_list.filter(r => new RegExp(regXready(this.value.trim()), 'i').test(r.username));
      console.log(matches);
      if (matches.length) createAutoDopDown(matches, 'username', this);
    }
  }
}



function createAutoDopDown(items, text_key, ref) {
  let hover_obj = {
    background: '#dbd5f5',
    color: '#05001c',
    border: '4px solid #dbd5f5',
    background_in: '#05001c',
    color_in: '#dbd5f5',
    border_in: '4px solid #dbd5f5'
  }
  let rect = ref.getBoundingClientRect();
  let itm_height = 21;
  let bod = ele('div');
  a(bod, [
    ['id', 'custom_dropdown_'],
    ['style', `position: fixed; width: ${rect.width}px; top: ${rect.bottom}px; left: ${rect.left}px; display: grid; grid-template-rows: auto; grid-gap: 4px; border: ${hover_obj.border}; border-radius: 0.2em; background: ${hover_obj.background}; color: ${hover_obj.color}; z-index: ${new Date().getTime()}; transition: all 63ms;`]
  ]);
  document.body.appendChild(bod);
  bod.onmouseleave = killOptions;

  for (var i = 0; i < items.length; i++) {
    console.log(items)
    let itm = ele('div');
    a(itm, [
      ['ref_id', ref.getAttribute('id')],
      ['class', 'form_data_auto_search_res_pill'],
      ['hover_obj', `${JSON.stringify(hover_obj)}`],
      ['jdat', `${JSON.stringify(items[i])}`],
      ['text_key', text_key],
      ['style', `height: ${itm_height}px; background: ${hover_obj.background}; color: ${hover_obj.color} text-align: center; padding 0px; cursor: pointer; font-family: "Lucida Console", Monaco, monospace; transition: all 63ms;`]
    ]);
    itm.innerText = items[i][text_key];
    bod.appendChild(itm);
    itm.onmouseenter = hoverIn;
    itm.onmouseleave = hoverOut;
    itm.onclick = markSelection;
  }
}

function killOptions() {
  if (gi(document, 'custom_dropdown_')) gi(document, 'custom_dropdown_').outerHTML = '';
}

function hoverOut() {
  let style_obj = JSON.parse(this.getAttribute('hover_obj'));
  this.style.background = style_obj.background;
}

function hoverIn() {
  let style_obj = JSON.parse(this.getAttribute('hover_obj'));
  this.style.background = style_obj.background_in;
  this.style.color = style_obj.color_in;
}

function markSelection() {
  let jdat = JSON.parse(this.getAttribute('jdat'));
  let text_key = this.getAttribute('text_key');
  console.log([text_key, jdat]);
  console.log(gi(document, this.getAttribute('ref_id')));
  gi(document, this.getAttribute('ref_id')).value = jdat[text_key];
  this.parentElement.style.height = (this.parentElement.getBoundingClientRect().height * 0.5) + 'px';
  this.parentElement.style.bottom = (this.parentElement.getBoundingClientRect().bottom) + 'px';
  this.parentElement.ontransitionend = killOptions;
}

async function autoKeySelector(ref, classname, keyinput) {
  let elms = cn(document, classname);
  if (elms && elms.length) {
    let arr = Array.from(elms);
    let selectors = arr.map(el => el.getAttribute('isSelected'));
    let i = selectors.indexOf('yes');
    let forward_i = i < 0 || i == (selectors.length - 1) ? 0 : i + 1;
    let reverse_i = i < 1 ? (selectors.length - 1) : i - 1;
    if (keyinput == 'ArrowDown' || keyinput == 'ArrowRight') {
      await arr.forEach(el => {
        attr(el, 'isSelected', 'no');
        el.style.border = '1px solid #fff';
      });
      arr[forward_i].setAttribute('isSelected', 'yes');
      arr[forward_i].style.border = '1px solid #004471';
    }
    if (keyinput == 'ArrowUp' || keyinput == 'ArrowLeft') {
      await arr.forEach(el => {
        attr(el, 'isSelected', 'no');
        el.style.border = '1px solid #fff';
      });
      arr[reverse_i].setAttribute('isSelected', 'yes');
      arr[reverse_i].style.border = '1px solid #004471';
    }
    if (keyinput == 'Enter') {
      let index = arr.map(el => el.getAttribute('isSelected')).indexOf('yes');
      let seti = index > -1 ? index : 0;
      ref.value = arr[seti].innerText.trim();
      arr[0].parentElement.outerHTML = '';
    }
  }
}

const svgs = {
  micon: `<svg transform="translate(-2, 5)" width="18px" height="18px" x="0px" y="0px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path fill="#007862" d="M37.341,37.567c0.264,0,0.526-0.104,0.724-0.31c2.852-2.987,4.487-7.332,4.487-11.922c0-4.589-1.636-8.934-4.486-11.921  c-0.381-0.399-1.016-0.414-1.414-0.033c-0.399,0.382-0.414,1.015-0.033,1.414c2.5,2.619,3.934,6.461,3.934,10.54  c0,4.08-1.434,7.922-3.935,10.541c-0.381,0.399-0.366,1.032,0.033,1.414C36.844,37.476,37.093,37.567,37.341,37.567z"/><path fill="#007862" d="M34.016,34.482c0.252,0,0.504-0.095,0.698-0.284c2.225-2.172,3.501-5.401,3.501-8.861c0-3.461-1.276-6.69-3.501-8.862  c-0.395-0.385-1.027-0.378-1.414,0.018c-0.386,0.396-0.378,1.028,0.018,1.414c1.841,1.797,2.897,4.506,2.897,7.431  s-1.057,5.633-2.897,7.43c-0.396,0.386-0.403,1.019-0.018,1.414C33.496,34.382,33.756,34.482,34.016,34.482z"/><path fill="#007862" d="M30.084,29.571c-0.424,0.354-0.479,0.985-0.126,1.409c0.198,0.236,0.482,0.358,0.769,0.358c0.226,0,0.453-0.076,0.641-0.232  c1.572-1.314,2.511-3.472,2.511-5.77c0-2.333-0.961-4.508-2.57-5.82c-0.428-0.35-1.058-0.282-1.407,0.144  c-0.349,0.428-0.284,1.058,0.144,1.407c1.148,0.936,1.834,2.532,1.834,4.27C31.878,27.05,31.207,28.633,30.084,29.571z"/><path fill="#007862" d="M24.03,12.536l-8.203,6.134h-4.275c-0.553,0-1,0.447-1,1v11.334c0,0.553,0.447,1,1,1h4.275l8.203,6.134  c0.176,0.132,0.387,0.199,0.599,0.199c0.152,0,0.307-0.035,0.448-0.105c0.338-0.17,0.552-0.516,0.552-0.895v-24  c0-0.379-0.214-0.725-0.552-0.895C24.739,12.275,24.332,12.31,24.03,12.536z M23.629,35.341l-6.87-5.138  c-0.173-0.129-0.383-0.199-0.599-0.199h-3.608V20.67h3.608c0.216,0,0.426-0.07,0.599-0.199l6.87-5.138V35.341z"/></svg>`,
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(1, 1)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
  resize: `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1000.000000 1000.000000" version="1.0">
<g stroke="none" fill="#43de6d" transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)">
<path d="M9235 9969 c-31 -17 -9164 -9151 -9181 -9181 -8 -15 -14 -49 -14 -76 0 -38 6 -57 29 -88 34 -46 535 -544 571 -568 28 -18 110 -22 143 -5 31 16 9165 9148 9183 9181 8 15 14 49 14 76 0 38 -6 57 -29 88 -34 46 -535 544 -571 568 -28 18 -114 21 -145 5z"/>
<path d="M5923 4093 c-1911 -1908 -3479 -3476 -3484 -3485 -5 -9 -9 -38 -9 -64 l0 -48 228 -228 228 -228 53 0 53 0 3478 3472 c1914 1909 3482 3478 3485 3485 3 8 5 35 5 61 l0 46 -228 228 -228 228 -53 0 -53 0 -3475 -3467z"/>
<path d="M7042 2957 l-2442 -2442 0 -45 0 -45 213 -213 212 -212 45 0 45 0 2443 2443 2442 2442 0 45 0 45 -213 213 -212 212 -45 0 -45 0 -2443 -2443z"/>
<path d="M8088 1922 l-1478 -1477 0 -45 c0 -44 1 -45 178 -222 177 -178 178 -178 222 -178 l45 0 1472 1473 1473 1472 0 55 0 56 -173 172 c-172 171 -174 172 -218 172 l-44 0 -1477 -1478z"/>
</g>
</svg>`,
  resize_hover: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 1000.000000 1000.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)" fill="#43de6d" stroke="none">
<path d="M5318 4622 l-3798 -3797 0 -59 0 -60 312 -314 c172 -172 325 -320 340 -328 15 -8 49 -14 75 -14 l48 0 3797 3798 3798 3797 0 59 0 60 -312 314 c-172 172 -325 320 -340 328 -15 8 -49 14 -75 14 l-48 0 -3797 -3798z"/>
<path d="M6763 3147 l-2483 -2482 0 -50 0 -49 268 -268 268 -268 49 0 50 0 2482 2483 2483 2482 0 50 0 49 -268 268 -268 268 -49 0 -50 0 -2482 -2483z"/>
<path d="M8058 1902 l-1268 -1267 0 -50 0 -50 248 -247 247 -248 50 0 50 0 1267 1268 1268 1267 0 50 0 50 -248 247 -247 248 -50 0 -50 0 -1267 -1268z"/>
</g>
</svg>`,
  check: `<svg width="14px" height="14px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 80.588 61.158" style="enable-background:new 0 0 80.588 61.158;" xml:space="preserve"><path style="fill:#43de6d;" d="M29.658,61.157c-1.238,0-2.427-0.491-3.305-1.369L1.37,34.808c-1.826-1.825-1.826-4.785,0-6.611  c1.825-1.826,4.786-1.827,6.611,0l21.485,21.481L72.426,1.561c1.719-1.924,4.674-2.094,6.601-0.374  c1.926,1.72,2.094,4.675,0.374,6.601L33.145,59.595c-0.856,0.959-2.07,1.523-3.355,1.56C29.746,61.156,29.702,61.157,29.658,61.157z  "/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 12" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Rounded" transform="translate(-885.000000, -3438.000000)"><g transform="translate(100.000000, 3378.000000)"><g transform="translate(782.000000, 54.000000)"><g transform="translate(0.000000, 0.000000)"><polygon points="0 0 24 0 24 24 0 24"/><path d="M4,18 L20,18 C20.55,18 21,17.55 21,17 C21,16.45 20.55,16 20,16 L4,16 C3.45,16 3,16.45 3,17 C3,17.55 3.45,18 4,18 Z M4,13 L20,13 C20.55,13 21,12.55 21,12 C21,11.45 20.55,11 20,11 L4,11 C3.45,11 3,11.45 3,12 C3,12.55 3.45,13 4,13 Z M3,7 C3,7.55 3.45,8 4,8 L20,8 C20.55,8 21,7.55 21,7 C21,6.45 20.55,6 20,6 L4,6 C3.45,6 3,6.45 3,7 Z" fill="#1D1D1D"/></g></g></g></g></g></svg>`,
  edit: `<svg viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"></path></svg>`,
  add: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 14" version="1.1">    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <g transform="translate(-411.000000, -1487.000000)">            <g transform="translate(100.000000, 1428.000000)">                <g transform="translate(306.000000, 54.000000)">                    <g transform="translate(0.000000, 0.000000)">                        <polygon points="0 0 24 0 24 24 0 24"/>                        <path d="M18,13 L13,13 L13,18 C13,18.55 12.55,19 12,19 C11.45,19 11,18.55 11,18 L11,13 L6,13 C5.45,13 5,12.55 5,12 C5,11.45 5.45,11 6,11 L11,11 L11,6 C11,5.45 11.45,5 12,5 C12.55,5 13,5.45 13,6 L13,11 L18,11 C18.55,11 19,11.45 19,12 C19,12.55 18.55,13 18,13 Z" fill="#1D1D1D"/>                    </g>                </g>            </g>        </g>    </g></svg>`,
  del: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e21212" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" ><line x1="0" y1="18" x2="22" y2="18"/></svg>`,
};

function createDraggableResizableContainer(edit) {
  let {
    main_cont_id,
    cbod_bg_color,
    head_text
  } = edit;
  if (gi(document, main_cont_id)) gi(document, main_cont_id).outerHTML = '';

  let cont = ele('div');
  a(cont, [
    ['dragme', 'true'],
    ['id', main_cont_id],
    ['style', `position: fixed; top: 80px; left: 40px; z-index: ${new Date().getTime()}; max-height: ${(window.innerHeight * 0.9)}px; width: ${(window.innerWidth > 799 ? 500: window.innerWidth * 0.6 )}px; border: 1px solid #0a1114; border-radius: 0.45em; background: #0a1114; font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;`]
  ]); //"Lucida Console", Monaco, monospace
  document.body.appendChild(cont);

  let head = ele('div');
  a(head, [
    ['style', `display: grid; grid-template-columns: 1fr 29px; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move;`]
  ]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  let txt = ele('div');
  a(txt, [
    ['style', `color: #fff; font-size: 1.3em; border-radius: 0.5em; color: #fff; text-align: center;`]
  ]);
  head.appendChild(txt);
  txt.innerText = head_text;

  let cls = ele('div');
  a(cls, [
    ['style', `cursor: pointer;`]
  ]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onclick = () => cont.outerHTML = '';
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;

  let cont_rect = cont.getBoundingClientRect();
  let edge = 15;

  let mainbod = ele('div');
  cont.appendChild(mainbod);

  let cbod = ele('div');
  a(cbod, [
    ['style', `background: ${cbod_bg_color}; padding: 8px; overflow-y: auto;`]
  ]);
  mainbod.appendChild(cbod);

  let footer = ele('div');
  a(footer, [
    ['dragme', 'true'],
    ['style', `display: grid; grid-template-columns: ${(cont_rect.width - (edge+4))}px ${edge}px; background: #0a1114; border: 1.6px solid #0a1114; border-bottom-left-radius: 0.4em; border-bottom-right-radius: 0.4em; height: ${edge+4}px;`]
  ]);
  mainbod.appendChild(footer);

  let footertext = ele('div');
  footer.appendChild(footertext);

  let resizer = ele('div');
  a(resizer, [
    ['style', `background: transparent; cursor: nw-resize; text-align: left; border-radius: 0.4em;`]
  ]);
  footer.appendChild(resizer);
  resizer.innerHTML = svgs.resize_hover;
  resizer.onmouseover = adjustElementSize;
  return cbod;
}

function initUserInterface() {
  let main_cont_obj = {
    main_cont_id: 'twitch_chat_memer_container',
    cbod_bg_color: '#f5f5f2',
    head_text: 'Twitch Chat Memer Machiner'
  }
  let ref = createDraggableResizableContainer(main_cont_obj);
  let toggle_ids = ['allowed_user_list_', 'upload_audio_backup_file_'];
  createToggleOptionsHTML(ref, toggle_ids);
  gi(document, 'allowed_user_list_').onclick = createUserAllowedListHTML;
}

function createToggleOptionsHTML(ref, toggle_ids) {
  let main = ele('div');
  a(ref, [
    ['id', 'toggle_options_cont'],
    ['style', ` display: grid; grid-template-rows: auto; grid-gap: 8px;`]
  ]);
  ref.appendChild(main);
  for (let i = 0; i < toggle_ids.length; i++) {
    let cont = ele('div');
    a(cont, [
      ['style', `display: grid; grid-template-columns: 1fr; grid-gap: 8px;`]
    ]);
    main.appendChild(cont);

    let btn = ele('div');
    a(btn, [
      ['id', toggle_ids[i]],
      ['style', `font-size: 1.2em; border-radius: 0.2em; background: #001d7d; color: #fffff; cursor: pointer; text-align: center; padding: 8px;`]
    ]);
    btn.innerText = fixNameCase(toggle_ids[i].replace(/_/g, ' '));
    cont.appendChild(btn);
  }
}

var allowed_to_speak_list = [{
    username: 'sourcingsupport',
    can_speak: true
  },
  {
    username: '27dollars',
    can_speak: true
  },
];

async function createUserAllowedListHTML() {
  let main_cont_obj = {
    main_cont_id: 'twitch_chat_allowed_list_cont',
    cbod_bg_color: '#f5f5f2',
    head_text: 'Free Speech List'
  }
  let ref = createDraggableResizableContainer(main_cont_obj);
  console.log(allowed_to_speak_list)
  let cont = ele('div');
  a(cont, [
    ['style', `display: grid; grid-template-columns: 1fr 1fr; grid-gap: 8px; max-height: 300px; overflow-y: auto;`]
  ])
  ref.appendChild(cont);

  let right = ele('div');
  a(right, [
    ['id', 'not_allowed_list_'],
    ['style', `display: grid; grid-template-rows: auto; grid-gap: 8px;`]
  ]);
  cont.appendChild(right);

  let left = ele('div');
  a(left, [
    ['id', 'is_allowed_list_'],
    ['style', `display: grid; grid-template-rows: auto; grid-gap: 8px;`]
  ]);
  cont.appendChild(left);

  let is_allowed_auto_cont = ele('div');
  a(is_allowed_auto_cont, [
    ['style', `display: grid; grid-template-columns: 1fr 22px; grid-gap: 8px;`]
  ]);
  left.appendChild(is_allowed_auto_cont);

  let not_allowed_auto_cont = ele('div');
  a(not_allowed_auto_cont, [
    ['style', `display: grid; grid-template-columns: 1fr 22px; grid-gap: 8px;`]
  ]);
  right.appendChild(not_allowed_auto_cont);


  let is_allowed_input = ele('input');
  a(is_allowed_input, [
    ['id', 'is_allowed_input'],
    ['style', `height: 30px; border-radius: 0.2em; padding: 4px;`]
  ]);
  is_allowed_auto_cont.appendChild(is_allowed_input);
  is_allowed_input.onkeyup = searchAllowedList;

  let not_allowed_input = ele('input');
  a(not_allowed_input, [
    ['id', 'not_allowed_input'],
    ['style', `height: 30px; border-radius: 0.2em; padding: 4px;`]
  ]);
  not_allowed_auto_cont.appendChild(not_allowed_input);
  not_allowed_input.onkeyup = searchAllowedList;
  
  let is_reference_object = {classname: 'is_speaker', background: '#43de6d'};
  let not_reference_object = {classname: 'not_speaker', background: '#e21212'};

  let is_btn = ele('div');
  a(is_btn,[['jdat',`${JSON.stringify(is_reference_object)}`],['style',`cursor: pointer;`]]);
  is_btn.innerHTML = svgs.add;
  is_allowed_auto_cont.appendChild(is_btn);
  is_btn.onclick = addUsernameToSpeakerList;

  let not_btn = ele('div');
  a(not_btn,[['jdat',`${JSON.stringify(not_reference_object)}`],['style',`cursor: pointer;`]]);
  not_btn.innerHTML = svgs.add;
  not_allowed_auto_cont.appendChild(not_btn);
  not_btn.onclick = addUsernameToSpeakerList;

  allowed_to_speak_list.filter(r => r.can_speak === true).forEach(r => {
    addAllowedInputToList(r,is_reference_object, left);
  });
  allowed_to_speak_list.filter(r => r.can_speak === false).filter(r => r.can_speak === true).forEach(r => {
    addAllowedInputToList(r,not_reference_object, right);
  });

}

function addUsernameToSpeakerList(){
  let reference_object = JSON.parse(this.getAttribute('jdat'));
  var id = reference_object.classname == 'is_speaker' ? 'is_allowed_list_' : 'not_allowed_list_';
  var can_speak_obj = { username: tn(this.parentElement,'input')[0].value, can_speak: (reference_object.classname == 'is_speaker' ? true : false) };
  addAllowedInputToList( can_speak_obj, reference_object, gi(document,id) );
}

function addUserAllowedListPill(){

}

function addAllowedInputToList(obj,speaker_type,ref_elm) {
  let { classname,background } = speaker_type;

  let cont = ele('div');
  a(cont,[
    ['class',`speaker_list ${classname}`],
    ['style',`${JSON.stringify(obj)}`],
    ['style',`max-height: 30px; display: grid; grid-template-columns: 1fr 22px; grid-gap: 4px;`]
  ]);
  ref_elm.appendChild(cont);

  let btn = ele('div');
  a(btn, [
    ['jdat', `${JSON.stringify(obj)}`],
    ['style', `background: ${background}; border-radius: 0.2em; text-align: center; padding: 8px; color: #ffffff; cursor: pointer; transition: all 111ms;`]
  ]);
  cont.appendChild(btn);
  btn.innerText = obj.username;

  let del = ele('div');
  a(del,[['style',`${JSON.stringify(obj)}`]]);
  del.innerHTML = svgs.del;
  cont.appendChild(del);
  del.onclick = removeUserFromList;
}

async function switchAllowedUser() {
  let jdat = JSON.parse(this.getAttribute('jdat'));
  if (jdat.can_speak === true) {
    // save in storage
    let ref = gi(document, 'is_allowed_list_');
  }
}

function removeUserFromList(){
  var jdat = JSON.parse(this.getAttribute('jdat'));
  // var card = this.parentElement;
  // function removeUserFromAllowedList(){}

}
function createAutoCompleteForm(ref) {

}


function createAudioHTMLcard(ref, key) {
  let rect = ref.getBoundingClientRect();

  let cont = ele('div');
  a(cont, [
    ['class', 'audio_trigger_card'],
    ['style', `display: grid; grid-template-columns: ${rect.width*0.23}px ${(rect.width > 1200 ? (rect.width*0.4) : (rect.width*0.33))}px 1fr 1fr; grid-gap: 8px; padding: 2px; background: #052533; color: #fff;`]
  ]);
  ref.appendChild(cont);

  let pill_panel = ele('div');
  a(pill_panel, [
    ['style', `padding: 2px; text-align: center;`]
  ]);
  cont.appendChild(pill_panel);
  pill_panel.innerText = 'Triggers';

  let pill_cont = ele('div');
  a(pill_cont, [
    ['class', 'trigger_pill_cont'],
    ['style', `display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 150px)); grid-gap: 2px; padding: 2px;`]
  ]);
  pill_panel.appendChild(pill_cont);

  let inpcont = ele('div');
  a(inpcont, [
    ['style', 'width: 100%; padding: 8px;']
  ])
  cont.appendChild(inpcont);

  let label = ele('div');
  a(label, [
    ['style', `padding: 2px; font-size: 2em;`]
  ]);
  inpcont.appendChild(label);
  label.innerText = fixNameCase(key.replace(/^audio_/, '').replace(/_/g, ' '));

  let inp = ele('input');
  a(inp, [
    ['placeholder', 'what will trigger this file?'],
    ['filename', key],
    ['style', `width: 100%; border: 1px solid transparent; border-radius: 0.3em; height: 40px;`]
  ]);
  inpcont.appendChild(inp);
  inp.onkeyup = createTriggerPill;

  let player = ele('div');
  cont.appendChild(player);
  player.innerHTML = `<div style="padding: 2px;">${keys.replace(/^audio_/,'')}</div>`;

  let rmv = ele('div');
  a(rmv, [
    ['filename', keys],
    ['style', `font-size: 1.6em; height: 22px; width: 22px; background: transparent; color: #e21212; cursor: pointer;`]
  ]);
  rmv.innerHTML = 'delete';
  rmv.onclick = removeFileFromStorage;
  cont.appendChild(rmv);
}

initUserInterface()
