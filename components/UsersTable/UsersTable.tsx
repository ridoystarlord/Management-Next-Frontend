import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

import { LinkButton, useButtonClass } from 'components/Button';
import { ROUTES } from 'Routes';
import { MemberListResponse, User } from 'services/users';

type Props = {
  memberListResponse: MemberListResponse;
  token: string;
};

const UsersTable = ({ memberListResponse, token }: Props) => {
  const { result } = memberListResponse;

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
        cell: (rows) => {
          const { name } = rows.row.original;
          return (
            <div className="flex items-center gap-2">
              <span className="font-normal capitalize ">{name}</span>
            </div>
          );
        },
      },

      {
        header: 'Email',
        accessorKey: 'email',
        cell: (rows) => {
          const { email } = rows.row.original;
          return (
            <div className="flex items-center gap-2">
              <span className="font-normal ">{email}</span>
            </div>
          );
        },
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: (rows) => {
          const { phone } = rows.row.original;
          return (
            <div className="flex items-center gap-2">
              <span className="font-normal ">{phone}</span>
            </div>
          );
        },
      },
      {
        header: 'Role',
        accessorKey: 'role',
        cell: (rows) => {
          const { role } = rows.row.original;
          return (
            <div className="flex items-center gap-2">
              <span className="font-normal ">{role}</span>
            </div>
          );
        },
      },
    ],
    [],
  );
  const tableData = React.useMemo(() => result, [result]);
  const table = useReactTable({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // **** Table Def **** //

  return (
    <>
      <div className="table__container__v2">
        <table className="table__network">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="capitalize"
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="text-sm font-light text-gray-600">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTable;
