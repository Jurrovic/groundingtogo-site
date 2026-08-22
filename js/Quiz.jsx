/* Groundingtogo Wellbeing Quiz v2 — near + far destinations, safety-audited */

const GTG_WB_QUESTIONS = [
  { id:'q1', prompt:'First of all, thank you for being here.', sub:'How are you doing right now?',
    opts:[
      {tag:'ready',      label:"I'm good, just craving something new."},
      {tag:'burned_out', label:'Tired and a bit flat — kind of going through the motions.'},
      {tag:'anxious',    label:'Stressed and overwhelmed.'},
      {tag:'restless',   label:"Restless — I'm fine but something feels off."},
    ]},
  { id:'q2', prompt:'If one thing has been missing from your daily life lately, what is it?', sub:null,
    opts:[
      {tag:'needs_joy',        label:'Genuine joy — not much feels fun or exciting right now.'},
      {tag:'needs_meaning',    label:"Meaning — I'm busy but it doesn't feel like it adds up to much."},
      {tag:'needs_connection', label:"Connection — I feel a bit isolated, like no one really gets it."},
      {tag:'needs_growth',     label:"Growth — I feel stuck, like I'm not moving forward."},
      {tag:'needs_peace',      label:'Peace — I just want to feel calm and undisturbed.'},
    ]},
  { id:'q3', prompt:'How do you feel about where your life is headed right now?', sub:null,
    opts:[
      {tag:'grounded',      label:"Pretty good — I have a sense of direction."},
      {tag:'drifting',      label:"A bit unclear — I know what I'm doing but not really where I'm going."},
      {tag:'in_transition', label:"I'm in a transition and need time to think."},
      {tag:'stuck',         label:"Honestly, I'm feeling a bit stuck."},
    ]},
  { id:'q4', prompt:'What does a perfect day look like to you?', sub:null,
    opts:[
      {tag:'unstructured', label:'A slow, unstructured day — following my mood, no agenda.'},
      {tag:'active',       label:'Doing something active — hiking, swimming, just moving my body.'},
      {tag:'cultural',     label:'Culturally rich — something meaningful to see or learn.'},
      {tag:'social_day',   label:'Doing something social, being around people.'},
      {tag:'pure_rest',    label:'Complete rest — a good book, a good meal, doing nothing and not feeling guilty about it.'},
    ]},
  { id:'q5', prompt:'What would make this trip feel like a success?', sub:null,
    opts:[
      {tag:'needs_autonomy',    label:'Complete freedom — my time, my rules, my choices.'},
      {tag:'needs_competence',  label:"Doing something I've never done before and feeling proud of myself for it."},
      {tag:'needs_relatedness', label:'Making a new connection — even just one person who gets it.'},
      {tag:'needs_reset',       label:'Just feeling like myself again.'},
    ]},
  { id:'q6', prompt:'What sounds the most exciting right now?', sub:null,
    opts:[
      {tag:'high_openness',     label:'Going somewhere completely new — I have no idea what to expect.'},
      {tag:'moderate_openness', label:"Going somewhere I've been curious about for a while."},
      {tag:'low_openness',      label:"Going somewhere I already know a little — familiar enough to relax."},
      {tag:'openness_neutral',  label:"I genuinely have no preference."},
    ]},
  { id:'q7', prompt:'What kind of environment do you feel your best in?', sub:null,
    opts:[
      {tag:'water',   label:'Near water — sea, lake, river. I just want to be close to it.'},
      {tag:'nature',  label:'In nature — somewhere green and quiet.'},
      {tag:'city',    label:'In a city — culture, things to do, energy.'},
      {tag:'offbeat', label:'Off the beaten path — somewhere niche and unexpected.'},
    ]},
  { id:'q8', prompt:'How do you feel about travelling alone and being by yourself most of the time?', sub:null,
    opts:[
      {tag:'introvert',        label:"That's exactly what I need."},
      {tag:'solo_open',        label:"Sounds good — but I'd like the option to meet people along the way."},
      {tag:'ambivert',         label:'I want solo time, but I also want to feel connected.'},
      {tag:'social_traveller', label:"I want to be around people and energy — solo doesn't mean isolated."},
    ]},
  { id:'q9', prompt:'How do you like to travel?', sub:null,
    opts:[
      {tag:'needs_structure', label:'I want a clear plan — I like knowing what each day looks like.'},
      {tag:'flexible',        label:'I want structure, but with lots of flexibility.'},
      {tag:'spontaneous',     label:"I just want to arrive and see how I feel."},
    ]},
  { id:'q10', prompt:"How do you usually react when things don't go according to plan?", sub:null,
    opts:[
      {tag:'needs_smooth',        label:'Pretty stressed — I need things to go smoothly to enjoy myself.'},
      {tag:'moderate_resilience', label:'It bothers me, but I recover fairly quickly.'},
      {tag:'high_resilience',     label:"Honestly fine — unplanned things often become the best parts."},
    ]},
  { id:'q11', prompt:"What's holding you back?", sub:null,
    opts:[
      {tag:'budget',           label:"Budget — I'm not sure I can afford what I really want."},
      {tag:'time',             label:"Time — I don't know if I have enough days off."},
      {tag:'fear',             label:"Going alone feels daunting — I'm not sure I'm ready."},
      {tag:'questioning_solo', label:"I don't see why going alone would be better than finding someone to come with."},
      {tag:'overwhelmed',      label:"I'm overwhelmed by all the options and don't know what's right for me."},
      {tag:'ready',            label:"Nothing — I'm ready. I just need a starting point."},
    ]},
  { id:'q12', prompt:'Where in the world would you be departing from?', sub:null,
    opts:[
      {tag:'europe',      label:'Europe'},
      {tag:'middle_east', label:'Middle East'},
      {tag:'asia',        label:'Asia'},
      {tag:'americas',    label:'Americas'},
      {tag:'africa',      label:'Africa'},
      {tag:'oceania',     label:'Oceania / Australia'},
    ]},
];

