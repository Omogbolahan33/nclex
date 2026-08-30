/* Wave 26 — 20 hand-authored hard RN items.
 * Management of Care at 17.1% against an 18% target is now the single largest
 * gap to its blueprint share, so wave 26 leads with five. Physiological
 * Adaptation at 13.6% against 14% and Safety at 12.9% against 13% take eight
 * between them. Health Promotion at 65% hard and Basic Care at 67% hard
 * remain the softest on difficulty and take three.
 * Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Management of Care  : MOC-145 – MOC-149
 * Physiological Adapt : PAA-113 – PAA-117
 * Psychosocial        : PSY-073 – PSY-076
 * Safety              : SIC-113 – SIC-115
 * Health Promotion    : HPM-089 – HPM-090
 * Basic Care/Comfort  : BCC-083
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (5) ---------------- */

{id:"MOC-145", t:"single", cn:"MOC", sys:"INF", topic:"Copy-forward documentation", d:3, b:0.55, cj:"evaluate", tags:["documentation","copy-forward","record integrity"],
 stem:"A nurse opens a progress note and finds that yesterday's assessment has been copied forward unchanged, including a finding the client no longer has. What is the correct action?",
 opts:["Document the current assessment accurately and note that the prior entry does not reflect today's findings, rather than leaving the copied text standing as the record of this encounter",
  "Leave the copied assessment as it is, since amending another clinician's note is not permitted",
  "Delete the copied entry entirely, since incorrect information has no place in the record",
  "Leave it unchanged but tell the colleague verbally, since the record itself does not need correcting"],
 ans:0,
 rat:{c:"A copied entry that contradicts the client's current state makes the record inaccurate for everyone who reads it. The nurse documents what is true now and makes the discrepancy visible, which is how a propagated error is stopped. Others' entries are not edited, but the current entry must be correct.",
  s:"Leaving known-false text standing perpetuates the error for every subsequent reader. Deleting another clinician's entry destroys the audit trail, and a verbal correction leaves the record itself uncorrected."} },

{id:"MOC-146", t:"single", cn:"MOC", sys:"INF", topic:"Root cause analysis and the five whys", d:3, b:0.55, cj:"analyze", tags:["root cause analysis","five whys","systems thinking"],
 stem:"During a root cause analysis of a medication error, the team identifies that the nurse who gave it was interrupted three times. A member proposes mandatory disciplinary action. What does a systems approach recognize?",
 opts:["The interruptions are a contributing factor to be understood and designed out, since repeated questioning of the same sequence reveals system conditions rather than individual carelessness",
  "Discipline is the appropriate first step, since individual accountability produces the fastest improvement",
  "The analysis is complete once a person is identified, since systems cannot be changed",
  "Interruptions are irrelevant, since competent practitioners are unaffected by their environment"],
 ans:0,
 rat:{c:"A systems approach treats the person as one element in a chain of conditions. Repeatedly asking why surfaces the workload, layout, alarm burden, and staffing patterns that made the error possible, which are the things that can actually be changed to protect the next client.",
  s:"Discipline first suppresses reporting and leaves the conditions in place, which is why it is not the opening move. Identifying a person is not the end of the analysis, and the claim that environment does not affect performance is contradicted by the evidence on interruption and error."} },

{id:"MOC-147", t:"single", cn:"MOC", sys:"INF", topic:"Immediate response to a sentinel event", d:3, b:0.55, cj:"prioritize", tags:["sentinel event","immediate response","reporting"],
 stem:"A client receives an incompatible blood transfusion and deteriorates. What is the nurse's priority sequence?",
 opts:["Stop the transfusion, keep the line open with normal saline, stabilize the client, preserve the bag and tubing, then notify the prescriber and blood bank and complete the incident report",
  "Complete the incident report first, since documentation is the highest priority after any error",
  "Slow the blood transfusion and observe, since most reactions are mild and self-limiting",
  "Discard the bag and tubing immediately, since they are contaminated biohazard waste"],
 ans:0,
 rat:{c:"Client stabilization comes first: stop the exposure, maintain access, and treat the reaction. Preserving the bag, tubing, and labels is essential because the blood bank must investigate the cause. Notification and the incident report follow, once the client is safe.",
  s:"Documentation does not take precedence over a deteriorating client. Slowing rather than stopping continues the exposure, and discarding the evidence destroys the investigation into what went wrong."} },

