"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 56) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 55: SIC (12.9% vs 13),
 * BCC (8.8% vs 9) and PAA (13.8% vs 14). Every item is difficulty
 * 2 or 3, and the clinical detail is written to be defensible.
 *
 * SIC 5: pressure injury staging (category 1-4), moisture lesion,
 * enzymatic debridement, larval debridement, and malodorous wound.
 * BCC 5: wound swab and local infection, sepsis from wound, wound
 * photography, urostomy care, and problem-focused coping.
 * PAA 5: recovery model in mental health, (additional topics).
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- SIC 5 */
{id:"SIC-191", t:"single", cn:"SIC", sys:"INTG", topic:"Pressure injury staging", d:2, b:0.45, cj:"recognize", tags:["safety","pressure injury","staging","category","assessment"],
 stem:"A client has a pressure injury with full-thickness skin loss and visible subcutaneous fat. Which interpretation by the nurse is most accurate?",
 opts:["This is a category 3 pressure injury, since full-thickness skin loss with visible fat defines this stage","This is a category 2 pressure injury, since full-thickness skin loss with visible fat is partial","This is a category 4 pressure injury, since the wound is deep","This is unstageable, since the depth cannot be determined"],
 ans:0, rat:{c:"Category 3 pressure injury is defined by full-thickness skin loss with visible subcutaneous fat. Category 2 is partial-thickness, category 4 involves deeper structures, and unstageable requires obscured depth.", s:"Pressure injury staging guides treatment; the nurse must stage accurately."}},
{id:"SIC-192", t:"single", cn:"SIC", sys:"INTG", topic:"Moisture lesion", d:3, b:0.55, cj:"act", tags:["safety","moisture lesion","skin","incontinence","prevention"],
 stem:"A client with incontinence has erythema and superficial skin loss in the sacral area. Which action by the nurse is most appropriate?",
 opts:["Recognise moisture lesion and implement skin protection and incontinence management","Treat as pressure injury from incontinence and apply pressure-relieving equipment","Ignore the findings, since they will resolve spontaneously","Apply a pressure-relieving mattress, since this prevents further damage"],
 ans:0, rat:{c:"Moisture lesion requires skin protection and incontinence management, not pressure relief. Treating as pressure injury, ignoring, and pressure equipment all miss the cause.", s:"Moisture lesion differs from pressure injury; the nurse must identify and manage the cause."}},
{id:"SIC-193", t:"single", cn:"SIC", sys:"INTG", topic:"Enzymatic debridement", d:3, b:0.55, cj:"act", tags:["safety","enzymatic","debridement","wound","necrotic tissue"],
 stem:"A wound has necrotic tissue and the client cannot tolerate sharp debridement. Which action by the nurse is most appropriate?",
 opts:["Consider enzymatic debridement, since this is an alternative when sharp debridement is not tolerated","Proceed with sharp debridement, since this is the only effective method","Withhold debridement, since the client cannot tolerate it","Apply a dry dressing, since this will debride the wound"],
 ans:0, rat:{c:"Enzymatic debridement is an alternative when sharp debridement is not tolerated. Proceeding despite intolerance, withholding, and dry dressing all miss the option.", s:"Enzymatic debridement provides an alternative; the nurse must know when to use it."}},
{id:"SIC-194", t:"single", cn:"SIC", sys:"INTG", topic:"Larval debridement", d:3, b:0.55, cj:"act", tags:["safety","larval","debridement","wound","necrotic tissue"],
 stem:"A wound with extensive necrotic tissue is not responding to other debridement methods. Which action by the nurse is most appropriate?",
 opts:["Consider larval debridement, since this is effective for extensive necrotic tissue","Continue current treatment for extensive necrotic tissue, since larval therapy is not evidence-based","Proceed with sharp debridement, since this is the only option","Withhold debridement, since the wound is not improving"],
 ans:0, rat:{c:"Larval debridement is effective for extensive necrotic tissue when other methods fail. Continuing ineffective treatment, sharp only, and withholding all miss the option.", s:"Larval debridement is evidence-based; the nurse must know when to consider it."}},
{id:"SIC-195", t:"single", cn:"SIC", sys:"INTG", topic:"Malodorous wound", d:3, b:0.55, cj:"act", tags:["safety","malodour","wound","odour","management"],
 stem:"A fungating wound is malodorous and causing the client distress. Which action by the nurse is most appropriate?",
 opts:["Use odour-control dressings and consider topical metronidazole, addressing both odour and psychosocial impact","Ignore the odour, since this is expected with fungating wounds","Apply a dry dressing, since this will control odour","Advise the client to tolerate the odour, since treatment options are limited"],
 ans:0, rat:{c:"Malodorous wounds require odour-control dressings and topical metronidazole, addressing both physical and psychosocial impact. Ignoring, dry dressing, and advising tolerance all fail to manage the problem.", s:"Malodour requires active management; the nurse must address both physical and psychosocial aspects."}},

