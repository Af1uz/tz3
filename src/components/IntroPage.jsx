import { useState, useRef } from "react";

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --navy:#0D1B2E;--navy2:#0A1624;--navy3:#091420;--navy4:#112239;
      --ivory:#F2EDE4;--ivory2:#E8E0D4;
      --gold:#C9A96E;--gold2:#A8854A;
      --muted:rgba(242,237,228,.40);--muted2:rgba(242,237,228,.18);
      --line:rgba(242,237,228,.09);--line2:rgba(242,237,228,.16);
      --serif:'Cormorant Garamond',Georgia,serif;
      --sans:'Montserrat',sans-serif;
    }
    html,body,#root{background:var(--navy);color:var(--ivory);font-family:var(--sans);overflow-x:hidden;margin:0;padding:0}
    ::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--gold)}

    .sec-eye{font-size:9px;font-weight:500;letter-spacing:.44em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;display:flex;align-items:center;gap:11px}
    .sec-eye::before{content:'';display:block;width:20px;height:1px;background:var(--gold)}
    .sec-ttl{font-family:var(--serif);font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--ivory);line-height:1.1}
    .sec-lnk{font-size:9px;font-weight:400;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);text-decoration:none;position:relative;padding-bottom:3px;transition:color .25s}
    .sec-lnk::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold);transition:width .32s}
    .sec-lnk:hover{color:var(--ivory)}.sec-lnk:hover::after{width:100%}
    .sec-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:30px}

    /* TOAST */
    .toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%) translateY(60px);background:var(--navy2);color:var(--ivory);border:1px solid var(--line2);border-left:2px solid var(--gold);font-size:9px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;padding:12px 26px;z-index:999;transition:transform .36s cubic-bezier(.4,0,.2,1);pointer-events:none;white-space:nowrap}
    .toast.on{transform:translateX(-50%) translateY(0)}

    /* PRODUCTS */
    .products{padding:72px 56px;background:var(--navy);border-top:1px solid var(--line)}
    .tabs{display:flex;gap:2px;flex-wrap:wrap;margin-bottom:28px}
    .tab{font-size:9px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;padding:8px 20px;border:1px solid var(--line2);background:transparent;color:var(--muted);cursor:pointer;font-family:var(--sans);transition:all .22s}
    .tab:hover{border-color:var(--ivory2);color:var(--ivory)}
    .tab.on{background:var(--gold);color:var(--navy2);border-color:var(--gold)}
    .filter-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:28px}
    .sort-wrap{position:relative}
    .sort-btn{font-size:9px;font-weight:400;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);background:none;border:none;cursor:pointer;font-family:var(--sans);display:flex;align-items:center;gap:5px;transition:color .22s}
    .sort-btn:hover{color:var(--ivory)}
    .sort-dd{position:absolute;top:calc(100% + 6px);right:0;background:var(--navy2);border:1px solid var(--line2);min-width:200px;z-index:50}
    .sort-item{padding:9px 14px;font-size:9px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;color:var(--muted);transition:background .18s,color .18s;font-family:var(--sans)}
    .sort-item:hover,.sort-item.on{background:var(--navy4);color:var(--ivory)}
    .sort-item.on{color:var(--gold)}
    .vbtns{display:flex;gap:2px}
    .vbtn{width:30px;height:30px;border:1px solid var(--line2);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);transition:all .22s}
    .vbtn:hover{color:var(--ivory)}
    .vbtn.on{border-color:var(--gold);background:var(--gold)}
    .vbtn.on svg{stroke:var(--navy2)}
    .pgrid{display:grid;gap:2px}
    .pgrid.g4{grid-template-columns:repeat(4,1fr)}
    .pgrid.g2{grid-template-columns:repeat(2,1fr)}

    /* CARD */
    .pc{background:var(--navy2);cursor:pointer;position:relative;overflow:hidden}
    .pc-iw{position:relative;width:100%;padding-top:128%;overflow:hidden}
    .pc-img,.pc-img2{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
    .pc-img{filter:brightness(.54) saturate(.52);transition:transform .65s cubic-bezier(.4,0,.2,1),opacity .4s}
    .pc-img2{opacity:0;transition:opacity .42s ease;filter:brightness(.44) saturate(.46)}
    .pc:hover .pc-img{transform:scale(1.06);filter:brightness(.42) saturate(.44)}
    .pc:hover .pc-img2{opacity:1}
    .pc-scan{position:absolute;top:0;left:0;right:0;height:1px;background:var(--gold);transform:scaleX(0);transform-origin:left;transition:transform .44s cubic-bezier(.4,0,.2,1);z-index:3}
    .pc:hover .pc-scan{transform:scaleX(1)}
    .pc-badges{position:absolute;top:10px;left:10px;display:flex;flex-direction:column;gap:4px;z-index:2}
    .badge{font-size:7px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;padding:3px 9px;font-family:var(--sans)}
    .badge.new{background:var(--ivory);color:var(--navy2)}
    .badge.sale{background:#B85C38;color:var(--ivory)}
    .badge.hit{background:var(--gold);color:var(--navy2)}
    .badge.lim{background:var(--navy4);color:var(--ivory);border:1px solid var(--line2)}
    .pc-acts{position:absolute;bottom:52px;right:10px;display:flex;flex-direction:column;gap:4px;z-index:2;opacity:0;transform:translateX(6px);transition:opacity .26s,transform .26s}
    .pc:hover .pc-acts{opacity:1;transform:translateX(0)}
    .pac{width:30px;height:30px;border:none;background:rgba(10,22,36,.90);backdrop-filter:blur(6px);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--muted);transition:background .2s,color .2s}
    .pac:hover,.pac.on{background:var(--gold);color:var(--navy2)}
    .pc-add{position:absolute;bottom:0;left:0;right:0;background:var(--gold);color:var(--navy2);font-size:8px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;padding:10px 0;text-align:center;transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);font-family:var(--sans);border:none;cursor:pointer;width:100%}
    .pc:hover .pc-add{transform:translateY(0)}
    .pc-info{padding:12px 14px 16px;background:var(--navy3)}
    .pc-brand{font-size:7px;font-weight:400;letter-spacing:.30em;text-transform:uppercase;color:var(--gold);opacity:.75;margin-bottom:3px}
    .pc-nm{font-family:var(--serif);font-size:15px;font-weight:400;color:var(--ivory);margin-bottom:6px;line-height:1.2}
    .pc-prices{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}
    .pc-price{font-size:13px;font-weight:300;color:var(--ivory)}
    .pc-old{font-size:11px;font-weight:300;color:var(--muted);text-decoration:line-through}
    .pc-disc{font-size:9px;font-weight:500;color:#C97A5A}
    .pc-sizes{display:flex;gap:3px;margin-top:8px;flex-wrap:wrap}
    .sz{font-size:7.5px;font-weight:400;padding:2px 7px;border:1px solid var(--line2);color:var(--muted);cursor:pointer;transition:all .18s;font-family:var(--sans)}
    .sz:hover{border-color:var(--ivory2);color:var(--ivory)}
    .sz.on{border-color:var(--gold);background:var(--gold);color:var(--navy2)}

    /* LOAD MORE */
    .loadmore{display:flex;flex-direction:column;align-items:center;padding:0 56px 64px;gap:12px;margin-top:6px;background:var(--navy)}
    .lm-prog{width:100%;max-width:380px;height:1px;background:var(--line);position:relative;margin-bottom:4px}
    .lm-fill{position:absolute;top:0;left:0;height:1px;background:var(--gold);transition:width .4s}
    .lm-cnt{font-size:9px;font-weight:400;letter-spacing:.2em;color:var(--muted)}
    .lm-btn{font-size:9px;font-weight:400;letter-spacing:.24em;text-transform:uppercase;padding:11px 40px;border:1px solid var(--line2);background:transparent;color:var(--muted);cursor:pointer;font-family:var(--sans);transition:border-color .25s,color .25s}
    .lm-btn:hover{border-color:var(--ivory2);color:var(--ivory)}

    /* RECENTLY VIEWED */
    .rv-sec{padding:56px 56px;background:var(--navy2);border-top:1px solid var(--line)}
    .rv-row{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;margin-top:28px}
    .rv-row::-webkit-scrollbar{display:none}
    .rv-c{flex:0 0 170px;cursor:pointer}
    .rv-iw{width:100%;padding-top:136%;position:relative;overflow:hidden;background:var(--navy3)}
    .rv-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.54) saturate(.52);transition:filter .3s,transform .5s}
    .rv-c:hover .rv-img{filter:brightness(.42) saturate(.44);transform:scale(1.05)}
    .rv-nm{font-family:var(--serif);font-size:13px;font-weight:400;color:var(--ivory);margin-top:8px;line-height:1.2}
    .rv-pr{font-size:11px;font-weight:300;color:var(--muted);margin-top:2px}

    /* PROMO BAND */
    .promo{display:grid;grid-template-columns:1fr 1fr 1fr;border-top:1px solid var(--line)}
    .pm-c{padding:44px 40px;position:relative;overflow:hidden}
    .pm-c::before{content:'';position:absolute;top:0;left:0;right:0;height:1px}
    .pm-c.dark{background:var(--navy2)}.pm-c.dark::before{background:var(--line)}
    .pm-c.iv{background:var(--ivory);border-left:1px solid rgba(9,20,32,.06);border-right:1px solid rgba(9,20,32,.06)}.pm-c.iv::before{background:rgba(9,20,32,.08)}
    .pm-c.gd{background:var(--gold)}.pm-c.gd::before{background:rgba(9,20,32,.12)}
    .pm-eye{font-size:8px;font-weight:500;letter-spacing:.38em;text-transform:uppercase;margin-bottom:8px}
    .pm-c.dark .pm-eye{color:var(--muted)}.pm-c.iv .pm-eye{color:rgba(9,20,32,.44)}.pm-c.gd .pm-eye{color:rgba(9,20,32,.52)}
    .pm-ttl{font-family:var(--serif);font-size:22px;font-weight:400;line-height:1.2;margin-bottom:20px}
    .pm-c.dark .pm-ttl{color:var(--ivory)}.pm-c.iv .pm-ttl{color:var(--navy)}.pm-c.gd .pm-ttl{color:var(--navy2)}
    .pm-btn{font-family:var(--sans);font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;padding:10px 22px;cursor:pointer;transition:all .25s}
    .pm-c.dark .pm-btn{background:transparent;color:var(--ivory);border:1px solid var(--line2)}.pm-c.dark .pm-btn:hover{border-color:var(--gold);color:var(--gold)}
    .pm-c.iv .pm-btn{background:var(--navy);color:var(--ivory);border:none}.pm-c.iv .pm-btn:hover{background:var(--navy4)}
    .pm-c.gd .pm-btn{background:var(--navy2);color:var(--ivory);border:none}.pm-c.gd .pm-btn:hover{background:var(--navy3)}

    /* PRICING */
    .pricing{padding:80px 56px;background:var(--navy2);border-top:1px solid var(--line)}
    .pricing-top{text-align:center;margin-bottom:44px}
    .pricing-top .sec-eye{justify-content:center}.pricing-top .sec-eye::before{display:none}
    .pricing-desc{font-size:12.5px;font-weight:300;color:var(--muted);max-width:340px;margin:10px auto 0;line-height:2;text-align:center}
    .ptog{display:flex;align-items:center;justify-content:center;gap:14px;margin:28px 0 44px}
    .ptog-lbl{font-size:9px;font-weight:400;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);cursor:pointer;transition:color .22s}
    .ptog-lbl.on{color:var(--ivory)}
    .ptog-sw{width:38px;height:20px;border-radius:99px;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0}
    .ptog-sw.yr{background:var(--gold)}.ptog-sw.mo{background:var(--line2)}
    .ptog-knb{width:14px;height:14px;background:var(--ivory);border-radius:50%;position:absolute;top:3px;transition:left .26s cubic-bezier(.4,0,.2,1);box-shadow:0 1px 4px rgba(0,0,0,.3)}
    .ptog-sw.mo .ptog-knb{left:3px}.ptog-sw.yr .ptog-knb{left:21px}
    .psave{font-size:8px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;background:var(--gold);color:var(--navy2);padding:3px 10px}
    .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;max-width:960px;margin:0 auto}
    .plan{background:var(--navy3);padding:36px 30px 30px;position:relative;transition:transform .3s}
    .plan.pop{background:var(--ivory);transform:translateY(-8px)}
    .plan::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:var(--line)}
    .plan.pop::before{background:var(--gold);height:2px}
    .plan-badge{position:absolute;top:0;left:28px;font-size:7.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;padding:5px 13px;background:var(--gold);color:var(--navy2);font-family:var(--sans)}
    .plan-nm{font-size:8.5px;font-weight:500;letter-spacing:.36em;text-transform:uppercase;margin-bottom:16px;font-family:var(--sans)}
    .plan:not(.pop) .plan-nm{color:var(--muted)}.plan.pop .plan-nm{color:rgba(9,20,32,.44)}
    .plan-pr{font-family:var(--serif);font-size:clamp(26px,3.5vw,44px);font-weight:400;line-height:1;margin-bottom:4px}
    .plan:not(.pop) .plan-pr{color:var(--ivory)}.plan.pop .plan-pr{color:var(--navy)}
    .plan-per{font-size:10px;font-weight:300;margin-bottom:22px;font-family:var(--sans)}
    .plan:not(.pop) .plan-per{color:var(--muted)}.plan.pop .plan-per{color:rgba(9,20,32,.44)}
    .plan-line{height:1px;background:var(--line);margin-bottom:20px}
    .plan.pop .plan-line{background:rgba(9,20,32,.08)}
    .plan-feats{display:flex;flex-direction:column;gap:10px;margin-bottom:26px}
    .pf{display:flex;align-items:flex-start;gap:9px;font-size:11.5px;font-weight:300;line-height:1.55;font-family:var(--sans)}
    .plan:not(.pop) .pf{color:var(--muted)}.plan.pop .pf{color:rgba(9,20,32,.52)}
    .plan:not(.pop) .pf.y{color:var(--ivory)}.plan.pop .pf.y{color:var(--navy)}
    .pfi{width:13px;height:13px;flex-shrink:0;margin-top:1px}
    .pfi.y{color:var(--gold)}.plan.pop .pfi.y{color:var(--gold2)}
    .pfi.n{color:var(--muted2)}.plan.pop .pfi.n{color:rgba(9,20,32,.15)}
    .plan-btn{width:100%;font-family:var(--sans);font-size:9px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;padding:13px;cursor:pointer;transition:all .25s}
    .plan:not(.pop) .plan-btn{background:transparent;color:var(--ivory);border:1px solid var(--line2)}
    .plan:not(.pop) .plan-btn:hover{border-color:var(--gold);color:var(--gold)}
    .plan.pop .plan-btn{background:var(--navy);color:var(--ivory);border:none}
    .plan.pop .plan-btn:hover{background:var(--gold);color:var(--navy2)}

    /* FAQ */
    .faq{padding:80px 56px;background:var(--navy);border-top:1px solid var(--line)}
    .faq-wrap{display:grid;grid-template-columns:1fr 1.4fr;gap:64px;align-items:start}
    .faq-note{font-size:12.5px;font-weight:300;color:var(--muted);line-height:2;margin-top:14px}
    .faq-note a{color:var(--gold);text-decoration:none;font-weight:500}
    .faq-list{display:flex;flex-direction:column}
    .fi{border-top:1px solid var(--line)}.fi:last-child{border-bottom:1px solid var(--line)}
    .fi-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 0;background:none;border:none;cursor:pointer;text-align:left;font-family:var(--sans)}
    .fi-qt{font-family:var(--serif);font-size:17px;font-weight:500;color:var(--ivory);line-height:1.3}
    .fi-ic{width:22px;height:22px;border:1px solid var(--line2);border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--muted);transition:background .22s,border-color .22s,color .22s,transform .3s}
    .fi.open .fi-ic{background:var(--gold);border-color:var(--gold);color:var(--navy2);transform:rotate(45deg)}
    .fi-a{max-height:0;overflow:hidden;transition:max-height .4s cubic-bezier(.4,0,.2,1)}
    .fi.open .fi-a{max-height:160px}
    .fi-at{font-size:12.5px;font-weight:300;color:var(--muted);line-height:2;padding-bottom:18px}

    @media(max-width:1100px){.pgrid.g4{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:960px){
      .pgrid.g4,.pgrid.g2{grid-template-columns:repeat(2,1fr)}
      .promo{grid-template-columns:1fr}
      .plans{grid-template-columns:1fr;max-width:400px}.plan.pop{transform:none}
      .faq-wrap{grid-template-columns:1fr}
      .products,.pricing,.faq,.rv-sec,.loadmore{padding-left:24px;padding-right:24px}
    }
  `}</style>
);

const Heart = ({ on }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={on?"currentColor":"none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);
const EyeI  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const G4I   = () => <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="1" width="6" height="6"/><rect x="9" y="1" width="6" height="6"/><rect x="1" y="9" width="6" height="6"/><rect x="9" y="9" width="6" height="6"/></svg>;
const G2I   = () => <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="1" y="1" width="6" height="14"/><rect x="9" y="1" width="6" height="14"/></svg>;
const ChvI  = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
const ChkI  = () => <svg className="pfi y" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const XcI   = () => <svg className="pfi n" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const PlsI  = () => <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

const P=[
  {id:1,cat:"Kostyum",brand:"Hugo Boss",nm:"Slim Fit Kostyum",price:2490000,old:3100000,badges:["sale"],sizes:["XS","S","M","L","XL"],img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4685?w=700&q=82",img2:"https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=700&q=82"},
  {id:2,cat:"Kostyum",brand:"Armani",nm:"Klassik Qora Kostyum",price:4200000,old:null,badges:["new"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=82",img2:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=700&q=82"},
  {id:3,cat:"Kostyum",brand:"Massimo Dutti",nm:"Kulrang Biznes Kostyum",price:1980000,old:2400000,badges:["sale"],sizes:["M","L","XL","2XL"],img:"https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=700&q=82",img2:"https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=700&q=82"},
  {id:4,cat:"Kostyum",brand:"Zara Man",nm:"Yengil Yoz Kostyumi",price:1250000,old:null,badges:["hit"],sizes:["S","M","L"],img:"https://images.unsplash.com/photo-1600091166971-7f9faad6c15b?w=700&q=82",img2:"https://images.unsplash.com/photo-1560243563-062bfc001d68?w=700&q=82"},
  {id:5,cat:"Ko'ylak",brand:"Zara Man",nm:"Oxford Oq Ko'ylak",price:450000,old:null,badges:["new"],sizes:["S","M","L","XL","2XL"],img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=700&q=82",img2:"https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=700&q=82"},
  {id:6,cat:"Ko'ylak",brand:"Lacoste",nm:"Pique Polo Ko'ylak",price:780000,old:null,badges:[],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=700&q=82",img2:"https://images.unsplash.com/photo-1612337498517-a394a487e9e6?w=700&q=82"},
  {id:7,cat:"Ko'ylak",brand:"Calvin Klein",nm:"Slim Fit Ko'ylak",price:320000,old:420000,badges:["sale"],sizes:["S","M","L","XL","2XL"],img:"https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=700&q=82",img2:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&q=82"},
  {id:8,cat:"Ko'ylak",brand:"Mango Man",nm:"Linen Yoz Ko'ylak",price:290000,old:380000,badges:["sale"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&q=82",img2:"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=700&q=82"},
  {id:9,cat:"Ko'ylak",brand:"Tommy H.",nm:"Rangli Polo",price:560000,old:null,badges:["hit"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=700&q=82",img2:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=82"},
  {id:10,cat:"Shim",brand:"Reserved",nm:"Chino Shim",price:380000,old:520000,badges:["sale"],sizes:["30","32","34","36"],img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=700&q=82",img2:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=700&q=82"},
  {id:11,cat:"Shim",brand:"Jack & Jones",nm:"Slim Jeans",price:490000,old:null,badges:["new"],sizes:["30","32","34","36","38"],img:"https://images.unsplash.com/photo-1475178626620-a4d074967452?w=700&q=82",img2:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=700&q=82"},
  {id:12,cat:"Shim",brand:"Tommy H.",nm:"Klassik Shim",price:620000,old:780000,badges:["sale"],sizes:["30","32","34"],img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700&q=82",img2:"https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?w=700&q=82"},
  {id:13,cat:"Shim",brand:"Zara Man",nm:"Jogger Sport Shim",price:340000,old:null,badges:[],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=700&q=82",img2:"https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=700&q=82"},
  {id:14,cat:"Kurtka",brand:"Massimo Dutti",nm:"Charm Kurtka",price:890000,old:null,badges:["hit"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=82",img2:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=700&q=82"},
  {id:15,cat:"Kurtka",brand:"H&M",nm:"Denim Kurtka",price:420000,old:null,badges:[],sizes:["S","M","L","XL","2XL"],img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700&q=82",img2:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=700&q=82"},
  {id:16,cat:"Palto",brand:"Armani",nm:"Wool Blend Palto",price:3200000,old:null,badges:["new"],sizes:["M","L","XL"],img:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=82",img2:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=82"},
  {id:17,cat:"Palto",brand:"Hugo Boss",nm:"Premium Qishki Palto",price:2800000,old:3500000,badges:["sale"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1516826957135-700dedea698c?w=700&q=82",img2:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=700&q=82"},
  {id:18,cat:"Kurtka",brand:"Zara Man",nm:"Trench Kurtka",price:1100000,old:1400000,badges:["sale","lim"],sizes:["S","M","L"],img:"https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=700&q=82",img2:"https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700&q=82"},
  {id:19,cat:"Sport",brand:"Pull&Bear",nm:"Tracksuit To'plam",price:680000,old:850000,badges:["sale"],sizes:["S","M","L"],img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=82",img2:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&q=82"},
  {id:20,cat:"Sport",brand:"H&M Sport",nm:"Fleece Hoodie",price:390000,old:null,badges:["new"],sizes:["S","M","L","XL","2XL"],img:"https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=700&q=82",img2:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=82"},
  {id:21,cat:"Sport",brand:"Lacoste",nm:"Sport Ko'ylak",price:520000,old:null,badges:["hit"],sizes:["S","M","L","XL"],img:"https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=700&q=82",img2:"https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=700&q=82"},
  {id:22,cat:"Aksessuar",brand:"Hugo Boss",nm:"Charm Kamar",price:380000,old:null,badges:[],sizes:["90cm","95cm","100cm"],img:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=82",img2:"https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=700&q=82"},
  {id:23,cat:"Aksessuar",brand:"Tommy H.",nm:"Klassik Galstuk",price:220000,old:290000,badges:["sale"],sizes:["Standart"],img:"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=700&q=82",img2:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=82"},
  {id:24,cat:"Aksessuar",brand:"Armani",nm:"Charm Soat",price:2100000,old:null,badges:["lim","new"],sizes:["Standart"],img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=82",img2:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=700&q=82"},
];

const CATS=["Barchasi","Kostyum","Ko'ylak","Shim","Kurtka","Palto","Sport","Aksessuar"];
const SORTS=["Tavsiya etilgan","Narx: Past → Yuqori","Narx: Yuqori → Past","Yangilar","Chegirmalar"];
const fmt=n=>n.toLocaleString("uz-UZ")+" so'm";

const PLANS=[
  {nm:"Standart",pop:false,mo:490000,feats:[{t:"Bepul yetkazib berish",y:true},{t:"Qaytarish (14 kun)",y:true},{t:"Asosiy chegirmalar",y:true},{t:"VIP chegirmalar",y:false},{t:"Shaxsiy maslahat",y:false},{t:"Sovg'a qadoqlash",y:false}]},
  {nm:"Professional",pop:true,mo:990000,feats:[{t:"Bepul yetkazib berish",y:true},{t:"Qaytarish (30 kun)",y:true},{t:"Barcha chegirmalar",y:true},{t:"VIP chegirmalar",y:true},{t:"Shaxsiy maslahat",y:true},{t:"Sovg'a qadoqlash",y:true}]},
  {nm:"Premium",pop:false,mo:1490000,feats:[{t:"Bepul yetkazib berish",y:true},{t:"Qaytarish (60 kun)",y:true},{t:"Barcha chegirmalar",y:true},{t:"VIP chegirmalar",y:true},{t:"Shaxsiy stilist",y:true},{t:"Sovg'a qadoqlash",y:true}]},
];

const FAQS=[
  {q:"Yetkazib berish necha kunda bo'ladi?",a:"Toshkent bo'ylab 1-3 ish kuni. 100 000 so'm dan yuqori xaridda bepul. Ekspres yetkazib berish ham mavjud."},
  {q:"Mahsulot qaytarish mumkinmi?",a:"Ha, 14 kundan 60 kungacha (tarifga qarab). Mahsulot etiketkalari yechilmagan bo'lishi kerak."},
  {q:"Mahsulotlar original brendlarmi?",a:"100% original. Barcha mahsulotlar asl brend sertifikatiga ega. Soxta mahsulot topilsa — to'liq pul qaytaramiz."},
  {q:"O'lcham to'g'ri kelmasa nima bo'ladi?",a:"Bepul o'lcham almashtirish. Bir marta yetkazib berish hamda qaytarish — bizdan."},
  {q:"To'lov usullari qanday?",a:"Click, Payme, UzCard, Humo, Visa, Mastercard. Muddatli to'lov (2-12 oy) ham mavjud."},
];

const useToast=()=>{
  const [msg,setMsg]=useState("");
  const [vis,setVis]=useState(false);
  const t=useRef(null);
  const show=m=>{setMsg(m);setVis(true);clearTimeout(t.current);t.current=setTimeout(()=>setVis(false),2200)};
  return{msg,vis,show};
};

const Card=({p,delay,onCart,onWish,cols})=>{
  const [wl,setWl]=useState(false);
  const [sz,setSz]=useState(null);
  const disc=p.old?Math.round((1-p.price/p.old)*100):null;
  return(
    <div className="pc" style={{animationDelay:`${delay}s`}}>
      <div className="pc-iw">
        <img className="pc-img" src={p.img} alt={p.nm} loading="lazy"/>
        <img className="pc-img2" src={p.img2} alt={p.nm} loading="lazy"/>
        <div className="pc-scan"/>
        {p.badges.length>0&&<div className="pc-badges">{p.badges.map(b=><span key={b} className={`badge ${b}`}>{b==="new"?"Yangi":b==="sale"?"Aksiya":b==="hit"?"Hit":"Limited"}</span>)}</div>}
        <div className="pc-acts">
          <button className={`pac${wl?" on":""}`} onClick={e=>{e.stopPropagation();setWl(v=>!v);onWish(!wl?`"${p.nm}" sevimlilarga qo'shildi`:"Olib tashlandi")}}><Heart on={wl}/></button>
          <button className="pac"><EyeI/></button>
        </div>
        <button className="pc-add" onClick={e=>{e.stopPropagation();onCart(`"${p.nm}" savatga qo'shildi ✓`)}}>+ Savatga Qo'shish</button>
      </div>
      <div className="pc-info">
        <div className="pc-brand">{p.brand}</div>
        <div className="pc-nm">{p.nm}</div>
        <div className="pc-prices">
          <span className="pc-price">{fmt(p.price)}</span>
          {p.old&&<span className="pc-old">{fmt(p.old)}</span>}
          {disc&&<span className="pc-disc">−{disc}%</span>}
        </div>
        {cols>=3&&<div className="pc-sizes">{p.sizes.map(s=><span key={s} className={`sz${sz===s?" on":""}`} onClick={()=>setSz(s)}>{s}</span>)}</div>}
      </div>
    </div>
  );
};

