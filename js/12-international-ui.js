(function () {
  'use strict';
  const STORAGE_KEY = 'mirrorCoach.language';
  const LANGUAGES = {
    en:{label:'English',locale:'en-GB'},
    'zh-Hans':{label:'简体中文',locale:'zh-CN'},
    es:{label:'Español',locale:'es-ES'},
    fr:{label:'Français',locale:'fr-FR'},
    de:{label:'Deutsch',locale:'de-DE'},
    ms:{label:'Bahasa Melayu',locale:'ms-MY'}
  };
  const EN = {
    loginKicker:'Clinical RMHT workspace',loginIntro:'A focused workspace for screening, prescription, guided robotic mirror hand therapy, functional practice and research-ready documentation.',mechanismVisual:'Mirror visual feedback',mechanismMotion:'Synchronous robotic movement',mechanismIntent:'Intent and attention coaching',prototypeNotice:'Education and workflow prototype only. It does not control a medical device or replace the current manufacturer IFU, local governance or licensed clinical judgement.',demoAccess:'Demo access',enterWorkspace:'Enter the workspace',browserStorage:'No server account is created. Demo records remain in this browser.',displayName:'Display name',role:'Role',organisation:'Organisation / site',roleClinician:'Clinician',rolePatient:'Patient / caregiver',roleResearcher:'Researcher',roleAdmin:'Clinic administrator',consent:'I understand this is a non-clinical prototype using synthetic data.',enterButton:'Enter MirrorCoach',privacy:'Do not enter directly identifiable patient information in this public GitHub Pages build.',appKicker:'Robotic Mirror Hand Therapy',workspaceBadge:'Clinical workspace',appSubtitle:'Clinician-led screening, protocol delivery, task practice and evidence documentation.',assuranceClinician:'Clinician-led',assuranceEvidence:'Evidence-linked',assuranceLocal:'Local prototype',workspaceMenu:'Workspace',reloadDemo:'Reload synthetic demo',exportJson:'Export JSON',signOut:'Sign out',navDashboard:'Dashboard',navPatients:'Patients',navProtocol:'Protocols',navSession:'Session',navExercises:'Exercises',navLearn:'Learn',navMore:'More',navManual:'Operating Manual',navOutcomes:'Outcomes',navResearch:'Research',navSettings:'Settings',dashboardKicker:'MirrorCoach workspace',dashboardTitle:'Clinical command centre',dashboardHelp:'Start with the brief. Open one focused layer when you need supporting detail.',reviewFocus:'Review focus',layerCommand:'Command',layerDose:'Dose',layerSafety:'Safety',layerCases:'Cases',commandKicker:'Today’s RMHT brief',commandTitle:'Synchronise. Practise. Transfer. Document.',commandText:'MirrorCoach organises clinical readiness, a measurable 30-minute workflow and immediate functional transfer without presenting automated treatment decisions.',startSession:'Start guided session',openProtocol:'Open protocol builder',metricMinutes:'Active RMHT minutes',metricWeek:'Current 7-day window',metricCycles:'Movement cycles',metricDocumented:'Documented this week',metricSessions:'Sessions completed',metricCaseload:'Across current caseload',metricFlags:'Safety review flags',metricRules:'Rule-based prompts only',architectureKicker:'30-minute workflow',architectureTitle:'Current session architecture',openSession:'Open session',architectureHint:'Select a phase for clinical sequence, quality gates, documentation and evidence interpretation.',phaseSafety:'Safety & readiness',phaseSafetySub:'Daily go / modify / stop decision',phaseCalibration:'Calibration & familiarisation',phaseCalibrationSub:'Fit, alignment and synchrony gate',phasePriming:'Sensorimotor priming',phasePrimingSub:'Mirror gaze, motor intent and assisted movement',phaseTraining:'Two high-repetition task blocks',phaseTrainingSub:'Purposeful dose with quality and assistance tracking',phaseTransfer:'Functional transfer & cooldown',phaseTransferSub:'Real-task probe, doffing and post-session review',reviewKicker:'Clinician attention',reviewTitle:'Priority review prompts',viewAll:'View all',reviewHelp:'Explainable prompts derived from the current synthetic records.',doseKicker:'Dose intelligence',doseTitle:'Weekly exposure against prescription',doseHelp:'Active practice minutes are shown against each clinician-set weekly target.',logSession:'Log a session',safetyKicker:'Safety and fidelity',safetyTitle:'Clinical review queue',safetyHelp:'Review prompts support attention; they do not determine eligibility, diagnosis or treatment.',openRegister:'Open safety register',governanceKicker:'Clinical governance',governanceTitle:'Human review remains the control layer.',governanceText:'Confirm the current IFU, local policy, fit, pain, skin, tone, synchrony and patient communication before and during every session.',openManual:'Open operating manual',casesKicker:'Caseload overview',casesTitle:'Screening, outcomes and adherence',casesHelp:'Synthetic records only. Formal scale content is not reproduced.',manageCases:'Manage cases',tableCase:'Case',tablePathway:'Pathway',tableAdherence:'Adherence',tableStatus:'Status'
  };
  const TRANSLATIONS = {
    en:EN,
    'zh-Hans':{...EN,loginKicker:'临床 RMHT 工作区',loginIntro:'用于筛查、处方、机器人镜像手训练、功能练习及研究级记录的专注工作区。',mechanismVisual:'镜像视觉反馈',mechanismMotion:'同步机器人运动',mechanismIntent:'运动意图与注意力引导',prototypeNotice:'仅用于教育与流程演示。不控制医疗器械，也不能替代现行制造商使用说明、本地治理或持证临床判断。',demoAccess:'演示入口',enterWorkspace:'进入工作区',browserStorage:'不会创建服务器账户；演示记录保存在本浏览器中。',displayName:'显示名称',role:'角色',organisation:'机构／地点',roleClinician:'临床人员',rolePatient:'患者／照护者',roleResearcher:'研究人员',roleAdmin:'机构管理员',consent:'我了解这是使用合成数据的非临床原型。',enterButton:'进入 MirrorCoach',privacy:'请勿在此公开 GitHub Pages 版本中输入可直接识别患者身份的信息。',appKicker:'机器人镜像手训练',workspaceBadge:'临床工作区',appSubtitle:'以临床人员为主导的筛查、方案实施、任务练习与证据记录。',assuranceClinician:'临床主导',assuranceEvidence:'证据关联',assuranceLocal:'本地原型',workspaceMenu:'工作区',reloadDemo:'重新加载合成演示',exportJson:'导出 JSON',signOut:'退出',navDashboard:'仪表板',navPatients:'患者',navProtocol:'方案',navSession:'训练',navExercises:'练习',navLearn:'学习',navMore:'更多',navManual:'操作手册',navOutcomes:'结局',navResearch:'研究',navSettings:'设置',dashboardKicker:'MirrorCoach 工作区',dashboardTitle:'临床指挥中心',dashboardHelp:'先查看摘要；需要时再打开一个专注的信息层。',reviewFocus:'查看范围',layerCommand:'指挥',layerDose:'剂量',layerSafety:'安全',layerCases:'病例',commandKicker:'今日 RMHT 摘要',commandTitle:'同步。练习。迁移。记录。',commandText:'MirrorCoach 组织临床准备、可测量的 30 分钟流程和即时功能迁移，但不提供自动化治疗决策。',startSession:'开始引导训练',openProtocol:'打开方案构建器',metricMinutes:'主动 RMHT 分钟',metricWeek:'当前 7 天',metricCycles:'动作循环',metricDocumented:'本周已记录',metricSessions:'已完成训练',metricCaseload:'当前病例范围',metricFlags:'安全复核标记',metricRules:'仅规则提示',architectureKicker:'30 分钟流程',architectureTitle:'当前训练架构',openSession:'打开训练',architectureHint:'选择阶段，查看临床步骤、质量门槛、记录要求及证据解读。',phaseSafety:'安全与准备',phaseSafetySub:'每日进行／调整／停止判断',phaseCalibration:'校准与熟悉',phaseCalibrationSub:'适配、对线与同步门槛',phasePriming:'感觉运动启动',phasePrimingSub:'镜像注视、运动意图与辅助运动',phaseTraining:'两个高重复任务模块',phaseTrainingSub:'追踪质量与辅助程度的目标剂量',phaseTransfer:'功能迁移与冷却',phaseTransferSub:'真实任务探查、脱卸与训练后复核',reviewKicker:'临床关注',reviewTitle:'优先复核提示',viewAll:'查看全部',reviewHelp:'根据当前合成记录生成的可解释提示。',doseKicker:'剂量信息',doseTitle:'每周暴露与处方目标',doseHelp:'显示主动练习分钟与各临床处方周目标的比较。',logSession:'记录训练',safetyKicker:'安全与一致性',safetyTitle:'临床复核队列',safetyHelp:'提示用于支持关注，不决定适用性、诊断或治疗。',openRegister:'打开安全登记',governanceKicker:'临床治理',governanceTitle:'人工复核始终是控制层。',governanceText:'每次训练前及训练中均应确认现行使用说明、本地政策、适配、疼痛、皮肤、张力、同步及患者沟通。',openManual:'打开操作手册',casesKicker:'病例概览',casesTitle:'筛查、结局与依从性',casesHelp:'仅为合成记录；不复制正式量表内容。',manageCases:'管理病例',tableCase:'病例',tablePathway:'路径',tableAdherence:'依从性',tableStatus:'状态'},
    es:{...EN,loginKicker:'Espacio clínico de RMHT',loginIntro:'Un espacio enfocado para cribado, prescripción, terapia robótica de mano con espejo, práctica funcional y documentación preparada para investigación.',mechanismVisual:'Retroalimentación visual con espejo',mechanismMotion:'Movimiento robótico sincronizado',mechanismIntent:'Entrenamiento de intención y atención',prototypeNotice:'Prototipo educativo y de flujo de trabajo. No controla un dispositivo médico ni sustituye las instrucciones vigentes del fabricante, la gobernanza local o el juicio clínico profesional.',demoAccess:'Acceso de demostración',enterWorkspace:'Entrar al espacio de trabajo',browserStorage:'No se crea una cuenta de servidor. Los registros de demostración permanecen en este navegador.',displayName:'Nombre visible',role:'Rol',organisation:'Organización / centro',roleClinician:'Profesional clínico',rolePatient:'Paciente / cuidador',roleResearcher:'Investigador',roleAdmin:'Administrador del centro',consent:'Entiendo que este es un prototipo no clínico con datos sintéticos.',enterButton:'Entrar en MirrorCoach',privacy:'No introduzca información identificable de pacientes en esta versión pública de GitHub Pages.',appKicker:'Terapia robótica de mano con espejo',workspaceBadge:'Espacio clínico',appSubtitle:'Cribado, protocolos, práctica de tareas y documentación de evidencia dirigidos por profesionales.',assuranceClinician:'Dirigido por clínicos',assuranceEvidence:'Vinculado a evidencia',assuranceLocal:'Prototipo local',workspaceMenu:'Espacio',reloadDemo:'Recargar demostración',exportJson:'Exportar JSON',signOut:'Cerrar sesión',navDashboard:'Panel',navPatients:'Pacientes',navProtocol:'Protocolos',navSession:'Sesión',navExercises:'Ejercicios',navLearn:'Aprender',navMore:'Más',navManual:'Manual operativo',navOutcomes:'Resultados',navResearch:'Investigación',navSettings:'Ajustes',dashboardKicker:'Espacio MirrorCoach',dashboardTitle:'Centro de mando clínico',dashboardHelp:'Empiece por el resumen. Abra una sola capa de detalle cuando la necesite.',reviewFocus:'Ámbito de revisión',layerCommand:'Mando',layerDose:'Dosis',layerSafety:'Seguridad',layerCases:'Casos',commandKicker:'Resumen RMHT de hoy',commandTitle:'Sincronizar. Practicar. Transferir. Documentar.',commandText:'MirrorCoach organiza la preparación clínica, un flujo medible de 30 minutos y la transferencia funcional inmediata sin presentar decisiones terapéuticas automatizadas.',startSession:'Iniciar sesión guiada',openProtocol:'Abrir constructor de protocolos',metricMinutes:'Minutos RMHT activos',metricWeek:'Ventana actual de 7 días',metricCycles:'Ciclos de movimiento',metricDocumented:'Documentados esta semana',metricSessions:'Sesiones completadas',metricCaseload:'En la carga actual',metricFlags:'Alertas de seguridad',metricRules:'Solo avisos basados en reglas',architectureKicker:'Flujo de 30 minutos',architectureTitle:'Arquitectura de sesión actual',openSession:'Abrir sesión',architectureHint:'Seleccione una fase para ver secuencia clínica, criterios de calidad, documentación e interpretación de evidencia.',reviewKicker:'Atención clínica',reviewTitle:'Avisos prioritarios',viewAll:'Ver todo',reviewHelp:'Avisos explicables derivados de los registros sintéticos actuales.',doseKicker:'Inteligencia de dosis',doseTitle:'Exposición semanal frente a prescripción',doseHelp:'Los minutos de práctica activa se muestran frente a cada objetivo semanal.',logSession:'Registrar sesión',safetyKicker:'Seguridad y fidelidad',safetyTitle:'Cola de revisión clínica',safetyHelp:'Los avisos apoyan la atención; no determinan elegibilidad, diagnóstico ni tratamiento.',openRegister:'Abrir registro de seguridad',governanceKicker:'Gobernanza clínica',governanceTitle:'La revisión humana sigue siendo la capa de control.',governanceText:'Confirme las instrucciones vigentes, la política local, el ajuste, el dolor, la piel, el tono, la sincronía y la comunicación del paciente antes y durante cada sesión.',openManual:'Abrir manual operativo',casesKicker:'Resumen de casos',casesTitle:'Cribado, resultados y adherencia',casesHelp:'Solo registros sintéticos. No se reproduce el contenido formal de escalas.',manageCases:'Gestionar casos',tableCase:'Caso',tablePathway:'Vía',tableAdherence:'Adherencia',tableStatus:'Estado'},
    fr:{...EN,loginKicker:'Espace clinique RMHT',loginIntro:'Un espace ciblé pour le dépistage, la prescription, la thérapie robotisée de la main par miroir, la pratique fonctionnelle et la documentation de recherche.',mechanismVisual:'Retour visuel par miroir',mechanismMotion:'Mouvement robotique synchronisé',mechanismIntent:'Guidage de l’intention et de l’attention',prototypeNotice:'Prototype éducatif et de flux de travail uniquement. Il ne commande pas un dispositif médical et ne remplace pas la notice fabricant en vigueur, la gouvernance locale ou le jugement clinique professionnel.',demoAccess:'Accès démonstration',enterWorkspace:'Entrer dans l’espace',browserStorage:'Aucun compte serveur n’est créé. Les données de démonstration restent dans ce navigateur.',displayName:'Nom affiché',role:'Rôle',organisation:'Organisation / site',roleClinician:'Clinicien',rolePatient:'Patient / aidant',roleResearcher:'Chercheur',roleAdmin:'Administrateur clinique',consent:'Je comprends qu’il s’agit d’un prototype non clinique utilisant des données synthétiques.',enterButton:'Entrer dans MirrorCoach',privacy:'Ne saisissez pas d’informations permettant d’identifier directement un patient dans cette version publique GitHub Pages.',appKicker:'Thérapie robotisée de la main par miroir',workspaceBadge:'Espace clinique',appSubtitle:'Dépistage, protocoles, pratique fonctionnelle et documentation des preuves sous contrôle clinique.',assuranceClinician:'Piloté par le clinicien',assuranceEvidence:'Lié aux preuves',assuranceLocal:'Prototype local',workspaceMenu:'Espace',reloadDemo:'Recharger la démonstration',exportJson:'Exporter JSON',signOut:'Se déconnecter',navDashboard:'Tableau de bord',navPatients:'Patients',navProtocol:'Protocoles',navSession:'Séance',navExercises:'Exercices',navLearn:'Apprendre',navMore:'Plus',navManual:'Manuel opératoire',navOutcomes:'Résultats',navResearch:'Recherche',navSettings:'Paramètres',dashboardKicker:'Espace MirrorCoach',dashboardTitle:'Centre de commandement clinique',dashboardHelp:'Commencez par le résumé. Ouvrez une seule couche ciblée lorsque vous avez besoin du détail.',reviewFocus:'Périmètre',layerCommand:'Commande',layerDose:'Dose',layerSafety:'Sécurité',layerCases:'Cas',commandKicker:'Résumé RMHT du jour',commandTitle:'Synchroniser. Pratiquer. Transférer. Documenter.',commandText:'MirrorCoach organise la préparation clinique, un flux mesurable de 30 minutes et le transfert fonctionnel immédiat sans proposer de décisions thérapeutiques automatisées.',startSession:'Démarrer la séance guidée',openProtocol:'Ouvrir le constructeur de protocole',metricMinutes:'Minutes RMHT actives',metricWeek:'Fenêtre actuelle de 7 jours',metricCycles:'Cycles de mouvement',metricDocumented:'Documentés cette semaine',metricSessions:'Séances terminées',metricCaseload:'Dans la file active',metricFlags:'Alertes de sécurité',metricRules:'Invites fondées sur des règles',architectureKicker:'Flux de 30 minutes',architectureTitle:'Architecture actuelle de la séance',openSession:'Ouvrir la séance',architectureHint:'Sélectionnez une phase pour voir la séquence clinique, les critères de qualité, la documentation et l’interprétation des preuves.',reviewKicker:'Attention clinique',reviewTitle:'Invites prioritaires',viewAll:'Tout voir',reviewHelp:'Invites explicables dérivées des données synthétiques actuelles.',doseKicker:'Intelligence de dose',doseTitle:'Exposition hebdomadaire par rapport à la prescription',doseHelp:'Les minutes de pratique active sont comparées à chaque objectif hebdomadaire.',logSession:'Enregistrer une séance',safetyKicker:'Sécurité et fidélité',safetyTitle:'File de revue clinique',safetyHelp:'Les invites soutiennent l’attention ; elles ne déterminent ni l’éligibilité, ni le diagnostic, ni le traitement.',openRegister:'Ouvrir le registre de sécurité',governanceKicker:'Gouvernance clinique',governanceTitle:'La revue humaine reste la couche de contrôle.',governanceText:'Confirmez la notice en vigueur, la politique locale, l’ajustement, la douleur, la peau, le tonus, la synchronie et la communication du patient avant et pendant chaque séance.',openManual:'Ouvrir le manuel',casesKicker:'Vue des cas',casesTitle:'Dépistage, résultats et adhésion',casesHelp:'Données synthétiques uniquement. Le contenu officiel des échelles n’est pas reproduit.',manageCases:'Gérer les cas',tableCase:'Cas',tablePathway:'Parcours',tableAdherence:'Adhésion',tableStatus:'Statut'},
    de:{...EN,loginKicker:'Klinischer RMHT-Arbeitsbereich',loginIntro:'Ein fokussierter Arbeitsbereich für Screening, Verordnung, robotische Spiegel-Handtherapie, funktionelles Üben und forschungsgeeignete Dokumentation.',mechanismVisual:'Visuelles Spiegel-Feedback',mechanismMotion:'Synchronisierte Roboterbewegung',mechanismIntent:'Training von Intention und Aufmerksamkeit',prototypeNotice:'Nur Bildungs- und Workflow-Prototyp. Er steuert kein Medizinprodukt und ersetzt weder die aktuelle Hersteller-Gebrauchsanweisung noch lokale Vorgaben oder klinische Fachentscheidung.',demoAccess:'Demo-Zugang',enterWorkspace:'Arbeitsbereich öffnen',browserStorage:'Es wird kein Serverkonto erstellt. Demo-Daten bleiben in diesem Browser.',displayName:'Anzeigename',role:'Rolle',organisation:'Organisation / Standort',roleClinician:'Klinische Fachkraft',rolePatient:'Patient / Betreuungsperson',roleResearcher:'Forschung',roleAdmin:'Klinikverwaltung',consent:'Mir ist bewusst, dass dies ein nicht-klinischer Prototyp mit synthetischen Daten ist.',enterButton:'MirrorCoach öffnen',privacy:'Geben Sie in dieser öffentlichen GitHub-Pages-Version keine direkt identifizierbaren Patientendaten ein.',appKicker:'Robotische Spiegel-Handtherapie',workspaceBadge:'Klinischer Arbeitsbereich',appSubtitle:'Klinisch geführtes Screening, Protokollumsetzung, Aufgabenpraxis und Evidenzdokumentation.',assuranceClinician:'Klinisch geführt',assuranceEvidence:'Evidenzverknüpft',assuranceLocal:'Lokaler Prototyp',workspaceMenu:'Arbeitsbereich',reloadDemo:'Demo neu laden',exportJson:'JSON exportieren',signOut:'Abmelden',navDashboard:'Übersicht',navPatients:'Patienten',navProtocol:'Protokolle',navSession:'Sitzung',navExercises:'Übungen',navLearn:'Lernen',navMore:'Mehr',navManual:'Betriebshandbuch',navOutcomes:'Ergebnisse',navResearch:'Forschung',navSettings:'Einstellungen',dashboardKicker:'MirrorCoach-Arbeitsbereich',dashboardTitle:'Klinische Kommandozentrale',dashboardHelp:'Beginnen Sie mit der Kurzfassung. Öffnen Sie bei Bedarf nur eine fokussierte Detailebene.',reviewFocus:'Prüffokus',layerCommand:'Kommando',layerDose:'Dosis',layerSafety:'Sicherheit',layerCases:'Fälle',commandKicker:'Heutige RMHT-Kurzfassung',commandTitle:'Synchronisieren. Üben. Übertragen. Dokumentieren.',commandText:'MirrorCoach strukturiert klinische Bereitschaft, einen messbaren 30-Minuten-Ablauf und unmittelbaren Funktionstransfer, ohne automatisierte Therapieentscheidungen auszugeben.',startSession:'Geführte Sitzung starten',openProtocol:'Protokoll-Builder öffnen',metricMinutes:'Aktive RMHT-Minuten',metricWeek:'Aktuelles 7-Tage-Fenster',metricCycles:'Bewegungszyklen',metricDocumented:'Diese Woche dokumentiert',metricSessions:'Abgeschlossene Sitzungen',metricCaseload:'Aktuelle Fallgruppe',metricFlags:'Sicherheitsprüfungen',metricRules:'Nur regelbasierte Hinweise',architectureKicker:'30-Minuten-Ablauf',architectureTitle:'Aktuelle Sitzungsarchitektur',openSession:'Sitzung öffnen',architectureHint:'Phase auswählen, um klinische Sequenz, Qualitätskriterien, Dokumentation und Evidenzinterpretation zu sehen.',reviewKicker:'Klinische Aufmerksamkeit',reviewTitle:'Priorisierte Prüfhilfen',viewAll:'Alle anzeigen',reviewHelp:'Erklärbare Hinweise aus den aktuellen synthetischen Datensätzen.',doseKicker:'Dosisintelligenz',doseTitle:'Wöchentliche Exposition gegenüber Verordnung',doseHelp:'Aktive Übungsminuten werden den klinisch festgelegten Wochenzielen gegenübergestellt.',logSession:'Sitzung dokumentieren',safetyKicker:'Sicherheit und Protokolltreue',safetyTitle:'Klinische Prüfliste',safetyHelp:'Hinweise unterstützen die Aufmerksamkeit; sie bestimmen weder Eignung noch Diagnose oder Behandlung.',openRegister:'Sicherheitsregister öffnen',governanceKicker:'Klinische Governance',governanceTitle:'Menschliche Prüfung bleibt die Kontrollschicht.',governanceText:'Aktuelle Gebrauchsanweisung, lokale Richtlinien, Passform, Schmerz, Haut, Tonus, Synchronität und Kommunikation vor und während jeder Sitzung prüfen.',openManual:'Betriebshandbuch öffnen',casesKicker:'Fallübersicht',casesTitle:'Screening, Ergebnisse und Adhärenz',casesHelp:'Nur synthetische Datensätze. Inhalte formaler Skalen werden nicht wiedergegeben.',manageCases:'Fälle verwalten',tableCase:'Fall',tablePathway:'Pfad',tableAdherence:'Adhärenz',tableStatus:'Status'},
    ms:{...EN,loginKicker:'Ruang kerja RMHT klinikal',loginIntro:'Ruang kerja terfokus untuk saringan, preskripsi, terapi tangan cermin robotik, latihan fungsian dan dokumentasi sedia penyelidikan.',mechanismVisual:'Maklum balas visual cermin',mechanismMotion:'Pergerakan robotik segerak',mechanismIntent:'Bimbingan niat dan perhatian',prototypeNotice:'Prototaip pendidikan dan aliran kerja sahaja. Ia tidak mengawal peranti perubatan atau menggantikan IFU pengilang semasa, tadbir urus tempatan atau pertimbangan klinikal berlesen.',demoAccess:'Akses demo',enterWorkspace:'Masuk ke ruang kerja',browserStorage:'Tiada akaun pelayan dicipta. Rekod demo kekal dalam pelayar ini.',displayName:'Nama paparan',role:'Peranan',organisation:'Organisasi / lokasi',roleClinician:'Klinisian',rolePatient:'Pesakit / penjaga',roleResearcher:'Penyelidik',roleAdmin:'Pentadbir klinik',consent:'Saya faham ini ialah prototaip bukan klinikal yang menggunakan data sintetik.',enterButton:'Masuk MirrorCoach',privacy:'Jangan masukkan maklumat pesakit yang boleh dikenal pasti secara langsung dalam binaan GitHub Pages awam ini.',appKicker:'Terapi Tangan Cermin Robotik',workspaceBadge:'Ruang kerja klinikal',appSubtitle:'Saringan, penyampaian protokol, latihan tugasan dan dokumentasi bukti dipimpin klinisian.',assuranceClinician:'Dipimpin klinisian',assuranceEvidence:'Dipautkan bukti',assuranceLocal:'Prototaip setempat',workspaceMenu:'Ruang kerja',reloadDemo:'Muat semula demo sintetik',exportJson:'Eksport JSON',signOut:'Daftar keluar',navDashboard:'Papan pemuka',navPatients:'Pesakit',navProtocol:'Protokol',navSession:'Sesi',navExercises:'Latihan',navLearn:'Pembelajaran',navMore:'Lagi',navManual:'Manual Operasi',navOutcomes:'Hasil',navResearch:'Penyelidikan',navSettings:'Tetapan',dashboardKicker:'Ruang kerja MirrorCoach',dashboardTitle:'Pusat arahan klinikal',dashboardHelp:'Mulakan dengan ringkasan. Buka satu lapisan fokus apabila butiran diperlukan.',reviewFocus:'Fokus semakan',layerCommand:'Arahan',layerDose:'Dos',layerSafety:'Keselamatan',layerCases:'Kes',commandKicker:'Ringkasan RMHT hari ini',commandTitle:'Segerak. Latih. Pindah. Dokumentasi.',commandText:'MirrorCoach menyusun kesiapsiagaan klinikal, aliran kerja 30 minit yang boleh diukur dan pemindahan fungsian segera tanpa keputusan rawatan automatik.',startSession:'Mulakan sesi berpandu',openProtocol:'Buka pembina protokol',metricMinutes:'Minit RMHT aktif',metricWeek:'Tetingkap 7 hari semasa',metricCycles:'Kitaran pergerakan',metricDocumented:'Direkod minggu ini',metricSessions:'Sesi selesai',metricCaseload:'Dalam beban kes semasa',metricFlags:'Tanda semakan keselamatan',metricRules:'Gesaan berasaskan peraturan sahaja',architectureKicker:'Aliran kerja 30 minit',architectureTitle:'Seni bina sesi semasa',openSession:'Buka sesi',architectureHint:'Pilih fasa untuk melihat urutan klinikal, pintu kualiti, dokumentasi dan tafsiran bukti.',reviewKicker:'Perhatian klinikal',reviewTitle:'Gesaan semakan keutamaan',viewAll:'Lihat semua',reviewHelp:'Gesaan boleh dijelaskan daripada rekod sintetik semasa.',doseKicker:'Risikan dos',doseTitle:'Pendedahan mingguan berbanding preskripsi',doseHelp:'Minit latihan aktif ditunjukkan berbanding setiap sasaran mingguan klinisian.',logSession:'Log sesi',safetyKicker:'Keselamatan dan fideliti',safetyTitle:'Barisan semakan klinikal',safetyHelp:'Gesaan menyokong perhatian; ia tidak menentukan kelayakan, diagnosis atau rawatan.',openRegister:'Buka daftar keselamatan',governanceKicker:'Tadbir urus klinikal',governanceTitle:'Semakan manusia kekal sebagai lapisan kawalan.',governanceText:'Sahkan IFU semasa, polisi tempatan, kesesuaian, sakit, kulit, tonus, kesegerakan dan komunikasi pesakit sebelum dan semasa setiap sesi.',openManual:'Buka manual operasi',casesKicker:'Gambaran kes',casesTitle:'Saringan, hasil dan pematuhan',casesHelp:'Rekod sintetik sahaja. Kandungan skala formal tidak diterbitkan semula.',manageCases:'Urus kes',tableCase:'Kes',tablePathway:'Laluan',tableAdherence:'Pematuhan',tableStatus:'Status'}
  };

  let currentLanguage = localStorage.getItem(STORAGE_KEY) || 'en';
  if (!LANGUAGES[currentLanguage]) currentLanguage = 'en';

  function applyLanguage(code) {
    const language = LANGUAGES[code] ? code : 'en';
    currentLanguage = language;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    const dictionary = TRANSLATIONS[language] || EN;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = dictionary[el.dataset.i18n] || EN[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-language-label]').forEach(el => { el.textContent = LANGUAGES[language].label; });
    document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-checked', String(el.dataset.language === language)));
    document.querySelectorAll('[data-language-menu]').forEach(menu => { menu.hidden = true; });
    document.querySelectorAll('[data-language-button]').forEach(button => button.setAttribute('aria-expanded','false'));
  }

  function bindLanguageSwitchers() {
    document.querySelectorAll('[data-language-switcher]').forEach(switcher => {
      const button = switcher.querySelector('[data-language-button]');
      const menu = switcher.querySelector('[data-language-menu]');
      if (!button || !menu) return;
      button.addEventListener('click', event => {
        event.stopPropagation();
        const opening = menu.hidden;
        document.querySelectorAll('[data-language-menu]').forEach(other => { other.hidden = true; });
        document.querySelectorAll('[data-language-button]').forEach(other => other.setAttribute('aria-expanded','false'));
        menu.hidden = !opening;
        button.setAttribute('aria-expanded', String(opening));
      });
      menu.addEventListener('click', event => {
        const option = event.target.closest('[data-language]');
        if (option) applyLanguage(option.dataset.language);
      });
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('[data-language-switcher]')) {
        document.querySelectorAll('[data-language-menu]').forEach(menu => { menu.hidden = true; });
        document.querySelectorAll('[data-language-button]').forEach(button => button.setAttribute('aria-expanded','false'));
      }
    });
  }

  function selectDashboardLayer(name, focus = false) {
    const buttons = [...document.querySelectorAll('[data-dashboard-layer-target]')].filter(el => el.closest('#dashboardLayerNav'));
    const layers = [...document.querySelectorAll('[data-dashboard-layer]')];
    if (!layers.some(layer => layer.dataset.dashboardLayer === name)) return;
    buttons.forEach(button => {
      const active = button.dataset.dashboardLayerTarget === name;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      if (active && focus) button.focus();
    });
    layers.forEach(layer => {
      const active = layer.dataset.dashboardLayer === name;
      layer.classList.toggle('active', active);
      layer.hidden = !active;
    });
  }

  function bindDashboardLayers() {
    document.addEventListener('click', event => {
      const trigger = event.target.closest('[data-dashboard-layer-target]');
      if (trigger) selectDashboardLayer(trigger.dataset.dashboardLayerTarget);
    });
    const nav = document.getElementById('dashboardLayerNav');
    nav?.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      const buttons = [...nav.querySelectorAll('[data-dashboard-layer-target]')];
      const current = buttons.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      selectDashboardLayer(buttons[next].dataset.dashboardLayerTarget, true);
    });
  }

  function syncMoreMenu() {
    const more = document.getElementById('navMore');
    if (!more) return;
    const active = !!more.querySelector('.tab-button.active');
    more.classList.toggle('contains-active', active);
  }

  function bindNavigationMenus() {
    const more = document.getElementById('navMore');
    more?.addEventListener('click', event => {
      if (event.target.closest('.tab-button')) more.open = false;
    });
    const nav = document.getElementById('tabNav');
    if (nav) new MutationObserver(syncMoreMenu).observe(nav,{subtree:true,attributes:true,attributeFilter:['class','hidden']});
    document.addEventListener('click', event => {
      if (more?.open && !event.target.closest('#navMore')) more.open = false;
      const dataMenu = document.querySelector('.data-menu[open]');
      if (dataMenu && !event.target.closest('.data-menu')) dataMenu.open = false;
    });
    syncMoreMenu();
  }

  function enhancePromptLayers() {
    if (typeof window.renderDashboard !== 'function' || window.renderDashboard.__internationalEnhanced) return;
    const base = window.renderDashboard;
    const enhanced = function () {
      base();
      const preview = document.getElementById('reviewPrompts');
      const full = document.getElementById('reviewPromptsFull');
      if (preview && full) {
        full.innerHTML = preview.innerHTML;
        [...preview.children].slice(3).forEach(card => card.remove());
      }
    };
    enhanced.__internationalEnhanced = true;
    window.renderDashboard = enhanced;
    enhanced();
  }

  function initProfessionalUI() {
    bindLanguageSwitchers();
    bindDashboardLayers();
    bindNavigationMenus();
    enhancePromptLayers();
    applyLanguage(currentLanguage);
    document.body.classList.add('professional-ui-ready');
  }

  initProfessionalUI();
})();
