/* Wave 27 — 20 hand-authored hard RN items.
 * Pharmacology at 15.7% against a 16% target and Management of Care at 17.3%
 * against 18% are the two areas furthest under their blueprint share, so wave
 * 27 leads with nine between them. Reduction of Risk at 11.5% against 12% and
 * Safety at 12.9% against 13% take seven. Health Promotion at 66% hard and
 * Basic Care at 67% hard remain the softest on difficulty and take four.
 * Every item is d>=2; 18 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Pharmacology        : PHA-144 – PHA-148
 * Management of Care  : MOC-150 – MOC-153
 * Reduction of Risk   : RRP-108 – RRP-111
 * Safety              : SIC-116 – SIC-118
 * Basic Care/Comfort  : BCC-084 – BCC-085
 * Health Promotion    : HPM-091 – HPM-092
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (5) ---------------- */

{id:"PHA-144", t:"single", cn:"PHA", sys:"NEURO", topic:"Memantine in Alzheimer disease", d:3, b:0.55, cj:"evaluate", tags:["memantine","Alzheimer disease","expectations"],
 stem:"A family asks whether memantine will reverse their relative's memory loss. What is the nurse's accurate response?",
 opts:["It may slow the rate of decline in moderate to severe disease but does not reverse damage or restore lost function, and the dose is increased gradually to limit side effects",
  "It can reverse established cognitive impairment if treatment is started early enough",
  "It cures the underlying disease process, so other treatments can be stopped",
  "It works immediately, so improvement should be visible within days"],
 ans:0,
 rat:{c:"Memantine is an NMDA receptor antagonist used in moderate to severe Alzheimer disease. It can modestly slow progression and support function for a period, but it does not reverse neuronal loss, and titration is gradual because dizziness, headache, and confusion are dose-related.",
  s:"No approved therapy reverses established impairment, and claiming otherwise sets up false hope and premature discontinuation. It does not cure the disease or replace other treatments, and its effects emerge over weeks rather than days."} },

{id:"PHA-145", t:"single", cn:"PHA", sys:"PSYCH", topic:"Buspirone is not a as-needed agent", d:3, b:0.55, cj:"act", tags:["buspirone","anxiolytic","adherence"],
 stem:"A client prescribed buspirone for generalized anxiety asks for an extra dose before a stressful appointment tomorrow. What should the nurse explain?",
 opts:["Buspirone is taken on a regular schedule and takes weeks to reach effect, so it cannot be used as needed and an extra dose will not help tomorrow",
  "An extra dose is fine, since buspirone works like a benzodiazepine and acts within an hour",
  "Stop the medication, since needing relief before a specific event means it is not working",
  "Take a double dose tonight, since building up levels in advance produces relief tomorrow"],
 ans:0,
 rat:{c:"Buspirone is a partial serotonin agonist with a delayed onset taken on a fixed schedule. It has no acute anxiolytic effect, which is exactly why it cannot be used as needed, and taking extra doses does not produce rapid relief but does increase adverse effects.",
  s:"Buspirone is pharmacologically distinct from benzodiazepines and is not rapid-acting. Needing situational relief does not mean treatment failure, and a double dose produces sedation and dizziness rather than prophylactic benefit."} },

{id:"PHA-146", t:"single", cn:"PHA", sys:"NEURO", topic:"Rasagiline and serotonin syndrome", d:3, b:0.55, cj:"analyze", tags:["rasagiline","MAO-B inhibitor","serotonin syndrome"],
 stem:"A client on rasagiline for Parkinson disease is prescribed a new antidepressant. Which combination should the nurse question first?",
 opts:["A selective serotonin reuptake inhibitor, since combining it with a monoamine oxidase inhibitor risks serotonin syndrome, and safer alternatives exist",
  "A non-steroidal anti-inflammatory drug, since these interact with all Parkinson medications",
  "A proton pump inhibitor, since gastric acid reduction blocks rasagiline absorption",
  "A statin, since the combination causes additive muscle toxicity"],
 ans:0,
 rat:{c:"Rasagiline is a monoamine oxidase B inhibitor, and combining it with serotonergic antidepressants can precipitate serotonin syndrome, with agitation, autonomic instability, hyperthermia, and neuromuscular findings. The nurse questions the combination and an alternative is chosen.",
  s:"The other pairs are not recognized hazards of this drug. The interaction that matters here is serotonergic, and it is serious enough that the combination is generally avoided rather than monitored."} },

