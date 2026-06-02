/* =====================================================================
   src/components/index.jsx
   ---------------------------------------------------------------------
   Small reusable pieces: StarBtn, Sources, Circuit wrapper, and the
   three card types — ThCard (theory, supports multi-select),
   PmCard (practical MCQ + circuit), PcCard (full calculation exercise).
   ===================================================================== */
import React, { useState } from "react";
import { CIRCUITS } from "../circuits";

/* palette — must match App.jsx */
const C = {
  ink: "#1c2b3a", navy: "#16324f", paper: "#f6f2e9", line: "#cdbfa6",
  amber: "#c8862b", green: "#2f7d4f", greenBg: "#e4f1e8", red: "#b23b3b",
  redBg: "#f6e3e1", mut: "#7d7363", card: "#fffdf8",
};

/* shared inline styles */
const card = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18, marginBottom: 16, boxShadow: "3px 3px 0 #efe6d3" };
const cardHead = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 10 };
const topicTag = { background: "#dde9f4", color: C.navy, borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" };
const qText = { fontFamily: "Georgia, serif", fontSize: 15.5, lineHeight: 1.55, color: C.ink, marginBottom: 6 };
const selectHint = { fontSize: 11.5, color: C.mut, fontFamily: "'JetBrains Mono', monospace", marginBottom: 2 };
const showBtn = { marginTop: 12, background: C.navy, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 };
const explBox = { marginTop: 10, background: "#fbf7ee", border: `1px solid ${C.line}`, borderRadius: 8, padding: "11px 13px", fontSize: 13, lineHeight: 1.6, fontFamily: "Georgia, serif", color: C.ink };
const subHead = { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.amber, margin: "10px 0 4px" };
const ul = { margin: "0 0 4px", paddingLeft: 20, fontSize: 13.5, lineHeight: 1.6, fontFamily: "Georgia, serif" };

export const StarBtn = ({ on, onClick }) => (
  <button onClick={onClick} title="Bookmark" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: on ? C.amber : "#cabfa9", lineHeight: 1, padding: 0 }}>
    {on ? "★" : "☆"}
  </button>
);

export const Sources = ({ list }) => (
  <div style={{ marginTop: 10, fontSize: 11, color: C.mut, fontFamily: "'JetBrains Mono', monospace" }}>
    seen in: {list.join("  ·  ")}
  </div>
);

export const Circuit = ({ name }) => {
  const Cmp = CIRCUITS[name];
  if (!Cmp) return null;
  return (
    <div style={{ background: "#fffefb", border: `1px dashed ${C.line}`, borderRadius: 8, padding: "10px 8px", margin: "10px 0", textAlign: "center" }}>
      <Cmp />
    </div>
  );
};

