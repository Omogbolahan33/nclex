/* Wave 12 — 20 hand-authored hard RN items.
 * Targets the four clientNeed areas still under their blueprint share after
 * wave 11: Management of Care 17.5% against 18%, Safety 12.7% against 13%,
 * Psychosocial Integrity 8.7% against 9%, Reduction of Risk Potential 11.4%
 * against 12%. Physiological Adaptation gains four obstetric emergencies.
 * Every item is difficulty 2 or 3; 14 of the 20 are d=3.
 *
 * Management of Care  : MOC-099 – MOC-103
 * Safety              : SIC-071 – SIC-073
 * Psychosocial        : PSY-049 – PSY-052
 * Reduction of Risk   : RRP-069 – RRP-072
 * Physiological Adapt.: PAA-091 – PAA-094
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Management of Care (5) ---------------- */

{id:"MOC-099", t:"single", cn:"MOC", sys:"INF", topic:"Responding to a subpoena for the medical record", d:3, b:0.55, cj:"act", tags:["legal","records","confidentiality"],
 stem:"A nurse receives a subpoena duces tecum requesting the complete medical record of a former client for a civil lawsuit. The nurse is unfamiliar with the process and unsure what may be released.",
 opts:["Forward the subpoena to health information management and legal counsel, and release only what the subpoena requires",
  "Photocopy the entire chart and mail it to the attorney named on the subpoena",
  "Refuse to release any part of the medical record without the client's written authorization",
  "Ask the client whether they object before deciding what to send"],
 ans:0,
 rat:{c:"A subpoena is a legal demand handled through the organization's designated custodian of records and legal counsel, who determine the valid scope of disclosure. Releasing more than the subpoena requires is an unauthorized disclosure of protected health information.",
  s:"Photocopying and mailing the chart bypasses the review that establishes what may lawfully be released. Refusing outright ignores a valid legal process, and asking the client to decide places a legal determination on someone not equipped to make it."} },

{id:"MOC-100", t:"single", cn:"MOC", sys:"INF", topic:"Client request to amend an accurate entry", d:3, b:0.55, cj:"act", tags:["records","autonomy","documentation"],
 stem:"A client reviews the discharge summary and states that the documented fall risk assessment is factually wrong and demands that it be changed. The nurse reviews the entry and confirms it accurately records what was assessed at the time.",
 opts:["Explain that the original entry cannot be erased, and initiate the amendment process so the client's statement is appended with attribution and date",
  "Delete the incorrect entry and document a corrected assessment in its place",
  "Tell the client that a signed record cannot be altered in any way",
  "Ask the provider who wrote the entry to rewrite it before discharge"],
 ans:0,
 rat:{c:"Clients have a right to request an amendment to their record. Where the entry is accurate as written, the original stays intact and the client's disputed statement is appended as an amendment with attribution and date, preserving the audit trail.",
  s:"Deleting or rewriting the original entry destroys the record of what was actually assessed and is falsification. Telling the client nothing can be done denies a right the client holds."} },

{id:"MOC-101", t:"single", cn:"MOC", sys:"INF", topic:"Transfer of an unstabilized emergency client", d:3, b:0.55, cj:"analyze", tags:["EMTALA","transfer","ethics"],
 stem:"An uninsured client presents to the emergency department with crushing chest pain and an abnormal electrocardiogram. Before the workup is complete the client asks to be transferred to a hospital closer to home, and the receiving facility has agreed to accept the transfer.",
 opts:["The transfer must not proceed until the client is stabilized, because federal law protects an unstable client from transfer for non-clinical reasons",
  "The transfer may proceed, because the receiving facility has agreed to accept the client",
  "The transfer may proceed once the client signs a form acknowledging financial responsibility",
  "The transfer may proceed, because the client requested it and has decision-making capacity"],
 ans:0,
 rat:{c:"Federal law prohibits transferring a client with an unstabilized emergency medical condition for reasons unrelated to clinical need. An abnormal electrocardiogram with crushing chest pain is not stabilized, and insurance status is not a lawful basis for transfer.",
  s:"Acceptance by the receiving facility, a signed financial form, and the client's own request all fail to answer the question, which is whether the client is clinically stable enough to be moved."} },

