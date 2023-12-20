"use client";

import React from "react";
import { DBMessage } from "@/app/api/get-messages/route";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type MessagesListDataTableProps = {
  user: string;
  messages: DBMessage[];
  setCurrentMessage: React.Dispatch<React.SetStateAction<DBMessage>>;
  setSingleMessageView: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: () => void;
};

const columns: ColumnDef<DBMessage>[] = [
  {
    accessorKey: "from.email",
    header: "From",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "text",
    header: "Text",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];

const MessagesListDataTable = ({
  user,
  messages,
  setCurrentMessage,
  setSingleMessageView,
  refresh,
}: MessagesListDataTableProps) => {
  return <></>;
};

export default MessagesListDataTable;
