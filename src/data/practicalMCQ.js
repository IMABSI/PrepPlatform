/* =====================================================================
   src/data/practicalMCQ.js
   ---------------------------------------------------------------------
   Practical calculation MCQs that always appear with a circuit drawing.
   Each entry can reference a `circuit` key in src/circuits/index.jsx.
   ===================================================================== */
export const practicalMCQ = [
  {
    id: "pm_temp", topic: "ADC resolution — temperature sensor",
    circuit: "tempSensor",
    text: "The resistance R_t of a temperature sensor is read by the system shown. Sensor law R_t = R_0(1 + A·t) with R_0 = 1 kΩ, A = 1·10⁻³ °C⁻¹. Circuit: R_F = 1 kΩ, V_S = 2 V. Find the full-range V_FR and resolution N_b of the ADC to measure 0…70 °C with resolution 0.1 °C (ADC input loading negligible).",
    options: [
      { text: "V_FR = 0.5 V, N_b = 18", correct: false },
      { text: "V_FR = 1 V, N_b = 18", correct: true },
      { text: "V_FR = 1 V, N_b = 12", correct: false },
      { text: "V_FR = 10 V, N_b = 18", correct: false },
    ],
    explanation: "V_F = V_S·R_F/(R_t+R_F). At t=0 → R_t = R_0 = 1 kΩ → V_F = 1 V. Choose V_FR = 1 V. The voltage step for 0.1 °C is tens of µV → V_FR/2^N_b ≤ that step → N_b = 18.",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "pm_pot", topic: "Measurement uncertainty — potentiometer",
    circuit: "potentiometer",
    text: "A potentiometric position sensor is read with a voltmeter (range 10 V, δV = 0.5 %·reading + 0.2 %·range). Sensor law R_X = X·K·R with K = 0.01 mm⁻¹. R = 10 kΩ (negligible uncertainty), V_S = 5.05 V (same voltmeter). Find the nominal position X_0 and absolute uncertainty when V_out = 2.85 V (voltmeter loading negligible).",
    options: [
      { text: "X_0 = 56.40 mm; δX = 0.12 mm", correct: false },
      { text: "X_0 = 23.0 mm; δX = 1.2 mm", correct: false },
      { text: "X_0 = 56.4 mm; δX = 1.2 mm", correct: true },
      { text: "X_0 = 56 mm; δX = 12 mm", correct: false },
    ],
    explanation: "V_out = V_S·X·K → X = V_out/(V_S·K) = 2.85/(5.05·0.01) ≈ 56.4 mm. Propagating relative uncertainties of V_out and V_S (each 0.5 %·rdg + 0.2 %·rng) ⇒ δX/X ≈ 2 % → δX ≈ 1.2 mm.",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "pm_pot_nb", topic: "ADC resolution — potentiometer",
    circuit: "potentiometer",
    text: "The position X of a potentiometer sensor is converted into a digital code with the system shown. V_FR = 10 V, R_X = X·K·R with K = 0.01 mm⁻¹, R = 10 kΩ, V_S = 6 V. Find the minimum N_b of the ADC that allows X to be measured with resolution 0.1 mm (ADC input loading negligible).",
    options: [
      { text: "N_b = 20", correct: false },
      { text: "N_b = 10", correct: false },
      { text: "N_b = 14", correct: false },
      { text: "N_b = 11", correct: true },
    ],
    explanation: "V_out = V_S·X·K → for 0.1 mm ⇒ ΔV_out = 6·0.01·0.1 = 6 mV. LSB = V_FR/2^N_b ≤ 6 mV ⇒ 2^N_b ≥ 10/0.006 ≈ 1667 ⇒ N_b ≥ 11.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },
  {
    id: "pm_photodiode", topic: "Photodiode + transimpedance + ADC",
    circuit: "photodiodeTIA",
    text: "The short-circuit current I_SC of a photodiode is converted into a digital code with the system shown. Sensor law I_SC = S·E_v with S = 15 nA/lx. V_FR = 5 V, N_b = 14, R_F = 100 kΩ. Estimate the illuminance uncertainty contribution due to the total unadjusted error of the ADC (equal to 10 LSB).",
    options: [
      { text: "0.01 lx", correct: false },
      { text: "200 lx", correct: false },
      { text: "2.0 lx", correct: true },
      { text: "The uncertainty contribution cannot be estimated with the available data.", correct: false },
    ],
    explanation: "V_ADC = R_F·I_SC = R_F·S·E_v. LSB = V_FR/2^N_b = 5/16384 ≈ 305 µV. ADC error = 10·LSB ≈ 3.05 mV. δE_v = 3.05 mV / (R_F·S) = 3.05·10⁻³ / (100·10³·15·10⁻⁹) = 2.0 lx.",
    sources: ["2025-06-17 (q7301)"],
  },
  {
    id: "pm_photodiode_design", topic: "Photodiode TIA — design",
    circuit: "photodiodeTIA",
    text: "Same architecture: photodiode + transimpedance + ADC. V_FR = 0.2 V, S = 4 nA/lx. The illuminance has to be measured over (10…450) lx. Estimate the values of R_F and its relative uncertainty ε_RF so that the illuminance uncertainty contribution does NOT exceed 9 lx.",
    options: [
      { text: "R_F = 100 kΩ; ε_RF = 2.0 %", correct: true },
      { text: "R_F = 1 MΩ; ε_RF = 2.0 %", correct: false },
      { text: "R_F = 100 kΩ; ε_RF = 0.05 %", correct: false },
      { text: "The problem cannot be solved with the available data.", correct: false },
    ],
    explanation: "V_ADC = R_F·S·E_v. At E_v,max = 450 lx ⇒ V_ADC,max ≤ V_FR ⇒ R_F ≤ V_FR/(S·E_v,max) = 0.2/(4·10⁻⁹·450) ≈ 111 kΩ → choose R_F = 100 kΩ. Uncertainty: δE_v = ε_RF · E_v,max ≤ 9 lx ⇒ ε_RF ≤ 9/450 = 2 %.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "pm_wheatstone", topic: "Wheatstone bridge — pressure sensor",
    circuit: "wheatstone",
    text: "A resistive pressure sensor R_S is inserted into a Wheatstone bridge with V_S = 5 V, R_A = R_B = R_C = R_0 = 1 kΩ. Sensor law R_S = R_0(1 + A·P), R_0 = 1 kΩ, A = 10⁻⁶ Pa⁻¹. Pressure range 90…120 kPa. The bridge feeds an amplifier with gain G = 30 followed by an ADC of V_FR = 5 V. Estimate the minimum N_b that allows resolution 100 Pa.",
    options: [
      { text: "N_b = 13", correct: false },
      { text: "N_b = 11", correct: true },
      { text: "N_b = 16", correct: false },
      { text: "N_b = 8", correct: false },
    ],
    explanation: "For small ΔR_S, the bridge output is V_AB ≈ V_S/4 · ΔR_S/R_0. For ΔP = 100 Pa: ΔR_S = R_0·A·ΔP = 1k·10⁻⁶·100 = 0.1 Ω. ΔV_AB = (5/4)·(0.1/1000) = 125 µV. After amp G=30: 3.75 mV. LSB ≤ 3.75 mV ⇒ 2^N_b ≥ 5/0.00375 ≈ 1333 ⇒ N_b ≥ 11.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "pm_voltamm_down", topic: "Volt-ammeter — downstream + load compensation",
    circuit: "voltmeterMethod",
    text: "A resistor R_X is measured with the volt-ammeter method using a voltmeter (ε_V = 0.1 %, internal resistance R_V = 10 MΩ ± 10 %) and an ammeter (ε_I = 0.05 %, internal resistance R_A = 10 Ω ± 10 %). Voltmeter connected DOWNSTREAM the ammeter. Measurements: V = 1.25 V, I = 10.5 mA. Estimate value and uncertainty (compensate the load effect if necessary).",
    options: [
      { text: "R_X = (119.05 ± 0.15 %) Ω", correct: true },
      { text: "R_X = (119.05 ± 1.5 %) Ω", correct: false },
      { text: "R_X = (119.1 ± 0.5) Ω", correct: false },
      { text: "R_X = (119.05 ± 0.05) Ω", correct: false },
    ],
    explanation: "Downstream: voltmeter reads V_RX directly; ammeter reads I_load + I_V. Load current I_V = V/R_V = 1.25/10⁷ ≈ 125 nA — negligible vs 10.5 mA → no compensation needed. R = V/I = 119.05 Ω. δR/R ≈ √(ε_V² + ε_I²) ≈ 0.15 %.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },
  {
    id: "pm_voltamm_4wire", topic: "Volt-ammeter — when 4-wire is necessary",
    circuit: "voltmeterMethod",
    text: "A resistor R_X is measured with the volt-ammeter method (voltmeter ε_V = 0.5 %, ammeter δI = 5 mA absolute). Voltmeter downstream, load effect of voltmeter negligible. R_X connected through two wires of total resistance 0.05 Ω. Measurements V = 155.5 V, I = 1.12 A. Estimate R_X and uncertainty and decide if a 4-wire circuit is necessary.",
    options: [
      { text: "R_X = (138.8 ± 1.3) Ω. A four-wire circuit IS NOT necessary.", correct: true },
      { text: "R_X = (138.80 ± 0.13) Ω. A four-wire circuit is necessary.", correct: false },
      { text: "R_X = (138.8 ± 1.3) Ω. A four-wire circuit IS necessary.", correct: false },
      { text: "R_X = (138.800 ± 0.013) Ω. A four-wire circuit is necessary.", correct: false },
    ],
    explanation: "R = V/I = 155.5/1.12 = 138.8 Ω. Wire contribution is 0.05/138.8 ≈ 0.04 % — much smaller than the instrument uncertainty (~1 %) ⇒ 4-wire NOT necessary. Uncertainty: δR/R ≈ √(0.5² + (0.005/1.12·100)²)% ≈ 0.9 % → δR ≈ 1.3 Ω.",
    sources: ["2025-06-17 (q7301)"],
  },
  {
    id: "pm_voltamm_up", topic: "Volt-ammeter — upstream + small R",
    circuit: "voltmeterMethod",
    text: "A resistor R_X is measured with the volt-ammeter method (voltmeter ε_V = 0.1 %, R_V = 1 MΩ ± 10 %; ammeter ε_I = 0.05 %, R_A = 10 Ω ± 10 %). Voltmeter connected UPSTREAM the ammeter. Measurements V = 12.5 V, I = 7.35 mA. Estimate value and uncertainty (compensate the load effect if necessary).",
    options: [
      { text: "R_X = (1690.7 ± 3.6) Ω", correct: true },
      { text: "R_X = (1700.7 ± 2.6) Ω", correct: false },
      { text: "R_X = (1700 ± 10) Ω", correct: false },
      { text: "R_X = (1690.7 ± 2.6) Ω", correct: false },
    ],
    explanation: "Upstream: voltmeter reads V_RX + V_RA, so R_apparent = V/I = 12.5/0.00735 = 1700.7 Ω. Subtract the ammeter drop: R_X = R_app − R_A = 1690.7 Ω. Uncertainty includes the 10 %·R_A term: δR ≈ 3.6 Ω.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "pm_voltamm_wire", topic: "Volt-ammeter — small R with wire compensation",
    circuit: "voltmeterMethod",
    text: "A resistor R_X is measured with the volt-ammeter method (voltmeter ε_V = 0.1 %, ammeter δI = 1 mA absolute). Voltmeter downstream, voltmeter load negligible. R_X connected through two wires of total resistance 10 mΩ. Measurements V = 7.76 V, I = 1.12 A. Estimate value and uncertainty and decide if a 4-wire circuit is necessary.",
    options: [
      { text: "R_X = (6.929 ± 0.013) Ω. A four-wire circuit IS necessary.", correct: true },
      { text: "R_X = (6.929 ± 0.013) Ω. A four-wire circuit is NOT necessary.", correct: false },
      { text: "R_X = (6.929 ± 0.13) Ω. A four-wire circuit is NOT necessary.", correct: false },
      { text: "R_X = (6.929 ± 1.3) Ω. A four-wire circuit is NOT necessary.", correct: false },
    ],
    explanation: "R = V/I = 7.76/1.12 = 6.929 Ω. Uncertainty ≈ √(ε_V² + (δI/I)²) ≈ √(0.001² + 0.000893²) ≈ 0.13 % → δR ≈ 0.013 Ω. But wire 10 mΩ vs 6.929 Ω = 0.14 % — comparable to uncertainty ⇒ 4-wire IS necessary.",
    sources: ["2024-09-14 (SU13524)"],
  },
];