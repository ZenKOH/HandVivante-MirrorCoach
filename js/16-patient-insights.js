(function () {
  'use strict';

  const NICE_GUIDANCE_URL = 'https://www.nice.org.uk/guidance/ng236/chapter/Recommendations';
  const WHO_REHAB_URL = 'https://www.who.int/news-room/fact-sheets/detail/rehabilitation';

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function number(value, fallback = 0) {
    return Number.isFinite(Number(value)) ? Number(value) : fallback;
  }

  function formatDate(value) {
    if (!value) return 'Not recorded';
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? escapeHtml(value)
      : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function masNumber(value) {
    const text = String(value ?? '');
    if (text === '1+') return 1.5;
    return number(text.replace('+', '.5'));
  }

  function brunnstromInterpretation(stage) {
    const descriptions = {
      1: 'Flaccid stage with no voluntary movement documented.',
      2: 'Early voluntary activity may appear mainly within basic synergy patterns.',
      3: 'Voluntary control is dominated by synergy patterns and spasticity may be more evident.',
      4: 'Some movement outside obligatory synergy is emerging; selective control remains limited.',
      5: 'More complex voluntary movement is available, although dexterity and speed may remain restricted.',
      6: 'Near-isolated joint control may be available; task quality and real-world use remain the main tests.'
    };
    return descriptions[number(stage)] || 'Motor-recovery stage requires clinician interpretation.';
  }

  function masInterpretation(value) {
    const descriptions = {
      '0': 'No increase in muscle tone recorded.',
      '1': 'Slight increase in tone, typically a catch and release or minimal resistance at end range.',
      '1+': 'Slight increase in tone through less than half of the range.',
      '2': 'More marked increase in tone through much of the range, while the limb remains movable.',
      '3': 'Considerable increase in tone; passive movement is difficult.',
      '4': 'The affected part is recorded as rigid in flexion or extension.'
    };
    return descriptions[String(value)] || 'Tone requires direct clinical examination.';
  }

  function motorPathway(patient) {
    const brs = number(patient.brunnstrom);
    const fma = number(patient.fma);
    if (brs <= 2 || fma < 25) {
      return {
        label: 'High-support motor pathway',
        summary: 'Severe paresis is the dominant constraint. The session should prioritise safe alignment, comfort, attention, attempted initiation and observable response rather than completed robotic cycles alone.',
        priorities: [
          'Use low, comfortable range and slow movement while monitoring the shoulder, hand skin, fatigue and tone.',
          'Record whether voluntary initiation is absent, trace or clearly observed before assistance begins.',
          'Pair device practice with an immediate, simple task outside the device so transfer is not assumed.'
        ]
      };
    }
    if (brs >= 5 && fma >= 40) {
      return {
        label: 'Selective-control and dexterity pathway',
        summary: 'The main question is no longer whether movement can occur, but whether it is selective, efficient and useful in daily activity. Assistance should be reduced when safe so the device does not hide the true motor demand.',
        priorities: [
          'Increase task specificity, precision and controlled release before simply increasing repetitions.',
          'Monitor trunk, shoulder and wrist compensation while reducing robotic assistance.',
          'Judge progress through unassisted task performance, not device-range completion.'
        ]
      };
    }
    return {
      label: 'Active-assist and transfer pathway',
      summary: 'Some movement outside synergy is available, but dexterity and functional hand use remain restricted. Assistance can support practice only when motor attempt, movement quality and post-device transfer are visible.',
      priorities: [
        'Use active-assist rather than passive completion when the patient can initiate movement.',
        'Progress comfortable range and release control before speed or object complexity.',
        'Control shoulder hiking, trunk substitution and flexor-dominant movement patterns.'
      ]
    };
  }

  function outcomeFor(patientId, measure) {
    return state.outcomes
      .filter((outcome) => outcome.patientId === patientId && outcome.measure === measure)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))[0] || null;
  }

  function outcomeSummary(patient, measure, fallback) {
    const outcome = outcomeFor(patient.id, measure);
    if (!outcome) return `${measure}: ${escapeHtml(fallback)} recorded; no longitudinal outcome entry is available.`;
    const change = number(outcome.current) - number(outcome.baseline);
    const direction = change > 0 ? `+${change}` : String(change);
    return `${measure}: ${escapeHtml(outcome.baseline)} → ${escapeHtml(outcome.current)} (${direction}), last recorded ${formatDate(outcome.date)}.`;
  }

  function sessionSummary(patient) {
    const sessions = state.sessions
      .filter((session) => session.patientId === patient.id)
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
    if (!sessions.length) {
      return {
        headline: 'No completed session is recorded.',
        stats: [],
        interpretation: 'Do not infer tolerance, attention or transfer from the eligibility screen. Establish a supervised baseline session first.'
      };
    }

    const latest = sessions[0];
    const minutes = sessions.reduce((sum, session) => sum + number(session.activeMinutes), 0);
    const cycles = sessions.reduce((sum, session) => sum + number(session.reps), 0);
    const attempted = sessions.reduce((sum, session) => sum + number(session.transferAttempted), 0);
    const successful = sessions.reduce((sum, session) => sum + number(session.transfer), 0);
    const averageGaze = Math.round(sessions.reduce((sum, session) => sum + number(session.gaze), 0) / sessions.length);
    const painRise = number(latest.painPost) - number(latest.painPre);
    const transferRate = attempted ? Math.round(successful / attempted * 100) : 0;

    let interpretation = 'The record shows a tolerable practice exposure, but response should be judged against movement quality and the functional transfer target.';
    if (latest.initiation === 'Not observed') interpretation = 'Voluntary initiation was not observed in the latest session. Robotic completion should not be presented as recovered voluntary control.';
    else if (transferRate === 0) interpretation = 'No successful post-device transfer is documented. Revisit task specificity, assistance level and whether the transfer target is currently achievable.';
    else if (transferRate >= 70) interpretation = 'Transfer attempts are frequently successful. The next review should test whether assistance can be reduced without loss of movement quality.';

    return {
      headline: `${sessions.length} session${sessions.length === 1 ? '' : 's'} recorded; latest on ${formatDate(latest.date)}.`,
      stats: [
        `${minutes} active minutes`,
        `${cycles} movement cycles`,
        `${averageGaze}% mean mirror-gaze fidelity`,
        `${transferRate}% documented transfer success`,
        `Latest pain change ${painRise > 0 ? '+' : ''}${painRise}`,
        `Latest initiation: ${escapeHtml(latest.initiation || 'Not recorded')}`
      ],
      interpretation
    };
  }

  function screeningRows(patient) {
    const checks = patient.eligibleChecks || {};
    return [
      { label: 'Physiological stability', pass: Boolean(checks.stable), detail: checks.stable ? 'Recorded as stable.' : 'Stability has not been verified.' },
      { label: 'Mechanical tolerance', pass: Boolean(checks.msk), detail: checks.msk ? 'No contraindicating fracture, tendon injury, fixed contracture or other restriction recorded.' : 'Musculoskeletal tolerance requires review.' },
      { label: 'Contact-area skin', pass: Boolean(checks.skin) && patient.skin === 'Intact', detail: patient.skin === 'Intact' ? 'Skin recorded as intact.' : `Skin status: ${escapeHtml(patient.skin)}.` },
      { label: 'Cognition or supported pathway', pass: Boolean(checks.cognition), detail: checks.cognition ? `MMSE/equivalent ${escapeHtml(patient.mmse)}/30 is recorded, with the support check completed.` : 'Ability to understand, attend or use an approved supported pathway is not verified.' },
      { label: 'Motor-stage boundary', pass: number(patient.brunnstrom) >= 2, detail: `Brunnstrom arm stage ${escapeHtml(patient.brunnstrom)}; local prototype threshold is stage 2 or above.` },
      { label: 'Tone boundary', pass: masNumber(patient.mas) < 3, detail: `Finger-flexor MAS ${escapeHtml(patient.mas)}; local prototype threshold is below 3.` }
    ];
  }

  function missingAssessmentQuestions(patient) {
    const common = [
      'Confirm stroke date, affected hand, hand dominance and whether the current phase label is accurate.',
      'Document passive range, shoulder pain or subluxation, sensation, proprioception and oedema before fitting the device.',
      'Screen vision, visual inattention, apraxia, aphasia, attention and ability to follow the mirror task; MMSE alone does not answer these questions.',
      'Confirm fatigue, cardiovascular tolerance, current medication effects and any change in neurological status.',
      'Check the current manufacturer IFU, local governance and device-specific contraindications before treatment.'
    ];

    if (patient.id === 'case-a') {
      common.unshift('Clarify whether left-MCA consequences such as language or praxis difficulty affect instruction, motor planning or consent, rather than assuming MMSE captures them.');
    }
    if (patient.id === 'case-b') {
      common.unshift('In the subacute haemorrhagic-stroke context, confirm medical stability, shoulder protection, fatigue and tolerance of upright sustained attention before dose progression.');
    }
    if (patient.id === 'case-c') {
      common.unshift('Measure active wrist and finger extension, pinch quality and compensatory trunk movement before considering reduced assistance or constraint-based practice.');
    }
    return common;
  }

  function caseSpecificInsight(patient) {
    if (patient.id === 'case-a') {
      return 'This profile sits between impairment reduction and functional hand use. The cup-stabilisation goal is appropriate because it tests bilateral participation, but progression should depend on controlled release and reduced shoulder hiking, not simply more cycles.';
    }
    if (patient.id === 'case-b') {
      return 'This is the most vulnerable profile in the sample caseload. Early mirror-synchronised exposure may support attention and attempted movement, but the case should remain high-supervision and low-range until initiation, fatigue, skin and shoulder response are understood.';
    }
    if (patient.id === 'case-c') {
      return 'This profile has the highest recorded motor capacity. The clinical risk is over-assistance: a device can make performance look fluent while masking residual dexterity, timing and release deficits. Unassisted peg or dressing-task performance should drive progression.';
    }
    return 'Use the functional goal, motor stage, tone, impairment measures, observed session response and unassisted transfer together. No single score establishes suitability or dose.';
  }

  function buildDialogHtml(patient) {
    const eligibility = patientEligibility(patient);
    const rows = screeningRows(patient);
    const pathway = motorPathway(patient);
    const protocol = state.protocols.find((item) => item.patientId === patient.id);
    const sessions = sessionSummary(patient);
    const flags = reviewFlags(patient);
    const passCount = rows.filter((row) => row.pass).length;
    const allPass = passCount === rows.length && eligibility.suitable;

    const protocolHtml = protocol
      ? `<p><strong>${escapeHtml(pathwayLabel(protocol.pathway))} pathway</strong> · ${escapeHtml(protocol.frequency)} × ${escapeHtml(protocol.minutes)} min/week for ${escapeHtml(protocol.weeks)} weeks in ${escapeHtml(protocol.setting)}.</p>
         <ul>
           <li><strong>Movement families:</strong> ${escapeHtml(protocol.family1)} + ${escapeHtml(protocol.family2)}</li>
           <li><strong>Starting demand:</strong> ${escapeHtml(protocol.demand)} at ${escapeHtml(protocol.range)}, ${escapeHtml(String(protocol.speed).toLowerCase())} speed.</li>
           <li><strong>Progression gate:</strong> ${escapeHtml(protocol.gate)}</li>
           <li><strong>Transfer target:</strong> ${escapeHtml(protocol.transfer)}</li>
         </ul>`
      : '<p>No protocol is recorded. Complete the clinical assessment before selecting range, assistance, dose or progression.</p>';

    return `
      <button class="dialog-close" id="closePatientInsightDialog" type="button" aria-label="Close case review">×</button>
      <header class="patient-insight-header">
        <div>
          <p class="eyebrow">Clinical case review · synthetic demonstration data</p>
          <h2 id="patientInsightTitle">${escapeHtml(patient.label)}</h2>
          <p>${escapeHtml(patient.condition)} · ${escapeHtml(patient.phase)} · Goal: ${escapeHtml(patient.goal)}</p>
        </div>
        <div class="patient-screen-status ${allPass ? 'pass' : 'review'}">
          <small>Local eligibility screen</small>
          <strong>${allPass ? 'Screen passed' : 'Review required'}</strong>
          <span>${passCount}/${rows.length} checks documented</span>
        </div>
      </header>

      <section class="patient-boundary-note ${allPass ? '' : 'review'}">
        <strong>${allPass ? 'Eligible screen does not mean automatic treatment approval.' : 'One or more screening elements require clinician review.'}</strong>
        <p>${allPass
          ? 'It means the prototype’s minimum documented checks are currently met. Final suitability, mode, range, dose and supervision remain clinician decisions and must follow the manufacturer IFU and local governance.'
          : 'Do not start or progress the robotic mirror-hand pathway until the unresolved items are assessed and documented.'}</p>
      </section>

      <div class="patient-insight-grid">
        <article class="patient-insight-card">
          <strong>Motor and activity profile</strong>
          <h3>Brunnstrom ${escapeHtml(patient.brunnstrom)} · MAS ${escapeHtml(patient.mas)}</h3>
          <p>${escapeHtml(brunnstromInterpretation(patient.brunnstrom))}</p>
          <p>${escapeHtml(masInterpretation(patient.mas))}</p>
          <div class="patient-score-grid">
            <span><b>${escapeHtml(patient.fma)}</b>FMA-UE / 66</span>
            <span><b>${escapeHtml(patient.arat)}</b>ARAT / 57</span>
            <span><b>${escapeHtml(patient.pain)}</b>Pain / 10</span>
            <span><b>${escapeHtml(patient.mmse)}</b>MMSE / 30</span>
          </div>
          <p class="patient-caveat">FMA-UE describes motor impairment and ARAT samples upper-limb activity capacity. Neither score alone determines device suitability or real-world use.</p>
        </article>

        <article class="patient-insight-card emphasis">
          <strong>Clinical reading</strong>
          <h3>${escapeHtml(pathway.label)}</h3>
          <p>${escapeHtml(pathway.summary)}</p>
          <ul>${pathway.priorities.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          <blockquote>${escapeHtml(caseSpecificInsight(patient))}</blockquote>
        </article>

        <article class="patient-insight-card wide" id="patientInsightEligibility">
          <strong>Why the eligibility badge reads “${allPass ? 'Eligible screen' : 'Review screen'}”</strong>
          <div class="patient-screen-grid">
            ${rows.map((row) => `<div class="patient-screen-row ${row.pass ? 'pass' : 'review'}"><span aria-hidden="true">${row.pass ? '✓' : '!'}</span><div><b>${escapeHtml(row.label)}</b><p>${row.detail}</p></div></div>`).join('')}
          </div>
          <p class="patient-caveat">This is a transparent local prototype rule set, not a validated prediction model or substitute for a complete neurological, musculoskeletal, cognitive, visual and functional assessment.</p>
        </article>

        <article class="patient-insight-card">
          <strong>Recorded outcome trajectory</strong>
          <h3>Impairment and activity must be read separately</h3>
          <p>${outcomeSummary(patient, 'FMA-UE', patient.fma)}</p>
          <p>${outcomeSummary(patient, 'ARAT', patient.arat)}</p>
          <p class="patient-caveat">A higher score is directionally favourable, but apparent change should be checked against measurement conditions, measurement error and whether daily activity changed.</p>
        </article>

        <article class="patient-insight-card">
          <strong>Practice response</strong>
          <h3>${escapeHtml(sessions.headline)}</h3>
          ${sessions.stats.length ? `<div class="patient-session-stats">${sessions.stats.map((item) => `<span>${item}</span>`).join('')}</div>` : ''}
          <p>${escapeHtml(sessions.interpretation)}</p>
        </article>

        <article class="patient-insight-card wide">
          <strong>Current RMHT plan</strong>
          ${protocolHtml}
          <div class="patient-precaution"><b>Recorded precautions</b><p>${escapeHtml(patient.precautions || 'No case-specific precautions are recorded.')}</p></div>
        </article>

        <article class="patient-insight-card">
          <strong>Rule-based review prompts</strong>
          <ul>${flags.map((flag) => `<li><b>${escapeHtml(flag.title)}:</b> ${escapeHtml(flag.text)}</li>`).join('')}</ul>
        </article>

        <article class="patient-insight-card">
          <strong>Confirm before the next session</strong>
          <ul>${missingAssessmentQuestions(patient).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>

        <article class="patient-insight-card evidence wide">
          <strong>Evidence and governance boundary</strong>
          <p>NICE NG236 recommends meaningful activity- and participation-focused goals, comprehensive assessment, and repetitive task practice for reaching, grasping and object manipulation. It recommends considering mirror therapy as an adjunct, with a specified early post-stroke schedule when used. The same guideline advises against routine robot-assisted arm training. This means the robotic component should not be presented as an evidence-settled replacement for occupational therapy, task practice or clinician judgement.</p>
          <p>MirrorCoach therefore presents the device as a clinician-governed prototype for mirror-synchronised practice and documentation. Use requires the current manufacturer IFU, local regulatory status, governance approval, adverse-event processes and an explicit functional-transfer test.</p>
          <div class="patient-evidence-links">
            <a href="${NICE_GUIDANCE_URL}" target="_blank" rel="noopener noreferrer">NICE NG236 · Stroke rehabilitation in adults</a>
            <a href="${WHO_REHAB_URL}" target="_blank" rel="noopener noreferrer">WHO · Rehabilitation</a>
          </div>
        </article>
      </div>

      <footer class="patient-insight-actions">
        <button class="secondary" type="button" data-patient-dialog-action="edit" data-id="${escapeHtml(patient.id)}">Edit case record</button>
        <button class="secondary" type="button" data-patient-dialog-action="prescribe" data-id="${escapeHtml(patient.id)}">Open prescription</button>
        <button class="primary" type="button" data-patient-dialog-action="session" data-id="${escapeHtml(patient.id)}">Open guided session</button>
      </footer>`;
  }

  function installDialog() {
    if (document.getElementById('patientInsightDialog')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'patientInsightDialog';
    dialog.className = 'patient-insight-dialog';
    dialog.setAttribute('aria-labelledby', 'patientInsightTitle');
    document.body.appendChild(dialog);

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target.closest('#closePatientInsightDialog')) {
        dialog.close();
        return;
      }
      const action = event.target.closest('[data-patient-dialog-action]');
      if (!action) return;
      const id = action.dataset.id;
      const matchingCard = document.querySelector(`.patient-card[data-patient-id="${CSS.escape(id)}"]`);
      dialog.close();
      if (action.dataset.patientDialogAction === 'edit') matchingCard?.querySelector('.edit-patient')?.click();
      if (action.dataset.patientDialogAction === 'prescribe') matchingCard?.querySelector('.go-prescribe')?.click();
      if (action.dataset.patientDialogAction === 'session') matchingCard?.querySelector('.go-session')?.click();
    });
  }

  function openPatientInsight(id, focus = 'overview') {
    const patient = state.patients.find((item) => item.id === id);
    const dialog = document.getElementById('patientInsightDialog');
    if (!patient || !dialog) return;
    dialog.innerHTML = buildDialogHtml(patient);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (focus === 'eligibility') {
      requestAnimationFrame(() => document.getElementById('patientInsightEligibility')?.scrollIntoView({ block: 'start' }));
    }
  }

  function enhancePatientCards() {
    const host = document.getElementById('patientCards');
    if (!host || !Array.isArray(state?.patients)) return;
    const cards = [...host.querySelectorAll('.patient-card')];
    cards.forEach((card, index) => {
      if (card.dataset.patientInsightReady === 'true') return;
      const patient = state.patients[index];
      if (!patient) return;
      card.dataset.patientInsightReady = 'true';
      card.dataset.patientId = patient.id;
      card.tabIndex = 0;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-label', `${patient.label}. Open clinical case review.`);

      const title = card.querySelector('h3');
      if (title) {
        const label = title.textContent.trim();
        title.innerHTML = `<button class="patient-title-button" type="button" data-patient-insight="${escapeHtml(patient.id)}" data-patient-insight-focus="overview">${escapeHtml(label)}<span aria-hidden="true">↗</span></button>`;
      }

      const badge = card.querySelector('.card-top .badge');
      if (badge) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = badge.className;
        button.dataset.patientInsight = patient.id;
        button.dataset.patientInsightFocus = 'eligibility';
        button.title = 'Open the eligibility rationale and clinical review';
        button.innerHTML = `${escapeHtml(badge.textContent.trim())}<span aria-hidden="true">›</span>`;
        badge.replaceWith(button);
      }

      const actions = card.querySelector('.card-actions');
      if (actions && !card.querySelector('.patient-review-link')) {
        const review = document.createElement('button');
        review.type = 'button';
        review.className = 'patient-review-link';
        review.dataset.patientInsight = patient.id;
        review.dataset.patientInsightFocus = 'overview';
        review.innerHTML = '<span>Open clinical case review</span><i aria-hidden="true">→</i>';
        actions.before(review);
      }
    });
  }

  function bindInteractions() {
    document.addEventListener('click', (event) => {
      const insight = event.target.closest('[data-patient-insight]');
      if (insight) {
        event.preventDefault();
        event.stopPropagation();
        openPatientInsight(insight.dataset.patientInsight, insight.dataset.patientInsightFocus || 'overview');
        return;
      }

      const card = event.target.closest('.patient-card[data-patient-id]');
      if (!card || event.target.closest('button, a, input, select, textarea, label')) return;
      openPatientInsight(card.dataset.patientId, 'overview');
    });

    document.addEventListener('keydown', (event) => {
      const card = event.target.closest('.patient-card[data-patient-id]');
      if (!card || event.target !== card || !['Enter', ' '].includes(event.key)) return;
      event.preventDefault();
      openPatientInsight(card.dataset.patientId, 'overview');
    });
  }

  installDialog();
  enhancePatientCards();
  bindInteractions();

  const host = document.getElementById('patientCards');
  if (host) new MutationObserver(enhancePatientCards).observe(host, { childList: true });

  window.openPatientInsight = openPatientInsight;
})();
