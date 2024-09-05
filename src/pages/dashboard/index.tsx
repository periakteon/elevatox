import { type MyPage } from "@/components/layouts/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

import {
  AlertCircleIcon,
  ClockIcon,
  Cog,
  HistoryIcon,
  LineChart as LineChartIcon,
  Users,
  Wrench,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { endOfYear, startOfYear } from "date-fns";
import format from "date-fns/format";
import { tr } from "date-fns/locale";
import { useAtomValue } from "jotai";
import { companyInfoAtom } from "@/utils/atom";
import Head from "next/head";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorComponent from "@/components/error";

const ResponsiveCalendar = dynamic(
  () => import("@nivo/calendar").then((m) => m.ResponsiveCalendar),
  { ssr: false },
);

type KeyValueTotalCount =
  | {
      value: number;
      day: string;
    }[]
  | undefined;

const Index: MyPage = () => {
  const companyInfo = useAtomValue(companyInfoAtom);

  const { resolvedTheme } = useTheme();

  const { isLoading, isFetching, isLoadingError, isError, error, data } =
    api.company.getDailyMaintenanceCount.useQuery();

  if (isError || isLoadingError) {
    return (
      <ErrorComponent error={error.message} errorCode={error.data?.code} />
    );
  }

  return (
    <>
      <Head>
        <title>Anasayfa | {companyInfo?.companyInfo.name} - ElevatoX</title>
      </Head>
      <div className="p-4 sm:ml-64">
        <div className="mt-16 rounded-lg border-2 bg-slate-50 dark:bg-slate-900">
          <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/personel">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Toplam Şirket Personeli
                      </CardTitle>
                      <Users
                        className={cn(
                          "h-4 w-4",
                          resolvedTheme === "dark"
                            ? "text-white"
                            : "text-slate-500",
                        )}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading || isFetching ? (
                          <Skeleton className="h-5 w-1/6" />
                        ) : (
                          data?.staffCount ?? 0
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/bina-sorumlulari">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Toplam Bina Sorumlusu
                      </CardTitle>
                      <HistoryIcon
                        className={cn(
                          "h-4 w-4",
                          resolvedTheme === "dark"
                            ? "text-white"
                            : "text-slate-500",
                        )}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading || isFetching ? (
                          <Skeleton className="h-5 w-1/6" />
                        ) : (
                          data?.buildingResponsiblePersonCount ?? 0
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Yaklaşan Bakımlar
                    </CardTitle>
                    <AlertCircleIcon className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">
                      Yakında Eklenecek...
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Ortalama Bakım Süresi
                    </CardTitle>
                    <ClockIcon
                      className={cn(
                        "h-4 w-4",
                        resolvedTheme === "dark"
                          ? "text-white"
                          : "text-slate-500",
                      )}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Yakında Eklenecek...
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Link href="/asansor">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Toplam Asansör</CardTitle>
                      <Cog
                        className={cn(
                          "h-8 w-8",
                          resolvedTheme === "dark"
                            ? "text-white"
                            : "text-slate-500",
                        )}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading || isFetching ? (
                          <Skeleton className="h-5 w-1/6" />
                        ) : (
                          data?.elevatorCount ?? 0
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/bakim">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Toplam Bakım Kaydı</CardTitle>
                      <Wrench
                        className={cn(
                          "h-8 w-8",
                          resolvedTheme === "dark"
                            ? "text-white"
                            : "text-slate-500",
                        )}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading || isFetching ? (
                          <Skeleton className="h-5 w-1/6" />
                        ) : (
                          data?.totalMaintenanceCount ?? 0
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>Günlere Göre Bakım Sayısı</CardTitle>
                    <LineChartIcon className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    {/* <LineChart className="h-[300px] w-full" /> */}
                    {isLoading || isFetching ? (
                      <Skeleton className="h-[300px] w-full" />
                    ) : (
                      <MyResponsiveCalendar
                        data={data?.values}
                        className="h-[300px] w-full"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
Index.Layout = "Main";

// const MyResponsiveCalendar = ({data}) => (
const MyResponsiveCalendar = (
  props: React.ComponentProps<"div"> & {
    data: KeyValueTotalCount;
  },
) => {
  const { resolvedTheme } = useTheme();
  return (
    <div {...props}>
      <ResponsiveCalendar
        data={props.data ?? []}
        monthLegend={(_year, month) => {
          return format(new Date(new Date().getMonth(), month, 1), "LLL", {
            locale: tr,
          });
        }}
        from={startOfYear(new Date())}
        to={endOfYear(new Date())}
        tooltip={({ day, value, color }) => {
          return (
            <span
              style={{
                display: "block",
                padding: 12,
                color,
                background: resolvedTheme === "dark" ? "#000000" : "#ffffff",
              }}
            >
              <strong>
                {format(new Date(day), "dd MMMM yyyy", { locale: tr })}
              </strong>
              <br />
              <span className="text-black dark:text-white">{value} bakım</span>
            </span>
          );
        }}
        emptyColor={resolvedTheme === "dark" ? "#0f1738" : "#eeeeee"}
        theme={{
          labels: {
            text: {
              fill: resolvedTheme === "dark" ? "#ffffff" : "#000000",
            },
          },
          tooltip: {
            container: {
              fontSize: "18px",
              background: resolvedTheme === "dark" ? "#000000" : "#ffffff",
              color: resolvedTheme === "dark" ? "#ffffff" : "#000000",
            },
          },
        }}
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 25, right: 5, bottom: 5, left: 5 }}
        yearSpacing={40}
        monthBorderWidth={2}
        monthBorderColor={resolvedTheme === "dark" ? undefined : "#fff"}
        dayBorderWidth={2}
        dayBorderColor={resolvedTheme === "dark" ? undefined : "#fff"}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
      />
    </div>
  );
};

// const ResponsiveLine = dynamic(
//   () => import("@nivo/line").then((m) => m.ResponsiveLine),
//   { ssr: false },
// );

// function LineChart(props: React.ComponentProps<"div">) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[
//           {
//             id: "C",
//             data: [
//               {
//                 x: 1,
//                 y: 15,
//               },
//               {
//                 x: 2,
//                 y: 250,
//               },
//               {
//                 x: 3,
//                 y: 152,
//               },
//               {
//                 x: 4,
//                 y: 15,
//               },
//               {
//                 x: 5,
//                 y: 211,
//               },
//               {
//                 x: 6,
//                 y: 172,
//               },
//               {
//                 x: 7,
//                 y: 24,
//               },
//               {
//                 x: 8,
//                 y: 25,
//               },
//             ],
//           },
//           {
//             id: "B",
//             data: [
//               {
//                 x: 1,
//                 y: 43,
//               },
//               {
//                 x: 2,
//                 y: 237,
//               },
//               {
//                 x: 3,
//                 y: 21,
//               },
//               {
//                 x: 4,
//                 y: 35,
//               },
//               {
//                 x: 5,
//                 y: 26,
//               },
//               {
//                 x: 6,
//                 y: 154,
//               },
//               {
//                 x: 7,
//                 y: 181,
//               },
//               {
//                 x: 8,
//                 y: 65,
//               },
//             ],
//           },
//           {
//             id: "A",
//             data: [
//               {
//                 x: 1,
//                 y: 240,
//               },
//               {
//                 x: 2,
//                 y: 228,
//               },
//               {
//                 x: 3,
//                 y: 77,
//               },
//               {
//                 x: 4,
//                 y: 178,
//               },
//               {
//                 x: 5,
//                 y: 196,
//               },
//               {
//                 x: 6,
//                 y: 204,
//               },
//               {
//                 x: 7,
//                 y: 153,
//               },
//               {
//                 x: 8,
//                 y: 15,
//               },
//             ],
//           },
//         ]}
//         enableCrosshair={false}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: 0,
//           max: "auto",
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "X",
//           legendOffset: 45,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "Y",
//           legendOffset: -45,
//           legendPosition: "middle",
//         }}
//         colors={{ scheme: "paired" }}
//         pointSize={5}
//         pointColor={{
//           from: "color",
//           modifiers: [["darker", 0.2]],
//         }}
//         pointBorderWidth={2}
//         pointBorderColor={{
//           from: "color",
//           modifiers: [["darker", 0.2]],
//         }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             symbolSize: 14,
//             symbolShape: "circle",
//           },
//         ]}
//         theme={{
//           tooltip: {
//             container: {
//               fontSize: "12px",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   );
// }
