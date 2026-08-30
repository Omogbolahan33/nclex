/* Wave 28 — 20 hand-authored hard RN items.
 * Management of Care at 17.4% against an 18% target is the largest remaining
 * gap to its blueprint share, so wave 28 leads with five. Reduction of Risk
 * at 11.7% against 12% and Physiological Adaptation at 13.5% against 14% take
 * eight between them. Health Promotion at 66% hard and Basic Care at 68% hard
 * remain the softest on difficulty and take four.
 * Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Management of Care  : MOC-154 – MOC-158
 * Reduction of Risk   : RRP-112 – RRP-115
 * Physiological Adapt : PAA-118 – PAA-121
 * Safety              : SIC-119 – SIC-121
 * Basic Care/Comfort  : BCC-086 – BCC-087
 * Health Promotion    : HPM-093 – HPM-094
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (5) ---------------- */

{id:"MOC-154", t:"single", cn:"MOC", sys:"INF", topic:"Competency validation is ongoing", d:3, b:0.55, cj:"evaluate", tags:["competency validation","skills maintenance","scope of practice"],
 stem:"A nurse completed an initial skills sign-off for a new device at orientation four months ago and has used it twice since. A complex case now requires it. What does a competency framework require?",
 opts:["Current demonstrated competence for the specific task, since an initial sign-off and infrequent use do not establish that the nurse can still perform it safely, so supervised practice or revalidation is appropriate",
  "Nothing further, since the initial sign-off remains valid indefinitely once issued",
  "Reading the manufacturer instructions immediately beforehand, since that substitutes for practical competence",
  "Delegating the task, since the nurse has used the device twice and therefore qualifies",
  ],
 ans:0,
 rat:{c:"Competence is task-specific and time-limited in practice. Infrequent use erodes skill, so a framework requires demonstrated current ability rather than a historic signature. Supervised practice or revalidation protects the client and the nurse.",
  s:"A sign-off does not remain valid indefinitely, particularly for a rarely used device. Reading instructions supports but does not replace hands-on competence, and two prior uses do not establish current capability for a complex case."} },

{id:"MOC-155", t:"single", cn:"MOC", sys:"INF", topic:"Reporting good catches and near misses", d:3, b:0.55, cj:"act", tags:["good catch","near miss","reporting culture"],
 stem:"A nurse notices that a bar-code scan did not match and stops before administering the wrong medication. Nothing reached the client. What should happen next?",
 opts:["Report it as a near miss, since the same system weakness will produce an error that does reach a client unless the cause is identified and corrected",
  "Say nothing, since no harm occurred and there is therefore nothing to report",
  "Tell the colleague informally but do not record it, since formal reporting implies blame",
  "Wait to see whether the problem recurs, since a single instance is not worth reporting"],
 ans:0,
 rat:{c:"A good catch is a free warning: it reveals a system weakness at no cost to a client. Reporting it allows the barcode mismatch to be investigated and fixed before it results in an error that reaches someone, which is the entire value of near-miss data.",
  s:"Silence discards the only low-cost signal available. Informal mention leaves no record for the system to act on, and waiting for a recurrence means waiting for a client to be harmed."} },

{id:"MOC-156", t:"single", cn:"MOC", sys:"PSYCH", topic:"When to start advance care planning", d:3, b:0.55, cj:"generate", tags:["advance care planning","timing","revisit"],
 stem:"A client with a progressive neurological condition is currently stable and asks whether it is too early to discuss future care preferences. What is the nurse's response?",
 opts:["Now is an appropriate time, since the client can participate fully while they have capacity, and preferences should be documented and revisited as the condition and the client's views evolve",
  "It is too early, since these conversations belong in the terminal phase only",
  "It is unnecessary, since clinicians will decide the best preferences once the condition advances",
  "It should wait until the client is too unwell to participate, since that is when decisions are actually needed"],
 ans:0,
 rat:{c:"Advance care planning is most valuable while the client can express their own values, because that is the only time their preferences can be captured in their own words. It is a continuing process, revisited as circumstances and wishes change.",
  s:"Waiting for the terminal phase removes the client's ability to participate. Clinicians deciding later produces substituted judgement without the client's input, and deferring until incapacity defeats the entire purpose of planning ahead."} },

