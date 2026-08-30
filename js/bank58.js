"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 48) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 47: SIC (12.8% vs 13),
 * HPM (8.9% vs 9) and PAA (13.9% vs 14). Every item is
 * difficulty 2 or 3, and the clinical detail is written to be
 * defensible.
 *
 * SIC 7: oxygen and fire risk, electrical safety and PAT testing,
 * hoist and handling aids, lone working, sharps injury in the home,
 * cold chain and vaccine storage, and controlled drugs in the
 * community.
 * HPM 6: immunisation schedule and catch-up, vaccine
 * contraindication, herd immunity, needlestick post-exposure
 * prophylaxis, altitude sickness, and travellers diarrhoea.
 * PAA 5: fitness to fly and cabin pressure, supplemental oxygen on
 * flights, deep vein thrombosis during travel, repatriation with a
 * medical escort, and stability for travel.
 * MOC 2: confidential waste and shredding, and secure record
 * transport.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- SIC 7 */
{id:"SIC-169", t:"single", cn:"SIC", sys:"RESP", topic:"Oxygen and fire risk", d:2, b:0.45, cj:"act", tags:["safety","oxygen","fire","risk","environment","precautions"],
 stem:"A client uses supplemental oxygen at home. Which action by the nurse is most appropriate when reviewing home safety?",
 opts:["Advise keeping oxygen away from open flames and prohibiting smoking in the vicinity","Advise that oxygen itself is flammable and must be stored in a fireproof cabinet","Advise that small candles are acceptable at a safe distance from the cylinder","Advise that oxygen use poses no additional fire risk beyond normal precautions"],
 ans:0, rat:{c:"Oxygen is not flammable but vigorously supports combustion, so open flames and smoking must be prohibited in the vicinity. Describing oxygen as flammable is inaccurate, candles remain a hazard, and oxygen significantly increases fire risk.", s:"Oxygen enrichment dramatically increases fire intensity; the nurse must give accurate safety advice."}},
{id:"SIC-170", t:"single", cn:"SIC", sys:"INTG", topic:"Electrical safety and PAT testing", d:2, b:0.45, cj:"act", tags:["safety","electrical","PAT","equipment","maintenance","risk"],
 stem:"A nurse notices a portable appliance with a frayed cable in a clinical area. Which action by the nurse is most appropriate?",
 opts:["Remove the appliance from use immediately and report it for portable appliance testing and repair","Continue using the appliance, since fraying is cosmetic if the appliance still functions","Apply insulating tape to the portable appliance and continue use","Report the damage but continue use until a replacement arrives"],
 ans:0, rat:{c:"A frayed cable is an electrical hazard requiring immediate removal from use and referral for portable appliance testing and repair. Continued use risks electric shock or fire, and insulating tape is not a safe repair for clinical equipment.", s:"Electrical safety requires immediate action on identified faults; the nurse must not use damaged equipment."}},
{id:"SIC-171", t:"single", cn:"SIC", sys:"MSK", topic:"Hoist and handling aids", d:3, b:0.55, cj:"act", tags:["safety","hoist","manual handling","equipment","injury prevention"],
 stem:"A client requires assistance to transfer from bed to chair. A hoist and sling are available, and the client's handling plan specifies their use. Which action by the nurse is most appropriate?",
 opts:["Use the hoist and sling as specified, checking the sling size and weight limit before transferring","Transfer the client manually, since this is quicker and the client can assist","Use the hoist without checking the sling, since any sling will fit","Ask the client to stand and walk with support, since this maintains mobility"],
 ans:0, rat:{c:"Where a handling plan specifies hoist use, the nurse must follow it, verifying sling size and weight limit. Manual transfer risks injury to both client and nurse, an ill-fitting sling is unsafe, and walking may exceed the client's safe capability.", s:"Manual handling plans exist to protect both client and staff; the nurse must use specified equipment correctly."}},
{id:"SIC-172", t:"single", cn:"SIC", sys:"PSYCH", topic:"Lone working", d:3, b:0.55, cj:"act", tags:["safety","lone working","community","risk","staff safety","protocol"],
 stem:"A community nurse is due to visit a client with a history of aggression at a home where no one else is present. Which action by the nurse is most appropriate?",
 opts:["Follow lone working procedures, including informing a colleague of the visit and having an agreed check-in","Attend as planned without informing anyone, since the visit is routine","Refuse the visit entirely, since lone working is never acceptable","Bring a colleague without informing anyone, since this is safer"],
 ans:0, rat:{c:"Lone working procedures require informing a colleague, having an agreed check-in, and knowing the exit route where risk is identified. Attending without notification, blanket refusal, and unannounced changes all breach safe working practice.", s:"Lone working risk must be managed through procedure; the nurse must not attend high-risk visits without safeguards."}},
{id:"SIC-173", t:"single", cn:"SIC", sys:"INTG", topic:"Sharps injury in the home", d:3, b:0.55, cj:"act", tags:["safety","sharps","needlestick","home","wound care","reporting"],
 stem:"A community nurse sustains a needlestick injury while administering an injection in a client's home. Which action by the nurse is the priority?",
 opts:["Encourage bleeding under running water, cover the wound, and follow the exposure management pathway including risk assessment and reporting","Continue the visit and report the injury at the end of the shift, since the client's care comes first","Apply a tourniquet and wait for advice before doing anything","Wash with soap only, since this is sufficient for a clean needle"],
 ans:0, rat:{c:"Immediate first aid for a sharps injury is to encourage bleeding under running water and cover the wound, followed by the exposure management pathway including risk assessment and reporting. Delaying reporting risks missing the window for post-exposure prophylaxis.", s:"Sharps injury management is time-critical; the nurse must act immediately and follow the exposure pathway."}},
{id:"SIC-174", t:"single", cn:"SIC", sys:"INF", topic:"Cold chain and vaccine storage", d:3, b:0.55, cj:"act", tags:["safety","cold chain","vaccine","storage","temperature","quality"],
 stem:"A vaccine fridge temperature log shows readings outside the required range overnight. Which action by the nurse is most appropriate?",
 opts:["Quarantine the affected stock, label it clearly, and seek advice before use, since potency may be compromised","Use the stock immediately, since a brief excursion does not affect potency","Discard the stock without checking, since any excursion is unacceptable","Continue using the stock but monitor temperatures more closely"],
 ans:0, rat:{c:"A cold chain excursion requires quarantining and clearly labelling affected stock while seeking manufacturer or specialist advice on whether potency is maintained. Immediate use, blanket disposal, and continued use all risk ineffective immunisation or wastage.", s:"Cold chain integrity determines vaccine effectiveness; the nurse must follow the excursion protocol rather than guess."}},
{id:"SIC-175", t:"single", cn:"SIC", sys:"INTG", topic:"Controlled drugs in the community", d:3, b:0.55, cj:"act", tags:["safety","controlled drug","community","transport","security","governance"],
 stem:"A community nurse carries controlled drugs for administration in clients' homes. Which action by the nurse is most appropriate?",
 opts:["Follow controlled drug transport procedures, keeping drugs secure, recorded, and never leaving them unattended in a vehicle","Store drugs in the car boot between visits, since this is convenient and secure","Carry controlled drugs without recording, since community records differ from ward requirements","Leave drugs with the client's family between visits, since this is safest"],
 ans:0, rat:{c:"Controlled drug transport in the community requires secure carriage, accurate recording, and never leaving drugs unattended, particularly in vehicles. Storing in a boot, omitting records, or leaving drugs with others all breach controlled drug governance.", s:"Controlled drug accountability applies equally in community settings; the nurse must maintain security and records."}},

