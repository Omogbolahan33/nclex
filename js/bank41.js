/* Wave 31 — 20 hand-authored hard RN items.
 * Management of Care at 17.6% against an 18% target is the largest remaining
 * gap to its blueprint share, so wave 31 leads with five. Reduction of Risk
 * at 11.9% against 12% and Physiological Adaptation at 13.3% against 14% take
 * eight between them. Health Promotion at 68% hard and Basic Care at 70% hard
 * remain the softest on difficulty and take four.
 * Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms. Every id prefix matches its cn, as the smoke
 * guard added in 01c816c now enforces.
 *
 * Management of Care  : MOC-167 – MOC-171
 * Reduction of Risk   : RRP-121 – RRP-124
 * Physiological Adapt : PAA-126 – PAA-129
 * Safety              : SIC-127 – SIC-129
 * Basic Care/Comfort  : BCC-092 – BCC-093
 * Health Promotion    : HPM-097 – HPM-098
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (5) ---------------- */

{id:"MOC-167", t:"single", cn:"MOC", sys:"INF", topic:"Normalization of deviance", d:3, b:0.55, cj:"analyze", tags:["normalization of deviance","workaround","safety culture"],
 stem:"On a unit, skipping one step of a device checklist has become routine because it has never caused harm and saves time. New staff are taught to do the same. What does this pattern represent?",
 opts:["Normalization of deviance, where a shortcut that repeatedly produces no visible harm is reclassified as acceptable practice until the accumulating risk produces a failure",
  "Efficient practice, since a step that never causes harm is unnecessary by definition",
  "An individual performance problem belonging only to the staff who started it",
  "A training gap, since new staff simply have not been taught the correct procedure"],
 ans:0,
 rat:{c:"Absence of harm is not evidence of safety; it means the risk has not yet met the conditions that turn it into an event. Each uneventful shortcut lowers the threshold for the next, and teaching it to new staff embeds the deviation in the culture rather than in one person.",
  s:"A step exists for a reason that may only appear under rare conditions, so no harm so far proves nothing. Attributing it to one person ignores that the unit now teaches it, and new staff are being trained correctly in the wrong practice, so training is not the gap."} },

{id:"MOC-168", t:"single", cn:"MOC", sys:"INF", topic:"Structured verbal handoff", d:3, b:0.55, cj:"act", tags:["handoff","handover","communication"],
 stem:"A unit replaces informal end-of-shift conversation with a structured handoff tool. What does a sound handoff require beyond a consistent format?",
 opts:["An opportunity for the receiver to ask questions and clarify, transfer of the current plan and outstanding tasks and what to watch for, and inclusion of changes since the last handoff rather than a recitation of static information",
  "A fixed script read aloud without interruption, since questions prolong the handoff",
  "A complete history from admission, since the receiver needs the full picture every time",
  "Verbal transfer only, since written information is already in the record and need not be mentioned"],
 ans:0,
 rat:{c:"Most handoff failures are omissions of what matters now rather than of history. A structured format ensures consistency, but the value comes from what is anticipated next, what is outstanding, and the receiver's chance to interrogate the plan before accepting responsibility.",
  s:"Suppressing questions removes the only mechanism that catches a misunderstanding before it becomes an error. Repeating the full history crowds out the forward-looking information that is actually needed, and a written record does not convey priority or concern."} },

{id:"MOC-169", t:"single", cn:"MOC", sys:"REN", topic:"Artificial hydration near the end of life", d:3, b:0.55, cj:"analyze", tags:["artificial hydration","end of life","symptom burden"],
 stem:"A family asks for intravenous fluids for a relative in the last days of life who is drinking only sips, believing dehydration is causing suffering. What does the nurse understand?",
 opts:["Reduced intake is part of the dying process and artificial fluids may increase oedema, respiratory secretions, and the need for invasive lines without relieving symptoms, so the conversation should focus on mouth care and what comfort actually requires",
  "Fluids must be given, since dehydration is inherently painful and always causes suffering",
  "The family's belief is irrelevant, so the request should be declined without discussion",
  "Fluids should be started by default, since withdrawing them later is more distressing than not starting"],
 ans:0,
 rat:{c:"In the dying phase, reduced intake does not produce the thirst and discomfort expected from dehydration in a well person, while administered fluid can worsen oedema and secretions and require a line. Good mouth care addresses the symptom that does occur, which is dryness.",
  s:"Dehydration near death is not the same experience as dehydration in a healthy person, and fluids can add burden. The family's understanding is the reason for the conversation rather than something to dismiss, and starting by default creates its own harm and a harder later decision."} },

