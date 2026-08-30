/* Wave 21 — 20 hand-authored hard RN items.
 * Health Promotion at 59% hard and Basic Care at 63% hard remain the two
 * softest areas on difficulty, and Management of Care at 17.4% against 18%
 * and Safety at 12.9% against 13% are still under their blueprint share,
 * so wave 21 is weighted toward those four.
 * Every item is d>=2; 15 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Health Promotion    : HPM-077 – HPM-082
 * Basic Care/Comfort  : BCC-074 – BCC-077
 * Safety              : SIC-100 – SIC-102
 * Management of Care  : MOC-130 – MOC-132
 * Psychosocial        : PSY-065 – PSY-066
 * Reduction of Risk   : RRP-096 – RRP-097
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Health Promotion and Maintenance (6) ---------------- */

{id:"HPM-077", t:"single", cn:"HPM", sys:"INTG", topic:"Dog bite and rabies post-exposure prophylaxis", d:3, b:0.55, cj:"prioritize", tags:["dog bite","rabies","post-exposure prophylaxis"],
 stem:"A child is bitten on the hand by an unfamiliar stray dog that ran off and cannot be located. The wound has been rinsed. What is the priority next step?",
 opts:["Seek immediate medical evaluation for rabies post-exposure prophylaxis, since the animal cannot be observed and the bite is on the hand",
  "Observe the wound for ten days and start prophylaxis only if it becomes infected",
  "Wait to see whether the dog is captured, since prophylaxis is only needed once rabies is confirmed in the animal",
  "Apply a topical antibiotic and dress the wound, since a stray dog that cannot be located is unlikely to carry rabies"],
 ans:0,
 rat:{c:"Rabies is almost universally fatal once symptoms appear, so prophylaxis must be given before that point. A bite from an animal that cannot be observed or tested is treated as potentially rabid, and bites to the hand and face carry higher risk because of rich nerve supply and proximity to the central nervous system.",
  s:"Observation of the wound addresses bacterial infection, not rabies, which has a variable incubation period. Waiting for the animal forfeits the window in which prophylaxis works, and stray animal bites are precisely the situation where rabies risk cannot be excluded."} },

{id:"HPM-078", t:"single", cn:"HPM", sys:"RESP", topic:"Epinephrine autoinjector use and follow-up", d:3, b:0.55, cj:"act", tags:["epinephrine autoinjector","anaphylaxis","emergency response"],
 stem:"A bystander asks how to help a person whose face is swelling and who is wheezing after eating a snack containing a known allergen. What should the nurse teach?",
 opts:["Inject the epinephrine autoinjector into the outer thigh immediately and call emergency services, since epinephrine is the only treatment that reverses anaphylaxis",
  "Give an oral antihistamine first and wait to see whether the swelling settles",
  "Call emergency services and wait for them to arrive, since only clinicians should give epinephrine",
  "Have the person lie flat and drink water, since this flushes the allergen from the system"],
 ans:0,
 rat:{c:"Anaphylaxis is a time-critical emergency and epinephrine is first-line, because it reverses airway swelling, bronchoconstriction, and hypotension. It is given into the outer thigh and can be administered through clothing. Emergency services must be called because a second dose is often needed and symptoms can recur.",
  s:"Antihistamines do not treat airway obstruction or shock and delay the definitive drug. Autoinjectors exist specifically so bystanders can act, and waiting for professionals costs the minutes that determine outcome. Fluids do not remove an allergen already absorbed."} },

{id:"HPM-079", t:"single", cn:"HPM", sys:"RESP", topic:"Choking rescue in an adult and an infant", d:3, b:0.55, cj:"act", tags:["choking","abdominal thrusts","infant rescue"],
 stem:"A nurse is teaching a community class on choking rescue. What distinction should be included?",
 opts:["Abdominal thrusts are used for a conscious choking adult, while an infant receives alternating back blows and chest thrusts because abdominal thrusts can injure abdominal organs",
  "Abdominal thrusts are used at every age, since the technique is identical in adults and infants",
  "Back blows are used for adults and abdominal thrusts for infants, since infants have softer ribs",
  "Finger sweeps are the first intervention for a choking victim at every age, since they remove the object most quickly"],
 ans:0,
 rat:{c:"In a conscious choking adult, abdominal thrusts raise intrathoracic pressure to expel the object. In an infant, alternating back blows and chest thrusts are used instead, because abdominal thrusts risk injury to the relatively unprotected abdominal organs. Blind finger sweeps are avoided at any age.",
  s:"The technique differs by age rather than being identical, and the order described for adults and infants is reversed from correct practice. Finger sweeps can push the object deeper and are performed only when the object is visible."} },

