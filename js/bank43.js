/* Wave 33 — 20 hand-authored hard RN items.
 * Pharmacology (15.8% against 16%), Physiological Adaptation (13.6% against
 * 14%), Psychosocial Integrity (8.8% against 9%), Reduction of Risk
 * Potential (11.8% against 12%) and Management of Care (17.8% against 18%)
 * are all under their blueprint share, so wave 33 is spread across those
 * five. Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms against the current 1009-item bank.
 *
 * Pharmacology        : PHA-163 – PHA-168
 * Physiological Adapt : PAA-134 – PAA-138
 * Psychosocial        : PSY-084 – PSY-087
 * Reduction of Risk   : RRP-125 – RRP-127
 * Management of Care  : MOC-176 – MOC-177
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (6) ---------------- */

{id:"PHA-163", t:"single", cn:"PHA", sys:"HEME", topic:"Agranulocytosis on an antithyroid drug", d:3, b:0.55, cj:"prioritize", tags:["methimazole","agranulocytosis","safety monitoring"],
 stem:"A client taking methimazole for Graves disease reports a two-day sore throat and has a temperature of 38.6 C. What is the nurse's priority action?",
 opts:["Stop the drug and obtain an absolute neutrophil count immediately, because agranulocytosis develops abruptly and is life-threatening",
  "Advise a throat lozenge and an antipyretic, since sore throat is common in hyperthyroidism",
  "Continue the drug and recheck the white cell count at the next scheduled appointment",
  "Halve the dose, since agranulocytosis is dose related and a lower dose is safe to continue"],
 ans:0,
 rat:{c:"Antithyroid drugs can cause abrupt agranulocytosis, usually in the first months but at any time. Fever or sore throat is the sentinel presentation and requires stopping the drug and checking the neutrophil count at once, because continuing risks overwhelming infection.",
  s:"Symptomatic treatment delays recognition of a neutrophil crisis. Waiting for the next scheduled count forfeits the window in which stopping the drug prevents harm, and dose reduction does not remove the risk once the process has begun."} },

{id:"PHA-164", t:"single", cn:"PHA", sys:"MSK", topic:"Rebound fracture risk after stopping denosumab", d:3, b:0.55, cj:"analyze", tags:["denosumab","osteoporosis","rebound bone loss"],
 stem:"A client receiving denosumab for osteoporosis asks about stopping the injections because they are inconvenient. What should the nurse explain?",
 opts:["Stopping abruptly causes rapid bone loss and a rebound rise in vertebral fracture risk, so any change must be planned with the prescriber and followed by another antiresorptive",
  "Stopping is safe at any time, because bone density gained is retained afterward",
  "The injections can be paused for a few months and then resumed without consequence",
  "Calcium supplementation alone maintains the benefit once the drug is stopped"],
 ans:0,
 rat:{c:"Denosumab inhibits RANK ligand, and its effect reverses quickly on withdrawal. Discontinuation produces accelerated bone turnover and a rebound increase in vertebral fractures, so a follow-on antiresorptive is required rather than a simple stop.",
  s:"The gain is not retained after withdrawal. A pause is not a neutral act, and calcium does not substitute for antiresorptive therapy."} },

{id:"PHA-165", t:"single", cn:"PHA", sys:"HEME", topic:"Mandatory safeguards with lenalidomide", d:3, b:0.55, cj:"act", tags:["lenalidomide","thrombosis","teratogenicity"],
 stem:"A client is starting lenalidomide for multiple myeloma. What must the nurse ensure is in place before the first dose?",
 opts:["Thromboprophylaxis and enrolment in the restricted distribution programme with confirmed contraception, because the drug causes thrombosis and is severely teratogenic",
  "Routine blood count monitoring only, since the drug has no other significant risks",
  "Confirmation that aspirin is never appropriate, since anticoagulation is the only permitted prophylaxis",
  "Confirmation that contraception is unnecessary for male clients, since teratogenicity applies only to those who could become pregnant"],
 ans:0,
 rat:{c:"Lenalidomide carries a high risk of venous and arterial thrombosis, so prophylaxis is mandatory, and it is a severe teratogen requiring the restricted distribution programme with verified contraception. Men are included because the drug is present in semen.",
  s:"Blood counts alone miss the two defining hazards. Prophylaxis is risk-stratified and aspirin is acceptable for low-risk clients, and male clients are covered by the programme because of seminal transfer."} },