/* ---- Block 1: State ---- */
function wb_block1(t) {
  var m=t.q1,d=t.q2;
  if(m==='burned_out'&&d==='needs_peace') return "Running on empty tends to creep up on you — you don't notice it until you do, and then it's hard to remember what normal felt like. When everything keeps demanding your attention, rest starts to feel like a reward you haven't earned yet. You have.";
  if(m==='burned_out'&&d==='needs_joy') return "There's a specific kind of tiredness that doesn't come from doing too much — it comes from doing things that stopped feeling like yours. When nothing really excites you anymore, that's not ingratitude. That's a signal worth paying attention to.";
  if(m==='burned_out'&&d==='needs_meaning') return "Functioning but not feeling it is its own kind of exhaustion. When the days blur together and the things you're working towards no longer feel worth working towards — that's not a motivation problem. That's a signal that something needs to change.";
  if(m==='burned_out'&&d==='needs_growth') return "When you're tired and stuck at the same time, it's easy to assume the problem is you. It's usually not. A flat environment produces flat feelings. That's just how it works.";
  if(m==='burned_out'&&d==='needs_connection') return "Burnout and loneliness have a way of arriving together. You're stretched too thin to properly connect with anyone, and that isolation makes the tired feeling worse. It's a loop worth breaking.";
  if(m==='burned_out') return "Running on empty tends to creep up on you. When everything keeps demanding your attention, rest starts to feel like a reward you haven't earned yet. You have.";
  if(m==='anxious'&&d==='needs_peace') return "When your brain won't switch off, it's usually because it's been asked to do too much for too long without a real break. Not a weekend break — an actual one. The kind where you're somewhere else and nothing needs deciding.";
  if(m==='anxious'&&d==='needs_connection') return "Feeling overwhelmed and disconnected at the same time is more common than it sounds. When everything is loud and busy, real connection is usually the first thing that quietly disappears. You're not too much — you're just in the wrong environment.";
  if(m==='anxious'&&d==='needs_growth') return "Stress and stagnation are an uncomfortable combination — your nervous system is activated but you're not going anywhere. That restless, anxious feeling is often your brain signalling that the current situation has run out of things to offer you.";
  if(m==='anxious'&&d==='needs_meaning') return "Anxiety often comes from doing things that don't feel connected to anything that actually matters to you. When everything is urgent but nothing feels important, that tension builds. You're not overreacting — you just need a different kind of day.";
  if(m==='anxious') return "When your brain won't switch off, it's usually because it's been asked to do too much for too long. You're not broken — you're overloaded. And overloaded is fixable.";
  if(m==='restless'&&d==='needs_growth') return "Restlessness without an obvious cause is usually your brain telling you that the current environment has run out of things to give you. You're not burned out — you're bored. And boredom, when you sit with it, usually points pretty clearly to what's missing.";
  if(m==='restless'&&d==='needs_meaning') return "That vague feeling of something being off is easy to dismiss, but it's worth listening to. When you're functioning fine but nothing feels particularly meaningful, that's not a small thing — that's your life asking for a different direction.";
  if(m==='restless'&&d==='needs_connection') return "Feeling restless and a bit disconnected usually means you haven't had enough real interaction lately — the kind that leaves you feeling seen rather than just social. It happens gradually and it's easy to miss until it isn't.";
  if(m==='restless'&&d==='needs_joy') return "When nothing is really wrong but nothing is really exciting either, that's its own kind of uncomfortable. You don't need to fix your life — you just need to shake the scenery a little.";
  if(m==='restless') return "That background feeling of something being off is worth paying attention to. Restlessness usually points to something specific — and a change of scene is often the fastest way to find out what it is.";
  return "You already know you need this — which puts you ahead of most people. Not everyone recognises the moment when a change of scene would actually help before they're already running on empty. You're here early, and that makes everything easier.";
}