{id:"MOC-148", t:"single", cn:"MOC", sys:"PSYCH", topic:"Health care proxy versus living will", d:3, b:0.55, cj:"analyze", tags:["health care proxy","living will","advance directive"],
 stem:"A client loses decision-making capacity. The record contains both a living will and an appointed health care proxy, and the two appear to point in different directions. What does the nurse understand?",
 opts:["The appointed proxy makes decisions, interpreting the client's known values in the current situation, while the living will informs but does not override that person's judgement about circumstances it does not address",
  "The living will controls, since a written directive always takes precedence over a person",
  "The appointed proxy's authority is limited to what the living will explicitly authorizes",
  "Neither applies until a court appoints a guardian, since capacity loss invalidates both documents"],
 ans:0,
 rat:{c:"A proxy is appointed precisely to decide about situations a written directive cannot anticipate, applying the client's values to circumstances that were not foreseen. The living will is important evidence of those values but cannot cover every clinical situation.",
  s:"A document written in advance cannot address every eventuality, which is why a person is appointed alongside it. A proxy's authority is not confined to the document's specific wording, and both instruments remain valid on capacity loss rather than being invalidated by it."} },

{id:"MOC-149", t:"single", cn:"MOC", sys:"MSK", topic:"Ergonomics and nurse injury prevention", d:2, b:0.45, cj:"generate", tags:["ergonomics","safe handling","occupational health"],
 stem:"A nurse reports increasing lower back pain after weeks of manual lifting on a high-acuity unit. What is the most effective response?",
 opts:["Assess the handling practices on the unit and implement mechanical lifting equipment and a safe handling programme, since musculoskeletal injury is driven by task and environment rather than individual technique alone",
  "Advise the nurse to strengthen core muscles, since fitness is the main protective factor",
  "Suggest the nurse request lighter assignments, since back pain is an individual problem",
  "Recommend a back belt, since lumbar support prevents injury during lifting"],
 ans:0,
 rat:{c:"Nurse musculoskeletal injury tracks with manual handling exposure, so the effective intervention changes the task and the environment through equipment, staffing, and training. Individual fitness helps but cannot offset repeated heavy manual lifting.",
  s:"Fitness advice places the burden on the person rather than the hazard. Lighter assignments do not remove the hazard from the unit, and back belts have not been shown to prevent lifting injury."} },

/* ---------------- Physiological Adaptation (5) ---------------- */

{id:"PAA-113", t:"single", cn:"PAA", sys:"HEME", topic:"Rho(D) immune globulin timing", d:3, b:0.55, cj:"act", tags:["RhoGAM","Rh isoimmunization","prevention"],
 stem:"A client who is Rh-negative and unsensitized is at 28 weeks gestation. What does the nurse anticipate?",
 opts:["Administration of Rho(D) immune globulin now, again within 72 hours of delivery if the newborn is Rh-positive, and after any event that may cause fetomaternal bleeding",
  "Administration only after delivery, since antenatal dosing has no protective effect",
  "No prophylaxis, since the client is already unsensitized and therefore cannot become sensitized",
  "Administration only if the client reports abdominal trauma, since routine pregnancy carries no mixing risk"],
 ans:0,
 rat:{c:"Prophylaxis at 28 weeks covers the third-trimester period when silent fetomaternal bleeding is common, with a further dose within 72 hours of delivery if the baby is Rh-positive, and additional doses after sensitizing events such as trauma, procedures, or bleeding.",
  s:"Antenatal dosing is effective and is standard practice. Being unsensitized is exactly why prophylaxis is given, since the goal is to prevent sensitization, and routine pregnancy carries mixing risk without any recognized event."} },

