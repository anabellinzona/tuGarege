"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Image from "next/image";
import Carrousel from "@/components/fileVehicle/carrousel/carrousel";
import MainInfo from "@/components/fileVehicle/mainInfo/mainInfo";

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

    if(loading) return <div>Cargando...</div>;
    if(!vehiculo) return <div>No se encontró el vehículo</div>;
    if(!vehiculo.imagenes || vehiculo.imagenes.length === 0) {
        return <p>No hay imágenes disponibles</p>;
    }

    return(
        <section className={styles.vehicleFileSectionContainerProperties}>
            <div className={styles.carrouselAndVehicleInformationProperties}>
                <Carrousel imagenes={vehiculo.imagenes}/>
                <MainInfo marca={vehiculo.marca} km={vehiculo.km} modelo={vehiculo.modelo} anio={vehiculo.anio} precio={vehiculo.precio} />
            </div>
            <div>
                <div>
                    <div>
                        <div className={styles.tableCharacteristicProperties}>
                            <h1>Características principales</h1>
                            <div className={styles.underlineProperties}></div>
                            <p><span>Modelo: </span>{vehiculo.modelo}</p>
                            <div className={styles.underlineProperties}></div>
                            <p><span>Kilometraje: </span>{vehiculo.km}km</p>
                            <div className={styles.underlineProperties}></div>
                            <p><span>Otras características/detalles: </span>{vehiculo.descripcion}</p>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <button>Consultar por este vehículo</button>
        </section>
    );
}