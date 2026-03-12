# Security Policy

## Supported Versions

We are committed to fixing security vulnerabilities in the following versions of this project:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability within this project, please follow these steps:

1.  **Private Report:** Navigate to the [Security tab](https://github.com/Stalin-143/website/security) of this repository.
2.  **Submit Advisory:** Click on **"Report a vulnerability"** to submit a private report.
3.  **Details:** Include a full **Proof of Concept (PoC)**, including:
    * Detailed steps to reproduce the bug.
    * The potential impact (e.g., Stored XSS, IDOR, etc.).
    * Any suggested fixes or patches.

## Response Timeline

| Stage | Target Timeframe |
| ----- | ---------------- |
| Acknowledgement of report | Within **48 hours** |
| Initial triage & severity assessment | Within **5 business days** |
| Status update to reporter | Every **7 days** until resolved |
| Patch release (critical/high severity) | Within **30 days** where possible |

## Scope

The following are **in scope** for vulnerability reports:

- Authentication and authorization flaws (e.g., broken auth, session fixation)
- Cross-Site Scripting (XSS) — stored, reflected, or DOM-based
- Cross-Site Request Forgery (CSRF)
- Injection vulnerabilities (SQL, command, template, etc.)
- Sensitive data exposure (credentials, API keys, PII)
- Insecure Direct Object References (IDOR)
- Security misconfigurations
- Third-party dependency vulnerabilities with a clear impact on this project

The following are **out of scope**:

- Denial-of-service (DoS/DDoS) attacks
- Attacks requiring physical access to the device
- Social engineering attacks targeting maintainers or users
- Vulnerabilities in third-party services (Firebase, Netlify, etc.) — report these to the relevant vendor
- Issues in unsupported versions (see table above)
- Missing security headers that are already addressed in `netlify.toml`

## Security Best Practices for Contributors

- **Never commit secrets.** API keys, tokens, and credentials must be stored in `.env.local` (already git-ignored).
- Keep dependencies up-to-date and run `npm audit` before submitting a pull request.
- Follow the [OWASP Top 10](https://owasp.org/www-project-top-ten/) guidelines when adding new features.
- Use parameterised inputs and validate all user-supplied data with [Zod](https://zod.dev/) schemas.

## Known Vulnerabilities & Fixes

### CVE-2026-32138 — Hardcoded API Key Exposure (FIXED in v2.0.0)

| Field       | Detail                                              |
|-------------|-----------------------------------------------------|
| CVE ID      | CVE-2026-32138                                      |
| Severity    | **Critical** (CVSS 3.1: 9.1 — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N) |
| CWEs        | CWE-284, CWE-312, CWE-540, CWE-798, CWE-922        |
| Affected    | v1.0.0                                              |
| Patched     | v2.0.0                                              |
| Reporter    | @rootcrypt                                          |

**Description:** Firebase API keys and a Web3Forms access key were hardcoded directly in
`lib/firebase.ts` and the contact/projects pages, allowing any unauthenticated user to
query Firebase project configuration, create unauthorized accounts, and read all Firestore
user documents without authentication.

**Fix:** All sensitive credentials have been removed from source code and are now read
exclusively from environment variables (`NEXT_PUBLIC_FIREBASE_*` and
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`). A `.env.example` template is provided; a `.env.local`
file (git-ignored) must be created with the real values before running the application.
The application throws a startup error if any required Firebase variable is absent.

---

## Acknowledgements

We appreciate the efforts of security researchers who responsibly disclose vulnerabilities. Verified reporters will be credited in the release notes unless they prefer to remain anonymous.

