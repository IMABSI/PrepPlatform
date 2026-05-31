export default function TLCircuit({ params = {} }) {
  const {
    R0 = "50 Ω", Vcc = "3.3 V", Zinf = "44.72 Ω",
    tp = "16.77 ns", farEnd = "Open (∞)"
  } = params;
  return (
    <svg viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 460, display: "block", margin: "8px auto" }}>
      <rect width="460" height="160" fill="#fafafa" rx="6" stroke="#ddd"/>
      <text x="10" y="14" fontSize="9" fill="#888">Transmission Line — Reflected Wave Switching</text>

      {/* CMOS Driver box */}
      <rect x="10" y="40" width="70" height="60" fill="#e8f0ff" stroke="#3355aa" strokeWidth="1.5" rx="4"/>
      <text x="45" y="62" textAnchor="middle" fontSize="9" fill="#3355aa" fontWeight="bold">CMOS</text>
      <text x="45" y="74" textAnchor="middle" fontSize="9" fill="#3355aa">Driver</text>
      <text x="45" y="86" textAnchor="middle" fontSize="8" fill="#555">V={Vcc}</text>
      <text x="45" y="96" textAnchor="middle" fontSize="8" fill="#555">R₀={R0}</text>

      {/* R_S series resistor */}
      <line x1="80" y1="70" x2="100" y2="70" stroke="#333" strokeWidth="1.5"/>
      <rect x="100" y="62" width="30" height="16" fill="#fff" stroke="#555" strokeWidth="1.5" rx="2"/>
      <text x="115" y="73" textAnchor="middle" fontSize="8" fill="#333">R_S</text>
      <line x1="130" y1="70" x2="150" y2="70" stroke="#333" strokeWidth="1.5"/>

      {/* Transmission Line box */}
      <rect x="150" y="45" width="160" height="50" fill="#fff8e0" stroke="#cc8800" strokeWidth="2" rx="4"/>
      <text x="230" y="65" textAnchor="middle" fontSize="10" fill="#cc8800" fontWeight="bold">Transmission Line</text>
      <text x="230" y="78" textAnchor="middle" fontSize="8" fill="#666">Z∞ = {Zinf}</text>
      <text x="230" y="89" textAnchor="middle" fontSize="8" fill="#666">tp = {tp}</text>

      {/* Near-end receiver */}
      <line x1="150" y1="70" x2="150" y2="115" stroke="#333" strokeWidth="1.5"/>
      <rect x="128" y="115" width="44" height="28" fill="#f0fff0" stroke="#339944" strokeWidth="1.5" rx="3"/>
      <text x="150" y="127" textAnchor="middle" fontSize="8" fill="#339944">Receiver</text>
      <text x="150" y="137" textAnchor="middle" fontSize="8" fill="#339944">near end</text>

      {/* Far-end receiver */}
      <line x1="310" y1="70" x2="310" y2="115" stroke="#333" strokeWidth="1.5"/>
      <rect x="288" y="115" width="44" height="28" fill="#f0fff0" stroke="#339944" strokeWidth="1.5" rx="3"/>
      <text x="310" y="127" textAnchor="middle" fontSize="8" fill="#339944">Receiver</text>
      <text x="310" y="137" textAnchor="middle" fontSize="8" fill="#339944">far end</text>

      {/* Termination */}
      <line x1="310" y1="70" x2="350" y2="70" stroke="#333" strokeWidth="1.5"/>
      <rect x="350" y="55" width="50" height="30" fill="#ffe8e8" stroke="#cc4444" strokeWidth="1.5" rx="3"/>
      <text x="375" y="68" textAnchor="middle" fontSize="8" fill="#cc4444">Term:</text>
      <text x="375" y="79" textAnchor="middle" fontSize="8" fill="#cc4444">{farEnd}</text>

      {/* Ground lines */}
      <line x1="150" y1="143" x2="150" y2="150" stroke="#333" strokeWidth="1.5"/>
      <line x1="140" y1="150" x2="160" y2="150" stroke="#333" strokeWidth="2"/>
      <line x1="144" y1="154" x2="156" y2="154" stroke="#333" strokeWidth="1.5"/>
      <line x1="310" y1="143" x2="310" y2="150" stroke="#333" strokeWidth="1.5"/>
      <line x1="300" y1="150" x2="320" y2="150" stroke="#333" strokeWidth="2"/>
      <line x1="304" y1="154" x2="316" y2="154" stroke="#333" strokeWidth="1.5"/>

      {/* Labels */}
      <text x="155" y="42" fontSize="8" fill="#888">near (a)</text>
      <text x="295" y="42" fontSize="8" fill="#888">far (c)</text>
    </svg>
  );
}
