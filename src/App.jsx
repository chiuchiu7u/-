import { useState, useMemo } from 'react'
import About from './components/About'
import Workbench from './components/Workbench'
import Playground from './components/Playground'

/* ── Era config ─────────────────────────────────────────── */
const ERAS = [
  { id: 'about',      title: 'ABOUT',     subtitle: 'DIGITAL ARCHIVE · 2026' },
  { id: 'work',       title: 'RETRO',     subtitle: 'WORKBENCH · 2026' },
  { id: 'playground', title: 'PLAYGROUND', subtitle: 'INSPIRATION · 2026' },
]

const ERA_LABELS = {
  about:'关于我', work:'复盘工作台', playground:'灵感捕手',
}

export default function App() {
  const [active, setActive] = useState('about')

  const activeEra = useMemo(() => ERAS.find(e => e.id === active), [active])

  /* About renders full-screen — outside normal layout */
  if (active === 'about') {
    return (
      <main className="archive-viewer">
        {/* minimal top bar */}
        <header className="archive-bar" style={{background:'rgba(255,255,255,.7)',backdropFilter:'blur(8px)',border:'none',position:'fixed',top:0,left:0,right:0,zIndex:60}}>
          <div className="archive-left">
            <div className="archive-brand">
              <strong>Personal Archive</strong>
              <span>数字档案</span>
            </div>
          </div>
          <nav className="era-tabs">
            {ERAS.map(era => (
              <button key={era.id} type="button"
                className={`era-tab${active===era.id?' active':''}`}
                onClick={() => setActive(era.id)}
              ><strong>{era.title}</strong><span>{era.subtitle}</span></button>
            ))}
          </nav>
          <label className="era-select">
            <span>ERA</span>
            <select value={active} onChange={e => setActive(e.target.value)}>
              {ERAS.map(e => <option key={e.id} value={e.id}>{e.title} ({e.subtitle})</option>)}
            </select>
          </label>
        </header>
        <About />
      </main>
    )
  }

  /* Normal layout for work / playground */
  return (
    <main className="archive-viewer">
      <header className="archive-bar">
        <div className="archive-left">
          <div className="archive-brand">
            <strong>Personal Archive</strong>
            <span>数字档案</span>
          </div>
          <span className="archive-return">archived since 2026</span>
        </div>
        <nav className="era-tabs">
          {ERAS.map(era => (
            <button key={era.id} type="button"
              className={`era-tab${active===era.id?' active':''}`}
              onClick={() => setActive(era.id)}
            ><strong>{era.title}</strong><span>{era.subtitle}</span></button>
          ))}
        </nav>
        <label className="era-select">
          <span>ERA</span>
          <select value={active} onChange={e => setActive(e.target.value)}>
            {ERAS.map(e => <option key={e.id} value={e.id}>{e.title} ({e.subtitle})</option>)}
          </select>
        </label>
        <div className="archive-note">
          <strong>Personal copy</strong>
          <span>一个持续更新的个人数字档案——记录、复盘与灵感。</span>
        </div>
      </header>

      <section className="site-stage">
        <div className="stage-header">
          <div className="stage-era">ERA — {activeEra.title}</div>
          <h2 className="stage-title">{ERA_LABELS[active]}</h2>
        </div>
        <div className="stage-content" key={active}>
          {active==='work'?<Workbench/>:<Playground/>}
        </div>
      </section>

      <footer className="site-footer">
        <strong>© 2026 Personal Archive</strong>
        <span>Built with care.</span>
      </footer>
    </main>
  )
}
