/* Wave 19 — 20 hand-authored hard RN items.
 * Every blueprint area is now within about half a point of its target
 * share, so wave 19 is aimed at difficulty rather than volume. Health
 * Promotion (56% hard), Basic Care (60%) and Safety (64%) are the three
 * softest areas and take twelve of the twenty items.
 * Every item is d>=2; 15 of the 20 are d=3.
 *
 * Every topic was verified free with scripts/scan-topics.sh using
 * distinctive single terms, not phrase patterns.
 *
 * Safety              : SIC-093 – SIC-096
 * Basic Care/Comfort  : BCC-069 – BCC-072
 * Health Promotion    : HPM-071 – HPM-074
 * Management of Care  : MOC-123 – MOC-125
 * Reduction of Risk   : RRP-093 – RRP-095
 * Psychosocial        : PSY-063 – PSY-064
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Safety and Infection Control (4) ---------------- */

{id:"SIC-093", t:"single", cn:"SIC", sys:"INF", topic:"Contact precautions for VRE", d:3, b:0.55, cj:"act", tags:["VRE","contact precautions","environmental persistence"],
 stem:"A client is admitted from a long-term care facility with a wound culture growing vancomycin-resistant Enterococcus. What should the nurse implement?",
 opts:["Contact precautions with gown and gloves for room entry, dedicated equipment, and an emphasis on hand hygiene because the organism survives on surfaces for long periods",
  "Standard precautions only, since the organism is resistant to antibiotics rather than more easily transmitted",
  "Airborne precautions in a negative-pressure room, since resistant organisms become airborne",
  "Droplet precautions with a surgical mask, since the organism spreads in respiratory droplets"],
 ans:0,
 rat:{c:"Antibiotic resistance changes treatment, not the route of transmission. Enterococcus spreads by contact and persists for long periods on surfaces and equipment, so contact precautions, dedicated or disinfected equipment, and rigorous hand hygiene are what interrupt spread.",
  s:"Standard precautions alone leave the main route unaddressed. Resistance has no bearing on airborne or droplet transmission, and Enterococcus is not a respiratory pathogen requiring a mask for room entry."} },

{id:"SIC-094", t:"single", cn:"SIC", sys:"INTG", topic:"Bed bug infestation on an inpatient unit", d:2, b:0.45, cj:"act", tags:["bed bugs","infestation","environmental control"],
 stem:"A client is found to have bed bugs in their clothing and linear bites on the arms at admission. What should the nurse do?",
 opts:["Bag the client's belongings for heat treatment or laundering, notify the facility so the area can be treated, and continue standard precautions",
  "Place the client in contact precautions with gown and gloves, since bed bugs are an infection risk",
  "Apply insecticide directly to the client's skin to kill any remaining bugs",
  "Discard all of the client's belongings immediately to eliminate the source"],
 ans:0,
 rat:{c:"Bed bugs are a nuisance and an environmental problem rather than a vector of infection, so standard precautions apply. Control is by heat treatment or hot laundering of belongings and professional treatment of the environment, coordinated through the facility.",
  s:"Bed bugs do not transmit disease, so contact precautions are unnecessary. Pesticides are not applied to skin, and destroying a client's property is neither required nor acceptable when heat treatment works."} },

{id:"SIC-095", t:"single", cn:"SIC", sys:"INF", topic:"Construction dust and immunocompromised clients", d:3, b:0.55, cj:"prioritize", tags:["construction","invasive mold","immunocompromise"],
 stem:"Renovation work producing dust is scheduled on the corridor outside a unit that houses clients with profound neutropenia. What is the nurse's priority action?",
 opts:["Raise the concern before work begins so barriers, negative pressure, and sealing can be arranged, because airborne mold spores are a serious threat to these clients",
  "Proceed, since the work is outside the client rooms and dust will not reach them",
  "Move the clients to another unit only on the days when the work is loudest",
  "Ask the workers to dampen the dust, which is sufficient protection for neutropenic clients"],
 ans:0,
 rat:{c:"Construction and renovation aerosolize fungal spores that can cause invasive mold infection in profoundly neutropenic clients, who cannot mount a defence. Prevention requires advance planning with barriers, containment, and ventilation control rather than reactive measures.",
  s:"Dust travels through corridors and ventilation, so distance alone is not protection. Noise is not the hazard, and dampening dust is a construction practice rather than adequate protection for this population."} },

