/* Wave 13 — 20 hand-authored hard RN items.
 * Health Promotion and Maintenance (43% hard) and Basic Care and Comfort
 * (50% hard) are the two softest clientNeed areas on difficulty, so wave 13
 * is weighted toward them, with Pharmacological Therapies and Physiological
 * Adaptation filling the remaining under-target share.
 * Every item is difficulty 2 or 3; 10 of the 20 are d=3.
 *
 * Health Promotion    : HPM-055 – HPM-060
 * Basic Care/Comfort  : BCC-055 – BCC-059
 * Pharmacology        : PHA-099 – PHA-103
 * Physiological Adapt.: PAA-095 – PAA-096
 * Safety              : SIC-074
 * Management of Care  : MOC-104
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Health Promotion and Maintenance (6) ---------------- */

{id:"HPM-055", t:"single", cn:"HPM", sys:"REPI", topic:"Phototherapy for neonatal hyperbilirubinemia", d:3, b:0.55, cj:"analyze", tags:["newborn","jaundice","phototherapy"],
 stem:"A 2-day-old term newborn has a total serum bilirubin of 15.2 mg/dL and is started on phototherapy. The nurse is planning care. Which action belongs in the plan of care?",
 opts:["Keep the newborn undressed except for a diaper and protective eye shields during phototherapy, and monitor temperature and hydration closely",
  "Apply sunscreen to exposed skin to prevent burns from the phototherapy lights",
  "Interrupt phototherapy for one hour every four hours to allow feeding",
  "Cover the newborn with a light blanket to prevent chilling under the lights"],
 ans:0,
 rat:{c:"Phototherapy works by photoisomerizing bilirubin in the skin, so maximum skin exposure with eye protection is required. Newborns under phototherapy have increased insensible water loss and require close temperature and hydration monitoring.",
  s:"Sunscreen blocks the very wavelength that treats the bilirubin. Covering the newborn defeats the therapy. Feeding should be on demand and encouraged rather than scheduled away from the lights, because feeding promotes bilirubin excretion."} },

{id:"HPM-056", t:"single", cn:"HPM", sys:"REPI", topic:"Expressed breast milk storage and thawing", d:2, b:0.45, cj:"generate", tags:["breastfeeding","newborn","teaching"],
 stem:"A parent of a preterm newborn in the neonatal intensive care unit asks how expressed breast milk should be stored and thawed for later feeding. What should the nurse teach?",
 opts:["Refrigerate freshly expressed milk for up to 4 days, thaw frozen milk in the refrigerator or under warm running water, and never use a microwave",
  "Store freshly expressed milk at room temperature for up to 48 hours before refrigerating",
  "Thaw frozen milk in a microwave on a low setting and shake well before feeding",
  "Refreeze thawed milk if the feeding is not finished within one hour"],
 ans:0,
 rat:{c:"Refrigerated freshly expressed milk is safe for about 4 days. Thawing in the refrigerator or under warm running water preserves the immunologic components, while microwaving creates hot spots and destroys those components. Once thawed, milk must not be refrozen.",
  s:"Room-temperature storage beyond about 4 hours is unsafe. Microwaving is contraindicated for human milk. Refreezing thawed milk permits bacterial growth and further degrades the protective factors."} },

{id:"HPM-057", t:"single", cn:"HPM", sys:"REPI", topic:"Circumcision home care with a Plastibell", d:2, b:0.45, cj:"act", tags:["newborn","post-procedure","teaching"],
 stem:"A newborn has just undergone circumcision with a Plastibell device. The nurse is teaching the parent about home care. What should be included?",
 opts:["Expect the plastic ring to fall off on its own within about a week, and report bleeding that soaks the diaper or foul-smelling drainage",
  "Remove the plastic ring at home after 48 hours to prevent it from becoming embedded",
  "Clean the site with alcohol wipes after each diaper change until it is fully healed",
  "Apply a tight diaper so the dressing stays in place over the site"],
 ans:0,
 rat:{c:"With a Plastibell the ring sloughs off spontaneously in 5 to 8 days. Parents monitor for bleeding and infection and never remove the ring, because doing so can cause hemorrhage.",
  s:"Removing the ring early can cause significant bleeding. Alcohol is irritating to a healing site. A tight diaper increases pressure and friction on the wound."} },

