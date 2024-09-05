import { type ColumnDef } from "@tanstack/react-table";
import { type IncomingData } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import UpdatePaymentComponent from "./update-payment-modal";

export const columns: ColumnDef<IncomingData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   accessorFn: (row, index) => index + 1,
  //   header: ({ column }) => {
  //   header: ({}) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex justify-center truncate text-center font-bold"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //       <div className="my-2 flex justify-center">
  //         <span className="font-bold">ID</span>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div key={row.index + 1} className="my-2 flex justify-center">
  //         <span className="font-medium">{row.index + 1}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    id: "buildingResponsiblePerson.firstName",
    accessorKey: "buildingResponsiblePerson.firstName",
    accessorFn: (row) => row.buildingResponsiblePerson.firstName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          AD SOYAD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.firstName +
            " " +
            row.original.buildingResponsiblePerson.lastName}
        </span>
      );
    },
  },
  {
    id: "buildingResponsiblePerson.buildingName",
    accessorKey: "buildingResponsiblePerson.buildingName",
    accessorFn: (row) => row.buildingResponsiblePerson.buildingName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA ADI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.buildingName}
        </span>
      );
    },
  },
  {
    id: "buildingResponsiblePerson.address",
    accessorKey: "buildingResponsiblePerson.address",
    accessorFn: (row) => row.buildingResponsiblePerson.address,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ADRES
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.address}
        </span>
      );
    },
  },
  {
    id: "paymentAmount",
    accessorKey: "paymentAmount",
    accessorFn: (row) => row.paymentAmount,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TUTAR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.paymentAmount}
        </span>
      );
    },
  },
  {
    id: "paymentDate",
    accessorKey: "paymentDate",
    accessorFn: (row) => {
      return format(row.paymentDate, "dd/MM/yyyy HH:mm:ss");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TAHSİLAT TARİHİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {format(row.original.paymentDate, "dd/MM/yyyy HH:mm:ss")}
        </span>
      );
    },
  },
  {
    id: "staff.firstName",
    accessorKey: "staff.firstName",
    accessorFn: (row) => row.staff.firstName + " " + row.staff.lastName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TAHSİLAT PERSONELİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.staff.firstName + " " + row.original.staff.lastName}
        </span>
      );
    },
  },
  {
    id: "paymentDescription",
    accessorKey: "paymentDescription",
    accessorFn: (row) => row.paymentDescription,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TAHSİLAT AÇIKLAMASI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.paymentDescription?.length ? (
            row.original.paymentDescription
          ) : (
            <span className="text-gray-500">Açıklama Yok</span>
          )}
        </span>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          İŞLEMLER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: function Cell({ row }) {
      return (
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
            <Button
              variant={"link2"}
              className="flex h-full w-full justify-center font-bold"
            >
              <span className="flex justify-center font-medium">DÜZENLE</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-4">
                <span className="mr-1 text-red-500">
                  {row.original.buildingResponsiblePerson.firstName}{" "}
                  {row.original.buildingResponsiblePerson.lastName}
                </span>{" "}
                adlı bina sorumlusu için tahsilat kaydı düzenliyorsunuz.
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <UpdatePaymentComponent
                  paymentId={row.original.id}
                  paymentAmount={row.original.paymentAmount}
                  paymentDate={row.original.paymentDate}
                  paymentDescription={row.original.paymentDescription}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:text-white">
                <Label>KAPAT</Label>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
