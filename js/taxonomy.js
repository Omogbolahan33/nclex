/* RN Ready — taxonomy & exam configuration (data-driven, not hard-coded in UI logic) */
window.NC = window.NC || {};

NC.TAX = {
  clientNeeds: [
    { id:"MOC", name:"Management of Care",            cat:"Safe & Effective Care", range:[15,21], mid:18 },
    { id:"SIC", name:"Safety & Infection Control",     cat:"Safe & Effective Care", range:[10,16], mid:13 },
    { id:"HPM", name:"Health Promotion & Maintenance", cat:"Health Promotion",      range:[6,12],  mid:9  },
    { id:"PSY", name:"Psychosocial Integrity",         cat:"Psychosocial",          range:[6,12],  mid:9  },
    { id:"BCC", name:"Basic Care & Comfort",           cat:"Physiological",         range:[6,12],  mid:9  },
    { id:"PHA", name:"Pharmacological Therapies",      cat:"Physiological",         range:[13,19], mid:16 },
    { id:"RRP", name:"Reduction of Risk Potential",    cat:"Physiological",         range:[9,15],  mid:12 },
    { id:"PAA", name:"Physiological Adaptation",       cat:"Physiological",         range:[11,17], mid:14 }
  ],
  systems: [
    { id:"CV",    name:"Cardiovascular" }, { id:"RESP",  name:"Respiratory" },
    { id:"NEURO", name:"Neurological" },   { id:"REN",   name:"Renal" },
    { id:"ENDO",  name:"Endocrine" },      { id:"GI",    name:"Gastrointestinal" },
    { id:"HEME",  name:"Hematologic" },    { id:"MSK",   name:"Musculoskeletal" },
    { id:"INTG",  name:"Integumentary" },  { id:"REPI",  name:"Reproductive" },
    { id:"PSYCH", name:"Mental Health" },  { id:"INF",   name:"Multisystem / Infection" }
  ],
  cjSteps: ["recognize","analyze","prioritize","generate","act","evaluate"],
  cjNames: { recognize:"Recognize Cues", analyze:"Analyze Cues", prioritize:"Prioritize Hypotheses",
             generate:"Generate Solutions", act:"Take Action", evaluate:"Evaluate Outcomes" },
  qTypes: {
    single:  { name:"Multiple Choice",            short:"Single" },
    multi:   { name:"Multiple Response",          short:"Multi" },
    emr:     { name:"Extended Multiple Response", short:"EMR" },
    drag:    { name:"Extended Drag & Drop",       short:"Drag" },
    cloze:   { name:"Cloze / Drop-down",          short:"Cloze" },
    hotspot: { name:"Enhanced Hot Spot",          short:"Hot Spot" },
    matrix:  { name:"Matrix / Grid",              short:"Matrix" }
  },
  difficulty: [
    { id:0, name:"Easy",      b:-1.4 },
    { id:1, name:"Moderate",  b:-0.4 },
    { id:2, name:"Hard",      b:0.55  },
    { id:3, name:"Very Hard", b:1.35  }
  ],
  tags: ["priority","delegation","medication","calculation","safety","teaching","assessment","intervention","evaluation"]
};

/* Exam configurations — the engine reads these; nothing about an exam is hard-coded in screens. */
NC.EXAMS = {
  "nclex-rn-2026": {
    name:"NCLEX-RN 2026 (Full Simulation)",
    version:"2026 (Apr 1 2026 – Mar 31 2029)",
    examFamily:"RN",
    minItems:85, maxItems:150, durationMinutes:300,
    caseStudies:3, pretestItems:15,
    allowBack:false, calculator:true,
    breaks:[{afterMin:120,label:"First optional break"},{afterMin:210,label:"Second optional break"}],
    cut:0.0,
    blueprint:null /* null = derive from TAX.clientNeeds midpoints */
  },
  "rn-preview-sim": {
    name:"Preview Simulation (short)",
    version:"NCLEX-style · shortened for the current item pool",
    examFamily:"RN",
    minItems:26, maxItems:40, durationMinutes:45,
    caseStudies:1, pretestItems:2,
    allowBack:false, calculator:true,
    breaks:[],
    cut:0.0,
    blueprint:null
  },
  /* NCLEX-PN 2026 Test Plan (effective Apr 1 2026 – Mar 31 2029):
     85–150 items, 5 h, 3 CJ case sets (18 items), ~15 pretest at minimum length.
     PN Client Needs: Coordinated Care 18–24 · S&IP&C 10–16 · HP&M 6–12 · Psych 9–15 ·
     BCC 7–13 · Pharm 10–16 · RRP 9–15 · Physio Adaptation 7–13. Midpoints sum to 100. */
  "nclex-pn-2026": {
    name:"NCLEX-PN 2026 (Full Simulation)",
    version:"2026 PN Test Plan (Apr 1 2026 – Mar 31 2029)",
    examFamily:"PN",
    minItems:85, maxItems:150, durationMinutes:300,
    caseStudies:3, pretestItems:15,
    allowBack:false, calculator:true,
    breaks:[{afterMin:120,label:"First optional break"},{afterMin:210,label:"Second optional break"}],
    cut:0.0,
    blueprint:{ MOC:21, SIC:13, HPM:9, PSY:12, BCC:10, PHA:13, RRP:12, PAA:10 },
    cnNames:{ MOC:"Coordinated Care", SIC:"Safety & Infection Prevention and Control",
              HPM:"Health Promotion & Maintenance", PSY:"Psychosocial Integrity",
              BCC:"Basic Care & Comfort", PHA:"Pharmacological Therapies",
              RRP:"Reduction of Risk Potential", PAA:"Physiological Adaptation" }
  },
  "pn-preview-sim": {
    name:"PN Preview Simulation (short)",
    version:"NCLEX-PN-style · shortened for the current item pool",
    examFamily:"PN",
    minItems:26, maxItems:40, durationMinutes:45,
    caseStudies:1, pretestItems:2,
    allowBack:false, calculator:true,
    breaks:[], cut:0.0,
    blueprint:{ MOC:21, SIC:13, HPM:9, PSY:12, BCC:10, PHA:13, RRP:12, PAA:10 },
    cnNames:{ MOC:"Coordinated Care", SIC:"Safety & Infection Prevention and Control",
              HPM:"Health Promotion & Maintenance", PSY:"Psychosocial Integrity",
              BCC:"Basic Care & Comfort", PHA:"Pharmacological Therapies",
              RRP:"Reduction of Risk Potential", PAA:"Physiological Adaptation" }
  },
  "rn-timed-60": {
    name:"Timed Exam (60 items)",
    examFamily:"RN",
    version:"Fixed-length adaptive selection",
    minItems:60, maxItems:60, durationMinutes:75,
    caseStudies:1, pretestItems:0,
    allowBack:false, calculator:true,
    breaks:[],
    cut:0.0, blueprint:null
  }
};

NC.DISCLAIMER = "Not affiliated with or endorsed by NCSBN. Readiness and simulation outcomes are app-generated estimates — not predictions of your official NCLEX result.";