{id:"HPM-058", t:"single", cn:"HPM", sys:"HEME", topic:"Parental refusal of newborn vitamin K", d:3, b:0.55, cj:"analyze", tags:["newborn","vitamin K","refusal","teaching"],
 stem:"A parent declines the intramuscular vitamin K injection for their newborn, stating that they have read it causes leukemia. The newborn is 2 hours old and otherwise well. What is the nurse's best response?",
 opts:["Explain that newborns are born with low vitamin K stores and that without prophylaxis there is a real risk of bleeding, and that the leukemia link has not been supported by evidence",
  "Accept the refusal and document it, because the parent has the right to decline prophylaxis",
  "Offer oral vitamin K as an equally effective alternative that avoids the leukemia risk of the injection",
  "Inform the parent that the injection is required by law and cannot be declined"],
 ans:0,
 rat:{c:"Newborns have low vitamin K stores and a sterile gut, so they carry genuine risk of vitamin K deficiency bleeding, which can be intracranial. The leukemia association traces to a single 1990 study that has not been replicated. Accurate teaching corrects the misconception while still respecting the parent.",
  s:"Simply accepting the refusal leaves the newborn unprotected when teaching might change the decision. Oral vitamin K is less reliable than the intramuscular route, particularly for late bleeding. The injection is strongly recommended but is not universally mandated by statute."} },

{id:"HPM-059", t:"single", cn:"HPM", sys:"REPI", topic:"Ocular prophylaxis administration technique", d:2, b:0.45, cj:"act", tags:["newborn","erythromycin","medication administration"],
 stem:"A nurse is preparing to administer erythromycin ophthalmic ointment to a newborn for ocular prophylaxis. What is the correct technique?",
 opts:["Apply a thin ribbon of ointment into the lower conjunctival sac of each eye from the inner to the outer canthus without touching the eye",
  "Instill the ointment directly onto the cornea to ensure even coverage",
  "Wipe excess ointment from the eye immediately after instillation so the newborn can see",
  "Administer the ointment only to the eye with visible discharge"],
 ans:0,
 rat:{c:"The ointment is placed into the lower conjunctival sac from inner to outer canthus without the tip touching the eye. It is given bilaterally to prevent gonococcal ophthalmia neonatorum, and excess is not wiped away because contact time matters.",
  s:"The cornea must not be touched. Wiping removes the medication before it can act. Both eyes are treated regardless of appearance, since prophylaxis is preventive rather than therapeutic."} },

{id:"HPM-060", t:"single", cn:"HPM", sys:"INF", topic:"Potentially inappropriate medications in older adults", d:3, b:0.55, cj:"analyze", tags:["older adult","polypharmacy","falls"],
 stem:"An 82-year-old client takes 14 prescription medications and reports daytime drowsiness, unsteadiness, and two recent falls. The list includes a benzodiazepine prescribed for sleep and a first-generation antihistamine for allergies. What does the nurse recognize as the priority concern?",
 opts:["Both the benzodiazepine and the antihistamine are potentially inappropriate in an older adult and are contributing to the falls, so the regimen needs review with the prescriber",
  "The falls are an expected part of aging in an older adult and require no change to the medication regimen",
  "Only the benzodiazepine is a concern, because an antihistamine does not affect balance",
  "The client should be prescribed a stronger sedative so that nighttime wandering stops"],
 ans:0,
 rat:{c:"Beers criteria identify benzodiazepines and first-generation antihistamines as potentially inappropriate in older adults because of sedation, anticholinergic burden, and fall risk. Polypharmacy compounds the effect, and the correct action is a deprescribing review.",
  s:"Falls in an older adult taking sedating medications are not normal aging. First-generation antihistamines carry significant anticholinergic and sedating effects. Adding another sedative worsens the problem it is meant to solve."} },

/* ---------------- Basic Care and Comfort (5) ---------------- */

