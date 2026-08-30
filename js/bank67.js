"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 57) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 56: MOC (17.8% vs 18),
 * HPM (8.9% vs 9) and PHA (15.9% vs 16). Every item is difficulty
 * 2 or 3, and the clinical detail is written to be defensible.
 *
 * MOC 7: transmission-based precautions, alcohol gel versus soap
 * and water, post-exposure prophylaxis, flu vaccine for staff,
 * staff health and sickness absence, return to work, and health
 * protection with UKHSA.
 * HPM 6: mantoux testing, BCG vaccination, latent TB, active TB,
 * air changes and ventilation, and sterilisation.
 * PHA 5: single use equipment, reusable equipment decontamination,
 * communal equipment, patient equipment, and deep clean.
 * SIC 2: environmental health, and outbreak management.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- MOC 7 */
{id:"MOC-261", t:"single", cn:"MOC", sys:"INF", topic:"Transmission-based precautions", d:3, b:0.55, cj:"act", tags:["management","transmission based","precautions","isolation","infection control"],
 stem:"A client requires isolation for a specific infection. Which action by the nurse is most appropriate?",
 opts:["Implement transmission-based precautions in addition to standard precautions, since these are infection-specific","Use standard precautions only, since these are sufficient for all infections","Use transmission-based precautions instead of standard precautions, since these are more specific","Withhold precautions, since the infection is not highly contagious"],
 ans:0, rat:{c:"Transmission-based precautions are infection-specific and used in addition to standard precautions. Standard only, instead of, and withholding all miss the layered approach.", s:"Transmission-based precautions supplement standard; the nurse must understand the hierarchy."}},
{id:"MOC-262", t:"single", cn:"MOC", sys:"INF", topic:"Alcohol gel versus soap and water", d:2, b:0.45, cj:"act", tags:["management","alcohol gel","soap water","hand hygiene","infection control"],
 stem:"A nurse has cared for a client with norovirus. Which action by the nurse is most appropriate?",
 opts:["Wash hands with soap and water, since alcohol gel is not effective against norovirus","Use alcohol gel, since this is effective against norovirus","Use either, since both are equally effective","Withhold hand hygiene, since gloves were worn"],
 ans:0, rat:{c:"Alcohol gel is not effective against norovirus, so soap and water is required. Alcohol gel, either, and withholding all miss the specific requirement.", s:"Some infections require soap and water; the nurse must know when alcohol gel is insufficient."}},
{id:"MOC-263", t:"single", cn:"MOC", sys:"INF", topic:"Post-exposure prophylaxis", d:3, b:0.55, cj:"act", tags:["management","post exposure","prophylaxis","bloodborne","risk"],
 stem:"A nurse sustains a needlestick injury from a client with known HIV. Which action by the nurse is the priority?",
 opts:["Seek immediate risk assessment and post-exposure prophylaxis, since this is time-critical","Wait for the client's viral load, since this determines risk","Assume the risk is low, since the client is on treatment","Report the injury but decline prophylaxis, since this is a personal choice"],
 ans:0, rat:{c:"Needlestick from HIV-positive source requires immediate risk assessment and PEP, as effectiveness is time-dependent. Waiting, assuming low risk, and declining all risk preventable infection.", s:"Post-exposure prophylaxis is time-critical; the nurse must seek assessment without delay."}},
{id:"MOC-264", t:"single", cn:"MOC", sys:"INF", topic:"Flu vaccine for staff", d:2, b:0.45, cj:"act", tags:["management","flu vaccine","staff","immunisation","occupational health"],
 stem:"A nurse is offered seasonal flu vaccination. Which interpretation by the nurse is most accurate?",
 opts:["Flu vaccination protects both the nurse and vulnerable clients, and is strongly recommended","Flu vaccination is optional and has no benefit for client safety","Flu vaccination is only for clinical staff, not all healthcare workers","Flu vaccination provides complete protection and other precautions are unnecessary"],
 ans:0, rat:{c:"Flu vaccination protects nurse and clients and is strongly recommended. Dismissing, limiting to clinical, and claiming complete protection all misrepresent the benefit.", s:"Staff flu vaccination is a client safety measure; the nurse must understand the rationale."}},
{id:"MOC-265", t:"single", cn:"MOC", sys:"INF", topic:"Staff health and sickness absence", d:2, b:0.45, cj:"act", tags:["management","staff health","sickness","absence","occupational health"],
 stem:"A nurse has a gastrointestinal infection. Which action by the nurse is most appropriate?",
 opts:["Stay off work until 48 hours after symptoms resolve, since this prevents transmission to clients","Attend work, since staffing is short","Attend work but avoid direct client contact, since this reduces risk","Attend work if symptoms are mild, since this is acceptable"],
 ans:0, rat:{c:"Gastrointestinal infection requires exclusion until 48 hours symptom-free to prevent transmission. Attending, avoiding contact, and mild symptoms all risk client infection.", s:"Staff illness exclusion protects clients; the nurse must follow the guidance."}},
{id:"MOC-266", t:"single", cn:"MOC", sys:"INF", topic:"Return to work", d:2, b:0.45, cj:"act", tags:["management","return to work","health","clearance","occupational health"],
 stem:"A nurse has been off work with a notifiable infection. Which action by the nurse is most appropriate?",
 opts:["Obtain occupational health clearance before returning, since this ensures safe return","Return to work immediately, since symptoms have resolved","Return without clearance, since the nurse feels well","Return after 24 hours, since this is sufficient"],
 ans:0, rat:{c:"Notifiable infection requires occupational health clearance before return. Immediate, no clearance, and 24 hours all risk transmission.", s:"Return to work requires clearance; the nurse must follow the process."}},
{id:"MOC-267", t:"single", cn:"MOC", sys:"INF", topic:"Health protection and UKHSA", d:2, b:0.45, cj:"act", tags:["management","health protection","UKHSA","public health","notification"],
 stem:"A client is diagnosed with a notifiable infection. Which action by the nurse is most appropriate?",
 opts:["Notify UKHSA as required, since notifiable infections must be reported for public health surveillance","Withhold notification, since notifiable infections are confidential","Notify only if the client consents, since this respects autonomy","Notify the local authority only, since UKHSA is not involved"],
 ans:0, rat:{c:"Notifiable infections must be reported to UKHSA for public health surveillance. Withholding, consent requirement, and local only all breach statutory duties.", s:"Notification is a statutory duty; the nurse must understand the process."}},

