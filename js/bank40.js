/* Wave 30 — 20 hand-authored hard RN items.
 * Management of Care at 17.6% against an 18% target, Pharmacology at 15.7%
 * against 16%, and Physiological Adaptation at 13.4% against 14% are the three
 * areas furthest under their blueprint share, so wave 30 leads with twelve
 * between them. Health Promotion at 67% hard and Basic Care at 70% hard
 * remain the softest on difficulty and take three.
 * Every item is d>=2; 18 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Management of Care  : MOC-163 – MOC-166
 * Pharmacology        : PHA-153 – PHA-156
 * Physiological Adapt : PAA-122, PAA-125
 * Pharmacology (cont) : PHA-157 – PHA-158  (medication safety in pregnancy)
 * Reduction of Risk   : RRP-119 – RRP-120
 * Safety              : SIC-124 – SIC-126
 * Basic Care/Comfort  : BCC-090 – BCC-091
 * Health Promotion    : HPM-096
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-163", t:"single", cn:"MOC", sys:"PSYCH", topic:"Concurrent care for children", d:3, b:0.55, cj:"analyze", tags:["concurrent care","pediatric hospice","curative treatment"],
 stem:"A family of a child with a life-limiting illness is offered hospice but fears that accepting it means giving up treatment for the underlying condition. What does the nurse explain?",
 opts:["That children may receive hospice services while continuing disease-directed treatment, so accepting support does not require abandoning curative or life-prolonging therapy, unlike the general adult rule",
  "That hospice and disease-directed treatment cannot be combined, so the family must choose one",
  "That hospice is only available once all treatment has stopped and death is expected within days",
  "That accepting hospice automatically stops all medication, including treatment for the underlying illness"],
 ans:0,
 rat:{c:"Concurrent care provisions allow children to receive hospice alongside disease-directed treatment, precisely so families do not have to choose between comfort support and continuing therapy. This differs from the general adult requirement to forgo curative treatment, and explaining it removes a major barrier to accepting help.",
  s:"The combination is permitted for children, which is the point of the provision. Hospice is not restricted to the final days, and accepting it does not stop treatment for the underlying illness in this population."} },

{id:"MOC-164", t:"single", cn:"MOC", sys:"INF", topic:"Autopsy consent", d:3, b:0.55, cj:"act", tags:["autopsy consent","next of kin","scope"],
 stem:"A client dies and the family is approached about an autopsy. What does the nurse understand?",
 opts:["Consent is sought from the next of kin unless the death falls under medical examiner jurisdiction, and the family may limit the scope, so the discussion covers what will and will not be examined and what the process involves",
  "The hospital may proceed without consent, since the cause of death is always a legitimate institutional interest",
  "The family must accept a full autopsy or none, since partial examinations are not possible",
  "Consent is unnecessary if the client had previously expressed a wish for one, since the family has no role"],
 ans:0,
 rat:{c:"Where the medical examiner does not have jurisdiction, autopsy requires next-of-kin consent, and the family may restrict it, for example to a particular cavity. Explaining the process, what will be examined, and what the body will look like afterward supports an informed decision.",
  s:"Institutional interest does not create authority to proceed without consent. Limited examinations are routinely performed, and a previously expressed wish informs but does not replace the consent process with the next of kin."} },

{id:"MOC-165", t:"single", cn:"MOC", sys:"INTG", topic:"Viewing the body and creating keepsakes", d:3, b:0.55, cj:"act", tags:["viewing the body","keepsakes","bereavement support"],
 stem:"A family wishes to see their relative who has just died after a traumatic injury. What should the nurse do?",
 opts:["Prepare the body so visible trauma is covered where possible, ensure lines and tubes are removed or concealed unless the death is under medical examiner jurisdiction, offer the family time alone, and offer keepsakes such as a lock of hair or handprint if appropriate",
  "Advise against viewing, since a traumatic appearance will cause lasting harm to the family",
  "Allow viewing only briefly and with the nurse present throughout, since families cannot be trusted alone",
  "Decline keepsakes, since removing anything from the body is prohibited"],
 ans:0,
 rat:{c:"Viewing supports grieving when the body is prepared thoughtfully, with trauma covered and equipment removed where the law allows. Offering private time and keepsakes gives the family something concrete, and most families who view the body do not regret it.",
  s:"Discouraging viewing removes an opportunity that most families value, and preparation can substantially reduce distress. Constant presence is not required and denies privacy, and keepsakes are commonly offered rather than prohibited, subject to jurisdictional rules."} },

{id:"MOC-166", t:"single", cn:"MOC", sys:"INF", topic:"Legal hold on records", d:3, b:0.55, cj:"act", tags:["legal hold","record preservation","litigation"],
 stem:"A client's family notifies the hospital that they intend to pursue a claim about the care given. What must happen to the record?",
 opts:["A legal hold is applied so the record and related material are preserved unaltered, routine destruction is suspended, and staff are instructed not to amend entries except by properly dated and labelled late entry",
  "Continue normal record retention, since destruction schedules are unaffected by a claim",
  "Allow staff to tidy the record, since correcting entries before disclosure is good practice",
  "Delete informal notes, since they are not part of the official record and cannot be requested"],
 ans:0,
 rat:{c:"Once litigation is reasonably anticipated, a legal hold suspends routine destruction and requires preservation of the record and related material. Altering or deleting entries at this point is spoliation, which is itself sanctionable and destroys credibility.",
  s:"Routine retention schedules are suspended by a hold rather than continuing. Altering entries before disclosure is precisely what a hold prevents, and informal notes may be discoverable, so deleting them is not a safe course."} },

/* ---------------- Pharmacology and Parenteral Therapies (4) ---------------- */

