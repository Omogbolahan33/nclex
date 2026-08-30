"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 55) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 54: MOC (17.8% vs 18),
 * PHA (15.9% vs 16) and RRP (11.9% vs 12). Every item is
 * difficulty 2 or 3, and the clinical detail is written to be
 * defensible.
 *
 * MOC 7: shockable versus non-shockable rhythms, VF and VT
 * management, post-resuscitation care, brainstem death and somatic
 * support, hot debrief, team dynamics and non-technical skills,
 * and situation awareness.
 * PHA 6: magnesium sulphate in torsades de pointes, amiodarone in
 * cardiac arrest, adrenaline timing, atropine in bradycardia,
 * sodium bicarbonate indications, and calcium in hyperkalaemia.
 * RRP 5: neuroprognostication, targeted temperature management,
 * organ donation and family support, resuscitation decision-making,
 * and annual update with competency.
 * PSY 2: bereavement support, and family communication after
 * cardiac arrest.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- MOC 7 */
{id:"MOC-254", t:"single", cn:"MOC", sys:"CV", topic:"Shockable versus non-shockable rhythms", d:3, b:0.55, cj:"act", tags:["management","shockable","non-shockable","cardiac arrest","defibrillation"],
 stem:"A client is in cardiac arrest with a rhythm on the defibrillator. Which action by the nurse is most appropriate?",
 opts:["Identify whether the rhythm is shockable (VF/pulseless VT) or non-shockable (asystole/PEA), since this determines the algorithm","Defibrillate immediately, since all cardiac arrest rhythms require shock","Continue CPR without rhythm check, since this wastes time","Administer adrenaline first, since this is the priority"],
 ans:0, rat:{c:"Rhythm identification determines whether defibrillation or CPR with adrenaline is indicated. Blanket defibrillation, skipping rhythm check, and adrenaline first all breach the algorithm.", s:"Rhythm identification guides resuscitation; the nurse must distinguish shockable from non-shockable."}},
{id:"MOC-255", t:"single", cn:"MOC", sys:"CV", topic:"VF and VT management", d:3, b:0.55, cj:"act", tags:["management","VF","VT","defibrillation","cardiac arrest","shock"],
 stem:"A client is in ventricular fibrillation. Which action by the nurse is the priority?",
 opts:["Defibrillate immediately, since VF is a shockable rhythm requiring prompt shock","Continue CPR for two minutes before defibrillating, since this improves outcome","Administer amiodarone first, since this treats the arrhythmia","Check for a pulse, since this confirms the rhythm"],
 ans:0, rat:{c:"VF requires immediate defibrillation as a shockable rhythm. Delaying for CPR, amiodarone first, and pulse check all delay life-saving shock.", s:"VF is time-critical; the nurse must defibrillate immediately."}},
{id:"MOC-256", t:"single", cn:"MOC", sys:"CV", topic:"Post-resuscitation care", d:3, b:0.55, cj:"act", tags:["management","post-resuscitation","ROSC","care","monitoring"],
 stem:"A client achieves return of spontaneous circulation after cardiac arrest. Which action by the nurse is most appropriate?",
 opts:["Continue monitoring and support, since post-arrest care includes haemodynamic optimisation and identifying reversible causes","Stop monitoring, since ROSC indicates recovery","Transfer to the ward, since the emergency is over","Discharge planning, since the client is stable"],
 ans:0, rat:{c:"Post-arrest care requires continued monitoring, haemodynamic support, and reversible cause identification. Stopping monitoring, ward transfer, and discharge all risk deterioration.", s:"ROSC is not recovery; the nurse must continue post-arrest care."}},
{id:"MOC-257", t:"single", cn:"MOC", sys:"NEURO", topic:"Brainstem death and somatic support", d:3, b:0.55, cj:"act", tags:["management","brainstem death","somatic support","organ donation","care"],
 stem:"A client is confirmed brainstem dead and is being maintained for organ donation. Which action by the nurse is most appropriate?",
 opts:["Continue somatic support to maintain organ viability, since brainstem death is legal death","Continue full intensive care, since the brainstem may recover and organ function improve","Withdraw all support, since the client is dead","Involve the family in decision-making about ongoing care"],
 ans:0, rat:{c:"Brainstem death is legal death, and somatic support maintains organ viability for donation. Full intensive care, withdrawal, and family decision all misunderstand the legal and clinical situation.", s:"Brainstem death requires somatic support for organ viability; the nurse must understand the distinction."}},
{id:"MOC-258", t:"single", cn:"MOC", sys:"INTG", topic:"Hot debrief", d:2, b:0.45, cj:"act", tags:["management","hot debrief","team","learning","improvement"],
 stem:"Immediately after a resuscitation attempt, the team gathers briefly. Which interpretation by the nurse is most accurate?",
 opts:["This is a hot debrief to identify immediate learning and support the team, which should be brief and focused","This is a waste of time and delays other work","This should wait until the cold debrief, since immediate discussion is not useful","This is only for the team leader to reflect"],
 ans:0, rat:{c:"Hot debriefs identify immediate learning and support the team, and should be brief. Dismissing, delaying, and limiting to leader all miss the value.", s:"Hot debriefs support immediate learning; the nurse must participate constructively."}},
{id:"MOC-259", t:"single", cn:"MOC", sys:"INTG", topic:"Team dynamics and non-technical skills", d:3, b:0.55, cj:"act", tags:["management","team dynamics","non-technical skills","communication","resuscitation"],
 stem:"During a resuscitation, the team leader assigns roles clearly. Which interpretation by the nurse is most accurate?",
 opts:["Clear role allocation is a non-technical skill that improves team performance and reduces error","Role allocation is unnecessary, since everyone knows their job","The team leader should do everything, since this ensures quality","Non-technical skills are not relevant to clinical outcomes"],
 ans:0, rat:{c:"Clear role allocation is a non-technical skill improving performance and reducing error. Dismissing, centralising, and denying relevance all miss the importance.", s:"Non-technical skills are critical in resuscitation; the nurse must understand their role."}},
{id:"MOC-260", t:"single", cn:"MOC", sys:"INTG", topic:"Situation awareness", d:3, b:0.55, cj:"act", tags:["management","situation awareness","team","monitoring","safety"],
 stem:"During a resuscitation, a team member notices the client's colour changing. Which action by the nurse is most appropriate?",
 opts:["Voice the concern, since situation awareness requires sharing observations with the team","Wait until asked, since interrupting may distract the team","Assume someone else has noticed, since the team is experienced","Document the observation for later discussion"],
 ans:0, rat:{c:"Situation awareness requires voicing concerns to the team. Waiting, assuming, and documenting all risk missing important changes.", s:"Situation awareness requires communication; the nurse must speak up."}},