/* ---------------------------------------------------------- BCC 5 */
{id:"BCC-131", t:"single", cn:"BCC", sys:"INTG", topic:"Wound swab and local infection", d:3, b:0.55, cj:"act", tags:["basic care","wound swab","infection","local","assessment"],
 stem:"A wound shows increasing pain, erythema, and delayed healing. Which action by the nurse is most appropriate?",
 opts:["Take a wound swab, since these findings suggest local infection requiring assessment","Assume the wound is healing normally, since these findings are expected","Apply a dry dressing, since this will treat infection","Withhold swab, since wound swabs are not useful"],
 ans:0, rat:{c:"Increasing pain, erythema, and delayed healing suggest local infection requiring swab. Assuming normal, dry dressing, and withholding all miss the infection.", s:"Local infection requires swab; the nurse must recognise the signs."}},
{id:"BCC-132", t:"single", cn:"BCC", sys:"INTG", topic:"Sepsis from wound", d:3, b:0.55, cj:"act", tags:["basic care","sepsis","wound","infection","escalation"],
 stem:"A client with a wound infection develops fever, tachycardia, and confusion. Which action by the nurse is the priority?",
 opts:["Recognise possible sepsis and escalate immediately, since wound infection may be the source","Continue wound care, since this treats the infection","Administer antipyretics, since this treats the fever","Wait for blood culture results, since this confirms sepsis"],
 ans:0, rat:{c:"Fever, tachycardia, and confusion with wound infection suggest sepsis requiring immediate escalation. Continuing wound care, antipyretics, and waiting all delay life-saving treatment.", s:"Sepsis from wound is time-critical; the nurse must escalate immediately."}},
{id:"BCC-133", t:"single", cn:"BCC", sys:"INTG", topic:"Wound photography", d:2, b:0.45, cj:"act", tags:["basic care","wound photography","documentation","monitoring","assessment"],
 stem:"A client has a complex wound requiring ongoing monitoring. Which action by the nurse is most appropriate?",
 opts:["Take wound photographs with consent, since this provides objective documentation of progress","Rely on written wound description, since photography is not necessary","Avoid photography, since this breaches confidentiality","Photograph without consent, since this is clinical practice"],
 ans:0, rat:{c:"Wound photography with consent provides objective documentation. Written only, avoiding, and no consent all miss the benefit or breach rights.", s:"Wound photography aids monitoring; the nurse must obtain consent and document."}},
{id:"BCC-134", t:"single", cn:"BCC", sys:"REN", topic:"Urostomy care", d:3, b:0.55, cj:"act", tags:["basic care","urostomy","stoma","care","appliance"],
 stem:"A client has a new urostomy. Which action by the nurse is most appropriate?",
 opts:["Monitor urine output and stoma appearance, since urostomy requires specific assessment and appliance management","Monitor bowel output, since this indicates stoma function","Ignore the stoma, since urostomy does not require monitoring","Apply a colostomy appliance, since this is suitable"],
 ans:0, rat:{c:"Urostomy requires urine output and stoma monitoring with specific appliance. Bowel output, ignoring, and colostomy appliance all miss the specific care.", s:"Urostomy has specific care requirements; the nurse must understand the differences."}},
{id:"BCC-135", t:"single", cn:"BCC", sys:"PSYCH", topic:"Problem-focused coping", d:2, b:0.45, cj:"act", tags:["basic care","problem focused","coping","stress","management"],
 stem:"A client is experiencing stress from a manageable problem. Which action by the nurse is most appropriate?",
 opts:["Support problem-focused coping, since this addresses the source of stress directly","Support emotion-focused coping, since this is more effective","Advise the client to ignore the problem, since this reduces stress","Advise medication, since this is the fastest solution"],
 ans:0, rat:{c:"Problem-focused coping addresses the source directly and is appropriate for manageable problems. Emotion-focused, ignoring, and medication all miss the approach.", s:"Problem-focused coping is effective for manageable stress; the nurse must support it."}},

