export default function StarBtn({ id, saved, toggle }) {
  const on = saved.includes(id);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(id); }}
      title={on ? "Remove bookmark" : "Bookmark"}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: on ? "#f0a500" : "#ccc", fontSize: 22, padding: 2,
        lineHeight: 1, flexShrink: 0,
      }}
    >
      {on ? "★" : "☆"}
    </button>
  );
}