{id:"MOC-157", t:"single", cn:"MOC", sys:"INTG", topic:"Implied consent in an emergency", d:3, b:0.55, cj:"prioritize", tags:["implied consent","emergency","no surrogate"],
 stem:"An unconscious client is brought in after a road traffic collision with life-threatening internal bleeding. No identification or surrogate is available. What does the nurse understand about consent?",
 opts:["Treatment proceeds under implied consent, since the law presumes a reasonable person would consent to life-saving intervention when they cannot and no surrogate is reachable, with the effort to locate one continuing in parallel",
  "Treatment must wait until a surrogate is found, since consent cannot be presumed",
  "Only comfort measures may be given, since any intervention without consent is unlawful",
  "Consent is not required for anything, since an unconscious client has no rights to protect"],
 ans:0,
 rat:{c:"Implied consent exists precisely for this situation: a reasonable person is presumed to want life preserved when they cannot speak for themselves and no one can speak for them. Treatment is not delayed while the search for a surrogate continues alongside it.",
  s:"Waiting for a family member while a client bleeds would be indefensible, and the presumption exists to prevent exactly that. Restricting care to comfort measures abandons a salvageable client, and unconscious clients retain rights, which is why the presumption is limited to what is necessary."} },

{id:"MOC-158", t:"single", cn:"MOC", sys:"INF", topic:"Credentialing and privileging versus competence", d:3, b:0.55, cj:"analyze", tags:["credentialing","privileging","scope of practice"],
 stem:"A nurse holds a certification in a procedure but the employing organization has not granted privileges for it. What applies?",
 opts:["The nurse may not perform the procedure at that organization, since an individual credential does not authorize practice there without organizational privileging that confirms the setting can support it safely",
  "The certification is sufficient, since national credentials override local policy",
  "The nurse may perform the procedure under supervision only, since supervision substitutes for the organization's privileging",
  "The nurse may perform it in an emergency, since privileging does not apply to urgent situations"],
 ans:0,
 rat:{c:"Privileging confirms that this individual may perform this procedure in this setting, where equipment, support, and oversight exist. A personal certification does not create that authority, which is why both are required.",
  s:"Organizational privileging is not overridden by an external credential. Supervision is one element of safe practice rather than a substitute for authorization, and urgent situations do not suspend the requirement that the setting can support the procedure safely."} },

/* ---------------- Reduction of Risk Potential (4) ---------------- */

{id:"RRP-112", t:"single", cn:"RRP", sys:"CV", topic:"Dobutamine stress echocardiography", d:3, b:0.55, cj:"act", tags:["dobutamine","stress echocardiography","monitoring"],
 stem:"A client unable to exercise adequately is scheduled for a dobutamine stress echocardiogram. What nursing action is required during the test?",
 opts:["Continuous electrocardiographic and blood pressure monitoring with the ability to stop the infusion immediately, since dobutamine can provoke arrhythmia, ischemia, and marked blood pressure change",
  "Routine observations every fifteen minutes, since dobutamine is well tolerated at all doses",
  "No cardiac monitoring, since the purpose is imaging rather than physiologic stress",
  "Preparation for discharge immediately afterward, since recovery takes only minutes"],
 ans:0,
 rat:{c:"Dobutamine is given to deliberately stress the heart in someone who cannot exercise, so it can produce arrhythmias, ischemic change, and hemodynamic instability. Continuous monitoring with immediate ability to stop the infusion and treat is essential.",
  s:"Fifteen-minute observations would miss an event developing between checks. The drug is a physiologic stressor by design, which is why monitoring is required, and recovery requires observation while the drug is cleared rather than immediate discharge."} },