{id:"PHA-166", t:"single", cn:"PHA", sys:"HEME", topic:"Administration and monitoring of imatinib", d:2, b:0.45, cj:"generate", tags:["imatinib","fluid retention","adherence"],
 stem:"A client starting imatinib for chronic myeloid leukaemia asks how to take it. What should the nurse teach?",
 opts:["Take it with a meal and a large glass of water, report periorbital swelling or rapid weight gain, and never stop it without discussing with the prescriber",
  "Take it on an empty stomach, since food reduces absorption",
  "Stop it as soon as the blood counts normalise, since that means remission has been achieved",
  "Take it with grapefruit juice, which improves absorption"],
 ans:0,
 rat:{c:"Taking imatinib with food and plenty of fluid reduces gastrointestinal upset and improves tolerance. Fluid retention causes periorbital oedema and weight gain, which must be reported, and stopping the drug risks relapse even when counts are normal.",
  s:"Empty-stomach dosing worsens nausea. Normal counts reflect control rather than cure, so continuation is required, and grapefruit juice inhibits the enzyme that clears the drug and raises toxicity."} },

{id:"PHA-167", t:"single", cn:"PHA", sys:"MSK", topic:"Fatal colchicine interaction", d:3, b:0.55, cj:"prioritize", tags:["colchicine","CYP3A4","narrow therapeutic index"],
 stem:"A client takes colchicine for gout prophylaxis and is prescribed clarithromycin for a chest infection. What should the nurse do?",
 opts:["Alert the prescriber, because clarithromycin inhibits the pathways that clear colchicine and the combination can cause fatal colchicine toxicity",
  "Give both as prescribed, since a short course of clarithromycin does not interact",
  "Separate the two doses by four hours to avoid the interaction",
  "Double the colchicine dose, since the antibiotic reduces its absorption"],
 ans:0,
 rat:{c:"Colchicine has a narrow therapeutic index and is cleared by CYP3A4 and P-glycoprotein, both of which clarithromycin inhibits. Accumulation causes gastrointestinal distress, myopathy, and cytopenias and can be fatal, so an alternative antibiotic or a colchicine dose change is needed.",
  s:"Course length does not determine interaction risk. Spacing doses does not overcome enzyme inhibition, and increasing the dose worsens an already dangerous accumulation."} },

{id:"PHA-168", t:"single", cn:"PHA", sys:"MSK", topic:"Interleukin-6 blockade masking infection", d:3, b:0.55, cj:"recognize", tags:["tocilizumab","biologic therapy","masked infection"],
 stem:"A client on tocilizumab for rheumatoid arthritis has a productive cough and malaise, but a temperature of 37.1 C and a normal C-reactive protein. What does the nurse recognize?",
 opts:["Serious infection may still be present, because interleukin-6 blockade suppresses fever and the acute phase response, so assessment cannot rely on those markers",
  "Infection is unlikely, since fever and a raised C-reactive protein are the defining markers of infection",
  "The symptoms indicate a flare of the underlying arthritis rather than an infection",
  "Reassurance is appropriate, since biologic therapy protects against respiratory infection"],
 ans:0,
 rat:{c:"Tocilizumab blocks interleukin-6, which drives fever and hepatic acute phase protein production. Infection can therefore present with a normal temperature and C-reactive protein, so clinical assessment and a low threshold for investigation are essential.",
  s:"Normal inflammatory markers are not reassuring on this drug, which is the point of its mechanism. A productive cough is not a feature of an arthritis flare, and biologic therapy increases rather than reduces infection risk."} },

/* ---------------- Physiological Adaptation (5) ---------------- */

{id:"PAA-134", t:"single", cn:"PAA", sys:"REPI", topic:"Uterine inversion after delivery", d:3, b:0.55, cj:"prioritize", tags:["uterine inversion","obstetric emergency","postpartum hemorrhage"],
 stem:"Immediately after delivery of the placenta a client has heavy bleeding, a boggy mass is visible at the introitus, and the fundus is not palpable abdominally. What is the nurse's priority action?",
 opts:["Call for help and prepare for immediate replacement of the uterus, leaving an attached placenta in place until after replacement, while resuscitating with intravenous fluids",
  "Remove the placenta quickly, since retained tissue is causing the bleeding",
  "Give a uterotonic first and attempt replacement once the uterus is firm",
  "Apply firm fundal massage and wait for the uterus to contract on its own"],
 ans:0,
 rat:{c:"A fundus that cannot be palpated with a mass at the introitus after delivery indicates uterine inversion, an obstetric emergency causing hemorrhage and shock. The uterus is replaced immediately, an attached placenta is left until after replacement to limit blood loss, and a uterotonic is given only once the uterus is back in position.",
  s:"Removing an attached placenta before replacement greatly increases blood loss. A uterotonic beforehand firms the inverted uterus and makes replacement harder, and there is no fundus in the abdomen to massage."} },

