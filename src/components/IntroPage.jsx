import { useState, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Jost:wght@200;300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --w:#F8F8F6;--g1:#EFEFED;--g2:#DCDCDA;--g3:#C8C8C6;
      --g4:#ADADAB;--g6:#6B6B69;--g8:#3A3A38;--ch:#1C1C1A;
    }
    html,body{background:var(--w);color:var(--ch);font-family:'Jost',sans-serif;overflow-x:hidden}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:var(--g1)}
    ::-webkit-scrollbar-thumb{background:var(--g4)}

    .sec-hdr{padding:64px 52px 0;display:flex;align-items:flex-end;justify-content:space-between;border-top:1px solid var(--g2)}
    .sec-eyebrow{font-size:8px;font-weight:300;letter-spacing:.44em;text-transform:uppercase;color:var(--g4);margin-bottom:10px}
    .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,48px);font-weight:300;color:var(--ch)}

    .fbar{padding:24px 52px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px}
    .ftabs{display:flex;gap:3px;flex-wrap:wrap}
    .ftab{font-size:9px;font-weight:300;letter-spacing:.2em;text-transform:uppercase;padding:7px 16px;border:1px solid var(--g2);background:transparent;color:var(--g6);cursor:pointer;transition:all .22s;font-family:'Jost',sans-serif}
    .ftab:hover{border-color:var(--ch);color:var(--ch)}
    .ftab.act{background:var(--ch);color:var(--w);border-color:var(--ch)}
    .fright{display:flex;align-items:center;gap:16px}
    .fsort{font-size:9px;font-weight:300;letter-spacing:.16em;text-transform:uppercase;color:var(--g6);background:none;border:none;cursor:pointer;font-family:'Jost',sans-serif;display:flex;align-items:center;gap:5px;transition:color .22s}
    .fsort:hover{color:var(--ch)}
    .fview{display:flex;gap:2px}
    .fvb{width:30px;height:30px;border:1px solid var(--g2);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--g4);transition:all .22s}
    .fvb:hover{border-color:var(--g4);color:var(--ch)}
    .fvb.act{border-color:var(--ch);background:var(--ch)}
    .fvb.act svg{stroke:var(--w)}

    /* GRID */
    .pgrid{padding:28px 52px 64px;display:grid;gap:3px}
    .pgrid.g4{grid-template-columns:repeat(4,1fr)}
    .pgrid.g2{grid-template-columns:repeat(2,1fr)}

    /* CARD */
    .pc{background:var(--g1);cursor:pointer;opacity:0;animation:cIn .5s cubic-bezier(.16,1,.3,1) forwards}
    @keyframes cIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}

    /* IMAGE — padding-top trick for fixed ratio */
    .pc-img-w{position:relative;width:100%;padding-top:125%;overflow:hidden;background:var(--g2)}
    .pc-img,.pc-img2{
      position:absolute;inset:0;width:100%;height:100%;
      object-fit:cover;object-position:center top;display:block;
    }
    .pc-img{filter:brightness(.93);transition:transform .65s cubic-bezier(.16,1,.3,1),opacity .4s}
    .pc-img2{opacity:0;transition:opacity .45s ease}
    .pc:hover .pc-img{transform:scale(1.055);filter:brightness(.86)}
    .pc:hover .pc-img2{opacity:1}

    .pc-badges{position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:4px;z-index:2}
    .badge{font-size:7px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;padding:3px 8px}
    .badge.new{background:var(--ch);color:var(--w)}
    .badge.sale{background:#B85C38;color:var(--w)}
    .badge.hit{background:var(--g6);color:var(--w)}
    .badge.lim{background:var(--g8);color:var(--w)}

    .pc-actions{position:absolute;bottom:48px;right:10px;display:flex;flex-direction:column;gap:4px;z-index:2;opacity:0;transform:translateX(6px);transition:opacity .28s,transform .28s}
    .pc:hover .pc-actions{opacity:1;transform:translateX(0)}
    .pac{width:32px;height:32px;border:none;background:rgba(248,248,246,.9);backdrop-filter:blur(4px);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--g6);transition:background .22s,color .22s}
    .pac:hover,.pac.on{background:var(--ch);color:var(--w)}

    .pc-add{position:absolute;bottom:0;left:0;right:0;background:var(--ch);color:var(--w);font-size:8px;font-weight:300;letter-spacing:.26em;text-transform:uppercase;padding:10px 0;text-align:center;transform:translateY(100%);transition:transform .32s cubic-bezier(.16,1,.3,1);font-family:'Jost',sans-serif;border:none;cursor:pointer;width:100%}
    .pc:hover .pc-add{transform:translateY(0)}

    .pc-info{padding:12px 14px 16px;background:var(--w)}
    .pc-brand{font-size:7px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;color:var(--g4);margin-bottom:3px}
    .pc-name{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:400;color:var(--ch);margin-bottom:5px;line-height:1.2}
    .pc-prices{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}
    .pc-price{font-size:13px;font-weight:300;color:var(--ch)}
    .pc-old{font-size:11px;font-weight:300;color:var(--g4);text-decoration:line-through}
    .pc-disc{font-size:9px;font-weight:400;color:#B85C38}
    .pc-sizes{display:flex;gap:3px;margin-top:7px;flex-wrap:wrap}
    .sz{font-size:7.5px;font-weight:300;padding:2px 6px;border:1px solid var(--g2);color:var(--g6);cursor:pointer;transition:all .18s}
    .sz:hover{border-color:var(--ch);color:var(--ch)}
    .sz.sel{border-color:var(--ch);background:var(--ch);color:var(--w)}

    /* LOAD MORE */
    .lm-wrap{display:flex;flex-direction:column;align-items:center;padding:0 52px 72px;gap:14px}
    .lm-bar{width:100%;max-width:360px;height:1px;background:var(--g2);position:relative;margin-bottom:6px}
    .lm-fill{position:absolute;top:0;left:0;height:1px;background:var(--ch);transition:width .4s}
    .lm-count{font-size:9px;font-weight:300;letter-spacing:.22em;color:var(--g4)}
    .lm-btn{font-size:9px;font-weight:300;letter-spacing:.26em;text-transform:uppercase;padding:12px 38px;border:1px solid var(--g2);background:transparent;color:var(--g6);cursor:pointer;font-family:'Jost',sans-serif;transition:all .28s}
    .lm-btn:hover{border-color:var(--ch);color:var(--ch)}

    /* RECENTLY VIEWED */
    .rv-sec{padding:56px 52px;background:var(--g1);border-top:1px solid var(--g2)}
    .rv-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;color:var(--ch);margin-bottom:24px}
    .rv-row{display:flex;gap:3px;overflow-x:auto;scrollbar-width:none}
    .rv-row::-webkit-scrollbar{display:none}
    .rv-card{flex:0 0 180px;cursor:pointer}
    .rv-img-w{width:100%;padding-top:133%;position:relative;overflow:hidden;background:var(--g2)}
    .rv-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.9);transition:filter .3s,transform .5s}
    .rv-card:hover .rv-img{filter:brightness(.8);transform:scale(1.04)}
    .rv-nm{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:400;color:var(--ch);margin-top:7px;line-height:1.2}
    .rv-pr{font-size:11px;font-weight:300;color:var(--g6);margin-top:2px}

    /* PROMO */
    .promo-band{margin:0 52px 3px;background:var(--ch);padding:26px 40px;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .pb-eye{font-size:8px;font-weight:300;letter-spacing:.38em;text-transform:uppercase;color:var(--g4);margin-bottom:5px}
    .pb-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:300;color:var(--w);line-height:1.1}
    .pb-btn{font-size:9px;font-weight:300;letter-spacing:.26em;text-transform:uppercase;padding:10px 24px;border:1px solid var(--g3);background:transparent;color:var(--w);cursor:pointer;font-family:'Jost',sans-serif;transition:background .28s,color .28s;white-space:nowrap;flex-shrink:0}
    .pb-btn:hover{background:var(--w);color:var(--ch)}

    /* TOAST */
    .toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(70px);background:var(--ch);color:var(--w);font-size:9px;font-weight:300;letter-spacing:.2em;text-transform:uppercase;padding:11px 26px;z-index:999;transition:transform .38s cubic-bezier(.16,1,.3,1);pointer-events:none;white-space:nowrap}
    .toast.show{transform:translateX(-50%) translateY(0)}

    .sort-dd{position:absolute;top:calc(100% + 5px);right:0;background:#F8F8F6;border:1px solid var(--g2);min-width:190px;z-index:50}
    .sort-item{padding:9px 14px;font-size:9px;font-weight:300;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;color:var(--g6);transition:background .18s}
    .sort-item:hover,.sort-item.act{background:var(--g1);color:var(--ch)}

    @media(max-width:1100px){.pgrid.g4{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:750px){
      .pgrid.g4,.pgrid.g3{grid-template-columns:repeat(2,1fr)}
      .sec-hdr,.fbar,.pgrid,.lm-wrap,.rv-sec,.promo-band{padding-left:16px;padding-right:16px}
      .promo-band{flex-direction:column;align-items:flex-start}
    }
  `}</style>
);

/* ICONS */
const Heart = ({ on }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={on?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const Eye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const G4 = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/>
    <rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/>
  </svg>
);
const G2 = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="1" y="1" width="6" height="14"/><rect x="9" y="1" width="6" height="14"/>
  </svg>
);
const Chev = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
);

/* ── PRODUCTS — 24 ta, har biri unikal rasm ID bilan ── */
const P = [
  /* KOSTYUMLAR */
  { id:1,  cat:"Kostyum", brand:"Hugo Boss",     name:"Slim Fit Kostyum",        price:2490000, old:3100000, badges:["sale"], sizes:["XS","S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4685?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=700&q=82" },
  { id:2,  cat:"Kostyum", brand:"Armani",         name:"Klassik Qora Kostyum",    price:4200000, old:null,    badges:["new"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&q=82" },
  { id:3,  cat:"Kostyum", brand:"Massimo Dutti",  name:"Kulrang Biznes Kostyum",  price:1980000, old:2400000, badges:["sale"], sizes:["M","L","XL","2XL"],
    img:"https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=700&q=82" },
  { id:4,  cat:"Kostyum", brand:"Zara Man",       name:"Yengil Yoz Kostyumi",     price:1250000, old:null,    badges:["hit"], sizes:["S","M","L"],
    img:"https://images.unsplash.com/photo-1600091166971-7f9faad6c15b?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1560243563-062bfc001d68?w=700&q=82" },

  /* KO'YLAKLAR */
  { id:5,  cat:"Ko'ylak", brand:"Zara Man",       name:"Oxford Oq Ko'ylak",       price:450000, old:null,    badges:["new"], sizes:["S","M","L","XL","2XL"],
    img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=700&q=82" },
  { id:6,  cat:"Ko'ylak", brand:"Lacoste",        name:"Pique Polo Ko'ylak",      price:780000, old:null,    badges:[], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1612337498517-a394a487e9e6?w=700&q=82" },
  { id:7,  cat:"Ko'ylak", brand:"Calvin Klein",   name:"Slim Fit Ko'ylak",        price:320000, old:420000,  badges:["sale"], sizes:["S","M","L","XL","2XL"],
    img:"https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&q=82" },
  { id:8,  cat:"Ko'ylak", brand:"Mango Man",      name:"Linen Yoz Ko'ylak",       price:290000, old:380000,  badges:["sale"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=700&q=82" },
  { id:9,  cat:"Ko'ylak", brand:"Tommy Hilfiger","name":"Rangli Polo",            price:560000, old:null,    badges:["hit"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=82" },

  /* SHIMLAR */
  { id:10, cat:"Shim",    brand:"Reserved",       name:"Chino Shim",              price:380000, old:520000,  badges:["sale"], sizes:["30","32","34","36"],
    img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=700&q=82" },
  { id:11, cat:"Shim",    brand:"Jack & Jones",   name:"Slim Jeans",              price:490000, old:null,    badges:["new"], sizes:["30","32","34","36","38"],
    img:"https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&q=82" },
  { id:12, cat:"Shim",    brand:"Tommy Hilfiger","name":"Klassik Shim",           price:620000, old:780000,  badges:["sale"], sizes:["30","32","34"],
    img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?w=700&q=82" },
  { id:13, cat:"Shim",    brand:"Zara Man",       name:"Jogger Sport Shim",       price:340000, old:null,    badges:[], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=700&q=82" },

  /* KURTKA / PALTO */
  { id:14, cat:"Kurtka",  brand:"Massimo Dutti",  name:"Charm Kurtka",            price:890000, old:null,    badges:["hit"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=700&q=82" },
  { id:15, cat:"Kurtka",  brand:"H&M",            name:"Denim Kurtka",            price:420000, old:null,    badges:[], sizes:["S","M","L","XL","2XL"],
    img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=82" },
  { id:16, cat:"Palto",   brand:"Armani",         name:"Wool Blend Palto",        price:3200000, old:null,   badges:["new"], sizes:["M","L","XL"],
    img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=82" },
  { id:17, cat:"Palto",   brand:"Hugo Boss",      name:"Premium Qishki Palto",    price:2800000, old:3500000,badges:["sale"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1516826957135-700dedea698c?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=82" },
  { id:18, cat:"Kurtka",  brand:"Zara Man",       name:"Trench Kurtka",           price:1100000, old:1400000,badges:["sale","lim"], sizes:["S","M","L"],
    img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700&q=82" },

  /* SPORT */
  { id:19, cat:"Sport",   brand:"Pull&Bear",      name:"Tracksuit To'plam",       price:680000, old:850000,  badges:["sale"], sizes:["S","M","L"],
    img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&q=82" },
  { id:20, cat:"Sport",   brand:"H&M Sport",      name:"Fleece Hoodie",           price:390000, old:null,    badges:["new"], sizes:["S","M","L","XL","2XL"],
    img:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=82" },
  { id:21, cat:"Sport",   brand:"Lacoste Sport",  name:"Sport Ko'ylak",           price:520000, old:null,    badges:["hit"], sizes:["S","M","L","XL"],
    img:"https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=700&q=82" },

  /* AKSESSUARLAR */
  { id:22, cat:"Aksessuar",brand:"Hugo Boss",     name:"Charm Kamar",             price:380000, old:null,    badges:[], sizes:["90cm","95cm","100cm"],
    img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=700&q=82" },
  { id:23, cat:"Aksessuar",brand:"Tommy H.",      name:"Klassik Galstuk",         price:220000, old:290000,  badges:["sale"], sizes:["Standart"],
    img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=82" },
  { id:24, cat:"Aksessuar",brand:"Armani",        name:"Charm Soat",              price:2100000, old:null,   badges:["lim","new"], sizes:["Standart"],
    img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=82",
    img2:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=82" },
];

const CATS  = ["Barchasi","Kostyum","Ko'ylak","Shim","Kurtka","Palto","Sport","Aksessuar"];
const SORTS = ["Tavsiya etilgan","Narx: Past → Yuqori","Narx: Yuqori → Past","Yangilar","Chegirmalar"];
const fmt   = n => n.toLocaleString("uz-UZ") + " so'm";

const useToast = () => {
  const [msg,setMsg]=useState(""); const [vis,setVis]=useState(false); const t=useRef(null);
  const show = m => { setMsg(m); setVis(true); clearTimeout(t.current); t.current=setTimeout(()=>setVis(false),2200); };
  return { msg, vis, show };
};

const Card = ({ p, delay, onCart, onWish, cols }) => {
  const [wl,setWl]=useState(false);
  const [sz,setSz]=useState(null);
  const disc = p.old ? Math.round((1-p.price/p.old)*100) : null;
  return (
    <div className="pc" style={{ animationDelay:`${delay}s` }}>
      <div className="pc-img-w">
        <img className="pc-img"  src={p.img}  alt={p.name} loading="lazy"/>
        <img className="pc-img2" src={p.img2} alt={p.name} loading="lazy"/>
        {p.badges.length>0 && (
          <div className="pc-badges">
            {p.badges.map(b=>(
              <span key={b} className={`badge ${b}`}>
                {b==="new"?"Yangi":b==="sale"?"Aksiya":b==="hit"?"Hit":"Limited"}
              </span>
            ))}
          </div>
        )}
        <div className="pc-actions">
          <button className={`pac${wl?" on":""}`} onClick={e=>{e.stopPropagation();setWl(v=>!v);onWish(!wl?`"${p.name}" sevimlilarga qo'shildi`:`Olib tashlandi`);}}><Heart on={wl}/></button>
          <button className="pac"><Eye/></button>
        </div>
        <button className="pc-add" onClick={e=>{e.stopPropagation();onCart(`"${p.name}" savatga qo'shildi ✓`);}}>+ Savatga Qo'shish</button>
      </div>
      <div className="pc-info">
        <div className="pc-brand">{p.brand}</div>
        <div className="pc-name">{p.name}</div>
        <div className="pc-prices">
          <span className="pc-price">{fmt(p.price)}</span>
          {p.old && <span className="pc-old">{fmt(p.old)}</span>}
          {disc  && <span className="pc-disc">−{disc}%</span>}
        </div>
        {cols>=3 && (
          <div className="pc-sizes">
            {p.sizes.map(s=>(
              <span key={s} className={`sz${sz===s?" sel":""}`} onClick={()=>setSz(s)}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const IntroPage = () => {
  const [cat,setCat]=useState("Barchasi");
  const [cols,setCols]=useState(4);
  const [shown,setShown]=useState(12);
  const [sort,setSort]=useState("Tavsiya etilgan");
  const [so,setSo]=useState(false);
  const toast=useToast();

  const filtered = P
    .filter(p=>cat==="Barchasi"||p.cat===cat)
    .sort((a,b)=>{
      if(sort==="Narx: Past → Yuqori") return a.price-b.price;
      if(sort==="Narx: Yuqori → Past") return b.price-a.price;
      if(sort==="Yangilar")            return b.id-a.id;
      if(sort==="Chegirmalar")         return (b.old?1:0)-(a.old?1:0);
      return 0;
    });

  const visible  = filtered.slice(0,shown);
  const progress = Math.min((shown/filtered.length)*100,100);

  return (
    <>
      <G/>
      <div className={`toast${toast.vis?" show":""}`}>{toast.msg}</div>

      {/* PROMO */}
      <div className="promo-band">
        <div>
          <div className="pb-eye">Maxsus Taklif</div>
          <div className="pb-title">Yangi Kolleksiya — −20% chegirma</div>
        </div>
        <button className="pb-btn" onClick={()=>toast.show("Aksiya sahifasi")}>Batafsil Ko'rish →</button>
      </div>

      {/* HEADER */}
      <div className="sec-hdr">
        <div>
          <div className="sec-eyebrow">M.EDIYA — 2025</div>
          <h2 className="sec-title">Mahsulotlar</h2>
        </div>
        <div style={{fontSize:11,fontWeight:300,color:"var(--g6)"}}>{filtered.length} ta mahsulot</div>
      </div>

      {/* FILTERS */}
      <div className="fbar">
        <div className="ftabs">
          {CATS.map(c=>(
            <button key={c} className={`ftab${cat===c?" act":""}`} onClick={()=>{setCat(c);setShown(12);}}>
              {c}
            </button>
          ))}
        </div>
        <div className="fright">
          <div style={{position:"relative"}}>
            <button className="fsort" onClick={()=>setSo(v=>!v)}>{sort} <Chev/></button>
            {so && (
              <div className="sort-dd">
                {SORTS.map(s=>(
                  <div key={s} className={`sort-item${sort===s?" act":""}`} onClick={()=>{setSort(s);setSo(false);}}>{s}</div>
                ))}
              </div>
            )}
          </div>
          <div className="fview">
            <button className={`fvb${cols===4?" act":""}`} onClick={()=>setCols(4)}><G4/></button>
            <button className={`fvb${cols===2?" act":""}`} onClick={()=>setCols(2)}><G2/></button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className={`pgrid${cols===4?" g4":" g2"}`}>
        {visible.map((p,i)=>(
          <Card key={`${p.id}-${cat}`} p={p} delay={i*0.04} cols={cols} onCart={toast.show} onWish={toast.show}/>
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="lm-wrap">
        <div className="lm-bar"><div className="lm-fill" style={{width:`${progress}%`}}/></div>
        <div className="lm-count">{Math.min(shown,filtered.length)} / {filtered.length} mahsulot</div>
        {shown<filtered.length && (
          <button className="lm-btn" onClick={()=>setShown(v=>v+8)}>Ko'proq Ko'rsatish</button>
        )}
      </div>

      {/* RECENTLY VIEWED */}
      <div className="rv-sec">
        <div className="rv-title">So'nggi Ko'rilganlar</div>
        <div className="rv-row">
          {P.slice(0,8).map(p=>(
            <div key={p.id} className="rv-card">
              <div className="rv-img-w">
                <img className="rv-img" src={p.img} alt={p.name} loading="lazy"/>
              </div>
              <div className="rv-nm">{p.name}</div>
              <div className="rv-pr">{fmt(p.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default IntroPage;