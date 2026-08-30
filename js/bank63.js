"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 53) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 52: SIC (12.8% vs 13),
 * BCC (8.9% vs 9) and RRP (11.9% vs 12). Every item is difficulty
 * 2 or 3, and the clinical detail is written to be defensible.
 *
 * SIC 5: nutritional risk assessment, hypernatraemia,
 * hypomagnesaemia, hypophosphataemia, and third spacing.
 * BCC 5: anasarca and generalised oedema, hypervolaemia and fluid
 * overload, acid-base interpretation, base excess, and renal
 * tubular acidosis.
 * RRP 5: hyperglycaemic emergencies, DKA versus HHS, mixed
 * acid-base disorders, refeeding syndrome, and electrolyte
 * monitoring.
 * PHA 5: potassium replacement, magnesium replacement, phosphate
 * replacement, sodium correction, and electrolyte interactions.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- SIC 5 */
{id:"SIC-181", t:"single", cn:"SIC", sys:"GI", topic:"Nutritional risk assessment", d:2, b:0.45, cj:"act", tags:["safety","nutritional risk","screening","malnutrition","assessment"],
 stem:"A client is admitted with unintentional weight loss. Which action by the nurse is most appropriate?",
 opts:["Complete nutritional risk screening, since early identification enables intervention","Wait for the dietitian to assess, since this is their role","Assume the weight loss is not significant, since the client is eating","Delay screening until discharge planning"],
 ans:0, rat:{c:"Nutritional risk screening should be completed on admission to identify those at risk and enable early intervention. Waiting, assuming insignificance, and delaying all risk missing malnutrition.", s:"Nutritional risk screening is a nursing responsibility; the nurse must complete it promptly."}},
{id:"SIC-182", t:"single", cn:"SIC", sys:"REN", topic:"Hypernatraemia", d:3, b:0.55, cj:"act", tags:["safety","hypernatraemia","sodium","electrolyte","monitoring"],
 stem:"A client has a sodium of 155 mmol/L and appears confused. Which action by the nurse is most appropriate?",
 opts:["Recognise hypernatraemia as a cause of confusion and escalate for controlled correction","Administer sodium-containing fluids, since this will correct the imbalance","Restrict all fluids, since this prevents further sodium rise","Ignore the sodium, since confusion has other causes"],
 ans:0, rat:{c:"Hypernatraemia causes neurological symptoms including confusion and requires controlled correction. Sodium-containing fluids worsen the problem, fluid restriction is inappropriate, and ignoring the sodium risks harm.", s:"Hypernatraemia causes neurological symptoms; the nurse must recognise and escalate for safe correction."}},
{id:"SIC-183", t:"single", cn:"SIC", sys:"REN", topic:"Hypomagnesaemia", d:3, b:0.55, cj:"act", tags:["safety","hypomagnesaemia","magnesium","electrolyte","arrhythmia"],
 stem:"A client has a magnesium of 0.5 mmol/L and is experiencing muscle cramps. Which action by the nurse is most appropriate?",
 opts:["Recognise hypomagnesaemia as a cause of neuromuscular irritability and escalate for replacement","Reassure the client, since muscle cramps are not significant","Administer calcium, since this treats muscle cramps","Ignore the magnesium, since it is not clinically important"],
 ans:0, rat:{c:"Hypomagnesaemia causes neuromuscular irritability including cramps and requires replacement. Reassurance, calcium alone, and ignoring the level all risk harm including arrhythmias.", s:"Hypomagnesaemia causes neuromuscular symptoms and arrhythmia risk; the nurse must recognise and escalate."}},
{id:"SIC-184", t:"single", cn:"SIC", sys:"REN", topic:"Hypophosphataemia", d:3, b:0.55, cj:"act", tags:["safety","hypophosphataemia","phosphate","electrolyte","refeeding"],
 stem:"A malnourished client starting feeding has a falling phosphate. Which action by the nurse is most appropriate?",
 opts:["Recognise possible refeeding syndrome and escalate for phosphate monitoring and replacement","Continue feeding without monitoring, since phosphate will normalise","Stop feeding, since this prevents further phosphate fall","Ignore the phosphate, since it is not clinically significant"],
 ans:0, rat:{c:"Falling phosphate during refeeding suggests refeeding syndrome requiring monitoring and replacement. Continuing without monitoring, stopping feeding, and ignoring all risk harm.", s:"Hypophosphataemia in refeeding signals refeeding syndrome; the nurse must monitor and escalate."}},
{id:"SIC-185", t:"single", cn:"SIC", sys:"CV", topic:"Third spacing", d:3, b:0.55, cj:"analyze", tags:["safety","third spacing","fluid","oedema","hypovolaemia"],
 stem:"A client with severe pancreatitis has generalised oedema but is hypotensive and oliguric. Which interpretation by the nurse is most accurate?",
 opts:["This suggests third spacing, where fluid moves to interstitial spaces causing intravascular depletion","The oedema indicates fluid overload, so fluid restriction is required","The hypotension is unrelated to the oedema and requires separate treatment","The client is hypervolaemic and requires diuresis"],
 ans:0, rat:{c:"Third spacing describes fluid movement to interstitial spaces causing intravascular depletion despite oedema. Assuming overload, separating the findings, and diuresis all risk worsening hypovolaemia.", s:"Third spacing causes intravascular depletion despite oedema; the nurse must understand this paradox."}},

