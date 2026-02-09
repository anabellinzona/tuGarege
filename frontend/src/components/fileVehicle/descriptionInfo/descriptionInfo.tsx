import styles from "./descriptionInfo.module.css";

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
    onEditClick: () => void;
    onSaveField: (field: keyof Vehiculo, value: string | number) => void;
    classname: string;
};

export default function DescriptionInfo({vehiculo,
                                       isEditable,
                                       onEditClick,
                                   }: Prop){
    return(
        <div>
            <div>
                {vehiculo?.descripcion || ""}
            </div>

            {isEditable && (
                <button
                    onClick={onEditClick}
                    className={styles.modifeButtonProperties}
                >
                    Editar
                </button>
            )}
        </div>
    );
}