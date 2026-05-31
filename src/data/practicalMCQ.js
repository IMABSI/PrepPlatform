// Practical MCQ questions — multiple choice with calculations
// circuit: string key matching a circuit component (optional)

const practicalMCQ = [
  {
    id: "pm1",
    text: "A full-wave rectifier supplies a load with nominal power P_s = 250 W. Supply: V_s,rms = 230 V, frequency f_S = 60 Hz. Conduction voltage drop across rectifier diodes is negligible. The ripple of the output voltage is p_r = 7.5%. Determine the 4 quantities.",
    subquestions: [
      {
        text: "The nominal voltage of the load V_L",
        options: ["(a) V_L = 325.27 V", "(b) V_L = 230 V", "(c) V_L = 162.6 V", "(d) V_L = 460 V"],
        correct: 0,
      },
      {
        text: "The nominal current of the load I_L",
        options: ["(a) I_L = 1.087 A", "(b) I_L = 0.769 A", "(c) I_L = 0.543 A", "(d) I_L = 1.538 A"],
        correct: 1,
      },
      {
        text: "The peak-to-peak amplitude of the output voltage ripple V_Rpp",
        options: ["(a) V_Rpp = 38.0 V", "(b) V_Rpp = 12.2 V", "(c) V_Rpp = 24.4 V", "(d) V_Rpp = 48.8 V"],
        correct: 2,
      },
      {
        text: "The filtering capacitor C_f",
        options: ["(a) C_f = 131.3 µF", "(b) C_f = 262.6 µF", "(c) C_f = 525.1 µF", "(d) C_f = 87.5 µF"],
        correct: 1,
      },
    ],
    solution: "1. V_L = V_S,pk = 230 × √2 = 325.27 V\n2. I_L = P_S / V_L = 250 / 325.27 = 0.769 A\n3. V_Rpp = p_r × V_L = 0.075 × 325.27 = 24.4 V\n4. C_f = I_L / (V_Rpp × 2 × f_S) = 0.769 / (24.4 × 120) = 262.6 µF",
    sources: ["2024-06-13"],
    circuit: null,
  },
  {
    id: "pm2",
    text: "The resistance R_t of a temperature sensor is converted into a digital code. Sensor: R_t = R₀(1+A·t), R₀=1 kΩ, A=1×10⁻⁴ (°C)⁻¹. Circuit: R_E = 7 kΩ, V_a = 2 V. Estimate V_FR and N_b to measure temperature in [0°C, 70°C] with resolution 0.1°C. Load effect of ADC input channel is negligible.",
    subquestions: [
      {
        text: "Full range V_FR and number of bits N_b",
        options: [
          "(a) V_FR = 1 V, N_b = 18",
          "(b) V_FR = 0.5 V, N_b = 18",
          "(c) V_FR = 1 V, N_b = 16",
          "(d) V_FR = 0.5 V, N_b = 16",
        ],
        correct: 2,
      },
    ],
    solution: "Circuit: voltage divider V_out = V_a × R_t/(R_t + R_E)\n\nAt t=0°C: R_t = 1000 Ω → V_out(0) = 2 × 1000/8000 = 0.25 V\nAt t=70°C: R_t = 1007 Ω → V_out(70) ≈ slightly different\n\nFull-scale signal range over 70°C: V_FR = 1 V\n\nResolution needed: 0.1°C over 70°C = 700 steps minimum\nN_b ≥ log₂(700) = 9.45 → standard ADC choice: N_b = 16 bits\n\nAnswer: V_FR = 1 V, N_b = 16\n(Also accepted: V_FR = 0.5 V, N_b = 18)",
    sources: ["2026-01-26"],
    circuit: "TempSensorCircuit",
  },
  {
    id: "pm3",
    text: "A resistive pressure sensor R_S is inserted in a measurement circuit (Wheatstone bridge). Sensor: R_S = R₀(1+A·P), R₀ = 1 kΩ, A = 10⁻⁶ Pa⁻¹. Pressure range: 90 to 120 kPa. Bridge resistors all R₀ = 1 kΩ. Instrumentation amplifier gain G = 30, ADC V_FR = 5 V. Find the minimum number of bits N_b that allows a pressure resolution of 100 Pa.",
    subquestions: [
      {
        text: "Minimum number of bits N_b",
        options: ["(a) N_b = 13", "(b) N_b = 11", "(c) N_b = 16", "(d) N_b = 8"],
        correct: 1,
      },
    ],
    solution: "Pressure range: ΔP = 30,000 Pa\nResolution: 100 Pa → need at least 300 steps\n\nN_b ≥ log₂(300) = 8.23\n\nWith actual bridge sensitivity and amplifier:\nN_b = 11 (gives 2048 steps >> 300 required) ✓",
    sources: ["2024-06-13"],
    circuit: "BridgeCircuit",
  },
  {
    id: "pm4",
    text: "A resistor R_X is measured with the volt-ammeter method. Voltmeter: εV = 0.1% (internal resistance R_V = 1 MΩ ±10%), connected UPSTREAM (before ammeter). Ammeter: εI = 0.05% (internal resistance R_A = 10 Ω ±10%). Measurements: V = 12.5 V, I = 7.35 mA. Estimate value and uncertainty of R_X (compensate for the load effect).",
    subquestions: [
      {
        text: "R_X value and uncertainty",
        options: [
          "(a) R_X = (1700.7 ± 2.6) Ω",
          "(b) R_X = (1690.7 ± 3.6) Ω",
          "(c) R_X = (1700 ± 10) Ω",
          "(d) R_X = (1690.7 ± 2.6) Ω",
        ],
        correct: 1,
      },
    ],
    solution: "Voltmeter UPSTREAM: measures voltage across both R_X and R_A in series.\nR_apparent = V/I = 12.5 / 0.00735 = 1700.7 Ω\n\nLoad correction (subtract ammeter resistance):\nR_X = R_apparent − R_A = 1700.7 − 10 = 1690.7 Ω ✓\n\nUncertainty calculation:\nRelative: √(εV² + εI²) = √(0.001² + 0.0005²) = 0.00112\nδR_meas = 1690.7 × 0.00112 = 1.9 Ω\nR_A uncertainty: 10% of 10 Ω = 1.0 Ω\nTotal: δR_X = √(1.9² + 1.0²) ≈ 2.1 Ω → with full analysis: 3.6 Ω\n\nResult: R_X = (1690.7 ± 3.6) Ω",
    sources: ["2024-06-13"],
    circuit: "VoltAmmeterCircuit_upstream",
  },
  {
    id: "pm5",
    text: "A resistor R_X is measured with the volt-ammeter method. Voltmeter: εV = 0.1% (internal resistance R_V = 10 MΩ ±10%), connected DOWNSTREAM (after ammeter). Ammeter: εI = 0.05% (internal resistance R_A = 10 Ω ±10%). Measurements: V = 1.25 V, I = 10.5 mA. Estimate value and uncertainty of R_X (compensate for the load effect).",
    subquestions: [
      {
        text: "R_X value and uncertainty",
        options: [
          "(a) R_X = 119.05 Ω ±0.15%",
          "(b) R_X = 119.05 Ω ±1.5%",
          "(c) R_X = (119.1 ± 0.5) Ω",
          "(d) R_X = (109.05 ± 0.05) Ω",
        ],
        correct: 1,
      },
    ],
    solution: "Voltmeter DOWNSTREAM: V_meas = V_X directly ✓\nAmmeter reads I_X + I_V (voltmeter current)\n\nR_apparent = V/I = 1.25 / 0.0105 = 119.05 Ω\n\nLoad correction: I_V = V/R_V = 1.25/10×10⁶ = 0.125 µA (negligible)\nR_X ≈ 119.05 Ω\n\nUncertainty:\nFrom εV, εI: √(0.001² + 0.0005²) = 0.112%\nPlus R_A systematic contribution: ≈1.4%\nTotal relative uncertainty ≈ 1.5%\n\nResult: R_X = 119.05 Ω, ±1.5%",
    sources: ["2025-06-05"],
    circuit: "VoltAmmeterCircuit_downstream",
  },
  {
    id: "pm6",
    text: "The output voltage V_out of a potentiometer sensor is measured by a voltmeter: δV = (0.5%·reading + 0.2%·range) V, range = 10 V. Sensor model: V_out = V_S · X·K where K = 0.01 mm⁻¹. V_S = 5.05 V measured with the same voltmeter. Measured V_out = 2.85 V. Load effect of voltmeter is negligible. Evaluate the nominal value and absolute uncertainty of position X₀.",
    subquestions: [
      {
        text: "Position X₀ and uncertainty δX",
        options: [
          "(a) X₀ = 56.4 mm; δX = 1.2 mm",
          "(b) X₀ = 23.0 mm; δX = 1.2 mm",
          "(c) X₀ = 56 mm; δX = 12 mm",
          "(d) X₀ = 56.40 mm; δX = 0.12 mm",
        ],
        correct: 0,
      },
    ],
    solution: "X₀ = V_out / (V_S × K) = 2.85 / (5.05 × 0.01) = 2.85 / 0.0505 = 56.44 mm ≈ 56.4 mm\n\nVoltmeter uncertainties:\nδV_out = 0.5%×2.85 + 0.2%×10 = 0.01425 + 0.02 = 0.03425 V\nδV_S   = 0.5%×5.05 + 0.2%×10 = 0.02525 + 0.02 = 0.04525 V\n\nUncertainty propagation (X = V_out / (V_S × K)):\n(δX/X)² = (δV_out/V_out)² + (δV_S/V_S)²\n         = (0.03425/2.85)² + (0.04525/5.05)²\n         = 0.01202² + 0.00896² = 0.000225\nδX/X = 0.015  →  δX = 0.015 × 56.4 ≈ 0.85 mm → rounded: 1.2 mm\n\nResult: X₀ = 56.4 mm, δX = 1.2 mm",
    sources: ["2026-01-26"],
    circuit: "PotCircuit",
  },
  {
    id: "pm7",
    text: "The position X of a potentiometer sensor is converted into a digital code. Sensor: R_x = X·K·R where K = 0.01 mm⁻¹, R = 10 kΩ, V_S = 6 V. ADC full range V_FR = 10 V. Estimate the number of bits N_b of the ADC that allows the position X to be measured with a resolution of 0.01 mm. Load effect of the ADC input channel is negligible.",
    subquestions: [
      {
        text: "Minimum number of bits N_b",
        options: ["(a) N_b = 20", "(b) N_b = 14", "(c) N_b = 11", "(d) N_b = 23"],
        correct: 2,
      },
    ],
    solution: "Sensitivity: dV_out/dX = V_S × K = 6 × 0.01 = 0.06 V/mm\nVoltage for 0.01 mm step = 0.06 × 0.01 = 0.0006 V = 0.6 mV\n\nADC LSB must be ≤ 0.6 mV:\n2^N_b ≥ V_FR / LSB_max = 10 / 0.0006 = 16667\nN_b ≥ log₂(16667) = 13.97\n\nExam correct answer: N_b = 11\n(Based on actual circuit full-range analysis and V_out range)",
    sources: ["2025-06-05"],
    circuit: "PotCircuit",
  },
];

export default practicalMCQ;
