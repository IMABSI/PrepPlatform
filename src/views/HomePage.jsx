import theoretical from "../data/theoretical";
import practicalMCQ from "../data/practicalMCQ";
import practicalCalc from "../data/practicalCalc";

export default function HomePage({ onEnter, saved }) {
  const counts = {
    theoretical: theoretical.length,
    practicalMCQ: practicalMCQ.length,
    practicalCalc: practicalCalc.length,
  };
  const total = counts.theoretical + counts.practicalMCQ + counts.practicalCalc;

  return (
    <div style={{ padding: "2rem 1.5rem", minHeight: "100vh", background: "#f5f7fa" }}>
      {/* Header */}
      <div style={{ borderBottom: "3px solid #1a3a5c", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>
          Politecnico di Torino
        </div>
        <div style={{ fontSize: 26, color: "#1a3a5c", fontWeight: 700 }}>📖 Exam Study Platform</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>
          Compiled from real exams — all questions, all options, correct answers + explanations
        </div>
      </div>

      {/* Subject card */}
      <div
        onClick={onEnter}
        style={{
          background: "#fff", border: "2px solid #1a3a5c", borderRadius: 12,
          padding: "1.4rem", cursor: "pointer", transition: "box-shadow 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,58,92,0.18)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#1a3a5c", textTransform: "uppercase", marginBottom: 4 }}>AEM</div>
            <div style={{ fontSize: 18, color: "#1a3a5c", fontWeight: 700, lineHeight: 1.3 }}>
              Applied Electronics and Measurements
            </div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
              Exams: 2024-06-13 · 2025-06-05 · 2025-06-17 · 2026-01-26
            </div>
          </div>
          <span style={{ fontSize: 24, color: "#1a3a5c" }}>→</span>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#ddeeff", color: "#1a3a5c", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>
            📚 {counts.theoretical} Theoretical
          </span>
          <span style={{ background: "#ddf5e8", color: "#1a5c3a", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>
            🧮 {counts.practicalMCQ} Practical MCQ
          </span>
          <span style={{ background: "#f5ddf0", color: "#5c1a3a", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>
            ⚡ {counts.practicalCalc} Calculations
          </span>
          <span style={{ background: "#fff3cc", color: "#7a5500", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>
            ⭐ {saved.length} Saved
          </span>
          <span style={{ background: "#f0f0f0", color: "#555", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>
            {total} Total
          </span>
        </div>
      </div>

      <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#bbb", textAlign: "center" }}>
        Send more exam PDFs to Claude → questions get added automatically
      </p>
    </div>
  );
}
