# 1:1 Functional Parity Checklist

This document tracks the verification of the modernized dashboard against the legacy PHP system.

## 🟢 Core Navigation (1:1 Layout)
- [x] **Gestiones Dropdown**
  - [x] `InscripcionClientes.php` -> `/dashboard/clients/new`
  - [x] `ConsultaClientes.php` -> `/dashboard/clients`
  - [x] `InscripcionArchivoCarpetas.php` -> `/dashboard/pensioners/new`
  - [x] `ConsultaArchivoCarpetas.php` -> `/dashboard/pensioners`
  - [x] `BusquedaAvanzada_AC.php` -> `/dashboard/pensioners/advanced`
- [x] **Consultas Varias Dropdown**
  - [x] `BuscarProcesos.php` -> `/dashboard/processes`
  - [x] `BusquedaAvanzada_P.php` -> `/dashboard/processes/advanced`
  - [x] `BuscarDatoscontacto.php` -> `/dashboard/contacts/data`
  - [x] `BuscarPensionados.php` -> `/dashboard/pensioners` (Filtered)
  - [x] `BusquedaAvanzadaGral.php` -> `/dashboard/search` (Multi-table Global)
- [x] **Agenda Dropdown**
  - [x] `Agenda.php` -> `/dashboard/agenda`
  - [x] `formulario_busqueda_agenda.php` -> `/dashboard/agenda/by-date`

## 🟢 Module Fidelity (Functional Parity)
- [x] **Multi-table Global Search**
  - Replicates `BusquedaAvanzadaGral.php` logic (joins `processes`, `demandantes`, `clients`, `folders`).
  - Categorized results for quick navigation.
- [x] **Pensioner Enrollment (High Complexity)**
  - Maps 40+ legacy fields from `InscripcionArchivoCarpetas.php`.
  - Automatic Next.js auth user creation for new pensioners.
- [x] **Agenda Search by Date**
  - Replicates date-range filtering for legal tasks and deadlines.
- [x] **Reporting Infrastructure**
  - CSV Exports for Demandantes, Processes, and Document Inventory.
  - Functional Annotation and PPA Contact reports.

## 🟡 Visual & UX Polish
- [x] Adherence to `dajusticia.com.co` color palette.
- [x] Modern Dark Mode with Glassmorphism.
- [x] Responsive layout for tablet/mobile.

## ✅ Build Status
- [x] Resolved Tailwind 4 conflicts.
- [x] Fixed Next.js 15 Async Params type errors.
- [x] Fixed React 19 Form Action signatures.
- [x] Production Build Successful.