{id:"RRP-113", t:"single", cn:"RRP", sys:"CV", topic:"Implantable cardioverter-defibrillator checks and magnets", d:3, b:0.55, cj:"act", tags:["ICD","device check","magnet"],
 stem:"A client with an implantable cardioverter-defibrillator is having a procedure during which electrocautery may trigger an inappropriate shock. What should the nurse anticipate?",
 opts:["Device reprogramming or magnet application as directed to suspend detection during cautery, with continuous monitoring and a plan to restore therapy afterward",
  "Proceeding as usual, since cautery cannot be misinterpreted by the device",
  "Removing the device before the procedure, since that is the only way to prevent shocks",
  "Administering sedation only, since sedation prevents inappropriate device discharge"],
 ans:0,
 rat:{c:"Electrocautery produces electrical signals the device can interpret as a tachyarrhythmia, triggering an inappropriate shock. Detection is suspended by reprogramming or, in some systems, by a magnet, while the client remains monitored and therapy is restored promptly afterward.",
  s:"Cautery is a well-recognized source of electromagnetic interference. Device removal is not performed for this reason, and sedation affects the client rather than the device's sensing, so it does not prevent inappropriate discharge."} },

{id:"RRP-114", t:"single", cn:"RRP", sys:"REPI", topic:"Preparation for skin prick allergy testing", d:3, b:0.55, cj:"act", tags:["skin prick test","antihistamines","anaphylaxis readiness"],
 stem:"A client is scheduled for skin prick allergy testing next week. What preparation and safety measures apply?",
 opts:["Withhold antihistamines for the period specified beforehand so reactions are not suppressed, and ensure emergency equipment for anaphylaxis is available during testing",
  "Continue antihistamines as usual, since they do not affect the skin response",
  "No emergency equipment is needed, since skin testing cannot cause systemic reaction",
  "Stop all medications including inhaled corticosteroids, since any medication invalidates the test"],
 ans:0,
 rat:{c:"Antihistamines suppress the wheal and flare response and cause false-negative results, so they must be withheld for the specified period. Although systemic reaction is uncommon, anaphylaxis can occur, so resuscitation equipment and trained staff must be present.",
  s:"Continuing antihistamines makes the test uninterpretable. Systemic reaction is rare but documented, which is why preparation is required, and stopping unrelated medications such as inhaled corticosteroids is unnecessary and potentially harmful."} },

