# Nakshi_Mini — Setup Guide

A minimal full-stack project (React + Express + Prisma + Supabase) pre-configured with **one page** for lab evaluations.

---

## 🖥️ 1. Setup on Any Machine (Lab PC / Laptop)

Follow these steps when opening this project on a new or lab computer:

### Step 1: Install Dependencies
From the root directory:
```bash
npm install
```
*(This automatically installs packages for both root, `server`, and `client` via npm workspaces).*

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

## 🗄️ 2. Prisma Schema Quick Reference

File location: `server/prisma/schema.prisma`

### Supported Data Types
| Type | Description | Example Field |
| :--- | :--- | :--- |
| `String` | Text strings | `name String` |
| `Int` | Whole numbers / Integers | `age Int`, `rating Int` |
| `Float` | Decimal numbers | `price Float`, `gpa Float` |
| `Boolean` | True / False flag | `isActive Boolean` |
| `DateTime` | Dates and Timestamps | `eventDate DateTime` |

### Key Attributes & Modifiers
| Modifier / Attribute | Purpose | Example |
| :--- | :--- | :--- |
| `?` | **Optional / Nullable** | `bio String?` |
| `@id` | **Primary Key** | `id String @id @default(uuid())` |
| `@default(...)` | **Default Value** | `@default("Craft")`, `@default(0)`, `@default(true)`, `@default(now())` |
| `@unique` | **Unique Constraint** | `email String @unique` |
| `@updatedAt` | **Auto-update timestamp** | `updatedAt DateTime @updatedAt` |

### Copy-Paste Model Template
```prisma
model Student {
  id          String   @id @default(uuid())
  name        String
  email       String   @unique
  department  String   @default("CSE")
  cgpa        Float    @default(0.0)
  isEnrolled  Boolean  @default(true)
  dateOfBirth DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
After editing `schema.prisma`, always run:
```bash
npm run prisma:push
npm run prisma:generate
```

---

## 📝 3. Input Types & Table Column Rendering (React)

Use standard HTML input tags with simple styles (`className="border p-1 w-full rounded"`).

### 1. Date (`type="date"`)
```tsx
// State
const [date, setDate] = useState('');

// Input
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Column Render
<td>{item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</td>
```

### 2. Time (`type="time"`)
```tsx
// State
const [time, setTime] = useState('');

// Input
<input
  type="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Column Render
<td>{item.time || 'N/A'}</td>
```

### 3. Date & Time (`type="datetime-local"`)
```tsx
// State
const [scheduledAt, setScheduledAt] = useState('');

// Input
<input
  type="datetime-local"
  value={scheduledAt}
  onChange={(e) => setScheduledAt(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Column Render
<td>{item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : 'N/A'}</td>
```

### 4. Checkbox / Boolean (`type="checkbox"`)
```tsx
// State
const [isActive, setIsActive] = useState(true);

// Input
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={isActive}
    onChange={(e) => setIsActive(e.target.checked)}
  />
  Active
</label>

// Table Column Render
<td>
  <span className={item.isActive ? "text-green-600 font-semibold" : "text-gray-400"}>
    {item.isActive ? "Yes" : "No"}
  </span>
</td>
```

### 5. Dropdown / Select (`<select>`)
```tsx
// State
const [category, setCategory] = useState('Textile');

// Input
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border p-1 w-full rounded"
>
  <option value="Textile">Textile</option>
  <option value="Pottery">Pottery</option>
  <option value="Craft">Craft</option>
</select>

// Table Column Render
<td>{item.category}</td>
```

### 6. Number (`type="number"`)
```tsx
// State
const [price, setPrice] = useState('');

// Input
<input
  type="number"
  step="0.01"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Column Render
<td>৳{item.price}</td>
```

---

## ⏱️ 4. Exam Day 4-Step Checklist (Creating a New Entity)

Suppose the instructor asks you to create a module for `User`:

### 1. Database (Task 1)
In `server/prisma/schema.prisma`:
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String   @default("Student")
  createdAt DateTime @default(now())
}
```
Run:
```bash
npm run prisma:push
npm run prisma:generate
```

### 2. Backend API
1. Create `server/src/services/user.service.ts`:
   * Use `prisma.user.findMany({ orderBy: { createdAt: 'desc' } })`
   * Use `prisma.user.create({ data: ... })`
   * Use `prisma.user.delete({ where: { id } })`
2. Create `server/src/routes/user.routes.ts`:
   * Define `router.get('/', ...)`, `router.post('/', ...)`, `router.delete('/:id', ...)`
3. In `server/src/server.ts`:
   ```ts
   import userRoutes from './routes/user.routes.js';
   app.use('/api/users', userRoutes);
   ```

### 3. Frontend Page (Task 2 & 3)
1. Create `client/src/api/users.ts` with `fetchUsers`, `createUser`, `deleteUser`.
2. Create `client/src/pages/UserPage.tsx` (copy `RecordsPage.tsx` and change fields).
3. In `client/src/App.tsx`:
   ```tsx
   import { UserPage } from './pages/UserPage';
   <Route path="/users" element={<UserPage />} />
   ```
4. In `client/src/components/Navbar.tsx`:
   ```tsx
   <NavLink to="/users" className={navLinkClass}>Users</NavLink>
   ```

### 4. Tests (Task 4)
1. **Unit Test**: Duplicate `server/tests/unit/item.service.test.ts` as `user.service.test.ts`, test `UserService.createUser` & `UserService.getUsers`.
   ```bash
   npm run test:unit
   ```
2. **UI Test**: Duplicate `e2e/records.spec.ts` as `e2e/user.spec.ts`, test form fill and table row appearance.
   ```bash
   npm run test:ui
   ```
