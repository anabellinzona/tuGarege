"use client"

import styles from './standardCard.module.css';
import Image from 'next/image';
import {useEffect, useState} from "react";

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
    imagenUrl?: string;
    logoMarca?: string;
}

<<<<<<< HEAD
export default function StandardCard() {
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
                <p>No hay vehículos disponibles</p>
            </section>
        );
    }

=======
type Prop = {
    id?: number,
    marca?: string,
    modelo?: string,
    km?: number,
    image: string
}

export default function StandardCard({id, marca, modelo, km, image}: Prop) {
>>>>>>> 862d5ce24769b5528bf990aa5556c7d411d132b1
    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <Image
                    src={image}
                    alt={'vehículo descripto en la publicación'}
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className={styles.data}>
                <div className={styles.details}>
                    <h6>{marca} {modelo}</h6>
                    <h6 className={styles.km}>{km}km</h6>
                </div>

                <div>
                    <Image
                        src={'/test/hbcamionetas.jpeg'}
                        alt={'Foto de perfil del usuario'}
                        width={50}
                        height={50}
                    />
                </div>
            </div>
        </main>
    );
}
