/* Wave 32 — 20 hand-authored hard RN items.
 * Management of Care at 17.8% against an 18% target is the largest remaining
 * gap to its blueprint share, so wave 32 leads with four, matched by
 * Pharmacology at 15.7% against 16% and Physiological Adaptation at 13.4%
 * against 14%. Psychosocial Integrity at 8.7% against 9% takes three. Health
 * Promotion at 68% hard and Basic Care at 71% hard remain the softest on
 * difficulty and take two.
 * Every item is d>=2; 18 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms. Every id prefix matches its cn, as the smoke
 * guard added in 01c816c now enforces.
 *
 * Management of Care  : MOC-172 – MOC-175
 * Pharmacology        : PHA-159 – PHA-162
 * Physiological Adapt : PAA-130 – PAA-133
 * Psychosocial        : PSY-081 – PSY-083
 * Safety              : SIC-130 – SIC-132
 * Basic Care/Comfort  : BCC-094
 * Health Promotion    : HPM-099
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (4) ---------------- */

{id:"MOC-172", t:"single", cn:"MOC", sys:"INF", topic:"Shift work and fatigue risk", d:3, b:0.55, cj:"analyze", tags:["shift work","fatigue","error risk"],
 stem:"A nurse has worked three consecutive night shifts and is asked to stay for a fourth. The nurse is exhausted. What does the evidence on fatigue support?",
 opts:["Declining or raising the concern is appropriate, since fatigue impairs vigilance and reaction time in ways comparable to alcohol intoxication and increases error risk for both the nurse and clients",
  "Accepting, since experienced nurses compensate for fatigue through familiarity with the unit",
  "Accepting but requesting lighter clients, since the workload rather than the nurse is the variable that matters",
  "Accepting and taking caffeine, since stimulants fully reverse the cognitive effects of sleep loss"],
 ans:0,
 rat:{c:"Extended and consecutive shifts measurably degrade attention, working memory, and reaction time, and the deficit accumulates across nights rather than resetting. Familiarity does not offset it, which is why fatigue is managed as an occupational hazard rather than a personal matter.",
  s:"Experience does not compensate for a physiological deficit in vigilance. Reducing workload does not remove the impairment, and caffeine masks sleepiness without restoring the underlying cognitive function."} },

{id:"MOC-173", t:"single", cn:"MOC", sys:"INF", topic:"Skill mix and patient allocation", d:3, b:0.55, cj:"prioritize", tags:["skill mix","patient allocation","assignment"],
 stem:"A charge nurse is allocating clients for the shift. One nurse is newly qualified and another is experienced with critical care. What principle governs the allocation?",
 opts:["Match client acuity and complexity to the demonstrated competence of each nurse, distributing the highest-acuity clients to those competent for them, rather than dividing clients evenly by number",
  "Divide clients equally by number, since an even count is the fairest and most defensible allocation",
  "Give the newly qualified nurse the highest-acuity clients, since exposure builds competence fastest",
  "Allocate by client location only, since grouping by geography minimizes walking time"],
 ans:0,
 rat:{c:"Safe allocation matches the demands of the client to the capability of the nurse, so an even numerical split can produce an unsafe assignment while an uneven one is safe. This is the charge nurse's judgement and it must be documented and revisited as the shift evolves.",
  s:"Equal counts ignore that clients differ enormously in demand. Placing the highest-acuity clients with the least experienced nurse risks the client and does not constitute appropriate supervision, and geography is a convenience factor rather than a safety principle."} },

{id:"MOC-174", t:"single", cn:"MOC", sys:"PSYCH", topic:"Critical incident debriefing", d:3, b:0.55, cj:"generate", tags:["critical incident","debriefing","staff support"],
 stem:"A team has just been involved in a traumatic resuscitation that ended in the client's death. What is the appropriate staff response?",
 opts:["Offer a structured opportunity to process the event and signpost support, while recognizing that mandatory single-session psychological debriefing is not supported and some staff prefer other routes",
  "Require every team member to attend a single-session debriefing, since that prevents long-term psychological harm",
  "Avoid discussing the event, since revisiting it causes harm rather than preventing it",
  "Refer all staff for treatment, since involvement in a traumatic resuscitation indicates a disorder"],
 ans:0,
 rat:{c:"Staff involved in traumatic events need accessible support, but evidence does not support compulsory single-session debriefing, and for some it is unhelpful. Offering choice, normalizing reactions, and signposting ongoing support respects different coping styles.",
  s:"Mandatory single-session debriefing is not supported by the evidence and is not a substitute for accessible ongoing support. Avoiding the topic removes the opportunity to identify those struggling, and involvement is a normal experience rather than a diagnosis."} },

