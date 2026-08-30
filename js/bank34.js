/* Wave 24 — 20 hand-authored hard RN items.
 * Management of Care at 17.2% against an 18% target is now the largest
 * remaining blueprint gap, so wave 24 leads with four ethics and safety-
 * culture items. Pharmacology at 15.9% against 16%, Reduction of Risk at
 * 11.3% against 12%, and Physiological Adaptation at 13.1% against 14%
 * follow. Every item is d>=2; 16 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Management of Care  : MOC-139 – MOC-142
 * Pharmacology        : PHA-136 – PHA-139
 * Physiological Adapt : PAA-104 – PAA-107
 * Reduction of Risk   : RRP-100 – RRP-102
 * Safety              : SIC-108 – SIC-110
 * Basic Care/Comfort  : BCC-081
 * Health Promotion    : HPM-087
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-139", t:"single", cn:"MOC", sys:"PSYCH", topic:"Requesting an ethics consultation", d:3, b:0.55, cj:"act", tags:["ethics consultation","ethical dilemma","process"],
 stem:"A team is deadlocked: the family wants continued aggressive treatment for a client with no realistic chance of recovery, while the clinical team believes it is causing suffering. Repeated meetings have not resolved it. What should the nurse do?",
 opts:["Request a formal ethics consultation, since it provides a structured, neutral process that clarifies the values in conflict and supports the team and family toward a decision",
  "Continue to escalate within the chain of command until someone with authority decides the question",
  "Follow the family's wishes without further discussion, since the family always has final authority",
  "Follow the team's judgement and withdraw treatment, since clinical expertise determines what is appropriate"],
 ans:0,
 rat:{c:"When a values conflict persists after good-faith discussion, an ethics consultation brings a neutral, structured process: it identifies the ethical principles at stake, ensures every voice is heard, clarifies the client's own wishes, and documents the reasoning. It supports rather than replaces the decision-makers.",
  s:"Authority alone does not resolve a values conflict and tends to entrench positions. Family authority is not absolute and is bounded by the client's own wishes and by what is clinically possible, and clinical expertise informs but does not decide the ethical question."} },

{id:"MOC-140", t:"single", cn:"MOC", sys:"PSYCH", topic:"Paternalism and respect for autonomy", d:3, b:0.55, cj:"analyze", tags:["paternalism","autonomy","informed decision making"],
 stem:"A client with capacity declines a blood transfusion on religious grounds. The nurse believes the refusal is mistaken and considers not documenting it clearly so the transfusion will still be given. What does this represent?",
 opts:["Paternalism, because it substitutes the nurse's judgement for the decision of a client who has capacity, and withholding the refusal from the record would also be falsification",
  "Appropriate advocacy, since protecting the life of a client with capacity takes precedence over a refusal on religious grounds",
  "A reasonable compromise, since the nurse is not forcing the transfusion but simply not recording the objection",
  "An administrative judgement, since documentation choices are separate from ethical questions"],
 ans:0,
 rat:{c:"A client with capacity has the right to refuse any treatment, including life-saving treatment, and the nurse's role is to ensure the refusal is informed, documented, and communicated. Deliberately obscuring the refusal to achieve a different outcome is paternalism, and it is also falsification of the record.",
  s:"Advocacy means supporting the client's own informed choice, not overriding it. Recording the refusal is exactly what protects the client, and documentation is never a neutral administrative act when it determines what care is delivered."} },

{id:"MOC-141", t:"single", cn:"MOC", sys:"RESP", topic:"Crisis standards of care during a surge", d:3, b:0.55, cj:"analyze", tags:["crisis standards of care","allocation","surge"],
 stem:"A hospital declares crisis standards of care during a severe surge, and ventilators become scarce. What should the nurse understand about how allocation decisions are made?",
 opts:["They follow pre-established, publicly available criteria applied consistently by a triage team separate from direct care, rather than being decided at the bedside by individual clinicians",
  "They are made at the bedside by the nurse and physician caring for each client, since they know the client best",
  "They follow a strict first-come, first-served rule, since any other approach is discriminatory",
  "They are decided by which family advocates most forcefully, since engagement reflects the value of the life at stake"],
 ans:0,
 rat:{c:"Crisis standards of care shift the goal from the best outcome for each individual to the greatest good for the greatest number. Allocation uses objective, pre-published criteria applied uniformly by a triage team or officer, which separates the decision from the bedside relationship and protects clinicians from bearing it alone.",
  s:"Bedside rationing by individual clinicians is inconsistent and morally injurious. First-come, first-served ignores clinical benefit, and advocacy by families allocates resources to the loudest rather than to those most likely to benefit."} },

{id:"MOC-142", t:"single", cn:"MOC", sys:"INF", topic:"Reporting a latent hazard before harm occurs", d:3, b:0.55, cj:"act", tags:["hazard report","near miss","preventive reporting"],
 stem:"A nurse notices that two look-alike medication vials are stored adjacent to each other and that a colleague nearly selected the wrong one. No harm occurred. What should the nurse do?",
 opts:["Report the hazard through the safety reporting system and ask that the products be separated or labelled, since reporting before harm is what allows the system to be fixed",
  "Say nothing, since no harm occurred and reporting would create unnecessary work for the team",
  "Warn colleagues verbally to be careful with those two vials, since that addresses the immediate risk",
  "Move the vials to a different shelf personally and consider the matter closed"],
 ans:0,
 rat:{c:"The value of a safety reporting system lies in capturing hazards and near misses, which occur far more often than actual harm and reveal the same underlying weaknesses. A documented report creates the record needed to change storage, labelling, or ordering, and a verbal warning alone reaches only the people present.",
  s:"Silence preserves a trap that will eventually injure someone. Verbal warnings do not reach night staff or new colleagues and leave no record, and an undocumented individual fix can be reversed and does not address the ordering or supply cause."} },

/* ---------------- Pharmacology and Parenteral Therapies (4) ---------------- */

