import { DataProvider } from "@localTypes/dataProvider.type";
interface Params {
    models: any;
}
declare class DataProviderRepository {
    index(params: Params): Promise<DataProvider>;
}
export default DataProviderRepository;
