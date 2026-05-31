// Practical calculation (exercise) questions
// circuit: string key matching a circuit component

const practicalCalc = [
  {
    id: "pc1",
    title: "Transmission Line — Digital Driver Reflected Wave Analysis",
    text: "A digital driver with internal equivalent resistance R₀ = 80 Ω and an open-circuit output voltage step from 0 V to V₀ = 3.3 V is connected to a transmission line with characteristic impedance Z₀ = 75 Ω, one-way propagation delay tₚ = 5 ns, and far-end termination on a resistor R_L = 1000 Ω connected to ground.",
    variables: {
      "R₀ (driver resistance)": "80 Ω",
      "V₀ (open-circuit step)": "3.3 V",
      "Z₀ (char. impedance)": "75 Ω",
      "tₚ (propagation delay)": "5 ns",
      "R_L (termination)": "1000 Ω to GND",
    },
    findList: [
      "Γ_D — reflection coefficient at the driver side",
      "Γ_T — reflection coefficient at the termination side",
      "V_B = voltage at driver output immediately after switching (t = 0.1tₚ)",
      "V_C = voltage at receiver (termination) at t = 1.5tₚ",
      "Voltage at driver output at t = 2.5tₚ",
    ],
    solution: `1. Γ_D = (R₀ − Z₀) / (R₀ + Z₀) = (80 − 75) / (80 + 75) = 5/155 = 0.0323

2. Γ_T = (R_L − Z₀) / (R_L + Z₀) = (1000 − 75) / (1000 + 75) = 925/1075 = 0.861

3. At t = 0⁺ (voltage divider between Z₀ and R₀ at the driver):
   v₁ = V₀ × Z₀/(R₀ + Z₀) = 3.3 × 75/155 = 1.597 V
   → V_B = 1.597 V  (valid for 0 < t < 2tₚ)

4. At t = tₚ, incident wave v₁ arrives at far end:
   V_C = v₁ × (1 + Γ_T) = 1.597 × 1.861 = 2.971 V

5. Reflected wave: v₂ = v₁ × Γ_T = 1.597 × 0.861 = 1.375 V
   At t = 2tₚ, v₂ arrives back at driver. Re-reflection:
   v₃ = v₂ × Γ_D = 1.375 × 0.0323 = 0.044 V
   
   Voltage at driver for 2tₚ < t < 3tₚ:
   V = v₁ + v₂ + v₃ = 1.597 + 1.375 + 0.044 = 3.016 V ≈ 3.015 V`,
    correctAnswers: ["Γ_D = 0.0323", "Γ_T = 0.86", "V_B = 1.597 V", "V_C = 2.971 V", "V(2.5tₚ) = 3.015 V"],
    sources: ["2026-01-26"],
    circuit: "TLCircuit",
    circuitParams: { R0: "80 Ω", Vcc: "3.3 V", Zinf: "75 Ω", tp: "5 ns", farEnd: "R_L = 1000 Ω" },
  },
  {
    id: "pc2",
    title: "CMOS Driver on Transmission Line — Reflected Wave Switching",
    text: "A CMOS driver supplied at V_cc = 3.3 V and with output resistance R₀ = 50 Ω (for both transitions) is connected to a 25 cm transmission line via a series resistor R_S. Line parameters: L_U = 3 nH/mm, C_U = 1.5 pF/mm. Receivers at near and far ends: V_IL = 1.49 V, V_IH = 2.21 V. Far end: open circuit (infinite impedance).",
    variables: {
      "V_cc": "3.3 V",
      "R₀": "50 Ω",
      "l (line length)": "250 mm",
      "L_U": "3 nH/mm",
      "C_U": "1.5 pF/mm",
      "V_IL": "1.49 V",
      "V_IH": "2.21 V",
      "Far-end termination": "Open circuit (infinite impedance)",
    },
    findList: [
      "Characteristic impedance Z_∞",
      "Propagation delay tₚ",
      "Reflection coefficient at far end Γ_T (open circuit load)",
      "Time delay for signal to reach logic threshold V_IH at far-end receiver t_TX",
    ],
    solution: `1. Z_∞ = √(L_U / C_U) = √(3×10⁻⁹ / 1.5×10⁻¹²) = √2000 = 44.72 Ω

2. tₚ = l × √(L_U × C_U) = 250 mm × √(3×10⁻⁹ × 1.5×10⁻¹²)
   = 250 × 67.08×10⁻¹² s/mm = 16.77 ns

3. Far end: open circuit → Γ_T = (+∞ − Z_∞)/(+∞ + Z_∞) = +1

4. Incident wave at driver (voltage divider with R₀ and Z_∞):
   v₁ = 3.3 × 44.72/(50 + 44.72) = 3.3 × 44.72/94.72 = 1.558 V

   At far end (Γ_T = +1): voltage doubles upon reflection:
   V_far(tₚ) = v₁ × (1 + Γ_T) = 1.558 × 2 = 3.116 V

   Since 3.116 V > V_IH = 2.21 V, the threshold is crossed at t = tₚ.
   → t_TX = tₚ = 16.77 ns`,
    correctAnswers: ["Z_∞ = 44.72 Ω", "tₚ = 16.77 ns", "Γ_T = +1", "t_TX = 16.778 ns"],
    sources: ["2025-06-05"],
    circuit: "TLCircuit",
    circuitParams: { R0: "50 Ω", Vcc: "3.3 V", Zinf: "44.72 Ω", tp: "16.77 ns", farEnd: "Open (∞)" },
  },
  {
    id: "pc3",
    title: "Linear Voltage Regulator — Full Thermal Design",
    text: "A linear voltage regulator is used to supply a sensor system. Specifications: input voltage V_in range 8–13 V, regulated output V_out = 5 V, maximum load current I_load = 0.5 A, regulator quiescent current I_q = 8 mA, T_j,max = 125°C, R_θJC = 3°C/W, R_θCS = 0.8°C/W (insulator), T_A,max = 50°C.",
    variables: {
      "V_in range": "8 to 13 V",
      "V_out": "5 V",
      "I_load,max": "0.5 A",
      "I_q": "8 mA",
      "T_j,max": "125°C",
      "R_θJC": "3°C/W",
      "R_θCS (insulator)": "0.8°C/W",
      "T_A,max": "50°C",
    },
    findList: [
      "Maximum power dissipation P_Dmax the regulator must handle",
      "Maximum heatsink thermal resistance R_θSA to keep T_j ≤ T_j,max",
      "Regulator efficiency η in the worst-case scenario (V_in = 13 V, full load)",
    ],
    solution: `Worst case: maximum input voltage AND maximum load current.

1. P_Dmax = (V_in,max − V_out) × (I_load,max + I_q)
   = (13 − 5) × (0.500 + 0.008)
   = 8 × 0.508 = 4.064 W ≈ 4.1 W

2. Thermal chain: T_j = T_A + P_D × (R_θJC + R_θCS + R_θSA)
   Rearranging:
   R_θSA ≤ (T_j,max − T_A,max)/P_Dmax − R_θJC − R_θCS
   R_θSA ≤ (125 − 50)/4.064 − 3 − 0.8
   R_θSA ≤ 18.45 − 3.8 = 14.65°C/W ≈ 14.5°C/W

3. P_out = V_out × I_load = 5 × 0.5 = 2.5 W
   P_in  = V_in,max × (I_load + I_q) = 13 × 0.508 = 6.604 W
   η = P_out / P_in = 2.5 / 6.604 = 0.3785 = 37.85%`,
    correctAnswers: ["P_Dmax ≈ 4.1 W", "R_θSA ≤ 14.5°C/W", "η = 37.85%"],
    sources: ["2026-01-26"],
    circuit: null,
  },
  {
    id: "pc4",
    title: "CMOS Schmitt Trigger Relaxation Oscillator",
    text: "A CMOS Schmitt trigger oscillator has: upper threshold V_S2 = 3 V, lower threshold V_S1 = 2 V, supply voltage V_DD = 7 V. RC components: R = 20 kΩ, C = 150 nF.",
    variables: {
      "V_S2 (upper threshold)": "3 V",
      "V_S1 (lower threshold)": "2 V",
      "V_DD": "7 V",
      "R": "20 kΩ",
      "C": "150 nF",
    },
    findList: [
      "t_high — time capacitor charges from V_S1 to V_S2",
      "t_low — time capacitor discharges from V_S2 to V_S1",
      "Oscillation frequency f",
      "Duty cycle D",
    ],
    solution: `Time constant: τ = R × C = 20×10³ × 150×10⁻⁹ = 3 ms

When output = V_DD = 7 V (capacitor charges from V_S1 = 2 V toward 7 V):
t_high = τ × ln((V_DD − V_S1)/(V_DD − V_S2))
       = 3 ms × ln((7−2)/(7−3))
       = 3 ms × ln(5/4)
       = 3 ms × 0.2231 = 669 µs

When output = 0 V (capacitor discharges from V_S2 = 3 V toward 0 V):
t_low = τ × ln(V_S2/V_S1)
      = 3 ms × ln(3/2)
      = 3 ms × 0.4055 = 1216 µs ≈ 1220 µs

Period: T = t_high + t_low = 669 + 1220 = 1889 µs
Frequency: f = 1/T = 1/1.889×10⁻³ = 529 Hz ≈ 0.53 kHz

Duty cycle: D = t_high/T = 669/1889 = 35.4%
(D < 50% because V_S2 is closer to V_DD than V_S1 is to 0 V)`,
    correctAnswers: ["t_high = 669 µs", "t_low = 1220 µs", "f ≈ 0.53 kHz", "D ≈ 35.4%"],
    sources: ["2025-06-17"],
    circuit: null,
  },
  {
    id: "pc5",
    title: "DRAM Array — Transistor Count and Wordline RC Timing",
    text: "A DRAM memory is supplied at V_DD = 1.5 V. To each bitline are connected N = 128 cells and to each wordline are connected M = 32 cells. Fabrication parameters: gate capacitance C_G per cell between 0.12 fF and 0.18 fF; threshold voltage V_TH between 0.15 V and 0.2 V; wordline resistance per cell R_WC between 8 Ω and 12 Ω; output resistance of address decoder R_O between 800 Ω and 1000 Ω.",
    variables: {
      "V_DD": "1.5 V",
      "N (cells per bitline)": "128",
      "M (cells per wordline)": "32",
      "C_G range": "0.12 fF to 0.18 fF",
      "V_TH range": "0.15 V to 0.2 V",
      "R_WC range": "8 Ω to 12 Ω per cell",
      "R_O range": "800 Ω to 1000 Ω",
    },
    findList: [
      "Number of transistors to implement the memory cells",
      "Minimum time t_min for wordline voltage to reach V_TH",
      "Maximum time t_max for wordline voltage to reach V_TH",
    ],
    solution: `1. Total memory cells = N × M = 128 × 32 = 4096
   Each DRAM cell = 1 transistor + 1 capacitor (1T1C structure)
   → Number of transistors = 4096

2. Concentrated RC model:
   R_total = R_O + M × R_WC / 2  (distributed resistance approximation)
   C_total = M × C_G              (total gate capacitance on wordline)

   Minimum time (min parameter values: R_O=800Ω, R_WC=8Ω, C_G=0.12fF, V_TH=0.15V):
   τ_min = (800 + 32×8/2) × (32 × 0.12×10⁻¹⁵)
         = (800 + 128) × 3.84×10⁻¹⁵ = 928 × 3.84×10⁻¹⁵ = 3.56 ps
   t_min = −τ_min × ln(1 − V_TH/V_DD) = −3.56 × ln(0.9) = 0.375 ps

   Maximum time (max parameter values: R_O=1000Ω, R_WC=12Ω, C_G=0.18fF, V_TH=0.2V):
   τ_max = (1000 + 192) × 5.76×10⁻¹⁵ = 1192 × 5.76×10⁻¹⁵ = 6.87 ps
   t_max = −6.87 × ln(1 − 0.2/1.5) = 0.98 ps

   (Exam reference values using slightly different model: ~0.33 ps and ~1.14 ps)`,
    correctAnswers: ["4096 transistors", "t_min ≈ 0.33 ps", "t_max ≈ 1.14 ps"],
    sources: ["2025-06-05"],
    circuit: null,
  },
  {
    id: "pc6",
    title: "CMOS Data Processing Circuit — Dynamic Power and Thermal Analysis",
    text: "A CMOS data processing circuit is made of N = 150 million MOS transistors. Each transistor has gate capacitance C_gate = 2 fF (per exam solution). Clock frequency f = 120 MHz, supply V_DD = 1 V. Thermal resistance θ_JC = 3°C/W, θ_CA = 0.5°C/W. Ambient temperature T_A = 20°C. Active fractions: idle mode α_idle = 3%, active mode α_active = 55%.",
    variables: {
      "N": "150 × 10⁶",
      "C_gate": "2 fF (per exam solution)",
      "f_clock": "120 MHz",
      "V_DD": "1 V",
      "T_A": "20°C",
      "θ_JC + θ_CA": "3.5°C/W total",
      "α_idle": "3%",
      "α_active": "55%",
    },
    findList: [
      "Dynamic power dissipated in idle mode P_idle",
      "Dynamic power dissipated in active mode P_active",
      "Junction temperature in idle mode T_J,idle",
      "Junction temperature in active mode T_J,active",
    ],
    solution: `Dynamic power formula: P_dyn = α × N × C_gate × V_DD² × f

Base factor: N × C_gate × V_DD² × f
= 150×10⁶ × 2×10⁻¹⁵ × 1² × 120×10⁶
= 150 × 2 × 120 × 10⁶⁻¹⁵⁺⁶
= 36,000 × 10⁻³ = 36 W

1. P_idle = 0.03 × 36 = 1.08 W

2. P_active = 0.55 × 36 = 19.8 W

3. T_J,idle = T_A + P_idle × (θ_JC + θ_CA)
   = 20 + 1.08 × (3 + 0.5) = 20 + 1.08 × 3.5 = 23.78°C ≈ 23.8°C

4. T_J,active = 20 + 19.8 × 3.5 = 20 + 69.3 = 89.3°C`,
    correctAnswers: ["P_idle = 1.08 W", "P_active = 19.8 W", "T_J,idle = 23.8°C", "T_J,active = 89.3°C"],
    sources: ["2025-06-17"],
    circuit: null,
  },
];

export default practicalCalc;
