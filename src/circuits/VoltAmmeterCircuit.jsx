export default function VoltAmmeterCircuit({ config = "upstream" }) {
  const isUpstream = config === "upstream";
  return (
    <svg viewBox="0 0 380 160" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 380, display: "block", margin: "8px auto" }}>
      <rect width="380" height="160" fill="#fafafa" rx="6" stroke="#ddd"/>
      <text x="10" y="14" fontSize="9" fill="#888">
        Volt-Ammeter Method — Voltmeter {isUpstream ? "UPSTREAM" : "DOWNSTREAM"}
      </text>

      {/* Power source */}
      <circle cx="30" cy="90" r="16" fill="none" stroke="#333" strokeWidth="1.5"/>
      <text x="30" y="87" textAnchor="middle" fontSize="8" fill="#333">E</text>
      <text x="30" y="97" textAnchor="middle" fontSize="8" fill="#555">src</text>
      <line x1="30" y1="74" x2="30" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="30" y1="106" x2="30" y2="130" stroke="#333" strokeWidth="1.5"/>
      <line x1="30" y1="50" x2="350" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="30" y1="130" x2="350" y2="130" stroke="#333" strokeWidth="1.5"/>

      {/* Ammeter */}
      <circle cx={isUpstream ? 120 : 200} cy="50" r="14" fill="#fff0e8" stroke="#cc5500" strokeWidth="1.5"/>
      <text x={isUpstream ? 120 : 200} y="47" textAnchor="middle" fontSize="9" fill="#cc5500">A</text>
      <text x={isUpstream ? 120 : 200} y="58" textAnchor="middle" fontSize="8" fill="#cc5500">R_A</text>

      {/* Voltmeter */}
      {isUpstream ? (
        <>
          <line x1="160" y1="50" x2="160" y2="78" stroke="#333" strokeWidth="1.5"/>
          <circle cx="160" cy="90" r="14" fill="#f0f0ff" stroke="#5566aa" strokeWidth="1.5"/>
          <text x="160" y="87" textAnchor="middle" fontSize="9" fill="#5566aa">V</text>
          <text x="160" y="98" textAnchor="middle" fontSize="8" fill="#5566aa">R_V</text>
          <line x1="160" y1="104" x2="160" y2="130" stroke="#333" strokeWidth="1.5"/>
        </>
      ) : (
        <>
          <line x1="280" y1="50" x2="280" y2="78" stroke="#333" strokeWidth="1.5"/>
          <circle cx="280" cy="90" r="14" fill="#f0f0ff" stroke="#5566aa" strokeWidth="1.5"/>
          <text x="280" y="87" textAnchor="middle" fontSize="9" fill="#5566aa">V</text>
          <text x="280" y="98" textAnchor="middle" fontSize="8" fill="#5566aa">R_V</text>
          <line x1="280" y1="104" x2="280" y2="130" stroke="#333" strokeWidth="1.5"/>
        </>
      )}

      {/* R_X resistor */}
      <rect x="230" y="38" width="40" height="16" fill="#ffe8e8" stroke="#cc4444" strokeWidth="1.5" rx="2"/>
      <text x="250" y="49" textAnchor="middle" fontSize="9" fill="#cc4444">R_X</text>

      {/* Labels */}
      <text x="185" y="44" fontSize="8" fill="#555">I →</text>
      <text x={isUpstream ? 168 : 140} y="85" fontSize="8" fill="#5566aa">V</text>
    </svg>
  );
}
