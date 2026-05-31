/* =====================================================================
   src/views/index.jsx
   ---------------------------------------------------------------------
   HomePage (landing) and SubjectPage (Theory / Practical MCQ / Calc tabs
   with search + bookmark filter).
   ===================================================================== */
import React, { useState } from "react";
import { ThCard, PmCard, PcCard } from "../components";
import { theoretical }   from "../data/theoretical";
import { practicalMCQ }  from "../data/practicalMCQ";
import { practicalCalc } from "../data/practicalCalc";

const C = {
  ink: "#1c2b3a", navy: "#16324f", paper: "#f6f2e9", line: "#cdbfa6",
  amber: "#c8862b", green: "#2f7d4f", greenBg: "#e4f1e8", mut: "#7d7363", card: "#fffdf8",
};

const DB = {
  subject: {
    id: "aem", code: "AEM",
    name: "Applied Electronics and Measurements",
    sessions: ["2024-06-13", "2024-09-14", "2025-06-05", "2025-06-17", "2026-01-26"],
  },
  theoretical, practicalMCQ, practicalCalc,
};

const TABS = {
  theoretical:   { t: "📚 Theory",        c: C.navy },
  practicalMCQ:  { t: "🧮 Practical MCQ", c: C.green },
  practicalCalc: { t: "⚡ Calculations",   c: "#7a2c63" },
};

export const HomePage = ({ go, counts }) => (
  <div style={{ padding: "44px 22px", maxWidth: 760, margin: "0 auto" }}>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 4, color: C.mut, textTransform: "uppercase" }}>Politecnico di Torino</div>
    <h1 style={{ fontFamily: "Georgia, serif", fontSize: 38, color: C.navy, margin: "6px 0 4px", fontWeight: 700, letterSpacing: -0.5 }}>Exam Study Platform</h1>
    <div style={{ color: C.mut, fontSize: 14, marginBottom: 30 }}>Real past-exam questions — every option merged, every correct answer marked, circuits drawn.</div>
    <button onClick={go} style={{ width: "100%", textAlign: "left", background: C.card, border: `1.5px solid ${C.navy}`, borderRadius: 14, padding: 22, cursor: "pointer", boxShadow: "4px 4px 0 #e7ddc9" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.amber }}>{DB.subject.code}</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C.navy, fontWeight: 700 }}>{DB.subject.name}</div>
          <div style={{ fontSize: 12, color: C.mut, marginTop: 4 }}>Sessions: {DB.subject.sessions.join("  ·  ")}</div>
        </div>
        <span style={{ fontSize: 26, color: C.navy }}>→</span>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {[
          ["📚 " + counts.theoretical   + " Theory",        "#dde9f4", C.navy],
          ["🧮 " + counts.practicalMCQ  + " Practical MCQ", C.greenBg, C.green],
          ["⚡ " + counts.practicalCalc + " Calculations",  "#f1e6f0", "#7a2c63"],
        ].map((p, i) => (
          <span key={i} style={{ background: p[1], color: p[2], borderRadius: 20, padding: "4px 12px", fontSize: 12.5, fontWeight: 600 }}>{p[0]}</span>
        ))}
      </div>
    </button>
    <div style={{ marginTop: 18, fontSize: 12, color: C.mut, lineHeight: 1.6 }}>
      All five exam sessions are merged into one bank. Theory questions that appeared with different correct options for different students are shown with <b>“select all that apply”</b> and every correct statement highlighted. Practical exercises that were parametric variants are grouped under one card with the alternate numbers listed underneath.
    </div>
  </div>
);

export const SubjectPage = ({ back, saved, toggleSave }) => {
  const [tab, setTab]             = useState("theoretical");
  const [search, setSearch]       = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const list = DB[tab].filter((q) => {
    const hay = ((q.text || "") + (q.topic || "") + (q.options || []).map((o) => o.text).join("")).toLowerCase();
    if (search   && !hay.includes(search.toLowerCase())) return false;
    if (onlySaved && !saved.includes(q.id))              return false;
    return true;
  });
  const Card = tab === "theoretical" ? ThCard : tab === "practicalMCQ" ? PmCard : PcCard;
  return (
    <div>
      <div style={{ background: C.navy, color: "#fff", padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={back} style={{ background: "rgba(255,255,255,0.18)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 13 }}>← Home</button>
        <div style={{ flex: 1, fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 600 }}>{DB.subject.name}</div>
      </div>
      <div style={{ display: "flex", background: "#efe8d8", borderBottom: `2px solid ${C.line}`, position: "sticky", top: 44, zIndex: 9 }}>
        {Object.entries(TABS).map(([k, m]) => (
          <button key={k} onClick={() => { setTab(k); setSearch(""); }} style={{ flex: 1, padding: "11px 4px", border: "none", background: "transparent", cursor: "pointer", fontSize: 12.5, color: tab === k ? m.c : C.mut, fontWeight: tab === k ? 700 : 400, borderBottom: tab === k ? `3px solid ${m.c}` : "3px solid transparent" }}>{m.t}</button>
        ))}
      </div>
      <div style={{ padding: "16px 16px 60px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions…" style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.line}`, fontSize: 13, background: "#fff", color: C.ink }} />
          <button onClick={() => setOnlySaved(!onlySaved)} style={{ border: `1.5px solid ${onlySaved ? C.amber : C.line}`, background: onlySaved ? "#efe7d6" : "#fff", color: onlySaved ? C.amber : C.mut, borderRadius: 8, padding: "0 14px", cursor: "pointer", fontSize: 13 }}>★ Saved</button>
        </div>
        {list.length === 0 && <div style={{ color: C.mut, textAlign: "center", padding: 40 }}>No questions match.</div>}
        {list.map((q) => <Card key={q.id} q={q} saved={saved.includes(q.id)} toggleSave={() => toggleSave(q.id)} />)}
      </div>
    </div>
  );
};

export { DB };