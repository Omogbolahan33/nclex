"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 51) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 50: SIC (12.8% vs 13),
 * HPM (8.9% vs 9), PHA (15.9% vs 16) and RRP (11.9% vs 12).
 * Every item is difficulty 2 or 3, and the clinical detail is
 * written to be defensible.
 *
 * SIC 5: the golden hour in sepsis, noradrenaline in septic shock,
 * skin mottling as a sign of shock, Bair hugger and forced air
 * warming, and fluid and blood warmers.
 * PHA 5: anaphylaxis transfusion reaction, delayed haemolytic
 * transfusion reaction, graft versus host disease, CMV negative
 * blood, and leucodepleted blood.
 * RRP 5: recombinant factor VIIa, aminocaproic acid, aprotinin,
 * the 1:1:1 massive transfusion ratio, and blood conservation
 * strategies.
 * HPM 5: sepsis recognition in the community, sepsis screening
 * tools, lactate clearance, source control, and antibiotic timing.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- SIC 5 */
{id:"SIC-176", t:"single", cn:"SIC", sys:"INTG", topic:"Golden hour in sepsis", d:3, b:0.55, cj:"act", tags:["safety","sepsis","golden hour","time critical","escalation"],
 stem:"A client meets sepsis screening criteria. Which action by the nurse is the priority?",
 opts:["Escalate immediately, since the golden hour emphasises time-critical intervention including antibiotics within one hour","Complete all observations first, since a full assessment is required before escalating","Wait for the doctor to review, since escalation is not the nurse's role","Repeat the observations in an hour to confirm the findings"],
 ans:0, rat:{c:"The golden hour in sepsis emphasises time-critical intervention, including antibiotics within one hour, so immediate escalation is required. Completing observations, waiting, and repeating all delay life-saving treatment.", s:"Sepsis is time-critical; the nurse must escalate immediately rather than delay for completeness."}},
{id:"SIC-177", t:"single", cn:"SIC", sys:"CV", topic:"Noradrenaline in septic shock", d:3, b:0.55, cj:"act", tags:["safety","noradrenaline","septic shock","vasopressor","monitoring"],
 stem:"A client in septic shock requires noradrenaline. Which action by the nurse is most appropriate?",
 opts:["Administer via central venous access with continuous monitoring, since peripheral administration risks extravasation injury","Administer peripherally, since this is quicker and equally safe","Administer without continuous monitoring, since the dose is standard","Administer as a bolus, since this achieves rapid effect"],
 ans:0, rat:{c:"Noradrenaline requires central venous access due to extravasation risk, with continuous monitoring. Peripheral administration, omitting monitoring, and bolus administration all risk serious harm.", s:"Vasopressor administration requires specific safety measures; the nurse must understand the risks of peripheral administration."}},
{id:"SIC-178", t:"single", cn:"SIC", sys:"CV", topic:"Skin mottling as a sign of shock", d:2, b:0.45, cj:"recognize", tags:["safety","skin mottling","shock","perfusion","assessment"],
 stem:"A client develops mottled, patchy discolouration of the skin over the knees. Which interpretation by the nurse is most accurate?",
 opts:["This suggests poor peripheral perfusion and may indicate shock, requiring urgent assessment","This is a normal finding and does not require action","This indicates a skin allergy and requires antihistamine","This is related to temperature and will resolve with warming"],
 ans:0, rat:{c:"Skin mottling suggests poor peripheral perfusion and may indicate shock, requiring urgent assessment. Dismissing it as normal, allergy, or temperature-related risks missing deterioration.", s:"Skin mottling is a sign of poor perfusion; the nurse must recognise and act on it."}},
{id:"SIC-179", t:"single", cn:"SIC", sys:"INTG", topic:"Bair hugger and forced air warming", d:2, b:0.45, cj:"act", tags:["safety","Bair hugger","forced air","warming","hypothermia","prevention"],
 stem:"A client is at risk of hypothermia during a procedure. Which action by the nurse is most appropriate?",
 opts:["Use a Bair hugger or similar forced air warming device, monitoring temperature and skin integrity","Use hot water bottles, since these are effective and available","Do not warm actively, since hypothermia is not a concern","Use blankets only, since active warming is unnecessary"],
 ans:0, rat:{c:"Forced air warming devices such as Bair huggers are effective for preventing hypothermia, with temperature and skin monitoring. Hot water bottles risk burns, omitting warming risks hypothermia, and blankets alone may be insufficient.", s:"Active warming prevents hypothermia; the nurse must use appropriate devices and monitor."}},
{id:"SIC-180", t:"single", cn:"SIC", sys:"CV", topic:"Fluid and blood warmers", d:3, b:0.55, cj:"act", tags:["safety","fluid warmer","blood warmer","hypothermia","transfusion","prevention"],
 stem:"A client requires rapid fluid resuscitation and blood transfusion. Which action by the nurse is most appropriate?",
 opts:["Use a fluid warmer for large volumes and rapid transfusion, since cold fluids contribute to hypothermia","Administer cold fluid rapidly, since this is standard practice for transfusion","Warm fluids only if the client complains of cold during rapid transfusion","Use a blood warmer for all transfusions, regardless of volume"],
 ans:0, rat:{c:"Fluid warmers are indicated for large volumes and rapid transfusion to prevent hypothermia. Administering cold fluids, warming only on complaint, and using warmers for all transfusions all represent inappropriate practice.", s:"Fluid warming prevents hypothermia during rapid resuscitation; the nurse must use warmers appropriately."}},