/* ---------------------------------------------------------- HPM 6 */
{id:"HPM-117", t:"single", cn:"HPM", sys:"INF", topic:"Immunisation schedule and catch-up", d:2, b:0.45, cj:"act", tags:["health promotion","immunisation","schedule","catch-up","prevention"],
 stem:"A child has missed several routine immunisations and the parent asks whether to restart the schedule. Which action by the nurse is most appropriate?",
 opts:["Advise that catch-up can usually proceed from the point missed without restarting, following the schedule","Advise restarting the entire schedule, since gaps invalidate previous doses","Advise waiting until the child is older, since catch-up is less effective","Advise that missed doses cannot be given and the child will remain unprotected"],
 ans:0, rat:{c:"Catch-up immunisation usually continues from the point missed without restarting, as previous doses remain valid. Restarting, delaying, or refusing catch-up all leave the child unnecessarily unprotected.", s:"Understanding catch-up principles prevents unnecessary delay and protects the child."}},
{id:"HPM-118", t:"single", cn:"HPM", sys:"INF", topic:"Vaccine contraindication", d:3, b:0.55, cj:"analyze", tags:["health promotion","vaccine","contraindication","safety","assessment"],
 stem:"A client is due for a live vaccine but reports a recent diagnosis of significant immunosuppression. Which action by the nurse is most appropriate?",
 opts:["Withhold the live vaccine, since immunosuppression is a contraindication, and seek advice on alternatives","Administer the live vaccine, since immunosuppression only reduces effectiveness","Administer a reduced dose, since this is safer in immunosuppression","Delay until the client feels well, since immunosuppression is temporary"],
 ans:0, rat:{c:"Significant immunosuppression contraindicates live vaccines due to the risk of vaccine-derived infection. Reduced dosing is not appropriate, and immunosuppression may not be temporary. Specialist advice on alternatives is required.", s:"Live vaccine contraindications protect immunocompromised clients; the nurse must identify and act on them."}},
{id:"HPM-119", t:"single", cn:"HPM", sys:"INF", topic:"Herd immunity", d:2, b:0.45, cj:"analyze", tags:["health promotion","herd immunity","immunisation","prevention","public health"],
 stem:"A parent declines immunisation, stating that others being vaccinated is sufficient protection. Which interpretation by the nurse is most accurate?",
 opts:["Herd immunity depends on high population uptake and is reduced when individuals decline, so the child remains at risk","Herd immunity provides complete protection regardless of personal immunisation status","Herd immunity means the child will never be exposed to the disease","Declining immunisation has no effect on community protection"],
 ans:0, rat:{c:"Herd immunity requires high population uptake and is weakened by individual refusal, leaving the unvaccinated child at risk. It is not complete protection, does not eliminate exposure, and declining does affect community protection.", s:"Explaining herd immunity accurately supports informed decision-making about immunisation."}},
{id:"HPM-120", t:"single", cn:"HPM", sys:"INF", topic:"Needlestick post-exposure prophylaxis", d:3, b:0.55, cj:"act", tags:["health promotion","needlestick","post-exposure","prophylaxis","occupational health"],
 stem:"A nurse sustains a needlestick injury from a needle used on a client of unknown blood-borne virus status. Which action by the nurse is most appropriate?",
 opts:["Seek immediate risk assessment through the exposure management pathway, since post-exposure prophylaxis is time-critical","Wait for the client's test results before taking any action","Assume the risk is low since the status is unknown and take no action","Report the injury but decline testing, since this is a personal choice"],
 ans:0, rat:{c:"A needlestick from a source of unknown status requires immediate risk assessment, as post-exposure prophylaxis effectiveness is time-dependent. Waiting for results, assuming low risk, or declining assessment all risk preventable infection.", s:"Post-exposure management is time-critical; the nurse must seek assessment without delay."}},
{id:"HPM-121", t:"single", cn:"HPM", sys:"RESP", topic:"Altitude sickness", d:3, b:0.55, cj:"act", tags:["health promotion","altitude","sickness","prevention","travel health"],
 stem:"A client plans to trek at high altitude and asks how to reduce the risk of altitude sickness. Which action by the nurse is most appropriate?",
 opts:["Advise gradual ascent with adequate acclimatisation and awareness of symptoms requiring descent","Advise rapid ascent, since the body adapts quickly at altitude","Advise increasing physical exertion, since this speeds acclimatisation","Advise that altitude sickness is unpredictable and cannot be reduced"],
 ans:0, rat:{c:"Gradual ascent with acclimatisation reduces altitude sickness risk, and descent is required if symptoms worsen. Rapid ascent, increased exertion, and fatalism all increase risk. Symptoms must be recognised and acted on.", s:"Altitude sickness prevention relies on controlled ascent; the nurse must advise accurately and emphasise descent for worsening symptoms."}},
{id:"HPM-122", t:"single", cn:"HPM", sys:"GI", topic:"Travellers diarrhoea", d:2, b:0.45, cj:"act", tags:["health promotion","travellers diarrhoea","prevention","hydration","travel health"],
 stem:"A client asks how to reduce the risk of travellers diarrhoea. Which action by the nurse is most appropriate?",
 opts:["Advise food and water precautions, hand hygiene, and oral rehydration if symptoms occur","Advise prophylactic antibiotics throughout the trip, since this prevents infection","Advise that the risk cannot be reduced and no precautions are needed","Advise avoiding all food, since this eliminates the risk"],
 ans:0, rat:{c:"Food and water precautions, hand hygiene, and oral rehydration for symptoms are the main preventive measures. Prophylactic antibiotics are not routine, the risk can be reduced, and avoiding all food is neither practical nor safe.", s:"Travellers diarrhoea prevention relies on practical hygiene measures; the nurse must give balanced advice."}},

