import { useState } from "react";
import StarBtn from "./StarBtn";
import Sources from "./Sources";

export default function ThCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ background: "#ddeeff", color: "#1a3a5c", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>
          Q{idx + 1}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, lineHeight: 1.55, color: "#222" }}>{q.text}</div>
          {q.multipleCorrect && (
            <span style={{ display: "inline-block", marginTop: 4, background: "#fff3cd", color: "#856404", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>
              ⚠️ Select ALL correct answers
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <StarBtn id={q.id} saved={saved} toggle={toggle} />
          <span style={{ color: "#aaa", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 14px" }}>
          {q.options.map((opt, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: 8,
                padding: "7px 10px", borderRadius: 6, marginBottom: 5,
                background: show ? (q.correct.includes(i) ? "#edf8f0" : "#fafafa") : "#fafafa",
                border: show ? (q.correct.includes(i) ? "1.5px solid #3a9a60" : "1px solid #eee") : "1px solid #eee",
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, flexShrink: 0,
                background: show ? (q.correct.includes(i) ? "#3a9a60" : "#ddd") : "#ddd",
                color: show ? (q.correct.includes(i) ? "#fff" : "#555") : "#555",
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: "#333", flex: 1 }}>{opt}</span>
              {show && q.correct.includes(i) && (
                <span style={{ color: "#3a9a60", fontSize: 16, flexShrink: 0 }}>✓</span>
              )}
            </div>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setShow(!show)}
              style={{ background: show ? "#3a9a60" : "#1a3a5c", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}
            >
              {show ? "Hide Answer" : "Show Answer"}
            </button>
            {show && (
              <span style={{ fontSize: 13, color: "#3a9a60", fontWeight: 600 }}>
                Correct: {q.correct.map((i) => String.fromCharCode(65 + i)).join(", ")}
              </span>
            )}
          </div>

          {show && q.explanation && (
            <div style={{ marginTop: 10, background: "#f0fbf4", border: "1px solid #b0dfc0", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#2a7040", fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 }}>EXPLANATION</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{q.explanation}</div>
            </div>
          )}

          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}
