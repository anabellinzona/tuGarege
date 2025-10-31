"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Carrousel from "@/components/fileVehicle/carrousel/carrousel";
import MainInfo from "@/components/fileVehicle/mainInfo/mainInfo";
import SecondInfo from "@/components/fileVehicle/secondInfo/secondInfo";
import ItemCharacteristic from "@/components/fileVehicle/itemCharacteristic/itemCharacteristic";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import Recommended from "@/components/recommended/recommended";

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
    vendedorId: number;
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
                <MainInfo marca={vehiculo.marca} km={vehiculo.km} modelo={vehiculo.modelo} anio={vehiculo.anio} precio={vehiculo.precio} vendedorId={vehiculo.vendedorId} />
            </div>
            <div className={styles.secondContainerProperties}>
                <div className={styles.secondInfoContainerProperties}>
                    <div>
                        <SecondInfo modelo={vehiculo.modelo} descripcion={vehiculo.descripcion} combustible={" "} kilometros={vehiculo.km}/>
                    </div>
                    <div className={styles.aditionalInfoContainerProperties}>
                        <h3>Datos adicionales</h3>
                        <ItemCharacteristic id={vehiculo.id}/>
                    </div>
                    <div className={styles.descriptionContainerProperties}>
                        <h3>Descripción</h3>
                        <div>{vehiculo.descripcion}</div>
                    </div>
                </div>
                <div className={styles.recommendedContainerProperties}>
                    <Recommended vehicleId={vehiculo.id} />
                </div>
            </div>
            <div className={styles.buttonContainerProperties}>
                <ConsultButton message={"Consultar por este vehículo"}/>
            </div>
        </section>
    );
}