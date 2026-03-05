import { useState, useEffect, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --w:#F8F8F6;--g1:#EFEFED;--g2:#DCDCDA;--g4:#ADADAB;
      --g6:#6B6B69;--g8:#3A3A38;--ch:#1C1C1A;--bk:#111110;
    }
    html,body{background:var(--w);color:var(--ch);font-family:'Jost',sans-serif;overflow-x:hidden;scroll-behavior:smooth}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--g1)}::-webkit-scrollbar-thumb{background:var(--g4)}

    .sp{position:fixed;top:0;left:0;height:2px;background:var(--ch);z-index:999;transition:width .1s linear}

    .ann{background:var(--ch);color:var(--g2);font-size:9px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;text-align:center;padding:10px 0}

    .hdr{
      position:fixed;top:32px;left:0;right:0;z-index:100;
      padding:0 52px;height:64px;
      display:flex;align-items:center;justify-content:space-between;
      transition:background .4s ease,border-color .4s ease,transform .5s cubic-bezier(.16,1,.3,1),top .4s ease;
      border-bottom:1px solid transparent;
    }
    .hdr.sc{background:rgba(248,248,246,.9);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-color:var(--g2);top:0}
    .hdr.hd{transform:translateY(-110%)}

    .logo-w{text-decoration:none}
    .logo-n{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:400;letter-spacing:.14em;color:var(--ch);display:block}
    .logo-s{font-family:'Jost',sans-serif;font-size:7px;font-weight:300;letter-spacing:.46em;text-transform:uppercase;color:var(--g6);margin-top:-1px;display:block}

    .nav{display:flex;align-items:center;gap:34px}
    .na{font-size:9.5px;font-weight:300;letter-spacing:.22em;text-transform:uppercase;color:var(--g6);text-decoration:none;position:relative;padding-bottom:2px;transition:color .3s}
    .na::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--ch);transition:width .35s cubic-bezier(.16,1,.3,1)}
    .na:hover{color:var(--ch)}.na:hover::after{width:100%}

    .ib{background:none;border:none;cursor:pointer;padding:6px;color:var(--g6);transition:color .25s;display:flex;align-items:center}
    .ib:hover{color:var(--ch)}
    .cw{position:relative}
    .cbg{position:absolute;top:2px;right:2px;width:14px;height:14px;background:var(--ch);border-radius:50%;font-size:7.5px;font-weight:500;color:var(--w);display:flex;align-items:center;justify-content:center}

    /* HERO */
    .hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;padding-top:96px;overflow:hidden}
    .hl{display:flex;flex-direction:column;justify-content:center;padding:72px 60px 72px 52px;position:relative}
    .h-season{font-size:8px;font-weight:300;letter-spacing:.44em;text-transform:uppercase;color:var(--g4);margin-bottom:28px;opacity:0;animation:fu .8s .15s cubic-bezier(.16,1,.3,1) forwards}
    .h-title{font-family:'Cormorant Garamond',serif;font-size:clamp(48px,5.5vw,82px);font-weight:300;line-height:1.06;letter-spacing:-.01em;color:var(--ch);margin-bottom:24px;opacity:0;animation:fu .9s .3s cubic-bezier(.16,1,.3,1) forwards}
    .h-title em{font-style:italic;color:var(--g6)}
    .h-desc{font-size:13px;font-weight:300;line-height:1.85;color:var(--g6);max-width:310px;margin-bottom:44px;opacity:0;animation:fu .9s .46s cubic-bezier(.16,1,.3,1) forwards}
    .cg{display:flex;align-items:center;gap:26px;opacity:0;animation:fu .9s .6s cubic-bezier(.16,1,.3,1) forwards}
    .bp{display:inline-flex;align-items:center;gap:8px;background:var(--ch);color:var(--w);font-family:'Jost',sans-serif;font-size:9px;font-weight:400;letter-spacing:.28em;text-transform:uppercase;text-decoration:none;padding:13px 26px;border:1px solid var(--ch);transition:background .35s,color .35s;cursor:pointer}
    .bp:hover{background:transparent;color:var(--ch)}
    .bg{font-size:9px;font-weight:300;letter-spacing:.22em;text-transform:uppercase;color:var(--g6);text-decoration:none;position:relative;padding-bottom:2px;transition:color .3s}
    .bg::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--g6);transition:width .35s cubic-bezier(.16,1,.3,1)}
    .bg:hover::after{width:100%}
    .hmet{display:flex;gap:36px;margin-top:56px;padding-top:28px;border-top:1px solid var(--g2);opacity:0;animation:fu .9s .76s cubic-bezier(.16,1,.3,1) forwards}
    .mn{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;color:var(--ch);line-height:1;margin-bottom:3px}
    .ml{font-size:8px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;color:var(--g4)}

    .hr{position:relative;background:var(--g1);overflow:hidden}
    .hi{width:100%;height:100%;object-fit:cover;opacity:0;animation:ir 1.2s .35s cubic-bezier(.16,1,.3,1) forwards;transform:scale(1.05)}
    @keyframes ir{to{opacity:1;transform:scale(1)}}
    .htag{position:absolute;bottom:32px;left:32px;background:rgba(248,248,246,.94);backdrop-filter:blur(8px);padding:13px 18px;opacity:0;animation:fu .8s .95s cubic-bezier(.16,1,.3,1) forwards}
    .htl{font-size:8px;font-weight:300;letter-spacing:.34em;text-transform:uppercase;color:var(--g6);margin-bottom:3px}
    .htn{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:400;color:var(--ch)}
    .htp{font-size:11px;font-weight:300;color:var(--g6);margin-top:2px}
    .hidx{position:absolute;right:18px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;opacity:0;animation:fu .8s 1.05s cubic-bezier(.16,1,.3,1) forwards}
    .hd_{width:5px;height:5px;border-radius:50%;background:var(--g4);cursor:pointer;transition:background .3s,transform .3s}
    .hd_.ac{background:var(--ch);transform:scale(1.45)}

    /* CATEGORIES */
    .cs{padding:60px 52px;border-top:1px solid var(--g2)}
    .ch_{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:36px}
    .ct{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:300;color:var(--ch);letter-spacing:.01em}
    .ca{font-size:9px;font-weight:300;letter-spacing:.28em;text-transform:uppercase;color:var(--g6);text-decoration:none;position:relative;padding-bottom:2px;transition:color .3s}
    .ca::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--ch);transition:width .35s cubic-bezier(.16,1,.3,1)}
    .ca:hover{color:var(--ch)}.ca:hover::after{width:100%}
    .cgr{display:grid;grid-template-columns:repeat(4,1fr);gap:2px}
    .cc{position:relative;overflow:hidden;aspect-ratio:3/4;cursor:pointer;background:var(--g1)}
    .cc img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.16,1,.3,1);filter:brightness(.86)}
    .cc:hover img{transform:scale(1.07)}
    .ci{position:absolute;bottom:0;left:0;right:0;padding:18px 16px;background:linear-gradient(to top,rgba(17,17,16,.68) 0%,transparent 100%)}
    .cil{font-size:8px;font-weight:300;letter-spacing:.32em;text-transform:uppercase;color:rgba(248,248,246,.6);margin-bottom:3px}
    .cin{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:300;color:var(--w);letter-spacing:.02em}
    .cic{font-size:9px;font-weight:300;color:rgba(248,248,246,.48);margin-top:2px;letter-spacing:.1em}

    /* FEATURED STRIP */
    .fs{padding:60px 52px;background:var(--g1)}
    .fg{display:grid;grid-template-columns:repeat(3,1fr);gap:1px}
    .fc{background:var(--w);padding:28px;display:flex;align-items:flex-start;gap:18px;cursor:pointer;transition:background .3s}
    .fc:hover{background:var(--g1)}
    .fi{width:72px;height:96px;object-fit:cover;flex-shrink:0;filter:brightness(.92)}
    .fd{flex:1}
    .fb{font-size:8px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;color:var(--g4);margin-bottom:5px}
    .fn{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:400;color:var(--ch);margin-bottom:4px}
    .fp{font-size:12px;font-weight:300;color:var(--g6)}
    .fo{font-size:8.5px;font-weight:300;letter-spacing:.18em;text-transform:uppercase;color:var(--g4);margin-top:6px}

    @keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

    .brg{display:none}
    @media(max-width:900px){
      .nav{display:none}.brg{display:flex}
      .hero{grid-template-columns:1fr}.hr{height:52vh}
      .hl{padding:44px 24px}.cs{padding:44px 24px}
      .cgr{grid-template-columns:repeat(2,1fr)}.hdr{padding:0 24px}
      .fs{padding:44px 24px}.fg{grid-template-columns:1fr}
    }
  `}</style>
);

const Ic = {
  Search: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>,
  Cart:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  User:   () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Menu:   () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="16" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
};

const SP = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; setW(m > 0 ? (window.scrollY / m) * 100 : 0); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="sp" style={{ width: `${w}%` }} />;
};

const Header = () => {
  const [sc, setSc] = useState(false);
  const [hd, setHd] = useState(false);
  const ly = useRef(0);
  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setSc(y > 20);
      if (y > 80) { if (y > ly.current + 8) setHd(true); else if (y < ly.current - 8) setHd(false); } else setHd(false);
      ly.current = y;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header className={`hdr${sc ? " sc" : ""}${hd ? " hd" : ""}`}>
      <a href="#" className="logo-w">
        <span className="logo-n">M.EDIYA</span>
        <span className="logo-s">Men's Collection</span>
      </a>
      <nav className="nav">
        {["Yangi", "Kolekciya", "Brendlar", "Aksiya", "Biz haqimizda"].map((l) => (
          <a key={l} href="#" className="na">{l}</a>
        ))}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button className="ib"><Ic.Search /></button>
        <button className="ib"><Ic.User /></button>
        <div className="cw">
          <button className="ib"><Ic.Cart /></button>
          <span className="cbg">3</span>
        </div>
        <button className="ib brg"><Ic.Menu /></button>
      </div>
    </header>
  );
};

const slides = [
  { img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=85", item: "Premium Paltolar", sub: "Yangi Kolleksiya", price: "890 000 so'm dan" },
  { img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=85", item: "Klassik Kostyumlar", sub: "Biznes Uslubi", price: "1 250 000 so'm dan" },
  { img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1200&q=85", item: "Kundalik Kiyimlar", sub: "Casual Collection", price: "350 000 so'm dan" },
];

const Hero = () => {
  const [a, setA] = useState(0);
  useEffect(() => { const t = setInterval(() => setA((p) => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  return (
    <section className="hero">
      <div className="hl">
        <p className="h-season">Bahor / Yoz — 2025</p>
        <h1 className="h-title">Zamonaviy<br /><em>Erkaklar</em><br />Uslubi</h1>
        <p className="h-desc">Premium sifat, mukammal kesim. Har bir kiyim — o'zingizni ifodalash uchun yaratilgan. Toshkentning eng yaxshi erkaklar kiyim do'koniga xush kelibsiz.</p>
        <div className="cg">
          <a href="#" className="bp">Kolleksiyani Ko'rish</a>
          <a href="#" className="bg">Yangiliklar →</a>
        </div>
        <div className="hmet">
          {[["500+","Mahsulot"],["12","Brend"],["3K+","Mijoz"]].map(([n,l]) => (
            <div key={l}><div className="mn">{n}</div><div className="ml">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="hr">
        <img key={a} className="hi" src={slides[a].img} alt={slides[a].item} />
        <div className="htag">
          <div className="htl">{slides[a].sub}</div>
          <div className="htn">{slides[a].item}</div>
          <div className="htp">{slides[a].price}</div>
        </div>
        <div className="hidx">
          {slides.map((_,i) => <div key={i} className={`hd_${a===i?" ac":""}`} onClick={() => setA(i)} />)}
        </div>
      </div>
    </section>
  );
};

const cats = [
  { img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4685?w=800&q=80", name: "Kostyumlar", label: "Formal", count: "48 ta mahsulot" },
  { img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80", name: "Kurtka & Paltolar", label: "Outerwear", count: "36 ta mahsulot" },
  { img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80", name: "Ko'ylaklar", label: "Shirts", count: "94 ta mahsulot" },
  { img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80", name: "Shimlar", label: "Trousers", count: "62 ta mahsulot" },
];

const Categories = () => (
  <section className="cs">
    <div className="ch_">
      <h2 className="ct">Kategoriyalar</h2>
      <a href="#" className="ca">Hammasini Ko'rish →</a>
    </div>
    <div className="cgr">
      {cats.map((c) => (
        <div key={c.name} className="cc">
          <img src={c.img} alt={c.name} loading="lazy" />
          <div className="ci">
            <div className="cil">{c.label}</div>
            <div className="cin">{c.name}</div>
            <div className="cic">{c.count}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const featured = [
  { img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80", brand:"Hugo Boss", name:"Slim Fit Kostyum", price:"2 490 000 so'm", old:"3 100 000 so'm" },
  { img:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80", brand:"Zara Man", name:"Casual Kurtka", price:"890 000 so'm", old:"" },
  { img:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80", brand:"Reserved", name:"Oxford Ko'ylak", price:"450 000 so'm", old:"580 000 so'm" },
];

const Featured = () => (
  <section className="fs">
    <div className="ch_" style={{ marginBottom: 32 }}>
      <h2 className="ct">Ommabop Mahsulotlar</h2>
      <a href="#" className="ca">Barchasi →</a>
    </div>
    <div className="fg">
      {featured.map((f) => (
        <div key={f.name} className="fc">
          <img className="fi" src={f.img} alt={f.name} loading="lazy" />
          <div className="fd">
            <div className="fb">{f.brand}</div>
            <div className="fn">{f.name}</div>
            <div className="fp">{f.price}</div>
            {f.old && <div className="fo" style={{ textDecoration: "line-through" }}>{f.old}</div>}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const InfoPage = () => (
  <>
    <G />
    <SP />
    <div className="ann">🚚 &nbsp;100 000 so'mdan yuqori xaridlarda bepul yetkazib berish &nbsp;·&nbsp; Toshkent bo'ylab 1–3 kun</div>
    <Header />
    <Hero />
    <Categories />
    <Featured />
  </>
);

export default InfoPage;