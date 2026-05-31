/* =====================================================================
   src/circuits/index.jsx
   ---------------------------------------------------------------------
   Schematic SVG components keyed by ID, referenced from data files via
   the `circuit: "<key>"` field. Each schematic is a self-contained React
   component that scales to its container.
   ===================================================================== */
import React from "react";

const C = { ink: "#1c2b3a", navy: "#16324f", amber: "#c8862b" };
const wire = { stroke: C.navy, strokeWidth: 1.6, fill: "none" };
const lbl  = { fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fill: C.ink };
const Node = ({ x, y }) => <circle cx={x} cy={y} r={2.6} fill={C.navy} />;

/* generic resistor (zig-zag) */
const Res = ({ x, y, w = 46, v = false, label }) => (
  <g>
    <path d={`M${x} ${y} l6 0 l4 -7 l8 14 l8 -14 l8 14 l8 -14 l4 7 l${w - 54} 0`} {...wire} />
    {v && <line x1={x + 8} y1={y - 16} x2={x + w - 8} y2={y + 14} stroke={C.amber} strokeWidth={1.4} markerEnd="url(#arr)" />}
    {label && <text x={x + w / 2} y={y - 12} textAnchor="middle" style={lbl}>{label}</text>}
  </g>
);

/* arrow marker — reused inside every svg that needs it */
const Arrow = () => (
  <defs>
    <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill={C.amber} />
    </marker>
  </defs>
);