{id:"MOC-102", t:"single", cn:"MOC", sys:"INF", topic:"Witnessing waste and suspected diversion", d:3, b:0.55, cj:"prioritize", tags:["controlled substances","diversion","advocacy"],
 stem:"A nurse draws up 2 mg of hydromorphone for a client whose order is for 1 mg. A colleague offers to witness the wasting of the extra 1 mg. The nurse recalls that the same colleague has volunteered to witness waste on several recent shifts, and the wastelog shows repeated partial doses.",
 opts:["Witness the waste, then report the pattern of repeated wastings to the charge nurse or pharmacy, because diversion must be investigated",
  "Witness the waste and say nothing further, since the wastelog already records the repeated discrepancies",
  "Refuse to witness the waste and ask another nurse to do it instead",
  "Confront the colleague directly and ask whether they are diverting the medication"],
 ans:0,
 rat:{c:"The dose must be wasted with a witness, and the pattern itself is the finding that requires escalation. Repeated partial doses witnessed by the same person is a recognized diversion indicator, and reporting it is both a patient-safety and a colleague-protection obligation.",
  s:"Staying silent leaves a pattern uninvestigated. Refusing to witness abandons an unsafe dose at the bedside, and confronting the colleague directly compromises any subsequent investigation and is not the nurse's role."} },

{id:"MOC-103", t:"single", cn:"MOC", sys:"PSYCH", topic:"Supporting a nurse after a harmful error", d:3, b:0.55, cj:"generate", tags:["just culture","peer support","safety"],
 stem:"A nurse administers a wrong-dose insulin injection that the client survives without lasting harm. The event is reported and reviewed. Over the following week the nurse becomes withdrawn, avoids the client's room, and tells a coworker they cannot stop replaying the error.",
 opts:["Recognize the distress as an expected response to being involved in a harmful event, offer peer support resources, and continue the systems-focused review",
  "Reassure the nurse that the event caused no lasting harm, so there is no reason for distress",
  "Remove the nurse from direct client care until the emotional reaction resolves",
  "Advise the nurse to keep the distress private in order to avoid undermining the team's confidence"],
 ans:0,
 rat:{c:"Clinicians involved in a harmful event commonly experience significant distress, and the organization's obligations run to both the client and the clinician. Naming it as expected, offering peer support, and keeping the review systems-focused is what a just culture does.",
  s:"Minimizing the harm because the client survived dismisses a real injury. Removing the nurse from care is punitive and removes the person who most needs support, and telling them to stay silent drives the distress underground."} },

/* ---------------- Safety (3) ---------------- */

{id:"SIC-071", t:"single", cn:"SIC", sys:"INF", topic:"Blood spill cleanup sequence", d:2, b:0.45, cj:"act", tags:["standard precautions","spill","PPE"],
 stem:"A blood collection tube breaks on the floor of a client room, spilling approximately 20 mL of blood across vinyl flooring. No one has been injured and the client is still in bed.",
 opts:["Don gloves and any additional protective equipment, contain the spill with absorbent material, then clean and disinfect with an approved agent",
  "Mop the spill immediately with warm water and detergent before the blood dries",
  "Pour disinfectant directly onto the spill and leave the room until it dries",
  "Sweep up the broken glass first, then wipe the visible blood away with a dry towel"],
 ans:0,
 rat:{c:"Protective equipment comes first, the spill is contained with absorbent material rather than spread, and an approved disinfectant with the correct contact time finishes the job. Broken glass is picked up with a mechanical device, never the hands.",
  s:"Water and detergent do not disinfect. Pouring disinfectant onto an uncontained spill splashes it and aerosolizes blood, and sweeping glass by hand risks a percutaneous injury."} },