/* ---------------------------------------------------------- PHA 6 */
{id:"PHA-235", t:"single", cn:"PHA", sys:"CV", topic:"Magnesium sulphate in torsades de pointes", d:3, b:0.55, cj:"act", tags:["pharmacology","magnesium","torsades","arrhythmia","treatment"],
 stem:"A client is in torsades de pointes. Which action by the nurse is most appropriate?",
 opts:["Administer magnesium sulphate as prescribed, since this is the treatment for torsades","Administer amiodarone, since this treats all arrhythmias","Defibrillate, since this is a shockable rhythm","Withhold treatment, since torsades is self-terminating"],
 ans:0, rat:{c:"Magnesium sulphate is the treatment for torsades de pointes. Amiodarone, defibrillation, and withholding all miss the specific treatment.", s:"Torsades requires magnesium; the nurse must know the specific treatment."}},
{id:"PHA-236", t:"single", cn:"PHA", sys:"CV", topic:"Amiodarone in cardiac arrest", d:3, b:0.55, cj:"act", tags:["pharmacology","amiodarone","cardiac arrest","VF","VT","treatment"],
 stem:"A client is in refractory VF after three shocks. Which action by the nurse is most appropriate?",
 opts:["Administer amiodarone as prescribed, since this is indicated for refractory VF/VT","Administer adrenaline only, since amiodarone is not used for refractory arrest","Continue shocks without medication, since this is sufficient","Withhold amiodarone, since it is contraindicated in arrest"],
 ans:0, rat:{c:"Amiodarone is indicated for refractory VF/VT after three shocks. Adrenaline only, shocks without medication, and withholding all miss the indication.", s:"Refractory VF requires amiodarone; the nurse must know the timing and indication."}},
{id:"PHA-237", t:"single", cn:"PHA", sys:"CV", topic:"Adrenaline timing", d:3, b:0.55, cj:"act", tags:["pharmacology","adrenaline","cardiac arrest","timing","administration"],
 stem:"A client is in cardiac arrest with a non-shockable rhythm. Which action by the nurse is most appropriate?",
 opts:["Administer adrenaline as soon as vascular access is available, since early administration improves outcome","Wait until after three cycles of CPR, since this is the standard","Administer only if the client has a pulse, since this is safer","Withhold adrenaline, since it is not effective in arrest"],
 ans:0, rat:{c:"Adrenaline should be given as soon as access is available in non-shockable rhythms. Waiting, pulse requirement, and withholding all delay treatment.", s:"Adrenaline timing is critical; the nurse must administer early in non-shockable arrest."}},
{id:"PHA-238", t:"single", cn:"PHA", sys:"CV", topic:"Atropine in bradycardia", d:2, b:0.45, cj:"act", tags:["pharmacology","atropine","bradycardia","treatment","heart rate"],
 stem:"A client has symptomatic bradycardia unresponsive to initial measures. Which action by the nurse is most appropriate?",
 opts:["Administer atropine as prescribed, since this is first-line for symptomatic bradycardia","Administer adrenaline, since this increases heart rate","Insert a pacemaker immediately, since atropine is not effective","Withhold treatment, since symptomatic bradycardia is not dangerous"],
 ans:0, rat:{c:"Atropine is first-line for symptomatic bradycardia. Adrenaline, immediate pacing, and withholding all miss the first-line treatment.", s:"Symptomatic bradycardia requires atropine; the nurse must know the first-line treatment."}},
{id:"PHA-239", t:"single", cn:"PHA", sys:"CV", topic:"Sodium bicarbonate indications", d:3, b:0.55, cj:"act", tags:["pharmacology","sodium bicarbonate","cardiac arrest","hyperkalaemia","acidosis"],
 stem:"A client is in cardiac arrest with known hyperkalaemia. Which action by the nurse is most appropriate?",
 opts:["Administer sodium bicarbonate as prescribed, since this is indicated for hyperkalaemia and acidosis","Administer routinely, since this improves outcome in all arrests","Withhold bicarbonate, since it is never indicated for hyperkalaemia in arrest","Administer only after ROSC, since this is safer"],
 ans:0, rat:{c:"Sodium bicarbonate is indicated for hyperkalaemia and acidosis in arrest. Routine use, withholding, and post-ROSC only all miss the indication.", s:"Bicarbonate has specific indications; the nurse must know when to use it."}},
{id:"PHA-240", t:"single", cn:"PHA", sys:"CV", topic:"Calcium in hyperkalaemia", d:3, b:0.55, cj:"act", tags:["pharmacology","calcium","hyperkalaemia","cardiac protection","treatment"],
 stem:"A client has severe hyperkalaemia with ECG changes. Which action by the nurse is most appropriate?",
 opts:["Administer calcium as prescribed, since this stabilises the myocardium and reduces arrhythmia risk","Administer insulin and dextrose only, since this lowers potassium","Withhold calcium, since it worsens hyperkalaemia","Administer calcium only after potassium is normalised"],
 ans:0, rat:{c:"Calcium stabilises the myocardium in hyperkalaemia, reducing arrhythmia risk. Insulin only, withholding, and waiting all miss the cardiac protection.", s:"Hyperkalaemia requires calcium for cardiac protection; the nurse must know the priority."}},

