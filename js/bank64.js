"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 54) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 53: SIC (12.9% vs 13),
 * HPM (8.9% vs 9), PSY (8.9% vs 9) and PAA (13.9% vs 14).
 * Every item is difficulty 2 or 3, and the clinical detail is
 * written to be defensible.
 *
 * SIC 5: hypoxaemic respiratory failure, COPD oxygen and controlled
 * therapy, non rebreather mask, high flow nasal cannula, and
 * absorption atelectasis.
 * HPM 5: inhaler technique, spacer use, nebuliser choice, oxygen
 * driven nebulisers, and adherence with inhaler review.
 * PSY 5: breathing techniques for anxiety, panic attack management,
 * relaxation and grounding, exercise and mental health, and sleep
 * hygiene.
 * PAA 5: hypoxic drive and oxygen sensitivity, type 2 respiratory
 * failure, oxygen toxicity, humidification, and weaning from
 * oxygen.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- SIC 5 */
{id:"SIC-186", t:"single", cn:"SIC", sys:"RESP", topic:"Hypoxaemic respiratory failure", d:3, b:0.55, cj:"act", tags:["safety","hypoxaemic","respiratory failure","oxygen","escalation"],
 stem:"A client has SpO2 85% on air with normal PaCO2. Which action by the nurse is most appropriate?",
 opts:["Recognise type 1 respiratory failure and escalate for oxygen therapy and investigation","Administer high concentration oxygen without escalation, since this will correct the hypoxaemia","Wait for the next observations, since one reading may be inaccurate","Advise deep breathing exercises, since this will improve oxygenation"],
 ans:0, rat:{c:"Hypoxaemia with normal PaCO2 indicates type 1 respiratory failure requiring escalation for oxygen and investigation. Unescalated high oxygen, waiting, and exercises all delay appropriate treatment.", s:"Type 1 respiratory failure requires prompt escalation; the nurse must recognise and act."}},
{id:"SIC-187", t:"single", cn:"SIC", sys:"RESP", topic:"COPD oxygen and controlled therapy", d:3, b:0.55, cj:"act", tags:["safety","COPD","oxygen","controlled","target saturation"],
 stem:"A client with COPD has target saturation 88-92%. Which action by the nurse is most appropriate?",
 opts:["Use controlled oxygen therapy with venturi mask to maintain target saturation, monitoring for CO2 retention","Administer high concentration oxygen, since this will exceed the target saturation","Administer oxygen without monitoring, since saturation will normalise","Withhold oxygen, since COPD patients should not receive it"],
 ans:0, rat:{c:"COPD requires controlled oxygen with target saturation and CO2 monitoring. High oxygen risks CO2 retention, unmonitored oxygen is unsafe, and withholding risks hypoxaemia.", s:"COPD oxygen therapy requires controlled delivery; the nurse must understand target saturation and monitoring."}},
{id:"SIC-188", t:"single", cn:"SIC", sys:"RESP", topic:"Non rebreather mask", d:2, b:0.45, cj:"act", tags:["safety","non rebreather","oxygen","high concentration","emergency"],
 stem:"A client requires high concentration oxygen in an emergency. Which action by the nurse is most appropriate?",
 opts:["Use a non rebreather mask with reservoir bag inflated, since this delivers high concentration oxygen","Use nasal cannulae, since these are more comfortable","Use a venturi mask, since this is more precise","Withhold high concentration oxygen, since this is dangerous"],
 ans:0, rat:{c:"Non rebreather masks with inflated reservoir deliver high concentration oxygen for emergencies. Nasal cannulae and venturi masks deliver lower concentrations, and withholding risks hypoxaemia.", s:"Non rebreather masks are for high concentration oxygen; the nurse must use them correctly."}},
{id:"SIC-189", t:"single", cn:"SIC", sys:"RESP", topic:"High flow nasal cannula", d:3, b:0.55, cj:"act", tags:["safety","high flow","HFNC","oxygen","respiratory support"],
 stem:"A client with hypoxaemic respiratory failure is started on high flow nasal cannula. Which action by the nurse is most appropriate?",
 opts:["Monitor closely, since HFNC provides heated humidified oxygen and may delay escalation if deterioration is missed","Assume the client is stable, since HFNC is effective","Reduce monitoring, since HFNC is safer than conventional oxygen","Remove HFNC if the client appears comfortable, since this indicates improvement"],
 ans:0, rat:{c:"HFNC requires close monitoring as it may mask deterioration. Assuming stability, reducing monitoring, and removing on comfort all risk missing deterioration.", s:"HFNC requires vigilance; the nurse must monitor for deterioration despite apparent stability."}},
{id:"SIC-190", t:"single", cn:"SIC", sys:"RESP", topic:"Absorption atelectasis", d:3, b:0.55, cj:"analyze", tags:["safety","absorption atelectasis","oxygen","high concentration","complication"],
 stem:"A client receives high concentration oxygen and develops increasing oxygen requirements. Which interpretation by the nurse is most accurate?",
 opts:["This may indicate absorption atelectasis, where nitrogen washout causes alveolar collapse, requiring reduction in oxygen concentration","This indicates the underlying condition is worsening and oxygen should be increased","Atelectasis only occurs with mechanical ventilation, not oxygen therapy","Oxygen concentration does not affect alveolar stability"],
 ans:0, rat:{c:"Absorption atelectasis occurs when high oxygen washes out nitrogen, causing alveolar collapse and increased requirements. Attributing to worsening condition, limiting to ventilation, and denying effects all miss the mechanism.", s:"Absorption atelectasis is a specific oxygen complication; the nurse must recognise the mechanism and reduce concentration."}},