{id:"SIC-072", t:"single", cn:"SIC", sys:"INF", topic:"Surgical smoke evacuation", d:2, b:0.45, cj:"generate", tags:["perioperative","occupational safety"],
 stem:"During a procedure the surgical team uses an electrosurgical unit that generates a visible plume of surgical smoke above the operative field. The room has standard ventilation.",
 opts:["Use a local exhaust evacuation device with a high-efficiency filter positioned within a few centimeters of the plume source",
  "Rely on the room's standard ventilation, which is adequate for surgical smoke",
  "Ask the team to hold their breath briefly whenever the plume is generated",
  "Open the room door to increase airflow into the corridor"],
 ans:0,
 rat:{c:"Surgical smoke contains viable cellular material and toxic byproducts, and room ventilation is not designed to capture it. A local exhaust device with a high-efficiency filter placed close to the source is the required control.",
  s:"Standard ventilation dilutes but does not capture the plume. Holding one's breath is not respiratory protection, and opening the door moves the contaminant into the corridor where other people breathe it."} },

{id:"SIC-073", t:"single", cn:"SIC", sys:"RESP", topic:"Fire with a ventilator-dependent client", d:3, b:0.55, cj:"prioritize", tags:["fire","ventilator","evacuation"],
 stem:"A fire alarm sounds on a critical care unit. One client is intubated and mechanically ventilated, and the fire is two rooms away with smoke visible in the corridor.",
 opts:["Close the door to the room, keep the ventilator running, and move the client horizontally only if the room becomes untenable",
  "Disconnect the ventilator and bag the client down the stairwell immediately",
  "Shut off the oxygen supply to the unit to prevent the fire from spreading",
  "Wait in the room with the client until the fire department arrives"],
 ans:0,
 rat:{c:"A closed door is an effective smoke barrier, and a ventilated client is safest on the ventilator behind that barrier while horizontal evacuation is assessed. Moving a mechanically ventilated client is a high-risk transfer, not a default first step.",
  s:"Disconnecting and bagging down a stairwell exposes an unstable client to smoke and to the risks of manual ventilation during transport. Shutting off unit oxygen harms every other client, and waiting passively ignores that the corridor may become impassable."} },

/* ---------------- Psychosocial Integrity (4) ---------------- */

{id:"PSY-049", t:"single", cn:"PSY", sys:"PSYCH", topic:"Catatonia and malignant progression", d:3, b:0.55, cj:"recognize", tags:["catatonia","schizophrenia","emergency"],
 stem:"A client with schizophrenia has not spoken, eaten, or moved voluntarily for two days. The client holds an arm in an awkward position after the nurse moves it and does not respond to questions, though vital signs are now rising and the client has become diaphoretic.",
 opts:["Urgent evaluation for catatonia, with a lorazepam challenge and preparation for electroconvulsive therapy if malignant catatonia develops",
  "Escalation of the antipsychotic dose to treat worsening negative symptoms",
  "Placement in seclusion to prevent the client from harming others",
  "Reassurance that the immobility is a voluntary behavioral response to the unit milieu"],
 ans:0,
 rat:{c:"Immobility, mutism, posturing, and waxy flexibility are catatonia. Rising vital signs with diaphoresis signals progression toward malignant catatonia, a medical emergency treated with benzodiazepines and electroconvulsive therapy when they fail.",
  s:"Increasing an antipsychotic in catatonia can worsen it and may precipitate neuroleptic malignant syndrome. Seclusion is inappropriate for an immobile client, and immobility with posturing is not voluntary behavior."} },

{id:"PSY-050", t:"single", cn:"PSY", sys:"PSYCH", topic:"Conversion disorder nursing approach", d:3, b:0.55, cj:"generate", tags:["conversion disorder","somatic","therapeutic use of self"],
 stem:"A client develops sudden paralysis of the right arm after witnessing a motor vehicle collision. Neurological examination, imaging, and electrodiagnostic studies are all normal, and the client appears unconcerned about the loss of function.",
 opts:["Treat the paralysis as real to the client, avoid reinforcing it with excessive attention, and support the psychological treatment plan",
  "Tell the client directly that the paralysis is not real and will resolve on its own",
  "Request repeat imaging, because normal studies cannot explain a genuine motor deficit",
  "Arrange intensive one-to-one nursing attention each time the paralysis appears"],
 ans:0,
 rat:{c:"In functional neurological symptom disorder the deficit is experienced as real and is not under voluntary control. The nurse validates the experience without reinforcing it through attention, and directs care toward the underlying psychological stressor.",
  s:"Confronting the client that the paralysis is not real is both inaccurate and damaging to the relationship. Repeating an adequate workup reinforces the somatic focus, and intensive attention on each episode is exactly the reinforcement to avoid."} },