{id:"MOC-170", t:"single", cn:"MOC", sys:"INTG", topic:"Eye and tissue donation after death", d:3, b:0.55, cj:"act", tags:["eye donation","tissue donation","referral"],
 stem:"A client dies and the nurse is asked about eye donation. What applies?",
 opts:["The eye bank or donation organization must be notified within the required time window, consent is sought from the person with legal authority unless the client was a registered donor under applicable law, and corneas can often be recovered even when solid organ donation is not possible",
  "Donation is only possible if the client died in intensive care on a ventilator, since tissue requires circulation",
  "The nurse may give consent on the family's verbal word, since written consent is not required",
  "Referral must wait until the funeral arrangements are settled, since the family needs time first"],
 ans:0,
 rat:{c:"Corneal and tissue recovery has a defined time window and does not require the circulatory conditions that solid organ donation does, so many more deaths are eligible than families assume. Referral is time-critical and consent follows the legal hierarchy or a prior registration.",
  s:"Ventilator support is a requirement for solid organ donation rather than for corneas, which is exactly why referral is still needed. Consent must come from the person with legal authority in the required form, and delaying referral past the window loses the opportunity permanently."} },

{id:"MOC-171", t:"single", cn:"MOC", sys:"INF", topic:"Correcting an omission in the record", d:3, b:0.55, cj:"act", tags:["documentation","correction entry","record integrity"],
 stem:"A nurse realises that a medication given three hours ago was never documented. What is the correct action?",
 opts:["Add an entry now, clearly labelled as a late entry with the actual time of administration and the time of documentation, rather than backdating it to the administration time",
  "Enter it with the original administration time, since that is when it was given and the record should reflect that",
  "Leave it undocumented, since adding it later makes the record inconsistent",
  "Ask a colleague to document it, since a second entry looks more accurate"],
 ans:0,
 rat:{c:"The record must show both what happened and when it was written. A properly labelled late entry preserves the audit trail and is honest; backdating fabricates the sequence of events and is falsification, however accurate the clinical content.",
  s:"Backdating is falsification even when the fact recorded is true. Omitting the administration leaves the record wrong and the next clinician uninformed, and having someone else document care they did not give misattributes it."} },

/* ---------------- Reduction of Risk Potential (4) ---------------- */

{id:"RRP-121", t:"single", cn:"RRP", sys:"REN", topic:"Urodynamic testing", d:3, b:0.55, cj:"act", tags:["urodynamic testing","preparation","infection risk"],
 stem:"A client is scheduled for urodynamic testing to investigate urinary incontinence. What preparation and aftercare apply?",
 opts:["Explain that catheters and sensors are placed to measure bladder pressure during filling and emptying, that arriving with a comfortably full bladder may be required, and afterward increase fluids and watch for dysuria or frequency suggesting infection",
  "Advise arriving with an empty bladder, since the test begins by emptying it",
  "Reassure the client that no instrument enters the urethra, since the test is entirely external",
  "Restrict fluids afterward, since increased intake interferes with the results"],
 ans:0,
 rat:{c:"Urodynamic study measures pressure and flow using catheters and sensors, so instrumentation of the urinary tract occurs and infection is the principal afterward risk. Preparation depends on the specific protocol, and post-test fluid intake helps flush the tract.",
  s:"Protocols commonly ask for a full bladder so filling can be measured from a known point. The test is not external, which is the source of both the discomfort and the infection risk, and restricting fluids afterward would increase rather than reduce infection risk."} },