{id:"SIC-096", t:"single", cn:"SIC", sys:"INF", topic:"Surgical hand antisepsis", d:3, b:0.55, cj:"act", tags:["surgical hand antisepsis","asepsis","scrub technique"],
 stem:"A nurse is performing surgical hand antisepsis before a sterile procedure. What is correct?",
 opts:["Scrub the nails, hands, and forearms for the duration the product specifies, keep the hands above the elbows, and dry with a sterile towel before gowning",
  "Scrub the hands only, since the forearms remain covered by the sterile gown",
  "Keep the hands below the elbows so water runs off the fingertips and away from the body",
  "Dry the hands with a paper towel from the clean supply, since any dry towel is acceptable"],
 ans:0,
 rat:{c:"Surgical hand antisepsis covers the nails, hands, and forearms for the manufacturer-specified duration. Hands are held above the elbows so water runs from cleaner to less clean areas, and only a sterile towel is used before donning sterile attire.",
  s:"The forearms are part of the surgical field and must be scrubbed. Letting water run from the elbows toward the hands carries contamination back onto the cleaned skin, and a non-sterile towel recontaminates the field."} },

/* ---------------- Basic Care and Comfort (4) ---------------- */

{id:"BCC-069", t:"single", cn:"BCC", sys:"INTG", topic:"Skin tears in fragile skin", d:3, b:0.55, cj:"generate", tags:["skin tear","fragile skin","older adult"],
 stem:"An 84-year-old client sustains a skin tear on the forearm while being repositioned. What should the nurse include in the plan to prevent recurrence?",
 opts:["Use a lift sheet or slide sheet to move the client, protect the arms with sleeves or soft dressings, and avoid adhesive tape on fragile skin",
  "Reposition less often, since movement is what caused the tear",
  "Apply adhesive tape over a protective dressing to keep it secure during turns",
  "Massage the forearms daily to strengthen the skin against shearing forces"],
 ans:0,
 rat:{c:"Skin tears occur when friction or shear separates fragile dermal layers. Reducing shear with a lift sheet, covering vulnerable skin, and avoiding adhesives address the mechanism directly.",
  s:"Reducing repositioning trades a skin tear for a pressure injury. Adhesive removes the outer skin layer on removal and is a common cause of tears, and massage damages fragile tissue rather than strengthening it."} },

{id:"BCC-070", t:"single", cn:"BCC", sys:"MSK", topic:"Lateral transfer with a transfer board", d:2, b:0.45, cj:"act", tags:["transfer board","safe handling","mobility"],
 stem:"A nurse is transferring a client from a bed to a stretcher using a transfer board. What technique protects both the client and the nurse?",
 opts:["Bridge the gap with the board under the client's hips and back, keep the surfaces at equal height, and move the client with a smooth lateral slide rather than lifting",
  "Raise the bed well above the stretcher so gravity slides the client across",
  "Place the board only under the shoulders, since the legs can be lifted separately",
  "Have the nurse lean forward and pull the client across in one motion"],
 ans:0,
 rat:{c:"A transfer board works by eliminating the lift. Equal surface heights and a board spanning the gap under the trunk let the client be slid with minimal friction, which protects the client's skin and the nurse's back.",
  s:"A height difference causes an uncontrolled slide and a fall risk. Supporting only the shoulders lets the trunk sag across the gap, and leaning and pulling is exactly the body mechanics that injures nurses."} },