{id:"PAA-135", t:"single", cn:"PAA", sys:"GI", topic:"Hirschsprung disease in an infant", d:3, b:0.55, cj:"recognize", tags:["Hirschsprung disease","aganglionosis","enterocolitis"],
 stem:"A 3-week-old infant has abdominal distension and bilious vomiting, and did not pass meconium until the fourth day of life. A digital rectal examination produces an explosive release of stool and gas. What does the nurse recognize?",
 opts:["Hirschsprung disease, in which an aganglionic segment cannot relax, so the infant needs surgical referral and close monitoring for enterocolitis",
  "Constipation from formula feeding, which is managed by changing the formula",
  "Pyloric stenosis, since bilious vomiting in a young infant defines that condition",
  "An anal fissure, since the explosive stool indicates a tear in the anal canal"],
 ans:0,
 rat:{c:"Delayed meconium passage, abdominal distension, bilious vomiting, and an explosive release of stool on rectal examination are characteristic of Hirschsprung disease, where an aganglionic distal segment fails to relax. The main threat is enterocolitis, which can progress to sepsis, so surgical referral and vigilant monitoring are required.",
  s:"Changing formula does not treat an aganglionic segment, and the squirt sign points away from simple constipation. Pyloric stenosis causes non-bilious projectile vomiting, and an anal fissure causes painful small stools with blood rather than this picture."} },

{id:"PAA-136", t:"single", cn:"PAA", sys:"CV", topic:"Hypercyanotic spell in tetralogy of Fallot", d:3, b:0.55, cj:"act", tags:["tetralogy of Fallot","hypercyanotic spell","knee-chest position"],
 stem:"An infant with unrepaired tetralogy of Fallot becomes cyanotic and irritable during feeding. What is the nurse's immediate action?",
 opts:["Place the infant in a knee-chest position, give oxygen, and call for help, since this raises systemic vascular resistance and reduces the right-to-left shunt",
  "Lay the infant flat and elevate the legs, since this improves venous return",
  "Continue the feed to maintain caloric intake, since cyanosis during feeding is expected",
  "Give a sedative immediately, since agitation is the cause of the cyanosis"],
 ans:0,
 rat:{c:"A hypercyanotic spell reflects increased right-to-left shunting across the ventricular defect. Knee-chest positioning kinks the femoral arteries, raises systemic vascular resistance, and reduces the shunt, while oxygen improves pulmonary blood flow. Feeding is stopped and the team alerted.",
  s:"Flat positioning with leg elevation does not raise systemic vascular resistance in the way needed and can worsen the shunt. Feeding through a spell risks decompensation, and sedation may be used later but positioning and oxygen come first."} },

{id:"PAA-137", t:"single", cn:"PAA", sys:"ENDO", topic:"Salt-wasting adrenal crisis", d:3, b:0.55, cj:"prioritize", tags:["congenital adrenal hyperplasia","adrenal crisis","hyperkalemia"],
 stem:"A 10-day-old infant with known congenital adrenal hyperplasia has vomiting, poor feeding, weight loss, and lethargy. Sodium is 124 mmol/L and potassium 7.1 mmol/L. What should the nurse anticipate?",
 opts:["Adrenal crisis requiring immediate intravenous hydrocortisone and isotonic fluid resuscitation, alongside specific treatment of the hyperkalemia",
  "Oral rehydration, since the infant is dehydrated from vomiting alone and has no adrenal problem",
  "Insulin and dextrose only, since the potassium is the sole problem",
  "A low-potassium formula, since the electrolyte disturbance is dietary"],
 ans:0,
 rat:{c:"Salt-wasting congenital adrenal hyperplasia causes cortisol and aldosterone deficiency, producing hyponatremia, hyperkalemia, hypovolemia, and shock. This is a medical emergency requiring parenteral hydrocortisone and fluid resuscitation together with specific treatment of the hyperkalemia.",
  s:"Oral rehydration cannot correct an adrenal crisis and delays life-saving steroid replacement. Treating potassium without replacing cortisol leaves the underlying deficiency unaddressed, and the disturbance is hormonal rather than dietary."} },