/* ---- Block 2: What you need ---- */
function wb_block2(t) {
  var need=t.q5,dir=t.q3,o;
  if(need==='needs_autonomy'){
    o=(dir==='stuck'||dir==='in_transition')?"When your days feel shaped by other people's expectations or timelines, it gets hard to remember what you actually want. ":dir==='drifting'?"When direction feels unclear, one of the most useful things you can do is spend time making decisions that are entirely yours. ":"Even when things are going well, time that's completely yours — no agenda, no one else's schedule — is hard to replicate in everyday life. ";
    return o+"What you're describing is a need for autonomy — time that belongs to you without having to justify it. A trip where you decide everything, including when to do nothing, gives you that back. It sounds simple, but it adds up.";
  }
  if(need==='needs_competence'){
    o=dir==='stuck'?"Feeling stuck and feeling capable are hard to hold at the same time — usually one quietly erodes the other. ":dir==='drifting'?"When your direction feels uncertain, doing something you've never done before and discovering you can handle it tends to cut through the fog. ":dir==='in_transition'?"Going through a change and doing something independently at the same time is a useful combination — it reminds you that you can figure things out. ":"Doing something you've never done before and discovering you can handle it — that tends to cut through uncertainty. ";
    return o+"What would make this trip feel like a success isn't relaxation — it's the quiet confidence that comes from navigating something on your own. Making a hundred small decisions in a foreign place and realising you handled all of them.";
  }
  if(need==='needs_relatedness'){
    o=dir==='stuck'?"Feeling stuck and feeling disconnected tend to reinforce each other — it's worth untangling which one came first. ":dir==='drifting'?"When everyday life feels a bit hollow, it's worth asking whether you've had enough real connection lately — the kind that leaves you feeling seen, not just busy. ":"That background feeling of something being off is often simpler than it seems — sometimes it's just that you haven't had a real conversation in a while. ";
    return o+"Solo travel is counterintuitively good for this: without a group to default to, you end up actually talking to people. The right environment makes connection feel natural rather than something you have to engineer.";
  }
  o=dir==='stuck'?"When the environment itself has become the problem, the only thing that really works is leaving it — even temporarily. ":dir==='in_transition'?"Being in a transition means carrying a lot — new information, decisions you haven't made yet, things you haven't finished processing. Space to think without the usual noise is genuinely useful, not indulgent. ":dir==='drifting'?"Sometimes the clarity you're looking for doesn't come from thinking harder — it comes from changing the scenery long enough for things to settle. ":"Even when things are going well, a reset isn't frivolous — it's maintenance. ";
  return o+"What this trip needs to do isn't solve anything. It just needs to create enough distance from your normal environment that things can breathe. That's usually all it takes.";
}

/* ---- Block 3: Trip style ---- */
function wb_block3(t) {
  var envT={
    water:"Being near water does something specific — the sound, the horizon, the way time moves differently when there's nothing between you and it. Water environments reduce stress in ways that don't require you to do anything in particular to get the benefit. You just have to be there.",
    nature:"Green, quiet, away from concrete — that's the shape of what you're looking for. Natural environments reduce the kind of mental fatigue that comes from constantly processing stimulation. The less you have to navigate or decide, the more effective it is.",
    city:"You restore through stimulation, not in spite of it — through culture, food, the energy of a place that's alive. The right city doesn't drain you, it fills you. The key is finding one that matches your pace: somewhere you can explore entirely on your own terms.",
    offbeat:"You're not looking for the obvious version of a trip. Somewhere less visited, less curated — where you're not following a route someone else designed. That requires a little more navigation but it's worth it: the experience feels more real, and more yours."
  };
  var socT={
    introvert:"Time alone — genuinely alone, without having to explain it — is the point of this trip, not a side effect.",
    solo_open:"You're happy on your own, but you're open to connection if it happens naturally. No pressure either way.",
    ambivert:"You'll want a mix — time to yourself and moments of real connection. The right trip has room for both without you having to choose.",
    social_traveller:"You're not looking for isolation just because you're travelling solo. The best version of this trip has people in it — the environment should make that easy."
  };
  var strT="A loose framework is enough — know where you're sleeping and one or two things you want to do, then leave the rest open.";
  if(t.q9==='needs_structure'||t.q10==='needs_smooth') strT="Having the key things sorted in advance — where you're staying, what the first day looks like — takes the anxiety out of arriving somewhere new. That's not over-planning, it's just useful.";
  else if(t.q9==='spontaneous'&&t.q10==='high_resilience') strT="You don't need a plan. A starting point is enough — you'll figure the rest out when you get there.";
  return [(envT[t.q7]||''),(socT[t.q8]||''),strT].filter(Boolean).join(' ');
}