{id:"HPM-080", t:"single", cn:"HPM", sys:"NEURO", topic:"First aid during a tonic-clonic seizure", d:3, b:0.55, cj:"act", tags:["seizure","first aid","safety"],
 stem:"A person collapses in a public place with generalized jerking movements. What is the correct first aid?",
 opts:["Protect the head, clear the area of hazards, loosen tight clothing, time the seizure, and place the person on their side once movement stops",
  "Restrain the limbs firmly to prevent injury during the jerking",
  "Place a padded object between the teeth so the person cannot bite their tongue",
  "Give water as soon as the jerking slows, to prevent dehydration"],
 ans:0,
 rat:{c:"The priorities are protecting the person from injury rather than stopping the movement: cushioning the head, removing hazards, loosening clothing, timing the event, and turning to the side afterward to protect the airway. Restraint is not used and nothing is placed in the mouth.",
  s:"Restraining does not stop a seizure and can cause musculoskeletal injury. Objects in the mouth risk broken teeth and airway obstruction, and fluids given before full awareness risk aspiration."} },

{id:"HPM-081", t:"single", cn:"HPM", sys:"INTG", topic:"Recombinant zoster vaccine", d:3, b:0.55, cj:"analyze", tags:["shingles vaccine","immunization","immunocompromise"],
 stem:"A 55-year-old client who is immunocompromised asks whether the shingles vaccine is safe for them. What is the nurse's accurate response?",
 opts:["Yes, because the recombinant zoster vaccine contains no live virus and is recommended for immunocompromised adults in this age group, given as a two-dose series",
  "No, because all shingles vaccines are live and therefore contraindicated in immunocompromise",
  "No, because vaccination is only recommended from age 65 onward",
  "Yes, but only a single dose of the vaccine is given, since immunocompromised clients mount a faster response"],
 ans:0,
 rat:{c:"The recombinant zoster vaccine is not live, so it can be given to immunocompromised adults who are at higher risk of herpes zoster and its complications. It is recommended from age 50, and also from 19 for those who are immunocompromised, as a two-dose series.",
  s:"The live attenuated zoster vaccine has largely been replaced by the recombinant product, so the blanket statement about live vaccines is outdated. Age 50 rather than 65 is the routine threshold, and two doses are required rather than one."} },

{id:"HPM-082", t:"single", cn:"HPM", sys:"GI", topic:"Duplicate therapy from combination products", d:3, b:0.55, cj:"analyze", tags:["duplicate therapy","over-the-counter","medication safety"],
 stem:"A client taking a prescribed acetaminophen-containing opioid combination also takes an over-the-counter cold remedy and reports taking extra acetaminophen for pain. What is the nurse's priority concern?",
 opts:["Cumulative acetaminophen exposure and hepatotoxicity, so the nurse must total the dose from every product including the combination cold remedy",
  "Sedation from the opioid, since that is the only meaningful risk in this combination",
  "Reduced effectiveness, since taking several acetaminophen products dilutes the analgesic effect of each remedy",
  "Gastric irritation, which is the principal harm from combination cold remedies"],
 ans:0,
 rat:{c:"Acetaminophen is a hidden ingredient in many combination cold, sinus, and analgesic products, so clients can unknowingly exceed the daily maximum and risk hepatotoxicity. Medication reconciliation must add up the dose from every source, including over-the-counter products.",
  s:"Sedation matters but is not the dose-limiting hazard here. Multiple products increase rather than dilute total acetaminophen, and the principal harm in this pattern is liver injury rather than gastric irritation."} },

/* ---------------- Basic Care and Comfort (4) ---------------- */

