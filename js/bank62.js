"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 52) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 51: MOC (17.9% vs 18)
 * and PAA (13.8% vs 14). Every item is difficulty 2 or 3, and the
 * clinical detail is written to be defensible.
 *
 * MOC 10: deputy appointed by the Court of Protection, the Mental
 * Capacity Act principles, presumption of capacity, supported
 * decision-making, DNACPR decisions, resuscitation decision-making,
 * ceiling of care, treatment escalation plans, person-centred care,
 * and Fraser guidelines.
 * PAA 6: transition to adult services, confidentiality for young
 * people, 16 and 17 year olds and consent, adolescent confidentiality,
 * Fraser competence, and Gillick competence.
 * PHA 4: advance decision to refuse treatment, lasting power of
 * attorney for health, best interests decision-making, and unwise
 * decisions with capacity.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- MOC 10 */
{id:"MOC-244", t:"single", cn:"MOC", sys:"INTG", topic:"Deputy appointed by the Court of Protection", d:3, b:0.55, cj:"analyze", tags:["management","deputy","court of protection","mental capacity","decision making"],
 stem:"A client lacks capacity and has a deputy appointed by the Court of Protection for health and welfare. Which interpretation by the nurse is most accurate?",
 opts:["The deputy may make decisions within the scope of their authority, and the nurse should verify this","The deputy can make any decision, since they are appointed by the court","The deputy has no authority over health decisions","The nurse should make all decisions, since the deputy is not a professional"],
 ans:0, rat:{c:"A deputy acts within the scope of their court-appointed authority, and the nurse must verify this. Assuming unlimited authority, denying all authority, and overriding the deputy all breach the legal framework.", s:"Deputies have specific, court-defined authority; the nurse must understand and verify the scope."}},
{id:"MOC-245", t:"single", cn:"MOC", sys:"INTG", topic:"Mental Capacity Act principles", d:3, b:0.55, cj:"analyze", tags:["management","mental capacity act","principles","capacity","legal"],
 stem:"A nurse is assessing a client's capacity to make a decision. Which interpretation by the nurse is most accurate?",
 opts:["Capacity is decision-specific and time-specific, and a person must be assumed to have capacity unless proven otherwise","Capacity is a global assessment and once lacking applies to all decisions","Capacity, once lost, is permanent and cannot be regained","Family members can decide capacity on behalf of the person"],
 ans:0, rat:{c:"The Mental Capacity Act establishes that capacity is decision-specific and time-specific, with a presumption of capacity. Global assessments, permanence, and family determination all contradict the Act's principles.", s:"Understanding the Mental Capacity Act principles is essential; the nurse must apply them correctly."}},
{id:"MOC-246", t:"single", cn:"MOC", sys:"INTG", topic:"Presumption of capacity", d:2, b:0.45, cj:"act", tags:["management","presumption","capacity","assessment","legal"],
 stem:"A client wishes to make a decision that the nurse believes is unwise. Which action by the nurse is most appropriate?",
 opts:["Assess capacity, since a person must be presumed to have capacity and an unwise decision does not indicate lack of capacity","Override the decision, since the nurse knows best","Involve the family to make the decision, since the client is unwise","Document the decision as lacking capacity without assessment"],
 ans:0, rat:{c:"The presumption of capacity requires assessment, and an unwise decision does not indicate lack of capacity. Overriding, involving family without assessment, and documenting without assessment all breach the legal framework.", s:"Presumption of capacity is fundamental; the nurse must assess rather than assume."}},
{id:"MOC-247", t:"single", cn:"MOC", sys:"INTG", topic:"Supported decision-making", d:3, b:0.55, cj:"act", tags:["management","supported decision","capacity","support","enablement"],
 stem:"A client with learning disabilities needs to make a healthcare decision. Which action by the nurse is most appropriate?",
 opts:["Provide support to enable the client to make the decision, using accessible information and additional time","Make the decision for the client, since this is quicker and safer","Involve the family to decide, since the client has learning disabilities","Delay the decision, since the client may not have capacity"],
 ans:0, rat:{c:"Supported decision-making requires providing accessible information and time to enable the client to decide. Making the decision, involving family without support, and delaying all fail to maximise the client's autonomy.", s:"Supported decision-making enables autonomy; the nurse must provide appropriate support."}},
{id:"MOC-248", t:"single", cn:"MOC", sys:"CV", topic:"DNACPR decisions", d:3, b:0.55, cj:"act", tags:["management","DNACPR","resuscitation","decision making","communication"],
 stem:"A client asks about their DNACPR status. Which action by the nurse is most appropriate?",
 opts:["Discuss the decision honestly, explaining that DNACPR applies only to CPR and not to other treatments","Avoid the discussion, since this may cause distress","Explain that DNACPR means no active treatment will be given","Advise that the decision cannot be discussed with the client"],
 ans:0, rat:{c:"DNACPR decisions should be discussed honestly, clarifying that it applies only to CPR and not other treatments. Avoiding discussion, misrepresenting the decision, and refusing to discuss all breach communication obligations.", s:"DNACPR must be communicated clearly; the nurse must explain what it does and does not mean."}},
{id:"MOC-249", t:"single", cn:"MOC", sys:"INTG", topic:"Resuscitation decision-making", d:3, b:0.55, cj:"analyze", tags:["management","resuscitation","decision making","capacity","best interests"],
 stem:"A client with capacity asks for CPR to be attempted despite a poor prognosis. Which interpretation by the nurse is most accurate?",
 opts:["The client's wishes should be considered, but the clinical team makes the final decision based on clinical judgement and likelihood of benefit","The client can demand CPR, since they have capacity","The clinical team can refuse without considering the client's wishes","The family should decide, since the prognosis is poor"],
 ans:0, rat:{c:"Resuscitation decisions involve considering the client's wishes alongside clinical judgement about benefit. Client demand, team refusal without consideration, and family decision all misrepresent the decision-making process.", s:"Resuscitation decisions balance client wishes with clinical judgement; the nurse must understand this balance."}},
{id:"MOC-250", t:"single", cn:"MOC", sys:"INTG", topic:"Ceiling of care", d:3, b:0.55, cj:"act", tags:["management","ceiling of care","escalation","limitation","decision making"],
 stem:"A client's ceiling of care is documented as ward-based treatment. Which interpretation by the nurse is most accurate?",
 opts:["This means the client will not be transferred to a higher level of care, but ward-based treatment continues","This means no further ward-based treatment will be given","This means the client is for palliative care only","This decision cannot be changed once documented"],
 ans:0, rat:{c:"A ceiling of care defines the maximum level of intervention, not cessation of all treatment. Ward-based treatment continues, palliative care is not automatic, and decisions can be reviewed.", s:"Ceiling of care defines limits, not cessation; the nurse must understand what it means and does not mean."}},
{id:"MOC-251", t:"single", cn:"MOC", sys:"INTG", topic:"Treatment escalation plan", d:3, b:0.55, cj:"act", tags:["management","treatment escalation","plan","deterioration","communication"],
 stem:"A client has a treatment escalation plan documenting their wishes. Which action by the nurse is most appropriate?",
 opts:["Follow the plan and communicate it to the team, since it guides response to deterioration","Ignore the plan, since clinical judgement overrides it","Wait for the plan to be reviewed before following it","Advise that the plan is not legally binding and can be disregarded"],
 ans:0, rat:{c:"Treatment escalation plans guide response to deterioration and should be followed and communicated. Ignoring, waiting, and disregarding all fail to respect the client's documented wishes.", s:"Treatment escalation plans guide care; the nurse must follow and communicate them."}},
{id:"MOC-252", t:"single", cn:"MOC", sys:"INTG", topic:"Person-centred care", d:2, b:0.45, cj:"act", tags:["management","person centred","care","individual","preference"],
 stem:"A client has specific preferences about how their care is delivered. Which action by the nurse is most appropriate?",
 opts:["Accommodate preferences where possible, since person-centred care respects individual choices","Advise that ward routines must be followed, since this is more efficient","Ignore preferences, since clinical need takes priority","Ask the family what the client would want, since they know better"],
 ans:0, rat:{c:"Person-centred care requires accommodating preferences where possible. Prioritising routine, ignoring preferences, and asking family all fail to respect the client's autonomy.", s:"Person-centred care respects individual preferences; the nurse must accommodate where possible."}},
{id:"MOC-253", t:"single", cn:"MOC", sys:"INTG", topic:"Fraser guidelines", d:3, b:0.55, cj:"act", tags:["management","Fraser guidelines","young person","confidentiality","contraception"],
 stem:"A 15-year-old requests contraception and does not wish to inform their parents. Which action by the nurse is most appropriate?",
 opts:["Assess Fraser competence, since a young person under 16 may consent to treatment if they meet the criteria","Refuse contraception, since parental consent is required","Inform the parents, since the client is under 16","Delay until the client is 16, since this is the legal age of consent"],
 ans:0, rat:{c:"Fraser guidelines allow young people under 16 to consent to contraception if they meet specific competence criteria. Refusing, informing parents without consent, and delaying all fail to respect the young person's rights.", s:"Fraser guidelines enable competent young people to consent; the nurse must assess competence appropriately."}},

