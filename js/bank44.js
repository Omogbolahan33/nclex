/* Wave 34 — 20 hand-authored hard RN items.
 * Safety (12.8% against 13%), Management of Care (17.7% against 18%),
 * Reduction of Risk Potential (11.9% against 12%) and Physiological
 * Adaptation (13.8% against 14%) are all under their blueprint share, and
 * Health Promotion at 69% hard and Basic Care at 71% hard are the two
 * softest areas on difficulty, so wave 34 is spread across all six.
 * Every item is d>=2; 13 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh against the
 * current 1029-item bank.
 *
 * Safety              : SIC-133 – SIC-137
 * Health Promotion    : HPM-100 – HPM-103
 * Basic Care/Comfort  : BCC-095 – BCC-098
 * Reduction of Risk   : RRP-128 – RRP-130
 * Management of Care  : MOC-178 – MOC-180
 * Physiological Adapt : PAA-139
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Safety and Infection Control (5) ---------------- */

{id:"SIC-133", t:"single", cn:"SIC", sys:"REPI", topic:"Preventing infant abduction", d:3, b:0.55, cj:"prioritize", tags:["infant abduction","security","verification"],
 stem:"A nurse on a postpartum unit is approached by a person in scrubs, unknown to the nurse, who says they are here to take the newborn for a test. What is the nurse's priority action?",
 opts:["Verify the person's identification and the request before releasing the infant, and accompany the infant rather than allowing removal by an unfamiliar person",
  "Release the infant, since anyone wearing scrubs is a member of the clinical team",
  "Ask the parent to carry the infant to the department, since a parent cannot be challenged",
  "Call security and detain the person first, since an unfamiliar face indicates an abduction attempt"],
 ans:0,
 rat:{c:"Infant abduction is prevented by verification rather than assumption. Staff clothing is not identification, so the nurse confirms identity and the order, and infants are transported by verified staff or remain with the parent rather than handed to an unverified person.",
  s:"Scrubs prove nothing and are easily obtained. Sending a parent to a department alone bypasses the safeguard entirely, and detaining someone before verification escalates what may be a routine request."} },

{id:"SIC-134", t:"single", cn:"SIC", sys:"CV", topic:"Venous thromboembolism prophylaxis when the picture changes", d:3, b:0.55, cj:"prioritize", tags:["VTE prophylaxis","thrombocytopenia","clinical judgement"],
 stem:"A postoperative client is prescribed both enoxaparin and intermittent pneumatic compression. The platelet count is now 42,000/mm³ and the client has new unilateral calf swelling. What should the nurse do?",
 opts:["Withhold the enoxaparin, notify the prescriber, and investigate the calf swelling before applying compression, since both findings change the plan",
  "Give the enoxaparin as prescribed and apply the compression, since the calf swelling is unrelated and both are already ordered",
  "Apply only the compression sleeves and give half the prescribed enoxaparin dose",
  "Stop both measures, since any prophylaxis is unsafe once the platelet count falls"],
 ans:0,
 rat:{c:"A platelet count of 42,000 raises bleeding risk and may indicate heparin-induced thrombocytopenia, so anticoagulation needs review rather than routine administration. New unilateral calf swelling suggests established thrombosis, which requires investigation before compression is applied.",
  s:"Following an existing order ignores two new findings that invalidate it. Halving a dose is not an authorised nursing adjustment, and stopping all prophylaxis leaves a high-risk client unprotected without addressing the swelling."} },

{id:"SIC-135", t:"single", cn:"SIC", sys:"INTG", topic:"Medical adhesive-related skin injury", d:2, b:0.45, cj:"generate", tags:["adhesive injury","fragile skin","prevention"],
 stem:"An older adult with fragile skin requires frequent dressing changes and continuous monitoring electrodes. What reduces adhesive-related skin injury?",
 opts:["Use silicone-based adhesives where possible, apply a barrier film, remove adhesive slowly and parallel to the skin, and rotate electrode sites",
  "Remove adhesives quickly at ninety degrees to the skin, since a fast pull is less painful",
  "Apply adhesive directly over moisturised skin, since this reduces trauma",
  "Leave electrodes in place for a full week, since fewer removals means less injury"],
 ans:0,
 rat:{c:"Adhesive-related injury occurs when the outer skin layer is stripped away. Silicone adhesives and barrier films reduce bond strength, slow parallel removal preserves the skin surface, and rotating sites distributes the load.",
  s:"Fast perpendicular removal strips the stratum corneum. Moisturiser prevents adhesion and leaves devices insecure, and wearing electrodes beyond their recommended interval causes pressure and moisture injury."} },