/* ---------------------------------------------------------- BCC 5 */
{id:"BCC-126", t:"single", cn:"BCC", sys:"CV", topic:"Anasarca and generalised oedema", d:2, b:0.45, cj:"recognize", tags:["basic care","anasarca","oedema","fluid","assessment"],
 stem:"A client has generalised oedema affecting the face, limbs, and trunk. Which interpretation by the nurse is most accurate?",
 opts:["This suggests anasarca and requires investigation of the underlying cause","This is normal fluid retention and requires no investigation","This indicates localised oedema and requires elevation only","This is related to immobility and will resolve with movement"],
 ans:0, rat:{c:"Generalised oedema (anasarca) requires investigation of underlying causes such as cardiac, renal, or hepatic disease. Dismissing as normal, localised, or positional risks missing serious pathology.", s:"Anasarca indicates significant underlying pathology; the nurse must recognise and investigate."}},
{id:"BCC-127", t:"single", cn:"BCC", sys:"CV", topic:"Hypervolaemia and fluid overload", d:3, b:0.55, cj:"act", tags:["basic care","hypervolaemia","fluid overload","monitoring","diuresis"],
 stem:"A client with heart failure has increasing oedema, weight gain, and breathlessness. Which action by the nurse is most appropriate?",
 opts:["Recognise fluid overload and escalate for diuresis and fluid restriction","Increase fluids, since this will improve perfusion","Ignore the findings, since they are expected in heart failure","Advise increased salt intake, since this will improve symptoms"],
 ans:0, rat:{c:"Increasing oedema, weight gain, and breathlessness suggest fluid overload requiring diuresis and fluid restriction. Increasing fluids, ignoring, and salt all worsen the condition.", s:"Fluid overload in heart failure requires prompt intervention; the nurse must recognise and escalate."}},
{id:"BCC-128", t:"single", cn:"BCC", sys:"RESP", topic:"Acid-base interpretation", d:3, b:0.55, cj:"analyze", tags:["basic care","acid base","blood gas","interpretation","compensation"],
 stem:"A client's blood gas shows pH 7.25, PaCO2 6.5 kPa, HCO3 24 mmol/L. Which interpretation by the nurse is most accurate?",
 opts:["This suggests uncompensated respiratory acidosis, since pH is low, PaCO2 is high, and HCO3 is normal","This suggests metabolic acidosis, since pH is low and PaCO2 is not the primary problem","This suggests compensated respiratory acidosis, since HCO3 is normal","This suggests mixed acid-base disorder requiring further investigation"],
 ans:0, rat:{c:"Low pH with high PaCO2 and normal HCO3 indicates uncompensated respiratory acidosis. Metabolic acidosis would have low HCO3, compensation would have raised HCO3, and mixed disorder is not indicated.", s:"Acid-base interpretation requires systematic analysis; the nurse must understand the patterns."}},
{id:"BCC-129", t:"single", cn:"BCC", sys:"RESP", topic:"Base excess", d:3, b:0.55, cj:"analyze", tags:["basic care","base excess","blood gas","metabolic","interpretation"],
 stem:"A client's blood gas shows base excess of -8 mmol/L. Which interpretation by the nurse is most accurate?",
 opts:["This suggests a metabolic component, since base excess reflects metabolic acid-base status","This suggests a respiratory component, since base excess reflects ventilation","Base excess is not clinically useful and can be ignored","This indicates normal acid-base status"],
 ans:0, rat:{c:"Base excess reflects the metabolic component of acid-base status, with negative values indicating metabolic acidosis. It does not reflect ventilation, is clinically useful, and -8 is not normal.", s:"Base excess indicates metabolic contribution; the nurse must understand its interpretation."}},
{id:"BCC-130", t:"single", cn:"BCC", sys:"REN", topic:"Renal tubular acidosis", d:3, b:0.55, cj:"analyze", tags:["basic care","renal tubular","acidosis","electrolyte","interpretation"],
 stem:"A client has normal anion gap metabolic acidosis with hypokalaemia. Which interpretation by the nurse is most accurate?",
 opts:["This pattern suggests renal tubular acidosis and requires further investigation","This suggests diabetic ketoacidosis, since acidosis is present","This suggests lactic acidosis, since the anion gap is normal","This is a normal finding and requires no investigation"],
 ans:0, rat:{c:"Normal anion gap metabolic acidosis with hypokalaemia suggests renal tubular acidosis. DKA and lactic acidosis have raised anion gaps, and this pattern is not normal.", s:"Renal tubular acidosis has a characteristic pattern; the nurse must recognise it."}},

