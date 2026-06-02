import { useState } from "react";
import StarBtn from "./StarBtn";
import Sources from "./Sources";
import { CIRCUITS } from "../circuits";

function CircuitRenderer({ circuitKey }) {
  if (!circuitKey) return null;
  const Circuit = CIRCUITS[circuitKey];
  return Circuit ? <Circuit /> : null;
}

export default function PcCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const given = q.given || [];
  const find = q.find || [];
  const solution = Array.isArray(q.solution) ? q.solution : (q.solution ? [q.solution] : []);
  const answers = q.answers || {};
  const variants = q.variants || [];
  const title = q.title || q.topic || "Exercise";

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ background: "#f5ddf0", color: "#5c1a3a", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>
          C{idx + 1}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: "#111", fontWeight: 600, lineHeight: 1.3 }}>{title}</div>
          {q.text && <div style={{ fontSize: 12, color: "#777", marginTop: 3, lineHeight: 1.4 }}>{q.text}</div>}
          {q.circuit && (
            <span style={{ display: "inline-block", marginTop: 4, background: "#fff8e0", color: "#b35a00", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>
              ⚡ Circuit diagram included
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
          {q.circuit && (
            <div style={{ marginBottom: 14 }}>
              <CircuitRenderer circuitKey={q.circuit} />
            </div>
          )}

          {/* GIVEN */}
          {given.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>GIVEN</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {given.map((g, i) => (
                  <span key={i} style={{ background: "#faf0f6", border: "1px solid #e0c0d0", borderRadius: 5, padding: "3px 8px", fontSize: 12 }}>{g}</span>
                ))}
              </div>
            </div>
          )}

          {/* FIND */}
          {find.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>FIND</div>
              {find.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                  <span style={{ background: "#5c1a3a", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13, color: "#333", lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShow(!show)}
            style={{ background: show ? "#5c1a3a" : "#7a2552", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}
          >
            {show ? "Hide Solution" : "Show Full Solution"}
          </button>

          {show && (
            <div style={{ marginTop: 10 }}>
              {/* Answer badges (answers is an object {label: value}) */}
              {Object.keys(answers).length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {Object.entries(answers).map(([k, v]) => (
                    <span key={k} style={{ background: "#3a9a60", color: "#fff", borderRadius: 5, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
                      {k} = {v}
                    </span>
                  ))}
                </div>
              )}

              {/* Step-by-step solution */}
              {solution.length > 0 && (
                <div style={{ background: "#f8f0fb", border: "1px solid #d0a0e0", borderRadius: 6, padding: "10px 12px", marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 6 }}>STEP-BY-STEP SOLUTION</div>
                  {solution.map((s, i) => (
                    <div key={i} style={{ fontSize: 12.5, color: "#333", lineHeight: 1.7, marginBottom: 6, display: "flex", gap: 8 }}>
                      <span style={{ color: "#7a2c63", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Variants */}
              {variants.length > 0 && (
                <div style={{ background: "#fbf7ee", border: "1px solid #e0d5b8", borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: "#7a5500", fontWeight: 700, marginBottom: 6 }}>OTHER VARIANTS (same method, different numbers)</div>
                  {variants.map((v, i) => (
                    <div key={i} style={{ marginBottom: 8, fontSize: 12, lineHeight: 1.5 }}>
                      <div style={{ color: "#555" }}><strong>Given:</strong> {v.given}</div>
                      <div style={{ color: "#2a7040" }}><strong>Answers:</strong> {v.answers}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <Sources list={q.sources || []} />
        </div>
      )}
    </div>
  );
}