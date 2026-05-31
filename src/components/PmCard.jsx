import { useState } from "react";
import StarBtn from "./StarBtn";
import Sources from "./Sources";
import BridgeCircuit from "../circuits/BridgeCircuit";
import TempSensorCircuit from "../circuits/TempSensorCircuit";
import PotCircuit from "../circuits/PotCircuit";
import VoltAmmeterCircuit from "../circuits/VoltAmmeterCircuit";

function CircuitRenderer({ circuitKey }) {
  if (!circuitKey) return null;
  if (circuitKey === "BridgeCircuit") return <BridgeCircuit />;
  if (circuitKey === "TempSensorCircuit") return <TempSensorCircuit />;
  if (circuitKey === "PotCircuit") return <PotCircuit />;
  if (circuitKey === "VoltAmmeterCircuit_upstream") return <VoltAmmeterCircuit config="upstream" />;
  if (circuitKey === "VoltAmmeterCircuit_downstream") return <VoltAmmeterCircuit config="downstream" />;
  return null;
}

export default function PmCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}
      >
        <span style={{ background: "#ddf5e8", color: "#1a5c3a", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>
          P{idx + 1}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: "#222" }}>{q.text}</div>
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
          {/* Circuit diagram */}
          {q.circuit && (
            <div style={{ marginBottom: 14 }}>
              <CircuitRenderer circuitKey={q.circuit} />
            </div>
          )}

          {/* Sub-questions */}
          {q.subquestions.map((sq, si) => (
            <div key={si} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
                {q.subquestions.length > 1 ? `Part ${si + 1}: ` : ""}{sq.text}
              </div>
              {sq.options.map((opt, oi) => (
                <div
                  key={oi}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 10px", borderRadius: 5, marginBottom: 4,
                    background: show ? (oi === sq.correct ? "#edf8f0" : "#fafafa") : "#fafafa",
                    border: show ? (oi === sq.correct ? "1.5px solid #3a9a60" : "1px solid #eee") : "1px solid #eee",
                  }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 600, flexShrink: 0,
                    background: show ? (oi === sq.correct ? "#3a9a60" : "#ddd") : "#ddd",
                    color: show ? (oi === sq.correct ? "#fff" : "#666") : "#666",
                  }}>
                    {oi + 1}
                  </span>
                  <span style={{ fontSize: 13, color: "#333", flex: 1 }}>{opt}</span>
                  {show && oi === sq.correct && <span style={{ color: "#3a9a60", fontSize: 15 }}>✓</span>}
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={() => setShow(!show)}
            style={{ background: show ? "#3a9a60" : "#1a5c3a", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}
          >
            {show ? "Hide Solution" : "Show Solution"}
          </button>

          {show && q.solution && (
            <div style={{ marginTop: 10, background: "#f0fbf4", border: "1px solid #b0dfc0", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#2a7040", fontWeight: 700, marginBottom: 4 }}>SOLUTION</div>
              <pre style={{ fontSize: 12, color: "#333", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0, fontFamily: "monospace" }}>{q.solution}</pre>
            </div>
          )}

          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}
