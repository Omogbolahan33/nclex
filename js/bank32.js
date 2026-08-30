/* Wave 22 — 20 hand-authored hard RN items.
 * Pharmacology at 15.3% against a 16% target is the largest remaining
 * blueprint gap, so wave 22 leads with six pharmacology items. Management
 * of Care at 17.4% against 18%, Physiological Adaptation at 13.4% against
 * 14%, and Reduction of Risk at 11.7% against 12% follow, with Health
 * Promotion (62% hard) and Basic Care (65% hard) still the softest on
 * difficulty. Every item is d>=2; 16 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms.
 *
 * Pharmacology        : PHA-125 – PHA-130
 * Physiological Adapt : PAA-101 – PAA-103
 * Management of Care  : MOC-133 – MOC-135
 * Health Promotion    : HPM-083 – HPM-085
 * Basic Care/Comfort  : BCC-078 – BCC-079
 * Safety              : SIC-103 – SIC-104
 * Reduction of Risk   : RRP-098
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Pharmacology and Parenteral Therapies (6) ---------------- */

{id:"PHA-125", t:"single", cn:"PHA", sys:"CV", topic:"Bevacizumab and wound healing", d:3, b:0.55, cj:"prioritize", tags:["bevacizumab","wound healing","bleeding"],
 stem:"A client on bevacizumab is scheduled for an elective operation in three weeks. What is the nurse's priority consideration?",
 opts:["The drug impairs wound healing and increases bleeding risk, so the timing of surgery relative to the last dose must be reviewed with the prescriber before the operation proceeds",
  "No adjustment is needed before the operation, since bevacizumab affects only tumour blood supply and not normal tissue",
  "Increase the dose before surgery, since better tumour control reduces operative bleeding",
  "Stop the drug on the morning of surgery, since a single missed dose removes the risk"],
 ans:0,
 rat:{c:"Bevacizumab inhibits vascular endothelial growth factor, which is required for normal wound repair as well as angiogenesis. It carries boxed warnings for impaired wound healing and for hemorrhage, so surgery must be planned around the dosing interval with an appropriate washout.",
  s:"The drug acts on the same pathway in normal and tumour tissue, so normal healing is affected. Increasing the dose would worsen the hazard, and the drug has a long half-life, so stopping it on the day of surgery removes no risk."} },

{id:"PHA-126", t:"single", cn:"PHA", sys:"INTG", topic:"Retinal screening on hydroxychloroquine", d:3, b:0.55, cj:"generate", tags:["hydroxychloroquine","retinopathy","monitoring"],
 stem:"A client has taken hydroxychloroquine for rheumatoid arthritis for six years and reports no visual symptoms. What should the nurse include in the plan?",
 opts:["Regular ophthalmologic screening, because retinal damage can be asymptomatic until it is advanced and is dose- and duration-related",
  "No screening, since the client has no visual complaints and screening is only for symptomatic clients",
  "Annual blood tests only, since retinal toxicity is detected by a rise in liver enzymes",
  "Stopping the drug immediately, since six years of use means retinal damage has already occurred"],
 ans:0,
 rat:{c:"Hydroxychloroquine can cause irreversible retinopathy that is silent in the early stages, so screening is scheduled on the basis of cumulative dose and duration rather than symptoms. Early detection allows the drug to be stopped before significant vision loss.",
  s:"Waiting for symptoms forfeits the reversible window, and blood tests do not detect retinal change. Six years of use indicates risk rather than established damage, so the response is monitoring rather than abrupt discontinuation of an effective therapy."} },

{id:"PHA-127", t:"single", cn:"PHA", sys:"HEME", topic:"Thiopurine methyltransferase testing before azathioprine", d:3, b:0.55, cj:"analyze", tags:["azathioprine","TPMT","myelosuppression"],
 stem:"A client is about to start azathioprine and the provider orders thiopurine methyltransferase testing. What is the purpose?",
 opts:["To identify clients with reduced enzyme activity who are at high risk of severe myelosuppression, so the dose can be reduced or an alternative chosen",
  "To confirm the diagnosis of the autoimmune condition the drug is intended to treat",
  "To predict whether the client will develop a rash, since skin reactions are the main hazard",
  "To determine how quickly the drug will be absorbed from the gut"],
 ans:0,
 rat:{c:"Thiopurine methyltransferase inactivates azathioprine metabolites. Clients with low or absent enzyme activity accumulate cytotoxic metabolites and can develop profound, potentially fatal bone marrow suppression, so testing guides dose reduction or a different drug.",
  s:"The test measures drug metabolism rather than disease, and the principal hazard is myelosuppression rather than rash. It does not predict absorption, which is not the safety concern that drives testing."} },

