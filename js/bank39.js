/* Wave 29 — 20 hand-authored hard RN items.
 * Management of Care at 17.5% against an 18% target, Pharmacology at 15.6%
 * against 16%, and Reduction of Risk at 11.8% against 12% are the three areas
 * furthest under their blueprint share, so wave 29 leads with eleven between
 * them. Psychosocial Integrity at 8.8% against 9% takes four. Health
 * Promotion at 67% hard and Basic Care at 69% hard remain the softest on
 * difficulty and take three.
 * Every item is d>=2; 18 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Pharmacology        : PHA-149 – PHA-152
 * Management of Care  : MOC-159 – MOC-162
 * Psychosocial        : PSY-077 – PSY-080
 * Reduction of Risk   : RRP-116 – RRP-118
 * Safety              : SIC-122 – SIC-123
 * Basic Care/Comfort  : BCC-088 – BCC-089
 * Health Promotion    : HPM-095
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (4) ---------------- */

{id:"PHA-149", t:"single", cn:"PHA", sys:"PSYCH", topic:"Chlorpromazine adverse effects", d:3, b:0.55, cj:"recognize", tags:["chlorpromazine","neuroleptic malignant syndrome","phototoxicity"],
 stem:"A client on chlorpromazine develops a temperature of 39.4°C, rigid muscles, altered consciousness, and a blood pressure that fluctuates widely. What does the nurse recognize?",
 opts:["Possible neuroleptic malignant syndrome, a life-threatening emergency requiring the drug to be withheld, the prescriber notified immediately, and supportive cooling and hydration started",
  "An expected transient reaction in the first weeks of treatment that settles without intervention",
  "An unrelated viral illness, since antipsychotics do not cause fever",
  "Serotonin syndrome, since the presentation is identical and the treatment is the same"],
 ans:0,
 rat:{c:"Hyperthermia with rigidity, altered consciousness, and autonomic instability in a client on an antipsychotic is the classic picture of neuroleptic malignant syndrome. The drug must be stopped, the prescriber told at once, and aggressive supportive care begun, because mortality is significant without treatment.",
  s:"This is not transient or expected and does not settle untreated. Antipsychotics can cause fever through this mechanism, and while serotonin syndrome shares features, it typically presents with hyperreflexia and clonus rather than lead-pipe rigidity, and the causative drugs differ."} },

{id:"PHA-150", t:"single", cn:"PHA", sys:"PSYCH", topic:"Long-acting injectable paliperidone", d:3, b:0.55, cj:"act", tags:["paliperidone","long-acting injection","initiation"],
 stem:"A client with schizophrenia who struggles with daily adherence is starting long-acting injectable paliperidone. What does the nurse understand about initiation?",
 opts:["An oral loading strategy or the specified loading injection schedule is used to reach therapeutic levels, since the injection alone takes time to release, and the client must be told the drug cannot be removed once given",
  "No loading is needed, since the first injection produces immediate therapeutic levels",
  "The injection can be stopped at any time if side effects appear, since levels fall within days",
  "Oral antipsychotic cover is unnecessary at any point, since the injection works from day one"],
 ans:0,
 rat:{c:"Long-acting formulations release drug slowly, so a loading regimen is required to reach therapeutic concentration. Clients must understand before the first dose that once administered the drug cannot be withdrawn, which matters if adverse effects emerge.",
  s:"The first injection does not produce immediate levels, which is exactly why loading exists. Levels persist for weeks after injection, so stopping is not rapid, and oral cover or loading is required during initiation."} },

{id:"PHA-151", t:"single", cn:"PHA", sys:"PSYCH", topic:"Mirtazapine monitoring", d:3, b:0.55, cj:"evaluate", tags:["mirtazapine","weight gain","agranulocytosis"],
 stem:"A client on mirtazapine reports a severe sore throat and fever three weeks into treatment. What is the nurse's priority action?",
 opts:["Arrange an urgent full blood count, since agranulocytosis is a rare but serious effect requiring immediate assessment, and advise the client to report any sign of infection promptly",
  "Reassure the client, since sore throat is a common benign effect of this drug",
  "Suggest lozenges and fluids, since the symptom will resolve on its own",
  "Double the dose, since the drug's anti-inflammatory action will treat the infection"],
 ans:0,
 rat:{c:"Mirtazapine carries a warning for neutropenia and agranulocytosis, so fever and sore throat must prompt an urgent blood count rather than reassurance. Clients are taught at the start of treatment to report any infection sign immediately, because early detection determines outcome.",
  s:"Dismissing a possible agranulocytosis as benign delays a potentially fatal diagnosis. Symptomatic treatment without investigation is unsafe for the same reason, and increasing the dose would worsen rather than treat the problem."} },

