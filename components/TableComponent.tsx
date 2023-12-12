import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { UrlType } from '@/app/type/type';



interface TableComponentProps {
  rows: UrlType[];
}

const columns = [
  { key: "Link", label: "LINK" },
  { key: "Route", label: "SHORTCUT" },
  { key: "View", label: "Views" },
  { key: "Action", label: "" },
];

const TableComponent: React.FC<TableComponentProps> = ({ rows }) => {
  const deleteRow = async (id: number) => {
    const response = await axios.post("/api/deleteUrl", id);
    toast.success("Deleted Successfully");
  };

 

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.link}</TableCell>
            <TableCell>
              <Link className="underline" href={`${process.env.siteUrl}${row.route}`}>
                {`${process.env.siteUrl}${row.route}`}
              </Link>
            </TableCell>
            <TableCell>{row.view}</TableCell>
            <TableCell>
              <div className="flex gap-4 justify-end">
                <Button color="danger" onClick={() => deleteRow(row.id as number)}>
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;