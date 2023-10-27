import useDataProvider from "@hooks/useDataProvider";
import {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import logo from "../../../public/icons/logo.png";
import Inter from "../../../assets/fonts/Inter-Regular.otf";
import InterBlack from "../../../assets/fonts/Inter-Black.otf";
import InterSemiBold from "../../../assets/fonts/Inter-SemiBold.otf";

function formatDate(inputDate: string) {
  const date = new Date(inputDate);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Sumar 1 porque los meses van de 0 a 11
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}

Font.register({
  family: "Inter",
  fonts: [
    {
      src: Inter,
      fontWeight: 400,
    },
    {
      src: InterBlack,
      fontWeight: 700,
    },
    {
      src: InterSemiBold,
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    color: "#111",
    padding: 10,
  },
  paragraph: {
    fontSize: 10,
    marginTop: 4,
    maxWidth: "50%",
    fontFamily: "Inter",
    fontWeight: 600,
  },
  paragraphHeader: {
    fontSize: 9,
    marginTop: 4,
    maxWidth: "100%",
    width: "100%",
    textAlign: "right",
    display: "flex",
    fontFamily: "Inter",
  },
  body: {
    padding: 20,
    fontFamily: "Inter",
    fontWeight: 400,
  },
  spaceTop: {
    marginTop: 20,
  },
  labelWidth: {
    minWidth: 150,
  },
  fontText: {
    fontSize: 10,
    fontFamily: "Inter",
  },
});

export function PDFContract() {
  const { getDataProviders } = useDataProvider();
  const [data, setData] = useState<any[]>([]);

  const params = useParams<{ id: string }>();

  const contracts = useAppSelector(
    (state: RootState) => state.dataProviders.contracts
  );

  useEffect(() => {
    getDataProviders(["contracts"]);
    setData(contracts);
  }, [contracts]);

  const contract = data.find((item: any) => item._id === params.id);

  return (
    <PDFViewer
      // @ts-ignore
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Document>
        <Page size="A4" style={styles.page}>
          {/* HEADER */}
          <View style={styles.header}>
            <View
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                maxWidth: "100%",
                width: "100%",
              }}
            >
              <View
                style={{
                  display: "flex",
                  marginRight: 100,
                }}
              >
                <Text
                  style={[
                    styles.paragraphHeader,
                    { fontWeight: "semibold", fontSize: 18, marginTop: 0 },
                  ]}
                >
                  Dimipro S.r.l
                </Text>
                <Text style={styles.paragraphHeader}>
                  Sede Operativa: Viale della Tuscia, Loc. colle Diana - 01015
                  Sutri(VT)
                </Text>
                <Text style={styles.paragraphHeader}>
                  vía Ariosto, 24 - 00185 Roma (RM) - Italy
                </Text>
                <Text style={styles.paragraphHeader}>Tel. 0761 696499</Text>
                <Text style={styles.paragraphHeader}>
                  e-mail: oridini@dimiproworld.com Pec: dimiprosrl@legalmail.it
                  Internet: www.dimiproworld.com
                </Text>
                <Text style={styles.paragraphHeader}>
                  C.F./P.Iva 09224961004
                </Text>
              </View>
              <Image
                src={logo}
                style={{ width: 100, height: 70, objectFit: "cover" }}
              />
            </View>
          </View>
          {/* BODY */}
          <View style={[styles.body, { fontSize: 10, lineHeight: 1.2 }]}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              SALES CONFIRMATION
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 8,
              }}
            >
              <View>
                <View
                  style={{
                    display: "flex",
                  }}
                >
                  <Text>{formatDate(contract?.createdAt)}</Text>
                </View>
              </View>
              <View style={{ marginLeft: 30 }}>
                <Text>n. {contract?.name}</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* EXPORT */}
                <View
                  style={[
                    styles.spaceTop,
                    {
                      display: "flex",
                      flexDirection: "column",
                      textTransform: "uppercase",
                      fontWeight: "semibold",
                      fontSize: 12,
                      lineHeight: 1.4,
                      border: "1px solid #000",
                      width: "45%",
                      padding: 4,
                    },
                  ]}
                >
                  <Text>Seller:</Text>
                  <View>
                    <Text>{contract?.exporter?.name}</Text>
                    <Text>
                      {contract?.exporter?.address} CP:{" "}
                      {contract?.exporter?.postalCode}
                    </Text>
                    <Text>
                      {contract?.exporter?.city?.name} -{" "}
                      {contract?.exporter?.state?.name} -{" "}
                      {contract?.exporter?.country?.name}{" "}
                    </Text>
                  </View>
                </View>
                {/* IMPORTER */}
                <View
                  style={[
                    styles.spaceTop,
                    {
                      display: "flex",
                      flexDirection: "column",
                      textTransform: "uppercase",
                      fontWeight: "semibold",
                      fontSize: 12,
                      lineHeight: 1.4,
                      border: "1px solid #000",
                      width: "45%",
                      padding: 4,
                    },
                  ]}
                >
                  <Text>BUYER:</Text>
                  <View>
                    <Text>{contract?.importer?.name}</Text>
                    <Text>
                      {contract?.importer?.address} CP:{" "}
                      {contract?.importer?.postalCode}
                    </Text>
                    <Text>
                      {contract?.importer?.city?.name} -{" "}
                      {contract?.importer?.state?.name} -{" "}
                      {contract?.importer?.country?.name}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  border: "1px solid #000",
                  padding: 16,
                  marginTop: 16,
                  fontWeight: "semibold",
                }}
              >
                {/* PRODUCT */}
                <View style={[{ display: "flex", flexDirection: "row" }]}>
                  <Text style={styles.labelWidth}>Commodity/Mercadería:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>
                      {contract?.product?.name}, {contract?.category?.name},{" "}
                      {contract?.calibers?.map((caliber: any) => caliber.name)},{" "}
                      Crop: {contract?.crop}
                    </Text>
                  </View>
                </View>
                {/* QUANTITY */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Quantity/Cantidad:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>
                      {contract?.quantity} Tons. (+/-
                      {contract?.margenPercentage}
                      %)
                    </Text>
                  </View>
                </View>
                {/* PRICE */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Price/Precio:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>
                      {contract?.currency?.nameShort} {contract?.price}/ton -{" "}
                      {contract?.salesConditions}
                    </Text>
                  </View>
                </View>
                {/* DESTINATION */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Destination/Destino:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>{contract?.destination}</Text>
                  </View>
                </View>
                {/* PACKAGING */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Packaging/Envasado:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>{contract?.packaging?.name}</Text>
                  </View>
                </View>
                {/* SHIPMENT */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Shipment/Embarque:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>{contract?.shippingDate}</Text>
                  </View>
                </View>
                {/* SPECIFICATIONS */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Conditions/Condiciones:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text
                      style={{
                        maxWidth: "60%",
                      }}
                    >
                      {contract?.specifications}
                    </Text>
                  </View>
                </View>
                {/* PAYMENT */}
                <View
                  style={[
                    styles.spaceTop,
                    { display: "flex", flexDirection: "row" },
                  ]}
                >
                  <Text style={styles.labelWidth}>Payment/Pago:</Text>
                  <View
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <Text>{contract?.paymentMethod?.name}</Text>
                  </View>
                </View>
                {/* INSURANCE */}
                {contract?.insurance && (
                  <View
                    style={[
                      styles.spaceTop,
                      { display: "flex", flexDirection: "row" },
                    ]}
                  >
                    <Text style={styles.labelWidth}>Insurance/Seguro:</Text>
                    <View
                      style={{
                        marginLeft: 40,
                      }}
                    >
                      <Text>{contract?.insurance}</Text>
                    </View>
                  </View>
                )}
                {/* BROKER */}
                {contract?.broker?.name  && (
                   <View
                   style={[
                     styles.spaceTop,
                     { display: "flex", flexDirection: "row" },
                   ]}
                 >
                   <Text style={styles.labelWidth}>Broker:</Text>
                   <View
                     style={{
                       marginLeft: 40,
                     }}
                   >
                     <Text>{contract?.broker?.name }</Text>
                   </View>
                 </View>
                )}
                {/* PERCENTAGE BROKER */}
                {contract?.brokerPercent > 0 && (
                  <View
                    style={[
                      styles.spaceTop,
                      { display: "flex", flexDirection: "row" },
                    ]}
                  >
                    <Text style={styles.labelWidth}>Commision/Comisión:</Text>
                    <View
                      style={{
                        marginLeft: 40,
                      }}
                    >
                      <Text>{contract?.brokerPercent} %</Text>
                    </View>
                  </View>
                )}
              </View>
              {/* Thanks */}
              <View
                style={[
                  styles.spaceTop,
                  { display: "flex", flexDirection: "row", marginTop: 40 },
                ]}
              >
                <Text style={styles.labelWidth}>
                  Thanks for the bussiness. Best regards
                </Text>
              </View>
            </View>
            {/* SIGNATURES */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "60%",
                marginLeft: "auto",
                marginTop: 40,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>___________________</Text>
                <Text
                  style={{
                    marginTop: 4,
                  }}
                >
                  Accepted by seller
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>_________________</Text>
                <Text
                  style={{
                    marginTop: 4,
                  }}
                >
                  Accepted by buyer
                </Text>
              </View>
            </View>
            {/* FOOTER */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

