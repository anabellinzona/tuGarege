import styles from "@/components/fileVehicle/mainInfo/mainInfo.module.css";

type Prop = {
    marca: string,
    km: number,
    modelo: string;
    anio: number;
    precio: number;
}

export default function MainInfo({marca, km, modelo, anio, precio}: Prop){
    return(
        <div className={styles.vehicleInformationProperties}>
            <div className={styles.vehicleMainInfortationProperties}>
                <h1>{marca} {modelo}</h1>
                <span>{km}km | {anio}</span>
            </div>
            <div className={styles.priceInformationProperties}>
                <h1>Precio</h1>
                <span>${precio}</span>
            </div>
            <div className={styles.sallerInformationProperties}>
                <h1>Vendedor</h1>
                <span>Horacio</span>
            </div>
            <button className={styles.askButtonProperties}>Consultar</button>
        </div>
    )
}