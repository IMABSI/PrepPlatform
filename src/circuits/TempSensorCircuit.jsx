export default function TempSensorCircuit() {
  return (
    <svg viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 340, display: "block", margin: "8px auto" }}>
      <rect width="340" height="200" fill="#fafafa" rx="6" stroke="#ddd"/>
      <text x="10" y="14" fontSize="9" fill="#888">Temperature Sensor — Voltage Divider + ADC</text>

      {/* Voltage source V_a */}
      <circle cx="40" cy="100" r="18" fill="none" stroke="#333" strokeWidth="1.5"/>
      <text x="40" y="97" textAnchor="middle" fontSize="9" fill="#333">V_a</text>
      <text x="40" y="108" textAnchor="middle" fontSize="8" fill="#555">2 V</text>
      <line x1="40" y1="82" x2="40" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="40" y1="118" x2="40" y2="155" stroke="#333" strokeWidth="1.5"/>

      {/* Top wire to R_t */}
      <line x1="40" y1="50" x2="130" y2="50" stroke="#333" strokeWidth="1.5"/>

      {/* R_t sensor */}
      <rect x="110" y="38" width="40" height="16" fill="#ffe8e8" stroke="#cc4444" strokeWidth="1.5" rx="2"/>
      <text x="130" y="49" textAnchor="middle" fontSize="9" fill="#cc4444">R_t</text>
      <line x1="110" y1="46" x2="100" y2="46" stroke="#333" strokeWidth="1.5"/>
      <line x1="150" y1="46" x2="160" y2="46" stroke="#333" strokeWidth="1.5"/>
      <line x1="100" y1="46" x2="100" y2="50" stroke="#333" strokeWidth="1.5"/>
      <line x1="160" y1="46" x2="160" y2="50" stroke="#333" strokeWidth="1.5"/>
      <text x="130" y="33" textAnchor="middle" fontSize="8" fill="#cc4444">R₀(1+At)</text>

      {/* Middle node */}
      <circle cx="160" cy="100" r="3" fill="#333"/>
      <line x1="160" y1="50" x2="160" y2="97" stroke="#333" strokeWidth="1.5"/>

      {/* R_E */}
      <rect x="140" y="103" width="40" height="16" fill="#fff" stroke="#555" strokeWidth="1.5" rx="2"/>
      <text x="160" y="114" textAnchor="middle" fontSize="9" fill="#333">R_E</text>
      <text x="175" y="113" fontSize="8" fill="#555">7kΩ</text>
      <line x1="160" y1="103" x2="160" y2="100" stroke="#333" strokeWidth="1.5"/>
      <line x1="160" y1="119" x2="160" y2="155" stroke="#333" strokeWidth="1.5"/>

      {/* Bottom wire (GND rail) */}
      <line x1="40" y1="155" x2="160" y2="155" stroke="#333" strokeWidth="1.5"/>

      {/* GND */}
      <line x1="100" y1="155" x2="100" y2="165" stroke="#333" strokeWidth="1.5"/>
      <line x1="88" y1="165" x2="112" y2="165" stroke="#333" strokeWidth="2"/>
      <line x1="92" y1="169" x2="108" y2="169" stroke="#333" strokeWidth="1.5"/>
      <line x1="96" y1="173" x2="104" y2="173" stroke="#333" strokeWidth="1"/>

      {/* Output wire to ADC */}
      <line x1="160" y1="100" x2="220" y2="100" stroke="#333" strokeWidth="1.5"/>
      <text x="185" y="95" fontSize="8" fill="#555">V_out</text>

      {/* ADC box */}
      <rect x="220" y="75" width="60" height="50" fill="#e8ffe8" stroke="#339944" strokeWidth="1.5" rx="4"/>
      <text x="250" y="96" textAnchor="middle" fontSize="10" fill="#339944" fontWeight="bold">ADC</text>
      <text x="250" y="108" textAnchor="middle" fontSize="8" fill="#555">V_FR</text>
      <text x="250" y="118" textAnchor="middle" fontSize="8" fill="#555">N_b = ?</text>

      {/* ADC output */}
      <line x1="280" y1="100" x2="310" y2="100" stroke="#333" strokeWidth="1.5"/>
      <text x="300" y="93" fontSize="9" fill="#339944" fontWeight="bold">D_out</text>
    </svg>
  );
}
