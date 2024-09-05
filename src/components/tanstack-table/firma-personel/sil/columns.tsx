import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { type DeletePersonel } from "./data-table";
import { api } from "@/utils/api";
import { emitter } from "@/utils/emitter";
import { toast } from "@/components/ui/use-toast";
import { useAtomValue } from "jotai";
import { roleAtom } from "@/utils/atom";

export const columns: ColumnDef<DeletePersonel>[] = [
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
    accessorKey: "avatar",
    accessorFn: (row) => row.avatar,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FOTOĞRAF
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.avatar && (
            <div className="mt-4 h-[50px] w-[50px]">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={row.original.avatar}
                  alt="Personel Fotoğrafı"
                  fill
                  className="rounded-full object-cover"
                />
              </AspectRatio>
            </div>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.firstName + " " + row.lastName,
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
          {row.original.firstName} {row.original.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "role",
    accessorFn: (row) =>
      row.role === "OWNER"
        ? "Firma Sahibi"
        : row.role === "FIELD_STAFF"
          ? "Saha Personeli"
          : "Ofis Personeli",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ROL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.role === "OWNER" ? (
            <Badge className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900 hover:bg-red-100">
              FİRMA SAHİBİ
            </Badge>
          ) : row.original.role === "FIELD_STAFF" ? (
            <Badge className="rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold text-blue-900 hover:bg-blue-100">
              SAHA PERSONELİ
            </Badge>
          ) : (
            <Badge className="rounded-full bg-purple-200 px-3 py-1 text-xs font-semibold text-purple-900 hover:bg-purple-100">
              OFİS PERSONELİ
            </Badge>
          )}
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
          TELEFON
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
    accessorKey: "isActive",
    accessorFn: (row) => (row.isActive === true ? "Aktif" : "Pasif"),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DURUM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.isActive ? (
            <Badge className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900 hover:bg-green-100">
              AKTİF
            </Badge>
          ) : (
            <Badge className="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900 hover:bg-red-100">
              PASİF
            </Badge>
          )}
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
      const userRole = useAtomValue(roleAtom);

      const rowRole = row.original.role;

      if (userRole !== "OWNER" && rowRole === "OWNER") return null;

      const utils = api.useUtils();

      const deleteStaff = api.company.deleteStaff.useMutation({
        onMutate: () => {
          emitter.publish("showNotification", "Personel siliniyor...");
        },

        onSuccess: async () => {
          await utils.company.invalidate();

          toast({
            variant: "done",
            title: "Başarılı!",
            description: `Personel başarıyla silindi!`,
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Personel silinirken bir hata oluştu!",
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
                  {row.original.firstName} {row.original.lastName}
                </span>{" "}
                adlı personeli silmek istediğinize emin misiniz?
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                Bu işlem geri alınamaz. Silindikten sonra personelin tekrar
                kayıt olması gerekecektir ve bu işlem için yeni bir link
                oluşturmanız gerekecektir.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                KAPAT
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
                onClick={() =>
                  deleteStaff.mutate({
                    userId: row.original.userId,
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
