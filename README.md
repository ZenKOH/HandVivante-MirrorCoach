# HandVivante™ MirrorCoach

A browser-based clinical workflow prototype for **Robotic Mirror Hand Therapy (RMHT)** using the HandVivante™ MirrorHand system or equivalent bilateral robotic hand technology.

MirrorCoach is designed in the same lightweight, static GitHub Pages format as the NeuroRehab Dose Tracker, while adding a HandVivante product tutorial, operating-manual workflow, clinician and patient views, protocol builder, guided 30-minute sessions, functional exercises, outcome tracking, safety governance, and research exports.

## Live site

After GitHub Pages is enabled for this repository, the expected URL is:

```text
https://zenkoh.github.io/HandVivante-MirrorCoach/
```

## What is included

- Demo login with role-based views for clinician, patient/caregiver, researcher, and clinic administrator.
- Synthetic patient caseload and local browser storage.
- Eligibility and readiness screen using fields such as Brunnstrom Stage, MAS, MMSE/equivalent, FMA-UE, ARAT, pain, skin, goals, and precautions.
- Four-week RMHT protocol builder for severe, moderate, and mild hand impairment pathways.
- Guided 30-minute session:
  - 3 min safety and readiness
  - 4 min calibration and familiarisation
  - 5 min sensorimotor priming
  - 15 min high-repetition task blocks
  - 3 min functional transfer and cooldown
- Functional exercise catalogue covering hand opening, finger individuation, thumb opposition, cylindrical and spherical grasp, pinch, release, bimanual stabilisation, and task-oriented reach/grasp/place.
- Interactive HandVivante tutorial with a knowledge check.
- Searchable operating manual based on the supplied brochure and training material.
- Outcome records for FMA-UE, ARAT, Box and Block Test, Motor Activity Log, patient-specific goals, pain, and locally approved measures.
- Protocol-fidelity dashboard, deviation/adverse-event log, CSV export, and JSON backup/restore.
- Responsive layout, installable PWA shell, and offline caching of static assets.

## Important scope

This repository is a **static education, workflow, implementation, and research-prototyping tool**.

It is not:

- a medical device;
- a device controller;
- an authenticated clinical record system;
- medical advice;
- an autonomous eligibility or treatment decision system;
- a replacement for the current manufacturer Instructions for Use (IFU), device labelling, institutional policy, regulatory requirements, or licensed clinical judgement.

The public GitHub Pages build stores data in browser `localStorage`. Use only synthetic or appropriately pseudonymised information. Do not enter directly identifiable patient data.

## Run locally

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages deployment

A GitHub Actions workflow is included at `.github/workflows/pages.yml`.

For a new repository, open **Settings → Pages → Build and deployment** and select **GitHub Actions** once. Future pushes to `main` will deploy automatically.

## Source materials used for clinical content

The product tutorial and operating guidance were derived from supplied project documentation, including:

- HandVivante™ MirrorHand brochure;
- HandVivante User Training presentation;
- the MirrorCoach clinical and research proposal supplied with this project.

The operating manual deliberately avoids inventing device-specific force limits, cleaning chemicals, maintenance intervals, service procedures, or configuration details not present in the supplied documentation. The current controlled IFU always takes precedence.

## Project structure

```text
.
├── index.html
├── styles.css
├── js/
│   ├── 01-content.js
│   ├── 02-core.js
│   ├── 03-patients-protocols.js
│   ├── 04-session.js
│   ├── 05-library-tutorial.js
│   ├── 06-manual-outcomes-research.js
│   └── 07-init.js
├── manifest.webmanifest
├── sw.js
├── assets/
├── docs/
└── .github/workflows/pages.yml
```

## Production roadmap

### Phase 1 — static clinical workflow prototype

- [x] Role-based demo views
- [x] Tutorial and operating manual
- [x] Eligibility and protocol builder
- [x] Guided RMHT session
- [x] Functional exercise library
- [x] Outcomes, safety register, exports
- [x] PWA/offline static shell

### Phase 2 — governed clinical application

- [ ] Authenticated backend and organisation tenancy
- [ ] Encryption at rest and in transit
- [ ] Audit logging and role-based access control
- [ ] Consent, retention, and data-governance workflows
- [ ] Clinician-approved remote/home programme management
- [ ] PDF clinical reports and validated eCRFs

### Phase 3 — validated device integration

- [ ] HandVivante device bridge and version control
- [ ] Automated repetition, range, speed, and interruption capture
- [ ] Fault telemetry and device inventory
- [ ] Offline-safe device session handling
- [ ] Cybersecurity and software lifecycle documentation

### Phase 4 — evidence and adaptive support

- [ ] Multicentre protocol support
- [ ] Explainable progression recommendations
- [ ] Camera-assisted posture and mirror-gaze analysis after validation
- [ ] EMG/BCI research modules under appropriate governance
- [ ] FHIR/REDCap/EHR integration

## Licence

MIT for the software code in this repository. Product names, trademarks, supplied product imagery, device documentation, and clinical instrument names remain the property of their respective owners.
