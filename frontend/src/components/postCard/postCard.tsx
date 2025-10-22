"use client";

import { useEffect, useState } from "react";
import styles from "./postCard.module.css";
import Image from "next/image";

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

export default function PostCard() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [indices, setIndices] = useState<{ [vehiculoId: number]: number }>({});

    useEffect(() => {
        fetch("http://localhost:8080/api/vehiculos/vendedor/1")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then((data: Vehiculo[]) => {
                setVehiculos(data);
                const inicial = Object.fromEntries(data.map(v => [v.id, 0]));
                setIndices(inicial);
                setLoading(false);
            })
            .catch((error) => {
                console.log("El error fue: " + error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const prev = (vehiculoId: number) => {
        setIndices((prevIndices) => {
            const indexActual = prevIndices[vehiculoId] ?? 0;
            const vehiculo = vehiculos.find(v => v.id === vehiculoId);
            const total = vehiculo ? vehiculo.imagenes.length : 0;
            const nuevoIndex = indexActual === 0 ? total - 1 : indexActual - 1;
            return { ...prevIndices, [vehiculoId]: nuevoIndex };
        });
    };

    const next = (vehiculoId: number) => {
        setIndices((prevIndices) => {
            const indexActual = prevIndices[vehiculoId] ?? 0;
            const vehiculo = vehiculos.find(v => v.id === vehiculoId);
            const total = vehiculo ? vehiculo.imagenes.length : 0;
            const nuevoIndex = indexActual === total - 1 ? 0 : indexActual + 1;
            return { ...prevIndices, [vehiculoId]: nuevoIndex };
        });
    };

    if (loading) return <p>Cargando vehículos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            {vehiculos.map((vehiculo) => {
                const index = indices[vehiculo.id] ?? 0;
                const imagenActual = vehiculo.imagenes[index];

                return (
                    <main key={vehiculo.id} className={styles.main}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={imagenActual.url}
                                alt={`Imagen de ${vehiculo.marca} ${vehiculo.modelo}`}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className={styles.controls} role="group" aria-label="Controles del carrusel">
                            <button
                                className={styles.chev}
                                onClick={() => prev(vehiculo.id)}
                                aria-label="Anterior"
                            >
                                ‹
                            </button>

                            <div className={styles.dots} role="tablist" aria-label="Paginación">
                                {vehiculo.imagenes.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === index ? styles.active : ""}`}
                                        onClick={() =>
                                            setIndices((prev) => ({
                                                ...prev,
                                                [vehiculo.id]: i,
                                            }))
                                        }
                                        aria-label={`Ir a la imagen ${i + 1}`}
                                        aria-current={i === index ? "true" : undefined}
                                    />
                                ))}
                            </div>

                            <button
                                className={styles.chev}
                                onClick={() => next(vehiculo.id)}
                                aria-label="Siguiente"
                            >
                                ›
                            </button>
                        </div>
                    </main>
                );
            })}
        </>
    );
}