/* ---------------------------------------------------------- PAA 6 */
{id:"PAA-189", t:"single", cn:"PAA", sys:"INTG", topic:"Transition to adult services", d:3, b:0.55, cj:"act", tags:["physiological adaptation","transition","adult services","young person","continuity"],
 stem:"A young person with a long-term condition is approaching transfer to adult services. Which action by the nurse is most appropriate?",
 opts:["Plan transition gradually, involving the young person in preparation and ensuring information transfer","Transfer the young person abruptly at 18, since this is the legal age of adulthood","Delay transfer, since paediatric services are more appropriate","Transfer without information, since adult services will reassess"],
 ans:0, rat:{c:"Transition requires gradual planning with the young person's involvement and information transfer. Abrupt transfer, delay, and omission of information all risk disruption to care.", s:"Transition must be planned; the nurse must involve the young person and ensure continuity."}},
{id:"PAA-190", t:"single", cn:"PAA", sys:"INTG", topic:"Confidentiality for young people", d:3, b:0.55, cj:"act", tags:["physiological adaptation","confidentiality","young person","consent","privacy"],
 stem:"A 16-year-old asks whether their consultation is confidential. Which action by the nurse is most appropriate?",
 opts:["Explain that confidentiality applies, with usual exceptions such as risk of serious harm","Advise that parents will be informed, since the client is under 18","Advise that confidentiality cannot be offered to young people","Avoid the discussion, since this is too complex"],
 ans:0, rat:{c:"Young people aged 16 and over are entitled to confidentiality with usual exceptions. Informing parents, denying confidentiality, and avoiding discussion all fail to respect the young person's rights.", s:"Confidentiality applies to young people; the nurse must explain this clearly."}},
{id:"PAA-191", t:"single", cn:"PAA", sys:"INTG", topic:"16 and 17 year olds and consent", d:2, b:0.45, cj:"analyze", tags:["physiological adaptation","consent","16 year old","17 year old","capacity"],
 stem:"A 17-year-old wishes to consent to treatment without parental involvement. Which interpretation by the nurse is most accurate?",
 opts:["In many jurisdictions, 16 and 17 year olds are presumed to have capacity to consent to treatment","Parental consent is always required for those under 18","The young person cannot consent without a court order","Capacity must be formally assessed before any treatment"],
 ans:0, rat:{c:"In many jurisdictions, 16 and 17 year olds are presumed to have capacity to consent. Parental consent, court orders, and formal assessment are not always required.", s:"Understanding consent for 16 and 17 year olds is essential; the nurse must know the legal framework."}},
{id:"PAA-192", t:"single", cn:"PAA", sys:"INTG", topic:"Adolescent confidentiality", d:3, b:0.55, cj:"act", tags:["physiological adaptation","adolescent","confidentiality","privacy","trust"],
 stem:"An adolescent discloses sensitive information and asks that it not be shared. Which action by the nurse is most appropriate?",
 opts:["Respect confidentiality unless there is risk of serious harm, explaining the limits of confidentiality","Share the information with parents, since the client is a minor","Share with the team, since this is relevant to care","Refuse to accept the disclosure, since it cannot be kept confidential"],
 ans:0, rat:{c:"Adolescent confidentiality should be respected unless there is risk of serious harm, with limits explained. Sharing with parents or team without consent, and refusing disclosure, all breach trust and confidentiality.", s:"Adolescent confidentiality builds trust; the nurse must respect it within legal limits."}},
{id:"PAA-193", t:"single", cn:"PAA", sys:"INTG", topic:"Fraser competence", d:3, b:0.55, cj:"act", tags:["physiological adaptation","Fraser","competence","young person","contraception"],
 stem:"A 15-year-old requests contraception. Which action by the nurse is most appropriate?",
 opts:["Assess Fraser competence, considering whether the young person understands the advice and cannot be persuaded to inform parents","Refuse contraception, since the client is under 16","Require parental consent, since this is a medical treatment","Delay until the client is 16, since this is simpler"],
 ans:0, rat:{c:"Fraser competence assessment considers understanding and whether the young person can be persuaded to inform parents. Refusing, requiring parental consent, and delaying all fail to respect the young person's rights.", s:"Fraser competence enables access to contraception; the nurse must assess appropriately."}},
{id:"PAA-194", t:"single", cn:"PAA", sys:"INTG", topic:"Gillick competence", d:3, b:0.55, cj:"act", tags:["physiological adaptation","Gillick","competence","young person","consent"],
 stem:"A 14-year-old wishes to consent to treatment. Which action by the nurse is most appropriate?",
 opts:["Assess Gillick competence, since a young person under 16 may consent if they have sufficient understanding","Refuse treatment, since parental consent is required","Require a court order, since the client is under 16","Delay until the client is 16, since this is the legal age"],
 ans:0, rat:{c:"Gillick competence allows young people under 16 to consent if they have sufficient understanding. Refusing, requiring court orders, and delaying all fail to respect the young person's rights.", s:"Gillick competence enables consent for under-16s; the nurse must assess understanding."}},