{id:"BCC-055", t:"single", cn:"BCC", sys:"NEURO", topic:"Sensory overload in the intensive care unit", d:3, b:0.55, cj:"generate", tags:["ICU","delirium","sleep","non-pharmacological"],
 stem:"A client on day 4 of mechanical ventilation in the intensive care unit becomes agitated, pulls at lines, and reports that the alarms and lights never stop. The client is oriented when the noise subsides. What intervention should the nurse add to the plan of care?",
 opts:["Cluster care to allow uninterrupted rest periods, reduce alarm volume where safe, dim lights at night, and orient the client to time and place",
  "Apply soft wrist restraints so the client cannot pull at the lines",
  "Request a sedative infusion so the client no longer notices the alarms or the environment",
  "Keep the lights on brightly at all times so the client stays oriented to the surroundings"],
 ans:0,
 rat:{c:"Intensive care sensory overload and sleep fragmentation drive delirium and agitation. Non-pharmacologic measures — clustering care, reducing noise and light, and reorientation — treat the cause rather than the behavior.",
  s:"Restraints increase agitation and are a last resort. Continuous sedation prolongs ventilation and worsens delirium. Constant bright light abolishes the day-night cues that orientation depends on."} },

{id:"BCC-056", t:"single", cn:"BCC", sys:"GI", topic:"Denture care for a drowsy client", d:2, b:0.45, cj:"act", tags:["oral hygiene","aspiration","older adult"],
 stem:"An older adult client who wears full upper and lower dentures is admitted to the unit. The client is drowsy after a procedure and will be resting. What action should the nurse take with the dentures?",
 opts:["Remove the dentures, clean them with a denture brush over a filled basin, label the container, and store them in the client's room",
  "Leave the dentures in place so the client's airway remains supported",
  "Wrap the dentures in a tissue and place them on the bedside table for the shift",
  "Soak the dentures in hot water to disinfect them before storing them"],
 ans:0,
 rat:{c:"Dentures in a drowsy client are an aspiration risk and must be removed. They are cleaned over a filled basin or towel so a drop does not crack them, then labeled and stored where the client can reach them.",
  s:"Leaving dentures in a drowsy client risks both aspiration and pressure injury. A tissue-wrapped denture is the classic way dentures are thrown away. Hot water warps the acrylic."} },

{id:"BCC-057", t:"single", cn:"BCC", sys:"INTG", topic:"Ear irrigation technique in an adult", d:2, b:0.45, cj:"act", tags:["cerumen","irrigation","technique"],
 stem:"A nurse is irrigating an adult client's ear to remove impacted cerumen. The client has no history of tympanic membrane perforation. What technique is correct?",
 opts:["Direct a gentle stream of warm solution toward the upper wall of the ear canal, and pull the auricle up and back",
  "Aim the stream directly at the tympanic membrane to dislodge the cerumen",
  "Use cool solution so the client does not experience discomfort",
  "Pull the auricle down and back to straighten the canal in the adult"],
 ans:0,
 rat:{c:"In an adult the auricle is pulled up and back to straighten the canal. The stream is aimed at the canal wall rather than directly at the tympanic membrane, and the solution is at body temperature to avoid a caloric response.",
  s:"A direct stream at the tympanic membrane can perforate it. Solution that is not body temperature causes vertigo and nystagmus. Down and back is the technique for an infant, not an adult."} },

{id:"BCC-058", t:"single", cn:"BCC", sys:"REN", topic:"Bladder training for urge incontinence", d:2, b:0.45, cj:"generate", tags:["incontinence","elimination","bladder training"],
 stem:"A client with urge incontinence is starting a bladder training program, and the nurse is developing the schedule. What should the program include?",
 opts:["Scheduled voiding at fixed intervals that are gradually lengthened, with urge-suppression techniques when the urge arises between voids",
  "Voiding only when the urge is felt, so the bladder is never emptied unnecessarily",
  "Restricting all fluid intake to reduce the frequency of incontinence episodes",
  "Inserting an indwelling catheter until the bladder regains its normal capacity"],
 ans:0,
 rat:{c:"Bladder training uses scheduled voiding with progressive interval lengthening combined with urge suppression such as pelvic floor contraction and relaxation breathing. This restores cortical control over the voiding reflex.",
  s:"Voiding only on urge reinforces the overactive pattern. Fluid restriction concentrates urine, which irritates the bladder and worsens urgency. An indwelling catheter bypasses the training entirely and adds infection risk."} },