{id:"PHA-128", t:"single", cn:"PHA", sys:"NEURO", topic:"Topiramate adverse effects", d:3, b:0.55, cj:"evaluate", tags:["topiramate","cognitive effects","teratogenicity"],
 stem:"A client on topiramate for migraine prevention reports difficulty finding words, slowed thinking, and tingling in the hands. She also asks about contraception. What is the nurse's priority response?",
 opts:["Explain that cognitive slowing and paresthesia are recognized effects, report them for dose review, and discuss effective contraception because the drug carries teratogenic risk",
  "Reassure her, since cognitive slowing indicates the drug is working on the migraine pathway",
  "Stop the drug immediately, since word-finding difficulty indicates an acute neurological emergency",
  "Advise that no contraception is needed, since topiramate does not affect a pregnancy"],
 ans:0,
 rat:{c:"Topiramate commonly causes cognitive slowing, word-finding difficulty, and paresthesia, which are dose related and warrant review rather than dismissal. It also carries teratogenic risk, including oral clefts, and can reduce the effectiveness of hormonal contraception, so contraception counselling is required.",
  s:"Cognitive slowing is an adverse effect rather than evidence of efficacy. Abrupt stopping of a preventive drug is unnecessary for a recognized dose-related effect, and the teratogenic risk plus reduced contraceptive efficacy makes pregnancy planning essential."} },

{id:"PHA-129", t:"single", cn:"PHA", sys:"PSYCH", topic:"Growth and cardiovascular monitoring on methylphenidate", d:3, b:0.55, cj:"evaluate", tags:["methylphenidate","growth monitoring","stimulant"],
 stem:"A 10-year-old has taken methylphenidate for attention deficit hyperactivity disorder for a year. What monitoring is required?",
 opts:["Serial height, weight, blood pressure, and pulse, since stimulants can suppress growth and raise blood pressure and heart rate",
  "Blood glucose only, since stimulants primarily affect carbohydrate metabolism",
  "Liver function tests, since hepatotoxicity is the principal long-term concern",
  "No routine monitoring, since stimulants are safe at therapeutic doses in children"],
 ans:0,
 rat:{c:"Stimulants reduce appetite and can slow growth, so height and weight are plotted serially against the growth curve. They also raise blood pressure and heart rate, so cardiovascular parameters are checked at baseline and during treatment.",
  s:"Carbohydrate metabolism and liver injury are not the principal concerns with stimulants, and growth and cardiovascular effects are well documented, so absence of monitoring is not acceptable practice."} },

{id:"PHA-130", t:"single", cn:"PHA", sys:"PSYCH", topic:"Metabolic monitoring on quetiapine", d:3, b:0.55, cj:"generate", tags:["quetiapine","metabolic syndrome","monitoring"],
 stem:"A client starts quetiapine for bipolar disorder. What monitoring plan should the nurse establish?",
 opts:["Baseline and periodic weight, waist circumference, blood glucose or A1c, and lipid profile, since second-generation antipsychotics cause weight gain and metabolic disturbance",
  "Serum lithium level, since quetiapine raises lithium concentrations",
  "Absolute neutrophil count weekly, since agranulocytosis is the defining risk of this drug",
  "Electrocardiogram only, since cardiac conduction is the sole significant adverse effect"],
 ans:0,
 rat:{c:"Second-generation antipsychotics including quetiapine carry substantial risk of weight gain, dyslipidemia, insulin resistance, and type 2 diabetes, so metabolic parameters are measured at baseline and at intervals throughout treatment.",
  s:"Quetiapine does not require lithium level monitoring. Weekly neutrophil counting is specific to clozapine rather than this drug, and while QT effects are relevant, metabolic risk is the broader monitoring requirement."} },

/* ---------------- Physiological Adaptation (3) ---------------- */

