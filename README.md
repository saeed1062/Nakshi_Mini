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

## 🗄️ 2. Prisma Schema & TypeScript Types Master Reference

File location: `server/prisma/schema.prisma`

### Master Type Mapping Table
| Prisma Type | TypeScript Type | HTML Input Tag | Parse on Submit (JS/TS) | Table Render Output |
| :--- | :--- | :--- | :--- | :--- |
| `String` | `string` | `<input type="text">` | `val.trim()` | `<td>{item.name}</td>` |
| `Int` | `number` | `<input type="number" step="1">` | `parseInt(val \|\| '0', 10)` | `<td>{item.age}</td>` |
| `Float` | `number` | `<input type="number" step="0.01">` | `parseFloat(val \|\| '0')` | `<td>{item.gpa}</td>` |
| `Decimal` | `number \| string` | `<input type="number" step="0.01">` | `parseFloat(val \|\| '0')` | `<td>৳{Number(item.price).toFixed(2)}</td>` |
| `Boolean` | `boolean` | `<input type="checkbox">` | `checked` (boolean) | `<td>{item.isActive ? "Yes" : "No"}</td>` |
| `DateTime` (Date) | `string` *(ISO)* | `<input type="date">` | `val` *(YYYY-MM-DD)* | `<td>{new Date(item.date).toLocaleDateString()}</td>` |
| `DateTime` (Full) | `string` *(ISO)* | `<input type="datetime-local">`| `new Date(val).toISOString()` | `<td>{new Date(item.datetime).toLocaleString()}</td>` |
| `DateTime` (Time) | `string` | `<input type="time">` | `val` *(HH:mm)* | `<td>{item.time}</td>` |
| `Enum` | `'OPT_A' \| 'OPT_B'` | `<select>` with `<option>` | `val` (string) | `<td>{item.status}</td>` |
| `String[]` (Array) | `string[]` | `<input type="text">` *(comma)*| `val.split(',').map(s=>s.trim())` | `<td>{item.tags?.join(', ')}</td>` |
| `Json` | `any \| object` | `<textarea>` | `JSON.parse(val)` | `<td>{JSON.stringify(item.data)}</td>` |
| `BigInt` | `bigint \| string` | `<input type="number">` | `parseInt(val, 10)` | `<td>{String(item.views)}</td>` |

---

### Key Attributes & Modifiers
| Modifier / Attribute | Purpose | Example |
| :--- | :--- | :--- |
| `?` | **Optional / Nullable** | `description String?` *(can be null in DB)* |
| `@id` | **Primary Key** | `id String @id @default(uuid())` |
| `@default(...)` | **Default Value** | `@default("Craft")`, `@default(0)`, `@default(0.0)`, `@default(true)`, `@default(now())` |
| `@unique` | **Unique Constraint** | `email String @unique` *(no duplicates)* |
| `@updatedAt` | **Auto-update timestamp** | `updatedAt DateTime @updatedAt` |

---

### Complete Copy-Paste Model Template (Showcasing All Types)
```prisma
// Enum definition (place outside model block)
enum Role {
  STUDENT
  TEACHER
  ADMIN
}

model Student {
  id          String    @id @default(uuid())
  name        String
  email       String    @unique
  age         Int       @default(18)
  gpa         Float     @default(0.0)
  tuitionFee  Decimal   @default(0.0)
  isEnrolled  Boolean   @default(true)
  role        Role      @default(STUDENT)
  skills      String[]  @default([])
  dateOfBirth DateTime?
  metadata    Json?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

After updating `schema.prisma`, always run:
```bash
npm run prisma:push
npm run prisma:generate
```

---

## 📝 3. How to Take Input & Render Every Type in React

Use standard HTML input tags with simple styles (`className="border p-1 w-full rounded"`).

### 1. String / Text (`String`)
```tsx
const [name, setName] = useState('');

// Input
<input
  type="text"
  required
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Render
<td>{item.name}</td>
```

---

### 2. Int / Integer (`Int`)
```tsx
const [age, setAge] = useState('');

