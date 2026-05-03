# Monorepo Platform — Control Plane Boilerplate

## Overview

This repository provides a monorepo structure with a control plane system and modular service architecture.

---

## Architecture

```
apps/
  api/           → sample backend service
  web/           → sample frontend service

  admin-api/     → control plane backend
  admin-web/     → control plane frontend

packages/
  shared utilities and libraries
```

---

## System Design

The system is divided into two layers.

### Control Plane

* admin-api
* admin-web

Responsible for system management functions including users, roles, permissions, logs, and service control.

### Application Layer

* api
* web

Base applications used as starting points for custom implementations.

---

## Admin System Responsibilities

* user management
* role and permission management
* system orchestration
* audit logging
* service monitoring

---

## Core Concepts

### Services as entities

Each application is treated as an independent service.

### Central control

The admin system provides a unified interface for managing system state.

### Separation of concerns

Control logic is isolated from application logic.

---

## Tech Stack

* TurboRepo with pnpm
* NestJS for backend services
* Next.js for frontend applications
* JWT authentication
* PostgreSQL database

---

## Features

* authentication
* role-based access control
* user management
* service management
* audit logs

---

## Environment Setup

Each application contains its own environment configuration:

```
apps/api/.env
apps/web/.env
apps/admin-api/.env
apps/admin-web/.env
```

---

## Development

Run all services:

```
pnpm dev
```

Run a specific service:

```
pnpm --filter admin-api dev
pnpm --filter web dev
```

---

## Adding Applications

New applications can be added under the apps directory.

Typical structure:

```
apps/<app-name>/
  src/
  package.json
```

Each application is independent and follows the same runtime structure.

---

## Adding Shared Packages

Reusable code is placed in the packages directory.

```
packages/<package-name>/
  src/
  package.json
```

Packages are imported across applications.

---

## Contributing

### Bug fixes

* create a branch
* reproduce the issue
* apply minimal fix
* commit with descriptive message

### Shared packages

Add reusable logic inside packages and avoid application-specific code.

---

## Rules

* no cross application runtime coupling
* shared logic must go through packages
* each service must run independently
* keep changes isolated

---

  