{id:"BCC-074", t:"single", cn:"BCC", sys:"INTG", topic:"Foot care teaching in diabetes", d:3, b:0.55, cj:"generate", tags:["diabetic foot care","neuropathy","prevention"],
 stem:"A client with type 2 diabetes and reduced foot sensation asks how to care for their feet at home. What should the nurse teach?",
 opts:["Inspect the feet daily including between the toes using a mirror if needed, wash with lukewarm water and dry thoroughly, moisturize the skin but not between the toes, and never walk barefoot",
  "Soak the feet in warm water each evening, since soaking softens calluses and prevents cracking",
  "Apply moisturizer between the toes, since that area dries out fastest and cracks easily",
  "Use an over-the-counter corn remover on any thickened skin, since calluses cause ulcers"],
 ans:0,
 rat:{c:"Reduced sensation means injury can go unnoticed, so daily visual inspection substitutes for feeling. Lukewarm water avoids burns the client cannot detect, thorough drying between the toes prevents maceration and fungal infection, and moisturizer is kept off the toe webs for the same reason. Barefoot walking risks unperceived trauma.",
  s:"Soaking macerates skin and risks burns in an insensate foot. Moisture between the toes promotes fungal growth rather than preventing cracking, and chemical corn removers cause chemical burns in tissue that cannot feel the damage."} },

{id:"BCC-075", t:"single", cn:"BCC", sys:"RESP", topic:"Incentive spirometry technique", d:3, b:0.55, cj:"act", tags:["incentive spirometry","atelectasis","postoperative"],
 stem:"A client is taught to use an incentive spirometer after abdominal surgery. What indicates correct technique?",
 opts:["Seal the lips around the mouthpiece, inhale slowly and deeply to raise the piston, hold the breath briefly, then exhale normally, repeating about ten times each hour while awake",
  "Blow into the mouthpiece as hard as possible to move the piston upward",
  "Take short rapid breaths through the mouthpiece to fill the lungs quickly",
  "Use it twice a day, since more frequent use causes respiratory muscle fatigue"],
 ans:0,
 rat:{c:"The incentive spirometer is an inspiratory device that promotes sustained maximal inspiration, which re-expands collapsed alveoli and prevents atelectasis. A slow deep inhalation with a brief breath hold is the effective pattern, and frequent hourly use while awake is what maintains lung expansion.",
  s:"The device is inhaled through, not blown into, and blowing does not re-expand alveoli. Rapid shallow breaths do not reach the collapsed lung units, and twice-daily use is far too infrequent to prevent postoperative atelectasis."} },

{id:"BCC-076", t:"single", cn:"BCC", sys:"INTG", topic:"Turning schedule and lateral positioning", d:2, b:0.45, cj:"act", tags:["turning","pressure redistribution","positioning"],
 stem:"An immobile client is placed on a two-hour turning schedule. What technique best protects the skin?",
 opts:["Reposition at least every two hours, use a 30-degree lateral tilt rather than a full 90-degree side-lying position, and lift rather than drag the client",
  "Place the client fully on their side at 90 degrees, since this takes all pressure off the sacrum",
  "Extend the interval to four hours at night so the client can sleep uninterrupted",
  "Pull the client up in bed using the draw sheet, since this is the fastest method"],
 ans:0,
 rat:{c:"Regular repositioning relieves sustained pressure, and the 30-degree lateral tilt loads the well-padded trochanteric region instead of the trochanter and ear, which a full 90-degree position compresses. Lifting rather than dragging avoids shear and friction injury.",
  s:"A full side-lying position concentrates pressure on the greater trochanter and is a recognized cause of pressure injury. Pressure injury develops within hours, so a four-hour night interval is unsafe, and dragging produces shear that damages deep tissue."} },

