# experiment-survey-platform

## 一 Product Requirements Document（PRD）

### 1 Project Overview

An experimental web survey template designed to collect data on the effect of different systems or methods on task performance. The platform allows researchers to easily insert custom content and test questions within a pre-built structured flow.

The survey template supports controlled experiments with group assignment (control vs experimental), dynamic task difficulty adjustment, and response data collection without requiring participant login.

### 2 Project Structure/Content/Page

#### Part 1: Introduction

- Welcome page.

- Consent page (Agree/Disagree logic).

#### Part 2: Task Process

- Collect basic participant information (e.g., demographics).

- Random assignment to control or experimental group.

- Task series:

1 Experimental group: dynamic task difficulty adjustment.

2 Control group: static tasks.

3 Task submission and data storage.

#### Part 3: Completion

- Thank you page after task submission.

### 3 diagram flow

a simple diagram for survey flow please~

<img src="./public/disgram.png" alt="diagram flow" style="zoom:25%;" />

## 二 Technical Design Document（TDD）

```mermaid
flowchart TD
  subgraph Client
    A1(Next.js<br/>SSR/ISR)
  end
  subgraph Edge
    B1(Vercel<br/>Edge Middleware)
  end
  subgraph Services
    C1(Vercel Blob<br/>object store)
    C2(Vercel KV<br/>meta store)
    C3(Sentry<br/>error tracking)
    C4(Plausible<br/>analytics)
  end
  A1 -- HTTPS --> B1
  B1 -- REST JSON --> C1
  B1 -- REST JSON --> C2
  C1 -- Webhooks --> B1
  B1 -- Error/Event --> C3
  A1 -. script .-> C4
```



### Client:
- Next.js 15 + React 19 rendered at the edge (SSR/ISR) for speed & SEO.
- style：Tailwind CSS + ShadCN + Motion
- Form: react-hook-form
- state: Zustand

### Edge: 
- Lightweight serverless functions
- middleware enforce routing rules, 
- Auth:	FingerprintJS Pro (optional) ，rate-limit IPs,

### Services:
- Vercel Blob：raw survey payloads (JSON/CSV, screenshots, files).
- Vercel KV：tiny metadata (anonymised user hash → stage, attempt count, timestamps).
- CI/CD: github actions,vercel
- Monitoring: Sentry,vercel log
- Plausible – privacy-friendly usage metrics










## 三 hightlight

### Vercel Blob

Token generation using vercel login and vercel link.

Secure, environment-separated storage configuration (.env.local and Vercel project variables).

```
### 安装
npm install @vercel/blob

### 生成token
vercel login

vercel link

在网页端选择 Create storage =》 Blob =》 得到token
- 本地.env.local
- vercel项目的变量
```

### No-login Evaluation:

Participants can complete the survey without authentication.

IP address and device tracking used to limit repeated submissions.

### Route Interception:

Participants must proceed sequentially through survey pages.

Direct URL access to later steps is restricted.

### Task Countdown Timer:

Each task page includes a countdown timer to control completion time and ensure fair task timing.