{id:"PAA-138", t:"single", cn:"PAA", sys:"GI", topic:"Conjugated hyperbilirubinemia in an infant", d:3, b:0.55, cj:"recognize", tags:["biliary atresia","conjugated hyperbilirubinemia","time-critical surgery"],
 stem:"A 6-week-old infant has persistent jaundice with pale clay-coloured stools and dark urine. The total bilirubin is elevated with a predominant conjugated fraction. What does the nurse recognize?",
 opts:["Conjugated hyperbilirubinemia is never physiological, so this requires urgent investigation for biliary atresia, because surgery is time-critical",
  "Breast milk jaundice, which is common at this age and resolves without treatment",
  "Physiological jaundice, since newborn jaundice commonly lasts six weeks",
  "Haemolytic disease, since conjugated bilirubin rises whenever red cells break down"],
 ans:0,
 rat:{c:"Conjugated hyperbilirubinemia always indicates pathology, and pale stools with dark urine point to obstructed bile flow. Biliary atresia requires a portoenterostomy, and outcomes fall sharply if it is performed beyond roughly eight weeks of life, which makes the finding urgent.",
  s:"Breast milk jaundice and physiological jaundice are unconjugated, so a predominant conjugated fraction excludes both. Haemolysis also produces unconjugated hyperbilirubinemia, and the pale stools point to obstruction rather than breakdown."} },

/* ---------------- Psychosocial Integrity (4) ---------------- */

{id:"PSY-084", t:"single", cn:"PSY", sys:"PSYCH", topic:"Panic disorder and the cost of avoidance", d:3, b:0.55, cj:"analyze", tags:["panic disorder","agoraphobia","avoidance"],
 stem:"A client has had three episodes of abrupt palpitations, chest pain, and fear of dying, each peaking within minutes and resolving within half an hour. Cardiac investigation is normal. The client now avoids leaving home. What is the priority nursing focus?",
 opts:["Recognize panic disorder and treat the symptoms as real, while preventing avoidance from becoming entrenched, since avoidance maintains the disorder",
  "Reassure the client that the episodes are not real symptoms and can safely be ignored",
  "Encourage the client to stay home until the episodes stop, since safety comes first",
  "Continue cardiac monitoring, since one normal result does not exclude heart disease"],
 ans:0,
 rat:{c:"Panic attacks are genuine physiological events, and validating them builds the trust needed for treatment. Avoidance of places associated with attacks develops into agoraphobia and reinforces the cycle, so graded exposure and treatment rather than accommodation are the priority.",
  s:"Dismissing the symptoms as unreal damages engagement and is factually wrong. Accommodating avoidance consolidates agoraphobia, and repeated cardiac investigation after a normal workup reinforces illness-focused anxiety."} },

{id:"PSY-085", t:"single", cn:"PSY", sys:"PSYCH", topic:"Posttraumatic stress disorder after assault", d:3, b:0.55, cj:"act", tags:["posttraumatic stress disorder","trauma-focused therapy","risk assessment"],
 stem:"A client who survived a serious assault four weeks ago has intrusive memories, avoids the area, is hypervigilant, and has slept poorly since. What should the nurse do?",
 opts:["Assess for posttraumatic stress disorder and refer for trauma-focused psychological therapy, while assessing risk and not pressuring the client to retell the event",
  "Arrange a single detailed debriefing session, since talking through the event once prevents later disorder",
  "Reassure the client that these reactions settle on their own within a few months",
  "Request a benzodiazepine as first-line treatment, since insomnia is the main problem"],
 ans:0,
 rat:{c:"Intrusion, avoidance, negative mood, and hyperarousal persisting beyond a month indicate posttraumatic stress disorder. Trauma-focused cognitive behavioural therapy is first-line, assessment must include risk, and forced retelling is not therapeutic.",
  s:"Single-session psychological debriefing is not recommended and can worsen outcomes. Many people do recover, but established symptoms warrant active treatment rather than watchful waiting, and benzodiazepines are not first-line and may hinder processing."} },