/* ---------------------------------------------------------- HPM 6 */
{id:"HPM-133", t:"single", cn:"HPM", sys:"INF", topic:"Mantoux testing", d:3, b:0.55, cj:"act", tags:["health promotion","mantoux","TB","testing","screening"],
 stem:"A client requires TB screening. Which action by the nurse is most appropriate?",
 opts:["Perform mantoux test and read at 48-72 hours, since this assesses TB exposure","Perform mantoux and read immediately, since this provides faster results","Withhold mantoux, since interferon testing is preferred","Perform mantoux but do not read, since this is not necessary"],
 ans:0, rat:{c:"Mantoux requires reading at 48-72 hours to assess TB exposure. Immediate, withholding, and no reading all miss the correct process.", s:"Mantoux timing is critical; the nurse must read at the correct interval."}},
{id:"HPM-134", t:"single", cn:"HPM", sys:"INF", topic:"BCG vaccination", d:2, b:0.45, cj:"act", tags:["health promotion","BCG","TB","vaccination","prevention"],
 stem:"A client asks about BCG vaccination. Which interpretation by the nurse is most accurate?",
 opts:["BCG provides partial protection against severe TB forms and is offered to high-risk groups","BCG provides complete protection and is offered to everyone","BCG is not effective and is no longer used","BCG is only for children and not adults"],
 ans:0, rat:{c:"BCG provides partial protection against severe TB and is offered to high-risk groups. Complete, ineffective, and children-only all misrepresent the vaccine.", s:"BCG has specific indications; the nurse must understand its role and limitations."}},
{id:"HPM-135", t:"single", cn:"HPM", sys:"INF", topic:"Latent TB", d:3, b:0.55, cj:"act", tags:["health promotion","latent TB","infection","treatment","prevention"],
 stem:"A client has positive TB screening but no symptoms and normal chest X-ray. Which interpretation by the nurse is most accurate?",
 opts:["This suggests latent TB requiring assessment and possible treatment to prevent progression","This suggests active TB requiring immediate treatment","This is a false positive and requires no further action","This suggests the client is immune and requires no follow-up"],
 ans:0, rat:{c:"Positive screening without symptoms or X-ray changes suggests latent TB requiring assessment and possible treatment. Active, false positive, and immune all miss the diagnosis.", s:"Latent TB requires assessment; the nurse must understand the distinction from active TB."}},
{id:"HPM-136", t:"single", cn:"HPM", sys:"INF", topic:"Active TB", d:3, b:0.55, cj:"act", tags:["health promotion","active TB","infection","isolation","treatment"],
 stem:"A client has symptoms, positive screening, and chest X-ray changes consistent with TB. Which action by the nurse is most appropriate?",
 opts:["Recognise active TB and implement respiratory isolation while arranging treatment","Advise the client to return home, since TB is not contagious","Withhold isolation, since treatment will make the client non-infectious","Wait for sputum results before isolating, since this confirms diagnosis"],
 ans:0, rat:{c:"Active TB requires respiratory isolation and treatment. Advising home, withholding isolation, and waiting all risk transmission.", s:"Active TB is infectious; the nurse must isolate immediately."}},
{id:"HPM-137", t:"single", cn:"HPM", sys:"INF", topic:"Air changes and ventilation", d:3, b:0.55, cj:"act", tags:["health promotion","air changes","ventilation","isolation","airborne"],
 stem:"A client requires airborne isolation. Which action by the nurse is most appropriate?",
 opts:["Ensure negative pressure room with adequate air changes, since this prevents airborne transmission","Use a standard room, since airborne precautions are not necessary","Ensure positive pressure, since this prevents contamination","Withhold isolation, since the client is on treatment"],
 ans:0, rat:{c:"Airborne isolation requires negative pressure with adequate air changes. Standard, positive, and withholding all risk transmission.", s:"Airborne isolation has specific ventilation requirements; the nurse must ensure they are met."}},
{id:"HPM-138", t:"single", cn:"HPM", sys:"INF", topic:"Sterilisation", d:2, b:0.45, cj:"act", tags:["health promotion","sterilisation","decontamination","equipment","infection control"],
 stem:"Equipment requires sterilisation before reuse. Which action by the nurse is most appropriate?",
 opts:["Use appropriate sterilisation method such as autoclave, since this eliminates all microorganisms","Clean the equipment only, since this is the appropriate method","Disinfect the equipment, since this is equivalent to sterilisation","Withhold sterilisation, since the equipment appears clean"],
 ans:0, rat:{c:"Sterilisation eliminates all microorganisms and is required for certain equipment. Cleaning, disinfection, and withholding all miss the requirement.", s:"Sterilisation is distinct from cleaning; the nurse must understand when it is required."}},