{id:"PSY-051", t:"single", cn:"PSY", sys:"PSYCH", topic:"Somatic symptom versus illness anxiety disorder", d:3, b:0.55, cj:"analyze", tags:["somatic symptom disorder","differential"],
 stem:"A client has sought care from six providers in 18 months for abdominal pain. Every diagnostic workup has been negative. The client spends hours each day researching symptoms, cancels work to attend appointments, and becomes angry when told the tests are normal.",
 opts:["The client experiences actual persistent symptoms, and the distress centers on the symptoms themselves",
  "The client fears having a serious disease despite the absence of significant symptoms",
  "The client intentionally produces symptoms in order to obtain prescription medication",
  "The client's symptoms resolve completely once the diagnostic workup is finished"],
 ans:0,
 rat:{c:"Somatic symptom disorder is defined by distressing symptoms that are genuinely experienced, with disproportionate thoughts and behavior around them. The absence of a medical explanation does not make the symptoms less real.",
  s:"Fear of serious disease without significant symptoms describes illness anxiety disorder. Intentional production of symptoms for external gain describes malingering, and neither accounts for persistent symptoms with this degree of functional impairment."} },

{id:"PSY-052", t:"single", cn:"PSY", sys:"PSYCH", topic:"Antidepressant discontinuation syndrome", d:2, b:0.45, cj:"analyze", tags:["SSRI","withdrawal","teaching"],
 stem:"A client who has taken sertraline for 14 months runs out of the medication and misses five days. The client now reports dizziness, electric shock sensations in the head, irritability, and flu-like symptoms, and asks whether the depression has returned.",
 opts:["Explain that abrupt cessation can cause a discontinuation syndrome, restart the medication as prescribed, and contact the prescriber",
  "Explain that the depression has returned and that a different antidepressant is needed",
  "Reassure the client that the sensations are unrelated to the medication and will pass",
  "Advise the client to remain off the medication, since stopping it is the eventual goal"],
 ans:0,
 rat:{c:"Dizziness, electric shock sensations, irritability, and flu-like symptoms within days of stopping an SSRI are discontinuation syndrome, not relapse. The medication is restarted and the prescriber contacted so any future taper is gradual.",
  s:"Attributing the symptoms to returning depression misreads the timeline, since relapse develops over weeks rather than days. Advising the client to stay off the medication prolongs the syndrome, and any discontinuation should be a supervised taper."} },

/* ---------------- Reduction of Risk Potential (4) ---------------- */

{id:"RRP-069", t:"single", cn:"RRP", sys:"HEME", topic:"Post-procedure care after bone marrow biopsy", d:2, b:0.45, cj:"act", tags:["bone marrow biopsy","hemostasis"],
 stem:"A client is scheduled for a bone marrow aspiration and biopsy from the posterior iliac crest to evaluate unexplained pancytopenia. The procedure has just been completed and a pressure dressing is in place.",
 opts:["Apply firm pressure to the site, then keep the client supine with pressure on the site to prevent bleeding",
  "Encourage ambulation as soon as the local anesthetic wears off",
  "Apply a warm compress to the site to promote absorption of any bleeding",
  "Position the client on the affected side to relieve pressure on the puncture site"],
 ans:0,
 rat:{c:"The posterior iliac crest is a vascular site and the client has pancytopenia, so bleeding risk is elevated. Firm direct pressure followed by lying supine on the site provides mechanical tamponade until hemostasis is secure.",
  s:"Early ambulation increases bleeding at a fresh puncture site. A warm compress vasodilates and promotes bleeding, and side-lying with the head elevated removes the pressure that is achieving hemostasis."} },