/* ---------------------------------------------------------- RRP 5 */
{id:"RRP-174", t:"single", cn:"RRP", sys:"ENDO", topic:"Hyperglycaemic emergencies", d:3, b:0.55, cj:"act", tags:["risk","hyperglycaemic","DKA","HHS","emergency","treatment"],
 stem:"A client with type 1 diabetes has glucose 25 mmol/L, ketones 3.0 mmol/L, and is vomiting. Which action by the nurse is the priority?",
 opts:["Recognise possible DKA and escalate immediately, since this is a medical emergency requiring fluid and insulin","Administer oral fluids and wait, since the client is conscious","Increase the insulin dose without escalation, since this will correct the glucose","Advise carbohydrate restriction, since this will lower glucose"],
 ans:0, rat:{c:"Hyperglycaemia with ketones and vomiting suggests DKA requiring immediate escalation for fluids and insulin. Oral fluids, unilateral insulin changes, and carbohydrate restriction all delay life-saving treatment.", s:"DKA is a medical emergency; the nurse must escalate immediately."}},
{id:"RRP-175", t:"single", cn:"RRP", sys:"ENDO", topic:"DKA versus HHS", d:3, b:0.55, cj:"analyze", tags:["risk","DKA","HHS","hyperosmolar","differentiation"],
 stem:"A client with type 2 diabetes has glucose 45 mmol/L, minimal ketones, and high osmolality. Which interpretation by the nurse is most accurate?",
 opts:["This suggests HHS rather than DKA, since ketones are minimal and osmolality is high","This suggests DKA, since glucose is very high even with minimal ketones and high osmolality","This suggests mixed DKA and HHS, since both features are present","This suggests simple hyperglycaemia without emergency"],
 ans:0, rat:{c:"Very high glucose with minimal ketones and high osmolality suggests HHS. DKA has significant ketones, mixed features would have both, and this is an emergency.", s:"Differentiating DKA from HHS guides treatment; the nurse must understand the distinguishing features."}},
{id:"RRP-176", t:"single", cn:"RRP", sys:"RESP", topic:"Mixed acid-base disorders", d:3, b:0.55, cj:"analyze", tags:["risk","mixed disorder","acid base","blood gas","interpretation"],
 stem:"A client's blood gas shows pH 7.30, PaCO2 8.0 kPa, HCO3 30 mmol/L. Which interpretation by the nurse is most accurate?",
 opts:["This suggests a mixed disorder, since both PaCO2 and HCO3 are elevated, indicating combined respiratory acidosis and metabolic alkalosis","This suggests simple respiratory acidosis, since PaCO2 is high","This suggests simple metabolic alkalosis, since HCO3 is high","This is a normal blood gas"],
 ans:0, rat:{c:"Elevated PaCO2 and HCO3 with low pH suggests mixed respiratory acidosis and metabolic alkalosis. Simple disorders would not have both elevated, and this is not normal.", s:"Mixed disorders require careful interpretation; the nurse must recognise when both components are abnormal."}},
{id:"RRP-177", t:"single", cn:"RRP", sys:"GI", topic:"Refeeding syndrome", d:3, b:0.55, cj:"act", tags:["risk","refeeding syndrome","malnutrition","electrolyte","prevention"],
 stem:"A severely malnourished client is starting nutritional support. Which action by the nurse is most appropriate?",
 opts:["Monitor electrolytes closely and start feeding slowly, since refeeding syndrome risk is high","Start full feeding immediately, since nutrition is urgent","Monitor weight only, since electrolytes are not affected","Ignore refeeding risk, since this is rare"],
 ans:0, rat:{c:"Refeeding syndrome risk is high in severe malnutrition, requiring electrolyte monitoring and gradual feeding. Full feeding, weight-only monitoring, and ignoring risk all risk life-threatening complications.", s:"Refeeding syndrome is preventable with careful monitoring; the nurse must understand the risk."}},
{id:"RRP-178", t:"single", cn:"RRP", sys:"REN", topic:"Electrolyte monitoring", d:2, b:0.45, cj:"act", tags:["risk","electrolyte","monitoring","replacement","safety"],
 stem:"A client is receiving electrolyte replacement. Which action by the nurse is most appropriate?",
 opts:["Monitor levels regularly and adjust replacement based on results and clinical response","Administer replacement without monitoring, since this is standard","Stop replacement once symptoms improve, since levels will normalise","Ignore levels, since clinical assessment is sufficient"],
 ans:0, rat:{c:"Electrolyte replacement requires regular monitoring and adjustment based on levels and clinical response. Unmonitored replacement, stopping on symptoms, and ignoring levels all risk harm.", s:"Electrolyte monitoring guides safe replacement; the nurse must check levels regularly."}},

