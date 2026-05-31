export default function BridgeCircuit() {
  return (
    <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 420, display: "block", margin: "8px auto" }}>
      {/* Background */}
      <rect width="420" height="220" fill="#fafafa" rx="6" stroke="#ddd" />
      <text x="10" y="16" fontSize="10" fill="#888">Wheatstone Bridge + Amplifier + ADC</text>

      {/* Voltage source */}
      <circle cx="40" cy="110" r="18" fill="none" stroke="#333" strokeWidth="1.5"/>
      <text x="40" y="107" textAnchor="middle" fontSize="9" fill="#333">V</text>
      <text x="40" y="118" textAnchor="middle" fontSize="9" fill="#333">S</text>
      <line x1="40" y1="92" x2="40" y2="70" stroke="#333" strokeWidth="1.5"/>
      <line x1="40" y1="128" x2="40" y2="150" stroke="#333" strokeWidth="1.5"/>

      {/* Top wire */}
      <line x1="40" y1="70" x2="110" y2="70" stroke="#333" strokeWidth="1.5"/>
      {/* Bottom wire */}
      <line x1="40" y1="150" x2="110" y2="150" stroke="#333" strokeWidth="1.5"/>

      {/* R_A top-left */}
      <rect x="110" y="55" width="40" height="16" fill="#fff" stroke="#555" strokeWidth="1.5" rx="2"/>
      <text x="130" y="66" textAnchor="middle" fontSize="9" fill="#333">R_A</text>
      <line x1="110" y1="63" x2="100" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="150" y1="63" x2="160" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="100" y1="63" x2="100" y2="70" stroke="#333" strokeWidth="1.5"/>
      <line x1="160" y1="63" x2="160" y2="70" stroke="#333" strokeWidth="1.5"/>

      {/* R_B bottom-left */}
      <rect x="110" y="149" width="40" height="16" fill="#fff" stroke="#555" strokeWidth="1.5" rx="2"/>
      <text x="130" y="160" textAnchor="middle" fontSize="9" fill="#333">R_B</text>
      <line x1="110" y1="157" x2="100" y2="157" stroke="#333" strokeWidth="1.5"/>
      <line x1="150" y1="157" x2="160" y2="157" stroke="#333" strokeWidth="1.5"/>
      <line x1="100" y1="157" x2="100" y2="150" stroke="#333" strokeWidth="1.5"/>
      <line x1="160" y1="157" x2="160" y2="150" stroke="#333" strokeWidth="1.5"/>

      {/* Node A (left middle) */}
      <line x1="100" y1="63" x2="100" y2="157" stroke="none"/>
      <circle cx="100" cy="110" r="3" fill="#333"/>
      <line x1="40" y1="70" x2="100" y2="70" stroke="#333" strokeWidth="1.5"/>
      <line x1="40" y1="150" x2="100" y2="150" stroke="#333" strokeWidth="1.5"/>
      <line x1="100" y1="70" x2="100" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="100" y1="150" x2="100" y2="157" stroke="#333" strokeWidth="1.5"/>
      <text x="86" y="108" fontSize="8" fill="#555">A</text>

      {/* R_S top-right */}
      <rect x="170" y="55" width="40" height="16" fill="#ffe8e8" stroke="#cc4444" strokeWidth="1.5" rx="2"/>
      <text x="190" y="66" textAnchor="middle" fontSize="9" fill="#cc4444">R_S</text>
      <line x1="160" y1="63" x2="170" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="210" y1="63" x2="220" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="220" y1="63" x2="220" y2="70" stroke="#333" strokeWidth="1.5"/>

      {/* R_C bottom-right */}
      <rect x="170" y="149" width="40" height="16" fill="#fff" stroke="#555" strokeWidth="1.5" rx="2"/>
      <text x="190" y="160" textAnchor="middle" fontSize="9" fill="#333">R_C</text>
      <line x1="160" y1="157" x2="170" y2="157" stroke="#333" strokeWidth="1.5"/>
      <line x1="210" y1="157" x2="220" y2="157" stroke="#333" strokeWidth="1.5"/>
      <line x1="220" y1="157" x2="220" y2="150" stroke="#333" strokeWidth="1.5"/>

      {/* Top-right and bottom-right rails */}
      <line x1="220" y1="70" x2="220" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="220" y1="150" x2="220" y2="157" stroke="#333" strokeWidth="1.5"/>

      {/* Node B (right middle) */}
      <circle cx="220" cy="110" r="3" fill="#333"/>
      <text x="224" y="108" fontSize="8" fill="#555">B</text>
      <line x1="220" y1="70" x2="220" y2="63" stroke="#333" strokeWidth="1.5"/>
      <line x1="220" y1="150" x2="220" y2="157" stroke="#333" strokeWidth="1.5"/>

      {/* Amplifier triangle */}
      <polygon points="240,90 240,130 275,110" fill="#e8f0ff" stroke="#3355aa" strokeWidth="1.5"/>
      <text x="252" y="113" textAnchor="middle" fontSize="8" fill="#3355aa">G=30</text>
      <line x1="220" y1="95" x2="240" y2="95" stroke="#333" strokeWidth="1.5"/>
      <line x1="220" y1="125" x2="240" y2="125" stroke="#333" strokeWidth="1.5"/>
      <text x="235" y="93" fontSize="8" fill="#333">+</text>
      <text x="235" y="128" fontSize="8" fill="#333">-</text>

      {/* Amp output to ADC */}
      <line x1="275" y1="110" x2="300" y2="110" stroke="#333" strokeWidth="1.5"/>

      {/* ADC box */}
      <rect x="300" y="90" width="50" height="40" fill="#e8ffe8" stroke="#339944" strokeWidth="1.5" rx="4"/>
      <text x="325" y="107" textAnchor="middle" fontSize="9" fill="#339944" fontWeight="bold">ADC</text>
      <text x="325" y="120" textAnchor="middle" fontSize="8" fill="#339944">V_FR=5V</text>

      {/* ADC output */}
      <line x1="350" y1="110" x2="380" y2="110" stroke="#333" strokeWidth="1.5"/>
      <rect x="380" y="95" width="30" height="30" fill="#fff8e0" stroke="#999" strokeWidth="1" rx="3"/>
      <text x="395" y="110" textAnchor="middle" fontSize="8" fill="#555">D</text>
      <text x="395" y="120" textAnchor="middle" fontSize="8" fill="#555">out</text>

      {/* GND symbols */}
      <line x1="40" y1="150" x2="40" y2="190" stroke="#333" strokeWidth="1.5"/>
      <line x1="30" y1="190" x2="50" y2="190" stroke="#333" strokeWidth="2"/>
      <line x1="33" y1="194" x2="47" y2="194" stroke="#333" strokeWidth="1.5"/>
      <line x1="36" y1="198" x2="44" y2="198" stroke="#333" strokeWidth="1"/>
    </svg>
  );
}