{id:"PAA-101", t:"single", cn:"PAA", sys:"NEURO", topic:"Neonatal abstinence syndrome", d:3, b:0.55, cj:"recognize", tags:["neonatal abstinence","opioid exposure","scoring"],
 stem:"A newborn exposed to opioids in utero is three days old and shows a high-pitched cry, tremors, hypertonia, poor feeding, sneezing, and loose stools. What should the nurse do?",
 opts:["Score the infant with a validated withdrawal assessment at intervals, reduce environmental stimulation, and support frequent small feeds while the team decides on pharmacologic treatment",
  "Reassure the mother that the findings are normal newborn behaviour and will settle within hours",
  "Withhold feeds until the tremors stop, since feeding worsens withdrawal symptoms",
  "Place the infant in a bright, stimulating environment to promote alertness and feeding"],
 ans:0,
 rat:{c:"These findings are characteristic of neonatal abstinence syndrome. Standardized scoring at intervals determines whether pharmacologic treatment is needed, while non-pharmacologic care, meaning a quiet dim environment, swaddling, and frequent small feeds, is first-line and reduces the need for medication.",
  s:"The cluster of findings is pathological rather than normal behaviour. Withholding feeds worsens the calorie deficit in an infant already expending energy on tremors, and stimulation aggravates rather than relieves the symptoms."} },

{id:"PAA-102", t:"single", cn:"PAA", sys:"REPI", topic:"Retained placenta and postpartum hemorrhage", d:3, b:0.55, cj:"prioritize", tags:["retained placenta","postpartum hemorrhage","emergency"],
 stem:"Thirty minutes after delivery the placenta has not been delivered, and the client is bleeding heavily with a boggy uterus. What is the nurse's priority action?",
 opts:["Notify the provider immediately, establish large-bore intravenous access, begin fluid resuscitation and uterotonics, and prepare for manual removal of the placenta",
  "Continue to wait a further thirty minutes, since the placenta commonly delivers up to an hour after birth",
  "Apply firm fundal massage only, since the boggy uterus is the sole cause of the bleeding",
  "Encourage the client to push harder, since maternal effort will expel the retained placenta"],
 ans:0,
 rat:{c:"A retained placenta prevents the uterus from contracting down, so hemorrhage continues until it is removed. Management is simultaneous: call for help, resuscitate with large-bore access and fluids, give uterotonics, and prepare for manual removal, with blood products available.",
  s:"Waiting longer in the presence of heavy bleeding allows hemorrhagic shock to develop. Massage alone cannot control bleeding from retained tissue, and maternal pushing does not expel an adherent placenta."} },

