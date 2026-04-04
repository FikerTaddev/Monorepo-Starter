# 📦 Monorepo Boilerplate

A scalable monorepo architecture for building multiple products using shared infrastructure, Turbo, Next.js, and NestJS.

---

# 🧱 Architecture Overview

apps/
  web/        → Next.js runtime shell
  api/        → NestJS runtime shell

packages/
  core/       → system infrastructure (auth, db, logging, http, config)
  products/   → business domains (product-a, product-b, etc.)
  shared/     → pure utilities, types, schemas
  ui/         → shared design system
  config/     → tsconfig, eslint, shared tooling

---

# 🧠 Core Principles

## 1. Apps are runtime shells
- apps/web = UI runtime (Next.js)
- apps/api = backend runtime (NestJS)
- No business logic in apps/

## 2. Products are domain modules
Each product is self-contained:

packages/products/product-a/
  backend/
  frontend/

Products are NOT standalone apps — they plug into runtime apps.

## 3. Core is infrastructure only
packages/core/

Contains:
- auth
- database client
- logging
- HTTP utilities
- config

No business logic allowed.

## 4. Shared is pure logic only
packages/shared/

Contains:
- types
- DTOs
- validation schemas
- helper functions

No framework dependencies.

## 5. UI is global design system
packages/ui/

Reusable UI components shared across all products.

---

# ⚙️ Installation

npm install

---

# 🚀 Running the project

## Development
npm run dev

Starts:
- Next.js (web)
- NestJS (api)
- all packages via Turbo

## Build
npm run build

---

# 🧪 Adding a new product

## 1. Create structure
packages/products/product-x/
  backend/
  frontend/

---

## 2. Backend module (NestJS)

import { Module } from "@nestjs/common";

@Module({
  controllers: [],
  providers: []
})
export class ProductXModule {}

---

## 3. Register in API

import { ProductXModule } from "@repo/products/product-x/backend";

@Module({
  imports: [ProductXModule]
})
export class AppModule {}

---

## 4. Use frontend module

import { ProductXFeature } from "@repo/products/product-x/frontend";

---

# 🔗 Path Aliases (tsconfig.base.json)

{
  "paths": {
    "@repo/core/*": ["packages/core/*"],
    "@repo/products/*": ["packages/products/*"],
    "@repo/shared/*": ["packages/shared/*"],
    "@repo/ui/*": ["packages/ui/*"]
  }
}

---

# ⚡ Turbo Commands

npm run dev      → start all apps
npm run build    → build all apps
npm run lint     → lint workspace (if configured)

---

# 🧱 Dependency Rules

products → core + shared + ui  
apps → products + core + shared + ui  
core → shared only  
shared → nothing  
ui → shared only  

---

# 🧠 Mental Model

Apps = runtime engines  
Products = business modules  
Core = infrastructure layer  
Shared = pure logic  
UI = design system  

---

# 🚨 Common Issues

## Module not found (@repo/*)
npm install

## Turbo not running
Check turbo script exists:
"dev": "turbo run dev"

## Nested git repo error
rm -rf path/to/folder/.git

## Build issues
npm run build

---

# 📈 Scaling Strategy

This setup supports:
- multiple independent products
- shared infrastructure evolution
- fast onboarding of new apps
- future microservice extraction if needed

---

# 🧭 Recommended Next Steps

- add feature flags per product
- database isolation per product
- CI/CD pipeline (GitHub Actions)
- API gateway layer (optional)
- versioned shared packages