/* ---------------------------------------------------------- RRP 5 */
{id:"RRP-179", t:"single", cn:"RRP", sys:"NEURO", topic:"Neuroprognostication", d:3, b:0.55, cj:"act", tags:["risk","neuroprognostication","post-arrest","outcome","assessment"],
 stem:"A client is comatose after cardiac arrest. Which action by the nurse is most appropriate?",
 opts:["Avoid premature prognostication, since accurate assessment requires time and multiple modalities","Predict poor outcome immediately, since this guides family discussions","Predict good outcome, since this provides hope","Withhold assessment, since prognosis is not useful"],
 ans:0, rat:{c:"Neuroprognostication requires time and multiple modalities; premature prediction is unreliable. Immediate poor or good prediction, and withholding, all risk inaccurate information.", s:"Neuroprognostication is complex; the nurse must avoid premature conclusions."}},
{id:"RRP-180", t:"single", cn:"RRP", sys:"NEURO", topic:"Targeted temperature management", d:3, b:0.55, cj:"act", tags:["risk","targeted temperature","post-arrest","neuroprotection","monitoring"],
 stem:"A client is started on targeted temperature management after cardiac arrest. Which action by the nurse is most appropriate?",
 opts:["Monitor temperature closely and maintain target range, since this provides neuroprotection","Allow temperature to fluctuate, since this is not critical","Warm the client rapidly, since hypothermia is dangerous","Withhold temperature management, since evidence is unclear"],
 ans:0, rat:{c:"Targeted temperature management requires close monitoring and target maintenance for neuroprotection. Fluctuation, rapid warming, and withholding all miss the benefit.", s:"Temperature management requires precision; the nurse must monitor and maintain target."}},
{id:"RRP-181", t:"single", cn:"RRP", sys:"INTG", topic:"Organ donation and family support", d:3, b:0.55, cj:"act", tags:["risk","organ donation","family","support","communication"],
 stem:"A brainstem dead client is a potential organ donor. Which action by the nurse is most appropriate?",
 opts:["Support the family sensitively and involve the specialist nurse for organ donation, since this requires careful communication","Discuss organ donation immediately, since this is time-critical","Avoid the topic, since the family is distressed","Leave all discussions to the medical team, since this is not nursing work"],
 ans:0, rat:{c:"Organ donation discussions require sensitive family support and specialist nurse involvement. Immediate discussion, avoidance, and delegation all miss the need for skilled communication.", s:"Organ donation requires skilled communication; the nurse must support the family appropriately."}},
{id:"RRP-182", t:"single", cn:"RRP", sys:"CV", topic:"Resuscitation decision-making", d:3, b:0.55, cj:"act", tags:["risk","resuscitation","decision making","DNACPR","communication"],
 stem:"A client with advanced disease asks about resuscitation. Which action by the nurse is most appropriate?",
 opts:["Discuss DNACPR sensitively, explaining that it applies only to CPR and not other treatments","Avoid the discussion, since this may cause distress","Explain that DNACPR means no active treatment","Advise that the decision cannot be discussed"],
 ans:0, rat:{c:"DNACPR discussions should be sensitive and clear about what it does and does not mean. Avoidance, misrepresentation, and refusal all breach communication obligations.", s:"DNACPR must be communicated clearly; the nurse must explain appropriately."}},
{id:"RRP-183", t:"single", cn:"RRP", sys:"INTG", topic:"Annual update and competency", d:2, b:0.45, cj:"act", tags:["risk","annual update","competency","resuscitation","training"],
 stem:"A nurse is due for resuscitation annual update. Which interpretation by the nurse is most accurate?",
 opts:["Annual update maintains competency and is required, since resuscitation guidelines change and skills decay","Annual resuscitation update is optional, since experience is sufficient","Competency is maintained by working, since training is not needed","Guidelines do not change, so updates are unnecessary"],
 ans:0, rat:{c:"Annual update maintains competency as guidelines change and skills decay. Dismissing, experience-only, and denying change all risk outdated practice.", s:"Resuscitation competency requires regular update; the nurse must attend training."}},