/* ---------------------------------------------------------- PHA 5 */
{id:"PHA-221", t:"single", cn:"PHA", sys:"HEME", topic:"Anaphylaxis transfusion reaction", d:3, b:0.55, cj:"act", tags:["pharmacology","anaphylaxis","transfusion reaction","emergency","IgA deficiency"],
 stem:"A client develops wheeze, hypotension, and rash shortly after starting a blood transfusion. Which action by the nurse is the priority?",
 opts:["Stop the transfusion immediately, since these findings suggest anaphylaxis requiring emergency treatment","Slow the transfusion, since this may reduce the reaction","Continue the transfusion and administer antihistamine, since this treats the symptoms","Complete the transfusion, since stopping wastes the blood"],
 ans:0, rat:{c:"Wheeze, hypotension, and rash during transfusion suggest anaphylaxis, requiring immediate cessation and emergency treatment. Slowing, continuing with antihistamine, and completing all risk fatal deterioration.", s:"Anaphylaxis is life-threatening; the nurse must stop the transfusion immediately and escalate."}},
{id:"PHA-222", t:"single", cn:"PHA", sys:"HEME", topic:"Delayed haemolytic transfusion reaction", d:3, b:0.55, cj:"recognize", tags:["pharmacology","delayed haemolytic","transfusion reaction","recognition","monitoring"],
 stem:"A client develops fever, jaundice, and falling haemoglobin several days after transfusion. Which interpretation by the nurse is most accurate?",
 opts:["These findings suggest delayed haemolytic transfusion reaction and require investigation","These findings suggest infection unrelated to the transfusion","These findings are expected after transfusion and require no action","These findings suggest the transfusion was ineffective"],
 ans:0, rat:{c:"Fever, jaundice, and falling haemoglobin days after transfusion suggest delayed haemolytic reaction requiring investigation. Attributing to infection, dismissing as expected, and interpreting as ineffective all miss the diagnosis.", s:"Delayed haemolytic reactions occur days later; the nurse must recognise and investigate."}},
{id:"PHA-223", t:"single", cn:"PHA", sys:"HEME", topic:"Graft versus host disease", d:3, b:0.55, cj:"act", tags:["pharmacology","graft versus host","transfusion","irradiated blood","prevention"],
 stem:"An immunocompromised client requires blood transfusion. Which action by the nurse is most appropriate?",
 opts:["Ensure irradiated blood is used, since this prevents transfusion-associated graft versus host disease","Use standard blood, since irradiation is not necessary","Use leucodepleted blood, since this prevents graft versus host disease","Advise against transfusion, since the risk is too high"],
 ans:0, rat:{c:"Irradiated blood prevents transfusion-associated graft versus host disease in immunocompromised clients. Standard blood risks GVHD, leucodepletion prevents different complications, and withholding transfusion may be inappropriate.", s:"Irradiated blood is essential for immunocompromised clients; the nurse must ensure it is used."}},
{id:"PHA-224", t:"single", cn:"PHA", sys:"HEME", topic:"CMV negative blood", d:2, b:0.45, cj:"act", tags:["pharmacology","CMV negative","transfusion","immunocompromised","prevention"],
 stem:"A pregnant client requires blood transfusion. Which action by the nurse is most appropriate?",
 opts:["Ensure CMV negative blood is used, since this prevents CMV transmission to the fetus","Use standard blood, since CMV is not a concern in transfusion","Use leucodepleted blood, since this is equivalent to CMV negative","Advise against transfusion, since the risk is too high"],
 ans:0, rat:{c:"CMV negative blood prevents CMV transmission, which is particularly important in pregnancy to protect the fetus. Standard blood risks transmission, leucodepletion is not equivalent, and withholding transfusion may be inappropriate.", s:"CMV negative blood is indicated for specific groups; the nurse must ensure it is used."}},
{id:"PHA-225", t:"single", cn:"PHA", sys:"HEME", topic:"Leucodepleted blood", d:2, b:0.45, cj:"analyze", tags:["pharmacology","leucodepleted","transfusion","febrile reaction","prevention"],
 stem:"A client has had previous febrile non-haemolytic transfusion reactions. Which interpretation by the nurse is most accurate?",
 opts:["Leucodepleted blood reduces the risk of febrile reactions, so this should be considered","Standard blood is equally suitable, since leucodepletion makes no difference to febrile reactions","Leucodepleted blood prevents all transfusion reactions","The client should not receive further transfusions"],
 ans:0, rat:{c:"Leucodepleted blood reduces febrile non-haemolytic reactions and should be considered for clients with previous reactions. Standard blood is not equivalent, leucodepletion does not prevent all reactions, and withholding transfusion may be inappropriate.", s:"Leucodepletion reduces specific reaction risks; the nurse must understand its indications."}},

