"use client"
import styles from "@/components/fileVehicle/itemCharacteristic/itemCharacteristic.module.css";
import Image from "next/image";
import {useEffect, useState} from "react";

type Prop = {
    id: number;
}

interface Caracteristica {
    id: number;
    nombre: string;
    categoria?: string;
    valorNumerico?: number;
    valorTexto?: string;
}

export default function ItemCharacteristic({id}: Prop){
    const [caracteristicas, setCaracteristica] = useState<Caracteristica[]>([])
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        fetch(`${API_URL}/api/caracteristicas/vehiculo/${id}`)
            .then(response => {
                if (!response.ok) {
                    console.error("Status:", response.status);
                    throw new Error("Error al cargar las características");
                }
                return response.json();
            })
            .then(data => setCaracteristica(data))
            .catch(error => console.log("El error fue:", error));

    }, [id]);
    return(
        <div className={styles.itemsContainerProperties}>
            {caracteristicas.map(caracteristica => (
                <div className={styles.detailItem}>
                    <Image src={"/icons/colorIcon.png"} alt={"Icono de color"} width={24} height={24} />
                    <p>{caracteristica.nombre}: <strong>{caracteristica.valorTexto}{caracteristica.valorNumerico}</strong></p>
                </div>
            ))}
        </div>
    );
}