{id:"BCC-059", t:"single", cn:"BCC", sys:"RESP", topic:"Oxygen cylinder safety during transport", d:2, b:0.45, cj:"act", tags:["oxygen","transport","safety"],
 stem:"A client is being transported to radiology with a portable oxygen cylinder on the stretcher, and the nurse is preparing for the trip. What safety measure is required?",
 opts:["Secure the cylinder in an approved holder or strap on the stretcher and confirm enough oxygen for the round trip plus a reserve",
  "Lay the cylinder flat on the stretcher beside the client to keep the center of gravity low",
  "Take a full-size cylinder from the wall mount and carry it alongside the stretcher",
  "Estimate the oxygen needed and refill the cylinder after the transport is complete"],
 ans:0,
 rat:{c:"Cylinders must be secured in an approved holder so they cannot become a projectile, and the supply must cover the round trip with reserve. Transport planning includes calculating duration against flow rate.",
  s:"A loose cylinder is a serious projectile hazard. Carrying a cylinder by hand is unsafe and leaves the client unattended. Estimating and refilling afterward risks running out mid-transport."} },

/* ---------------- Pharmacological Therapies (5) ---------------- */

{id:"PHA-099", t:"single", cn:"PHA", sys:"HEME", topic:"Vincristine route-error prevention", d:3, b:0.55, cj:"prioritize", tags:["vincristine","route error","never event","oncology"],
 stem:"A client with acute lymphoblastic leukemia is scheduled to receive intrathecal methotrexate and intravenous vincristine on the same day. Both medications have arrived from the pharmacy at the same time. What safety measure must the nurse implement?",
 opts:["Administer vincristine by a separate route and at a separate time, and confirm it is labeled for intravenous use only, because intrathecal vincristine is uniformly fatal",
  "Administer both medications through the same intravenous access to reduce the number of punctures",
  "Administer intrathecal methotrexate first, then flush the line before giving vincristine",
  "Ask the pharmacy to combine both medications in a single syringe to reduce handling errors"],
 ans:0,
 rat:{c:"Intrathecal vincristine causes an ascending myeloencephalopathy that is almost always fatal. The standard safeguards are separate delivery of intrathecal and intravenous agents, distinct labeling, separate timing, and different staff or locations.",
  s:"Sharing access or combining the two medications creates exactly the route error that kills. Flushing does not remove the risk if the wrong agent reaches the neuraxis, and combining them in one syringe makes the error unavoidable."} },

{id:"PHA-100", t:"single", cn:"PHA", sys:"CV", topic:"Cyanide toxicity from prolonged nitroprusside", d:3, b:0.55, cj:"evaluate", tags:["nitroprusside","cyanide","hypertensive emergency"],
 stem:"A client with hypertensive emergency has received a sodium nitroprusside infusion for 52 hours at a high dose. The client becomes confused, develops a rising lactate, and has a metabolic acidosis with a narrowed arterial-venous oxygen difference. What does the nurse anticipate?",
 opts:["Cyanide toxicity from nitroprusside metabolism, requiring discontinuation of the infusion and administration of a cyanide antidote",
  "Thiocyanate-induced seizure activity requiring an anticonvulsant",
  "Worsening hypertensive emergency requiring an increase in the nitroprusside infusion rate",
  "Sepsis requiring blood cultures and broad-spectrum antibiotics"],
 ans:0,
 rat:{c:"Nitroprusside releases cyanide as it is metabolized, and prolonged or high-dose infusions can overwhelm hepatic detoxification. Confusion, lactic acidosis, and a narrowed arteriovenous oxygen difference are the classic triad, and treatment is stopping the drug and giving an antidote.",
  s:"Thiocyanate toxicity causes tinnitus, delirium, and seizures but not this degree of lactic acidosis. Increasing the infusion would worsen cyanide accumulation. Sepsis does not explain the narrowed oxygen difference in the setting of prolonged nitroprusside."} },

{id:"PHA-101", t:"single", cn:"PHA", sys:"REN", topic:"Mesna prophylaxis for hemorrhagic cystitis", d:2, b:0.45, cj:"generate", tags:["cyclophosphamide","mesna","oncology"],
 stem:"A client is receiving high-dose cyclophosphamide and the nurse reviews the prescribed supportive measures. Which measure prevents the dose-limiting toxicity of this drug?",
 opts:["Mesna with aggressive hydration and frequent voiding to prevent hemorrhagic cystitis",
  "Leucovorin rescue to prevent myelosuppression",
  "Allopurinol to prevent tumor lysis syndrome",
  "Filgrastim to prevent neutropenia"],
 ans:0,
 rat:{c:"Cyclophosphamide is metabolized to acrolein, which concentrates in the bladder and causes hemorrhagic cystitis. Mesna binds acrolein in the urine, and hydration with frequent voiding limits contact time with the bladder mucosa.",
  s:"Leucovorin rescues methotrexate toxicity, not cyclophosphamide. Allopurinol and filgrastim address different problems and provide no bladder protection."} },

