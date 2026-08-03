import { useState } from 'react'

/* ============================================================
   POPUP CONTENT
   ============================================================ */
const WORKS = [
  {img:'https://picsum.photos/600/450?random=10',t:'电商平台重构',g:'React · Node.js · PostgreSQL'},
  {img:'https://picsum.photos/600/450?random=11',t:'数据可视化仪表盘',g:'D3.js · TypeScript · WebSocket'},
  {img:'https://picsum.photos/600/450?random=12',t:'移动端 UI 组件库',g:'React Native · Storybook · Figma'},
  {img:'https://picsum.photos/600/450?random=13',t:'自动化部署流水线',g:'Docker · GitHub Actions · AWS'},
]
const TIMELINE = [
  {d:'2025.09 — 至今',t:'高级前端工程师 @ XX科技',c:'负责核心产品前端架构设计，主导组件库重构与性能优化项目。',g:'全职'},
  {d:'2024.03 — 2025.08',t:'全栈开发实习 @ YY 互联网',c:'参与电商平台后端开发，独立完成订单系统微服务拆分。',g:'实习'},
  {d:'2022.09 — 2024.06',t:'计算机科学 · 硕士学位',c:'研究方向为前端工程化与 Web 性能优化，发表 2 篇相关论文。',g:'教育'},
  {d:'2019.09 — 2022.06',t:'软件工程 · 学士学位',c:'GPA 3.8/4.0，获国家奖学金，ACM-ICPC 区域赛银奖。',g:'教育'},
]

function PopupLetter(){ return(<div className="ap-popup"><div className="ap-pp-wrap"><div className="ap-pp-photo"><img src="https://picsum.photos/400/500?random=1" alt=""/></div><div><h2>Digital Archivist</h2><p className="ap-sub">全栈开发者 · 猫咪观察员</p><p>你好，欢迎来到我的数字档案。这里不是展览馆，更像一本被阳光晒暖的旧相册。我在前端与后端之间游走，偶尔用相机捕捉生活里的光影碎片。代码、设计、写作——这些都是我理解世界的方式。</p></div></div></div>) }
function PopupJar(){ return(<div className="ap-popup"><h2>作品集</h2><p className="ap-sub">一些最近在做的项目</p><div className="ap-pf-grid">{WORKS.map((w,i)=>(<div key={i} className="ap-pf-card"><img src={w.img} alt=""/><div className="ap-pf-info"><div className="ap-pf-title">{w.t}</div><div className="ap-pf-tag">{w.g}</div></div></div>))}</div></div>) }
function PopupBook(){ return(<div className="ap-popup"><h2>来封信吧</h2><p className="ap-sub">期待收到你的消息</p><p>Email: <b>hello@example.com</b><br/>GitHub: <b>@digital-archivist</b><br/>Twitter: <b>@archivist_d</b></p><p style={{fontSize:'.85rem',color:'#999',marginTop:'1rem',lineHeight:1.8}}>无论是技术讨论、项目合作，还是聊聊最近读到的好书——都期待收到你的消息。</p></div>) }
function PopupCat(){ return(<div className="ap-popup"><h2>多米 · 教育 & 经历</h2><p className="ap-sub">一路走来的脚印</p><div className="ap-timeline">{TIMELINE.map((x,i)=>(<div key={i} className="ap-tl-item"><div className="ap-tl-dot"/><div className="ap-tl-date">{x.d}</div><div className="ap-tl-title">{x.t}</div><div className="ap-tl-desc">{x.c}</div><span className="ap-tl-tag">{x.g}</span></div>))}</div></div>) }

const POPUP = { letter:<PopupLetter/>, jar:<PopupJar/>, book:<PopupBook/>, cat:<PopupCat/> }

/* ============================================================
   OBJECTS — all 4 from 参考图/挂件参考/
   ============================================================ */
const OBJECTS = [
  { id:'letter', img:'/images/letter.png', top:'20%', left:'13%', w:160, h:120, rot:-2 },
  { id:'jar',    img:'/images/jar.png',    top:'16%', left:'75%', w:110, h:145, rot:3  },
  { id:'book',   img:'/images/book.png',   top:'58%', left:'16%', w:150, h:190, rot:-3 },
  { id:'cat',    img:'/images/cat.png',    top:'60%', left:'74%', w:130, h:130, rot:4  },
]

/* ============================================================
   MAIN
   ============================================================ */
export default function About() {
  const [popup, setPopup] = useState(null)

  return (<>
    <div className={`about-3d-stage${popup?' dimmed':''}`}/>

    {OBJECTS.map(obj => (
      <div key={obj.id} className="obj3d"
        style={{
          top:obj.top, left:obj.left,
          width:obj.w, height:obj.h,
          transform:`translate(-50%,-50%) rotate(${obj.rot}deg)`,
        }}
        onClick={()=>setPopup(obj.id)}
      >
        <img src={obj.img} alt={obj.id}
          style={{
            width:'100%',height:'100%',objectFit:'contain',display:'block',
            filter:'drop-shadow(0 4px 10px rgba(0,0,0,.08)) drop-shadow(0 12px 28px rgba(80,60,40,.06))',
          }}
        />
        <div className="obj3d-shadow"/>
      </div>
    ))}

    <div className="about-3d-label">PERSONAL ARCHIVE · ABOUT</div>

    {popup && (<div className="about-popup-overlay" onClick={()=>setPopup(null)}>
      <div className="about-popup-card" onClick={e=>e.stopPropagation()}>
        <button className="about-popup-close" onClick={()=>setPopup(null)}>✕</button>
        {POPUP[popup]}
      </div>
    </div>)}
  </>)
}