/* ---------------------------------------------------------- RRP 5 */
{id:"RRP-169", t:"single", cn:"RRP", sys:"HEME", topic:"Recombinant factor VIIa", d:3, b:0.55, cj:"act", tags:["risk","recombinant factor","VIIa","bleeding","haemophilia","treatment"],
 stem:"A client with haemophilia and inhibitors requires bleeding control. Which action by the nurse is most appropriate?",
 opts:["Administer recombinant factor VIIa as prescribed, since this bypasses the inhibitor","Administer standard factor VIII, since this is the usual treatment","Withhold treatment, since inhibitors make treatment impossible","Administer fresh frozen plasma, since this replaces all factors"],
 ans:0, rat:{c:"Recombinant factor VIIa bypasses inhibitors in haemophilia and is indicated for bleeding control. Standard factor VIII is ineffective with inhibitors, withholding treatment risks harm, and FFP does not address the specific need.", s:"Inhibitors complicate haemophilia treatment; the nurse must understand bypassing agents."}},
{id:"RRP-170", t:"single", cn:"RRP", sys:"HEME", topic:"Aminocaproic acid", d:2, b:0.45, cj:"act", tags:["risk","aminocaproic acid","antifibrinolytic","bleeding","treatment"],
 stem:"A client requires an antifibrinolytic agent for bleeding. Which action by the nurse is most appropriate?",
 opts:["Administer aminocaproic acid as prescribed, monitoring for thrombotic complications","Administer without monitoring, since antifibrinolytics are safe","Withhold the medication, since bleeding should not be treated","Administer heparin simultaneously, since this prevents thrombosis"],
 ans:0, rat:{c:"Aminocaproic acid is an antifibrinolytic requiring monitoring for thrombotic complications. Omitting monitoring, withholding treatment, and adding heparin all represent inappropriate practice.", s:"Antifibrinolytics carry thrombotic risk; the nurse must monitor appropriately."}},
{id:"RRP-171", t:"single", cn:"RRP", sys:"HEME", topic:"Aprotinin", d:3, b:0.55, cj:"act", tags:["risk","aprotinin","antifibrinolytic","cardiac surgery","bleeding"],
 stem:"Aprotinin is prescribed during cardiac surgery to reduce bleeding. Which action by the nurse is most appropriate?",
 opts:["Administer as prescribed, monitoring for anaphylaxis, since this is a known risk","Administer without monitoring, since aprotinin is safe","Withhold the medication, since antifibrinolytics are contraindicated in cardiac surgery","Administer only if bleeding is severe"],
 ans:0, rat:{c:"Aprotinin requires monitoring for anaphylaxis, a known risk. Omitting monitoring, withholding, and conditional administration all represent inappropriate practice.", s:"Aprotinin carries anaphylaxis risk; the nurse must monitor and be prepared to respond."}},
{id:"RRP-172", t:"single", cn:"RRP", sys:"HEME", topic:"1:1:1 massive transfusion ratio", d:3, b:0.55, cj:"act", tags:["risk","massive transfusion","ratio","1:1:1","bleeding","protocol"],
 stem:"A client requires massive transfusion for major haemorrhage. Which action by the nurse is most appropriate?",
 opts:["Follow the massive transfusion protocol, typically using a 1:1:1 ratio of red cells, plasma, and platelets","Administer red cells only, since this is sufficient for massive transfusion","Administer plasma only, since this corrects coagulopathy","Wait for blood results before starting transfusion"],
 ans:0, rat:{c:"Massive transfusion protocols typically use balanced ratios such as 1:1:1 to address blood loss and coagulopathy. Red cells or plasma alone, and waiting for results, all risk inadequate resuscitation.", s:"Massive transfusion requires balanced component therapy; the nurse must follow the protocol."}},
{id:"RRP-173", t:"single", cn:"RRP", sys:"HEME", topic:"Blood conservation strategies", d:2, b:0.45, cj:"act", tags:["risk","blood conservation","transfusion","minimising","strategies"],
 stem:"A client is at risk of requiring transfusion. Which action by the nurse is most appropriate?",
 opts:["Implement blood conservation strategies such as minimising blood sampling and treating reversible causes","Transfuse prophylactically, since this prevents anaemia","Allow unrestricted blood sampling, since this is necessary for monitoring","Withhold treatment for anaemia, since this is not effective"],
 ans:0, rat:{c:"Blood conservation includes minimising sampling and treating reversible causes to reduce transfusion need. Prophylactic transfusion, unrestricted sampling, and withholding treatment all increase transfusion risk.", s:"Blood conservation reduces transfusion need; the nurse must implement appropriate strategies."}},