{id:"SIC-136", t:"single", cn:"SIC", sys:"INF", topic:"Segregating cytotoxic waste", d:2, b:0.45, cj:"act", tags:["waste segregation","cytotoxic","disposal"],
 stem:"A nurse finishes a dressing change for a client receiving chemotherapy and has gloves, a blood-stained dressing, and an empty glass vial that held a cytotoxic drug. How should each be disposed of?",
 opts:["Gloves and the blood-stained dressing go in clinical waste, and the cytotoxic vial goes in the designated cytotoxic waste stream for separate high-temperature incineration",
  "The gloves, the blood-stained dressing, and the cytotoxic vial all go in general clinical waste, since all of it is contaminated",
  "The vial goes in sharps waste and the rest in general clinical waste",
  "The vial is rinsed and placed in recycling, since glass is recyclable"],
 ans:0,
 rat:{c:"Cytotoxic waste requires a separate designated stream and high-temperature incineration because residual drug remains hazardous to handlers and to the environment. Blood-contaminated items are clinical waste, and an empty cytotoxic vial is neither ordinary glass nor a sharp.",
  s:"Mixing cytotoxic waste with general clinical waste exposes staff and the wider environment. A glass vial is not a sharp, and rinsing it disperses the drug into the water supply."} },

{id:"SIC-137", t:"single", cn:"SIC", sys:"NEURO", topic:"Polypharmacy as a modifiable fall risk", d:3, b:0.55, cj:"analyze", tags:["polypharmacy","falls","older adult"],
 stem:"An 82-year-old client takes twelve regular medications including two sedatives, an antihypertensive, and an anticholinergic, and has fallen twice in six months. What is the nurse's priority contribution?",
 opts:["Flag the medication burden for structured review, since sedatives, anticholinergics, and antihypertensives each independently raise fall risk and the combination multiplies it",
  "Recommend a walking frame, since mobility aids prevent falls regardless of medication effects",
  "Recommend a bed alarm, since supervision is the only reliable fall control",
  "Recommend stopping all twelve medications including the sedatives, since any medication can cause a fall"],
 ans:0,
 rat:{c:"Medication-related fall risk is cumulative and modifiable. Sedatives impair reaction time, anticholinergics cause confusion and visual disturbance, and antihypertensives produce postural hypotension, so structured review and deprescribing are the highest-yield intervention available.",
  s:"Aids and alarms address the consequence rather than the cause and do not remove the drug effect. Blanket cessation of every medicine is unsafe and unrealistic, and ignores that several are essential."} },

/* ---------------- Health Promotion and Maintenance (4) ---------------- */

{id:"HPM-100", t:"single", cn:"HPM", sys:"CV", topic:"Screening for abdominal aortic aneurysm", d:3, b:0.55, cj:"analyze", tags:["abdominal aortic aneurysm","screening","smoking history"],
 stem:"A 67-year-old man who smoked for thirty years asks whether any screening is recommended for him. What should the nurse explain?",
 opts:["A one-time abdominal ultrasound is recommended for men aged 65 to 75 who have ever smoked, because it detects an aneurysm before rupture",
  "No screening is recommended, since an aneurysm cannot be detected before rupture even in someone who has smoked",
  "Annual computed tomography, since it is more sensitive than ultrasound for this purpose",
  "Screening is recommended only for women, since men have a lower risk of rupture"],
 ans:0,
 rat:{c:"One-time ultrasound screening for men in this age group who have ever smoked reduces aneurysm-related death, because most aneurysms are asymptomatic until rupture and surveillance or elective repair can be planned once one is found.",
  s:"Ultrasound detects aneurysms reliably and is the recommended test. Annual computed tomography adds cumulative radiation and cost without screening benefit, and the recommendation applies to men with a smoking history rather than to women."} },

