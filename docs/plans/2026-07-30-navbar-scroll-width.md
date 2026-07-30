# Navbar Scroll Width Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Animate Navbar1 `max-width` between full site width and 48rem based on scroll direction.

**Architecture:** Local React state `compact` driven by a passive scroll listener; toggle `max-w` classes on the header with CSS transition.

**Tech Stack:** React, Tailwind CSS, existing `Navbar1` client component

---

### Task 1: Scroll direction state in Navbar1

**Files:**
- Modify: `solarview-site/components/navbar1.tsx`

**Step 1:** Add `compact` state and a scroll effect that:
- Tracks last `scrollY`
- Sets `compact = true` when scrolling down past 24px
- Sets `compact = false` when scrolling up or near top
- Uses passive listener; cleans up on unmount

**Step 2:** Apply conditional classes on `<header>`:
- Expanded: `max-w-[var(--site-max-width)]`
- Compact: `max-w-3xl` (48rem)
- Always: `transition-[max-width] duration-300 ease-out`

**Step 3:** Manual verify in browser — scroll down shrinks width, scroll up expands, no layout jump of page content.

---
