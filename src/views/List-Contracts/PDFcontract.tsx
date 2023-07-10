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
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    height: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFcontract = () => {
  const { getDataProviders } = useDataProvider();
  const [data, setData] = useState<any[]>([])

  const params = useParams<{ id: string }>();

  const contracts = useAppSelector(
    (state: RootState) => state.dataProviders.contracts
  );
  useEffect(() => {
    getDataProviders(["contracts"]);
    setData(contracts)

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
          <View style={styles.section}>
            <Text>Contract name:</Text>
            <Text>{contract?.name}</Text>
          </View>
          <View style={styles.section}>
          <Text>Exporter:</Text>
            <Text>{contract?.exporter.name}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFcontract;
