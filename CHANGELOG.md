# Changelog

All notable changes to NEXULEAN are documented in this file.

---

## [v2.0.0] — 2026-03-11

### 🚀 New Features

- **Full Next.js 14 App Router** — Rebuilt from the ground up using the Next.js 14 App Router with TypeScript 5 for type-safe server and client components.
- **Firebase Authentication** — Secure login, sign-up, and password-reset flows powered by Firebase Auth (email & password).
- **Authenticated Dashboard** — Protected client portal accessible only to logged-in users.
- **Cybersecurity Services Page** — Detailed breakdown of ethical hacking, penetration testing, AI-powered security, digital forensics, threat intelligence, and reverse engineering services.
- **Projects Showcase** — Portfolio of security tools, exploits, and AI models.
- **Secure Contact Form** — Hardened enquiry form for security assessments and consulting requests.
- **Dark / Light Mode** — System-aware theme toggle via `next-themes`.
- **Smooth Animations** — Page and component transitions powered by Framer Motion.
- **shadcn/ui Component Library** — Full Radix UI-based component library integrated via shadcn/ui.
- **Netlify Deployment** — Static export hosted on Netlify with security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).

### 🛠 Tech Stack

| Layer          | Technology                            |
|----------------|---------------------------------------|
| Framework      | Next.js 14 (App Router, static export)|
| Language       | TypeScript 5                          |
| Styling        | Tailwind CSS 3 + tailwindcss-animate  |
| UI Components  | Radix UI + shadcn/ui                  |
| Animations     | Framer Motion                         |
| Authentication | Firebase Auth                         |
| Icons          | Lucide React                          |
| Forms          | React Hook Form + Zod                 |
| Charts         | Recharts                              |
| Deployment     | Netlify                               |

### 🔒 Security

- Security headers configured in `netlify.toml`.
- Private vulnerability reporting enabled via GitHub Security Advisories.
- `.env.local` excluded from version control.

---

*For full project details, see [README.md](./README.md).*