{id:"RRP-115", t:"single", cn:"RRP", sys:"RESP", topic:"Methacholine challenge testing", d:3, b:0.55, cj:"act", tags:["methacholine challenge","bronchial hyperreactivity","contraindications"],
 stem:"A client with recurrent cough and normal spirometry undergoes a methacholine challenge. What does the nurse understand?",
 opts:["The test deliberately provokes bronchoconstriction to demonstrate hyperreactivity, so spirometry is repeated after each dose, a short-acting bronchodilator is immediately available, and recent severe airflow obstruction or cardiovascular events are contraindications",
  "The test repeats baseline spirometry to measure lung volume, so no bronchodilator needs to be present",
  "The test is safe for all clients, since methacholine is given in negligible amounts",
  "A positive result confirms the diagnosis of asthma without further interpretation"],
 ans:0,
 rat:{c:"Methacholine is inhaled in escalating doses to provoke measurable airway narrowing when baseline spirometry is normal. Because bronchoconstriction is the intended effect, a bronchodilator must be at hand, spirometry is repeated after each dose, and significant contraindications are screened in advance.",
  s:"The test provokes obstruction rather than measuring resting volume. It is not universally safe, which is why contraindications exist, and a positive result indicates hyperreactivity that requires clinical interpretation alongside history rather than confirming asthma on its own."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-118", t:"single", cn:"PAA", sys:"HEME", topic:"Kleihauer-Betke test after trauma", d:3, b:0.55, cj:"evaluate", tags:["Kleihauer-Betke","fetomaternal hemorrhage","RhoGAM dosing"],
 stem:"An Rh-negative client at 30 weeks sustains blunt abdominal trauma. A Kleihauer-Betke test is ordered. What is its purpose?",
 opts:["To quantify the volume of fetal blood that has entered the maternal circulation, so the dose of Rho(D) immune globulin can be calculated rather than assumed from a standard dose",
  "To determine fetal blood type, since that cannot be established any other way",
  "To screen for fetal chromosomal abnormality, since trauma increases that risk",
  "To assess placental abruption, since it measures retroplacental clot volume"],
 ans:0,
 rat:{c:"The test detects and quantifies fetal red cells in maternal blood. A standard prophylactic dose covers only a limited volume of fetomaternal hemorrhage, so a larger bleed requires additional doses, which the result determines.",
  s:"Fetal blood type is not established by this test. It does not assess chromosomes, and trauma does not raise chromosomal risk. Abruption is assessed clinically and by ultrasound rather than by measuring fetal cells in maternal blood."} },

{id:"PAA-119", t:"single", cn:"PAA", sys:"INF", topic:"Varicella susceptibility in pregnancy", d:3, b:0.55, cj:"act", tags:["varicella","pregnancy","postpartum vaccination"],
 stem:"An antenatal blood test shows a client is not immune to varicella. What should the nurse plan?",
 opts:["Advise avoiding exposure during pregnancy, arrange post-exposure management promptly if contact occurs, and give the vaccine after delivery since it is a live attenuated vaccine not given in pregnancy",
  "Give the vaccine now, since protection during pregnancy is the priority",
  "Reassure the client that varicella in pregnancy carries no additional risk",
  "Advise termination of pregnancy, since susceptibility alone indicates fetal harm"],
 ans:0,
 rat:{c:"Varicella in pregnancy can cause severe maternal pneumonia and fetal varicella syndrome, so exposure avoidance and prompt post-exposure management matter. The live vaccine is contraindicated in pregnancy and is given postpartum, which also protects future pregnancies.",
  s:"A live attenuated vaccine is not given in pregnancy. Varicella carries significant maternal and fetal risk, which is why susceptibility is screened, and susceptibility alone is not an indication for termination."} },

{id:"PAA-120", t:"single", cn:"PAA", sys:"REPI", topic:"Carrier screening and residual risk", d:3, b:0.55, cj:"analyze", tags:["carrier screening","autosomal recessive","residual risk"],
 stem:"A client tests negative on a cystic fibrosis carrier panel and asks whether her baby is therefore safe. What does the nurse explain?",
 opts:["A negative result substantially lowers but does not eliminate the possibility of being a carrier, since panels test only the commonest variants, and the partner's status also determines the baby's risk",
  "A negative result means she cannot be a carrier, so no further consideration is needed",
  "Carrier status only matters if the mother is affected, so the partner's result is irrelevant",
  "The result guarantees an unaffected baby, since cystic fibrosis requires two carrier parents"],
 ans:0,
 rat:{c:"Panels cover the commonest variants, so a negative result reduces rather than removes risk; this is residual risk. Because inheritance is autosomal recessive, the partner's status is equally relevant, and counselling explains both.",
  s:"No panel covers every possible variant, so a negative result is not absolute. Both parents must carry a variant for an affected child, which is exactly why the partner's status matters, and a negative result reduces rather than guarantees against the outcome."} },

{id:"PAA-121", t:"single", cn:"PAA", sys:"HEME", topic:"Cord blood banking decisions", d:3, b:0.55, cj:"act", tags:["cord blood banking","informed decision","donation"],
 stem:"A client asks about private cord blood banking for her healthy first pregnancy. What is the nurse's role?",
 opts:["Provide balanced information about the low probability of autologous use, the alternative of public donation, and the costs involved, so the client can make an informed decision rather than a marketed one",
  "Recommend private banking, since it provides insurance against future illness",
  "Discourage any banking, since cord blood has no established clinical use",
  "Defer the conversation, since the decision belongs to the obstetric team alone"],
 ans:0,
 rat:{c:"The nurse's role is to support informed choice with accurate information. The chance that a child uses their own stored cord blood is very low, autologous use is not suitable for some genetic conditions, public donation makes the unit available to others, and private banking carries ongoing cost.",
  s:"Recommending private banking overstates its benefit and reflects marketing rather than evidence. Cord blood has established uses, particularly in transplantation, so discouraging all banking is inaccurate, and the decision is the client's, supported by nursing information."} },

/* ---------------- Safety and Infection Control (3) ---------------- */

{id:"SIC-119", t:"single", cn:"SIC", sys:"INF", topic:"Ethylene oxide sterilization and aeration", d:3, b:0.55, cj:"act", tags:["ethylene oxide","aeration","toxic residue"],
 stem:"Items sterilized with ethylene oxide are removed from the chamber. What must happen before they are used?",
 opts:["They must complete the specified aeration period, since residual gas is toxic and can cause tissue injury, and the required time varies with the load and material",
  "They can be used immediately, since the sterilization cycle removes all the gas",
  "They should be aired at room temperature for an unspecified period, since exact timing is not important",
  "They must be rinsed in sterile water, since washing removes the residue faster than aeration"],
 ans:0,
 rat:{c:"Ethylene oxide is a toxic and carcinogenic gas that is absorbed by materials, so defined aeration under controlled conditions is required before use. The time depends on the load and the material, and using items early risks chemical burns and systemic toxicity.",
  s:"The cycle sterilizes but does not remove absorbed gas. Unspecified airing is unreliable because the requirement is defined and material-dependent, and rinsing does not remove gas absorbed within materials."} },

{id:"SIC-120", t:"single", cn:"SIC", sys:"INF", topic:"Peel pouch packaging integrity", d:3, b:0.55, cj:"act", tags:["peel pouch","packaging","sterility barrier"],
 stem:"An instrument is packaged in a peel pouch for sterilization. What packaging principle applies?",
 opts:["Place the item with the paper side facing the paper side of the adjacent pouch, avoid overfilling so the seal is not stressed, and check seal integrity and internal indicator before use",
  "Face plastic to plastic, since that presents the strongest barrier to steam",
  "Fill the pouch completely, since a tight fit prevents movement during sterilization",
  "Ignore the seal condition, since the internal indicator alone confirms sterility"],
 ans:0,
 rat:{c:"Paper-to-paper orientation allows sterilant to penetrate and air to be removed, because steam cannot pass through the plastic film. Overfilling stresses the seal, which can open during or after the cycle, and both seal integrity and the indicator are checked before the item is used.",
  s:"Plastic to plastic blocks penetration and produces a non-sterile item. A tight fit is not the goal; an unstressed seal is, and a compromised seal breaches the barrier regardless of the indicator, which reports exposure rather than integrity."} },

{id:"SIC-121", t:"single", cn:"SIC", sys:"INF", topic:"Immediate-use steam sterilization limits", d:3, b:0.55, cj:"evaluate", tags:["immediate-use steam sterilization","storage","policy"],
 stem:"A surgical set is processed by immediate-use steam sterilization because a needed instrument was missing. What is correct about its subsequent handling?",
 opts:["It must be used immediately and cannot be wrapped and stored, since the process provides no sterile barrier for storage and is intended for urgent single-use situations",
  "It may be stored on the shelf like any other sterilized set, since it underwent the same cycle",
  "It may be stored for up to thirty days, since sterility is time-limited rather than event-related",
  "It may be transported to another department, since the sterilization is equivalent to a wrapped cycle"],
 ans:0,
 rat:{c:"Immediate-use steam sterilization deliberately omits the wrapped barrier because the item goes straight into use. Without a barrier there is nothing to maintain sterility during storage or transport, so it is restricted to urgent situations rather than routine workflow.",
  s:"It did not undergo an equivalent cycle, since the wrapping that provides the storage barrier was omitted. Sterility is event-related rather than time-related, and transporting an unwrapped sterilized item breaches it."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-086", t:"single", cn:"BCC", sys:"RESP", topic:"Teaching diaphragmatic breathing", d:3, b:0.55, cj:"act", tags:["diaphragmatic breathing","breathing technique","teaching"],
 stem:"A client with chronic lung disease is learning diaphragmatic breathing. What instruction is correct?",
 opts:["Place one hand on the abdomen and breathe in slowly so that hand rises while the chest stays relatively still, then exhale through pursed lips, since using the diaphragm improves ventilation and reduces the work of breathing",
  "Breathe in so the chest rises as far as possible, since chest expansion maximizes air entry",
  "Take short rapid shallow breaths, since this moves air more efficiently",
  "Breathe in and out through the mouth at the same rate, since nasal breathing wastes effort"],
 ans:0,
 rat:{c:"The hand on the abdomen rising is the feedback that the diaphragm rather than the accessory muscles is doing the work. This lowers respiratory rate, reduces air trapping, and makes breathing less effortful, with pursed-lip exhalation adding the back pressure that keeps airways open.",
  s:"Chest-dominant breathing is the inefficient pattern the technique is designed to replace. Rapid shallow breaths increase dead-space ventilation and the work of breathing, and nasal inhalation warms, humidifies, and filters air rather than wasting effort."} },

{id:"BCC-087", t:"single", cn:"BCC", sys:"INTG", topic:"Animal-assisted therapy in hospital", d:3, b:0.55, cj:"act", tags:["pet therapy","infection control","consent"],
 stem:"An animal-assisted therapy visit is planned for a client on a medical ward. What safeguards apply?",
 opts:["Confirm the client consents and has no allergy or fear, ensure the animal is screened and handled by a trained handler, keep the animal off the bed and away from wounds and lines, and perform hand hygiene before and after contact",
  "Allow the animal on the bed, since closeness increases the therapeutic benefit",
  "Proceed without checking allergies, since animal allergy is uncommon",
  "Skip hand hygiene, since the animal is certified and therefore clean"],
 ans:0,
 rat:{c:"Animal visits in a clinical setting require client consent, allergy and fear screening, a screened animal with a trained handler, and infection control measures including keeping the animal off the bed and away from invasive sites, with hand hygiene around contact.",
  s:"An animal on the bed contaminates the surface and can contact wounds and lines. Allergy and fear are common enough that checking is mandatory, and certification covers health screening rather than eliminating the need for hand hygiene."} },

/* ---------------- Health Promotion and Maintenance (2) ---------------- */

{id:"HPM-093", t:"single", cn:"HPM", sys:"INTG", topic:"Drowning prevention", d:3, b:0.55, cj:"generate", tags:["drowning","supervision","layers of protection"],
 stem:"A parent of a two-year-old asks how to keep their child safe around the family pool. What advice is most effective?",
 opts:["Use layered protection: a four-sided isolation fence with a self-closing self-latching gate, constant touch-distance adult supervision that is not delegated to another child, swimming lessons appropriate to age, and emergency preparedness including rescue equipment and cardiopulmonary resuscitation training",
  "Rely on swimming lessons alone, since a child who can swim cannot drown",
  "Use a pool alarm as the main protection, since it alerts adults to any entry",
  "Supervision from inside the house is sufficient, since the child can be watched through the window"],
 ans:0,
 rat:{c:"Drowning is quick and silent, so no single measure is adequate. A four-sided fence separating the pool from the house, constant touch-distance supervision, age-appropriate water familiarization, and preparedness to respond work together, since each layer covers the failure of another.",
  s:"Swimming ability does not prevent drowning in toddlers, who drown in seconds and in shallow water. Alarms are an additional layer rather than a substitute for barriers and supervision, and supervision through a window is not touch-distance and fails in the time it takes to drown."} },

{id:"HPM-094", t:"single", cn:"HPM", sys:"ENDO", topic:"Diabetes screening and prediabetes", d:3, b:0.55, cj:"evaluate", tags:["diabetes screening","prediabetes","risk factors"],
 stem:"A 48-year-old with a body mass index of 31, a first-degree relative with type 2 diabetes, and a history of gestational diabetes attends for a routine check. What does the nurse anticipate?",
 opts:["Diabetes screening, since multiple risk factors are present, with the result interpreted against diagnostic thresholds and prediabetes addressed through lifestyle intervention and follow-up rather than reassurance alone",
  "No screening, since symptoms must be present before testing is indicated",
  "Screening only if the client reports thirst or weight loss, since those confirm the need",
  "Immediate insulin, since the risk profile indicates established diabetes"],
 ans:0,
 rat:{c:"Risk-based screening is indicated by age, adiposity, family history, and prior gestational diabetes. Detecting prediabetes matters because it is modifiable, and lifestyle intervention demonstrably reduces progression to type 2 diabetes, so the result leads to action rather than reassurance.",
  s:"Type 2 diabetes is commonly asymptomatic, which is precisely why screening exists. Waiting for classic symptoms delays diagnosis until complications may be present, and a risk profile is not a diagnosis, so treatment follows confirmed results."} }
  );
})();