{id:"PHA-136", t:"single", cn:"PHA", sys:"NEURO", topic:"Carbamazepine hypersensitivity screening", d:3, b:0.55, cj:"act", tags:["carbamazepine","HLA-B*1502","Stevens-Johnson syndrome"],
 stem:"A client of East Asian ancestry is about to start carbamazepine for trigeminal neuralgia. What must be done first?",
 opts:["Screen for the HLA-B*1502 allele, because carriers have a markedly increased risk of Stevens-Johnson syndrome and toxic epidermal necrolysis and should not receive the drug",
  "Start at a low dose and increase slowly, since gradual titration prevents severe cutaneous reactions",
  "Prescribe a prophylactic antihistamine, since it blunts any hypersensitivity reaction",
  "Proceed without screening, since the reaction is rare and screening is not cost effective"],
 ans:0,
 rat:{c:"The HLA-B*1502 allele, which is substantially more common in people of East and Southeast Asian ancestry, confers a greatly increased risk of Stevens-Johnson syndrome and toxic epidermal necrolysis on carbamazepine. Screening before initiation is recommended in at-risk populations, and a positive result means the drug is avoided.",
  s:"Titration reduces some dose-related adverse effects but does not prevent this immune-mediated reaction. Antihistamines do not prevent severe cutaneous adverse reactions, and the consequence of the reaction is severe enough that screening is warranted in at-risk ancestry groups."} },

{id:"PHA-137", t:"single", cn:"PHA", sys:"GI", topic:"Tardive dyskinesia risk with metoclopramide", d:3, b:0.55, cj:"evaluate", tags:["metoclopramide","tardive dyskinesia","duration of therapy"],
 stem:"A client has taken metoclopramide daily for gastroparesis for fourteen months and now shows involuntary lip smacking and tongue movements. What does the nurse recognize?",
 opts:["Possible tardive dyskinesia, which carries a boxed warning with metoclopramide and is linked to cumulative duration of use, so the prescriber must review continued therapy",
  "An expected and harmless effect of metoclopramide, since involuntary movements are common with any antiemetic",
  "Anxiety-related habit behaviour, which will resolve with reassurance and relaxation",
  "A sign that the dose is too low, since increasing it usually suppresses the movements"],
 ans:0,
 rat:{c:"Metoclopramide blocks dopamine receptors and carries a boxed warning for tardive dyskinesia, with risk rising with total dose and duration, particularly beyond twelve weeks and in older adults. Involuntary orofacial movements warrant prompt review and usually discontinuation, because the condition can become irreversible.",
  s:"These movements are not benign or expected, and continuing the drug risks permanent disability. Attributing them to anxiety delays the intervention that could still reverse them, and increasing the dose worsens rather than treats the underlying receptor effect."} },

