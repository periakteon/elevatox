import { type ColumnDef } from "@tanstack/react-table";
import { type MaintenanceData } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import transformLocation from "@/utils/transform-location";

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
  //         <span className="flex justify-center font-medium">
  //           {row.index + 1}
  //         </span>
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
          className="flex h-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA ADI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row.original.buildingResponsiblePerson.buildingName}
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
          className="flex h-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ŞEHİR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row.original.buildingResponsiblePerson.city}
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
          className="flex h-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BÖLGE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row.original.buildingResponsiblePerson.area}
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
          className="flex h-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ADRES
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row.original.buildingResponsiblePerson.address}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    accessorFn: (row) => row.elevatorQRCode,
    header: () => {
      return (
        <div className="ml-2">
          <span className="ml-4 font-bold">İŞLEMLER</span>
        </div>
      );
    },
    cell: function Cell({ row }) {
      const router = useRouter();

      const orderedElevatorQRCode = row.original.elevatorQRCode.sort((a, b) => {
        if (a.elevatorLocation < b.elevatorLocation) {
          return -1;
        }
        if (a.elevatorLocation > b.elevatorLocation) {
          return 1;
        }
        return 0;
      });

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link2">BAKIM EKLE</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="flex flex-col">
              {orderedElevatorQRCode.length === 0 && (
                <span className="text-center text-sm font-medium">
                  Bu binaya ait QR kod bulunamadı.
                </span>
              )}
              {orderedElevatorQRCode.map((item) => (
                <Button
                  variant={"ghost"}
                  key={item.id}
                  className="flex justify-between"
                  onClick={() => void router.push(`/bakim/qr/${item.id}`)}
                >
                  <span className="font-medium">
                    {transformLocation(item.elevatorLocation)}
                  </span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
