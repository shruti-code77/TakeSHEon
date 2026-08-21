# SheGrow (शीग्रो) — Community Ideas. Real Business Growth.

> **“We don't just give women entrepreneurs advice — we measure whether the advice actually grows their business.”**

---

## 🌟 Hackathon Overview

**SheGrow** is a full-stack web application designed for women running small and micro-businesses (e.g. boutiques, tailoring, beauty parlours, home bakeries, papad & masala units, chakkis, handmade jewellery, and local services).

SheGrow closes the loop on advice by turning suggestions into structured **30-Day Business Experiments**, tracking monthly financial performance, utilizing **Google Gemini AI** to verify growth attribution, and rewarding advisors with **Gamified Impact Points & Vouchers**.

---

## 🚀 The Complete SheGrow Cycle

```
[ Entrepreneur Posts Problem ]
             ↓
[ Community Advisors Provide Actionable Ideas ]
             ↓
[ Gemini AI Evaluates Feasibility (Score / 100) ]
             ↓
[ Entrepreneur Selects Idea → Launches 30-Day Experiment ]
             ↓
[ Entrepreneur Enters Monthly Business Data (Revenue/Expenses) ]
             ↓
[ Automatic Profit Calculation & Recharts Analytics ]
             ↓
[ Gemini AI Business Growth Report (+34% Rev, +50% Profit) ]
             ↓
[ Advisor Earns Impact Points & Unlocks Vouchers ]
```

---

## 🎯 1-Click Live Judge Demo Guide

At the top of the app, you will find the **Hackathon Demo Bar**:

1. **Role Switcher**:
   - 👩‍💼 **Priya (Entrepreneur)**: Owner of *Priya's Boutique (Akola)* with ₹67,000 monthly revenue, +28.9% growth, and active Referral Program experiment.
   - 💡 **Anjali (Advisor)**: Level 2 Business Advisor with 75 Impact Points, working towards unlocking a ₹100 Partner Voucher.
   - 🛡️ **Admin**: Supervisory panel for verifying businesses and overseeing growth cases.

2. **Quick Live Story Jumper**:
   - **Step 1: Post Problem** → Visit Community Challenges or click "Ask the Community" to submit a question.
   - **Step 2: AI Suggestion** → View a challenge; see community suggestions with instant **AI Idea Analyzer cards** (Score: 94/100, Feasibility, Cost, Impact, Difficulty).
   - **Step 3: Experiment** → Click "Select This Idea & Test" to launch a 30-day trial with target goals (+20% customers).
   - **Step 4: Monthly Data** → Go to "Enter Monthly Data" where `Profit = Revenue − Expenses` is computed automatically with negative value validation.
   - **Step 5: +50% Growth** → View interactive Recharts graphs & Gemini AI Business Growth reports.
   - **Step 6: Rewards** → Visit Rewards to claim vouchers with confetti animations!

3. **🤖 SheGrow AI Floating Coach**:
   - Click the bottom-right **SheGrow AI** widget to ask contextual growth questions (pricing combos, repeat retention, reducing fabric waste).

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Recharts, Canvas Confetti.
- **Backend API**: Express server running on Node.js (`server.ts`).
- **AI Integration**: Server-side **Google GenAI SDK** (`@google/genai` with `gemini-2.5-flash` model):
  - `/api/gemini/evaluate-idea`: Scores feasibility, potential impact, and implementation difficulty.
  - `/api/gemini/growth-analysis`: Analyzes monthly before/after metrics to generate verified growth reports.
  - `/api/gemini/chat-assistant`: Conversational business advisor with tailored micro-enterprise prompt engineering.
- **Persistence**: Clean local state synced with `localStorage` for smooth testing and instant reset.

---

## 💎 Impact Points Gamification Table

| Trigger Action | Impact Points Earned |
| :--- | :--- |
| **Post a practical suggestion** | `+5 Points` |
| **Suggestion selected for experiment** | `+10 Points` |
| **Experiment marked implemented** | `+20 Points` |
| **Business shows verified growth (AI)** | `+50 Points` |
