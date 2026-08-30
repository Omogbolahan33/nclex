/* Wave 25 — 20 hand-authored hard RN items.
 * Reduction of Risk Potential at 11.4% against a 12% target and
 * Physiological Adaptation at 13.3% against 14% are the two areas furthest
 * under their blueprint share, so wave 25 leads with ten diagnostic and
 * antenatal items between them. Health Promotion at 64% hard and Basic Care
 * at 67% hard remain the softest on difficulty and take one each.
 * Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Reduction of Risk   : RRP-103 – RRP-107
 * Physiological Adapt : PAA-108 – PAA-112
 * Pharmacology        : PHA-140 – PHA-143
 * Management of Care  : MOC-143 – MOC-144
 * Safety              : SIC-111 – SIC-112
 * Basic Care/Comfort  : BCC-082
 * Health Promotion    : HPM-088
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Reduction of Risk Potential (5) ---------------- */

{id:"RRP-103", t:"single", cn:"RRP", sys:"ENDO", topic:"Glucose control before a PET scan", d:3, b:0.55, cj:"act", tags:["PET scan","glucose","image quality"],
 stem:"A client with type 2 diabetes is scheduled for a fluorodeoxyglucose positron emission tomography scan. The blood glucose on arrival is 240 mg/dL. What should the nurse do?",
 opts:["Report the level to the nuclear medicine team before proceeding, since hyperglycemia competes with the tracer and degrades image quality, so glucose may need to be lowered first",
  "Proceed as planned, since blood glucose has no effect on this imaging study",
  "Give the scheduled insulin and scan immediately afterward, since the falling glucose improves uptake",
  "Cancel the study permanently, since diabetes is a contraindication to positron emission tomography"],
 ans:0,
 rat:{c:"The tracer is a glucose analogue, so circulating glucose competes with it for cellular uptake and raises background activity, which reduces image quality and can produce a false-negative study. Most centres set a glucose threshold above which the scan is rescheduled or glucose is lowered first.",
  s:"Glucose directly affects tracer uptake, so it is not irrelevant. Insulin given immediately before the scan drives tracer into muscle and worsens the image, and diabetes is managed rather than disqualifying."} },

{id:"RRP-104", t:"single", cn:"RRP", sys:"MSK", topic:"Safety after a radionuclide bone scan", d:3, b:0.55, cj:"generate", tags:["bone scan","radiopharmaceutical","radiation safety"],
 stem:"A client has received a technetium radiopharmaceutical for a bone scan and asks what precautions are needed at home. What should the nurse teach?",
 opts:["Drink plenty of fluid to speed excretion, flush the toilet twice after use for the first day, and wash hands carefully, since the tracer is excreted in urine and emits radiation briefly",
  "No precautions are needed, since the radiation dose is too small to matter",
  "Avoid all contact with other people for one week, since the client is significantly radioactive",
  "Wear a lead apron at home, since shielding is required until the tracer has decayed"],
 ans:0,
 rat:{c:"The tracer is eliminated renally, so urine is the main source of residual radiation. Hydration speeds clearance, and simple measures such as double flushing and hand hygiene keep exposure to household members low. The dose is small and the half-life short, so isolation is unnecessary.",
  s:"Dismissing precautions ignores that urine carries the tracer for hours to a day. Full isolation is disproportionate for the dose involved, and a lead apron is not used at home; clearance is achieved by excretion rather than shielding."} },

{id:"RRP-105", t:"single", cn:"RRP", sys:"GI", topic:"Complications after ERCP", d:3, b:0.55, cj:"recognize", tags:["ERCP","post-procedure monitoring","pancreatitis"],
 stem:"Four hours after an endoscopic retrograde cholangiopancreatography, a client reports worsening upper abdominal pain radiating to the back with nausea and a temperature of 38.2°C. What does the nurse recognize?",
 opts:["Possible post-procedure pancreatitis, which is the commonest serious complication, requiring immediate reporting, nothing by mouth, and assessment of amylase or lipase",
  "Expected post-procedure discomfort from air insufflation, which settles with passage of flatus",
  "A normal reaction to sedation, which resolves as the medication wears off",
  "Anxiety about the procedure result, which is best managed with reassurance"],
 ans:0,
 rat:{c:"Pancreatitis occurs in a significant minority of patients after this procedure and presents with epigastric pain radiating to the back, nausea, and sometimes fever. It requires prompt recognition, bowel rest, fluid resuscitation, and enzyme measurement, because delay increases severity.",
  s:"Insufflation discomfort is usually lower and crampy and improves with passage of gas, rather than radiating to the back with fever. Sedation does not cause this pain pattern, and attributing it to anxiety delays treatment of a recognized complication."} },

