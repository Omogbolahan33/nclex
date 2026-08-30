/* Wave 14 — 20 hand-authored hard RN items.
 * After wave 13 the clientNeed areas furthest under their blueprint share are
 * Safety and Infection Control 11.8% against 13% and Reduction of Risk
 * Potential 10.7% against 12%. SIC is also the second softest on difficulty at
 * 55% hard, so wave 14 leads with it. Every item is d>=2; 12 of 20 are d=3.
 *
 * Safety              : SIC-075 – SIC-080
 * Reduction of Risk   : RRP-073 – RRP-078
 * Management of Care  : MOC-105 – MOC-108
 * Basic Care/Comfort  : BCC-060 – BCC-061
 * Pharmacology        : PHA-104 – PHA-105
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Safety and Infection Control (6) ---------------- */

{id:"SIC-075", t:"single", cn:"SIC", sys:"INF", topic:"Reprocessing a semi-critical endoscope", d:3, b:0.55, cj:"act", tags:["reprocessing","high-level disinfection","endoscope"],
 stem:"A flexible endoscope used for a bronchoscopy has been cleaned at the bedside and transported to the reprocessing area. The nurse is preparing it for use on the next client. What must happen before the scope is used again?",
 opts:["High-level disinfection with the correct contact time, then rinsing with sterile or filtered water and complete drying before storage",
  "Cleaning with a low-level disinfectant wipe, which is adequate for a semi-critical device",
  "Soaking in alcohol, which dries the scope quickly and sterilizes the internal channels",
  "Autoclaving the scope, because heat sterilization guarantees the device is safe"],
 ans:0,
 rat:{c:"A flexible endoscope contacts mucous membrane and is semi-critical, so it requires high-level disinfection with the manufacturer's contact time, a rinse that does not reintroduce organisms, and thorough drying because retained moisture supports biofilm and bacterial growth.",
  s:"A low-level wipe does not reach the required kill level. Alcohol alone does not sterilize channels and can trap protein. Most flexible endoscopes cannot tolerate steam sterilization and would be destroyed by an autoclave."} },

{id:"SIC-076", t:"single", cn:"SIC", sys:"INF", topic:"Failed sterilization indicator", d:3, b:0.55, cj:"prioritize", tags:["sterilization","autoclave","recall"],
 stem:"A nurse opens a wrapped instrument tray for a sterile procedure and sees that the internal chemical indicator strip has not changed to the pass color. The external tape on the wrap did change color.",
 opts:["Treat the tray as not sterile, do not use it, and quarantine the remaining loads from that cycle while sterilization is notified",
  "Use the tray, because the external tape changed color, which confirms the cycle reached temperature",
  "Use the tray but add a sterile drape, since only the internal strip failed",
  "Re-autoclave the same tray and use it once the second cycle is complete"],
 ans:0,
 rat:{c:"An internal indicator that has not passed means the contents may not have reached sterilizing conditions, so the tray is not sterile. The rest of that cycle is suspect and must be quarantined and traced while the failure is investigated.",
  s:"External tape only confirms the package entered the chamber; it says nothing about conditions inside the wrap. A second cycle does not address why the first failed, and any item already used from that cycle requires an incident review."} },

{id:"SIC-077", t:"single", cn:"SIC", sys:"RESP", topic:"Respirator fit testing and seal check", d:2, b:0.45, cj:"act", tags:["respirator","airborne precautions","occupational health"],
 stem:"A nurse is assigned to care for a client with suspected pulmonary tuberculosis and must wear a filtering facepiece respirator. The nurse's annual fit test expired two months ago.",
 opts:["Complete a fit test before entering the room, and perform a user seal check each time the respirator is donned",
  "Enter the room after performing a user seal check, because the annual fit test is only a documentation requirement",
  "Wear a surgical mask instead, because it provides equivalent protection against airborne organisms",
  "Double-mask with two surgical masks, which is an accepted substitute for a fit-tested respirator"],
 ans:0,
 rat:{c:"A current fit test establishes that a specific respirator model and size seals on that individual's face, and a user seal check confirms the seal at each donning. Both are required before caring for a client on airborne precautions.",
  s:"A seal check cannot substitute for a fit test, because it does not establish that the model fits the wearer. A surgical mask is not a respirator and does not filter small airborne particles, and layering two of them does not change that."} },

