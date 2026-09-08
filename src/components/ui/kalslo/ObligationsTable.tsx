"use client";

import { useState } from "react";
import { flexRender, type SortingState } from "@tanstack/react-table";
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  legacyCreateColumnHelper,
} from "@tanstack/react-table/legacy";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { ObligationBadge } from "./ObligationBadge";
import type { ObligationStatus } from "@/lib/content/trade-states";

type Obligation = {
  label: string;
  trigger: string;
  status: ObligationStatus;
};

const columnHelper = legacyCreateColumnHelper<Obligation>();

const statusOrder: Record<ObligationStatus, number> = {
  locked: 0,
  pending: 1,
  settled: 2,
};

export function ObligationsTable({
  obligations,
  labels,
}: {
  obligations: Obligation[];
  labels: { obligation: string; trigger: string; status: string };
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: any[] = [
    columnHelper.accessor("label", {
      header: labels.obligation,
      cell: (info: any) => <span className="font-medium text-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor("trigger", {
      header: labels.trigger,
      cell: (info: any) => <span className="text-muted-foreground">{info.getValue()}</span>,
    }),
    columnHelper.accessor("status", {
      header: labels.status,
      cell: (info: any) => <ObligationBadge status={info.getValue()} />,
      sortFn: (a: any, b: any) =>
        statusOrder[a.original.status as ObligationStatus] - statusOrder[b.original.status as ObligationStatus],
    }),
  ];

  const table = useLegacyTable({
    data: obligations,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-border">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none px-4 py-3 text-left font-label text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  <div className="flex items-center gap-1">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" && <ChevronUp className="h-3 w-3" />}
                    {header.column.getIsSorted() === "desc" && <ChevronDown className="h-3 w-3" />}
                    {!header.column.getIsSorted() && <ChevronsUpDown className="h-3 w-3 opacity-30" />}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}