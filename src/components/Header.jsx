export default function Header({ activeEntry, onSelect }) {
  const links = [
    { id: 'about', label: '/about' },
    { id: 'work', label: '/work' },
    { id: 'playground', label: '/playground' },
  ]

  return (
    <header className="header">
      <div className="header-left">YOUR NAME · ARCHIVE</div>
      <nav className="header-right">
        {links.map(link => (
          <a
            key={link.id}
            className={activeEntry === link.id ? 'active' : ''}
            onClick={() => onSelect(link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
