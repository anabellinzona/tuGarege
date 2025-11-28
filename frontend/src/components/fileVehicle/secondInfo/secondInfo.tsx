import styles from "../secondInfo.module.css";
import EditableText from "@/components/fileVehicle/editableText/editableText";
import EditButton from "@/components/fileVehicle/editButton/editButton";

interface Imagen {
    id: number;
    url: string;
}

interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    km: number;
    precio: number;
    moneda?: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion?: string;
    destacado?: boolean;
    estado: string;
    imagenes: Imagen[];
    logoMarca?: string;
    anio: number;
    vendedorId: number;
}

type Prop = {
    vehiculo: Vehiculo | null;
    isEditable: boolean;
    editingField: string | null;
    onStartEdit: (field: keyof Vehiculo) => void;
    onCancelEdit: () => void;
    onSaveField: (field: keyof Vehiculo, value: string | number) => void;
    classname: string;
};

export default function SecondInfo({vehiculo,
                                       isEditable,
                                       onCancelEdit,
                                       onStartEdit,
                                       editingField,
                                       onSaveField,
                                       classname
                                   }: Prop){
    return(
        <div className={styles.tableCharacteristicProperties}>
            <h3>Características principales</h3>
            <div>
                {editingField === "modelo" ? (
                    <EditableText
                        value={vehiculo?.modelo || " "}
                        isEditing={true}
                        onSave={(value) => onSaveField("modelo", value)}
                        onCancel={onCancelEdit}
                        className={classname}
                    />
                ) : (
                    <p onClick={() => onStartEdit("modelo")}><strong>Modelo: </strong>{vehiculo?.marca}</p>
                )}
                {isEditable && (
                    <EditButton
                        onStartEdit={() => onStartEdit("modelo")}
                        show={true}
                        isEditing={editingField === "modelo"}
                        onEndEdit={onCancelEdit}
                        img={"/icons/editIcon.png"}
                    />
                )}
            </div>
            <p><strong>Tipo de combustible:</strong> {""}</p>
            <p><strong>Kilometraje:</strong> {vehiculo?.km}km</p>
            <p><strong>Otras características y/o detalles:</strong> {vehiculo?.descripcion}</p>
        </div>
    );
}