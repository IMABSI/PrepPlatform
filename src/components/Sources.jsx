export default function Sources({ list }) {
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
      {list.map((s) => (
        <span key={s} style={{
          background: "#f0f0f0", color: "#888", borderRadius: 4,
          padding: "1px 7px", fontSize: 10,
        }}>
          {s}
        </span>
      ))}
    </div>
  );
}
