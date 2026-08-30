/* Wave 23 — 20 hand-authored hard RN items.
 * Psychosocial Integrity at 8.9% against a 9% target is the lowest share of
 * any blueprint area and held the deepest verified-uncovered topic pool, so
 * wave 23 leads with six psychosocial items. Management of Care at 17.3%
 * against 18%, Pharmacology at 15.7% against 16%, and Safety at 12.9%
 * against 13% follow. Every item is d>=2; 16 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Psychosocial        : PSY-067 – PSY-072
 * Pharmacology        : PHA-131 – PHA-135
 * Management of Care  : MOC-136 – MOC-138
 * Safety              : SIC-105 – SIC-107
 * Reduction of Risk   : RRP-099
 * Basic Care/Comfort  : BCC-080
 * Health Promotion    : HPM-086
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Psychosocial Integrity (6) ---------------- */

{id:"PSY-067", t:"single", cn:"PSY", sys:"PSYCH", topic:"Dissociative amnesia with fugue", d:3, b:0.55, cj:"recognize", tags:["dissociative amnesia","fugue","differential"],
 stem:"A man is found two states from home with no identification and cannot recall his name, his occupation, or how he travelled there. He is alert, coherent, and shows no head injury, intoxication, or seizure activity. What does the nurse recognize?",
 opts:["Dissociative amnesia with fugue, in which memory loss for personal identity follows overwhelming stress and is not explained by a medical or substance cause",
  "Transient global amnesia, since sudden memory loss in an adult is always vascular in origin",
  "Malingering, since loss of personal identity is an obvious way to avoid responsibility",
  "Early dementia, since inability to recall one's own name is the defining early feature"],
 ans:0,
 rat:{c:"Dissociative amnesia involves an inability to recall important personal information, usually of a traumatic or stressful nature, that is too extensive for ordinary forgetting. In fugue there is apparently purposeful travel or bewildered wandering with loss of identity, and medical and substance causes must first be excluded.",
  s:"Transient global amnesia preserves personal identity while impairing anterograde memory, which is the opposite pattern. Malingering cannot be assumed, and dementia does not begin with isolated loss of one's own name in an otherwise coherent person."} },

{id:"PSY-068", t:"single", cn:"PSY", sys:"PSYCH", topic:"Depersonalization-derealization disorder", d:3, b:0.55, cj:"analyze", tags:["depersonalization","derealization","reality testing"],
 stem:"A client describes feeling detached from her own body as though watching herself from outside, and reports that the world looks unreal and dreamlike. She states clearly that she knows this is a feeling and not reality. What does the nurse recognize?",
 opts:["Depersonalization-derealization disorder, in which the detachment is distressing but reality testing remains intact",
  "A psychotic disorder, since feeling detached from one's body shows a loss of contact with reality",
  "Malingering, since the symptoms are subjective and cannot be verified",
  "Normal dissociation, since everyone experiences this degree of detachment regularly"],
 ans:0,
 rat:{c:"Depersonalization is a sense of detachment from one's self, and derealization a sense that the surroundings are unreal. What distinguishes the disorder from psychosis is that the person knows the experience is a feeling rather than reality, so insight and reality testing are preserved.",
  s:"The belief is not held with delusional conviction, which is what separates it from psychosis. The distress and functional impairment make it a disorder rather than malingering, and while brief dissociation is common, persistent distressing detachment is not."} },

{id:"PSY-069", t:"single", cn:"PSY", sys:"PSYCH", topic:"Affirming care for a transgender client", d:3, b:0.55, cj:"act", tags:["gender dysphoria","affirming care","dignity"],
 stem:"A transgender man is admitted to a medical unit. The electronic record still shows his birth name and female sex marker. What is the nurse's priority action?",
 opts:["Use the name and pronouns the client states, record the preferred name and pronouns prominently, and clarify with him privately which anatomical screening and examinations he still needs",
  "Use the name and pronouns in the record, since the legal record is the authoritative source for clinical care",
  "Ask colleagues which pronouns to use, since the client may change them during the admission",
  "Assume that because he identifies as male, no gynaecological screening or examination is still relevant"],
 ans:0,
 rat:{c:"Using a client's stated name and pronouns is basic respectful care and reduces documented distress. Recording the preference visibly prevents repeated misgendering by other staff. Separately, screening must follow the organs present rather than the gender marker, and that conversation is held privately.",
  s:"The legal record governs billing and identification, not how a person is addressed. Asking colleagues invites error and breaches privacy, and assuming that screening is irrelevant risks missing cervical, breast, or other organ-specific care that remains necessary."} },

