/* Wave 16 — 20 hand-authored hard RN items.
 * Pharmacology is the largest area still under its blueprint share at
 * 15.2% against 16%, and the verified-uncovered oncology and antimicrobial
 * pool is deep, so wave 16 leads with it. Management of Care, Safety and
 * Reduction of Risk remain under target and follow.
 * Every item is d>=2; 14 of the 20 are d=3.
 *
 * Pharmacology        : PHA-106 – PHA-111
 * Management of Care  : MOC-112 – MOC-115
 * Safety              : SIC-084 – SIC-087
 * Reduction of Risk   : RRP-084 – RRP-086
 * Health Promotion    : HPM-063 – HPM-064
 * Basic Care/Comfort  : BCC-064
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (6) ---------------- */

{id:"PHA-106", t:"single", cn:"PHA", sys:"GI", topic:"Early versus late irinotecan diarrhea", d:3, b:0.55, cj:"prioritize", tags:["irinotecan","chemotherapy","cholinergic reaction"],
 stem:"A client develops abdominal cramping, sweating, and loose stools shortly after an irinotecan infusion begins. What should the nurse do first?",
 opts:["Administer the prescribed atropine, because cramping and sweating this soon after starting indicate a cholinergic reaction rather than delayed diarrhea",
  "Give loperamide and continue the infusion, since cramping and loose stools are expected with this drug",
  "Stop the drug permanently, because sweating indicates an allergy to it",
  "Give an antiemetic and reassess in an hour, since loose stools usually settle on their own"],
 ans:0,
 rat:{c:"Irinotecan causes two distinct syndromes. Early onset within 24 hours is cholinergic, presenting with cramping, diaphoresis, flushing, salivation, and lacrimation alongside diarrhea, and it responds to atropine. Late onset after 24 hours is secretory and is treated with an aggressive antimotility regimen.",
  s:"An antimotility agent treats the delayed secretory form and does nothing for a cholinergic reaction. The presentation is a known drug effect rather than an allergy, so permanent discontinuation is not indicated. Waiting allows dehydration and hemodynamic instability to develop."} },

{id:"PHA-107", t:"single", cn:"PHA", sys:"NEURO", topic:"Oxaliplatin cold-triggered neuropathy", d:3, b:0.55, cj:"analyze", tags:["oxaliplatin","neuropathy","cold sensitivity"],
 stem:"A client receiving oxaliplatin reports tingling in the hands and a sensation of the throat closing after drinking iced water. There is no stridor, wheeze, or rash. What should the nurse do?",
 opts:["Instruct the client to avoid cold drinks and cold exposure, because this drug causes an acute cold-triggered neuropathy that is not an allergic reaction",
  "Stop the drug and prepare epinephrine, because throat tightness indicates anaphylaxis",
  "Reassure the client that the sensation is anxiety related and continue without changes",
  "Request a swallowing study, because throat tightness suggests a new neurologic deficit"],
 ans:0,
 rat:{c:"Oxaliplatin produces an acute, reversible peripheral neuropathy triggered or worsened by cold, affecting the hands, feet, and the perioral and pharyngolaryngeal areas, often described as throat tightness without true airway obstruction. Management is cold avoidance, not discontinuation.",
  s:"Absent stridor, wheeze, and rash makes anaphylaxis unlikely, and stopping an effective drug over an expected effect harms the client. Dismissing a real and distressing drug effect as anxiety ignores the cause, and a swallowing study does not address a sensory symptom."} },