{id:"PAA-114", t:"single", cn:"PAA", sys:"HEME", topic:"Anemia in pregnancy", d:3, b:0.55, cj:"evaluate", tags:["anemia","pregnancy","iron deficiency"],
 stem:"A client at 30 weeks has a hemoglobin of 10.1 g/dL and a low ferritin. She feels well and asks whether this is normal. What is the nurse's response?",
 opts:["Some hemodilution is expected in pregnancy, but a low ferritin indicates iron deficiency that warrants treatment, because untreated anemia increases the risk of preterm birth and low birth weight",
  "This is entirely normal physiological anemia and requires no treatment at any level",
  "The low ferritin is an incidental laboratory finding with no clinical significance in pregnancy",
  "Start erythropoietin, since oral iron is ineffective in pregnancy"],
 ans:0,
 rat:{c:"Plasma volume expands more than red cell mass in pregnancy, so mild hemodilution is expected, but a low ferritin identifies true iron deficiency. Treating it matters because iron deficiency anemia is associated with preterm birth, low birth weight, and reduced maternal reserve for blood loss at delivery.",
  s:"Physiological dilution does not account for a low ferritin, which reflects depleted stores. Dismissing it as incidental ignores a treatable cause with obstetric consequences, and oral iron is first-line and effective in pregnancy."} },

{id:"PAA-115", t:"single", cn:"PAA", sys:"ENDO", topic:"Hypothyroidism in pregnancy", d:3, b:0.55, cj:"act", tags:["hypothyroidism","levothyroxine","pregnancy"],
 stem:"A client with pre-existing hypothyroidism on levothyroxine confirms a positive pregnancy test. What is the nurse's priority action?",
 opts:["Advise her to contact the prescriber promptly for thyroid function testing and likely dose adjustment, since requirements increase early in pregnancy and untreated hypothyroidism affects fetal neurodevelopment",
  "Reassure her that the current dose remains correct, since pregnancy does not alter thyroid requirements in hypothyroidism",
  "Advise stopping the medication, since thyroid hormone crosses the placenta and may harm the fetus",
  "Suggest doubling the dose immediately without testing, since the direction of change is predictable"],
 ans:0,
 rat:{c:"Thyroid hormone requirements rise early in pregnancy, often before the first antenatal visit, so prompt testing and adjustment are needed. Untreated or under-treated hypothyroidism is associated with adverse neurodevelopmental and obstetric outcomes, and continuing treatment is essential.",
  s:"Requirements do change, which is why testing is urgent rather than reassuring. Stopping treatment is harmful, since the fetus depends on maternal thyroid hormone early on, and dose changes must be guided by measured levels rather than assumption."} },

{id:"PAA-116", t:"single", cn:"PAA", sys:"REPI", topic:"Ultrasound dating and its clinical importance", d:3, b:0.55, cj:"analyze", tags:["ultrasound dating","crown-rump length","gestational age"],
 stem:"A client with uncertain last menstrual period dates has a first-trimester ultrasound measuring crown-rump length. Why does accurate dating matter clinically?",
 opts:["Because gestational age determines the timing of screening tests, the interpretation of growth, and decisions about intervention for preterm or post-term pregnancy, so an error propagates through all later care",
  "Because it confirms fetal sex, which is the main clinical use of early measurement",
  "Because it is required before any medication can be given in pregnancy",
  "Because it establishes the due date for administrative scheduling only, with no clinical consequence"],
 ans:0,
 rat:{c:"Gestational age is the reference point for the whole pregnancy: screening windows, growth percentiles, and the thresholds for intervening in preterm labour or post-term pregnancy all depend on it. Crown-rump length in the first trimester is the most accurate measure available, and an early dating error is carried through every subsequent assessment.",
  s:"Fetal sex determination is not the purpose of dating measurement. Dating is not a prerequisite for all medication, and it is not administrative, since clinical decisions are made against it throughout pregnancy."} },

{id:"PAA-117", t:"single", cn:"PAA", sys:"HEME", topic:"Exchange transfusion in neonatal hyperbilirubinemia", d:3, b:0.55, cj:"recognize", tags:["exchange transfusion","hyperbilirubinemia","kernicterus"],
 stem:"A term newborn's bilirubin continues to rise despite intensive phototherapy and reaches the exchange transfusion threshold. What does the nurse recognize?",
 opts:["This is an emergency undertaken to prevent kernicterus, requiring prepared access, monitoring of vital signs and electrolytes, and vigilance for complications during and after the procedure",
  "Exchange transfusion is an outdated procedure, so phototherapy should simply continue until the level falls",
  "The procedure can wait until the next shift, since bilirubin rises slowly and predictably",
  "The main risk is cosmetic, since the procedure changes the newborn's skin tone temporarily"],
 ans:0,
 rat:{c:"Exchange transfusion is reserved for bilirubin levels at which the risk of bilirubin-induced neurologic dysfunction is significant, and it is a true emergency. It requires vascular access, continuous monitoring, and preparedness for complications including electrolyte disturbance, arrhythmia, and thrombocytopenia.",
  s:"It remains the definitive intervention when phototherapy fails and is not outdated. Delay risks irreversible neurological injury, and the risks are physiological and potentially serious rather than cosmetic."} },