{id:"PSY-070", t:"single", cn:"PSY", sys:"PSYCH", topic:"Selective mutism in a child", d:3, b:0.55, cj:"analyze", tags:["selective mutism","anxiety","pediatric"],
 stem:"A 6-year-old speaks freely and appropriately at home but has not spoken a word at school in four months, despite normal language development and no hearing loss. What does the nurse recognize?",
 opts:["Selective mutism, an anxiety disorder in which speech fails in specific social settings despite intact language ability",
  "A language disorder, since the child is not speaking in the setting where language is most required",
  "Autism spectrum disorder, since not speaking at school reflects a social communication deficit despite intact speech at home",
  "Defiance, since the child clearly can speak and is choosing not to"],
 ans:0,
 rat:{c:"Selective mutism is a consistent failure to speak in specific social situations where speech is expected, despite speaking in others, and it persists beyond the first month of school. It is an anxiety disorder, and language ability and hearing are intact.",
  s:"Language ability is normal at home, which excludes a language disorder. Autism involves broader and more pervasive social communication differences rather than a setting-specific pattern, and framing the behaviour as deliberate defiance misreads an anxiety response and increases pressure on the child."} },

{id:"PSY-071", t:"single", cn:"PSY", sys:"PSYCH", topic:"Trichotillomania", d:3, b:0.55, cj:"recognize", tags:["trichotillomania","body-focused repetitive behavior","habit reversal"],
 stem:"A 15-year-old has irregular patches of hair loss on the scalp with hairs of varying length and no scalp inflammation or scaling. She admits pulling out her hair when anxious and feels relief afterward. What is the appropriate nursing response?",
 opts:["Recognize a body-focused repetitive behavior and support habit reversal training, while avoiding shame and avoiding pulling the hair out as punishment",
  "Reassure her that the hair loss is from a fungal infection and treat it with a topical antifungal",
  "Advise her to stop pulling, since the behaviour is voluntary and will respond to firm instruction",
  "Restrict her access to mirrors, since not seeing the patches will remove the urge to pull"],
 ans:0,
 rat:{c:"Trichotillomania is recurrent hair pulling producing loss, with tension before and relief after, and hairs of uneven length without skin inflammation. Habit reversal training, which builds awareness and a competing response, is the treatment of choice, and shame worsens the cycle.",
  s:"The absence of inflammation and scaling argues against tinea, and no antifungal will address pulling. Simple instruction does not treat a compulsive behaviour, and hiding mirrors does not remove the urge and adds secrecy to the problem."} },

{id:"PSY-072", t:"single", cn:"PSY", sys:"PSYCH", topic:"Fetal alcohol spectrum disorder", d:3, b:0.55, cj:"analyze", tags:["fetal alcohol spectrum disorder","neurodevelopmental","support"],
 stem:"A 9-year-old with a known history of prenatal alcohol exposure has poor impulse control, difficulty with transitions, and cannot learn from consequences. His teacher describes him as deliberately disobedient. What is the nurse's best response?",
 opts:["Explain that the behaviour reflects a neurodevelopmental disability affecting executive function, and support external structure, visual schedules, and concrete routines rather than consequence-based discipline",
  "Agree that the behaviour is deliberate and recommend a stricter consequence system at home and school",
  "Recommend stimulant medication, since the presentation is identical to attention deficit hyperactivity disorder",
  "Reassure the teacher that the behaviour will resolve with maturity and needs no intervention"],
 ans:0,
 rat:{c:"Prenatal alcohol exposure causes lasting impairment in executive function, memory, and abstract reasoning. The child may understand a rule and still be unable to apply it, so external structure, consistency, visual cues, and concrete instruction work where punishment does not.",
  s:"Consequence-based discipline presumes a capacity the child does not have and typically escalates the behaviour. Stimulants may be considered but the presentation is not identical and the underlying impairment differs, and assuming resolution with maturity leaves the child unsupported during the years when support matters most."} },

/* ---------------- Pharmacology and Parenteral Therapies (5) ---------------- */