/* ---------------------------------------------------------- PAA 5 */
{id:"PAA-200", t:"single", cn:"PAA", sys:"PSYCH", topic:"Recovery model in mental health", d:3, b:0.55, cj:"act", tags:["physiological adaptation","recovery model","mental health","person centred","hope"],
 stem:"A client with mental illness asks about recovery. Which action by the nurse is most appropriate?",
 opts:["Explain that recovery is a personal journey focusing on hope, identity, and meaning, not just symptom elimination","Explain that recovery means cure and symptom elimination","Advise that recovery is not possible with mental illness","Focus only on medication, since this is the treatment"],
 ans:0, rat:{c:"Recovery is a personal journey focusing on hope, identity, and meaning, not just symptoms. Cure-focused, denying recovery, and medication-only all misrepresent the model.", s:"Recovery model is person-centred; the nurse must understand and explain it."}},
{id:"PAA-201", t:"single", cn:"PAA", sys:"PSYCH", topic:"Personal recovery", d:3, b:0.55, cj:"act", tags:["physiological adaptation","personal recovery","mental health","autonomy","goals"],
 stem:"A client wishes to set their own recovery goals. Which action by the nurse is most appropriate?",
 opts:["Support the client to set and pursue their own goals, since personal recovery is client-directed","Set recovery goals for the client, since the nurse knows best","Advise that goals are not realistic, since this may cause disappointment","Focus on clinical goals, since these are measurable"],
 ans:0, rat:{c:"Personal recovery is client-directed, so the nurse supports client-set goals. Nurse-set, dismissing, and clinical-only all miss the client-centred approach.", s:"Personal recovery requires client autonomy; the nurse must support client-directed goals."}},
{id:"PAA-202", t:"single", cn:"PAA", sys:"PSYCH", topic:"Recovery plan", d:2, b:0.45, cj:"act", tags:["physiological adaptation","recovery plan","mental health","planning","collaboration"],
 stem:"A client is developing a recovery plan. Which action by the nurse is most appropriate?",
 opts:["Collaborate with the client to develop the plan, since recovery planning is a shared process","Develop the plan independently, since this is more efficient","Advise that recovery plans are not necessary","Focus on risk management, since this is the priority"],
 ans:0, rat:{c:"Recovery planning is collaborative, so the nurse works with the client. Independent, dismissing, and risk-only all miss the shared approach.", s:"Recovery planning is collaborative; the nurse must work with the client."}},
{id:"PAA-203", t:"single", cn:"PAA", sys:"PSYCH", topic:"Wellness Recovery Action Plan", d:3, b:0.55, cj:"act", tags:["physiological adaptation","WRAP","wellness","recovery","self-management"],
 stem:"A client wishes to develop a Wellness Recovery Action Plan. Which action by the nurse is most appropriate?",
 opts:["Support the client to develop their WRAP, since this is a self-management tool for wellness","Develop the wellness WRAP for the client, since this ensures quality","Advise that WRAPs are not evidence-based","Focus on crisis planning, since this is the priority"],
 ans:0, rat:{c:"WRAP is a client-developed self-management tool, so the nurse supports rather than develops. Nurse-developed, dismissing, and crisis-only all miss the self-management focus.", s:"WRAP is client-directed; the nurse must support self-management."}},
{id:"PAA-204", t:"single", cn:"PAA", sys:"PSYCH", topic:"Advance statement", d:3, b:0.55, cj:"act", tags:["physiological adaptation","advance statement","mental health","planning","autonomy"],
 stem:"A client with mental illness wishes to make an advance statement about future care. Which action by the nurse is most appropriate?",
 opts:["Support the client to make an advance statement, since this records their preferences for future care","Advise against the advance statement, since preferences may change","Ignore the request, since advance statements are not legally binding","Focus on current care, since future planning is not relevant"],
 ans:0, rat:{c:"Advance statements record client preferences and should be supported. Advising against, ignoring, and current-only all miss the value of advance planning.", s:"Advance statements support autonomy; the nurse must facilitate them."}}
