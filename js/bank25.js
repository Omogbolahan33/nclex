/* Wave 15 — 20 hand-authored hard RN items.
 * Psychosocial Integrity is furthest under its blueprint share at 8.9%
 * against 9%, and it also has the largest set of verified-uncovered topics,
 * so wave 15 leads with it. Management of Care, Reduction of Risk Potential
 * and Safety remain under target and follow.
 * Every item is d>=2; 14 of the 20 are d=3.
 *
 * Psychosocial        : PSY-053 – PSY-057
 * Management of Care  : MOC-109 – MOC-111
 * Reduction of Risk   : RRP-079 – RRP-083
 * Safety              : SIC-081 – SIC-083
 * Health Promotion    : HPM-061 – HPM-062
 * Basic Care/Comfort  : BCC-062 – BCC-063
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Psychosocial Integrity (5) ---------------- */

{id:"PSY-053", t:"single", cn:"PSY", sys:"PSYCH", topic:"Excoriation disorder versus a skin condition", d:3, b:0.55, cj:"analyze", tags:["excoriation","body-focused repetitive behavior","differential"],
 stem:"A client has multiple excoriated lesions on the arms and face in various stages of healing. The client reports picking at the skin repeatedly while studying and often does not notice until the skin bleeds. What finding supports a body-focused repetitive behavior rather than a dermatologic condition?",
 opts:["The behavior is repetitive, directed at normal skin, causes clinically significant distress, and is not attributable to another medical condition or substance",
  "The repetitive behavior affects only areas the client can reach, which rules out a psychiatric condition",
  "The client denies itching, so the lesions must be self-inflicted for attention",
  "The lesions heal with scarring, which confirms an underlying autoimmune process"],
 ans:0,
 rat:{c:"Excoriation disorder is defined by recurrent skin picking causing lesions, repeated attempts to stop, and significant distress or impairment, where the behavior is not better explained by another condition or substance. Reachability and absent itching are consistent with it rather than excluding it.",
  s:"Distribution limited to reachable sites is expected in picking and does not distinguish the cause. Absent itching points away from a pruritic dermatosis rather than proving attention-seeking, and scarring follows any repeated injury regardless of cause."} },

{id:"PSY-054", t:"single", cn:"PSY", sys:"PSYCH", topic:"Body dysmorphic disorder and surgical requests", d:3, b:0.55, cj:"analyze", tags:["body dysmorphic disorder","preoccupation","referral"],
 stem:"A client spends three hours each day examining their nose in mirrors, has missed two weeks of work, and is requesting a fourth rhinoplasty. Previous surgeons have declined to operate. What response by the nurse is most appropriate?",
 opts:["Recognize the preoccupation as disproportionate and refer for psychiatric assessment, because repeated surgery rarely reduces the distress",
  "Support the surgical referral, since correcting the perceived defect usually resolves the concern",
  "Reassure the client that the nose appears normal, which addresses the distortion directly",
  "Advise the client to reduce mirror use, which is the primary treatment for the preoccupation"],
 ans:0,
 rat:{c:"Preoccupation with a perceived defect that others do not see, with repetitive checking and significant functional impairment, is body dysmorphic disorder. Cosmetic surgery characteristically fails to relieve the distress, so psychiatric assessment is the appropriate referral.",
  s:"Surgery usually worsens or simply transfers the preoccupation. Reassurance is not effective because the concern is not a correctable misperception, and mirror reduction is one behavioral component rather than the treatment itself."} },

