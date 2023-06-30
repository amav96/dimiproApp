import { GlobalInputs, requestConfiguration } from '@packageTypes'

export interface PropsModalForm {
    inputs: Array<GlobalInputs>;
    urlStore: string
    urlUpdate: string,
    urlShow?: string,
    modelStore? : string,
    modelUpdate? : string,
    modelDelete? : string,
    modelShow? : string,
    isEditMode: boolean,
    visible: boolean,
    resetAfterClose? : boolean,
    showRequestConfiguration?: requestConfiguration
    storeRequestConfiguration?: requestConfiguration
    updateRequestConfiguration?: requestConfiguration,
    updateDefaultParams?: object,
    onCloseModal?: Function,
    afterUpdate?: Function,
    beforeUpdate?: Function,
    afterStore?: Function,
    beforeStore?: Function,
    handleUpdateErrors? : Function,
    handleStoreErrors? : Function,
    closable?: boolean,
    title?:string
}