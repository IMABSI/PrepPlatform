/* =====================================================================
   src/data/practicalCalc.js
   ---------------------------------------------------------------------
   Full exercises with Given / Find / Step-by-step / Answers.
   `variants` lists the same problem with the different numbers seen by
   other students (same method, different data).
   ===================================================================== */
export const practicalCalc = [
  {
    id: "pc_txline", topic: "Transmission line with digital driver", circuit: "txline",
    given: [
      "Driver internal resistance R_O = 20 Ω",
      "Open-circuit step 0 → V_A = 5 V",
      "Line impedance Z∞ = 50 Ω",
      "One-way delay t_P = 5 ns",
      "Far-end termination R_T = 1000 Ω to ground",
    ],
    find: [
      "Γ_D (driver reflection coeff.)",
      "Γ_T (termination reflection coeff.)",
      "V_i at line input just after switching (t = 0.1·t_P)",
      "V_R at the receiver at t = 1.5·t_P",
      "V at the driver at t = 2.5·t_P",
    ],
    solution: [
      "Γ_D = (R_O − Z∞)/(R_O + Z∞) = (20 − 50)/(20 + 50) = −0.429",
      "Γ_T = (R_T − Z∞)/(R_T + Z∞) = (1000 − 50)/(1000 + 50) = 0.905",
      "First launched wave (voltage divider R_O / Z∞): V₁ = V_A·Z∞/(R_O+Z∞) = 5·50/70 = 3.57 V",
      "Wave reaches the termination at t_P and reflects: V₂ = Γ_T·V₁ = 0.905·3.57 = 3.23 V → V_R(1.5 t_P) = V₁ + V₂ = 6.80 V",
      "Reflected wave returns to the driver at 2 t_P and re-reflects: V₃ = Γ_D·V₂ = −0.429·3.23 = −1.39 V → V_driver(2.5 t_P) = V₁ + V₂ + V₃ = 5.42 V",
    ],
    answers: { "Γ_D": "−0.429", "Γ_T": "0.905", "V_i": "3.57 V", "V_R(1.5 t_P)": "6.803 V", "V_driver(2.5 t_P)": "5.418 V" },
    variants: [
      { given: "R_O = 80 Ω, V_A = 3.3 V, Z∞ = 75 Ω, t_P = 10 ns, R_T = 40 Ω to GND (su14172)", answers: "Γ_D = 0.032 · Γ_T = −0.304 · V_i(0.1 t_P) = 1.597 V · V_R(1.5 t_P) = 2.221 V · V_driver(2.5 t_P) = 1.589 V" },
      { given: "R_O = 100 Ω, V_A = 3.3 V, Z∞ = 50 Ω, t_P = 10 ns, R_T = 100 Ω to GND (su14190)", answers: "Γ_D = 0.333 · Γ_T = 0.333 · V_i(0.1 t_P) = 1.100 V · V_R(1.5 t_P) = 1.467 V · V_driver(2.5 t_P) = 1.589 V" },
      { given: "R_O = 80 Ω, V_A = 3.3 V, Z∞ = 75 Ω, t_P = 5 ns, R_T = 1000 Ω to GND (AP)", answers: "Γ_D = 0.032 · Γ_T = 0.860 · V_i(0.1 t_P) = 1.597 V · V_R(1.5 t_P) = 2.97 V · V_driver(2.5 t_P) = 3.015 V" },
      { given: "R_O = 100 Ω, V_A = 5 V, Z∞ = 75 Ω, t_P = 10 ns, R_T = 100 Ω to GND (file_3)", answers: "Γ_D = 0.143 · Γ_T = 0.143 · V_i(0.1 t_P) = 2.143 V · V_R(1.5 t_P) = 2.449 V · V_driver(2.5 t_P) = 2.493 V" },
      { given: "R_O = 100 Ω, V_A = 5 V, Z∞ = 50 Ω, t_P = 10 ns, R_T = 40 Ω to GND (mail_studenti su14114)", answers: "Γ_D = 0.333 · Γ_T = −0.111 · V_i(0.1 t_P) = 1.667 V · V_R(1.5 t_P) = 1.481 V · V_driver(2.5 t_P) = 1.42 V" },
      { given: "R_O = 80 Ω, V_A = 3.3 V, Z∞ = 50 Ω, t_P = 10 ns, R_T = 100 Ω to GND (su14185)", answers: "Γ_D = 0.231 · Γ_T = 0.333 · V_i(0.1 t_P) = 1.269 V · V_R(1.5 t_P) = 1.692 V · V_driver(2.5 t_P) = 1.79 V" },
    ],
    sources: ["2026-01-26 (su14134, su14172, AP, file_3, mail_studenti, su14185, su14190 — 7 students, same problem, different parameters)"],
  },

  {
    id: "pc_txline_open", topic: "Transmission line — open termination, level crossings", circuit: "txline",
    given: [
      "Ideal transmission line: t_P = 5 ns, Z∞ = 80 Ω",
      "Generator step V_g = 2.5 V (from V_gnd = 0 V), source resistance R_g = 90 Ω",
      "Far-end receiver: negligible input impedance/capacitance (open termination)",
      "Required: reliable reception with delay t_TX < 2·t_P",
    ],
    find: [
      "Γ_T (far end)",
      "Γ_G (generator end)",
      "Maximum high-level threshold V_IHmax",
      "Minimum low-level threshold V_ILmin",
    ],
    solution: [
      "Open termination ⇒ R_T → ∞ ⇒ Γ_T = (R_T − Z∞)/(R_T + Z∞) → +1",
      "Γ_G = (R_g − Z∞)/(R_g + Z∞) = (90 − 80)/(90 + 80) = +0.0588",
      "Incident wave at line input: V_b(0) = V_g·Z∞/(R_g + Z∞) = 2.5·80/170 = 1.18 V",
      "Voltage at far end after reflection (L→H, t = t_P): V_c(t_P) = V_b(0)·(1 + Γ_T) = 1.18·2 = 2.35 V ⇒ V_IHmax ≤ 2.35 V",
      "H→L transition: V_b(0) = −1.18 V ⇒ V_c(t_P) = V_g + ΔV_b·(1 + Γ_T) = 2.5 − 2.36 ≈ 0.15 V ⇒ V_ILmin ≥ 0.15 V",
    ],
    answers: { "Γ_T": "+1", "Γ_G": "+0.0588", "V_IHmax": "2.35 V", "V_ILmin": "0.15 V" },
    sources: ["2024-06-13 (U13524)"],
  },

  {
    id: "pc_txline_rwave", topic: "Reflected-wave switching on transmission line", circuit: "txline",
    given: [
      "CMOS driver V_DD = 3.3 V, output resistance R_O = 50 Ω, series R_S",
      "Transmission line: l = 25 cm, L_u = 3 nH/mm, C_u = 1.5 pF/mm",
      "Receivers V_IL = 1.49 V, V_IH = 2.21 V (near AND far end)",
      "Use the line in REFLECTED-WAVE switching ⇒ R_O + R_S = Z∞",
    ],
    find: [
      "Z∞ (line)",
      "t_P (one-way delay)",
      "Γ_T (open-far-end receiver)",
      "t_TX (signal-arrival delay at far-end receiver above V_IH)",
    ],
    solution: [
      "Z∞ = √(L_u/C_u) = √(3·10⁻⁹ / 1.5·10⁻¹²) = √2000 ≈ 44.7 Ω",
      "t_P = l·√(L_u·C_u) = 250 mm · √(3·10⁻⁹·1.5·10⁻¹²) = 250 · 67 ps/mm ≈ 16.8 ns",
      "Receiver is open / capacitive only → Γ_T = +1",
      "Reflected-wave switching: launched voltage = V_DD/2 = 1.65 V. After reflection at t_P, far-end voltage doubles to V_DD = 3.3 V. V_IH = 2.21 V < 3.3 V is crossed exactly at t_P ⇒ t_TX = t_P = 16.8 ns.",
    ],
    answers: { "Z∞": "44.7 Ω", "t_P": "16.8 ns", "Γ_T": "+1", "t_TX": "16.8 ns" },
    variants: [
      { given: "V_DD = 5 V, R_O = 75 Ω, l = 10 cm, V_IL = 2.25 V, V_IH = 3.35 V (su14174 q7034)", answers: "Z∞ = 44.7 Ω · t_P = 6.71 ns · Γ_T = +1 · t_TX = 6.71 ns" },
    ],
    sources: ["2025-06-05 (Apply, q7034)"],
  },

  {
    id: "pc_reg", topic: "Linear regulator — thermal design & efficiency",
    given: [
      "V_in = 8…13 V, V_out = 3.3 V",
      "I_load(max) = 0.5 A, I_q = 5 mA",
      "T_Jmax = 125 °C, T_Amax = 50 °C",
      "R_thJC = 4 °C/W, R_thCS = 0.5 °C/W",
    ],
    find: [
      "Maximum power dissipation P_Dmax",
      "Maximum heat-sink thermal resistance R_thSA",
      "Worst-case efficiency η (max V_in, full load)",
    ],
    solution: [
      "Worst case = max V_in. P_Dmax = (V_in,max − V_out)·I_load + V_in,max·I_q = (13 − 3.3)·0.5 + 13·0.005 = 4.915 W",
      "Thermal loop: T_J = T_A + P_D·(R_thJC + R_thCS + R_thSA). Solve for R_thSA: (125 − 50)/4.915 − 4 − 0.5 = 10.76 °C/W",
      "η = P_out/P_in = (V_out·I_load)/(V_in,max·(I_load + I_q)) = (3.3·0.5)/(13·0.505) = 25.1 %",
    ],
    answers: { "P_Dmax": "4.915 W", "R_thSA": "10.759 °C/W", "η": "25.13 %" },
    variants: [
      { given: "V_in = 8…18 V, V_out = 3.3 V, I_q = 5 mA, T_Jmax = 150 °C, R_thJC = 4 °C/W, R_thCS = 0.8 °C/W, T_Amax = 40 °C (su14172)", answers: "P_Dmax = 7.44 W · R_thSA = 9.985 °C/W · η = 18.15 %" },
      { given: "V_in = 8…13 V, V_out = 5 V, I_q = 8 mA, T_Jmax = 125 °C, R_thJC = 3 °C/W, R_thCS = 0.8 °C/W, T_Amax = 50 °C (AP su14168)", answers: "P_Dmax = 4.104 W · R_thSA = 14.475 °C/W · η = 37.66 %" },
      { given: "V_in = 8…18 V, V_out = 3.3 V, I_q = 5 mA, T_Jmax = 150 °C, R_thJC = 3 °C/W, R_thCS = 0.8 °C/W, T_Amax = 60 °C (file_3 su14511)", answers: "P_Dmax = 7.44 W · R_thSA = 9.641 °C/W · η = 18.15 %" },
      { given: "V_in = 8…13 V, V_out = 5 V, I_q = 5 mA, T_Jmax = 125 °C, R_thJC = 4 °C/W, R_thCS = 0.5 °C/W, T_Amax = 40 °C (mail_studenti su14114)", answers: "P_Dmax = 4.065 W · R_thSA = 16.41 °C/W · η = 38.08 %" },
      { given: "V_in = 8…18 V, V_out = 3.3 V, I_q = 8 mA, T_Jmax = 125 °C, R_thJC = 3 °C/W, R_thCS = 0.8 °C/W, T_Amax = 50 °C (su14185)", answers: "P_Dmax = 7.494 W · R_thSA = 6.208 °C/W · η = 18.04 %" },
      { given: "V_in = 8…18 V, V_out = 3.3 V, I_q = 5 mA, T_Jmax = 150 °C, R_thJC = 3 °C/W, R_thCS = 0.5 °C/W, T_Amax = 40 °C (su14190)", answers: "P_Dmax = 7.44 W · R_thSA = 8.941 °C/W · η = 18.15 %" },
    ],
    sources: ["2026-01-26 (su14134, su14172, AP, file_3, mail_studenti, su14185, su14190 — 7 students, same problem, parametric variants)"],
  },

  {
    id: "pc_cmos_power", topic: "CMOS — dynamic power, T_J, V·f scaling",
    given: [
      "CMOS data-processing circuit, N = 150·10⁶ MOS transistors",
      "Each gate cap C_g = 0.5 fF, drives FO = 4 transistors, V_DD = 1 V",
      "Idle mode: α_idle = 3 % active; Active mode: α_active = 55 % active",
      "f_clock = 120 MHz, T_A = 20 °C, static power negligible",
      "R_thJC = 0.5 °C/W, R_thCA = 3 °C/W",
    ],
    find: [
      "P_dyn,idle and P_dyn,active",
      "Junction temperature T_J in idle and active modes",
      "What happens to P_dyn if V_DD doubles to 2 V?",
      "What happens to P_dyn if f_clock doubles to 240 MHz?",
    ],
    solution: [
      "Dynamic power: P_dyn = N·α·C_g·V_DD²·f_clock·FO",
      "Idle: P_idle = 150·10⁶ · 0.03 · 0.5·10⁻¹⁵ · 1² · 120·10⁶ · 4 = 1.08 W",
      "Active: P_active = 150·10⁶ · 0.55 · 0.5·10⁻¹⁵ · 1² · 120·10⁶ · 4 = 19.8 W",
      "T_J,idle = T_A + P_idle·(R_thJC + R_thCA) = 20 + 1.08·(0.5+3) = 23.8 °C",
      "T_J,active = T_A + 19.8·3.5 = 89.3 °C",
      "P_dyn ∝ V_DD² ⇒ V_DD doubles ⇒ P quadruples",
      "P_dyn ∝ f_clock ⇒ f doubles ⇒ P doubles",
    ],
    answers: { "P_idle": "1.08 W", "P_active": "19.8 W", "T_J,idle": "23.8 °C", "T_J,active": "89.3 °C", "V_DD ×2": "quadruples", "f ×2": "doubles" },
    sources: ["2025-06-17 (q7301)"],
  },

  {
    id: "pc_schmitt", topic: "Schmitt-trigger relaxation oscillator", circuit: "schmitt",
    given: [
      "Upper threshold V_S2 = 3 V, lower threshold V_S1 = 2 V",
      "Supply 0 V…V_DD with V_DD = 7 V",
      "Timing R = 20 kΩ, C = 150 nF",
    ],
    find: [
      "Oscillation frequency f",
      "Duty cycle D",
      "Effect of doubling V_DD to 14 V on f",
      "Effect of doubling V_DD to 14 V on D",
    ],
    solution: [
      "High phase (cap charges from V_S1 to V_S2 toward V_DD): t_high = R·C·ln((V_DD − V_S1)/(V_DD − V_S2)) = 20k·150n·ln(5/4) ≈ 669 µs",
      "Low phase (cap discharges from V_S2 to V_S1 toward 0): t_low = R·C·ln(V_S2/V_S1) = 20k·150n·ln(3/2) ≈ 1220 µs",
      "Oscillation frequency f = 1/(t_high + t_low) ≈ 0.53 kHz",
      "Duty cycle D = t_high / (t_high + t_low) ≈ 35.5 %",
      "Doubling V_DD reduces t_high more than t_low (argument of ln gets closer to 1) ⇒ frequency INCREASES but less than double; duty cycle DECREASES but not halves.",
    ],
    answers: { "f": "0.53 kHz", "D": "35.5 %", "V_DD ×2 → f": "increases (< 2×)", "V_DD ×2 → D": "decreases (> 0.5×)" },
    sources: ["2025-06-17 (q7301)"],
  },

  {
    id: "pc_dram", topic: "DRAM wordline timing (concentrated RC)",
    given: [
      "V_DD = 1.5 V",
      "N = 128 cells per bitline, M = 32 cells per wordline",
      "C_g (gate cap of pass-tx) ∈ [0.12 fF, 0.18 fF]",
      "V_TH ∈ [0.15 V, 0.2 V]",
      "R_WC (wordline R increase per cell) ∈ [8 Ω, 12 Ω]",
      "R_O (address-decoder output) ∈ [800 Ω, 1000 Ω]",
    ],
    find: [
      "Total number of memory cells",
      "Minimum and maximum wordline times t_THmin and t_THmax for V to reach V_TH on the pass-transistor (low→high, V_init = 0)",
    ],
    solution: [
      "Each memory cell uses ONE MOS pass-transistor ⇒ N·M = 128·32 = 4096 cells.",
      "Concentrated RC wordline: total R = R_O + M·R_WC, total C = M·C_g.",
      "L→H transition: V_WL(t) = V_DD·(1 − e^(−t/τ)), τ = R·C. Solve V_WL = V_TH ⇒ t_TH = τ·ln(V_DD/(V_DD − V_TH)).",
      "Minimum (smallest R, C, V_TH): t_TH,min = 32·0.12 fF · (32·8 + 800) Ω · ln(1.5/1.35) ≈ 0.427 ps",
      "Maximum (largest R, C, V_TH): t_TH,max = 32·0.18 fF · (32·12 + 1000) Ω · ln(1.5/1.30) ≈ 1.14 ps",
    ],
    answers: { "Cells": "4096", "t_TH,min": "0.427 ps", "t_TH,max": "1.14 ps" },
    variants: [
      { given: "V_DD = 1.2 V, C_g ∈ [0.10, 0.15] fF, R_WC ∈ [7, 10.5] Ω (q7034)", answers: "Cells = 4096 · t_TH,min ≈ 0.438 ps · t_TH,max ≈ 1.17 ps" },
    ],
    sources: ["2025-06-05 (Apply, q7034)"],
  },

  {
    id: "pc_rectifier", topic: "Full-wave rectifier with capacitive filter", circuit: "rectifier",
    given: [
      "Load nominal power P_L = 250 W",
      "Source V_S,rms = 230 V, frequency f_S = 60 Hz",
      "Full-wave rectifier, diode drops negligible",
      "Output voltage ripple p_r = 7.5 %",
    ],
    find: [
      "Nominal load voltage V_L",
      "Nominal load current I_L",
      "Peak-to-peak ripple V_Rpp",
      "Filter capacitor C_f",
    ],
    solution: [
      "DC voltage = peak of supply: V_L = V_S,peak = V_S,rms·√2 = 230·√2 ≈ 325.27 V",
      "Load current: I_L = P_L/V_L = 250/325.27 ≈ 0.769 A",
      "Ripple: V_Rpp = p_r·V_L = 0.075·325.27 ≈ 24.4 V",
      "Full-wave: cap discharges for half a mains period, T_S/2 = 1/(2·f_S) = 1/120 s. V_Rpp ≈ I_L·(T_S/2)/C_f ⇒ C_f = I_L·(T_S/2)/V_Rpp = 0.769·(1/120)/24.4 ≈ 262.6 µF",
    ],
    answers: { "V_L": "325.27 V", "I_L": "0.77 A", "V_Rpp": "24.4 V", "C_f": "262.55 µF" },
    sources: ["2024-06-13 (U13524)"],
  },

  {
    id: "pc_power_chain", topic: "Power supply chain: rectifier + switching regulator + digital", circuit: "powerChain",
    given: [
      "Digital circuit: V_DD = 3.3 V, f_ck = 150 MHz, N_g = 1·10⁶ CMOS gates",
      "Outputs switch on average every n_sw = 10 clock cycles, average gate cap C_g = 20 fF",
      "Static current per gate I_s = 30 nA",
      "Mean rectified input voltage V_in,avg = 30 V, ripple V_rp = 3 V",
      "AC source frequency f_in = 50 Hz, switching regulator IDEAL (η = 1)",
    ],
    find: [
      "Dynamic power P_d and static power P_s of the digital circuit, average current I_o",
      "Topology of the switching regulator and duty cycle D",
      "Minimum filter capacitor C for a HALF-wave rectifier",
      "What changes for a FULL-wave rectifier instead",
    ],
    solution: [
      "P_d = (1/2)·(f_ck/n_sw)·C_g·V_DD²·N_g = 0.5·15 MHz · 20 fF · 10.89 V² · 10⁶ ≈ 1.63 W (factor ½ because each output switches in one direction per period of switching).",
      "P_s = V_DD·I_s·N_g = 3.3 · 30 nA · 10⁶ ≈ 0.099 W ≈ 0.1 W",
      "I_o = (P_d + P_s)/V_DD = 1.73/3.3 ≈ 0.525 A",
      "V_in,avg = 30 V > V_DD = 3.3 V and same polarity ⇒ BUCK. Duty cycle D = V_DD/V_in,avg = 3.3/30 ≈ 0.11.",
      "Half-wave rectifier: cap discharges for the whole input period T_in = 1/f_in. Discharge current = max input current = P_in/V_in,min ≈ I_o·V_DD/V_in,avg. C ≈ I_in / (f_in·V_rp) ≈ (P_d + P_s)/(V_in,avg·f_in·V_rp) = 1.73/(30·50·3) ≈ 385 µF",
      "Full-wave rectifier: capacitor discharges for HALF a period ⇒ HALF the capacitance is enough ⇒ C ≈ 193 µF",
    ],
    answers: { "P_d": "1.63 W", "P_s": "0.10 W", "I_o": "0.53 A", "Topology": "buck", "D": "0.11", "C (half-wave)": "385 µF", "C (full-wave)": "193 µF" },
    sources: ["2024-09-14 (SU13524)"],
  },

  {
    id: "pc_jkchain", topic: "JK flip-flop chain — max ANDs / hold / sequence", circuit: "jkChain",
    given: [
      "4 JK flip-flops Q1, Q2, Q3, Q4 in chain with combinational AND gates between them",
      "Per flip-flop: t_ckq = 0.75 ns, t_su = 0.55 ns",
      "Target clock frequency f_CK = 450 MHz ⇒ T_CK ≈ 2.22 ns",
      "Initial condition (Q1, Q2, Q3, Q4) = (1, 0, 0, 0)",
    ],
    find: [
      "Maximum propagation delay t_pAND through the AND gates so the circuit operates at f_CK",
      "Maximum hold time t_h that avoids violations",
      "Output sequence (Q1, Q2, Q3, Q4) over the next 3 clock cycles",
    ],
    solution: [
      "Critical path: Q1 → 2 AND gates → J,K of FF4. Constraint T_CK ≥ t_ckq + 2·t_pAND + t_su.",
      "⇒ t_pAND ≤ (T_CK − t_ckq − t_su) / 2 = (2.22 − 0.75 − 0.55)/2 = 0.46 ns",
      "Shortest path (hold violation): Q1 → J,K of FF2, delay = t_ckq = 0.75 ns. Hold constraint: t_h ≤ t_ckq ⇒ t_h,max = 0.75 ns",
      "Sequence after Cycle 1 = 1 0 0 0 (depends on the exact AND logic of the chain — typical shift-and-feedback pattern).",
    ],
    answers: { "t_pAND,max": "0.46 ns", "t_h,max": "0.75 ns" },
    sources: ["2024-09-14 (SU13524)"],
  },
];