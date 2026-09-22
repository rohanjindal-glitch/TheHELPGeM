# The HelpGeM frontend

AI-assisted procurement bid-compliance verification prototype.

## Requirements

- Node.js 22.13 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commit to GitHub

Extract the ZIP, open a terminal in the `HelpGeM-PR` folder, then run:

```bash
git init
git add .
git commit -m "Add HelpGeM MVP"
```

Create an empty GitHub repository, add it as `origin`, and push your branch using the commands GitHub provides. If contributing to an existing repository, copy these source files into your branch and open a pull request instead of initializing a second repository inside it.

## Validation

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Project structure

- `app/` — application entry points and global styles
- `components/` — HelpGeM interface and required UI primitives
- `lib/` — domain models, demo data, deterministic rules, and tests
- `public/` — static assets

This repository contains the working frontend prototype. It does not currently include an Express API or MongoDB database.