/* ---------------------------------------------------------- PSY 2 */
{id:"PSY-127", t:"single", cn:"PSY", sys:"PSYCH", topic:"Bereavement support", d:3, b:0.55, cj:"act", tags:["psychosocial","bereavement","support","loss","family"],
 stem:"A family is informed that their relative has died. Which action by the nurse is most appropriate?",
 opts:["Provide privacy, time, and support, allowing the family to express grief in their own way","Rush the family, since the bed is needed","Leave immediately, since the family needs privacy","Avoid emotional expressions, since this is unprofessional"],
 ans:0, rat:{c:"Bereavement support requires privacy, time, and allowing grief expression. Rushing, immediate leaving, and avoiding emotion all fail to support the family.", s:"Bereavement support is essential; the nurse must provide appropriate care."}},
{id:"PSY-128", t:"single", cn:"PSY", sys:"PSYCH", topic:"Family communication after cardiac arrest", d:3, b:0.55, cj:"act", tags:["psychosocial","family","communication","cardiac arrest","support"],
 stem:"A family asks about their relative's condition after cardiac arrest. Which action by the nurse is most appropriate?",
 opts:["Provide honest, clear information at an appropriate level, allowing time for questions","Avoid difficult information, since this may cause distress","Give false hope, since this is the appropriate approach","Delegate all communication, since this is the doctor's role"],
 ans:0, rat:{c:"Family communication requires honesty, clarity, and time for questions. Avoidance, false hope, and delegation all fail to support the family.", s:"Honest communication supports families; the nurse must provide appropriate information."}}

]);