{id:"PHA-108", t:"single", cn:"PHA", sys:"GI", topic:"Immune-mediated colitis from a checkpoint inhibitor", d:3, b:0.55, cj:"prioritize", tags:["checkpoint inhibitor","immunotherapy","immune-related adverse event"],
 stem:"A client on pembrolizumab reports eight bloody stools a day and abdominal cramping that began three weeks after the last dose. What should the nurse anticipate?",
 opts:["Holding the drug and starting corticosteroids, because immune-mediated colitis is treated by suppressing the immune response rather than by symptom control alone",
  "Starting an antibiotic, because bloody stools indicate a bacterial infection",
  "Giving an antimotility agent and resuming the next dose, since diarrhea is self-limiting",
  "Reassuring the client, because adverse effects of this drug occur only during the infusion"],
 ans:0,
 rat:{c:"Checkpoint inhibitors release T-cell restraint and can inflame any organ. Immune-mediated colitis appears weeks to months after dosing with diarrhea, blood, and cramping, and requires holding the drug plus corticosteroids. Delay risks perforation.",
  s:"Infection must be excluded, but empiric antibiotics do not treat immune colitis, and bloody diarrhea of this volume is not self-limiting. Immune-related events are characteristically delayed rather than infusion related."} },

{id:"PHA-109", t:"single", cn:"PHA", sys:"RESP", topic:"Bleomycin exposure and later anesthesia", d:3, b:0.55, cj:"act", tags:["bleomycin","pulmonary toxicity","oxygen"],
 stem:"A client who completed bleomycin therapy six months ago is scheduled for surgery and reports a dry cough with mild exertional shortness of breath. What is the priority nursing action?",
 opts:["Report the symptoms and the drug history to the anesthesiologist, because prior exposure raises the risk of oxygen-related lung injury during anesthesia",
  "Reassure the client, since a dry cough after chemotherapy is expected and self-limiting",
  "Request an antibiotic, because the symptoms suggest a post-treatment infection",
  "Advise the client to postpone the surgery until the cough resolves on its own"],
 ans:0,
 rat:{c:"Bleomycin causes dose-related pulmonary toxicity that can progress to fibrosis and may be acutely worsened by high inspired oxygen concentrations during later anesthesia. The anesthesia team needs the exposure history to titrate oxygen, and new dyspnea needs evaluation.",
  s:"A dry cough with exertional dyspnea after bleomycin is a toxicity signal rather than a benign finding. Empiric antibiotics do not treat drug-induced lung injury, and unilateral postponement ignores that the surgical team can plan safely with the information."} },

{id:"PHA-110", t:"single", cn:"PHA", sys:"PSYCH", topic:"Timing of buprenorphine induction", d:3, b:0.55, cj:"prioritize", tags:["buprenorphine","opioid use disorder","precipitated withdrawal"],
 stem:"A client dependent on heroin requests buprenorphine this morning and reports using heroin four hours ago. What should the nurse anticipate?",
 opts:["Delaying the first dose until objective withdrawal signs appear, because early dosing displaces the full agonist and precipitates withdrawal",
  "Giving the dose immediately, since earlier treatment reduces the risk of relapse",
  "Giving a full agonist instead, because buprenorphine is ineffective for opioid dependence",
  "Giving half the dose, since a smaller amount cannot precipitate withdrawal"],
 ans:0,
 rat:{c:"Buprenorphine binds opioid receptors tightly but activates them only partially. Given while a full agonist is still bound, it displaces that agonist and abruptly lowers opioid effect, precipitating severe withdrawal. Induction waits for measurable withdrawal signs.",
  s:"Speed does not outweigh precipitating an acute crisis, which often drives the client back to illicit use. Buprenorphine is well-established treatment, and any dose large enough to occupy receptors can displace a full agonist."} },