{id:"RRP-106", t:"single", cn:"RRP", sys:"GI", topic:"Positioning and monitoring after liver biopsy", d:3, b:0.55, cj:"act", tags:["liver biopsy","hemorrhage","post-procedure care"],
 stem:"A client has just returned from a percutaneous liver biopsy. What is the priority nursing intervention?",
 opts:["Position the client on the right side with a pillow or sandbag over the puncture site, monitor vital signs frequently, and watch for signs of bleeding such as falling pressure and rising pulse",
  "Position the client flat on the left side, since this relieves pressure on the liver",
  "Encourage ambulation within the hour, since early movement prevents complications",
  "Check vital signs once at the end of the shift, since bleeding after this procedure is rare"],
 ans:0,
 rat:{c:"The liver is highly vascular and hemorrhage is the principal risk, so the client lies on the right side to compress the puncture site against the chest wall, with frequent vital signs because tachycardia and falling blood pressure are the earliest indicators of bleeding.",
  s:"The left side does not compress the liver, and the right lateral position is what provides tamponade. Early ambulation increases bleeding risk, and hourly or more frequent observations for several hours are standard because bleeding can be delayed."} },

{id:"RRP-107", t:"single", cn:"RRP", sys:"REPI", topic:"Sentinel node biopsy and blue dye", d:3, b:0.55, cj:"act", tags:["sentinel node biopsy","blue dye","lymphedema"],
 stem:"A client is scheduled for a sentinel lymph node biopsy using a blue dye tracer. What should the nurse include in preparation and teaching?",
 opts:["Ask about dye allergies and document that the dye may turn the skin and urine blue-green for a day or two, and teach long-term lymphedema precautions for the affected limb",
  "Reassure the client that the dye has no visible effects, since it is entirely internal",
  "Withhold the allergy history, since blue dye cannot cause hypersensitivity reactions",
  "Teach that lymphedema risk ends once the surgical wound has healed"],
 ans:0,
 rat:{c:"Blue dye tracers can cause hypersensitivity, so allergy history is essential, and clients must be told to expect transient skin and urine discoloration so they do not mistake it for a complication. Axillary node removal carries a lifelong lymphedema risk, so limb precautions continue indefinitely.",
  s:"Claiming the dye has no visible effects leaves the client alarmed when discoloration appears. Hypersensitivity to blue dye is documented and can be serious, and lymphedema risk persists for life rather than ending with wound healing."} },

/* ---------------- Physiological Adaptation (5) ---------------- */

{id:"PAA-108", t:"single", cn:"PAA", sys:"ENDO", topic:"The one-hour glucose challenge test", d:3, b:0.55, cj:"act", tags:["glucose challenge test","gestational diabetes","screening"],
 stem:"A client at 26 weeks gestation attends for a one-hour glucose challenge test. What should the nurse do?",
 opts:["Give the 50-gram glucose load without requiring a fast, draw the blood exactly one hour later, and note that an elevated result requires a longer diagnostic test rather than confirming diabetes",
  "Require a twelve-hour fast beforehand, since fasting is essential for accurate glucose interpretation",
  "Draw the blood at thirty minutes, since the peak occurs earlier in pregnancy",
  "Diagnose gestational diabetes from this result, since it is the definitive test"],
 ans:0,
 rat:{c:"The one-hour challenge is a non-fasting screening test using a fixed 50-gram load with a single timed sample. An elevated result indicates the need for the longer diagnostic oral glucose tolerance test, and timing must be accurate because the interpretation depends on it.",
  s:"Fasting is not required and does not improve this screening test. The sample is drawn at one hour by definition, and a screening result never establishes the diagnosis, which is why a confirmatory test exists."} },

