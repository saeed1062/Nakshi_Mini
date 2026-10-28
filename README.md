# Nakshi_Mini — Lab Evaluation Quick Guide

A clean, modular, and plug-and-play full-stack project built for rapid feature development and testing during lab evaluations.

---

## 🚀 Quick Setup & Start

### 1. Push Database Model to Supabase
```bash
npm run prisma:push
npm run prisma:generate
```

### 2. Run Development Servers (Client + Server)
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🧪 Running the Tests (Exam Task 4)

### Unit Tests (Vitest)
```bash
npm run test:unit
```

### UI Tests (Playwright)
```bash
npm run test:ui
```