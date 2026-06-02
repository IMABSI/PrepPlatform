/* =====================================================================
   src/App.jsx
   ---------------------------------------------------------------------
   Top-level component: state, persistence shim, page switching.
   Drop into a Vite + React project (replaces the existing App.jsx);
   the rest of the files go into src/data/, src/circuits/, src/components/,
   src/views/ as named.
   ===================================================================== */
import React, { useState, useEffect } from "react";
import { HomePage, SubjectPage, SapPage, DB } from "./views";

/* ── tiny persistence shim ───────────────────────────────────────────
   Tries window.storage (Claude artifact host) first, then localStorage
   (Vite/local build), else falls back silently to in-memory. Same code
   works in both environments — no separate build needed.
   ───────────────────────────────────────────────────────────────── */
const store = {
  async get(k) {
    try { if (typeof window !== "undefined" && window.storage) { const r = await window.storage.get(k); return r ? r.value : null; } } catch (e) {}
    try { return localStorage.getItem(k); } catch (e) { return null; }
  },
  async set(k, v) {
    try { if (typeof window !== "undefined" && window.storage) { await window.storage.set(k, v); return; } } catch (e) {}
    try { localStorage.setItem(k, v); } catch (e) {}
  },
};

const C = { ink: "#1c2b3a", paper: "#f6f2e9" };

export default function App() {
  const [page,  setPage]  = useState("home");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    (async () => {
      const v = await store.get("aem_saved");
      if (v) { try { setSaved(JSON.parse(v)); } catch (e) {} }
    })();
  }, []);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    store.set("aem_saved", JSON.stringify(next));
  };

  const counts = {
    theoretical:   DB.theoretical.length,
    practicalMCQ:  DB.practicalMCQ.length,
    practicalCalc: DB.practicalCalc.length,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.paper, color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
        button:focus { outline: none; }
      `}</style>
      {page === "home" && (
        <HomePage
          go={() => setPage("subject")}
          goSap={() => setPage("sap")}
          counts={counts}
        />
      )}
      {page === "subject" && (
        <SubjectPage back={() => setPage("home")} saved={saved} toggleSave={toggleSave} />
      )}
      {page === "sap" && (
        <SapPage back={() => setPage("home")} saved={saved} toggleSave={toggleSave} />
      )}
    </div>
  );
}