{id:"SIC-078", t:"single", cn:"SIC", sys:"INF", topic:"Occupational radiation monitoring", d:2, b:0.45, cj:"evaluate", tags:["radiation safety","dosimetry","occupational health"],
 stem:"A nurse works regularly in an interventional suite where fluoroscopy is used and wears a personal radiation dosimeter. At the end of the quarter the badge is read.",
 opts:["The badge reports cumulative personal exposure, which is compared against regulatory limits and reviewed if the trend rises",
  "The badge shields the nurse's torso from scatter radiation during procedures",
  "The badge measures the radiation emitted by the fluoroscopy unit rather than the nurse's personal exposure",
  "The badge is only required for staff who work with unsealed radioactive sources"],
 ans:0,
 rat:{c:"A personal dosimeter measures the cumulative dose that individual received, and readings are tracked against regulatory limits so a rising trend triggers a review of technique and shielding. It is a monitoring device, not protection.",
  s:"The badge provides no shielding whatsoever. It measures the wearer's exposure rather than the machine's output, and it is required for anyone with a reasonable likelihood of exceeding a fraction of the dose limit, including staff in fluoroscopy suites."} },

{id:"SIC-079", t:"single", cn:"SIC", sys:"INF", topic:"Specimen transport integrity", d:2, b:0.45, cj:"act", tags:["specimen handling","pre-analytical error","transport"],
 stem:"A nurse collects a blood specimen in a tube with a gray top for a glucose level and a tube with a light blue top for coagulation studies. The laboratory is in a separate building and specimens travel by a pneumatic tube system.",
 opts:["Confirm each tube is appropriate for its transport method, invert the tubes the specified number of times, and place them in the correct carriers before sending",
  "Send the tubes loose in the carrier, because the tube system is designed to handle unsecured specimens",
  "Fill the light blue tube partially, since coagulation tubes do not need to be filled to the stated volume",
  "Delay inversion until the specimens arrive at the laboratory, so the contents are not disturbed in transit"],
 ans:0,
 rat:{c:"Pre-analytical errors are the largest source of wrong laboratory results. Each additive tube must be filled to its stated volume and inverted the specified number of times immediately, and the transport method must be validated for that tube type.",
  s:"A partially filled citrate tube has the wrong anticoagulant-to-blood ratio and invalidates coagulation results. Delaying inversion allows clotting in an anticoagulated tube, and loose tubes risk breakage and label loss in transit."} },

{id:"SIC-080", t:"single", cn:"SIC", sys:"INF", topic:"No-touch room disinfection adjunct", d:3, b:0.55, cj:"analyze", tags:["environmental cleaning","disinfection","C. difficile"],
 stem:"A client with Clostridioides difficile is discharged, and the room requires terminal cleaning. The unit has an automated ultraviolet-C disinfection device available, and the nurse is planning the process.",
 opts:["Perform manual cleaning with a sporicidal agent first, then use the ultraviolet device as an adjunct, because the light only works on surfaces it reaches",
  "Use the ultraviolet device alone, since it eliminates the need for manual cleaning",
  "Clean with a standard quaternary ammonium wipe, which is effective against spore-forming organisms",
  "Skip terminal cleaning, because the spores are destroyed by routine ventilation within 24 hours"],
 ans:0,
 rat:{c:"Ultraviolet-C is an adjunct that disinfects only what the light actually reaches, so organic soil and shadowed surfaces must be handled by manual cleaning with a sporicidal agent first. The two together are more reliable than either alone.",
  s:"Automated devices cannot remove bioburden, and soil blocks the light. Quaternary ammonium products are not sporicidal, and C. difficile spores persist on surfaces for months rather than clearing with ventilation."} },

/* ---------------- Reduction of Risk Potential (6) ---------------- */