// Input
<input
  type="number"
  step="1"
  value={age}
  onChange={(e) => setAge(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit conversion:
const payload = { age: parseInt(age || '0', 10) };

// Table Render
<td>{item.age}</td>
```

---

### 3. Float & Decimal (`Float` / `Decimal`)
Used for prices, account balances, CGPA, and ratings:
```tsx
const [price, setPrice] = useState('');

// Input
<input
  type="number"
  step="0.01"
  placeholder="0.00"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit conversion:
const payload = { price: parseFloat(price || '0') };

// Table Render (Formatted to 2 decimal places)
<td>৳{Number(item.price).toFixed(2)}</td>
```

---

### 4. Date (`DateTime` - Date Only)
```tsx
const [dob, setDob] = useState('');

// Input
<input
  type="date"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit conversion:
const payload = { dob: dob ? new Date(dob).toISOString() : undefined };

// Table Render
<td>{item.dob ? new Date(item.dob).toLocaleDateString() : 'N/A'}</td>
```

---

### 5. Date & Time (`DateTime` - Timestamp)
```tsx
const [scheduledAt, setScheduledAt] = useState('');

// Input
<input
  type="datetime-local"
  value={scheduledAt}
  onChange={(e) => setScheduledAt(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit conversion:
const payload = { scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : new Date().toISOString() };

// Table Render
<td>{item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : 'N/A'}</td>
```

---

### 6. Time Only (`String` or `DateTime`)
```tsx
const [shiftTime, setShiftTime] = useState('');

// Input
<input
  type="time"
  value={shiftTime}
  onChange={(e) => setShiftTime(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Render
<td>{item.shiftTime || 'N/A'}</td>
```

---

### 7. Checkbox / Boolean (`Boolean`)
```tsx
const [isActive, setIsActive] = useState(true);

// Input
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={isActive}
    onChange={(e) => setIsActive(e.target.checked)}
  />
  Active Status
</label>

// Submit conversion:
const payload = { isActive };

// Table Render
<td>
  <span className={item.isActive ? "text-green-600 font-semibold" : "text-gray-400"}>
    {item.isActive ? "Yes" : "No"}
  </span>
</td>
```

---

### 8. Dropdown / Select / Enum (`enum` or `String`)
```tsx
const [role, setRole] = useState('STUDENT');

// Input
<select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border p-1 w-full rounded"
>
  <option value="STUDENT">STUDENT</option>
  <option value="TEACHER">TEACHER</option>
  <option value="ADMIN">ADMIN</option>
</select>

// Submit conversion:
const payload = { role };

// Table Render
<td>{item.role}</td>
```

---

### 9. String Array / Tags (`String[]`)
Postgres supports native string arrays:
```tsx
const [skillsText, setSkillsText] = useState('');

// Input (Comma-separated)
<input
  type="text"
  placeholder="React, Node, Prisma"
  value={skillsText}
  onChange={(e) => setSkillsText(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit conversion (split by comma and trim):
const payload = {
  skills: skillsText.split(',').map((s) => s.trim()).filter(Boolean)
};

// Table Render
<td>{item.skills?.join(', ') || 'None'}</td>
```

---

### 10. Long Text / Textarea (`String` / `String?`)
```tsx
const [description, setDescription] = useState('');

// Input
<textarea
  rows={3}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table Render
<td>{item.description || '—'}</td>
```

---

### 11. JSON / Metadata (`Json`)
```tsx
const [jsonText, setJsonText] = useState('{}');

// Input
<textarea
  rows={2}
  value={jsonText}
  onChange={(e) => setJsonText(e.target.value)}
  className="border p-1 w-full rounded font-mono text-xs"
/>

// Submit conversion (parse JSON safely):
let parsed = {};
try { parsed = JSON.parse(jsonText); } catch(e) {}
const payload = { metadata: parsed };

// Table Render
<td>{typeof item.metadata === 'object' ? JSON.stringify(item.metadata) : String(item.metadata)}</td>
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
  salary    Decimal  @default(0.0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}
```
Run:
```bash
npm run prisma:push
npm run prisma:generate
```

---

### 2. Backend API
1. Create `server/src/services/user.service.ts`:
```ts
import prisma from '../config/prisma.js';

export interface CreateUserDTO {
  name: string;
  email: string;
  role?: string;
  salary?: number;
  isActive?: boolean;
}

export class UserService {
  static async getUsers() {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  static async createUser(data: CreateUserDTO) {
    if (!data.name || !data.email) {
      throw new Error('Name and email are required');
    }
    return prisma.user.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        role: data.role || 'Student',
        salary: data.salary ? parseFloat(String(data.salary)) : 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
```

2. Create `server/src/routes/user.routes.ts`:
```ts
import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const data = await UserService.getUsers();
    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const data = await UserService.createUser(req.body);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id as string);
    res.json({ success: true, message: 'Deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
```

3. In `server/src/server.ts`, add:
```ts
import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);
```

---

### 3. Frontend Page (Task 2 & 3)

1. Create `client/src/api/users.ts`:
```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  isActive: boolean;
  createdAt: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  const json = await res.json();
  return json.data;
};

export const createUser = async (input: Partial<User>): Promise<User> => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed');
  return json.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
};
```

2. Create `client/src/pages/UserPage.tsx` *(copy structure from `RecordsPage.tsx` and change fields)*.

3. In `client/src/App.tsx`:
```tsx
import { UserPage } from './pages/UserPage';
<Route path="/users" element={<UserPage />} />
```

4. In `client/src/components/Navbar.tsx`:
```tsx
<NavLink to="/users" className={navLinkClass}>Users</NavLink>
```

---

### 4. Tests (Task 4)

1. **Unit Test**: Create `server/tests/unit/user.service.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../../src/services/user.service.js';
import prisma from '../../src/config/prisma.js';

vi.mock('../../src/config/prisma.js', () => ({
  default: {
    user: {
      findMany: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('UserService Unit Tests', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should create a valid user', async () => {
    const mockUser = { id: '1', name: 'Rahim', email: 'rahim@test.com' };
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const result = await UserService.createUser({ name: 'Rahim', email: 'rahim@test.com' });
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Rahim');
  });

  it('should throw error when name is missing', async () => {
    await expect(UserService.createUser({ name: '', email: 'test@test.com' })).rejects.toThrow();
  });
});
```
Run:
```bash
npm run test:unit
```

2. **UI Test**: Create `e2e/user.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

test.describe('User Page UI Test', () => {
  test('should submit and display user record in table', async ({ page }) => {
    await page.goto('/users');

    const uniqueEmail = `user_${Date.now()}@test.com`;

    await page.fill('#user-name-input', 'Test User');
    await page.fill('#user-email-input', uniqueEmail);
    await page.click('#user-submit-btn');

    const table = page.locator('#users-table');
    await expect(table).toContainText(uniqueEmail);
  });
});
```
Run:
```bash
npm run test:ui
```
