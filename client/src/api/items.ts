export interface Item {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateItemInput {
  title: string;
  description?: string;
  category?: string;
  price?: number;
}

export const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  const json = await response.json();
  return json.data;
};

export const createItem = async (input: CreateItemInput): Promise<Item> => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || 'Failed to create item');
  }
  return json.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`/api/items/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error || 'Failed to delete item');
  }
};
