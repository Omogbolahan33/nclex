"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 49) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 48: MOC (17.9% vs 18),
 * PSY (8.9% vs 9), PHA (15.9% vs 16) and RRP (11.9% vs 12).
 * Every item is difficulty 2 or 3, and the clinical detail is
 * written to be defensible.
 *
 * MOC 7: clinical reasoning, recognising deterioration, NEWS2 and
 * track and trigger, soft signs and nurse worry, failure to rescue,
 * closed loop communication, and the safety huddle.
 * PHA 6: direct oral anticoagulants, perioperative anticoagulation,
 * CHA2DS2-VASc, the stroke thrombolysis window, dual antiplatelet
 * therapy, and aspirin allergy.
 * RRP 5: the stroke thrombectomy window, transient ischaemic attack
 * and ABCD2, stroke prevention, HAS-BLED bleeding risk, and
 * secondary prevention after stroke.
 * PSY 2: psychological safety in the team, and freedom to speak up.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- MOC 7 */
{id:"MOC-234", t:"single", cn:"MOC", sys:"INTG", topic:"Clinical reasoning", d:3, b:0.55, cj:"analyze", tags:["management","clinical reasoning","judgement","assessment","decision making"],
 stem:"A nurse is assessing a postoperative client whose observations are within normal range but who appears anxious and reports feeling different from earlier. Which action by the nurse is most appropriate?",
 opts:["Recognise that clinical reasoning requires integrating all findings, including non-numerical ones, and continue to monitor and reassess","Reassure the client, since normal observations rule out deterioration","Discharge the client, since the observations are normal","Wait for the next scheduled observation set before acting"],
 ans:0, rat:{c:"Clinical reasoning integrates all available information, including subjective and non-numerical findings such as anxiety and a sense of change. Normal observations do not exclude deterioration, and delaying assessment risks missing early warning signs.", s:"Clinical reasoning goes beyond numbers; the nurse must value subjective findings and maintain vigilance."}},
{id:"MOC-235", t:"single", cn:"MOC", sys:"INTG", topic:"Recognising deterioration", d:3, b:0.55, cj:"recognize", tags:["management","deterioration","recognition","early warning","escalation"],
 stem:"A client's respiratory rate has risen from 16 to 24 over four hours, though other observations remain stable. Which interpretation by the nurse is most accurate?",
 opts:["An isolated rise in respiratory rate is often the earliest sign of deterioration and requires prompt escalation","A stable blood pressure means the client is not deteriorating","Respiratory rate alone is not clinically significant","Observations should be repeated in four hours to confirm the trend"],
 ans:0, rat:{c:"Respiratory rate is frequently the earliest and most sensitive indicator of deterioration, and an isolated rise warrants escalation. Stable blood pressure does not exclude deterioration, and delaying assessment risks missing the opportunity for early intervention.", s:"Respiratory rate is a sensitive early warning sign; the nurse must act on an isolated change rather than wait for other parameters to deteriorate."}},
{id:"MOC-236", t:"single", cn:"MOC", sys:"INTG", topic:"NEWS2 and track and trigger", d:3, b:0.55, cj:"act", tags:["management","NEWS2","track and trigger","monitoring","escalation","early warning"],
 stem:"A client has a NEWS2 score of 5 with a score of 3 in one parameter. Which action by the nurse is most appropriate?",
 opts:["Escalate according to the track and trigger threshold, since a score of 3 in one parameter requires urgent review","Continue routine monitoring, since one abnormal parameter does not affect the overall score significantly","Repeat the observations in an hour, since scores can fluctuate","Escalate only if the client reports symptoms"],
 ans:0, rat:{c:"A NEWS2 score of 3 in any single parameter triggers urgent review regardless of the total score, as this indicates significant abnormality in one physiological system. Routine monitoring, delay, and symptom-based escalation all breach the track and trigger protocol.", s:"Track and trigger systems require action on specific thresholds; the nurse must know and follow the escalation criteria."}},
{id:"MOC-237", t:"single", cn:"MOC", sys:"INTG", topic:"Soft signs and nurse worry", d:3, b:0.55, cj:"act", tags:["management","soft signs","nurse worry","intuition","escalation","clinical judgment"],
 stem:"A nurse feels concerned about a client whose observations are normal but who is not responding as expected. Which action by the nurse is most appropriate?",
 opts:["Act on the concern by reassessing and escalating, since nurse worry is a recognised indicator of deterioration","Dismiss the concern, since observations are normal and there is no objective evidence","Wait until observations become abnormal before acting","Document the concern but take no further action"],
 ans:0, rat:{c:"Nurse worry is a recognised and valid indicator of deterioration, often preceding objective changes. Dismissing concern, waiting for abnormal observations, or documenting without action all risk missing early deterioration.", s:"Clinical intuition and soft signs are valuable; the nurse must act on concern rather than wait for objective confirmation."}},
{id:"MOC-238", t:"single", cn:"MOC", sys:"INTG", topic:"Failure to rescue", d:3, b:0.55, cj:"analyze", tags:["management","failure to rescue","deterioration","prevention","safety"],
 stem:"A review identifies that a client deteriorated over several hours without escalation despite abnormal observations being recorded. Which interpretation by the nurse is most accurate?",
 opts:["This represents failure to rescue, where deterioration was recorded but not acted upon, requiring system and practice review","This indicates the observations were incorrect and should be repeated","This is an unavoidable outcome and no review of the recorded observations is required","This reflects only individual nurse error and requires disciplinary action"],
 ans:0, rat:{c:"Failure to rescue describes deterioration that was recognised or recorded but not acted upon in time. It requires both system and practice review. Attributing it solely to individual error or treating it as unavoidable misses the opportunity for learning and prevention.", s:"Failure to rescue is a recognised safety issue; the nurse must understand the importance of acting on recorded deterioration."}},
{id:"MOC-239", t:"single", cn:"MOC", sys:"INTG", topic:"Closed loop communication", d:2, b:0.45, cj:"act", tags:["management","closed loop","communication","safety","team","handover"],
 stem:"During an emergency, a nurse gives a verbal instruction to a colleague. Which action by the nurse is most appropriate?",
 opts:["Use closed loop communication, asking the colleague to repeat the instruction back to confirm understanding","Assume the instruction was understood, since the colleague nodded","Repeat the instruction loudly, since this ensures it was heard","Write the instruction down and hand it over later"],
 ans:0, rat:{c:"Closed loop communication requires the receiver to repeat the instruction back, confirming accurate understanding. Assuming understanding, repetition without confirmation, and delayed written communication all risk miscommunication in time-critical situations.", s:"Closed loop communication prevents errors in emergencies; the nurse must confirm understanding explicitly."}},
{id:"MOC-240", t:"single", cn:"MOC", sys:"INTG", topic:"Safety huddle", d:2, b:0.45, cj:"act", tags:["management","safety huddle","team","briefing","communication","risk"],
 stem:"A ward introduces a daily safety huddle. Which interpretation by the nurse is most accurate?",
 opts:["The huddle is a brief team meeting to identify risks and priorities for the shift and improve shared awareness","The huddle is a disciplinary meeting to address performance issues","The huddle replaces handover and individual patient assessment","The huddle is optional and does not affect patient safety"],
 ans:0, rat:{c:"A safety huddle is a brief team briefing to identify risks, priorities, and shared situational awareness for the shift. It is not disciplinary, does not replace handover or assessment, and is not optional if it is to improve safety.", s:"Safety huddles support team situational awareness; the nurse must understand their purpose and participate actively."}},

