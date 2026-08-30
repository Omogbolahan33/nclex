/* Wave 20 — 20 hand-authored hard RN items.
 * Pharmacology at 15.4% against a 16% target and Pharmacological/Parenteral
 * Therapies at 13.6% against 14% are the two areas furthest under their
 * blueprint share, so wave 20 leads with those. Management of Care and
 * Safety remain under target, and Health Promotion at 58% hard and Basic
 * Care at 63% hard are still the softest on difficulty.
 * Every item is d>=2; 16 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Pharmacology        : PHA-119 – PHA-124
 * Physiological Adapt : PAA-097 – PAA-100
 * Management of Care  : MOC-126 – MOC-129
 * Safety              : SIC-097 – SIC-099
 * Health Promotion    : HPM-075 – HPM-076
 * Basic Care/Comfort  : BCC-073
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (6) ---------------- */

{id:"PHA-119", t:"single", cn:"PHA", sys:"REN", topic:"Cisplatin nephrotoxicity", d:3, b:0.55, cj:"prioritize", tags:["cisplatin","nephrotoxicity","hydration"],
 stem:"A client is scheduled to receive cisplatin. What is the essential nursing intervention to protect kidney function?",
 opts:["Aggressive intravenous hydration before and after the dose, with strict measurement of intake and output and monitoring of electrolytes",
  "Restricting fluids to reduce the volume load on the kidneys during treatment",
  "Giving a loop diuretic immediately after the dose to flush the kidneys without additional fluid",
  "Checking the serum creatinine once a week, since kidney injury develops slowly with this drug"],
 ans:0,
 rat:{c:"Cisplatin is directly toxic to the renal tubules, and the injury is concentration dependent. Vigorous hydration before and after administration dilutes the drug in the tubules, with intake and output and electrolytes, especially magnesium and potassium, monitored closely because wasting is common.",
  s:"Fluid restriction concentrates the drug in the tubules and increases injury. A diuretic without hydration worsens volume depletion, and creatinine is checked around each cycle rather than weekly, since injury can appear within days."} },

{id:"PHA-120", t:"single", cn:"PHA", sys:"CV", topic:"Cardiotoxicity monitoring with trastuzumab", d:3, b:0.55, cj:"evaluate", tags:["trastuzumab","cardiotoxicity","ejection fraction"],
 stem:"A client receiving trastuzumab for breast cancer has a left ventricular ejection fraction that has fallen from 62 percent to 48 percent over three months. The client has no symptoms. What should the nurse anticipate?",
 opts:["Holding the drug and repeating the assessment, because a significant fall in ejection fraction requires action even when the client feels well",
  "Continuing unchanged, since the client has no symptoms of heart failure",
  "Increasing the dose, since a lower ejection fraction means the tumour is responding",
  "Starting a diuretic and continuing the drug, since treatment of the number is all that is needed"],
 ans:0,
 rat:{c:"Trastuzumab can reduce left ventricular function, and the change is often asymptomatic at first. A clinically significant fall in ejection fraction prompts holding the drug and reassessment, because continuing risks irreversible cardiac injury.",
  s:"Absence of symptoms does not mean absence of injury, and waiting for heart failure forfeits the reversible window. Ejection fraction has no relationship to tumour response, and treating the number while continuing the cause does not address the mechanism."} },

{id:"PHA-121", t:"single", cn:"PHA", sys:"HEME", topic:"Infusion reaction and hepatitis B reactivation with rituximab", d:3, b:0.55, cj:"act", tags:["rituximab","infusion reaction","hepatitis B"],
 stem:"A client is about to begin rituximab. What must the nurse confirm before the first infusion?",
 opts:["Hepatitis B screening has been done, and premedication and close monitoring are in place for an infusion reaction",
  "Nothing is required, since infusion reactions occur only after several doses have been given",
  "That the client has no history of hypertension, since low blood pressure is the only concern",
  "That the client is taking an antiviral, which all clients receive regardless of hepatitis status"],
 ans:0,
 rat:{c:"Rituximab can reactivate hepatitis B, including in clients with resolved infection, which can cause fulminant hepatitis, so screening is mandatory before treatment. Infusion reactions are common, especially with the first dose, so premedication and close monitoring are required.",
  s:"Reactions are most likely with the first infusion rather than later ones. Both hypertension and hypotension can occur, so blood pressure in either direction matters, and antiviral prophylaxis is guided by screening rather than given universally."} },