{id:"PHA-102", t:"single", cn:"PHA", sys:"ENDO", topic:"Euglycemic ketoacidosis with an SGLT2 inhibitor", d:3, b:0.55, cj:"analyze", tags:["SGLT2 inhibitor","ketoacidosis","diabetes"],
 stem:"A client with type 2 diabetes taking an SGLT2 inhibitor is admitted with nausea, vomiting, and abdominal pain three days after reducing oral intake for a gastrointestinal illness. The blood glucose is 168 mg/dL and the venous blood gas shows a metabolic acidosis with an elevated anion gap. What does the nurse recognize?",
 opts:["Euglycemic diabetic ketoacidosis, which occurs at near-normal glucose in a client taking an SGLT2 inhibitor and still requires insulin and fluids",
  "Starvation ketosis in a client with reduced intake that resolves with oral carbohydrate alone",
  "Lactic acidosis from the SGLT2 inhibitor the client is taking, requiring bicarbonate",
  "Hyperosmolar hyperglycemic state, which requires large-volume fluid resuscitation at this glucose level"],
 ans:0,
 rat:{c:"SGLT2 inhibitors can precipitate ketoacidosis at glucose levels below 250 mg/dL, and the near-normal glucose delays recognition. Treatment is the same as other diabetic ketoacidosis — insulin, fluids, and electrolyte replacement — and the drug is held.",
  s:"Starvation ketosis does not usually produce this degree of acidosis. Bicarbonate is not the treatment for ketoacidosis. Hyperosmolar hyperglycemic state requires markedly elevated glucose and osmolality, not a glucose of 168 mg/dL."} },

{id:"PHA-103", t:"single", cn:"PHA", sys:"INF", topic:"Latent tuberculosis screening before a TNF inhibitor", d:2, b:0.45, cj:"analyze", tags:["infliximab","biologic","tuberculosis","screening"],
 stem:"A client with Crohn disease is scheduled to begin infliximab therapy and the nurse reviews the pre-treatment screening results. Which result must be addressed before the first infusion?",
 opts:["A positive interferon-gamma release assay with a normal chest radiograph, indicating latent tuberculosis",
  "A hemoglobin of 10.2 g/dL, which is expected in Crohn disease",
  "A positive C-reactive protein, indicating active inflammation",
  "A negative hepatitis A antibody, indicating no prior immunity"],
 ans:0,
 rat:{c:"Tumor necrosis factor inhibitors can reactivate latent tuberculosis into disseminated disease. A positive interferon-gamma release assay with a normal radiograph means latent infection, which requires treatment before or alongside biologic therapy.",
  s:"Anemia and an elevated C-reactive protein are expected findings in active Crohn disease and are not contraindications. Hepatitis A immunity is not relevant here; hepatitis B and C screening is."} },

/* ---------------- Physiological Adaptation (2) ---------------- */

{id:"PAA-095", t:"single", cn:"PAA", sys:"REPI", topic:"Ruptured vasa previa", d:3, b:0.55, cj:"recognize", tags:["obstetric emergency","vasa previa","fetal hemorrhage"],
 stem:"A client at 36 weeks gestation with a known velamentous cord insertion presents with painless vaginal bleeding that begins immediately after the membranes rupture. The fetal heart rate drops to 70 beats per minute with a sinusoidal pattern. What does the nurse anticipate?",
 opts:["Ruptured vasa previa with fetal exsanguination, requiring immediate cesarean birth",
  "Placental abruption requiring immediate vaginal delivery",
  "Placenta previa requiring bed rest and expectant management",
  "Bloody show indicating that labor will begin, with the fetal heart rate recovering spontaneously"],
 ans:0,
 rat:{c:"Vasa previa is fetal vessels crossing the internal os without placental or cord protection. Membrane rupture tears those vessels, and because the blood is fetal, the fetus exsanguinates rapidly. Delivery is by immediate cesarean birth.",
  s:"Abruption causes painful bleeding with a hypertonic uterus. Placenta previa causes painless bleeding but does not produce immediate fetal collapse at membrane rupture. Bloody show is scant and mucoid and is not associated with fetal bradycardia."} },

