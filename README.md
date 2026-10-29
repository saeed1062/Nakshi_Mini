# Nakshi_Mini — Lab Evaluation Guide & Cheat Sheet

A minimal full-stack project (React + Express + Prisma + Supabase) pre-configured with **one page** for lab evaluations.

---

## 🖥️ 1. Setup on Any Machine (Lab PC / Laptop)

Follow these steps when opening this project on a new or lab computer:

### Step 1: Install Dependencies
From the root directory:
```bash
npm install
```
*(This automatically installs packages for root, `server`, and `client` via npm workspaces).*

### Step 2: Ensure Environment File Exists
Make sure `server/.env` exists. If missing, create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DATABASE_URL="postgresql://postgres.ypunltfhawrltpagbuwr:Lab_29_Thurs@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"
```

### Step 3: Install Playwright Browser (Once per PC)
If running on a fresh lab PC where Playwright's Chromium isn't downloaded yet:
```bash
npx playwright install chromium
```

### Step 4: Sync Database & Generate Prisma Client
```bash
npm run prisma:push
npm run prisma:generate
```

### Step 5: Start Development Servers
```bash
npm run dev
```
* **Frontend UI**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:5000](http://localhost:5000)
* **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### Step 6: Run Tests
```bash
# Unit Tests (Vitest)
npm run test:unit

# UI Tests (Playwright)
npm run test:ui

# UI Test Headed
npx playwright test --project="Desktop Chrome" --workers=1 --headed