{id:"PHA-122", t:"single", cn:"PHA", sys:"GI", topic:"Valproate hepatotoxicity and pancreatitis", d:3, b:0.55, cj:"recognize", tags:["valproate","hepatotoxicity","pancreatitis"],
 stem:"A client taking valproate for seizures reports three days of persistent nausea, severe abdominal pain radiating to the back, and vomiting. What should the nurse do?",
 opts:["Report the symptoms urgently and anticipate checking pancreatic enzymes and liver function, because both pancreatitis and hepatotoxicity are serious valproate risks",
  "Suggest an antacid and a bland diet, since nausea is a common and harmless effect of valproate",
  "Advise the client to take the dose with food, which resolves abdominal pain from this medication",
  "Reduce the dose by half, since the symptoms suggest the level is slightly high"],
 ans:0,
 rat:{c:"Valproate carries boxed warnings for hepatotoxicity and for acute pancreatitis, which can be fatal. Persistent abdominal pain with vomiting and back radiation requires urgent evaluation of pancreatic enzymes and liver function rather than symptomatic management.",
  s:"These symptoms are the presenting picture of pancreatitis, not benign dyspepsia. Food does not treat pancreatitis, and independently reducing an antiseizure dose risks breakthrough seizures while leaving the cause unaddressed."} },

{id:"PHA-123", t:"single", cn:"PHA", sys:"NEURO", topic:"Bradycardia and falls with donepezil", d:3, b:0.55, cj:"evaluate", tags:["donepezil","bradycardia","syncope","older adult"],
 stem:"An older adult started on donepezil eight weeks ago has had two episodes of near-fainting and a heart rate of 48 beats per minute. What does the nurse recognize?",
 opts:["A cholinesterase inhibitor can cause bradycardia and syncope, so this requires evaluation and possible dose review rather than being attributed to ageing",
  "Normal age-related change, since older adults commonly have a slow pulse and unsteady balance",
  "Dehydration, which is treated with oral fluids and needs no change in medication",
  "Anxiety, since fear of falling raises vagal tone and slows the heart"],
 ans:0,
 rat:{c:"Cholinesterase inhibitors increase vagal tone and can produce bradycardia, heart block, and syncope, which in an older adult leads to falls and injury. The association is well recognized and requires evaluation and prescriber review.",
  s:"A pulse of 48 with syncope after starting this drug is not simply ageing, and attributing it to ageing misses a reversible drug effect. Dehydration does not explain the pattern, and anxiety causes tachycardia rather than bradycardia."} },

