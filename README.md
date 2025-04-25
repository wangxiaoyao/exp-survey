# experiment-survey-platform

## Project Overview

This project is a survey platform used to collect data on the impact of adaptive AI systems on task performance. Participants are assigned to either an experimental or control group and complete a series of tasks. Based on their performance, the difficulty of the tasks is adjusted dynamically in the experimental group.

## Technologies

Next.js @15: For building the React-based frontend with server-side rendering.

React @19: For component-based UI management.

Tailwind CSS: For styling and layout.

ShadCN: For UI components that integrate with Tailwind.

Motion:For animation

vercel/Blob: For storage

## Project Structure

The project follows a simple structure that will support the flow of the survey and task management. Each step of the process is encapsulated in an HTML page, with dynamic behavior implemented via React and Next.js.


## highlight

### use vercel/blob

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

### No log-in evaluation
