import { type ColumnDef } from "@tanstack/react-table";
import { type MaintenanceData } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, QrCode } from "lucide-react";
import { useRouter } from "next/router";

export const columns: ColumnDef<MaintenanceData>[] = [
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
  //   // header: ({ column }) => {
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
  //         <span className="flex justify-center font-medium">
  //           {row.index + 1}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "buildingResponsiblePerson",
    accessorFn: (row) =>
      `${row.buildingResponsiblePerson.firstName} ${row.buildingResponsiblePerson.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA SORUMLUSU AD SOYAD
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
    accessorKey: "buildingName",
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
    accessorKey: "address",
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
    accessorKey: "area",
    accessorFn: (row) => row.buildingResponsiblePerson.area,
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
          {row.original.buildingResponsiblePerson.area}
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
          {row.original.buildingResponsiblePerson.district}
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
          className="flex h-full w-full justify-center font-bold"
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
    accessorKey: "actions",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    header: ({ column }) => {
      return (
        <div className="ml-2">
          <span className="ml-4 font-bold">İŞLEMLER</span>
        </div>
      );
    },
    cell: function Cell({ row }) {
      const router = useRouter();

      return (
        <Button
          className="flex flex-row"
          onClick={() => void router.push(`/bakim/${row.original.id}`)}
        >
          <QrCode />
          <span>QR KOD GÖRÜNTÜLE</span>
        </Button>
      );
    },
  },
];
