"use client"
import {useEffect, useState, useRef} from "react";
import styles from "../cardVehicle/cardVehicle.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


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
    vendedorId: number;
}

interface Vendedor {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    contrasena: string;
    instagram: string;
    descripcion: string;
    fotoPerfil: string;
    ciudad: string;
}

export default function CardVehicle(){
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [vendedor, setVendedor] = useState<Vendedor>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const carouselRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const fetchVehicle = async () => {
        fetch(`${API_URL}/api/vehiculos/destacados`)
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
        }
        fetchVehicle();
    }, [])


    const fetchSaller = async (id:number) => {
        fetch(`${API_URL}/api/vendedores/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setVendedor(data)
                setLoading(false)
            })
            .catch(error => {
                console.log("El error fue: " + error);
                setError(error.message);
                setLoading(false);
            })
    }

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 400; // Ajusta este valor según el ancho de tus cards
            const newScrollPosition = direction === 'left'
                ? carouselRef.current.scrollLeft - scrollAmount
                : carouselRef.current.scrollLeft + scrollAmount;

            carouselRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };

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
                <p>Error: {error}</p>
            </section>
        );
    }

    if (vehiculos.length === 0) {
        return (
            <section className={styles.featuredCardsContainerProperties}>
                <p>No hay vehículos destacados disponibles</p>
            </section>
        );
    }

    return (
        <div className={styles.carouselWrapper}>
            <button
                className={`${styles.arrowButton} ${styles.arrowLeft}`}
                onClick={() => scroll('left')}
                aria-label="Anterior"
            >
                <Image src={"/icons/arrowLeft.png"} alt={"arrow left"} width={24} height={24}/>
            </button>

            <div className={styles.carouselContainer} ref={carouselRef}>
                {vehiculos.map((vehiculo) => (
                    <div
                        key={vehiculo.id}
                        className={styles.vehicleCardProperties}
                        onClick={() => router.push(`/fichaVehiculo/${vehiculo.id}`)}
                        onMouseEnter={() => fetchSaller(vehiculo.vendedorId)}
                    >
                        <div className={styles.vehicleImageProperties}>
                            <Image
                                src={vehiculo.imagenes?.[0]?.url || "/backgrounds/imageNotFound.png"}
                                alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                                fill
                                style={{objectFit: "cover"}}
                            />
                            <div className={styles.overlay}>
                                <div className={styles.contact}>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`https://wa.me/${vendedor?.telefono}`);
                                        }}
                                        className={styles.contactImage}
                                    >
                                        <Image
                                            src={"/icons/wp.webp"}
                                            alt={"WhatsApp icon"}
                                            fill
                                            style={{objectFit: "cover"}}
                                        />
                                    </div>
                                </div>

                                <div className={styles.contact}>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`https://wa.me/${vendedor?.telefono}`);
                                        }}
                                        className={styles.contactImage}
                                    >
                                        <Image
                                            src={"/icons/phone.png"}
                                            alt={"Phone icon"}
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.infoVehicleProperties}>
                            <div>
                                <h6>{vehiculo.marca} {vehiculo.modelo}</h6>
                                <span>${vehiculo.precio}</span>
                            </div>

                            <div className={styles.logoVehicleProperties}>
                                <Image
                                    src={vendedor?.fotoPerfil || "/logo/vertical.png"}
                                    alt={`Logo ${vehiculo.marca}`}
                                    fill
                                    style={{objectFit: "contain"}}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <button
                className={`${styles.arrowButton} ${styles.arrowRight}`}
                onClick={() => scroll('right')}
                aria-label="Siguiente"
            >
                <Image src={"/icons/arrowRight.png"} alt={"arrow right"} width={24} height={24}/>
            </button>
        </div>
    )
}