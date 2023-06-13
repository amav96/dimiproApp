import { GlobalInputs, requestConfiguration } from '@packageTypes'

export interface PropsModalForm {
    inputs: Array<GlobalInputs>;
    urlStore: string
    urlUpdate: string,
    urlShow?: string,
    modelShowKey? : string,
    isEditMode: boolean,
    visible: boolean,
    resetAfterClose? : boolean,
    showRequestConfiguration?: requestConfiguration
    storeRequestConfiguration?: requestConfiguration
    updateRequestConfiguration?: requestConfiguration,
    updateDefaultParams?: object,
    onCloseModal?: Function,
    afterUpdate?: Function,
    afterStore?: Function,
    handleUpdateErrors? : Function,
    handleStoreErrors? : Function,
}