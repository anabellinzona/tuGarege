import styles from "./secondInfo.module.css";

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

export default function SecondInfo({vehiculo,
                                       isEditable,
                                       onEditClick,
                                   }: Prop){
    return(
        <div className={styles.tableCharacteristicProperties}>
            <h3>Características principales</h3>

            <p><strong>Modelo:</strong> {vehiculo?.modelo}</p>
            <p><strong>Tipo de combustible:</strong> {""}</p>
            <p><strong>Kilometraje:</strong> {vehiculo?.km}km</p>
            <p><strong>Otras características y/o detalles:</strong> {vehiculo?.descripcion}</p>

            {isEditable && (
                    <button
                        onClick={onEditClick}        // ⬅️ SOLO AVISA AL PADRE
                        className={styles.modifeButtonProperties}
                    >
                        Editar
                    </button>
                )}
        </div>
    );
}