/* ---------------- Psychosocial Integrity (4) ---------------- */

{id:"PSY-073", t:"single", cn:"PSY", sys:"PSYCH", topic:"Dialectical behaviour therapy skills", d:3, b:0.55, cj:"generate", tags:["dialectical behaviour therapy","distress tolerance","self-harm"],
 stem:"A client who self-harms when overwhelmed is learning dialectical behaviour therapy skills. What is the nurse's role in supporting this treatment?",
 opts:["Help the client identify and practise distress tolerance and emotion regulation skills before crisis points, and use chain analysis to understand what led to each episode rather than responding only to the behaviour",
  "Focus exclusively on preventing the behaviour through observation, since understanding the trigger is not part of this model",
  "Advise the client to stop self-harming, since the skills are secondary to the decision to stop",
  "Wait until the client is in crisis before teaching, since skills are only learnable under pressure"],
 ans:0,
 rat:{c:"The model teaches skills in advance so the client has alternatives available at the moment of overwhelming affect, and chain analysis examines the sequence of events, thoughts, and sensations that led to the behaviour. Observation has a place, but the treatment is skill acquisition and understanding.",
  s:"Observation without skill building addresses the behaviour but not what produces it. Telling a client to stop without alternatives is not this model and rarely works, and skills taught only in crisis cannot be learned when the client is dysregulated."} },

{id:"PSY-074", t:"single", cn:"PSY", sys:"PSYCH", topic:"Milieu therapy", d:3, b:0.55, cj:"analyze", tags:["milieu therapy","therapeutic environment","structure"],
 stem:"On an inpatient psychiatric unit, what is the therapeutic purpose of a consistent daily structure with community meetings and clear expectations?",
 opts:["The environment itself is the intervention, since predictable structure, social expectation, and shared responsibility let clients practise skills and receive feedback in real time rather than only in individual sessions",
  "Structure exists mainly to make the unit easier for staff to manage and reduce workload",
  "The schedule occupies clients so they do not become bored or disruptive",
  "Community meetings serve as a forum for staff to announce rules rather than for client participation"],
 ans:0,
 rat:{c:"In milieu therapy the social environment is deliberately organized as the treatment. Predictability reduces anxiety, expectations give clients something to work toward, and interactions with peers provide immediate feedback that individual therapy cannot replicate.",
  s:"Describing structure as a staffing convenience or an occupation misses the treatment rationale. Community meetings in a therapeutic milieu are for client participation and feedback, not merely for delivering announcements."} },

{id:"PSY-075", t:"single", cn:"PSY", sys:"PSYCH", topic:"Expressed emotion and family psychoeducation", d:3, b:0.55, cj:"act", tags:["expressed emotion","family psychoeducation","relapse prevention"],
 stem:"A client with schizophrenia is being discharged to a family that is highly critical of the symptoms and heavily involved in the client's decisions. What intervention reduces relapse risk?",
 opts:["Family psychoeducation that lowers criticism and overinvolvement, since high expressed emotion is associated with increased relapse and hospital readmission",
  "Separate the client from the family, since family contact itself causes relapse",
  "Encourage the family to increase involvement, since more oversight improves adherence",
  "Focus only on medication adherence, since family dynamics do not affect relapse rates"],
 ans:0,
 rat:{c:"High expressed emotion, measured as criticism, hostility, and emotional overinvolvement, is one of the best-established predictors of relapse in schizophrenia. Family psychoeducation teaches communication and problem-solving that reduces these patterns and demonstrably lowers readmission.",
  s:"Family contact is not itself harmful; the pattern of interaction is, and separation removes support the client needs. Increasing overinvolvement worsens the risk factor rather than helping, and medication alone does not address a well-documented social predictor of relapse."} },

