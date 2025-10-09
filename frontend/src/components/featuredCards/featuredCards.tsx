"use client"

import Image from "next/image";
import styles from "./featuredCards.module.css";
import {useEffect, useState} from "react";

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

export default function featuredCards(){
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehiculos/destacados')
            .then(response => {
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehiculos(data)
                setLoading(false)
            })
            .catch(error => {
                console.log("El error fue: " + error);
                setError(error.message);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <h1>Destacados</h1>
                <p>Cargando vehículos...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <h1>Destacados</h1>
                <p>Error: {error}</p>
            </section>
        );
    }

    if (vehiculos.length === 0) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <h1>Destacados</h1>
                <p>No hay vehículos destacados disponibles</p>
            </section>
        );
    }

    return(
        <section className={styles.featuredCardsContainerProperties}>
            <div className={styles.titleProperties}>
                <h1>Destacados</h1>
            </div>
            <div className={styles.carouselWrapper}>
                <button className={`${styles.arrowButton} ${styles.arrowLeft}`}>
                    <Image src={"/icons/arrowLeft.png"} alt={"arrow left"} width={24} height={24}/>
                </button>

                <div className={styles.carouselContainer}>
                    {vehiculos.map((vehiculo) => (
                        <div key={vehiculo.id} className={styles.vehicleCardProperties}>
                            <div className={styles.vehicleImageProperties}>
                                <Image
                                    src={vehiculo.imagenes?.[0]?.url || "/icons/vehicleImage.png"}
                                    alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className={styles.infoVehicleProperties}>
                                <div>
                                    <h6>{vehiculo.marca} {vehiculo.modelo}</h6>
                                    <span>{vehiculo.km}km</span>
                                </div>
                                <div className={styles.logoVehicleProperties}>
                                    <Image
                                        src="/logo/vehicleLogo.png"
                                        alt={`Logo ${vehiculo.marca}`}
                                        fill
                                        style={{ objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className={`${styles.arrowButton} ${styles.arrowRight}`}>
                    <Image src={"/icons/arrowRight.png"} alt={"arrow right"} width={24} height={24}/>
                </button>
            </div>
        </section>
    );
}