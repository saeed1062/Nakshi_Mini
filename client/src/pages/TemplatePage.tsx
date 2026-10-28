import React, { useState } from 'react';
import {
  PageHeader,
  Card,
  FormInput,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormCheckboxGroup,
  FormDateTime,
  FormRadioGroup,
  Button,
  DataTable,
  Column,
  Alert,
  Badge,
} from '../components/ui';
import { PlusCircle, Layers } from 'lucide-react';

/**
 * =========================================================================
 * TEMPLATE PAGE: USE THIS DURING YOUR LAB EVALUATION
 * =========================================================================
 * Instructions:
 * 1. Duplicate this file as e.g. "FeedbackPage.tsx" or "StudentsPage.tsx"
 * 2. Keep the input types assigned in your lab test (Input, DateTime, Checkbox, etc.)
 * 3. Connect to your API (see RecordsPage.tsx for the fetch/create pattern)
 * 4. Add Route in App.tsx and NavLink in Navbar.tsx
 * =========================================================================
 */

interface RecordItem {
  id: string;
  title: string;
  category: string;
  scheduledAt: string;
  priority: string;
  tags: string[];
  isActive: boolean;
  notes?: string;
  createdAt: string;
}

export const TemplatePage: React.FC = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);

  // Form State for all input types
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Option A');
  const [scheduledAt, setScheduledAt] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [tags, setTags] = useState<string[]>(['Urgent']);
  const [isActive, setIsActive] = useState(true);
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const newEntry: RecordItem = {
        id: String(Date.now()),
        title: title.trim(),
        category,
        scheduledAt: scheduledAt || new Date().toISOString(),
        priority,
        tags,
        isActive,
        notes: notes.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      setRecords((prev) => [newEntry, ...prev]);

      // Reset form
      setTitle('');
      setScheduledAt('');
      setNotes('');
      setTags(['Urgent']);
    } catch (err: any) {
      setError(err.message || 'Error saving record');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<RecordItem>[] = [
    {
      header: 'Title',
      render: (row) => (
        <div>
          <div className="font-semibold text-on-surface">{row.title}</div>
          {row.notes && (
            <div className="text-xs text-on-surface-variant line-clamp-1">{row.notes}</div>
          )}
        </div>
      ),
    },
    {
      header: 'Category',
      render: (row) => <Badge variant="default">{row.category}</Badge>,
    },
    {
      header: 'Date & Time',
      render: (row) => (
        <span className="text-xs text-on-surface-variant">
          {row.scheduledAt ? new Date(row.scheduledAt).toLocaleString() : 'N/A'}
        </span>
      ),
    },
    {
      header: 'Priority',
      render: (row) => (
        <Badge
          variant={
            row.priority === 'High'
              ? 'error'
              : row.priority === 'Medium'
              ? 'warning'
              : 'primary'
          }
        >
          {row.priority}
        </Badge>
      ),
    },
    {
      header: 'Tags',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.length > 0 ? (
            row.tags.map((t) => (
              <Badge key={t} variant="primary" className="text-[10px] px-1.5 py-0">
                {t}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-on-surface-variant/60">—</span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <Badge variant={row.isActive ? 'success' : 'default'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageHeader
        eyebrow="Evaluation Template"
        title="Comprehensive Input Showcase"
      />

      {error && <Alert message={error} onDismiss={() => setError(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Insert Form */}
        <div className="lg:col-span-5">
          <Card title="Add Record" icon={<PlusCircle className="w-5 h-5" />}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Text Input */}
              <FormInput
                label="Record Title"
                id="template-title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
              />

              {/* 2. Select Dropdown */}
              <FormSelect
                label="Category"
                id="template-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { label: 'Option A', value: 'Option A' },
                  { label: 'Option B', value: 'Option B' },
                  { label: 'Option C', value: 'Option C' },
                ]}
              />

              {/* 3. Date & Time Input */}
              <FormDateTime
                label="Scheduled Date & Time"
                id="template-datetime"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                helperText="Pick a date and time"
              />

              {/* 4. Radio Group */}
              <FormRadioGroup
                label="Priority Level"
                name="template-priority"
                direction="horizontal"
                selectedValue={priority}
                onChange={setPriority}
                options={[
                  { label: 'Low', value: 'Low' },
                  { label: 'Medium', value: 'Medium' },
                  { label: 'High', value: 'High' },
                ]}
              />

              {/* 5. Checkbox Group (Multi-select) */}
              <FormCheckboxGroup
                label="Tags"
                name="template-tags"
                direction="horizontal"
                selectedValues={tags}
                onChange={setTags}
                options={[
                  { label: 'Urgent', value: 'Urgent' },
                  { label: 'Review', value: 'Review' },
                  { label: 'Approved', value: 'Approved' },
                ]}
              />

              {/* 6. Single Checkbox (Boolean) */}
              <FormCheckbox
                id="template-is-active"
                label="Active Status"
                description="Mark this record as actively published"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />

              {/* 7. Textarea */}
              <FormTextarea
                label="Notes / Description"
                id="template-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional notes..."
              />

              <Button
                type="submit"
                variant="primary"
                loading={submitting}
                className="w-full mt-2"
                icon={<PlusCircle className="w-4 h-4" />}
              >
                Submit Record
              </Button>
            </form>
          </Card>
        </div>

        {/* Display List */}
        <div className="lg:col-span-7">
          <Card
            title="Recorded Entries"
            badge={`${records.length} Entries`}
            icon={<Layers className="w-5 h-5" />}
            className="bg-surface-container-lowest"
          >
            <DataTable
              id="template-table"
              columns={columns}
              data={records}
              onDelete={(id) => setRecords((prev) => prev.filter((r) => r.id !== id))}
              emptyMessage="No records in table yet. Use the form to submit one!"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