/* ---------------------------------------------------------- PHA 5 */
{id:"PHA-230", t:"single", cn:"PHA", sys:"REN", topic:"Potassium replacement", d:3, b:0.55, cj:"act", tags:["pharmacology","potassium","replacement","hypokalaemia","safety"],
 stem:"A client has potassium 2.8 mmol/L and requires replacement. Which action by the nurse is most appropriate?",
 opts:["Administer potassium as prescribed with rate limits, since rapid infusion risks cardiac arrest","Administer rapidly, since hypokalaemia is dangerous","Administer without monitoring, since potassium is safe","Withhold replacement, since the level is not critically low"],
 ans:0, rat:{c:"Potassium replacement requires rate limits due to cardiac arrest risk. Rapid infusion, unmonitored administration, and withholding all risk harm.", s:"Potassium replacement must be rate-limited; the nurse must understand the cardiac risks."}},
{id:"PHA-231", t:"single", cn:"PHA", sys:"REN", topic:"Magnesium replacement", d:3, b:0.55, cj:"act", tags:["pharmacology","magnesium","replacement","hypomagnesaemia","safety"],
 stem:"A client has magnesium 0.4 mmol/L and is symptomatic. Which action by the nurse is most appropriate?",
 opts:["Administer magnesium as prescribed, monitoring for signs of toxicity including respiratory depression","Administer rapidly, since hypomagnesaemia is dangerous","Administer without monitoring, since magnesium is safe","Withhold replacement, since the level is not critically low"],
 ans:0, rat:{c:"Magnesium replacement requires monitoring for toxicity including respiratory depression. Rapid infusion, unmonitored administration, and withholding all risk harm.", s:"Magnesium toxicity causes respiratory depression; the nurse must monitor during replacement."}},
{id:"PHA-232", t:"single", cn:"PHA", sys:"REN", topic:"Phosphate replacement", d:3, b:0.55, cj:"act", tags:["pharmacology","phosphate","replacement","hypophosphataemia","safety"],
 stem:"A client has phosphate 0.4 mmol/L and requires replacement. Which action by the nurse is most appropriate?",
 opts:["Administer phosphate as prescribed, monitoring calcium since replacement can cause hypocalcaemia","Administer without monitoring, since phosphate is safe","Administer calcium simultaneously, since this prevents complications","Withhold replacement, since phosphate is not clinically important"],
 ans:0, rat:{c:"Phosphate replacement requires calcium monitoring as it can cause hypocalcaemia. Unmonitored administration, simultaneous calcium, and withholding all risk harm.", s:"Phosphate replacement affects calcium; the nurse must monitor both."}},
{id:"PHA-233", t:"single", cn:"PHA", sys:"REN", topic:"Sodium correction", d:3, b:0.55, cj:"act", tags:["pharmacology","sodium","correction","hyponatraemia","osmotic demyelination"],
 stem:"A client has sodium 118 mmol/L and requires correction. Which action by the nurse is most appropriate?",
 opts:["Correct sodium slowly, since rapid correction risks osmotic demyelination","Correct rapidly, since hyponatraemia is dangerous","Correct without monitoring, since sodium is safe","Withhold correction, since the level is not critically low"],
 ans:0, rat:{c:"Sodium correction must be slow to avoid osmotic demyelination. Rapid correction, unmonitored administration, and withholding all risk harm.", s:"Rapid sodium correction causes osmotic demyelination; the nurse must understand the risks."}},
{id:"PHA-234", t:"single", cn:"PHA", sys:"REN", topic:"Electrolyte interactions", d:3, b:0.55, cj:"analyze", tags:["pharmacology","electrolyte","interaction","potassium","magnesium"],
 stem:"A client has hypokalaemia that is not correcting despite replacement. Which interpretation by the nurse is most accurate?",
 opts:["This may indicate concurrent hypomagnesaemia, since magnesium is required for potassium retention","The potassium replacement is inadequate and the dose should be increased","The client is not absorbing potassium and requires IV replacement","This is treatment-resistant and requires specialist referral"],
 ans:0, rat:{c:"Refractory hypokalaemia may indicate concurrent hypomagnesaemia, as magnesium is required for potassium retention. Increasing dose, IV alone, and referral all miss the underlying cause.", s:"Magnesium is required for potassium retention; the nurse must check magnesium in refractory hypokalaemia."}}

]);
