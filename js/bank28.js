/* Wave 18 — 20 hand-authored hard RN items.
 * Psychosocial Integrity is furthest under its blueprint share at 8.9%
 * against 9%, and Health Promotion and Basic Care are the two softest areas
 * on difficulty at 53% and 58% hard, so wave 18 leads with those three.
 * Every item is d>=2; 17 of the 20 are d=3.
 *
 * Every topic was re-checked with scripts/scan-topics.sh using distinctive
 * single terms. Fourteen phrase-pattern "FREE" results from the first scan
 * were rejected on re-check, including sterile field, tracheostomy,
 * pacemaker, pneumococcal and electroencephalogram topics.
 *
 * Psychosocial        : PSY-058 – PSY-062
 * Health Promotion    : HPM-067 – HPM-070
 * Basic Care/Comfort  : BCC-066 – BCC-068
 * Management of Care  : MOC-120 – MOC-122
 * Safety              : SIC-091 – SIC-092
 * Reduction of Risk   : RRP-090 – RRP-092
 */
(function () {
  "use strict";
  var BANK = (typeof window !== "undefined" ? window : globalThis).NC.BANK;

  BANK.push(
/* ---------------- Psychosocial Integrity (5) ---------------- */

{id:"PSY-058", t:"single", cn:"PSY", sys:"PSYCH", topic:"Schizoaffective disorder distinguished from schizophrenia", d:3, b:0.55, cj:"analyze", tags:["schizoaffective disorder","differential diagnosis","psychosis"],
 stem:"A client has had continuous hallucinations and delusions for six months. During that period there were also two months of a full manic episode, and there were three weeks of psychotic symptoms with no mood symptoms at all. What does the nurse recognize?",
 opts:["Schizoaffective disorder, because a major mood episode is present for a substantial part of the illness alongside psychosis that also occurs without mood symptoms",
  "Schizophrenia, because psychotic symptoms have lasted more than six months",
  "Bipolar I disorder with psychotic features, because a manic episode occurred",
  "Delusional disorder, because the delusions are persistent and organized"],
 ans:0,
 rat:{c:"Schizoaffective disorder requires a major mood episode concurrent with active psychotic symptoms, plus at least two weeks of delusions or hallucinations without prominent mood symptoms, and mood symptoms present for the majority of the illness. That combination separates it from schizophrenia and from a mood disorder with psychotic features.",
  s:"Schizophrenia requires mood episodes to be brief relative to the total duration of illness. In bipolar disorder with psychotic features the psychosis occurs only during mood episodes, whereas here it persisted independently. Delusional disorder lacks the prominent hallucinations and the mood episodes described."} },

{id:"PSY-059", t:"single", cn:"PSY", sys:"PSYCH", topic:"Rash during lamotrigine titration", d:3, b:0.55, cj:"prioritize", tags:["lamotrigine","Stevens-Johnson syndrome","medication safety"],
 stem:"A client starting lamotrigine for bipolar disorder reports a new rash on the trunk ten days after the first dose. What should the nurse do?",
 opts:["Advise holding the dose and seek same-day medical evaluation, because a rash during titration can signal a life-threatening cutaneous reaction",
  "Reassure the client, since a mild rash is expected during the first weeks of therapy",
  "Suggest an antihistamine and continue the dose, since the rash is usually allergic rather than serious",
  "Double the dose to reach a therapeutic level faster and stop the progression"],
 ans:0,
 rat:{c:"Lamotrigine carries a risk of Stevens-Johnson syndrome and toxic epidermal necrolysis, which begin as a nonspecific rash, usually within the first weeks. Slow titration reduces but does not eliminate that risk, so any new rash requires prompt evaluation and usually discontinuation.",
  s:"A new rash on this medication is never simply expected, and continuing the drug risks progression to a life-threatening reaction. Antihistamines do not treat a severe cutaneous adverse reaction, and increasing the dose sharply raises the risk."} },

{id:"PSY-060", t:"single", cn:"PSY", sys:"PSYCH", topic:"Dialectical behavior therapy for borderline personality disorder", d:3, b:0.55, cj:"analyze", tags:["dialectical behavior therapy","borderline personality disorder","skills training"],
 stem:"A client with borderline personality disorder is admitted after self-harm and is referred for dialectical behavior therapy. What does the nurse understand about this treatment?",
 opts:["It teaches distress tolerance, emotion regulation, and interpersonal effectiveness, with coaching between sessions to apply the skills in real crises",
  "It works mainly by uncovering childhood trauma through free association over several years",
  "It relies on exposure to feared situations until anxiety habituates",
  "It focuses on identifying cognitive distortions and testing them with behavioral experiments"],
 ans:0,
 rat:{c:"Dialectical behavior therapy is a structured, skills-based treatment developed for borderline personality disorder and chronic self-harm. Its modules are mindfulness, distress tolerance, emotion regulation, and interpersonal effectiveness, and between-session coaching supports applying skills during an actual crisis.",
  s:"Free association over years describes psychoanalysis, which is not the indicated treatment here. Exposure with habituation is the mechanism of exposure therapy for anxiety disorders, and cognitive restructuring with behavioral experiments is cognitive behavioral therapy rather than this skills model."} },

{id:"PSY-061", t:"single", cn:"PSY", sys:"PSYCH", topic:"School refusal driven by separation anxiety", d:3, b:0.55, cj:"prioritize", tags:["separation anxiety","school refusal","pediatric"],
 stem:"A 7-year-old has refused school for three weeks, clinging to a parent and reporting stomach pain that resolves on weekends. Medical evaluation is normal. What is the priority nursing intervention?",
 opts:["Support a prompt, consistent return to school with a planned brief goodbye, since prolonged absence reinforces the avoidance",
  "Allow the child to stay home until the anxiety resolves on its own",
  "Advise the parent to leave without telling the child, to avoid a distressing goodbye",
  "Recommend home tutoring indefinitely, since the school environment is the trigger"],
 ans:0,
 rat:{c:"School refusal driven by separation anxiety is maintained by avoidance, so the priority is a rapid, predictable return with a brief planned goodbye and coordination between family, school, and clinician. Prolonged absence makes return harder and consolidates the pattern.",
  s:"Waiting for spontaneous resolution allows avoidance to strengthen. Leaving without saying goodbye damages trust and typically escalates anxiety. Indefinite home tutoring removes the exposure needed for recovery and entrenches the avoidance."} },

{id:"PSY-062", t:"single", cn:"PSY", sys:"PSYCH", topic:"Sleep terrors distinguished from nightmares", d:3, b:0.55, cj:"recognize", tags:["parasomnia","sleep terror","pediatric"],
 stem:"A parent reports that their 6-year-old screams and thrashes about two hours after falling asleep, cannot be comforted, and remembers nothing in the morning. What should the nurse explain?",
 opts:["This is a sleep terror arising from deep non-REM sleep, so the child is not dreaming, cannot be consoled, and will not recall the episode",
  "This is a nightmare, so the child should be able to describe the dream on waking",
  "This indicates a seizure disorder, so an electroencephalogram is the first step",
  "This reflects deliberate attention seeking, so the parent cannot fix it by giving in"],
 ans:0,
 rat:{c:"Sleep terrors occur in the first third of the night during deep non-REM sleep. The child appears terrified but is not awake, resists comfort, and has no dream narrative or memory, which distinguishes them from nightmares that occur in REM sleep with recall.",
  s:"Nightmares occur later in the night during REM sleep and are remembered. The stereotyped timing and absent recall make a seizure less likely than a parasomnia, so that is not the first investigation. The behavior is involuntary, so ignoring it misreads a genuine parasomnia."} },

/* ---------------- Health Promotion and Maintenance (4) ---------------- */

{id:"HPM-067", t:"single", cn:"HPM", sys:"INTG", topic:"Interpreting a Braden scale score", d:3, b:0.55, cj:"evaluate", tags:["Braden scale","pressure injury","risk assessment"],
 stem:"A nurse scores an older adult admitted after a stroke at 12 on the Braden scale. What does this indicate?",
 opts:["High risk for pressure injury, so a prevention plan with repositioning, support surfaces, and skin inspection should begin now",
  "No risk, since only scores below 10 require intervention",
  "Low risk, since the scale measures fall potential rather than skin integrity",
  "Existing pressure injury, since the scale stages wounds numerically"],
 ans:0,
 rat:{c:"The Braden scale rates sensory perception, moisture, activity, mobility, nutrition, and friction and shear, with lower scores indicating greater risk. A score of 12 falls in the high-risk range, so prevention starts immediately rather than waiting for skin breakdown.",
  s:"There is no threshold below which risk disappears, and 12 is not a safe score. The scale measures pressure injury risk rather than falls, and it is a risk tool rather than a wound staging instrument."} },

{id:"HPM-068", t:"single", cn:"HPM", sys:"NEURO", topic:"Recognizing postoperative delirium", d:3, b:0.55, cj:"recognize", tags:["delirium","screening","older adult"],
 stem:"An older adult two days after hip surgery becomes inattentive, disorganized in thinking, and more confused in the evening than in the morning. What should the nurse do?",
 opts:["Screen for delirium with a validated tool and investigate causes such as infection, hypoxia, medications, and pain",
  "Document it as expected postoperative disorientation and continue routine monitoring",
  "Request a sedative at bedtime, since the confusion is worse in the evening",
  "Refer for dementia testing, since the change indicates a neurodegenerative process"],
 ans:0,
 rat:{c:"Acute onset, inattention, disorganized thinking, and a fluctuating course are the defining features of delirium, which is a medical emergency with a usually reversible cause. A validated screen prompts a search for infection, hypoxia, medications, pain, and metabolic derangement.",
  s:"Acute fluctuating confusion is never expected after surgery, and treating it as normal delays finding the cause. Sedatives usually worsen delirium, and dementia develops gradually rather than over two days."} },

{id:"HPM-069", t:"single", cn:"HPM", sys:"CV", topic:"Cuff size and blood pressure accuracy", d:3, b:0.55, cj:"evaluate", tags:["blood pressure measurement","cuff size","accuracy"],
 stem:"A nurse measures the blood pressure of a client with a large upper arm using a standard adult cuff. How should the nurse interpret the reading?",
 opts:["It is likely falsely high, because a cuff that is too small for the arm overestimates the pressure",
  "It is likely falsely low, because the cuff cannot compress the artery fully",
  "It is accurate, since all validated cuffs give equivalent blood pressure readings",
  "It is accurate only if the client's arm is supported at waist level"],
 ans:0,
 rat:{c:"The cuff bladder must match arm circumference. A cuff that is too small requires greater inflation pressure to occlude the artery and produces a falsely elevated reading, which can lead to over-treatment. A cuff that is too large reads falsely low.",
  s:"An undersized cuff does not fail to compress the artery; it transmits excess pressure. Cuff size materially changes the result, and the arm must be supported at heart level rather than waist level."} },

{id:"HPM-070", t:"single", cn:"HPM", sys:"REPI", topic:"Human papillomavirus vaccination after adolescence", d:3, b:0.55, cj:"analyze", tags:["HPV vaccine","catch-up vaccination","shared decision making"],
 stem:"A 27-year-old client who was not vaccinated as an adolescent asks whether the human papillomavirus vaccine is still worthwhile. What is the nurse's accurate response?",
 opts:["Yes, vaccination is routinely recommended through age 26 and may be considered up to age 45 through shared decision making, since it still protects against types not yet encountered",
  "No, the vaccine is only effective if it is given before age 12",
  "No, vaccination after sexual debut still provides no benefit at all",
  "Yes, but only if the client first tests positive for a high-risk type"],
 ans:0,
 rat:{c:"Routine vaccination is recommended at 11 to 12 years with catch-up through 26. Adults 27 to 45 may be vaccinated through shared clinical decision making, because the vaccine is most effective before exposure but still protects against types the client has not acquired.",
  s:"Effectiveness is greatest before exposure but is not confined to early adolescence, and prior sexual activity does not eliminate benefit. Testing is not a prerequisite and would not change the recommendation for the types still unacquired."} },

/* ---------------- Basic Care and Comfort (3) ---------------- */

{id:"BCC-066", t:"single", cn:"BCC", sys:"MSK", topic:"Z-track technique for an irritating injection", d:2, b:0.45, cj:"act", tags:["Z-track","intramuscular injection","technique"],
 stem:"A nurse is preparing to give an intramuscular injection of an irritating medication. What technique reduces leakage into subcutaneous tissue?",
 opts:["Displace the skin laterally before insertion and release it after withdrawal, sealing the needle track",
  "Massage the site firmly after injection to disperse the medication",
  "Inject the medication as quickly as possible to limit tissue exposure",
  "Withdraw the needle partially and re-advance it before injecting"],
 ans:0,
 rat:{c:"The Z-track technique pulls skin and subcutaneous tissue to one side, so that when the skin is released after injection the tissue planes no longer align and the medication stays in the muscle. This reduces leakage, irritation, and staining.",
  s:"Massage forces medication back along the track into subcutaneous tissue. Speed of injection does not prevent leakage, and re-advancing the needle adds trauma without sealing the track."} },

{id:"BCC-067", t:"single", cn:"BCC", sys:"REPI", topic:"Sitz bath after episiotomy", d:2, b:0.45, cj:"generate", tags:["sitz bath","postpartum comfort","perineal care"],
 stem:"A client three days after a vaginal delivery with a midline episiotomy reports perineal pain and swelling. What comfort measure should the nurse offer?",
 opts:["A warm sitz bath, which increases local blood flow, relaxes the pelvic muscles, and cleanses the area",
  "A heating pad applied directly to the perineum on a high setting",
  "Prolonged bed rest, since sitting worsens perineal swelling",
  "Vigorous cleansing with a washcloth after each void"],
 ans:0,
 rat:{c:"Warm water immersion of the perineum promotes circulation, reduces muscle spasm, relieves pain, and keeps the episiotomy clean, which supports healing. The equipment must be cleaned between uses.",
  s:"Direct high heat risks burns on sensitive, traumatized tissue. Immobility delays recovery and increases thrombosis risk, and vigorous scrubbing traumatizes the suture line rather than cleansing it."} },

{id:"BCC-068", t:"single", cn:"BCC", sys:"GI", topic:"Administering a rectal suppository", d:2, b:0.45, cj:"act", tags:["suppository","rectal administration","technique"],
 stem:"A nurse is administering a rectal suppository. What technique is correct?",
 opts:["Position the client on the left side with the upper leg flexed, lubricate the suppository, and insert it past the internal anal sphincter",
  "Position the client supine with both legs extended and place the suppository just inside the anal verge",
  "Insert it without lubricant, since lubricant prevents the medication from dissolving",
  "Ask the client to bear down during insertion to open the sphincter"],
 ans:0,
 rat:{c:"The left lateral position with the upper leg flexed straightens the rectal canal. Lubrication reduces trauma, and the suppository must pass the internal anal sphincter so it is retained and absorbed through the rectal mucosa rather than expelled.",
  s:"A supine position with extended legs neither exposes nor straightens the canal, and placement at the anal verge leads to expulsion. Lubricant aids insertion without blocking absorption, and bearing down increases the urge to expel rather than relaxing the sphincter."} },

/* ---------------- Management of Care (3) ---------------- */

{id:"MOC-120", t:"single", cn:"MOC", sys:"PSYCH", topic:"Accepting a gift from a client's family", d:3, b:0.55, cj:"act", tags:["professional boundaries","gift","ethics"],
 stem:"A client's family offers the nurse an expensive watch at discharge, saying the nurse was like family. What is the most appropriate response?",
 opts:["Decline the watch with appreciation, explain the professional boundary, and suggest a written thank-you or feedback to the organization instead",
  "Accept it, since refusing a gift from a grateful family is disrespectful",
  "Accept the watch and share its value with the unit team to distribute the benefit",
  "Accept it only if the family signs a statement that no favor is expected"],
 ans:0,
 rat:{c:"Substantial gifts create a perception of preferential treatment and can compromise professional boundaries and public trust. A respectful refusal that acknowledges the gratitude, with an alternative such as written feedback, honors the relationship without the conflict.",
  s:"Good intent does not remove the boundary problem, and redistributing the value does not resolve it. A written waiver does not address the perception of favoritism that a valuable gift creates."} },

{id:"MOC-121", t:"single", cn:"MOC", sys:"INTG", topic:"Offering a chaperone for an intimate examination", d:3, b:0.55, cj:"act", tags:["chaperone","dignity","professional practice"],
 stem:"A nurse is about to assist with a genital examination of an adult client. What is the appropriate practice?",
 opts:["Offer a chaperone and document the offer and the client's decision, regardless of the client's gender or the examiner's",
  "Offer a chaperone only if the client appears anxious or requests one",
  "Offer a chaperone only when the examiner is of a different gender from the client",
  "Do not offer one, since offering implies that the examiner cannot be trusted"],
 ans:0,
 rat:{c:"Offering a chaperone for intimate examinations is standard practice that protects the client's comfort and dignity and protects staff. The offer is made universally and the client's choice is documented.",
  s:"Limiting the offer to visibly anxious clients makes the protection conditional on the client speaking up. Gender is not a reliable proxy for need, and declining to offer does not demonstrate trust, it removes a safeguard."} },

{id:"MOC-122", t:"single", cn:"MOC", sys:"PSYCH", topic:"Recognizing compassion fatigue", d:3, b:0.55, cj:"recognize", tags:["compassion fatigue","occupational health","self-care"],
 stem:"A nurse working in oncology reports emotional numbness, dread before shifts, and difficulty feeling sympathy for clients. What does the nurse recognize?",
 opts:["Compassion fatigue, which results from sustained exposure to suffering and requires deliberate recovery rather than simply working harder",
  "A personal character flaw, since caring is the core of the profession",
  "Early dementia, since emotional blunting is a cognitive symptom",
  "Malingering, since the nurse is still working through all assigned tasks"],
 ans:0,
 rat:{c:"Compassion fatigue is the cumulative cost of caring for people in distress, presenting as emotional exhaustion, reduced empathy, and dread. It is an occupational hazard that responds to rest, boundaries, peer support, and professional help when needed.",
  s:"Framing it as a character flaw discourages disclosure and delays recovery. Emotional blunting here follows sustained exposure rather than cognitive decline, and continuing to function does not exclude genuine distress."} },

/* ---------------- Safety and Infection Control (2) ---------------- */

{id:"SIC-091", t:"single", cn:"SIC", sys:"INF", topic:"Safe use of a multi-dose vial", d:3, b:0.55, cj:"act", tags:["multi-dose vial","medication safety","asepsis"],
 stem:"A nurse is drawing medication from a multi-dose vial while standing at a medication cart in the hallway. What practice is correct?",
 opts:["Prepare the dose away from the bedside, use a new sterile needle and syringe for each entry, and label the vial with the date it was opened",
  "Prepare the dose at the bedside for efficiency, reusing the syringe for a second client to reduce waste",
  "Keep the needle in the vial between uses so the seal is not punctured repeatedly",
  "Use the vial until it is empty, since the preservative keeps it sterile indefinitely"],
 ans:0,
 rat:{c:"Multi-dose vials contain preservative but are not immune to contamination. They are accessed away from the immediate treatment area with a fresh sterile needle and syringe each time, and the opening date is recorded so the vial is discarded on schedule.",
  s:"Bedside preparation exposes the vial to the care environment, and syringes are never reused across clients. Leaving a needle in the vial breaches sterility, and preservative does not maintain sterility indefinitely once the vial is entered."} },

{id:"SIC-092", t:"single", cn:"SIC", sys:"NEURO", topic:"Client missing from the unit", d:3, b:0.55, cj:"prioritize", tags:["missing client","wandering","emergency response"],
 stem:"A nurse cannot locate a client who has a history of wandering and was last seen twenty minutes ago. What is the first action?",
 opts:["Search the immediate area and the last known location while simultaneously notifying the unit and activating the facility's missing client response",
  "Wait one hour to see whether the client returns before notifying anyone",
  "Call the client's home number first, since the client may have left to go home",
  "Document the absence at the end of the shift and raise it at handoff"],
 ans:0,
 rat:{c:"A missing client who wanders is a time-critical event, because exposure, falls, and traffic are the leading causes of harm. The nurse searches the immediate vicinity and the last known location at once while the missing client protocol mobilizes additional staff, rather than searching alone in silence.",
  s:"Waiting an hour allows a vulnerable client to travel far and come to harm. A home telephone call is part of the response but not the first action, and documenting an absence discovered now, hours later, abandons the client to the interval."} },

/* ---------------- Reduction of Risk Potential (3) ---------------- */

{id:"RRP-090", t:"single", cn:"RRP", sys:"REN", topic:"Midstream clean-catch urine collection", d:3, b:0.55, cj:"act", tags:["urine specimen","clean catch","contamination"],
 stem:"A nurse is instructing a client who can manage independently on collecting a midstream clean-catch urine specimen. What instruction is correct?",
 opts:["Cleanse the meatus, begin voiding into the toilet, then collect the midstream portion without touching the inside of the container",
  "Collect the first voided urine rather than the midstream portion, since it is the most concentrated",
  "Collect the specimen from the drainage bag tubing, since it is easier to obtain",
  "Fill the container, then wipe the outside and transfer the urine to a plain cup for transport"],
 ans:0,
 rat:{c:"The initial stream flushes organisms from the distal urethra, so the midstream portion best represents bladder contents. Cleansing the meatus and keeping the container interior untouched prevent contamination that would produce false-positive culture results.",
  s:"The first voided urine carries urethral flora and gives false positives. Drainage bag urine has been sitting at room temperature and reflects bag colonization rather than bladder contents, and decanting into a non-sterile cup contaminates a correctly collected specimen."} },

{id:"RRP-091", t:"single", cn:"RRP", sys:"CV", topic:"Teaching before a tilt table test", d:3, b:0.55, cj:"generate", tags:["tilt table","syncope","pre-procedure teaching"],
 stem:"A client with recurrent unexplained fainting is scheduled for a tilt table test. What teaching should the nurse provide?",
 opts:["The table will be tilted upright while heart rate and blood pressure are monitored, and the client should report lightheadedness immediately",
  "The client will be exercised on a treadmill until symptoms are provoked",
  "The client must stop all medications permanently before the test",
  "The table delivers electrical stimulation to the heart through the chest wall"],
 ans:0,
 rat:{c:"The tilt table reproduces postural stress by moving the client upright while continuously monitoring heart rate and blood pressure, which helps identify vasovagal and orthostatic causes of fainting. Reporting symptoms promptly allows the test to be stopped safely.",
  s:"Treadmill provocation describes an exercise stress test rather than a tilt table study. Medications are adjusted per protocol rather than stopped permanently, and no electrical stimulation of the heart is involved."} },

{id:"RRP-092", t:"single", cn:"RRP", sys:"CV", topic:"Purpose of the six-minute walk test", d:3, b:0.55, cj:"evaluate", tags:["six-minute walk test","functional capacity","heart failure"],
 stem:"A client with chronic heart failure is scheduled for a six-minute walk test. What does the nurse understand about this test?",
 opts:["It measures the distance the client can walk in six minutes, reflecting functional capacity and response to treatment",
  "It requires the client to walk at maximum speed until exhausted",
  "It is performed while the client breathes into a mouthpiece to measure lung volumes",
  "It is only valid if the client's heart rate reaches a target percentage of maximum"],
 ans:0,
 rat:{c:"The six-minute walk test is a submaximal assessment of functional capacity in which the client walks at a self-selected pace for six minutes while symptoms, heart rate, and oxygen saturation are monitored. Distance correlates with daily function and tracks change over time.",
  s:"The test is deliberately submaximal and self-paced rather than exhaustive. Spirometry uses a mouthpiece to measure lung volumes, and no target heart rate is required, which is what makes the test usable in deconditioned clients."} }
  );
})();
