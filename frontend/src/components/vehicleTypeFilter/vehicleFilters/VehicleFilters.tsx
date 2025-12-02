import styles from "./VehicleFilters.module.css";
import { useEffect, useState } from "react";

interface Vehicle {
    id: number;
    marca: string;
    modelo: string;
    anio: number;
    estado: string;
}

interface Props {
    tipo: string;
    allVehicles: Vehicle[];
    onApplyFilters: (filters: {
        marca: string;
        modelo: string;
        anio: number | "";
        estado: string;
    }) => void;
}

export default function VehicleFilters({ tipo, allVehicles, onApplyFilters }: Props) {
    const [marcas, setMarcas] = useState<string[]>([]);
    const [modelos, setModelos] = useState<string[]>([]);
    const [anios, setAnios] = useState<number[]>([]);
    const [estados, setEstados] = useState<string[]>([]);

    // Estados de filtros seleccionados
    const [selectedMarca, setSelectedMarca] = useState("");
    const [selectedModelo, setSelectedModelo] = useState("");
    const [selectedAnio, setSelectedAnio] = useState<number | "">("");
    const [selectedEstado, setSelectedEstado] = useState("");

    useEffect(() => {
        setMarcas(Array.from(new Set(allVehicles.map((v) => v.marca))));
        setModelos(Array.from(new Set(allVehicles.map((v) => v.modelo))));
        setAnios(Array.from(new Set(allVehicles.map((v) => v.anio))));
        setEstados(Array.from(new Set(allVehicles.map((v) => v.estado))));
    }, [allVehicles]);

    const applyFilters = () => {
        onApplyFilters({
            marca: selectedMarca,
            modelo: selectedModelo,
            anio: selectedAnio,
            estado: selectedEstado,
        });
    };

    return (
        <div className={styles.vehicleFiltersContainerProperties}>
            <h6>Filtros</h6>

            <select
                className={styles.vehicleFilterProperties}
                value={selectedMarca}
                onChange={(e) => setSelectedMarca(e.target.value)}
            >
                <option value="">Marca</option>
                {marcas.map((m, index) => (
                    <option key={index}>{m}</option>
                ))}
            </select>

            <select
                className={styles.vehicleFilterProperties}
                value={selectedModelo}
                onChange={(e) => setSelectedModelo(e.target.value)}
            >
                <option value="">Modelo</option>
                {modelos.map((m, index) => (
                    <option key={index}>{m}</option>
                ))}
            </select>

            <select
                className={styles.vehicleFilterProperties}
                value={selectedAnio}
                onChange={(e) =>
                    setSelectedAnio(e.target.value === "" ? "" : Number(e.target.value))
                }
            >
                <option value="">Año</option>
                {anios.map((a, index) => (
                    <option key={index}>{a}</option>
                ))}
            </select>

            <select
                className={styles.vehicleFilterProperties}
                value={selectedEstado}
                onChange={(e) => setSelectedEstado(e.target.value)}
            >
                <option value="">Estado</option>
                {estados.map((e, index) => (
                    <option key={index}>{e}</option>
                ))}
            </select>

            <button className={styles.applyButton} onClick={applyFilters}>
                Aplicar filtros
            </button>
        </div>
    );
}