{id:"RRP-073", t:"single", cn:"RRP", sys:"INF", topic:"Reading a tuberculin skin test", d:3, b:0.55, cj:"evaluate", tags:["tuberculosis","skin test","interpretation"],
 stem:"A nurse who is otherwise healthy and has no known exposure reads a tuberculin skin test 52 hours after placement and palpates 8 mm of induration at the site, with no redness measured.",
 opts:["Record 8 mm of induration as negative at this cut point, and document the measurement in millimeters rather than the presence of redness",
  "Record the result as positive, because any induration greater than 5 mm is positive in all adults",
  "Measure the diameter of the redness instead, because erythema is the indicator of a reaction",
  "Repeat the test at 72 hours, because the reading is only valid at that time"],
 ans:0,
 rat:{c:"Only induration is measured, in millimeters, and the cut point depends on risk. For a person with no known risk factors 10 mm is the threshold, so 8 mm is negative. Erythema is not measured and does not indicate infection.",
  s:"The 5 mm threshold applies to specific high-risk groups such as people with HIV or recent close contact, not to all adults. Redness without induration is not a positive result, and the test can be read between 48 and 72 hours."} },

{id:"RRP-074", t:"single", cn:"RRP", sys:"HEME", topic:"Special blood product modifications", d:3, b:0.55, cj:"analyze", tags:["blood products","irradiation","transfusion"],
 stem:"A client undergoing hematopoietic stem cell transplantation requires platelet transfusions. The provider specifies irradiated and leukoreduced products.",
 opts:["Irradiation prevents transfusion-associated graft-versus-host disease, and leukoreduction reduces febrile reactions and cytomegalovirus transmission",
  "Irradiation prevents hemolysis, and leukoreduction extends the shelf life of the platelets",
  "Irradiation reduces the white cell count, and leukoreduction inactivates any virus present in the product",
  "Both modifications are routine for every transfusion and carry no specific indication in this client"],
 ans:0,
 rat:{c:"Irradiation inactivates donor T lymphocytes so they cannot engraft and attack an immunocompromised host, which is the specific risk after stem cell transplantation. Leukoreduction removes white cells, lowering febrile non-hemolytic reactions and the risk of transmitting cytomegalovirus.",
  s:"Irradiation does not prevent hemolysis or reduce the white cell count, and leukoreduction is not a sterilizing step. These are targeted modifications ordered for defined indications rather than defaults for every transfusion."} },

{id:"RRP-075", t:"single", cn:"RRP", sys:"HEME", topic:"Intraoperative cell salvage", d:3, b:0.55, cj:"analyze", tags:["cell salvage","autologous transfusion","perioperative"],
 stem:"A client scheduled for a major spinal fusion asks the nurse about intraoperative cell salvage as a way to avoid donor blood. The nurse is explaining how the process works.",
 opts:["Blood lost in the surgical field is suctioned, washed and centrifuged, and the concentrated red cells are returned to the client, which does not replace clotting factors or platelets",
  "Blood is collected before surgery, stored, and returned during the procedure, which removes the need for any intraoperative collection",
  "The salvaged blood is returned exactly as suctioned, so the client also receives the clotting factors lost during surgery",
  "Cell salvage is contraindicated in spinal surgery, because the field cannot be kept free of contamination"],
 ans:0,
 rat:{c:"Intraoperative cell salvage recovers shed blood, washes and centrifuges it, and returns concentrated autologous red cells. Because the washing removes plasma, the client receives red cells without clotting factors or platelets, which may still need replacement.",
  s:"Collecting blood before surgery describes preoperative autologous donation, a different process. Returning unwashed blood risks coagulopathy and embolism, and cell salvage is commonly used in spinal surgery with appropriate precautions."} },

{id:"RRP-076", t:"single", cn:"RRP", sys:"RESP", topic:"Pleural fluid analysis", d:3, b:0.55, cj:"analyze", tags:["pleural effusion","Light's criteria","thoracentesis"],
 stem:"A client has a thoracentesis for a new pleural effusion. The pleural fluid protein is 4.2 g/dL with a simultaneous serum protein of 6.0 g/dL, and the pleural fluid lactate dehydrogenase is 310 units/L with a serum level of 180 units/L.",
 opts:["An exudate, because the fluid-to-serum protein ratio exceeds 0.5 and the fluid-to-serum lactate dehydrogenase ratio exceeds 0.6",
  "A transudate, because both protein values fall within normal laboratory limits",
  "A transudate, because the pleural fluid lactate dehydrogenase is lower than twice the upper limit of normal serum",
  "An exudate, because any detectable lactate dehydrogenase in pleural fluid indicates inflammation"],
 ans:0,
 rat:{c:"Light's criteria classify an effusion as exudative when the fluid-to-serum protein ratio exceeds 0.5, the fluid-to-serum lactate dehydrogenase ratio exceeds 0.6, or the fluid lactate dehydrogenase exceeds two-thirds the upper limit of normal serum. Here the protein ratio is 0.7 and the enzyme ratio is 1.7, so it is an exudate.",
  s:"Absolute values within the normal range do not determine the class; the ratios do. Lactate dehydrogenase is normally present in small amounts, so mere detection does not indicate inflammation."} },

