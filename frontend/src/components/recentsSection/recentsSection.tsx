"use client";
import styles from './recentsSection.module.css';
import SellButton from "@/components/buttons/sellButton/SellButton";
import StandardCard from "@/components/standardCard/standardCard";
import {useEffect, useState} from "react";

interface Image {
    id: number,
    url: string
}

interface Vehicle {
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
    imagenes: Image[];
    logoMarca?: string;
}

export default function RecentsSection() {
    const [vehicle, setVehicle] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehiculos/recientes')
            .then(response => {
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehicle(data)
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
                <h1>Más recientes</h1>
                <p>Cargando vehículos...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <h1>Más recientes</h1>
                <p>Error: {error}</p>
            </section>
        );
    }

    if (vehicle.length === 0) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <h1>Más recientes</h1>
                <p>No hay vehículos destacados disponibles</p>
            </section>
        );
    }

    return (
        <section className={styles.main}>
            <div className={styles.recents}>
                <h2>Más recientes</h2>
                <SellButton nameButton={"VER TODOS"} link={"/vehiculos"}/>
            </div>
            <div className={styles.cardsGrid}>
                {vehicle.map(vehicle => (
                    <StandardCard id={vehicle.id} marca={vehicle.marca} modelo={vehicle.modelo} km={vehicle.km} image={vehicle.imagenes[0]?.url}/>
                ))}
            </div>
        </section>
    )
}