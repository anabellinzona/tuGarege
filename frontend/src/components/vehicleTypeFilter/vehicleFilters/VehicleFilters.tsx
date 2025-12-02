import styles from "./VehicleFilters.module.css";
import { useEffect, useState } from "react";

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
    anio: number;
}

interface Props {
    tipo: string;
}

export default function VehicleFilters({ tipo }: Props) {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/vehiculos/sinRepetidos`)
            .then(response => {
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => setVehiculos(data))
            .catch(error => console.log("El error fue: " + error));
    }, []);

    // Normalizamos filtrado
    const vehiculosFiltrados =
        tipo === "Todos"
            ? vehiculos
            : vehiculos.filter(
                v => v.tipo.toLowerCase() === tipo.toLowerCase()
            );

    const marcas = [...new Set(vehiculosFiltrados.map(v => v.marca))];
    const modelos = [...new Set(vehiculosFiltrados.map(v => v.modelo))];
    const anios = [...new Set(vehiculosFiltrados.map(v => v.anio))];
    const estados = [...new Set(vehiculosFiltrados.map(v => v.estado))];

    return (
        <div className={styles.vehicleFiltersContainerProperties}>
            <h6>Filtros</h6>

            <select className={styles.vehicleFilterProperties}>
                <option>Marca</option>
                {marcas.map(m => (
                    <option key={m}>{m}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Modelo</option>
                {modelos.map(m => (
                    <option key={m}>{m}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Año</option>
                {anios.map(a => (
                    <option key={a}>{a}</option>
                ))}
            </select>

            <select className={styles.vehicleFilterProperties}>
                <option>Estado</option>
                {estados.map(e => (
                    <option key={e}>{e}</option>
                ))}
            </select>
        </div>
    );
}
