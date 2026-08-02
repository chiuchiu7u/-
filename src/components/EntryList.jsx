export default function EntryList({ entries, activeEntry, onSelect }) {
  return (
    <nav>
      <ul className="entry-list">
        {entries.map(entry => (
          <li
            key={entry.id}
            className={`entry-item${activeEntry === entry.id ? ' active' : ''}`}
            onClick={() => onSelect(entry.id)}
          >
            <span className="entry-title">{entry.title}</span>
            <span className="entry-meta">{entry.meta}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