{id:"PSY-055", t:"single", cn:"PSY", sys:"PSYCH", topic:"Avoidant/restrictive food intake disorder in a child", d:3, b:0.55, cj:"recognize", tags:["ARFID","pediatric","feeding","differential"],
 stem:"A 9-year-old child eats only six foods, all beige and uniform in texture, gagges when offered new foods, and has fallen below the fifth percentile for weight. There is no body image disturbance and no fear of weight gain. What does the nurse recognize?",
 opts:["Avoidant/restrictive food intake disorder, driven by sensory sensitivity to food characteristics rather than concern about body image",
  "Anorexia nervosa, because low weight alone reflects a disturbed body image",
  "Normal picky eating, because the child is otherwise healthy and active",
  "Pica, because the restricted variety suggests an underlying nutritional deficiency"],
 ans:0,
 rat:{c:"Restriction based on the sensory characteristics of food, without body image disturbance, that produces significant weight loss or nutritional deficiency is avoidant/restrictive food intake disorder. The absence of weight and shape concern is the key distinguishing feature.",
  s:"Anorexia nervosa requires body image disturbance or fear of weight gain, which is explicitly absent here. Growth failure below the fifth percentile is not normal picky eating, and pica involves eating non-nutritive substances rather than restricting variety."} },

{id:"PSY-056", t:"single", cn:"PSY", sys:"PSYCH", topic:"Expected course of adjustment disorder", d:2, b:0.45, cj:"analyze", tags:["adjustment disorder","stressor","prognosis"],
 stem:"A client developed insomnia, tearfulness, and difficulty concentrating within two weeks of losing a job. The symptoms are out of proportion to the situation and interfere with work performance, but criteria for major depression are not met. What is the expected course?",
 opts:["Symptoms should resolve within six months of the stressor or its consequences ending, with support and monitoring in the meantime",
  "Symptoms will persist indefinitely and require lifelong pharmacotherapy",
  "Symptoms signal an underlying psychotic disorder that will emerge within months",
  "Symptoms reflect malingering, since the client has a clear secondary gain from the job loss"],
 ans:0,
 rat:{c:"Adjustment disorder is a time-limited response to an identifiable stressor, beginning within three months and resolving within six months of the stressor or its consequences ending. Support and monitoring are appropriate while that window runs.",
  s:"The diagnosis is defined by its time limit, so indefinite symptoms would prompt reconsideration. Nothing here suggests psychosis, and identifiable distress after a job loss is a normal reaction rather than evidence of malingering."} },

