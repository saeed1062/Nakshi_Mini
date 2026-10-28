export interface Item {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  createdAt: string;
}

export const fetchItems = async (): Promise<Item[]> => {
  const res = await fetch('/api/items');
  const json = await res.json();
  return json.data;
};

export const createItem = async (input: any): Promise<Item> => {
  const res = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to create item');
  return json.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await fetch(`/api/items/${id}`, { method: 'DELETE' });
};