{id:"PHA-138", t:"single", cn:"PHA", sys:"REPI", topic:"Priapism as a trazodone emergency", d:3, b:0.55, cj:"recognize", tags:["trazodone","priapism","urologic emergency"],
 stem:"A male client taking trazodone for insomnia reports a painful erection lasting five hours that is unrelated to sexual stimulation. What is the nurse's priority action?",
 opts:["Treat it as a urologic emergency, notify the provider immediately, and anticipate stopping the drug, since prolonged erection causes permanent tissue damage",
  "Reassure him that the effect is transient and advise him to wait until morning for review",
  "Advise a warm bath and rest, since relaxation usually resolves the erection",
  "Reduce the next dose by half, since a lower dose will prevent recurrence"],
 ans:0,
 rat:{c:"Trazodone can cause priapism, an erection lasting more than four hours that is a urologic emergency. Ischaemic priapism causes irreversible corporal fibrosis and permanent erectile dysfunction if not treated within hours, so immediate medical intervention and discontinuation of the offending drug are required.",
  s:"Waiting until morning risks permanent damage, and the four-hour threshold is exactly why this is an emergency. Conservative measures do not relieve ischaemic priapism, and dose reduction does not address the ongoing event or reliably prevent recurrence."} },

{id:"PHA-139", t:"single", cn:"PHA", sys:"PSYCH", topic:"Orexin receptor antagonist for insomnia", d:3, b:0.55, cj:"analyze", tags:["suvorexant","orexin antagonist","insomnia"],
 stem:"A client with insomnia who gained no benefit from cognitive behavioural therapy is prescribed suvorexant. What does the nurse understand about this drug?",
 opts:["It blocks orexin signalling to reduce wakefulness drive rather than broadly sedating the brain, is contraindicated in narcolepsy, and can cause next-day impairment",
  "It works like a benzodiazepine by enhancing GABA activity, so the same dependence precautions apply",
  "It has no next-day effects, since orexin antagonists are cleared before morning",
  "It is safe in narcolepsy, since narcolepsy involves excessive sleepiness rather than excessive wakefulness"],
 ans:0,
 rat:{c:"Suvorexant is a dual orexin receptor antagonist that reduces the wakefulness drive rather than producing generalized central nervous system depression. Because orexin deficiency underlies narcolepsy, the drug is contraindicated in that condition, and residual next-day impairment requires caution with driving.",
  s:"It acts on the orexin system rather than on GABA, so its pharmacology differs from benzodiazepines. Next-day impairment is a documented risk that is dose related, and narcolepsy is precisely the condition in which blocking orexin would be harmful."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-104", t:"single", cn:"PAA", sys:"REPI", topic:"Care after amniocentesis", d:3, b:0.55, cj:"act", tags:["amniocentesis","post-procedure monitoring","pregnancy"],
 stem:"A client has just undergone a mid-trimester amniocentesis. What is the priority post-procedure nursing action?",
 opts:["Monitor the fetal heart rate, observe for vaginal bleeding or leakage of fluid, check for uterine contractions, and instruct the client to report fever or increasing pain",
  "Encourage ambulation immediately, since activity prevents thrombosis after the procedure",
  "Restrict all oral intake for twelve hours, since bowel activity could disturb the puncture site",
  "Place the client flat and immobilized for twenty-four hours, since movement causes membrane rupture"],
 ans:0,
 rat:{c:"The principal risks after amniocentesis are fetal compromise, membrane rupture with fluid leakage, bleeding, infection, and preterm labour. Monitoring the fetal heart rate, watching for leakage, bleeding, or contractions, and clear reporting instructions address each of them.",
  s:"Immediate ambulation is not required and offers no benefit. Oral intake is normally resumed, since the procedure is extrauterine, and prolonged flat immobilization is not supported and increases discomfort and thrombosis risk without reducing complication rates."} },

{id:"PAA-105", t:"single", cn:"PAA", sys:"REPI", topic:"Cell-free DNA screening is not diagnostic", d:3, b:0.55, cj:"evaluate", tags:["cell-free DNA","prenatal screening","counselling"],
 stem:"A client receives a positive cell-free DNA screening result for trisomy 21 and asks what it means. What is the nurse's accurate response?",
 opts:["The result indicates increased risk and must be confirmed by a diagnostic test such as amniocentesis or chorionic villus sampling, because screening is not diagnostic",
  "The diagnosis is confirmed, so the client should begin planning for a child with Down syndrome",
  "The result is unreliable and should simply be repeated, since false positives are common enough to ignore",
  "No further screening or testing is needed, since the accuracy of this test makes confirmation unnecessary"],
 ans:0,
 rat:{c:"Cell-free DNA screening has high sensitivity and specificity but remains a screening test, and its positive predictive value depends on the population's baseline prevalence. A positive result therefore requires confirmation by a diagnostic test before any irreversible decision is made.",
  s:"Acting on a screening result as though it were diagnostic risks decisions based on a false positive. Dismissing it as unreliable forfeits genuine information, and even a highly accurate test produces false positives that confirmation exists to resolve."} },

{id:"PAA-106", t:"single", cn:"PAA", sys:"REPI", topic:"Fetal movement monitoring", d:3, b:0.55, cj:"generate", tags:["fetal movement","kick count","self-monitoring"],
 stem:"A client at 32 weeks gestation asks how to monitor fetal movement at home. What should the nurse teach?",
 opts:["Count movements at a consistent time each day and report a significant reduction from the baby's own normal pattern promptly, rather than waiting until the next appointment",
  "Count movements weekly, since daily counting is unnecessary and causes anxiety",
  "Report reduced movement only if it persists for more than twenty-four hours, since fluctuations are normal",
  "Rely on the next scheduled appointment, since home counting has no clinical value"],
 ans:0,
 rat:{c:"A sustained decrease in fetal movement can indicate fetal compromise and is one of the few warning signs a client can detect herself. Teaching a consistent daily count and prompt reporting of a change from the individual pattern allows timely assessment.",
  s:"Weekly counting misses acute change. Waiting twenty-four hours forfeits the window in which intervention could help, and while counting methods vary, the evidence supports acting on a persistent reduction from the baby's normal pattern."} },

{id:"PAA-107", t:"single", cn:"PAA", sys:"NEURO", topic:"Alpha-fetoprotein and neural tube defects", d:3, b:0.55, cj:"evaluate", tags:["alpha-fetoprotein","neural tube defect","prenatal screening"],
 stem:"A client at 17 weeks gestation has a maternal serum alpha-fetoprotein level above the expected range. What does the nurse understand?",
 opts:["An elevated level raises the possibility of an open neural tube defect or inaccurate dating, so a detailed ultrasound is the appropriate next step",
  "An elevated level confirms a neural tube defect, so further testing would add nothing",
  "An elevated level indicates Down syndrome, since that condition raises this marker",
  "The result is meaningless, since alpha-fetoprotein has no role in prenatal screening"],
 ans:0,
 rat:{c:"Maternal serum alpha-fetoprotein rises with open neural tube defects such as spina bifida and anencephaly, but it is also raised by incorrect dating, multiple gestation, and abdominal wall defects. Because dating errors are the most common cause, a detailed ultrasound is the next step.",
  s:"A screening value never confirms a diagnosis, and ultrasound with or without amniocentesis is required. Down syndrome is associated with a low rather than a high alpha-fetoprotein, and the marker is a well-established component of prenatal screening."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-100", t:"single", cn:"RRP", sys:"NEURO", topic:"MRI safety screening", d:3, b:0.55, cj:"prioritize", tags:["MRI safety","implants","gadolinium"],
 stem:"A client is scheduled for a contrast-enhanced MRI. What screening is essential before the client enters the scanner?",
 opts:["Verify the absence of ferromagnetic implants and devices, confirm the estimated glomerular filtration rate before gadolinium, and remove all metal and electronic items",
  "Confirm only that the client is not pregnant, since pregnancy is the sole contraindication to MRI",
  "Ask whether the client is claustrophobic, since anxiety is the main safety concern in the scanner",
  "Check the client's weight, since the table limit is the principal safety restriction"],
 ans:0,
 rat:{c:"The static magnetic field can move or heat ferromagnetic implants and disable electronic devices, so every implant, device, and fragment must be identified before entry. Gadolinium-based contrast carries a risk of nephrogenic systemic fibrosis in significant renal impairment, so renal function is checked.",
  s:"Pregnancy is one consideration among many rather than the sole contraindication, and magnetic hazards are absolute. Claustrophobia affects comfort rather than safety, and while table limits matter, they are not the principal risk."} },

{id:"RRP-101", t:"single", cn:"RRP", sys:"CV", topic:"Client teaching for a Holter monitor", d:2, b:0.45, cj:"generate", tags:["Holter monitor","ambulatory monitoring","teaching"],
 stem:"A client with intermittent palpitations is fitted with a 48-hour Holter monitor. What teaching should the nurse provide?",
 opts:["Continue usual daily activities, keep a diary of symptoms with their times, avoid getting the device wet, and do not remove the electrodes",
  "Rest quietly at home for the recording period, since activity interferes with the tracing",
  "Remove the electrodes before showering and replace them afterward in the same positions",
  "Record symptoms only if they are severe, since minor symptoms are not clinically relevant"],
 ans:0,
 rat:{c:"The purpose of ambulatory monitoring is to correlate the client's ordinary activity with the rhythm, so normal activity is encouraged. A timed symptom diary lets the clinician match subjective events to the tracing, and the electrodes must stay in place and dry throughout.",
  s:"Resting defeats the purpose, since palpitations often occur only during normal activity. Removing the electrodes breaks the recording and misplaces them, and minor or brief symptoms are exactly what the monitor is being used to capture."} },

{id:"RRP-102", t:"single", cn:"RRP", sys:"MSK", topic:"Care after arthrocentesis", d:3, b:0.55, cj:"act", tags:["arthrocentesis","joint aspiration","post-procedure care"],
 stem:"A client has had a knee aspirated and a corticosteroid injected for suspected inflammatory arthritis. What post-procedure teaching is appropriate?",
 opts:["Rest the joint for 24 to 48 hours, use ice and simple analgesia for soreness, and report increasing pain, fever, or spreading redness, which could indicate infection",
  "Resume full weight bearing and exercise immediately, since movement distributes the steroid through the joint",
  "Apply heat for the first 48 hours, since warmth reduces post-procedure inflammation",
  "Expect the pain to worsen for two weeks, since a steroid flare is normal for that duration"],
 ans:0,
 rat:{c:"Brief relative rest protects the joint while the injected corticosteroid takes effect, and ice with simple analgesia manages expected soreness. Because any needle entering a joint can introduce infection, the client must know the red flags of septic arthritis and report them immediately.",
  s:"Immediate vigorous activity can worsen pain and reduce benefit. Heat increases local blood flow and swelling in the first days, and a steroid flare typically lasts a day or two, so worsening over two weeks suggests infection rather than a normal reaction."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-108", t:"single", cn:"SIC", sys:"RESP", topic:"Tuberculosis testing and interpreting results", d:3, b:0.55, cj:"analyze", tags:["tuberculosis testing","IGRA","latent infection"],
 stem:"A healthcare worker has a positive interferon-gamma release assay but no symptoms and a normal chest radiograph. What does the nurse understand?",
 opts:["This indicates latent tuberculosis infection, so treatment is offered to prevent progression, and the client is not infectious and needs no respiratory isolation",
  "This indicates active tuberculosis, so airborne isolation and multi-drug treatment must begin immediately",
  "This is a false positive, since a normal chest radiograph excludes any tuberculosis infection",
  "No action is needed, since latent infection carries no risk of future disease"],
 ans:0,
 rat:{c:"A positive immunologic test with no symptoms and a normal radiograph defines latent tuberculosis infection. The person is not infectious, requires no isolation, and is offered preventive treatment because a proportion of latent infections progress to active disease, with the risk highest in immunocompromised people.",
  s:"Active disease requires symptoms, radiographic findings, or microbiological confirmation, none of which is present. A normal radiograph distinguishes latent from active disease rather than excluding infection, and latent infection carries a lifelong progression risk that treatment reduces."} },

{id:"SIC-109", t:"single", cn:"SIC", sys:"INF", topic:"Hepatitis B post-exposure management", d:3, b:0.55, cj:"prioritize", tags:["hepatitis B","post-exposure prophylaxis","HBIG"],
 stem:"A nurse sustains a needlestick from a source client known to be hepatitis B surface antigen positive. The nurse completed the vaccine series but has never had a titre. What is the priority?",
 opts:["Test the nurse's antibody titre and the source's status, and give hepatitis B immune globulin with a vaccine booster if the nurse is found non-responder, acting within the recommended time window",
  "Reassure the nurse, since completing the hepatitis B vaccine series guarantees protection without any titre check against this source",
  "Start antiviral treatment immediately, since it prevents infection after exposure",
  "Wait for symptoms to appear before testing, since early testing is not informative"],
 ans:0,
 rat:{c:"Vaccination does not protect everyone, since a minority of people fail to mount an adequate antibody response. Post-exposure management therefore checks the exposed person's antibody level and the source status, and gives immune globulin with a booster for non-responders, within the recommended interval for maximum benefit.",
  s:"Completion of the series does not confirm immunity, which is why titres are checked in healthcare workers. Antivirals treat established infection rather than preventing it, and waiting for symptoms forfeits the window in which prophylaxis works."} },

{id:"SIC-110", t:"single", cn:"SIC", sys:"INF", topic:"Hand hygiene compliance monitoring", d:3, b:0.55, cj:"evaluate", tags:["hand hygiene","compliance audit","measurement"],
 stem:"A unit's hand hygiene compliance audit shows 95 percent when auditors are visible but an estimated 40 percent at other times. What does this indicate and what should follow?",
 opts:["Compliance is being overestimated by observation bias, so the unit needs reliable measurement plus system-level changes such as accessible dispensers, feedback, and leadership modelling rather than further education alone",
  "Compliance is genuinely 95 percent, since the audited observations are the valid measure",
  "Staff need more education, since poor compliance always reflects a knowledge deficit",
  "Auditing should stop, since the discrepancy makes the data useless"],
 ans:0,
 rat:{c:"Observed compliance is systematically inflated when staff know they are being watched, so the true rate is closer to the unobserved estimate. Improving it requires accurate measurement, then system changes: dispenser placement at the point of care, data feedback to the team, adequate staffing, and visible leadership behaviour.",
  s:"The audited figure measures behaviour under observation rather than routine practice. Knowledge is rarely the limiting factor where compliance falls under workload pressure, and abandoning measurement removes the only way to know whether change is working."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-081", t:"single", cn:"BCC", sys:"INTG", topic:"Nail care for an at-risk client", d:2, b:0.45, cj:"act", tags:["nail care","peripheral vascular disease","skin integrity"],
 stem:"A client with diabetes and peripheral arterial disease has thickened toenails. What is the appropriate nursing action?",
 opts:["File the nails straight across rather than cutting them, avoid cutting into the corners, and refer to podiatry for thickened or ingrown nails rather than attempting removal",
  "Cut the nails short and round the corners, since this prevents the nail from catching on bedding",
  "Soak the feet in hot water to soften the nails before cutting, since this makes trimming easier",
  "Cut away any thickened nail tissue with scissors, since thick nails harbour infection"],
 ans:0,
 rat:{c:"In clients with reduced sensation and poor perfusion, a small cut can become a non-healing ulcer. Nails are filed straight across with corners left intact, and thickened, ingrown, or dystrophic nails are referred to podiatry rather than cut by nursing staff.",
  s:"Rounding the corners encourages ingrowth. Hot soaking risks burns the client cannot feel and macerates skin, and cutting thickened nail with scissors risks injury to tissue that heals poorly."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-087", t:"single", cn:"HPM", sys:"INTG", topic:"Heat stroke recognition and prevention", d:3, b:0.55, cj:"recognize", tags:["heat stroke","hyperthermia","prevention"],
 stem:"During a heat wave, a neighbour is found confused with hot dry skin and a temperature of 40.6°C after working in the garden. What does the nurse recognize?",
 opts:["Heat stroke, a medical emergency requiring immediate cooling and emergency activation, distinct from heat exhaustion by the presence of altered mental status",
  "Heat exhaustion, which is managed with oral fluids and rest in a cool place",
  "Dehydration alone, since a high temperature always indicates fluid loss rather than heat illness",
  "A febrile infection, since a temperature above 40°C indicates sepsis until proven otherwise"],
 ans:0,
 rat:{c:"Heat stroke is defined by a core temperature above 40°C with central nervous system dysfunction, and the skin may be dry because sweating has failed. It is immediately life-threatening, so rapid cooling and emergency care take precedence over any other intervention.",
  s:"Heat exhaustion preserves normal mental status, and confusion is the distinguishing feature. Fluid loss contributes but is not the whole picture, and while infection is on the differential, the exposure history and absent sweating point to heat stroke and cooling must not be delayed."} }
  );
})();