{id:"MOC-175", t:"single", cn:"MOC", sys:"INF", topic:"Ethical climate and speaking up", d:3, b:0.55, cj:"evaluate", tags:["ethical climate","speaking up","psychological safety"],
 stem:"A junior nurse notices a senior colleague breach sterile technique but says nothing, recalling that a previous concern was dismissed. What does this indicate about the unit?",
 opts:["A weak ethical climate, where the response to previous concerns has taught staff that raising them carries risk, so silence is a systemic signal rather than an individual failing",
  "An appropriate response, since junior staff should not challenge senior colleagues",
  "A personal confidence problem belonging to the junior nurse alone",
  "Evidence that the breach was not significant, since nobody else raised the previous concern either"],
 ans:0,
 rat:{c:"Whether staff speak up is determined by what has happened to those who did before. A dismissed concern teaches the whole team that raising one is unsafe, so the silence is information about the unit's culture and leadership rather than about one nurse's courage.",
  s:"Hierarchy does not remove a duty to protect the client, and framing it as appropriate normalizes the breach. Attributing it to one person's confidence ignores the documented history that produced the silence, and others' silence is explained by the same climate rather than by insignificance."} },

/* ---------------- Pharmacology and Parenteral Therapies (4) ---------------- */

{id:"PHA-159", t:"single", cn:"PHA", sys:"PSYCH", topic:"Fluphenazine depot injection", d:3, b:0.55, cj:"act", tags:["fluphenazine","depot injection","administration"],
 stem:"A client is to receive a long-acting fluphenazine decanoate injection. What administration points apply?",
 opts:["Give by deep intramuscular injection using the technique specified for an oil-based depot, never intravenously, and explain that effects persist for weeks so adverse reactions cannot be stopped by withdrawing the drug",
  "Give intravenously for faster onset, since the depot formulation is safe by that route",
  "Give subcutaneously, since absorption is more predictable from fatty tissue",
  "Reassure the client that any adverse effect will stop as soon as the injection is discontinued"],
 ans:0,
 rat:{c:"Depot formulations are oil-based and given deep intramuscularly using the specified technique; intravenous administration is dangerous. Because the drug is released over weeks, an adverse reaction such as extrapyramidal symptoms or neuroleptic malignant syndrome cannot be reversed by stopping the injection.",
  s:"Intravenous administration of an oil-based depot is hazardous and never correct. The subcutaneous route is not specified for this formulation, and the persistence of the drug is exactly why the client must understand before the first dose that it cannot be withdrawn."} },

{id:"PHA-160", t:"single", cn:"PHA", sys:"PSYCH", topic:"Vilazodone administration", d:3, b:0.55, cj:"act", tags:["vilazodone","food requirement","serotonin syndrome"],
 stem:"A client starts vilazodone for depression. What teaching is essential?",
 opts:["Take it with food, since absorption is substantially reduced on an empty stomach, expect several weeks before benefit, and report agitation, fever, sweating, or muscle twitching promptly because serotonergic effects can escalate",
  "Take it on an empty stomach, since food delays absorption and reduces effectiveness",
  "Expect improvement within days, since the partial agonist action produces rapid benefit",
  "Stop it abruptly if side effects occur, since there is no withdrawal risk with this drug"],
 ans:0,
 rat:{c:"Vilazodone must be taken with food because bioavailability falls markedly without it, which can look like treatment failure. As a serotonergic agent it has a delayed onset, and features of serotonin syndrome must be reported rather than tolerated.",
  s:"An empty stomach reduces rather than improves absorption. Antidepressant effect takes weeks regardless of mechanism, and abrupt cessation of serotonergic antidepressants can produce discontinuation symptoms, so tapering is advised."} },