/* ---------------------------------------------------------- PHA 6 */
{id:"PHA-215", t:"single", cn:"PHA", sys:"CV", topic:"Direct oral anticoagulants", d:3, b:0.55, cj:"act", tags:["pharmacology","DOAC","anticoagulation","monitoring","adherence"],
 stem:"A client is prescribed apixaban for stroke prevention in atrial fibrillation. Which action by the nurse is most appropriate?",
 opts:["Emphasise adherence, since DOACs have a short half-life and missed doses rapidly reduce protection","Advise that routine INR monitoring is required, since this confirms effectiveness","Advise that missed doses are not significant, since the effect lasts several days","Advise taking the medication only when symptoms occur"],
 ans:0, rat:{c:"DOACs have short half-lives, so missed doses rapidly reduce anticoagulant effect and adherence is critical. Routine INR monitoring is not required for DOACs, missed doses are significant, and symptom-based dosing is inappropriate.", s:"DOAC adherence is essential for stroke prevention; the nurse must emphasise the consequences of missed doses."}},
{id:"PHA-216", t:"single", cn:"PHA", sys:"CV", topic:"Perioperative anticoagulation", d:3, b:0.55, cj:"act", tags:["pharmacology","perioperative","anticoagulation","bridging","surgery"],
 stem:"A client on warfarin requires elective surgery. Which action by the nurse is most appropriate?",
 opts:["Follow the perioperative plan, which may involve stopping warfarin and bridging with heparin depending on thrombotic risk","Continue warfarin throughout, since stopping increases thrombotic risk","Stop warfarin without bridging, since this is always sufficient","Increase the warfarin dose preoperatively to ensure adequate anticoagulation"],
 ans:0, rat:{c:"Perioperative anticoagulation requires an individualised plan balancing thrombotic and bleeding risk, which may involve stopping warfarin and bridging with heparin. Continuing warfarin, omitting bridging where indicated, or increasing the dose all risk harm.", s:"Perioperative anticoagulation is complex and individualised; the nurse must follow the specific plan rather than assume a standard approach."}},
{id:"PHA-217", t:"single", cn:"PHA", sys:"CV", topic:"CHA2DS2-VASc", d:2, b:0.45, cj:"analyze", tags:["pharmacology","CHA2DS2-VASc","atrial fibrillation","stroke risk","assessment"],
 stem:"A client with atrial fibrillation has a CHA2DS2-VASc score of 3. Which interpretation by the nurse is most accurate?",
 opts:["This indicates elevated stroke risk and anticoagulation is usually indicated","This indicates low stroke risk and no anticoagulation is required","This score relates to bleeding risk rather than stroke risk","Anticoagulation is only indicated for scores of 5 or above"],
 ans:0, rat:{c:"A CHA2DS2-VASc score of 3 indicates elevated stroke risk, and anticoagulation is usually recommended. The score assesses stroke risk, not bleeding risk, and anticoagulation is indicated at lower thresholds than 5.", s:"CHA2DS2-VASc guides anticoagulation decisions; the nurse must understand its purpose and thresholds."}},
{id:"PHA-218", t:"single", cn:"PHA", sys:"NEURO", topic:"Stroke thrombolysis window", d:3, b:0.55, cj:"act", tags:["pharmacology","stroke","thrombolysis","time window","alteplase","emergency"],
 stem:"A client presents with acute stroke symptoms that began four hours ago. Which action by the nurse is most appropriate?",
 opts:["Escalate immediately, since thrombolysis may still be considered within the time window and assessment is time-critical","Reassure the family, since the window has passed and treatment is no longer possible","Wait for further symptoms to develop before escalating","Advise that thrombolysis is only effective within one hour"],
 ans:0, rat:{c:"The thrombolysis window is typically up to 4.5 hours, so immediate escalation is required as the client may still be eligible. Assuming the window has passed, delaying, or citing a one-hour limit all risk denying potentially effective treatment.", s:"Stroke is time-critical; the nurse must escalate immediately rather than assume eligibility has been lost."}},
{id:"PHA-219", t:"single", cn:"PHA", sys:"CV", topic:"Dual antiplatelet therapy", d:3, b:0.55, cj:"act", tags:["pharmacology","dual antiplatelet","DAPT","stent","adherence","bleeding"],
 stem:"A client is prescribed dual antiplatelet therapy following coronary stent insertion. Which action by the nurse is most appropriate?",
 opts:["Emphasise the importance of adherence, since premature discontinuation significantly increases stent thrombosis risk","Advise stopping one agent if bruising occurs, since this reduces bleeding risk","Advise that DAPT can be stopped after one week, since the stent will have endothelialised","Advise taking aspirin only when chest pain occurs"],
 ans:0, rat:{c:"Premature discontinuation of dual antiplatelet therapy significantly increases stent thrombosis risk, so adherence is critical. Unilateral cessation, early discontinuation, and symptom-based dosing all risk stent thrombosis.", s:"DAPT adherence prevents stent thrombosis; the nurse must emphasise the consequences of stopping early."}},
{id:"PHA-220", t:"single", cn:"PHA", sys:"CV", topic:"Aspirin allergy", d:2, b:0.45, cj:"act", tags:["pharmacology","aspirin","allergy","antiplatelet","alternatives"],
 stem:"A client requires antiplatelet therapy but reports a true aspirin allergy. Which action by the nurse is most appropriate?",
 opts:["Seek advice on an alternative antiplatelet agent, since aspirin is contraindicated in true allergy","Administer aspirin at a reduced dose, since a mild allergy may be tolerated","Administer aspirin with antihistamine cover, since this prevents reaction","Advise that no antiplatelet therapy is possible"],
 ans:0, rat:{c:"True aspirin allergy contraindicates its use, and an alternative antiplatelet agent is required. Reduced dosing, antihistamine cover, and omitting therapy all risk harm. Alternatives exist and should be considered.", s:"Aspirin allergy requires alternative antiplatelet therapy; the nurse must escalate rather than risk a reaction."}},

