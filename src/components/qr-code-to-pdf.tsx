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

interface QRCode {
  id: string;
  elevatorLocation: string;
}

interface Company {
  name: string;
  phone: string;
  logo: string;
}

export default function QRCodeToPdf({
  QRCodes,
  company,
  buildingName,
}: {
  QRCodes: QRCode[];
  company: Company;
  buildingName: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {QRCodes.map((code, index) => (
          <View key={index} style={styles.qrCodeContainer}>
            <Text style={styles.largeText}>{buildingName}</Text>
            <Text style={styles.smallText}>{code.elevatorLocation}</Text>
            <Text style={styles.smallText}>{company.name}</Text>
            {company.phone && (
              <Text style={styles.smallText}>{company.phone}</Text>
            )}
            {company.logo && <Image style={styles.image} src={company.logo} />}
            <Image src={code.id} style={styles.qrCode} />
            <View style={styles.seperator} />
            <Text style={styles.largeText}>{buildingName}</Text>
            <Text style={styles.smallText}>{code.elevatorLocation}</Text>
            <Text style={styles.smallText}>{company.name}</Text>
            {company.phone && (
              <Text style={styles.smallText}>{company.phone}</Text>
            )}
            {company.logo && <Image style={styles.image} src={company.logo} />}
            <Image src={code.id} style={styles.qrCode} />
            <View style={styles.seperator} />
            <Text style={styles.largeText}>{buildingName}</Text>
            <Text style={styles.smallText}>{code.elevatorLocation}</Text>
            <Text style={styles.smallText}>{company.name}</Text>
            {company.phone && (
              <Text style={styles.smallText}>{company.phone}</Text>
            )}
            {company.logo && <Image style={styles.image} src={company.logo} />}
            <Image src={code.id} style={styles.qrCode} />
          </View>
        ))}
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
  },
  qrCodeContainer: {
    width: "30%", // 3x3 düzeni için her QR kodunun genişliği
    margin: "1.5%",
    padding: 10,
    border: "1px solid #ccc",
    textAlign: "center",
  },
  qrCode: {
    width: "100%", // QR kodu resminin genişliği
    marginTop: -15,
  },
  smallText: {
    marginRight: 10,
    marginBottom: 6,
    fontSize: 6,
    fontFamily: "Ubuntu",
  },
  largeText: {
    marginRight: 10,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: "Ubuntu",
  },
  image: {
    marginTop: 3,
    marginLeft: 18,
    width: 115,
    height: 55,
  },
  seperator: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
});

Font.register({
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
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
