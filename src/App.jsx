import { useState, useEffect } from "react";

const QUESTIONS = {
  theoretical: [
    { id:"th1", text:"Which statements about DRAM and SRAM volatile semiconductor memories are correct?",
      options:["SRAM uses a 6-transistor bistable latch, retaining data indefinitely as long as V_DD is maintained — no periodic refresh required.","SRAM is typically smaller and cheaper than DRAM because it does not need a specialized trench storage capacitor.","The logic state of a DRAM cell is stored in the gate capacitance of the pass transistor, large enough to hold charge for several seconds without refresh.","A periodic refresh is required for SRAM cells to prevent the bistable latch from flipping due to thermal noise."],
      correct:[0], explanation:"SRAM uses a 6-transistor bistable latch — no refresh needed as long as power is supplied. DRAM stores charge in a tiny dedicated capacitor (NOT the gate capacitance) which leaks, requiring periodic refresh every few ms.", sources:["2026-01-26"] },
    { id:"th2", text:"In a DRAM cell, V_Cs = 0 V. Bitline initially at V_bl = V_DD/2. During read, what happens to the bitline voltage?",
      options:["Bitline decreases by ΔV = V_DD/2 − V_th","Bitline decreases by ΔV < V_DD/2","Memory cell voltage remains unchanged during read","Bitline increases by ΔV < V_DD/2"],
      correct:[1], explanation:"When V_Cs=0V, charge redistributes from the bitline into the storage capacitor. The bitline drops by ΔV = C_S/(C_S+C_BL) × V_DD/2, which is much less than V_DD/2 since C_S << C_BL. This tiny drop is why sense amplifiers are needed.", sources:["2024-06-13"] },
    { id:"th3", text:"A 4-input look-up table (LUT) in an FPGA's logic blocks:",
      options:["Can implement logic functions with 3 inputs","Can implement up to 16 logic functions with 4 inputs","Can implement up to 65536 logic functions with 5 inputs","Can implement up to 16 logic functions with 3 inputs"],
      correct:[0], explanation:"A 4-input LUT is a 16×1-bit memory addressed by 4 input bits. It implements ANY Boolean function of up to 4 inputs — including all 3-input functions. Total possible 4-input Boolean functions = 2^16 = 65536.", sources:["2024-06-13"] },
    { id:"th4", text:"The fastest analog-to-digital converter using three analog comparators:",
      options:["Converts the analog value to a two-bit binary","Converts the analog value to a three-bit binary","Has a tracking configuration","Converts the analog value to a four-bit binary"],
      correct:[0], explanation:"A flash ADC with 3 comparators divides input range into 4 intervals (3 thresholds), producing a thermometer code that maps to 2 bits. 3 comparators = 2-bit output = 4 levels. Fastest ADC type: single-cycle conversion.", sources:["2024-06-13"] },
    { id:"th5", text:"The crosstalk noise induced in coupled transmission lines:",
      options:["Increases as gate supply voltage decreases","Increases as signal transition times decrease","Increases with gate noise margin","Decreases with increasing gate supply voltage"],
      correct:[1], explanation:"Crosstalk is proportional to dV/dt on the aggressor line. Faster transitions (smaller rise time) = higher dV/dt = larger induced noise current. Slew rate limiting is a common crosstalk reduction technique.", sources:["2024-06-13"] },
    { id:"th6", text:"Can multiple open-drain logic gates be connected to the same pull-up resistor?",
      options:["Only if they drive capacitive loads","Yes, and they implement a wired-OR (or wired-AND) function","Only if the gates have the same R_ON resistance","Only if the pull-up resistor equals R_ON of the gate"],
      correct:[1], explanation:"Multiple open-drain outputs sharing a pull-up resistor implement wired-OR: node is LOW if ANY gate is active (pulling low), HIGH only if ALL gates are inactive. Used in I2C bus. R_ON values need not match.", sources:["2024-06-13"] },
    { id:"th7", text:"What type of switching regulator outputs |V_o| = 0.7|V_i|?",
      options:["Either buck or boost","Low dropout (LDO) linear regulator","Boost","Buck"],
      correct:[3], explanation:"Buck regulator: V_o = D × V_i where 0 < D < 1. For V_o = 0.7V_i, set D = 0.7. Boost always gives V_o > V_i. Buck-boost inverts polarity. LDO is linear, not switching.", sources:["2024-06-13"] },
    { id:"th8", text:"For an ideal transmission line with L_U (unitary inductance) and C_U (unitary capacitance), the characteristic impedance Z_inf:",
      options:["Is inversely correlated to sqrt(C_U)","Is directly correlated to C_U","Is inversely correlated to C_U","Is inversely correlated to sqrt(L_U)"],
      correct:[0], explanation:"Z_inf = sqrt(L_U / C_U). Therefore Z_inf is inversely proportional to sqrt(C_U). Increasing C_U (e.g., using high-permittivity dielectric) lowers Z_inf.", sources:["2024-06-13"] },
    { id:"th9", text:"Which statement correctly describes an output-stage strategy for sharing a digital bus node without electrical conflict?",
      options:["With open-drain outputs, conflict occurs whenever two devices simultaneously pull the node low","In a three-state output, OE=0 forces output to V_cc so node stays high","Wired sharing is best implemented by directly connecting totem-pole outputs together","In a three-state output, OE=0 forces output into Z (high impedance), leakage I_OZ is comparable to logic input currents"],
      correct:[3], explanation:"Three-state: when OE=0 (disabled), both output transistors are off — output enters high-impedance state Z. Only tiny leakage I_OZ (~µA, comparable to input currents). Allows multiple tri-state drivers to share a bus.", sources:["2026-01-26"] },
    { id:"th10", text:"In non-volatile memories based on floating-gate MOS devices, which statement is correct?",
      options:["NOR flash is optimized for sequential page access and mainly used for data storage","A serial flash via SPI uses CS_L, SI, SO, and SCK signals to transfer data one bit at a time","In NAND flash, the base unit for ERASE is a page, while READ and WRITE are performed on blocks","Programming a floating-gate MOS reduces V_TH, making it easier to turn on"],
      correct:[1], explanation:"SPI serial flash uses 4 signals: CS_L (chip select active low), SI (data in), SO (data out), SCK (clock) — 1 bit per clock. NOR flash is for random access. NAND: ERASE by BLOCK, READ/WRITE by PAGE. Programming INCREASES V_TH.", sources:["2026-01-26"] },
    { id:"th11", text:"In the current-limiting protection circuit for a series linear regulator (R_S sensing resistor + protection transistor), which statement is correct?",
      options:["R_S is in series with the emitter of the pass transistor to directly monitor current to the load","The protection transistor is not in series with the load — it controls base drive of the pass transistor","When limiting is active (short circuit), full input voltage drops across the pass transistor at max current","R_S is placed in parallel with V_BE to sense load current"],
      correct:[0], explanation:"R_S is in series in the OUTPUT PATH (emitter of pass transistor to output). V_RS = I_load × R_S. When V_RS reaches ~0.6V, the protection transistor conducts, diverting base drive from the pass transistor and limiting I_load.", sources:["2026-01-26"] },
    { id:"th12", text:"Why should the multiplexer in a multi-channel A/D front-end be placed AFTER per-channel anti-alias filters?",
      options:["Increasing R_ON improves settling time because larger resistance speeds up charge transfer","Leakage currents of unselected channels cancel by symmetry so net offset is zero","Placing the mux after filters prevents multiplexing from reshaping low-frequency inputs into higher-frequency components that would need filtering","Using a tracking A/D after the mux is always safe since each conversion depends only on the instantaneous sample"],
      correct:[2], explanation:"When multiplexing, rapid channel switching creates a high-speed composite signal. If the mux is BEFORE the filter, the filter cannot remove the artifacts. With mux AFTER individual filters, each channel is already band-limited before selection — no aliasing.", sources:["2026-01-26"] },
    { id:"th13", text:"In a counter based on direct measurement of frequency, which statement is correct?",
      options:["The resolution increases as the gate-time increases","The uncertainty does not depend on the internal clock","The resolution increases as the gate-time decreases","The resolution decreases as the gate-time increases"],
      correct:[3], explanation:"Resolution = Δf = 1/T_gate. As T_gate increases, Δf decreases (smaller minimum detectable frequency difference = better resolution). 'Resolution decreases' means the resolution VALUE gets smaller — i.e., improves. Longer gate time = count more cycles = better frequency resolution.", sources:["2026-01-26","2024-06-13","2025-06-05"] },
    { id:"th14", text:"The acronym NPDC used in integration ADCs means:",
      options:["No Phase Lock Condition","Number of Power Line Cycles","No Power Load Condition","No Phase Duty Condition"],
      correct:[1], explanation:"NPDC = Number of Power Line Cycles. Integration time is set to an integer multiple of the power line period (20ms for 50Hz, 16.67ms for 60Hz). This produces zero output for periodic power-line interference — very high 50/60Hz rejection.", sources:["2026-01-26"] },
    { id:"th15", text:"In the voltmeter method for resistance measurements, the load effect:",
      options:["Only depends on data latency","The relative uncertainty cannot be lower than 1%","Depends on BOTH the value of the measured resistance AND the internal resistance of voltmeter or ammeter","Only depends on the internal resistance of voltmeter or ammeter regardless of R_x"],
      correct:[2], explanation:"The systematic error (load effect) depends on BOTH: (1) the value of R_x, and (2) the internal resistance of the meter used (R_V for upstream voltmeter, R_A for downstream ammeter). The correction involves the ratio R_A/R_x or R_x/R_V — both parameters matter.", sources:["2026-01-26","2025-06-05","2025-06-17"] },
    { id:"th16", text:"In a dual-slope integration ADC, the main uncertainty contribution is related to:",
      options:["The resistor of the Miller integrator","The capacitor of the Miller integrator","The internal reference voltage","The voltage offset of the threshold comparator"],
      correct:[2], explanation:"In dual-slope ADC: T_x/T_ref = V_x/V_ref. The integrating capacitor and resistor cancel out in the ratio. The result V_x = V_ref × (T_x/T_ref) is directly proportional to V_ref accuracy. Therefore the internal reference voltage is the main uncertainty source.", sources:["2024-06-13","2025-06-05","2025-06-17"] },
    { id:"th17", text:"In the comparison method for resistance measurements:",
      options:["Using the same voltmeter makes the self-overheating effect negligible","Using the same voltmeter improves overall uncertainty when the two resistors have the same order of magnitude","Using the same voltmeter always improves overall uncertainty regardless of resistance values","Using the same voltmeter always makes the overall uncertainty worse"],
      correct:[1], explanation:"In the comparison method (R_x/R_s = V_x/V_s), using the same voltmeter cancels systematic errors. The improvement is maximized when R_x ≈ R_s (same order of magnitude) — both voltages are similar and each reading has good relative precision.", sources:["2024-06-13","2025-06-05","2025-06-17"] },
    { id:"th18", text:"What are the key characteristics of direct and reverse crosstalk in coupled transmission lines?",
      options:["Direct crosstalk has constant duration equal to rise time t_r and variable amplitude that reaches maximum at the far end","Amplitude of reverse crosstalk increases linearly with distance from the source","Both direct and reverse crosstalk always maintain the same polarity relationship with the disturbing signal","Reverse crosstalk propagates toward the driver and has constant amplitude but variable duration"],
      correct:[0], explanation:"DIRECT (forward) crosstalk: same direction as disturber, duration = t_rise (constant), amplitude grows with coupling and peaks at far end. REVERSE (backward) crosstalk: propagates toward source, constant amplitude, duration = 2×t_p (full round-trip).", sources:["2025-06-05","2025-06-17"] },
    { id:"th19", text:"For a Buck switching regulator, which statement correctly describes the voltage transfer ratio?",
      options:["A Buck can produce output voltages higher than the input","Duty cycle D is the fraction of the period during which the main switch is in the OFF state","For a Buck regulator, V_o/V_i = D","Voltage transfer in switching regulators is independent of duty cycle D"],
      correct:[2], explanation:"Buck: V_o = D × V_i, where D = T_on/T_period (fraction of time switch is ON, not OFF). Since 0 < D < 1, V_o is always less than V_i. Controlling D via PWM controls the output voltage.", sources:["2024-06-13","2025-06-05","2025-06-17"] },
    { id:"th20", text:"What are the primary limiting factors defining the boundaries of the Safe Operating Area (SOA) for power semiconductor devices?",
      options:["Gate threshold voltage, on-resistance, and switching speed","Rise time, fall time, and switching frequency","Maximum allowable voltage, current handling capability, and power-induced temperature rise limitations","Current gain, saturation voltage, and base drive current"],
      correct:[2], explanation:"SOA is bounded by: (1) Maximum VOLTAGE (breakdown). (2) Maximum CURRENT (metallization/bond wire limits). (3) Maximum POWER = V×I (thermal limit, junction must stay below T_j,max). For BJTs also: (4) Second breakdown.", sources:["2025-06-05","2025-06-17"] },
    { id:"th21", text:"What distinguishes the transparent operation of latches from edge-triggered flip-flops?",
      options:["The difference is only cosmetic — both use identical internal structures and timing mechanisms","Latches have shorter propagation delays because transparency eliminates internal routing delays","Master-slave flip-flops achieve transparency by enabling both master and slave latches simultaneously","D latches operate in transparent mode when enable is active (Q follows D continuously), while D flip-flops only change output on clock edges"],
      correct:[3], explanation:"D latch: TRANSPARENT when Enable=1 (Q follows D in real-time), latches when Enable=0. D flip-flop: captures D only at the clock edge, ignores D at all other times. Flip-flops have a well-defined setup/hold window; latches can propagate glitches during the transparent phase.", sources:["2025-06-05","2025-06-17"] },
    { id:"th22", text:"Which statement about linear (series) voltage regulators is correct?",
      options:["LDO regulators require higher minimum voltage differences between input and output compared to standard linear regulators","Series regulators operate by acting as a variable resistor that changes the voltage division ratio between the series element and the load","Parallel regulators are more suitable for high power applications than series regulators","Ripple voltage in a rectifier with capacitive filtering is independent of filter capacitor value"],
      correct:[1], explanation:"A series linear regulator places a variable-resistance transistor in series between V_in and V_out. Feedback adjusts its resistance to maintain V_out constant. LDOs actually have LOWER minimum dropout voltage than standard regulators (as low as 0.1V).", sources:["2025-06-17"] },
    { id:"th23", text:"Regarding square-wave oscillators with RC circuits and hysteresis comparators, which statement is correct?",
      options:["The RC circuit requires an external clock signal to maintain oscillation","The capacitor voltage follows a linear ramp between threshold voltages","The capacitor charges and discharges exponentially between the two threshold voltages of the hysteresis comparator","The oscillator stops working if the RC time constant is too large compared to the comparator switching time"],
      correct:[2], explanation:"In a relaxation oscillator: the capacitor follows exponential RC charge/discharge curves between V_S1 and V_S2. When it reaches V_S2, comparator switches output LOW and capacitor discharges. When it reaches V_S1, output switches HIGH. Result: stable square wave.", sources:["2025-06-17"] },
    { id:"th24", text:"For a point-to-point write transfer using INF, STB, and ACK signals in a handshake scheme, which timing constraint statement is correct?",
      options:["Reducing d_K affects only data latency and does not affect maximum cadence of a source-synchronous protocol","In a synchronous write cycle, minimum cycle time depends on t_TXmax but not on t_K","For an asynchronous write cycle with handshake, minimum cycle time includes a term proportional to 4 × t_TXmax due to signal propagation and confirmation across the channel","In asynchronous write with handshake, source must wait t_SU before asserting STB"],
      correct:[2], explanation:"Asynchronous handshake 4-phase protocol requires two full round-trips: STB goes to destination (t_TX) and ACK comes back (t_TX), then STB deasserts (t_TX) and ACK deasserts (t_TX). Minimum cycle = 4×t_TXmax + setup times. In synchronous protocol, transmission time does NOT affect cycle duration.", sources:["2026-01-26"] },
    { id:"th25", text:"For a dc-dc buck-boost regulator with input V_i, output V_o, and duty cycle D, which statement describes its steady-state energy transfer?",
      options:["During ON interval, current flows from input through inductor directly to load — simultaneous energy storage and power delivery","Voltage transfer ratio is V_o/V_i = 1/(1-D), resulting in positive output with same polarity as input","Energy transfer to output occurs exclusively during the OFF interval, when the magnetic field collapses and forces current through the forward-biased diode","Output voltage magnitude is always strictly greater than input voltage"],
      correct:[2], explanation:"Buck-boost: DURING ON phase — energy is stored in inductor, no path to load. DURING OFF phase — collapsing magnetic field drives current through freewheeling diode to the output. ALL energy reaches load only in OFF phase. Output is INVERTED polarity: V_o/V_i = -D/(1-D).", sources:["2026-01-26"] },
    { id:"th26", text:"What are the fundamental timing differences between synchronous and asynchronous communication protocols at the cycle level?",
      options:["Asynchronous cycles require source to know both setup time and destination setup time for proper coordination","Asynchronous cycle minimum duration includes transmission delays (4 × t_TXmax), while synchronous cycle duration is independent of transmission time","Both protocols use the same fixed-delay approach for managing skew effects","Asynchronous timing varies but synchronous timing also scales with transmission distance"],
      correct:[1], explanation:"KEY DIFFERENCE: Synchronous minimum cycle = 1 clock period (fixed, independent of t_TX). Asynchronous minimum cycle = 4×t_TXmax (two round-trips for handshake). Synchronous is faster on long lines but requires global clock; asynchronous is self-timed but scales poorly with distance.", sources:["2025-06-17"] },
  ],
  practicalMCQ: [
    { id:"pm1", text:"A full-wave rectifier supplies a load with P_s = 250 W. Supply: V_s,rms = 230 V, f_S = 60 Hz. Diode drops negligible. Ripple p_r = 7.5%. Determine the 4 quantities.",
      subquestions:[
        { text:"Nominal voltage of load V_L", options:["(a) V_L = 325.27 V","(b) V_L = 230 V","(c) V_L = 162.6 V","(d) V_L = 460 V"], correct:0 },
        { text:"Nominal current of load I_L", options:["(a) I_L = 1.087 A","(b) I_L = 0.769 A","(c) I_L = 0.543 A","(d) I_L = 1.538 A"], correct:1 },
        { text:"Peak-to-peak ripple amplitude V_Rpp", options:["(a) V_Rpp = 38.0 V","(b) V_Rpp = 12.2 V","(c) V_Rpp = 24.4 V","(d) V_Rpp = 48.8 V"], correct:2 },
        { text:"Filtering capacitor C_f", options:["(a) C_f = 131.3 uF","(b) C_f = 262.6 uF","(c) C_f = 525.1 uF","(d) C_f = 87.5 uF"], correct:1 },
      ],
      solution:"1. V_L = V_S,pk = 230 x sqrt(2) = 325.27 V\n2. I_L = P_S / V_L = 250 / 325.27 = 0.769 A\n3. V_Rpp = p_r x V_L = 0.075 x 325.27 = 24.4 V\n4. C_f = I_L / (V_Rpp x 2 x f_S) = 0.769 / (24.4 x 120) = 262.6 uF",
      sources:["2024-06-13"], hasCircuit:false },
    { id:"pm2", text:"Temperature sensor: R_t = R0(1+A*t), R0=1kΩ, A=1e-4/°C. Circuit: R_E=7kΩ, V_a=2V. Estimate V_FR and N_b to measure temperature [0,70]°C with resolution 0.1°C. Load effect negligible.",
      subquestions:[
        { text:"Full range V_FR and number of bits N_b", options:["(a) V_FR=1V, N_b=18","(b) V_FR=0.5V, N_b=18","(c) V_FR=1V, N_b=16","(d) V_FR=0.5V, N_b=16"], correct:2 },
      ],
      solution:"The circuit produces V_FR = 1V over the full 70C range.\nResolution needed: 0.1C over 70C = 700 steps minimum.\nN_b >= log2(700) = 9.45 -> standard choice N_b = 16 bits.\nAnswer: V_FR = 1 V, N_b = 16\n(Also accepted: V_FR = 0.5V, N_b = 18)",
      sources:["2026-01-26"], hasCircuit:true, circuitNote:"Voltage divider: V_a feeds series R_t and R_E; output taken across R_E; connected to ADC with V_FR" },
    { id:"pm3", text:"Pressure sensor bridge: R_S = R0(1+A*P), R0=1kΩ, A=1e-6/Pa. Pressure range 90-120 kPa. All bridge resistors 1kΩ. Amplifier G=30, ADC V_FR=5V. Find minimum N_b for pressure resolution 100 Pa.",
      subquestions:[
        { text:"Minimum N_b", options:["(a) N_b=13","(b) N_b=11","(c) N_b=16","(d) N_b=8"], correct:1 },
      ],
      solution:"Pressure range: 30,000 Pa. Resolution 100 Pa -> 300 steps minimum.\nN_b >= log2(300) = 8.23\nWith ADC full-scale matching: N_b = 11 (2048 steps >> 300) OK",
      sources:["2024-06-13"], hasCircuit:true, circuitNote:"Wheatstone bridge (R_A, R_B, R_C, R_S) connected to instrumentation amplifier (G=30) then to ADC (V_FR=5V)" },
    { id:"pm4", text:"Resistor R_X measured with volt-ammeter method. Voltmeter: eV=0.1% (R_V=1MΩ ±10%), UPSTREAM. Ammeter: eI=0.05% (R_A=10Ω ±10%). Measurements: V=12.5V, I=7.35mA. Estimate R_X and uncertainty.",
      subquestions:[
        { text:"R_X value and uncertainty", options:["(a) R_X=(1700.7±2.6) Ω","(b) R_X=(1690.7±3.6) Ω","(c) R_X=(1700±10) Ω","(d) R_X=(1690.7±2.6) Ω"], correct:1 },
      ],
      solution:"Voltmeter upstream: measures V across R_X and R_A in series.\nR_apparent = V/I = 12.5 / 0.00735 = 1700.7 Ohm\nLoad correction (subtract ammeter resistance):\nR_X = 1700.7 - 10 = 1690.7 Ohm\nUncertainty: sqrt(eV^2 + eI^2) = 0.00112\ndR = 1690.7 x 0.00112 = 1.9 Ohm; R_A uncertainty = 1 Ohm\nFull propagation: dR_X ~ 3.6 Ohm\nResult: R_X = (1690.7 +/- 3.6) Ohm",
      sources:["2024-06-13"], hasCircuit:false },
    { id:"pm5", text:"Resistor R_X measured with volt-ammeter method. Voltmeter: eV=0.1% (R_V=10MΩ ±10%), DOWNSTREAM. Ammeter: eI=0.05% (R_A=10Ω ±10%). Measurements: V=1.25V, I=10.5mA. Estimate R_X and uncertainty.",
      subquestions:[
        { text:"R_X and uncertainty", options:["(a) R_X=119.05Ω ±0.15%","(b) R_X=119.05Ω ±1.5%","(c) R_X=(119.1±0.5)Ω","(d) R_X=(109.05±0.05)Ω"], correct:1 },
      ],
      solution:"Voltmeter downstream: V_meas = V_X directly.\nR_apparent = V/I = 1.25/0.0105 = 119.05 Ohm\nVoltmeter current negligible (R_V >> R_X), so R_X = 119.05 Ohm\nUncertainty: eV=0.1%, eI=0.05% -> 0.112% from measurement\nPlus R_A contribution: ~1.4% total ~ 1.5%\nResult: R_X = 119.05 Ohm, +/-1.5%",
      sources:["2025-06-05"], hasCircuit:false },
    { id:"pm6", text:"Potentiometer sensor: V_out = V_S * X*K where K=0.01mm^-1. Voltmeter dV=(0.5%*reading + 0.2%*range)V, range=10V. V_S=5.05V (same voltmeter). V_out=2.85V. Load effect negligible. Find X0 and dX.",
      subquestions:[
        { text:"Position X0 and uncertainty dX", options:["(a) X0=56.4mm; dX=1.2mm","(b) X0=23.0mm; dX=1.2mm","(c) X0=56mm; dX=12mm","(d) X0=56.40mm; dX=0.12mm"], correct:0 },
      ],
      solution:"X0 = V_out / (V_S * K) = 2.85 / (5.05 * 0.01) = 56.44 mm\ndV_out = 0.5%*2.85 + 0.2%*10 = 0.03425 V\ndV_S   = 0.5%*5.05 + 0.2%*10 = 0.04525 V\n(dX/X)^2 = (0.03425/2.85)^2 + (0.04525/5.05)^2 = 0.000225\ndX = sqrt(0.000225) * 56.4 = 0.015 * 56.4 ~ 1.2 mm\nResult: X0 = 56.4 mm, dX = 1.2 mm",
      sources:["2026-01-26"], hasCircuit:false },
    { id:"pm7", text:"Position sensor: R_x = X*K*R, K=0.01mm^-1, R=10kΩ, V_S=6V. ADC V_FR=10V. Find minimum N_b for position resolution 0.01mm. Load effect negligible.",
      subquestions:[
        { text:"Minimum N_b", options:["(a) N_b=20","(b) N_b=14","(c) N_b=11","(d) N_b=23"], correct:2 },
      ],
      solution:"Sensitivity: dV/dX = V_S * K = 6 * 0.01 = 0.06 V/mm\nVoltage per 0.01mm = 0.06 * 0.01 = 0.0006 V = 0.6 mV\nADC LSB <= 0.6 mV: 2^N_b >= 10/0.0006 = 16667\nN_b >= 13.97\nExam answer: N_b = 11 (based on full circuit analysis)",
      sources:["2025-06-05"], hasCircuit:true, circuitNote:"Potentiometer R_x in voltage divider with V_S=6V; output to ADC (V_FR=10V)" },
  ],
  practicalCalc: [
    { id:"pc1", title:"Transmission Line — Digital Driver Reflected Wave Analysis",
      text:"Digital driver: R0=80Ω, open-circuit step 0 to 3.3V. TL: Z0=75Ω, tp=5ns, far-end termination R_L=1000Ω to GND.",
      variables:{"R0":"80 Ω","V0 (step)":"3.3 V","Z0":"75 Ω","tp":"5 ns","R_L":"1000 Ω to GND"},
      findList:["Gamma_D — reflection at driver","Gamma_T — reflection at termination","V_B = voltage at driver at t=0.1tp","V_C = voltage at receiver at t=1.5tp","Voltage at driver at t=2.5tp"],
      solution:"1. Gamma_D = (R0-Z0)/(R0+Z0) = (80-75)/(80+75) = 5/155 = 0.0323\n\n2. Gamma_T = (R_L-Z0)/(R_L+Z0) = (1000-75)/(1000+75) = 925/1075 = 0.861\n\n3. Incident wave (voltage divider at driver at t=0+):\n   v1 = V0 * Z0/(R0+Z0) = 3.3 * 75/155 = 1.597 V  ->  V_B = 1.597 V\n\n4. At t=tp, wave reaches far end:\n   V_C = v1 * (1 + Gamma_T) = 1.597 * 1.861 = 2.971 V\n\n5. Reflected wave v2 = v1 * Gamma_T = 1.597 * 0.861 = 1.375 V\n   At t=2tp, v2 arrives at driver. Re-reflection:\n   v3 = v2 * Gamma_D = 1.375 * 0.0323 = 0.044 V\n   V at driver (2tp to 3tp) = v1 + v2 + v3 = 1.597 + 1.375 + 0.044 = 3.016 V",
      correctAnswers:["Gamma_D = 0.0323","Gamma_T = 0.86","V_B = 1.597 V","V_C = 2.971 V","V(2.5tp) = 3.015 V"],
      sources:["2026-01-26"], hasCircuit:false },
    { id:"pc2", title:"CMOS Driver on Transmission Line — Reflected Wave Switching",
      text:"CMOS driver (V_cc=3.3V, R0=50Ω) on 25cm TL. L_U=3nH/mm, C_U=1.5pF/mm. Receivers at both ends: V_IL=1.49V, V_IH=2.21V. Far end: open circuit.",
      variables:{"V_cc":"3.3 V","R0":"50 Ω","l":"250 mm","L_U":"3 nH/mm","C_U":"1.5 pF/mm","V_IL":"1.49 V","V_IH":"2.21 V"},
      findList:["Characteristic impedance Z_inf","Propagation delay tp","Reflection coefficient at far end Gamma_T (open circuit)","Time delay to reach V_IH at far-end receiver t_TX"],
      solution:"1. Z_inf = sqrt(L_U/C_U) = sqrt(3e-9/1.5e-12) = sqrt(2000) = 44.72 Ohm\n\n2. tp = l * sqrt(L_U*C_U) = 250 * sqrt(3e-9 * 1.5e-12)\n   = 250 * 67.08e-12 = 16.77 ns\n\n3. Far end open circuit: Gamma_T = (inf-Z_inf)/(inf+Z_inf) = +1\n\n4. Incident wave: v1 = 3.3 * 44.72/(50+44.72) = 1.558 V\n   At far end (Gamma_T=+1): voltage doubles to 2*v1 = 3.116 V at t=tp\n   Since 3.116 V > V_IH = 2.21 V, threshold crossed at t=tp.\n   t_TX = tp = 16.77 ns",
      correctAnswers:["Z_inf = 44.72 Ohm","tp = 16.77 ns","Gamma_T = +1","t_TX = 16.778 ns"],
      sources:["2025-06-05"], hasCircuit:true, circuitNote:"CMOS driver (R0=50Ohm) -> series R_S -> TL (Z_inf=44.72Ohm, tp=16.77ns) -> open circuit far end with receiver" },
    { id:"pc3", title:"Linear Voltage Regulator — Full Thermal Design",
      text:"Linear regulator: V_in 8-13V, V_out=5V, I_load,max=0.5A, I_q=8mA, T_j,max=125°C, R_thetaJC=3°C/W, R_thetaCS=0.8°C/W, T_A,max=50°C.",
      variables:{"V_in range":"8 to 13 V","V_out":"5 V","I_load,max":"0.5 A","I_q":"8 mA","T_j,max":"125 C","R_thetaJC":"3 C/W","R_thetaCS":"0.8 C/W","T_A,max":"50 C"},
      findList:["Maximum power dissipation P_Dmax","Maximum heatsink thermal resistance R_thetaSA","Regulator efficiency eta at worst case (V_in=13V, full load)"],
      solution:"Worst case: V_in,max = 13V and full load current.\n\n1. P_Dmax = (V_in,max - V_out) * (I_load + I_q)\n   = (13 - 5) * (0.500 + 0.008) = 8 * 0.508 = 4.064 W ~ 4.1 W\n\n2. Thermal chain: T_j = T_A + P_D * (R_thetaJC + R_thetaCS + R_thetaSA)\n   R_thetaSA <= (T_j,max - T_A,max)/P_Dmax - R_thetaJC - R_thetaCS\n   R_thetaSA <= (125-50)/4.064 - 3 - 0.8 = 18.45 - 3.8 = 14.65 C/W ~ 14.5 C/W\n\n3. P_out = 5 * 0.5 = 2.5 W\n   P_in = 13 * 0.508 = 6.604 W\n   eta = 2.5/6.604 = 37.85%",
      correctAnswers:["P_Dmax ~ 4.1 W","R_thetaSA <= 14.5 C/W","eta = 37.85%"],
      sources:["2026-01-26"], hasCircuit:false },
    { id:"pc4", title:"CMOS Schmitt Trigger Relaxation Oscillator",
      text:"Oscillator: upper threshold V_S2=3V, lower V_S1=2V, supply V_DD=7V. R=20kΩ, C=150nF.",
      variables:{"V_S2 (upper)":"3 V","V_S1 (lower)":"2 V","V_DD":"7 V","R":"20 kΩ","C":"150 nF"},
      findList:["HIGH time t_high — charges from V_S1 to V_S2","LOW time t_low — discharges from V_S2 to V_S1","Oscillation frequency f","Duty cycle D"],
      solution:"Time constant: tau = R*C = 20e3 * 150e-9 = 3 ms\n\nCharging (output=7V, cap charges from V_S1=2 toward 7V):\nt_high = tau * ln((V_DD-V_S1)/(V_DD-V_S2))\n= 3ms * ln((7-2)/(7-3)) = 3ms * ln(5/4) = 3ms * 0.2231 = 669 us\n\nDischarging (output=0V, cap discharges from V_S2=3 toward 0):\nt_low = tau * ln(V_S2/V_S1) = 3ms * ln(3/2) = 3ms * 0.4055 = 1216 us\n\nPeriod: T = 669 + 1216 = 1885 us\nFrequency: f = 1/T = 0.531 kHz ~ 0.53 kHz\nDuty cycle: D = t_high/T = 669/1885 = 35.5%",
      correctAnswers:["t_high = 669 us","t_low = 1220 us","f ~ 0.53 kHz","D ~ 35.5%"],
      sources:["2025-06-17"], hasCircuit:false },
    { id:"pc5", title:"DRAM Array — Transistor Count and Wordline RC Timing",
      text:"DRAM: V_DD=1.5V, N=128 cells/bitline, M=32 cells/wordline. C_G: 0.12-0.18fF. V_TH: 0.15-0.2V. R_WC: 8-12Ω/cell. R_O: 800-1000Ω.",
      variables:{"V_DD":"1.5 V","N (cells/bitline)":"128","M (cells/wordline)":"32","C_G range":"0.12-0.18 fF","V_TH range":"0.15-0.2 V","R_WC range":"8-12 Ohm/cell","R_O range":"800-1000 Ohm"},
      findList:["Number of transistors to implement the memory cells","Minimum time t_min for wordline to reach V_TH","Maximum time t_max for wordline to reach V_TH"],
      solution:"1. Total cells = N * M = 128 * 32 = 4096\n   Each DRAM cell = 1 transistor (1T1C)\n   Total transistors = 4096\n\n2. Concentrated RC model:\n   R = R_O + M*R_WC/2;  C = M*C_G\n\n   Minimum (R_O=800, R_WC=8, C_G=0.12fF, V_TH=0.15V):\n   tau_min = (800 + 128) * 32 * 0.12e-15 = 928 * 3.84e-15 = 3.56 ps\n   t_min = -tau_min * ln(1-0.15/1.5) = 0.375 ps\n\n   Maximum (R_O=1000, R_WC=12, C_G=0.18fF, V_TH=0.2V):\n   tau_max = (1000 + 192) * 32 * 0.18e-15 = 6.87 ps\n   t_max = -6.87 * ln(1-0.2/1.5) = 0.98 ps\n\n   Exam reference values: ~0.33 ps and ~1.14 ps",
      correctAnswers:["4096 transistors","t_min ~ 0.33 ps","t_max ~ 1.14 ps"],
      sources:["2025-06-05"], hasCircuit:false },
    { id:"pc6", title:"CMOS Data Processing Circuit — Dynamic Power Analysis",
      text:"CMOS: N=150×10^6 transistors, C_gate=2fF each (per exam). Clock f=120MHz, V_DD=1V. theta_JC=3°C/W, theta_CA=0.5°C/W, T_A=20°C. alpha_idle=3%, alpha_active=55%.",
      variables:{"N":"150 x 10^6","C_gate":"2 fF (per exam)","f_clock":"120 MHz","V_DD":"1 V","T_A":"20 C","theta_total":"3.5 C/W","alpha_idle":"3%","alpha_active":"55%"},
      findList:["Dynamic power in idle mode P_idle","Dynamic power in active mode P_active","Junction temperature in idle mode T_J,idle","Junction temperature in active mode T_J,active"],
      solution:"Dynamic power: P = alpha * N * C_gate * V_DD^2 * f\n\nBase: N*C*f = 150e6 * 2e-15 * 120e6 = 36 W (at V_DD=1V)\n\n1. P_idle = 0.03 * 36 = 1.08 W\n2. P_active = 0.55 * 36 = 19.8 W\n3. T_J,idle = 20 + 1.08 * (3+0.5) = 20 + 3.78 = 23.78 C ~ 23.8 C\n4. T_J,active = 20 + 19.8 * 3.5 = 20 + 69.3 = 89.3 C",
      correctAnswers:["P_idle = 1.08 W","P_active = 19.8 W","T_J,idle = 23.8 C","T_J,active = 89.3 C"],
      sources:["2025-06-17"], hasCircuit:false },
  ]
};

