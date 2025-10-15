"use client"

import styles from './standardCard.module.css';
import Image from 'next/image';
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

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

type Prop = {
    id?: string;
    vehicle?: Vehiculo;
}

export default function StandardCard() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/vehiculos/recientes')
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
            <section className={styles.main}>
                <p>Cargando vehículos...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.main}>
                <h1>Más recientes</h1>
                <p>Error: {error}</p>
            </section>
        );
    }

    if (vehiculos.length === 0) {
        return (
            <section className={styles.main}>
                <p>No hay vehículos disponibles</p>
            </section>
        );
    }

    return (
        <main className={styles.main}>
            {vehiculos.map((vehiculo) => (
                <Link href="../fileVehicle/fileVehicle" key={vehiculo.id}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={vehiculo.imagenes?.[0]?.url || "/icons/vehicleImage.png"}
                            alt={'vehículo descripto en la publicación'}
                            fill
                            style={{objectFit: "cover"}}
                        />
                    </div>

                    <div className={styles.data}>
                        <div className={styles.details}>
                            <h6>{vehiculo.marca} {vehiculo.modelo}</h6>
                            <h6 className={styles.km}>{vehiculo.km} Km.</h6>
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
                </Link>
            ))}
        </main>
    );
}
