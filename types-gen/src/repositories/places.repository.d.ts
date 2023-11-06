import { DataProvider } from "@localTypes/dataProvider.type";
interface Params {
    models: any;
}
declare class PlaceRepository {
    index(params: Params): Promise<DataProvider>;
    getStatesByCountry(countryId: string | number): Promise<any>;
    getCitiesByCountryAndState(countryId: string, stateId: string): Promise<any>;
}
export default PlaceRepository;
