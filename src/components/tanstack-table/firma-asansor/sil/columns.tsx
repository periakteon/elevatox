import { type ColumnDef } from "@tanstack/react-table";
import { type DeleteElevatorTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
import { emitter } from "@/utils/emitter";

export const columns: ColumnDef<DeleteElevatorTable>[] = [
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
      const utils = api.useUtils();

      const deleteElevator = api.elevator.deleteElevator.useMutation({
        onMutate: () => {
          emitter.publish("showNotification", "Asansör siliniyor...");
        },

        onSuccess: async () => {
          await utils.elevator.invalidate();
          await utils.maintenance.invalidate();

          toast({
            variant: "done",
            title: "Başarılı!",
            description: "Bina sorumlusu silindi.",
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Bina sorumlusu silinirken bir hata oluştu!",
            description: error.message,
          });
        },
      });

      return (
        <AlertDialog>
          <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
            <Button variant="destructive" className="rounded-full">
              SİL
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="font-bold text-red-500">
                  {row.original.buildingResponsiblePerson.buildingName}
                </span>{" "}
                asansörü silmek istediğinize emin misiniz?
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                Bu işlem geri alınamaz. Silindikten sonra asansörün tekrar
                eklenmesi gerekecektir ve bu işlem için yeni bir form
                doldurmanız gerekecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                KAPAT
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                onClick={() =>
                  deleteElevator.mutate({
                    companyId: row.original.companyId,
                    elevatorId: row.original.id,
                  })
                }
              >
                Sil
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