/* ---- Block 4: Returns object with blocker, destinations, activity ---- */
/* All destinations audited as safe for solo female travellers */
function wb_result_data(t) {
  var bT={
    budget:"Budget is real and there's no point pretending otherwise. The good news is that the most restorative trips aren't usually the most expensive — it's about choosing the right place at the right time. Staying regional and going off-season often unlocks exactly what you're looking for at a fraction of the cost.",
    time:"Not having enough time is worth being precise about. A four-day trip done well is more restorative than ten days where the first three are just recovery from the journey. Proximity matters — somewhere you can reach without a long-haul flight means the trip starts sooner.",
    fear:"Going alone for the first time is genuinely daunting, and pretending otherwise would be patronising. What usually helps is starting somewhere manageable — good infrastructure, a culture known for being welcoming, somewhere with a clear centre so you're never truly disoriented. The first trip doesn't have to be the most ambitious one. It just has to happen.",
    questioning_solo:"The honest answer is that a solo trip isn't better than going with someone — it's just a completely different experience. You move at your pace, make every decision, and end up having conversations you wouldn't have had if someone else was there. Whether it's worth it is something you'll know pretty quickly once you try it.",
    overwhelmed:"Too many options is its own kind of paralysis — and the solution isn't more research, it's a constraint. Once you know your environment and your departure point, the list gets short fast. That's exactly what this result is for.",
    ready:"You don't need convincing — you just need a starting point. Here's one."
  };

  /* Near destinations — geographically close to Q12 region */
  var hB=t.q11==='budget';
  var nearD={
    water:{
      europe:     "Sicily and the Amalfi Coast, or the Greek islands (Naxos & Milos)",
      middle_east:"Fujairah (Al Aqah) or Oman's Musandam (Zighy Bay)",
      asia:       "Koh Samui or Phuket, or Bali (Uluwatu & Canggu)",
      americas:   "Big Sur and the California coast, or Rio de Janeiro (Ipanema)",
      africa:     "the Seychelles (Mahe & Praslin) or Mauritius (Le Morne)",
      oceania:    "the Gold Coast, or Sydney's beaches (Bondi & Manly)"
    },
    nature:{
      europe:     "the French Alps (Chamonix & Annecy) or the Italian Lakes (Como & Garda)",
      middle_east:"Ras Al Khaimah (Jebel Jais)",
      asia:       "Sri Lanka's hill country (Kandy & Ella) or Nepal (Pokhara & the Annapurnas)",
      americas:   "the Canadian Rockies (Banff) or Patagonia (Torres del Paine)",
      africa:     "Cape Town — Table Mountain, the Cape Peninsula & the winelands",
      oceania:    "New Zealand's South Island (Queenstown & Wanaka) or Australia's Blue Mountains"
    },
    city:{
      europe:     "Rome and Florence, or Budapest",
      middle_east:"Dubai (Downtown & City Walk)",
      asia:       "Tokyo and Kyoto, or Singapore",
      americas:   "New York or Montreal",
      africa:     "Cape Town (City Bowl & Sea Point)",
      oceania:    "Melbourne or Sydney"
    },
    offbeat:{
      europe:     "Lake Balaton (Tihany & the uplands) or Slovenia's Soca Valley",
      middle_east:"Sri Lanka's hill country (Ella) or Kazakhstan (Almaty & the Tian Shan)",
      asia:       "Bhutan (Paro & the Haa Valley) or the quieter Indonesian islands (Flores & Sumba)",
      americas:   "Patagonia (El Chalten)",
      africa:     "Mauritius's interior (Chamarel & the Black River Gorges)",
      oceania:    "New Zealand's South Island (the Catlins & Fiordland) or Western Australia (Margaret River)"
    }
  };

  /* Far destinations — geographically distant from Q12 region, safe for solo female travellers */
  var farD={
    water:{
      europe:     "Bali (Uluwatu & Canggu) or Sri Lanka's south coast (Mirissa & Weligama)",
      middle_east:"Bali (Uluwatu) or the Seychelles (Mahe & Praslin)",
      asia:       "Sicily and the Amalfi Coast, or the Seychelles",
      americas:   "Bali (Uluwatu) or the Seychelles (Mahe)",
      africa:     "Bali (Canggu) or the Amalfi Coast",
      oceania:    "the Seychelles, or Sicily and the Amalfi Coast"
    },
    nature:{
      europe:     "New Zealand's South Island (Queenstown & Fiordland) or Nepal (Pokhara & the Annapurnas)",
      middle_east:"the French Alps (Chamonix) or New Zealand's South Island",
      asia:       "the French Alps (Chamonix) or Patagonia (Torres del Paine)",
      americas:   "the French Alps (Chamonix) or New Zealand's South Island",
      africa:     "the French Alps (Chamonix) or New Zealand's South Island",
      oceania:    "the French Alps (Chamonix) or Patagonia (Torres del Paine)"
    },
    city:{
      europe:     "Tokyo and Kyoto, or Seoul",
      middle_east:"Tokyo, or Singapore",
      asia:       "Rome and Florence, or Lisbon",
      americas:   "Tokyo, or Rome and Florence",
      africa:     "Tokyo, or Rome and Florence",
      oceania:    "Rome and Florence, or Lisbon"
    },
    offbeat:{
      europe:     "Bhutan (the Haa Valley) or Kazakhstan (Almaty & the Tian Shan)",
      middle_east:"Bhutan (the Haa Valley) or Patagonia (El Chalten)",
      asia:       "Lake Balaton (Hungary) or the Scottish Highlands (Isle of Skye)",
      americas:   "Bhutan (the Haa Valley) or Slovenia's Soca Valley",
      africa:     "Bhutan, or Lake Balaton (Hungary)",
      oceania:    "Slovenia's Soca Valley or Bhutan (the Haa Valley)"
    }
  };

  var envKey=nearD[t.q7]?t.q7:'city';
  var near=(nearD[envKey][t.q12])||"somewhere close that suits your rhythm";
  var far=(farD[envKey][t.q12])||"somewhere further that suits your rhythm";

  /* Activity — name + description separated for display */
  var isSoc=t.q8==='social_traveller'||t.q8==='ambivert';
  var actMap={
    active:{
      name: isSoc?"a group surf lesson or guided hike":"a solo hiking trail or yoga retreat",
      desc: isSoc?"Built-in social opportunity without the pressure of starting from scratch.":"Movement without social obligation — a good anchor for the first day."
    },
    cultural:{
      name: isSoc?"a cooking class or local food tour":"a self-guided food market or architecture walk",
      desc: isSoc?"A low-pressure way to meet people if you want to, easy to enjoy alone if you don't.":"Enough of an anchor for the first day without committing to a full schedule."
    },
    social_day:{
      name:"a cooking class, walking tour, or language exchange",
      desc:"A natural entry point without having to engineer conversation from nothing."
    },
    unstructured:{
      name:"no fixed plan for the first day",
      desc:"Pick a neighbourhood, start walking, and let the day find its shape."
    },
    pure_rest:{
      name: isSoc?"a hammam or communal thermal bath":"a spa day or thermal bath",
      desc: isSoc?"The rest you need, with some social texture built in.":"Worth booking in advance — one thing that's purely for you removes the decision fatigue of the first morning."
    }
  };
  var act=actMap[t.q4]||{name:"one anchor activity you're genuinely excited about",desc:"The rest can follow."};

  return {
    blocker: bT[t.q11]||'',
    near:    near,
    far:     far,
    actName: act.name,
    actDesc: act.desc
  };
}

