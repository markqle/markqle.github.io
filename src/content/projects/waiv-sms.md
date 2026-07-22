---
title: 'WAIV Student Management System'
description: 'A Django case-management platform built for CSULB''s WorkAbility IV (WAIV) program to manage student cases, documents, disability information, service logs, and reporting.'
tech: ['Django', 'Python', 'Microsoft SQL Server', 'Docker', 'Nginx']
repo: 'https://github.com/markqle/waiv'
featured: true
order: 1
---

I designed and built this internal Student Management System during my tenure with
the **WorkAbility IV (WAIV)** program at California State University, Long Beach.
It replaced a legacy Microsoft Access workflow, consolidating 20,000+ student
records into a centralized Microsoft SQL Server database and giving counselors a
single place to manage their caseload.

**What it does**

- Student profile and case management
- Document upload and management (IEPs, evaluations, and other records)
- Disability information tracking
- Monthly client service logs and reporting
- Role-based access for counselors and admins
- Report exports (CSV/Excel)

**How it was built**

A Django web application backed by Microsoft SQL Server, containerized with Docker
and served behind Nginx for on-premises deployment on a Windows Server via IIS.
I owned the work end to end — data model and ERD design, the migration off legacy
MS Access, the application itself, and the deployment — cutting redundancy and
boosting counselor productivity by roughly 50%.
