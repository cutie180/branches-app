# ListPak Jobs Research Package

This directory contains research-only material for manual review of current, publicly visible Pakistan job opportunities. No jobs were inserted into Firestore and no existing jobs were modified.

## Main file

Open [`high-search-pakistan-jobs.md`](./high-search-pakistan-jobs.md). It contains 24 current job opportunities selected from public Indeed and Rozee search results, with employer, title, location, employment type, salary where shown, requirements, skills, application/source URLs, discovery date, freshness notes, search intent, and ListPak field mapping.

## Important freshness rule

A job listing can close or change after discovery. Reopen every source URL immediately before manual entry. If the employer, title, location, salary, application route, or availability no longer matches, do not enter the record. Where the source did not show a deadline, the file marks the deadline as “Not stated — verify source” rather than inventing one.

## Recommended manual workflow

Use the existing ListPak post-job form and job database structure. Search ListPak by normalized title, employer, application domain, and city before saving to prevent duplicates. Keep every manually added record pending until admin review. Do not mark jobs verified or featured, do not create employer records from assumptions, and do not publish a job without a working public application path.

The file also lists high-search job families that have demand signals but were not converted into records because a reliable current employer-specific vacancy was not verified. These are opportunity keywords, not valid jobs to publish.

## Current architecture note

The job service has a pending status field, but the research audit found that expiration filtering is not clearly enforced in the public retrieval path and Firestore failures can fall back to in-memory data. This package does not change that architecture. Treat expired-job handling as a product/SEO issue to fix separately rather than silently creating new static or hardcoded job pages.