/* ---------------------------------------------------------- HPM 5 */
{id:"HPM-128", t:"single", cn:"HPM", sys:"RESP", topic:"Inhaler technique", d:2, b:0.45, cj:"act", tags:["health promotion","inhaler","technique","education","adherence"],
 stem:"A client with asthma reports poor symptom control despite regular inhaler use. Which action by the nurse is most appropriate?",
 opts:["Check inhaler technique, since poor technique is a common cause of poor control","Increase the inhaler medication dose, since this will improve control","Advise that asthma is difficult to control and symptoms are expected","Refer to the specialist, since this requires expert management"],
 ans:0, rat:{c:"Poor inhaler technique is a common cause of poor control and should be checked first. Increasing dose, accepting symptoms, and referral all miss the underlying problem.", s:"Inhaler technique is fundamental; the nurse must check it regularly."}},
{id:"HPM-129", t:"single", cn:"HPM", sys:"RESP", topic:"Spacer use", d:2, b:0.45, cj:"act", tags:["health promotion","spacer","inhaler","technique","MDI"],
 stem:"A client uses a pressurised metered dose inhaler. Which action by the nurse is most appropriate?",
 opts:["Advise using a spacer, since this improves drug delivery and reduces oropharyngeal deposition","Advise against spacers, since they reduce effectiveness","Advise that spacers are only for children","Advise that technique is not important with MDIs"],
 ans:0, rat:{c:"Spacers improve drug delivery and reduce oropharyngeal deposition with MDIs. Advising against, limiting to children, and dismissing technique all reduce effectiveness.", s:"Spacers improve MDI effectiveness; the nurse must advise their use."}},
{id:"HPM-130", t:"single", cn:"HPM", sys:"RESP", topic:"Nebuliser choice", d:3, b:0.55, cj:"act", tags:["health promotion","nebuliser","choice","delivery","medication"],
 stem:"A client requires nebulised bronchodilator. Which action by the nurse is most appropriate?",
 opts:["Select the appropriate nebuliser and driving gas, since oxygen-driven nebulisers may worsen CO2 retention in COPD","Use oxygen-driven nebulisers for all clients, since this is the appropriate standard","Use air-driven nebulisers for all clients, since oxygen is dangerous","Nebuliser choice does not matter, since all are equally effective"],
 ans:0, rat:{c:"Nebuliser choice matters, as oxygen-driven nebulisers may worsen CO2 retention in COPD. Blanket oxygen or air use, and dismissing choice, all risk harm.", s:"Nebuliser driving gas affects CO2 retention; the nurse must select appropriately."}},
{id:"HPM-131", t:"single", cn:"HPM", sys:"RESP", topic:"Oxygen driven nebulisers", d:3, b:0.55, cj:"act", tags:["health promotion","oxygen","nebuliser","COPD","CO2 retention"],
 stem:"A client with COPD and known CO2 retention requires nebulised bronchodilator. Which action by the nurse is most appropriate?",
 opts:["Use air-driven nebuliser and monitor CO2, since oxygen-driven nebulisers may suppress hypoxic drive and worsen retention","Use oxygen-driven nebuliser with low flow, since this minimises CO2 retention risk","The driving gas is irrelevant if the nebuliser duration is short","Withhold nebuliser therapy, since COPD patients are at risk from any nebulised medication"],
 ans:0, rat:{c:"Air-driven nebulisers with CO2 monitoring are required in COPD with retention, as oxygen may suppress hypoxic drive. Oxygen-driven, dismissing gas choice, and withholding all risk harm.", s:"CO2 retention risk requires air-driven nebulisers; the nurse must monitor and select appropriately."}},
{id:"HPM-132", t:"single", cn:"HPM", sys:"RESP", topic:"Adherence and inhaler review", d:2, b:0.45, cj:"act", tags:["health promotion","adherence","inhaler","review","education"],
 stem:"A client with COPD has frequent exacerbations. Which action by the nurse is most appropriate?",
 opts:["Review inhaler adherence and technique, since poor adherence is a common cause of exacerbations","Increase medication without review, since this will prevent exacerbations","Advise that exacerbations are inevitable in COPD","Refer to the specialist, since this requires expert management"],
 ans:0, rat:{c:"Poor adherence and technique are common causes of exacerbations and should be reviewed. Increasing without review, accepting exacerbations, and referral all miss the underlying problem.", s:"Adherence review prevents exacerbations; the nurse must check regularly."}},