{id:"PHA-153", t:"single", cn:"PHA", sys:"PSYCH", topic:"Lurasidone must be taken with food", d:3, b:0.55, cj:"act", tags:["lurasidone","food requirement","absorption"],
 stem:"A client is prescribed lurasidone for schizophrenia. What administration instruction is essential?",
 opts:["Take it with a meal of at least 350 calories, since absorption is substantially reduced without food and the drug may not reach therapeutic levels, and watch for restlessness that may indicate akathisia",
  "Take it on an empty stomach, since food delays absorption and reduces effectiveness",
  "Take it at any time regardless of meals, since food has no effect on this drug",
  "Take it only when symptoms appear, since it works as needed like a rescue medication"],
 ans:0,
 rat:{c:"Lurasidone absorption is markedly increased by food, and the specified calorie threshold exists because taking it without a meal produces subtherapeutic levels and apparent treatment failure. Akathisia is a common and distressing effect that clients often cannot describe, so it must be asked about.",
  s:"An empty stomach reduces rather than improves absorption. Food has a large effect, which is why the requirement is explicit, and antipsychotics are maintenance treatments rather than as-needed medications."} },

{id:"PHA-154", t:"single", cn:"PHA", sys:"PSYCH", topic:"Ziprasidone and QT prolongation", d:3, b:0.55, cj:"analyze", tags:["ziprasidone","QT prolongation","food requirement"],
 stem:"A client with a history of prolonged QT interval and hypokalemia is being considered for ziprasidone. What should the nurse raise?",
 opts:["The combination of QT prolongation and hypokalemia increases the risk of torsades de pointes, so the electrolyte abnormality must be corrected and the risk weighed against alternatives, and the drug must also be taken with food for adequate absorption",
  "Nothing, since ziprasidone does not affect the QT interval",
  "Only the food requirement, since electrolytes are unrelated to cardiac risk with this drug",
  "A request for a higher dose, since hypokalemia reduces the drug's effectiveness"],
 ans:0,
 rat:{c:"Ziprasidone carries a recognized QT liability, and hypokalemia independently predisposes to torsades de pointes, so combining them is hazardous. Correcting the potassium and considering alternatives is the appropriate response, and the food requirement is a separate but essential administration point.",
  s:"The drug does affect the QT interval, which is why the concern exists. Electrolytes are directly relevant to the arrhythmia risk, and hypokalemia does not reduce effectiveness in a way that would justify a higher dose."} },

