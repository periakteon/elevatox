import { type ColumnDef } from "@tanstack/react-table";
import { type BuildingResponsiblePersonData } from "./data-table";
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
import UpdateBuildingResponsiblePersonComponent from "@/components/tanstack-table/firma-bina-sorumlu/duzenle/responsible-person-update";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
import { emitter } from "@/utils/emitter";
import { useAtomValue } from "jotai";
import { roleAtom } from "@/utils/atom";

export const columns: ColumnDef<BuildingResponsiblePersonData>[] = [
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
    accessorKey: "buildingResponsiblePerson",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
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
    accessorKey: "citizenshipId",
    accessorFn: (row) => row.citizenshipId,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
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
          {row.original.citizenshipId}
        </span>
      );
    },
  },
  {
    accessorKey: "taxId",
    accessorFn: (row) => row.taxId,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
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
          {row.original.taxId}
        </span>
      );
    },
  },
  {
    accessorKey: "buildingFloor",
    accessorFn: (row) => row.buildingFloor,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BİNA DURAK SAYISI
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.buildingFloor}
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
  {
    accessorKey: "actions",
    header: ({}) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center truncate text-center font-bold"
        >
          İşlemler
        </Button>
      );
    },
    cell: function Cell({ row }) {
      const roleInfo = useAtomValue(roleAtom);

      const utils = api.useUtils();

      const deleteBuildingResponsiblePerson =
        api.buildingResponsiblePerson.deleteBuildingResponsiblePerson.useMutation(
          {
            onMutate: () => {
              emitter.publish(
                "showNotification",
                "Bina sorumlusu siliniyor...",
              );
            },

            onSuccess: async () => {
              await utils.buildingResponsiblePerson.invalidate();

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
          },
        );
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
                            {row.original.firstName} {row.original.lastName}
                          </span>{" "}
                          adlı bina sorumlusunu silmek istediğinize emin
                          misiniz?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="w-full">
                          Bu işlem geri alınamaz. Silindikten sonra bina
                          sorumlusunun tekrar eklenmesi gerekecektir ve bu işlem
                          için yeni bir form doldurmanız gerekecektir.
                          <span className="mt-2 block">
                            <span className="font-bold text-red-500">
                              UYARI:{" "}
                            </span>
                            Bina sorumlusunu sildiğinizde, bina sorumlusuna ait
                            tüm asansörler de silinecektir.
                          </span>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          KAPAT
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                          onClick={() => {
                            deleteBuildingResponsiblePerson.mutate({
                              userId: row.original.id,
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
