const tasks = [
  { name: '重构 API 中间件', progress: 75, status: 'yellow' },
  { name: '编写集成测试', progress: 40, status: 'yellow' },
  { name: '性能基准测试', progress: 90, status: 'green' },
  { name: '个人网站 v2', progress: 60, status: 'green' },
  { name: '数据库迁移', progress: 100, status: 'green' },
  { name: '安全审计', progress: 100, status: 'green' },
]

const retroNotes = [
  { tag: '踩坑', text: 'N+1 查询导致列表页响应超过 2 秒，已通过批量预加载解决。' },
  { tag: '顿悟', text: '组件拆分粒度不是越细越好——当状态在三层以上传递时，合并比拆分更清晰。' },
  { tag: '修复', text: 'CI 流水线中 Node 版本锁定为 20 LTS，消除了本地与构建环境的不一致。' },
]

export default function Workbench() {
  return (
    <section>
      {/* Stats row */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-label">Tasks</span>
          <span className="stat-val">12</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Focus</span>
          <span className="stat-val">重构中</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Day</span>
          <span className="stat-val">4</span>
        </div>
      </div>

      {/* Two columns */}
      <div className="retro-cols">
        <div className="retro-col">
          <h4>当前聚焦</h4>
          <div className="focus-status">重构中</div>
          <p className="focus-desc">
            优化核心模块架构，减少组件间耦合。
          </p>
        </div>

        <div className="retro-col">
          <h4>昨日复盘</h4>
          {retroNotes.map((n, i) => (
            <div className="retro-note" key={i}>
              <span className="note-tag">{n.tag}</span>
              <span className="note-text">{n.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task list */}
      <h4 style={{marginBottom:'1rem',fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.12em',color:'var(--gray)',fontWeight:600}}>
        任务列表
      </h4>
      <ul className="task-list">
        {tasks.map((t, i) => (
          <li className="task-item" key={i}>
            <span className="task-name"
              style={t.progress===100?{color:'var(--gray-light)'}:{}}
            >
              {t.name}
            </span>
            <div className="task-bar-wrap">
              <div className="task-bar-fill" style={{width:t.progress+'%'}} />
            </div>
            <span className={`task-dot ${t.status}`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
