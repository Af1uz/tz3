import { useState, useEffect, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:   #0D1B2E;
      --navy2:  #0A1624;
      --navy3:  #091420;
      --navy4:  #112239;
      --ivory:  #F2EDE4;
      --ivory2: #E8E0D4;
      --ivory3: #DDD5C8;
      --gold:   #C9A96E;
      --gold2:  #A8854A;
      --gold3:  #E8C990;
      --muted:  rgba(242,237,228,.40);
      --muted2: rgba(242,237,228,.18);
      --line:   rgba(242,237,228,.09);
      --line2:  rgba(242,237,228,.16);
      --serif: 'Cormorant Garamond', Georgia, serif;
      --sans:  'Montserrat', sans-serif;
    }

    html { scroll-behavior: smooth; }
    html, body, #root {
      font-family: var(--sans);
      background: var(--navy);
      color: var(--ivory);
      overflow-x: hidden;
      margin: 0; padding: 0;
    }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-thumb { background: var(--gold); }

    /* ── SCROLL PROGRESS ── */
    .sp {
      position: fixed; top: 0; left: 0; height: 2px;
      background: linear-gradient(90deg, var(--gold), var(--ivory));
      z-index: 9999; transition: width .1s linear;
      pointer-events: none;
    }

    /* ── ANNOUNCEMENT ── */
    .ann {
      background: var(--navy2);
      border-bottom: 1px solid var(--line);
      text-align: center; padding: 10px 20px;
      font-size: 9px; font-weight: 400;
      letter-spacing: .32em; text-transform: uppercase;
      color: var(--muted);
    }
    .ann b { color: var(--gold); font-weight: 600; }

    /* ── HEADER ── */
    .hdr {
      position: fixed; left: 0; right: 0; top: 33px; z-index: 500;
      height: 66px;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 56px;
      background: rgba(9,20,32,.97);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--line);
      transition: top .4s ease, transform .5s cubic-bezier(.4,0,.2,1);
    }
    .hdr.sc { top: 0; }
    .hdr.dn { transform: translateY(-115%); }

    .logo {
      display: flex; align-items: center; gap: 13px;
      text-decoration: none;
    }
    .logo-bar {
      width: 1px; height: 30px;
      background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
      flex-shrink: 0;
    }
    .logo-nm {
      font-family: var(--serif);
      font-size: 21px; font-weight: 500;
      letter-spacing: .22em; text-transform: uppercase;
      color: var(--ivory); line-height: 1; display: block;
    }
    .logo-sub {
      font-size: 7px; font-weight: 500;
      letter-spacing: .52em; text-transform: uppercase;
      color: var(--gold); opacity: .80;
      margin-top: 2px; display: block;
    }

    .nav { display: flex; align-items: center; gap: 36px; }
    .na {
      font-size: 9px; font-weight: 400;
      letter-spacing: .22em; text-transform: uppercase;
      color: var(--muted); text-decoration: none;
      position: relative; padding-bottom: 3px;
      transition: color .25s;
    }
    .na::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 1px; background: var(--gold);
      transition: width .32s cubic-bezier(.4,0,.2,1);
    }
    .na:hover { color: var(--ivory); }
    .na:hover::after { width: 100%; }

    .ib {
      background: none; border: none; cursor: pointer;
      padding: 7px; color: var(--muted);
      display: flex; align-items: center;
      transition: color .25s;
    }
    .ib:hover { color: var(--ivory); }
    .cw { position: relative; }
    .cbadge {
      position: absolute; top: 1px; right: 1px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--gold); color: var(--navy2);
      font-size: 7.5px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .brg { display: none; }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      padding-top: 99px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
      background: var(--navy);
    }

    .hl {
      background: var(--navy2);
      display: flex; flex-direction: column; justify-content: center;
      padding: 80px 64px 80px 56px;
      position: relative; overflow: hidden;
    }
    .hl::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(ellipse 550px 450px at -80px 85%,
          rgba(201,169,110,.07) 0%, transparent 65%),
        radial-gradient(ellipse 400px 350px at 105% 5%,
          rgba(201,169,110,.04) 0%, transparent 60%);
    }

    .h-tag {
      display: inline-flex; align-items: center; gap: 11px;
      margin-bottom: 30px;
      opacity: 0; animation: slideUp .7s .10s ease forwards;
    }
    .h-tag-bar { width: 24px; height: 1px; background: var(--gold); }
    .h-tag-t {
      font-size: 9px; font-weight: 500;
      letter-spacing: .46em; text-transform: uppercase;
      color: var(--gold);
    }

    .h-ttl {
      font-family: var(--serif);
      font-size: clamp(46px, 5.2vw, 80px);
      font-weight: 400; line-height: 1.05;
      color: var(--ivory); margin-bottom: 26px;
      opacity: 0; animation: slideUp .9s .24s ease forwards;
    }
    .h-ttl em { font-style: italic; color: var(--gold); }

    .h-desc {
      font-size: 12.5px; font-weight: 300; line-height: 1.95;
      color: var(--muted); max-width: 330px;
      margin-bottom: 44px;
      opacity: 0; animation: slideUp .9s .38s ease forwards;
    }

    .h-btns {
      display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
      opacity: 0; animation: slideUp .9s .52s ease forwards;
    }
    .btn-p {
      font-family: var(--sans);
      font-size: 9px; font-weight: 600;
      letter-spacing: .26em; text-transform: uppercase;
      padding: 13px 30px;
      background: var(--gold); color: var(--navy2);
      border: 1px solid var(--gold); cursor: pointer;
      transition: background .28s, color .28s, transform .2s, box-shadow .28s;
    }
    .btn-p:hover {
      background: var(--ivory); border-color: var(--ivory);
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(201,169,110,.22);
    }
    .btn-n {
      font-family: var(--sans);
      font-size: 9px; font-weight: 400;
      letter-spacing: .22em; text-transform: uppercase;
      padding: 12px 28px;
      background: transparent; color: var(--muted);
      border: 1px solid var(--line2); cursor: pointer;
      transition: border-color .25s, color .25s;
    }
    .btn-n:hover { border-color: var(--ivory2); color: var(--ivory); }

    .h-stats {
      display: flex; gap: 0;
      margin-top: 52px; padding-top: 28px;
      border-top: 1px solid var(--line);
      opacity: 0; animation: slideUp .9s .66s ease forwards;
    }
    .hst {
      flex: 1; padding-right: 22px; margin-right: 22px;
      border-right: 1px solid var(--line);
    }
    .hst:last-child { border: none; padding: 0; margin: 0; }
    .hst-n {
      font-family: var(--serif);
      font-size: 32px; font-weight: 400;
      color: var(--ivory); line-height: 1; margin-bottom: 5px;
    }
    .hst-n em { color: var(--gold); font-style: normal; }
    .hst-l {
      font-size: 8px; font-weight: 400;
      letter-spacing: .28em; text-transform: uppercase;
      color: var(--muted);
    }

    .hr {
      position: relative; overflow: hidden;
      background: var(--navy3);
      display: flex; flex-direction: column;
    }
    .hr-sw { flex: 1; position: relative; overflow: hidden; min-height: 0; }
    .hr-sl {
      position: absolute; inset: 0;
      opacity: 0; transition: opacity 1.1s ease;
    }
    .hr-sl.on { opacity: 1; }
    .hr-img {
      width: 100%; height: 100%;
      object-fit: cover; object-position: center 20%;
      filter: brightness(.44) saturate(.55);
      display: block;
    }
    .hr-ov {
      position: absolute; inset: 0;
      background: linear-gradient(
        148deg,
        rgba(9,20,32,.78) 0%,
        rgba(9,20,32,.22) 48%,
        rgba(9,20,32,.62) 100%
      );
    }
    .hr-frame {
      position: absolute; inset: 22px;
      border: 1px solid rgba(201,169,110,.13);
      pointer-events: none;
    }
    .hr-frame::before, .hr-frame::after {
      content: ''; position: absolute;
      width: 14px; height: 14px;
    }
    .hr-frame::before {
      top: -1px; left: -1px;
      border-top: 1px solid var(--gold);
      border-left: 1px solid var(--gold);
    }
    .hr-frame::after {
      bottom: -1px; right: -1px;
      border-bottom: 1px solid var(--gold);
      border-right: 1px solid var(--gold);
    }

    .hfc {
      position: absolute;
      background: rgba(9,20,32,.93);
      backdrop-filter: blur(12px);
      border-left: 2px solid var(--gold);
      padding: 14px 18px;
    }
    .hfc.c1 {
      bottom: 36px; left: 28px;
      opacity: 0; animation: slideUp .8s .96s ease forwards;
    }
    .hfc-l {
      font-size: 8px; font-weight: 500;
      letter-spacing: .30em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 4px;
    }
    .hfc-v {
      font-family: var(--serif);
      font-size: 18px; font-weight: 400;
      color: var(--ivory); line-height: 1.15;
    }
    .hfc-s {
      font-size: 10.5px; font-weight: 300;
      color: var(--muted); margin-top: 2px;
    }

    .hdots {
      position: absolute; right: 16px; top: 50%;
      transform: translateY(-50%);
      display: flex; flex-direction: column; gap: 7px;
      opacity: 0; animation: fadeIn .6s 1.1s ease forwards;
    }
    .hdot {
      width: 4px; height: 4px; border-radius: 50%;
      background: rgba(242,237,228,.20);
      cursor: pointer;
      transition: background .3s, height .3s, border-radius .3s;
    }
    .hdot.on {
      background: var(--gold);
      height: 14px; border-radius: 2px;
    }

    .hr-strip {
      background: var(--gold);
      padding: 16px 28px;
      display: flex; align-items: center;
      justify-content: space-between; gap: 8px;
      flex-shrink: 0;
    }
    .hss { flex: 1; }
    .hss-l {
      font-size: 7.5px; font-weight: 500;
      letter-spacing: .26em; text-transform: uppercase;
      color: rgba(9,20,32,.50); margin-bottom: 2px;
    }
    .hss-v {
      font-size: 13px; font-weight: 700;
      color: var(--navy2); font-family: var(--sans);
    }
    .hss-div { width: 1px; height: 28px; background: rgba(9,20,32,.14); flex-shrink: 0; }

    /* ── CATEGORIES ── */
    .cats {
      padding: 72px 56px;
      background: var(--navy);
      border-top: 1px solid var(--line);
    }
    .sec-hd {
      display: flex; align-items: flex-end; justify-content: space-between;
      margin-bottom: 36px;
    }
    .sec-eye {
      font-size: 9px; font-weight: 500;
      letter-spacing: .44em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 10px;
      display: flex; align-items: center; gap: 11px;
    }
    .sec-eye::before {
      content: ''; display: block;
      width: 20px; height: 1px; background: var(--gold);
    }
    .sec-ttl {
      font-family: var(--serif);
      font-size: clamp(24px, 3vw, 40px);
      font-weight: 400; color: var(--ivory); line-height: 1.1;
    }
    .sec-lnk {
      font-size: 9px; font-weight: 400;
      letter-spacing: .24em; text-transform: uppercase;
      color: var(--muted); text-decoration: none;
      position: relative; padding-bottom: 3px;
      transition: color .25s;
    }
    .sec-lnk::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 0; height: 1px; background: var(--gold);
      transition: width .32s;
    }
    .sec-lnk:hover { color: var(--ivory); }
    .sec-lnk:hover::after { width: 100%; }

    .cat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; }
    .cat-c {
      position: relative; overflow: hidden;
      aspect-ratio: 3/4; cursor: pointer; background: var(--navy3);
    }
    .cat-c img {
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(.48) saturate(.52);
      transition: transform .7s cubic-bezier(.4,0,.2,1), filter .35s;
    }
    .cat-c:hover img { transform: scale(1.07); filter: brightness(.36) saturate(.42); }
    .cat-scan {
      position: absolute; top: 0; left: 0; right: 0;
      height: 1px; background: var(--gold);
      transform: scaleX(0); transform-origin: left;
      transition: transform .44s cubic-bezier(.4,0,.2,1);
      z-index: 2;
    }
    .cat-c:hover .cat-scan { transform: scaleX(1); }
    .cat-info {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 18px 16px;
      background: linear-gradient(to top, rgba(9,20,32,.82) 0%, transparent 100%);
    }
    .cat-sub {
      font-size: 8px; font-weight: 400;
      letter-spacing: .34em; text-transform: uppercase;
      color: rgba(201,169,110,.72); margin-bottom: 3px;
    }
    .cat-nm {
      font-family: var(--serif);
      font-size: 20px; font-weight: 400;
      color: var(--ivory); letter-spacing: .02em;
    }
    .cat-cnt {
      font-size: 9px; font-weight: 300;
      color: rgba(242,237,228,.44); margin-top: 2px;
    }

    /* ── FEATURED ── */
    .feat {
      background: var(--navy2);
      border-top: 1px solid var(--line);
      padding: 64px 56px;
    }
    .feat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; }
    .feat-c {
      background: var(--navy4);
      padding: 26px;
      display: flex; align-items: flex-start; gap: 18px;
      cursor: pointer; position: relative; overflow: hidden;
      transition: background .28s;
    }
    .feat-c:hover { background: #152D48; }
    .feat-bar {
      position: absolute; top: 0; left: 0; right: 0;
      height: 1px; background: var(--gold);
      transform: scaleX(0); transform-origin: left;
      transition: transform .42s cubic-bezier(.4,0,.2,1);
    }
    .feat-c:hover .feat-bar { transform: scaleX(1); }
    .feat-iw { width: 70px; height: 95px; overflow: hidden; flex-shrink: 0; }
    .feat-img {
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(.62) saturate(.52);
      transition: transform .5s, filter .3s;
    }
    .feat-c:hover .feat-img { transform: scale(1.06); filter: brightness(.52) saturate(.46); }
    .feat-d { flex: 1; }
    .feat-brand {
      font-size: 8px; font-weight: 500;
      letter-spacing: .30em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 5px; opacity: .8;
    }
    .feat-nm {
      font-family: var(--serif);
      font-size: 16px; font-weight: 400;
      color: var(--ivory); margin-bottom: 5px; line-height: 1.2;
    }
    .feat-price { font-size: 13px; font-weight: 300; color: var(--muted); }
    .feat-old {
      font-size: 10px; font-weight: 300;
      color: rgba(242,237,228,.22); text-decoration: line-through;
      letter-spacing: .08em; margin-top: 4px;
    }

    /* ── TRIO ── */
    .trio { display: grid; grid-template-columns: repeat(3,1fr); }
    .trio-c { padding: 44px 48px; position: relative; }
    .trio-c.t1 { background: var(--navy2); border-right: 1px solid var(--line); }
    .trio-c.t2 { background: var(--ivory); border-right: 1px solid rgba(9,20,32,.08); }
    .trio-c.t3 { background: var(--navy3); }
    .trio-c::before {
      content: ''; position: absolute;
      top: 0; left: 0; width: 0; height: 2px;
      background: var(--gold);
      transition: width .5s .1s cubic-bezier(.4,0,.2,1);
    }
    .trio-c:hover::before { width: 100%; }
    .trio-ico { margin-bottom: 18px; }
    .trio-ttl {
      font-family: var(--serif);
      font-size: 20px; font-weight: 500;
      margin-bottom: 10px; line-height: 1.2;
    }
    .trio-c.t1 .trio-ttl, .trio-c.t3 .trio-ttl { color: var(--ivory); }
    .trio-c.t2 .trio-ttl { color: var(--navy); }
    .trio-txt { font-size: 12.5px; font-weight: 300; line-height: 1.9; }
    .trio-c.t1 .trio-txt, .trio-c.t3 .trio-txt { color: var(--muted); }
    .trio-c.t2 .trio-txt { color: rgba(9,20,32,.52); }
    .trio-c.t1 .trio-ico, .trio-c.t3 .trio-ico { color: var(--gold); }
    .trio-c.t2 .trio-ico { color: var(--navy); }

    /* ── KEYFRAMES ── */
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      .nav { display: none; }
      .brg { display: flex; }
      .hdr { padding: 0 24px; }
      .hero { grid-template-columns: 1fr; }
      .hr-sw { height: 52vh; }
      .hr { min-height: 0; }
      .hl { padding: 52px 24px; }
      .cats, .feat { padding: 52px 24px; }
      .cat-grid { grid-template-columns: repeat(2,1fr); }
      .feat-grid { grid-template-columns: 1fr 1fr; }
      .trio { grid-template-columns: 1fr; }
      .trio-c { border-right: none !important; border-bottom: 1px solid var(--line); }
    }
    @media (max-width: 560px) {
      .feat-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

const IcSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
  </svg>
);
const IcCart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IcUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IcMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="16" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IcStar = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IcBox = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>
);
const IcShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const SP = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setW(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="sp" style={{ width: `${w}%` }} />;
};

