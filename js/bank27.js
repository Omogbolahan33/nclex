/* Wave 17 — 20 hand-authored hard RN items.
 * Pharmacology is the largest area still under its blueprint share at
 * 15.7% against 16%, so wave 17 leads with seven pharmacology items drawn
 * from the verified-uncovered drug pool. Management of Care, Reduction of
 * Risk Potential and Safety remain under target and follow.
 * Every item is d>=2; 14 of the 20 are d=3.
 *
 * Every topic in this wave was re-checked with scripts/scan-topics.sh
 * after the earlier collision scans were found to use a broken pattern.
 *
 * Pharmacology        : PHA-112 – PHA-118
 * Management of Care  : MOC-116 – MOC-119
 * Reduction of Risk   : RRP-087 – RRP-089
 * Safety              : SIC-088 – SIC-090
 * Health Promotion    : HPM-065 – HPM-066
 * Basic Care/Comfort  : BCC-065
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (7) ---------------- */

{id:"PHA-112", t:"single", cn:"PHA", sys:"CV", topic:"Washout period before an ARNI", d:3, b:0.55, cj:"prioritize", tags:["sacubitril valsartan","angioedema","heart failure"],
 stem:"A client with heart failure is being switched from lisinopril to sacubitril/valsartan. What is the essential nursing action before the first dose?",
 opts:["Wait 36 hours after the last lisinopril dose before giving sacubitril/valsartan, because overlapping the two raises the risk of angioedema",
  "Give the first dose of sacubitril/valsartan at the same time as the last lisinopril dose to avoid a gap in therapy",
  "Reduce the lisinopril dose by half for one week while sacubitril/valsartan is introduced",
  "Stop lisinopril and give sacubitril/valsartan immediately, since both drugs act on the renin-angiotensin system in the same way"],
 ans:0,
 rat:{c:"Sacubitril inhibits neprilysin, one of the enzymes that breaks down bradykinin, and ACE inhibitors do the same. Overlapping the two can raise bradykinin enough to cause life-threatening angioedema, so a 36-hour washout separates them.",
  s:"Simultaneous or tapered overlap still exposes the client to combined bradykinin effects. The drugs act on different enzymes, and the washout is required regardless of the resulting gap in therapy."} },

{id:"PHA-113", t:"single", cn:"PHA", sys:"RESP", topic:"Pyridoxine with isoniazid", d:2, b:0.45, cj:"generate", tags:["isoniazid","pyridoxine","peripheral neuropathy"],
 stem:"A client begins isoniazid for latent tuberculosis infection. What should the nurse include in teaching?",
 opts:["Take the prescribed pyridoxine supplement, because the drug interferes with vitamin B6 and can cause peripheral neuropathy",
  "Take the drug with a high-fat meal to improve absorption",
  "Stop the drug if the urine turns orange, since that indicates liver damage",
  "Avoid all dairy products, since calcium prevents the drug from working"],
 ans:0,
 rat:{c:"Isoniazid increases pyridoxine excretion and can produce peripheral neuropathy, particularly with diabetes, malnutrition, alcohol use, or pregnancy. Pyridoxine is given prophylactically and the client is taught to report numbness or tingling.",
  s:"Isoniazid is absorbed better on an empty stomach. Orange urine is an expected, harmless effect of rifampin rather than isoniazid, and dairy restriction applies to tetracyclines and fluoroquinolones."} },

{id:"PHA-114", t:"single", cn:"PHA", sys:"NEURO", topic:"Triptan with an SSRI", d:3, b:0.55, cj:"analyze", tags:["triptan","serotonin syndrome","drug interaction"],
 stem:"A client taking fluoxetine for depression asks for a prescription for sumatriptan for migraine. What is the nurse's priority concern?",
 opts:["Serotonin syndrome, because combining a triptan with an SSRI increases serotonergic activity, so the client must be taught the warning signs",
  "Addiction, because triptans are controlled substances with high abuse potential",
  "Rebound hypertension, because triptans are contraindicated with every antidepressant",
  "Sedation, because the combination reliably impairs driving ability"],
 ans:0,
 rat:{c:"Triptans are serotonergic agonists, and combined with an SSRI they raise the risk of serotonin syndrome, which presents with agitation, hyperreflexia, clonus, and hyperthermia. The combination is used with monitoring and explicit teaching rather than banned outright.",
  s:"Triptans are not scheduled controlled substances. The specific hazard is serotonergic excess rather than a class-wide blood pressure contraindication, and sedation is not the principal risk."} },