{id:"HPM-101", t:"single", cn:"HPM", sys:"PSYCH", topic:"Depression screening in chronic illness", d:2, b:0.45, cj:"recognize", tags:["depression screening","chronic illness","self-management"],
 stem:"A client attending for routine review of diabetes mentions low mood, poor sleep, and loss of interest over the last six weeks. What should the nurse do?",
 opts:["Screen formally for depression and arrange follow-up, since depression is common in chronic illness, worsens self-management, and is treatable",
  "Reassure the client, since low mood is an understandable reaction to living with a chronic condition",
  "Suggest a sleep aid, since restoring sleep will resolve the mood symptoms",
  "Refer immediately to psychiatry, since any low mood requires specialist care"],
 ans:0,
 rat:{c:"Depression is highly prevalent in chronic illness, impairs adherence and glycaemic control, and responds to treatment. A structured screen establishes severity and risk, including any thoughts of self-harm, and guides the appropriate level of care.",
  s:"Normalising the symptoms forfeits a treatable condition that is actively worsening the diabetes. A hypnotic treats one symptom rather than the syndrome, and most depression is managed in primary care rather than requiring immediate specialist referral."} },

{id:"HPM-102", t:"single", cn:"HPM", sys:"CV", topic:"Basic life support sequence for a lay rescuer", d:3, b:0.55, cj:"generate", tags:["basic life support","defibrillation","community education"],
 stem:"A layperson finds an adult collapsed and unresponsive in a shopping centre. What sequence should the nurse teach?",
 opts:["Check responsiveness, call for help and an automated external defibrillator, open the airway, check breathing, then start chest compressions and use the defibrillator as soon as it arrives",
  "Check for a pulse for two minutes before starting compressions, since compressions are harmful if the heart is beating",
  "Give rescue breaths first, since oxygen is what the brain needs most",
  "Place the person in the recovery position and wait for the ambulance, since moving them may cause harm"],
 ans:0,
 rat:{c:"Adult basic life support is recognition, calling for help and a defibrillator, then high-quality compressions with minimal interruption, defibrillating as soon as the device is available. Lay rescuers are not required to check a pulse, which is unreliable and delays compressions.",
  s:"Lay pulse checks are inaccurate and cost time when every minute without circulation reduces survival. Compression-led resuscitation is recommended for adults, and the recovery position is for someone breathing normally rather than someone in arrest."} },

{id:"HPM-103", t:"single", cn:"HPM", sys:"INTG", topic:"Immediate first aid for a scald", d:3, b:0.55, cj:"act", tags:["burn first aid","cooling","paediatric"],
 stem:"A child has just scalded an arm with hot liquid. What is the correct immediate first aid?",
 opts:["Cool the burn under running water for twenty minutes, remove clothing and jewellery that is not stuck, cover with cling film, and keep the child warm",
  "Apply ice directly to the child's burn, since rapid cooling limits the depth of injury",
  "Apply butter or toothpaste, since these soothe the skin and prevent blistering",
  "Burst any blisters that form, since the fluid inside delays healing"],
 ans:0,
 rat:{c:"Twenty minutes of cool running water, given within three hours of the injury, reduces burn depth, pain, and the need for grafting. A non-adherent covering such as cling film protects the wound, and the child must be kept warm because children lose heat rapidly through a burn.",
  s:"Ice causes vasoconstriction and deepens the injury. Household products trap heat, introduce infection, and complicate later assessment, and blisters act as a biological dressing that should be left intact."} },

/* ---------------- Basic Care and Comfort (4) ---------------- */

{id:"BCC-095", t:"single", cn:"BCC", sys:"CV", topic:"Correct use of intermittent pneumatic compression", d:2, b:0.45, cj:"act", tags:["pneumatic compression","VTE prophylaxis","skin assessment"],
 stem:"A nurse applies intermittent pneumatic compression sleeves to a postoperative client. What is correct?",
 opts:["Ensure correct size with about two fingers' space, check the skin underneath each shift, and remove them only for mobilisation and hygiene rather than for long periods",
  "Apply the sleeves loosely, since a loose fit is the correct sizing and a tight one restricts circulation",
  "Leave the sleeves off whenever the client is asleep, since rest periods are required",
  "Apply them over existing stockings without checking the skin, since the layers add protection"],
 ans:0,
 rat:{c:"Correct sizing and fit are what produce effective venous emptying, and the skin underneath is at risk of pressure injury, so it is inspected regularly. Benefit depends on wear time, so removal is limited to mobilisation and hygiene.",
  s:"A loose sleeve does not compress the veins and provides no prophylaxis. Prolonged removal removes the protective effect, and layering devices without inspection hides skin damage."} },

