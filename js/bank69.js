"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 59) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * category still under target after wave 58: MOC (17.8% vs 18).
 * Every item is difficulty 2 or 3, and the clinical detail is
 * written to be defensible.
 *
 * MOC 20: NMC code and professional standards, portfolio and
 * revalidation, appraisal and performance, learning from incidents,
 * serious incident investigation, inequality and disparity,
 * vulnerability and wider determinants, epidemiology and needs
 * assessment, and commissioning and service planning.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- MOC 20 */
{id:"MOC-268", t:"single", cn:"MOC", sys:"INTG", topic:"NMC code and professional standards", d:3, b:0.55, cj:"act", tags:["management","NMC","code","professional standards","accountability"],
 stem:"A nurse is uncertain about a professional decision. Which action by the nurse is most appropriate?",
 opts:["Refer to the NMC code and professional standards, since these guide practice and accountability","Make the decision independently, since professional judgement is sufficient","Seek advice from colleagues only, since the code is not practical","Withhold the decision, since this requires managerial input"],
 ans:0, rat:{c:"The NMC code and professional standards guide practice and accountability. Independent, colleagues-only, and withholding all miss the regulatory framework.", s:"NMC code is fundamental; the nurse must understand and apply it."}},
{id:"MOC-269", t:"single", cn:"MOC", sys:"INTG", topic:"Portfolio and revalidation", d:2, b:0.45, cj:"act", tags:["management","portfolio","revalidation","CPD","professional development"],
 stem:"A nurse is preparing for revalidation. Which action by the nurse is most appropriate?",
 opts:["Maintain a portfolio with evidence of CPD, practice hours, and feedback, since this supports revalidation","Complete the portfolio immediately before revalidation, since this is sufficient","Withhold the portfolio, since revalidation is not evidence-based","Rely on memory, since documentation is not required"],
 ans:0, rat:{c:"Revalidation requires a portfolio with CPD, practice hours, and feedback evidence. Immediate, withholding, and memory-only all miss the requirement.", s:"Portfolio maintenance is essential; the nurse must understand revalidation requirements."}},
{id:"MOC-270", t:"single", cn:"MOC", sys:"INTG", topic:"Appraisal and performance", d:2, b:0.45, cj:"act", tags:["management","appraisal","performance","development","reflection"],
 stem:"A nurse is due for appraisal. Which interpretation by the nurse is most accurate?",
 opts:["Appraisal is an opportunity for reflection, development planning, and identifying learning needs","Appraisal is a performance management process and should be avoided","Appraisal is only for underperforming staff","Appraisal is a formality and has no value"],
 ans:0, rat:{c:"Appraisal supports reflection, development, and learning needs. Performance management, underperforming-only, and formality all misrepresent the purpose.", s:"Appraisal is developmental; the nurse must engage constructively."}},
{id:"MOC-271", t:"single", cn:"MOC", sys:"INTG", topic:"Learning from incidents", d:3, b:0.55, cj:"act", tags:["management","learning","incidents","improvement","safety"],
 stem:"An incident has occurred on the ward. Which action by the nurse is most appropriate?",
 opts:["Participate in learning and improvement, since incidents provide opportunities to prevent recurrence","Avoid involvement, since this may lead to blame","Withhold information, since this protects colleagues","Assume the investigation will identify causes without input"],
 ans:0, rat:{c:"Incidents provide learning opportunities to prevent recurrence. Avoiding, withholding, and assuming all miss the improvement focus.", s:"Learning from incidents prevents recurrence; the nurse must participate."}},
{id:"MOC-272", t:"single", cn:"MOC", sys:"INTG", topic:"Serious incident investigation", d:3, b:0.55, cj:"act", tags:["management","serious incident","investigation","root cause","improvement"],
 stem:"A serious incident requires investigation. Which interpretation by the nurse is most accurate?",
 opts:["Investigation should identify root causes and system factors, not just individual error","Investigation should identify who is at fault and assign blame","Investigation is only required for fatal incidents","Investigation is a formality and does not change practice"],
 ans:0, rat:{c:"Serious incident investigation identifies root causes and system factors. Blame, fatal-only, and formality all misrepresent the purpose.", s:"Investigation is systemic; the nurse must understand the approach."}},
{id:"MOC-273", t:"single", cn:"MOC", sys:"INTG", topic:"Inequality and disparity", d:3, b:0.55, cj:"act", tags:["management","inequality","disparity","equity","public health"],
 stem:"Data shows health outcome disparities between population groups. Which action by the nurse is most appropriate?",
 opts:["Recognise inequality and contribute to addressing disparities through equitable practice","Assume disparities are inevitable and cannot be addressed","Withhold involvement, since this is a public health matter","Focus only on individual clients, since population data is not relevant"],
 ans:0, rat:{c:"Health inequality requires recognition and action through equitable practice. Assuming inevitable, withholding, and individual-only all miss the equity focus.", s:"Health inequality is addressable; the nurse must contribute to equity."}},
{id:"MOC-274", t:"single", cn:"MOC", sys:"INTG", topic:"Vulnerability and wider determinants", d:3, b:0.55, cj:"act", tags:["management","vulnerability","wider determinants","social","health"],
 stem:"A client's health is affected by housing, employment, and social circumstances. Which action by the nurse is most appropriate?",
 opts:["Recognise wider determinants of health and address them as part of holistic care","Focus only on clinical health needs, since social factors are not healthcare responsibility","Withhold involvement, since this is a social services matter","Advise the client to seek help themselves, since this respects autonomy"],
 ans:0, rat:{c:"Wider determinants significantly impact health and require holistic addressing. Clinical-only, withholding, and advising self-help all miss the determinants.", s:"Wider determinants are health determinants; the nurse must recognise and address them."}},
{id:"MOC-275", t:"single", cn:"MOC", sys:"INTG", topic:"Epidemiology and needs assessment", d:3, b:0.55, cj:"act", tags:["management","epidemiology","needs assessment","public health","planning"],
 stem:"A service is planning for population health needs. Which action by the nurse is most appropriate?",
 opts:["Use epidemiological data and needs assessment to inform planning, since this identifies population needs","Rely on individual clinical experience, since population data is not relevant","Withhold involvement, since planning is a commissioning matter","Assume current services meet all needs"],
 ans:0, rat:{c:"Epidemiological data and needs assessment identify population needs for planning. Experience-only, withholding, and assuming all miss the evidence base.", s:"Needs assessment is evidence-based; the nurse must understand and contribute."}},
{id:"MOC-276", t:"single", cn:"MOC", sys:"INTG", topic:"Commissioning and service planning", d:3, b:0.55, cj:"act", tags:["management","commissioning","service planning","population","health"],
 stem:"A service is being commissioned to meet population health needs. Which interpretation by the nurse is most accurate?",
 opts:["Commissioning involves assessing needs, planning services, and ensuring quality and value","Commissioning is only about cost and has no clinical relevance","Commissioning is not relevant to nursing practice","Commissioning is a management function and nurses should not be involved"],
 ans:0, rat:{c:"Commissioning involves needs assessment, planning, quality, and value. Cost-only, not relevant, and management-only all misrepresent the process.", s:"Commissioning shapes services; the nurse must understand and contribute."}},
{id:"MOC-277", t:"single", cn:"MOC", sys:"INTG", topic:"Quality improvement", d:2, b:0.45, cj:"act", tags:["management","quality improvement","change","implementation","outcome"],
 stem:"A ward identifies an area for improvement. Which action by the nurse is most appropriate?",
 opts:["Participate in quality improvement using structured approaches such as PDSA cycles","Assume improvement will happen without involvement","Withhold participation, since this is a management function","Wait for instructions, since improvement is not nursing responsibility"],
 ans:0, rat:{c:"Quality improvement requires participation using structured approaches. Assuming, withholding, and waiting all miss the improvement focus.", s:"Quality improvement is everyone's responsibility; the nurse must participate."}},
{id:"MOC-278", t:"single", cn:"MOC", sys:"INTG", topic:"Audit and clinical effectiveness", d:2, b:0.45, cj:"act", tags:["management","audit","clinical effectiveness","quality","improvement"],
 stem:"A clinical audit is being conducted. Which action by the nurse is most appropriate?",
 opts:["Participate in audit and implement changes based on findings, since this improves practice","Withhold participation, since audit is not nursing responsibility","Assume audit findings will be implemented without involvement","Wait for instructions, since audit is a management function"],
 ans:0, rat:{c:"Audit participation and implementing findings improves practice. Withholding, assuming, and waiting all miss the improvement focus.", s:"Audit improves practice; the nurse must participate and implement."}},
{id:"MOC-279", t:"single", cn:"MOC", sys:"INTG", topic:"Risk management", d:3, b:0.55, cj:"act", tags:["management","risk management","safety","prevention","assessment"],
 stem:"A risk is identified in the clinical environment. Which action by the nurse is most appropriate?",
 opts:["Report the risk and contribute to risk assessment and management, since this prevents harm","Assume the risk will be managed without involvement","Withhold reporting, since this may cause concern","Wait for instructions, since risk management is not nursing responsibility"],
 ans:0, rat:{c:"Risk reporting and management prevents harm. Assuming, withholding, and waiting all miss the safety focus.", s:"Risk management prevents harm; the nurse must report and contribute."}},
{id:"MOC-280", t:"single", cn:"MOC", sys:"INTG", topic:"Governance", d:3, b:0.55, cj:"act", tags:["management","governance","quality","safety","accountability"],
 stem:"A service has clinical governance arrangements. Which interpretation by the nurse is most accurate?",
 opts:["Clinical governance ensures quality and safety through accountability, audit, and improvement","Clinical governance is only about financial management","Clinical governance is not relevant to nursing practice","Clinical governance is a management function and nurses should not be involved"],
 ans:0, rat:{c:"Clinical governance ensures quality and safety through accountability. Financial-only, not relevant, and management-only all misrepresent the purpose.", s:"Clinical governance is fundamental; the nurse must understand and contribute."}},
{id:"MOC-281", t:"single", cn:"MOC", sys:"INTG", topic:"Duty of candour", d:3, b:0.55, cj:"act", tags:["management","duty of candour","openness","honesty","transparency"],
 stem:"An error has occurred that caused harm. Which action by the nurse is most appropriate?",
 opts:["Follow duty of candour requirements including apology, explanation, and support","Withhold information, since this may lead to blame","Provide minimal information, since full disclosure is not required","Wait for instructions, since candour is a management function"],
 ans:0, rat:{c:"Duty of candour requires apology, explanation, and support. Withholding, minimal, and waiting all breach the duty.", s:"Duty of candour is a legal duty; the nurse must understand and follow it."}},
{id:"MOC-282", t:"single", cn:"MOC", sys:"INTG", topic:"Delegation and supervision", d:3, b:0.55, cj:"act", tags:["management","delegation","supervision","accountability","competence"],
 stem:"A nurse delegates a task to a healthcare assistant. Which action by the nurse is most appropriate?",
 opts:["Ensure the assistant is competent, provide clear instructions, and maintain accountability for the delegation","Delegate without checking competence, since this is efficient","Withhold delegation, since this is not nursing practice","Assume the assistant will seek supervision independently"],
 ans:0, rat:{c:"Delegation requires competence checking, clear instructions, and maintained accountability. Without checking, withholding, and assuming all miss the responsibility.", s:"Delegation requires accountability; the nurse must understand the process."}},
{id:"MOC-283", t:"single", cn:"MOC", sys:"INTG", topic:"Scope of practice", d:3, b:0.55, cj:"act", tags:["management","scope of practice","competence","accountability","professional"],
 stem:"A nurse is asked to perform a task outside their competence. Which action by the nurse is most appropriate?",
 opts:["Decline and explain the scope of practice limitation, since performing beyond competence risks harm","Perform the task, since refusing may be seen as unhelpful","Perform the task with supervision, since this develops competence","Seek advice but perform anyway, since the task is urgent"],
 ans:0, rat:{c:"Performing beyond competence risks harm, so declining and explaining is required. Performing, with supervision, and anyway all risk harm.", s:"Scope of practice protects clients; the nurse must understand and maintain it."}},
{id:"MOC-284", t:"single", cn:"MOC", sys:"INTG", topic:"Fitness to practise", d:3, b:0.55, cj:"act", tags:["management","fitness to practise","health","wellbeing","professional"],
 stem:"A nurse's health is affecting their practice. Which action by the nurse is most appropriate?",
 opts:["Seek support and occupational health advice, since fitness to practise requires self-awareness and action","Continue practising, since seeking help may affect employment","Withhold information, since health is a private matter","Assume the issue will resolve without intervention"],
 ans:0, rat:{c:"Fitness to practise requires self-awareness and seeking support. Continuing, withholding, and assuming all risk harm and breach professional duty.", s:"Fitness to practise is a professional duty; the nurse must seek support."}},
{id:"MOC-285", t:"single", cn:"MOC", sys:"INTG", topic:"Professional development", d:2, b:0.45, cj:"act", tags:["management","professional development","CPD","learning","competence"],
 stem:"A nurse identifies a learning need. Which action by the nurse is most appropriate?",
 opts:["Address the learning need through CPD and seek opportunities to develop competence","Ignore the learning need, since this is not essential","Wait for training to be provided, since this is the employer's responsibility","Assume competence will develop through experience alone"],
 ans:0, rat:{c:"Learning needs require CPD and development opportunities. Ignoring, waiting, and experience-only all miss the professional duty.", s:"Professional development is a duty; the nurse must address learning needs."}},
{id:"MOC-286", t:"single", cn:"MOC", sys:"INTG", topic:"Evidence-based practice", d:3, b:0.55, cj:"act", tags:["management","evidence","practice","research","guidelines"],
 stem:"A nurse is uncertain about the best practice for a clinical situation. Which action by the nurse is most appropriate?",
 opts:["Seek evidence from guidelines, research, and expert opinion to inform practice","Rely on routine, since this is how things are done","Withhold the decision, since this requires specialist input","Assume current practice is correct"],
 ans:0, rat:{c:"Evidence-based practice requires seeking guidelines, research, and expert opinion. Routine, withholding, and assuming all miss the evidence focus.", s:"Evidence-based practice is fundamental; the nurse must seek and apply evidence."}},
{id:"MOC-287", t:"single", cn:"MOC", sys:"INTG", topic:"Reflective practice", d:2, b:0.45, cj:"act", tags:["management","reflection","practice","learning","development"],
 stem:"A nurse has been involved in a challenging situation. Which action by the nurse is most appropriate?",
 opts:["Reflect on the experience to identify learning and improve future practice","Avoid reflection, since this may cause distress","Withhold reflection, since this is not required","Assume learning will occur without reflection"],
 ans:0, rat:{c:"Reflection identifies learning and improves practice. Avoiding, withholding, and assuming all miss the developmental benefit.", s:"Reflection is developmental; the nurse must engage in reflective practice."}}

]);
