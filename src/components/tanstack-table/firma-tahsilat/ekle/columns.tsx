import { type ColumnDef } from "@tanstack/react-table";
import { type IncomingData } from "./data-table";
import { Button } from "@/components/ui/button";
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
import { ArrowUpDown } from "lucide-react";
import AddPaymentComponent from "./add-payment-modal";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<IncomingData>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    accessorKey: "firstName",
    accessorFn: (row) => row.firstName + " " + row.lastName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          AD SOYAD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row.original.firstName + " " + row.original.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "buildingName",
    accessorFn: (row) => row.buildingName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA ADI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.buildingName}</span>;
    },
  },
  {
    accessorKey: "city",
    accessorFn: (row) => row.city,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ŞEHİR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.city}</span>;
    },
  },
  {
    accessorKey: "district",
    accessorFn: (row) => row.district,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          İLÇE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.district}</span>;
    },
  },
  {
    accessorKey: "area",
    accessorFn: (row) => row.area,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BÖLGE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="ffont-medium">{row.original.area}</span>;
    },
  },
  {
    accessorKey: "address",
    accessorFn: (row) => row.address,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ADRES
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.address}</span>;
    },
  },
  {
    accessorKey: "actions",
    accessorFn: (row) => row.id,
    header: ({}) => {
      return (
        <div className="ml-2">
          <span className="ml-4 font-bold">İŞLEMLER</span>
        </div>
      );
    },
    cell: function Cell({ row }) {
      return (
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
            <Button variant="link2" className="font-bold">
              TAHSİLAT EKLE
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-4">
                <span className="mr-1 text-red-500">
                  {row.original.firstName} {row.original.lastName}
                </span>{" "}
                adlı bina sorumlusu için tahsilat kaydı ekliyorsunuz.
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <AddPaymentComponent
                  buildingResponsiblePersonId={row.original.id}
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
