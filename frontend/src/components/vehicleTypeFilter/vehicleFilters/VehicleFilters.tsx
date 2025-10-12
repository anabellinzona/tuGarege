import styles from "./VehicleFilters.module.css";
import Image from "next/image";

export default function VehicleFilters(){
    return(
        <div className={styles.vehicleFiltersContainerProperties}>
            <h6>Filtros</h6>
            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Renault</option>
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Renault</option>
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Renault</option>
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                <option>Toyota</option>
                <option>Ford</option>
                <option>Renault</option>
            </select>
        </div>
    );
}