# Both
npm run test
```

> **⚠️ Windows Prisma Tip:** Always stop your dev server (`Ctrl + C`) **before** running `prisma:push` or `prisma:generate`, so Windows doesn't lock the query engine `.dll` file.

---

## 🗄️ 2. Prisma Schema & TypeScript Types Master Reference

File location: `server/prisma/schema.prisma`

### Master Type Mapping Table
| Prisma Type | TypeScript Type | HTML Input Tag | On Submit (Automatic) | Table Render |
| :--- | :--- | :--- | :--- | :--- |
| `String` | `string` | `<input name="title">` | Handled by FormData | `<td>{item.title}</td>` |
| `Int` | `number` | `<input name="age" type="number">` | Handled by FormData | `<td>{item.age}</td>` |
| `Float` | `number` | `<input name="gpa" type="number" step="0.01">` | Handled by FormData | `<td>{item.gpa}</td>` |
| `Decimal` | `number \| string` | `<input name="price" type="number" step="0.01">` | Handled by FormData | `<td>৳{Number(item.price)}</td>` |
| `Boolean` | `boolean` | `<input name="isActive" type="checkbox">` | Handled by FormData | `<td>{item.isActive ? "Yes" : "No"}</td>` |
| `DateTime` (Date) | `string` | `<input name="date" type="date">` | Handled by FormData | `<td>{new Date(item.date).toLocaleDateString()}</td>` |
| `DateTime` (Full) | `string` | `<input name="datetime" type="datetime-local">`| Handled by FormData | `<td>{new Date(item.datetime).toLocaleString()}</td>` |
| `DateTime` (Time) | `string` | `<input name="time" type="time">` | Handled by FormData | `<td>{item.time}</td>` |
| `Enum` | `'OPT_A' \| 'OPT_B'` | `<select name="status">` | Handled by FormData | `<td>{item.status}</td>` |

---

### Key Attributes & Modifiers
| Modifier / Attribute | Purpose | Example |
| :--- | :--- | :--- |
| `?` | **Optional / Nullable** | `description String?` *(can be empty)* |
| `@id` | **Primary Key** | `id String @id @default(uuid())` |
| `@default(...)` | **Default Value** | `@default("Craft")`, `@default(0)`, `@default(0.0)`, `@default(true)`, `@default(now())` |
| `@unique` | **Unique Constraint** | `email String @unique` *(no duplicates)* |
| `@updatedAt` | **Auto-update timestamp** | `updatedAt DateTime @updatedAt` |

---

### Simple Copy-Paste Model Template
```prisma
model Student {
  id          String    @id @default(uuid())
  name        String
  email       String    @unique
  age         Int       @default(18)
  cgpa        Float     @default(0.0)
  tuitionFee  Decimal   @default(0.0)
  isEnrolled  Boolean   @default(true)
  dateOfBirth DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

After updating `schema.prisma`, run:
```bash
npm run prisma:push
npm run prisma:generate
```

---

## 📝 3. Zero-State Form & Table (No `useState` / No `onChange`)

Instead of writing `useState`, `value`, and `onChange` for every input, use standard native HTML inputs with `name="..."`. 

### The 3-Line Form Submit Handler
```tsx
const handleSubmit = async (e: any) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  await createItem(data);
  window.location.reload(); // Reloads page & fetches new list
};
```

---

### Input & Render Snippets

#### 1. Text (`String`)
* **Input**: `<input name="name" className="border p-1 w-full rounded" />`
* **Render**: `<td>{item.name}</td>`

#### 2. Number (`Int`, `Float`, `Decimal`)
* **Input**: `<input name="price" type="number" step="0.01" className="border p-1 w-full rounded" />`
* **Render**: `<td>৳{Number(item.price)}</td>`

#### 3. Date / DateTime (`DateTime`)
* **Input**: `<input name="date" type="date" className="border p-1 w-full rounded" />`
* **Render**: `<td>{new Date(item.date).toLocaleDateString()}</td>`
* **ISO - Conversion**: `<td>{new Date(item.datetime).toLocaleString()}</td>`const today = new Date().toISOString().slice(0, 10);
    const nd = new Date();
    nd.setDate(nd.getDate() + 7);
    const futureDate = nd.toISOString().slice(0, 10);

#### 4. Checkbox / Boolean (`Boolean`)
* **Input**: `<label><input name="isActive" type="checkbox" /> Active</label>`
* **Render**: `<td>{item.isActive ? "Yes" : "No"}</td>`

#### 5. Dropdown / Select / Enum (`enum` or `String`)
* **Input**:
  ```tsx
  <select name="category" className="border p-1 w-full rounded">
    <option value="Craft">Craft</option>
    <option value="Textile">Textile</option>
  </select>
  ```
* **Render**: `<td>{item.category}</td>`

---

## ⏱️ 4. Exam Day 4-Step Checklist (Files to Copy & Edit)

When assigned a new entity (e.g. `User`), copy from the existing files:

### Step 1: Database (Task 1)
* Add your model in `server/prisma/schema.prisma`:
  ```prisma
  model User {
    id        String   @id @default(uuid())
    name      String
    email     String   @unique
    createdAt DateTime @default(now())
  }
  ```
* Push schema & update client:
  ```bash
  npm run prisma:push
  npm run prisma:generate
  ```

### Step 2: Backend API
1. **Service**: Copy `server/src/services/item.service.ts` $\rightarrow$ `services/user.service.ts` (replace `prisma.item` with `prisma.user`).
2. **Routes**: Copy `server/src/routes/item.routes.ts` $\rightarrow$ `routes/user.routes.ts` (call `UserService`).
3. **Mount Route**: In `server/src/server.ts`, add:
   ```ts
   import userRoutes from './routes/user.routes.js';
   app.use('/api/users', userRoutes);
   ```

### Step 3: Frontend Page (Task 2 & 3)
1. **API**: Copy `client/src/api/items.ts` $\rightarrow$ `api/users.ts` (change endpoint to `/api/users`).
2. **Page**: Copy `client/src/pages/RecordsPage.tsx` $\rightarrow$ `pages/UserPage.tsx` (change fields & import from `api/users`).
3. **Route**: In `client/src/App.tsx`, mount `<Route path="/users" element={<UserPage />} />`.
4. **Nav Link**: In `client/src/components/Navbar.tsx`, add `<NavLink to="/users" className={navLinkClass}>Users</NavLink>`.

### Step 4: Tests (Task 4)
1. **Unit Test**: Copy `server/tests/unit/item.service.test.ts` $\rightarrow$ `user.service.test.ts` and run:
   ```bash
   npm run test:unit
   ```
2. **UI Test**: Copy `e2e/records.spec.ts` $\rightarrow$ `e2e/user.spec.ts` (change URL to `/users`) and run:
   ```bash
   npm run test:ui
   ```