{id:"PHA-152", t:"single", cn:"PHA", sys:"PSYCH", topic:"Lisdexamfetamine monitoring", d:3, b:0.55, cj:"generate", tags:["lisdexamfetamine","cardiovascular monitoring","growth"],
 stem:"A 12-year-old starts lisdexamfetamine for attention deficit hyperactivity disorder. What monitoring plan is required?",
 opts:["Track blood pressure, pulse, height, and weight at each review, screen for cardiac history and family history of sudden death, and counsel on the risk of misuse and diversion",
  "Monitor blood glucose only, since metabolic effects are the main concern with stimulants",
  "Check the serum drug level monthly, since stimulant therapy requires therapeutic drug monitoring",
  "No routine monitoring is needed, since stimulants are safe at prescribed doses in children"],
 ans:0,
 rat:{c:"Stimulants raise blood pressure and pulse, can slow growth, and carry misuse and diversion risk, so all are tracked. A cardiac history and family history of sudden death are screened because they alter the risk-benefit balance and may require cardiology input.",
  s:"Metabolic effects are not the principal concern with stimulants. Serum level monitoring is not used for these drugs, and the monitoring requirements exist precisely because stimulants are not risk-free in children."} },

/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-159", t:"single", cn:"MOC", sys:"INF", topic:"The minimum necessary standard", d:3, b:0.55, cj:"act", tags:["minimum necessary","privacy","information sharing"],
 stem:"A nurse from another department asks a colleague to describe a client's full history out of personal curiosity about a neighbour. What applies?",
 opts:["The information must not be shared, since access is limited to what is necessary for the requester's own treatment, payment, or operational role, and curiosity is not a permitted purpose",
  "Sharing is acceptable between colleagues, since curiosity about a neighbour is a legitimate reason within the same organization",
  "Sharing is acceptable if the requester promises not to pass it on, since intent matters more than purpose",
  "Sharing is acceptable because the information is already in the record and therefore not confidential"],
 ans:0,
 rat:{c:"Being in the record does not make information freely available. The minimum necessary standard limits use and disclosure to what the requester needs for a permitted purpose, and personal curiosity is not one, regardless of shared employment.",
  s:"Common employment does not create a right of access. A promise about onward disclosure does not make an impermissible purpose permissible, and information held in a record remains confidential to those without a role-based need."} },

{id:"MOC-160", t:"single", cn:"MOC", sys:"INF", topic:"Release of information authorization", d:3, b:0.55, cj:"act", tags:["release of information","authorization","scope"],
 stem:"An insurer requests a client's entire medical record to process a claim for a knee injury. What should the nurse understand?",
 opts:["Release is limited to what is relevant to the stated purpose, so a valid authorization specifying scope is required and the whole record is not released simply because it was requested",
  "The full record must be released, since an insurer is entitled to everything held",
  "Verbal agreement from the client is sufficient, since written authorization is a formality",
  "Nothing may be released in any circumstance, since records are never shared with insurers"],
 ans:0,
 rat:{c:"A valid authorization must specify what may be disclosed, to whom, and for what purpose. Releasing an entire record in response to a request limited to a knee injury exceeds both the authorization and the minimum necessary standard.",
  s:"An insurer is not entitled to the whole record by virtue of asking. Written authorization with a defined scope is a requirement rather than a formality, and records are routinely released for legitimate purposes when properly authorized."} },

