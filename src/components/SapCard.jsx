import { useState } from "react";
import StarBtn from "./StarBtn";
import Sources from "./Sources";

export default function SapCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ background: "#d8f0f1", color: "#155e63", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>
          S{idx + 1}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: "#222" }}>{q.text}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <StarBtn id={q.id} saved={saved} toggle={toggle} />
          <span style={{ color: "#aaa", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Expanded content */}
      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 14px" }}>

          {/* Verify notice */}
          {q.verify && (
            <div style={{ background: "#fff9e6", border: "1px solid #f0d080", borderRadius: 5, padding: "5px 10px", marginBottom: 10, fontSize: 11, color: "#a06b00" }}>
              ⚠️ Derived answer — verify against your Fourier/Z transform tables
            </div>
          )}

          {/* Options */}
          {(q.options || []).map((opt, oi) => {
            const isCorrect = (q.correct || []).includes(oi);
            return (
              <div
                key={oi}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  padding: "6px 10px", borderRadius: 5, marginBottom: 4,
                  background: show ? (isCorrect ? "#edf8f0" : "#fafafa") : "#fafafa",
                  border: show
                    ? (isCorrect ? "1.5px solid #3a9a60" : "1px solid #eee")
                    : "1px solid #eee",
                  transition: "background 0.15s, border 0.15s",
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: 3, marginTop: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 600, flexShrink: 0,
                  background: show ? (isCorrect ? "#3a9a60" : "#ddd") : "#ddd",
                  color: show ? (isCorrect ? "#fff" : "#666") : "#666",
                }}>
                  {oi + 1}
                </span>
                <span style={{ fontSize: 13, color: "#333", flex: 1, lineHeight: 1.5 }}>{opt}</span>
                {show && isCorrect && (
                  <span style={{ color: "#3a9a60", fontSize: 15, flexShrink: 0 }}>✓</span>
                )}
              </div>
            );
          })}

          {/* Show / Hide button */}
          <button
            onClick={() => setShow(!show)}
            style={{
              marginTop: 6,
              background: show ? "#3a9a60" : "#155e63",
              color: "#fff", border: "none", borderRadius: 5,
              padding: "6px 16px", cursor: "pointer", fontSize: 13,
            }}
          >
            {show ? "Hide Answer" : "Show Answer"}
          </button>

          {/* Explanation */}
          {show && q.explanation && (
            <div style={{ marginTop: 10, background: "#f0fbf4", border: "1px solid #b0dfc0", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#2a7040", fontWeight: 700, marginBottom: 4 }}>EXPLANATION</div>
              <div style={{ fontSize: 12, color: "#333", lineHeight: 1.8 }}>{q.explanation}</div>
            </div>
          )}

          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}