{id:"PAA-109", t:"single", cn:"PAA", sys:"REPI", topic:"Timing of the nuchal translucency scan", d:3, b:0.55, cj:"analyze", tags:["nuchal translucency","first trimester","screening window"],
 stem:"A client at 14 weeks and 3 days gestation asks for a nuchal translucency scan. What should the nurse explain?",
 opts:["The measurement window has passed, since nuchal translucency is measured between 11 and 13 weeks plus 6 days, but other screening options remain available",
  "Proceed with the nuchal translucency scan as requested, since the measurement is valid at any point in pregnancy",
  "Postpone the scan to 20 weeks, since the measurement becomes more accurate later",
  "Explain that the scan is only offered to clients over 35 years of age"],
 ans:0,
 rat:{c:"Nuchal translucency reflects fluid behind the fetal neck and is only measurable within the narrow first-trimester window, because the lymphatic system develops and the fluid resolves after that. Missing the window means the assessment cannot be performed, though other screening remains available.",
  s:"The measurement is time-limited by fetal development rather than valid throughout pregnancy, and waiting makes it impossible rather than more accurate. It is offered based on gestational age and client choice rather than maternal age alone."} },

{id:"PAA-110", t:"single", cn:"PAA", sys:"REPI", topic:"Interpreting the quad screen", d:3, b:0.55, cj:"evaluate", tags:["quad screen","prenatal screening","interpretation"],
 stem:"A client at 17 weeks has a quad screen showing low alpha-fetoprotein, low unconjugated estriol, and elevated human chorionic gonadotropin and inhibin A. What does the nurse understand?",
 opts:["This pattern is associated with increased risk of trisomy 21 and warrants an offer of genetic counselling and diagnostic testing, not a diagnosis",
  "This pattern confirms trisomy 21, so the result can be recorded as a diagnosis",
  "This pattern indicates a neural tube defect, since alpha-fetoprotein is low",
  "The result is uninterpretable, since four markers cannot be combined meaningfully"],
 ans:0,
 rat:{c:"The quad screen combines four markers into a calculated risk. Low alpha-fetoprotein and estriol with elevated gonadotropin and inhibin A is the pattern associated with trisomy 21. It yields a probability that guides counselling and the offer of diagnostic testing, not a diagnosis.",
  s:"A screening result produces a risk figure rather than a diagnosis, which only karyotype or microarray can provide. Neural tube defects are associated with elevated rather than low alpha-fetoprotein, and the four markers are specifically designed to be interpreted together."} },

{id:"PAA-111", t:"single", cn:"PAA", sys:"REPI", topic:"Components of the biophysical profile", d:3, b:0.55, cj:"evaluate", tags:["biophysical profile","fetal assessment","ultrasound"],
 stem:"A client at 36 weeks with hypertension undergoes a biophysical profile scored at 4 out of 10. What does the nurse understand?",
 opts:["Four components were normal and the score suggests fetal compromise requiring urgent evaluation and probable delivery planning, since a score of 4 or below is abnormal",
  "The score is normal, since anything above zero indicates an adequately oxygenated fetus",
  "The score means four abnormalities were found, so the result is reassuring rather than concerning",
  "The score cannot be interpreted without a simultaneous contraction stress test"],
 ans:0,
 rat:{c:"The biophysical profile scores five variables, typically fetal breathing, movement, tone, amniotic fluid volume, and the non-stress test, each worth two points. A score of 4 or below indicates probable fetal asphyxia and prompts urgent evaluation and delivery planning.",
  s:"The score counts normal components, so 4 of 10 means four points were earned rather than four defects found. Only 8 to 10 is reassuring, and while additional testing may follow, the score itself is interpretable and actionable on its own."} },

{id:"PAA-112", t:"single", cn:"PAA", sys:"CV", topic:"Newborn screening for critical congenital heart disease", d:3, b:0.55, cj:"act", tags:["critical congenital heart disease","pulse oximetry","newborn screening"],
 stem:"A term newborn at 26 hours of life has a pulse oximetry screen showing 91 percent in the right hand and 89 percent in the foot. What should the nurse do?",
 opts:["Treat it as a failed screen, repeat the measurement after an hour per protocol, and anticipate echocardiography if it remains abnormal, since this may indicate duct-dependent cardiac disease",
  "Record it as normal, since any saturation above 85 percent passes the screen",
  "Discharge the infant with follow-up, since screening saturations are frequently inaccurate",
  "Start oxygen immediately, since a saturation below 95 percent always requires supplemental oxygen"],
 ans:0,
 rat:{c:"Screening uses pre-ductal and post-ductal sites, and a saturation below the threshold in either, or a significant difference between them, is a fail. The protocol is to repeat after a short interval and proceed to echocardiography, because duct-dependent lesions can present only after the duct begins to close.",
  s:"The pass threshold is higher than 85 percent and includes a pre-post difference criterion. Discharging an infant with an abnormal screen risks collapse at home when the duct closes, and giving oxygen without assessment can hasten ductal closure and worsen a duct-dependent lesion."} },