{id:"RRP-122", t:"single", cn:"RRP", sys:"REPI", topic:"Endometrial biopsy aftercare", d:3, b:0.55, cj:"generate", tags:["endometrial biopsy","aftercare","infection"],
 stem:"A client has just had an outpatient endometrial biopsy. What discharge teaching is required?",
 opts:["Expect cramping and light bleeding for a few days, use pads rather than tampons, avoid intercourse and bathing as directed, and report heavy bleeding, fever, or worsening pain, since perforation and infection are recognized complications",
  "Expect no bleeding at all, since any bleeding indicates the procedure failed",
  "Use tampons for convenience, since they are safe immediately after the procedure",
  "Resume all normal activity immediately, since there are no restrictions after this procedure"],
 ans:0,
 rat:{c:"Cramping and light bleeding are expected, while heavy bleeding, fever, or escalating pain suggest perforation or infection and require review. Pads avoid introducing bacteria into a recently instrumented uterus, and activity restrictions follow the clinician's direction.",
  s:"Light bleeding is expected rather than a sign of failure. Tampons introduce organisms into a recently instrumented tract, and there are activity and bathing restrictions precisely because the cervix and endometrium have been breached."} },

{id:"RRP-123", t:"single", cn:"RRP", sys:"NEURO", topic:"Safety after pharmacological pupil dilation", d:3, b:0.55, cj:"act", tags:["dilated eye exam","photophobia","driving"],
 stem:"A client receives dilating drops for a fundus examination. What safety teaching is required before they leave?",
 opts:["Vision will be blurred and light sensitivity increased for several hours, so they must not drive until vision clears, should bring sunglasses, and need someone to accompany them if they are unsteady",
  "They may drive immediately, since dilating drops affect only light sensitivity and not acuity",
  "The effects last minutes, so no precautions are needed after leaving the clinic",
  "They should avoid bright light permanently, since dilation causes lasting retinal damage"],
 ans:0,
 rat:{c:"Mydriatic and cycloplegic drops blur near vision and increase light sensitivity for hours, which makes driving unsafe until the effect wears off. Sunglasses reduce discomfort, and unsteadiness from blurred vision is a fall risk that an accompanying person addresses.",
  s:"Acuity is affected, particularly for near vision, so driving is unsafe. The effect lasts hours rather than minutes, and bright light is uncomfortable rather than damaging, so the precaution is temporary."} },

