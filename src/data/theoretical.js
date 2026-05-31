/* =====================================================================
   src/data/theoretical.js
   ---------------------------------------------------------------------
   MERGED theory questions across 5 exam sessions:
     2024-06-13 · 2024-09-14 · 2025-06-05 · 2025-06-17 · 2026-01-26
   ---------------------------------------------------------------------
   Each option carries a `correct` flag. When more than one option is
   correct (same stem, different students got different correct options),
   the card switches to "Select all that apply".
   ===================================================================== */
export const theoretical = [
  /* ─────────────  LINEAR REGULATORS  ───────────── */
  {
    id: "th_protect", topic: "Linear regulators — current limiting",
    text: "Consider the current-limiting protection circuit for a series linear voltage regulator employing a current-sensing resistor R_S and a protection transistor. Which statement correctly describes its operation?",
    options: [
      { text: "When the voltage drop across R_S reaches the activation threshold, the protection transistor turns on and diverts the drive current away from the base of the pass element, preventing further increase in the output current.", correct: true },
      { text: "The protection transistor is connected in series with the pass element and the load, acting as a switch that physically disconnects the output when the current limit is exceeded.", correct: false },
      { text: "The current limit I_O,max is primarily determined by the current gain β of the pass transistor and is independent of R_S.", correct: false },
      { text: "R_S is placed in parallel with the base–emitter junction of the pass transistor to monitor the drive voltage rather than the load current.", correct: false },
      { text: "To minimize power loss the circuit is designed so the drop across R_S at maximum current equals the output voltage V_O.", correct: false },
    ],
    explanation: "Foldback/limiting uses negative feedback: the drop across R_S (in series with the output current) turns on the protection transistor, which shunts the base drive of the pass element. The limit is set by R_S and the protection transistor's turn-on voltage (≈0.6–0.7 V), independent of β.",
    sources: ["2026-01-26 (su14134, su14172)"],
  },
  {
    id: "th_linreg_chars", topic: "Linear regulators — series vs parallel", multi: true,
    text: "Regarding the characteristics and operational principles of linear voltage regulators, which statement is correct? — appeared with different correct options for different students, all true statements merged.",
    options: [
      { text: "Series regulators operate by acting as a variable resistor that changes the voltage division ratio between the series element and the load.", correct: true },
      { text: "Parallel regulators using Zener diodes are particularly suitable for low-power applications and voltage reference circuits.", correct: true },
      { text: "The efficiency of series regulators is approximately equal to the ratio V_OUT/V_IN, which is why low-dropout (LDO) regulators are developed to reduce the voltage drop and improve performance.", correct: true },
      { text: "Low-Drop-Out regulators require higher minimum voltage differences between input and output compared to standard linear regulators.", correct: false },
      { text: "Parallel regulators are more efficient than series regulators for high-current applications.", correct: false },
      { text: "Parallel regulators are more suitable for high-power applications than series regulators due to their simpler control mechanism.", correct: false },
      { text: "The efficiency of series regulators is independent of the voltage difference between input and output.", correct: false },
    ],
    explanation: "Series regulator = pass transistor as variable resistor in series, efficiency η ≈ V_O/V_IN (LDOs minimize the drop). Parallel/shunt regulators (Zener) waste current to ground continuously → only practical at low power, e.g. as voltage references.",
    sources: ["2025-06-05 (su14206 Apply, su14174 q7034)", "2025-06-17 (su14174)"],
  },

  /* ─────────────  SWITCHING REGULATORS  ───────────── */
  {
    id: "th_buckboost", topic: "Switching regulators — buck-boost", multi: true,
    text: "For a DC-DC buck-boost regulator (input V_I, output V_O, duty cycle D), which statement is correct? — multiple true statements merged across students.",
    options: [
      { text: "The voltage conversion ratio is V_O/V_I = −D/(1−D): the output polarity is inverted and its magnitude can be smaller OR larger than the input.", correct: true },
      { text: "Energy transfer from the inductor to the load occurs exclusively during T_OFF, when the inductor's magnetic field collapses and forces current through the forward-biased diode.", correct: true },
      { text: "During T_ON, current flows from V_I through the inductor and directly into the load, providing simultaneous storage and delivery.", correct: false },
      { text: "The output magnitude V_O is always strictly greater than V_I, since the inductor boosts the source potential.", correct: false },
      { text: "The output is V_O = D·V_I, so it is always a fraction of the input with the same polarity.", correct: false },
      { text: "The conversion ratio is V_O/V_I = D/(1−D), giving a positive output with the same polarity as the input.", correct: false },
    ],
    explanation: "Buck-boost stores energy in L during T_ON (input disconnected from load) and releases it through the diode during T_OFF. Steady-state ratio V_O/V_I = −D/(1−D): inverted polarity, |V_O|<|V_I| for D<0.5 (buck), > for D>0.5 (boost).",
    sources: ["2026-01-26 (su14134 → V_O/V_I; su14172 → energy during OFF)"],
  },
  {
    id: "th_sw_duty", topic: "Switching regulators — duty-cycle relationships", multi: true,
    text: "In switching regulator circuits, what are the correct relationships between the duty cycle D and the voltage-transfer characteristics? — different correct statements across students.",
    options: [
      { text: "For a Buck regulator, the voltage-transfer ratio is V_O/V_I = D.", correct: true },
      { text: "For a Boost regulator, the voltage-transfer ratio is V_O/V_I = 1/(1−D).", correct: true },
      { text: "The duty cycle D represents the fraction of the switching period during which the main switch is in the OFF state.", correct: false },
      { text: "A Buck regulator can produce output voltages higher than the input voltage.", correct: false },
      { text: "The voltage-transfer ratio in switching regulators is independent of the duty cycle D.", correct: false },
      { text: "In a Buck regulator the output voltage equals the input voltage divided by the duty cycle: V_O = V_I/D.", correct: false },
    ],
    explanation: "D = T_ON/T (ON-state fraction). Buck steps down: V_O = D·V_I. Boost steps up: V_O = V_I/(1−D). The duty cycle is the primary control parameter that determines V_O.",
    sources: ["2025-06-05 (su14206 Apply, su14174 q7034)", "2025-06-17 (su14174)"],
  },
  {
    id: "th_sw_07", topic: "Switching regulators — topology for |V_O| = 0.7·|V_I|",
    text: "What type of switching voltage regulator can output a voltage V_O whose magnitude is a fraction 0.7 of its input-voltage magnitude V_I (|V_O| = 0.7·|V_I|), with the same polarity?",
    options: [
      { text: "Buck.", correct: true },
      { text: "Boost.", correct: false },
      { text: "Either buck or boost.", correct: false },
      { text: "Low-dropout (LDO).", correct: false },
    ],
    explanation: "Buck: V_O = D·V_I with 0 < D < 1 → V_O always lower than V_I, same polarity. For D = 0.7 → V_O = 0.7·V_I. Boost can only step up (≥ V_I). Buck-boost steps down too but inverts polarity. LDO is linear, not switching.",
    sources: ["2024-06-13 (U13524)"],
  },

  /* ─────────────  DATA ACQUISITION / ADC  ───────────── */
  {
    id: "th_mux", topic: "Data acquisition — analog multiplexer",
    text: "A multi-channel A/D front-end uses a MOS/CMOS analog multiplexer feeding a shared sample-and-hold and ADC; each channel may have its own conditioning amplifier and anti-alias filter. Which statement is correct?",
    options: [
      { text: "Placing the multiplexer AFTER the per-channel anti-alias filters prevents the multiplexing operation from reshaping low-frequency inputs into higher-frequency components that would otherwise need filtering.", correct: true },
      { text: "Increasing R_ON generally improves settling time because the larger resistance limits current spikes into the load capacitance.", correct: false },
      { text: "The dominant effect of R_ON is to increase the output offset, because R_ON forces a fixed leakage current proportional to the selected input voltage.", correct: false },
      { text: "A tracking A/D converter after the multiplexer is always safe because each conversion depends only on the instantaneous selected input.", correct: false },
    ],
    explanation: "Time-multiplexing turns slow signals into sampled (faster) sequences, so anti-alias filtering must precede the mux. R_ON adds series resistance → attenuation and slower settling. A tracking ADC is unsafe because its result depends on the previous channel.",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "th_snr", topic: "ADC — quantization SNR",
    text: "An ADC with input scale S = [0 V, 12 V] and N = 10 bits of output converts a sinusoidal signal of effective (rms) voltage V_in,rms = 4.2 V with mean value at the midpoint of the ADC scale. The quantization signal-to-noise ratio is:",
    options: [
      { text: "SNR_q ≈ 62 dB.", correct: true },
      { text: "SNR_q ≈ 30 dB.", correct: false },
      { text: "SNR_q ≈ 44 dB.", correct: false },
      { text: "SNR_q ≈ 32 dB.", correct: false },
    ],
    explanation: "Peak-to-peak: V_in,pp = 2·V_in,rms·√2 = 2·4.2·1.414 ≈ 11.9 V ≈ full scale. For a full-scale sine, SNR_q = 6.02·N + 1.76 dB = 6·10 + 1.76 ≈ 62 dB.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "th_flashadc", topic: "ADC — flash converter",
    text: "The fastest analog-to-digital converter using three analog comparators:",
    options: [
      { text: "Converts the analog value to two-bit binary.", correct: true },
      { text: "Converts the analog value to three-bit binary.", correct: false },
      { text: "Has tracking configuration.", correct: false },
      { text: "Converts the analog value to four-bit binary.", correct: false },
    ],
    explanation: "Flash ADC with K comparators resolves K+1 intervals → encoded in ⌈log₂(K+1)⌉ bits. With K=3 → 4 intervals → 2 bits.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "th_nplc", topic: "Measurement — integrating ADC",
    text: "The acronym NPLC used with integrating ADCs means:",
    options: [
      { text: "Number of Power Line Cycles.", correct: true },
      { text: "No Phase Lock Condition.", correct: false },
      { text: "No Power Loop Condition.", correct: false },
      { text: "No Power Load Condition.", correct: false },
    ],
    explanation: "Integrating over an integer number of mains cycles (NPLC) makes line-frequency interference average to zero — why dual-slope ADCs reject 50/60 Hz noise.",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "th_dualslope", topic: "Measurement — dual-slope ADC uncertainty",
    text: "In a dual-slope integration ADC, the main uncertainty contribution is related to:",
    options: [
      { text: "the internal reference voltage.", correct: true },
      { text: "the resistor of the Miller integrator.", correct: false },
      { text: "the capacitor of the Miller integrator.", correct: false },
      { text: "the voltage offset of the threshold comparator.", correct: false },
    ],
    explanation: "Dual-slope output uses the RATIO of two time intervals, so R and C of the integrator cancel out. The internal voltage reference enters the formula directly → its uncertainty dominates.",
    sources: ["2024-06-13 (U13524)", "2024-09-14 (SU13524)", "2025-06-05 (Apply, q7034)", "2025-06-17 (q7301)"],
  },
  {
    id: "th_dualslope_clock", topic: "Measurement — dual-slope ADC clock",
    text: "In a dual-slope integration ADC, the uncertainty contribution due to the internal oscillator is negligible because:",
    options: [
      { text: "the measurement model includes the ratio between two time intervals.", correct: true },
      { text: "the measurement model includes the product between two time intervals.", correct: false },
      { text: "a GPS-disciplined oscillator is always used.", correct: false },
      { text: "time intervals lower than 1 min are measured.", correct: false },
    ],
    explanation: "Same logic: the output depends on a ratio of times measured by the SAME oscillator, so its frequency cancels out.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },

  /* ─────────────  MEASUREMENT INSTRUMENTS  ───────────── */
  {
    id: "th_counter", topic: "Measurement — frequency counter (direct)",
    text: "In a counter based on the direct measurement of frequency, which statement is correct?",
    options: [
      { text: "The resolution decreases as the gate-time increases.", correct: true },
      { text: "The resolution increases as the gate-time increases.", correct: false },
      { text: "The gate time cannot be set to a value lower than 1 s.", correct: false },
      { text: "The uncertainty does not depend on the internal clock.", correct: false },
    ],
    explanation: "Direct measurement counts input pulses during a fixed gate time T_g; quantization step Δf = 1/T_g. Exam wording treats the numeric 'resolution' value Δf as decreasing with longer T_g (finer resolution).",
    sources: ["2024-06-13", "2025-06-05 (Apply, q7034)", "2025-06-17 (q7301)", "2026-01-26 (su14134)"],
  },
  {
    id: "th_counter_freq", topic: "Measurement — frequency counter (when convenient)",
    text: "In order to minimize the measurement resolution at constant gate time, a counter based on the direct measurement of the frequency is convenient when the input signal:",
    options: [
      { text: "has a frequency higher than the internal oscillator.", correct: true },
      { text: "has a frequency lower than the internal oscillator.", correct: false },
      { text: "has a triangle waveform.", correct: false },
      { text: "has a zero mean value.", correct: false },
    ],
    explanation: "Direct frequency mode counts input pulses → many pulses per gate when f_in is high. Reciprocal (period) mode is better when f_in is low (then we count internal-clock pulses per input period).",
    sources: ["2025-06-17 (q7301)"],
  },
  {
    id: "th_voltammeter", topic: "Measurement — volt-ammeter method", circuit: "voltmeterMethod",
    text: "In the volt-ammeter method for resistance measurement:",
    options: [
      { text: "the load (insertion) effect depends both on the value of the measured resistance and on the internal resistance of the voltmeter or ammeter.", correct: true },
      { text: "the load effect only depends on the value of the measured resistance.", correct: false },
      { text: "the load effect only depends on the internal resistance of the voltmeter and ammeter.", correct: false },
      { text: "the relative uncertainty cannot be lower than 1%.", correct: false },
    ],
    explanation: "Upstream connection: voltmeter also reads the ammeter drop → error grows for small R_X. Downstream connection: ammeter also reads voltmeter current → error grows for large R_X. So the systematic load effect depends on R_X relative to the instruments' internal resistances.",
    sources: ["2024-09-14 (SU13524)", "2026-01-26 (su14134)"],
  },
  {
    id: "th_comparison", topic: "Measurement — comparison (substitution) method", multi: true,
    text: "In the comparison method for resistance measurements, which statement is correct? — different correct statements across students.",
    options: [
      { text: "The measurement uncertainty does NOT depend on the uncertainty of the test current.", correct: true },
      { text: "The measurement of the voltages across the standard and unknown resistors with the SAME voltmeter makes the overall uncertainty better, provided the two resistors have the same order of magnitude.", correct: true },
      { text: "The effect of thermoelectric voltages can be minimized by taking two measurements, each one with opposite direction of the test current.", correct: true },
      { text: "The measurement uncertainty does not depend on the uncertainty of the voltage across the standard resistor.", correct: false },
      { text: "The measurement uncertainty does not depend on the uncertainty of the standard resistor.", correct: false },
      { text: "The measurement uncertainty does not depend on the uncertainty of the voltage across the unknown resistor.", correct: false },
      { text: "Measuring with the same voltmeter makes the overall uncertainty always better.", correct: false },
      { text: "Measuring with the same voltmeter makes the overall uncertainty worse.", correct: false },
      { text: "The effect of thermoelectric voltages can be minimized using low test currents.", correct: false },
      { text: "The effect of thermoelectric voltages can be minimized using a four-wire connection.", correct: false },
    ],
    explanation: "R_X = (V_X/V_S)·R_S. The same current flows through both resistors, so its uncertainty cancels in the ratio. Using the same voltmeter cancels its gain error if R_X and R_S are similar (same range). Reversing the current cancels offset / thermoelectric EMFs (average of the two readings).",
    sources: ["2024-06-13", "2024-09-14 (SU13524)", "2025-06-05 (Apply, q7034)", "2025-06-17 (q7301)"],
  },

  /* ─────────────  MEMORY  ───────────── */
  {
    id: "th_flash", topic: "Non-volatile memory — flash",
    text: "For non-volatile floating-gate MOS memories (flash, serial flash), which statement is correct?",
    options: [
      { text: "In a flash memory, a WRITE (PROGRAM) operation changes a stored bit from 1 to 0.", correct: true },
      { text: "NOR flash is optimized for sequential page access and is mainly used for sequential data storage.", correct: false },
      { text: "Programming a floating-gate MOS reduces V_TH, making the device easier to turn on for a given gate voltage.", correct: false },
      { text: "Serial flash reduces board connections because it transfers several data bits in parallel over SI and SO simultaneously.", correct: false },
    ],
    explanation: "Programming adds charge to the floating gate, which RAISES V_TH (state '0'); erase brings it back to '1'. NOR is random-access (code), NAND is sequential/high-density. SI/SO are serial lines, not a parallel bus.",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "th_memcells", topic: "Memory cells — flash / DRAM / CAM",
    text: "Which statement correctly describes operational characteristics and structural differences between various semiconductor memory cell types?",
    options: [
      { text: "Flash memory cells utilize floating-gate transistors where programming increases threshold voltage, and erasing must be performed in blocks before individual bits can be reprogrammed.", correct: true },
      { text: "DRAM cells maintain data indefinitely without refresh because the storage capacitor has perfect isolation from leakage currents.", correct: false },
      { text: "CAM cells function identically to RAM cells but with reversed address and data line connections for content-based lookup operations.", correct: false },
      { text: "DRAM sense amplifiers operate on large voltage differences of several volts to distinguish between stored logic levels.", correct: false },
    ],
    explanation: "Flash: charge on floating gate raises V_TH; erase is done in whole blocks before reprogramming. DRAM caps leak → must be refreshed every few ms. CAM has built-in comparison logic per cell (more transistors). DRAM sense amps work on small (~250 mV) charge-sharing signals.",
    sources: ["2025-06-17 (q7301)"],
  },
  {
    id: "th_sram", topic: "Volatile memory — DRAM vs SRAM",
    text: "Which statement about volatile semiconductor memories (DRAM, SRAM) is correct?",
    options: [
      { text: "SRAM cells are built from a bistable latch of six transistors and retain data indefinitely as long as V_DD is maintained, without periodic refresh.", correct: true },
      { text: "SRAM relies on a floating-gate transistor to store charge, giving it higher density than DRAM but needing higher write voltages.", correct: false },
      { text: "DRAM access is faster than SRAM because the single-transistor cell has lower parasitic capacitance and a more direct path to the output.", correct: false },
      { text: "Reading an SRAM cell is destructive, discharging the bitlines and requiring a precharge + restore.", correct: false },
    ],
    explanation: "SRAM = 6T cross-coupled latch, static, no refresh, faster, larger area. Floating gates belong to non-volatile memories. DRAM read is the destructive one (charge sharing on the bitline, small swings ~250 mV, needs precharge + restore).",
    sources: ["2026-01-26 (su14134, su14172)"],
  },
  {
    id: "th_dram_read", topic: "DRAM — read mechanics",
    text: "The voltage of a storage capacitor of a DRAM memory cell is V_CS = 0 V. During a read operation with the bitline voltage initially set to V_bl = V_DD/2, what happens?",
    options: [
      { text: "The bitline voltage decreases by ΔV < V_DD/2.", correct: true },
      { text: "The bitline voltage decreases by ΔV = V_DD/2 − V_th.", correct: false },
      { text: "The memory cell voltage remains unchanged.", correct: false },
      { text: "The bitline voltage increases by ΔV < V_DD/2.", correct: false },
    ],
    explanation: "When the cell holds '0' (V_CS = 0), opening the pass transistor connects two capacitors at different voltages. Charge sharing: only PART of the bitline charge transfers to the cell capacitor. Because C_bitline ≫ C_cell, the bitline drops by a small ΔV ≪ V_DD/2 — what the sense amplifier must detect.",
    sources: ["2024-06-13 (U13524)"],
  },

  /* ─────────────  DIGITAL DESIGN  ───────────── */
  {
    id: "th_threestate", topic: "Digital output stages — three-state bus",
    text: "A shared digital node must be driven by several devices at different times without conflict while keeping valid logic levels. Which statement is correct?",
    options: [
      { text: "A bus built with three-state outputs requires mutually exclusive enable signals OE, so that only one driver is active at a time when several outputs share the same node.", correct: true },
      { text: "Wired sharing is best done by directly connecting several totem-pole outputs together, because their low output resistance prevents conflicts.", correct: false },
      { text: "In a three-state output, OE = 0 forces the output to V_OH so the node stays high even when no device is selected.", correct: false },
      { text: "A three-state bus is safe even if two devices drive opposite levels, because contention is resolved by the driver providing the larger V_OH.", correct: false },
    ],
    explanation: "Totem-pole outputs driven to opposite levels create a low-impedance conflict. Three-state outputs solve this only if exactly one OE is active at a time; OE inactive puts the output in the high-impedance Z state (not a forced high).",
    sources: ["2026-01-26 (su14134)"],
  },
  {
    id: "th_opendrain", topic: "Digital output stages — open-drain",
    text: "Can multiple open-drain logic gates be connected to the same pull-up resistor?",
    options: [
      { text: "Yes, and they implement a function.", correct: true },
      { text: "Only if they drive capacitive loads.", correct: false },
      { text: "Only if the gates have the same R_ON.", correct: false },
      { text: "Only if the pull-up resistor is equal to R_ON of the gate.", correct: false },
    ],
    explanation: "Open-drain outputs tied to one pull-up implement a 'wired-AND' (or wired-OR depending on logic levels). Pull-up dominates only when ALL drivers are off. This is exactly how I²C / IRQ lines work.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "th_lut3", topic: "FPGA — 4-input LUT capabilities",
    text: "A 4-input look-up table (LUT) in the logic blocks of an FPGA:",
    options: [
      { text: "Can implement logic functions with 3 inputs.", correct: true },
      { text: "Can implement up to 16 logic functions with 4 inputs.", correct: false },
      { text: "Can implement up to 2^(2^5) logic functions with 5 inputs.", correct: false },
      { text: "Can implement up to 2^4 logic functions with 3 inputs.", correct: false },
    ],
    explanation: "A 4-input LUT has 16 SRAM cells, so it can store the truth table of any 4-input function — and by extension any 3-, 2-, or 1-input function (just leave some inputs unused). The number of distinct n-input boolean functions is 2^(2^n), so a 4-LUT covers 2^16 = 65536 functions of 4 inputs.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "th_lut256", topic: "FPGA — LUT for 256 logical functions",
    text: "A look-up table that can realize 256 logical functions has:",
    options: [
      { text: "At least 3 inputs.", correct: true },
      { text: "At least 9 inputs.", correct: false },
      { text: "At least 24 inputs.", correct: false },
      { text: "At least 6 inputs.", correct: false },
    ],
    explanation: "256 = 2^8 = 2^(2^3). The number of boolean functions of n inputs is 2^(2^n). So a 3-input LUT realises 2^8 = 256 distinct functions.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "th_latches", topic: "Sequential logic — latch vs flip-flop",
    text: "What distinguishes the transparent operation of latches from the edge-triggered behavior of flip-flops?",
    options: [
      { text: "D-latches operate in transparent mode when enable is active, with output continuously following input changes; D flip-flops only change output on clock edges with no transparent behavior.", correct: true },
      { text: "The transparency difference is only cosmetic since both latches and flip-flops use identical internal gate structures and timing mechanisms.", correct: false },
      { text: "Latches have shorter propagation delays than flip-flops because transparency eliminates internal signal routing delays.", correct: false },
      { text: "Master-slave flip-flops achieve transparency by enabling both master and slave latches simultaneously during clock transitions.", correct: false },
    ],
    explanation: "Latch = level-sensitive: when enable is high, output transparently follows input. Flip-flop = edge-triggered: output samples input only on a clock edge. A master-slave FF actually PREVENTS transparency by enabling master and slave on opposite levels of the clock.",
    sources: ["2025-06-17 (q7301)"],
  },

  /* ─────────────  TRANSMISSION LINES & CROSSTALK  ───────────── */
  {
    id: "th_txline_open", topic: "Transmission lines — open termination",
    text: "A lossless transmission line with characteristic impedance Z∞ = 100 Ω and propagation time t_P = 5 ns connects a digital driver to a receiver. Which statement is correct?",
    options: [
      { text: "With an open-circuit termination, the voltage at the far end becomes twice the amplitude of the incident wave.", correct: true },
      { text: "The characteristic impedance of 100 Ω must match the driver output resistance to prevent reflections.", correct: false },
      { text: "The propagation time can be reduced by using a termination resistance smaller than the characteristic impedance.", correct: false },
      { text: "With a short-circuit termination, the incident wave is completely absorbed without any reflections.", correct: false },
    ],
    explanation: "At an open end (R_T → ∞), Γ_T = (R_T−Z∞)/(R_T+Z∞) → +1: reflected wave has same amplitude and polarity → total voltage at the far end is 2×incident (used in reflected-wave switching). Reflections depend on the line-termination mismatch, not the driver match. Short circuit gives Γ_T = −1 (maximum reflection of opposite sign), not absorption.",
    sources: ["2025-06-17 (q7301)"],
  },
  {
    id: "th_zinf", topic: "Transmission lines — characteristic impedance",
    text: "Considering L_u (per-unit inductance) and C_u (per-unit capacitance) of an ideal transmission line, the characteristic impedance Z∞ of the line:",
    options: [
      { text: "Is inversely correlated to √C_u.", correct: true },
      { text: "Is directly correlated to C_u.", correct: false },
      { text: "Is inversely correlated to C_u.", correct: false },
      { text: "Is inversely correlated to √L_u.", correct: false },
    ],
    explanation: "Z∞ = √(L_u/C_u). So Z∞ ∝ √L_u and Z∞ ∝ 1/√C_u — directly correlated with √L_u, inversely correlated with √C_u.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "th_tp_scale", topic: "Transmission lines — t_P scaling",
    text: "The propagation time along a transmission line halves without changing its characteristic impedance if:",
    options: [
      { text: "Both its unit inductance and unit capacitance halve.", correct: true },
      { text: "The unit capacitance doubles and unit inductance remains unchanged.", correct: false },
      { text: "The unit capacitance halves and unit inductance remains unchanged.", correct: false },
      { text: "The unit capacitance remains unchanged and the unit inductance doubles.", correct: false },
    ],
    explanation: "t_P/length = √(L_u·C_u) and Z∞ = √(L_u/C_u). If both L_u and C_u halve, Z∞ is unchanged (ratio preserved) but propagation speed v = 1/√(L_u C_u) doubles → t_P halves.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "th_crosstalk_dir", topic: "Crosstalk — direct vs reverse",
    text: "What are the key characteristics of direct and reverse crosstalk in coupled transmission lines?",
    options: [
      { text: "Direct crosstalk has constant duration equal to the rise time t_r and variable amplitude that reaches maximum at the far end of the line.", correct: true },
      { text: "Reverse crosstalk propagates in the same direction as the disturbing signal.", correct: false },
      { text: "The amplitude of reverse crosstalk increases linearly with the distance from the source.", correct: false },
      { text: "Direct crosstalk duration is always equal to twice the propagation delay 2·t_P of the line.", correct: false },
      { text: "Both direct and reverse crosstalk maintain the same polarity relationship with the disturbing signal in all cases.", correct: false },
    ],
    explanation: "Direct (forward) crosstalk: travels in the same direction as the aggressor, duration = aggressor's rise time t_r, amplitude grows linearly along the line (max at the far end). Reverse (backward) crosstalk: travels back to the driver, constant amplitude, duration = 2·t_P.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },
  {
    id: "th_crosstalk_noise", topic: "Crosstalk — noise vs signal transition",
    text: "The crosstalk noise induced in coupled transmission lines:",
    options: [
      { text: "Increases as signal transition times decrease.", correct: true },
      { text: "Increases as the gate supply voltage decreases.", correct: false },
      { text: "Increases with gate noise margin.", correct: false },
      { text: "Decreases with increasing gate supply voltage.", correct: false },
    ],
    explanation: "Crosstalk is driven by dV/dt and dI/dt (capacitive and inductive coupling). Faster transitions → larger derivatives → larger induced noise.",
    sources: ["2024-06-13 (U13524)"],
  },
  {
    id: "th_crosstalk_drivers", topic: "Crosstalk — when crosstalk increases",
    text: "Crosstalk in coupled lines increases if:",
    options: [
      { text: "Drivers with low equivalent output resistance are used.", correct: true },
      { text: "Drivers with high equivalent output resistance are used.", correct: false },
      { text: "Line lengths are shortened.", correct: false },
      { text: "Resistors are connected in series with the outputs of the drivers.", correct: false },
    ],
    explanation: "Low-impedance drivers produce fast slew rates (higher dV/dt), which capacitively couple more noise into adjacent lines. Series resistors at the output slow transitions and reduce crosstalk.",
    sources: ["2024-09-14 (SU13524)"],
  },

  /* ─────────────  TIMING / PROTOCOLS  ───────────── */
  {
    id: "th_handshake", topic: "Register transfer — handshake (write)",
    text: "A point-to-point write transfer uses an information signal INF, a strobe STB and a confirmation ACK. Which statement correctly relates t_SU, t_H, the skew t_K and t_TXmax?",
    options: [
      { text: "In an asynchronous write cycle with handshake, the source can be timed using only t_K, while the destination guarantees its own t_SU and t_H before asserting ACK.", correct: true },
      { text: "In an asynchronous write cycle with handshake, the source must wait t_SU + t_H before asserting STB because the destination cannot ensure register timing internally.", correct: false },
      { text: "In an asynchronous write cycle with handshake, ACK is generated by the source to indicate completion to the destination.", correct: false },
      { text: "In a source-synchronous write transfer the cycle duration is limited by 2·t_TXmax + 2·t_K because clock and data propagate in opposite directions.", correct: false },
      { text: "Reducing t_K affects only the data latency and does not change the maximum cadence of a source-synchronous write protocol.", correct: false },
    ],
    explanation: "Handshake: the receiver meets its own setup/hold internally and asserts ACK only after safely capturing the data, so the source needs no hard-coded t_SU/t_H. Source-synchronous: clock travels WITH the data (same direction) → only t_K limits cadence, so reducing t_K improves it.",
    sources: ["2026-01-26 (su14134, su14172)"],
  },
  {
    id: "th_cycle_compare", topic: "Synchronization — async vs source-sync cycle duration", multi: true,
    text: "Which statement correctly describes the timing characteristics and control mechanisms of cycle-level communication protocols?",
    options: [
      { text: "Asynchronous cycle minimum duration includes transmission delays (~2·t_TXmax), while source-synchronous cycle duration is independent of transmission time.", correct: true },
      { text: "In synchronous (source-synchronous) cycles, all timing parameters including delays t_A and t_B are controlled by the source to ensure setup and hold time constraints at the destination.", correct: true },
      { text: "The minimum cycle time for asynchronous write operations is t_cycle_min ≈ t_K + t_SU + t_H + t_K + 2·t_TXmax — transmission times directly affect the total cycle duration.", correct: true },
      { text: "Asynchronous cycles require the source to know both setup and hold times (t_SU, t_H) of the destination register, just like synchronous cycles.", correct: false },
      { text: "In synchronous cycles, the destination controls timing by sending ACK signals back to the source.", correct: false },
      { text: "Both synchronous and asynchronous cycles use the same fixed-delay approach, but asynchronous protocols add an acknowledgment for confirmation.", correct: false },
      { text: "Source-synchronous protocols eliminate the need for setup and hold time considerations because the clock and data travel together from the same source.", correct: false },
    ],
    explanation: "In an asynchronous (handshake) cycle, the request travels to the destination and the ACK travels back, so the cycle DOES depend on round-trip transmission time. In a source-synchronous cycle, the clock travels with the data (same direction), so t_TX cancels out and only the skew t_K matters. Setup/hold still exist at the receiver in either case.",
    sources: ["2025-06-05 (Apply, q7034)", "2025-06-17 (q7301)"],
  },
  {
    id: "th_serial_clock", topic: "Serial communication — clock recovery & sync",
    text: "Which statement correctly describes the characteristics and limitations of different synchronization approaches in serial communication systems?",
    options: [
      { text: "Source-synchronous transmission with clock generated by the transmitter has maximum speed limited primarily by skew between the clock and data signals.", correct: true },
      { text: "NRZ-L encoding inherently guarantees at least one signal transition per bit period, making it optimal for clock recovery applications.", correct: false },
      { text: "The eye-diagram opening parameters are determined exclusively by amplitude noise margins and remain independent of any timing-related variations.", correct: false },
      { text: "The maximum allowable resynchronization interval in serial communications depends primarily on the physical transmission line length and propagation characteristics.", correct: false },
      { text: "Asynchronous serial protocols maintain continuous bit-level synchronization throughout the entire message transmission period.", correct: false },
    ],
    explanation: "When the transmitter generates and sends both clock and data, skew is the dominant limit on cadence. NRZ-L has no guaranteed transitions (long strings of 0s or 1s break the PLL) — that's why Manchester or 8b/10b encodings are used for clock recovery. The eye diagram captures BOTH timing and amplitude margins.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },
  {
    id: "th_bus_throughput", topic: "Buses — throughput", multi: true,
    text: "In bus systems, the throughput (amount of information transferred per unit time) is determined by which two primary parameters? — different formulations across students, all equivalent.",
    options: [
      { text: "Bus width and bus speed.", correct: true },
      { text: "Number of bits transferred per cycle and the cycle frequency.", correct: true },
      { text: "The number of master units and the number of slave units.", correct: false },
      { text: "The type of protocol (synchronous vs asynchronous) and the handshake method.", correct: false },
      { text: "The physical length of the conductors and the electrical impedance.", correct: false },
      { text: "The propagation delay and the skew between signals.", correct: false },
    ],
    explanation: "Throughput = bus width × bus frequency (= bits per cycle × cycles per second). Both formulations describe the same quantity. The other answers describe implementation details that affect signal integrity but not the theoretical maximum.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },

  /* ─────────────  POWER & THERMAL  ───────────── */
  {
    id: "th_cmos_dyn", topic: "CMOS dynamic power",
    text: "The dynamic power consumed by a logic gate in CMOS technology:",
    options: [
      { text: "It is due to the switching of signals between the two logic levels.", correct: true },
      { text: "It is used to maintain a constant voltage level at the output.", correct: false },
      { text: "It is independent of the supply voltage.", correct: false },
      { text: "It decreases as the equivalent switched capacitance increases between logical voltage levels.", correct: false },
    ],
    explanation: "Dynamic power P_dyn = α · C_eq · V_DD² · f_ck — proportional to switching activity, equivalent capacitance, V_DD² and clock frequency. It exists only because nodes change state.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "th_derating", topic: "Power devices — derating",
    text: "The derating of the power of an electronic device:",
    options: [
      { text: "Increases with increasing ambient temperature.", correct: true },
      { text: "Is used to improve the performance of the device at high temperatures.", correct: false },
      { text: "Is independent of junction-case thermal resistance.", correct: false },
      { text: "Is determined by the variability of production.", correct: false },
    ],
    explanation: "Derating REDUCES the maximum allowed power as ambient temperature rises, so the junction stays below T_Jmax: P_Dmax = (T_Jmax − T_A)/(R_thJC + R_thCS + R_thSA). Higher T_A → lower P_Dmax → 'more derating'.",
    sources: ["2024-09-14 (SU13524)"],
  },
  {
    id: "th_soa", topic: "Power semiconductors — Safe Operating Area",
    text: "What are the primary limiting factors that define the boundaries of the Safe Operating Area (SOA) for power semiconductor devices?",
    options: [
      { text: "Maximum allowable voltage, current handling capability, and power-induced temperature-rise limitations.", correct: true },
      { text: "Gate threshold voltage, on-resistance and switching speed.", correct: false },
      { text: "Rise time, fall time and switching frequency.", correct: false },
      { text: "Current gain, saturation voltage and base-drive current.", correct: false },
      { text: "Forward voltage drop, reverse-recovery time and leakage current.", correct: false },
    ],
    explanation: "SOA boundaries: V_DSmax (breakdown), I_Dmax (bond/wire current), P_Dmax (= (T_Jmax−T_A)/R_thtot) and the secondary-breakdown locus. They jointly delimit the I-V region where the device can operate without damage.",
    sources: ["2025-06-05 (Apply, q7034)"],
  },
  {
    id: "th_ddr3", topic: "Memory — DDR3 transfer time",
    text: "Reading D = 4 MiB (1 MiB = 2²⁰ bytes) from a DDR3 DRAM memory with a data bus of W = 128 bit and clock frequency f_ck = 2666 MHz requires at least:",
    options: [
      { text: "t = 49.2 µs.", correct: true },
      { text: "t = 12.3 µs.", correct: false },
      { text: "t = 98.3 µs.", correct: false },
      { text: "t = 6.15 µs.", correct: false },
    ],
    explanation: "Total bits = D·8 = 4·2²⁰·8. Number of transactions = bits/W = 4·2²⁰·8/128. DDR transfers TWO data words per clock period (rising + falling edge), so t = N_tr/(2·f_ck) = (4·2²⁰·8)/(128·2·2666·10⁶) ≈ 49.2 µs.",
    sources: ["2024-09-14 (SU13524)"],
  },

  /* ─────────────  OSCILLATORS  ───────────── */
  {
    id: "th_schmitt_osc", topic: "Oscillators — Schmitt RC relaxation", circuit: "schmitt",
    text: "Regarding square-wave oscillators implemented with RC circuits and hysteresis comparators (Schmitt triggers), which statement is correct?",
    options: [
      { text: "The capacitor in the RC circuit charges and discharges exponentially between the two threshold voltages of the hysteresis comparator.", correct: true },
      { text: "The RC circuit requires an external clock signal to maintain continuous oscillation.", correct: false },
      { text: "The capacitor voltage follows a linear ramp between the threshold voltages during oscillation.", correct: false },
      { text: "The oscillator stops working if the RC time constant is too large compared to the switching time of the comparator.", correct: false },
    ],
    explanation: "Output drives the capacitor through R; the cap charges/discharges exponentially towards the rail set by the output, until it crosses one of the Schmitt thresholds (V_S1 or V_S2) — then the output flips and the cycle repeats. Self-sustaining, no external clock needed.",
    sources: ["2025-06-17 (q7301)"],
  },
];