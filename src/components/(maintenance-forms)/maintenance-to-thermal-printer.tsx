/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { format } from "date-fns";
import { turkishToEnglish } from "@/utils/turkish-to-english";

type RouterOutput = inferRouterOutputs<AppRouter>;

type TodayMaintenanceList =
  RouterOutput["maintenance"]["getLastMaintenanceList"];

export default function MaintenanceToThermalPrinter({
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
    <Document style={{ fontFamily: "Inter" }}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          www.elevatox.com - Asansor Bakim Kaydi
        </Text>
        {/* <Text style={styles.subHeader}>---------------------</Text> */}
        <Text style={styles.title}>BAKIM SIRKETI:</Text>
        <Text style={styles.title}>
          {turkishToEnglish(props?.elevator.company.name) +
            " - " +
            turkishToEnglish(buildingName) +
            " - " +
            format(createdAt, "dd.MM.yyyy HH:mm")}
        </Text>
        <Text style={styles.title}>VERGI NO: {props?.company.taxId}</Text>
        {/* <Text style={styles.subHeader}>---------------------</Text> */}
        <Text style={styles.title}>BINA BILGILERI: </Text>
        <Text style={styles.title}>
          {turkishToEnglish(props?.elevator.company.owner?.firstName) +
            " " +
            turkishToEnglish(props?.elevator.company.owner?.lastName) +
            " - " +
            props?.elevator.company.owner?.phone +
            " - " +
            turkishToEnglish(props?.elevator.company.address)}
        </Text>
        <Text style={styles.subHeader}>----- KUYU DIBI -----</Text>
        <Text style={styles.text}>
          HIZ REGULATORU{" "}
          {props?.kuyuDibiMaintenance[0]?.speedRegulator === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          SINIR GUVENLIGI KESICISI{" "}
          {props?.kuyuDibiMaintenance[0]?.borderSecurityBreaker === true
            ? "+"
            : "-"}
        </Text>
        <Text style={styles.text}>
          ACIL ALARM TERTIBATI{" "}
          {props?.kuyuDibiMaintenance[0]?.emergencyAlarm === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          EK NOT:{" "}
          {turkishToEnglish(props?.kuyuDibiMaintenance[0]?.additionalNote) ??
            ""}
        </Text>
        <Text style={styles.subHeader}>----- KABIN USTU -----</Text>
        <Text style={styles.text}>
          HIZ REGULATORU{" "}
          {props?.kuyuDibiMaintenance[0]?.speedRegulator === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          KARSI AGIRLIK{" "}
          {props?.kabinUstuMaintenance[0]?.counterWeight === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          ASANSOR KABINI{" "}
          {props?.kabinUstuMaintenance[0]?.elevatorCabin === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          DURAK GIRISI{" "}
          {props?.kabinUstuMaintenance[0]?.stationEntrance === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          KABIN KAPISI{" "}
          {props?.kabinUstuMaintenance[0]?.elevatorCabinDoor === true
            ? "+"
            : "-"}
        </Text>
        <Text style={styles.text}>
          KAT SEVIYESI{" "}
          {props?.kabinUstuMaintenance[0]?.floorLevel === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          SINIR GUVENLIGI KESICISI{" "}
          {props?.kabinUstuMaintenance[0]?.borderSecurityBreaker === true
            ? "+"
            : "-"}
        </Text>
        <Text style={styles.text}>
          ACIL ALARM TERTIBATI{" "}
          {props?.kabinUstuMaintenance[0]?.emergencyAlarm === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          DURAK KUMANDALARI VE GOSTERGELERI{" "}
          {props?.kabinUstuMaintenance[0]?.stopControls === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          EK NOT:{" "}
          {turkishToEnglish(props?.kabinUstuMaintenance[0]?.additionalNote) ??
            ""}
        </Text>
        <Text style={styles.subHeader}>----- MAKINE DAIRESI -----</Text>
        <Text style={styles.text}>
          TAHRIK MOTORU{" "}
          {props?.makineDairesiMaintenance[0]?.propulsionMotor === true
            ? "+"
            : "-"}
        </Text>
        <Text style={styles.text}>
          DISLI KUTUSU{" "}
          {props?.makineDairesiMaintenance[0]?.gearBox === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          KUMANDA PANOSU{" "}
          {props?.makineDairesiMaintenance[0]?.switchBoard === true ? "+" : "-"}
        </Text>
        <Text style={styles.text}>
          EK NOT:{" "}
          {turkishToEnglish(
            props?.makineDairesiMaintenance[0]?.additionalNote,
          ) ?? ""}
        </Text>
        <Text style={styles.subHeader}>---------------------</Text>
        <Text style={styles.text}> + = BAKIM YAPILDI</Text>
        <Text style={styles.text}> - = BAKIM YAPILMADI</Text>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 11,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 13,
    marginBottom: 10,
  },
  header: {
    fontSize: 10,
    marginBottom: 6,
    textAlign: "center",
    color: "grey",
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