{id:"PAA-103", t:"single", cn:"PAA", sys:"GI", topic:"Hypertrophic pyloric stenosis", d:3, b:0.55, cj:"recognize", tags:["pyloric stenosis","projectile vomiting","infant"],
 stem:"A 5-week-old infant has progressive non-bilious projectile vomiting after feeds, appears hungry immediately afterward, and has lost weight. A small olive-shaped mass is palpable in the epigastrium. What does the nurse recognize?",
 opts:["Hypertrophic pyloric stenosis, which requires correction of fluid and electrolyte imbalance before surgical pyloromyotomy",
  "Gastroesophageal reflux, which is common at this age and explains vomiting after feeds",
  "Overfeeding, since the infant's hunger indicates the volume offered is too small",
  "Intussusception, since vomiting and a palpable abdominal mass define that condition"],
 ans:0,
 rat:{c:"Projectile non-bilious vomiting in a hungry infant between two and eight weeks of age, with weight loss and a palpable olive-shaped epigastric mass, is hypertrophic pyloric stenosis. The metabolic alkalosis and dehydration must be corrected before anaesthesia and pyloromyotomy.",
  s:"Reflux does not cause projectile vomiting with weight loss and a mass. Hunger after vomiting reflects obstruction rather than underfeeding, and intussusception presents later with bilious vomiting, currant-jelly stools, and intermittent severe pain rather than this pattern."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-133", t:"single", cn:"MOC", sys:"PSYCH", topic:"Therapeutic privilege", d:3, b:0.55, cj:"analyze", tags:["therapeutic privilege","disclosure","ethics"],
 stem:"A family asks the team not to tell a client the cancer diagnosis, arguing that the news will destroy her hope. What is the ethically sound approach?",
 opts:["Recognize the family's concern, explore it, and then establish the client's own preference for information, since the client holds the right to decide what she is told",
  "Agree to withhold the diagnosis, since the family knows the client best and acts in her interest",
  "Disclose the diagnosis immediately and fully, regardless of the client's stated preferences",
  "Refer the decision to the hospital lawyer, since disclosure is a legal rather than an ethical question"],
 ans:0,
 rat:{c:"The right to information belongs to the client, including the right to decline it. Therapeutic privilege, meaning withholding information because disclosure would cause serious harm, is a narrow exception and does not extend to a family's preference. The nurse explores the family's fear and then ascertains what the client herself wants to know.",
  s:"Deferring to the family removes the client's autonomy, and blanket immediate disclosure ignores that a client may choose not to receive detail. Legal input may be useful but the underlying question is whose decision it is, which is an ethical one."} },

{id:"MOC-134", t:"single", cn:"MOC", sys:"INTG", topic:"Tissue and organ donation referral", d:3, b:0.55, cj:"act", tags:["organ donation","referral","tissue donation"],
 stem:"A client with a devastating neurological injury is expected to die within hours. What is required regarding organ and tissue donation?",
 opts:["Refer the client to the organ procurement organization before death, since referral of imminent deaths is required and the organization, not the bedside nurse, approaches the family about donation",
  "Ask the family about donation immediately, since the bedside nurse knows them best and timing is critical",
  "Wait until death has been declared, since no organ referral is required before that point",
  "Do nothing unless the client carried a donor card, since registration is the only route to donation"],
 ans:0,
 rat:{c:"Hospitals must refer imminent deaths to the organ procurement organization so suitability can be assessed in time. The trained requester from that organization, often with the clinical team, approaches the family, which separates the donation conversation from the nurse's care relationship and improves the quality of consent.",
  s:"Asking at the bedside before referral bypasses the required process and the trained requester. Referral must precede death because assessment and planning take time, and next-of-kin authorization allows donation even without prior registration."} },

{id:"MOC-135", t:"single", cn:"MOC", sys:"PSYCH", topic:"Undue influence in consent", d:3, b:0.55, cj:"analyze", tags:["undue influence","consent","autonomy"],
 stem:"A client consents to an experimental procedure after her adult son, who is also a clinician, tells her in front of the team that refusing would be selfish and would ruin the family. The client is hesitant but agrees. What should the nurse do?",
 opts:["Raise the concern that the consent may not be voluntary, and ask that the consent discussion be repeated with the client alone before the procedure",
  "Accept the consent for the procedure, since the client verbally agreed in front of witnesses",
  "Accept the consent, since a family member who is a clinician is well placed to advise her",
  "Ask the son to sign as a witness, since his clinical knowledge validates the decision"],
 ans:0,
 rat:{c:"Valid consent must be voluntary as well as informed and competent. Pressure from a dominant family member, especially with an appeal to guilt in front of others, undermines voluntariness. The nurse's role is to surface the concern and seek a private, unhurried discussion.",
  s:"Verbal agreement under pressure is not free choice, and witnesses attest to the signature rather than to voluntariness. Clinical knowledge in a family member does not remove the conflict of interest, and having him witness further entrenches the pressure."} },

/* ---------------- Health Promotion and Maintenance (3) ---------------- */

{id:"HPM-083", t:"single", cn:"HPM", sys:"INF", topic:"Pre-travel health preparation", d:3, b:0.55, cj:"generate", tags:["travel health","malaria prophylaxis","prevention"],
 stem:"A client with no significant medical history plans a month of rural travel in a malaria-endemic region in six weeks. What should the nurse include?",
 opts:["A travel health consultation now, so that malaria prophylaxis, indicated vaccines, and mosquito avoidance measures can be completed before departure",
  "No preparation, since a healthy person needs no travel prophylaxis or vaccines",
  "Advice to buy malaria tablets locally, since local products are more effective against local strains",
  "Insect repellent alone, since vaccines and prophylaxis take too long to be useful"],
 ans:0,
 rat:{c:"Pre-travel preparation must begin weeks in advance because several vaccines require a series or time to take effect, and malaria prophylaxis must start before exposure. A travel clinic tailors vaccines, prophylaxis, and mosquito bite prevention to the itinerary and the traveller's health.",
  s:"Healthy travellers are still at risk and often carry the highest malaria risk because they assume they are not. Locally purchased medication may be counterfeit or inappropriate, and starting too late reduces protection rather than providing none at all."} },

{id:"HPM-084", t:"single", cn:"HPM", sys:"GI", topic:"Home medication storage and disposal", d:3, b:0.55, cj:"generate", tags:["medication safety","storage","disposal"],
 stem:"A client asks how to store and dispose of household medications safely. What should the nurse teach?",
 opts:["Store most medications in a cool dry place away from the bathroom and out of children's reach, refrigerate only those that require it, and return unused medicines to a take-back programme",
  "Keep all medicines in the bathroom cabinet, since it is the most convenient and consistent location",
  "Flush unused medicines down the toilet, since this removes them from the home immediately",
  "Store medicines in a car glove box for portability, since temperature does not affect most drugs"],
 ans:0,
 rat:{c:"Heat and humidity degrade medication, so the bathroom cabinet and a car are unsuitable. Most drugs are stored at room temperature in a dry place, only specifically labelled products are refrigerated, and everything is kept out of reach of children. Take-back programmes are the preferred disposal route because they prevent both misuse and water contamination.",
  s:"The bathroom is the warmest, most humid room in most homes. Flushing is reserved for a short list of high-risk drugs where no take-back option exists, and temperature extremes in a car degrade potency unpredictably."} },

{id:"HPM-085", t:"single", cn:"HPM", sys:"RESP", topic:"Written anaphylaxis action plan", d:3, b:0.55, cj:"generate", tags:["anaphylaxis","action plan","self-management"],
 stem:"A client with a known severe food allergy is being discharged. What should the nurse ensure is in place?",
 opts:["A written action plan, at least two epinephrine autoinjectors with training in their use, and instruction to call emergency services after every use",
  "A single autoinjector, since one dose is always sufficient to treat anaphylaxis",
  "Oral antihistamines as the main treatment, with an autoinjector kept as a backup",
  "Verbal instructions only, since a written plan is unnecessary for a client who understands the allergy"],
 ans:0,
 rat:{c:"Up to a fifth of anaphylaxis episodes need a second dose, and biphasic reactions can occur hours later, so two autoinjectors are prescribed with training in when and how to use them. A written plan supports rapid recognition and action, and emergency services are called after every dose.",
  s:"A single injector may be insufficient, and running out during a reaction is a recognized cause of death. Antihistamines do not reverse airway obstruction or shock and must never be used in place of epinephrine, and verbal instruction is poorly retained under stress."} },

/* ---------------- Basic Care and Comfort (2) ---------------- */

{id:"BCC-078", t:"single", cn:"BCC", sys:"RESP", topic:"Nasal care for a client on high-flow oxygen", d:2, b:0.45, cj:"act", tags:["nasal care","oxygen therapy","comfort"],
 stem:"A client receiving continuous oxygen through a nasal cannula develops crusting and soreness in the nares. What should the nurse include in care?",
 opts:["Assess the nares regularly, use saline to loosen crusts, apply a water-soluble lubricant, and check that the tubing is not pressing on the skin behind the ears",
  "Remove the crusts with a dry cotton swab, since they obstruct oxygen delivery",
  "Apply petroleum jelly generously inside the nares, since it seals the mucosa best",
  "Reduce the oxygen flow until the soreness resolves, regardless of the target saturation"],
 ans:0,
 rat:{c:"Continuous dry gas flow causes crusting and mucosal injury, so regular assessment, saline to loosen crusts, and a water-soluble lubricant maintain comfort and patency. The tubing behind the ears and over the cheeks is a common and easily missed pressure injury site.",
  s:"Dry swabbing traumatizes fragile mucosa and causes bleeding. Petroleum-based products are contraindicated with oxygen because they are flammable, and reducing flow below the prescribed target compromises oxygenation."} },

{id:"BCC-079", t:"single", cn:"BCC", sys:"INTG", topic:"Changing an occupied bed safely", d:2, b:0.45, cj:"act", tags:["linen change","safe handling","skin protection"],
 stem:"A nurse is changing the linens of an occupied bed for a client who cannot move independently. What technique is correct?",
 opts:["Roll the client to one side, secure the soiled linen under them, place clean linen on the exposed half, then roll them onto the clean side and complete the change, keeping the side rails up on the opposite side",
  "Pull the soiled linen straight out from under the client while they lie flat",
  "Leave the bottom sheet in place and add a clean sheet over it, since this is faster",
  "Roll the client fully onto their side with no rail raised, since rails restrict the movement needed"],
 ans:0,
 rat:{c:"The divided-bed method lets the linens be changed without lifting the client, which protects their skin from shear and protects the nurse's back. The client is always protected from falling by the raised rail on the side they are turned away from, and dirty linen is rolled away from the body rather than dragged across it.",
  s:"Pulling linen from under a supine client drags the skin and produces shear injury. Layering clean linen over soiled linen does not clean the bed, and turning a client without a raised rail on the opposite side risks a fall."} },

/* ---------------- Safety and Infection Control (2) ---------------- */

{id:"SIC-103", t:"single", cn:"SIC", sys:"INF", topic:"Reportable disease and public health notification", d:3, b:0.55, cj:"act", tags:["reportable disease","public health","contact tracing"],
 stem:"A client is diagnosed with a notifiable infectious disease, and the client asks the nurse not to tell anyone outside the hospital. What is the nurse's obligation?",
 opts:["Report the case to the public health authority as required by law, and explain to the client that reporting is a legal duty that protects the community",
  "Honour the client's request, since confidentiality overrides any reporting requirement",
  "Report the case only if the client agrees, since consent is required for public health notification",
  "Tell the client's family directly, since they are the ones at greatest risk"],
 ans:0,
 rat:{c:"Notifiable diseases must be reported to public health authorities by law, because surveillance and contact tracing protect people who do not know they have been exposed. The duty to report is a recognized limit on confidentiality, and the nurse explains this to the client rather than negotiating it.",
  s:"Confidentiality is not absolute where there is a defined public health risk. Client consent is not a condition of statutory reporting, and notifying family directly bypasses the structured contact investigation and may breach the client's privacy unnecessarily."} },

{id:"SIC-104", t:"single", cn:"SIC", sys:"INF", topic:"Confirming staff immunity by titre", d:3, b:0.55, cj:"analyze", tags:["occupational health","immunity","titre"],
 stem:"A newly hired nurse has no record of measles, mumps, and rubella vaccination or disease. What is the appropriate occupational health step?",
 opts:["Check a serologic titre to establish immunity, vaccinate or re-vaccinate if it is negative, and exclude from exposure if a susceptible nurse encounters a case",
  "Assume immunity, since most adults born before 2000 have had natural infection",
  "Require a mask for all shifts, since masking substitutes for immunity against these viruses",
  "Exclude the nurse from all clinical work until a full vaccination series is documented"],
 ans:0,
 rat:{c:"Without documentation of vaccination or disease, immunity is established by serologic testing. A negative titre leads to vaccination, and a susceptible healthcare worker exposed to measles, mumps, or rubella is excluded from duty for the incubation period to protect patients.",
  s:"Assumed natural immunity is unreliable and cannot be documented. Measles and rubella are airborne or droplet spread and a mask does not make a susceptible worker safe to work, and exclusion is triggered by exposure rather than applied to all clinical work."} },

/* ---------------- Reduction of Risk Potential (1) ---------------- */

{id:"RRP-098", t:"single", cn:"RRP", sys:"CV", topic:"Serial troponin measurement", d:3, b:0.55, cj:"evaluate", tags:["troponin","serial measurement","acute coronary syndrome"],
 stem:"A client with chest pain has a normal high-sensitivity troponin on arrival. The provider orders a repeat in two hours. What does the nurse understand?",
 opts:["A single early troponin can be normal in acute myocardial infarction because the marker rises over time, so the serial change is what establishes the diagnosis",
  "The repeat is routine and unnecessary, since a normal troponin on arrival excludes infarction",
  "The repeat is to confirm laboratory accuracy, since the first result is usually an error",
  "The repeat will be higher only if the client has another episode of pain in the interval"],
 ans:0,
 rat:{c:"Cardiac troponin rises hours after myocardial injury, so a normal level drawn early does not exclude infarction. Serial measurement, interpreted as a rise or fall, is what distinguishes acute injury from a chronic elevation and drives the diagnosis.",
  s:"A single early value has poor sensitivity and cannot exclude infarction. The repeat is for kinetics rather than quality control, and troponin reflects ongoing myocyte injury whether or not the client reports pain at that moment."} }
  );
})();