{id:"MOC-161", t:"single", cn:"MOC", sys:"GI", topic:"Artificial nutrition and hydration near the end of life", d:3, b:0.55, cj:"analyze", tags:["artificial nutrition","end of life","burdens and benefits"],
 stem:"A family asks for a feeding tube for a relative in the final days of life who has stopped eating. What does the nurse understand?",
 opts:["Artificial nutrition and hydration are medical interventions whose burdens and benefits must be weighed like any other, and in the dying phase they may increase discomfort without prolonging meaningful life, so the conversation should focus on comfort and what the client would have wanted",
  "Withholding food is equivalent to starvation, so a tube must be placed regardless of the clinical situation",
  "The decision belongs solely to the clinical team, since families have no role in it",
  "A tube should be placed by default, since removing it later is harder than not starting",
  ],
 ans:0,
 rat:{c:"Artificial nutrition and hydration are treatments, not basic care, and are assessed on burden and benefit. In the dying phase, reduced intake is part of the natural process, and artificial feeding can cause oedema, secretions, and restraint needs without improving comfort or survival.",
  s:"Reduced intake near death is not starvation in the ordinary sense, and the framing misrepresents the physiology. Families and the client's known wishes are central to the decision, and starting by default creates its own harm and a harder later conversation."} },

{id:"MOC-162", t:"single", cn:"MOC", sys:"INTG", topic:"Post-mortem care and cultural practice", d:3, b:0.55, cj:"act", tags:["post-mortem care","cultural practice","coroner referral"],
 stem:"A client dies unexpectedly and the family asks to perform a ritual washing of the body before it is moved. What should the nurse do?",
 opts:["Establish whether the death requires coroner or medical examiner referral before any procedure, then accommodate the family's ritual where the law and infection control permit, documenting what was done",
  "Proceed with routine post-mortem care immediately, since the body must be prepared without delay",
  "Refuse the request, since hospital policy does not allow families to handle the body",
  "Allow the ritual without checking anything, since family wishes always take precedence"],
 ans:0,
 rat:{c:"An unexpected death may fall under coroner or medical examiner jurisdiction, and procedures that alter the body can compromise the investigation, so that is established first. Within those limits, cultural and religious practice is accommodated wherever possible and recorded.",
  s:"Routine care before jurisdiction is established can interfere with a required investigation. Blanket refusal disregards both family needs and the duty to accommodate, and proceeding without checking jurisdiction risks compromising a legal process."} },

/* ---------------- Psychosocial Integrity (4) ---------------- */

{id:"PSY-077", t:"single", cn:"PSY", sys:"PSYCH", topic:"Acceptance and commitment therapy", d:3, b:0.55, cj:"analyze", tags:["acceptance and commitment therapy","psychological flexibility","values"],
 stem:"In acceptance and commitment therapy, what is the aim of encouraging a client to accept distressing thoughts rather than fight them?",
 opts:["To reduce the struggle that amplifies suffering, freeing the client to act on their values even while distress is present, since avoidance narrows behaviour and keeps the problem central",
  "To eliminate the distressing thoughts, since acceptance is a technique for thought suppression",
  "To resign the client to their condition, since acceptance means giving up on change",
  "To prove the thoughts are irrational, since acceptance is a form of cognitive dispute"],
 ans:0,
 rat:{c:"The model holds that fighting internal experience increases its dominance and restricts living. Acceptance reduces that struggle so behaviour can be guided by values rather than by the need to avoid discomfort, which is psychological flexibility.",
  s:"Acceptance is the opposite of suppression, which is the struggle it seeks to end. It is not resignation, since valued action continues and often increases, and it does not dispute the content of thoughts but changes the relationship to them."} },

{id:"PSY-078", t:"single", cn:"PSY", sys:"PSYCH", topic:"Contingency management", d:3, b:0.55, cj:"generate", tags:["contingency management","reinforcement","substance use"],
 stem:"A substance use programme gives vouchers exchangeable for goods when urine tests are negative. What is this an example of?",
 opts:["Contingency management, which applies positive reinforcement to objectively verified abstinence and has strong evidence for stimulant use disorders where no medication treatment exists",
  "Aversion therapy, since the client is being conditioned to dislike substance use",
  "Coercion, since offering rewards removes the client's freedom to choose",
  "An unproven approach, since only medication has evidence in substance use treatment"],
 ans:0,
 rat:{c:"Contingency management reinforces a target behaviour using tangible rewards contingent on objective verification. It is among the most effective treatments for stimulant use disorders, where no pharmacotherapy is established, and rewards are structured to increase in value with sustained abstinence.",
  s:"The mechanism is positive reinforcement rather than aversion. Offering rewards is not coercion, since participation is voluntary and alternatives exist, and the approach has a strong evidence base independent of medication."} },