const Header = () => {
  const [sc, setSc] = useState(false);
  const [dn, setDn] = useState(false);
  const ly = useRef(0);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSc(y > 12);
      if (y > 80) {
        if (y > ly.current + 8) setDn(true);
        else if (y < ly.current - 8) setDn(false);
      } else setDn(false);
      ly.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`hdr${sc ? " sc" : ""}${dn ? " dn" : ""}`}>
      <a href="#" className="logo">
        <div className="logo-bar" />
        <div>
          <span className="logo-nm">Raffini</span>
          <span className="logo-sub">Men's Collection</span>
        </div>
      </a>
      <nav className="nav">
        {["Yangi", "Kolekciya", "Brendlar", "Aksiya", "Biz haqimizda"].map(l => (
          <a key={l} href="#" className="na">{l}</a>
        ))}
      </nav>
      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
        <button className="ib"><IcSearch /></button>
        <button className="ib"><IcUser /></button>
        <div className="cw">
          <button className="ib"><IcCart /></button>
          <span className="cbadge">3</span>
        </div>
        <button className="ib brg"><IcMenu /></button>
      </div>
    </header>
  );
};

const SLIDES = [
  { img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1400&q=88", lbl:"Yangi Kolleksiya", nm:"Premium Paltolar",     pr:"890 000 so'm dan" },
  { img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1400&q=88", lbl:"Biznes Uslubi",    nm:"Klassik Kostyumlar",   pr:"1 250 000 so'm dan" },
  { img:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1400&q=88", lbl:"Casual Collection", nm:"Kundalik Kiyimlar",    pr:"350 000 so'm dan" },
];

const Hero = () => {
  const [sl, setSl] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSl(p => (p + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      <div className="hl">
        <div className="h-tag">
          <div className="h-tag-bar" />
          <span className="h-tag-t">Bahor / Yoz — 2025</span>
        </div>
        <h1 className="h-ttl">
          Zamonaviy<br /><em>Erkaklar</em><br />Uslubi
        </h1>
        <p className="h-desc">
          Premium sifat, mukammal kesim. Har bir kiyim — o'zingizni ifodalash uchun yaratilgan.
          Toshkentning eng yaxshi erkaklar kiyim do'koniga xush kelibsiz.
        </p>
        <div className="h-btns">
          <button className="btn-p">Kolleksiyani Ko'rish</button>
          <button className="btn-n">Yangiliklar →</button>
        </div>
        <div className="h-stats">
          {[["500", "+", "Mahsulot"], ["12", "", "Brend"], ["3K", "+", "Mijoz"]].map(([n, s, l]) => (
            <div key={l} className="hst">
              <div className="hst-n">{n}<em>{s}</em></div>
              <div className="hst-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hr">
        <div className="hr-sw">
          {SLIDES.map((s, i) => (
            <div key={i} className={`hr-sl${sl === i ? " on" : ""}`}>
              <img className="hr-img" src={s.img} alt={s.nm} />
            </div>
          ))}
          <div className="hr-ov" />
          <div className="hr-frame" />
          <div className="hfc c1">
            <div className="hfc-l">{SLIDES[sl].lbl}</div>
            <div className="hfc-v">{SLIDES[sl].nm}</div>
            <div className="hfc-s">{SLIDES[sl].pr}</div>
          </div>
          <div className="hdots">
            {SLIDES.map((_, i) => (
              <div key={i} className={`hdot${sl === i ? " on" : ""}`} onClick={() => setSl(i)} />
            ))}
          </div>
        </div>
        <div className="hr-strip">
          <div className="hss"><div className="hss-l">Yangi Keldi</div><div className="hss-v">Bahor 2025</div></div>
          <div className="hss-div" />
          <div className="hss"><div className="hss-l">Chegirma</div><div className="hss-v">−30% gacha</div></div>
          <div className="hss-div" />
          <div className="hss"><div className="hss-l">Yetkazib berish</div><div className="hss-v">Bepul · 1-3 kun</div></div>
        </div>
      </div>
    </section>
  );
};

const CATS = [
  { img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4685?w=800&q=82", nm:"Kostyumlar",      sub:"Formal",     cnt:"48 ta mahsulot" },
  { img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=82", nm:"Kurtka & Palto", sub:"Outerwear",   cnt:"36 ta mahsulot" },
  { img:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=82", nm:"Ko'ylaklar",     sub:"Shirts",      cnt:"94 ta mahsulot" },
  { img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=82",    nm:"Shimlar",        sub:"Trousers",    cnt:"62 ta mahsulot" },
];

const Categories = () => (
  <section className="cats">
    <div className="sec-hd">
      <div>
        <div className="sec-eye">Kategoriyalar</div>
        <h2 className="sec-ttl">Kolekciyamiz</h2>
      </div>
      <a href="#" className="sec-lnk">Hammasini Ko'rish →</a>
    </div>
    <div className="cat-grid">
      {CATS.map(c => (
        <div key={c.nm} className="cat-c">
          <div className="cat-scan" />
          <img src={c.img} alt={c.nm} loading="lazy" />
          <div className="cat-info">
            <div className="cat-sub">{c.sub}</div>
            <div className="cat-nm">{c.nm}</div>
            <div className="cat-cnt">{c.cnt}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const FEATURED = [
  { img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=82", brand:"Hugo Boss",  nm:"Slim Fit Kostyum",  price:"2 490 000 so'm", old:"3 100 000 so'm" },
  { img:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=82",    brand:"Zara Man",   nm:"Casual Kurtka",     price:"890 000 so'm",   old:"" },
  { img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=82", brand:"Reserved",   nm:"Oxford Ko'ylak",    price:"450 000 so'm",   old:"580 000 so'm" },
];

const Featured = () => (
  <section className="feat">
    <div className="sec-hd" style={{ marginBottom: 32 }}>
      <div>
        <div className="sec-eye">Ommabop</div>
        <h2 className="sec-ttl">Eng Ko'p Sotilganlar</h2>
      </div>
      <a href="#" className="sec-lnk">Barchasi →</a>
    </div>
    <div className="feat-grid">
      {FEATURED.map(f => (
        <div key={f.nm} className="feat-c">
          <div className="feat-bar" />
          <div className="feat-iw">
            <img className="feat-img" src={f.img} alt={f.nm} loading="lazy" />
          </div>
          <div className="feat-d">
            <div className="feat-brand">{f.brand}</div>
            <div className="feat-nm">{f.nm}</div>
            <div className="feat-price">{f.price}</div>
            {f.old && <div className="feat-old">{f.old}</div>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Trio = () => (
  <div className="trio">
    {[
      { cls:"t1", ico:<IcStar />,   ttl:"Premium Sifat",   txt:"Barcha mahsulotlar asl brend sertifikatiga ega. 100% original kafolat bilan." },
      { cls:"t2", ico:<IcBox />,    ttl:"Bepul Yetkazish", txt:"Toshkent bo'ylab 100 000 so'mdan yuqori xaridda bepul yetkazib beramiz. 1–3 kun." },
      { cls:"t3", ico:<IcShield />, ttl:"Qaytarish Kafolat", txt:"Xaridingizdan norozi bo'lsangiz, 14 kun ichida to'liq qaytarish imkoniyati." },
    ].map((t, i) => (
      <div key={i} className={`trio-c ${t.cls}`}>
        <div className="trio-ico">{t.ico}</div>
        <div className="trio-ttl">{t.ttl}</div>
        <div className="trio-txt">{t.txt}</div>
      </div>
    ))}
  </div>
);

const InfoPage = () => (
  <>
    <G />
    <SP />
    <div className="ann">
      🚚 &nbsp; 100 000 so'mdan yuqori xaridlarda &nbsp;<b>bepul yetkazib berish</b>&nbsp; · &nbsp;Toshkent bo'ylab 1–3 kun
    </div>
    <Header />
    <Hero />
    <Categories />
    <Featured />
    <Trio />
  </>
);

export default InfoPage;