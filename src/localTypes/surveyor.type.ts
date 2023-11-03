export interface ISurveyor {
    _id:string,
    id:string,
    name: string;
}

export type ISurveyorSave = Omit<ISurveyor, "_id" | "id">

export interface ISurveyorProps {
    surveyor : ISurveyor | null
    open: boolean
    onCancel: Function
    onUpdate: Function
    onStore: Function
}