{id:"PHA-155", t:"single", cn:"PHA", sys:"NEURO", topic:"Entacapone effects", d:3, b:0.55, cj:"evaluate", tags:["entacapone","urine discoloration","dyskinesia"],
 stem:"A client on levodopa-carbidopa starts entacapone and later reports that their urine has turned brownish-orange and their involuntary movements have worsened. What does the nurse recognize?",
 opts:["The urine discoloration is an expected harmless effect, while increased dyskinesia reflects enhanced levodopa availability and may require the levodopa dose to be reduced rather than the entacapone stopped",
  "Both findings indicate liver failure requiring immediate cessation of all Parkinson medication",
  "The urine colour indicates the drug is not being absorbed, so the dose should be increased",
  "The dyskinesia indicates the entacapone dose is too low, so it should be increased"],
 ans:0,
 rat:{c:"Entacapone is a catechol-O-methyltransferase inhibitor that extends levodopa availability, so harmless brown-orange urine discoloration is expected and dyskinesia may worsen as more levodopa reaches the brain. The usual response is to reduce the levodopa dose rather than abandon the combination.",
  s:"Neither finding indicates liver failure, and stopping all Parkinson medication risks acute deterioration. The colour change is a known effect of the drug rather than evidence of poor absorption, and increasing entacapone would worsen the dyskinesia."} },

