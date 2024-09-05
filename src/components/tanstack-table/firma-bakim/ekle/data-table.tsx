import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ElevatorQRCODELocation } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface MaintenanceData {
  id: string;
  buildingResponsiblePerson: {
    address: string;
    city: string;
    area: string;
    buildingName: string;
  };
  elevatorQRCode: {
    id: string;
    elevatorLocation: ElevatorQRCODELocation;
  }[];
}

interface DataTableProps<TData extends MaintenanceData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends MaintenanceData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterOption, setFilterOption] = useState("buildingName");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="">
          <div className="flex items-center">
            <Select
              onValueChange={(value) => setFilterOption(value)}
              defaultValue="buildingName"
            >
              <SelectTrigger className="mr-2 w-[200px]">
                <SelectValue placeholder="FİLTRE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buildingName">Bina Adı</SelectItem>
                <SelectItem value="city">Şehir</SelectItem>
                <SelectItem value="area">Bölge</SelectItem>
                <SelectItem value="address">Adres</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`${
                filterOption === "buildingName"
                  ? "Bina Adı"
                  : filterOption === "city"
                    ? "Şehir"
                    : filterOption === "area"
                      ? "Bölge"
                      : "Adres"
              } ile filtrele`}
              value={
                (table.getColumn(filterOption)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterOption)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-end">
        <div className="block">
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => table.resetColumnFilters()}
          >
            Filtrelenmiş Sonuçları Sıfırla
          </Button>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => table.resetSorting()}
          >
            Sıralanmış Sonuçları Sıfırla
          </Button>
          <Button
            variant="outline"
            className="mr-2"
            onClick={() => table.resetRowSelection()}
          >
            Seçilenleri Sıfırla
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="mb-1 ml-auto mt-4 sm:mt-0 lg:mt-0"
            >
              Göster / Gizle
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "id" && "ID"}
                    {column.id === "buildingName" && "Bina Adı"}
                    {column.id === "city" && "Şehir"}
                    {column.id === "area" && "Bölge"}
                    {column.id === "address" && "Adres"}
                    {column.id === "actions" && "İşlemler"}
                  </DropdownMenuCheckboxItem>
                );
              })}
            <Button
              variant="link2"
              className="mt-2 w-full"
              onClick={() => table.resetColumnVisibility()}
            >
              Tümünü Göster
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 flex-1 text-sm text-muted-foreground"></div>
      <div className="rounded-md border">
        <div className="relative h-full max-h-[70vh] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 border-b-2 bg-secondary">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-left"
                  >
                    Asansör bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="block items-center justify-end space-x-2 py-4 sm:flex">
        <div className="mb-4 flex justify-center space-x-2 sm:mb-0">
          <Select
            defaultValue={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[65px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="200">200</SelectItem>
              <SelectItem value="500">500</SelectItem>
              <SelectItem value="1000">1000</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronFirst />
          </Button>
          <Button
            variant="ghost"
            className="rounded border p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronLast />
          </Button>
        </div>
        <strong className="hidden md:hidden lg:block">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </strong>
        {/* Mobil görünümde gizle */}
        <span className="ml-4 hidden items-center gap-1 md:hidden lg:flex">
          | Sayfaya Git:
          <Input
            type="number"
            disabled={table.getState().pagination.pageIndex === 1}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        {/* Mobil görünümde gizle */}
        <div className="flex space-x-2 md:flex">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft /> Önceki Sayfa
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sonraki Sayfa <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
