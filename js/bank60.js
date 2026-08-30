"use strict";
/* ============================================================
 * NCLEX-RN item bank (wave 50) — RN only
 * Hand-authored to the NCLEX-RN Test Plan blueprint, filling the
 * categories still under target after wave 49: PSY (8.9% vs 9),
 * BCC (8.9% vs 9) and PAA (13.9% vs 14). Every item is difficulty
 * 2 or 3, and the clinical detail is written to be defensible.
 *
 * PSY 7: stress management, meditation and mindfulness, St John's
 * wort and serotonin syndrome, herbal supplement interactions,
 * tranylcypromine and the MAOI diet, adherence support, and
 * digital health with remote monitoring.
 * BCC 5: accessible information and large print, braille and
 * visual impairment, hearing aid and communication support,
 * reasonable adjustment, and the Equality Act and discrimination.
 * PAA 5: remote monitoring and wearables, smart devices and data,
 * telehealth consultation, technology failure and safety, and
 * digital exclusion and equity.
 * MOC 3: accessible information provision, reasonable adjustment
 * in practice, and discrimination and equality.
 * ============================================================ */

/*jshint -W098 */
NC.BANK = (NC.BANK || []).concat([

/* ---------------------------------------------------------- PSY 7 */
{id:"PSY-115", t:"single", cn:"PSY", sys:"PSYCH", topic:"Stress management", d:2, b:0.45, cj:"act", tags:["psychosocial","stress management","coping","relaxation","support"],
 stem:"A client reports feeling overwhelmed by work and family pressures and asks for advice. Which action by the nurse is most appropriate?",
 opts:["Explore stress management techniques including relaxation, exercise, and identifying support networks","Advise taking time off work, since this is the only effective solution","Advise that stress is normal and no intervention is needed","Advise medication immediately, since this is the fastest solution"],
 ans:0, rat:{c:"Stress management involves a range of approaches including relaxation, exercise, and support networks, tailored to the individual. Time off alone is not a complete solution, dismissing stress ignores the client's experience, and medication is not always first-line.", s:"Stress management requires individualised, multifaceted support; the nurse must explore options rather than offer a single solution."}},
{id:"PSY-116", t:"single", cn:"PSY", sys:"PSYCH", topic:"Meditation and mindfulness", d:2, b:0.45, cj:"act", tags:["psychosocial","meditation","mindfulness","relaxation","complementary"],
 stem:"A client asks about mindfulness for anxiety. Which action by the nurse is most appropriate?",
 opts:["Explain that mindfulness is an evidence-based approach that may help, and support the client to access suitable resources","Advise against mindfulness, since there is no evidence for its effectiveness","Advise that mindfulness replaces the need for other treatments","Advise that mindfulness is only effective for mild anxiety"],
 ans:0, rat:{c:"Mindfulness has evidence supporting its use for anxiety and the nurse should explain this and support access to suitable resources. Advising against it, suggesting it replaces other treatments, or limiting it to mild anxiety all misrepresent the evidence.", s:"Mindfulness is an evidence-based complementary approach; the nurse should support informed choice."}},
{id:"PSY-117", t:"single", cn:"PSY", sys:"PSYCH", topic:"St John's wort and serotonin syndrome", d:3, b:0.55, cj:"act", tags:["psychosocial","st johns wort","serotonin syndrome","interaction","herbal","safety"],
 stem:"A client taking an SSRI asks about taking St John's wort for low mood. Which action by the nurse is most appropriate?",
 opts:["Advise against combining them, since this significantly increases the risk of serotonin syndrome","Advise that combining them is safe, since St John's wort is natural","Advise taking St John's wort instead of the SSRI, since this is gentler","Advise taking both but monitoring for side effects"],
 ans:0, rat:{c:"Combining St John's wort with an SSRI significantly increases serotonin syndrome risk and must be avoided. Describing it as safe, substituting without medical advice, or monitoring while combining all risk serious harm.", s:"Herbal does not mean safe; the nurse must identify dangerous interactions with conventional medication."}},
{id:"PSY-118", t:"single", cn:"PSY", sys:"PSYCH", topic:"Herbal supplement interactions", d:3, b:0.55, cj:"act", tags:["psychosocial","herbal","supplement","interaction","safety","assessment"],
 stem:"A client mentions taking ginkgo biloba and garlic supplements. Which action by the nurse is most appropriate?",
 opts:["Document the supplements and assess for interactions, since both may increase bleeding risk","Reassure the client, since herbal supplements do not interact with medication","Advise stopping all supplements immediately, since they are dangerous","Ignore the supplements, since they are not prescribed medications"],
 ans:0, rat:{c:"Herbal supplements such as ginkgo and garlic may increase bleeding risk and require documentation and interaction assessment. Dismissing them as safe, blanket cessation without assessment, and ignoring them all risk harm.", s:"Herbal supplements can have significant effects; the nurse must ask about and document them."}},
{id:"PSY-119", t:"single", cn:"PSY", sys:"PSYCH", topic:"Tranylcypromine and MAOI diet", d:3, b:0.55, cj:"act", tags:["psychosocial","MAOI","tranylcypromine","tyramine","diet","hypertensive crisis"],
 stem:"A client is prescribed tranylcypromine. Which action by the nurse is most appropriate?",
 opts:["Provide dietary advice about avoiding tyramine-rich foods, since this prevents hypertensive crisis","Advise that no dietary restriction is needed with modern MAOIs","Advise avoiding only cheese, since this is the main source of tyramine","Advise that dietary advice is only needed for older MAOIs"],
 ans:0, rat:{c:"Tranylcypromine is an irreversible MAOI requiring tyramine restriction to prevent hypertensive crisis. Tyramine is found in multiple food groups beyond cheese, and dietary advice is essential regardless of MAOI age.", s:"MAOI dietary restrictions prevent hypertensive crisis; the nurse must provide comprehensive advice."}},
{id:"PSY-120", t:"single", cn:"PSY", sys:"PSYCH", topic:"Adherence support", d:2, b:0.45, cj:"act", tags:["psychosocial","adherence","support","medication","education","compliance"],
 stem:"A client reports difficulty remembering to take medication. Which action by the nurse is most appropriate?",
 opts:["Explore practical adherence support such as pill organisers, reminders, and linking doses to routines","Advise that the client must simply try harder to remember","Advise stopping medication, since adherence is clearly not possible","Advise that adherence problems indicate the medication is not needed"],
 ans:0, rat:{c:"Adherence support involves practical strategies such as pill organisers, reminders, and routine linking, tailored to the individual. Blaming the client, stopping medication, and interpreting non-adherence as lack of need all risk harm.", s:"Adherence is a shared responsibility; the nurse must explore practical support rather than blame."}},
{id:"PSY-121", t:"single", cn:"PSY", sys:"PSYCH", topic:"Digital health and remote monitoring", d:3, b:0.55, cj:"analyze", tags:["psychosocial","digital health","remote monitoring","technology","support","equity"],
 stem:"A service introduces remote monitoring for mental health clients. Which interpretation by the nurse is most accurate?",
 opts:["Remote monitoring may support some clients but requires consideration of digital access, literacy, and individual preference","Remote monitoring is suitable for all clients and replaces face-to-face contact","Remote monitoring is only effective for physical health conditions","Clients who decline remote monitoring are non-compliant"],
 ans:0, rat:{c:"Remote monitoring has potential benefits but requires consideration of digital access, literacy, and preference to avoid excluding some clients. It does not suit everyone or replace all contact, is applicable to mental health, and declining is a valid choice.", s:"Digital health must be implemented equitably; the nurse must consider access and preference."}},

/* ---------------------------------------------------------- BCC 5 */
{id:"BCC-121", t:"single", cn:"BCC", sys:"INTG", topic:"Accessible information and large print", d:2, b:0.45, cj:"act", tags:["basic care","accessible information","large print","visual impairment","communication"],
 stem:"A client with visual impairment requires written information about their condition. Which action by the nurse is most appropriate?",
 opts:["Provide information in an accessible format such as large print, and confirm the client can read it","Provide standard print, since the client can ask someone to read it","Read the information aloud once, since this is sufficient","Advise that written information is not necessary"],
 ans:0, rat:{c:"Clients with visual impairment require accessible formats such as large print, with confirmation that the format works. Standard print, reading once, and omitting written information all fail to meet the client's needs.", s:"Accessible information is a right; the nurse must provide appropriate formats and confirm they work."}},
{id:"BCC-122", t:"single", cn:"BCC", sys:"INTG", topic:"Braille and visual impairment", d:2, b:0.45, cj:"act", tags:["basic care","braille","visual impairment","accessible","communication"],
 stem:"A client who uses braille requires medication information. Which action by the nurse is most appropriate?",
 opts:["Arrange braille or alternative accessible format, since the client has a right to information they can access","Provide large print, since this is close enough to braille","Advise that braille is not available and offer to read the information","Advise that the client should have memorised the information"],
 ans:0, rat:{c:"Clients who use braille have a right to information in that or another accessible format. Large print is not equivalent, claiming unavailability is not acceptable, and expecting memorisation is unreasonable.", s:"Accessible information must match the client's needs; the nurse must arrange appropriate formats."}},
{id:"BCC-123", t:"single", cn:"BCC", sys:"INTG", topic:"Hearing aid and communication support", d:2, b:0.45, cj:"act", tags:["basic care","hearing aid","communication","hearing impairment","support"],
 stem:"A client with hearing impairment attends for a consultation. Which action by the nurse is most appropriate?",
 opts:["Check that the hearing aid is working, face the client, speak clearly, and offer additional communication support","Speak loudly, since this ensures the client with hearing impairment can hear","Write everything down, since this is always the best approach","Ask a family member to interpret, since this is convenient"],
 ans:0, rat:{c:"Effective communication with hearing impairment involves checking the hearing aid, facing the client, speaking clearly, and offering additional support. Shouting, writing everything, and using family all have limitations and may not meet the client's needs.", s:"Communication support must be individualised; the nurse must check what works for each client."}},
{id:"BCC-124", t:"single", cn:"BCC", sys:"INTG", topic:"Reasonable adjustment", d:3, b:0.55, cj:"act", tags:["basic care","reasonable adjustment","disability","equality","access"],
 stem:"A client with a learning disability requires a longer appointment to understand information. Which action by the nurse is most appropriate?",
 opts:["Make a reasonable adjustment by allowing additional time, since this is a legal requirement under equality legislation","Refuse the request, since appointment times are fixed","Offer a shorter appointment, since this is more efficient","Advise that the client should bring an advocate to speed up the process"],
 ans:0, rat:{c:"Allowing additional time is a reasonable adjustment required under equality legislation to ensure equitable access. Refusing, shortening, or shifting responsibility to an advocate all fail to meet legal and ethical obligations.", s:"Reasonable adjustments are a legal duty; the nurse must make them to ensure equitable care."}},
{id:"BCC-125", t:"single", cn:"BCC", sys:"INTG", topic:"Equality Act and discrimination", d:2, b:0.45, cj:"analyze", tags:["basic care","equality act","discrimination","protected characteristics","legal"],
 stem:"A nurse observes a colleague making assumptions about a client based on their disability. Which interpretation by the nurse is most accurate?",
 opts:["This may constitute discrimination under the Equality Act, and the nurse should address it appropriately","This is harmless banter and does not require action","This is only discrimination if the client complains","This is a personal opinion and not a professional matter"],
 ans:0, rat:{c:"Making assumptions based on disability may constitute discrimination under the Equality Act and requires appropriate action. Dismissing it as banter, waiting for complaint, or treating it as personal all fail professional and legal duties.", s:"The Equality Act protects against discrimination; the nurse must recognise and address it."}},

/* ---------------------------------------------------------- PAA 5 */
{id:"PAA-184", t:"single", cn:"PAA", sys:"INTG", topic:"Remote monitoring and wearables", d:3, b:0.55, cj:"act", tags:["physiological adaptation","remote monitoring","wearable","technology","assessment"],
 stem:"A client uses a wearable device to monitor their heart rate. Which action by the nurse is most appropriate?",
 opts:["Interpret the data in clinical context, since wearables provide supplementary information rather than diagnosis","Rely on the wearable data alone, since it is accurate and comprehensive","Dismiss the data, since wearables are not clinically valid","Advise the client to stop using the device, since it causes anxiety"],
 ans:0, rat:{c:"Wearable data should be interpreted in clinical context as supplementary information. Relying on it alone, dismissing it entirely, or advising cessation all miss the value of the data while overlooking its limitations.", s:"Wearables provide useful supplementary data; the nurse must interpret them appropriately in context."}},
{id:"PAA-185", t:"single", cn:"PAA", sys:"INTG", topic:"Smart devices and data", d:3, b:0.55, cj:"analyze", tags:["physiological adaptation","smart device","data","privacy","security","technology"],
 stem:"A client's health data is collected via a smart device. Which interpretation by the nurse is most accurate?",
 opts:["The data requires appropriate privacy and security measures, since it is personal health information","The data is not sensitive, since it comes from a consumer device","Privacy concerns do not apply to health data from wearables","The client should not be informed about data use"],
 ans:0, rat:{c:"Health data from smart devices is personal health information requiring privacy and security protection. Dismissing sensitivity, claiming privacy does not apply, or withholding information all breach data protection principles.", s:"Smart device data is personal health information; the nurse must understand privacy obligations."}},
{id:"PAA-186", t:"single", cn:"PAA", sys:"INTG", topic:"Telehealth consultation", d:2, b:0.45, cj:"act", tags:["physiological adaptation","telehealth","consultation","technology","assessment"],
 stem:"A client has a telehealth consultation. Which action by the nurse is most appropriate?",
 opts:["Confirm the client's identity, check technology is working, and assess whether the consultation is suitable for their needs","Proceed without identity checks, since the client initiated the consultation","Assume all consultations are suitable for telehealth","Advise that telehealth is not appropriate for any clinical assessment"],
 ans:0, rat:{c:"Telehealth requires identity confirmation, technology checks, and assessment of suitability for the client's needs. Omitting checks, assuming universal suitability, and blanket rejection all risk inadequate care.", s:"Telehealth requires appropriate safeguards; the nurse must confirm identity and assess suitability."}},
{id:"PAA-187", t:"single", cn:"PAA", sys:"INTG", topic:"Technology failure and safety", d:3, b:0.55, cj:"act", tags:["physiological adaptation","technology failure","safety","contingency","risk"],
 stem:"A remote monitoring system fails and a client's data is not being received. Which action by the nurse is the priority?",
 opts:["Follow the contingency plan, which may include direct contact with the client to ensure their safety","Wait for the system to recover, since it usually resolves quickly","Assume the client is well, since no alerts have been received","Document the failure and take no further action"],
 ans:0, rat:{c:"Technology failure requires following the contingency plan, which may include direct contact to ensure client safety. Waiting, assuming wellness, and documenting without action all risk missing deterioration.", s:"Technology failure requires a contingency response; the nurse must ensure client safety despite the failure."}},
{id:"PAA-188", t:"single", cn:"PAA", sys:"INTG", topic:"Digital exclusion and equity", d:3, b:0.55, cj:"analyze", tags:["physiological adaptation","digital exclusion","equity","access","technology"],
 stem:"A service moves to digital-only appointment booking. Which interpretation by the nurse is most accurate?",
 opts:["Digital-only access may exclude some clients and requires alternative options to ensure equity","Digital-only access is suitable for all clients and no alternatives are needed","Clients who cannot use digital services should adapt or miss appointments","Digital exclusion is not a health equity issue"],
 ans:0, rat:{c:"Digital-only access may exclude clients without digital access or literacy, requiring alternatives to ensure equity. Assuming universal suitability, expecting adaptation, and dismissing exclusion all fail equity obligations.", s:"Digital exclusion is a health equity issue; the nurse must advocate for inclusive access."}},

/* ---------------------------------------------------------- MOC 3 */
{id:"MOC-241", t:"single", cn:"MOC", sys:"INTG", topic:"Accessible information provision", d:2, b:0.45, cj:"act", tags:["management","accessible information","communication","equity","provision"],
 stem:"A service needs to provide information to clients with varying communication needs. Which action by the nurse is most appropriate?",
 opts:["Provide information in multiple accessible formats and check individual needs and preferences","Provide information in one standard format, since this is efficient","Assume clients will request alternatives if needed","Advise that accessible formats are only needed on request"],
 ans:0, rat:{c:"Providing multiple accessible formats and checking individual needs ensures equitable access. Single format, assuming requests, and limiting to request all risk excluding clients who need alternatives.", s:"Accessible information provision is proactive; the nurse must check needs rather than wait for requests."}},
{id:"MOC-242", t:"single", cn:"MOC", sys:"INTG", topic:"Reasonable adjustment in practice", d:3, b:0.55, cj:"act", tags:["management","reasonable adjustment","disability","equality","practice"],
 stem:"A client with autism finds the clinical environment overwhelming. Which action by the nurse is most appropriate?",
 opts:["Make reasonable adjustments such as reducing sensory input and allowing additional time","Advise the client to cope, since the environment cannot be changed","Offer medication to reduce anxiety, since this is the only solution","Advise that the client should attend at a quieter time, even if this delays care"],
 ans:0, rat:{c:"Reasonable adjustments such as reducing sensory input and allowing time are required under equality legislation. Advising coping, offering medication as the only solution, and delaying care all fail to meet legal and ethical obligations.", s:"Reasonable adjustments must be made proactively; the nurse must identify and implement them."}},
{id:"MOC-243", t:"single", cn:"MOC", sys:"INTG", topic:"Discrimination and equality", d:2, b:0.45, cj:"analyze", tags:["management","discrimination","equality","protected characteristics","professional"],
 stem:"A nurse suspects a client is receiving different care because of a protected characteristic. Which action by the nurse is most appropriate?",
 opts:["Raise the concern through appropriate channels, since discrimination is unlawful and requires action","Ignore the concern, since there is no direct evidence","Advise the client to complain, since this is the appropriate action for them to take","Wait to see if the pattern continues before acting"],
 ans:0, rat:{c:"Suspected discrimination requires raising through appropriate channels, as it is unlawful. Ignoring, shifting responsibility, and waiting all fail professional and legal duties.", s:"Discrimination must be addressed; the nurse must raise concerns appropriately."}}

]);