{id:"RRP-124", t:"single", cn:"RRP", sys:"NEURO", topic:"Tympanometry and audiometry", d:3, b:0.55, cj:"evaluate", tags:["tympanometry","audiometry","interpretation"],
 stem:"A client has normal pure-tone audiometry but an abnormal tympanogram. What does the nurse understand?",
 opts:["Hearing sensitivity is intact but middle ear function is impaired, since tympanometry measures compliance and pressure rather than the ability to hear, so a middle ear cause such as fluid or eustachian tube dysfunction is suggested",
  "Both tests measure hearing, so the results contradict each other and one must be repeated",
  "The abnormal tympanogram means the client is deaf, since it is the more accurate test",
  "The results indicate sensorineural hearing loss, since that is what an abnormal tympanogram shows"],
 ans:0,
 rat:{c:"The two tests measure different things. Audiometry establishes hearing thresholds, while tympanometry assesses middle ear mechanics through compliance and pressure. Normal thresholds with an abnormal tympanogram points to a conductive or middle ear problem rather than to hearing loss.",
  s:"They are complementary rather than duplicative, so no contradiction exists. An abnormal tympanogram does not quantify hearing, and sensorineural loss is identified on audiometry, whereas tympanometry is characteristically normal in that condition."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-126", t:"single", cn:"PAA", sys:"GI", topic:"Assessing failure to thrive", d:3, b:0.55, cj:"analyze", tags:["failure to thrive","growth assessment","feeding history"],
 stem:"An eight-month-old has fallen from the 50th to the 5th percentile for weight over three months while length remains on the 50th. What does the nurse prioritize in assessment?",
 opts:["A detailed feeding and social history covering intake, vomiting, stool pattern, feeding interaction, and household circumstances, since weight loss with preserved length suggests inadequate intake or malabsorption rather than a constitutional pattern",
  "Reassurance, since length remains normal and percentile position matters less than the child's alertness",
  "Immediate referral for genetic testing, since crossing percentiles indicates a chromosomal disorder",
  "A trial of high-calorie supplements before assessment, since weight gain is the priority"],
 ans:0,
 rat:{c:"Weight is the first parameter to fall when intake or absorption is inadequate, while length is preserved until the problem is longstanding, so this pattern points to a nutritional or absorptive cause. A structured history identifies the mechanism before any intervention is chosen.",
  s:"A two-major-percentile fall is significant and not reassuring. Crossing percentiles has many causes, most of them environmental or feeding-related, so genetic testing is not the first step, and supplementing before assessment can mask the cause and delay the correct intervention."} },

{id:"PAA-127", t:"single", cn:"PAA", sys:"REN", topic:"Assessing dehydration in an infant", d:3, b:0.55, cj:"recognize", tags:["dehydration","infant","assessment"],
 stem:"A seven-month-old with two days of vomiting and diarrhoea has a sunken anterior fontanelle, no tears when crying, dry mucous membranes, and only two wet nappies in twelve hours. What does the nurse recognize?",
 opts:["Clinical dehydration requiring prompt assessment of severity and rehydration, since these signs together indicate significant fluid deficit and oral or intravenous replacement is needed according to severity",
  "Mild dehydration that can be managed at home with water between feeds",
  "A normal response to illness, since infants normally produce fewer wet nappies when unwell",
  "A urinary tract infection, since reduced urine output is the defining feature"],
 ans:0,
 rat:{c:"The combination of a sunken fontanelle, absent tears, dry mucous membranes, and reduced urine output is the classic picture of clinically significant dehydration. Severity determines whether oral rehydration solution or intravenous fluid is used, and assessment must be prompt.",
  s:"These signs together indicate more than mild dehydration, and plain water does not replace lost electrolytes and can worsen the imbalance. Reduced urine output is not normal in illness, and it reflects volume depletion rather than specifically indicating infection."} },

{id:"PAA-128", t:"single", cn:"PAA", sys:"HEME", topic:"Breastfeeding jaundice", d:3, b:0.55, cj:"act", tags:["breastfeeding jaundice","feeding frequency","bilirubin"],
 stem:"A five-day-old who is breastfed has a rising bilirubin and is feeding four times in twenty-four hours with poor latch. What is the appropriate response?",
 opts:["Increase feeding frequency to eight to twelve times daily with lactation support, since inadequate intake reduces bilirubin elimination through stool, and monitor the level rather than stopping breastfeeding",
  "Stop breastfeeding and switch to formula permanently, since breast milk is causing the jaundice",
  "Give water between feeds, since extra fluid dilutes the bilirubin",
  "Reassure the parents and recheck in a week, since feeding four times a day is adequate and all newborn jaundice resolves spontaneously"],
 ans:0,
 rat:{c:"Early breastfeeding jaundice is driven by insufficient intake, which slows gut transit and increases enterohepatic reabsorption of bilirubin. The treatment is more effective feeding, with lactation support to correct the latch, while the level is monitored against the treatment threshold.",
  s:"This is intake-related jaundice rather than breast milk jaundice, so the answer is more feeding rather than stopping. Water does not increase bilirubin excretion and displaces intake, and a rising level in a five-day-old needs monitoring against thresholds rather than a week's wait."} },

{id:"PAA-129", t:"single", cn:"PAA", sys:"HEME", topic:"Warfarin in pregnancy", d:3, b:0.55, cj:"act", tags:["warfarin","pregnancy","anticoagulation"],
 stem:"A client on warfarin for a mechanical heart valve reports a positive pregnancy test at six weeks. What is the nurse's priority action?",
 opts:["Advise urgent specialist review, since warfarin is teratogenic with exposure between roughly six and twelve weeks and anticoagulation must be continued, so management requires specialist substitution and monitoring rather than simply stopping",
  "Stop the warfarin immediately without replacement, since any anticoagulant exposure is harmful to the fetus",
  "Continue unchanged, since exposure at six weeks is harmless and stopping anticoagulation is always more dangerous",
  "Halve the dose, since lower exposure removes the teratogenic risk while maintaining protection"],
 ans:0,
 rat:{c:"Warfarin causes a recognized embryopathy with first-trimester exposure, but a mechanical valve requires uninterrupted anticoagulation because maternal thrombosis is life-threatening. The decision is a specialist one involving substitution and intensive monitoring, and it is urgent.",
  s:"Stopping without replacement risks valve thrombosis and maternal death, so it is not the safe option. Continuing unchanged ignores established teratogenicity, and a lower dose neither removes the risk nor reliably protects the valve."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-127", t:"single", cn:"SIC", sys:"INF", topic:"Keeping instruments moist before reprocessing", d:3, b:0.55, cj:"act", tags:["instrument soak","soil drying","reprocessing"],
 stem:"Instruments used in a procedure cannot reach the reprocessing area for two hours. What should be done in the meantime?",
 opts:["Keep soil from drying by wiping gross soil at the point of use and keeping instruments moist as the protocol specifies, since dried bioburden is far harder to remove and shields organisms from cleaning and disinfection",
  "Leave the instruments to dry on the trolley, since drying makes cleaning easier",
  "Soak them in disinfectant immediately, since that starts the process earlier",
  "Wait until they reach reprocessing, since nothing can be done before then"],
 ans:0,
 rat:{c:"Dried organic soil adheres, protects organisms from detergent and disinfectant, and may not be fully removed even after cleaning, so preventing drying is the single most effective thing that can be done at the point of use. Protocols specify the method, since not every solution is suitable.",
  s:"Drying makes removal harder rather than easier, which is the whole reason for point-of-use treatment. Disinfectant does not clean, so soaking in it before soil is removed fixes contamination in place, and point-of-use steps are both possible and important."} },

{id:"SIC-128", t:"single", cn:"SIC", sys:"INF", topic:"Phenolic disinfectant limitations", d:3, b:0.55, cj:"evaluate", tags:["phenolic","disinfectant","limitations"],
 stem:"A unit proposes a phenolic disinfectant for cleaning infant cot surfaces and food-contact areas. What does the nurse understand?",
 opts:["Phenolics are unsuitable for food-contact surfaces and are generally avoided in infant areas because of toxicity concerns, so a product appropriate to the surface and the population must be selected",
  "Phenolics are suitable everywhere including food-contact surfaces, since they are broad-spectrum surface disinfectants",
  "Phenolics are the preferred choice for infant areas, since they leave a protective residue",
  "Suitability depends only on the contact time, since all disinfectants are interchangeable on surfaces"],
 ans:0,
 rat:{c:"Disinfectant selection depends on the surface, the organisms of concern, and who will contact the treated area. Phenolics carry toxicity concerns that make them unsuitable for food-contact surfaces and generally inappropriate around infants, so a different agent is required.",
  s:"Broad-spectrum activity does not make an agent appropriate for every surface or population. A residual film is a reason for caution around infants rather than a benefit, and contact time is one factor among several rather than the only consideration."} },

{id:"SIC-129", t:"single", cn:"SIC", sys:"INF", topic:"Peracetic acid automated reprocessing", d:3, b:0.55, cj:"evaluate", tags:["peracetic acid","automated reprocessor","storage"],
 stem:"An instrument is processed in an automated peracetic acid reprocessor. What is correct about the outcome?",
 opts:["The item is ready for immediate use but cannot be stored, since the process provides no sterile barrier, so it must be used promptly or reprocessed by a method that provides one",
  "The item may be wrapped and stored like any sterilized item, since the process is equivalent",
  "The item may be stored for thirty days, since sterility is time-limited rather than event-related",
  "The item must be dried in a warming cabinet first, since moisture invalidates the process"],
 ans:0,
 rat:{c:"Peracetic acid reprocessors deliver high-level disinfection or sterilization in a liquid cycle that ends with the item wet and unwrapped. Without a barrier there is nothing to maintain the state during storage, so the item goes straight into use.",
  s:"The process is not equivalent to a wrapped sterilization cycle because no barrier is produced. Sterility is event-related rather than time-related, and no warming step is involved since the item leaves the cycle ready for immediate use."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-092", t:"single", cn:"BCC", sys:"PSYCH", topic:"Therapeutic touch", d:2, b:0.45, cj:"generate", tags:["therapeutic touch","complementary therapy","consent"],
 stem:"A client asks about therapeutic touch for anxiety before a procedure. What should the nurse explain and do?",
 opts:["Explain that it is a complementary approach used to promote relaxation, obtain the client's consent before any touch, and offer it alongside rather than instead of indicated treatment, respecting a client who prefers not to be touched",
  "Explain that it treats the underlying disease, so the procedure can be postponed",
  "Begin the therapeutic touch without asking, since consent is implied by the request for information",
  "Decline to discuss it, since complementary approaches have no place in clinical care"],
 ans:0,
 rat:{c:"Therapeutic touch is used as a relaxation adjunct. Because it involves touch, explicit consent is required and a client's preference not to be touched must be respected. It supplements indicated treatment rather than replacing it.",
  s:"It is not a treatment for disease and does not justify postponing care. Consent must be explicit rather than inferred from a question, and complementary approaches are legitimately offered when they are safe and the client wants them."} },

{id:"BCC-093", t:"single", cn:"BCC", sys:"MSK", topic:"Paraffin wax bath safety", d:2, b:0.45, cj:"act", tags:["paraffin bath","heat","contraindications"],
 stem:"A client with rheumatoid arthritis is prescribed a paraffin wax bath for hand stiffness. What safety points apply?",
 opts:["Check the wax temperature before immersion, do not use it over broken skin, rash, or an area with reduced sensation, and remove jewellery, since the heat is retained against the skin and can burn tissue that cannot signal discomfort",
  "Immerse the hand regardless of skin condition, since the wax is protective",
  "Use the hottest wax available, since greater heat produces greater benefit",
  "Leave jewellery on, since it has no effect on treatment"],
 ans:0,
 rat:{c:"Paraffin holds heat against the skin, so temperature must be verified and the skin inspected first. Broken skin and reduced sensation both remove the protections that normally prevent a burn, and jewellery conducts heat and obstructs even coverage.",
  s:"Applying retained heat to broken or insensate skin causes injury. The therapeutic range is specific rather than maximal, and jewellery creates hot spots and blocks the wax from contacting the skin evenly."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-097", t:"single", cn:"HPM", sys:"REPI", topic:"Breast awareness and what to report", d:3, b:0.55, cj:"generate", tags:["breast awareness","early detection","screening"],
 stem:"A client asks what breast changes should prompt them to seek assessment. What should the nurse teach?",
 opts:["Report any new lump or thickening, change in size or shape, skin dimpling or redness, nipple retraction or discharge, or a change in the armpit, and attend organized screening as eligible, since awareness and screening serve different purposes",
  "Report only a painful lump, since painless changes are not significant",
  "Attend screening only, since self-awareness has no value and cannot be taught",
  "Report changes only if they persist for a year, since most resolve spontaneously"],
 ans:0,
 rat:{c:"Breast awareness means knowing what is normal for the individual so that change is noticed, and the features that matter include painless ones. It complements rather than replaces organized screening, which detects disease before it is palpable.",
  s:"Pain is a poor discriminator, and many significant findings are painless. Awareness and screening detect disease at different stages, so both have value, and waiting a year delays assessment of findings that require prompt investigation."} },

{id:"HPM-098", t:"single", cn:"HPM", sys:"GI", topic:"Private well water testing", d:3, b:0.55, cj:"generate", tags:["well water","testing","nitrate"],
 stem:"A family with an infant has moved to a property with a private well. What should the nurse advise about the water?",
 opts:["Have the water tested for coliform bacteria and nitrate before the infant uses it and repeat testing on a regular schedule and after any change in taste, odour, or nearby land use, since private wells are not regulated like public supplies",
  "Assume the private well water is safe for the infant, since groundwater is naturally filtered and cannot be contaminated",
  "Test once and never again, since water quality does not change over time",
  "Boil the water for all uses, since boiling removes both bacteria and nitrate"],
 ans:0,
 rat:{c:"Private wells are unregulated, so the owner is responsible for testing. Nitrate matters specifically for infants because it causes methemoglobinemia, and contamination can arise at any time from agricultural runoff, septic systems, or flooding, which is why testing is repeated.",
  s:"Groundwater is not inherently safe and is readily contaminated from the surface. Water quality changes with land use and seasons, so a single test is not sufficient, and boiling kills bacteria but concentrates rather than removes nitrate."} }
  );
})();