/* ---------------- Pharmacology and Parenteral Therapies (4) ---------------- */

{id:"PHA-140", t:"single", cn:"PHA", sys:"GI", topic:"QT prolongation with ondansetron", d:3, b:0.55, cj:"analyze", tags:["ondansetron","QT prolongation","serotonin syndrome"],
 stem:"A client with a known prolonged QT interval and hypokalemia is prescribed intravenous ondansetron for chemotherapy-induced nausea. What is the nurse's priority action?",
 opts:["Raise the concern before administration, since ondansetron prolongs the QT interval and hypokalemia increases the risk of torsades de pointes, and discuss an alternative or potassium correction",
  "Administer as prescribed, since a prolonged QT interval and hypokalemia do not affect ondansetron, which is the standard antiemetic",
  "Administer more slowly than prescribed, since slow infusion removes the cardiac risk",
  "Administer and monitor for sedation, since that is the main adverse effect of concern"],
 ans:0,
 rat:{c:"Ondansetron prolongs the QT interval in a dose-dependent way, and hypokalemia independently predisposes to torsades de pointes. The combination is a recognized hazard, so the nurse raises it and the team corrects electrolytes, adjusts the dose, or chooses a different agent.",
  s:"Alternatives exist and this is exactly the situation to use one. Slower infusion reduces but does not eliminate the risk, and sedation is not the principal concern with this drug; cardiac rhythm is."} },

{id:"PHA-141", t:"single", cn:"PHA", sys:"NEURO", topic:"Rivastigmine transdermal patch", d:3, b:0.55, cj:"act", tags:["rivastigmine","transdermal patch","dementia"],
 stem:"A caregiver asks how to apply a new rivastigmine patch for a client with dementia. What teaching is correct?",
 opts:["Remove the previous patch before applying the new one, apply it to clean dry intact skin, rotate the site daily, and do not cut the patch",
  "Leave the old patch in place and add the new one, since removing it causes a gap in therapy",
  "Apply the new patch over the old site every day, since that area is already tolerated",
  "Cut the patch in half if the client develops nausea, since this reduces the dose safely"],
 ans:0,
 rat:{c:"Two patches would double the dose and risk cholinergic toxicity, so the old patch must be removed first. Site rotation prevents irritation, the skin must be intact for predictable absorption, and cutting a matrix or reservoir patch destroys the delivery system and gives an unpredictable dose.",
  s:"Leaving the old patch produces accidental overdose. Repeated application to the same site causes irritation and alters absorption, and a cut patch cannot deliver a reliable dose, so dose changes are made by prescribing a different strength."} },

{id:"PHA-142", t:"single", cn:"PHA", sys:"NEURO", topic:"Hyponatremia with oxcarbazepine", d:3, b:0.55, cj:"evaluate", tags:["oxcarbazepine","hyponatremia","monitoring"],
 stem:"A client who started oxcarbazepine six weeks ago reports increasing fatigue, headache, nausea, and mild confusion. The serum sodium is 126 mEq/L. What does the nurse recognize?",
 opts:["Symptomatic hyponatremia, a recognized effect of this drug, requiring prompt reporting and prescriber review rather than simply increasing the dose",
  "Expected adaptation to the medication, which resolves without intervention if the dose is maintained",
  "Dehydration from inadequate fluid intake, which explains increasing fatigue and is treated by encouraging more oral fluids",
  "A seizure warning, since these symptoms precede breakthrough seizure activity"],
 ans:0,
 rat:{c:"Oxcarbazepine causes clinically significant hyponatremia more often than carbamazepine, usually within the first months. Symptoms of nausea, headache, fatigue, and confusion at a sodium of 126 mEq/L require reporting and management, because continuing or increasing the drug worsens the fall.",
  s:"This is a drug effect rather than benign adaptation, and it does not resolve while the cause continues. Encouraging fluids would dilute the sodium further, and while severe hyponatremia can provoke seizures, the pattern here is metabolic rather than a seizure warning."} },

