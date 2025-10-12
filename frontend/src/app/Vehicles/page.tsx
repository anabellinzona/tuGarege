"use client";
import {useEffect, useState} from "react";
import VehicleTypeFilterContainer from "@/components/vehicleTypeFilter/vehicleTypeFilterContainer/vehicleTypeFilterContainer";
import CardVehicle from "@/components/featuredCards/cardVehicle/cardVehicle";
import {useSearchParams} from "next/navigation";
import StandardCard from "@/components/standardCard/standardCard";
import VehicleFilters from "@/components/vehicleTypeFilter/vehicleFilters/VehicleFilters";

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
    moneda: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion: string;
    destacado: boolean;
    estado: string;
    imagenes: Imagen[];
    logoMarca?: string;
}

export default function Page(){
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const searchParams = useSearchParams();
    const tipoFromUrl = searchParams.get('tipo') || 'Todos';
    const [selectedFilter, setSelectedFilter] = useState(tipoFromUrl);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVehiculos = async () => {
            setLoading(true);
            try {
                const url = selectedFilter === "Todos"
                    ? 'http://localhost:8080/api/vehiculos'
                    : `http://localhost:8080/api/vehiculos/tipo/${selectedFilter}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Error al cargar los vehículos");
                }
                const data = await response.json();
                setVehiculos(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehiculos();
    }, [selectedFilter]);

    const handleFilterChange = (tipo: string) => {
        setSelectedFilter(tipo);
    };

    return (
        <div>
            {selectedFilter === 'Todos' ? (
                <VehicleTypeFilterContainer
                    onFilterChange={handleFilterChange}
                    selectedFilter={selectedFilter}
                />
            ) : (
                <VehicleFilters />
            )}


            <div>
                {loading ? (
                    <p>Cargando vehículos...</p>
                ) : (
                    vehiculos.map(vehiculo => (
                        <StandardCard  id={vehiculo.id} marca={vehiculo.marca} modelo={vehiculo.modelo} km={vehiculo.km} image={vehiculo.imagenes[0]?.url}/>
                    ))
                )}
            </div>
        </div>
    );
}