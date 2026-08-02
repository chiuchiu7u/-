import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Orbit tags config ─────────────────────────────────── */
const ORBIT_TAGS = [
  { id: 'a', label: 'TypeScript', title: 'TypeScript', desc: '类型系统让重构变得安全而自信——它是 JavaScript 的制衡力量。' },
  { id: 'b', label: 'React', title: 'React', desc: '声明式 UI 的范式改变了我对界面的思考方式。组件即函数，状态即真相。' },
  { id: 'c', label: 'Rust', title: 'Rust', desc: '还在学习阶段。所有权模型让人重新理解内存——每一次编译通过都是一次小胜利。' },
  { id: 'd', label: 'Design', title: 'Design', desc: '好的设计不是装饰，而是让信息自己说话。少即是多，白即是满。' },
  { id: 'e', label: '摄影', title: '摄影', desc: '用 Fuji X-T5 记录光线。最喜欢的题材是黄昏时的城市边缘——那种即将消失的暖色。' },
  { id: 'f', label: '开源', title: '开源', desc: '相信开放协作的力量。在 GitHub 上维护着几个小项目，欢迎来贡献。' },
  { id: 'g', label: '咖啡', title: '咖啡', desc: '手冲咖啡是每日仪式。V60 滤杯 + 浅烘焙埃塞俄比亚 = 最佳早晨。' },
  { id: 'h', label: '写作', title: '写作', desc: '偶尔写技术博客。写作帮助我整理思路——如果你不能清楚地写出来，说明你还没真正理解。' },
]

const STATIC_ITEMS = [
  { title: '设计数据密集型应用', meta: 'Martin Kleppmann · 重读' },
  { title: 'Perfect Days', meta: 'Wim Wenders · 电影 · 2023' },
  { title: 'The Pragmatic Programmer', meta: 'Hunt & Thomas · 20th Anniversary' },
  { title: 'Software Design for Flexibility', meta: 'Sussman & Hanson · 在读' },
]

/* ── Component ─────────────────────────────────────────── */
export default function Playground() {
  const [popup, setPopup] = useState(null)
  const [positions, setPositions] = useState([])
  const rafRef = useRef(null)
  const startTimeRef = useRef(Date.now())

  /* ── Orbit animation ────────────────────────────────── */
  const animate = useCallback(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const speed = 0.25 // radians per second
    const baseAngle = elapsed * speed

    /* container-relative ellipse dimensions */
    const cx = 50  // percent
    const cy = 50  // percent
    const rx = 38  // percent
    const ry = 32  // percent

    const n = ORBIT_TAGS.length
    const newPositions = ORBIT_TAGS.map((_, i) => {
      const phase = (i / n) * Math.PI * 2
      const angle = baseAngle + phase
      const x = cx + rx * Math.cos(angle)
      const y = cy + ry * Math.sin(angle)
      return { x, y }
    })
    setPositions(newPositions)
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [animate])

  /* ── Popup handlers ─────────────────────────────────── */
  const openPopup = useCallback((tag) => setPopup(tag), [])
  const closePopup = useCallback(() => setPopup(null), [])

  /* ── Render ─────────────────────────────────────────── */
  return (
    <section>
      {/* Elliptical orbit */}
      <div className="orbit-stage">
        {ORBIT_TAGS.map((tag, i) => {
          const pos = positions[i]
          return (
            <span
              key={tag.id}
              className="orbit-tag"
              style={{
                left: pos ? `${pos.x}%` : '50%',
                top:  pos ? `${pos.y}%` : '50%',
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => openPopup(tag)}
            >
              {tag.label}
            </span>
          )
        })}
      </div>

      {/* Static inspiration list */}
      <h4 style={{
        fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.12em',
        color:'var(--gray)',fontWeight:600,marginBottom:'1rem',
      }}>
        最近
      </h4>
      <ul className="static-list">
        {STATIC_ITEMS.map((item, i) => (
          <li key={i}>
            <span className="sl-title">{item.title}</span>
            <span className="sl-meta">{item.meta}</span>
          </li>
        ))}
      </ul>

      {/* Popup */}
      {popup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-box" onClick={e => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>✕</button>
            <h3>{popup.title}</h3>
            <p>{popup.desc}</p>
          </div>
        </div>
      )}
    </section>
  )
}
