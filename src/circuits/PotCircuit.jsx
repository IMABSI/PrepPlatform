export default function PotCircuit() {
  return (
    <svg viewBox="0 0 340 180" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340, display: "block", margin: "8px auto" }}>
      <rect width="340" height="180" fill="#fafafa" rx="6" stroke="#ddd"/>
      <text x="10" y="14" fontSize="9" fill="#888">Potentiometer Position Sensor + Voltmeter + ADC</text>

      {/* Voltage source V_S */}
      <circle cx="40" cy="95" r="16" fill="none" stroke="#333" strokeWidth="1.5"/>
      <text x="40" y="92" textAnchor="middle" fontSize="8" fill="#333">V_S</text>
      <text x="40" y="102" textAnchor="middle" fontSize="8" fill="#555">5V</text>
      <line x1="40" y1="79" x2="40" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="40" y1="111" x2="40" y2="140" stroke="#333" strokeWidth="1.5"/>

      {/* Potentiometer body */}
      <rect x="80" y="38" width="20" height="104" fill="#fff8e0" stroke="#cc8800" strokeWidth="2" rx="3"/>
      <text x="90" y="91" textAnchor="middle" fontSize="8" fill="#cc8800">R</text>
      <text x="90" y="101" textAnchor="middle" fontSize="7" fill="#cc8800">pot</text>

      {/* Wiper arrow */}
      <line x1="100" y1="90" x2="125" y2="90" stroke="#cc4444" strokeWidth="1.5"/>
      <polygon points="100,90 108,86 108,94" fill="#cc4444"/>
      <text x="112" y="85" fontSize="8" fill="#cc4444">X·K</text>

      {/* Top/bottom connections */}
      <line x1="40" y1="50" x2="90" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="90" y1="50" x2="90" y2="38" stroke="#333" strokeWidth="1.5"/>
      <line x1="40" y1="140" x2="90" y2="140" stroke="#333" strokeWidth="1.5"/>
      <line x1="90" y1="140" x2="90" y2="142" stroke="#333" strokeWidth="1.5"/>

      {/* GND */}
      <line x1="65" y1="140" x2="65" y2="155" stroke="#333" strokeWidth="1.5"/>
      <line x1="55" y1="155" x2="75" y2="155" stroke="#333" strokeWidth="2"/>
      <line x1="58" y1="159" x2="72" y2="159" stroke="#333" strokeWidth="1.5"/>

      {/* Wiper to voltmeter/ADC */}
      <line x1="125" y1="90" x2="185" y2="90" stroke="#333" strokeWidth="1.5"/>
      <text x="150" y="84" fontSize="8" fill="#555">V_out</text>

      {/* Voltmeter */}
      <circle cx="210" cy="90" r="22" fill="#f0f0ff" stroke="#5566aa" strokeWidth="1.5"/>
      <text x="210" y="86" textAnchor="middle" fontSize="9" fill="#5566aa" fontWeight="bold">V</text>
      <text x="210" y="98" textAnchor="middle" fontSize="8" fill="#5566aa">meter</text>
      <line x1="185" y1="90" x2="188" y2="90" stroke="#333" strokeWidth="1.5"/>
      <line x1="232" y1="90" x2="255" y2="90" stroke="#333" strokeWidth="1.5"/>

      {/* ADC */}
      <rect x="255" y="72" width="55" height="36" fill="#e8ffe8" stroke="#339944" strokeWidth="1.5" rx="3"/>
      <text x="282" y="88" textAnchor="middle" fontSize="9" fill="#339944" fontWeight="bold">ADC</text>
      <text x="282" y="100" textAnchor="middle" fontSize="8" fill="#555">N_b=?</text>
      <line x1="310" y1="90" x2="330" y2="90" stroke="#333" strokeWidth="1.5"/>
      <text x="322" y="84" fontSize="8" fill="#339944">D</text>
    </svg>
  );
}