{id:"RRP-070", t:"single", cn:"RRP", sys:"HEME", topic:"Complications of massive transfusion", d:3, b:0.55, cj:"generate", tags:["massive transfusion","citrate","hypothermia"],
 stem:"A client with a ruptured abdominal aortic aneurysm receives 12 units of packed red blood cells over 90 minutes during a massive transfusion protocol. The ionized calcium is 0.88 mmol/L, the core temperature is 34.6°C, and the potassium is 5.9 mmol/L.",
 opts:["Calcium replacement, active warming, and cardiac monitoring, because citrate in stored blood chelates calcium and the load is cold and potassium-rich",
  "Increasing the rate of blood administration, because the low calcium reflects inadequate volume replacement",
  "Administering a loop diuretic to reduce the potassium and calcium load",
  "Stopping the transfusion, because the findings indicate a hemolytic transfusion reaction"],
 ans:0,
 rat:{c:"Massive transfusion delivers citrate, which chelates ionized calcium, along with a cold, potassium-rich product. The triad of hypocalcemia, hypothermia, and hyperkalemia is expected and is managed with calcium, active warming, and continuous cardiac monitoring.",
  s:"Speeding the transfusion worsens all three derangements. A loop diuretic does not correct citrate-induced hypocalcemia in a bleeding client, and these findings are the expected physiology of massive transfusion rather than a hemolytic reaction."} },

{id:"RRP-071", t:"single", cn:"RRP", sys:"GI", topic:"Closed-suction drain management", d:2, b:0.45, cj:"act", tags:["surgical drain","wound","output"],
 stem:"A client returns from abdominal surgery with a closed-suction Jackson-Pratt drain at the incision. The bulb is expanded and half full of serosanguineous drainage.",
 opts:["Compress the bulb fully before closing the cap, so that negative pressure is restored and the drain can collect fluid",
  "Empty the bulb and leave it expanded, so that gravity continues to drain the fluid",
  "Clamp the drain tubing until the output decreases to less than 30 mL per shift",
  "Irrigate the drain tubing with sterile saline to confirm that it is patent"],
 ans:0,
 rat:{c:"A closed-suction drain works by negative pressure created by compressing the bulb before sealing it. Emptying without recompressing converts it to a passive gravity drain and defeats its purpose.",
  s:"Leaving the bulb expanded abandons the suction mechanism. Clamping allows fluid to collect at the surgical site, and routine irrigation of a closed-suction drain is not done unless specifically ordered because it introduces infection risk."} },

{id:"RRP-072", t:"single", cn:"RRP", sys:"RESP", topic:"Teaching after bronchoscopy", d:2, b:0.45, cj:"generate", tags:["bronchoscopy","airway","teaching"],
 stem:"A client is scheduled for a bronchoscopy with bronchoalveolar lavage to evaluate a persistent infiltrate and asks what to expect afterward.",
 opts:["Nothing may be taken by mouth until the gag reflex returns, because the topical anesthetic leaves the airway unprotected",
  "A mild sore throat is expected, and fluids may be taken as soon as the client returns",
  "Coughing up a small amount of blood after the procedure requires immediate notification of the provider",
  "The voice will be hoarse for several weeks and this is an expected finding"],
 ans:0,
 rat:{c:"Topical anesthesia abolishes the protective gag reflex, so the client is at risk of aspiration until it returns. Nothing by mouth until then is the essential teaching point.",
  s:"Early fluids risk aspiration. A small amount of blood-tinged sputum is expected after lavage rather than an emergency, and hoarseness resolves within hours to a day, not weeks."} },

/* ---------------- Physiological Adaptation (4) ---------------- */

{id:"PAA-091", t:"single", cn:"PAA", sys:"REPI", topic:"Amniotic fluid embolism", d:3, b:0.55, cj:"recognize", tags:["obstetric emergency","DIC","respiratory failure"],
 stem:"A client in active labor suddenly becomes severely short of breath, hypotensive, and cyanotic, and begins bleeding from the intravenous site and the gums. Fetal monitoring shows prolonged decelerations.",
 opts:["Amniotic fluid embolism with disseminated intravascular coagulation, requiring immediate resuscitation and blood product support",
  "Uterine rupture, requiring immediate preparation for a cesarean birth",
  "Pulmonary embolism, requiring immediate anticoagulation with unfractionated heparin",
  "Septic shock, requiring blood cultures and broad-spectrum antibiotics"],
 ans:0,
 rat:{c:"Abrupt cardiorespiratory collapse in labor together with bleeding from puncture sites and mucous membranes is amniotic fluid embolism with consumptive coagulopathy. Care is supportive resuscitation, oxygenation, and aggressive blood product replacement.",
  s:"Uterine rupture presents with loss of fetal station and abdominal pain rather than mucosal bleeding. Anticoagulating a client in consumptive coagulopathy worsens the hemorrhage, and septic shock does not begin this abruptly with bleeding from intact sites."} },

