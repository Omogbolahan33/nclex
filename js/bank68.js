"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 58) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 57: PSY (8.9% vs 9),
 * RRP (11.8% vs 12) and PAA (13.9% vs 14). Every item is
 * difficulty 2 or 3, and the clinical detail is written to be
 * defensible.
 *
 * PSY 7: substitute prescribing and methadone, opiate withdrawal,
 * cocaine and amphetamine, novel psychoactive substances, alcohol
 * units and controlled drinking, carer support, and county lines
 * and exploitation.
 * RRP 6: trafficking and modern slavery, cuckooing, weapon and
 * knife injury, youth violence, public health approach to violence,
 * and criminal justice involvement.
 * PAA 5: housing and homelessness, probation and licence conditions,
 * criminal justice and health, prison health, and multi-agency
 * working.
 * PHA 2: alcohol units, and controlled drinking.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- PSY 7 */
{id:"PSY-129", t:"single", cn:"PSY", sys:"PSYCH", topic:"Substitute prescribing and methadone", d:3, b:0.55, cj:"act", tags:["psychosocial","substitute prescribing","methadone","opiate","treatment"],
 stem:"A client with opiate dependence asks about substitute prescribing. Which action by the nurse is most appropriate?",
 opts:["Explain that methadone or buprenorphine may be offered as part of a treatment plan, requiring specialist assessment","Advise against substitute prescribing, since this maintains dependence","Advise that abstinence is the only acceptable treatment","Withhold information, since this requires specialist discussion"],
 ans:0, rat:{c:"Substitute prescribing with methadone or buprenorphine is an evidence-based treatment requiring specialist assessment. Advising against, abstinence-only, and withholding all miss the treatment option.", s:"Substitute prescribing is evidence-based; the nurse must understand and explain it."}},
{id:"PSY-130", t:"single", cn:"PSY", sys:"PSYCH", topic:"Opiate withdrawal", d:3, b:0.55, cj:"act", tags:["psychosocial","opiate","withdrawal","symptoms","management"],
 stem:"A client with opiate dependence is admitted and may experience withdrawal. Which action by the nurse is most appropriate?",
 opts:["Assess for withdrawal symptoms and provide symptomatic relief, since opiate withdrawal is uncomfortable but not usually life-threatening","Withhold assessment, since opiate withdrawal is not dangerous","Administer naloxone, since this treats withdrawal","Advise the client to tolerate symptoms, since treatment is not available"],
 ans:0, rat:{c:"Opiate withdrawal requires assessment and symptomatic relief, as it is uncomfortable but not usually life-threatening. Withholding, naloxone, and advising tolerance all miss the management.", s:"Opiate withdrawal requires support; the nurse must assess and provide relief."}},
{id:"PSY-131", t:"single", cn:"PSY", sys:"PSYCH", topic:"Cocaine and amphetamine", d:3, b:0.55, cj:"act", tags:["psychosocial","cocaine","amphetamine","stimulant","effects"],
 stem:"A client presents with agitation, paranoia, and tachycardia after stimulant use. Which action by the nurse is most appropriate?",
 opts:["Recognise stimulant intoxication and provide a calm environment with monitoring, since effects are usually self-limiting","Administer more stimulants, since this will stabilise the client","Restrain the client immediately, since stimulant intoxication requires physical restraint","Withhold monitoring, since the effects will pass"],
 ans:0, rat:{c:"Stimulant intoxication requires calm environment and monitoring, as effects are usually self-limiting. Stimulants, immediate restraint, and withholding all miss the management.", s:"Stimulant intoxication requires supportive care; the nurse must provide a calm environment."}},
{id:"PSY-132", t:"single", cn:"PSY", sys:"PSYCH", topic:"Novel psychoactive substances", d:3, b:0.55, cj:"act", tags:["psychosocial","novel psychoactive","legal highs","substances","risks"],
 stem:"A client asks about novel psychoactive substances. Which interpretation by the nurse is most accurate?",
 opts:["Novel psychoactive substances have unpredictable effects and significant risks, including severe harm and death","Novel psychoactive substances are safe because they are legal","Novel psychoactive substances have known effects and can be used safely","Novel psychoactive substances are less harmful than traditional drugs"],
 ans:0, rat:{c:"Novel psychoactive substances have unpredictable effects and significant risks. Claiming safety, known effects, or less harm all misrepresent the dangers.", s:"Novel psychoactive substances are dangerous; the nurse must understand the risks."}},
{id:"PSY-133", t:"single", cn:"PSY", sys:"PSYCH", topic:"Alcohol units and controlled drinking", d:2, b:0.45, cj:"act", tags:["psychosocial","alcohol units","controlled drinking","harm reduction","advice"],
 stem:"A client asks about safer drinking. Which action by the nurse is most appropriate?",
 opts:["Explain alcohol units and discuss controlled drinking as an option for some clients","Advise that only abstinence is acceptable, since controlled drinking is not possible","Withhold information, since this requires specialist advice","Advise that alcohol has no risks if consumed in moderation"],
 ans:0, rat:{c:"Alcohol units and controlled drinking may be appropriate for some clients. Abstinence-only, withholding, and denying risks all miss the harm reduction approach.", s:"Controlled drinking is an option for some; the nurse must provide accurate information."}},
{id:"PSY-134", t:"single", cn:"PSY", sys:"PSYCH", topic:"Carer support", d:2, b:0.45, cj:"act", tags:["psychosocial","carer","support","family","wellbeing"],
 stem:"A client's family member provides significant care and appears stressed. Which action by the nurse is most appropriate?",
 opts:["Offer carer assessment and support, since carers have their own needs and rights","Focus only on the client, since carer needs are not nursing responsibility","Advise the carer to cope, since this is their role","Withhold support, since carers are not entitled to assessment"],
 ans:0, rat:{c:"Carers have their own needs and rights, requiring assessment and support. Client-only, advising coping, and withholding all miss the carer's entitlement.", s:"Carer support is essential; the nurse must recognise carer needs."}},
{id:"PSY-135", t:"single", cn:"PSY", sys:"PSYCH", topic:"County lines and exploitation", d:3, b:0.55, cj:"act", tags:["psychosocial","county lines","exploitation","safeguarding","vulnerable"],
 stem:"A young person presents with unexplained money and a second phone, and appears controlled by others. Which action by the nurse is most appropriate?",
 opts:["Recognise possible county lines involvement and follow safeguarding procedures, ensuring the young person is seen alone","Assume the money and phone are legitimate and no action is required","Withhold safeguarding, since county lines is a police matter","Advise the young person to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"County lines indicators require safeguarding and seeing the young person alone. Assuming legitimate, withholding, and advising self-help all miss the safeguarding duty.", s:"County lines has specific indicators; the nurse must recognise and act."}},

/* ---------------------------------------------------------- RRP 6 */
{id:"RRP-184", t:"single", cn:"RRP", sys:"INTG", topic:"Trafficking and modern slavery", d:3, b:0.55, cj:"act", tags:["risk","trafficking","modern slavery","exploitation","safeguarding"],
 stem:"A client presents with injuries and appears controlled by another person. Which action by the nurse is most appropriate?",
 opts:["Recognise possible trafficking and follow safeguarding procedures, ensuring the client is seen alone","Assume the accompanying person is a partner and no action is required","Withhold safeguarding, since trafficking is rare","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Possible trafficking requires safeguarding and seeing the client alone. Assuming partner, withholding, and advising self-help all miss the safeguarding duty.", s:"Trafficking requires safeguarding; the nurse must recognise and act."}},
{id:"RRP-185", t:"single", cn:"RRP", sys:"INTG", topic:"Cuckooing", d:3, b:0.55, cj:"act", tags:["risk","cuckooing","exploitation","vulnerable","safeguarding"],
 stem:"A vulnerable adult's home is being used for drug dealing by others. Which action by the nurse is most appropriate?",
 opts:["Recognise cuckooing and follow safeguarding procedures, since this is a form of exploitation","Assume the adult has consented and no action is required","Withhold safeguarding, since this is a police matter","Advise the adult to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Cuckooing is exploitation requiring safeguarding. Assuming consent, withholding, and advising self-help all miss the safeguarding duty.", s:"Cuckooing requires safeguarding; the nurse must recognise and act."}},
{id:"RRP-186", t:"single", cn:"RRP", sys:"INTG", topic:"Weapon and knife injury", d:3, b:0.55, cj:"act", tags:["risk","weapon","knife","injury","violence","treatment"],
 stem:"A young person presents with a knife wound. Which action by the nurse is most appropriate?",
 opts:["Treat the injury and explore the circumstances, since this may indicate violence requiring safeguarding","Treat the injury only, since exploring circumstances is not nursing responsibility","Withhold treatment, since this may be gang-related","Advise the young person to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Knife injury requires treatment and exploration, as it may indicate violence requiring safeguarding. Treatment-only, withholding, and advising self-help all miss the safeguarding duty.", s:"Weapon injury requires exploration; the nurse must recognise safeguarding concerns."}},
{id:"RRP-187", t:"single", cn:"RRP", sys:"INTG", topic:"Youth violence", d:3, b:0.55, cj:"act", tags:["risk","youth violence","prevention","safeguarding","public health"],
 stem:"A young person presents with injuries from violence. Which action by the nurse is most appropriate?",
 opts:["Recognise youth violence as a safeguarding and public health issue, requiring multi-agency response","Assume this is a one-off incident and no action is required","Withhold safeguarding, since youth violence is common","Advise the young person to avoid violence, since this is their responsibility"],
 ans:0, rat:{c:"Youth violence is a safeguarding and public health issue requiring multi-agency response. Assuming one-off, withholding, and advising avoidance all miss the response.", s:"Youth violence requires multi-agency response; the nurse must recognise and escalate."}},
{id:"RRP-188", t:"single", cn:"RRP", sys:"INTG", topic:"Public health approach to violence", d:3, b:0.55, cj:"analyze", tags:["risk","public health","violence","prevention","approach"],
 stem:"A service adopts a public health approach to violence. Which interpretation by the nurse is most accurate?",
 opts:["This treats violence as a preventable issue requiring multi-agency collaboration and addressing root causes","This focuses only on treating injuries, since prevention is not possible","This is a criminal justice approach, since violence is a crime","This is not relevant to healthcare, since violence is a police matter"],
 ans:0, rat:{c:"Public health approach treats violence as preventable requiring multi-agency collaboration. Injury-only, criminal justice, and not relevant all miss the approach.", s:"Public health approach prevents violence; the nurse must understand the model."}},
{id:"RRP-189", t:"single", cn:"RRP", sys:"INTG", topic:"Criminal justice involvement", d:3, b:0.55, cj:"act", tags:["risk","criminal justice","health","collaboration","safeguarding"],
 stem:"A client on a community sentence requires health support. Which action by the nurse is most appropriate?",
 opts:["Engage with the offender manager and share relevant health information with consent, since coordinated care improves outcomes","Withhold engagement, since offender management is not a healthcare function","Assume the offender manager will arrange all health input","Require the client to obtain permission before accessing services"],
 ans:0, rat:{c:"Engaging with the offender manager and sharing information with consent supports coordinated care. Withholding, assuming, and requiring permission all miss the collaboration.", s:"Community sentence health support requires engagement; the nurse must understand the process."}},

/* ---------------------------------------------------------- PAA 5 */
{id:"PAA-206", t:"single", cn:"PAA", sys:"INTG", topic:"Housing and homelessness", d:3, b:0.55, cj:"act", tags:["physiological adaptation","housing","homelessness","health","social"],
 stem:"A client is homeless and has health needs. Which action by the nurse is most appropriate?",
 opts:["Address housing as part of health care, since homelessness significantly impacts health outcomes","Focus only on health needs, since housing is not healthcare responsibility","Withhold housing support, since this is a social services matter","Advise the client to seek housing themselves, since this respects autonomy"],
 ans:0, rat:{c:"Housing significantly impacts health, so addressing it is part of healthcare. Health-only, withholding, and advising self-help all miss the social determinant.", s:"Housing is a health determinant; the nurse must recognise and address it."}},
{id:"PAA-207", t:"single", cn:"PAA", sys:"INTG", topic:"Probation and licence conditions", d:3, b:0.55, cj:"act", tags:["physiological adaptation","probation","licence","criminal justice","health"],
 stem:"A client is on probation with licence conditions. Which action by the nurse is most appropriate?",
 opts:["Understand licence conditions and collaborate with probation where appropriate, since this supports compliance and health","Withhold collaboration, since probation is not appropriate for healthcare","Assume licence conditions are not relevant to health","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Licence conditions may impact health, so understanding and collaborating is appropriate. Withholding, assuming irrelevant, and advising self-help all miss the collaboration.", s:"Probation collaboration supports health; the nurse must understand when to engage."}},
{id:"PAA-208", t:"single", cn:"PAA", sys:"INTG", topic:"Criminal justice and health", d:3, b:0.55, cj:"act", tags:["physiological adaptation","criminal justice","health","collaboration","equity"],
 stem:"A client is involved with criminal justice services and has health needs. Which action by the nurse is most appropriate?",
 opts:["Provide equitable health care and collaborate with criminal justice services where appropriate","Withhold care, since criminal justice involvement affects entitlement","Assume criminal justice services will address health needs, since this is appropriate","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Clients involved with criminal justice are entitled to equitable care with appropriate collaboration. Withholding, assuming, and advising self-help all miss the entitlement.", s:"Criminal justice involvement does not affect health entitlement; the nurse must provide equitable care."}},
{id:"PAA-209", t:"single", cn:"PAA", sys:"INTG", topic:"Prison health", d:3, b:0.55, cj:"act", tags:["physiological adaptation","prison","health","equity","care"],
 stem:"A client is in prison and has health needs. Which action by the nurse is most appropriate?",
 opts:["Provide equitable health care, since prisoners are entitled to the same standard of care as the general population","Provide reduced health care, since prison healthcare is different","Withhold care, since prison healthcare is not nursing responsibility","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Prisoners are entitled to equitable healthcare. Reduced, withholding, and advising self-help all miss the entitlement.", s:"Prison healthcare requires equity; the nurse must provide the same standard of care."}},
{id:"PAA-210", t:"single", cn:"PAA", sys:"INTG", topic:"Multi-agency working", d:3, b:0.55, cj:"act", tags:["physiological adaptation","multi-agency","collaboration","safeguarding","coordination"],
 stem:"A client has complex needs requiring multi-agency support. Which action by the nurse is most appropriate?",
 opts:["Collaborate with other agencies and participate in multi-agency meetings, since this coordinates care","Withhold collaboration, since this is not nursing responsibility","Assume other multi-agency partners will coordinate care","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Complex needs require multi-agency collaboration and coordination. Withholding, assuming, and advising self-help all miss the coordination.", s:"Multi-agency working coordinates care; the nurse must participate actively."}},

/* ---------------------------------------------------------- PHA 2 */
{id:"PHA-246", t:"single", cn:"PHA", sys:"PSYCH", topic:"Alcohol units", d:2, b:0.45, cj:"act", tags:["pharmacology","alcohol units","harm reduction","advice","education"],
 stem:"A client asks about alcohol units. Which action by the nurse is most appropriate?",
 opts:["Explain alcohol units and safer drinking guidelines, since this supports informed choices","Withhold information, since this requires specialist advice","Advise that only abstinence is acceptable, since units are not relevant","Advise that alcohol has no risks if consumed in moderation"],
 ans:0, rat:{c:"Alcohol units and guidelines support informed choices. Withholding, abstinence-only, and denying risks all miss the education.", s:"Alcohol units are important for harm reduction; the nurse must provide accurate information."}},
{id:"PHA-247", t:"single", cn:"PHA", sys:"PSYCH", topic:"Controlled drinking", d:3, b:0.55, cj:"act", tags:["pharmacology","controlled drinking","harm reduction","alcohol","treatment"],
 stem:"A client with alcohol problems asks about controlled drinking. Which interpretation by the nurse is most accurate?",
 opts:["Controlled drinking may be appropriate for some clients, but abstinence is required for others with dependence","Controlled drinking is never appropriate, since abstinence is the only option","Controlled drinking is always appropriate, since abstinence is not necessary","Controlled drinking is not a recognised approach"],
 ans:0, rat:{c:"Controlled drinking may suit some clients, but abstinence is required for others with dependence. Never, always, and not recognised all misrepresent the approach.", s:"Controlled drinking has specific indications; the nurse must understand when it is appropriate."}}

]);