{id:"BCC-071", t:"single", cn:"BCC", sys:"MSK", topic:"Caring for a client in a cervical collar", d:3, b:0.55, cj:"act", tags:["cervical collar","immobilization","skin integrity"],
 stem:"A client is wearing a rigid cervical collar after a motor vehicle crash. What is an essential nursing intervention?",
 opts:["Inspect the skin under the collar at scheduled intervals without removing it unless authorised, and keep the collar clean, dry, and correctly sized",
  "Remove the collar during meals so the client can eat and swallow comfortably",
  "Loosen the collar by one finger width if the client reports pressure at the jaw",
  "Apply powder under the collar to absorb moisture and reduce friction"],
 ans:0,
 rat:{c:"The collar maintains cervical alignment, so it is removed only when authorised and with the neck supported. Skin under the collar is at high risk for pressure injury, so scheduled inspection and a clean, dry, correctly fitted collar are essential.",
  s:"Removing the collar for meals risks displacement of an unstable injury. Loosening it independently compromises immobilization, and powder cakes with moisture, increasing rather than reducing skin damage."} },

{id:"BCC-072", t:"single", cn:"BCC", sys:"INTG", topic:"Safe bathing for a client with reduced sensation", d:2, b:0.45, cj:"act", tags:["bathing","safety","sensory loss"],
 stem:"A nurse is preparing a bath for an older adult client with peripheral neuropathy and reduced temperature sensation. What precaution applies?",
 opts:["Check the water temperature with a thermometer or the nurse's own elbow before the client is placed in it, keeping it warm rather than hot",
  "Let the client judge the temperature with a hand, since that is the most reliable check",
  "Use hot water, since warmth improves circulation in neuropathic limbs",
  "Add bath oil to the water, since it protects the skin from the heat"],
 ans:0,
 rat:{c:"Reduced temperature sensation removes the client's protection against scalding, so the nurse verifies the temperature independently, typically with a thermometer or the elbow, and keeps the water warm rather than hot.",
  s:"A client with neuropathy cannot reliably judge heat, which is precisely the problem. Hot water increases burn risk, and bath oil changes slip risk and skin condition without affecting burn risk."} },

/* ---------------- Health Promotion and Maintenance (4) ---------------- */

{id:"HPM-071", t:"single", cn:"HPM", sys:"INTG", topic:"Health literacy and plain language", d:3, b:0.55, cj:"generate", tags:["health literacy","teaching","communication"],
 stem:"A client with limited health literacy is being discharged on a new anticoagulant. What teaching approach is most effective?",
 opts:["Use plain language and short sentences, show exactly which pill to take, and ask the client to describe the plan back in their own words",
  "Provide the written package insert, since it is the authoritative and complete source",
  "Speak more slowly and raise the voice, since difficulty understanding reflects difficulty hearing",
  "Direct all teaching to the family member who accompanied the client, since they will manage the medication"],
 ans:0,
 rat:{c:"Limited health literacy affects the ability to process and act on health information, so plain language, concrete demonstration, and teach-back confirm understanding. Teach-back reveals misunderstanding that polite agreement conceals.",
  s:"A package insert is written at a high reading level and lists rather than prioritizes. Slower, louder speech addresses hearing rather than comprehension, and excluding the client from their own teaching removes the person who must recognize danger signs."} },

{id:"HPM-072", t:"single", cn:"HPM", sys:"ENDO", topic:"Growth chart percentile crossing", d:3, b:0.55, cj:"evaluate", tags:["growth chart","pediatric","growth monitoring"],
 stem:"An 18-month-old child has moved from the 50th to the 10th percentile for weight over four months while remaining at the 50th percentile for length. How should the nurse interpret this?",
 opts:["This crossing of percentiles is abnormal and requires evaluation, because failure to gain weight relative to length suggests an underlying problem",
  "This is normal variation, since children commonly move across several percentiles in the second year",
  "This is reassuring, since the child remains within the normal range for both weight and length",
  "This reflects measurement error, so the child should simply be reweighed at the next visit"],
 ans:0,
 rat:{c:"A sustained fall across two or more major percentile lines, especially when length is preserved, signals faltering weight gain that warrants investigation into intake, absorption, metabolism, and psychosocial factors. The trend matters more than a single value.",
  s:"Movement across several percentiles is not typical, and preserving the 50th percentile for length while weight falls points to a nutritional or medical cause. Remaining within the range is not the same as following the child's curve, and attributing a four-month trend to measurement error delays assessment."} },