export const CIRCUITS = {
  /* ───── voltage divider + ADC — temperature sensor ───── */
  tempSensor: () => (
    <svg viewBox="0 0 420 200" width="100%" style={{ maxWidth: 420 }}>
      <Arrow />
      <line x1="40" y1="40" x2="40" y2="160" {...wire} />
      <line x1="40" y1="40" x2="150" y2="40" {...wire} />
      <line x1="40" y1="160" x2="150" y2="160" {...wire} />
      <line x1="34" y1="92" x2="46" y2="92" stroke={C.navy} strokeWidth="2.4" />
      <line x1="37" y1="100" x2="43" y2="100" stroke={C.navy} strokeWidth="1.4" />
      <text x="14" y="104" style={lbl}>V_S</text>
      <g transform="translate(130,18) rotate(90)"><Res x="0" y="0" w="60" v label="" /></g>
      <text x="158" y="48" style={lbl}>R_t</text>
      <Node x={150} y={92} />
      <line x1="150" y1="40" x2="150" y2="160" {...wire} />
      <g transform="translate(130,108) rotate(90)"><Res x="0" y="0" w="46" /></g>
      <text x="158" y="138" style={lbl}>R_F</text>
      <text x="100" y="100" style={lbl}>V_F</text>
      <line x1="150" y1="92" x2="230" y2="92" {...wire} />
      <rect x="230" y="68" width="86" height="48" rx="4" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="273" y="97" textAnchor="middle" style={{ ...lbl, fontSize: 14, fill: C.navy }}>ADC</text>
      <line x1="316" y1="92" x2="386" y2="92" {...wire} markerEnd="url(#arr)" />
      <text x="350" y="84" textAnchor="middle" style={lbl}>D_out</text>
      <text x="273" y="58" textAnchor="middle" style={{ ...lbl, fill: C.amber }}>N_b , V_FR</text>
    </svg>
  ),

  /* ───── potentiometer + voltmeter ───── */
  potentiometer: () => (
    <svg viewBox="0 0 420 200" width="100%" style={{ maxWidth: 420 }}>
      <line x1="40" y1="40" x2="40" y2="160" {...wire} />
      <line x1="40" y1="40" x2="160" y2="40" {...wire} />
      <line x1="40" y1="160" x2="320" y2="160" {...wire} />
      <line x1="34" y1="92" x2="46" y2="92" stroke={C.navy} strokeWidth="2.4" />
      <line x1="37" y1="100" x2="43" y2="100" stroke={C.navy} strokeWidth="1.4" />
      <text x="12" y="104" style={lbl}>V_S</text>
      <g transform="translate(140,18) rotate(90)"><Res x="0" y="0" w="50" /></g>
      <text x="168" y="46" style={lbl}>R</text>
      <Node x={160} y={92} />
      <line x1="160" y1="40" x2="160" y2="160" {...wire} />
      <g transform="translate(140,104) rotate(90)"><Res x="0" y="0" w="56" v label="" /></g>
      <text x="168" y="138" style={lbl}>R_X</text>
      <line x1="160" y1="92" x2="250" y2="92" {...wire} />
      <circle cx="290" cy="92" r="24" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="290" y="98" textAnchor="middle" style={{ ...lbl, fontSize: 15 }}>V</text>
      <line x1="266" y1="92" x2="266" y2="92" {...wire} />
      <line x1="290" y1="116" x2="290" y2="160" {...wire} />
      <text x="208" y="84" style={lbl}>V_out</text>
    </svg>
  ),

  /* ───── transmission line with digital driver ───── */
  txline: () => (
    <svg viewBox="0 0 460 170" width="100%" style={{ maxWidth: 460 }}>
      <text x="30" y="60" style={lbl}>V_A step</text>
      <rect x="30" y="70" width="14" height="30" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <path d="M70 60 L110 85 L70 110 Z" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <line x1="44" y1="85" x2="70" y2="85" {...wire} />
      <Res x={112} y={85} w={50} label="R_O" />
      <rect x="170" y="72" width="150" height="26" rx="13" fill="none" stroke={C.navy} strokeWidth="1.6" strokeDasharray="2 4" />
      <text x="245" y="62" textAnchor="middle" style={lbl}>Z∞ , t_P</text>
      <line x1="162" y1="85" x2="170" y2="85" {...wire} />
      <line x1="320" y1="85" x2="360" y2="85" {...wire} />
      <Node x={360} y={85} />
      <g transform="translate(346,96) rotate(90)"><Res x="0" y="0" w="44" /></g>
      <text x="372" y="122" style={lbl}>R_T</text>
      <line x1="360" y1="140" x2="375" y2="140" {...wire} />
      <line x1="367" y1="146" x2="383" y2="146" stroke={C.navy} strokeWidth="1.2" />
      <line x1="370" y1="151" x2="380" y2="151" stroke={C.navy} strokeWidth="1.2" />
    </svg>
  ),

  /* ───── photodiode + transimpedance + ADC ───── */
  photodiodeTIA: () => (
    <svg viewBox="0 0 460 200" width="100%" style={{ maxWidth: 460 }}>
      <Arrow />
      {/* photodiode */}
      <polygon points="30,90 50,80 50,100" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <line x1="50" y1="80" x2="50" y2="100" stroke={C.navy} strokeWidth="2.2" />
      <line x1="15" y1="78" x2="25" y2="68" stroke={C.amber} strokeWidth="1.2" markerEnd="url(#arr)" />
      <line x1="20" y1="84" x2="30" y2="74" stroke={C.amber} strokeWidth="1.2" markerEnd="url(#arr)" />
      <text x="14" y="118" style={lbl}>E_v</text>
      <text x="62" y="110" style={lbl}>I_SC</text>
      {/* op-amp triangle */}
      <path d="M110 70 L110 130 L170 100 Z" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="118" y="86" style={lbl}>−</text>
      <text x="118" y="124" style={lbl}>+</text>
      <text x="135" y="106" style={{ ...lbl, fontSize: 13 }}>OA</text>
      <line x1="50" y1="90" x2="110" y2="85" {...wire} />
      <line x1="110" y1="115" x2="80" y2="115" {...wire} />
      <line x1="80" y1="115" x2="80" y2="150" {...wire} />
      <line x1="70" y1="150" x2="90" y2="150" stroke={C.navy} strokeWidth="1.4" />
      {/* feedback resistor */}
      <line x1="80" y1="55" x2="80" y2="85" {...wire} />
      <Res x={80} y={55} w={120} label="R_F" />
      <line x1="200" y1="55" x2="200" y2="100" {...wire} />
      <line x1="170" y1="100" x2="220" y2="100" {...wire} />
      <Node x={200} y={100} />
      {/* ADC */}
      <rect x="240" y="78" width="90" height="48" rx="4" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="285" y="107" textAnchor="middle" style={{ ...lbl, fontSize: 14, fill: C.navy }}>ADC</text>
      <line x1="220" y1="100" x2="240" y2="100" {...wire} />
      <text x="222" y="92" style={lbl}>V_ADC</text>
      <line x1="330" y1="100" x2="400" y2="100" {...wire} markerEnd="url(#arr)" />
      <text x="368" y="92" textAnchor="middle" style={lbl}>D_out</text>
      <text x="285" y="68" textAnchor="middle" style={{ ...lbl, fill: C.amber }}>V_FR , N_b</text>
    </svg>
  ),

  /* ───── Wheatstone bridge + amplifier + ADC ───── */
  wheatstone: () => (
    <svg viewBox="0 0 480 240" width="100%" style={{ maxWidth: 480 }}>
      <text x="14" y="118" style={lbl}>V_S</text>
      <line x1="46" y1="108" x2="58" y2="108" stroke={C.navy} strokeWidth="2.4" />
      <line x1="49" y1="116" x2="55" y2="116" stroke={C.navy} strokeWidth="1.4" />
      {/* diamond bridge */}
      <line x1="120" y1="50" x2="170" y2="105" {...wire} />
      <line x1="120" y1="160" x2="170" y2="105" {...wire} />
      <line x1="120" y1="50" x2="70" y2="105" {...wire} />
      <line x1="120" y1="160" x2="70" y2="105" {...wire} />
      <text x="80" y="68" style={lbl}>R_A</text>
      <text x="148" y="68" style={lbl}>R_S</text>
      <text x="80" y="155" style={lbl}>R_B</text>
      <text x="140" y="155" style={lbl}>R_C</text>
      <line x1="58" y1="112" x2="70" y2="105" {...wire} />
      <Node x={70} y={105} />
      <Node x={170} y={105} />
      <text x="60" y="100" style={lbl}>A</text>
      <text x="174" y="100" style={lbl}>B</text>
      {/* output to amp */}
      <line x1="170" y1="105" x2="240" y2="92" {...wire} />
      <line x1="120" y1="160" x2="120" y2="195" {...wire} />
      <line x1="108" y1="195" x2="132" y2="195" stroke={C.navy} strokeWidth="1.4" />
      {/* amp */}
      <path d="M240 78 L240 132 L300 105 Z" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="260" y="109" style={{ ...lbl, fontSize: 13 }}>G</text>
      <line x1="240" y1="118" x2="200" y2="118" {...wire} />
      <line x1="200" y1="118" x2="200" y2="195" {...wire} />
      <line x1="300" y1="105" x2="340" y2="105" {...wire} />
      <rect x="340" y="82" width="90" height="48" rx="4" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="385" y="111" textAnchor="middle" style={{ ...lbl, fontSize: 14, fill: C.navy }}>ADC</text>
      <text x="385" y="68" textAnchor="middle" style={{ ...lbl, fill: C.amber }}>V_FR , N_b</text>
    </svg>
  ),

  /* ───── full-wave bridge rectifier ───── */
  rectifier: () => (
    <svg viewBox="0 0 420 220" width="100%" style={{ maxWidth: 420 }}>
      <circle cx="55" cy="110" r="22" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <path d="M44 110 q11 -12 22 0 q-11 12 -22 0" {...wire} />
      <text x="36" y="152" style={lbl}>v_in (AC)</text>
      <line x1="77" y1="110" x2="120" y2="60" {...wire} />
      <line x1="77" y1="110" x2="120" y2="160" {...wire} />
      {[[120, 60, 200, 30], [200, 30, 280, 60], [120, 160, 200, 190], [200, 190, 280, 160]].map((d, i) => (
        <g key={i}>
          <line x1={d[0]} y1={d[1]} x2={d[2]} y2={d[3]} {...wire} />
          <path d={`M${(d[0] + d[2]) / 2 - 7} ${(d[1] + d[3]) / 2 - 6} l14 6 l-14 6 z`} fill={C.navy} />
        </g>
      ))}
      <Node x={200} y={30} /><Node x={200} y={190} />
      <line x1="280" y1="60" x2="320" y2="60" {...wire} />
      <line x1="280" y1="160" x2="320" y2="160" {...wire} />
      <line x1="320" y1="60" x2="320" y2="160" {...wire} />
      <g transform="translate(306,72) rotate(90)"><Res x="0" y="0" w="44" /></g>
      <text x="334" y="115" style={lbl}>R_L</text>
      {/* filter cap parallel to R_L */}
      <line x1="350" y1="60" x2="350" y2="160" {...wire} />
      <line x1="320" y1="60" x2="350" y2="60" {...wire} />
      <line x1="320" y1="160" x2="350" y2="160" {...wire} />
      <line x1="340" y1="100" x2="360" y2="100" stroke={C.navy} strokeWidth="2.2" />
      <line x1="340" y1="120" x2="360" y2="120" stroke={C.navy} strokeWidth="2.2" />
      <text x="368" y="116" style={lbl}>C_f</text>
      <text x="196" y="22" style={lbl}>+</text>
      <text x="196" y="206" style={lbl}>−</text>
    </svg>
  ),

  /* ───── Schmitt-trigger relaxation oscillator ───── */
  schmitt: () => (
    <svg viewBox="0 0 420 200" width="100%" style={{ maxWidth: 420 }}>
      <path d="M150 60 L150 140 L220 100 Z" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <path d="M196 92 h12 m-12 0 v8 h8 v-8" stroke={C.navy} strokeWidth="1.2" fill="none" />
      <circle cx="226" cy="100" r="5" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="158" y="46" style={lbl}>Schmitt inv.</text>
      <line x1="231" y1="100" x2="320" y2="100" {...wire} />
      <Node x={300} y={100} /><text x="324" y="104" style={lbl}>V_out</text>
      <line x1="300" y1="100" x2="300" y2="40" {...wire} />
      <g transform="translate(160,28)"><Res x="0" y="0" w="140" label="R" /></g>
      <line x1="160" y1="40" x2="110" y2="40" {...wire} />
      <line x1="110" y1="40" x2="110" y2="100" {...wire} />
      <line x1="110" y1="100" x2="150" y2="100" {...wire} />
      <Node x={110} y={100} />
      <line x1="110" y1="100" x2="110" y2="150" {...wire} />
      <line x1="98" y1="150" x2="122" y2="150" stroke={C.navy} strokeWidth="2.2" />
      <line x1="98" y1="158" x2="122" y2="158" stroke={C.navy} strokeWidth="2.2" />
      <text x="80" y="130" style={lbl}>C</text>
      <line x1="110" y1="168" x2="110" y2="176" {...wire} />
      <line x1="100" y1="176" x2="120" y2="176" stroke={C.navy} strokeWidth="1.4" />
    </svg>
  ),

  /* ───── volt-ammeter method: upstream + downstream ───── */
  voltmeterMethod: () => (
    <svg viewBox="0 0 460 240" width="100%" style={{ maxWidth: 460 }}>
      <text x="14" y="22" style={{ ...lbl, fontWeight: 700 }}>Upstream (V before A)</text>
      <line x1="40" y1="70" x2="40" y2="40" {...wire} />
      <line x1="40" y1="40" x2="60" y2="40" {...wire} />
      <line x1="34" y1="70" x2="46" y2="70" stroke={C.navy} strokeWidth="2.4" />
      <circle cx="120" cy="40" r="16" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="120" y="45" textAnchor="middle" style={lbl}>A</text>
      <line x1="60" y1="40" x2="104" y2="40" {...wire} />
      <line x1="136" y1="40" x2="200" y2="40" {...wire} />
      <line x1="200" y1="40" x2="200" y2="90" {...wire} />
      <text x="206" y="70" style={lbl}>R_X</text>
      <g transform="translate(184,40) rotate(90)"><Res x="0" y="0" w="44" /></g>
      <circle cx="160" cy="90" r="14" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="160" y="95" textAnchor="middle" style={lbl}>V</text>
      <line x1="160" y1="40" x2="160" y2="76" {...wire} />
      <Node x={160} y={40} />
      <line x1="160" y1="104" x2="160" y2="120" {...wire} />
      <line x1="40" y1="120" x2="200" y2="120" {...wire} />
      <line x1="40" y1="70" x2="40" y2="120" {...wire} />

      <text x="14" y="160" style={{ ...lbl, fontWeight: 700 }}>Downstream (A before V)</text>
      <line x1="40" y1="210" x2="40" y2="180" {...wire} />
      <line x1="40" y1="180" x2="60" y2="180" {...wire} />
      <line x1="34" y1="210" x2="46" y2="210" stroke={C.navy} strokeWidth="2.4" />
      <circle cx="120" cy="180" r="16" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="120" y="185" textAnchor="middle" style={lbl}>A</text>
      <line x1="60" y1="180" x2="104" y2="180" {...wire} />
      <line x1="136" y1="180" x2="240" y2="180" {...wire} />
      <Node x={200} y={180} />
      <line x1="200" y1="180" x2="200" y2="200" {...wire} />
      <circle cx="200" cy="214" r="14" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="200" y="219" textAnchor="middle" style={lbl}>V</text>
      <g transform="translate(224,180) rotate(90)"><Res x="0" y="0" w="44" /></g>
      <text x="246" y="210" style={lbl}>R_X</text>
      <line x1="240" y1="180" x2="240" y2="232" {...wire} />
      <line x1="40" y1="232" x2="240" y2="232" {...wire} />
      <line x1="200" y1="228" x2="200" y2="232" {...wire} />
      <line x1="40" y1="210" x2="40" y2="232" {...wire} />
    </svg>
  ),

  /* ───── power supply chain: AC → rectifier → switching regulator → digital ───── */
  powerChain: () => (
    <svg viewBox="0 0 540 160" width="100%" style={{ maxWidth: 540 }}>
      <Arrow />
      {/* source */}
      <circle cx="50" cy="80" r="22" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <path d="M38 80 q12 -12 24 0 q-12 12 -24 0" {...wire} />
      <text x="32" y="124" style={lbl}>v_in, f_in</text>
      {/* rectifier block */}
      <line x1="72" y1="80" x2="120" y2="80" {...wire} />
      <rect x="120" y="50" width="100" height="60" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="170" y="78" textAnchor="middle" style={{ ...lbl, fontSize: 13 }}>Rectifier</text>
      <text x="170" y="96" textAnchor="middle" style={{ ...lbl, fontSize: 11, fill: C.amber }}>+ filter C</text>
      {/* switching regulator */}
      <line x1="220" y1="80" x2="260" y2="80" {...wire} />
      <rect x="260" y="50" width="110" height="60" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="315" y="74" textAnchor="middle" style={{ ...lbl, fontSize: 13 }}>Switching</text>
      <text x="315" y="92" textAnchor="middle" style={{ ...lbl, fontSize: 13 }}>Regulator</text>
      {/* digital block */}
      <line x1="370" y1="80" x2="410" y2="80" {...wire} />
      <rect x="410" y="50" width="100" height="60" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
      <text x="460" y="74" textAnchor="middle" style={{ ...lbl, fontSize: 13 }}>Digital</text>
      <text x="460" y="92" textAnchor="middle" style={{ ...lbl, fontSize: 13 }}>Circuit</text>
      {/* labels */}
      <text x="240" y="74" textAnchor="middle" style={{ ...lbl, fill: C.amber, fontSize: 10 }}>V_in,avg</text>
      <text x="390" y="74" textAnchor="middle" style={{ ...lbl, fill: C.amber, fontSize: 10 }}>V_DD</text>
      <line x1="510" y1="80" x2="535" y2="80" {...wire} markerEnd="url(#arr)" />
    </svg>
  ),

  /* ───── 4-stage JK flip-flop chain with AND gates between ───── */
  jkChain: () => (
    <svg viewBox="0 0 540 160" width="100%" style={{ maxWidth: 540 }}>
      <text x="20" y="32" style={{ ...lbl, fontSize: 11 }}>CK</text>
      <line x1="36" y1="28" x2="540" y2="28" stroke={C.amber} strokeWidth="1.4" />
      {[0, 1, 2, 3].map((i) => {
        const x = 60 + i * 110;
        return (
          <g key={i}>
            <rect x={x} y="50" width="60" height="60" fill="#fff" stroke={C.navy} strokeWidth="1.6" />
            <text x={x + 8} y="68" style={{ ...lbl, fontSize: 11 }}>J</text>
            <text x={x + 8} y="100" style={{ ...lbl, fontSize: 11 }}>K</text>
            <text x={x + 44} y="74" style={{ ...lbl, fontSize: 11 }}>Q</text>
            <text x={x + 30} y="130" textAnchor="middle" style={{ ...lbl, fontSize: 11, fill: C.amber }}>Q{i + 1}</text>
            {/* clock pin */}
            <path d={`M${x + 4} 84 l8 -4 l-8 -4`} stroke={C.navy} strokeWidth="1.2" fill="none" />
            <line x1={x + 30} y1="28" x2={x + 30} y2="50" stroke={C.amber} strokeWidth="1.2" />
          </g>
        );
      })}
      {/* AND gates between FF1-FF2 wires (illustrative) */}
      {[0, 1, 2].map((i) => {
        const ax = 130 + i * 110;
        return (
          <g key={i}>
            <line x1={ax - 6} y1="80" x2={ax} y2="80" {...wire} />
            <path d={`M${ax} 70 h12 a10 10 0 0 1 0 20 h-12 z`} fill="#fff" stroke={C.navy} strokeWidth="1.4" />
            <line x1={ax + 22} y1="80" x2={ax + 38} y2="80" {...wire} />
          </g>
        );
      })}
      {/* outputs */}
      {[0, 1, 2, 3].map((i) => {
        const x = 60 + i * 110;
        return <line key={i} x1={x + 30} y1="110" x2={x + 30} y2="138" {...wire} markerEnd="url(#arr)" />;
      })}
      <Arrow />
    </svg>
  ),
};