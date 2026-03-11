# NEXULEAN — Redefining Digital Intelligence & Security

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify)](https://www.netlify.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A cybersecurity portfolio & service platform for an Ethical Hacker, AI Enthusiast, and Penetration Tester — built with Next.js 14, TypeScript, and Tailwind CSS.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Cleaning Commit History](#cleaning-commit-history)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

**NEXULEAN** is a personal portfolio and service platform for a cybersecurity professional specialising in:

- Ethical Hacking & Penetration Testing
- AI-Powered Security Solutions
- Digital Forensics & Incident Response
- Threat Intelligence & Reverse Engineering
- Security Consulting

The site is statically exported and deployed on **Netlify**, with Firebase-backed authentication for the dashboard and client portal.

---

## Features

| Page / Feature | Description |
|---|---|
| **Home** | Hero section, stats, expertise cards, testimonials, and services overview |
| **Projects** | Showcase of security tools, exploits, and AI models |
| **Services** | Detailed breakdown of cybersecurity service offerings |
| **Contact** | Enquiry form for security assessments and consulting |
| **Login / Signup** | Firebase authentication (email & password) |
| **Dashboard** | Authenticated client portal |
| **Secure Form** | Hardened contact/submission form |
| **Reset Password** | Firebase-powered password reset flow |
| **Dark / Light Mode** | System-aware theme toggle via `next-themes` |
| **Animations** | Smooth page and component transitions powered by Framer Motion |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, static export) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) |
| UI Components | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| Animations | [Framer Motion](https://www.framer-motion.com/) |
| Authentication | [Firebase](https://firebase.google.com/) (Auth) |
| Icons | [Lucide React](https://lucide.dev/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Deployment | [Netlify](https://www.netlify.com/) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js) — or **pnpm** if you prefer

### Installation

```bash
# Clone the repository
git clone https://github.com/Stalin-143/website.git
cd website

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root (this file is git-ignored):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Never commit your `.env.local` file.** It is already included in `.gitignore`.

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available scripts:

```bash
npm run build   # Create a production static export (outputs to /out)
npm run start   # Serve the production build locally
npm run lint    # Run ESLint
```

---

## Project Structure

```
website/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (Navbar, AuthProvider, ThemeProvider)
│   ├── page.tsx            # Home page
│   ├── contact/            # Contact page
│   ├── dashboard/          # Authenticated dashboard
│   ├── login/              # Login page
│   ├── signup/             # Sign-up page
│   ├── reset-password/     # Password reset page
│   ├── projects/           # Projects showcase
│   ├── services/           # Security services page
│   └── secure-form/        # Hardened enquiry form
├── components/             # Shared React components
│   ├── navbar.tsx          # Navigation bar
│   ├── auth-provider.tsx   # Firebase auth context
│   ├── theme-provider.tsx  # next-themes wrapper
│   ├── theme-toggle.tsx    # Dark/light mode toggle
│   └── ui/                 # shadcn/ui component library
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions & Firebase config
├── public/                 # Static assets
├── styles/                 # Global CSS
├── netlify.toml            # Netlify build & redirect configuration
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## Deployment

The project is deployed on **Netlify** using a static export:

- **Build command:** `npm run build`
- **Publish directory:** `out`
- **Node version:** 18

Security headers (configured in `netlify.toml`):

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

To deploy your own fork, connect the repository to Netlify and set the environment variables listed above in the Netlify dashboard under **Site settings → Environment variables**.

---

## Cleaning Commit History

Sometimes you may want to erase the entire git commit history and start fresh — for example, when sensitive data (such as API keys) was accidentally committed in an earlier commit and you want to permanently remove it from history.

> **Will my site still work after deleting history?**
> **Yes, absolutely.** Git history is only metadata about how the code changed over time. Your actual site files are not affected. Netlify will continue to build and deploy your site exactly as before.

### Steps to clean history

A helper script is included in this repository: [`clean-history.sh`](./clean-history.sh)

```bash
# 1. Make sure all your changes are committed
git status

# 2. Make the script executable
chmod +x clean-history.sh

# 3. Run the script (defaults to 'main' branch)
./clean-history.sh

# To target a different branch name, pass it as an argument:
./clean-history.sh develop
```

The script will:
1. Create a new orphan branch (zero history) containing all current files
2. Replace the existing `main` branch with this clean version
3. Force-push to GitHub, overwriting the old history

> ⚠️ **This is irreversible.** Once force-pushed, the old commits are gone permanently. If you need to keep a copy of the old history, create a backup branch first:
> ```bash
> git branch backup-old-history
> git push origin backup-old-history
> ```

### Manual steps (without the script)

```bash
# 1. Create an orphan branch
git checkout --orphan temp-clean

# 2. Stage all files
git add -A

# 3. Create a fresh initial commit
git commit -m "Initial commit"

# 4. Delete the old main branch and rename this one
git branch -D main
git branch -m main

# 5. Force-push to GitHub
git push --force origin main
```

---

## Security

This project takes security seriously. Please review our [Security Policy](SECURITY.md) before reporting any vulnerabilities.

- **Do not** open public GitHub issues for security vulnerabilities.
- Use the [GitHub private vulnerability reporting](https://github.com/Stalin-143/website/security) feature instead.

---

## Contributing

Contributions, bug reports, and feature requests are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code passes `npm run lint` before submitting.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

| Platform | Link |
|---|---|
| GitHub | [@Stalin-143](https://github.com/Stalin-143) |
| LinkedIn | [Stalin S](https://www.linkedin.com/in/stalin-s-a310882a0/) |
| Hugging Face | [5t4l1n](https://huggingface.co/5t4l1n) |
| Live Monitor | [monitor.nexulean.info](https://monitor.nexulean.info) |

---

<p align="center">
  &copy; 2024 Nexulean. All rights reserved. | Ethical Hacking &amp; AI Security Solutions
</p>