{id:"PHA-115", t:"single", cn:"PHA", sys:"CV", topic:"Rebound hypertension after stopping clonidine", d:3, b:0.55, cj:"recognize", tags:["clonidine","rebound hypertension","withdrawal"],
 stem:"A client taking clonidine for hypertension has been without the medication for two days. The blood pressure is 196/112 mm Hg with headache and agitation. What does the nurse recognize?",
 opts:["Rebound hypertension from abrupt withdrawal, which requires urgent treatment and restarting or replacing the drug",
  "White coat hypertension, since the client is anxious about the missed doses",
  "A hypertensive emergency unrelated to the medication, since clonidine has no withdrawal effect",
  "Expected loss of control, since two missed days cannot raise the blood pressure this much"],
 ans:0,
 rat:{c:"Clonidine suppresses sympathetic outflow, and abrupt cessation produces a rebound sympathetic surge with severe hypertension, tachycardia, headache, and agitation, typically within 24 to 48 hours. It is treated urgently and the drug is restarted or replaced, then tapered if it is to be stopped.",
  s:"The reading is far beyond what anxiety explains and follows a specific withdrawal mechanism. Clonidine withdrawal is well recognized, and two days is exactly the typical onset window."} },

{id:"PHA-116", t:"single", cn:"PHA", sys:"REPI", topic:"Abnormal bleeding on tamoxifen", d:3, b:0.55, cj:"prioritize", tags:["tamoxifen","endometrial cancer","adverse effect"],
 stem:"A client taking tamoxifen for breast cancer reports unexpected vaginal bleeding. What is the nurse's priority action?",
 opts:["Report it promptly for evaluation, because tamoxifen increases the risk of endometrial hyperplasia and cancer",
  "Reassure the client, since irregular bleeding on tamoxifen is expected and cancer is unlikely at this age",
  "Advise the client to stop the drug immediately, since bleeding indicates toxicity",
  "Suggest a nonsteroidal anti-inflammatory, since the bleeding is probably from thinning of the uterine lining"],
 ans:0,
 rat:{c:"Tamoxifen is anti-estrogenic in breast tissue but estrogenic in the endometrium, which raises the risk of hyperplasia and endometrial cancer. Any abnormal vaginal bleeding requires prompt evaluation, and the drug is not stopped unilaterally.",
  s:"Abnormal bleeding on tamoxifen is not a benign expected effect. Stopping an effective cancer therapy without prescriber input is unsafe, and the drug thickens rather than thins the endometrium."} },

{id:"PHA-117", t:"single", cn:"PHA", sys:"NEURO", topic:"Organophosphate poisoning", d:3, b:0.55, cj:"prioritize", tags:["organophosphate","atropine","pralidoxime","cholinergic crisis"],
 stem:"A farm worker arrives with pinpoint pupils, excessive salivation, wheezing, vomiting, and muscle fasciculations after spraying pesticide. What does the nurse anticipate?",
 opts:["Atropine to dry secretions and a cholinesterase reactivator to restore enzyme function, along with removal of contaminated clothing and skin decontamination",
  "Naloxone, since pinpoint pupils indicate opioid toxicity",
  "Flumazenil, since pesticide exposure causes benzodiazepine-like sedation",
  "Activated charcoal alone, since the exposure was through the skin"],
 ans:0,
 rat:{c:"Organophosphates inhibit acetylcholinesterase, producing a cholinergic crisis with muscarinic signs such as salivation, lacrimation, bronchorrhea, bronchospasm, and miosis, plus nicotinic signs such as fasciculations and weakness. Atropine reverses the muscarinic effects and pralidoxime regenerates the enzyme if given early. Contaminated clothing must be removed so caregivers are not exposed.",
  s:"Pinpoint pupils alone do not identify opioid toxicity when the full cholinergic picture is present. Flumazenil has no role here, and activated charcoal does not address dermal exposure, which is the ongoing source."} },