{id:"PSY-086", t:"single", cn:"PSY", sys:"PSYCH", topic:"Response prevention in obsessive-compulsive disorder", d:3, b:0.55, cj:"act", tags:["obsessive-compulsive disorder","exposure and response prevention","therapeutic use of self"],
 stem:"A client with obsessive-compulsive disorder becomes extremely distressed when the nurse interrupts a handwashing ritual. What is the most therapeutic response?",
 opts:["Acknowledge the distress without participating in or facilitating the ritual, and work within the agreed plan for exposure and response prevention",
  "Allow the ritual to continue, since any response that interrupts it is harmful and increases anxiety",
  "Join the ritual briefly to build rapport, then stop once trust is established",
  "Hold the client's hands if necessary, since the behaviour must be extinguished quickly"],
 ans:0,
 rat:{c:"Exposure and response prevention is the effective psychological treatment, and nurses support it by not accommodating rituals while validating the distress the client genuinely experiences. The approach is graded and collaborative rather than confrontational.",
  s:"Unrestricted accommodation maintains the disorder. Participating in the ritual reinforces it, and physical restraint is coercive, damaging, and part of no evidence-based protocol."} },

{id:"PSY-087", t:"single", cn:"PSY", sys:"PSYCH", topic:"Schizophreniform disorder distinguished by duration", d:2, b:0.45, cj:"analyze", tags:["schizophreniform disorder","duration criteria","differential"],
 stem:"A client has had delusions, hallucinations, and disorganised speech for four months, with no mood episode and no substance cause. What is the correct diagnosis at this point?",
 opts:["Schizophreniform disorder, because the symptom criteria are met but the duration is between one and six months rather than the six months required for schizophrenia",
  "Schizophrenia, since the symptoms themselves meet the criteria regardless of duration",
  "Brief psychotic disorder, since the episode has lasted only a few months rather than a year",
  "Schizoaffective disorder, since psychosis of this duration implies a mood component"],
 ans:0,
 rat:{c:"The symptom criteria are the same, and the distinction is duration: brief psychotic disorder lasts under one month, schizophreniform disorder one to six months, and schizophrenia requires at least six months including prodromal or residual signs.",
  s:"Duration is the defining difference, so symptom severity alone does not establish schizophrenia. Brief psychotic disorder is limited to under a month, and schizoaffective disorder requires a concurrent major mood episode, which is absent here."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-125", t:"single", cn:"RRP", sys:"CV", topic:"Contraindication and care of an intra-aortic balloon pump", d:3, b:0.55, cj:"evaluate", tags:["intra-aortic balloon pump","cardiogenic shock","counterpulsation"],
 stem:"A client has an intra-aortic balloon pump in place for cardiogenic shock. The nurse is reviewing contraindications and monitoring requirements. What is correct?",
 opts:["Aortic regurgitation is an absolute contraindication, and the nurse monitors limb perfusion and balloon timing while keeping the hip straight on the insertion side",
  "Aortic regurgitation is acceptable, since the balloon improves coronary perfusion in that condition",
  "The client may sit up freely, since early mobility prevents the complications of bed rest",
  "Balloon timing is set once at insertion and needs no review unless the client deteriorates"],
 ans:0,
 rat:{c:"The balloon inflates in diastole to augment coronary perfusion and deflates before systole to reduce afterload. In aortic regurgitation inflation would worsen backflow into the left ventricle, so it is contraindicated. Femoral insertion requires a straight leg and close monitoring of distal perfusion, and timing is checked continuously against the arterial waveform.",
  s:"Aortic regurgitation makes counterpulsation harmful rather than helpful. Hip flexion risks balloon migration and vascular injury, and mistimed inflation or deflation reduces benefit and can injure the ventricle."} },

{id:"RRP-126", t:"single", cn:"RRP", sys:"RESP", topic:"Oxygenator failure on extracorporeal support", d:3, b:0.55, cj:"prioritize", tags:["ECMO","oxygenator failure","emergency"],
 stem:"A client on venovenous extracorporeal membrane oxygenation has a sudden fall in circuit oxygen saturation and the blood in the circuit darkens. What is the nurse's priority action?",
 opts:["Assess the circuit and gas supply immediately and call the perfusionist, since this indicates failure of oxygenation that the client cannot compensate for",
  "Increase the sweep gas flow and observe, since dark blood is a normal finding on this circuit",
  "Reduce the blood flow to protect the oxygenator from further damage",
  "Document the finding and reassess in an hour, since saturation and oxygenation fluctuate during support"],
 ans:0,
 rat:{c:"On venovenous support the client depends entirely on the circuit for oxygenation. Darkening circuit blood with falling saturation signals oxygenator failure, a gas supply problem, or recirculation, and requires immediate assessment with the perfusionist because there is no respiratory reserve.",
  s:"Sweep gas adjustment does not address a failing oxygenator or an exhausted gas supply. Reducing blood flow worsens oxygen delivery, and waiting an hour is not survivable when the client has no independent gas exchange."} },

{id:"RRP-127", t:"single", cn:"RRP", sys:"ENDO", topic:"Interpreting a raised TSH with normal free T4", d:3, b:0.55, cj:"evaluate", tags:["subclinical hypothyroidism","thyroid function","interpretation"],
 stem:"A client has a thyroid-stimulating hormone of 6.8 mIU/L with a normal free thyroxine and no symptoms. How should the nurse interpret this?",
 opts:["Subclinical hypothyroidism, in which the pituitary is compensating, so it is monitored and treatment is decided on trend, symptoms, and risk rather than the number alone",
  "Overt hypothyroidism, since any hormone above the reference range requires immediate replacement even without symptoms",
  "Normal thyroid function, since the free thyroxine is within range",
  "Laboratory error, since the two results cannot both be correct"],
 ans:0,
 rat:{c:"A raised thyroid-stimulating hormone with normal free thyroxine is subclinical hypothyroidism. Some people progress and some remain stable, so management weighs symptoms, antibody status, pregnancy plans, and cardiovascular risk, with repeat testing rather than automatic treatment.",
  s:"Overt hypothyroidism requires a low free thyroxine as well. The result is not normal, because the raised hormone shows compensation, and the two results are entirely consistent rather than contradictory."} },

/* ---------------- Management of Care (2) ---------------- */

{id:"MOC-176", t:"single", cn:"MOC", sys:"PSYCH", topic:"Consent by an emancipated minor", d:3, b:0.55, cj:"analyze", tags:["emancipated minor","consent","legal capacity"],
 stem:"A 16-year-old who is married and living independently presents alone for treatment and consents to a procedure. What should the nurse understand?",
 opts:["An emancipated minor can consent to their own care, so the nurse verifies the status under the relevant law and documents it rather than seeking parental consent",
  "Parental consent is always required for anyone under eighteen, without exception",
  "The client's verbal statement of independence is sufficient, so no verification is needed",
  "A court order must be obtained before every encounter, since emancipation expires annually"],
 ans:0,
 rat:{c:"Emancipation, through marriage, military service, parenthood, or court order depending on the jurisdiction, gives a minor legal capacity to consent to their own treatment. The nurse confirms the basis and records it, which protects both the client and the organization.",
  s:"Minors are not a single category, and emancipated minors, along with those consenting under specific statutes, are established exceptions. An unverified assertion is not documentation, and emancipation is a status rather than an annual order."} },

{id:"MOC-177", t:"single", cn:"MOC", sys:"PSYCH", topic:"Cultural humility when a client declines investigation", d:2, b:0.45, cj:"act", tags:["cultural humility","informed refusal","therapeutic relationship"],
 stem:"A client declines a recommended investigation because a traditional healer has advised against it. What is the most appropriate nursing response?",
 opts:["Explore the client's understanding and the healer's advice without judgement, then discuss the risks and benefits so the client can make an informed decision",
  "Explain that traditional advice has no clinical basis and should be disregarded",
  "Accept the refusal without further discussion, since the client's culture must not be questioned",
  "Contact the traditional healer directly to obtain permission for the investigation"],
 ans:0,
 rat:{c:"Cultural humility means recognizing that the client's framework is legitimate to them and that the nurse does not hold all the knowledge. Exploring it respectfully preserves trust and allows genuine informed decision-making, including the client's right to decline.",
  s:"Dismissing the client's beliefs damages trust and usually produces non-disclosure rather than agreement. Accepting refusal without ensuring the client understands the consequences is not informed refusal, and contacting the healer is not the nurse's role unless the client asks."} }
  );
})();