/* ---------------------------------------------------------- PHA 5 */
{id:"PHA-241", t:"single", cn:"PHA", sys:"INF", topic:"Single use equipment", d:2, b:0.45, cj:"act", tags:["pharmacology","single use","equipment","infection control","safety"],
 stem:"Equipment is marked single use. Which action by the nurse is most appropriate?",
 opts:["Use once and discard, since single use equipment cannot be safely reprocessed","Reprocess and reuse, since single use equipment can be safely reprocessed","Clean and reuse, since the equipment appears intact","Sterilise and reuse, since this makes it safe"],
 ans:0, rat:{c:"Single use equipment cannot be safely reprocessed and must be discarded after one use. Reprocessing, cleaning, and sterilising all risk infection.", s:"Single use means single use; the nurse must not reprocess."}},
{id:"PHA-242", t:"single", cn:"PHA", sys:"INF", topic:"Reusable equipment decontamination", d:3, b:0.55, cj:"act", tags:["pharmacology","reusable","decontamination","equipment","infection control"],
 stem:"Reusable equipment requires decontamination between clients. Which action by the nurse is most appropriate?",
 opts:["Follow the decontamination process including cleaning, disinfection or sterilisation as appropriate","Clean only, since this is the appropriate method","Disinfect only, since cleaning is not necessary","Withhold decontamination, since the equipment appears clean"],
 ans:0, rat:{c:"Reusable equipment requires the full decontamination process. Cleaning, disinfecting, and withholding all miss the requirement.", s:"Decontamination is a process; the nurse must follow all steps."}},
{id:"PHA-243", t:"single", cn:"PHA", sys:"INF", topic:"Communal equipment", d:2, b:0.45, cj:"act", tags:["pharmacology","communal","equipment","infection control","shared"],
 stem:"Equipment is shared between clients. Which action by the nurse is most appropriate?",
 opts:["Decontaminate between each client, since communal equipment can transmit infection","Decontaminate at the end of the day, since this is sufficient","Use dedicated equipment for each client, since this eliminates risk","Withhold decontamination, since the equipment is not contaminated"],
 ans:0, rat:{c:"Communal equipment requires decontamination between each client. End of day, dedicated, and withholding all miss the requirement or are impractical.", s:"Communal equipment transmits infection; the nurse must decontaminate between clients."}},
{id:"PHA-244", t:"single", cn:"PHA", sys:"INF", topic:"Patient equipment", d:2, b:0.45, cj:"act", tags:["pharmacology","patient equipment","dedicated","infection control","isolation"],
 stem:"A client is in isolation. Which action by the nurse is most appropriate?",
 opts:["Use dedicated equipment where possible, since this reduces cross-contamination risk","Share equipment with other clients, since this is more efficient","Decontaminate equipment after each use, since dedicated is not available","Withhold equipment, since the client is in isolation"],
 ans:0, rat:{c:"Dedicated equipment reduces cross-contamination in isolation. Sharing, decontaminating, and withholding all miss the preference for dedicated.", s:"Isolation prefers dedicated equipment; the nurse must understand the rationale."}},
{id:"PHA-245", t:"single", cn:"PHA", sys:"INF", topic:"Deep clean", d:3, b:0.55, cj:"act", tags:["pharmacology","deep clean","environment","infection control","outbreak"],
 stem:"An outbreak has occurred on the ward. Which action by the nurse is most appropriate?",
 opts:["Implement deep clean including environment and equipment, since this eliminates reservoirs","Continue routine cleaning, since this is sufficient","Clean only visible contamination, since this addresses the problem","Withhold deep clean, since this is not necessary"],
 ans:0, rat:{c:"Outbreak requires deep clean of environment and equipment to eliminate reservoirs. Routine, visible only, and withholding all miss the requirement.", s:"Deep clean addresses outbreak; the nurse must understand when it is required."}},