/* ---------------------------------------------------------- RRP 5 */
{id:"RRP-164", t:"single", cn:"RRP", sys:"NEURO", topic:"Stroke thrombectomy window", d:3, b:0.55, cj:"act", tags:["risk","stroke","thrombectomy","time window","large vessel","emergency"],
 stem:"A client presents with acute stroke due to large vessel occlusion, and symptoms began eight hours ago. Which action by the nurse is most appropriate?",
 opts:["Escalate immediately, since thrombectomy may be considered beyond the thrombolysis window in selected cases","Advise that treatment is no longer possible, since the window has passed","Wait for the next scheduled imaging before escalating","Advise that thrombectomy is only effective within one hour"],
 ans:0, rat:{c:"Thrombectomy for large vessel occlusion may be considered beyond the thrombolysis window in selected cases, so immediate escalation is required. Assuming treatment is impossible, delaying, or citing a one-hour limit all risk denying effective intervention.", s:"Thrombectomy eligibility extends beyond thrombolysis; the nurse must escalate for assessment rather than assume ineligibility."}},
{id:"RRP-165", t:"single", cn:"RRP", sys:"NEURO", topic:"Transient ischaemic attack and ABCD2", d:3, b:0.55, cj:"act", tags:["risk","TIA","transient ischaemic","ABCD2","stroke risk","urgent assessment"],
 stem:"A client presents with resolved focal neurological symptoms that lasted twenty minutes. Which action by the nurse is most appropriate?",
 opts:["Escalate for urgent assessment, since TIA carries high early stroke risk and requires same-day specialist review","Reassure the client, since symptoms have resolved and no further action is needed","Advise attending the GP within a week, since symptoms have resolved","Wait to see if symptoms recur before escalating"],
 ans:0, rat:{c:"TIA carries high early stroke risk, particularly in the first few days, requiring same-day specialist assessment. Reassurance, delayed GP review, and waiting for recurrence all risk missing the window for prevention.", s:"TIA is a medical emergency requiring urgent assessment; the nurse must not be reassured by symptom resolution."}},
{id:"RRP-166", t:"single", cn:"RRP", sys:"NEURO", topic:"Stroke prevention", d:2, b:0.45, cj:"act", tags:["risk","stroke","prevention","risk factors","education"],
 stem:"A client asks how to reduce stroke risk. Which action by the nurse is most appropriate?",
 opts:["Advise managing modifiable risk factors including blood pressure, diabetes, smoking, and atrial fibrillation","Advise that stroke risk cannot be modified and is determined by genetics","Advise that only medication matters and lifestyle changes are irrelevant","Advise that stroke only affects older people and the client is not at risk"],
 ans:0, rat:{c:"Many stroke risk factors are modifiable, including hypertension, diabetes, smoking, and atrial fibrillation. Stroke risk is not fixed by genetics, lifestyle changes are important, and stroke can affect younger people.", s:"Stroke prevention relies on managing modifiable risk factors; the nurse must give accurate and comprehensive advice."}},
{id:"RRP-167", t:"single", cn:"RRP", sys:"CV", topic:"HAS-BLED bleeding risk", d:3, b:0.55, cj:"analyze", tags:["risk","HAS-BLED","bleeding","anticoagulation","assessment"],
 stem:"A client being considered for anticoagulation has a HAS-BLED score of 4. Which interpretation by the nurse is most accurate?",
 opts:["This indicates high bleeding risk, requiring careful assessment and modification of reversible risk factors before deciding","This indicates high stroke risk and anticoagulation must be started immediately","This score means anticoagulation is absolutely contraindicated","This score relates to liver function only and does not affect anticoagulation"],
 ans:0, rat:{c:"A high HAS-BLED score indicates elevated bleeding risk, requiring assessment and modification of reversible factors, but is not an absolute contraindication. It does not measure stroke risk, and it encompasses multiple factors beyond liver function.", s:"HAS-BLED guides bleeding risk assessment; the nurse must understand that high scores prompt review rather than automatic exclusion."}},
{id:"RRP-168", t:"single", cn:"RRP", sys:"NEURO", topic:"Secondary prevention after stroke", d:2, b:0.45, cj:"act", tags:["risk","secondary prevention","stroke","medication","lifestyle","adherence"],
 stem:"A client is discharged following an ischaemic stroke with antiplatelet and statin therapy. Which action by the nurse is most appropriate?",
 opts:["Emphasise adherence to secondary prevention medication and lifestyle modification, since this reduces recurrence risk","Advise that medication can be stopped once symptoms resolve","Advise that lifestyle changes are more important than medication","Advise that recurrence risk is low and no further action is needed"],
 ans:0, rat:{c:"Secondary prevention after stroke requires both medication adherence and lifestyle modification to reduce recurrence. Stopping medication on symptom resolution, prioritising lifestyle over medication, and underestimating recurrence risk all increase the chance of another stroke.", s:"Secondary prevention reduces stroke recurrence; the nurse must emphasise both medication and lifestyle adherence."}},