{id:"PHA-131", t:"single", cn:"PHA", sys:"NEURO", topic:"Levodopa-carbidopa and dietary protein", d:3, b:0.55, cj:"generate", tags:["levodopa","carbidopa","protein timing","Parkinson disease"],
 stem:"A client with Parkinson disease reports that levodopa-carbidopa has become less reliable, with periods of immobility after meals. What should the nurse recommend?",
 opts:["Take the dose away from high-protein meals, since dietary protein competes with levodopa for absorption and transport across the blood-brain barrier",
  "Take the dose with high-protein meals, since food improves absorption of the drug",
  "Stop the drug when mobility is poor, since the drug has failed and should be replaced",
  "Double the next dose when a period of immobility occurs, to overcome the competition"],
 ans:0,
 rat:{c:"Levodopa uses the same neutral amino acid transporters as dietary protein in the gut and at the blood-brain barrier, so a protein-heavy meal blunts absorption and produces unpredictable motor response. Separating the dose from protein improves consistency.",
  s:"Protein reduces rather than improves absorption, and taking it with food does not help. Stopping a working drug over a manageable interaction removes effective therapy, and extra doses risk dyskinesia and do not reliably restore mobility."} },

{id:"PHA-132", t:"single", cn:"PHA", sys:"NEURO", topic:"Modafinil for narcolepsy", d:2, b:0.45, cj:"evaluate", tags:["modafinil","narcolepsy","wakefulness"],
 stem:"A client starts modafinil for excessive daytime sleepiness due to narcolepsy. What teaching is required?",
 opts:["Take it early in the day to avoid insomnia, and note that it can reduce the effectiveness of hormonal contraceptives, so an additional method is needed",
  "Take it at bedtime, since it works best during the sleep cycle",
  "It has no interactions, since it is not a stimulant and does not affect other drugs",
  "It cures narcolepsy, so it can be stopped once sleepiness resolves"],
 ans:0,
 rat:{c:"Modafinil promotes wakefulness and is taken in the morning or early afternoon because late dosing causes insomnia. It induces hepatic enzymes and can reduce the effectiveness of hormonal contraceptives, so a non-hormonal or additional method is advised during use and for a period afterward.",
  s:"Dosing at bedtime would worsen sleep disruption. It does have clinically important interactions, including with hormonal contraception, and it manages rather than cures narcolepsy, so stopping it returns the symptoms."} },

{id:"PHA-133", t:"single", cn:"PHA", sys:"RESP", topic:"Sodium oxybate safety requirements", d:3, b:0.55, cj:"prioritize", tags:["sodium oxybate","respiratory depression","restricted distribution"],
 stem:"A client with narcolepsy and cataplexy is prescribed sodium oxybate. What is the essential safety teaching?",
 opts:["Avoid combining it with alcohol, sedatives, or other central nervous system depressants, take both nightly doses while already in bed, and obtain it only through the restricted distribution programme",
  "Take it at any time during the night when symptoms wake the client, since timing is flexible",
  "It is safe with alcohol as long as the total nightly dose is not exceeded",
  "Take the second dose on waking, since that provides coverage for the following day"],
 ans:0,
 rat:{c:"Sodium oxybate is a potent central nervous system depressant with a boxed warning for respiratory depression, depression, and abuse. Combining it with alcohol or other depressants can be fatal, doses are taken in bed because unconsciousness follows within minutes, and access is controlled through a restricted programme.",
  s:"Flexible timing risks the client being upright when sudden deep sleep occurs. Alcohol combination is specifically contraindicated, and the second dose is taken two and a half to four hours after the first during the same night, not on waking."} },

{id:"PHA-134", t:"single", cn:"PHA", sys:"PSYCH", topic:"Complex sleep behaviours on zolpidem", d:3, b:0.55, cj:"evaluate", tags:["zolpidem","complex sleep behaviour","boxed warning"],
 stem:"A client taking zolpidem for insomnia reports that her partner found her preparing and eating a meal during the night, which she has no memory of in the morning. What should the nurse do?",
 opts:["Report it promptly and anticipate stopping the drug, because complex sleep behaviours are a boxed warning and require discontinuation",
  "Reassure her, since sleep-related eating is harmless and does not require any change",
  "Reduce the dose by half, since a lower dose removes the risk of parasomnia entirely",
  "Advise her to lock the kitchen, since physical barriers solve the problem safely"],
 ans:0,
 rat:{c:"Zolpidem carries a boxed warning for complex sleep behaviours including sleepwalking, sleep-driving, and preparing or eating food, with no memory of the event. These can cause serious injury, and the recommended response is to stop the medication rather than continue at any dose.",
  s:"The behaviour carries real injury risk and is not benign. Lowering the dose does not eliminate the risk, which is why discontinuation is advised, and locking the kitchen does not address other hazards such as driving or leaving the house."} },