{id:"PHA-143", t:"single", cn:"PHA", sys:"PSYCH", topic:"Atomoxetine monitoring in a young person", d:3, b:0.55, cj:"generate", tags:["atomoxetine","hepatotoxicity","suicidality monitoring"],
 stem:"A 14-year-old starts atomoxetine for attention deficit hyperactivity disorder after stimulant treatment was unsuitable. What monitoring is required?",
 opts:["Watch for emerging suicidal thinking and for signs of liver injury such as jaundice, dark urine, or right upper quadrant pain, and monitor growth, blood pressure, and pulse",
  "Monitor blood glucose only, since carbohydrate metabolism is the main concern with this drug",
  "Check the serum drug level weekly, since atomoxetine requires therapeutic drug monitoring",
  "No routine monitoring is needed, since atomoxetine is not a stimulant and is therefore free of significant risk"],
 ans:0,
 rat:{c:"Atomoxetine carries warnings for suicidal ideation in children and adolescents and for severe hepatotoxicity, so the nurse monitors mood and behaviour alongside liver symptoms. As a noradrenergic agent it also raises blood pressure and pulse and can slow growth, all of which are tracked.",
  s:"Carbohydrate metabolism is not the concern, and routine serum level monitoring is not used for this drug. Being a non-stimulant removes abuse potential but not the boxed warning or the hepatic and cardiovascular risks."} },

/* ---------------- Management of Care (2) ---------------- */

{id:"MOC-143", t:"single", cn:"MOC", sys:"INF", topic:"Using a procedural checklist and speaking up", d:3, b:0.55, cj:"act", tags:["checklist","speaking up","safety culture"],
 stem:"During the pre-procedure pause a checklist item cannot be confirmed because the consent form is missing a required signature. The surgeon wishes to proceed as the list is otherwise complete. What should the nurse do?",
 opts:["Stop the process and escalate, since a checklist exists to halt the procedure when a step cannot be confirmed, and the whole team is empowered to stop the line",
  "Continue, since one missing signature does not invalidate an otherwise complete checklist",
  "Sign the form on the client's behalf to complete the checklist and avoid delay",
  "Ask a colleague to confirm the item verbally, since an item that cannot be confirmed from the record can still be confirmed by word of mouth"],
 ans:0,
 rat:{c:"A checklist is a hard stop rather than a formality. Its value comes from the authority it gives any team member to halt the process when a step cannot be verified, and consent is precisely the kind of step that cannot be waived. The escalation path exists for this situation.",
  s:"Treating the checklist as satisfied when an item is unconfirmed removes the entire purpose of having one. Signing for a client is falsification, and accepting a verbal confirmation for a documented requirement does not make the requirement met."} },

{id:"MOC-144", t:"single", cn:"MOC", sys:"CV", topic:"Closed-loop communication in an emergency", d:3, b:0.55, cj:"act", tags:["closed-loop communication","emergency","teamwork"],
 stem:"During a resuscitation the team leader calls out a drug and dose without addressing anyone specifically, and two nurses both begin to draw it up. What communication failure has occurred and what corrects it?",
 opts:["The order was not directed to a named person and was not read back, so closed-loop communication using the person's name and a verbal repeat-back and confirmation is required",
  "No communication failure has occurred, since two people preparing the drug provides a useful double check",
  "The failure is that the leader spoke too quietly, so speaking louder corrects it",
  "The failure is that the nurses acted without waiting, so they should wait for written orders"],
 ans:0,
 rat:{c:"Closed-loop communication has three parts: the sender addresses a named individual, the receiver repeats the message back, and the sender confirms it is correct. Without a named recipient, orders are duplicated, missed, or given by the wrong person.",
  s:"Duplication here wastes a drug and risks a double dose rather than providing verification. Volume is not the issue when the order was heard by two people, and written orders are not produced during a resuscitation; verbal orders are read back and documented afterward."} },

/* ---------------- Safety and Infection Control (2) ---------------- */