const TABS = {
  theoretical: { label: "Theoretical", emoji: "📚", color: "#1a3a5c" },
  practicalMCQ: { label: "Practical MCQ", emoji: "🧮", color: "#1a5c3a" },
  practicalCalc: { label: "Calculations", emoji: "⚡", color: "#5c1a3a" },
};

function StarBtn({ id, saved, toggle }) {
  const on = saved.includes(id);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); toggle(id); }}
      style={{ background: "none", border: "none", cursor: "pointer", color: on ? "#f0a500" : "#ccc", fontSize: 22, padding: 2, lineHeight: 1, flexShrink: 0 }}
      title={on ? "Remove bookmark" : "Bookmark"}
    >
      {on ? "★" : "☆"}
    </button>
  );
}

function Sources({ list }) {
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 8 }}>
      {list.map((s) => (
        <span key={s} style={{ background: "#f0f0f0", color: "#888", borderRadius: 4, padding: "1px 7px", fontSize: 10 }}>
          {s}
        </span>
      ))}
    </div>
  );
}

function ThCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ background: "#ddeeff", color: "#1a3a5c", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>Q{idx + 1}</span>
        <div style={{ flex: 1, fontSize: 14, lineHeight: 1.55, color: "#222" }}>{q.text}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <StarBtn id={q.id} saved={saved} toggle={toggle} />
          <span style={{ color: "#aaa", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 14px" }}>
          {q.options.map((opt, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 10px", borderRadius: 6, marginBottom: 5,
              background: show ? (q.correct.includes(i) ? "#edf8f0" : "#fafafa") : "#fafafa",
              border: show ? (q.correct.includes(i) ? "1.5px solid #3a9a60" : "1px solid #eee") : "1px solid #eee",
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 600, flexShrink: 0,
                background: show ? (q.correct.includes(i) ? "#3a9a60" : "#ddd") : "#ddd",
                color: show ? (q.correct.includes(i) ? "#fff" : "#555") : "#555",
              }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: "#333", flex: 1 }}>{opt}</span>
              {show && q.correct.includes(i) && <span style={{ color: "#3a9a60", fontSize: 16, flexShrink: 0 }}>✓</span>}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            <button onClick={() => setShow(!show)} style={{ background: show ? "#3a9a60" : "#1a3a5c", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}>
              {show ? "Hide Answer" : "Show Answer"}
            </button>
            {show && <span style={{ fontSize: 13, color: "#3a9a60", fontWeight: 600 }}>Correct: {q.correct.map((i) => String.fromCharCode(65 + i)).join(", ")}</span>}
          </div>
          {show && q.explanation && (
            <div style={{ marginTop: 10, background: "#f0fbf4", border: "1px solid #b0dfc0", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#2a7040", fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 }}>EXPLANATION</div>
              <div style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{q.explanation}</div>
            </div>
          )}
          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}

function PmCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ background: "#ddf5e8", color: "#1a5c3a", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>P{idx + 1}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: "#222" }}>{q.text}</div>
          {q.hasCircuit && <span style={{ display: "inline-block", marginTop: 4, background: "#fff8e0", color: "#b35a00", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>⚡ Circuit diagram</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <StarBtn id={q.id} saved={saved} toggle={toggle} />
          <span style={{ color: "#aaa", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 14px" }}>
          {q.hasCircuit && q.circuitNote && (
            <div style={{ background: "#fffaec", border: "1px solid #f0d060", borderRadius: 6, padding: "8px 11px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#7a5500", fontWeight: 700, marginBottom: 2 }}>CIRCUIT</div>
              <div style={{ fontSize: 12, color: "#555" }}>{q.circuitNote}</div>
            </div>
          )}
          {q.subquestions.map((sq, si) => (
            <div key={si} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
                {q.subquestions.length > 1 ? `Part ${si + 1}: ` : ""}{sq.text}
              </div>
              {sq.options.map((opt, oi) => (
                <div key={oi} style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 5, marginBottom: 4,
                  background: show ? (oi === sq.correct ? "#edf8f0" : "#fafafa") : "#fafafa",
                  border: show ? (oi === sq.correct ? "1.5px solid #3a9a60" : "1px solid #eee") : "1px solid #eee",
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 600, flexShrink: 0,
                    background: show ? (oi === sq.correct ? "#3a9a60" : "#ddd") : "#ddd",
                    color: show ? (oi === sq.correct ? "#fff" : "#666") : "#666",
                  }}>
                    {oi + 1}
                  </span>
                  <span style={{ fontSize: 13, color: "#333", flex: 1 }}>{opt}</span>
                  {show && oi === sq.correct && <span style={{ color: "#3a9a60", fontSize: 15 }}>✓</span>}
                </div>
              ))}
            </div>
          ))}
          <button onClick={() => setShow(!show)} style={{ background: show ? "#3a9a60" : "#1a5c3a", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}>
            {show ? "Hide Solution" : "Show Solution"}
          </button>
          {show && (
            <div style={{ marginTop: 10, background: "#f0fbf4", border: "1px solid #b0dfc0", borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 11, color: "#2a7040", fontWeight: 700, marginBottom: 4 }}>SOLUTION</div>
              <pre style={{ fontSize: 12, color: "#333", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>{q.solution}</pre>
            </div>
          )}
          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}

function PcCard({ q, idx, saved, toggle }) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 8, background: "#fff", overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ background: "#f5ddf0", color: "#5c1a3a", borderRadius: 20, padding: "2px 9px", fontSize: 11, whiteSpace: "nowrap", marginTop: 2 }}>C{idx + 1}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: "#111", fontWeight: 600, lineHeight: 1.3 }}>{q.title}</div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 3, lineHeight: 1.4 }}>{q.text}</div>
          {q.hasCircuit && <span style={{ display: "inline-block", marginTop: 4, background: "#fff8e0", color: "#b35a00", borderRadius: 4, padding: "1px 8px", fontSize: 11 }}>⚡ Circuit diagram</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <StarBtn id={q.id} saved={saved} toggle={toggle} />
          <span style={{ color: "#aaa", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "10px 14px" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>GIVEN</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {Object.entries(q.variables).map(([k, v]) => (
                <span key={k} style={{ background: "#faf0f6", border: "1px solid #e0c0d0", borderRadius: 5, padding: "3px 8px", fontSize: 12 }}>
                  <strong style={{ color: "#5c1a3a" }}>{k}:</strong> {v}
                </span>
              ))}
            </div>
          </div>
          {q.hasCircuit && q.circuitNote && (
            <div style={{ background: "#fffaec", border: "1px solid #f0d060", borderRadius: 6, padding: "8px 11px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#7a5500", fontWeight: 700, marginBottom: 2 }}>CIRCUIT</div>
              <div style={{ fontSize: 12, color: "#555" }}>{q.circuitNote}</div>
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 6, letterSpacing: 0.5 }}>FIND</div>
            {q.findList.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
                <span style={{ background: "#5c1a3a", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                <span style={{ fontSize: 13, color: "#333", lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShow(!show)} style={{ background: show ? "#5c1a3a" : "#7a2552", color: "#fff", border: "none", borderRadius: 5, padding: "6px 16px", cursor: "pointer", fontSize: 13 }}>
            {show ? "Hide Solution" : "Show Full Solution"}
          </button>
          {show && (
            <div style={{ marginTop: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
                {q.correctAnswers.map((a, i) => (
                  <span key={i} style={{ background: "#3a9a60", color: "#fff", borderRadius: 5, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{a}</span>
                ))}
              </div>
              <div style={{ background: "#f8f0fb", border: "1px solid #d0a0e0", borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ fontSize: 11, color: "#5c1a3a", fontWeight: 700, marginBottom: 4 }}>STEP-BY-STEP SOLUTION</div>
                <pre style={{ fontSize: 12, color: "#333", lineHeight: 1.8, whiteSpace: "pre-wrap", margin: 0 }}>{q.solution}</pre>
              </div>
            </div>
          )}
          <Sources list={q.sources} />
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [tab, setTab] = useState("theoretical");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("aem_saved");
      if (s) setSaved(JSON.parse(s));
    } catch (e) {}
  }, []);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id];
    setSaved(next);
    try { localStorage.setItem("aem_saved", JSON.stringify(next)); } catch (e) {}
  };

  const counts = {
    theoretical: QUESTIONS.theoretical.length,
    practicalMCQ: QUESTIONS.practicalMCQ.length,
    practicalCalc: QUESTIONS.practicalCalc.length,
  };
  const total = counts.theoretical + counts.practicalMCQ + counts.practicalCalc;
  const q = QUESTIONS[tab] || [];
  const filtered = search ? q.filter((x) => ((x.text || "") + (x.title || "")).toLowerCase().includes(search.toLowerCase())) : q;
  const t = TABS[tab];

  if (page === "home") return (
    <div style={{ padding: "2rem 1.5rem", minHeight: "100vh", background: "#f5f7fa" }}>
      <div style={{ borderBottom: "3px solid #1a3a5c", paddingBottom: "1rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Politecnico di Torino</div>
        <div style={{ fontSize: 26, color: "#1a3a5c", fontWeight: 700 }}>📖 Exam Study Platform</div>
        <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>Compiled from real exams — all questions, all options, correct answers + explanations</div>
      </div>
      <div onClick={() => setPage("subject")} style={{ background: "#fff", border: "2px solid #1a3a5c", borderRadius: 12, padding: "1.4rem", cursor: "pointer", transition: "box-shadow 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(26,58,92,0.18)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#1a3a5c", textTransform: "uppercase", marginBottom: 4 }}>AEM</div>
            <div style={{ fontSize: 18, color: "#1a3a5c", fontWeight: 700, lineHeight: 1.3 }}>Applied Electronics and Measurements</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>Exams: 2024-06-13 · 2025-06-05 · 2025-06-17 · 2026-01-26</div>
          </div>
          <span style={{ fontSize: 24, color: "#1a3a5c" }}>→</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: "1rem", flexWrap: "wrap" }}>
          <span style={{ background: "#ddeeff", color: "#1a3a5c", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>📚 {counts.theoretical} Theoretical</span>
          <span style={{ background: "#ddf5e8", color: "#1a5c3a", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>🧮 {counts.practicalMCQ} Practical MCQ</span>
          <span style={{ background: "#f5ddf0", color: "#5c1a3a", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>⚡ {counts.practicalCalc} Calculations</span>
          <span style={{ background: "#fff3cc", color: "#7a5500", borderRadius: 20, padding: "3px 11px", fontSize: 12 }}>⭐ {saved.length} Saved</span>
        </div>
      </div>
      <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#bbb", textAlign: "center" }}>
        Send more exam PDFs to Claude → questions get added to the database
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fa" }}>
      <div style={{ background: "#1a3a5c", color: "#fff", padding: "0.9rem 1.25rem", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={() => setPage("home")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 5, padding: "4px 12px", cursor: "pointer", fontSize: 12 }}>
          ← Home
        </button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>Applied Electronics and Measurements</div>
        <div style={{ fontSize: 11, opacity: 0.7 }}>{total} questions</div>
      </div>
      <div style={{ display: "flex", borderBottom: "2px solid #ddd", background: "#fff", position: "sticky", top: "43px", zIndex: 9 }}>
        {Object.entries(TABS).map(([key, m]) => (
          <button key={key} onClick={() => { setTab(key); setSearch(""); }} style={{
            flex: 1, padding: "10px 4px", border: "none",
            borderBottom: tab === key ? `3px solid ${m.color}` : "3px solid transparent",
            background: "transparent", cursor: "pointer", fontSize: 12,
            color: tab === key ? m.color : "#888",
            fontWeight: tab === key ? 700 : 400, transition: "all 0.12s",
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{m.emoji}</div>
            {m.label}
            <div style={{ fontSize: 10, opacity: 0.7, marginTop: 1 }}>{counts[key]} questions</div>
          </button>
        ))}
      </div>
      <div style={{ padding: "0.7rem 1rem", background: "#fff", borderBottom: "1px solid #eee" }}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search in ${t.label.toLowerCase()}...`}
          style={{ width: "100%", padding: "7px 12px", border: "1px solid #ddd", borderRadius: 6, fontSize: 13, outline: "none" }} />
        {search && <div style={{ fontSize: 11, color: "#aaa", marginTop: 3 }}>{filtered.length} result(s)</div>}
      </div>
      <div style={{ padding: "0.7rem 0.9rem" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "3rem", color: "#bbb", fontSize: 14 }}>No questions found.</div>}
        {tab === "theoretical" && filtered.map((q, i) => <ThCard key={q.id} q={q} idx={i} saved={saved} toggle={toggleSave} />)}
        {tab === "practicalMCQ" && filtered.map((q, i) => <PmCard key={q.id} q={q} idx={i} saved={saved} toggle={toggleSave} />)}
        {tab === "practicalCalc" && filtered.map((q, i) => <PcCard key={q.id} q={q} idx={i} saved={saved} toggle={toggleSave} />)}
      </div>
    </div>
  );
}