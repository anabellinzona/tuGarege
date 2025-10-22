import styles from "./VehicleFilters.module.css";
import {useEffect, useRef, useState} from "react";

interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    km: number;
    precio: number;
    moneda: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion: string;
    destacado: boolean;
    estado: string;
}

export default function VehicleFilters(){
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehiculos/sinRepetidos')
            .then(response => {
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehiculos(data)
            })
            .catch(error => {
                console.log("El error fue: " + error);
            })
    }, [])
    return(
        <div className={styles.vehicleFiltersContainerProperties}>
            <h6>Filtros</h6>
            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                {vehiculos.map(vehiculo => (
                    <option>{vehiculo.marca}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Modelo</option>
                {vehiculos.map(vehiculo => (
                    <option>{vehiculo.modelo}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Año</option>
                {vehiculos.map(vehiculo => (
                    <option>{vehiculo.fechaPublicacion}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Estado</option>
                {vehiculos.map(vehiculo => (
                    <option>{vehiculo.estado}</option>
                ))}
            </select>
        </div>
    );
}