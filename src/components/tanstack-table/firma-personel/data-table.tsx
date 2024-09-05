import {
  type ColumnDef,
  type SortingState,
  flexRender,
  type ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import format from "date-fns/format";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export interface StaffData {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  userId: string;
  staffCompanyId: string;
  isActive: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string | undefined;
  role: "OWNER" | "OFFICE_STAFF" | "FIELD_STAFF";
}

interface DataTableProps<TData extends StaffData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends StaffData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "role", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterOption, setFilterOption] = useState("firstName");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = (
    staffData: (string | false | undefined)[][],
    fileName: string,
  ) => {
    const ws = XLSX.utils.json_to_sheet(staffData);
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "FOTOĞRAF",
          "AD",
          "SOYAD",
          "TELEFON NUMARASI",
          "E-POSTA ADRESİ",
          "ROL",
          "AKTİFLİK DURUMU",
          "KAYIT TARİHİ",
        ],
      ],
      { origin: "A1", cellStyles: true },
    );
    ws["!cols"] = [{ wch: 10 }, { wch: 50 }, { wch: 20 }, { wch: 20 }];
    const wb: XLSX.WorkBook = {
      Sheets: { data: ws },
      SheetNames: ["data"],
      Props: {
        CreatedDate: new Date(),
        Language: "tr-TR",
        Keywords: `Personel Listesi, ${new Date().toLocaleDateString()}`,
        Application: "ElevatoX",
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    FileSaver.saveAs(data, fileName + ".xlsx");
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <div className="">
          <div className="flex items-center">
            <Select
              onValueChange={(value) => setFilterOption(value)}
              defaultValue="firstName"
            >
              <SelectTrigger className="mr-2 w-[130px]">
                <SelectValue placeholder="FİLTRE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="firstName">Ad</SelectItem>
                <SelectItem value="lastName">Soyad</SelectItem>
                <SelectItem value="phone">Telefon</SelectItem>
                <SelectItem value="email">E-posta</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`${
                filterOption === "firstName"
                  ? "Ad"
                  : filterOption === "lastName"
                    ? "Soyad"
                    : filterOption === "phone"
                      ? "Telefon"
                      : filterOption === "email"
                        ? "E-posta"
                        : ""
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
          <DropdownMenuContent align="end">
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
                    {column.id === "avatar" && "FOTOĞRAF"}
                    {column.id === "firstName" && "AD"}
                    {column.id === "lastName" && "SOYAD"}
                    {column.id === "phone" && "TELEFON"}
                    {column.id === "email" && "E-POSTA"}
                    {column.id === "role" && "ROL"}
                    {column.id === "role" && "PERSONEL TÜRÜ"}
                    {column.id === "isActive" && "AKTİFLİK DURUMU"}
                    {column.id === "createdAt" && "KAYIT TARİHİ"}
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
      <div className="mt-4 flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} personel seçildi.
      </div>
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
                    Personel bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="mt-4 block">
        <Button
          className={`mb-2 ml-2 rounded border bg-green-600 p-2 hover:bg-green-700 dark:text-white ${!table.getFilteredSelectedRowModel().rows.length && "cursor-not-allowed opacity-50"}`}
          onClick={() => {
            const selectedData = table
              .getFilteredSelectedRowModel()
              .rows.map((row) => [
                row.original.avatar,
                row.original.firstName,
                row.original.lastName,
                row.original.phone,
                row.original.email,
                (row.original.role === "OFFICE_STAFF" && "OFİS PERSONELİ") ||
                  (row.original.role === "FIELD_STAFF" && "SAHA PERSONELİ") ||
                  (row.original.role === "OWNER" && "PATRON"),
                row.original.isActive ? "AKTİF" : "PASİF",
                format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss"),
              ]);

            if (selectedData.length) {
              exportToCSV(
                selectedData,
                `${new Date().toLocaleDateString()} - Seçili Personel Listesi`,
              );
            }
          }}
        >
          <Download className="mr-2" /> ({" "}
          {table.getFilteredSelectedRowModel().rows.length} ) SEÇİLENLERİ
          EXCEL&apos;E AKTAR
        </Button>
        <Button
          // variant="outline"
          className="mb-2 ml-2 rounded border bg-green-600 p-2 text-white hover:bg-green-700 dark:text-white"
          onClick={() => {
            const allData = table
              // .getRowModel()
              .getCoreRowModel()
              .rows.map((row) => [
                row.original.avatar,
                row.original.firstName,
                row.original.lastName,
                row.original.phone,
                row.original.email,
                (row.original.role === "OFFICE_STAFF" && "OFİS PERSONELİ") ||
                  (row.original.role === "FIELD_STAFF" && "SAHA PERSONELİ") ||
                  (row.original.role === "OWNER" && "PATRON"),
                row.original.isActive ? "AKTİF" : "PASİF",
                format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss"),
              ]);

            exportToCSV(
              allData,
              `${new Date().toLocaleDateString()} - Personel Listesi`,
            );
          }}
        >
          <Download className="mr-2" /> TÜMÜNÜ EXCEL&apos;E AKTAR
        </Button>
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