{id:"PSY-076", t:"single", cn:"PSY", sys:"PSYCH", topic:"Matching intervention to stage of change", d:3, b:0.55, cj:"generate", tags:["stages of change","readiness","health behaviour"],
 stem:"A client says they know their drinking is a problem but are not ready to change and are not considering it in the next six months. What approach fits this stage?",
 opts:["Raise awareness of the discrepancy between the client's values and their drinking without pressing for a commitment, since pushing action before readiness increases resistance and disengagement",
  "Set a firm date to stop drinking immediately, since delay only entrenches the behaviour",
  "Withhold further discussion until the client asks for help, since raising it is counterproductive",
  "Refer directly to inpatient treatment, since that stage requires the most intensive intervention"],
 ans:0,
 rat:{c:"In precontemplation the useful work is raising awareness and exploring ambivalence, not demanding change. Pressing for action before the client is ready tends to increase resistance and damage the relationship, which reduces the chance of future engagement.",
  s:"A quit date belongs to a later stage and will be refused here. Withdrawing entirely abandons the client at the point where awareness could develop, and inpatient referral is disproportionate and unwelcome at this stage."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-113", t:"single", cn:"SIC", sys:"REPI", topic:"Powered air-purifying respirator use", d:3, b:0.55, cj:"act", tags:["PAPR","respiratory protection","airborne precautions"],
 stem:"A nurse cannot achieve a seal on any fit-tested filtering facepiece respirator because of facial hair. The client requires airborne precautions. What is the appropriate solution?",
 opts:["Use a powered air-purifying respirator with a loose-fitting hood, which does not depend on a face seal and provides respiratory protection for staff who cannot be fit-tested to a tight-fitting respirator",
  "Shave the facial hair, since a nurse who cannot achieve a seal must be fit-tested to a tight-fitting respirator regardless of personal or religious reasons",
  "Enter the room with a surgical mask, since it provides adequate filtration for airborne pathogens",
  "Decline to enter the room and leave the care to another nurse, since no alternative exists"],
 ans:0,
 rat:{c:"A loose-fitting powered air-purifying respirator protects by delivering filtered air under positive pressure and does not require a face seal, which makes it the standard solution for staff who cannot wear a tight-fitting respirator for any reason.",
  s:"Requiring shaving ignores legitimate personal, religious, and medical reasons and is not the only option. A surgical mask does not provide airborne protection, and care can be provided safely with the correct device rather than declined."} },

{id:"SIC-114", t:"single", cn:"SIC", sys:"INF", topic:"Endoscope reprocessing and leak testing", d:3, b:0.55, cj:"act", tags:["endoscope reprocessing","leak test","high-level disinfection"],
 stem:"During reprocessing of a flexible endoscope, the leak test fails. What must the nurse do?",
 opts:["Remove the scope from service immediately and send it for repair, since a leak means the internal channels may be contaminated and the device cannot be safely disinfected",
  "Repeat the leak test, since a single failure is usually a testing artefact",
  "Proceed with high-level disinfection anyway, since the disinfectant will penetrate any breach",
  "Use the scope on the next low-risk client only, since the defect is unlikely to cause harm"],
 ans:0,
 rat:{c:"A failed leak test indicates a breach through which fluid and microorganisms can enter parts of the device that cleaning and disinfection cannot reach. The scope must leave service until repaired, because no reprocessing step can make it safe.",
  s:"A failed test is a finding, not an artefact to be retested away. Disinfectant cannot reach the interior of a breach, so proceeding leaves a contaminated device in use, and using it on any client is unsafe regardless of perceived risk."} },

{id:"SIC-115", t:"single", cn:"SIC", sys:"INF", topic:"Biologic indicators in sterilization", d:3, b:0.55, cj:"evaluate", tags:["biologic indicator","sterilization","validation"],
 stem:"A sterile processing technician notes that a chemical indicator strip on a pack has changed colour after the cycle. What does this confirm?",
 opts:["That the pack was exposed to the sterilization process, not that sterilization was achieved, since only a biologic indicator demonstrates that microbial kill occurred",
  "That the contents are sterile and safe to use, since the indicator colour change proves sterilization",
  "That the load reached the correct temperature and nothing else needs checking",
  "That the pack may be stored indefinitely, since the cycle has been validated"],
 ans:0,
 rat:{c:"A chemical indicator shows exposure to the process conditions at that point in the pack. It cannot confirm that conditions were sufficient to kill resistant spores, which is what a biologic indicator tests directly. Both are used together for different purposes.",
  s:"Colour change is exposure evidence rather than proof of sterility. It does not establish temperature throughout the load on its own, and sterility is event-related rather than time-based, so storage depends on package integrity."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-089", t:"single", cn:"HPM", sys:"RESP", topic:"Low-dose CT lung cancer screening", d:3, b:0.55, cj:"analyze", tags:["lung cancer screening","low-dose CT","shared decision making"],
 stem:"A 62-year-old with a 35 pack-year smoking history who quit four years ago asks about lung cancer screening. What should the nurse include?",
 opts:["Discuss eligibility and the balance of benefits against harms including false positives, radiation, and overdiagnosis, and address smoking cessation, since screening reduces mortality only within defined eligibility criteria and alongside cessation support",
  "Order the scan without discussion, since screening has no meaningful downsides",
  "Advise against screening, since it has never been shown to reduce mortality",
  "Recommend screening only if the client resumes smoking, since risk must remain current"],
 ans:0,
 rat:{c:"Screening in this group reduces lung cancer mortality, which is why eligibility criteria exist, but it also produces false positives leading to invasive follow-up, involves radiation, and can overdiagnose indolent disease. Shared decision making covers both sides, and cessation remains the larger benefit.",
  s:"Screening does have meaningful downsides, which is precisely why discussion is required. It has been shown to reduce mortality in eligible groups, and eligibility depends on cumulative exposure and time since quitting rather than on current smoking alone."} },

{id:"HPM-090", t:"single", cn:"HPM", sys:"INF", topic:"Responding to vaccine hesitancy", d:3, b:0.55, cj:"act", tags:["vaccine hesitancy","communication","immunization"],
 stem:"A parent declines their child's scheduled immunizations, citing concern about the number of vaccines given at once. What is the most effective nursing response?",
 opts:["Acknowledge the concern, give specific accurate information about immune capacity and the evidence on the schedule, and offer to continue the conversation at the next visit rather than closing it",
  "Tell the parent that declining puts other children at risk, since guilt is the most effective motivator",
  "Accept the refusal without further discussion, since responding to the concern again damages the relationship",
  "Recommend spacing the vaccines over several years, since fewer at once is safer"],
 ans:0,
 rat:{c:"Hesitancy responds better to acknowledgment and specific information than to confrontation. Explaining how the immune system handles the schedule and keeping the conversation open preserves the relationship, which is what makes future acceptance possible.",
  s:"Guilt provokes defensiveness and entrenches refusal. Accepting without any response abandons an opportunity to address a specific, answerable concern, and spacing vaccines provides no safety benefit while leaving the child unprotected for longer."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-083", t:"single", cn:"BCC", sys:"INTG", topic:"Safe application of heat therapy", d:3, b:0.55, cj:"act", tags:["heat therapy","moist heat","contraindications"],
 stem:"A client with diabetes and reduced sensation in the feet requests a heating pad for aching calves. What should the nurse do?",
 opts:["Avoid applying heat to the insensate area, since the client cannot detect a burn, and offer an alternative such as massage, positioning, or analgesia as prescribed",
  "Apply the heating pad on the lowest setting, since low heat cannot burn",
  "Apply it for a longer period at a lower temperature, since spreading the heat reduces the risk",
  "Apply it but instruct the client to report discomfort, since that is the usual safeguard"],
 ans:0,
 rat:{c:"Reduced sensation removes the warning that normally protects tissue from thermal injury, so burns can occur at temperatures a person with normal sensation would find merely warm. The safe approach is to avoid heat on insensate skin and use an alternative comfort measure.",
  s:"Low settings still cause burns over time when sensation is absent. Longer application increases rather than reduces thermal dose, and asking the client to report discomfort relies on a sense they do not have."} }
  );
})();
