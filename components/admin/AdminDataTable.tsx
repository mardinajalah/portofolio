'use client';

import { useState } from 'react';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowDown, ArrowDownUp, ArrowUp, Plus } from 'lucide-react';

type AdminDataTableProps<TData> = {
  addButtonLabel?: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  isDark: boolean;
  minWidthClassName?: string;
  onAdd?: () => void;
  summary?: string;
  title: string;
};

const getSortIcon = (sortDirection: false | 'asc' | 'desc') => {
  if (sortDirection === 'asc') {
    return <ArrowUp size={13} />;
  }

  if (sortDirection === 'desc') {
    return <ArrowDown size={13} />;
  }

  return <ArrowDownUp size={13} />;
};

export const AdminDataTable = <TData,>({
  addButtonLabel = 'Tambah',
  columns,
  data,
  emptyMessage = 'Belum ada data. Klik Tambah untuk membuat data pertama.',
  isDark,
  minWidthClassName = 'min-w-318.5',
  onAdd,
  summary,
  title,
}: AdminDataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
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
          <p className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Daftar {title}</p>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{summary ?? `${data.length} data tersimpan`}</p>
        </div>
        {onAdd && (
          <button
            type='button'
            onClick={onAdd}
            className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100' : 'border-blue-500/20 bg-blue-500/10 text-blue-700'} px-4 py-3 text-sm font-semibold transition hover:bg-blue-500/20`}
          >
            <Plus size={18} />
            {addButtonLabel}
          </button>
        )}
      </div>

      <div className='overflow-x-auto'>
        <table className={`w-full ${minWidthClassName} table-fixed border-collapse text-left text-sm`}>
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
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
