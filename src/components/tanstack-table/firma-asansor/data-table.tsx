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
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Download,
} from "lucide-react";
import format from "date-fns/format";
import { api } from "@/utils/api";

export interface ElevatorTableData {
  buildingResponsiblePerson: {
    address: string;
    area: string;
    buildingFloor: string;
    buildingName: string;
    citizenshipId: string;
    city: string;
    district: string;
    firstName: string;
    lastName: string;
    phone: string;
    taxId: string;
  };
  elevatorToStaff: {
    id: string;
    staffId: string;
  }[];
  elevatorCapacityKg: string | null;
  elevatorCapacityPerson: string | null;
  elevatorInstallationDate: Date;
  elevatorLastMaintenanceDate: Date;
  elevatorSerialNumber: string;
  elevatorType: "INSAN" | "YUK";
  id: string;
  companyId: string;
  maintenanceFee: string;
}

interface DataTableProps<TData extends ElevatorTableData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends ElevatorTableData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterOption, setFilterOption] = useState("buildingResponsiblePerson");
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

  const selectedStaff = api.elevator.getElevatorToUserByStaffIds.useQuery({
    elevatorToUserIds: table
      .getFilteredSelectedRowModel()
      .rows.flatMap((row) =>
        row.original.elevatorToStaff.map((e) => e.staffId),
      ),
  });

  const allStaff = api.elevator.getElevatorToUserByStaffIds.useQuery({
    elevatorToUserIds: table
      .getFilteredRowModel()
      .rows.flatMap((row) =>
        row.original.elevatorToStaff.map((e) => e.staffId),
      ),
  });

  const exportToCSV = (staffData: (string | null)[][], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(staffData);
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "BİNA SORUMLUSU AD SOYAD",
          "BİNA ADI",
          "ŞEHİR",
          "İLÇE",
          "BÖLGE",
          "ADRES",
          "TELEFON",
          "TC NO",
          "VERGİ KİMLİK NO",
          "BİNA DURAK SAYISI",
          "SERİ NO",
          "BAKIM ÜCRETİ",
          "BAKIM SORUMLUSU",
          "TÜR",
          "MONTAJ TARİHİ",
          "SON BAKIM TARİHİ",
          "KAPASİTE (KG)",
          "KAPASİTE (KİŞİ)",
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
        Keywords: `Asansör Listesi, ${new Date().toLocaleDateString()}`,
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
              defaultValue="buildingResponsiblePerson"
            >
              <SelectTrigger className="mr-2 w-[200px]">
                <SelectValue placeholder="FİLTRE" />
              </SelectTrigger>
              <SelectContent className="h-80 overflow-y-auto">
                <SelectItem value="buildingResponsiblePerson">
                  Ad Soyad
                </SelectItem>
                <SelectItem value="buildingName">Bina Adı</SelectItem>
                <SelectItem value="city">Şehir</SelectItem>
                <SelectItem value="district">İlçe</SelectItem>
                <SelectItem value="area">Bölge</SelectItem>
                <SelectItem value="address">Adres</SelectItem>
                <SelectItem value="phone">Telefon No</SelectItem>
                <SelectItem value="citizenshipId">TC No</SelectItem>
                <SelectItem value="taxId">Vergi Kimlik No</SelectItem>
                <SelectItem value="buildingFloor">Bina Durak Sayısı</SelectItem>
                <SelectItem value="elevatorSerialNumber">Seri No</SelectItem>
                <SelectItem value="maintenanceFee">Bakım Ücreti</SelectItem>
                <SelectItem value="elevatorToUser">Bakım Personeli</SelectItem>
                <SelectItem value="elevatorType">Tür</SelectItem>
                <SelectItem value="elevatorInstallationDate">
                  Montaj Tarihi
                </SelectItem>
                <SelectItem value="elevatorLastMaintenanceDate">
                  Son Bakım Tarihi
                </SelectItem>
                <SelectItem value="elevatorCapacityKg">
                  Kapasite (kg)
                </SelectItem>
                <SelectItem value="elevatorCapacityPerson">
                  Kapasite (kişi)
                </SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`${
                filterOption === "buildingResponsiblePerson"
                  ? "Ad Soyad"
                  : filterOption === "buildingName"
                    ? "Bina Adı"
                    : filterOption === "city"
                      ? "Şehir"
                      : filterOption === "district"
                        ? "İlçe"
                        : filterOption === "area"
                          ? "Bölge"
                          : filterOption === "address"
                            ? "Adres"
                            : filterOption === "phone"
                              ? "Telefon No"
                              : filterOption === "citizenshipId"
                                ? "TC No"
                                : filterOption === "taxId"
                                  ? "Vergi Kimlik No"
                                  : filterOption === "buildingFloor"
                                    ? "Bina Durak Sayısı"
                                    : filterOption === "elevatorSerialNumber"
                                      ? "Seri No"
                                      : filterOption === "maintenanceFee"
                                        ? "Bakım Ücreti"
                                        : filterOption === "elevatorToUser"
                                          ? "Bakım Personeli"
                                          : filterOption === "elevatorType"
                                            ? "Tür"
                                            : filterOption ===
                                                "elevatorInstallationDate"
                                              ? "Montaj Tarihi"
                                              : filterOption ===
                                                  "elevatorLastMaintenanceDate"
                                                ? "Son Bakım Tarihi"
                                                : filterOption ===
                                                    "elevatorCapacityKg"
                                                  ? "Kapasite (kg)"
                                                  : filterOption ===
                                                      "elevatorCapacityPerson"
                                                    ? "Kapasite (kişi)"
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
          <DropdownMenuContent align="end" className="h-80 overflow-y-auto">
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
                    {/* {column.id === "id" && "ID"} */}
                    {column.id === "buildingResponsiblePerson" &&
                      "Bina Sorumlusu"}
                    {column.id === "buildingName" && "Bina Adı"}
                    {column.id === "city" && "Şehir"}
                    {column.id === "district" && "İlçe"}
                    {column.id === "area" && "Bölge"}
                    {column.id === "address" && "Adres"}
                    {column.id === "phone" && "Telefon"}
                    {column.id === "citizenshipId" && "T.C. No"}
                    {column.id === "taxId" && "Vergi Kimlik No"}
                    {column.id === "buildingFloor" && "Bina Durak Sayısı"}
                    {column.id === "elevatorSerialNumber" && "Seri No"}
                    {column.id === "maintenanceFee" && "Bakım Ücreti"}
                    {column.id === "elevatorToUser" && "Bakım Sorumlusu"}
                    {column.id === "elevatorType" && "Tür"}
                    {column.id === "elevatorInstallationDate" &&
                      "Montaj Tarihi"}
                    {column.id === "elevatorLastMaintenanceDate" &&
                      "Son Bakım Tarihi"}
                    {column.id === "elevatorCapacityKg" && "Kapasite (KG)"}
                    {column.id === "elevatorCapacityPerson" &&
                      "Kapasite (KİŞİ)"}
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
      <div className="mt-4 flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} /{" "}
        {table.getFilteredRowModel().rows.length} asansör seçildi.
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
                    Asansör bulunamadı.
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
                `${row.original.buildingResponsiblePerson.firstName} ${row.original.buildingResponsiblePerson.lastName}`,
                row.original.buildingResponsiblePerson.buildingName,
                row.original.buildingResponsiblePerson.city,
                row.original.buildingResponsiblePerson.district,
                row.original.buildingResponsiblePerson.area,
                row.original.buildingResponsiblePerson.address,
                row.original.buildingResponsiblePerson.phone,
                row.original.buildingResponsiblePerson.citizenshipId,
                row.original.buildingResponsiblePerson.taxId,
                row.original.buildingResponsiblePerson.buildingFloor,
                row.original.elevatorSerialNumber,
                row.original.maintenanceFee,
                selectedStaff.data?.find(
                  (e) => e.id === row.original.elevatorToStaff[0]?.staffId,
                )?.firstName +
                  " " +
                  selectedStaff.data?.find(
                    (e) => e.id === row.original.elevatorToStaff[0]?.staffId,
                  )?.lastName,
                row.original.elevatorType,
                format(
                  row.original.elevatorInstallationDate,
                  "dd/MM/yyyy HH:mm:ss",
                ),
                format(
                  row.original.elevatorLastMaintenanceDate,
                  "dd/MM/yyyy HH:mm:ss",
                ),
                row.original.elevatorCapacityKg,
                row.original.elevatorCapacityPerson,
              ]);

            if (selectedData.length) {
              exportToCSV(
                selectedData,
                `${new Date().toLocaleDateString()} - Seçili Asansör Listesi`,
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
          className="mb-2 ml-2 rounded border bg-green-600 p-2 hover:bg-green-700 dark:text-white"
          onClick={() => {
            const allData = table
              .getCoreRowModel()
              .rows.map((row) => [
                `${row.original.buildingResponsiblePerson.firstName} ${row.original.buildingResponsiblePerson.lastName}`,
                row.original.buildingResponsiblePerson.buildingName,
                row.original.buildingResponsiblePerson.city,
                row.original.buildingResponsiblePerson.district,
                row.original.buildingResponsiblePerson.area,
                row.original.buildingResponsiblePerson.address,
                row.original.buildingResponsiblePerson.phone,
                row.original.buildingResponsiblePerson.citizenshipId,
                row.original.buildingResponsiblePerson.taxId,
                row.original.buildingResponsiblePerson.buildingFloor,
                row.original.elevatorSerialNumber,
                row.original.maintenanceFee,
                allStaff.data?.find(
                  (e) => e.id === row.original.elevatorToStaff[0]?.staffId,
                )?.firstName +
                  " " +
                  allStaff.data?.find(
                    (e) => e.id === row.original.elevatorToStaff[0]?.staffId,
                  )?.lastName,
                row.original.elevatorType,
                format(
                  row.original.elevatorInstallationDate,
                  "dd/MM/yyyy HH:mm:ss",
                ),
                format(
                  row.original.elevatorLastMaintenanceDate,
                  "dd/MM/yyyy HH:mm:ss",
                ),
                row.original.elevatorCapacityKg,
                row.original.elevatorCapacityPerson,
              ]);

            exportToCSV(
              allData,
              `${new Date().toLocaleDateString()} - Asansör Listesi`,
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