{id:"PHA-161", t:"single", cn:"PHA", sys:"NEURO", topic:"Apomorphine and 5-HT3 antagonist interaction", d:3, b:0.55, cj:"analyze", tags:["apomorphine","ondansetron","hypotension"],
 stem:"A client on apomorphine for advanced Parkinson disease is prescribed ondansetron for nausea. What should the nurse do?",
 opts:["Question the combination before administration, since concurrent use can cause profound hypotension and loss of consciousness and is contraindicated, so an alternative antiemetic is needed",
  "Administer both, since ondansetron is the standard antiemetic for apomorphine-induced nausea",
  "Administer the ondansetron first, since pre-treatment prevents the interaction",
  "Reduce the apomorphine dose, since a lower dose removes the interaction risk"],
 ans:0,
 rat:{c:"The combination is contraindicated because it can produce severe hypotension and syncope. Apomorphine-induced nausea requires an alternative antiemetic, and the nurse's role is to catch the interaction before either drug is given.",
  s:"Ondansetron is specifically the agent to avoid here, not the default choice. Sequencing does not remove a pharmacodynamic interaction, and reducing the apomorphine dose does not eliminate the risk while compromising symptom control."} },

{id:"PHA-162", t:"single", cn:"PHA", sys:"PSYCH", topic:"Droperidol and QT monitoring", d:3, b:0.55, cj:"act", tags:["droperidol","QT prolongation","monitoring"],
 stem:"A client is prescribed droperidol for agitation. What monitoring is required?",
 opts:["Continuous or repeated electrocardiographic monitoring around administration, since the drug carries a boxed warning for QT prolongation and torsades de pointes, with correction of electrolyte abnormalities beforehand",
  "No cardiac monitoring, since the dose used for agitation is too small to affect the heart",
  "Monitoring only if the client reports palpitations, since symptoms precede any arrhythmia",
  "Monitoring for sedation alone, since that is the only significant adverse effect"],
 ans:0,
 rat:{c:"Droperidol prolongs the QT interval and carries a boxed warning for torsades de pointes, which is why electrocardiographic monitoring around the dose and correction of hypokalemia or hypomagnesemia are required rather than optional.",
  s:"Low doses still carry the warning, which is why the monitoring requirement is not dose-dependent. Torsades can occur without warning symptoms, and sedation is not the only or the most serious adverse effect."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-130", t:"single", cn:"PAA", sys:"PSYCH", topic:"Lithium in pregnancy", d:3, b:0.55, cj:"act", tags:["lithium","pregnancy","Ebstein anomaly"],
 stem:"A client with bipolar disorder who is well controlled on lithium reports a positive pregnancy test. What is the nurse's priority action?",
 opts:["Arrange prompt psychiatric and obstetric review, since lithium carries a risk of cardiac malformation and levels change in pregnancy, but abrupt discontinuation risks relapse, so the decision is a specialist one made with the client",
  "Stop the lithium immediately, since any exposure causes fetal cardiac defects",
  "Continue unchanged with no additional monitoring, since lithium is safe throughout pregnancy",
  "Halve the dose, since that removes the teratogenic risk while maintaining mood stability"],
 ans:0,
 rat:{c:"Lithium is associated with an increased risk of cardiac malformation, and pregnancy alters clearance so levels require closer monitoring. Abrupt withdrawal risks relapse, which is itself dangerous in pregnancy, so the risk-benefit decision belongs to the client with specialist input.",
  s:"The risk is increased rather than absolute, so stopping is not automatically correct and abrupt cessation carries its own hazard. Levels do change, so monitoring must increase rather than stay the same, and halving the dose neither removes the risk nor reliably maintains stability."} },

{id:"PAA-131", t:"single", cn:"PAA", sys:"REPI", topic:"Misoprostol contraindication in pregnancy", d:3, b:0.55, cj:"act", tags:["misoprostol","contraindication","pregnancy"],
 stem:"A client who is eight weeks pregnant is prescribed misoprostol for gastric protection while taking a non-steroidal anti-inflammatory drug. What should the nurse do?",
 opts:["Withhold the dose and question the prescription, since misoprostol is contraindicated in pregnancy because it stimulates uterine contraction and can cause miscarriage, and confirm pregnancy status before administration",
  "Administer as prescribed, since gastric protection is important when taking anti-inflammatory drugs",
  "Administer misoprostol at half the dose, since a lower dose avoids uterine stimulation",
  "Administer with food, since food prevents the uterine effect"],
 ans:0,
 rat:{c:"Misoprostol is a prostaglandin analogue that contracts the uterus and is contraindicated in pregnancy. The nurse's role is to catch the error, confirm pregnancy status, and question the prescription so an alternative gastric protection strategy is chosen.",
  s:"Gastric protection does not justify a drug that can end the pregnancy. Reducing the dose does not remove the mechanism, and food does not prevent a pharmacological uterine effect."} },

{id:"PAA-132", t:"single", cn:"PAA", sys:"REPI", topic:"The mid-pregnancy anatomy scan", d:3, b:0.55, cj:"evaluate", tags:["anatomy scan","ultrasound","incidental findings"],
 stem:"A client attends the mid-pregnancy anatomy ultrasound and asks what it is for. What does the nurse explain?",
 opts:["It surveys fetal structure including the heart, brain, spine, limbs, and organs, checks placental position and amniotic fluid, and may find conditions that need planning or further testing, so the possibility of an unexpected finding should be discussed beforehand",
  "It confirms the baby's sex, which is its main clinical purpose",
  "It guarantees a healthy baby, since a normal scan excludes all abnormality",
  "It is only offered when a problem is suspected, since routine scanning has no value"],
 ans:0,
 rat:{c:"The anatomy survey is a structured assessment of fetal structure and the uterine environment. It detects many but not all abnormalities, and counselling beforehand includes the possibility of an uncertain or unexpected finding, which is a recognized part of the test.",
  s:"Sex determination is incidental rather than the purpose. No scan excludes all abnormality, since some conditions are not visible, and it is offered routinely precisely because detection changes management."} },

{id:"PAA-133", t:"single", cn:"PAA", sys:"NEURO", topic:"Developmental surveillance at well child visits", d:3, b:0.55, cj:"evaluate", tags:["developmental surveillance","milestones","referral"],
 stem:"At a well child visit a parent mentions that their 18-month-old says no words and does not point. What should the nurse do?",
 opts:["Treat these as red flags warranting hearing assessment and developmental referral rather than reassurance, since absent pointing and absent words at this age are recognized indicators for further evaluation",
  "Reassure the parent, since some children use no words at this age and boys in particular develop later",
  "Wait until age three, since referral before then is too early to be useful",
  "Advise the parent to read more at home and review at the next routine visit"],
 ans:0,
 rat:{c:"Absent pointing and absent words at 18 months are established red flags. Early identification matters because intervention is most effective when started early, and hearing must be assessed because it is a common and treatable contributor.",
  s:"Normal variation does not account for the absence of both gestures and words. Waiting to age three loses the period when intervention has the greatest effect, and general advice without assessment delays identification of a possible underlying cause."} },

/* ---------------- Psychosocial Integrity (3) ---------------- */

{id:"PSY-081", t:"single", cn:"PSY", sys:"PSYCH", topic:"The therapeutic community meeting", d:3, b:0.55, cj:"act", tags:["therapeutic community","community meeting","peer feedback"],
 stem:"On an inpatient unit a client repeatedly disrupts the community meeting. What is the therapeutic use of the meeting in this situation?",
 opts:["Use the group to address the behaviour, since peers naming its impact and the client being accountable to the community is the mechanism of change, with the nurse supporting the process rather than intervening alone",
  "Remove the client immediately, since disruption ends the therapeutic work for everyone else",
  "Ignore the behaviour, since drawing attention to it reinforces it",
  "Cancel the community meeting, since the group cannot function with a disruptive member"],
 ans:0,
 rat:{c:"In a therapeutic community the group is the intervention. Peer feedback carries weight that staff direction does not, and being accountable to the community is what produces change. Removal is reserved for safety rather than used to avoid the therapeutic moment.",
  s:"Immediate removal forfeits the opportunity the behaviour creates and teaches that disruption escapes response. Ignoring it leaves the group unable to work, and cancelling punishes the whole community for one member's behaviour."} },

{id:"PSY-082", t:"single", cn:"PSY", sys:"PSYCH", topic:"Token economy", d:3, b:0.55, cj:"analyze", tags:["token economy","reinforcement","behaviour change"],
 stem:"A unit uses a token economy in which clients earn tokens for attending groups and exchange them for privileges. What makes it work rather than function as bribery?",
 opts:["The tokens are earned against explicit, consistently applied criteria agreed in advance and exchanged reliably, so the client learns the relationship between behaviour and consequence rather than negotiating a reward in the moment",
  "Tokens are given whenever the client is upset, since that rewards them for expressing distress",
  "The criteria are varied day to day, since unpredictability keeps the client engaged rather than complacent",
  "Tokens are offered during a behaviour to stop it, since immediate reward is most effective"],
 ans:0,
 rat:{c:"A token economy is operant conditioning, and its effect depends on the contingency being explicit, consistent, and honoured. Bribery differs precisely in being improvised to control behaviour in the moment, with no established relationship between the two.",
  s:"Rewarding distress teaches that distress produces reward. Unpredictable criteria prevent the client from learning the contingency, which is the whole mechanism, and offering reward during a behaviour reinforces rather than reduces it."} },

{id:"PSY-083", t:"single", cn:"PSY", sys:"PSYCH", topic:"Setting limits therapeutically", d:3, b:0.55, cj:"act", tags:["limit setting","therapeutic communication","behaviour"],
 stem:"A client is shouting at other clients in the day room. What is the therapeutic way to set a limit?",
 opts:["State the behaviour that must stop and the reason, offer an acceptable alternative, and apply the consequence consistently, addressing the behaviour rather than labelling the person",
  "Warn the client that they are being manipulative, since naming the motive stops the behaviour",
  "Set a different limit each time, since flexibility shows respect for the individual",
  "Remove all privileges without explanation, since consequences must be severe to be effective"],
 ans:0,
 rat:{c:"Effective limit setting is specific about the behaviour, states why it is unacceptable, offers a way to meet the underlying need acceptably, and is applied consistently. Addressing behaviour rather than character preserves the relationship and the client's dignity.",
  s:"Labelling the client as manipulative attacks the person, escalates rather than de-escalates, and is an interpretation rather than an observation. Inconsistent limits teach that the rule is negotiable, and unexplained severity produces resentment rather than learning."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-130", t:"single", cn:"SIC", sys:"ENDO", topic:"Blood glucose meter cleaning between clients", d:3, b:0.55, cj:"act", tags:["blood glucose meter","shared equipment","disinfection"],
 stem:"A blood glucose meter is used for one client and is needed for the next. What is required?",
 opts:["Clean and disinfect the meter between clients with an agent effective against bloodborne pathogens, observing the stated contact time, perform hand hygiene, change gloves, and use a new lancet for each client",
  "Wipe the meter with an alcohol hand rub, since that is sufficient between clients",
  "Use the meter for several clients and disinfect at the end of the shift, since the device is not a critical item",
  "Change the lancet only, since the meter surface does not contact blood"],
 ans:0,
 rat:{c:"The meter becomes contaminated with blood during use, so it requires a disinfectant effective against bloodborne pathogens with the correct contact time between every client, alongside hand hygiene, glove change, and a single-use lancet.",
  s:"Alcohol hand rub is formulated for hands and is not validated for equipment. Deferring disinfection allows bloodborne pathogens to transfer between clients, and the meter surface is handled while the client's finger is bleeding, so it does become contaminated."} },

{id:"SIC-131", t:"single", cn:"SIC", sys:"INF", topic:"Single-dose vials and syringe reuse", d:3, b:0.55, cj:"act", tags:["single-dose vial","syringe reuse","injection safety"],
 stem:"A nurse has drawn a dose from a single-dose vial and some medication remains. A second client needs the same drug. What applies?",
 opts:["Discard the vial and use a new one with a new syringe and needle, since a single-dose vial has no preservative and entering it a second time risks contamination, and syringes and needles are never reused between clients",
  "Use the remaining single-dose vial contents for the second client with a new syringe, since changing the needle and syringe makes it safe",
  "Reuse the syringe with a new needle, since the syringe itself is not contaminated",
  "Store the vial in the refrigerator and use it later, since refrigeration prevents contamination"],
 ans:0,
 rat:{c:"Single-dose vials contain no preservative, so any entry can introduce organisms that then multiply. Syringes and needles are single-use for one client, and reusing a syringe with a new needle still transfers contamination from the syringe barrel and plunger.",
  s:"Changing the needle does not make a previously entered single-dose vial safe. A used syringe is contaminated internally regardless of the needle, and refrigeration slows but does not prevent growth once a vial has been entered."} },

{id:"SIC-132", t:"single", cn:"SIC", sys:"INF", topic:"Sterile storage and event-related sterility", d:3, b:0.55, cj:"evaluate", tags:["sterile storage","event-related sterility","package integrity"],
 stem:"A wrapped, sterilized pack has been stored for several months. There is no expiry date on it. What determines whether it is still sterile?",
 opts:["Whether the package remains intact and uncontaminated, since sterility is event-related rather than time-related, so a torn, damp, dropped, or opened package is non-sterile regardless of how long it has been stored",
  "How long it has been stored, since sterility expires after a fixed period",
  "Whether the chemical indicator changed colour, since that remains valid indefinitely",
  "Whether it looks clean, since visible soiling is the only sign of contamination"],
 ans:0,
 rat:{c:"Under event-related sterility the package remains sterile until an event breaches the barrier. Time alone does not breach it, so storage duration is not the criterion, whereas damage, moisture, or opening is decisive however recently the item was sterilized.",
  s:"A fixed expiry is not how event-related sterility works, which is why no date is applied. A chemical indicator records exposure to the process rather than ongoing integrity, and contamination is frequently invisible, so appearance is not a reliable test."} },

/* ---------------- Basic Care and Comfort (1) ---------------- */

{id:"BCC-094", t:"single", cn:"BCC", sys:"MSK", topic:"Contrast bath therapy", d:3, b:0.55, cj:"act", tags:["contrast bath","heat and cold","contraindications"],
 stem:"A client with a hand injury is prescribed a contrast bath alternating warm and cool water. What safety points apply?",
 opts:["Check both water temperatures before immersion and confirm intact sensation, avoid the treatment over broken skin or in the presence of impaired circulation, and follow the prescribed alternation times rather than extending the warm phase",
  "Use the hottest and coldest water available, since a greater temperature difference produces a greater effect",
  "Proceed even if the client cannot feel the water, since they will notice if it is too hot",
  "Keep the hand in the warm water for as long as is comfortable, since longer is better"],
 ans:0,
 rat:{c:"Contrast bathing relies on controlled temperature alternation, so both temperatures must be verified and sensation confirmed before the client relies on their own feedback. Broken skin and impaired circulation are contraindications, and the prescribed timings produce the intended vascular effect.",
  s:"Extreme temperatures cause injury rather than benefit. Impaired sensation removes the protective feedback the treatment depends on, and extending the warm phase changes the physiological effect the alternation is designed to produce."} },

/* ---------------- Health Promotion and Maintenance (1) ---------------- */

{id:"HPM-099", t:"single", cn:"HPM", sys:"INF", topic:"Egg allergy and vaccination", d:3, b:0.55, cj:"act", tags:["egg allergy","influenza vaccine","yellow fever"],
 stem:"A client with a documented egg allergy asks whether they can receive vaccines before overseas travel. What does the nurse understand?",
 opts:["Most vaccines are safe in egg allergy, including influenza vaccine under current guidance, but egg-based vaccines such as yellow fever require specialist assessment, so the immunization history and allergy details must be reviewed rather than refused outright",
  "All vaccines are contraindicated, since egg protein is present in every vaccine",
  "No vaccine contains egg protein, so allergy history is irrelevant to immunization",
  "Give all vaccines in a pharmacy setting, since that is sufficient for any allergic reaction"],
 ans:0,
 rat:{c:"Egg protein content varies by vaccine. Influenza vaccines are now given without special precaution under current guidance, while egg-propagated vaccines such as yellow fever do require specialist assessment. The answer depends on the specific vaccine rather than on a blanket rule.",
  s:"Egg protein is not present in all vaccines, so a blanket contraindication denies needed protection. Allergy history is directly relevant for particular vaccines, and the setting must match the assessed risk, which for a high-risk vaccine is more than a pharmacy can provide."} }
  );
})();
