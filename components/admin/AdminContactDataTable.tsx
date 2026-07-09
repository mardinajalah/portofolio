'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownUp, Loader2, Pencil, Trash2 } from 'lucide-react';
import { ContactCard, contactIconOptions } from '@/lib/contact-info-utils';

type AdminContactDataTableProps = {
  cards: ContactCard[];
  deletingCardId: string;
  isSaving: boolean;
  onDelete: (cardId: string) => void;
  onEdit: (card: ContactCard) => void;
};

const iconLabels = Object.fromEntries(contactIconOptions.map((option) => [option.value, option.label]));

export const AdminContactDataTable = ({
  cards,
  deletingCardId,
  isSaving,
  onDelete,
  onEdit,
}: AdminContactDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ContactCard>[]>(
    () => [
      {
        accessorKey: 'order',
        header: 'Urutan',
        cell: ({ row }) => <span className='font-semibold text-gray-200'>{row.original.order}</span>,
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => (
          <span
            className={`inline-flex rounded-lg border px-3 py-1.5 text-sm font-semibold ${
              row.original.isActive
                ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                : 'border-gray-700 bg-gray-900 text-gray-400'
            }`}
          >
            {row.original.isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        ),
      },
      {
        accessorKey: 'icon',
        header: 'Icon',
        cell: ({ row }) => <span className='text-gray-200'>{iconLabels[row.original.icon] ?? row.original.icon}</span>,
      },
      {
        id: 'label',
        accessorFn: (card) => `${card.label.id} ${card.label.en}`,
        header: 'Label',
        cell: ({ row }) => (
          <div>
            <p className='font-semibold text-gray-100'>{row.original.label.id}</p>
            <p className='mt-1 text-xs text-gray-500'>{row.original.label.en}</p>
          </div>
        ),
      },
      {
        id: 'value',
        accessorFn: (card) => `${card.value.id} ${card.value.en}`,
        header: 'Value',
        cell: ({ row }) => (
          <div>
            <p className='max-w-64 truncate font-semibold text-gray-100'>{row.original.value.id}</p>
            <p className='mt-1 max-w-64 truncate text-xs text-gray-500'>{row.original.value.en}</p>
          </div>
        ),
      },
      {
        accessorKey: 'href',
        header: 'Link URL',
        cell: ({ row }) => <p className='max-w-72 truncate text-gray-300'>{row.original.href || '-'}</p>,
      },
      {
        id: 'actions',
        enableSorting: false,
        header: 'Aksi',
        cell: ({ row }) => (
          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={() => onEdit(row.original)}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 font-semibold text-blue-200 transition hover:bg-blue-500/20'
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              type='button'
              onClick={() => onDelete(row.original.id)}
              disabled={isSaving || deletingCardId === row.original.id}
              className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {deletingCardId === row.original.id ? (
                <Loader2
                  className='animate-spin'
                  size={16}
                />
              ) : (
                <Trash2 size={16} />
              )}
              Hapus
            </button>
          </div>
        ),
      },
    ],
    [deletingCardId, isSaving, onDelete, onEdit],
  );

  const table = useReactTable({
    columns,
    data: cards,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className='mt-6 overflow-x-auto rounded-xl border border-gray-800'>
      <table className='w-full min-w-245 border-collapse bg-black/20 text-left text-sm'>
        <thead className='bg-gray-950/70 text-xs uppercase tracking-[0.12em] text-gray-500'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-4 font-semibold'
                >
                  {header.isPlaceholder ? null : (
                    <button
                      type='button'
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={!header.column.getCanSort()}
                      className={`inline-flex items-center gap-2 text-left ${
                        header.column.getCanSort() ? 'cursor-pointer text-gray-400 hover:text-blue-200' : 'cursor-default'
                      }`}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <ArrowDownUp size={13} />}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='divide-y divide-gray-800'>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='align-top transition hover:bg-gray-900/35'
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='px-4 py-4'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className='px-4 py-10 text-center text-sm text-gray-500'
              >
                Belum ada card kontak. Klik Tambah Card untuk membuat card pertama.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