{id:"PSY-057", t:"single", cn:"PSY", sys:"PSYCH", topic:"Oral tolerability before a depot antipsychotic", d:3, b:0.55, cj:"prioritize", tags:["long-acting injectable","antipsychotic","adherence","safety"],
 stem:"A client with schizophrenia has relapsed three times in two years, each time after stopping an oral antipsychotic. The provider discusses a long-acting injectable formulation. What is the essential nursing consideration before the first dose?",
 opts:["Establish tolerability with the oral form of the same medication first, because an injected depot cannot be removed once it is given",
  "Administer the injection immediately, since the relapse history justifies prompt treatment",
  "Skip oral tolerability testing, because the injectable formulation has a different side-effect profile",
  "Discontinue monitoring after the injection, because adherence is guaranteed by the formulation"],
 ans:0,
 rat:{c:"A depot injection releases medication over weeks and cannot be withdrawn, so oral tolerability must be established first to avoid trapping a client with an intolerable adverse effect for the duration of the release interval.",
  s:"Urgency does not remove the need to know the client tolerates the molecule. The injectable is the same drug rather than a different profile, and a depot removes only the daily adherence decision, not the need for clinical monitoring."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-109", t:"single", cn:"MOC", sys:"NEURO", topic:"Consent when capacity fluctuates", d:3, b:0.55, cj:"prioritize", tags:["capacity","delirium","consent"],
 stem:"A client with delirium is lucid and coherent at 9 a.m. and able to explain the risks of a proposed procedure, but becomes disoriented by the afternoon. A consent discussion is scheduled for 2 p.m. What should the nurse do?",
 opts:["Reschedule the consent discussion to a period of demonstrated lucidity and document the client's capacity at the time it is obtained",
  "Hold the consent discussion at the scheduled afternoon time, since delirium does not affect decision-making capacity",
  "Seek a surrogate decision-maker immediately, because delirium permanently removes capacity",
  "Proceed without consent, since the client demonstrated understanding earlier in the day"],
 ans:0,
 rat:{c:"Capacity is decision-specific and time-specific, so it must be present at the moment consent is obtained. Delirium fluctuates, which makes timing the discussion to a lucid interval the correct approach, with documentation of the assessment.",
  s:"Afternoon disorientation means capacity is absent then, so consent obtained at that time is not valid. Delirium is usually reversible rather than permanent, and earlier understanding does not carry forward to a later procedure."} },

{id:"MOC-110", t:"single", cn:"MOC", sys:"INF", topic:"Do-not-resuscitate status and a planned procedure", d:3, b:0.55, cj:"act", tags:["DNR","required reconsideration","perioperative"],
 stem:"A client with a documented do-not-resuscitate order is scheduled for a palliative procedure requiring general anesthesia. The anesthesiologist asks whether the order will apply in the operating room. What is the appropriate process?",
 opts:["Hold a required reconsideration discussion so the client and team explicitly decide and document whether the order is suspended, modified, or continued during the procedure",
  "Apply the existing order automatically, since whether resuscitation occurs does not depend on the setting",
  "Suspend the order automatically for the duration of the procedure without further discussion",
  "Cancel the procedure, because anesthesia cannot be given under an active do-not-resuscitate order"],
 ans:0,
 rat:{c:"Anesthesia and surgery can produce reversible events that differ from the natural progression the original order addressed. Required reconsideration ensures the client's wishes are re-expressed for this specific context and the decision is documented.",
  s:"Neither automatic continuation nor automatic suspension respects the client's current wishes, and both substitute a policy for a conversation. Palliative procedures are routinely performed under general anesthesia with a plan in place."} },

{id:"MOC-111", t:"single", cn:"MOC", sys:"INTG", topic:"Consent for clinical photography", d:2, b:0.45, cj:"act", tags:["privacy","consent","documentation"],
 stem:"A nurse wants to photograph a client's wound to document healing and share the images with the wound care team at a teaching hospital. What must the nurse do first?",
 opts:["Obtain the client's specific written consent for the photographs, explaining who will see them and how they will be stored",
  "Take the photographs as part of routine wound documentation, which requires no separate consent",
  "Obtain consent only if the photographs will be used outside the treating facility",
  "Ask the wound care team for approval, since they will be the recipients of the images"],
 ans:0,
 rat:{c:"Photographs are identifiable health information and require specific informed consent that covers the purpose, the audience, and the storage or disposal plan. Consent for treatment does not extend to image capture.",
  s:"Routine documentation consent does not cover photography, and internal use still involves identifiable images. Approval from the receiving team cannot substitute for the client's own consent."} },

/* ---------------- Reduction of Risk Potential (5) ---------------- */

{id:"RRP-079", t:"single", cn:"RRP", sys:"RESP", topic:"Interpreting a D-dimer result", d:3, b:0.55, cj:"evaluate", tags:["D-dimer","pulmonary embolism","pretest probability"],
 stem:"A client with a low pretest probability for pulmonary embolism has a D-dimer below the age-adjusted cut point. What does the nurse understand about this result?",
 opts:["A negative D-dimer in a low-probability client effectively excludes pulmonary embolism, so no diagnostic imaging is required",
  "The client still requires computed tomography pulmonary angiography, because the D-dimer cannot exclude the diagnosis",
  "The result confirms a pulmonary embolism, because any detectable D-dimer is abnormal",
  "The test must be repeated, because the D-dimer has no role in evaluating pulmonary embolism"],
 ans:0,
 rat:{c:"The D-dimer has high sensitivity and low specificity, so its value is exclusionary. A negative result in a client with low pretest probability makes pulmonary embolism unlikely enough to forgo imaging, which avoids unnecessary contrast and radiation.",
  s:"Imaging after a negative D-dimer in a low-probability client adds risk without adding information. Trace D-dimer is normal and rises with age, inflammation, and many other conditions, which is exactly why it cannot confirm anything."} },

{id:"RRP-080", t:"single", cn:"RRP", sys:"GI", topic:"Serum-ascites albumin gradient", d:3, b:0.55, cj:"analyze", tags:["ascites","SAAG","portal hypertension"],
 stem:"A client with new ascites undergoes paracentesis. The serum albumin is 3.0 g/dL and the ascitic fluid albumin is 1.9 g/dL. What does the nurse anticipate from this gradient?",
 opts:["A gradient of 1.1 g/dL or greater indicates portal hypertension as the cause of the ascites",
  "A gradient of 1.1 g/dL indicates that the ascites is malignant or inflammatory rather than from portal hypertension",
  "The gradient cannot be interpreted without a simultaneous ascitic fluid total protein",
  "The gradient indicates infection and requires immediate empiric antibiotic therapy"],
 ans:0,
 rat:{c:"The serum-ascites albumin gradient of 3.0 minus 1.9 equals 1.1 g/dL. A gradient at or above 1.1 indicates ascites from portal hypertension, which most commonly means cirrhosis, whereas a lower gradient points to peritoneal causes such as malignancy or infection.",
  s:"The direction of the interpretation is the tested point: a high gradient means portal hypertension, not malignancy. Total protein refines the picture but is not required to interpret the gradient, and infection is diagnosed by cell count rather than by this calculation."} },

{id:"RRP-081", t:"single", cn:"RRP", sys:"RESP", topic:"Obtaining a specimen when sputum cannot be produced", d:2, b:0.45, cj:"generate", tags:["sputum induction","tuberculosis","airborne precautions"],
 stem:"A client with suspected pulmonary tuberculosis cannot produce a sputum specimen despite repeated attempts and hydration. What does the nurse anticipate?",
 opts:["Sputum induction with hypertonic saline aerosol, performed in a negative-pressure room with airborne precautions in place",
  "A throat swab, which yields a sputum specimen just as well for mycobacterial culture",
  "Oropharyngeal suctioning with a standard catheter at the bedside in an open room",
  "Cancellation of testing, because an unproductive cough rules out active tuberculosis"],
 ans:0,
 rat:{c:"When a client cannot expectorate, hypertonic saline aerosol induces a productive cough and yields a lower-respiratory specimen. Because aerosolization increases airborne risk, the procedure is done in a negative-pressure room with full airborne precautions.",
  s:"A throat swab samples the upper airway and is not an adequate mycobacterial specimen. Open-room suctioning exposes staff and other clients, and many clients with active tuberculosis have a non-productive cough."} },

{id:"RRP-082", t:"single", cn:"RRP", sys:"NEURO", topic:"Teaching before an electroencephalogram", d:2, b:0.45, cj:"generate", tags:["EEG","neurodiagnostic","teaching"],
 stem:"A client is scheduled for a routine electroencephalogram to evaluate recurrent episodes of altered awareness, and the nurse is providing pre-procedure teaching. What should be included?",
 opts:["Wash the hair beforehand and avoid oils or styling products, and avoid caffeine, because the electrodes need clean scalp contact",
  "Stop all antiseizure medications for 48 hours before the test",
  "Remain completely still and hold the breath during the recording",
  "Expect the procedure to be painful where the electrodes attach to the scalp"],
 ans:0,
 rat:{c:"Electrode impedance depends on clean skin contact, so hair products must be avoided, and caffeine is withheld because it alters the tracing. The test is painless and the client stays awake and still but breathes normally.",
  s:"Medication changes are made only on the prescriber's instruction, and stopping them unsupervised risks seizures. Breath holding is not part of the study, and electrode paste application is not painful."} },

{id:"RRP-083", t:"single", cn:"RRP", sys:"REPI", topic:"Limits of a tumor marker result", d:3, b:0.55, cj:"evaluate", tags:["tumor marker","PSA","screening","teaching"],
 stem:"A client asks whether an elevated prostate-specific antigen blood test confirms prostate cancer. What is the nurse's accurate response?",
 opts:["An elevated result is not specific to cancer and also occurs with benign prostatic hyperplasia and infection, so it is not diagnostic on its own",
  "An elevated result confirms cancer, so a biopsy is not needed",
  "A normal result excludes cancer, so no further evaluation is ever required",
  "The test measures hormone levels rather than an antigen, which is why it is nonspecific"],
 ans:0,
 rat:{c:"Prostate-specific antigen rises with benign prostatic hyperplasia, prostatitis, instrumentation, and cancer alike, so an elevated value prompts further evaluation rather than establishing a diagnosis. Biopsy remains the definitive test.",
  s:"No tumor marker confirms cancer on its own. A normal result reduces but does not eliminate risk, and the test measures a glycoprotein produced by prostatic tissue rather than a hormone."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-081", t:"single", cn:"SIC", sys:"INF", topic:"Responding to a pump dose guardrail alert", d:3, b:0.55, cj:"prioritize", tags:["infusion pump","dose guardrail","medication safety"],
 stem:"A nurse programs an infusion pump and receives a soft guardrail alert indicating the dose exceeds the standard limit for the medication. The client's situation feels urgent. What should the nurse do?",
 opts:["Stop, obtain an independent double check, and confirm the order with the prescriber before overriding the alert",
  "Override the alert, because soft limits exist only to slow the nurse down",
  "Restart the infusion manually without the pump in order to avoid the alert entirely",
  "Reduce the dose silently until the alert clears, then titrate upward"],
 ans:0,
 rat:{c:"A guardrail alert is a signal that the programmed dose falls outside the range the organization considers safe, which is precisely when a second check and prescriber confirmation are warranted. Overriding is sometimes correct, but only after verification.",
  s:"Treating a safety alert as an obstacle defeats its purpose. Removing the pump removes every remaining safeguard, and silently changing a dose to clear an alert means administering something other than what was ordered."} },

{id:"SIC-082", t:"single", cn:"SIC", sys:"HEME", topic:"Accessing an implanted venous port", d:3, b:0.55, cj:"act", tags:["implanted port","central access","asepsis"],
 stem:"A client with an implanted venous access port requires chemotherapy, and the nurse is preparing to access the port. What technique is correct?",
 opts:["Use a non-coring needle with full aseptic technique, confirm blood return before infusing, and change the needle on the scheduled interval",
  "Use a standard intravenous catheter with aseptic technique, since the port septum reseals around any needle",
  "Flush vigorously if blood return is absent, to restore patency before infusing",
  "Leave the access needle in place indefinitely, since the port is designed for continuous access"],
 ans:0,
 rat:{c:"An implanted port requires a non-coring needle so the self-sealing septum is not damaged, strict aseptic technique because the device leads directly to central circulation, blood return confirmation before any infusion, and scheduled needle changes.",
  s:"A standard needle cores the septum and destroys it. Vigorous flushing against resistance can fracture the catheter or embolize a clot, and an indwelling access needle is a continuous infection portal that must be changed on schedule."} },

{id:"SIC-083", t:"single", cn:"SIC", sys:"CV", topic:"Vascular access when peripheral attempts fail", d:3, b:0.55, cj:"prioritize", tags:["intraosseous access","cardiac arrest","emergency"],
 stem:"An adult client in cardiac arrest has no palpable peripheral pulse, and two peripheral intravenous attempts have failed. What is the nurse's next action for vascular access?",
 opts:["Establish intraosseous access, because it can be obtained rapidly and accepts the same medications and fluids as a peripheral line",
  "Continue attempting peripheral access, since intraosseous access is reserved for children",
  "Administer medications by the endotracheal route, which is preferred over intraosseous access",
  "Delay medication until central venous access can be placed under sterile conditions"],
 ans:0,
 rat:{c:"The non-collapsible marrow cavity provides reliable access in shock and arrest when veins have collapsed. Intraosseous access takes seconds, accepts essentially any drug or fluid a peripheral line does, and is indicated in adults as well as children.",
  s:"Repeated failed attempts waste time during arrest when drug delivery is time-critical. The endotracheal route gives unreliable absorption and is a fallback only, and formal central line placement interrupts compressions and delays therapy."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-061", t:"single", cn:"HPM", sys:"INTG", topic:"Vision screening in asymptomatic adults", d:2, b:0.45, cj:"analyze", tags:["screening","vision","health promotion"],
 stem:"A nurse performs vision screening on a group of older adults at a community health fair. Several clients report no difficulty seeing. What should guide the nurse's interpretation?",
 opts:["Screen every client regardless of reported symptoms, because refractive error and early disease are frequently asymptomatic",
  "Screen only clients who report difficulty, since asymptomatic clients are unlikely to have visual impairment",
  "Rely on self-report alone, because it correlates closely with measured acuity",
  "Refer every client to an ophthalmologist, because community screening has no clinical value"],
 ans:0,
 rat:{c:"Screening exists precisely to find problems the client has not noticed. Early glaucoma, diabetic retinopathy, and uncorrected refractive error are commonly asymptomatic until damage or impairment is established.",
  s:"Self-report correlates poorly with measured acuity in older adults, so restricting screening to symptomatic clients misses the target population. Blanket referral ignores that screening is what identifies who actually needs specialist review."} },

{id:"HPM-062", t:"single", cn:"HPM", sys:"GI", topic:"One-time hepatitis C screening", d:2, b:0.45, cj:"analyze", tags:["hepatitis C","screening","health promotion"],
 stem:"A 45-year-old client with no symptoms and no known risk factors asks whether hepatitis C testing is needed. What is the nurse's accurate response?",
 opts:["One-time screening is recommended for all adults, because most infections are asymptomatic and curable treatment now exists",
  "Testing is needed only for clients with known risk factors or symptoms",
  "Testing is not useful, because there is no effective treatment for hepatitis C",
  "Screening must be repeated annually for all adults regardless of prior results"],
 ans:0,
 rat:{c:"Universal one-time adult screening is recommended because most people with hepatitis C have no symptoms and no recalled risk factor, while direct-acting antivirals now cure the large majority of infections. Finding it prevents cirrhosis and transmission.",
  s:"Risk-factor-only screening misses a substantial share of infections, which is why the recommendation moved to universal screening. Curative therapy exists, and annual repetition is unnecessary once a person has been screened and is not at ongoing risk."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-062", t:"single", cn:"BCC", sys:"RESP", topic:"Chest physiotherapy precautions", d:3, b:0.55, cj:"act", tags:["chest physiotherapy","bronchiectasis","airway clearance"],
 stem:"A client with bronchiectasis has thick secretions in the right lower lobe, and the nurse is planning chest physiotherapy with postural drainage. What precaution applies?",
 opts:["Percuss with cupped hands over the affected segment, avoid the spine and the kidneys, and stop if the client becomes dyspneic",
  "Percuss directly over the spine and rib cage with flat hands to maximize vibration",
  "Perform the treatment immediately after meals to loosen secretions while the client is settled",
  "Continue percussion through episodes of coughing, since coughing is the intended outcome"],
 ans:0,
 rat:{c:"Cupped hands create an air cushion that vibrates the chest wall without trauma, and bony or vulnerable structures such as the spine, kidneys, and any incision are avoided. Emerging dyspnea is a stop signal.",
  s:"Flat hands and direct percussion over bone cause pain and injury. Treatment is done before meals or at least an hour afterward to avoid vomiting, and coughing should be allowed to clear secretions rather than percussed through."} },

{id:"BCC-063", t:"single", cn:"BCC", sys:"GI", topic:"Incisional splinting for effective cough", d:2, b:0.45, cj:"generate", tags:["postoperative","pulmonary hygiene","pain"],
 stem:"A client two days after abdominal surgery reports that coughing is too painful and is taking shallow breaths instead. What should the nurse teach?",
 opts:["Splint the incision with a pillow held firmly against it while coughing, and use the prescribed analgesia before deep-breathing exercises",
  "Avoid coughing entirely, since it stresses the incision and delays healing",
  "Cough forcefully without support, because splinting prevents the secretions from clearing",
  "Withhold the analgesia until after the coughing exercises, so the client stays alert"],
 ans:0,
 rat:{c:"Splinting reduces tension on the incision so the client can generate an effective cough, and pre-medicating makes the effort tolerable. Together they restore the pulmonary hygiene that prevents postoperative atelectasis and pneumonia.",
  s:"Suppressing cough leads to secretion retention and atelectasis. Coughing without support is painful and less effective, and withholding analgesia guarantees the client will not cooperate with the exercises."} }
  );
})();