/* ---------------------------------------------------------- PHA 4 */
{id:"PHA-226", t:"single", cn:"PHA", sys:"INTG", topic:"Advance decision to refuse treatment", d:3, b:0.55, cj:"act", tags:["pharmacology","advance decision","refuse treatment","capacity","legal"],
 stem:"A client has a valid advance decision refusing a specific treatment. Which action by the nurse is most appropriate?",
 opts:["Respect the advance decision, since a valid and applicable refusal is legally binding","Override the decision, since the treatment is clinically indicated","Ignore the decision, since a valid advance decision cannot apply to the current situation","Seek a court order, since advance decisions are not binding"],
 ans:0, rat:{c:"A valid and applicable advance decision to refuse treatment is legally binding and must be respected. Overriding, ignoring, and seeking court orders all breach the legal framework.", s:"Advance decisions are legally binding; the nurse must respect valid refusals."}},
{id:"PHA-227", t:"single", cn:"PHA", sys:"INTG", topic:"Lasting power of attorney for health", d:3, b:0.55, cj:"act", tags:["pharmacology","lasting power","attorney","health","decision making"],
 stem:"A client lacks capacity and has a lasting power of attorney for health and welfare. Which action by the nurse is most appropriate?",
 opts:["Consult the attorney for decisions within their authority, since they can make health decisions on the client's behalf","Make all decisions independently, since the attorney is not a professional","Ignore the attorney, since family members cannot make health decisions","Seek a court order for every decision"],
 ans:0, rat:{c:"A lasting power of attorney for health can make decisions within their authority when the client lacks capacity. Independent decisions, ignoring the attorney, and seeking court orders all fail to respect the legal framework.", s:"Lasting power of attorney enables surrogate decision-making; the nurse must consult appropriately."}},
{id:"PHA-228", t:"single", cn:"PHA", sys:"INTG", topic:"Best interests decision-making", d:3, b:0.55, cj:"act", tags:["pharmacology","best interests","capacity","decision making","legal"],
 stem:"A client lacks capacity and no advance decision or attorney exists. Which action by the nurse is most appropriate?",
 opts:["Make decisions in the client's best interests, considering their past wishes, beliefs, and values","Make decisions based on what the team thinks is best, ignoring the client's wishes","Involve the family to decide, since they know the client best","Delay decisions until capacity is regained"],
 ans:0, rat:{c:"Best interests decision-making requires considering the client's past wishes, beliefs, and values. Ignoring wishes, family-only decisions, and delay all fail to apply the best interests principle correctly.", s:"Best interests is a structured process; the nurse must consider all relevant factors."}},
{id:"PHA-229", t:"single", cn:"PHA", sys:"INTG", topic:"Unwise decisions with capacity", d:3, b:0.55, cj:"analyze", tags:["pharmacology","unwise decisions","capacity","autonomy","legal"],
 stem:"A client with capacity makes a decision the team considers unwise. Which interpretation by the nurse is most accurate?",
 opts:["A person with capacity has the right to make unwise decisions, and this does not indicate lack of capacity","Unwise decisions indicate lack of capacity and require override","The team can override unwise decisions, since they know best","Family members should decide, since the decision is unwise"],
 ans:0, rat:{c:"A person with capacity has the right to make unwise decisions, and this does not indicate lack of capacity. Override, team decisions, and family involvement all breach the Mental Capacity Act principles.", s:"The right to make unwise decisions is fundamental; the nurse must respect autonomy."}}

]);
