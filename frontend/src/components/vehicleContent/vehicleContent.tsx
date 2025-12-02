"use client";
import { useEffect, useState } from "react";
import VehicleTypeFilterContainer from "@/components/vehicleTypeFilter/vehicleTypeFilterContainer/vehicleTypeFilterContainer";
import { useSearchParams } from "next/navigation";
import StandardCard from "@/components/standardCard/standardCard";
import VehicleFilters from "@/components/vehicleTypeFilter/vehicleFilters/VehicleFilters";
import styles from "./vehicleContent.module.css";
import SearchBar from "@/components/searchBar/searchBar";
import OrderButton from "@/components/buttons/orderButton/orderButton";

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
    anio: number;
    logoMarca?: string;
}

interface AdvancedFilters {
    marca?: string;
    modelo?: string;
    anio?: number | string;
    estado?: string;
}

export default function VehiclesContent() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [filteredVehiculos, setFilteredVehiculos] = useState<Vehiculo[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({});
    const searchParams = useSearchParams();
    const tipoFromUrl = searchParams.get("tipo") || "Todos";
    const [selectedFilter, setSelectedFilter] = useState(tipoFromUrl);
    const [loading, setLoading] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [order, setOrder] = useState("");


    // -------------------------
    // Cargar vehículos por TIPO
    // -------------------------
    useEffect(() => {
        const fetchVehiculos = async () => {
            setLoading(true);
            try {
                const url =
                    selectedFilter === "Todos"
                        ? `${API_URL}/api/vehiculos`
                        : `${API_URL}/api/vehiculos/tipo/${selectedFilter}`;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Error al cargar los vehículos");
                const data = await response.json();

                setVehiculos(data);
                setFilteredVehiculos(data); // inicial
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehiculos();
    }, [selectedFilter]);

    // -------------------------
    // Detectar mobile
    // -------------------------
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleFilterChange = (tipo: string) => {
        setSelectedFilter(tipo.toLowerCase());
    };

    // --------------------------------------------------
    // 🍀 APLICAR FILTROS AVANZADOS (marca/modelo/año)
    // --------------------------------------------------
    const applyAdvancedFilters = (filters: AdvancedFilters) => {
        setAdvancedFilters(filters);

        const filtered = vehiculos.filter((v) => {
            const matchMarca =
                !filters.marca || v.marca.toLowerCase() === filters.marca.toLowerCase();

            const matchModelo =
                !filters.modelo || v.modelo.toLowerCase() === filters.modelo.toLowerCase();

            const matchAnio =
                !filters.anio || v.anio === Number(filters.anio);

            const matchEstado =
                !filters.estado || v.estado.toLowerCase() === filters.estado.toLowerCase();

            return matchMarca && matchModelo && matchAnio && matchEstado;
        });

        setFilteredVehiculos(filtered);
    };

    // --------------------------------------------------
    // RENDER FILTROS
    // --------------------------------------------------
    const renderFilters = (
        <div className={`${styles.filters} ${showFilters ? styles.show : styles.hide}`}>

            {selectedFilter !== "Todos" && (
                <button
                    className={styles.backButton}
                    onClick={() => {
                        setSelectedFilter("Todos");
                        setAdvancedFilters({});
                        setFilteredVehiculos(vehiculos);
                    }}
                >
                    ← Volver
                </button>
            )}

            {selectedFilter === "Todos" ? (
                <VehicleTypeFilterContainer
                    onFilterChange={handleFilterChange}
                    selectedFilter={selectedFilter}
                />
            ) : (
                <VehicleFilters
                    tipo={selectedFilter}
                    allVehicles={vehiculos}
                    onApplyFilters={applyAdvancedFilters}
                />
            )}
        </div>
    );

    const applyOrdering = (orderType: string) => {
        setOrder(orderType);

        const sorted = [...filteredVehiculos];

        switch (orderType) {
            case "precio-asc":
                sorted.sort((a, b) => a.precio - b.precio);
                break;
            case "precio-desc":
                sorted.sort((a, b) => b.precio - a.precio);
                break;
            case "km-asc":
                sorted.sort((a, b) => a.km - b.km);
                break;
            case "km-desc":
                sorted.sort((a, b) => b.km - a.km);
                break;
            case "anio-asc":
                sorted.sort((a, b) => a.anio - b.anio);
                break;
            case "anio-desc":
                sorted.sort((a, b) => b.anio - a.anio);
                break;
            default:
                return;
        }

        setFilteredVehiculos(sorted);
    };


    return (
        <main className={styles.main}>
            {!isMobile && renderFilters}

            <section className={styles.searchPlusOrderPlusVehicles}>
                <div className={styles.searchPlusOrder}>
                    <SearchBar className={"main80"} />
                    <div className={styles.orderPlusFilter}>
                        <OrderButton onSelect={applyOrdering} />
                        <button
                            className={styles.filterToggleBtn}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? "Cerrar" : "Filtrar"}
                        </button>
                    </div>
                </div>

                {isMobile && showFilters && renderFilters}

                <div className={styles.cardsGrid}>
                    {loading ? (
                        <p>Cargando vehículos...</p>
                    ) : (
                        filteredVehiculos.map((vehiculo) => (
                            <StandardCard
                                key={vehiculo.id}
                                id={vehiculo.id}
                                marca={vehiculo.marca}
                                modelo={vehiculo.modelo}
                                km={vehiculo.km}
                                image={vehiculo.imagenes[0]?.url}
                            />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
