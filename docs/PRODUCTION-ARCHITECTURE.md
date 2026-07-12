# Production architecture proposal

The current repository is intentionally static. A production clinical system should separate presentation, clinical services, device services, identity, and research exports.

## Suggested services

- Web/tablet clinician application.
- Patient/caregiver mobile application.
- Secure HandVivante device bridge.
- Identity and organisation tenancy service.
- Protocol and prescription service.
- Clinical session and telemetry store.
- Outcome and eCRF service.
- Audit and consent service.
- Notification and escalation service.
- De-identification and research export service.

## Minimum production controls

- Multi-factor authentication and institutional single sign-on where required.
- Least-privilege role-based access control.
- Encryption in transit and at rest.
- Immutable audit trail.
- Device, firmware, protocol, and content versioning.
- Validated offline behaviour and reconciliation.
- Backup, disaster recovery, retention, and deletion controls.
- Threat modelling, vulnerability management, secure update process, and incident response.
- Clinical safety case, usability engineering, software lifecycle, risk management, and regulatory classification review.

## Device integration boundary

The production device bridge should not allow a general web page to issue unrestricted motion commands. Approved prescriptions and safety limits should be signed, versioned, cached locally, and enforced by a validated device-side control layer. Loss of internet connectivity must not remove local stop capability or safety limits.