{id:"PHA-111", t:"single", cn:"PHA", sys:"CV", topic:"Macrolide interaction with a statin", d:3, b:0.55, cj:"generate", tags:["drug interaction","CYP3A4","rhabdomyolysis"],
 stem:"A client who takes simvastatin daily is prescribed clarithromycin for a respiratory infection. What should the nurse do?",
 opts:["Contact the prescriber, because the antibiotic inhibits the enzyme that clears the statin and raises the risk of muscle injury",
  "Administer both as prescribed, since a short antibiotic course does not interact",
  "Double the statin dose, since infection increases cholesterol production",
  "Space the two drugs twelve hours apart, since separation prevents the interaction"],
 ans:0,
 rat:{c:"Clarithromycin is a strong inhibitor of CYP3A4 and simvastatin is a substrate of that enzyme, so co-administration sharply raises statin exposure and the risk of myopathy and rhabdomyolysis. The statin is usually held during the antibiotic course or a different antibiotic is chosen.",
  s:"Interaction risk depends on enzyme inhibition, not on how many days the antibiotic is taken. Increasing the statin would worsen the hazard, and spacing doses does not overcome sustained metabolic inhibition."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-112", t:"single", cn:"MOC", sys:"REPI", topic:"Preserving forensic evidence after sexual assault", d:3, b:0.55, cj:"prioritize", tags:["forensic evidence","chain of custody","sexual assault"],
 stem:"A client arrives after a sexual assault and has not yet been examined. What should the nurse do first to preserve forensic evidence?",
 opts:["Discourage showering, changing clothes, or eating and drinking, and store any collected clothing in paper bags with a documented chain of custody",
  "Allow the client to shower first, since comfort takes priority over evidence collection",
  "Place any collected clothing in a plastic bag to keep it sealed from contamination",
  "Cut away clothing quickly to speed the examination, including through any tears"],
 ans:0,
 rat:{c:"Trace evidence is destroyed by washing and degraded by moisture, so paper rather than plastic is used for storage. Every transfer is recorded to keep an unbroken chain of custody, and cutting through damage destroys evidence of how clothing was removed.",
  s:"Showering destroys evidence permanently. Plastic retains humidity and accelerates degradation of biological material. Cutting through tears or defects destroys evidence of forcible removal; if removal is needed, clothing is cut along seams."} },

{id:"MOC-113", t:"single", cn:"MOC", sys:"INTG", topic:"Conscientious objection and continuity of care", d:3, b:0.55, cj:"act", tags:["conscientious objection","professional responsibility","continuity"],
 stem:"A nurse objects on moral grounds to participating in a scheduled procedure and has not yet told anyone. What is the nurse's obligation?",
 opts:["Notify the manager promptly so coverage can be arranged, and continue caring for the client until relieved, since objection does not permit abandonment",
  "Refuse immediately and leave the unit, since a moral objection overrides any duty to the client",
  "Participate without raising the objection, since personal beliefs have no place in professional practice",
  "Tell the client about the objection and ask the client to choose a different nurse"],
 ans:0,
 rat:{c:"Conscientious objection is generally respected, but it must be raised in advance so care can be reassigned, and the nurse stays responsible for the client's safety until a qualified colleague takes over. In an emergency the objection is set aside.",
  s:"Walking out abandons the client. Suppressing the objection until it produces an unsafe situation helps no one. Placing the burden on a vulnerable client is inappropriate and does not discharge the duty to notify the manager."} },

{id:"MOC-114", t:"single", cn:"MOC", sys:"RESP", topic:"Accepting a floated assignment outside one's experience", d:2, b:0.45, cj:"act", tags:["competency","scope of practice","staffing"],
 stem:"A medical-surgical nurse is floated to a cardiac step-down unit and assigned a client with a newly inserted chest tube. The nurse has never managed one. What should the nurse do?",
 opts:["Accept the assignment but tell the charge nurse about the gap, ask for orientation and support, and decline procedures beyond demonstrated competency",
  "Refuse the assignment outright and leave the unit, since working outside one's experience is unsafe",
  "Accept and manage the client without disclosing anything, to avoid appearing incompetent",
  "Ask the client's family member, who works in healthcare, to help with the chest tube"],
 ans:0,
 rat:{c:"Floating is an accepted staffing practice, but the nurse must disclose competency gaps so the unit can provide orientation and backup. Accepting a client is not the same as accepting procedures one has not been trained or validated to perform.",
  s:"Blanket refusal abandons both the unit and the client. Concealing the gap puts the client at risk and leaves the nurse personally accountable. A family member is never a substitute for a qualified clinician."} },

{id:"MOC-115", t:"single", cn:"MOC", sys:"INTG", topic:"Accountability for copied documentation", d:2, b:0.45, cj:"evaluate", tags:["documentation","health record","accountability"],
 stem:"A nurse copies a previous shift's assessment forward and signs it without rereading. The copied entry states the peripheral IV is in the left arm, but it is actually in the right arm. What does this represent?",
 opts:["A documentation error the copying nurse is accountable for, because copied content must be verified as accurate before it is signed",
  "No error at all, since the original author remains solely responsible for anything copied forward",
  "An acceptable time-saving practice, since copying prevents transcription mistakes",
  "An error that belongs to the information technology department, since the system allowed the copy"],
 ans:0,
 rat:{c:"Copying forward carries the real risk that stale or incorrect data is propagated and then relied on by others. A clinician who signs an entry attests to its accuracy, so verification before signing is a personal accountability rather than a system feature.",
  s:"Original authorship does not transfer accountability for a later signature. Copying saves time but propagates errors silently, and blaming the system ignores that the clinician chose to copy without verifying."} },

/* ---------------- Safety and Infection Control (4) ---------------- */

{id:"SIC-084", t:"single", cn:"SIC", sys:"INTG", topic:"Varicella exposure in a susceptible healthcare worker", d:3, b:0.55, cj:"act", tags:["varicella","occupational exposure","post-exposure prophylaxis"],
 stem:"A nurse with no history of chickenpox and no vaccination record cared for a client who developed a varicella rash two days later. What should the nurse do?",
 opts:["Report the exposure to occupational health immediately for immune status review and post-exposure management, and avoid assignment to clients with varicella or zoster",
  "Continue all assignments, since adults rarely develop chickenpox",
  "Request prophylactic antibiotics, since they prevent varicella after exposure",
  "Take leave for two weeks, since the incubation period is short and predictable"],
 ans:0,
 rat:{c:"Susceptible healthcare workers exposed to varicella need immune status confirmed and post-exposure prophylaxis considered. The virus spreads by airborne and contact routes, so a susceptible worker should not be assigned to affected clients.",
  s:"Adult varicella tends to be more severe rather than rare. Antibiotics have no effect on a virus. The incubation period varies and can extend beyond two weeks, so a fixed leave length is unreliable."} },

{id:"SIC-085", t:"single", cn:"SIC", sys:"REPI", topic:"Parvovirus B19 exposure during pregnancy", d:3, b:0.55, cj:"prioritize", tags:["parvovirus B19","occupational exposure","pregnancy"],
 stem:"A nurse at 14 weeks gestation cared for a child with a slapped-cheek rash before the diagnosis was known. What should the nurse do?",
 opts:["Notify occupational health and the obstetric provider promptly, because parvovirus B19 in pregnancy can cause fetal anemia and hydrops",
  "Take no action, since fifth disease is a mild childhood illness with no adult significance",
  "Stop working immediately for the rest of the pregnancy to eliminate any risk",
  "Request an antibiotic, since early treatment prevents fetal transmission"],
 ans:0,
 rat:{c:"Parvovirus B19 suppresses red cell production. Infection in pregnancy, particularly in the first half, can lead to fetal anemia, hydrops fetalis, and loss, so prompt serologic assessment and fetal monitoring are indicated.",
  s:"Mild maternal illness does not mean low fetal risk. Withdrawing from work for the remainder of the pregnancy is unnecessary once the exposure is assessed, and antibiotics do not act on this virus."} },

{id:"SIC-086", t:"single", cn:"SIC", sys:"INTG", topic:"Precautions for disseminated zoster", d:2, b:0.45, cj:"analyze", tags:["herpes zoster","transmission-based precautions","immunocompromise"],
 stem:"An immunocompromised client develops vesicular lesions scattered across several dermatomes on both sides of the body. What precautions should the nurse implement?",
 opts:["Airborne and contact precautions in a negative-pressure room, because disseminated zoster spreads like varicella until the lesions crust",
  "Standard precautions with the lesions covered, since shingles is only locally contagious",
  "Droplet precautions alone, since the virus travels only short distances in droplets",
  "Contact precautions alone, since the lesions are the sole source of virus"],
 ans:0,
 rat:{c:"Localized zoster in an immunocompetent client needs only lesion covering with standard precautions. Disseminated disease, or localized disease in an immunocompromised client, behaves like varicella and requires airborne plus contact precautions until every lesion has crusted.",
  s:"Covering lesions suffices only for localized disease in an immunocompetent host. Disseminated zoster can become airborne, and contact precautions alone miss aerosolized virus shed from the lesions."} },

{id:"SIC-087", t:"single", cn:"SIC", sys:"INTG", topic:"Managing a scabies infestation in a facility", d:2, b:0.45, cj:"generate", tags:["scabies","infestation","environmental control"],
 stem:"A client in a long-term care facility is diagnosed with scabies. What should the nurse include in the plan?",
 opts:["Treat the client and all close contacts at the same time, and bag clothing and linens used in the previous three days for hot washing or sealing",
  "Treat only the client, since contacts are infectious only after they develop itching",
  "Apply treatment from the neck down only, since scabies never involves the head in adults",
  "Discard all bedding, since the mites survive indefinitely away from skin"],
 ans:0,
 rat:{c:"Scabies spreads through prolonged skin contact, and infested contacts can transmit before symptoms appear, so simultaneous treatment prevents reinfestation. Topical treatment covers the whole body, and recently used items are laundered hot or sealed for several days.",
  s:"Contacts are contagious before itching begins, so treating only the symptomatic client guarantees reinfestation. Adult infestation can involve the scalp, and mites survive off the host only a few days, so discarding bedding is unnecessary."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-084", t:"single", cn:"RRP", sys:"CV", topic:"Interpreting a high ankle-brachial index", d:3, b:0.55, cj:"evaluate", tags:["ankle-brachial index","peripheral arterial disease","calcification"],
 stem:"A client with diabetes reports calf pain on walking and has an ankle-brachial index of 1.35. How should the nurse interpret this result?",
 opts:["The value is falsely elevated by calcified, noncompressible arteries, so further vascular testing such as a toe-brachial index is needed",
  "The index value is normal, so peripheral arterial disease is excluded despite the symptoms",
  "The value indicates severe arterial disease, so compression therapy should begin immediately",
  "The value reflects venous insufficiency, so leg elevation is the appropriate treatment"],
 ans:0,
 rat:{c:"An index above 1.30 indicates noncompressible, calcified vessels, common in diabetes and chronic kidney disease, which produces a falsely normal or high reading. Symptoms with a high index warrant toe-brachial pressure or another vascular study.",
  s:"A high index does not exclude disease, and compression is contraindicated when significant arterial disease is present. The value reflects arterial calcification rather than venous disease, and elevation would worsen arterial insufficiency."} },

{id:"RRP-085", t:"single", cn:"RRP", sys:"CV", topic:"Teaching before a transesophageal echocardiogram", d:2, b:0.45, cj:"generate", tags:["transesophageal echocardiogram","aspiration","pre-procedure"],
 stem:"A client is scheduled for a transesophageal echocardiogram. What teaching should the nurse provide?",
 opts:["Nothing by mouth for the required fasting period beforehand, and nothing to eat or drink afterward until the gag reflex returns",
  "Eat a light breakfast beforehand, since the probe does not pass beyond the throat",
  "Expect to be fully awake and able to speak freely throughout the procedure",
  "Resume a normal diet immediately afterward, since the throat anesthetic wears off quickly"],
 ans:0,
 rat:{c:"The probe passes through the oropharynx into the esophagus, so fasting reduces aspiration risk, and the throat is anesthetized. Oral intake resumes only once the gag reflex returns.",
  s:"The probe does enter the esophagus, so fasting is essential. Sedation is used and the probe prevents free speech. Resuming intake before the gag reflex returns risks aspiration."} },

{id:"RRP-086", t:"single", cn:"RRP", sys:"CV", topic:"Driveline infection in a ventricular assist device", d:3, b:0.55, cj:"prioritize", tags:["ventricular assist device","driveline","infection"],
 stem:"A client with a left ventricular assist device has redness and drainage at the driveline exit site and a temperature of 38.4°C. What should the nurse do?",
 opts:["Treat it as urgent, notify the device team, and maintain strict sterile technique during dressing changes, since driveline infection can progress to bloodstream infection",
  "Apply a topical antibiotic and reassess at the next device clinic visit, since exit-site redness is common",
  "Soak the site in warm water to loosen the drainage before redressing",
  "Increase traction on the driveline to drain the accumulated fluid"],
 ans:0,
 rat:{c:"The driveline is a permanent percutaneous conduit, so exit-site infection can ascend and produce serious bloodstream or device infection. Fever with local signs requires prompt device-team involvement and meticulous sterile dressing technique.",
  s:"Fever with exit-site change is not a routine finding to defer to a routine visit. The site must never be submerged, and pulling on the driveline risks displacement and tissue injury rather than drainage."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-063", t:"single", cn:"HPM", sys:"REPI", topic:"Pertussis vaccination in each pregnancy", d:2, b:0.45, cj:"analyze", tags:["pertussis","vaccination in pregnancy","passive immunity"],
 stem:"A client at 29 weeks gestation reports receiving a tetanus booster two years ago during her last pregnancy. What should the nurse recommend?",
 opts:["Receive the pertussis-containing vaccine again during this pregnancy, since protection does not carry over between pregnancies",
  "Skip the vaccine, since a booster within the past ten years is sufficient",
  "Wait until after delivery, since vaccination during pregnancy is contraindicated",
  "Vaccinate the newborn immediately at birth instead"],
 ans:0,
 rat:{c:"The pertussis-containing vaccine is recommended during every pregnancy, ideally between 27 and 36 weeks, so that maternal antibody crosses the placenta and protects the infant until the infant's own series begins.",
  s:"A prior dose does not provide adequate passive protection for this infant. Pregnancy is the indication rather than a contraindication, and newborns cannot receive pertussis vaccine at birth."} },

{id:"HPM-064", t:"single", cn:"HPM", sys:"HEME", topic:"Infection prevention after splenectomy", d:3, b:0.55, cj:"generate", tags:["asplenia","encapsulated organisms","overwhelming infection"],
 stem:"A client recovering from splenectomy after trauma asks how to prevent serious infection. What teaching is the priority?",
 opts:["Receive vaccines against encapsulated organisms, get annual influenza vaccination, and seek urgent care for any fever, since infection can progress rapidly",
  "Take a daily multivitamin, since the spleen's role in fighting infection is easily replaced",
  "Avoid all vaccines, since the immune system is already overstressed after surgery",
  "Take antibiotics only if a fever lasts more than three days"],
 ans:0,
 rat:{c:"The spleen clears encapsulated bacteria, so its loss creates lifelong risk of overwhelming infection from pneumococcus, Haemophilus influenzae type b, and meningococcus. Vaccination, annual influenza vaccine, and immediate evaluation of any fever are core measures.",
  s:"No supplement replaces splenic immune function. Vaccination is essential rather than contraindicated, and waiting three days with a fever risks death from rapidly progressive sepsis."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-064", t:"single", cn:"BCC", sys:"NEURO", topic:"Aspiration precautions during meals", d:3, b:0.55, cj:"act", tags:["dysphagia","aspiration","positioning"],
 stem:"A client with dysphagia after stroke is cleared for thickened liquids and a pureed diet. What should the nurse do during meals?",
 opts:["Position the client upright at 90 degrees, offer small amounts with a chin-tuck swallow, and keep the client upright for at least 30 minutes afterward",
  "Position the client flat to reduce effort, since sitting upright tires a client with dysphagia",
  "Offer thin liquids between bites to help clear the pureed food from the mouth",
  "Use a straw, since it controls the volume delivered to the throat"],
 ans:0,
 rat:{c:"Upright positioning uses gravity to move food downward and reduces pooling of residue, the chin tuck narrows the airway entrance, and staying upright afterward prevents reflux of retained material. Small controlled boluses lower aspiration risk.",
  s:"A flat position removes gravity's protection and increases aspiration. Thin liquids are the hardest to control and are excluded for that reason, and a straw delivers fluid rapidly to the back of the mouth, bypassing oral control."} }
  );
})();