{id:"PAA-092", t:"single", cn:"PAA", sys:"REPI", topic:"Shoulder dystocia management", d:3, b:0.55, cj:"prioritize", tags:["obstetric emergency","shoulder dystocia"],
 stem:"During a vaginal birth the fetal head delivers and then retracts against the perineum. The nurse recognizes this finding.",
 opts:["Call for help and assist with maneuvers that relieve the impacted shoulder, while avoiding fundal pressure",
  "Apply firm fundal pressure to push the fetus through the pelvis",
  "Continue maternal pushing efforts until the shoulders deliver spontaneously",
  "Prepare for an immediate cesarean birth, since the head has already delivered"],
 ans:0,
 rat:{c:"Head retraction against the perineum is the turtle sign of shoulder dystocia. Management is calling for help and performing maneuvers that free the impacted anterior shoulder, and fundal pressure is contraindicated because it further impacts the shoulder.",
  s:"Fundal pressure can rupture the uterus and worsen the impaction. Continued pushing without a maneuver delays relief of cord compression, and a cesarean birth cannot be performed once the head has delivered."} },

{id:"PAA-093", t:"single", cn:"PAA", sys:"REPI", topic:"Umbilical cord prolapse", d:3, b:0.55, cj:"prioritize", tags:["obstetric emergency","cord prolapse","fetal distress"],
 stem:"During a vaginal examination the nurse palpates a pulsating cord ahead of the presenting part, and the fetal heart rate drops to 80 beats per minute.",
 opts:["Relieve pressure on the cord with a gloved hand, place the client in knee-chest position, and prepare for an emergency cesarean birth",
  "Push the cord back into the uterus and continue monitoring the fetal heart rate",
  "Administer oxygen and reposition the client to the left side, then reassess",
  "Increase the oxytocin infusion to hasten delivery before the cord is compressed"],
 ans:0,
 rat:{c:"A prolapsed cord is compressed between the presenting part and the pelvis, cutting off fetal oxygen. The nurse manually elevates the presenting part off the cord, uses gravity to move the fetus away from the pelvis, and delivery is by emergency cesarean birth.",
  s:"The cord is never pushed back, because handling it causes vasospasm and worsens fetal compromise. Oxygen and lateral positioning do not relieve the mechanical compression, and oxytocin drives the presenting part down onto the cord."} },

{id:"PAA-094", t:"single", cn:"PAA", sys:"REPI", topic:"Uterine rupture during labor", d:3, b:0.55, cj:"recognize", tags:["obstetric emergency","uterine rupture","VBAC"],
 stem:"A client with a previous cesarean birth is in labor on oxytocin. The client reports sudden severe abdominal pain that persists between contractions, the fetal heart rate becomes nonreassuring, and the nurse can no longer palpate the presenting part at the same station.",
 opts:["Uterine rupture, requiring immediate discontinuation of the oxytocin and preparation for an emergency cesarean birth",
  "Placental abruption, requiring immediate vaginal birth rather than a repeat cesarean",
  "Normal transition-phase labor pain, requiring continued oxytocin and comfort measures",
  "Chorioamnionitis, requiring blood cultures and broad-spectrum antibiotics"],
 ans:0,
 rat:{c:"In a client with a uterine scar, sudden pain between contractions with a nonreassuring fetal heart rate and loss of fetal station is uterine rupture until proven otherwise. Oxytocin is stopped immediately and delivery is by emergency cesarean birth.",
  s:"Abruption presents with a rigid tender uterus and vaginal bleeding rather than loss of station. Continuing oxytocin in a rupturing uterus is dangerous, and chorioamnionitis develops with fever over hours rather than abruptly with loss of station."} }
  );
})();
