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

### Master Type Mapping Table (Zero-Processing)
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

## 📝 3. How to Take Input & Render Every Type (Minimal Code)

Direct, standard inputs without any manual trimming or complex validation:

### 1. Text (`String`)
```tsx
const [name, setName] = useState('');

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Table:
<td>{item.name}</td>
```

---

### 2. Number / Int / Float / Decimal (`Int`, `Float`, `Decimal`)
Use `Number(val)` for any number type:
```tsx
const [price, setPrice] = useState('');

<input
  type="number"
  step="0.01"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit:
const payload = { price: Number(price) };

// Table:
<td>৳{Number(item.price)}</td>
```

---

### 3. Date & Timestamps (`DateTime`)
```tsx
const [date, setDate] = useState('');

<input
  type="date" // or "datetime-local"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="border p-1 w-full rounded"
/>

// Submit:
const payload = { date: new Date(date) };

// Table:
<td>{new Date(item.date).toLocaleDateString()}</td>
```

---

### 4. Checkbox (`Boolean`)
```tsx
const [isActive, setIsActive] = useState(true);

<label>
  <input
    type="checkbox"
    checked={isActive}
    onChange={(e) => setIsActive(e.target.checked)}
  />
  Active
</label>

// Submit:
const payload = { isActive };

// Table:
<td>{item.isActive ? "Yes" : "No"}</td>
```

---

### 5. Dropdown / Select / Enum (`enum` or `String`)
```tsx
const [category, setCategory] = useState('Craft');

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="border p-1 w-full rounded"
>
  <option value="Craft">Craft</option>
  <option value="Textile">Textile</option>
  <option value="Pottery">Pottery</option>
</select>

// Submit:
const payload = { category };

// Table:
<td>{item.category}</td>
```

---

## ⏱️ 4. Exam Day 4-Step Checklist (Creating a New Entity)

Suppose your teacher assigns `User` with `name`, `email`, `role`, and `salary`:

### 1. Database (Task 1)
In `server/prisma/schema.prisma`:
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  role      String   @default("Student")
  salary    Float    @default(0.0)
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

export class UserService {
  static async getUsers() {
    return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }

  static async createUser(data: any) {
    return prisma.user.create({ data });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
```

2. Create `server/src/routes/user.routes.ts`:
```ts
import { Router } from 'express';
import { UserService } from '../services/user.service.js';

const router = Router();

router.get('/', async (req, res) => {
  const data = await UserService.getUsers();
  res.json({ success: true, data });
});

router.post('/', async (req, res) => {
  try {
    const data = await UserService.createUser(req.body);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  await UserService.deleteUser(req.params.id as string);
  res.json({ success: true });
});

export default router;
```

3. In `server/src/server.ts`:
```ts
import userRoutes from './routes/user.routes.js';
app.use('/api/users', userRoutes);
```

---

### 3. Frontend Page (Task 2 & 3)

1. Create `client/src/api/users.ts`:
```ts
export const fetchUsers = async () => {
  const res = await fetch('/api/users');
  const json = await res.json();
  return json.data;
};

export const createUser = async (data: any) => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
};

export const deleteUser = async (id: string) => {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
};
```

2. Create `client/src/pages/UserPage.tsx` *(copy `RecordsPage.tsx` and change fields)*:
```tsx
import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, deleteUser } from '../api/users';

export const UserPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = await createUser({ name, email, salary: Number(salary) });
    setUsers([newUser, ...users]);
    setName('');
    setEmail('');
    setSalary('');
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <form onSubmit={handleSubmit} className="border p-4 mb-6 rounded bg-white">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-1 w-full mb-2" />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-1 w-full mb-2" />
        <input placeholder="Salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="border p-1 w-full mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save User</button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Salary</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.salary}</td>
              <td className="p-2">
                <button onClick={() => handleDelete(u.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

3. Mount in `client/src/App.tsx`:
```tsx
import { UserPage } from './pages/UserPage';
<Route path="/users" element={<UserPage />} />
```

4. Add link in `client/src/components/Navbar.tsx`:
```tsx
<NavLink to="/users" className={navLinkClass}>Users</NavLink>
```

---

### 4. Tests (Task 4)

1. **Unit Test**: Create `server/tests/unit/user.service.test.ts`:
```ts
import { describe, it, expect, vi } from 'vitest';
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

describe('UserService Unit Test', () => {
  it('should create a user record', async () => {
    const mockUser = { id: '1', name: 'Rahim', email: 'rahim@test.com' };
    (prisma.user.create as any).mockResolvedValue(mockUser);

    const result = await UserService.createUser({ name: 'Rahim', email: 'rahim@test.com' });
    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Rahim');
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

test('should render and submit user', async ({ page }) => {
  await page.goto('/users');
  await page.fill('input[placeholder="Name"]', 'Test User');
  await page.fill('input[placeholder="Email"]', `user_${Date.now()}@test.com`);
  await page.click('button[type="submit"]');

  await expect(page.locator('table')).toContainText('Test User');
});
```
Run:
```bash
npm run test:ui
```
