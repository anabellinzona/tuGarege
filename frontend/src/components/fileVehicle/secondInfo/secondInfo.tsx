import styles from "@/components/fileVehicle/secondInfo/secondInfo.module.css";

type Prop = {
    modelo?: string;
    combustible?: string;
    kilometros?: number;
    descripcion?: string
}

export default function SecondInfo({modelo, combustible, kilometros, descripcion}: Prop){
    return(
        <div className={styles.tableCharacteristicProperties}>
            <h3>Características principales</h3>
            <p><strong>Modelo:</strong> {modelo}</p>
            <p><strong>Tipo de combustible:</strong> {combustible}</p>
            <p><strong>Kilometraje:</strong> {kilometros}km</p>
            <p><strong>Otras características y/o detalles:</strong> {descripcion}</p>
        </div>
    );
}