{id:"PHA-147", t:"single", cn:"PHA", sys:"INTG", topic:"Promethazine extravasation risk", d:3, b:0.55, cj:"act", tags:["promethazine","extravasation","tissue injury"],
 stem:"A nurse is to give intravenous promethazine. What administration precaution is required?",
 opts:["Verify blood return and give through a free-flowing line, ideally diluted and into a large vein, because extravasation causes severe tissue injury that can progress to necrosis",
  "Give it rapidly by bolus, since slow infusion increases the risk of irritation",
  "Give it intramuscularly in a small child, since that route avoids the vascular risk",
  "Give it subcutaneously if no vein is available, since absorption is reliable"],
 ans:0,
 rat:{c:"Promethazine is a vesicant. Extravasation produces pain, blistering, and tissue necrosis sometimes requiring grafting, so patency must be confirmed, the drug diluted, and a large free-flowing vein used. Slow administration through a running line reduces the risk.",
  s:"Rapid bolus increases local concentration and injury. Intramuscular use in young children carries its own boxed-warning risk of fatal respiratory depression, and subcutaneous administration of a vesicant causes tissue damage rather than reliable absorption."} },

{id:"PHA-148", t:"single", cn:"PHA", sys:"GI", topic:"Scopolamine transdermal patch", d:3, b:0.55, cj:"act", tags:["scopolamine","anticholinergic","patch handling"],
 stem:"A client is prescribed a scopolamine patch for motion sickness. What teaching is essential?",
 opts:["Wash hands before and after handling, apply behind the ear on hairless skin, remove the old patch before applying a new one, avoid touching the eyes, and use caution with a history of angle-closure glaucoma",
  "Apply it to the chest where it is less visible, since site does not matter",
  "Leave the old patch in place for a day to prevent a gap in coverage",
  "Rub the eyes after handling, since the drug relieves eye dryness"],
 ans:0,
 rat:{c:"The patch is applied to hairless skin behind the ear, the previous patch is removed first to avoid double dosing, and hands must be washed because transferring the drug to the eye causes pupil dilation and blurred vision. Anticholinergic effects make angle-closure glaucoma a significant concern.",
  s:"The site matters for absorption and is specified in the product directions. Two patches deliver a double anticholinergic dose, and eye contact causes mydriasis and can precipitate an acute glaucoma crisis rather than relieving dryness."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-150", t:"single", cn:"MOC", sys:"INF", topic:"Look-alike and sound-alike drug names", d:3, b:0.55, cj:"act", tags:["look-alike names","tall man lettering","medication safety"],
 stem:"A unit stocks two products whose names differ by only a few letters and whose packaging is similar. What is the most effective system-level safeguard?",
 opts:["Use tall man lettering to make the differing letters stand out, separate the products physically on the shelf, and require independent double checks before administration",
  "Store the two products side by side, since staff become familiar with both when names differing by a few letters are always seen together",
  "Rely on staff memory, since experienced nurses learn to distinguish similar names",
  "Remove the labels, since confusing packaging is the source of the problem"],
 ans:0,
 rat:{c:"Confusable names are a system hazard rather than an individual failing. Tall man lettering draws attention to the difference, physical separation removes the chance of reaching for the wrong product, and an independent double check adds a second verification at the point of highest risk.",
  s:"Adjacent storage increases selection error rather than building familiarity. Relying on memory fails under time pressure and turnover, and removing labels makes identification impossible rather than easier."} },

{id:"MOC-151", t:"single", cn:"MOC", sys:"INF", topic:"Bedside handoff with client participation", d:3, b:0.55, cj:"act", tags:["handoff","bedside report","communication"],
 stem:"A unit is moving from end-of-corridor shift report to bedside handoff. What is the intended benefit?",
 opts:["The client hears the plan, can correct inaccuracies, and becomes a participant in their own safety, while the incoming nurse sees the client, lines, wounds, and environment directly",
  "It shortens the handoff, since less information needs to be transferred at the bedside",
  "It removes the need for a written handoff tool, since everything is said aloud",
  "It allows sensitive information to be discussed openly without any filtering"],
 ans:0,
 rat:{c:"Bedside handoff makes the client a verifying participant and lets the incoming nurse assess the actual situation rather than a description of it. Errors and omissions are caught when the person with the most knowledge of their own care is present to hear them.",
  s:"Bedside handoff typically takes similar or longer because it includes assessment, and written tools are still needed for completeness. Sensitive information is handled by moving that part of the conversation elsewhere, not by discussing it indiscriminately in front of others."} },

{id:"MOC-152", t:"single", cn:"MOC", sys:"INF", topic:"Electronic prescribing selection errors", d:3, b:0.55, cj:"evaluate", tags:["e-prescribing","alert fatigue","selection error"],
 stem:"A prescriber selects the wrong drug from an electronic drop-down list, and the pharmacist overrides a warning to complete the order. What does this illustrate?",
 opts:["That automation introduces its own error modes, since selection from a list can capture the adjacent item and habitual overriding of alerts removes the safeguard that would have caught it",
  "That electronic prescribing is unsafe and paper orders are preferable",
  "That the pharmacist is solely responsible, since the final check was theirs",
  "That alerts should be removed, since they slow prescribing without benefit"],
 ans:0,
 rat:{c:"Electronic prescribing reduces some errors and creates others, notably wrong-selection from visually similar list entries. Alert fatigue is the second failure here: when warnings fire constantly, clinicians override them reflexively, and the one that matters is dismissed with the rest.",
  s:"Paper prescribing carries well-documented legibility and transcription errors, so it is not safer overall. Responsibility is shared across the system that produced the list and the alerts, and removing alerts entirely discards a safeguard that does prevent harm when it is heeded."} },

{id:"MOC-153", t:"single", cn:"MOC", sys:"INTG", topic:"Family and Medical Leave Act eligibility", d:3, b:0.55, cj:"generate", tags:["FMLA","job protection","discharge planning"],
 stem:"A client recovering from major surgery is worried about losing their job during a prolonged absence. What information should the nurse provide?",
 opts:["Explain that eligible employees of covered employers may take job-protected unpaid leave for a serious health condition, and refer them to human resources or a social worker to confirm eligibility and start the process",
  "Reassure them that job protection is automatic for any medical absence, regardless of employer or tenure",
  "Advise returning to work early, since leave protection does not exist in most employment",
  "Tell them that only paid leave is protected, and unpaid leave forfeits the job"],
 ans:0,
 rat:{c:"Eligibility depends on employer coverage, hours worked, and length of service, so the nurse explains the general entitlement and connects the client with the people who can confirm the specifics. This is discharge planning that addresses a real barrier to recovery.",
  s:"Protection is conditional rather than automatic, and saying otherwise sets the client up for a shock. Leave protection does exist for eligible employees, and it applies to unpaid leave, which is precisely its purpose."} },

/* ---------------- Reduction of Risk Potential (4) ---------------- */

{id:"RRP-108", t:"single", cn:"RRP", sys:"INTG", topic:"Contrast allergy premedication and the shellfish myth", d:3, b:0.55, cj:"analyze", tags:["contrast media","iodine","premedication"],
 stem:"A client scheduled for contrast-enhanced computed tomography reports a severe reaction to shellfish and asks whether the contrast is safe. What does the nurse understand?",
 opts:["Shellfish allergy does not specifically predict contrast reaction, but any prior severe allergy raises general risk, so the history is documented, the radiology team is informed, and premedication or an alternative agent is considered",
  "A severe reaction to shellfish is a specific contraindication to iodinated contrast, so the study must be cancelled",
  "No allergy history is relevant, since contrast reactions are unrelated to other allergies",
  "Reassure the client that contrast contains no iodine, since iodine is only found in seafood"],
 ans:0,
 rat:{c:"The shellfish-contrast link is a persistent myth. The relevant risk is a general predisposition to hypersensitivity, so a severe allergy history is reported and the team decides on premedication, a different agent, or an alternative study. Specific prior contrast reaction is what most increases risk.",
  s:"Shellfish allergy is not a specific contraindication, and cancelling on that basis alone denies a needed study. Allergy history is relevant because atopy raises general risk, and iodinated contrast does contain iodine."} },

{id:"RRP-109", t:"single", cn:"RRP", sys:"CV", topic:"Access-site complications after coronary angiography", d:3, b:0.55, cj:"recognize", tags:["coronary angiography","pseudoaneurysm","access site"],
 stem:"Two days after coronary angiography via the femoral artery, a client reports a new pulsating lump in the groin with increasing pain. What does the nurse recognize?",
 opts:["A possible pseudoaneurysm at the access site, requiring urgent assessment and ultrasound, since it can enlarge or rupture",
  "Expected post-procedure swelling that resolves without intervention",
  "A hematoma that needs only observation, since pulsation is a normal finding",
  "An infection of the puncture site, treated with oral antibiotics and warm compresses"],
 ans:0,
 rat:{c:"A pulsatile mass with pain after femoral access suggests a pseudoaneurysm, where blood tracks outside the artery into a contained sac. It requires prompt ultrasound confirmation because it can expand, compress surrounding structures, or rupture.",
  s:"Ordinary swelling is not pulsatile. A simple hematoma is non-pulsatile and usually stable, so pulsation is the distinguishing and alarming finding. Infection would present with warmth, erythema, and fever rather than a pulsating mass."} },

{id:"RRP-110", t:"single", cn:"RRP", sys:"NEURO", topic:"Post-dural puncture headache", d:3, b:0.55, cj:"evaluate", tags:["lumbar puncture","post-dural puncture headache","positioning"],
 stem:"A client develops a severe headache within 24 hours of a lumbar puncture that worsens markedly on sitting and improves when lying flat. What does the nurse recognize?",
 opts:["A post-dural puncture headache from cerebrospinal fluid leakage, managed with flat positioning, hydration, analgesia, and escalation for an epidural blood patch if it persists",
  "Meningitis, since headache after a dural puncture always indicates infection",
  "A migraine triggered by stress, treated with the client's usual migraine medication",
  "Raised intracranial pressure, requiring elevation of the head of the bed"],
 ans:0,
 rat:{c:"The positional pattern is the hallmark: worse upright, better flat, caused by ongoing leakage through the dural defect and resulting low cerebrospinal fluid pressure. Most resolve with conservative measures, but persistent severe cases are treated with an epidural blood patch.",
  s:"Meningitis would bring fever, neck stiffness, and altered consciousness and is not positional. Migraine is not characteristically positional in this way, and raised intracranial pressure produces a headache that worsens when lying flat, the opposite pattern."} },

{id:"RRP-111", t:"single", cn:"RRP", sys:"CV", topic:"Monitoring after pericardiocentesis", d:3, b:0.55, cj:"prioritize", tags:["pericardiocentesis","tamponade","post-procedure monitoring"],
 stem:"A client has just had a pericardiocentesis for cardiac tamponade. What is the priority during the post-procedure period?",
 opts:["Continuous cardiac and hemodynamic monitoring for reaccumulation of fluid, since tamponade can recur, with attention to blood pressure, pulse, jugular venous pressure, and heart sounds",
  "Discharge planning, since drainage resolves cardiac tamponade and its underlying cause permanently",
  "Hourly ambulation, since early movement prevents pericardial adhesions",
  "Fluid restriction, since intake contributes to pericardial fluid accumulation"],
 ans:0,
 rat:{c:"Draining the fluid relieves tamponade but does not treat its cause, so reaccumulation is a real and immediate risk. Continuous monitoring of the parameters that detect tamponade, including falling pressure, rising jugular venous pressure, and muffled heart sounds, is the priority.",
  s:"Discharge planning is premature while recurrence is possible. Ambulation is not indicated in the immediate post-procedure period, and pericardial fluid accumulation is driven by the underlying disease process rather than by oral intake."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-116", t:"single", cn:"SIC", sys:"GI", topic:"Sporicidal disinfection for Clostridioides difficile", d:3, b:0.55, cj:"act", tags:["Clostridioides difficile","spores","disinfection"],
 stem:"A client with Clostridioides difficile infection is discharged. What cleaning requirement applies?",
 opts:["Use a sporicidal agent for environmental surfaces and wash hands with soap and water, since alcohol does not kill the spores and hand rub will not remove them from the skin",
  "Use alcohol-based hand rub and a standard disinfectant, since these are effective against all organisms",
  "Use soap and water for surfaces and alcohol rub for hands, since the reverse of standard practice is needed",
  "No special cleaning is needed, since the organism dies once the client leaves the room"],
 ans:0,
 rat:{c:"C. difficile forms spores that survive alcohol and persist on surfaces for long periods. A sporicidal agent is required for the environment, and mechanical removal with soap and water is required for hands because the spores are not killed by rub.",
  s:"Alcohol-based rub and standard disinfectants do not cover spores, which is the whole reason this organism has special requirements. The requirement is the opposite of the pairing described, and spores persist in the environment well after the client leaves."} },

{id:"SIC-117", t:"single", cn:"SIC", sys:"INF", topic:"A wet pack is not sterile", d:3, b:0.55, cj:"evaluate", tags:["wet pack","sterility","event-related"],
 stem:"A wrapped instrument pack is removed from the sterilizer and the wrapper is damp. What must the nurse do?",
 opts:["Treat it as non-sterile and reprocess it, since moisture wicks microorganisms through the wrapper and compromises the barrier",
  "Use it immediately while still damp, since the contents reached sterilization temperature",
  "Allow the wrapper to dry and then use it, since drying restores the barrier",
  "Use it only on a low-risk procedure, since the risk is proportionate to the exposure"],
 ans:0,
 rat:{c:"A damp wrapper allows wicking, so microorganisms from the outside can reach the contents. Sterility is event-related, meaning the pack remains sterile only until the barrier is breached, and moisture breaches it. The pack must be reprocessed.",
  s:"Reaching temperature does not preserve sterility once the barrier fails. Drying does not undo wicking that has already occurred, and using a compromised pack on any client is unsafe regardless of perceived procedural risk."} },

{id:"SIC-118", t:"single", cn:"SIC", sys:"INF", topic:"The Bowie-Dick air removal test", d:3, b:0.55, cj:"evaluate", tags:["Bowie-Dick","air removal","prevacuum sterilizer"],
 stem:"A prevacuum steam sterilizer fails its daily Bowie-Dick test. What does this indicate and what must happen?",
 opts:["Air was not adequately removed from the chamber, so the sterilizer must be taken out of service, the fault corrected, and the test repeated until it passes before any load is processed",
  "The sterilizer reached the wrong temperature, so only the temperature setting needs adjusting",
  "The test is a formality, so loads may continue while maintenance is arranged",
  "Only the tested load is affected, so other loads processed the same day remain usable"],
 ans:0,
 rat:{c:"The test verifies air removal, which is what allows steam to contact every surface in a prevacuum cycle. A failure means trapped air could have prevented sterilization throughout the chamber, so the device leaves service until the fault is fixed and the test passes.",
  s:"The test measures air removal rather than temperature, which is verified separately. Continuing to run loads risks distributing non-sterile items, and a chamber fault affects every load processed under those conditions rather than only the test load."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-084", t:"single", cn:"BCC", sys:"RESP", topic:"Teaching pursed-lip breathing", d:3, b:0.55, cj:"act", tags:["pursed-lip breathing","COPD","breathing technique"],
 stem:"A client with chronic obstructive pulmonary disease is learning pursed-lip breathing. What instruction is correct?",
 opts:["Breathe in through the nose, then out slowly through pursed lips with an expiration roughly twice as long as inspiration, since the back pressure keeps small airways open during exhalation",
  "Breathe in and out through pursed lips at equal length, since symmetry is the goal",
  "Breathe in quickly through the mouth, since rapid inhalation maximizes air entry",
  "Hold the breath for ten seconds after each inhalation, since holding improves oxygen uptake"],
 ans:0,
 rat:{c:"Prolonged expiration against the resistance of pursed lips raises pressure inside the airways and prevents the collapse that traps air in obstructive disease. Nasal inhalation warms and filters the air, and the longer exhalation is what produces the benefit.",
  s:"Equal timing does not create the back pressure the technique depends on. Rapid mouth inhalation increases air trapping rather than reducing it, and breath holding is not part of this technique and can worsen hyperinflation."} },

{id:"BCC-085", t:"single", cn:"BCC", sys:"INTG", topic:"Music therapy for procedural pain", d:2, b:0.45, cj:"generate", tags:["music therapy","non-pharmacological pain","comfort"],
 stem:"A client undergoing a painful dressing change asks whether anything besides medication can help. What should the nurse offer?",
 opts:["Offer music the client chooses, timed to the procedure, alongside analgesia, since distraction and a sense of control can reduce perceived pain and anxiety without replacing pain relief",
  "Offer only analgesia and explain that non-drug methods are ineffective",
  "Select the music for the client, since personal choice does not affect the outcome",
  "Use music instead of analgesia, since it avoids medication side effects"],
 ans:0,
 rat:{c:"Music is an adjunct that works through distraction, relaxation, and the control the client gains by choosing. It reduces perceived pain and anxiety when combined with analgesia, and client preference matters because familiarity and meaning drive the effect.",
  s:"Non-drug methods have demonstrable benefit, so dismissing them denies the client a useful option. Choice is central to the effect rather than irrelevant, and music supplements rather than substitutes for indicated analgesia."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-091", t:"single", cn:"HPM", sys:"INTG", topic:"Safe storage and disposal of medicines", d:3, b:0.55, cj:"generate", tags:["medication disposal","safe storage","take-back"],
 stem:"A client has leftover opioid tablets after surgery and asks how to get rid of them. What should the nurse advise?",
 opts:["Use a drug take-back programme or an authorized collection site, keep the medication locked and out of sight until then, and flush only if the specific product is listed for flushing and no take-back option exists",
  "Throw them in the household bin, since that is the simplest and safest option",
  "Flush all of them immediately, since flushing is safe for every medication",
  "Keep them for future pain, since leftover opioids are useful to have at home"],
 ans:0,
 rat:{c:"Take-back is the preferred route because it prevents diversion and environmental contamination. Locked storage reduces access by children and others in the meantime. Only a small number of medicines are listed for flushing when no other option exists, and keeping unused opioids at home creates a diversion and overdose risk.",
  s:"Household bins leave medicines accessible to children, animals, and anyone handling waste. Flushing is limited to specific products rather than being universally appropriate, and retaining unused opioids is a recognized source of misuse and accidental ingestion."} },

{id:"HPM-092", t:"single", cn:"HPM", sys:"INF", topic:"Vaccination in immunocompromised clients", d:3, b:0.55, cj:"analyze", tags:["immunocompromised","live vaccine","household contacts"],
 stem:"A client on immunosuppressive therapy after transplantation asks about vaccinations for themselves and their household. What does the nurse understand?",
 opts:["Live attenuated vaccines are generally contraindicated for the client, while inactivated vaccines are given on a modified schedule, and household members should be up to date to provide indirect protection",
  "All vaccines are contraindicated, since any immune stimulation is dangerous after transplantation",
  "Live vaccines are preferred, since they produce stronger immunity in immunosuppressed people",
  "Household members should avoid vaccination, since shed virus could reach the client",
  ],
 ans:0,
 rat:{c:"Live attenuated vaccines can cause disease when the immune system cannot contain the attenuated organism, so they are avoided. Inactivated vaccines are safe, though response may be reduced and timing adjusted around immunosuppression. Vaccinating household contacts protects the client by reducing the pathogens circulating around them.",
  s:"Inactivated vaccines are recommended rather than contraindicated. Live vaccines are specifically the ones to avoid, since weakened immunity is what makes them hazardous. Household vaccination is protective, and shedding of concern applies only to particular live vaccines rather than to vaccination generally."} }
  );
})();
