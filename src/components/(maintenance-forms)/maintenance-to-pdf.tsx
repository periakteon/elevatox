/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { format } from "date-fns";

type RouterOutput = inferRouterOutputs<AppRouter>;

type TodayMaintenanceList =
  RouterOutput["maintenance"]["getLastMaintenanceList"];

export default function MaintenanceToPdf({
  buildingName,
  props,
}: {
  buildingName: string;
  props: TodayMaintenanceList;
}) {
  const createdAt = new Date(
    props?.kabinUstuMaintenance[0]?.createdAt ??
      props?.kuyuDibiMaintenance[0]?.createdAt ??
      props?.makineDairesiMaintenance[0]?.createdAt ??
      Date.now(),
  );
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header} fixed>
            www.elevatox.com - Asansör Bakım Kaydı
          </Text>
          {props?.elevator.company.logo && (
            <Image style={styles.image} src={props?.elevator.company.logo} />
          )}
          <Text style={styles.title}>
            {props?.elevator.company.name +
              " - " +
              buildingName +
              " - " +
              format(createdAt, "dd.MM.yyyy HH:mm")}
          </Text>
          <Text style={[styles.subTitle, { marginBottom: 15 }]}>
            {props?.elevator.company.owner?.firstName +
              " " +
              props?.elevator.company.owner?.lastName +
              " - " +
              props?.elevator.company.owner?.phone +
              " - " +
              props?.elevator.company.address}
          </Text>
          <Text style={[styles.subTitle, { marginTop: -10, fontWeight: 300 }]}>
            VERGİ NO: {props?.company.taxId}
          </Text>
          {/* KUYU DİBİ */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}> KUYU DİBİ</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Bakım Durumu</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Hız Regülatörü</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kuyuDibiMaintenance[0]?.speedRegulator === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Sınır Güvenliği Kesicisi</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kuyuDibiMaintenance[0]?.borderSecurityBreaker === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Acil Alarm Tertibatı</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kuyuDibiMaintenance[0]?.emergencyAlarm === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            {props?.kuyuDibiMaintenance[0]?.additionalNote && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>
                      EK NOT
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    {props.kuyuDibiMaintenance[0].additionalNote}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* <View style={styles.bookmark} /> */}
          {/* KABİN ÜSTÜ*/}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>KABİN ÜSTÜ</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Bakım Durumu</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Hız Regülatörü</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.speedRegulator === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Karşı Ağırlık</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.counterWeight === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Asansör Kabini</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.elevatorCabin === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Durak Girişi</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.stationEntrance === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Kabin Kapısı</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.elevatorCabinDoor === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Kat Seviyesi</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.floorLevel === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Sınır Güvenliği Kesicisi</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.borderSecurityBreaker ===
                  true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Acil Alarm Tertibatı</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.emergencyAlarm === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  Durak Kumandaları ve Göstergeleri
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.kabinUstuMaintenance[0]?.stopControls === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}
                </Text>
              </View>
            </View>
            {props?.kabinUstuMaintenance[0]?.additionalNote && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>
                      EK NOT
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    {props?.kabinUstuMaintenance[0]?.additionalNote}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* <View style={styles.bookmark} /> */}
          {/* MAKİNE DAİRESİ */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>MAKİNE DAİRESİ</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Bakım Durumu</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Tahrik Motoru</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.makineDairesiMaintenance[0]?.propulsionMotor === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}{" "}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Dişli Kutusu</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.makineDairesiMaintenance[0]?.gearBox === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}{" "}
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>Kumanda Panosu</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.subTitle}>
                  {props?.makineDairesiMaintenance[0]?.switchBoard === true
                    ? "Bakım Yapıldı ✓"
                    : "Bakım Yapılmadı ✗"}{" "}
                </Text>
              </View>
            </View>
            {props?.makineDairesiMaintenance[0]?.additionalNote && (
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    <Text style={{ fontFamily: "Inter", fontWeight: 600 }}>
                      EK NOT
                    </Text>
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.subTitle}>
                    {props.makineDairesiMaintenance[0].additionalNote}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tableHeader: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#989a9c",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Inter",
    fontWeight: 600,
  },
  tableRow: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#989a9c",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  tableCol: {
    width: "25%",
    padding: 3,
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Inter",
  },
  page: {
    fontFamily: "Inter",
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
    color: "grey",
  },
  bookmark: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    marginBottom: 7,
    marginHorizontal: 130,
    width: 280,
    height: 90,
  },
  title: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
  subTitle: {
    margin: 3,
    fontSize: 11,
    textAlign: "center",
  },
});

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "/font/inter-regular.ttf",
    },
    {
      src: "/font/inter-extrabold.ttf",
      fontWeight: 600,
    },
  ],
});