/* ---------------------------------------------------------- PSY 2 */
{id:"PSY-113", t:"single", cn:"PSY", sys:"PSYCH", topic:"Psychological safety in the team", d:3, b:0.55, cj:"analyze", tags:["psychosocial","psychological safety","team","communication","speaking up"],
 stem:"A nurse hesitates to raise a concern because previous attempts were dismissed. Which interpretation by the nurse is most accurate?",
 opts:["This reflects low psychological safety, where team members fear raising concerns, and requires leadership attention","This indicates the nurse lacks confidence and requires assertiveness training","This is normal in healthcare and does not require attention","This reflects the nurse's personality rather than a team issue"],
 ans:0, rat:{c:"Low psychological safety means team members fear raising concerns, which is a team and leadership issue rather than an individual deficit. Attributing it to confidence, normalising it, or blaming personality all miss the systemic problem.", s:"Psychological safety enables speaking up; the nurse must recognise when it is lacking and that this is a team issue."}},
{id:"PSY-114", t:"single", cn:"PSY", sys:"PSYCH", topic:"Freedom to speak up", d:2, b:0.45, cj:"act", tags:["psychosocial","speaking up","concerns","raising","guardians","support"],
 stem:"A nurse has a concern about patient safety but is unsure how to raise it. Which action by the nurse is most appropriate?",
 opts:["Raise the concern through available routes, including the freedom to speak up guardian if local resolution fails","Keep the concern to oneself, since raising it may cause conflict","Wait until the concern is proven, since speculation is unhelpful","Raise the concern anonymously online, since this avoids direct confrontation"],
 ans:0, rat:{c:"Concerns should be raised through available routes, escalating to the freedom to speak up guardian if local resolution fails. Staying silent, waiting for proof, and anonymous online posting all risk harm and bypass proper channels.", s:"Freedom to speak up exists to protect patients; the nurse must know and use the available routes."}}

]);