{id:"BCC-096", t:"single", cn:"BCC", sys:"RESP", topic:"Delivering a precise oxygen concentration", d:3, b:0.55, cj:"analyze", tags:["Venturi mask","oxygen delivery","COPD"],
 stem:"A client with chronic obstructive pulmonary disease is prescribed oxygen at a precise concentration of 28 percent. What device should the nurse use?",
 opts:["A Venturi mask, because it delivers a fixed inspired oxygen concentration regardless of the client's breathing pattern",
  "A nasal cannula at 2 L/min, since it is the most comfortable device for low-flow oxygen",
  "A non-rebreather mask at 15 L/min, since it delivers the most oxygen",
  "A simple face mask at 6 L/min, since it is suitable for any prescribed concentration"],
 ans:0,
 rat:{c:"A Venturi mask uses fixed adaptors and the Venturi principle to deliver a set concentration, which matters in chronic obstructive pulmonary disease where uncontrolled oxygen can worsen hypercapnia. Delivery is independent of the client's own tidal volume and respiratory rate.",
  s:"Nasal cannulae and simple masks deliver a variable concentration that depends on the client's breathing pattern, so they cannot guarantee a prescribed percentage. A non-rebreather delivers a high concentration, which is the opposite of what this client needs."} },

{id:"BCC-097", t:"single", cn:"BCC", sys:"GI", topic:"Positioning and pacing during a dysphagia meal", d:2, b:0.45, cj:"act", tags:["dysphagia","feeding","aspiration prevention"],
 stem:"A client with dysphagia is cleared for thickened fluids. What should the nurse do at mealtimes?",
 opts:["Sit the client upright at ninety degrees, offer small amounts with a chin-tuck swallow, allow unhurried pacing, and keep the client upright for thirty minutes afterward",
  "Recline the client to forty-five degrees, since a semi-recumbent position is easier for swallowing",
  "Encourage the client to eat quickly while the food is warm, since cold food is harder to swallow",
  "Allow the client to lie down to rest as soon as the meal is finished"],
 ans:0,
 rat:{c:"Upright positioning uses gravity to move the bolus downward and reduces residue, the chin tuck narrows the airway entrance, and remaining upright afterward prevents reflux of retained material. Unhurried pacing reduces aspiration risk.",
  s:"A reclined position removes gravity's protection and increases aspiration. Rushing overwhelms an impaired swallow, and lying down immediately afterward risks reflux and aspiration of residue."} },

