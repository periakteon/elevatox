/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import { type ColumnDef } from "@tanstack/react-table";
import format from "date-fns/format";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { type StaffData } from "./data-table";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<StaffData>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Hepsini seç"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Satırı seç"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    accessorFn: (row) => row.avatar,
    header: () => <span className="font-bold">FOTOĞRAF</span>,
    cell: ({ row }) => (
      <div key={row.index} className="flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger>
            {row.original.avatar ? (
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
            ) : null}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-center">
                <span className="mr-1 text-red-500">
                  {row.original.firstName} {row.original.lastName}
                </span>{" "}
                adlı personelin fotoğrafı.
              </AlertDialogTitle>
              <AlertDialogDescription className="flex justify-center">
                {row.original.avatar ? (
                  <div className="mt-4 h-[450px] w-[450px]">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={row.original.avatar}
                        alt="Personel Fotoğrafı"
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                ) : null}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>KAPAT</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
  {
    accessorKey: `firstName`,
    accessorFn: (row) => row.firstName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          AD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.firstName}
        </span>
      );
    },
  },
  {
    accessorKey: `lastName`,
    accessorFn: (row) => row.lastName,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SOYAD
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {row.original.lastName}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    accessorFn: (row) => row.phone,
    header: () => <span className="truncate font-bold">TELEFON NUMARASI</span>,
    cell: ({ row }) => {
      return (
        <a
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          href={`tel:${row.original.phone}`}
          className="flex justify-center font-medium"
        >
          {row.original.phone}
        </a>
      );
    },
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.email,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex h-full w-full justify-center font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E-POSTA
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <a
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          href={`mailto:${row.original.email}`}
          className="flex justify-center font-medium"
        >
          {row.original.email}
        </a>
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
          className="flex h-full w-full justify-center text-center font-bold"
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
    accessorKey: "createdAt",
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
          KAYIT TARİHİ
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="flex justify-center font-medium">
          {format(row.original.createdAt, "dd/MM/yyyy HH:mm:ss")}
        </span>
      );
    },
  },
  // {
  //   accessorKey: "actions",
  //   header: () => (
  //     <span className="flex justify-center truncate text-center font-bold">
  //       İŞLEMLER
  //     </span>
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex justify-center">
  //         <AlertDialog>
  //           <AlertDialogTrigger className="flex justify-center truncate text-center font-semibold">
  //             <Button variant="link2">PERSONELİ DÜZENLE</Button>
  //           </AlertDialogTrigger>
  //           <AlertDialogContent>
  //             <AlertDialogHeader>
  //               <AlertDialogTitle className="mb-4 flex justify-center">
  //                 <span className="mr-1 text-red-500">
  //                   {row.getValue(`firstName`)} {row.getValue(`lastName`)}
  //                 </span>{" "}
  //                 adlı personeli düzenliyorsunuz.
  //               </AlertDialogTitle>
  //               <AlertDialogDescription className="w-full">
  //                 <UpdateStaffComponent
  //                   email={row.getValue("email")}
  //                   firstName={row.getValue("firstName")}
  //                   lastName={row.getValue("lastName")}
  //                   phone={row.getValue("phone")}
  //                   role={row.getValue("role")}
  //                   isActive={row.getValue("isActive")}
  //                   avatar={row.getValue("avatar")}
  //                   userId={row.getValue("userId")}
  //                 />
  //               </AlertDialogDescription>
  //             </AlertDialogHeader>
  //             <AlertDialogFooter>
  //               <AlertDialogCancel className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
  //                 <Label>KAPAT</Label>
  //               </AlertDialogCancel>
  //             </AlertDialogFooter>
  //           </AlertDialogContent>
  //         </AlertDialog>
  //       </div>
  //     );
  //   },
  // },
];
