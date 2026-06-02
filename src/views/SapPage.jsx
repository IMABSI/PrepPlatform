import { useState } from "react";
import SapCard from "../components/SapCard";
import { sapQuestions, sapTopics } from "../data/sap";

const ACCENT = "#155e63";

export default function SapPage({ onBack, saved, toggle }) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? sapQuestions.filter((x) =>
        ((x.text || "") + " " + (x.topic || "") + " " + (x.options || []).join(" "))
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : sapQuestions;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Navbar */}
      <div style={{
        background: ACCENT, color: "#fff", padding: "0.9rem 1.25rem",
        display: "flex", alignItems: "center", gap: 10,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button
          onClick={onBack}
          style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 5, padding: "4px 12px", cursor: "pointer", fontSize: 12 }}
        >
          ← Home
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Signal Analysis &amp; Processing</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>{sapQuestions.length} questions</div>
      </div>

      {/* Search */}
      <div style={{ padding: "0.7rem 1rem", background: "#fff", borderBottom: "1px solid #eee" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search topics, formulas, options..."
          style={{ width: "100%", padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }}
        />
        {search && (
          <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>{filtered.length} result(s)</div>
        )}
      </div>

      {/* Questions grouped by topic */}
      <div style={{ padding: "0.7rem 0.9rem" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#bbb", fontSize: 14 }}>
            No questions found.
          </div>
        )}
        {sapTopics.map((topic) => {
          const qs = filtered.filter((x) => x.topic === topic);
          if (qs.length === 0) return null;
          return (
            <div key={topic} style={{ marginBottom: "1.4rem" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                margin: "0.4rem 0 0.7rem", paddingBottom: 5,
                borderBottom: `2px solid ${ACCENT}`,
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>{topic}</span>
                <span style={{ fontSize: 11, color: "#aaa" }}>{qs.length} q</span>
              </div>
              {qs.map((q) => (
                <SapCard key={q.id} q={q} idx={filtered.indexOf(q)} saved={saved} toggle={toggle} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}