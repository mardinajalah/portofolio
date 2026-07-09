'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowDown, ArrowDownUp, ArrowUp, Loader2, Pencil, Trash2 } from 'lucide-react';
import { ContactCard, contactIconOptions } from '@/lib/contact-info-utils';

type AdminContactDataTableProps = {
  cards: ContactCard[];
  deletingCardId: string;
  isSaving: boolean;
  onDelete: (cardId: string) => void;
  onEdit: (card: ContactCard) => void;
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

export const AdminContactDataTable = ({ cards, deletingCardId, isSaving, onDelete, onEdit }: AdminContactDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<ContactCard>[]>(
    () => [
      {
        accessorKey: 'order',
        header: 'Urutan',
        size: 86,
        cell: ({ row }) => <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700/70 bg-gray-950/60 font-semibold text-gray-200'>{row.original.order}</span>,
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        size: 118,
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              row.original.isActive ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-gray-700 bg-gray-900 text-gray-400'
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
        cell: ({ row }) => <span className='inline-flex max-w-full items-center rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-xs font-semibold text-blue-100'>{iconLabels[row.original.icon] ?? row.original.icon}</span>,
      },
      {
        id: 'label',
        accessorFn: (card) => `${card.label.id} ${card.label.en}`,
        header: 'Label',
        size: 210,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p
              className='truncate font-semibold text-gray-100'
              title={row.original.label.id}
            >
              {row.original.label.id}
            </p>
            <p
              className='mt-1 truncate text-xs text-gray-500'
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
              className='truncate font-semibold text-gray-100'
              title={row.original.value.id}
            >
              {row.original.value.id}
            </p>
            <p
              className='mt-1 truncate text-xs text-gray-500'
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
            className='truncate text-gray-300'
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
              className='inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 text-xs font-semibold text-blue-200 transition hover:bg-blue-500/20'
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              type='button'
              onClick={() => onDelete(row.original.id)}
              disabled={isSaving || deletingCardId === row.original.id}
              className='inline-flex cursor-pointer h-9 items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60'
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
    <div className='mt-6 overflow-hidden rounded-xl border border-gray-800 bg-gray-950/30 shadow-lg shadow-black/10'>
      <div className='flex items-center justify-between gap-3 border-b border-gray-800 bg-gray-950/50 px-4 py-3'>
        <div>
          <p className='text-sm font-semibold text-gray-100'>Daftar card kontak</p>
          <p className='mt-1 text-xs text-gray-500'>{cards.length} card tersimpan</p>
        </div>
        <span className='rounded-full border border-gray-700 bg-black/20 px-3 py-1 text-xs font-semibold text-gray-400'>TanStack Table</span>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-318.5 table-fixed border-collapse text-left text-sm'>
          <thead className='bg-gray-950/80 text-xs uppercase tracking-[0.12em] text-gray-500'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`border-b border-gray-800 px-4 py-3 font-semibold ${header.column.id === 'actions' ? 'text-center' : 'text-left'}`}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <button
                        type='button'
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                        className={`inline-flex w-full items-center gap-2 text-left transition ${header.column.id === 'actions' ? 'justify-center' : 'justify-start'} ${
                          header.column.getCanSort() ? 'cursor-pointer text-gray-400 hover:text-blue-200' : 'cursor-default text-gray-500'
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
          <tbody className='divide-y divide-gray-800/80'>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='align-middle transition odd:bg-black/10 hover:bg-blue-500/5'
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
                  className='px-4 py-12 text-center text-sm text-gray-500'
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
