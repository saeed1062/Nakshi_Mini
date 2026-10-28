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

# Both
npm run test
```

> **⚠️ Windows Prisma Tip:** Always stop your dev server (`Ctrl + C`) **before** running `prisma:push` or `prisma:generate`, so Windows doesn't lock the query engine `.dll` file.

---

## 🗄️ 2. Prisma Schema & TypeScript Types Master Reference

File location: `server/prisma/schema.prisma`

### Master Type Mapping Table
| Prisma Type | TypeScript Type | HTML Input Tag | On Submit (Simple) | Table Render |
| :--- | :--- | :--- | :--- | :--- |
| `String` | `string` | `<input type="text">` | `val` | `<td>{item.name}</td>` |
| `Int` | `number` | `<input type="number">` | `Number(val)` | `<td>{item.age}</td>` |
| `Float` | `number` | `<input type="number" step="0.01">` | `Number(val)` | `<td>{item.gpa}</td>` |
| `Decimal` | `number \| string` | `<input type="number" step="0.01">` | `Number(val)` | `<td>৳{Number(item.price)}</td>` |
| `Boolean` | `boolean` | `<input type="checkbox">` | `checked` | `<td>{item.isActive ? "Yes" : "No"}</td>` |
| `DateTime` (Date) | `string` | `<input type="date">` | `new Date(val)` | `<td>{new Date(item.date).toLocaleDateString()}</td>` |
| `DateTime` (Full) | `string` | `<input type="datetime-local">` | `new Date(val)` | `<td>{new Date(item.datetime).toLocaleString()}</td>` |
| `DateTime` (Time) | `string` | `<input type="time">` | `val` | `<td>{item.time}</td>` |
| `Enum` | `'OPT_A' \| 'OPT_B'` | `<select>` with `<option>` | `val` | `<td>{item.status}</td>` |
| `String[]` (Array) | `string[]` | `<input type="text">` | `val.split(',')` | `<td>{item.tags?.join(', ')}</td>` |

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

## 📝 3. How to Take Input & Render Every Type

### 1. Text (`String`)
* **Input**:
  ```tsx
  <input value={name} onChange={(e) => setName(e.target.value)} className="border p-1 w-full rounded" />
  ```
* **Render**:
  ```tsx
  <td>{item.name}</td>
  ```

### 2. Number (`Int`, `Float`, `Decimal`)
* **Input**:
  ```tsx
  <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-1 w-full rounded" />
  ```
* **Submit**: `price: Number(price)`
* **Render**:
  ```tsx
  <td>৳{Number(item.price)}</td>
  ```

### 3. Date / DateTime (`DateTime`)
* **Input**:
  ```tsx
  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-1 w-full rounded" />
  ```
* **Submit**: `date: new Date(date)`
* **Render**:
  ```tsx
  <td>{new Date(item.date).toLocaleDateString()}</td>
  ```

### 4. Checkbox / Boolean (`Boolean`)
* **Input**:
  ```tsx
  <label><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active</label>
  ```
* **Submit**: `isActive`
* **Render**:
  ```tsx
  <td>{item.isActive ? "Yes" : "No"}</td>
  ```

### 5. Dropdown / Select / Enum (`enum` or `String`)
* **Input**:
  ```tsx
  <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-1 w-full rounded">
    <option value="Craft">Craft</option>
    <option value="Textile">Textile</option>
  </select>
  ```
* **Submit**: `category`
* **Render**:
  ```tsx
  <td>{item.category}</td>
  ```

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
