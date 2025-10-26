"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Image from "next/image";

type Prop = {
    id: string;
}

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
    anio: number;
}

export default function FileVehicle({id}: Prop){
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const [imagenActual, setImagenActual] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:8080/api/vehiculos/${id}`)
            .then((response) =>{
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                console.log("=== DEBUG ===");
                console.log("Data completa:", data);
                console.log("Tipo de data:", typeof data);
                console.log("Es array?", Array.isArray(data));
                console.log("Tiene imagenes?", data?.imagenes);
                console.log("============");

                setVehiculo(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("El error fue: " + error);
                setLoading(false);
            });
    }, [id]);


    const next = () => {
        if (!vehiculo?.imagenes) return;

        setImagenActual((prev) =>
            prev === vehiculo.imagenes.length - 1 ? 0 : prev + 1
        );
    };

    const prev = () => {
        if (!vehiculo?.imagenes) return;

        setImagenActual((prev) =>
            prev === 0 ? vehiculo.imagenes.length - 1 : prev - 1
        );
    };

    const irAImagen = (index: number) => {
        setImagenActual(index);
    }

    if(loading) return <div>Cargando...</div>;
    if(!vehiculo) return <div>No se encontró el vehículo</div>;
    if(!vehiculo.imagenes || vehiculo.imagenes.length === 0) {
        return <p>No hay imágenes disponibles</p>;
    }

    return(
        <section className={styles.vehicleFileSectionContainerProperties}>
            <div className={styles.carrouselAndVehicleInformationProperties}>
                <div className={styles.vehicleFileImagesCarrouselProperties}>
                    <Image
                        src={vehiculo.imagenes[imagenActual].url}
                        alt={`${vehiculo.modelo} - Imagen ${imagenActual + 1}`}
                        fill
                        style={{objectFit: 'cover'}}
                        priority={imagenActual === 0}
                    />

                    {vehiculo.imagenes.length > 1 && (
                        <div className={styles.carrouselButtonsProperties}>
                            <button
                                onClick={prev}
                                className={styles.botonPrev}
                            >
                                ‹
                            </button>
                            <button
                                onClick={next}
                                className={styles.botonNext}
                            >
                                ›
                            </button>
                        </div>
                    )}

                    {/* Contador */}
                    <div className={styles.contadorProperties}>
                        {imagenActual + 1} / {vehiculo.imagenes.length}
                    </div>
                </div>
                <div className={styles.vehicleInformationProperties}>
                    <div className={styles.vehicleMainInfortationProperties}>
                        <h1>{vehiculo.marca} {vehiculo.modelo}</h1>
                        <span>{vehiculo.km}km | {vehiculo.anio}</span>
                    </div>
                    <div className={styles.priceInformationProperties}>
                        <h1>Precio</h1>
                        <span>${vehiculo.precio}</span>
                    </div>
                    <div className={styles.sallerInformationProperties}>
                        <h1>Vendedor</h1>
                        <span>Horacio</span>
                    </div>
                    <button className={styles.askButtonProperties}>Consultar</button>
                </div>
            </div>
            <button>Consultar por este vehículo</button>
        </section>
    );
}