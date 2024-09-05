import { type ColumnDef } from "@tanstack/react-table";
import { type EditBuildingResponsiblePerson } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
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
import UpdateBuildingResponsiblePersonComponent from "./responsible-person-update";
import { Label } from "@/components/ui/label";
import format from "date-fns/format";

export const columns: ColumnDef<EditBuildingResponsiblePerson>[] = [
  // {
  //   accessorKey: "id",
  //   accessorFn: (row, index) => index + 1,
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         className="flex h-full w-full justify-center truncate text-center font-bold"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div key={row.index + 1} className="my-2 flex justify-center">
  //         <span className="flex justify-center font-medium">
  //           {row.index + 1}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "buildingResponsiblePerson",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA SORUMLUSU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {`${row.original.firstName} ${row.original.lastName}`}
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
          {row.original.buildingName}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="font-bold">
          İŞLEMLER
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant="link2"
              className="flex h-full w-full justify-center rounded-full text-center font-bold"
            >
              {" "}
              DÜZENLE
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="font-bold text-red-500">
                  {`${row.original.firstName} ${row.original.lastName}`}
                </span>{" "}
                adlı bina sorumlusunu düzenlemektesiniz.
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <UpdateBuildingResponsiblePersonComponent
                  props={row.original}
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
  {
    accessorKey: "city",
    accessorFn: (row) => row.city,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ŞEHİR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.city}
        </span>
      );
    },
  },
  {
    accessorKey: "district",
    accessorFn: (row) => row.district,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          İLÇE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.district}
        </span>
      );
    },
  },
  {
    accessorKey: "area",
    accessorFn: (row) => row.area,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BÖLGE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.area}
        </span>
      );
    },
  },
  {
    accessorKey: "address",
    accessorFn: (row) => row.address,
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
          {row.original.address}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    accessorFn: (row) => row.phone,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TELEFON NO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.phone}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    accessorFn: (row) => {
      return format(row.createdAt, "dd/MM/yyyy HH:mm:ss");
    },
    invertSorting: true,
    enableSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KAYIT TARİHİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss")}
        </span>
      );
    },
  },
];
