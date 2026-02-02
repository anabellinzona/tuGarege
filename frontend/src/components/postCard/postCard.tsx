"use client";

import { useEffect, useState } from "react";
import styles from "./postCard.module.css";
import Image from "next/image";
import { authService } from "@/service/authService";
import { useParams } from "next/navigation";
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

export default function PostCard() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [safeVendedorId, setSafeVendedorId] = useState<number | string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const [indices, setIndices] = useState<{ [vehiculoId: number]: number }>({});
    const params = useParams();
    const userData = authService.getUserData();
    const userId = userData?.id;



    useEffect(() => {
        // Inicializamos la carga en true al principio de la lógica
        setLoading(true);

        // 1. Obtenemos el ID del usuario SOLAMENTE en el entorno del navegador
        let idFromAuth: number | null = null;
        if (typeof window !== 'undefined') {
            const userData = authService.getUserData();
            if (userData && userData.id) {
                // Asumimos que userData.id es de tipo string
                idFromAuth = userData.id;
            }
        }

        // 2. Determinamos el ID final (desde la URL o desde la autenticación)
        const paramId = (params?.id as string | undefined);
        const finalVendedorId = paramId || idFromAuth;

        // 3. Guardamos el ID en el estado del componente
        setSafeVendedorId(finalVendedorId);


        if (finalVendedorId) {
            fetch(`${API_URL}/api/vehiculos/vendedor/${finalVendedorId}`)
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
                    console.error("Error al obtener vehículos:", error);
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            // 5. Si no hay ID de vendedor (ni en URL ni en auth), terminamos la carga.
            setError("No se pudo determinar el ID del vendedor para mostrar vehículos.");
            setLoading(false);
        }
    }, [params?.id]); // Re-ejecutar si el ID en la URL cambia

    const isOwner = !!(userId && safeVendedorId && Number(userId) === Number(safeVendedorId));

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

    const handleDelete = async (vehiculoId: number) => {
        if (!confirm("¿Seguro que deseas eliminar esta publicación?")) return;

        try {
            const token = authService.getToken();

            if (!token) {
                alert("Debes iniciar sesión");
                return;
            }

            const response = await fetch(`${API_URL}/api/vehiculos/eliminar/${vehiculoId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔥 LO QUE FALTABA
                }
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el vehículo");
            }

            setVehiculos(prev => prev.filter(v => v.id !== vehiculoId));

        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Hubo un error al eliminar la publicación.");
        }
    };


    console.log("userId:", userId);
    console.log("safeVendedorId:", safeVendedorId);
    console.log("canEdit:", Number(userId) === Number(safeVendedorId));


    return (
        <>
            {isOwner && (
                <Link href="/vehiculos/crear">
                    <main className={styles.main}>
                        <div className={styles.emptyCard}>
                            <span className={styles.plus}>+</span>
                        </div>
                    </main>
                </Link>
            )}

            {vehiculos.map((vehiculo) => {
                const index = indices[vehiculo.id] ?? 0;
                const imagenActual = vehiculo.imagenes[index];

                const canEdit = Number(userId) === Number(safeVendedorId);

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

                        {canEdit && (
                            <div className={styles.overlay}>
                                <Link href={`/fichaVehiculo/${vehiculo.id}?mode=edit`}
                                    className={styles.actionBtn + " " + styles.editBtn}>
                                    Editar publicación ✏
                                </Link>


                                <button
                                    className={styles.actionBtn + " " + styles.deleteBtn}
                                    onClick={() => handleDelete(vehiculo.id)}
                                >
                                    Eliminar publicación 🗙
                                </button>
                            </div>
                        )}
                    </main>
                );
            })}
        </>
    );
}