/* ───── Theory card (handles "select all that apply") ───── */
export const ThCard = ({ q, saved, toggleSave }) => {
  const [picks, setPicks] = useState([]);
  const [show, setShow]   = useState(false);
  const nCorrect = q.options.filter((o) => o.correct).length;
  const multi    = q.multi || nCorrect > 1;
  const pick = (i) => {
    if (show) return;
    setPicks(multi ? (picks.includes(i) ? picks.filter((p) => p !== i) : [...picks, i]) : [i]);
  };
  return (
    <div style={card}>
      <div style={cardHead}>
        <span style={topicTag}>{q.topic}</span>
        <StarBtn on={saved} onClick={toggleSave} />
      </div>
      <div style={qText}>{q.text}</div>
      {multi  && <div style={{ ...selectHint, color: C.amber }}>◇ Select all that apply ({nCorrect} correct)</div>}
      {!multi && <div style={selectHint}>Select one</div>}
      {q.circuit && <Circuit name={q.circuit} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
        {q.options.map((o, i) => {
          let bg = "#fff", bd = C.line, mark = null;
          if (show) {
            if (o.correct)               { bg = C.greenBg; bd = C.green; mark = "✓"; }
            else if (picks.includes(i))  { bg = C.redBg;   bd = C.red;   mark = "✗"; }
          } else if (picks.includes(i))  { bg = "#efe7d6"; bd = C.amber; }
          return (
            <button key={i} onClick={() => pick(i)} style={{ textAlign: "left", background: bg, border: `1.5px solid ${bd}`, borderRadius: 8, padding: "9px 12px", cursor: show ? "default" : "pointer", fontSize: 13.5, lineHeight: 1.5, color: C.ink, fontFamily: "Georgia, serif", display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 700, color: show && o.correct ? C.green : C.mut }}>{mark || String.fromCharCode(97 + i) + ")"}</span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>
      <button onClick={() => setShow(!show)} style={showBtn}>{show ? "Hide answer" : "Show answer"}</button>
      {show && <div style={explBox}><b style={{ color: C.navy }}>Why: </b>{q.explanation}</div>}
      {show && <Sources list={q.sources} />}
    </div>
  );
};

/* ───── Practical MCQ card (calc + circuit) ───── */
export const PmCard = ({ q, saved, toggleSave }) => {
  const [show, setShow] = useState(false);
  const [pick, setPick] = useState(-1);
  return (
    <div style={card}>
      <div style={cardHead}>
        <span style={{ ...topicTag, background: C.greenBg, color: C.green }}>{q.topic}</span>
        <StarBtn on={saved} onClick={toggleSave} />
      </div>
      <div style={qText}>{q.text}</div>
      {q.circuit && <Circuit name={q.circuit} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {q.options.map((o, i) => {
          let bg = "#fff", bd = C.line, mark = String.fromCharCode(97 + i) + ")";
          if (show) {
            if (o.correct)         { bg = C.greenBg; bd = C.green; mark = "✓"; }
            else if (i === pick)   { bg = C.redBg;   bd = C.red;   mark = "✗"; }
          } else if (i === pick)   { bg = "#efe7d6"; bd = C.amber; }
          return (
            <button key={i} onClick={() => !show && setPick(i)} style={{ textAlign: "left", background: bg, border: `1.5px solid ${bd}`, borderRadius: 8, padding: "9px 12px", cursor: show ? "default" : "pointer", fontSize: 13.5, color: C.ink, fontFamily: "'JetBrains Mono', monospace", display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 700, color: show && o.correct ? C.green : C.mut }}>{mark}</span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>
      <button onClick={() => setShow(!show)} style={showBtn}>{show ? "Hide solution" : "Show solution"}</button>
      {show && <div style={explBox}><b style={{ color: C.navy }}>Solution: </b>{q.explanation}</div>}
      {show && <Sources list={q.sources} />}
    </div>
  );
};

/* ───── Practical full-calculation card ───── */
export const PcCard = ({ q, saved, toggleSave }) => {
  const [show, setShow] = useState(false);
  return (
    <div style={card}>
      <div style={cardHead}>
        <span style={{ ...topicTag, background: "#f1e6f0", color: "#7a2c63" }}>{q.topic}</span>
        <StarBtn on={saved} onClick={toggleSave} />
      </div>
      {q.circuit && <Circuit name={q.circuit} />}
      <div style={subHead}>Given</div>
      <ul style={ul}>{q.given.map((g, i) => <li key={i}>{g}</li>)}</ul>
      <div style={subHead}>Find</div>
      <ul style={ul}>{q.find.map((f, i) => <li key={i}>{f}</li>)}</ul>
      <button onClick={() => setShow(!show)} style={showBtn}>{show ? "Hide solution" : "Show solution"}</button>
      {show && (
        <div style={{ marginTop: 10 }}>
          <div style={subHead}>Step-by-step</div>
          <ol style={{ ...ul, listStyle: "decimal" }}>
            {q.solution.map((s, i) => <li key={i} style={{ marginBottom: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, lineHeight: 1.6 }}>{s}</li>)}
          </ol>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {Object.entries(q.answers).map(([k, v]) => (
              <span key={k} style={{ background: C.greenBg, border: `1px solid ${C.green}`, borderRadius: 6, padding: "4px 9px", fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>
                <b>{k}</b> = {v}
              </span>
            ))}
          </div>
          {q.variants && q.variants.map((va, i) => (
            <div key={i} style={{ marginTop: 8, fontSize: 12, color: C.mut, fontFamily: "'JetBrains Mono', monospace" }}>
              ↳ variant — {va.given} → {va.answers}
            </div>
          ))}
          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
};
/* ───── SAP card (Signal Analysis & Processing — MCQ with derived-answer flag) ───── */
export const SapCard = ({ q, saved, toggleSave }) => {
  const [show, setShow] = useState(false);
  const [pick, setPick] = useState(-1);
  return (
    <div style={card}>
      <div style={cardHead}>
        <span style={{ ...topicTag, background: "#d8f0f1", color: "#155e63" }}>{q.topic}</span>
        <StarBtn on={saved} onClick={toggleSave} />
      </div>
      <div style={qText}>{q.text}</div>
      {q.verify && <div style={{ ...selectHint, color: C.amber }}>⚠ Derived answer — verify against your Fourier/Z tables</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
        {q.options.map((o, i) => {
          let bg = "#fff", bd = C.line, mark = String.fromCharCode(97 + i) + ")";
          if (show) {
            if (o.correct)       { bg = C.greenBg; bd = C.green; mark = "✓"; }
            else if (i === pick) { bg = C.redBg;   bd = C.red;   mark = "✗"; }
          } else if (i === pick) { bg = "#efe7d6"; bd = C.amber; }
          return (
            <button key={i} onClick={() => !show && setPick(i)} style={{ textAlign: "left", background: bg, border: `1.5px solid ${bd}`, borderRadius: 8, padding: "9px 12px", cursor: show ? "default" : "pointer", fontSize: 13.5, lineHeight: 1.5, color: C.ink, fontFamily: "'JetBrains Mono', monospace", display: "flex", gap: 8 }}>
              <span style={{ fontWeight: 700, color: show && o.correct ? C.green : C.mut }}>{mark}</span>
              <span>{o.text}</span>
            </button>
          );
        })}
      </div>
      <button onClick={() => setShow(!show)} style={showBtn}>{show ? "Hide solution" : "Show solution"}</button>
      {show && q.explanation && <div style={explBox}><b style={{ color: C.navy }}>Solution: </b>{q.explanation}</div>}
      {show && <Sources list={q.sources} />}
    </div>
  );
};