{id:"PAA-096", t:"single", cn:"PAA", sys:"REPI", topic:"Contraindication to methylergonovine", d:3, b:0.55, cj:"analyze", tags:["postpartum hemorrhage","uterotonics","hypertension"],
 stem:"A client has uterine atony with ongoing postpartum hemorrhage after a vaginal birth. The blood pressure is 168/104 mm Hg and the client has a history of chronic hypertension. The provider orders methylergonovine. What is the nurse's priority action?",
 opts:["Hold the medication and contact the provider, because methylergonovine is contraindicated with hypertension, and request an alternative uterotonic",
  "Administer the medication as ordered, since controlling the hemorrhage takes precedence over the hypertension",
  "Administer half the ordered methylergonovine dose and monitor the blood pressure closely",
  "Administer the medication by the intravenous route for a faster response"],
 ans:0,
 rat:{c:"Methylergonovine is an ergot alkaloid that causes sustained vasoconstriction and is contraindicated in hypertension. Giving it risks stroke or hypertensive crisis, so the nurse holds it, escalates, and suggests an alternative such as carboprost, noting that carboprost is contraindicated in asthma.",
  s:"Uncontrolled hemorrhage does not make a contraindicated drug safe. Halving the dose does not remove the contraindication. Intravenous methylergonovine produces a more abrupt pressor response and is generally avoided."} },

/* ---------------- Safety (1) ---------------- */

{id:"SIC-074", t:"single", cn:"SIC", sys:"INTG", topic:"Chemical splash to the eye", d:2, b:0.45, cj:"prioritize", tags:["chemical exposure","eyewash","emergency"],
 stem:"A nurse in the laboratory splashes a corrosive disinfectant into one eye and reaches the eyewash station. What is the correct immediate action?",
 opts:["Irrigate the eye with water or saline for at least 15 to 20 minutes, holding the eyelids open, and remove contact lenses during irrigation",
  "Neutralize the chemical by irrigating with a weak acid solution",
  "Irrigate for 5 minutes, then patch the eye and continue working",
  "Apply a sterile ophthalmic ointment and seek care at the end of the shift"],
 ans:0,
 rat:{c:"Immediate prolonged irrigation with water or saline is the treatment for a chemical eye splash. The eyelids are held open, contact lenses removed, and irrigation continued for at least 15 to 20 minutes, followed by medical evaluation.",
  s:"Neutralizing agents cause an exothermic reaction and worsen the injury. Five minutes is insufficient, and patching an irrigated chemical injury delays evaluation. Ointment without irrigation leaves the chemical in contact with the cornea."} },

/* ---------------- Management of Care (1) ---------------- */

{id:"MOC-104", t:"single", cn:"MOC", sys:"HEME", topic:"Parental refusal of emergency transfusion for a minor", d:3, b:0.55, cj:"prioritize", tags:["minors","consent","emergency exception","legal"],
 stem:"A 6-year-old child needs an emergency blood transfusion after a motor vehicle collision. Both parents refuse consent on religious grounds. The child's hemoglobin is 5.1 g/dL and the child is tachycardic and pale. What is the nurse's appropriate action?",
 opts:["Support the team in obtaining an emergency court order or proceeding under the emergency exception, because a parent may not refuse life-saving treatment for a child",
  "Document the refusal and withhold the emergency transfusion, because parental consent governs all treatment for a minor",
  "Ask the child to provide assent, since a child this age cannot refuse and the transfusion can proceed without parental consent",
  "Administer the transfusion only if the parents agree to sign a release from liability"],
 ans:0,
 rat:{c:"Parents hold broad authority over a child's care, but not the authority to refuse life-saving treatment. In an emergency the team proceeds under the emergency exception while an emergency court order is sought, and the child's survival takes precedence.",
  s:"Withholding a life-saving transfusion because a parent objects is not defensible. A 6-year-old cannot provide legal consent, and assent does not substitute for it. Conditioning emergency care on a liability release is coercive and delays treatment."} }
  );
})();