/* ---- Quiz component ---- */
function Quiz() {
  var TOTAL=GTG_WB_QUESTIONS.length;
  var _s=React.useState(0);   var step=_s[0],setStep=_s[1];
  var _t=React.useState({});  var tags=_t[0],setTags=_t[1];
  var _l=React.useState(null);var live=_l[0],setLive=_l[1];
  var _e=React.useState('');  var email=_e[0],setEmail=_e[1];
  var _r=React.useState('');  var eErr=_r[0],setEErr=_r[1];

  /* Consultation contact form (results page) */
  var _cn=React.useState('');   var cName=_cn[0],setCName=_cn[1];
  var _ce=React.useState('');   var cEmail=_ce[0],setCEmail=_ce[1];
  var _cw=React.useState('');   var cWhats=_cw[0],setCWhats=_cw[1];
  var _cm=React.useState('');   var cMsg=_cm[0],setCMsg=_cm[1];
  var _cerr=React.useState(''); var cErr=_cerr[0],setCErr=_cerr[1];
  var _csent=React.useState(false); var cSent=_csent[0],setCSent=_csent[1];

  var q=(step>=1&&step<=TOTAL)?GTG_WB_QUESTIONS[step-1]:null;

  function pick(tag){
    setLive(tag);
    var nt=Object.assign({},tags); nt['q'+step]=tag; setTags(nt);
    setTimeout(function(){setLive(null);if(step<TOTAL)setStep(step+1);else setStep(TOTAL+1);},240);
  }
  function back(){if(step>1&&step<=TOTAL+1)setStep(step-1);}
  function onEmail(e){e.preventDefault();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setEErr('Please enter a valid email.');return;}sendQuizToAirtable(tags,email,wb_result_data(tags));setStep(TOTAL+2);}
  function onContact(e){
    e.preventDefault();
    if(!cName.trim()){setCErr('Please enter your name.');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)){setCErr('Please enter a valid email.');return;}
    setCErr('');
    var req={name:cName,email:cEmail,whatsapp:cWhats,message:cMsg};
    sendRequestToAirtable(req,tags,wb_result_data(tags));
    sendEnquiry({name:cName,email:cEmail,message:cMsg||'(no message)',destination:'',when:'',style:'Completed the quiz'},'Quiz results \u2014 consultation request');
    setCSent(true);
  }
  function retake(){setStep(0);setTags({});setEmail('');setEErr('');setCName('');setCEmail('');setCWhats('');setCMsg('');setCErr('');setCSent(false);}

  var CE=React.createElement;
  var dot=CE('span',{className:'gtg-dot'});
  var eye=function(txt,sty){return CE('span',{className:'gtg-eyebrow',style:sty||{}},txt);};

  /* Shared form styles for the consultation fields */
  var labStyle={display:'block',fontSize:13,fontWeight:600,color:'var(--ink)',marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'};
  function inpStyle(){return {width:'100%',boxSizing:'border-box',padding:'12px 14px',border:'1.5px solid var(--hairline)',borderRadius:'var(--r-md)',fontSize:15,fontFamily:'var(--font-sans)',background:'var(--white)',color:'var(--ink)',outline:'none'};}
  function field(id,label,type,val,setter,opts){
    opts=opts||{};
    return CE('div',{style:{textAlign:'left',marginBottom:16}},
      CE('label',{htmlFor:id,style:labStyle},label),
      opts.textarea
        ? CE('textarea',{id:id,value:val,onChange:function(ev){setter(ev.target.value);setCErr('');},placeholder:opts.ph||'',rows:opts.rows||4,style:Object.assign({},inpStyle(),{resize:'vertical',lineHeight:1.5})})
        : CE('input',{id:id,type:type,value:val,onChange:function(ev){setter(ev.target.value);setCErr('');},placeholder:opts.ph||'',style:inpStyle()})
    );
  }

  /* INTRO */
  if(step===0) return CE('div',{className:'gtg-quiz gtg-quiz--sandcard',style:{textAlign:'center',padding:'48px 32px'}},
    CE('div',{className:'gtg-quiz-kicker',style:{justifyContent:'center',marginBottom:16}},dot,eye('Quiz')),
    CE('h3',{className:'gtg-quiz-title',style:{margin:'0 auto 28px',maxWidth:500}},'The GroundingtoGo Quiz'),
    CE('button',{className:'gtg-pill',onClick:function(){setStep(1);},style:{margin:'0 auto'}},'Start the quiz →')
  );

  /* QUESTIONS */
  if(step>=1&&step<=TOTAL){
    var pct=((step-1)/TOTAL*100).toFixed(1);
    var nO=q.opts.length;
    var oSt=nO>=5?{display:'flex',flexDirection:'column',gap:10}:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:10};
    return CE('div',{className:'gtg-quiz gtg-quiz--sandcard'},
      CE('div',{className:'gtg-progress'},
        CE('span',{className:'gtg-progress-label'},'Question '+step+' of '+TOTAL),
        CE('div',{className:'gtg-progress-track'},CE('div',{className:'gtg-progress-fill',style:{width:pct+'%'}}))
      ),
      CE('div',{className:'gtg-q',key:'q'+step},
        CE('p',{className:'gtg-q-prompt'},q.prompt),
        q.sub?CE('p',{className:'gtg-q-hint'},q.sub):null,
        CE('div',{className:'gtg-q-opts',style:oSt},
          q.opts.map(function(o){
            var iS=tags['q'+step]===o.tag||live===o.tag;
            return CE('button',{key:o.tag,className:'gtg-opt'+(iS?' sel':''),onClick:function(){pick(o.tag);},style:{textAlign:'left',padding:'14px 18px',lineHeight:1.5}},
              CE('span',{className:'gtg-opt-label',style:{fontWeight:iS?600:400}},o.label));
          })
        )
      ),
      CE('div',{className:'gtg-quiz-nav'},
        CE('button',{className:'gtg-ghostbtn',onClick:back,disabled:step===1,style:{opacity:step===1?0.35:1}},'← Back'),
        CE('div',{className:'gtg-dotrow'},
          GTG_WB_QUESTIONS.map(function(_,k){var dn=tags['q'+(k+1)]!=null,ac=k===step-1;return CE('i',{key:k,className:ac?'on':(dn?'done':'')});})
        ),
        CE('span',{style:{width:56}})
      )
    );
  }

  /* EMAIL */
  if(step===TOTAL+1) return CE('div',{className:'gtg-quiz gtg-quiz--sandcard',style:{textAlign:'center',padding:'48px 32px'}},
    CE('div',{className:'gtg-quiz-kicker',style:{justifyContent:'center',marginBottom:16}},dot),
    CE('h3',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(22px,2.8vw,28px)',color:'var(--ink)',marginBottom:12}},'Your results are ready.'),
    CE('p',{style:{fontSize:15,color:'var(--ink-muted-80)',maxWidth:420,margin:'0 auto 28px',lineHeight:1.65}},
      "Drop your email and I'll send your personalised trip match — along with a few ideas to get you started."),
    CE('form',{onSubmit:onEmail,style:{maxWidth:380,margin:'0 auto'}},
      CE('div',{style:{textAlign:'left',marginBottom:16}},
        CE('label',{htmlFor:'gtg-qemail',style:{display:'block',fontSize:13,fontWeight:600,color:'var(--ink)',marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}},'Your email'),
        CE('input',{id:'gtg-qemail',type:'email',value:email,onChange:function(ev){setEmail(ev.target.value);setEErr('');},placeholder:'you@email.com',style:{width:'100%',boxSizing:'border-box',padding:'12px 14px',border:'1.5px solid '+(eErr?'#c0392b':'var(--hairline)'),borderRadius:'var(--r-md)',fontSize:15,fontFamily:'var(--font-sans)',background:'var(--white)',color:'var(--ink)',outline:'none'}}),
        eErr?CE('p',{style:{color:'#c0392b',fontSize:13,marginTop:6}},eErr):null
      ),
      CE('button',{className:'gtg-pill',type:'submit',style:{width:'100%',justifyContent:'center'}},'See my results →'),
      CE('button',{type:'button',onClick:function(){sendQuizToAirtable(tags,'',wb_result_data(tags));setStep(TOTAL+2);},style:{display:'block',margin:'12px auto 0',background:'none',border:'none',color:'var(--ink-muted-48)',fontSize:12.5,cursor:'pointer',textDecoration:'underline'}},'or skip to the results now'),
      CE('button',{type:'button',onClick:back,style:{marginTop:12,background:'none',border:'none',color:'var(--ink-muted-80)',fontSize:13,cursor:'pointer',textDecoration:'underline'}},'← Back'),
      CE('p',{style:{fontSize:12,color:'var(--ink-muted-48)',marginTop:14,lineHeight:1.5}},"No newsletter, no spam. Just your results and one follow-up if you'd like to chat."),
      CE('p',{style:{fontSize:12,color:'var(--ink-muted-48)',marginTop:8,lineHeight:1.5}},
        "If you enter your email, I'll be able to see your results too — which can help me get a head start if we end up planning your next trip together. ",
        CE('a',{href:'privacy.html',style:{color:'var(--ink-muted-48)'}},'Privacy Policy')
      )
    )
  );

  /* RESULT */
  var b1=wb_block1(tags),b2=wb_block2(tags),b3=wb_block3(tags);
  var rd=wb_result_data(tags);

  /* Destination card helper */
  function destCard(label,place,accent){
    return CE('div',{style:{borderLeft:'3px solid '+accent,paddingLeft:22,marginBottom:4}},
      eye(label,{display:'block',marginBottom:10,letterSpacing:'0.08em'}),
      CE('p',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(22px,3vw,34px)',color:'var(--ink)',margin:'0',lineHeight:1.15,fontWeight:400}},
        place
      )
    );
  }

  return CE('div',{className:'gtg-quiz gtg-quiz--sandcard'},
    CE('div',{className:'gtg-result',style:{textAlign:'left'}},

      /* Kicker */
      CE('div',{className:'gtg-quiz-kicker',style:{marginBottom:20}},
        dot,eye('Your trip match')
      ),
      CE('h3',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(22px,2.8vw,28px)',color:'var(--ink)',marginBottom:28,lineHeight:1.3}},
        "Here's what I'd plan for you."
      ),

      /* Body paragraphs */
      CE('div',{style:{display:'flex',flexDirection:'column',gap:16,lineHeight:1.72,fontSize:'clamp(14px,1.5vw,16px)',color:'var(--ink-muted-80)',maxWidth:660,marginBottom:36}},
        CE('p',{style:{margin:0}},b1),
        CE('p',{style:{margin:0}},b2),
        CE('p',{style:{margin:0}},b3),
        rd.blocker?CE('p',{style:{margin:0}},rd.blocker):null
      ),

      /* Destination cards */
      CE('div',{style:{display:'flex',flexDirection:'column',gap:28,marginBottom:32}},
        destCard('Closer to home', rd.near, 'var(--clay)'),
        destCard('If you want to go further', rd.far, 'var(--sand)')
      ),

      /* Activity */
      CE('div',{style:{background:'var(--canvas,#f5f0ea)',borderRadius:'var(--r-md)',padding:'24px 28px',marginBottom:36,maxWidth:620}},
        eye('Start with',{display:'block',marginBottom:10,letterSpacing:'0.08em'}),
        CE('p',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(18px,2.2vw,24px)',color:'var(--ink)',margin:'0 0 10px',lineHeight:1.3}},
          rd.actName
        ),
        CE('p',{style:{fontSize:'clamp(13px,1.4vw,15px)',color:'var(--ink-muted-80)',margin:0,lineHeight:1.65}},
          rd.actDesc
        )
      ),

      /* Retake */
      CE('div',{style:{display:'flex',flexWrap:'wrap',gap:12}},
        CE('button',{className:'gtg-pill',onClick:retake,style:{background:'transparent',color:'var(--clay)',border:'1.5px solid var(--hairline)'}},'Retake the quiz')
      ),

      /* Consultation contact form */
      CE('div',{style:{marginTop:44,paddingTop:36,borderTop:'1px solid var(--hairline)',maxWidth:620}},
        cSent
          ? CE('div',null,
              CE('h4',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(20px,2.4vw,26px)',color:'var(--ink)',margin:'0 0 10px',lineHeight:1.3}},"Thank you — we'll be in touch soon."),
              CE('p',{style:{fontSize:'clamp(14px,1.5vw,16px)',color:'var(--ink-muted-80)',margin:0,lineHeight:1.65,maxWidth:520}},"Your details are with us. We'll reach out shortly to arrange your free consultation and talk through your options.")
            )
          : CE('div',null,
              CE('h4',{style:{fontFamily:'var(--font-serif)',fontSize:'clamp(20px,2.4vw,26px)',color:'var(--ink)',margin:'0 0 10px',lineHeight:1.3}},"Sounds good? Let's make it happen for you."),
              CE('p',{style:{fontSize:'clamp(14px,1.5vw,16px)',color:'var(--ink-muted-80)',margin:'0 0 24px',lineHeight:1.65,maxWidth:520}},"Leave your details here so we can arrange a free consultation and discuss your options."),
              CE('form',{onSubmit:onContact},
                field('gtg-cname','Name','text',cName,setCName,{ph:'Your name'}),
                field('gtg-cemail','Email','email',cEmail,setCEmail,{ph:'you@email.com'}),
                field('gtg-cwhats','WhatsApp (optional)','tel',cWhats,setCWhats,{ph:'+00 000 000 000'}),
                field('gtg-cmsg','Message (optional)','text',cMsg,setCMsg,{textarea:true,ph:"Anything you'd like us to know?"}),
                cErr?CE('p',{style:{color:'#c0392b',fontSize:13,margin:'-4px 0 14px'}},cErr):null,
                CE('button',{className:'gtg-pill',type:'submit'},'Send')
              )
            )
      )
    )
  );
}

window.Quiz = Quiz;
window.GTG_WB_QUESTIONS = GTG_WB_QUESTIONS;
window.wb_result_data = wb_result_data;