{id:"PHA-156", t:"single", cn:"PHA", sys:"NEURO", topic:"Amantadine adverse effects", d:3, b:0.55, cj:"evaluate", tags:["amantadine","livedo reticularis","renal dosing"],
 stem:"A client on amantadine for Parkinson disease develops a mottled purplish rash on the legs and increasing confusion. Renal function has declined. What does the nurse recognize?",
 opts:["Livedo reticularis is a recognized effect of the drug, while confusion in the context of reduced renal function suggests accumulation requiring dose review, since the drug is renally cleared",
  "Both findings are unrelated to the drug, since declining renal function does not affect amantadine and no change in therapy is required",
  "The rash indicates a life-threatening allergy requiring immediate cessation and emergency treatment",
  "The confusion indicates the dose is too low, since subtherapeutic levels cause cognitive symptoms"],
 ans:0,
 rat:{c:"Livedo reticularis is a characteristic and generally benign vascular effect of amantadine. The drug is renally excreted, so declining renal function leads to accumulation and anticholinergic-type confusion, which requires dose adjustment rather than an unrelated explanation.",
  s:"Both findings are plausibly drug-related and the second requires action. Livedo reticularis is not an allergic emergency, and confusion here reflects accumulation rather than insufficient dosing."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-122", t:"single", cn:"PAA", sys:"CV", topic:"Low-dose aspirin to prevent pre-eclampsia", d:3, b:0.55, cj:"act", tags:["low-dose aspirin","pre-eclampsia prevention","timing"],
 stem:"A client with a previous pregnancy affected by pre-eclampsia and a twin pregnancy attends her first antenatal visit at 10 weeks. What does the nurse anticipate?",
 opts:["Recommendation of low-dose aspirin started before 16 weeks and continued as directed, since starting early in the second trimester is what reduces the risk, and it is indicated by these risk factors",
  "No prophylaxis, since aspirin is contraindicated throughout pregnancy",
  "Full-dose aspirin, since a higher dose provides greater protection",
  "Starting aspirin only if blood pressure rises in later weeks, since prophylaxis has no value once risk factors are known"],
 ans:0,
 rat:{c:"Low-dose aspirin reduces the risk of pre-eclampsia in high-risk pregnancies, and the benefit depends on starting before around 16 weeks, before the placental vascular changes are established. Prior pre-eclampsia and multiple pregnancy are recognized indications.",
  s:"Low-dose aspirin is recommended rather than contraindicated in this setting. The prophylactic dose is deliberately low, and waiting for blood pressure to rise misses the window in which the intervention works."} },

{id:"PHA-157", t:"single", cn:"PHA", sys:"REN", topic:"ACE inhibitors in pregnancy", d:3, b:0.55, cj:"act", tags:["ACE inhibitor","pregnancy","fetal renal damage"],
 stem:"A client taking an angiotensin-converting enzyme inhibitor for hypertension reports a positive pregnancy test. What is the nurse's priority action?",
 opts:["Advise contacting the prescriber promptly to switch to an antihypertensive considered safer in pregnancy, since exposure in the second and third trimesters causes fetal renal damage, oligohydramnios, and skull defects",
  "Continue the medication unchanged, since stopping antihypertensive treatment is more dangerous than the drug",
  "Stop the medication without replacement, since any antihypertensive is harmful in pregnancy",
  "Halve the dose, since a lower exposure is safe throughout pregnancy"],
 ans:0,
 rat:{c:"These agents are contraindicated in pregnancy because second and third trimester exposure causes fetal renal failure, oligohydramnios, pulmonary hypoplasia, and skull ossification defects. The correct action is prompt substitution with a safer agent, not simply stopping, because uncontrolled hypertension is also dangerous.",
  s:"Continuing is not safer, since the fetal harm is well established. Stopping without replacement leaves hypertension untreated, which carries its own risk, and reducing the dose does not remove the teratogenic mechanism."} },

{id:"PHA-158", t:"single", cn:"PHA", sys:"NEURO", topic:"Valproate in pregnancy", d:3, b:0.55, cj:"act", tags:["valproate","neural tube defects","preconception"],
 stem:"A woman with epilepsy who is planning pregnancy takes valproate. What does the nurse understand?",
 opts:["Valproate carries a high risk of neural tube defects and neurodevelopmental harm, so a preconception review to consider an alternative and to start high-dose folic acid is needed, and the medication must not be stopped abruptly",
  "No change is needed, since seizure control outweighs any fetal risk and valproate is the safest option in pregnancy",
  "Stop the medication immediately, since any exposure is harmful and abrupt withdrawal is safe",
  "Continue unchanged but avoid folic acid, since it interferes with the drug's effectiveness"],
 ans:0,
 rat:{c:"Valproate has the highest teratogenic risk among commonly used antiepileptics, including neural tube defects and reduced cognitive outcome, so preconception substitution where possible and high-dose folic acid are indicated. Abrupt withdrawal risks seizures, which are themselves dangerous in pregnancy.",
  s:"It is not the safest option; it is the one with the greatest risk, which is why review is needed. Abrupt cessation can provoke seizures, and folic acid is specifically recommended rather than avoided."} },

{id:"PAA-125", t:"single", cn:"PAA", sys:"PSYCH", topic:"Perinatal depression versus baby blues", d:3, b:0.55, cj:"evaluate", tags:["perinatal depression","postpartum","screening"],
 stem:"A client four weeks after delivery reports persistent low mood, inability to enjoy the baby, guilt about not coping, and thoughts that the baby would be better off without her. What does the nurse recognize?",
 opts:["This exceeds the baby blues, which resolves within about two weeks, and the thoughts about the baby require urgent risk assessment and referral for perinatal mental health support",
  "This is the expected baby blues at four weeks and will resolve with rest, so the thoughts need no separate assessment",
  "This reflects sleep deprivation only, so no mental health referral is needed",
  "This is normal adjustment and should be revisited at the next routine appointment"],
 ans:0,
 rat:{c:"Baby blues peaks in the first days and resolves within about two weeks. Symptoms at four weeks with anhedonia, guilt, and thoughts that the baby would be better off indicate a depressive illness requiring assessment, and the content of those thoughts makes risk assessment urgent rather than routine.",
  s:"Timing and severity distinguish this from the blues, which would have resolved. Sleep deprivation contributes but does not account for the picture, and deferring to a routine appointment delays assessment of thoughts that require prompt evaluation."} },

/* ---------------- Reduction of Risk Potential (2) ---------------- */

{id:"RRP-119", t:"single", cn:"RRP", sys:"INTG", topic:"Care after a skin biopsy", d:3, b:0.55, cj:"generate", tags:["skin biopsy","wound care","infection signs"],
 stem:"A client has had a punch biopsy of a pigmented lesion with two sutures placed. What discharge teaching is required?",
 opts:["Keep the site clean and covered as directed, watch for increasing pain, redness, swelling, or discharge, return for suture removal at the specified time, and await the histology result before assuming the lesion was benign",
  "Remove the sutures at home after three days, since leaving them longer causes scarring",
  "Leave the wound open to the air after discharge, since dressings delay healing",
  "Assume the lesion was benign, since it was removed completely"],
 ans:0,
 rat:{c:"Post-biopsy care covers wound hygiene, recognition of infection, and timely suture removal by a clinician. The purpose of the biopsy is diagnosis, so the result determines whether further treatment is needed, and removal does not itself establish that the lesion was harmless.",
  s:"Sutures are removed by a clinician at the appropriate interval for the site, and early removal risks dehiscence. Keeping the wound covered supports healing rather than delaying it, and excision is not a diagnosis, since margins and depth come from the pathology report."} },

{id:"RRP-120", t:"single", cn:"RRP", sys:"INTG", topic:"Patch testing for contact dermatitis", d:3, b:0.55, cj:"act", tags:["patch testing","allergen","delayed reaction"],
 stem:"A client undergoes patch testing for suspected allergic contact dermatitis. What instruction is essential?",
 opts:["Keep the patches dry and in place until the scheduled removal, avoid sweating and strenuous activity, and return for the delayed reading, since a reaction may take days to appear and an early reading misses it",
  "Remove the patches at home after one day, since leaving them longer irritates the skin",
  "Shower normally, since water does not affect the patches",
  "Attend only the first reading, since a delayed reaction is not clinically meaningful"],
 ans:0,
 rat:{c:"Patch testing detects delayed hypersensitivity, so reactions develop over days and a second reading is essential. Moisture loosens the patches and sweating alters the reaction, which is why activity and washing are restricted until removal.",
  s:"Early removal prevents any reaction from developing. Water loosens the adhesive and can invalidate the test, and the delayed reading is often the one that identifies the allergen, so attending only the first is insufficient."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-124", t:"single", cn:"SIC", sys:"INF", topic:"Washer-disinfector use and limits", d:3, b:0.55, cj:"act", tags:["washer-disinfector","loading","inspection"],
 stem:"Instruments are loaded into a washer-disinfector. What practice is required for the cycle to be effective?",
 opts:["Load items so surfaces are exposed and not nested or overlapping, dismantle hinged instruments, and inspect every item afterward for retained soil, since the machine cannot clean what the spray cannot reach",
  "Stack instruments tightly, since a full load is more efficient and cleans equally well",
  "Leave hinged instruments closed, since opening them damages the joint",
  "Skip inspection, since the cycle validates itself"],
 ans:0,
 rat:{c:"Cleaning depends on the detergent and spray reaching every surface, so nested, overlapping, or closed instruments leave protected areas with retained soil. Dismantling hinges and inspecting the load afterward are essential steps rather than optional extras.",
  s:"Tight stacking shields surfaces and produces a visibly clean but contaminated instrument. Hinges must be opened to clean the joint, and inspection is the only way to detect failure, since a completed cycle does not confirm a clean result."} },

{id:"SIC-125", t:"single", cn:"SIC", sys:"INF", topic:"Glutaraldehyde high-level disinfection", d:3, b:0.55, cj:"act", tags:["glutaraldehyde","high-level disinfection","rinse"],
 stem:"An item is immersed in glutaraldehyde for high-level disinfection. What steps are essential?",
 opts:["Immerse fully for the validated contact time, then rinse thoroughly with sterile or filtered water to remove the toxic residue, using ventilation and personal protective equipment because the vapour irritates the respiratory tract",
  "Immerse briefly and rinse with tap water, since the residue is harmless to mucous membranes",
  "Use it without ventilation, since the vapour is not an occupational hazard",
  "Skip rinsing, since leaving the chemical on prolongs the disinfecting effect"],
 ans:0,
 rat:{c:"High-level disinfection requires full immersion for the specified time, and the chemical must then be rinsed off because glutaraldehyde residue is toxic to tissue. Its vapour is a recognized respiratory irritant and sensitizer, so ventilation and protective equipment are required.",
  s:"Short immersion does not achieve high-level disinfection, and tap water can reintroduce organisms and leaves toxic residue. The vapour is a documented occupational hazard, and leaving the chemical on the item transfers a tissue toxin to the client."} },

{id:"SIC-126", t:"single", cn:"SIC", sys:"INF", topic:"Steam quality and sterilization failure", d:3, b:0.55, cj:"evaluate", tags:["steam quality","wet steam","sterilization"],
 stem:"A sterilizer's loads are repeatedly failing biological indicators despite correct temperature and time readings. What should be suspected?",
 opts:["A problem with steam quality, since wet or superheated steam and air entrainment prevent the heat transfer that kills organisms, so the steam supply and the sterilizer itself must be investigated before further loads are processed",
  "Nothing, since correct temperature and time guarantee sterilization regardless of steam condition",
  "Only the biological indicator batch, since repeated failure is usually a manufacturing defect",
  "The arrangement of the loads only, since steam quality in the sterilizer cannot affect microbial kill"],
 ans:0,
 rat:{c:"Sterilization requires saturated steam at the right temperature in direct contact with the item. Wet steam carries excess moisture, superheated steam behaves like dry heat, and entrained air insulates, so any of these defeats the process even when the displayed parameters look correct.",
  s:"Temperature and time are necessary but not sufficient, which is exactly why biological indicators are used. Assuming a defective indicator ignores a pattern that points at the process, and load arrangement is one contributor among several rather than the only possibility."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-090", t:"single", cn:"BCC", sys:"NEURO", topic:"Biofeedback", d:2, b:0.45, cj:"generate", tags:["biofeedback","self-regulation","teaching"],
 stem:"A client with tension headaches asks how biofeedback works. What is the nurse's explanation?",
 opts:["Sensors show a physiological signal such as muscle tension or skin temperature on a screen, so the client learns to recognize and deliberately change it, building a skill they can then use without the equipment",
  "The machine reduces muscle tension directly by delivering electrical stimulation to the muscles",
  "It works by relaxing the client through suggestion while they are unaware of the process",
  "It is a diagnostic test that identifies which muscle is causing the headache"],
 ans:0,
 rat:{c:"Biofeedback makes an involuntary physiological process visible so the client can learn voluntary control over it. The learning is the treatment, which is why the skill transfers to situations where no equipment is available.",
  s:"The device measures rather than stimulates. The client is fully aware and actively involved, which distinguishes it from suggestion-based approaches, and it is a training method rather than a diagnostic test."} },

{id:"BCC-091", t:"single", cn:"BCC", sys:"INTG", topic:"Aromatherapy safety", d:2, b:0.45, cj:"act", tags:["aromatherapy","essential oils","safety"],
 stem:"A client wishes to use essential oils alongside their hospital treatment. What safety points apply?",
 opts:["Essential oils are diluted before skin contact, never ingested, checked for allergy and interaction with the client's condition and treatment, and used in a way that does not affect others sharing the space",
  "They may be taken orally in small amounts, since natural products are safe to swallow",
  "They are applied undiluted, since dilution removes the therapeutic effect",
  "Essential oils require no checking, since being natural means they cannot interact with treatment"],
 ans:0,
 rat:{c:"Essential oils are concentrated and can cause skin sensitization and systemic effects, so they are diluted, not ingested, and checked against the client's condition and medication. In a shared clinical space, other patients may be affected by airborne exposure.",
  s:"Ingestion of essential oils can cause serious toxicity. Undiluted application causes irritation and sensitization rather than better effect, and natural origin does not prevent pharmacological interaction or allergy."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-096", t:"single", cn:"HPM", sys:"RESP", topic:"Smoke alarm placement and maintenance", d:3, b:0.55, cj:"generate", tags:["smoke alarm","fire prevention","maintenance"],
 stem:"A client asks how to protect their household from fire while sleeping. What advice is most effective?",
 opts:["Install alarms inside each bedroom and outside every sleeping area plus on each level, test them monthly, replace batteries as needed and the units at the manufacturer's interval, and plan and practise an escape route",
  "Install one alarm in the hallway outside the sleeping areas, since smoke spreads evenly and one detector covers the house",
  "Test the alarms annually, since they rarely fail between checks",
  "Rely on the smell of smoke to wake the household, since sleep does not blunt that sense"],
 ans:0,
 rat:{c:"Most fire deaths occur at night, so alarms must be close enough to sleeping areas to be heard through closed doors, and they must be tested monthly because a failed alarm provides no warning. An escape plan practised in advance is what turns a warning into a safe exit.",
  s:"A single hallway alarm may not be heard through closed bedroom doors. Alarms fail silently, which is why monthly testing is specified, and sleep profoundly reduces the ability to detect smoke by smell, which is the reason alarms exist."} }
  );
})();