{id:"PHA-124", t:"single", cn:"PHA", sys:"PSYCH", topic:"Seizure risk contraindication for bupropion", d:3, b:0.55, cj:"analyze", tags:["bupropion","seizure threshold","contraindication"],
 stem:"A client with depression and a history of anorexia nervosa is being considered for bupropion. What is the nurse's priority consideration?",
 opts:["The drug is contraindicated, because eating disorders lower the seizure threshold and bupropion further lowers it",
  "Bupropion is appropriate, since it also helps with weight gain in anorexia",
  "The drug is safe if started at a low dose and increased slowly over several months",
  "The drug is safe as long as the client is monitored for blood pressure changes alone"],
 ans:0,
 rat:{c:"Bupropion lowers the seizure threshold in a dose-dependent way, and it is contraindicated in clients with a seizure disorder and in those with anorexia nervosa or bulimia, in whom seizure risk during treatment is markedly increased.",
  s:"Bupropion is associated with weight loss rather than gain, which is an additional concern in anorexia. No dosing strategy makes it safe where it is contraindicated, and blood pressure is not the principal risk in this client."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-097", t:"single", cn:"PAA", sys:"REPI", topic:"HELLP syndrome", d:3, b:0.55, cj:"recognize", tags:["HELLP syndrome","preeclampsia","emergency"],
 stem:"A client at 34 weeks gestation with gestational hypertension reports severe epigastric pain and nausea. Laboratory results show a platelet count of 78,000/mm³, elevated liver enzymes, and a falling hemoglobin. What does the nurse recognize?",
 opts:["HELLP syndrome, a severe form of hypertensive disease of pregnancy requiring urgent stabilization and preparation for delivery",
  "Gastroesophageal reflux, which is common and rarely severe at this gestational age, explaining the epigastric pain",
  "Gallbladder disease, since pregnancy predisposes to gallstones and the pain fits that pattern",
  "Normal laboratory variation in pregnancy, since platelets and liver enzymes fluctuate in the third trimester"],
 ans:0,
 rat:{c:"Hemolysis, Elevated Liver enzymes, and Low Platelets define HELLP syndrome, which can occur with or without marked hypertension. Epigastric or right upper quadrant pain is the classic symptom, and it is an obstetric emergency requiring stabilization and delivery planning.",
  s:"Reflux does not cause thrombocytopenia or raised liver enzymes. Gallbladder disease does not explain the falling platelets and hemoglobin, and these laboratory changes are pathological rather than physiological variation."} },

{id:"PAA-098", t:"single", cn:"PAA", sys:"ENDO", topic:"Neonatal hypoglycemia", d:3, b:0.55, cj:"prioritize", tags:["neonatal hypoglycemia","feeding","monitoring"],
 stem:"A newborn of a mother with gestational diabetes is jittery at two hours of life, with a blood glucose of 32 mg/dL. The infant is alert and feeding cues are present. What is the priority action?",
 opts:["Feed the infant immediately and recheck the glucose shortly afterward, escalating to intravenous dextrose if the level does not rise or the infant deteriorates",
  "Start an intravenous dextrose infusion immediately without attempting a feed, since any low value requires intravenous treatment",
  "Recheck the glucose in four hours, since mild jitteriness in an infant of this age is expected",
  "Give intramuscular glucagon and wait for the level to respond before feeding"],
 ans:0,
 rat:{c:"For an asymptomatic or mildly symptomatic newborn who can feed, the first step is a feed, followed by a repeat glucose to confirm the response. Intravenous dextrose is reserved for those who cannot feed, who remain hypoglycemic, or who have significant symptoms such as lethargy or seizures.",
  s:"Skipping a feed in an infant who can suck removes the simplest effective treatment. Waiting four hours risks seizure and brain injury in a newborn with limited glycogen stores, and glucagon is not first-line when enteral feeding is possible."} },

{id:"PAA-099", t:"single", cn:"PAA", sys:"NEURO", topic:"Cold stress in the newborn", d:3, b:0.55, cj:"analyze", tags:["thermoregulation","cold stress","non-shivering thermogenesis"],
 stem:"A newborn has an axillary temperature of 36.1°C and a respiratory rate of 68 breaths per minute. The infant is in an open cot away from the mother. What does the nurse recognize?",
 opts:["Cold stress, because the newborn generates heat by non-shivering thermogenesis using brown fat, which consumes oxygen and glucose and raises the respiratory rate",
  "Sepsis, since tachypnea in a newborn always indicates infection",
  "Normal transition, since newborns commonly run cool and breathe rapidly in the first hours",
  "Overheating, since a raised respiratory rate is the newborn's way of releasing heat"],
 ans:0,
 rat:{c:"Newborns cannot shiver and rely on non-shivering thermogenesis in brown fat, a process that consumes large amounts of oxygen and glucose. Cold stress therefore produces hypoxia, hypoglycemia, and tachypnea, and it is corrected by warming and skin-to-skin contact.",
  s:"Tachypnea has many causes and is not specific to infection, and this temperature is below the normal range rather than normal. Newborns lose heat rapidly and do not regulate it well, so 36.1°C is not expected, and they cannot dissipate heat effectively by panting."} },

{id:"PAA-100", t:"single", cn:"PAA", sys:"GI", topic:"Necrotizing enterocolitis in a premature infant", d:3, b:0.55, cj:"recognize", tags:["necrotizing enterocolitis","prematurity","abdominal distension"],
 stem:"A 30-week premature infant being fed enterally develops abdominal distension, temperature instability, bloody stools, and increased apnea. What should the nurse do?",
 opts:["Stop the feeds, notify the provider immediately, and anticipate abdominal imaging and possible antibiotic therapy and surgical consultation",
  "Continue the feeds at a reduced volume, since stopping nutrition delays growth in a premature infant",
  "Give a rectal stimulant to relieve the distension and recheck the abdominal girth in four hours",
  "Increase the feed volume, since bloody stools in a premature infant usually reflect an immature gut rather than disease"],
 ans:0,
 rat:{c:"Feeding intolerance with abdominal distension, bloody stools, temperature instability, and apnea in a premature infant is the classic presentation of necrotizing enterocolitis. Immediate management is stopping enteral feeds, gastric decompression, antibiotics, imaging, and surgical consultation.",
  s:"Continuing any enteral feed risks perforation of necrotic bowel. Rectal stimulation in a fragile, distended bowel can cause perforation, and bloody stools with systemic signs are pathological rather than an expected finding of immaturity."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-126", t:"single", cn:"MOC", sys:"PSYCH", topic:"Moral distress versus moral residue", d:3, b:0.55, cj:"analyze", tags:["moral distress","moral residue","professional wellbeing"],
 stem:"A nurse believes a client is receiving aggressive treatment that only prolongs suffering but is required to deliver it, and continues to feel the weight of that conflict months later. What does the nurse recognize?",
 opts:["Moral distress at the time of the conflict, with moral residue persisting afterward, both of which warrant structured support and ethical review",
  "A personal failure of resilience, since experienced nurses learn to set aside ethical conflict",
  "An ordinary work stressor with no ethical component, since the nurse was following orders",
  "Burnout, which is defined as an ethical conflict between personal values and required practice"],
 ans:0,
 rat:{c:"Moral distress arises when one knows the right course but is constrained from taking it. Moral residue is the lingering effect of unresolved episodes, which accumulates over time and contributes to withdrawal from practice. Both call for ethical debriefing and organizational support.",
  s:"Framing it as failed resilience individualizes a structural problem. Following orders does not remove the ethical dimension, and burnout is a broader syndrome of exhaustion rather than specifically an ethical conflict."} },

{id:"MOC-127", t:"single", cn:"MOC", sys:"CV", topic:"Family presence during resuscitation", d:3, b:0.55, cj:"act", tags:["family presence","resuscitation","communication"],
 stem:"During a cardiac arrest, the client's spouse asks to remain in the room. What is the most appropriate response by the nurse?",
 opts:["Offer the option with a staff member assigned to stay with the family member, explain what is happening, and support them to leave if they wish",
  "Refuse, since family presence is known to interfere with resuscitation performance",
  "Refuse, since witnessing a resuscitation reliably causes lasting psychological harm",
  "Allow it only if the family member promises not to speak or intervene during the event"],
 ans:0,
 rat:{c:"Evidence does not show that family presence harms resuscitation performance, and many families report benefit from having been present. The practice is supported when a team member is assigned to the family to explain, answer, and support them.",
  s:"The claim of interference is not supported by the evidence, and studies generally show neutral or positive psychological outcomes for families who choose to be present. Setting conditions on their behaviour turns an offer of support into a test."} },

{id:"MOC-128", t:"single", cn:"MOC", sys:"RESP", topic:"Nursing care during terminal extubation", d:3, b:0.55, cj:"act", tags:["terminal extubation","comfort care","end of life"],
 stem:"A client with an irreversible illness is to be extubated with comfort as the sole goal. What is the nurse's priority after the tube is removed?",
 opts:["Assess and treat distress proactively, with opioids and other agents titrated to comfort, alongside oral care, positioning, and family support",
  "Withhold analgesia until clear signs of pain appear, since giving opioids beforehand hastens death",
  "Continue full monitoring with alarms enabled so that any deterioration is detected and treated",
  "Leave the room to give the family comfort and privacy, returning only when the client dies"],
 ans:0,
 rat:{c:"After terminal extubation the goal is relief of dyspnea and distress, so medication is titrated to comfort and given proactively rather than only on evident suffering. Mouth care, positioning, and family support are central nursing interventions.",
  s:"Withholding treatment until distress is obvious abandons the client to suffering, and symptom-directed dosing at the end of life is ethically and legally distinct from intent to kill. Audible alarms are typically silenced as non-beneficial, and the nurse's presence is part of the care."} },

{id:"MOC-129", t:"single", cn:"MOC", sys:"INTG", topic:"Authorization for autopsy", d:2, b:0.45, cj:"act", tags:["autopsy","consent","after death"],
 stem:"A client dies in the hospital after an unclear clinical course, and the provider asks whether an autopsy should be done. What should the nurse understand about authorization?",
 opts:["The legal next of kin must give consent for a hospital autopsy, and the nurse's role is to support the family and follow facility process rather than to decide",
  "The treating provider can authorize the autopsy, since the clinical uncertainty justifies the examination",
  "The hospital can authorize it, since the death occurred on its premises",
  "No authorization is needed, since autopsies are a standard part of any inpatient death"],
 ans:0,
 rat:{c:"A hospital autopsy is a request to the family, and consent from the legal next of kin is required. The nurse supports the family with information and time, documents the decision, and follows facility process. Only a medical examiner or coroner case proceeds without family consent.",
  s:"Clinical interest does not create authority, and neither the hospital nor the treating provider can consent on the family's behalf. Autopsy is not routine and requires specific authorization except where the death falls under medical examiner jurisdiction."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-097", t:"single", cn:"SIC", sys:"INF", topic:"Early sepsis recognition with qSOFA", d:3, b:0.55, cj:"recognize", tags:["sepsis","qSOFA","early warning"],
 stem:"A client admitted with a urinary tract infection now has a respiratory rate of 24 breaths per minute, systolic blood pressure of 96 mm Hg, and new confusion. Temperature is 37.4°C. What does the nurse recognize?",
 opts:["Possible sepsis, since altered mentation, low systolic pressure, and raised respiratory rate meet the qSOFA criteria even without fever",
  "Dehydration, since the systolic blood pressure is only mildly reduced and the client is afebrile",
  "Normal illness behaviour, since confusion is expected in a hospitalized older adult",
  "Anxiety, since a raised respiratory rate and confusion are common responses to hospitalization"],
 ans:0,
 rat:{c:"The qSOFA criteria are a respiratory rate of 22 or more, systolic blood pressure of 100 mm Hg or less, and altered mentation. Two or more indicate a high risk of poor outcome and prompt urgent evaluation for sepsis. Fever is absent in a substantial proportion of septic clients.",
  s:"Attributing the pattern to dehydration, ageing, or anxiety delays the time-critical response that sepsis requires. Afebrile sepsis is common, particularly in older and immunocompromised clients, and normalizing new confusion is a recognized source of missed sepsis."} },

{id:"SIC-098", t:"single", cn:"SIC", sys:"GI", topic:"Stool specimen quality for diarrheal testing", d:3, b:0.55, cj:"act", tags:["stool specimen","diarrheal testing","specimen integrity"],
 stem:"A client with several days of watery diarrhea requires stool testing for a bacterial pathogen. The client passes a formed stool an hour later. What should the nurse do?",
 opts:["Collect only unformed stool, since formed specimens are rejected for diarrheal pathogen testing and can give misleading results",
  "Send the formed stool, since any stool specimen is acceptable for pathogen testing",
  "Give a laxative to produce a loose specimen, since a fresh sample is needed urgently",
  "Collect the formed stool and note the consistency on the request form so the laboratory can interpret it"],
 ans:0,
 rat:{c:"Testing for diarrheal pathogens requires unformed stool, because formed specimens suggest the diarrhea has resolved and can yield colonizing organisms rather than a true pathogen. Laboratories reject formed specimens for this indication by policy.",
  s:"Sending a formed specimen wastes the test and can produce misleading positive results. Inducing diarrhea with a laxative is inappropriate and risks harm, and a note on the form does not make an unsuitable specimen acceptable."} },

{id:"SIC-099", t:"single", cn:"SIC", sys:"INTG", topic:"Preoperative hair removal", d:3, b:0.55, cj:"act", tags:["surgical site infection","hair removal","clipping"],
 stem:"A client requires hair removal from the surgical site before an operation. What method should the nurse use?",
 opts:["Clip the hair immediately before surgery, since shaving with a razor causes microabrasions that increase surgical site infection",
  "Shave with a razor the evening before, so the skin has time to recover before the incision",
  "Use a depilatory cream routinely, since it removes hair without any skin contact",
  "Remove the hair in all cases, since hair at the surgical site is the principal source of wound contamination"],
 ans:0,
 rat:{c:"Razor shaving creates microabrasions that bacteria colonize, increasing surgical site infection, so clipping is the recommended method and is done as close to the operation as possible. Hair should not be removed at all unless it interferes with the procedure.",
  s:"Shaving the night before maximizes bacterial colonization of any abrasions. Depilatory creams irritate skin and are not routine, and hair is not removed routinely because removal itself, not the hair, is the main risk factor."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-075", t:"single", cn:"HPM", sys:"GI", topic:"Introducing solid foods to an infant", d:3, b:0.55, cj:"generate", tags:["infant feeding","solids","development"],
 stem:"A parent asks when and how to start solid foods for their 5-month-old infant. What should the nurse teach?",
 opts:["Wait for developmental readiness around 6 months, introduce iron-rich foods one at a time, and avoid honey and cow's milk as a main drink in the first year",
  "Start now, since earlier introduction prevents later food allergy and improves sleep",
  "Begin with diluted fruit juice in a bottle, since it is gentle and provides vitamins",
  "Introduce several new foods at once so the infant adapts more quickly to variety"],
 ans:0,
 rat:{c:"Solids are introduced around 6 months when the infant can sit with support, hold the head steady, and shows interest. Iron-rich foods are prioritized because iron stores decline, and honey is avoided in the first year because of infant botulism, with cow's milk not used as a main drink.",
  s:"Early introduction does not prevent allergy and is not recommended before readiness signs. Juice in a bottle contributes to caries and displaces milk, and introducing one food at a time is what allows an adverse reaction to be identified."} },

{id:"HPM-076", t:"single", cn:"HPM", sys:"INTG", topic:"Scald prevention in the home", d:3, b:0.55, cj:"generate", tags:["scald prevention","home safety","children"],
 stem:"A nurse is giving home safety teaching to the parents of a toddler. What should be included about scald risk?",
 opts:["Set the water heater thermostat to a maximum of 49°C and test bath water before the child enters, since young children sustain full-thickness burns in seconds at higher temperatures",
  "Keep the water heater at its factory setting, since manufacturers already set a safe temperature",
  "Teach the child not to turn on the hot tap, since supervision alone prevents scalds",
  "Use only cold water for bathing, since any warm water is unsafe for a toddler"],
 ans:0,
 rat:{c:"A toddler's skin reaches a full-thickness burn in about one second at 60°C but takes many minutes at 49°C, so lowering the water heater setting is the single most effective structural control. Testing the water before bathing adds a second layer of protection.",
  s:"Factory settings are commonly well above the safe range for households with young children. A toddler cannot reliably follow that instruction, and supervision does not prevent an accidental tap turn, while warm bathing water at a safe temperature is appropriate."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-073", t:"single", cn:"BCC", sys:"REPI", topic:"Managing breast engorgement", d:2, b:0.45, cj:"generate", tags:["engorgement","breastfeeding","comfort"],
 stem:"A breastfeeding client on day four reports hard, hot, painful breasts and a flat nipple that makes latching difficult. What should the nurse recommend?",
 opts:["Feed frequently, apply warmth briefly before feeding to encourage flow, use cold compresses between feeds, and express a small amount to soften the areola for latching",
  "Stop breastfeeding for 24 hours so the breasts can rest and latching can resume comfortably",
  "Apply firm massage and continuous heat throughout the day to disperse the swelling",
  "Wean to formula immediately, since engorgement on day four indicates that breastfeeding has failed"],
 ans:0,
 rat:{c:"Engorgement reflects vascular and lymphatic fullness as milk volume rises. Frequent removal of milk is the treatment, brief warmth before feeds aids flow, cold between feeds reduces swelling and discomfort, and hand-expressing a little milk softens the areola so the infant can latch.",
  s:"Stopping feeds worsens engorgement and reduces supply. Continuous heat and firm massage increase vascular engorgement and can damage tissue, and day-four engorgement is a normal transition rather than a sign of failure."} }
  );
})();
