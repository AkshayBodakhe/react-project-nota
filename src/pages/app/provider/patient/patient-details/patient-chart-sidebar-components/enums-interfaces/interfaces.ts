export interface InputType {
    id: string,
    name: string
}

export interface DialogFormProps {
    open: boolean;
    patientData: any;
    title: string;
    onClose: () => void;
    editData?: any;
    refetch?:any;
}