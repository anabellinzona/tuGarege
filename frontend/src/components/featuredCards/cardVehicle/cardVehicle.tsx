import {useEffect, useState, useRef} from "react";
import styles from "@/components/featuredCards/cardVehicle/cardVehicle.module.css";
import Link from "next/link";
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

type Prop = {
    id?: string;
    vehicle?: Vehiculo;
}

export default function CardVehicle({id, vehicle}: Prop){
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const carouselRef = useRef<HTMLDivElement>(null);

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
                    <Link href="../fileVehicle/fileVehicle" key={vehiculo.id}>
                        <div className={styles.vehicleCardProperties}>
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
                    </Link>
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