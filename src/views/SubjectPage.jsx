import { useState } from "react";
import ThCard from "../components/ThCard";
import PmCard from "../components/PmCard";
import PcCard from "../components/PcCard";
import theoretical from "../data/theoretical";
import practicalMCQ from "../data/practicalMCQ";
import practicalCalc from "../data/practicalCalc";

const TABS = {
  theoretical: { label: "Theoretical", emoji: "📚", color: "#1a3a5c" },
  practicalMCQ: { label: "Practical MCQ", emoji: "🧮", color: "#1a5c3a" },
  practicalCalc: { label: "Calculations", emoji: "⚡", color: "#5c1a3a" },
};

const DATA = { theoretical, practicalMCQ, practicalCalc };

export default function SubjectPage({ onBack, saved, toggle }) {
  const [tab, setTab] = useState("theoretical");
  const [search, setSearch] = useState("");

  const counts = {
    theoretical: theoretical.length,
    practicalMCQ: practicalMCQ.length,
    practicalCalc: practicalCalc.length,
  };
  const total = counts.theoretical + counts.practicalMCQ + counts.practicalCalc;
  const t = TABS[tab];
  const q = DATA[tab] || [];

  const filtered = search
    ? q.filter((x) =>
        ((x.text || "") + (x.title || "") + (x.options || []).join(" "))
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : q;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Top navbar */}
      <div style={{
        background: "#1a3a5c", color: "#fff", padding: "0.9rem 1.25rem",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button
          onClick={onBack}
          style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 5, padding: "4px 12px", cursor: "pointer", fontSize: 12 }}
        >
          ← Home
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Applied Electronics and Measurements</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>{total} questions</div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "2px solid #ddd", background: "#fff", position: "sticky", top: "43px", zIndex: 9 }}>
        {Object.entries(TABS).map(([key, m]) => (
          <button
            key={key}
            onClick={() => { setTab(key); setSearch(""); }}
            style={{
              flex: 1, padding: "10px 4px", border: "none",
              borderBottom: tab === key ? `3px solid ${m.color}` : "3px solid transparent",
              background: "transparent", cursor: "pointer", fontSize: 12,
              color: tab === key ? m.color : "#888",
              fontWeight: tab === key ? 700 : 400,
              transition: "all 0.12s",
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 2 }}>{m.emoji}</div>
            {m.label}
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>{counts[key]} q</div>
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div style={{ padding: "0.7rem 1rem", background: "#fff", borderBottom: "1px solid #eee" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search in ${t.label.toLowerCase()}...`}
          style={{ width: "100%", padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }}
        />
        {search && (
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>{filtered.length} result(s)</div>
        )}
      </div>

      {/* Questions list */}
      <div style={{ padding: "0.7rem 0.9rem" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#bbb", fontSize: 14 }}>
            No questions found.
          </div>
        )}
        {tab === "theoretical" && filtered.map((q, i) => (
          <ThCard key={q.id} q={q} idx={i} saved={saved} toggle={toggle} />
        ))}
        {tab === "practicalMCQ" && filtered.map((q, i) => (
          <PmCard key={q.id} q={q} idx={i} saved={saved} toggle={toggle} />
        ))}
        {tab === "practicalCalc" && filtered.map((q, i) => (
          <PcCard key={q.id} q={q} idx={i} saved={saved} toggle={toggle} />
        ))}
      </div>
    </div>
  );
}
