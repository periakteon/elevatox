import { type ColumnDef } from "@tanstack/react-table";
import { type UpdateElevatorTableParams } from "./data-table";
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
import UpdateElevatorModal from "./update-elevator-modal";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<UpdateElevatorTableParams>[] = [
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
  //         <span className="font-medium">{row.index + 1}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "buildingName",
    accessorFn: (row) => row.buildingResponsiblePerson.buildingName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
    accessorKey: "buildingResponsiblePerson",
    accessorFn: (row) =>
      `${row.buildingResponsiblePerson.firstName} ${row.buildingResponsiblePerson.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
          {`${row.original.buildingResponsiblePerson.firstName} ${row.original.buildingResponsiblePerson.lastName}`}
        </span>
      );
    },
  },
  {
    accessorKey: "city",
    accessorFn: (row) => row.buildingResponsiblePerson.city,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
          {row.original.buildingResponsiblePerson.city}
        </span>
      );
    },
  },
  {
    accessorKey: "district",
    accessorFn: (row) => row.buildingResponsiblePerson.district,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
          {row.original.buildingResponsiblePerson.district}
        </span>
      );
    },
  },
  {
    accessorKey: "area",
    accessorFn: (row) => row.buildingResponsiblePerson.area,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
          {row.original.buildingResponsiblePerson.area}
        </span>
      );
    },
  },
  {
    accessorKey: "maintenanceFee",
    accessorFn: (row) => row.maintenanceFee,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BAKIM ÜCRETİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.maintenanceFee}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorSerialNumber",
    accessorFn: (row) => row.elevatorSerialNumber,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SERİ NO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.elevatorSerialNumber}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorType",
    accessorFn: (row) => row.elevatorType,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TİP
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.elevatorType}
        </span>
      );
    },
  },
  {
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
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyId, ...elevator } = row.original;

      return (
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
            <Button variant="link2" className="rounded-full">
              DÜZENLE
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="font-bold text-red-500">
                  {row.original.buildingResponsiblePerson.buildingName}
                </span>{" "}
                adlı asansörü düzenlemektesiniz.
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <UpdateElevatorModal props={elevator} />
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