,

/* ---------------------------------------------------------- Additional 5 */
{id:"SIC-196", t:"single", cn:"SIC", sys:"INTG", topic:"Wound measurement", d:2, b:0.45, cj:"act", tags:["safety","wound measurement","documentation","monitoring","assessment"],
 stem:"A client has a wound requiring ongoing assessment. Which action by the nurse is most appropriate?",
 opts:["Measure the wound consistently using length, width, and depth, since this tracks healing progress","Estimate the wound size, since precise measurement is not necessary","Measure only the length, since this is sufficient","Avoid measurement, since wounds change size frequently"],
 ans:0, rat:{c:"Consistent wound measurement with length, width, and depth tracks healing. Estimating, length-only, and avoiding all miss objective monitoring.", s:"Wound measurement guides treatment; the nurse must measure consistently."}},
{id:"SIC-197", t:"single", cn:"SIC", sys:"INTG", topic:"Wound infection signs", d:3, b:0.55, cj:"recognize", tags:["safety","wound infection","signs","recognition","assessment"],
 stem:"A wound shows increased pain, erythema extending beyond the wound edge, and purulent discharge. Which interpretation by the nurse is most accurate?",
 opts:["These findings suggest wound infection requiring assessment and possible treatment","These findings are normal wound healing and require no intervention","These findings suggest the dressing is too tight and needs changing","These findings suggest allergic reaction to the dressing"],
 ans:0, rat:{c:"Increased pain, spreading erythema, and purulent discharge suggest infection. Normal healing, tight dressing, and allergy all miss the infection.", s:"Wound infection has specific signs; the nurse must recognise and act."}},
{id:"BCC-136", t:"single", cn:"BCC", sys:"INTG", topic:"Stoma appliance change", d:2, b:0.45, cj:"act", tags:["basic care","stoma","appliance","change","technique"],
 stem:"A client requires a stoma appliance change. Which action by the nurse is most appropriate?",
 opts:["Change the appliance using correct technique, ensuring the skin is clean and dry before applying","Change the appliance quickly, since this reduces discomfort","Apply the appliance without cleaning the skin, since this is not necessary","Leave the appliance on for longer than recommended, since this reduces changes"],
 ans:0, rat:{c:"Stoma appliance change requires correct technique with clean dry skin. Quick change, no cleaning, and extended wear all risk skin damage.", s:"Stoma appliance technique prevents complications; the nurse must use correct method."}},
{id:"BCC-137", t:"single", cn:"BCC", sys:"INTG", topic:"Stoma siting", d:3, b:0.55, cj:"act", tags:["basic care","stoma","siting","preoperative","planning"],
 stem:"A client is scheduled for stoma formation. Which action by the nurse is most appropriate?",
 opts:["Ensure preoperative stoma siting is performed, since correct siting prevents complications and improves quality of life","Allow the surgeon to site the stoma intraoperatively, since this is more convenient","Site the stoma postoperatively, since this allows assessment of the client","Avoid stoma siting, since this is not necessary"],
 ans:0, rat:{c:"Preoperative stoma siting prevents complications and improves quality of life. Intraoperative, postoperative, and avoiding all miss the importance.", s:"Preoperative stoma siting is essential; the nurse must ensure it is performed."}},
{id:"PAA-205", t:"single", cn:"PAA", sys:"PSYCH", topic:"Relapse prevention plan", d:3, b:0.55, cj:"act", tags:["physiological adaptation","relapse prevention","mental health","planning","early warning"],
 stem:"A client with mental illness is being discharged. Which action by the nurse is most appropriate?",
 opts:["Develop a relapse prevention plan including early warning signs and coping strategies","Advise the client to seek help if they feel unwell, since this is sufficient","Avoid relapse prevention planning, since this may cause anxiety","Focus only on medication adherence, since this prevents relapse"],
 ans:0, rat:{c:"Relapse prevention planning includes early warning signs and coping strategies. General advice, avoiding planning, and medication-only all miss comprehensive prevention.", s:"Relapse prevention is essential; the nurse must develop a comprehensive plan."}}
]);