/* ---------------------------------------------------------- PSY 5 */
{id:"PSY-122", t:"single", cn:"PSY", sys:"PSYCH", topic:"Breathing techniques for anxiety", d:2, b:0.45, cj:"act", tags:["psychosocial","breathing","anxiety","relaxation","technique"],
 stem:"A client experiences anxiety and asks for techniques to help. Which action by the nurse is most appropriate?",
 opts:["Teach slow controlled breathing, since this activates the parasympathetic response and reduces anxiety","Advise rapid breathing, since this increases oxygenation","Advise holding breath, since this calms the nervous system","Advise that breathing techniques are not effective for anxiety"],
 ans:0, rat:{c:"Slow controlled breathing activates the parasympathetic response and reduces anxiety. Rapid breathing, holding, and dismissing all fail to help or worsen anxiety.", s:"Breathing techniques are effective for anxiety; the nurse must teach them correctly."}},
{id:"PSY-123", t:"single", cn:"PSY", sys:"PSYCH", topic:"Panic attack management", d:3, b:0.55, cj:"act", tags:["psychosocial","panic attack","management","anxiety","support"],
 stem:"A client is experiencing a panic attack with hyperventilation. Which action by the nurse is most appropriate?",
 opts:["Stay with the client, use calm short sentences, and encourage slow breathing until the attack passes","Leave the client alone during the attack, since this reduces stimulation","Advise the client to breathe faster, since this will correct the hyperventilation","Administer sedation immediately, since this is the fastest solution"],
 ans:0, rat:{c:"Panic attacks require presence, calm communication, and slow breathing encouragement. Leaving, faster breathing, and immediate sedation all worsen or fail to address the attack.", s:"Panic attack management requires calm support; the nurse must stay and guide breathing."}},
{id:"PSY-124", t:"single", cn:"PSY", sys:"PSYCH", topic:"Relaxation and grounding", d:2, b:0.45, cj:"act", tags:["psychosocial","relaxation","grounding","anxiety","technique"],
 stem:"A client experiences dissociation during anxiety. Which action by the nurse is most appropriate?",
 opts:["Use grounding techniques such as naming objects in the room, since this reconnects the client to the present","Advise the client to relax, since this will stop the dissociation","Ignore the dissociation, since it will pass on its own","Administer medication, since this is the only solution"],
 ans:0, rat:{c:"Grounding techniques reconnect the client to the present during dissociation. Advising relaxation, ignoring, and medication alone all fail to address the dissociation.", s:"Grounding techniques help dissociation; the nurse must use them appropriately."}},
{id:"PSY-125", t:"single", cn:"PSY", sys:"PSYCH", topic:"Exercise and mental health", d:2, b:0.45, cj:"act", tags:["psychosocial","exercise","mental health","wellbeing","activity"],
 stem:"A client with depression asks about non-pharmacological approaches. Which action by the nurse is most appropriate?",
 opts:["Discuss exercise, since physical activity has evidence supporting its benefit in depression","Advise against exercise, since this may worsen depression","Advise that only medication is effective for depression","Advise rest, since activity may be too demanding"],
 ans:0, rat:{c:"Exercise has evidence supporting its benefit in depression. Advising against, limiting to medication, and rest all miss a valuable non-pharmacological approach.", s:"Exercise benefits depression; the nurse must discuss evidence-based options."}},
{id:"PSY-126", t:"single", cn:"PSY", sys:"PSYCH", topic:"Sleep hygiene", d:2, b:0.45, cj:"act", tags:["psychosocial","sleep hygiene","insomnia","behavioural","advice"],
 stem:"A client reports difficulty sleeping. Which action by the nurse is most appropriate?",
 opts:["Discuss sleep hygiene including regular routine, limiting caffeine, and creating a restful environment","Advise sleeping tablets, since this is the fastest solution","Advise staying up later, since this will increase sleepiness","Advise that sleep problems are not treatable"],
 ans:0, rat:{c:"Sleep hygiene includes routine, caffeine limitation, and environment optimisation. Sleeping tablets, staying up, and dismissing all fail to address the underlying problem.", s:"Sleep hygiene is first-line for insomnia; the nurse must discuss behavioural approaches."}},