{id:"BCC-077", t:"single", cn:"BCC", sys:"RESP", topic:"Mucosal dryness from oxygen therapy", d:2, b:0.45, cj:"act", tags:["oxygen therapy","humidification","comfort"],
 stem:"A client receiving oxygen at 4 L/min through a nasal cannula reports a dry, sore nose and occasional nosebleed. What should the nurse do?",
 opts:["Ensure the oxygen is humidified, apply a water-soluble lubricant to the nares, and assess the nares for pressure injury from the cannula tubing",
  "Reduce the flow through the cannula to 2 L/min regardless of the prescribed target saturation",
  "Apply petroleum jelly inside the nares, since it seals in moisture effectively",
  "Stop the oxygen until the bleeding settles, since oxygen is the cause of the dryness"],
 ans:0,
 rat:{c:"Dry gas at higher flows desiccates the nasal mucosa, so humidification and a water-soluble lubricant restore comfort. The cannula tubing also causes pressure injury behind the ears and in the nares, which requires assessment and padding.",
  s:"Changing the flow without a clinical basis risks under-oxygenating the client. Petroleum-based products are contraindicated with oxygen because they are flammable and increase fire risk, and stopping oxygen leaves the underlying hypoxemia untreated."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-100", t:"single", cn:"SIC", sys:"NEURO", topic:"Bed height as a fall control", d:3, b:0.55, cj:"act", tags:["fall prevention","bed height","environmental control"],
 stem:"An older adult client at high risk of falling is resting in bed. What is the correct bed position?",
 opts:["Keep the bed in the lowest position with the call bell within reach and the brakes locked, raising it only for care and returning it afterward",
  "Keep the bed at a comfortable working height throughout the shift to reduce nurse back strain",
  "Raise the bed so the client can see the room better and feel less isolated",
  "Leave the bed height as the client last set it, since client preference governs the position"],
 ans:0,
 rat:{c:"The lowest position minimizes the distance and impact of a fall, which is the single most effective bed-related control. Working height is appropriate during care but must be returned to the lowest position afterward, with the call bell reachable so the client does not attempt an unassisted transfer.",
  s:"A raised bed converts a slip into a significant fall with real injury risk. Visibility does not offset that risk, and an unsupervised client preference can leave the bed raised when the nurse is not present."} },

{id:"SIC-101", t:"single", cn:"SIC", sys:"NEURO", topic:"Environmental hazard assessment on admission", d:2, b:0.45, cj:"act", tags:["environmental safety","fall prevention","assessment"],
 stem:"A nurse admits an older adult who uses a walker. What environmental assessment is priority?",
 opts:["Check that the call path is clear of clutter and cords, the walking route is unobstructed, footwear fits and is non-slip, and the lighting is adequate for night transfers",
  "Confirm the television remote is within reach, since boredom increases attempts to get up",
  "Ensure the bed is positioned away from the window, since glare causes disorientation",
  "Verify the room temperature is comfortable, since cold increases muscle stiffness and falls"],
 ans:0,
 rat:{c:"Most inpatient falls happen during a transfer or a walk to the bathroom, so the walking route, call bell reach, footwear, and lighting are the modifiable hazards that matter. Removing clutter and cords and providing non-slip footwear directly reduce those events.",
  s:"Remote placement, window position, and room temperature have little evidence as fall controls compared with the walking path and footwear, and prioritizing them leaves the actual hazards unaddressed."} },

{id:"SIC-102", t:"single", cn:"SIC", sys:"INTG", topic:"Hand hygiene and fingernails", d:3, b:0.55, cj:"act", tags:["hand hygiene","fingernails","transmission"],
 stem:"A nurse has long natural nails with chipped polish and wears a wristwatch and rings. What is the correct practice for direct patient care?",
 opts:["Keep natural nails short and unpolished or with intact polish, and remove rings and the wristwatch, because hands cannot be cleaned effectively otherwise",
  "Keep the natural nails and polish as they are but use alcohol-based rub for longer, since a longer application compensates",
  "Wear gloves over the nails, since gloves make hand hygiene and nail length irrelevant",
  "Remove the rings but keep the wristwatch, since the wrist is not part of hand hygiene"],
 ans:0,
 rat:{c:"Long nails, artificial nails, and chipped polish harbour organisms beneath and within the coating, and jewellery prevents effective cleaning of the surrounding skin. Short nails and bare hands below the elbow are required for reliable hand hygiene.",
  s:"Extending the rub duration does not reach organisms under a nail or beneath chipped polish. Gloves are an additional barrier rather than a substitute for hand hygiene and are themselves contaminated by the same nails, and the wrist is included in hand hygiene."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-130", t:"single", cn:"MOC", sys:"PSYCH", topic:"Supporting anticipatory grief", d:3, b:0.55, cj:"act", tags:["anticipatory grief","family support","end of life"],
 stem:"The family of a client with advanced illness is tearful, arguing about treatment decisions, and repeatedly asking the same questions. What does the nurse recognize?",
 opts:["Anticipatory grief, which commonly presents as distress, conflict, and difficulty absorbing information, and is addressed by presence, repetition, and clear honest communication",
  "Non-adherence to the care plan, since the family is resisting the recommended treatment",
  "Manipulation, since repeated questioning is an attempt to control the staff",
  "A complaint situation, since dissatisfaction with the team is the underlying issue"],
 ans:0,
 rat:{c:"Grief begins before death and often surfaces as emotional volatility, disagreement among family members, and impaired information processing. Recognizing it as grief rather than resistance allows the nurse to respond with presence, patience, repetition, and honest communication.",
  s:"Framing grief as non-adherence, manipulation, or complaint pathologizes a normal response and damages the therapeutic relationship, which is the resource the family needs most at this point."} },

{id:"MOC-131", t:"single", cn:"MOC", sys:"PSYCH", topic:"Cultural and religious practices after death", d:3, b:0.55, cj:"act", tags:["after-death care","cultural competence","dignity"],
 stem:"A client has just died and the family asks that the body not be washed, that a religious object remain in place, and that a specific ritual be performed before the body is moved. What should the nurse do?",
 opts:["Accommodate the requests wherever possible, coordinate with the morgue and any required process, and document the family's wishes so they are honoured",
  "Explain to the family that standard after-death care must be completed first, since the facility has a fixed procedure",
  "Allow the ritual only if it can be finished within thirty minutes, since the bed is needed",
  "Remove the religious object for safekeeping, since objects are not permitted with the body"],
 ans:0,
 rat:{c:"After-death care is shaped by cultural and religious practice, and families have the right to observe their traditions. The nurse's role is to accommodate what is possible, coordinate timing with the morgue and any legal process, and record the wishes so later staff honour them.",
  s:"Institutional routine does not override cultural practice, and standard care can often be adapted or deferred. Time pressure and bed availability are not reasons to curtail a family's ritual, and religious objects are normally left in place or returned to the family."} },

{id:"MOC-132", t:"single", cn:"MOC", sys:"CV", topic:"Donation after circulatory death", d:3, b:0.55, cj:"analyze", tags:["organ donation","circulatory death","consent"],
 stem:"A client with a devastating non-survivable brain injury does not meet brain death criteria, and the family wishes to withdraw support and donate organs. What does the nurse understand?",
 opts:["Donation after circulatory death is possible, proceeding after support is withdrawn and the heart stops, and it requires the same consent process as donation after brain death",
  "Donation is impossible unless brain death criteria are met, so the family's wish cannot be honoured",
  "Donation after circulatory death needs no consent, since withdrawal of support itself is the authorization",
  "The client must be declared brain dead first, after which circulatory death is then awaited"],
 ans:0,
 rat:{c:"Donation after circulatory death applies to clients with non-survivable injury who do not meet brain death criteria. Life support is withdrawn in a controlled setting, death is declared after circulatory arrest, and organs are recovered promptly. Authorization from the legal next of kin or a prior donor registry is required, exactly as in brain death donation.",
  s:"Brain death is not a prerequisite, which is the whole basis of this pathway. Consent is always required, and the sequence is withdrawal followed by circulatory death, not the reverse."} },

/* ---------------- Psychosocial Integrity (2) ---------------- */

{id:"PSY-065", t:"single", cn:"PSY", sys:"PSYCH", topic:"Reactive attachment disorder", d:3, b:0.55, cj:"recognize", tags:["reactive attachment disorder","early neglect","pediatric"],
 stem:"A 4-year-old adopted from institutional care is consistently withdrawn, does not seek comfort when distressed, and does not respond to comfort offered by caregivers. There is no developmental delay. What does the nurse recognize?",
 opts:["Reactive attachment disorder, which follows a pattern of insufficient care and presents as emotionally withdrawn behaviour with absent seeking or accepting of comfort",
  "Autism spectrum disorder, since not responding to comfort is the defining feature",
  "Normal adjustment to adoption, since all newly adopted children are withdrawn for several months",
  "Oppositional defiant disorder, since refusing comfort is a form of defiance"],
 ans:0,
 rat:{c:"Reactive attachment disorder arises from persistent insufficient care and is characterized by minimal social and emotional responsiveness, limited positive affect, and unexplained irritability or distress even in non-threatening situations. The child does not seek or accept comfort when distressed.",
  s:"Autism spectrum disorder involves restricted and repetitive behaviours and social communication differences that are not explained by caregiving history, and a developmental history would usually be present. Persistent absence of comfort seeking is not normal adjustment, and it is a distress response rather than deliberate defiance."} },

{id:"PSY-066", t:"single", cn:"PSY", sys:"PSYCH", topic:"Functional enuresis", d:2, b:0.45, cj:"analyze", tags:["enuresis","pediatric","behavioral"],
 stem:"A 7-year-old who was previously dry wets the bed several nights a week. Medical evaluation including urinalysis and a glucose check is normal, and the family reports recent parental separation. What is the appropriate approach?",
 opts:["Rule out organic causes, then use non-punitive behavioural measures such as limited evening fluids, voiding before bed, an alarm, and reassurance that this is not deliberate",
  "Restrict all fluids after midday and wake the child hourly through the night",
  "Use a reward for dry nights and a consequence for wet ones, since motivation is the issue",
  "Reassure the family that nothing should be done, since the condition always resolves without intervention"],
 ans:0,
 rat:{c:"Secondary enuresis after a period of dryness often follows stress, and once organic causes are excluded, management is behavioural and supportive. Fluid timing, voiding before bed, an enuresis alarm, and reassurance work without shame, which is essential because the child is not doing this deliberately.",
  s:"Severe fluid restriction and hourly waking are punitive and disrupt sleep without treating the cause. Punishment increases shame and anxiety, which worsens enuresis, and while many cases resolve, active behavioural treatment is more effective than waiting."} },

/* ---------------- Reduction of Risk Potential (2) ---------------- */

{id:"RRP-096", t:"single", cn:"RRP", sys:"INF", topic:"CD4 count and opportunistic infection risk", d:3, b:0.55, cj:"evaluate", tags:["CD4 count","HIV","opportunistic infection"],
 stem:"A client with HIV has a CD4 count of 120 cells/mm³ and an undetectable viral load on treatment. What does the nurse interpret?",
 opts:["The client remains at significant risk for opportunistic infections and requires prophylaxis and screening according to the CD4 threshold, despite viral suppression",
  "The client is no longer immunocompromised, since an undetectable viral load restores immune function immediately",
  "The CD4 count is irrelevant once the viral load is undetectable, so prophylaxis can be stopped",
  "The CD4 count indicates treatment failure, since a count below 200 means the regimen is not working"],
 ans:0,
 rat:{c:"CD4 count reflects current immune competence and immune recovery lags behind viral suppression, sometimes by months. A count below 200 defines AIDS and drives prophylaxis against organisms such as Pneumocystis, so it continues to guide care alongside the viral load.",
  s:"Viral suppression reduces transmission and slows decline but does not instantly restore immunity. CD4 count and viral load answer different questions and both guide care, and a low count reflects the immune state before and during treatment rather than proving the regimen has failed."} },

{id:"RRP-097", t:"single", cn:"RRP", sys:"HEME", topic:"Interpreting a karyotype result", d:3, b:0.55, cj:"evaluate", tags:["karyotype","genetic testing","counselling"],
 stem:"A client receives a karyotype report showing 47,XX,+21 and asks what it means. What is the nurse's best response?",
 opts:["There are 47 chromosomes with an extra copy of chromosome 21, which is trisomy 21, and a genetics referral will help explain what this means for the child",
  "The result means the finding is normal, since females have two X chromosomes and 47 is the usual number",
  "The result shows a missing chromosome, since the normal number is 48",
  "The result indicates a mutation in a single gene, so the rest of the chromosomes are unaffected"],
 ans:0,
 rat:{c:"A karyotype shows chromosome number and structure. The normal count is 46, so 47 with an additional chromosome 21 is trisomy 21, the cause of Down syndrome. Interpretation and implications for the family belong in a genetics consultation.",
  s:"The normal human chromosome number is 46 rather than 47 or 48, so this is not a normal result. The finding is a whole extra chromosome rather than a missing one, and a karyotype detects chromosomal rather than single-gene abnormalities."} }
  );
})();
