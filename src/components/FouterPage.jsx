import { useState, useEffect } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --navy:#0D1B2E;--navy2:#0A1624;--navy3:#091420;--navy4:#112239;
      --ivory:#F2EDE4;--ivory2:#E8E0D4;--ivory3:#DDD5C8;
      --gold:#C9A96E;--gold2:#A8854A;
      --muted:rgba(242,237,228,.40);--muted2:rgba(242,237,228,.18);
      --line:rgba(242,237,228,.09);--line2:rgba(242,237,228,.16);
      --serif:'Cormorant Garamond',Georgia,serif;
      --sans:'Montserrat',sans-serif;
    }
    html,body,#root{background:var(--navy);color:var(--ivory);font-family:var(--sans);overflow-x:hidden;margin:0;padding:0}
    ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--gold)}

    /* ── REVEAL ── */
    .reveal{opacity:0;transform:translateY(28px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
    .reveal.vis{opacity:1;transform:translateY(0)}

    /* ── ABOUT HERO ── */
    .ab-hero{
      position:relative;height:520px;overflow:hidden;
      background:var(--navy3);
      display:flex;align-items:flex-end;
    }
    .ab-hero-img{
      position:absolute;inset:0;width:100%;height:100%;
      object-fit:cover;object-position:center 30%;
      filter:brightness(.32) saturate(.6);
      transform:scale(1.04);
      animation:zhero 18s ease-in-out infinite alternate;
    }
    @keyframes zhero{from{transform:scale(1.04) translate(0,0)}to{transform:scale(1.10) translate(-1%,1%)}}
    .ab-hero-content{
      position:relative;z-index:2;
      padding:0 56px 56px;
      display:flex;align-items:flex-end;justify-content:space-between;
      width:100%;
    }
    .ab-eyebrow{
      font-size:8px;font-weight:400;letter-spacing:.44em;
      text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:10px;
    }
    .ab-title{
      font-family:var(--serif);
      font-size:clamp(44px,6vw,82px);
      font-weight:300;color:var(--ivory);line-height:1.05;
    }
    .ab-year-badge{text-align:right;flex-shrink:0}
    .ab-year-num{
      font-family:var(--serif);
      font-size:clamp(60px,8vw,110px);
      font-weight:300;color:rgba(242,237,228,.08);
      line-height:1;letter-spacing:-.02em;
    }
    .ab-year-label{
      font-size:8px;font-weight:400;letter-spacing:.38em;
      text-transform:uppercase;color:var(--muted);
      margin-top:4px;
    }

    /* ── STATS ── */
    .stats-row{
      display:grid;grid-template-columns:repeat(4,1fr);
      border-bottom:1px solid var(--line);
      background:var(--navy2);
    }
    .stat-cell{
      padding:40px 44px;
      border-right:1px solid var(--line);
    }
    .stat-cell:last-child{border-right:none}
    .stat-num{
      font-family:var(--serif);
      font-size:clamp(36px,4vw,56px);font-weight:300;
      color:var(--ivory);line-height:1;margin-bottom:6px;
    }
    .stat-label{
      font-size:8px;font-weight:400;letter-spacing:.34em;
      text-transform:uppercase;color:var(--gold);opacity:.8;
    }
    .stat-desc{
      font-size:12px;font-weight:300;color:var(--muted);
      margin-top:8px;line-height:1.7;max-width:200px;
    }

    /* ── STORY ── */
    .story{
      display:grid;grid-template-columns:1fr 1fr;
      min-height:560px;
      background:var(--navy);
    }
    .story-left{
      padding:80px 64px 80px 56px;
      display:flex;flex-direction:column;justify-content:center;
      border-right:1px solid var(--line);
    }
    .story-tag{
      font-size:8px;font-weight:400;letter-spacing:.44em;
      text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:20px;
    }
    .story-title{
      font-family:var(--serif);
      font-size:clamp(28px,3vw,42px);font-weight:300;
      color:var(--ivory);line-height:1.15;margin-bottom:28px;
    }
    .story-title em{font-style:italic;color:var(--gold)}
    .story-body{
      font-size:13.5px;font-weight:300;line-height:1.9;
      color:var(--muted);max-width:420px;
    }
    .story-body p+p{margin-top:18px}
    .story-sign{
      margin-top:40px;padding-top:32px;
      border-top:1px solid var(--line);
      display:flex;align-items:center;gap:16px;
    }
    .sign-line{width:40px;height:1px;background:var(--gold);opacity:.5}
    .sign-name{
      font-family:var(--serif);
      font-size:18px;font-weight:400;color:var(--ivory);
    }
    .sign-role{
      font-size:8px;font-weight:400;letter-spacing:.28em;
      text-transform:uppercase;color:var(--muted);margin-top:2px;
    }
    .story-right{
      position:relative;overflow:hidden;background:var(--navy3);
    }
    .story-img{
      width:100%;height:100%;object-fit:cover;
      filter:brightness(.7) saturate(.7);
      transition:transform .8s cubic-bezier(.16,1,.3,1);
    }
    .story-right:hover .story-img{transform:scale(1.04)}
    .story-img-tag{
      position:absolute;bottom:28px;left:28px;
      background:rgba(9,20,32,.92);backdrop-filter:blur(8px);
      border-left:2px solid var(--gold);
      padding:12px 18px;
    }
    .sit-label{font-size:7.5px;font-weight:400;letter-spacing:.34em;text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:3px}
    .sit-text{font-family:var(--serif);font-size:15px;font-weight:400;color:var(--ivory)}

    /* ── TEAM ── */
    .team-sec{
      padding:80px 56px;
      border-top:1px solid var(--line);
      background:var(--navy2);
    }
    .team-hdr{
      display:flex;align-items:flex-end;justify-content:space-between;
      margin-bottom:48px;
    }
    .team-eye{font-size:9px;font-weight:400;letter-spacing:.44em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:flex;align-items:center;gap:11px}
    .team-eye::before{content:'';display:block;width:20px;height:1px;background:var(--gold)}
    .team-title{
      font-family:var(--serif);
      font-size:clamp(28px,3.5vw,44px);font-weight:300;color:var(--ivory);
    }
    .team-sub{
      font-size:12px;font-weight:300;color:var(--muted);
      max-width:280px;text-align:right;line-height:1.7;
    }
    .team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}
    .team-card{position:relative;overflow:hidden;cursor:pointer;background:var(--navy3)}
    .team-img-w{position:relative;aspect-ratio:3/4;overflow:hidden}
    .team-img{
      width:100%;height:100%;object-fit:cover;object-position:center top;
      filter:brightness(.65) saturate(.6);
      transition:transform .7s cubic-bezier(.16,1,.3,1),filter .4s;
    }
    .team-card:hover .team-img{transform:scale(1.06);filter:brightness(.55) saturate(.7)}
    .team-overlay{
      position:absolute;inset:0;
      background:linear-gradient(to top,rgba(9,20,32,.82) 0%,transparent 55%);
    }
    .team-info{
      position:absolute;bottom:0;left:0;right:0;
      padding:20px 18px;
    }
    .team-role{
      font-size:7.5px;font-weight:400;letter-spacing:.32em;
      text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:4px;
    }
    .team-name{
      font-family:var(--serif);
      font-size:19px;font-weight:400;color:var(--ivory);
    }
    .team-since{
      font-size:9px;font-weight:300;color:var(--muted);
      margin-top:2px;letter-spacing:.1em;
    }
    .team-detail{
      padding:16px 18px 18px;background:var(--navy4);
      border-top:1px solid var(--line);
    }
    .td-quote{
      font-family:var(--serif);
      font-size:13px;font-style:italic;font-weight:300;
      color:var(--muted);line-height:1.6;
    }

    /* ── TIMELINE ── */
    .timeline-sec{
      padding:80px 56px;background:var(--navy3);
      border-top:1px solid var(--line);
    }
    .tl-hdr{margin-bottom:56px}
    .tl-eye{font-size:8px;font-weight:400;letter-spacing:.44em;text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:12px}
    .tl-title{font-family:var(--serif);font-size:clamp(28px,3.5vw,44px);font-weight:300;color:var(--ivory)}
    .tl-list{position:relative}
    .tl-line{
      position:absolute;left:110px;top:0;bottom:0;
      width:1px;background:var(--line2);
    }
    .tl-item{
      display:flex;gap:0;align-items:flex-start;
      padding:0 0 48px 0;position:relative;
    }
    .tl-item:last-child{padding-bottom:0}
    .tl-year{
      font-family:var(--serif);
      font-size:22px;font-weight:300;color:var(--gold);
      width:110px;flex-shrink:0;padding-top:2px;
    }
    .tl-dot{
      width:9px;height:9px;border-radius:50%;
      background:var(--gold);flex-shrink:0;
      margin-top:8px;position:relative;z-index:1;
    }
    .tl-content{padding-left:28px}
    .tl-event{
      font-family:var(--serif);
      font-size:19px;font-weight:400;color:var(--ivory);margin-bottom:6px;
    }
    .tl-desc{font-size:12.5px;font-weight:300;color:var(--muted);line-height:1.75;max-width:480px}

    /* ── ADDRESS ── */
    .addr-sec{
      display:grid;grid-template-columns:1fr 1fr;
      border-top:1px solid var(--line);min-height:480px;
      background:var(--navy2);
    }
    .addr-left{
      padding:72px 56px;
      display:flex;flex-direction:column;justify-content:space-between;
    }
    .addr-tag{font-size:8px;font-weight:400;letter-spacing:.44em;text-transform:uppercase;color:var(--gold);opacity:.8;margin-bottom:16px}
    .addr-title{font-family:var(--serif);font-size:clamp(28px,3vw,42px);font-weight:300;color:var(--ivory);margin-bottom:40px}
    .addr-blocks{display:flex;flex-direction:column;gap:28px}
    .ab-label{font-size:8px;font-weight:400;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);opacity:.7;margin-bottom:6px;display:flex;align-items:center;gap:6px}
    .ab-val{font-size:14px;font-weight:300;color:var(--muted);line-height:1.6}
    .ab-val a{color:var(--ivory2);text-decoration:none;transition:color .25s}
    .ab-val a:hover{color:var(--gold)}
    .addr-hours{margin-top:32px;padding-top:28px;border-top:1px solid var(--line)}
    .hours-row{display:flex;justify-content:space-between;align-items:baseline;padding:7px 0;border-bottom:1px solid var(--line)}
    .hours-day{font-size:11px;font-weight:300;color:var(--muted);letter-spacing:.06em}
    .hours-time{font-size:11px;font-weight:300;color:var(--ivory2)}
    .hours-closed{color:rgba(242,237,228,.2)}
    .addr-right{position:relative;background:var(--navy3);overflow:hidden}
    .map-frame{width:100%;height:100%;border:none;filter:grayscale(1) invert(1) brightness(.35) contrast(1.1)}
    .map-pin{
      position:absolute;top:50%;left:50%;
      transform:translate(-50%,-50%);
      display:flex;flex-direction:column;align-items:center;
      pointer-events:none;
    }
    .map-pin-dot{
      width:14px;height:14px;border-radius:50%;
      background:var(--gold);border:2px solid var(--navy2);
      box-shadow:0 2px 12px rgba(201,169,110,.4);
    }
    .map-pin-stem{width:1px;height:24px;background:var(--gold);margin-top:2px}
    .map-label{
      margin-top:6px;background:var(--navy2);color:var(--gold);
      font-size:8px;font-weight:400;letter-spacing:.22em;
      text-transform:uppercase;padding:5px 12px;white-space:nowrap;
      border:1px solid var(--line2);
    }

    /* ── FOOTER ── */
    .footer{background:var(--navy3);color:var(--muted);border-top:1px solid var(--line)}
    .ft-top{
      padding:64px 56px 48px;
      display:grid;grid-template-columns:2fr 1fr 1fr 1fr;
      gap:48px;border-bottom:1px solid var(--line);
    }
    .ft-brand-name{
      font-family:var(--serif);
      font-size:26px;font-weight:300;
      letter-spacing:.12em;color:var(--ivory);
      margin-bottom:4px;
    }
    .ft-brand-sub{
      font-size:7.5px;font-weight:400;letter-spacing:.44em;
      text-transform:uppercase;color:var(--gold);opacity:.6;
      margin-bottom:22px;
    }
    .ft-desc{font-size:12px;font-weight:300;line-height:1.85;color:var(--muted);max-width:260px;margin-bottom:28px}
    .ft-socials{display:flex;gap:10px}
    .soc{
      width:34px;height:34px;border:1px solid var(--line2);
      display:flex;align-items:center;justify-content:center;
      cursor:pointer;transition:border-color .25s,background .25s;
      color:var(--muted);
      font-size:10px;font-weight:300;letter-spacing:.1em;
      font-family:var(--sans);
    }
    .soc:hover{border-color:var(--gold);color:var(--gold)}
    .ft-col-title{
      font-size:9px;font-weight:400;letter-spacing:.34em;
      text-transform:uppercase;color:var(--gold);opacity:.7;
      margin-bottom:22px;
    }
    .ft-link{
      display:block;font-size:12px;font-weight:300;
      color:var(--muted);text-decoration:none;
      padding:5px 0;
      transition:color .25s;cursor:pointer;
    }
    .ft-link:hover{color:var(--ivory)}
    .ft-mid{
      padding:36px 56px;
      display:grid;grid-template-columns:1fr 1fr;
      gap:24px;border-bottom:1px solid var(--line);
    }
    .ft-nl-title{font-size:13px;font-weight:300;color:var(--muted);margin-bottom:12px;letter-spacing:.04em}
    .ft-nl-row{display:flex;gap:0}
    .ft-nl-input{
      flex:1;background:var(--navy4);border:1px solid var(--line2);
      border-right:none;padding:11px 16px;
      font-size:11px;font-weight:300;color:var(--ivory);
      font-family:var(--sans);outline:none;
      transition:border-color .25s;
    }
    .ft-nl-input::placeholder{color:var(--muted2)}
    .ft-nl-input:focus{border-color:var(--gold)}
    .ft-nl-btn{
      background:var(--gold);color:var(--navy2);border:none;cursor:pointer;
      font-size:8.5px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;
      padding:11px 20px;font-family:var(--sans);
      transition:background .25s;white-space:nowrap;
    }
    .ft-nl-btn:hover{background:var(--ivory3)}
    .ft-pay{display:flex;align-items:center;gap:8px;justify-content:flex-end;flex-wrap:wrap}
    .pay-badge{
      border:1px solid var(--line2);padding:6px 12px;
      font-size:8.5px;font-weight:300;letter-spacing:.14em;
      text-transform:uppercase;color:var(--muted);
      font-family:var(--sans);
    }
    .ft-bottom{
      padding:20px 56px;
      display:flex;align-items:center;justify-content:space-between;
      flex-wrap:wrap;gap:12px;
    }
    .ft-copy{font-size:10px;font-weight:300;letter-spacing:.12em;color:rgba(242,237,228,.2)}
    .ft-legal{display:flex;gap:24px}
    .ft-leg-a{font-size:10px;font-weight:300;color:rgba(242,237,228,.2);text-decoration:none;cursor:pointer;transition:color .25s}
    .ft-leg-a:hover{color:var(--muted)}
    .back-top{
      width:36px;height:36px;border:1px solid var(--line2);
      background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;
      color:var(--muted);transition:all .25s;
    }
    .back-top:hover{border-color:var(--gold);color:var(--gold)}

    @media(max-width:1000px){
      .stats-row{grid-template-columns:repeat(2,1fr)}
      .story{grid-template-columns:1fr}
      .story-right{height:420px}
      .team-grid{grid-template-columns:repeat(2,1fr)}
      .addr-sec{grid-template-columns:1fr}
      .addr-right{height:320px}
      .ft-top{grid-template-columns:1fr 1fr}
      .ft-mid{grid-template-columns:1fr}
    }
    @media(max-width:640px){
      .ab-hero-content{padding:0 24px 36px;flex-direction:column;gap:12px}
      .stats-row{grid-template-columns:1fr 1fr}
      .stat-cell{padding:28px 24px}
      .story-left,.team-sec,.timeline-sec,.addr-left,.ft-top,.ft-mid,.ft-bottom{padding-left:24px;padding-right:24px}
      .team-grid{grid-template-columns:repeat(2,1fr)}
      .ft-top{grid-template-columns:1fr}
      .ft-pay{justify-content:flex-start}
    }
  `}</style>
);

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("vis"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const ArrowUp = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
  </svg>
);
const MapPinI = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const PhoneI = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.62a16 16 0 006 6l1.94-1.94a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailI = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const TEAM = [
  { name:"Jahongir Raximov", role:"Asoschisi va Direktor", since:"2015 yildan", img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80", quote:"«Har bir kiyim — o'z hissiyotini aytib berishi kerak.»" },
  { name:"Dilnoza Yusupova", role:"Bosh Dizayner",         since:"2017 yildan", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", quote:"«Uslub — bu tilsiz muloqot shakli.»" },
  { name:"Bekzod Toshmatov",  role:"Savdo Menejeri",        since:"2018 yildan", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80", quote:"«Mijozning qoniqishi — bizning g'ururumiz.»" },
  { name:"Malika Hasanova",   role:"Brend Menejeri",         since:"2020 yildan", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80", quote:"«Brend — bu faqat logo emas, bu his-tuyg'u.»" },
];

const TIMELINE = [
  { year:"2015", event:"Do'konning ochilishi", desc:"Toshkent shahrida birinchi Raffini showroom ochildi. Boshlang'ich 50 ta mahsulot bilan kichik, ammo orzuli sayohat boshlandi." },
  { year:"2017", event:"Onlayn platforma",     desc:"raffini.uz veb-saytimiz ishga tushdi. Mijozlar endi uydan turib buyurtma bera olishdi — foydalanuvchilar soni 3 barobar oshdi." },
  { year:"2019", event:"2-chi Filial",          desc:"Yunusobod tumanida ikkinchi do'konimiz ochildi. Jamoa 12 nafar mutaxassisga yetdi." },
  { year:"2022", event:"Premium Brend",         desc:"Hugo Boss, Lacoste, Tommy Hilfiger bilan rasmiy hamkorlik shartnomasi imzolandi." },
  { year:"2024", event:"3000+ Mijoz",           desc:"Faol mijozlar soni 3 mingdan oshdi. Toshkent bo'ylab bepul yetkazib berish xizmati boshlandi." },
  { year:"2025", event:"Yangi Kolleksiya",      desc:"Bahor/Yoz 2025 kolleksiyasi — 500+ yangi mahsulot bilan eng katta yangilanishimiz." },
];

const HOURS = [
  { day:"Dushanba – Juma",  time:"09:00 – 20:00" },
  { day:"Shanba",           time:"10:00 – 19:00" },
  { day:"Yakshanba",        time:"Yopiq", closed:true },
];

const AboutHero = () => (
  <div className="ab-hero">
    <img className="ab-hero-img" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85" alt="Raffini showroom"/>
    <div className="ab-hero-content">
      <div>
        <div className="ab-eyebrow">Raffini Men's Collection — Biz haqimizda</div>
        <h1 className="ab-title">Uslub.<br />Sifat.<br />Ishonch.</h1>
      </div>
      <div className="ab-year-badge">
        <div className="ab-year-num">2015</div>
        <div className="ab-year-label">Tashkil etilgan yil</div>
      </div>
    </div>
  </div>
);

const Stats = () => (
  <div className="stats-row">
    {[
      { num:"10+",  label:"Yillik Tajriba",  desc:"2015 yildan beri erkaklar modasi sohasida ishlaymiz." },
      { num:"500+", label:"Mahsulot",         desc:"Hamma yo'nalish va uslublar uchun keng assortiment." },
      { num:"12",   label:"Premium Brend",    desc:"Hugo Boss, Lacoste, Armani va boshqalar." },
      { num:"3K+",  label:"Mamnun Mijoz",     desc:"Toshkent bo'ylab ishonchli hamkorlar." },
    ].map((s, i) => (
      <div key={i} className="stat-cell reveal" style={{ transitionDelay:`${i*0.1}s` }}>
        <div className="stat-num">{s.num}</div>
        <div className="stat-label">{s.label}</div>
        <div className="stat-desc">{s.desc}</div>
      </div>
    ))}
  </div>
);

const Story = () => (
  <div className="story">
    <div className="story-left reveal">
      <div>
        <div className="story-tag">Bizning Hikoyamiz</div>
        <h2 className="story-title">
          Sifatli kiyim —<br />
          <em>hayot sifatini</em><br />
          ko'taradi.
        </h2>
        <div className="story-body">
          <p>2015 yilda Toshkentda bitta showroom va katta orzu bilan boshlangan Raffini bugun O'zbekistoning eng ishonchli erkaklar kiyim brendlaridan biriga aylandi.</p>
          <p>Biz faqat kiyim sotmaymiz — biz har bir mijozga o'ziga to'g'ri uslub topishda yordam beramiz. Premium brendlar, sertifikatlangan mahsulotlar va professional konsultatsiya — barchasini bir joyda.</p>
        </div>
      </div>
      <div className="story-sign">
        <div className="sign-line" />
        <div>
          <div className="sign-name">Jahongir Raximov</div>
          <div className="sign-role">Asoschisi — Raffini</div>
        </div>
      </div>
    </div>
    <div className="story-right reveal" style={{ transitionDelay:".15s" }}>
      <img className="story-img" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=85" alt="Founder"/>
      <div className="story-img-tag">
        <div className="sit-label">Asoschisi</div>
        <div className="sit-text">Jahongir Raximov, 2015</div>
      </div>
    </div>
  </div>
);

const Team = () => (
  <section className="team-sec">
    <div className="team-hdr reveal">
      <div>
        <div className="team-eye">Jamoa</div>
        <h2 className="team-title">Bizning Jamoa</h2>
      </div>
      <p className="team-sub">Har biri o'z sohasining mutaxassisi — birgalikda biz eng yaxshi xizmatni taqdim etamiz.</p>
    </div>
    <div className="team-grid">
      {TEAM.map((m, i) => (
        <div key={i} className="team-card reveal" style={{ transitionDelay:`${i*0.08}s` }}>
          <div className="team-img-w">
            <img className="team-img" src={m.img} alt={m.name} loading="lazy"/>
            <div className="team-overlay"/>
            <div className="team-info">
              <div className="team-role">{m.role}</div>
              <div className="team-name">{m.name}</div>
              <div className="team-since">{m.since}</div>
            </div>
          </div>
          <div className="team-detail">
            <div className="td-quote">{m.quote}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Timeline = () => (
  <section className="timeline-sec">
    <div className="tl-hdr reveal">
      <div className="tl-eye">Tarix</div>
      <h2 className="tl-title">10 Yillik Yo'limiz</h2>
    </div>
    <div className="tl-list">
      <div className="tl-line"/>
      {TIMELINE.map((t, i) => (
        <div key={i} className="tl-item reveal" style={{ transitionDelay:`${i*0.1}s` }}>
          <div className="tl-year">{t.year}</div>
          <div className="tl-dot"/>
          <div className="tl-content">
            <div className="tl-event">{t.event}</div>
            <div className="tl-desc">{t.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Address = () => (
  <div className="addr-sec">
    <div className="addr-left reveal">
      <div>
        <div className="addr-tag">Manzil va Aloqa</div>
        <h2 className="addr-title">Bizni Toping</h2>
        <div className="addr-blocks">
          <div>
            <div className="ab-label"><MapPinI/>&nbsp;Manzil</div>
            <div className="ab-val">
              Toshkent sh., Yunusobod tumani,<br/>
              Amir Temur shoh ko'chasi, 15-uy<br/>
              <span style={{fontSize:11,color:"var(--muted2)"}}>Metro: Yunusobod (5 daqiqa)</span>
            </div>
          </div>
          <div>
            <div className="ab-label"><PhoneI/>&nbsp;Telefon</div>
            <div className="ab-val">
              <a href="tel:+998971234567">+998 97 123 45 67</a><br/>
              <a href="tel:+998711234567">+998 71 123 45 67</a>
            </div>
          </div>
          <div>
            <div className="ab-label"><MailI/>&nbsp;Email</div>
            <div className="ab-val">
              <a href="mailto:info@raffini.uz">info@raffini.uz</a><br/>
              <a href="mailto:order@raffini.uz">order@raffini.uz</a>
            </div>
          </div>
        </div>
      </div>
      <div className="addr-hours">
        <div className="ab-label" style={{marginBottom:14}}>Ish Vaqti</div>
        {HOURS.map((h, i) => (
          <div key={i} className="hours-row">
            <span className="hours-day">{h.day}</span>
            <span className={`hours-time${h.closed?" hours-closed":""}`}>{h.time}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="addr-right reveal" style={{transitionDelay:".1s"}}>
      <iframe
        className="map-frame"
        src="https://www.openstreetmap.org/export/embed.html?bbox=69.22%2C41.32%2C69.38%2C41.38&layer=mapnik&marker=41.3505%2C69.2892"
        title="Raffini manzili"
        loading="lazy"
      />
      <div className="map-pin">
        <div className="map-pin-dot"/>
        <div className="map-pin-stem"/>
        <div className="map-label">Raffini</div>
      </div>
    </div>
  </div>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const handleSub = () => {
    if (!email.includes("@")) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setEmail("");
  };
  return (
    <footer className="footer">
      <div className="ft-top">
        <div>
          <div className="ft-brand-name">Raffini</div>
          <div className="ft-brand-sub">Men's Collection</div>
          <p className="ft-desc">Toshkentdagi premium erkaklar kiyim do'koni. 2015 yildan beri uslub va sifatda ishonchli hamkoringiz.</p>
          <div className="ft-socials">
            {["TG","IG","FB","YT"].map(s => <div key={s} className="soc">{s}</div>)}
          </div>
        </div>
        <div>
          <div className="ft-col-title">Xizmatlar</div>
          {["Kolleksiyalar","Yangi Kelganlar","Aksiyalar","Brendlar","Sovg'a Kartasi"].map(l => <a key={l} className="ft-link">{l}</a>)}
        </div>
        <div>
          <div className="ft-col-title">Kompaniya</div>
          {["Biz Haqimizda","Jamoa","Karyera","Yangiliklar","Hamkorlik"].map(l => <a key={l} className="ft-link">{l}</a>)}
        </div>
        <div>
          <div className="ft-col-title">Yordam</div>
          {["Savol-Javob","Yetkazib Berish","Qaytarish","O'lcham Jadvali","Bog'lanish"].map(l => <a key={l} className="ft-link">{l}</a>)}
        </div>
      </div>
      <div className="ft-mid">
        <div>
          <div className="ft-nl-title">Yangiliklar va Aksiyalarga Obuna Bo'ling</div>
          <div className="ft-nl-row">
            <input
              className="ft-nl-input"
              type="email"
              placeholder="email@manzil.uz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key==="Enter"&&handleSub()}
            />
            <button className="ft-nl-btn" onClick={handleSub}>{sent?"✓ Yuborildi":"Obuna"}</button>
          </div>
        </div>
        <div className="ft-pay">
          {["UZCARD","HUMO","VISA","Click","Payme"].map(p => <div key={p} className="pay-badge">{p}</div>)}
        </div>
      </div>
      <div className="ft-bottom">
        <div className="ft-copy">© 2015 – 2025 Raffini Men's Collection. Barcha huquqlar himoyalangan.</div>
        <div className="ft-legal">
          {["Maxfiylik Siyosati","Foydalanish Shartlari","Cookie"].map(l => <a key={l} className="ft-leg-a">{l}</a>)}
        </div>
        <button className="back-top" onClick={() => window.scrollTo({top:0,behavior:"smooth"})}><ArrowUp/></button>
      </div>
    </footer>
  );
};

const FouterPage = () => {
  useReveal();
  return (
    <>
      <G/>
      <AboutHero/>
      <Stats/>
      <Story/>
      <Team/>
      <Timeline/>
      <Address/>
      <Footer/>
    </>
  );
};

export default FouterPage;