import styles from "./recommended.module.css"
import {useEffect, useState} from "react";
import StandardCard from "@/components/standardCard/standardCard";

type Prop = {
    vehicleId: number;
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

export default function Recommended({vehicleId}: Prop){
    const [sugerencias, setSugerencias] = useState<Vehiculo[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!vehicleId) return;
        fetch(`${API_URL}/api/vehiculos/sugerencias/${vehicleId}`)
            .then(res => {
                if (!res.ok) throw new Error("Error al cargar sugerencias");
                return res.json();
            })
            .then(data => setSugerencias(data))
            .catch(err => console.error(err));
    }, [vehicleId]);


    return(
        <section className={styles.recommendedProperties}>
            <h2>Podría interesarte</h2>
            {sugerencias.map((sugerencia) => (
                <StandardCard
                    key={sugerencia.id}
                    image={
                        sugerencia.imagenes[0] != null
                            ? sugerencia.imagenes[0].url
                            : "/backgrounds/imageNotFound.png"
                    }
                    id={sugerencia.id}
                    modelo={sugerencia.modelo}
                    precio={sugerencia.precio}
                    marca={sugerencia.marca}
                />
            ))}
        </section>
    );
}