/* ---------------------------------------------------------- HPM 5 */
{id:"HPM-123", t:"single", cn:"HPM", sys:"INF", topic:"Sepsis recognition in the community", d:3, b:0.55, cj:"recognize", tags:["health promotion","sepsis","community","recognition","escalation"],
 stem:"A client in the community appears confused, has rapid breathing, and feels very unwell. Which action by the nurse is most appropriate?",
 opts:["Recognise possible sepsis and escalate urgently, since community sepsis requires prompt hospital assessment","Advise rest and fluids in the community, since the client appears stable","Wait for the GP appointment, since this is not urgent","Advise over-the-counter medication, since this may help symptoms"],
 ans:0, rat:{c:"Confusion, rapid breathing, and feeling very unwell suggest possible sepsis requiring urgent hospital assessment. Advising rest, waiting, and self-care all risk delay in life-saving treatment.", s:"Community sepsis recognition is critical; the nurse must escalate urgently."}},
{id:"HPM-124", t:"single", cn:"HPM", sys:"INF", topic:"Sepsis screening tools", d:2, b:0.45, cj:"act", tags:["health promotion","sepsis","screening","tools","early detection"],
 stem:"A ward uses a sepsis screening tool. Which interpretation by the nurse is most accurate?",
 opts:["The screening tool helps identify clients at risk of sepsis, but clinical judgement remains essential","The screening tool replaces clinical judgement and assessment","The screening tool is only useful in critical care","A negative screening result excludes sepsis"],
 ans:0, rat:{c:"Sepsis screening tools support early identification but do not replace clinical judgement. They are useful across settings, and a negative result does not exclude sepsis.", s:"Screening tools support but do not replace clinical judgement; the nurse must understand their role and limitations."}},
{id:"HPM-125", t:"single", cn:"HPM", sys:"INF", topic:"Lactate clearance", d:3, b:0.55, cj:"evaluate", tags:["health promotion","lactate","sepsis","monitoring","response"],
 stem:"A client with sepsis has an initial lactate of 4 mmol/L. Which action by the nurse is most appropriate?",
 opts:["Repeat the lactate to assess response to treatment, since clearance indicates improving perfusion","Assume the lactate will normalise without repeat measurement","Disregard the lactate, since it is not clinically useful","Repeat the lactate only if the client deteriorates"],
 ans:0, rat:{c:"Lactate clearance indicates response to treatment and improving perfusion, so repeat measurement is essential. Assuming normalisation, disregarding, and conditional repeat all miss the opportunity to assess response.", s:"Lactate clearance guides sepsis management; the nurse must monitor response to treatment."}},
{id:"HPM-126", t:"single", cn:"HPM", sys:"INF", topic:"Source control", d:3, b:0.55, cj:"act", tags:["health promotion","source control","sepsis","infection","treatment"],
 stem:"A client with sepsis has an infected wound identified as the likely source. Which action by the nurse is most appropriate?",
 opts:["Recognise that source control is essential and escalate for wound management alongside antibiotics","Rely on antibiotics alone, since source control is not necessary","Wait for antibiotics to work before addressing the wound","Advise that the wound is not the source, since sepsis has other causes"],
 ans:0, rat:{c:"Source control is essential in sepsis management alongside antibiotics. Relying on antibiotics alone, delaying, and dismissing the wound all risk treatment failure.", s:"Source control is critical in sepsis; the nurse must escalate for appropriate management."}},
{id:"HPM-127", t:"single", cn:"HPM", sys:"INF", topic:"Antibiotic timing", d:3, b:0.55, cj:"act", tags:["health promotion","antibiotic","timing","sepsis","one hour"],
 stem:"A client with suspected sepsis requires antibiotics. Which action by the nurse is most appropriate?",
 opts:["Ensure antibiotics are administered within one hour of recognition, since delay increases mortality","Wait for blood culture results before administering antibiotics","Administer antibiotics within 24 hours, since this is sufficient","Withhold antibiotics until the diagnosis is confirmed"],
 ans:0, rat:{c:"Antibiotics should be administered within one hour of sepsis recognition, as delay increases mortality. Waiting for cultures, 24-hour delays, and withholding all risk harm.", s:"Antibiotic timing is critical in sepsis; the nurse must ensure prompt administration."}}

]);