{id:"RRP-077", t:"single", cn:"RRP", sys:"INTG", topic:"Obtaining a wound culture correctly", d:2, b:0.45, cj:"act", tags:["wound culture","specimen collection","infection"],
 stem:"A provider orders a culture of a chronic pressure injury that is not healing. The wound has slough and drainage on the surface, and the nurse is preparing to collect the specimen.",
 opts:["Cleanse the wound first, then collect a tissue specimen or use a validated swab technique applied with pressure to viable tissue",
  "Swab the surface drainage of the pressure injury before cleansing, since that fluid contains the most organisms",
  "Swab the slough, because necrotic material holds the organisms causing the infection",
  "Collect the specimen from the intact skin around the wound edge to avoid contaminating the wound bed"],
 ans:0,
 rat:{c:"Surface drainage and slough reflect colonization rather than the organisms invading tissue, so the wound is cleansed first and the specimen is taken from viable tissue, ideally as a tissue biopsy or a Levine-technique swab.",
  s:"Culturing surface exudate or slough grows colonizers and misdirects therapy. Peri-wound skin grows skin flora, which tells nothing about the infection in the wound bed."} },

{id:"RRP-078", t:"single", cn:"RRP", sys:"HEME", topic:"Blood culture collection technique", d:2, b:0.45, cj:"act", tags:["blood culture","sepsis","contamination"],
 stem:"A client has a fever of 39.1°C and suspected bloodstream infection, and the provider orders blood cultures before starting antibiotics. The nurse is preparing to draw the specimens.",
 opts:["Collect two sets from separate venipuncture sites with meticulous skin antisepsis, drawing each into the correct bottles in the proper order",
  "Collect one set, because a single positive culture is sufficient to identify the organism",
  "Draw both sets from the existing intravenous catheter to avoid a second venipuncture",
  "Start the antibiotic first, then collect the cultures once the client's temperature begins to fall"],
 ans:0,
 rat:{c:"Two sets from separate sites let the laboratory distinguish a true pathogen from a skin contaminant and improve yield, and proper skin antisepsis with full drying is what prevents contamination. Cultures are drawn before antibiotics when that is feasible.",
  s:"A single set cannot separate contamination from infection. Drawing from an existing catheter frequently grows colonizing organisms, and giving antibiotics first lowers the yield of every subsequent culture."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-105", t:"single", cn:"MOC", sys:"INF", topic:"Safety in a telehealth encounter", d:3, b:0.55, cj:"prioritize", tags:["telehealth","documentation","emergency planning"],
 stem:"A nurse conducts a scheduled telehealth visit with a client managing heart failure at home. Ten minutes into the call the client reports new shortness of breath, and the nurse cannot see the client's full body on camera.",
 opts:["Confirm the client's physical address and a call-back number at the start of every visit, and escalate to emergency services if the symptoms warrant it",
  "Continue the assessment verbally, because the client agreed to a telehealth visit rather than an in-person one",
  "Ask the client to call back during office hours, when a provider is available to evaluate the symptoms",
  "Document the symptoms and send a secure message to the provider for review at the next scheduled visit"],
 ans:0,
 rat:{c:"The defining safety requirement of telehealth is knowing exactly where the client is and how to reach them if the encounter turns into an emergency. Verifying location and a call-back number up front is what makes escalation possible.",
  s:"A verbal assessment cannot substitute for evaluation when symptoms suggest decompensation. Deferring to office hours or a secure message delays care for a potentially urgent problem, and neither is an acceptable response to new respiratory distress."} },

{id:"MOC-106", t:"single", cn:"MOC", sys:"INF", topic:"Expanded access to an investigational drug", d:3, b:0.55, cj:"analyze", tags:["investigational drug","informed consent","advocacy"],
 stem:"A client with a life-threatening illness and no remaining approved options asks the nurse about obtaining an investigational drug that is not yet approved. The nurse is explaining how expanded access works.",
 opts:["Explain that the treating provider must request it, the manufacturer must agree to supply it, an ethics review and informed consent are required, and the nurse can help the client prepare questions",
  "Tell the client that unapproved drugs cannot be given to anyone outside a clinical trial under any circumstances",
  "Explain that the nurse can order the drug directly, since no approved option remains for the client",
  "Advise the client that expanded access guarantees the drug will be provided once it is requested"],
 ans:0,
 rat:{c:"Expanded access requires the treating provider to request it, the manufacturer to agree, institutional review board or ethics review, and informed consent that makes the uncertain risk profile explicit. The nurse's role is advocacy and support, not authorization.",
  s:"Expanded access exists precisely for clients who cannot join a trial, so a flat refusal is inaccurate. A nurse cannot order an investigational drug, and access is never guaranteed because the manufacturer may decline or the review may not approve."} },

{id:"MOC-107", t:"single", cn:"MOC", sys:"INF", topic:"Responding to disruptive colleague behavior", d:3, b:0.55, cj:"act", tags:["incivility","workplace safety","chain of command"],
 stem:"During a busy shift a senior colleague repeatedly speaks to the nurse in a demeaning tone in front of clients, dismisses the nurse's clinical concerns without assessment, and rolls their eyes when the nurse asks for clarification about a medication order.",
 opts:["Address the behavior through the established chain of command and document specific incidents, because dismissive behavior toward a colleague degrades the safety of the reporting environment",
  "Say nothing, because the colleague is more experienced and may be reacting to a stressful shift",
  "Respond in the same tone so the colleague understands how the behavior feels to receive",
  "Avoid raising concerns with that colleague in the future, which removes the source of the conflict"],
 ans:0,
 rat:{c:"Disruptive behavior is a patient-safety issue, not merely an interpersonal one, because a nurse who expects to be dismissed stops speaking up, and silenced concerns are how errors reach clients. The response is to document specifics and use the chain of command.",
  s:"Tolerating the behavior teaches the nurse that raising concerns is unsafe. Matching the tone escalates the situation and undermines professional standing, and self-silencing is the exact harm the reporting system exists to prevent."} },

{id:"MOC-108", t:"single", cn:"MOC", sys:"INF", topic:"Performance concern about a colleague", d:3, b:0.55, cj:"prioritize", tags:["peer review","competency","accountability"],
 stem:"A nurse observes a colleague administer an intravenous push medication considerably faster than the recommended rate. The client shows no adverse effect, and the colleague has been seen doing the same thing on other shifts.",
 opts:["Report the observation to the charge nurse or manager so it can be addressed through the competency process, and intervene in the moment if a client is at risk",
  "Say nothing, because the client was not harmed and the colleague is accountable for their own practice",
  "Tell the colleague to stop, and take no further action if they agree",
  "Report the colleague directly to the state board of nursing as the first step"],
 ans:0,
 rat:{c:"A repeated unsafe practice is a competency concern that belongs in the organization's performance process, and the nurse has an obligation to raise it even when no harm has occurred yet. Immediate client risk requires intervening at the bedside first.",
  s:"The absence of harm on one occasion does not make a repeated deviation safe. A private conversation may not change a pattern and leaves no record, and going straight to the board bypasses the internal process that exists to correct practice."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-060", t:"single", cn:"BCC", sys:"REN", topic:"External condom catheter use", d:2, b:0.45, cj:"generate", tags:["incontinence","CAUTI prevention","devices"],
 stem:"A male client with urinary incontinence has intact skin and no urinary retention. The nurse is selecting a management approach that reduces infection risk.",
 opts:["Apply an external condom catheter with the correct sizing, leave space at the tip, and remove it daily for skin assessment",
  "Insert an indwelling urinary catheter, because it is the most reliable way to manage incontinence",
  "Apply the external catheter and leave it in place for several days to reduce handling of the skin",
  "Tape the collection bag to the client's thigh above the level of the bladder to prevent backflow"],
 ans:0,
 rat:{c:"An external catheter avoids breaching the urethra and so carries far less infection risk than an indwelling catheter. Correct sizing, space at the tip to prevent constriction, and daily removal for skin inspection are what keep it safe.",
  s:"An indwelling catheter is not indicated for incontinence alone and is a leading cause of catheter-associated infection. Leaving an external device in place for days causes skin breakdown, and the drainage bag must hang below bladder level to prevent reflux."} },

{id:"BCC-061", t:"single", cn:"BCC", sys:"NEURO", topic:"Adaptive equipment for self-feeding", d:2, b:0.45, cj:"generate", tags:["self-care","occupational therapy","independence"],
 stem:"A client with limited hand grip and reduced range of motion after a stroke wants to feed themselves at meals but becomes fatigued and spills food. The nurse is planning interventions with occupational therapy.",
 opts:["Introduce adaptive utensils with built-up handles and a plate guard, and let the client feed themselves at their own pace",
  "Take over feeding the client rather than letting them feed themselves, because it is faster and reduces spilling",
  "Restrict the client to a pureed diet, because it is easier to manage with limited hand function",
  "Schedule meals only when a staff member is available to sit with the client throughout"],
 ans:0,
 rat:{c:"Built-up handles improve grip and a plate guard gives a surface to scoop against, which restores independence rather than replacing it. Preserving the ability to self-feed supports both function and dignity, and pacing reduces fatigue.",
  s:"Taking over feeding removes the practice that maintains function and undermines autonomy. A texture change addresses swallowing rather than hand function, so it does not solve the stated problem, and constant staffing is not required once equipment is in place."} },

/* ---------------- Pharmacological Therapies (2) ---------------- */

{id:"PHA-104", t:"single", cn:"PHA", sys:"CV", topic:"Adenosine administration and monitoring", d:3, b:0.55, cj:"act", tags:["adenosine","SVT","administration"],
 stem:"A client with symptomatic supraventricular tachycardia that has not responded to vagal maneuvers is prescribed adenosine. The nurse is preparing to give it.",
 opts:["Give it as a rapid intravenous push followed immediately by a saline flush, warn the client about brief flushing and chest pressure, and keep the defibrillator at the bedside",
  "Infuse it slowly over 10 minutes to reduce the intensity of the client's side effects",
  "Give it through a peripheral line in the hand, because a proximal site delays the onset of action",
  "Administer a beta blocker first, since adenosine is reserved for clients who fail rate control"],
 ans:0,
 rat:{c:"Adenosine has a half-life under 10 seconds, so it must be given as a rapid push with an immediate flush through the most proximal access available. Transient asystole, flushing, and chest pressure are expected, and resuscitation equipment stays at the bedside.",
  s:"A slow infusion allows the drug to be metabolized before it reaches the heart, so it will not convert the rhythm. A distal site delays delivery and reduces effectiveness, and adenosine is a first-line conversion agent rather than a last resort."} },

{id:"PHA-105", t:"single", cn:"PHA", sys:"NEURO", topic:"Abrupt baclofen withdrawal", d:3, b:0.55, cj:"recognize", tags:["baclofen","withdrawal","intrathecal pump"],
 stem:"A client with an intrathecal baclofen pump presents with worsening spasticity, fever, altered mental status, and rigidity. The pump reservoir is found to be empty, and the last refill was overdue.",
 opts:["Treat this as acute baclofen withdrawal, which is a medical emergency, and notify the team immediately for urgent drug replacement and supportive care",
  "Restart oral baclofen at the previous total daily dose, because the oral route is equivalent to the intrathecal route",
  "Administer a benzodiazepine and observe, since the symptoms reflect rebound spasticity that resolves on its own",
  "Attribute the findings to sepsis and wait for culture results before treating"],
 ans:0,
 rat:{c:"Abrupt intrathecal baclofen withdrawal causes rebound spasticity, rigidity, hyperthermia, and altered mental status, and can progress to rhabdomyolysis and multi-organ failure. It is a time-critical emergency requiring urgent restoration of the drug and supportive care.",
  s:"Oral baclofen cannot reproduce intrathecal concentrations and is not a substitute in an acute crisis. Observation allows progression to a fatal outcome, and while sepsis is on the differential, an empty reservoir makes withdrawal the working diagnosis that must be treated now."} }
  );
})();
