import { useState, useEffect } from "react";
import HomePage from "./views/HomePage";
import SubjectPage from "./views/SubjectPage";

export default function App() {
  const [page, setPage] = useState("home");
  const [saved, setSaved] = useState([]);

  // Load bookmarks from localStorage on startup
  useEffect(() => {
    try {
      const s = localStorage.getItem("aem_saved_v3");
      if (s) setSaved(JSON.parse(s));
    } catch (e) {}
  }, []);

  // Save bookmark to localStorage
  const toggleSave = (id) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem("aem_saved_v3", JSON.stringify(next));
    } catch (e) {}
  };

  if (page === "home") {
    return <HomePage onEnter={() => setPage("subject")} saved={saved} />;
  }

  return (
    <SubjectPage
      onBack={() => setPage("home")}
      saved={saved}
      toggle={toggleSave}
    />
  );
}
