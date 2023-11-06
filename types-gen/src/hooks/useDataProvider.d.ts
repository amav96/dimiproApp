import { ModelsDataProvider } from "@localTypes/dataProvider.type";
export default function useDataProvider(): {
    getDataProviders: (models: ModelsDataProvider[]) => Promise<void>;
};