{id:"HPM-073", t:"single", cn:"HPM", sys:"REPI", topic:"Genetic testing for a hereditary cancer risk", d:3, b:0.55, cj:"act", tags:["genetic testing","BRCA","informed consent"],
 stem:"A client with several relatives who had breast cancer asks for genetic testing. What should the nurse do first?",
 opts:["Arrange genetic counseling before testing, since the client needs to understand the implications for themselves and for relatives before consenting",
  "Order the genetic test directly, since the family history makes the indication clear and counseling can follow the result",
  "Advise against testing, since a positive result would cause unavoidable anxiety without changing management",
  "Test the client's relatives first, since a positive result in a relative confirms the familial variant"],
 ans:0,
 rat:{c:"Genetic testing carries implications for the client's own surveillance and treatment and for the risk information revealed about blood relatives. Genetic counseling before testing supports informed consent and prepares the client for possible outcomes, including a result of uncertain significance.",
  s:"Testing without counseling risks consent that is not informed. A positive result does change management through surveillance and prevention options, and testing relatives first bypasses the client's own decision-making and consent."} },

{id:"HPM-074", t:"single", cn:"HPM", sys:"NEURO", topic:"Benign paroxysmal positional vertigo", d:2, b:0.45, cj:"analyze", tags:["BPPV","vertigo","repositioning maneuver"],
 stem:"A client reports brief episodes of spinning that occur only when rolling over in bed or looking upward, each lasting under a minute, with no hearing loss or tinnitus. What does the nurse recognize?",
 opts:["Benign paroxysmal positional vertigo, which is provoked by head position and treated with a canalith repositioning maneuver",
  "Meniere disease, since vertigo is the defining feature of that condition",
  "A posterior circulation stroke, since vertigo in an adult is a red flag for ischemia",
  "Vestibular neuritis, since vertigo lasting under a minute indicates inflammation of the nerve"],
 ans:0,
 rat:{c:"Brief positional vertigo lasting seconds, triggered by specific head movements, without auditory symptoms, is characteristic of benign paroxysmal positional vertigo from displaced otoconia. Canalith repositioning maneuvers move the particles back and usually resolve it.",
  s:"Meniere disease causes longer episodes with hearing loss, tinnitus, and fullness. Stroke-related vertigo is not reliably positional and typically carries other neurologic signs, and vestibular neuritis produces continuous vertigo over days rather than seconds-long positional spells."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-123", t:"single", cn:"MOC", sys:"INTG", topic:"Making a late entry in the record", d:3, b:0.55, cj:"act", tags:["documentation","late entry","legal record"],
 stem:"A nurse realizes at the end of a shift that a medication given six hours earlier was never documented. What should the nurse do?",
 opts:["Make a late entry, clearly labelled as such with the actual time of administration and the time of the entry, following facility policy",
  "Document it with the original administration time so the record appears complete and timely",
  "Leave it undocumented, since adding it now would make the record look inaccurate",
  "Ask a colleague to document it, since they were present when the dose was given"],
 ans:0,
 rat:{c:"The record must be complete and honest. A late entry is the accepted way to add missing information: it states what happened, when it happened, and when the entry was made, which preserves both accuracy and integrity.",
  s:"Backdating falsifies the legal record. Omitting a given dose leaves the next clinician without essential information, and another nurse cannot accurately record care they did not personally give or verify."} },

{id:"MOC-124", t:"single", cn:"MOC", sys:"PSYCH", topic:"Respite care for a family caregiver", d:3, b:0.55, cj:"generate", tags:["caregiver support","respite care","continuity"],
 stem:"A client's adult daughter has provided full-time care for two years without a break and now reports exhaustion, irritability, and frequent illness. What should the nurse recommend?",
 opts:["Respite care, which provides scheduled temporary relief so the caregiver can rest while the client continues to receive safe care",
  "Continuing as she is, since changing caregivers would be disruptive for the client",
  "Permanent nursing home placement, since caregiver exhaustion indicates that home care has failed",
  "A stimulant medication, since fatigue is the main problem to treat"],
 ans:0,
 rat:{c:"Caregiver strain is common, predictable, and harmful to both parties. Respite care gives the caregiver genuine rest while maintaining continuity of care for the client, and it is the intervention that sustains the home arrangement rather than ending it.",
  s:"Disruption is manageable and preferable to caregiver collapse. Exhaustion signals a need for support, not automatic institutional placement, and medication does not address a structural absence of rest."} },

{id:"MOC-125", t:"single", cn:"MOC", sys:"INF", topic:"Scope of practice and institutional privileges", d:3, b:0.55, cj:"analyze", tags:["scope of practice","privileging","accountability"],
 stem:"A nurse is asked to perform a procedure that falls within the nursing scope of practice in the state but that the employing facility has not authorized the nurse to perform. What should the nurse do?",
 opts:["Decline until the facility grants the specific privilege, because both state scope and institutional authorization are required",
  "Perform the procedure, since state scope of practice is the only binding limit",
  "Perform the procedure only if a colleague supervises, since supervision substitutes for authorization",
  "Decline and refuse to learn the procedure, since the facility's restriction is permanent"],
 ans:0,
 rat:{c:"Legal authority to practise and institutional permission to perform a specific procedure are separate requirements, and both must be met. Facility privileging reflects verified competency, available resources, and organizational accountability.",
  s:"State scope alone does not authorize a specific task in a specific setting. Supervision does not substitute for authorization or verified competency, and institutional restrictions can be revisited through training and privileging rather than treated as permanent."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-093", t:"single", cn:"RRP", sys:"HEME", topic:"Direct antiglobulin test after a transfusion reaction", d:3, b:0.55, cj:"analyze", tags:["direct Coombs test","hemolytic reaction","transfusion"],
 stem:"A client develops fever, flank pain, and dark urine during a red cell transfusion. The transfusion is stopped and blood is sent to the laboratory. What does a direct antiglobulin test determine?",
 opts:["Whether the client's red cells are coated with antibody, which supports immune-mediated hemolysis of the transfused cells",
  "Whether the client has developed new alloantibodies that will affect future transfusions",
  "Whether the donated unit was bacterially contaminated",
  "Whether the client's hemoglobin has fallen below the transfusion threshold"],
 ans:0,
 rat:{c:"The direct antiglobulin test detects antibody or complement bound to red cells in vivo. A positive result after a transfusion supports immune-mediated hemolysis of transfused cells, which together with the clinical picture confirms an acute hemolytic reaction.",
  s:"Detecting new alloantibodies in the plasma is the role of the antibody screen rather than the direct test. Bacterial contamination is identified by culture, and hemoglobin concentration does not establish the mechanism of the reaction."} },

{id:"RRP-094", t:"single", cn:"RRP", sys:"HEME", topic:"Type and screen versus crossmatch", d:3, b:0.55, cj:"analyze", tags:["type and screen","crossmatch","blood banking"],
 stem:"A client is scheduled for surgery with a low but nonzero risk of bleeding, and the provider orders a type and screen rather than a full crossmatch. What does the nurse understand?",
 opts:["The laboratory has determined the blood type and checked for antibodies, so compatible units can be crossmatched quickly if bleeding actually occurs",
  "Compatible units are already reserved and held for this client in case of bleeding",
  "No compatibility testing has been done, so transfusion would be delayed by several hours",
  "The client will receive uncrossmatched group O blood automatically"],
 ans:0,
 rat:{c:"A type and screen establishes ABO and Rh type and looks for unexpected antibodies. When the screen is negative, crossmatching a unit takes only minutes, which is an efficient way to prepare for a procedure where transfusion is possible but not expected.",
  s:"No units are reserved with a type and screen, which is precisely what distinguishes it from a crossmatch. The testing done is substantial rather than absent, and group O uncrossmatched blood is reserved for emergencies rather than planned surgery."} },

{id:"RRP-095", t:"single", cn:"RRP", sys:"HEME", topic:"Monitoring during plasma exchange", d:3, b:0.55, cj:"evaluate", tags:["plasmapheresis","citrate","hypocalcemia"],
 stem:"A client undergoing therapeutic plasma exchange with citrate anticoagulation reports tingling around the mouth and in the fingertips. What should the nurse do?",
 opts:["Report it promptly and anticipate calcium replacement, because citrate binds calcium and produces symptomatic hypocalcemia",
  "Reassure the client, since tingling is an expected and harmless effect of the procedure",
  "Stop the procedure permanently, since tingling indicates an allergic reaction to the replacement fluid",
  "Increase the flow rate, since faster exchange clears the citrate more quickly"],
 ans:0,
 rat:{c:"Citrate anticoagulates by chelating calcium, so ionized calcium falls during plasma exchange and produces perioral and extremity paresthesia. The response is to slow the procedure and replace calcium, with monitoring for progression to tetany or arrhythmia.",
  s:"Paresthesia is a warning sign of falling ionized calcium rather than a benign effect. It is not an allergic reaction, and increasing the flow rate delivers more citrate, worsening the hypocalcemia."} },

/* ---------------- Psychosocial Integrity (2) ---------------- */

{id:"PSY-063", t:"single", cn:"PSY", sys:"PSYCH", topic:"Psychiatric advance directive", d:3, b:0.55, cj:"analyze", tags:["psychiatric advance directive","autonomy","crisis planning"],
 stem:"A client with recurrent bipolar disorder completes a psychiatric advance directive while well, naming preferred medications, facilities to avoid, and a surrogate decision-maker. What is the value of this document?",
 opts:["It records the client's treatment preferences for use during a future episode when capacity may be impaired, supporting autonomy at the moment it is most at risk",
  "It removes the need for any clinical assessment during a future crisis, since the document is binding in every circumstance",
  "It allows the surrogate to override the client's current wishes once the document exists",
  "It applies only to physical health decisions, since psychiatric treatment cannot be directed in advance"],
 ans:0,
 rat:{c:"A psychiatric advance directive is completed when the client has capacity and takes effect when capacity is impaired, which is exactly when preferences would otherwise be lost. It guides the team and the surrogate toward the client's own stated wishes.",
  s:"Clinical judgment is still required, and directives can be overridden in defined emergency or safety circumstances. A surrogate acts on the client's known preferences rather than replacing current wishes, and psychiatric directives are recognized specifically for mental health treatment."} },

{id:"PSY-064", t:"single", cn:"PSY", sys:"PSYCH", topic:"Intermittent explosive disorder", d:3, b:0.55, cj:"analyze", tags:["intermittent explosive disorder","impulse control","differential"],
 stem:"A client has repeated episodes of shouting, throwing objects, and physical aggression, each lasting under thirty minutes and grossly out of proportion to the trigger. Between episodes the client is remorseful and has no other mood or psychotic symptoms. What does the nurse recognize?",
 opts:["Intermittent explosive disorder, characterized by recurrent impulsive aggressive outbursts disproportionate to the stressor with remorse afterward",
  "Bipolar disorder, since episodic aggression indicates a mood disorder",
  "Antisocial personality disorder, since aggression toward others is the defining feature",
  "Conduct disorder, since repeated aggression meets that diagnostic threshold"],
 ans:0,
 rat:{c:"Intermittent explosive disorder involves recurrent impulsive aggressive outbursts that are grossly out of proportion to the precipitant, are not premeditated, and are followed by distress or remorse. The absence of persistent mood or psychotic symptoms distinguishes it from other causes.",
  s:"Bipolar disorder requires distinct mood episodes with other criteria rather than brief isolated outbursts. Antisocial personality disorder requires a pervasive pattern beginning in adolescence with disregard for others, and conduct disorder is diagnosed in children and adolescents rather than applying here."} }
  );
})();