const IntroPage=()=>{
  const toast=useToast();
  const [cat,setCat]=useState("Barchasi");
  const [cols,setCols]=useState(4);
  const [shown,setShown]=useState(12);
  const [sort,setSort]=useState("Tavsiya etilgan");
  const [so,setSo]=useState(false);
  const [yr,setYr]=useState(false);
  const [fopen,setFopen]=useState(null);

  const filtered=P.filter(p=>cat==="Barchasi"||p.cat===cat).sort((a,b)=>{
    if(sort==="Narx: Past → Yuqori")return a.price-b.price;
    if(sort==="Narx: Yuqori → Past")return b.price-a.price;
    if(sort==="Yangilar")return b.id-a.id;
    if(sort==="Chegirmalar")return(b.old?1:0)-(a.old?1:0);
    return 0;
  });
  const visible=filtered.slice(0,shown);
  const prog=Math.min((shown/filtered.length)*100,100);
  const disp=mo=>{const v=yr?Math.round(mo*12*0.75):mo;return v.toLocaleString("uz-UZ")+" so'm"};

  return(
    <>
      <G/>
      <div className={`toast${toast.vis?" on":""}`}>{toast.msg}</div>

      <section className="products">
        <div className="sec-hd">
          <div><div className="sec-eye">Mahsulotlar</div><h2 className="sec-ttl">Butun Kolekciya</h2></div>
          <span style={{fontSize:11,fontWeight:300,color:"var(--muted)"}}>{filtered.length} ta mahsulot</span>
        </div>
        <div className="tabs">{CATS.map(c=><button key={c} className={`tab${cat===c?" on":""}`} onClick={()=>{setCat(c);setShown(12)}}>{c}</button>)}</div>
        <div className="filter-row">
          <div className="sort-wrap">
            <button className="sort-btn" onClick={()=>setSo(v=>!v)}>{sort} &nbsp;<ChvI/></button>
            {so&&<div className="sort-dd">{SORTS.map(s=><div key={s} className={`sort-item${sort===s?" on":""}`} onClick={()=>{setSort(s);setSo(false)}}>{s}</div>)}</div>}
          </div>
          <div className="vbtns">
            <button className={`vbtn${cols===4?" on":""}`} onClick={()=>setCols(4)}><G4I/></button>
            <button className={`vbtn${cols===2?" on":""}`} onClick={()=>setCols(2)}><G2I/></button>
          </div>
        </div>
        <div className={`pgrid${cols===4?" g4":" g2"}`}>
          {visible.map((p,i)=><Card key={`${p.id}-${cat}`} p={p} delay={i*0.035} cols={cols} onCart={toast.show} onWish={toast.show}/>)}
        </div>
      </section>

      <div className="loadmore">
        <div className="lm-prog"><div className="lm-fill" style={{width:`${prog}%`}}/></div>
        <div className="lm-cnt">{Math.min(shown,filtered.length)} / {filtered.length} mahsulot</div>
        {shown<filtered.length&&<button className="lm-btn" onClick={()=>setShown(v=>v+8)}>Ko'proq Ko'rsatish</button>}
      </div>

      <div className="rv-sec">
        <div className="sec-eye">So'nggi Ko'rilganlar</div>
        <div className="rv-row">
          {P.slice(0,8).map(p=>(
            <div key={p.id} className="rv-c">
              <div className="rv-iw"><img className="rv-img" src={p.img} alt={p.nm} loading="lazy"/></div>
              <div className="rv-nm">{p.nm}</div>
              <div className="rv-pr">{fmt(p.price)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="promo">
        <div className="pm-c dark"><div className="pm-eye">Maxsus taklif</div><div className="pm-ttl">Yangi Kolleksiya<br/>−20% chegirma</div><button className="pm-btn" onClick={()=>toast.show("Aksiya sahifasi")}>Batafsil Ko'rish →</button></div>
        <div className="pm-c iv"><div className="pm-eye">Bepul xizmat</div><div className="pm-ttl">Shaxsiy<br/>Stilist Maslahat</div><button className="pm-btn" onClick={()=>toast.show("Maslahat so'rovi yuborildi")}>Ro'yxatdan O'tish →</button></div>
        <div className="pm-c gd"><div className="pm-eye">Yozgi chegirma</div><div className="pm-ttl">−30% gacha<br/>Yozgi Kolleksiya</div><button className="pm-btn" onClick={()=>toast.show("Yozgi kolleksiya")}>Xarid Qilish →</button></div>
      </div>

      {/* <section className="pricing">
        <div className="pricing-top"><div className="sec-eye">Obuna Rejalari</div><h2 className="sec-ttl">Sizga mos tarifni tanlang</h2><p className="pricing-desc">Yillik obunada 25% tejang. Istalgan vaqt bekor qilish mumkin.</p></div>
        <div className="ptog">
          <span className={`ptog-lbl${!yr?" on":""}`} onClick={()=>setYr(false)}>Oylik</span>
          <div className={`ptog-sw${yr?" yr":" mo"}`} onClick={()=>setYr(v=>!v)}><div className="ptog-knb"/></div>
          <span className={`ptog-lbl${yr?" on":""}`} onClick={()=>setYr(true)}>Yillik</span>
          {yr&&<span className="psave">−25%</span>}
        </div>
        <div className="plans">
          {PLANS.map((plan,i)=>(
            <div key={i} className={`plan${plan.pop?" pop":""}`}>
              {plan.pop&&<div className="plan-badge">Eng Mashhur</div>}
              <div className="plan-nm">{plan.nm}</div>
              <div className="plan-pr">{disp(plan.mo)}</div>
              <div className="plan-per">{yr?"/ yil":"/ oy"}</div>
              <div className="plan-line"/>
              <div className="plan-feats">{plan.feats.map((f,j)=><div key={j} className={`pf${f.y?" y":""}`}>{f.y?<ChkI/>:<XcI/>}<span>{f.t}</span></div>)}</div>
              <button className="plan-btn">{plan.pop?"Hozir Boshlash":"Tanlash"}</button>
            </div>
          ))}
        </div>
      </section> */}

      <section className="faq">
        <div className="faq-wrap">
          <div>
            <div className="sec-eye">Savollar</div>
            <h2 className="sec-ttl">Ko'p so'raladigan savollar</h2>
            <p className="faq-note">Javob topa olmadingizmi?<br/><a href="tel:+998971234567">+998 97 123 45 67</a> ga qo'ng'iroq qiling.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f,i)=>(
              <div key={i} className={`fi${fopen===i?" open":""}`}>
                <button className="fi-q" onClick={()=>setFopen(fopen===i?null:i)}>
                  <span className="fi-qt">{f.q}</span>
                  <div className="fi-ic"><PlsI/></div>
                </button>
                <div className="fi-a"><p className="fi-at">{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroPage;