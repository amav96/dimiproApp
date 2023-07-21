import useDataProvider from "@hooks/useDataProvider";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { useParams } from "react-router-dom";

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
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  paragraph: {
    fontSize: 10,
    marginTop: 4,
    maxWidth: "50%",
  },
  body: {
    padding: 20,
  },
  spaceTop: {
    marginTop: 20,
  },
  labelWidth: {
    minWidth: 150,
  },
  fontText: {
    fontSize: 10,
  }
});

function formatDate(inputDate: string) {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day} ${year}`;
}

const inputDate = "2023-07-21T01:26:57.830Z";
const formattedDate = formatDate(inputDate);
console.log(formattedDate); // Output: "JULY 21 2023"

const PDFcontract = () => {
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
            <Text>{contract?.broker?.media?.logo}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
              }}
            >
              <View>
                <Text>ADDRESS</Text>
                <Text style={styles.paragraph}>
                  {contract?.broker?.address} {contract?.broker?.city?.name}{" "}
                  {contract?.broker?.vat} {contract?.broker?.country?.iso2}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 20,
                }}
              >
                <Text>Contacto</Text>
                <View style={styles.paragraph}>
                  <Text>{contract?.broker?.email}</Text>
                  <Text>{contract?.broker?.website}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* BODY */}
          <View style={[styles.body, { fontSize: 12 }]}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text>{contract?.broker?.city?.name} </Text>
                  <Text>{formatDate(contract?.createdAt)}</Text>
                </View>
                <Text>To: {contract?.exporter?.name}</Text>
              </View>
              <View>
                <Text>Ref Nro. {contract?.name}</Text>
              </View>
            </View>
            <View style={styles.spaceTop}>
              <Text>
                We are glad to confirm following business concluded today:
              </Text>
              {/* EXPORT */}
              <View
                style={[
                  styles.spaceTop,
                  { display: "flex", flexDirection: "row" },
                ]}
              >
                <Text style={styles.labelWidth}>Sellers/Vendedor:</Text>
                <View
                  style={{
                    marginLeft: 40,
                  }}
                >
                  <Text>{contract?.exporter?.name}</Text>
                  <Text>
                    {contract?.exporter?.address} CP:{" "}
                    {contract?.exporter?.postalCode}
                  </Text>
                  <Text>
                    {contract?.exporter?.city?.name}{" "}-{" "}
                    {contract?.exporter?.state?.name}{" "}-{" "}
                    {contract?.exporter?.country?.name}{" "}
                  </Text>
                </View>
              </View>
              {/* IMPORTER */}
              <View
                style={[
                  styles.spaceTop,
                  { display: "flex", flexDirection: "row" },
                ]}
              >
                <Text style={styles.labelWidth}>Buyers/Comprador:</Text>
                <View
                  style={{
                    marginLeft: 40,
                  }}
                >
                  <Text>{contract?.importer?.name}</Text>
                  <Text>
                    {contract?.importer?.address} CP:{" "}
                    {contract?.importer?.postalCode}
                  </Text>
                  <Text>
                    {contract?.importer?.city?.name}{" "}-{" "}
                    {contract?.importer?.state?.name}{" "}-{" "}
                    {contract?.importer?.country?.name}{" "}
                  </Text>
                </View>
              </View>
              {/* PRODUCT */}
              <View
                style={[
                  styles.spaceTop,
                  { display: "flex", flexDirection: "row" },
                ]}
              >
                <Text style={styles.labelWidth}>Commodity/Mercadería:</Text>
                <View
                  style={{
                    marginLeft: 40,
                  }}
                >
                  <Text>
                    {contract?.product?.name},{" "}
                    {contract?.category?.name},{" "}
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
                    {contract?.quantity} Tons. (+/-{contract?.margenPercentage}%)
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
                    {contract?.currency?.nameShort}{" "}{contract?.price}/ton{" "}-{" "}
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
                  <Text>
                    {contract?.destination}
                  </Text>
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
                  <Text>
                    {contract?.packaging?.name}
                  </Text>
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
                  <Text>
                    {contract?.shippingDate}
                  </Text>
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
                  <Text style={{
                    maxWidth: "60%"
                  }}>
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
                  <Text>
                    {contract?.paymentMethod?.name}
                  </Text>
                </View>
              </View>
              {/* INSURANCE */}
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
                  <Text>
                    {contract?.insurance}
                  </Text>
                </View>
              </View>
              {/* Thanks */}
              <View
                style={[
                  styles.spaceTop,
                  { display: "flex", flexDirection: "row", marginTop: 40 },
                ]}
              >
                <Text style={styles.labelWidth}>Thanks for the bussiness. Best regards</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFcontract;