/* ---------------------------------------------------------- SIC 2 */
{id:"SIC-198", t:"single", cn:"SIC", sys:"INF", topic:"Environmental health", d:2, b:0.45, cj:"act", tags:["safety","environmental health","public health","notification","collaboration"],
 stem:"A client has a notifiable infection requiring environmental health involvement. Which action by the nurse is most appropriate?",
 opts:["Notify environmental health as required, since they investigate and control environmental sources","Withhold notification, since this is not nursing responsibility","Notify only if the client consents, since this respects autonomy","Notify UKHSA only, since environmental health is not involved"],
 ans:0, rat:{c:"Environmental health must be notified for certain infections to investigate environmental sources. Withholding, consent requirement, and UKHSA only all miss the collaboration.", s:"Environmental health protects public health; the nurse must understand the notification process."}},
{id:"SIC-199", t:"single", cn:"SIC", sys:"INF", topic:"Outbreak management", d:3, b:0.55, cj:"act", tags:["safety","outbreak","management","infection control","public health"],
 stem:"Multiple clients on the ward develop similar symptoms. Which action by the nurse is most appropriate?",
 opts:["Recognise possible outbreak and escalate immediately, since early recognition enables control","Assume the symptoms are coincidental, since outbreaks are rare","Wait for more cases, since this confirms outbreak","Manage each client individually, since this addresses the problem"],
 ans:0, rat:{c:"Multiple similar symptoms suggest possible outbreak requiring immediate escalation. Assuming coincidence, waiting, and individual management all delay control.", s:"Outbreak recognition is time-critical; the nurse must escalate immediately."}}

]);