{id:"SIC-111", t:"single", cn:"SIC", sys:"INF", topic:"Dedicated equipment in contact precautions", d:3, b:0.55, cj:"act", tags:["contact precautions","dedicated equipment","transmission"],
 stem:"A client is in contact precautions for a multidrug-resistant organism. The unit is short of stethoscopes and blood pressure cuffs. What should the nurse do?",
 opts:["Use dedicated equipment left in the room, or clean and disinfect shared equipment with an agent effective against the organism between clients, following the required contact time",
  "Use shared equipment as normal, since contact precautions for a resistant organism add nothing to standard precautions",
  "Use shared equipment but wipe it with an alcohol hand rub, since that is always effective",
  "Skip blood pressure measurement for this client, since measurement is not essential"],
 ans:0,
 rat:{c:"Resistant organisms persist on equipment and are a common route of cross-transmission. Either dedicated equipment stays in the room, or shared items are cleaned with a product effective against the specific organism and left wet for the stated contact time.",
  s:"Standard precautions do not cover organisms spread by contact with contaminated surfaces. Alcohol hand rub is formulated for hands, not equipment, and does not cover all such organisms, and omitting essential observations compromises care rather than solving the shortage."} },

{id:"SIC-112", t:"single", cn:"SIC", sys:"INF", topic:"Hydrogen peroxide vapor room decontamination", d:3, b:0.55, cj:"act", tags:["room decontamination","hydrogen peroxide vapor","isolation"],
 stem:"A room is scheduled for hydrogen peroxide vapor decontamination after discharge of a client with a highly resistant organism. What is essential during the cycle?",
 opts:["Seal and vacate the room with warning signage, confirm no person remains inside, and only re-enter once the cycle and aeration are complete and the vapour has been cleared",
  "Continue routine cleaning inside the room during the cycle, since staff tolerance is high",
  "Allow staff to enter briefly to retrieve equipment, since short exposure is harmless",
  "Skip the aeration step, since hydrogen peroxide breaks down instantly on contact with air"],
 ans:0,
 rat:{c:"Vaporized hydrogen peroxide is toxic to the respiratory tract, so the space must be sealed, signed, and empty for the whole cycle, and re-entry requires completion of aeration with confirmation that concentration has fallen to a safe level.",
  s:"Occupancy during the cycle causes respiratory injury, and no tolerance makes that acceptable. Brief entry is still exposure to an irritant at high concentration, and aeration takes a measured period because residual vapour persists rather than dispersing instantly."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-082", t:"single", cn:"BCC", sys:"MSK", topic:"Safe wheelchair transfer", d:2, b:0.45, cj:"act", tags:["wheelchair transfer","safe handling","mobility"],
 stem:"A nurse is transferring a client with left-sided weakness from the bed to a wheelchair. What technique is correct?",
 opts:["Lock the wheelchair brakes, remove or swing away the footrests, place the wheelchair at an angle with the strong side nearest the bed, use a gait belt, and pivot rather than lift",
  "Leave the footrests in place so the client can rest the feet during the transfer",
  "Position the wheelchair so the weak side is nearest the bed, since that side needs the shortest distance",
  "Lift the client straight up and across, since pivoting is slower and less safe"],
 ans:0,
 rat:{c:"Brakes and removed footrests prevent the chair rolling and remove a trip hazard. Positioning the client's strong side toward the destination lets the client bear weight and drive the movement, and a gait belt gives the nurse control while pivoting avoids lifting.",
  s:"Footrests left in place cause trips and falls during the pivot. Bringing the weak side nearest removes the client's ability to weight bear, and lifting rather than pivoting risks injury to both the client and the nurse."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-088", t:"single", cn:"HPM", sys:"PSYCH", topic:"Screening for anxiety in primary care", d:3, b:0.55, cj:"evaluate", tags:["anxiety screening","case finding","follow-up"],
 stem:"A client attending for a routine blood pressure check mentions constant worry, muscle tension, and difficulty sleeping for the past four months. What should the nurse do?",
 opts:["Use a validated anxiety screening tool, explore the duration and impact on function, and arrange follow-up, since persistent symptoms beyond six months of worry with impairment suggest a treatable disorder",
  "Reassure the client that worry lasting a few months is normal and no assessment is needed, since everyone experiences anxiety",
  "Request a full medical workup first, since anxiety symptoms are always caused by a physical condition",
  "Advise the client to reduce caffeine and exercise more, since lifestyle change is sufficient treatment"],
 ans:0,
 rat:{c:"A structured screening tool quantifies symptoms and their functional impact, which distinguishes ordinary worry from a disorder requiring treatment. Assessment and follow-up are needed because anxiety disorders are common, frequently missed in primary care, and respond well to treatment.",
  s:"Four months of persistent symptoms with sleep disturbance is beyond ordinary worry. Physical causes are considered alongside rather than before assessment, since anxiety disorders are diagnoses in their own right, and lifestyle advice alone is insufficient where impairment is present."} }
  );
})();
