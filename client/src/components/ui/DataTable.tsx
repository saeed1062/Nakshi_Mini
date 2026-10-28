import React from 'react';
import { Trash2 } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface DataTableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  data: T[];
  id?: string;
  loading?: boolean;
  emptyMessage?: string;
  onDelete?: (id: any) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  id = 'items-table',
  loading = false,
  emptyMessage = 'No records in database yet.',
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto flex-1">
      <table id={id} className="w-full text-left text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant text-xs uppercase border-b border-outline-variant/40">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`py-3 px-3 ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {onDelete && <th className="py-3 px-3 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length + (onDelete ? 1 : 0)}
                className="py-12 text-center text-on-surface-variant text-xs"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-surface-container/50 transition-colors"
            >
              {columns.map((col, idx) => (
                <td
                  key={idx}
                  className={`py-3.5 px-3 ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  } ${col.className || ''}`}
                >
                  {col.render
                    ? col.render(row)
                    : col.accessor
                    ? String(row[col.accessor] ?? '')
                    : null}
                </td>
              ))}
              {onDelete && (
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onDelete(row.id)}
                    title="Delete record"
                    className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/40 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
