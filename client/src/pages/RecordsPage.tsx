import React, { useState, useEffect } from 'react';
import { fetchItems, createItem, deleteItem, Item } from '../api/items';
import {
  PageHeader,
  Card,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  DataTable,
  Column,
  Alert,
  Badge,
} from '../components/ui';
import { PlusCircle, RefreshCw, Layers } from 'lucide-react';

export const RecordsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Textile');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchItems();
      setItems(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const newItem = await createItem({
        title: title.trim(),
        category,
        price: price ? parseFloat(price) : 0,
        description: description.trim() || undefined,
      });

      setItems((prev) => [newItem, ...prev]);
      setTitle('');
      setPrice('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Error saving item.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message || 'Error deleting item.');
    }
  };

  // Lego Table Columns configuration
  const columns: Column<Item>[] = [
    {
      header: 'Title',
      render: (item) => (
        <div>
          <div className="font-semibold text-on-surface">{item.title}</div>
          {item.description && (
            <div className="text-xs text-on-surface-variant line-clamp-1">
              {item.description}
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Category',
      render: (item) => <Badge variant="default">{item.category}</Badge>,
    },
    {
      header: 'Price',
      render: (item) => (
        <span className="font-semibold text-primary">
          ৳{item.price.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Created',
      render: (item) => (
        <span className="text-xs text-on-surface-variant">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 1. Page Header Lego Block */}
      <PageHeader
        eyebrow="Inventory Management"
        title="Items & Craft Records"
        action={
          <Button
            variant="outline"
            icon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
            onClick={loadData}
          >
            Refresh Records
          </Button>
        }
      />

      {/* 2. Alert Lego Block */}
      {error && <Alert message={error} onDismiss={() => setError(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 3. Form Card Lego Block (Exam Task 2) */}
        <div className="lg:col-span-5">
          <Card
            title="Insert New Item"
            subtitle="Fill attributes to persist into Supabase"
            icon={<PlusCircle className="w-5 h-5" />}
          >
            <form id="item-form" onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Item Title"
                id="item-title-input"
                required
                placeholder="e.g. Traditional Jamdani Saree"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormSelect
                  label="Category"
                  id="item-category-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={[
                    { label: 'Textile (Jamdani/Kantha)', value: 'Textile' },
                    { label: 'Pottery & Terracotta', value: 'Pottery' },
                    { label: 'Brass & Metalcraft', value: 'Metalcraft' },
                    { label: 'Woodcraft', value: 'Woodcraft' },
                    { label: 'Traditional Jewelry', value: 'Jewelry' },
                    { label: 'Other Craft', value: 'Other' },
                  ]}
                />

                <FormInput
                  label="Price (BDT)"
                  id="item-price-input"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 1500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <FormTextarea
                label="Description / Notes"
                id="item-desc-input"
                placeholder="Optional artisan notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Button
                id="item-submit-btn"
                type="submit"
                variant="primary"
                loading={submitting}
                loadingText="Saving to Database..."
                icon={<PlusCircle className="w-4 h-4" />}
                className="w-full mt-2"
              >
                Save Record
              </Button>
            </form>
          </Card>
        </div>

        {/* 4. Table Card Lego Block (Exam Task 3) */}
        <div className="lg:col-span-7">
          <Card
            title="Database Records"
            badge={`${items.length} ${items.length === 1 ? 'Record' : 'Records'}`}
            icon={<Layers className="w-5 h-5" />}
            className="bg-surface-container-lowest flex flex-col h-full"
          >
            <DataTable
              id="items-table"
              columns={columns}
              data={items}
              loading={loading}
              onDelete={handleDelete}
              emptyMessage="No records in database yet. Use the form to insert your first record!"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