/* ---------------------------------------------------------- PAA 5 */
{id:"PAA-179", t:"single", cn:"PAA", sys:"RESP", topic:"Fitness to fly and cabin pressure", d:3, b:0.55, cj:"analyze", tags:["physiological adaptation","fitness to fly","cabin pressure","hypoxia","assessment"],
 stem:"A client with significant chronic respiratory disease plans a long-haul flight. Which interpretation by the nurse is most accurate?",
 opts:["Cabin pressure at altitude reduces oxygen availability, so pre-flight assessment of fitness to fly is required","Cabin pressure equals sea level, so respiratory disease does not affect flying","Fitness to fly is only relevant for cardiac disease","Airlines assess fitness automatically and no clinical input is needed"],
 ans:0, rat:{c:"Commercial aircraft cabins are pressurised to an equivalent of several thousand feet, reducing oxygen availability and requiring pre-flight assessment for clients with significant respiratory disease. Cabin pressure is not sea level, and clinical assessment is required.", s:"Hypobaric hypoxia during flight can decompensate respiratory disease; the nurse must understand the need for pre-flight assessment."}},
{id:"PAA-180", t:"single", cn:"PAA", sys:"RESP", topic:"Supplemental oxygen on flights", d:3, b:0.55, cj:"act", tags:["physiological adaptation","oxygen","flight","arrangements","safety"],
 stem:"A client who uses supplemental oxygen at home requires it during a flight. Which action by the nurse is most appropriate?",
 opts:["Advise arranging oxygen with the airline in advance, since personal cylinders are generally not permitted onboard","Advise bringing their own oxygen cylinder, since this is always permitted","Advise that oxygen is not needed during flight","Advise stopping oxygen for the flight, since the cabin is pressurised"],
 ans:0, rat:{c:"In-flight oxygen must be arranged with the airline in advance, as personal cylinders are generally not permitted for safety reasons. Assuming permission, omitting oxygen, or stopping therapy all risk hypoxia.", s:"In-flight oxygen requires advance arrangement; the nurse must advise early to prevent travel being unsafe or cancelled."}},
{id:"PAA-181", t:"single", cn:"PAA", sys:"CV", topic:"Deep vein thrombosis during travel", d:2, b:0.45, cj:"act", tags:["physiological adaptation","deep vein thrombosis","travel","prevention","risk"],
 stem:"A client with previous deep vein thrombosis is planning a long-haul flight. Which action by the nurse is most appropriate?",
 opts:["Advise preventive measures including hydration, mobility, and consideration of compression stockings, with medical advice on further prophylaxis","Advise that no precautions are needed since the flight is only a few hours","Advise taking a sedative, since immobility is not a risk factor","Advise that previous thrombosis does not increase future risk"],
 ans:0, rat:{c:"Previous deep vein thrombosis increases risk, so hydration, mobility, compression stockings, and medical advice on further prophylaxis are appropriate. Short flights still carry risk, sedation increases immobility, and previous thrombosis does increase future risk.", s:"Travel-related thrombosis risk requires individualised prevention; the nurse must advise according to risk factors."}},
{id:"PAA-182", t:"single", cn:"PAA", sys:"INTG", topic:"Repatriation with a medical escort", d:3, b:0.55, cj:"act", tags:["physiological adaptation","repatriation","medical escort","transfer","planning"],
 stem:"A client requires repatriation by air following hospitalisation abroad. Which action by the nurse is most appropriate?",
 opts:["Participate in transfer planning, ensuring the client is stable for travel and that necessary equipment and documentation are arranged","Arrange travel independently, since the client is well enough to travel alone","Delay repatriation indefinitely, since air travel is always unsafe after illness","Transfer care to the airline, since they assume clinical responsibility"],
 ans:0, rat:{c:"Repatriation requires assessment of stability for travel, appropriate escort and equipment, and complete documentation. Independent travel, indefinite delay, and transferring clinical responsibility all risk unsafe transfer.", s:"Safe repatriation requires clinical planning; the nurse contributes to ensuring the client is fit to travel."}},
{id:"PAA-183", t:"single", cn:"PAA", sys:"INTG", topic:"Stability for travel", d:3, b:0.55, cj:"evaluate", tags:["physiological adaptation","stability","travel","assessment","risk"],
 stem:"A client wishes to travel home but has had unstable vital signs and ongoing treatment changes. Which interpretation by the nurse is most accurate?",
 opts:["Travel should be deferred until the client is stable, since instability increases the risk of deterioration en route","Travel should proceed, since the client wishes to go home","Stability is irrelevant if the journey is short","The client can travel if accompanied by family, regardless of clinical status"],
 ans:0, rat:{c:"Travel with unstable vital signs or ongoing treatment changes risks deterioration en route where care is unavailable, so deferral until stability is appropriate. Client preference, journey length, and family accompaniment do not substitute for clinical stability.", s:"Clinical stability determines travel safety; the nurse must balance client wishes against risk of deterioration."}},