{id:"PHA-135", t:"single", cn:"PHA", sys:"GI", topic:"Aprepitant for chemotherapy-induced nausea", d:3, b:0.55, cj:"analyze", tags:["aprepitant","antiemetic","CYP3A4 interaction"],
 stem:"A client receiving a highly emetogenic chemotherapy regimen is prescribed aprepitant along with a serotonin antagonist and dexamethasone. What does the nurse understand?",
 opts:["The drugs act on different pathways, so the combination covers more of the emetic response, but aprepitant inhibits CYP3A4 and the dexamethasone dose usually needs reduction",
  "The drugs are redundant, since a single antiemetic is sufficient for any regimen",
  "Aprepitant treats nausea only after it begins, so it should be held until the client vomits",
  "Aprepitant has no interactions, so the dexamethasone dose is unchanged"],
 ans:0,
 rat:{c:"Combining a neurokinin-1 receptor antagonist, a serotonin antagonist, and a corticosteroid blocks complementary emetic pathways and is standard for highly emetogenic chemotherapy. Aprepitant inhibits CYP3A4, which raises corticosteroid exposure, so the dexamethasone dose is reduced.",
  s:"A single agent is inadequate for highly emetogenic regimens, which is why combination therapy is standard. Aprepitant is given prophylactically before chemotherapy rather than as rescue, and the interaction with dexamethasone is clinically significant."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-136", t:"single", cn:"MOC", sys:"PSYCH", topic:"Second victim support after an error", d:3, b:0.55, cj:"act", tags:["second victim","medical error","peer support"],
 stem:"A nurse administered a wrong dose that caused temporary harm and is now unable to sleep, replaying the event and doubting whether she should continue in the profession. What is the appropriate organizational response?",
 opts:["Provide immediate peer support and access to counselling while the event is reviewed through a non-punitive process, since distress after causing harm is expected and does not itself indicate incompetence",
  "Reassign her away from clinical work indefinitely, since she is clearly too distressed to practise safely",
  "Advise her to process it privately, since dwelling on an error interferes with patient care",
  "Proceed directly to disciplinary action, since harm occurred in the event and accountability must be established first"],
 ans:0,
 rat:{c:"Clinicians involved in harmful events commonly experience profound distress, known as the second victim phenomenon, and timely peer support improves recovery and retention. Support and a fair, system-focused review proceed together; they are not alternatives.",
  s:"Indefinite removal abandons the clinician and rarely addresses the underlying system cause. Expecting private processing ignores evidence that supported clinicians recover faster, and leading with discipline suppresses reporting and removes the information needed to prevent recurrence."} },

{id:"MOC-137", t:"single", cn:"MOC", sys:"INF", topic:"Speaking up in a high-reliability culture", d:3, b:0.55, cj:"act", tags:["safety culture","speaking up","high reliability"],
 stem:"A junior nurse notices that a senior colleague has omitted a step in a sterile procedure. The senior colleague is known to respond badly to correction. What should the junior nurse do?",
 opts:["Speak up at the time using a clear, respectful, and specific concern, and escalate through the chain of command if the concern is not addressed",
  "Say nothing, since correcting a senior colleague undermines team authority and morale",
  "Complete the procedure herself afterward, since this corrects the error without confrontation",
  "Report the colleague anonymously after the shift, since anonymity avoids conflict"],
 ans:0,
 rat:{c:"High-reliability organizations depend on any team member raising a safety concern regardless of rank, and the person who notices a problem owns the responsibility to voice it. A specific, respectful challenge at the moment is most effective, with escalation if the concern is not resolved.",
  s:"Silence transfers the risk to the patient. Correcting afterwards does not undo the breach that already occurred, and anonymous reporting after the fact removes the chance to prevent the harm in progress and forgoes the learning opportunity."} },

{id:"MOC-138", t:"single", cn:"MOC", sys:"NEURO", topic:"Competency determination versus decision-making capacity", d:3, b:0.55, cj:"analyze", tags:["competency","capacity","legal determination"],
 stem:"A client with early dementia refuses a recommended procedure. The family asks the nurse to override the refusal because the client is no longer competent. What is the nurse's accurate response?",
 opts:["Competency is a legal determination made by a court, while capacity is assessed clinically for the specific decision, so a dementia diagnosis alone does not remove this client's right to refuse",
  "The family may decide, since a dementia diagnosis automatically transfers decision-making to the next of kin",
  "The nurse may decide, since clinical staff determine competency at the bedside",
  "The refusal stands regardless of capacity, since refusal is absolute in every circumstance"],
 ans:0,
 rat:{c:"Competency is a legal status determined by a court, whereas capacity is a clinical, decision-specific assessment. A person with dementia may retain capacity for some decisions and lack it for others, so the specific refusal must be assessed rather than overridden on the basis of a diagnosis.",
  s:"A diagnosis does not automatically transfer authority, and family members act as surrogate only when the client lacks capacity or a court has appointed them. Nurses assess and report capacity but do not declare competency, and refusal is respected only where capacity is present."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-105", t:"single", cn:"SIC", sys:"INF", topic:"No-touch room disinfection", d:3, b:0.55, cj:"analyze", tags:["room disinfection","UV-C","adjunct to manual cleaning"],
 stem:"A room is to be terminally cleaned after discharge of a client colonized with a multidrug-resistant organism, and a no-touch disinfection device is scheduled afterward. What does the nurse understand?",
 opts:["The device is an adjunct that follows thorough manual cleaning, since it cannot penetrate soil and is ineffective on surfaces that have not first been cleaned",
  "The device replaces manual cleaning, since automated disinfection is more reliable than human technique",
  "The device is used before the room is cleaned, since it loosens soil so manual cleaning is faster",
  "The device is optional and can be skipped, since manual cleaning alone is always sufficient"],
 ans:0,
 rat:{c:"Ultraviolet or hydrogen peroxide vapour devices reduce residual contamination on surfaces but cannot penetrate organic soil or reach shaded areas reliably, so they are used after, not instead of, thorough manual cleaning with the correct agent and contact time.",
  s:"Replacing manual cleaning with a device leaves soil in place and shields organisms. Sequencing matters because the device works on already-clean surfaces, and in outbreak or high-risk settings the adjunct is added precisely because manual cleaning alone has documented failure rates."} },

{id:"SIC-106", t:"single", cn:"SIC", sys:"RESP", topic:"Ventilator-associated pneumonia bundle", d:3, b:0.55, cj:"generate", tags:["ventilator bundle","VAP prevention","oral care"],
 stem:"A client is receiving mechanical ventilation through an endotracheal tube. What intervention set best reduces the risk of ventilator-associated pneumonia?",
 opts:["Head of bed elevation, oral care with chlorhexidine, daily assessment of sedation and readiness to extubate, subglottic suctioning where available, and peptic ulcer and thrombosis prophylaxis",
  "Routine scheduled suctioning at fixed intervals, since it clears secretions before they can be aspirated",
  "Changing the ventilator circuit daily, since a fresh circuit removes the bacterial reservoir",
  "Keeping the client flat to improve ventilation-perfusion matching and reduce atelectasis"],
 ans:0,
 rat:{c:"The ventilator bundle combines interventions that each address a mechanism of infection or prolonged ventilation: elevation reduces aspiration, oral care reduces oropharyngeal colonization, daily sedation interruption shortens ventilation, and subglottic suctioning removes pooled secretions above the cuff.",
  s:"Scheduled rather than needed suctioning traumatizes the airway and does not prevent pneumonia. Frequent circuit changes increase rather than reduce contamination risk, and a flat position promotes aspiration of colonized secretions."} },

{id:"SIC-107", t:"single", cn:"SIC", sys:"INTG", topic:"Surgical site infection bundle", d:3, b:0.55, cj:"generate", tags:["surgical site infection","bundle","prevention"],
 stem:"A nurse is preparing a client for elective abdominal surgery. What measures reduce surgical site infection?",
 opts:["Appropriate antibiotic prophylaxis within 60 minutes of incision, clipping rather than shaving, skin antisepsis with an alcohol-based agent, glucose control, and maintaining normothermia",
  "Shaving the site with a razor the evening before, since a smooth field is easier to disinfect",
  "Starting antibiotics after the wound is closed, so the drug is present during healing",
  "Allowing the temperature to fall during surgery, since hypothermia reduces bacterial growth"],
 ans:0,
 rat:{c:"The bundle addresses each documented risk factor: tissue antibiotic levels at incision, hair removal by clipping to avoid microabrasions, effective skin antisepsis, glucose control, and normothermia, which preserves perfusion and immune function at the wound.",
  s:"Razor shaving creates microabrasions that bacteria colonize and increases infection. Post-incision antibiotics miss the contamination window, and hypothermia causes vasoconstriction that impairs oxygen delivery and neutrophil function at the wound."} },

/* ---------------- Reduction of Risk Potential (1) ---------------- */

{id:"RRP-099", t:"single", cn:"RRP", sys:"NEURO", topic:"Preparation for nerve conduction studies", d:3, b:0.55, cj:"generate", tags:["nerve conduction study","electromyography","pre-procedure teaching"],
 stem:"A client with numbness and weakness in both hands is scheduled for nerve conduction studies and needle electromyography. What teaching should the nurse provide?",
 opts:["Explain that small electrical currents will stimulate the nerves and a fine needle will record muscle activity, that the discomfort is brief, and that the client should report use of anticoagulants or a pacemaker beforehand",
  "Instruct the client to fast for twelve hours, since the study requires an empty stomach",
  "Tell the client to stop all medications for 48 hours, since they interfere with the recordings",
  "Reassure the client that the test is painless, since no needle is used in this procedure"],
 ans:0,
 rat:{c:"Nerve conduction studies deliver brief electrical stimuli and electromyography inserts a fine needle into muscle, so honest preparation for brief discomfort improves cooperation. Bleeding risk from anticoagulants and the presence of implanted electrical devices must be known before the study.",
  s:"Fasting is not required for this study. Medications are not stopped broadly, and only specific agents are reviewed with the prescriber. Claiming the test is painless and needle-free is inaccurate and damages trust when the client experiences otherwise."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-080", t:"single", cn:"BCC", sys:"NEURO", topic:"Communication support for a non-speaking client", d:2, b:0.45, cj:"act", tags:["communication aid","non-verbal client","dignity"],
 stem:"A client with an endotracheal tube is awake, alert, and unable to speak. He is becoming visibly frustrated. What is the nurse's priority intervention?",
 opts:["Establish a reliable alternative method such as a picture or letter board with a yes-no signal, keep it within reach, and tell every caregiver how it works",
  "Reassure him that the tube is temporary and he will be able to speak again soon",
  "Anticipate his needs by watching closely, since a good nurse can tell without the client communicating",
  "Sedate him, since frustration in an intubated client is best managed pharmacologically"],
 ans:0,
 rat:{c:"The inability to communicate is a major source of distress in intubated clients and is associated with agitation. A simple, always-available method plus a yes-no signal restores basic control, and sharing it with the whole team prevents the client having to start over with each caregiver.",
  s:"Reassurance does not give him a way to express urgent needs such as pain or breathlessness. Observation alone leaves him unable to report symptoms, and sedation treats the consequence of an unmet communication need while removing his ability to participate in his own care."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-086", t:"single", cn:"HPM", sys:"GI", topic:"Brown bag medication review", d:3, b:0.55, cj:"act", tags:["medication reconciliation","brown bag review","polypharmacy"],
 stem:"An older adult taking medications from three prescribers brings every container from home, including over-the-counter products and supplements, to an appointment. What is the value of this review?",
 opts:["It allows the nurse to reconcile the actual list against what is prescribed, identify duplicates and interactions, find outdated or unused medicines, and confirm what the client is really taking",
  "It is unnecessary, since the pharmacy record is already complete and accurate",
  "It is useful only for confirming the client's adherence, since interactions are detected by the dispensing software",
  "It should be discouraged, since bringing containers risks the client taking the wrong product at home"],
 ans:0,
 rat:{c:"Dispensing records show what was filled, not what is taken, and they miss over-the-counter and herbal products. A brown bag review reveals duplication across prescribers, interactions, expired stock, and the gap between prescribed and actual use, which is where most medication harm in older adults originates.",
  s:"Pharmacy records are incomplete by construction and cannot see non-prescription products. Dispensing software flags some interactions but not duplicates across systems or actual use, and reviewing containers is a safety intervention rather than a risk."} }
  );
})();