{id:"PSY-079", t:"single", cn:"PSY", sys:"PSYCH", topic:"Harm reduction", d:3, b:0.55, cj:"generate", tags:["harm reduction","engagement","substance use"],
 stem:"A client who injects drugs is not ready to stop. What does a harm reduction approach involve?",
 opts:["Providing sterile equipment, overdose prevention including naloxone, wound and vein care, and connection to services, since reducing immediate risk keeps the client alive and engaged while abstinence remains their decision",
  "Refusing services until the client commits to abstinence, since providing equipment endorses use",
  "Providing naloxone only, since all other measures require abstinence first",
  "Requiring attendance at treatment as a condition of receiving sterile equipment"],
 ans:0,
 rat:{c:"Harm reduction meets the client where they are and reduces the immediate dangers of continuing use. Sterile equipment prevents infection, naloxone prevents death from overdose, and maintaining the relationship preserves the route into treatment when the client is ready.",
  s:"Withholding services until abstinence is achieved excludes the clients at highest risk and increases harm. Measures other than naloxone are core rather than conditional, and requiring treatment as a condition contradicts the voluntary engagement the approach depends on."} },

{id:"PSY-080", t:"single", cn:"PSY", sys:"PSYCH", topic:"Boundary crossing versus boundary violation", d:3, b:0.55, cj:"evaluate", tags:["boundary crossing","self-disclosure","professional relationship"],
 stem:"A nurse working with a client over several months accepts a small handmade gift and shares a personal detail about their own family. Later the same nurse agrees to meet the client socially after discharge. What distinguishes these?",
 opts:["The gift and brief self-disclosure may be boundary crossings that can be therapeutic when considered and documented, whereas a social relationship after discharge is a boundary violation because it uses the professional relationship for the nurse's own benefit",
  "All three are equally acceptable, since the relationship has been long and trusting",
  "All three are equally unacceptable, since any personal element is a violation",
  "The social meeting after discharge is acceptable but the gift is not, since objects create obligation"],
 ans:0,
 rat:{c:"A boundary crossing is a departure from the usual frame that may serve the client if it is considered, proportionate, and documented. A violation exploits the power and intimacy of the professional relationship for the nurse's benefit, and a social relationship is one regardless of how the professional phase ended.",
  s:"Treating them as equivalent ignores that intent, proportionality, and who benefits distinguish them. Blanket prohibition is not the standard either, and the social relationship is the clearer violation rather than the gift."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-116", t:"single", cn:"RRP", sys:"CV", topic:"Electrophysiology study", d:3, b:0.55, cj:"act", tags:["electrophysiology study","induced arrhythmia","post-procedure"],
 stem:"A client is scheduled for an electrophysiology study to investigate recurrent palpitations. What does the nurse anticipate?",
 opts:["That the study deliberately attempts to provoke the arrhythmia under controlled conditions, so continuous monitoring, sedation, and immediate availability of cardioversion and resuscitation are required, with access-site care afterward",
  "That the study records the heart's rhythm passively, so no arrhythmia is expected and no resuscitation equipment is needed",
  "That the client may be discharged immediately, since the procedure is diagnostic only",
  "That anticoagulation must be stopped permanently, since the study treats the arrhythmia"],
 ans:0,
 rat:{c:"Electrophysiology study uses catheters to record and stimulate the heart in order to reproduce the arrhythmia in a controlled setting where it can be terminated. That intent is why resuscitation equipment and trained staff must be present, and vascular access requires post-procedure monitoring.",
  s:"The procedure is deliberately provocative rather than passive, which is the source of its risk and its value. Discharge is not immediate after vascular access, and the study is diagnostic, though ablation may follow in the same session."} },

{id:"RRP-117", t:"single", cn:"RRP", sys:"REN", topic:"Care after percutaneous kidney biopsy", d:3, b:0.55, cj:"act", tags:["kidney biopsy","hematuria","post-procedure care"],
 stem:"A client has just had a percutaneous kidney biopsy. What is the priority nursing care?",
 opts:["Keep the client supine for the specified period, monitor vital signs frequently, and check every urine specimen for visible blood, since bleeding is the principal risk and may be concealed",
  "Encourage ambulation within the hour, since early movement prevents complications",
  "Check the urine once at the end of the shift, since hematuria appears late if at all",
  "Restrict fluids, since intake increases bleeding from the biopsy site"],
 ans:0,
 rat:{c:"The kidney is highly vascular, so hemorrhage is the main risk. Supine positioning compresses the site, frequent vital signs detect concealed bleeding through tachycardia and falling pressure, and every specimen is inspected because visible hematuria is the earliest warning.",
  s:"Early ambulation increases bleeding risk rather than preventing complications. A single end-of-shift check can miss progressive bleeding, and fluid intake does not cause bleeding; adequate hydration is generally encouraged."} },

{id:"RRP-118", t:"single", cn:"RRP", sys:"GI", topic:"Barium swallow precautions", d:3, b:0.55, cj:"generate", tags:["barium","aspiration","post-procedure"],
 stem:"A client with known swallowing difficulty is scheduled for a barium swallow study. What does the nurse anticipate and teach?",
 opts:["That aspiration risk is assessed and the barium may be thickened or an alternative used, and afterward that fluids are increased and a laxative considered, since retained barium causes constipation and impaction",
  "That thin barium is always used, since consistency does not affect aspiration risk",
  "That no post-procedure measures are needed, since barium is fully absorbed",
  "That fluid intake should be restricted, since barium is excreted unchanged"],
 ans:0,
 rat:{c:"Barium is not absorbed, so it must be expelled, and retained barium causes constipation and can impact. Fluid and often a laxative are needed afterward. Where swallowing is impaired, the aspiration risk of the contrast is assessed and its consistency adjusted before the study.",
  s:"Consistency is precisely what determines aspiration risk, so it is adjusted rather than fixed. Barium is not absorbed, which is why post-procedure measures matter, and restricting fluids would worsen retention rather than aid excretion."} },

/* ---------------- Safety and Infection Control (2) ---------------- */

{id:"SIC-122", t:"single", cn:"SIC", sys:"INF", topic:"Ultrasonic cleaning follows manual pre-cleaning", d:3, b:0.55, cj:"act", tags:["ultrasonic cleaning","manual pre-cleaning","soil removal"],
 stem:"An instrument with dried blood in a hinge is placed directly into an ultrasonic cleaner. What is wrong with this?",
 opts:["Visible soil must be removed first, since ultrasound cannot penetrate gross contamination and the cavitation that dislodges debris can aerosolize organisms from the soil",
  "Nothing, since ultrasonic cleaning removes all soil regardless of how much is present",
  "The instrument should be soaked in disinfectant only, since cleaning is unnecessary before disinfection",
  "The cycle should be lengthened, since more time compensates for the missing pre-clean"],
 ans:0,
 rat:{c:"Soil shields organisms from both cleaning and disinfection, so visible contamination is removed manually before ultrasonic cleaning. Ultrasound works on residual debris in crevices, and placing grossly soiled instruments in it risks aerosolizing organisms to the operator.",
  s:"Ultrasonic cleaning is not a substitute for removing gross soil, and no amount of time in the tank compensates for it. Cleaning is the essential first step, since disinfection cannot reliably penetrate organic material."} },

{id:"SIC-123", t:"single", cn:"SIC", sys:"INF", topic:"Limits of hydrogen peroxide gas plasma sterilization", d:3, b:0.55, cj:"evaluate", tags:["gas plasma","material compatibility","limitations"],
 stem:"A team proposes gas plasma sterilization for a linen pack and an instrument with a long narrow lumen. What does the nurse understand?",
 opts:["Both are unsuitable, since cellulose and linen absorb the sterilant and long narrow lumens may not be reached, so a compatible method such as steam is required for these items",
  "Both are suitable, since gas plasma penetrates all materials equally",
  "The linen is suitable but the long narrow lumen is not, since fabric is compatible with the process",
  "Both are suitable if the cycle is extended, since longer exposure overcomes material incompatibility"],
 ans:0,
 rat:{c:"Hydrogen peroxide gas plasma is incompatible with cellulose, cotton, linen, and paper, which absorb the sterilant and prevent the cycle from completing, and it has defined limits on lumen length and diameter. Selecting a method compatible with the item is part of safe reprocessing.",
  s:"The process does not penetrate all materials, which is the reason for the restrictions. Linen is specifically incompatible, and extending a cycle does not overcome absorption or reach, so the item must be processed by another validated method."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-088", t:"single", cn:"BCC", sys:"MSK", topic:"Tai chi for balance in older adults", d:3, b:0.55, cj:"generate", tags:["tai chi","balance","fall prevention"],
 stem:"An older adult with two falls in the past year and no acute injury asks what else they can do to prevent another. What should the nurse recommend?",
 opts:["A structured balance and strength programme such as tai chi, since exercise targeting balance is one of the few interventions with strong evidence for reducing falls, alongside reviewing medication and the home environment",
  "Bed rest and activity restriction, since avoiding movement eliminates the chance of falls",
  "A walking programme alone, since general activity is sufficient without balance work",
  "Hip protectors only, since they prevent the injury rather than the fall"],
 ans:0,
 rat:{c:"Falls are reduced most effectively by exercise that specifically challenges balance and strength, and tai chi is a well-evidenced example. Medication review and environmental modification address the other major contributors, so the recommendation is multimodal.",
  s:"Activity restriction causes deconditioning that increases fall risk. Walking improves fitness but does not train balance unless it is specifically challenged, and hip protectors may reduce fracture but do not prevent the fall itself."} },

{id:"BCC-089", t:"single", cn:"BCC", sys:"PSYCH", topic:"Teaching relaxation training", d:2, b:0.45, cj:"act", tags:["relaxation training","teaching","anxiety"],
 stem:"A client with persistent anxiety asks to learn relaxation techniques. What is the most effective way to teach them?",
 opts:["Demonstrate and practise the technique with the client during a calm period, agree on a cue or routine they can use independently, and review whether it worked, since relaxation skills are learned by rehearsal rather than by explanation",
  "Provide a written description, since reading is sufficient to acquire the skill",
  "Teach it during an acute anxiety attack, since that is when motivation is highest",
  "Recommend a general instruction to use relaxation, since the mechanism is intuitive"],
 ans:0,
 rat:{c:"Relaxation is a learned skill that requires demonstration, guided practice, and repetition in a calm state so the client can recall it under stress. Agreeing a cue supports transfer to real situations, and reviewing the result keeps the technique useful rather than abandoned.",
  s:"A written description cannot convey the physical technique. Teaching during acute anxiety fails because the client cannot concentrate or learn at that level of arousal, and a general instruction gives no method to follow."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-095", t:"single", cn:"HPM", sys:"NEURO", topic:"Bicycle helmet use and replacement", d:3, b:0.55, cj:"generate", tags:["helmet","injury prevention","cycling"],
 stem:"A parent asks how to choose a bicycle helmet for their child and whether the current one is still usable after a fall. What should the nurse advise?",
 opts:["Choose a helmet that fits snugly, sits level, and does not shift, and replace any helmet that has been in a crash, since the foam compresses once and will not absorb a second impact even though it looks undamaged",
  "Keep the helmet after a crash if there is no visible crack, since damage is always obvious",
  "Choose a larger size to allow for growth, since a loose helmet still protects",
  "Replace the helmet every year regardless of use, since materials degrade on that schedule"],
 ans:0,
 rat:{c:"Protection depends on fit, so a helmet must sit level and stay in place. The protective foam is designed to crush once, absorbing energy in a single impact, so a helmet involved in a crash must be replaced even when it appears intact.",
  s:"Damage to the foam is internal and not visible, so appearance is not a reliable guide. A loose helmet shifts away from the impact site and offers little protection, and replacement is driven by crash involvement and fit rather than a fixed annual schedule."} }
  );
})();