/* ---------------------------------------------------------- MOC 2 */
{id:"MOC-232", t:"single", cn:"MOC", sys:"INTG", topic:"Confidential waste and shredding", d:2, b:0.45, cj:"act", tags:["management","confidential waste","shredding","records","security","disposal"],
 stem:"A nurse needs to dispose of paper records containing client information. Which action by the nurse is most appropriate?",
 opts:["Place the records in confidential waste for secure destruction, since they must not be disposed of as general waste","Dispose of the records in general waste, since paper is not sensitive","Tear the records by hand and place them in recycling","Leave the records on the desk for collection by any staff member"],
 ans:0, rat:{c:"Records containing client information must be disposed of as confidential waste for secure destruction. General waste, hand tearing, and uncontrolled collection all breach confidentiality.", s:"Confidential waste disposal protects client information; the nurse must use the correct stream."}},
{id:"MOC-233", t:"single", cn:"MOC", sys:"INTG", topic:"Secure record transport", d:2, b:0.45, cj:"act", tags:["management","records","transport","security","confidentiality","governance"],
 stem:"A nurse must transport client records between sites. Which action by the nurse is most appropriate?",
 opts:["Use a secure transfer method with records kept under continuous control and accounted for on arrival","Send the records by internal post unmarked, since this is quicker","Carry the records openly, since staff will recognise them as clinical documents","Leave the records at reception for collection, since this is convenient"],
 ans:0, rat:{c:"Secure transport requires records to remain under continuous control with accountability on arrival. Unmarked post, open carriage, and unattended collection all risk loss and breach of confidentiality.", s:"Record transport must be secure and accountable; the nurse must maintain control throughout."}}

]);
