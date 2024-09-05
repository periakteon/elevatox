import { type ColumnDef } from "@tanstack/react-table";
import { type KabinUstuMaintenanceByParams } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import format from "date-fns/format";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
import UpdateKabinUstuMaintenanceModal from "./update-kabin-ustu-maintenance-modal";
import { emitter } from "@/utils/emitter";
import { useAtomValue } from "jotai";
import { roleAtom } from "@/utils/atom";

export const columns: ColumnDef<KabinUstuMaintenanceByParams>[] = [
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
  //         <span className="flex justify-center font-medium">
  //           {row.index + 1}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "staff",
    accessorFn: (row) => `${row.staff.firstName} ${row.staff.lastName}`,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BAKIM YAPAN PERSONEL
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {`${row.original.staff.firstName} ${row.original.staff.lastName}`}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    // https://github.com/TanStack/table/issues/3138
    accessorFn: (row) => {
      return format(row.createdAt, "dd/MM/yyyy HH:mm:ss");
    },
    enableSorting: true,
    invertSorting: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BAKIM TARİHİ
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {" "}
          {format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss")}
        </span>
      );
    },
  },
  {
    accessorKey: "speedRegulator",
    accessorFn: (row) => (row.speedRegulator ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          HIZ REGÜLATÖRÜ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.speedRegulator ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "counterWeight",
    accessorFn: (row) => (row.counterWeight ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KARŞI AĞIRLIK
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.counterWeight ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorCabin",
    accessorFn: (row) => (row.elevatorCabin ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ASANSÖR KABİNİ
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.elevatorCabin ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "stationEntrance",
    accessorFn: (row) => (row.stationEntrance ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DURAK GİRİŞİ
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.stationEntrance ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "elevatorCabinDoor",
    accessorFn: (row) => (row.elevatorCabinDoor ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ASANSÖR KABİN KAPISI
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.elevatorCabinDoor ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "floorLevel",
    accessorFn: (row) => (row.floorLevel ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KAT SEVİYESİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.floorLevel ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "borderSecurityBreaker",
    accessorFn: (row) => (row.borderSecurityBreaker ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SINIR GÜVENLİĞİ KESİCİSİ
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.borderSecurityBreaker ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "emergencyAlarm",
    accessorFn: (row) => (row.emergencyAlarm ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ACİL ALARM TERTİBATI
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.emergencyAlarm ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "stopControls",
    accessorFn: (row) => (row.stopControls ? "Yapıldı" : "Yapılmadı"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DURAK KUMANDALARI VE GÖSTERGELERİ
          <ArrowUpDown className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.stopControls ? "YAPILDI" : "YAPILMADI"}
        </span>
      );
    },
  },
  {
    accessorKey: "additionalNote",
    accessorFn: (row) => row.additionalNote,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          EK NOT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.additionalNote ? row.original.additionalNote : "-"}
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
    cell: function Cell({ row }) {
      const roleInfo = useAtomValue(roleAtom);

      const nonNullableAdditionalNote = {
        ...row.original,
        additionalNote: row.original.additionalNote ?? "",
      };

      const utils = api.useUtils();

      const deleteMaintenance =
        api.maintenance.deleteKabinUstuMaintenance.useMutation({
          onMutate: () => {
            emitter.publish("showNotification", "Bakım kaydı siliniyor...");
          },
          onSuccess: async () => {
            await utils.maintenance.invalidate();

            toast({
              variant: "done",
              title: "Başarılı!",
              description: "Bakım kaydı silindi!",
            });
          },
          onError: (error) => {
            toast({
              variant: "destructive",
              title: "Bakım kaydı silinirken bir hata oluştu!",
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
                        {format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss")}{" "}
                      </span>{" "}
                      tarihli{" "}
                      <span className="font-bold text-red-500">Kabin Üstü</span>{" "}
                      bakımını düzenlemektesiniz.
                    </AlertDialogTitle>
                    <AlertDialogDescription className="w-full">
                      <UpdateKabinUstuMaintenanceModal
                        props={nonNullableAdditionalNote}
                        kabinUstuId={row.original.id}
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
                            {format(
                              row.original.createdAt,
                              "dd/MM/yyyy HH:mm:ss",
                            )}{" "}
                          </span>{" "}
                          tarihli bakımı silmek istediğinize emin misiniz?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          Bu işlem geri alınamaz. Silindikten sonra bakımın
                          tekrar eklenmesi gerekecektir ve bu işlem için yeni
                          bir form doldurmanız gerekecektir.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          KAPAT
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                          onClick={() => {
                            deleteMaintenance.mutate({
                              kabinUstuMaintenanceId: row.original.id,
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
