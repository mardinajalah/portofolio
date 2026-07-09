'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowDown, ArrowDownUp, ArrowUp, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { ContactCard, contactIconOptions } from '@/lib/contact-info-utils';

type AdminContactDataTableProps = {
  cards: ContactCard[];
  deletingCardId: string;
  isDark: boolean;
  isSaving: boolean;
  onDelete: (cardId: string) => void;
  onEdit: (card: ContactCard) => void;
  addCard: () => void
};

const iconLabels = Object.fromEntries(contactIconOptions.map((option) => [option.value, option.label]));

const getSortIcon = (sortDirection: false | 'asc' | 'desc') => {
  if (sortDirection === 'asc') {
    return <ArrowUp size={13} />;
  }

  if (sortDirection === 'desc') {
    return <ArrowDown size={13} />;
  }

  return <ArrowDownUp size={13} />;
};

export const AdminContactDataTable = ({ cards, deletingCardId, isDark, isSaving, onDelete, onEdit, addCard }: AdminContactDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ContactCard>[]>(
    () => [
      {
        accessorKey: 'order',
        header: 'Urutan',
        size: 86,
        cell: ({ row }) => (
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border font-semibold ${isDark ? 'border-gray-700/70 bg-gray-950/60 text-gray-200' : 'border-gray-300 bg-white/50 text-gray-800'}`}>
            {row.original.order}
          </span>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        size: 118,
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              row.original.isActive
                ? isDark
                  ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                : isDark
                  ? 'border-gray-700 bg-gray-900 text-gray-400'
                  : 'border-gray-300 bg-white/50 text-gray-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${row.original.isActive ? 'bg-emerald-300' : 'bg-gray-500'}`} />
            {row.original.isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        ),
      },
      {
        accessorKey: 'icon',
        header: 'Icon',
        size: 140,
        cell: ({ row }) => (
          <span className={`inline-flex max-w-full items-center rounded-lg border px-3 py-2 text-xs font-semibold ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100' : 'border-blue-500/20 bg-blue-500/10 text-blue-700'}`}>
            {iconLabels[row.original.icon] ?? row.original.icon}
          </span>
        ),
      },
      {
        id: 'label',
        accessorFn: (card) => `${card.label.id} ${card.label.en}`,
        header: 'Label',
        size: 210,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p
              className={`truncate font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
              title={row.original.label.id}
            >
              {row.original.label.id}
            </p>
            <p
              className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
              title={row.original.label.en}
            >
              {row.original.label.en}
            </p>
          </div>
        ),
      },
      {
        id: 'value',
        accessorFn: (card) => `${card.value.id} ${card.value.en}`,
        header: 'Value',
        size: 280,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p
              className={`truncate font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
              title={row.original.value.id}
            >
              {row.original.value.id}
            </p>
            <p
              className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
              title={row.original.value.en}
            >
              {row.original.value.en}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'href',
        header: 'Link URL',
        size: 260,
        cell: ({ row }) => (
          <p
            className={`truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            title={row.original.href || '-'}
          >
            {row.original.href || '-'}
          </p>
        ),
      },
      {
        id: 'actions',
        enableSorting: false,
        header: 'Aksi',
        size: 180,
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-2'>
            <button
              type='button'
              onClick={() => onEdit(row.original)}
              className={`inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition hover:bg-blue-500/20 ${
                isDark ? 'border-blue-400/30 bg-blue-500/10 text-blue-200' : 'border-blue-500/30 bg-blue-500/10 text-blue-700'
              }`}
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              type='button'
              onClick={() => onDelete(row.original.id)}
              disabled={isSaving || deletingCardId === row.original.id}
              className={`inline-flex cursor-pointer h-9 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                isDark ? 'border-red-400/30 bg-red-500/10 text-red-200' : 'border-red-500/30 bg-red-500/10 text-red-700'
              }`}
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
    [deletingCardId, isDark, isSaving, onDelete, onEdit],
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
    <div className={`rounded-2xl border p-5 shadow-lg md:p-7 ${isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'}`}>
      <div className='flex items-center justify-between gap-3 px-4 py-3'>
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Daftar card kontak</p>
          <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{cards.length} card tersimpan</p>
        </div>
        <button
          type='button'
          onClick={addCard}
          className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100' : 'border-blue-500/20 bg-blue-500/10 text-blue-700'} px-4 py-3 text-sm font-semibold transition hover:bg-blue-500/20`}
        >
          <Plus size={18} />
          Tambah
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-318.5 table-fixed border-collapse text-left text-sm'>
          <thead className={`text-xs uppercase tracking-[0.12em] ${isDark ? 'bg-gray-950/80 text-gray-500' : 'bg-white/40 text-gray-500'}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`border-b px-4 py-3 font-semibold ${isDark ? 'border-gray-800' : 'border-gray-300'} ${header.column.id === 'actions' ? 'text-center' : 'text-left'}`}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type='button'
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                        className={`inline-flex w-full items-center gap-2 text-left transition ${header.column.id === 'actions' ? 'justify-center' : 'justify-start'} ${
                          header.column.getCanSort()
                            ? isDark
                              ? 'cursor-pointer text-gray-400 hover:text-blue-200'
                              : 'cursor-pointer text-gray-600 hover:text-blue-600'
                            : isDark
                              ? 'cursor-default text-gray-500'
                              : 'cursor-default text-gray-500'
                        }`}
                      >
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                        {header.column.getCanSort() && <span className='text-gray-600'>{getSortIcon(header.column.getIsSorted())}</span>}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={isDark ? 'divide-y divide-gray-800/80' : 'divide-y divide-gray-300/80'}>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`align-middle transition ${isDark ? 'odd:bg-black/10 hover:bg-blue-500/5' : 'odd:bg-white/20 hover:bg-blue-500/10'}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-4 ${cell.column.id === 'actions' ? 'text-right' : ''}`}
                      style={{ width: cell.column.getSize() }}
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
                  className={`px-4 py-12 text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
                >
                  Belum ada card kontak. Klik Tambah Card untuk membuat card pertama.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