/* ---------------------------------------------------------- PAA 5 */
{id:"PAA-195", t:"single", cn:"PAA", sys:"RESP", topic:"Hypoxic drive and oxygen sensitivity", d:3, b:0.55, cj:"analyze", tags:["physiological adaptation","hypoxic drive","oxygen","COPD","CO2 retention"],
 stem:"A client with COPD is at risk of CO2 retention. Which interpretation by the nurse is most accurate?",
 opts:["High concentration oxygen may suppress hypoxic drive and worsen CO2 retention, so controlled oxygen is required","Oxygen has no effect on hypoxic drive and can be given freely","Hypoxic drive is not relevant in COPD and oxygen can be unrestricted","CO2 retention is not a concern with oxygen therapy"],
 ans:0, rat:{c:"High oxygen may suppress hypoxic drive and worsen CO2 retention in COPD, requiring controlled oxygen. Dismissing effects, denying relevance, and ignoring CO2 all risk harm.", s:"Hypoxic drive is important in COPD; the nurse must understand oxygen sensitivity."}},
{id:"PAA-196", t:"single", cn:"PAA", sys:"RESP", topic:"Type 2 respiratory failure", d:3, b:0.55, cj:"act", tags:["physiological adaptation","type 2","respiratory failure","CO2","oxygen"],
 stem:"A client has PaCO2 8.0 kPa with hypoxaemia. Which action by the nurse is most appropriate?",
 opts:["Recognise type 2 respiratory failure and escalate, since this indicates ventilatory failure requiring intervention","Administer high concentration oxygen, since this will correct the hypoxaemia","Wait for the next blood gas, since one result may be inaccurate","Advise deep breathing, since this will improve ventilation"],
 ans:0, rat:{c:"Elevated PaCO2 with hypoxaemia indicates type 2 respiratory failure requiring escalation. High oxygen, waiting, and exercises all delay appropriate intervention.", s:"Type 2 respiratory failure requires prompt escalation; the nurse must recognise and act."}},
{id:"PAA-197", t:"single", cn:"PAA", sys:"RESP", topic:"Oxygen toxicity", d:3, b:0.55, cj:"analyze", tags:["physiological adaptation","oxygen toxicity","high concentration","complication","prevention"],
 stem:"A client has received high concentration oxygen for 48 hours. Which interpretation by the nurse is most accurate?",
 opts:["Prolonged high concentration oxygen may cause toxicity, so the lowest effective concentration should be used","Oxygen toxicity does not occur and high concentration can be continued","Oxygen toxicity only occurs with low concentration oxygen","Oxygen has no complications regardless of duration"],
 ans:0, rat:{c:"Prolonged high concentration oxygen may cause toxicity, so the lowest effective concentration should be used. Denying toxicity, attributing to low oxygen, and dismissing complications all misrepresent the risks.", s:"Oxygen toxicity is a real risk; the nurse must use the lowest effective concentration."}},
{id:"PAA-198", t:"single", cn:"PAA", sys:"RESP", topic:"Humidification", d:2, b:0.45, cj:"act", tags:["physiological adaptation","humidification","oxygen","comfort","secretions"],
 stem:"A client receiving oxygen reports dry nose and throat. Which action by the nurse is most appropriate?",
 opts:["Consider humidification, since this improves comfort and prevents drying of mucous membranes","Increase oxygen flow, since this will moisten the airways","Advise the client to tolerate the discomfort, since this is normal","Withhold oxygen, since dryness indicates intolerance"],
 ans:0, rat:{c:"Humidification improves comfort and prevents mucosal drying with oxygen therapy. Increasing flow, advising tolerance, and withholding all fail to address the problem.", s:"Humidification improves oxygen therapy comfort; the nurse must consider it."}},
{id:"PAA-199", t:"single", cn:"PAA", sys:"RESP", topic:"Weaning from oxygen", d:3, b:0.55, cj:"act", tags:["physiological adaptation","weaning","oxygen","recovery","monitoring"],
 stem:"A client's oxygen requirements are decreasing. Which action by the nurse is most appropriate?",
 opts:["Wean oxygen gradually while monitoring saturation, since abrupt cessation may cause hypoxaemia","Stop oxygen abruptly, since the client is improving","Continue current oxygen, since weaning is not necessary","Wean without monitoring, since the client is stable"],
 ans:0, rat:{c:"Oxygen weaning should be gradual with saturation monitoring, as abrupt cessation risks hypoxaemia. Stopping abruptly, continuing unnecessarily, and unmonitored weaning all risk harm.", s:"Oxygen weaning requires monitoring; the nurse must wean gradually and safely."}}

]);
