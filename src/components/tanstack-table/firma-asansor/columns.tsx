import { type ColumnDef } from "@tanstack/react-table";
import { type ElevatorTableData } from "./data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import format from "date-fns/format";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import UpdateElevatorModal from "@/components/tanstack-table/firma-asansor/duzenle/update-elevator-modal";
import { Label } from "@/components/ui/label";
import { emitter } from "@/utils/emitter";
import { useAtomValue } from "jotai";
import { roleAtom } from "@/utils/atom";

export const columns: ColumnDef<ElevatorTableData>[] = [
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
          <ArrowUpDown className="ml-2" />
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
    accessorKey: "address",
    accessorFn: (row) => row.buildingResponsiblePerson.address,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
    accessorKey: "phone",
    accessorFn: (row) => row.buildingResponsiblePerson.phone,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
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
          {row.original.buildingResponsiblePerson.phone}
        </span>
      );
    },
  },
  {
    accessorKey: "citizenshipId",
    accessorFn: (row) => row.buildingResponsiblePerson.citizenshipId,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TC NO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.citizenshipId}
        </span>
      );
    },
  },
  {
    accessorKey: "taxId",
    accessorFn: (row) => row.buildingResponsiblePerson.taxId,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VERGİ KİMLİK NO
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.taxId}
        </span>
      );
    },
  },
  {
    accessorKey: "buildingFloor",
    accessorFn: (row) => row.buildingResponsiblePerson.buildingFloor,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA DURAK SAYISI
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingResponsiblePerson.buildingFloor}
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
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {row.original.elevatorSerialNumber}
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
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {row.original.maintenanceFee}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorToUser",
    accessorFn: (row) => row.elevatorToStaff[0]?.staffId ?? "",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BAKIM PERSONELİ
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const staff = api.elevator.getElevatorToUserByStaffId.useQuery({
        elevatorToUserId: row.original.elevatorToStaff[0]?.staffId ?? "",
      });

      return (
        <span className="flex justify-center text-center font-medium">
          {staff.data?.firstName} {staff.data?.lastName}
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
          TÜR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {row.original.elevatorType === "INSAN" ? "İNSAN" : "YÜK"}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorInstallationDate",
    accessorFn: (row) => {
      return format(row.elevatorInstallationDate, "dd/MM/yyyy HH:mm:ss");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          MONTAJ TARİHİ
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {format(row.original.elevatorInstallationDate, "dd/MM/yyyy HH:mm:ss")}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorLastMaintenanceDate",
    accessorFn: (row) => {
      return format(row.elevatorLastMaintenanceDate, "dd/MM/yyyy HH:mm:ss");
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-full w-full font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SON BAKIM TARİHİ
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {format(
            row.original.elevatorLastMaintenanceDate,
            "dd/MM/yyyy HH:mm:ss",
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorCapacityKg",
    accessorFn: (row) => row.elevatorCapacityKg,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KAPASİTE (KG)
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {row.original.elevatorCapacityKg}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorCapacityPerson",
    accessorFn: (row) => row.elevatorCapacityPerson,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KAPASİTE (KİŞİ)
          <ArrowUpDown className="ml-2 h-4 w-10" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center text-center font-medium">
          {row.original.elevatorCapacityPerson}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({}) => {
      return (
        <Button
          variant="ghost"
          className="flex justify-center truncate text-center font-bold"
        >
          İŞLEMLER
        </Button>
      );
    },
    // neden "function Cell" yazdık?
    // https://github.com/TanStack/table/discussions/4205
    cell: function Cell({ row }) {
      const roleInfo = useAtomValue(roleAtom);

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
            description: "Asansör güncellendi.",
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Asansör güncellenirken hata oluştu!",
            description: error.message,
          });
        },
      });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link2"
              className="ml-6 flex h-8 w-8 p-0 data-[state=open]:bg-blue-400"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {roleInfo !== "FIELD_STAFF" ? (
            <DropdownMenuContent align="end" className="w-full">
              <AlertDialog>
                <AlertDialogTrigger className="ml-2 text-sm hover:text-blue-500">
                  <span>Düzenle</span>
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
                      <UpdateElevatorModal props={row.original} />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer bg-red-500 text-white hover:bg-red-600 hover:text-white">
                      <Label>KAPAT</Label>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {roleInfo === "OWNER" ? (
                <>
                  <DropdownMenuSeparator />
                  <AlertDialog>
                    <AlertDialogTrigger className="ml-2 text-sm hover:text-red-500">
                      <span>Sil</span>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <span className="font-bold text-red-500">
                            {
                              row.original.buildingResponsiblePerson
                                .buildingName
                            }
                          </span>{" "}
                          adlı asansörü silmek istediğinize emin misiniz?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          Bu işlem geri alınamaz. Silindikten sonra bina
                          sorumlusunun tekrar eklenmesi gerekecektir ve bu işlem
                          için yeni bir form doldurmanız gerekecektir.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          KAPAT
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                          onClick={() => {
                            deleteElevator.mutate({
                              companyId: row.original.companyId,
                              elevatorId: row.original.id,
                            });
                          }}
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : null}
            </DropdownMenuContent>
          ) : null}
        </DropdownMenu>
      );
    },
  },
];
