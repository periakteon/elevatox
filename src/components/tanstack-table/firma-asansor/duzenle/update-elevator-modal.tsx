import citiesByCountry from "@/(common)/cities-by-country";
import SkeletonForForms from "@/components/fallback/skeleton-for-forms";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { updateElevatorSchema } from "@/utils/schemas";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  AlignHorizontalSpaceAround,
  ArrowUp01,
  ArrowUp10,
  Building,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Cog,
  FileDigit,
  Fingerprint,
  Globe2,
  Loader2,
  Map,
  MapPin,
  Receipt,
  Save,
  Smartphone,
  User,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { type UpdateElevatorTableParams } from "./data-table";
import { emitter } from "@/utils/emitter";

type UpdateElevatorModalPropsWithoutCompanyId = Omit<
  UpdateElevatorTableParams,
  "companyId"
>;

export default function UpdateElevatorModal({
  props,
}: {
  props: UpdateElevatorModalPropsWithoutCompanyId;
}) {
  const user = useUser();

  const router = useRouter();

  const utils = api.useUtils();

  const staffList = api.company.getCompanyStaffList.useQuery();

  const updateElevator = api.elevator.updateElevator.useMutation({
    onMutate: () => {
      emitter.publish("showNotification", "Asansör düzenleniyor...");
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

  const form = useForm<z.infer<typeof updateElevatorSchema>>({
    resolver: zodResolver(updateElevatorSchema),
    values: {
      buildingResponsiblePerson: {
        address: props.buildingResponsiblePerson.address,
        area: props.buildingResponsiblePerson.area,
        buildingFloor: props.buildingResponsiblePerson.buildingFloor,
        buildingName: props.buildingResponsiblePerson.buildingName,
        city: props.buildingResponsiblePerson.city,
        citizenshipId: props.buildingResponsiblePerson.citizenshipId,
        district: props.buildingResponsiblePerson.district,
        firstName: props.buildingResponsiblePerson.firstName,
        lastName: props.buildingResponsiblePerson.lastName,
        phone: props.buildingResponsiblePerson.phone,
        taxId: props.buildingResponsiblePerson.taxId,
      },
      elevator: {
        elevatorInstallationDate: props.elevatorInstallationDate,
        elevatorLastMaintenanceDate: props.elevatorLastMaintenanceDate,
        elevatorCapacityKg: props.elevatorCapacityKg ?? "",
        elevatorCapacityPerson: props.elevatorCapacityPerson ?? "",
        elevatorSerialNumber: props.elevatorSerialNumber,
        elevatorType: props.elevatorType,
        maintenanceFee: props.maintenanceFee,
        id: props.id,
        staff: {
          id: props.elevatorToStaff[0]?.id ?? "",
          staffId: props.elevatorToStaff[0]?.staffId ?? "",
        },
      },
    },
  });

  function onSubmit(data: z.infer<typeof updateElevatorSchema>): void {
    void updateElevator.mutate(data);
  }

  if (user.user === undefined || !user.isLoaded) {
    return (
      <div className="mx-auto mt-32 w-2/6 items-center justify-center">
        <SkeletonForForms />
      </div>
    );
  }

  return (
    <>
      {user && (
        <div className="h-[450px] w-full overflow-y-auto">
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="elevator.staff.staffId"
                render={({ field }) => (
                  <FormItem className="ml-2 mt-4 flex flex-col">
                    {" "}
                    <FormLabel>
                      <User size={22} className="mb-1 inline" /> Asansör Bakım
                      Personeli
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
                                      (person) => person.id === field.value,
                                    )?.lastName
                                  }
                                </>
                              )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-50 w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Bakım personeli ara..." />
                          <CommandEmpty>
                            Bakım personeli bulunamadı.
                          </CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-y-auto">
                            {staffList?.data?.staff?.map((person) => (
                              <CommandItem
                                value={`${
                                  person.firstName + " " + person.lastName
                                }`}
                                key={person.id}
                                onSelect={() => {
                                  form.clearErrors("elevator.staff.staffId");
                                  form.setValue(
                                    "elevator.staff.staffId",
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
                            onClick={() => void router.push("/personel/ekle")}
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
                control={form.control}
                name="buildingResponsiblePerson.firstName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu Adı</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Ahmet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.lastName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <User size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu Soyadı</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Yılmaz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.phone"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Smartphone size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu Telefon No</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. +905551112233" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.citizenshipId"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Fingerprint size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina Sorumlusu TC No</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 10629861925" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.taxId"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Fingerprint size={22} className="mb-1 inline" />
                      <Label className="ml-1">
                        Bina Sorumlusu Vergi Kimlik No
                      </Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 10629861925" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.city"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    {" "}
                    <FormLabel>
                      <Globe2 size={22} className="mb-1 inline" />
                      <Label className="ml-1">Şehir</Label>
                    </FormLabel>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "ml-2 w-[300px] justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? citiesByCountry.Turkey.find(
                                  (city) =>
                                    city.toLowerCase() ===
                                    field.value.toLowerCase(),
                                )
                              : "Şehir seçiniz"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="z-[99] w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Şehir ara..." />
                          <CommandEmpty>Şehir bulunamadı.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-y-auto">
                            {citiesByCountry.Turkey.map((city) => (
                              <CommandItem
                                value={city}
                                key={city}
                                onSelect={() => {
                                  form.clearErrors(
                                    "buildingResponsiblePerson.city",
                                  );
                                  form.setValue(
                                    "buildingResponsiblePerson.city",
                                    city,
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    city === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {city}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.district"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Map size={22} className="mb-1 inline" />
                      <Label className="ml-1">İlçe</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Ümraniye" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.area"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Map size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bölge</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Şirintepe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.buildingName"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Building size={22} className="mb-1 inline" />
                      <Label className="ml-1">Bina İsmi</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. Yılmaz Apartmanı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.address"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <MapPin size={22} className="mb-1 inline" />
                      <Label className="ml-1">Adres</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="örn. X mahallesi Z sokak"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buildingResponsiblePerson.buildingFloor"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <AlignHorizontalSpaceAround
                        size={22}
                        className="mb-1 inline"
                      />
                      <Label className="ml-1">Bina Durak Sayısı</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorSerialNumber"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <FileDigit size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Seri No</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.maintenanceFee"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Receipt size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Bakım Ücreti</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorCapacityKg"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <ArrowUp10 size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Kapasitesi (kg)</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorCapacityPerson"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <ArrowUp01 size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Kapasitesi (kişi)</Label>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="örn. 8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorInstallationDate"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel className="block">
                      <CalendarIcon size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Montaj Tarihi</Label>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={tr}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorLastMaintenanceDate"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel className="block">
                      <CalendarIcon size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Son Bakım Tarihi</Label>
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
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          locale={tr}
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elevator.elevatorType"
                render={({ field }) => (
                  <FormItem className="mx-2">
                    <FormLabel>
                      <Cog size={22} className="mb-1 inline" />
                      <Label className="ml-1">Asansör Türü</Label>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className={cn(
                  "w-full bg-green-600 text-white hover:bg-green-500 hover:text-white",
                  updateElevator.isError && "bg-red-600 hover:bg-red-500",
                )}
                disabled={updateElevator.isLoading || updateElevator.isError}
              >
                {!updateElevator.isLoading && !updateElevator.isError && (
                  <span className="ml-1 flex">
                    Güncelle
                    <Save size={20} className="ml-1" />
                  </span>
                )}
                {updateElevator.isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}
                {updateElevator.isError && (
                  <XCircle color="#fff" className="h-5 w-5" />
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