{id:"BCC-098", t:"single", cn:"BCC", sys:"INTG", topic:"Instilling ear drops in a young child", d:2, b:0.45, cj:"act", tags:["otic administration","paediatric","technique"],
 stem:"A nurse is instilling ear drops into the right ear of a two-year-old child. What technique is correct?",
 opts:["Pull the pinna down and back, instil the drops onto the wall of the canal, and keep the child side-lying for a few minutes",
  "Pull the pinna up and back, since this straightens the canal at every age",
  "Instil the drops directly onto the tympanic membrane, since this delivers the medication fastest",
  "Sit the child upright immediately, since this helps the drops drain in"],
 ans:0,
 rat:{c:"In children under about three years the canal is directed downward, so the pinna is pulled down and back to straighten it. Drops are placed on the canal wall rather than the drum, and side-lying retains the medication in the ear.",
  s:"Upward and backward traction is used from about age three onward, so it is wrong for a two-year-old. Direct contact with the tympanic membrane is painful and can cause damage, and sitting upright lets the drops drain straight back out."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-128", t:"single", cn:"RRP", sys:"NEURO", topic:"Re-zeroing an external ventricular drain", d:3, b:0.55, cj:"act", tags:["external ventricular drain","intracranial pressure","zeroing"],
 stem:"An external ventricular drain is in place with the transducer zeroed at the level of the tragus. The head of the bed is then raised from flat to thirty degrees. What must the nurse do?",
 opts:["Re-zero the transducer at the new level of the external auditory meatus before reading the pressure, and keep the drain closed during position changes unless otherwise specified",
  "Leave the transducer at the same level, since the external zero point was set correctly at insertion",
  "Lower the drainage bag to increase drainage and compensate for the position change",
  "Open the drain fully during the move so that pressure cannot rise"],
 ans:0,
 rat:{c:"Intracranial pressure is referenced to the foramen of Monro, approximated by the tragus or external auditory meatus. Raising the head changes that landmark's height relative to the transducer, so the system must be re-zeroed. The drain is closed during moves to prevent uncontrolled cerebrospinal fluid loss.",
  s:"A zero point set at one height is invalid at another and gives falsely low readings. Lowering the bag siphons fluid and can cause overdrainage and herniation, and an open drain during movement risks the same."} },

{id:"RRP-129", t:"single", cn:"RRP", sys:"REN", topic:"What a post-void residual measurement shows", d:3, b:0.55, cj:"evaluate", tags:["post-void residual","urinary retention","assessment"],
 stem:"A client reports frequent small voids and a persistent sensation of incomplete emptying. What does a post-void residual measurement tell the nurse?",
 opts:["The volume remaining in the bladder after voiding, which identifies retention and overflow incontinence and guides whether catheterisation or urological assessment is needed",
  "The total urine produced in twenty-four hours, which assesses kidney function",
  "The rate of urine flow, which identifies urethral obstruction directly",
  "The presence of infection, since retained urine always becomes infected"],
 ans:0,
 rat:{c:"A post-void residual measured by bladder scan or catheterisation after voiding quantifies incomplete emptying. A raised residual explains overflow incontinence, raises infection risk, and directs further management, whereas frequency alone cannot distinguish retention from other causes.",
  s:"That describes a urine output measurement rather than a residual. Uroflowmetry measures rate, and a residual does not diagnose obstruction on its own. Retained urine increases infection risk without guaranteeing it, and the result does not test for infection."} },

{id:"RRP-130", t:"single", cn:"RRP", sys:"CV", topic:"Assessment after femoral cardiac catheterisation", d:3, b:0.55, cj:"prioritize", tags:["cardiac catheterisation","femoral access","neurovascular assessment"],
 stem:"A client returns to the ward after cardiac catheterisation via the right femoral artery. What is the priority nursing assessment?",
 opts:["Check the puncture site for bleeding or haematoma and assess the distal pulses, temperature, colour, and sensation of the limb, with bed rest and the leg kept straight as prescribed",
  "Encourage the client to walk immediately, since early mobilisation prevents deep vein thrombosis",
  "Assess only the puncture site, since limb ischaemia is not a recognised complication",
  "Apply a warm compress to the site, since warmth promotes healing of an arterial puncture"],
 ans:0,
 rat:{c:"Arterial access carries risks of bleeding, haematoma, pseudoaneurysm, and limb ischaemia from thrombosis or dissection. Frequent site and neurovascular assessment of the limb, with the leg kept straight and bed rest observed, is what detects these early.",
  s:"Early ambulation after femoral arterial access risks re-bleeding. Assessing the site alone misses distal ischaemia, which presents in the foot rather than at the puncture, and warmth increases bleeding at an arterial site."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-178", t:"single", cn:"MOC", sys:"PSYCH", topic:"Repeating bad news to a client in shock", d:3, b:0.55, cj:"act", tags:["breaking bad news","communication","support"],
 stem:"A nurse is present when a client is told that treatment is no longer working. The client falls silent and then asks the nurse to repeat what was said. What is the nurse's best response?",
 opts:["Repeat the information in plain terms at the client's pace, check understanding, and explore what the client wants to know next, since shock impairs the ability to take in information",
  "Change the subject to something hopeful, since repeating distressing news causes harm",
  "Suggest the client write down questions to repeat at the next appointment, since this is not the right moment",
  "Leave the room to give the client privacy, since further discussion would be intrusive"],
 ans:0,
 rat:{c:"Shock and distress impair encoding, so asking for repetition is expected and necessary. Restating information simply, checking understanding, and following the client's lead supports informed decision-making and is a core nursing contribution to breaking bad news.",
  s:"Redirecting away from the news leaves the client without the information needed to make decisions. Deferring questions abandons the client at the moment of greatest need, and leaving removes the support that repetition requires."} },

{id:"MOC-179", t:"single", cn:"MOC", sys:"ENDO", topic:"Food insecurity as a clinical problem", d:3, b:0.55, cj:"recognize", tags:["food insecurity","social determinants","diabetes"],
 stem:"A client with type 2 diabetes reports skipping meals to afford medication and eating mainly inexpensive refined carbohydrates. What should the nurse do?",
 opts:["Recognise food insecurity as a clinical problem, screen formally, connect the client to food assistance, and adjust the plan to what the client can actually obtain",
  "Provide a standard diabetic diet sheet, since nutritional guidance is the appropriate intervention",
  "Advise the client to prioritise food over medication, since nutrition matters more than tablets",
  "Document the concern and take no further action, since financial circumstances are outside clinical scope"],
 ans:0,
 rat:{c:"Food insecurity directly determines glycaemic control and is associated with skipped medication and hypoglycaemia. Screening identifies it, community resources address it, and the care plan must be realistic about what the client can actually buy.",
  s:"A diet sheet assumes access the client does not have. Advising a client to stop prescribed medication is unsafe, and financial barriers to health are squarely within clinical scope because they determine outcomes."} },

{id:"MOC-180", t:"single", cn:"MOC", sys:"PSYCH", topic:"Reasonable adjustment for a learning disability", d:2, b:0.45, cj:"generate", tags:["learning disability","reasonable adjustment","equity"],
 stem:"A client with a learning disability is admitted for a planned procedure. The family explains that the client becomes extremely distressed in unfamiliar surroundings and needs a predictable routine. What should the nurse do?",
 opts:["Make reasonable adjustments such as a quiet space, a consistent routine, plain-language information, and family involvement, and record them so every shift applies them",
  "Apply the standard admission routine, since individual exceptions cannot be made for one client",
  "Postpone the procedure and send the family home, since distress indicates the client cannot consent",
  "Sedate the client before admission, since this reliably prevents distress"],
 ans:0,
 rat:{c:"People with learning disabilities experience worse outcomes partly because care is not adapted to them. Reasonable adjustments to environment, communication, and routine are a legal and ethical obligation, and recording them ensures consistency across staff and shifts.",
  s:"Standard routines are what produce the poor outcomes this client is at risk of, and adjustment is required rather than optional. Distress is not equivalent to incapacity, and routine sedation to manage an environmental problem is inappropriate and risky."} },

/* ---------------- Physiological Adaptation (1) ---------------- */

{id:"PAA-139", t:"single", cn:"PAA", sys:"REPI", topic:"Recognising preterm labour", d:3, b:0.55, cj:"prioritize", tags:["preterm labour","antenatal corticosteroids","assessment"],
 stem:"A client at 30 weeks gestation reports regular tightening every eight minutes for two hours, low backache, and increased vaginal discharge. What is the nurse's priority action?",
 opts:["Assess for preterm labour with contraction monitoring and cervical assessment, because identifying it before cervical change allows treatment that improves neonatal outcome",
  "Advise rest and hydration at home, since irregular tightening is common in the third trimester",
  "Reassure the client, since true labour is unlikely before 37 weeks without rupture of membranes",
  "Prepare for immediate delivery, since preterm labour at 30 weeks cannot be slowed"],
 ans:0,
 rat:{c:"Regular contractions with backache and increased discharge at 30 weeks suggest preterm labour. Prompt assessment allows antenatal corticosteroids for fetal lung maturity, magnesium sulfate for neuroprotection, and tocolysis to gain time, all of which improve outcome.",
  s:"Sending the client home forfeits the window in which steroids and tocolysis help. Rupture of membranes is not required for labour to be established, and although delivery cannot always be prevented, delaying it even by forty-eight hours materially improves survival and reduces complications."} }
  );
})();
