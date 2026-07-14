(function () {
  'use strict';

  const SOURCE_LINKS = {
    dose: 'https://www.frontiersin.org/journals/rehabilitation-sciences/articles/10.3389/fresc.2023.1139251/full',
    robotics: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12265130/',
    safety: 'https://www.who.int/publications/i/item/9789240015319'
  };
  const ACTION_LABELS = {
    en: 'View analysis',
    'zh-Hans': '查看分析',
    es: 'Ver análisis',
    fr: 'Voir l’analyse',
    de: 'Analyse anzeigen',
    ms: 'Lihat analisis'
  };
  const CLOSE_LABELS = {
    en: 'Close metric analysis',
    'zh-Hans': '关闭指标分析',
    es: 'Cerrar análisis de la métrica',
    fr: 'Fermer l’analyse de l’indicateur',
    de: 'Kennzahlenanalyse schließen',
    ms: 'Tutup analisis metrik'
  };
  const METRIC_UNITS = {
    minutes: 'active min',
    cycles: 'cycles',
    sessions: 'sessions',
    safety: 'flags'
  };
  const METRIC_VALUE_IDS = {
    minutes: 'statMinutes',
    cycles: 'statReps',
    sessions: 'statSessions',
    safety: 'statFlags'
  };

  let lastTrigger = null;
  let openMetric = null;

  function languageKey() {
    const language = document.documentElement.lang || 'en';
    if (ACTION_LABELS[language]) return language;
    const short = language.slice(0, 2).toLowerCase();
    return ACTION_LABELS[short] ? short : 'en';
  }

  function locale() {
    return ({ en: 'en-GB', 'zh-Hans': 'zh-CN', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', ms: 'ms-MY' })[languageKey()] || 'en-GB';
  }

  function formatNumber(value, digits = 0) {
    return new Intl.NumberFormat(locale(), { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(N(value));
  }

  function formatDate(value, options = { day: 'numeric', month: 'short' }) {
    const date = parseDateKey(value);
    return date ? new Intl.DateTimeFormat(locale(), options).format(date) : '—';
  }

  function ratio(value, total) {
    return total ? Math.round((N(value) / N(total)) * 100) : 0;
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = values.map(Number).sort((a, b) => a - b);
    const midpoint = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[midpoint] : (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  }

  function sevenDayKeys() {
    const end = new Date();
    end.setHours(12, 0, 0, 0);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(end);
      date.setDate(end.getDate() - (6 - index));
      return dateKey(date);
    });
  }

  function metricTitle(metric) {
    const title = document.querySelector(`[data-metric-insight="${metric}"] [data-i18n]`);
    return title?.textContent?.trim() || ({
      minutes: 'Active RMHT minutes',
      cycles: 'Movement cycles',
      sessions: 'Sessions completed',
      safety: 'Safety review flags'
    })[metric];
  }

  function currentScope() {
    const filter = $('dashboardPatientFilter')?.value || 'all';
    const patients = filter === 'all' ? state.patients : state.patients.filter(patient => patient.id === filter);
    const patientIds = new Set(patients.map(patient => patient.id));
    const sessions = state.sessions
      .filter(session => isWithin7Days(session.date) && patientIds.has(session.patientId))
      .sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.id).localeCompare(String(b.id)));
    const protocols = patients.map(patient => ({ patient, protocol: protocolsForPatient(patient.id)[0] || null }));
    const flags = patients.flatMap(patient => reviewFlags(patient)
      .filter(flag => flag.type !== 'good')
      .map(flag => ({ ...flag, patient })));
    const events = (state.events || []).filter(event => isWithin7Days(event.date) && patientIds.has(event.patientId));
    const days = sevenDayKeys().map(key => {
      const dailySessions = sessions.filter(session => session.date === key);
      return {
        key,
        minutes: dailySessions.reduce((sum, session) => sum + N(session.activeMinutes), 0),
        cycles: dailySessions.reduce((sum, session) => sum + N(session.reps), 0),
        sessions: dailySessions.length,
        safety: events.filter(event => event.date === key).length
      };
    });
    const plannedSessions = protocols.reduce((sum, item) => sum + N(item.protocol?.frequency), 0);
    const plannedMinutes = protocols.reduce((sum, item) => sum + (N(item.protocol?.frequency) * N(item.protocol?.minutes)), 0);
    const minutes = sessions.reduce((sum, session) => sum + N(session.activeMinutes), 0);
    const cycles = sessions.reduce((sum, session) => sum + N(session.reps), 0);
    return {
      filter,
      patients,
      patientIds,
      sessions,
      protocols,
      flags,
      events,
      days,
      plannedSessions,
      plannedMinutes,
      minutes,
      cycles,
      start: days[0]?.key,
      end: days[days.length - 1]?.key,
      scopeLabel: filter === 'all' ? `Current caseload · ${patients.length} cases` : (patients[0]?.label || 'No case in scope')
    };
  }

  function metricValue(metric, context) {
    return ({ minutes: context.minutes, cycles: context.cycles, sessions: context.sessions.length, safety: context.flags.length })[metric] || 0;
  }

  function summaryCards(items) {
    return `<div class="metric-summary-grid">${items.map(item => `
      <article class="metric-summary-card ${item.tone || ''}">
        <span>${E(item.label)}</span>
        <strong>${E(item.value)}</strong>
        <small>${E(item.note || '')}</small>
      </article>`).join('')}</div>`;
  }

  function trendChart(context, field, title, unit) {
    const maximum = Math.max(1, ...context.days.map(day => N(day[field])));
    const total = context.days.reduce((sum, day) => sum + N(day[field]), 0);
    const accessible = context.days.map(day => `${formatDate(day.key)}: ${formatNumber(day[field])} ${unit}`).join('; ');
    return `<section class="metric-insight-section">
      <div class="metric-section-heading"><div><p class="workspace-kicker">Seven-day profile</p><h3>${E(title)}</h3></div><span>${formatNumber(total)} ${E(unit)}</span></div>
      <ol aria-label="${E(accessible)}" class="metric-trend-chart">
        ${context.days.map(day => {
          const value = N(day[field]);
          const height = Math.round((value / maximum) * 100);
          return `<li title="${E(`${formatDate(day.key, { weekday: 'long', day: 'numeric', month: 'long' })}: ${formatNumber(value)} ${unit}`)}"><strong>${formatNumber(value)}</strong><span class="metric-bar-track"><i class="${value ? '' : 'zero'}" style="--metric-bar:${height}%"></i></span><small>${E(formatDate(day.key, { weekday: 'short' }))}<b>${E(formatDate(day.key))}</b></small></li>`;
        }).join('')}
      </ol>
    </section>`;
  }

  function table(headers, rows, emptyText = 'No records in this scope.') {
    if (!rows.length) return `<div class="empty">${E(emptyText)}</div>`;
    return `<div class="metric-table-wrap"><table class="metric-table"><thead><tr>${headers.map(header => `<th>${E(header)}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  }

  function noteGrid(calculation, guardrail) {
    return `<div class="metric-note-grid">
      <article><span>Calculation</span><p>${calculation}</p></article>
      <article class="guardrail"><span>Interpretation guardrail</span><p>${guardrail}</p></article>
    </div>`;
  }

  function sourcePanel(links) {
    const available = {
      dose: `<a href="${SOURCE_LINKS.dose}" rel="noopener noreferrer" target="_blank">Dose, intensity and dosage definitions <span aria-hidden="true">↗</span></a>`,
      robotics: `<a href="${SOURCE_LINKS.robotics}" rel="noopener noreferrer" target="_blank">Upper-limb robotic rehabilitation review <span aria-hidden="true">↗</span></a>`,
      safety: `<a href="${SOURCE_LINKS.safety}" rel="noopener noreferrer" target="_blank">WHO post-market surveillance guidance <span aria-hidden="true">↗</span></a>`
    };
    return `<aside class="metric-evidence"><div><p class="workspace-kicker">Evidence lens</p><h3>Why this analysis is structured this way</h3><p>These references inform the interpretation layer; they do not turn a dashboard aggregate into a clinical recommendation.</p></div><div>${links.map(link => available[link]).join('')}</div></aside>`;
  }

  function actionRow(primary) {
    return `<div class="metric-action-row">
      <button class="secondary" data-metric-close type="button">Return to command centre</button>
      <button class="primary" ${primary.attributes} type="button">${E(primary.label)}</button>
    </div>`;
  }

  function patientSessionRows(context, mode) {
    return context.protocols.map(({ patient, protocol }) => {
      const sessions = context.sessions.filter(session => session.patientId === patient.id);
      const actualMinutes = sessions.reduce((sum, session) => sum + N(session.activeMinutes), 0);
      const cycles = sessions.reduce((sum, session) => sum + N(session.reps), 0);
      const targetMinutes = protocol ? N(protocol.frequency) * N(protocol.minutes) : 0;
      const latest = [...sessions].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
      if (mode === 'minutes') {
        return `<tr><td><strong>${E(patient.label)}</strong><small>${E(protocol?.setting || 'No active prescription')}</small></td><td>${formatNumber(sessions.length)}</td><td>${formatNumber(actualMinutes)} min</td><td>${targetMinutes ? `${formatNumber(targetMinutes)} min` : '—'}</td><td><span class="metric-status ${ratio(actualMinutes, targetMinutes) >= 80 ? 'good' : 'neutral'}">${targetMinutes ? `${formatNumber(ratio(actualMinutes, targetMinutes))}%` : 'Not set'}</span></td></tr>`;
      }
      if (mode === 'sessions') {
        const planned = N(protocol?.frequency);
        const gap = Math.max(0, planned - sessions.length);
        return `<tr><td><strong>${E(patient.label)}</strong><small>${E(protocol ? `${protocol.frequency} sessions/week` : 'No active prescription')}</small></td><td>${formatNumber(sessions.length)}</td><td>${protocol ? formatNumber(planned) : '—'}</td><td>${protocol ? formatNumber(gap) : '—'}</td><td>${latest ? E(formatDate(latest.date, { day: 'numeric', month: 'short', year: 'numeric' })) : 'No session'}</td><td>${sessions.some(session => session.deviation) ? '<span class="metric-status warning">Documented</span>' : '<span class="metric-status good">None</span>'}</td></tr>`;
      }
      return `<tr><td><strong>${E(patient.label)}</strong></td><td>${formatNumber(sessions.length)}</td><td>${formatNumber(cycles)}</td><td>${actualMinutes ? formatNumber(cycles / actualMinutes, 2) : '—'}</td><td>${E(latest?.initiation || '—')}</td></tr>`;
    });
  }

  function renderMinutes(context) {
    const coverage = ratio(context.minutes, context.plannedMinutes);
    const durations = context.sessions.map(session => N(session.activeMinutes));
    const durationMatched = context.sessions.filter(session => {
      const protocol = getProtocol(session.protocolId) || protocolsForPatient(session.patientId)[0];
      return protocol && N(session.activeMinutes) >= N(protocol.minutes);
    }).length;
    const shortSession = context.sessions.find(session => {
      const protocol = getProtocol(session.protocolId) || protocolsForPatient(session.patientId)[0];
      return protocol && N(session.activeMinutes) < N(protocol.minutes);
    });
    const deviationText = String(shortSession?.deviation || 'not specified').trim().replace(/[.!?]+$/, '');
    const headline = context.plannedMinutes
      ? `${formatNumber(context.minutes)} of ${formatNumber(context.plannedMinutes)} prescribed weekly minutes are documented in the current rolling window (${formatNumber(coverage)}% exposure coverage).`
      : `${formatNumber(context.minutes)} active minutes are documented; there is no weekly prescription target in this scope.`;
    const observation = context.sessions.length
      ? `${durationMatched} of ${context.sessions.length} completed records met the session-duration field in their linked protocol.${shortSession ? ` The shorter record was ${formatNumber(shortSession.activeMinutes)} minutes and includes the deviation “${E(deviationText)}”.` : ''}`
      : 'No completed session records are available for analysis.';
    return `${summaryCards([
      { label: 'Documented exposure', value: `${formatNumber(context.minutes)} min`, note: `${context.sessions.length} completed records` },
      { label: 'Prescribed weekly minutes', value: context.plannedMinutes ? `${formatNumber(context.plannedMinutes)} min` : 'Not set', note: 'Frequency × duration, by case' },
      { label: 'Exposure coverage', value: context.plannedMinutes ? `${formatNumber(coverage)}%` : '—', note: 'Not an outcome measure', tone: coverage >= 80 ? 'good' : '' },
      { label: 'Median active duration', value: durations.length ? `${formatNumber(median(durations), Number.isInteger(median(durations)) ? 0 : 1)} min` : '—', note: 'Per completed record' }
    ])}
    <section class="metric-analysis-callout"><p class="workspace-kicker">Analytical read</p><h3>${E(headline)}</h3><p>${observation}</p></section>
    ${trendChart(context, 'minutes', 'Active practice minutes by day', 'min')}
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Case contribution</p><h3>Exposure against each prescription</h3></div><span>Rolling window</span></div>${table(['Case', 'Sessions', 'Active minutes', 'Weekly target', 'Coverage'], patientSessionRows(context, 'minutes'), 'No cases in scope.')}</section>
    ${noteGrid(
      `Sum of the <code>activeMinutes</code> field in completed records dated ${E(formatDate(context.start, { day: 'numeric', month: 'short', year: 'numeric' }))}–${E(formatDate(context.end, { day: 'numeric', month: 'short', year: 'numeric' }))}, inclusive. The comparison target is each linked prescription’s sessions per week × minutes per session.`,
      'Active time is an exposure measure. It does not identify movement quality, patient effort, assistance level, task specificity, clinical benefit or activity-of-daily-living transfer. Programme start dates and scheduled cancellations are not represented, so coverage must not be labelled adherence without review.'
    )}
    ${sourcePanel(['dose', 'robotics'])}
    ${actionRow({ label: 'Open dose layer', attributes: 'data-metric-dashboard-layer="dose"' })}`;
  }

  function renderCycles(context) {
    const mean = context.sessions.length ? context.cycles / context.sessions.length : 0;
    const rate = context.minutes ? context.cycles / context.minutes : 0;
    const cycleValues = context.sessions.map(session => N(session.reps));
    const range = cycleValues.length ? `${formatNumber(Math.min(...cycleValues))}–${formatNumber(Math.max(...cycleValues))}` : '—';
    const sessionRows = [...context.sessions].reverse().map(session => {
      const patient = getPatient(session.patientId);
      const perMinute = N(session.activeMinutes) ? N(session.reps) / N(session.activeMinutes) : 0;
      const transfer = Number.isFinite(Number(session.transferAttempted)) ? `${N(session.transfer)}/${N(session.transferAttempted)}` : '—';
      return `<tr><td>${E(formatDate(session.date, { day: 'numeric', month: 'short', year: 'numeric' }))}</td><td><strong>${E(patient?.label || session.patientId)}</strong></td><td>${formatNumber(session.reps)}</td><td>${formatNumber(session.activeMinutes)} min</td><td>${formatNumber(perMinute, 2)}</td><td>${E(session.initiation || '—')}</td><td>${E(transfer)}</td></tr>`;
    });
    return `${summaryCards([
      { label: 'Documented cycles', value: formatNumber(context.cycles), note: `${context.sessions.length} completed records` },
      { label: 'Mean per session', value: context.sessions.length ? formatNumber(mean, 1) : '—', note: 'Arithmetic mean' },
      { label: 'Cycles per active minute', value: context.minutes ? formatNumber(rate, 2) : '—', note: 'Descriptive rate only' },
      { label: 'Session range', value: range, note: 'Lowest–highest recorded count' }
    ])}
    <section class="metric-analysis-callout"><p class="workspace-kicker">Analytical read</p><h3>${formatNumber(context.cycles)} movement cycles were recorded across ${formatNumber(context.sessions.length)} sessions.</h3><p>The mean was ${formatNumber(mean, 1)} cycles per session and ${formatNumber(rate, 2)} cycles per active minute. The spread should be reviewed alongside pathway, range, assistance, initiation, fidelity and the post-device functional transfer probe.</p></section>
    ${trendChart(context, 'cycles', 'Documented movement cycles by day', 'cycles')}
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Source records</p><h3>Cycle volume with quality context</h3></div><span>${context.sessions.length} records</span></div>${table(['Date', 'Case', 'Cycles', 'Active time', 'Cycles/min', 'Initiation', 'Transfer'], sessionRows)}</section>
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Case distribution</p><h3>Where the recorded volume came from</h3></div><span>Current scope</span></div>${table(['Case', 'Sessions', 'Cycles', 'Cycles/min', 'Latest initiation'], patientSessionRows(context, 'cycles'), 'No cases in scope.')}</section>
    ${noteGrid(
      `Sum of the manually documented <code>reps</code> field for completed records in the rolling seven-day window. A “cycle” is whatever completed programmed movement sequence the clinician recorded; this prototype does not receive or validate sensor telemetry.`,
      'A larger count is not automatically a better dose. Counts can include different movement families, ranges, assistance levels and task demands, and they do not prove active contribution, good kinematics, learning, transfer or clinical improvement.'
    )}
    ${sourcePanel(['dose', 'robotics'])}
    ${actionRow({ label: 'Open research data register', attributes: 'data-metric-destination="research" data-metric-view="data"' })}`;
  }

  function renderSessions(context) {
    const coverage = ratio(context.sessions.length, context.plannedSessions);
    const meanMinutes = context.sessions.length ? context.minutes / context.sessions.length : 0;
    const activeCases = new Set(context.sessions.map(session => session.patientId)).size;
    const deviations = context.sessions.filter(session => session.deviation).length;
    return `${summaryCards([
      { label: 'Completed records', value: formatNumber(context.sessions.length), note: 'Current rolling seven days' },
      { label: 'Prescribed sessions', value: context.plannedSessions ? formatNumber(context.plannedSessions) : 'Not set', note: 'Weekly frequency in scope' },
      { label: 'Cadence coverage', value: context.plannedSessions ? `${formatNumber(coverage)}%` : '—', note: 'Requires schedule verification', tone: coverage >= 80 ? 'good' : '' },
      { label: 'Mean active duration', value: context.sessions.length ? `${formatNumber(meanMinutes, 1)} min` : '—', note: `${activeCases}/${context.patients.length || 0} cases represented` }
    ])}
    <section class="metric-analysis-callout"><p class="workspace-kicker">Analytical read</p><h3>${formatNumber(context.sessions.length)} completed sessions cover ${formatNumber(activeCases)} of ${formatNumber(context.patients.length)} cases in scope.</h3><p>${context.plannedSessions ? `${formatNumber(context.sessions.length)} of ${formatNumber(context.plannedSessions)} prescribed weekly sessions are represented (${formatNumber(coverage)}% cadence coverage).` : 'No prescribed weekly frequency is available for comparison.'} ${deviations ? `${formatNumber(deviations)} completed record${deviations === 1 ? '' : 's'} include${deviations === 1 ? 's' : ''} a documented protocol deviation.` : 'No protocol deviations are documented in these records.'}</p></section>
    ${trendChart(context, 'sessions', 'Completed session records by day', 'sessions')}
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Caseload review</p><h3>Completed cadence against prescription</h3></div><span>Current scope</span></div>${table(['Case', 'Completed', 'Prescribed', 'Unrepresented', 'Latest record', 'Deviation'], patientSessionRows(context, 'sessions'), 'No cases in scope.')}</section>
    ${noteGrid(
      `Count of completed session records dated ${E(formatDate(context.start, { day: 'numeric', month: 'short', year: 'numeric' }))}–${E(formatDate(context.end, { day: 'numeric', month: 'short', year: 'numeric' }))}, inclusive. Prescribed sessions are the sum of the weekly frequency field for protocols in scope.`,
      'A completed-record count is not attendance or adherence by itself. This prototype has no appointment calendar, programme start/end dates, cancellation reasons, make-up sessions or treatment holds. Verify the schedule before interpreting an unrepresented session as missed care.'
    )}
    ${sourcePanel(['dose'])}
    ${actionRow({ label: 'Log a session', attributes: 'data-metric-destination="session"' })}`;
  }

  function renderSafety(context) {
    const deviations = context.sessions.filter(session => session.deviation).length;
    const ruleCounts = context.flags.reduce((counts, flag) => counts.set(flag.title, (counts.get(flag.title) || 0) + 1), new Map());
    const ruleDefinitions = [
      ['Continuity', 'No session in the last 7 days', 'No completed record for a case in the rolling window'],
      ['Pain', 'Pain threshold crossed', `Post-session pain > ${N(state.settings.painThreshold, 4)} or increase > 2 points`],
      ['Device', 'Device synchronisation or fault event', 'Any completed record marked with a device fault'],
      ['Mirror fidelity', 'Mirror-gaze fidelity is low', 'At least 2 records and mean mirror gaze < 75%'],
      ['Functional transfer', 'No functional transfer documented', 'At least 2 records and every recorded transfer score is 0'],
      ['Eligibility', 'Eligibility requires review', 'Current screen or readiness criteria are not met']
    ];
    const ruleRows = ruleDefinitions.map(([category, title, logic]) => {
      const count = ruleCounts.get(title) || 0;
      return `<tr><td><strong>${E(category)}</strong><small>${E(title)}</small></td><td>${E(logic)}</td><td><span class="metric-status ${count ? 'risk' : 'good'}">${count ? `${formatNumber(count)} case${count === 1 ? '' : 's'}` : 'Not triggered'}</span></td></tr>`;
    });
    const patientRows = context.patients.map(patient => {
      const sessions = context.sessions.filter(session => session.patientId === patient.id);
      const latest = [...sessions].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0];
      const flags = reviewFlags(patient).filter(flag => flag.type !== 'good');
      const events = context.events.filter(event => event.patientId === patient.id);
      const faults = sessions.filter(session => session.deviceFault).length;
      const caseDeviations = sessions.filter(session => session.deviation).length;
      return `<tr><td><strong>${E(patient.label)}</strong></td><td><span class="metric-status ${flags.length ? 'risk' : 'good'}">${flags.length ? `${flags.length} to review` : 'No rule trigger'}</span></td><td>${latest ? `${E(latest.painPre)} → ${E(latest.painPost)}` : '—'}</td><td>${formatNumber(faults)}</td><td>${formatNumber(caseDeviations)}</td><td>${formatNumber(events.length)}</td></tr>`;
    });
    const deviationMessage = deviations
      ? `${formatNumber(deviations)} protocol deviation${deviations === 1 ? '' : 's'} ${deviations === 1 ? 'is' : 'are'} documented in the session records, but deviation presence is not itself configured as a dashboard safety flag.`
      : 'No protocol deviations are documented in the current session records.';
    return `${summaryCards([
      { label: 'Current rule triggers', value: formatNumber(context.flags.length), note: 'Across configured review rules', tone: context.flags.length ? 'risk' : 'good' },
      { label: 'Cases evaluated', value: formatNumber(context.patients.length), note: 'Current dashboard scope' },
      { label: 'Safety register entries', value: formatNumber(context.events.length), note: 'Dated in this rolling window' },
      { label: 'Protocol deviations', value: formatNumber(deviations), note: 'Separate from rule triggers', tone: deviations ? 'warning' : '' }
    ])}
    <section class="metric-analysis-callout ${context.flags.length ? 'risk' : 'good'}"><p class="workspace-kicker">Analytical read</p><h3>${context.flags.length ? `${formatNumber(context.flags.length)} rule-based prompt${context.flags.length === 1 ? '' : 's'} require human review.` : 'No configured dashboard rule is currently triggered.'}</h3><p>Zero flags is not a finding of zero risk. It means only that the six rules below did not trigger from the fields currently available. ${E(deviationMessage)} Safety-register entries, device vigilance and clinical escalation remain separate processes.</p></section>
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Rule transparency</p><h3>What the flag counter actually checks</h3></div><span>${ruleDefinitions.length} configured rules</span></div>${table(['Review domain', 'Trigger logic', 'Current result'], ruleRows)}</section>
    <section class="metric-insight-section"><div class="metric-section-heading"><div><p class="workspace-kicker">Case review</p><h3>Signals visible in the current records</h3></div><span>${context.sessions.length} sessions reviewed</span></div>${table(['Case', 'Rule result', 'Latest pain', 'Faults', 'Deviations', 'Register entries'], patientRows, 'No cases in scope.')}</section>
    ${noteGrid(
      'The counter is the number of non-good prompts returned by the current deterministic rules for cases in scope. It is not the count of adverse events, all deviations, device incidents or regulatory reports. Safety-register entries are counted separately and only when dated in this seven-day window.',
      'Continue clinician-led checks before and during every session. Apply the current manufacturer IFU, local policy and jurisdiction-specific incident escalation/reporting process. This prototype does not determine causality, severity, reportability or device safety.'
    )}
    ${sourcePanel(['safety'])}
    ${actionRow({ label: 'Open safety register', attributes: 'data-metric-destination="research" data-metric-view="safety"' })}`;
  }

  function metricBody(metric, context) {
    if (metric === 'minutes') return renderMinutes(context);
    if (metric === 'cycles') return renderCycles(context);
    if (metric === 'sessions') return renderSessions(context);
    return renderSafety(context);
  }

  function renderMetric(metric) {
    const context = currentScope();
    const value = metricValue(metric, context);
    const title = metricTitle(metric);
    const content = $('metricInsightContent');
    if (!content) return;
    content.innerHTML = `<header class="metric-insight-header">
      <div><p class="eyebrow">Metric review · rolling seven-day window</p><h2 id="metricInsightTitle" tabindex="-1">${E(title)}</h2><p>${E(context.scopeLabel)} · ${E(formatDate(context.start, { day: 'numeric', month: 'short', year: 'numeric' }))}–${E(formatDate(context.end, { day: 'numeric', month: 'short', year: 'numeric' }))}. Synthetic local records only.</p></div>
      <div class="metric-insight-total"><strong>${formatNumber(value)}</strong><span>${E(METRIC_UNITS[metric])}</span></div>
    </header>${metricBody(metric, context)}`;
  }

  function openMetricInsight(metric, trigger) {
    const dialog = $('metricInsightDialog');
    if (!dialog || !METRIC_VALUE_IDS[metric]) return;
    lastTrigger = trigger;
    openMetric = metric;
    renderMetric(metric);
    dialog.showModal();
    requestAnimationFrame(() => $('metricInsightTitle')?.focus({ preventScroll: true }));
  }

  function closeMetricInsight() {
    const dialog = $('metricInsightDialog');
    if (dialog?.open) dialog.close();
  }

  function applyActionLabels() {
    const language = languageKey();
    document.querySelectorAll('[data-metric-action]').forEach(action => {
      action.innerHTML = `${E(ACTION_LABELS[language])} <i aria-hidden="true">→</i>`;
    });
    const close = $('closeMetricInsightDialog');
    if (close) close.setAttribute('aria-label', CLOSE_LABELS[language]);
    if ($('metricInsightDialog')?.open && openMetric) renderMetric(openMetric);
  }

  function handleDestination(button) {
    const destination = button.dataset.metricDestination;
    const view = button.dataset.metricView;
    const layer = button.dataset.metricDashboardLayer;
    closeMetricInsight();
    requestAnimationFrame(() => {
      if (layer) {
        document.querySelector(`#dashboardLayerNav [data-dashboard-layer-target="${layer}"]`)?.click();
        const heading = document.querySelector(`[data-dashboard-layer="${layer}"] h2`);
        if (heading) {
          heading.tabIndex = -1;
          heading.focus({ preventScroll: true });
        }
        return;
      }
      if (destination) {
        window.switchTab(destination);
        if (view) document.querySelector(`#${destination} [data-focus-target="${view}"]`)?.click();
      }
    });
  }

  function bindMetricInsights() {
    const dialog = $('metricInsightDialog');
    if (!dialog) return;
    document.addEventListener('click', event => {
      const card = event.target.closest('[data-metric-insight]');
      if (card) return openMetricInsight(card.dataset.metricInsight, card);
      if (event.target.closest('#closeMetricInsightDialog,[data-metric-close]')) return closeMetricInsight();
      const destination = event.target.closest('[data-metric-destination],[data-metric-dashboard-layer]');
      if (destination) handleDestination(destination);
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeMetricInsight();
    });
    dialog.addEventListener('close', () => {
      openMetric = null;
      if (lastTrigger?.isConnected) lastTrigger.focus({ preventScroll: true });
    });
    new MutationObserver(applyActionLabels).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    applyActionLabels();
  }

  bindMetricInsights();
})();