{id:"PHA-118", t:"single", cn:"PHA", sys:"HEME", topic:"Hypersensitivity risk with parenteral iron", d:2, b:0.45, cj:"act", tags:["iron dextran","parenteral iron","anaphylaxis"],
 stem:"A client is scheduled to receive intravenous iron dextran for iron deficiency anemia. What precaution applies?",
 opts:["Have resuscitation equipment available and monitor closely during and after the infusion, because severe hypersensitivity reactions can occur",
  "Administer it as a rapid intravenous push to reduce the total exposure time",
  "Give it intramuscularly instead, since that route carries no reaction risk",
  "Premedicate with an antihistamine, which reliably prevents all reactions to parenteral iron"],
 ans:0,
 rat:{c:"Parenteral iron, particularly iron dextran, carries a risk of severe hypersensitivity including anaphylaxis, and delayed reactions can appear hours to days later. Resuscitation equipment must be available and the client monitored during and after a slow infusion.",
  s:"Rapid administration increases the risk of infusion reactions. Intramuscular iron also carries reaction risk and causes tissue staining, and antihistamine premedication does not reliably prevent anaphylaxis."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-116", t:"single", cn:"MOC", sys:"INTG", topic:"Retaliation after a protected safety report", d:2, b:0.45, cj:"evaluate", tags:["whistleblower","non-retaliation","professional responsibility"],
 stem:"A nurse reports a pattern of unsafe staffing through the internal chain of command and then to an external regulator. The manager responds by assigning mandatory overtime and removing the nurse's preferred schedule. What does the nurse understand?",
 opts:["Retaliation for a protected report may be unlawful, so the nurse should document the sequence and pursue it through the regulator and employment channels",
  "The manager has full discretion over assignments, so no action is available to the nurse",
  "Reporting through a regulator was itself a breach, since the internal route is the only protected one",
  "The nurse should withdraw the report in order to restore the working relationship"],
 ans:0,
 rat:{c:"Nurses are protected when reporting unsafe conditions in good faith, internally or to a regulator. Adverse changes to assignment or schedule following a protected report can constitute retaliation, and documenting the sequence in time is the basis for pursuing it.",
  s:"Managerial discretion does not extend to punishing protected activity. External reporting is generally protected once internal routes fail, and withdrawing a safety report leaves the unsafe condition in place without undoing the retaliation."} },

{id:"MOC-117", t:"single", cn:"MOC", sys:"CV", topic:"POLST versus advance directive in an emergency", d:3, b:0.55, cj:"analyze", tags:["POLST","advance directive","emergency care"],
 stem:"A client with end-stage disease has both an advance directive and a signed POLST form, and collapses at home. Paramedics are called. What governs their action?",
 opts:["The POLST form, because it is a set of immediately actionable medical orders that emergency personnel follow, while an advance directive states preferences and usually requires interpretation",
  "The advance directive, since it predates the POLST form and therefore controls",
  "Neither document, since emergency personnel must always attempt resuscitation",
  "The family's verbal wishes, which override any written document at the scene"],
 ans:0,
 rat:{c:"A POLST translates goals of care into signed medical orders that travel with the client and can be acted on by emergency personnel without further interpretation. An advance directive expresses preferences and typically needs a surrogate and clinical judgment to apply.",
  s:"Age does not determine precedence, and the two documents serve different functions. Paramedics act on valid orders rather than always resuscitating, and a signed order set is what they follow at the scene."} },

{id:"MOC-118", t:"single", cn:"MOC", sys:"NEURO", topic:"Confounders excluded before brain death determination", d:3, b:0.55, cj:"evaluate", tags:["brain death","apnea test","confounders"],
 stem:"A client with a catastrophic intracranial hemorrhage has no brainstem reflexes on examination, and the team is preparing to determine death by neurologic criteria. The core temperature is 34.5 C and a sedative infusion was stopped two hours ago. What should the nurse raise?",
 opts:["The examination cannot proceed yet, because hypothermia and a recent sedative can abolish brainstem reflexes and must be corrected or cleared before determination",
  "The determination can proceed now, since absent brainstem reflexes are sufficient even after a recent sedative",
  "Only a single examination is required, since repeat testing adds no information",
  "An electroencephalogram must replace the clinical examination in every case"],
 ans:0,
 rat:{c:"Determination of death by neurologic criteria requires confounders to be excluded first. Hypothermia, sedative or paralytic drugs, and severe metabolic or endocrine disturbance can all suppress brainstem reflexes and the apnea response, so core temperature is normalized and drug effect cleared or measured before the examination and apnea test.",
  s:"Absent reflexes cannot be interpreted while confounders are present, which is exactly why the protocol requires their exclusion. Protocols generally call for more than one examination, and ancillary testing is reserved for cases where the clinical examination or apnea test cannot be completed."} },

{id:"MOC-119", t:"single", cn:"MOC", sys:"RESP", topic:"Withdrawing life-sustaining treatment", d:3, b:0.55, cj:"analyze", tags:["withdrawal of treatment","ethics","comfort care"],
 stem:"A family and the care team agree to withdraw mechanical ventilation from a client with no meaningful chance of recovery. The nurse asks whether withdrawing support differs ethically from never starting it. What is the accepted position?",
 opts:["Withdrawing treatment that no longer achieves the client's goals is ethically equivalent to withholding it, and comfort-focused care continues throughout",
  "Withdrawing support requires a court order, since it is ethically and legally distinct from not starting it",
  "Withdrawal is permissible only if the client is already brain dead",
  "Sedation must be withheld during withdrawal so the family can see that the client is comfortable"],
 ans:0,
 rat:{c:"Ethically and legally, withdrawing an intervention that no longer serves the client's goals is equivalent to withholding it. The focus shifts to comfort, and symptom management continues and often intensifies during and after withdrawal.",
  s:"No court order is generally required when the decision follows proper surrogate and clinical process. Withdrawal commonly applies to clients who are not brain dead, and withholding sedation to make a point would abandon the client to suffering."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-087", t:"single", cn:"RRP", sys:"CV", topic:"Wedge pressure and cardiac index in shock", d:3, b:0.55, cj:"analyze", tags:["pulmonary artery catheter","cardiogenic shock","hemodynamics"],
 stem:"A client in shock has a pulmonary artery wedge pressure of 22 mm Hg and a cardiac index of 1.6 L/min/m². What does the nurse interpret?",
 opts:["Cardiogenic shock, since the elevated wedge pressure indicates pulmonary congestion from left ventricular failure alongside a low cardiac output",
  "Hypovolemic shock, since a low cardiac index with a low pulmonary artery wedge pressure always indicates volume depletion",
  "Distributive shock, since a low cardiac index with congestion is typical of early sepsis",
  "Normal findings, since both values fall within the expected range"],
 ans:0,
 rat:{c:"A wedge pressure of 22 mm Hg is well above the normal 6 to 12 range and reflects elevated left-sided filling pressure, while a cardiac index of 1.6 is below the normal 2.5 to 4.0. Congestion with low output defines cardiogenic shock, and additional fluid would worsen it.",
  s:"Hypovolemia produces a low wedge pressure rather than a high one. Early septic shock typically shows a high cardiac index with low filling pressures, and neither value here is normal."} },

{id:"RRP-088", t:"single", cn:"RRP", sys:"CV", topic:"Interpreting central venous oxygen saturation", d:3, b:0.55, cj:"evaluate", tags:["ScvO2","septic shock","oxygen delivery"],
 stem:"A client in septic shock has a central venous oxygen saturation of 48 percent with a low blood pressure. What does the nurse understand about this value?",
 opts:["It indicates oxygen delivery is inadequate for tissue demand, so further resuscitation is needed rather than reassurance from the number",
  "It confirms adequate tissue perfusion, since venous saturation falls only after organ failure begins",
  "It reflects improved perfusion, since a low venous saturation means tissues are extracting less oxygen",
  "It cannot be interpreted without a simultaneous arterial blood gas"],
 ans:0,
 rat:{c:"Central venous oxygen saturation reflects the balance between oxygen delivery and consumption. A low value means tissues are extracting more because delivery is insufficient, which in shock signals ongoing hypoperfusion and the need for further volume, inotropic support, or transfusion.",
  s:"A low venous saturation is a warning rather than reassurance, and organ injury follows rather than precedes it. A low value means greater extraction, and it is interpreted from its own trend alongside lactate and clinical signs."} },

{id:"RRP-089", t:"single", cn:"RRP", sys:"NEURO", topic:"Train-of-four monitoring of neuromuscular blockade", d:3, b:0.55, cj:"evaluate", tags:["neuromuscular blockade","train of four","sedation"],
 stem:"A client on mechanical ventilation is receiving a continuous neuromuscular blocking infusion. What does train-of-four monitoring tell the nurse?",
 opts:["The depth of neuromuscular blockade, so the infusion can be titrated to the minimum effective level while adequate sedation is confirmed",
  "The client's level of consciousness, so the neuromuscular infusion can be reduced safely",
  "The presence of seizure activity, since it measures cortical electrical activity",
  "The risk of deep vein thrombosis, since it measures peripheral blood flow"],
 ans:0,
 rat:{c:"Train-of-four applies four stimuli to a peripheral nerve and compares the resulting twitches, which quantifies the depth of blockade. That allows the least effective dose to be used and confirms paralysis, so an awake but paralyzed client is detected and sedation is assured.",
  s:"It measures peripheral nerve response rather than consciousness or cortical activity, and it has no role in assessing blood flow. Its safety value lies precisely in revealing blockade in a client who may be awake."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-088", t:"single", cn:"SIC", sys:"INF", topic:"Reusing a single-dose vial", d:3, b:0.55, cj:"prioritize", tags:["single-dose vial","medication safety","infection prevention"],
 stem:"A nurse needs a second dose of a medication from a single-dose vial that was entered four hours ago for another client. What should the nurse do?",
 opts:["Discard the vial and open a new one, because single-dose vials contain no preservative and must not be used for more than one client",
  "Use it, since a single-dose vial may be shared within four hours if it has been refrigerated",
  "Wipe the stopper with alcohol and use it, since disinfection makes it safe for a second client",
  "Use it only if the second client is on the same unit"],
 ans:0,
 rat:{c:"Single-dose vials lack preservative, so any entry risks contamination that cannot be controlled afterward. They are for one client on one occasion, and reuse across clients has caused outbreaks of bloodborne and bacterial infection.",
  s:"No time window makes an unpreserved vial safe for a second client. Swabbing the stopper does not sterilize the contents, and unit location has no bearing on contamination."} },

{id:"SIC-089", t:"single", cn:"SIC", sys:"GI", topic:"Timing of preoperative antibiotic prophylaxis", d:3, b:0.55, cj:"act", tags:["surgical prophylaxis","antibiotic timing","surgical site infection"],
 stem:"A client is scheduled for a clean-contaminated abdominal procedure with preoperative antibiotic prophylaxis ordered. When should the dose be given?",
 opts:["Within 60 minutes before the incision, so tissue levels are adequate at the moment of incision, with redosing if the procedure is prolonged",
  "The evening before the procedure, so the drug reaches a steady level in the tissue",
  "Immediately after the incision is made, so bleeding does not wash the drug away",
  "Only if the operative culture returns positive"],
 ans:0,
 rat:{c:"Prophylactic antibiotics must be present in the tissue at adequate concentration when the incision is made, which means administration within 60 minutes beforehand, with redosing during prolonged procedures or significant blood loss. Post-incision dosing loses the protective window.",
  s:"Evening-before dosing leaves subtherapeutic tissue levels at incision, and post-incision dosing misses the window entirely. Waiting for a positive culture is treatment rather than prophylaxis."} },

{id:"SIC-090", t:"single", cn:"SIC", sys:"RESP", topic:"Respiratory hygiene in a waiting area", d:2, b:0.45, cj:"generate", tags:["respiratory hygiene","source control","ambulatory care"],
 stem:"A clinic waiting room is crowded during respiratory virus season and several clients are coughing. What is the appropriate infection control measure at intake?",
 opts:["Offer a mask and tissues to anyone coughing, provide hand hygiene supplies, and seat symptomatic clients at a distance from others",
  "Ask symptomatic clients to leave and return when they are no longer infectious",
  "Rely on standard precautions alone, since respiratory viruses are not transmitted in waiting areas",
  "Place every coughing client in a negative-pressure room regardless of the suspected cause"],
 ans:0,
 rat:{c:"Respiratory hygiene at intake, meaning masking, tissues, hand hygiene, and spatial separation, reduces transmission in shared waiting areas and applies to anyone with respiratory symptoms. It is a source-control measure expected in ambulatory settings.",
  s:"Turning clients away denies care and does nothing about transmission already occurring in the room. Standard precautions alone omit source control, and negative-pressure rooms are reserved for airborne pathogens rather than routine coughing."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-065", t:"single", cn:"HPM", sys:"ENDO", topic:"Screening for prediabetes", d:3, b:0.55, cj:"analyze", tags:["prediabetes","screening","diabetes prevention"],
 stem:"A 48-year-old client with a body mass index of 32 and a parent with type 2 diabetes asks whether screening is worthwhile. What is the nurse's accurate response?",
 opts:["Yes, because the test identifies prediabetes, and lifestyle change at that stage can prevent or delay progression to diabetes",
  "No, since screening is only indicated once symptoms of diabetes such as excessive thirst appear",
  "No, since prediabetes has no intervention that changes the outcome",
  "Yes, but only with a fasting glucose, since the A1c cannot detect prediabetes"],
 ans:0,
 rat:{c:"Adults with overweight or obesity plus a risk factor such as family history are screened, and an A1c of 5.7 to 6.4 percent identifies prediabetes. Intensive lifestyle intervention at that stage substantially reduces progression, which is exactly why screening is worthwhile.",
  s:"Type 2 diabetes is often asymptomatic for years, so waiting for symptoms defeats the purpose of screening. Prediabetes is the stage where intervention works best, and A1c is a recognized screening test alongside fasting glucose."} },

{id:"HPM-066", t:"single", cn:"HPM", sys:"RESP", topic:"Radon as a cause of lung cancer", d:2, b:0.45, cj:"generate", tags:["radon","lung cancer","environmental risk"],
 stem:"A client who has never smoked asks how lung cancer risk can be reduced at home. What should the nurse include?",
 opts:["Test the home for radon, since it is the leading cause of lung cancer in people who have never smoked and is undetectable without testing",
  "Install an air purifier, since it removes radon gas from indoor air",
  "Seal the basement once, since radon risk is eliminated permanently by sealing",
  "Assume the cancer risk is negligible, since radon affects only people who have never smoked"],
 ans:0,
 rat:{c:"Radon is a colorless, odorless radioactive gas that accumulates indoors from soil and is the leading cause of lung cancer among people who have never smoked. Testing is the only way to detect it, and mitigation reduces levels where they are elevated.",
  s:"Air purifiers do not remove radon. Sealing can help but is not a permanent fix without measurement, and radon raises risk for everyone, with smoking multiplying it."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-065", t:"single", cn:"BCC", sys:"RESP", topic:"Tripod positioning in airflow obstruction", d:3, b:0.55, cj:"act", tags:["orthopneic position","COPD","positioning"],
 stem:"A client with advanced chronic obstructive pulmonary disease is dyspneic at rest and cannot lie flat. What position should the nurse facilitate?",
 opts:["Sitting upright and leaning forward with the arms supported on an over-bed table, which fixes the shoulder girdle and improves use of the accessory muscles",
  "Lying flat with the legs elevated, which improves venous return to the heart",
  "Side-lying with the head of the bed flat, which splints the diaphragm",
  "Supine with a pillow under the knees, which relaxes the abdominal muscles"],
 ans:0,
 rat:{c:"The tripod or orthopneic position fixes the shoulder girdle so the pectoral and other accessory muscles can elevate the rib cage, which improves ventilation in airflow obstruction. Clients with advanced disease often adopt it spontaneously.",
  s:"Flat positions remove the mechanical advantage these clients depend on, and leg elevation increases venous return, worsening dyspnea when the heart is already strained. Side-lying and supine positions do not fix the shoulder girdle."} }
  );
})();
