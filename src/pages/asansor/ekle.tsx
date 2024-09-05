import { type MyPage } from "@/components/layouts/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { companyInfoAtom } from "@/utils/atom";
import { emitter } from "@/utils/emitter";
import { addElevatorSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import { useAtomValue } from "jotai";
import {
  ArrowUp01,
  ArrowUp10,
  CalendarIcon,
  CalendarPlus,
  Check,
  ChevronsUpDown,
  Cog,
  FileDigit,
  Loader2,
  PersonStanding,
  PlusCircle,
  Receipt,
  Save,
  User,
  XCircle,
} from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

const AddElevator: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const router = useRouter();

  const utils = api.useUtils();

  const { focus } = router.query;

  const [showAddElevatorSection, setShowAddElevatorSection] =
    useState<boolean>(false);

  const buildingResponsiblePersonList =
    api.buildingResponsiblePerson.getBuildingResponsiblePersonList.useQuery();

  const staffList = api.company.getCompanyStaffList.useQuery();

  const addElevator = api.elevator.addElevator.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Asansör ekleniyor...");
    },

    onSuccess: async () => {
      await utils.elevator.invalidate();
      await utils.maintenance.invalidate();

      toast({
        variant: "done",
        title: "Asansör başarıyla eklendi!",
        description: "Yönlendiriliyorsunuz...",
      });

      setTimeout(() => {
        void router.push("/asansor");
      }, 2000);
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Asansör eklenirken bir hata oluştu!",
        description: error.message,
      });
    },
  });

  const addElevatorForm = useForm<z.infer<typeof addElevatorSchema>>({
    resolver: zodResolver(addElevatorSchema),
  });

  function addElevatorSubmit(data: z.infer<typeof addElevatorSchema>) {
    addElevator.mutate(data);
  }

  useEffect(() => {
    if (focus === "true") {
      setShowAddElevatorSection(true);
    }
  }, [focus]);

  return (
    <>
      <Head>
        <title>
          Asansör Ekle | {companyInfo?.companyInfo?.name} - ElevatoX
        </title>
      </Head>
      <div className="p-4 sm:ml-64">
        <div className="mt-16 rounded-lg p-0">
          <Card>
            <CardHeader>
              <CardTitle>Asansör Ekle</CardTitle>
              <CardDescription>
                Asansör eklemek için hem asansör bilgilerini hem de bina ve
                sorumlu bilgilerini girmeniz gerekmektedir.{" "}
                <span className="font-semibold text-red-500">
                  Eksik bilgiler girmeniz durumunda asansör ekleme işlemi
                  gerçekleşmeyecektir.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <>
                <Button
                  type="button"
                  className={`mr-2 inline-flex items-center rounded-lg ${
                    !showAddElevatorSection
                      ? "bg-green-600 hover:bg-green-500 focus:ring-green-200 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800"
                      : "bg-red-600 hover:bg-red-500 focus:ring-red-200 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800"
                  } px-3 py-1.5 text-center text-xs font-medium text-white focus:outline-none focus:ring-4`}
                  onClick={() =>
                    setShowAddElevatorSection(!showAddElevatorSection)
                  }
                >
                  {!showAddElevatorSection ? (
                    <PlusCircle className="mr-2" />
                  ) : (
                    <PlusCircle className="mr-2 rotate-45 transform" />
                  )}
                  Asansör Ekle
                </Button>
                {showAddElevatorSection && (
                  <Form {...addElevatorForm}>
                    <form
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={addElevatorForm.handleSubmit(addElevatorSubmit)}
                      className="w-2/3 space-y-6"
                    >
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.buildingResponsiblePerson.id"
                        render={({ field }) => (
                          <FormItem className="mt-4 flex flex-col">
                            {" "}
                            <FormLabel>
                              <PersonStanding
                                size={22}
                                className="mb-1 inline"
                              />{" "}
                              Bina Sorumlusu
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[300px] justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? buildingResponsiblePersonList?.data?.find(
                                          (person) => person.id === field.value,
                                        )?.buildingName
                                      : "Bina sorumlusu seçiniz"}
                                    {field.value &&
                                      buildingResponsiblePersonList?.data?.find(
                                        (person) => person.id === field.value,
                                      ) && (
                                        <>
                                          {" - "}
                                          {
                                            buildingResponsiblePersonList.data.find(
                                              (person) =>
                                                person.id === field.value,
                                            )?.area
                                          }
                                        </>
                                      )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="z-10 w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Bina sorumlusu ara..." />
                                  <CommandEmpty>
                                    Bina sorumlusu bulunamadı.
                                  </CommandEmpty>
                                  <CommandGroup className="max-h-64 overflow-y-auto">
                                    {buildingResponsiblePersonList.isLoading ? (
                                      <CommandItem value="Yükleniyor...">
                                        <Loader2 className="ml-auto h-4 w-4" />
                                      </CommandItem>
                                    ) : null}
                                    {buildingResponsiblePersonList.isError ? (
                                      <CommandItem value="Bir hata oluştu">
                                        <XCircle className="ml-auto h-4 w-4" />
                                      </CommandItem>
                                    ) : null}
                                    {!buildingResponsiblePersonList.isLoading &&
                                      !buildingResponsiblePersonList.isError &&
                                      buildingResponsiblePersonList?.data?.map(
                                        (person) => (
                                          <CommandItem
                                            value={person.buildingName}
                                            key={person.id}
                                            onSelect={() => {
                                              addElevatorForm.clearErrors(
                                                "elevator.buildingResponsiblePerson.id",
                                              );
                                              addElevatorForm.setValue(
                                                "elevator.buildingResponsiblePerson.id",
                                                person.id,
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                person.id === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {`${person.buildingName} - ${
                                              person.firstName +
                                              " " +
                                              person.lastName
                                            } / ${person.area}`}
                                          </CommandItem>
                                        ),
                                      )}
                                  </CommandGroup>
                                  <Button
                                    variant={"link2"}
                                    className="mt-3 w-full"
                                    onClick={() =>
                                      void router.push("/bina-sorumlulari/ekle")
                                    }
                                  >
                                    Bina Sorumlusu Ekle
                                  </Button>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.staff.id"
                        render={({ field }) => (
                          <FormItem className="mt-4 flex flex-col">
                            {" "}
                            <FormLabel>
                              <User size={22} className="mb-1 inline" /> Asansör
                              Bakım Personeli
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[300px] justify-between",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? staffList?.data?.staff?.find(
                                          (person) => person.id === field.value,
                                        )?.firstName
                                      : "Bakım personelini seçiniz"}
                                    {field.value &&
                                      staffList?.data?.staff?.find(
                                        (person) => person.id === field.value,
                                      ) && (
                                        <>
                                          {" "}
                                          {
                                            staffList?.data?.staff?.find(
                                              (person) =>
                                                person.id === field.value,
                                            )?.lastName
                                          }
                                        </>
                                      )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="z-10 w-[300px] p-0">
                                <Command>
                                  <CommandInput placeholder="Bakım personeli ara..." />
                                  <CommandEmpty>
                                    Bakım personeli bulunamadı.
                                  </CommandEmpty>
                                  <CommandGroup className="max-h-64 overflow-y-auto">
                                    {staffList.isLoading ? (
                                      <CommandItem value="Yükleniyor...">
                                        <Loader2 className="ml-auto h-4 w-4" />
                                      </CommandItem>
                                    ) : null}
                                    {staffList.isError ? (
                                      <CommandItem value="Bir hata oluştu">
                                        <XCircle className="ml-auto h-4 w-4" />
                                      </CommandItem>
                                    ) : null}
                                    {!staffList.isLoading &&
                                      !staffList.isError &&
                                      staffList?.data?.staff?.map((person) => (
                                        <CommandItem
                                          value={`${
                                            person.firstName +
                                            " " +
                                            person.lastName
                                          }`}
                                          key={person.id}
                                          onSelect={() => {
                                            addElevatorForm.clearErrors(
                                              "elevator.staff.id",
                                            );
                                            addElevatorForm.setValue(
                                              "elevator.staff.id",
                                              person.id,
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              person.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                            )}
                                          />
                                          {`${person.firstName} ${person.lastName}`}
                                        </CommandItem>
                                      ))}
                                  </CommandGroup>
                                  <Button
                                    variant={"link2"}
                                    className="mt-3 w-full"
                                    onClick={() =>
                                      void router.push("/personel/ekle")
                                    }
                                  >
                                    Personel Ekle
                                  </Button>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorSerialNumber"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>
                              <FileDigit size={22} className="mb-1 inline" />{" "}
                              Asansör Seri Numarası
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="örn. 591859125198371258"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Asansörün seri numarasını giriniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorType"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>
                              <Cog size={22} className="mb-1 inline" />
                              Asansör Türü
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Asansör türünü seçiniz..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="INSAN">İnsan</SelectItem>
                                <SelectItem value="YUK">Yük</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Asansörün türünü seçiniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.maintenanceFee"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>
                              <Receipt size={22} className="mb-1 inline" />{" "}
                              Bakım Ücreti
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="örn. 250" {...field} />
                            </FormControl>
                            <FormDescription>
                              Asansörün bakım ücretini giriniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorCapacityKg"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>
                              <ArrowUp10 size={22} className="mb-1 inline" />{" "}
                              Asansör Kapasitesi (kg) (Opsiyonel)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="örn. 320" {...field} />
                            </FormControl>
                            <FormDescription>
                              Asansörün kapasitesini giriniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorCapacityPerson"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>
                              <ArrowUp01 size={22} className="mb-1 inline" />{" "}
                              Asansör Kapasitesi (kişi) (Opsiyonel)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="örn. 4" {...field} />
                            </FormControl>
                            <FormDescription>
                              Asansörün kaç kişilik olduğunu giriniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorInstallationDate"
                        render={({ field }) => (
                          <FormItem className="mt-4 flex flex-col">
                            <FormLabel>
                              <CalendarPlus size={22} className="mb-1 inline" />{" "}
                              Montaj Tarihi
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: tr })
                                    ) : (
                                      <span>Bir tarih seçiniz</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  locale={tr}
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Asansörün montaj tarihini seçiniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addElevatorForm.control}
                        name="elevator.elevatorLastMaintenanceDate"
                        render={({ field }) => (
                          <FormItem className="mt-4 flex flex-col">
                            <FormLabel>
                              <CalendarPlus size={22} className="mb-1 inline" />{" "}
                              Asansörün Son Bakımının Yapıldığı Tarih
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[240px] pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP", { locale: tr })
                                    ) : (
                                      <span>Bir tarih seçiniz</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  locale={tr}
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Asansörün montaj tarihini seçiniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className={cn(
                          "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white sm:w-1/4",
                          addElevator.isError &&
                            "cursor-not-allowed bg-red-600 hover:bg-red-500",
                          addElevator.isSuccess && "cursor-not-allowed",
                        )}
                        disabled={
                          addElevator.isLoading || addElevator.isSuccess
                        }
                      >
                        {!addElevator.isLoading &&
                          !addElevator.isSuccess &&
                          !addElevator.isError && (
                            <span className="ml-1 flex">
                              Asansör Ekle
                              <Save className="ml-1" />
                            </span>
                          )}
                        {addElevator.isLoading && (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        )}
                        {addElevator.isSuccess && <Check className="h-5 w-5" />}
                        {addElevator.isError && (
                          <XCircle color="#fff" className="h-5 w-5" />
                        )}
                      </Button>
                    </form>{" "}
                  </Form>
                )}
              </>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddElevator;
AddElevator.Layout = "Main";
