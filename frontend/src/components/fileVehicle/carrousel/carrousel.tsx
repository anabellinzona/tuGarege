"use client";

import styles from "@/components/fileVehicle/carrousel/carrousel.module.css";
import Image from "next/image";
import {useState} from "react";

interface Imagen {
    id: number;
    url: string;
}

type Prop = {
    imagenes: Imagen[];
}

export default function Carrousel({imagenes}: Prop){
    const [imagenActual, setImagenActual] = useState(0);

    const next = () => {
        if (!imagenes) return;

        setImagenActual((prev) =>
            prev === imagenes.length - 1 ? 0 : prev + 1
        );
    };

    const prev = () => {
        if (!imagenes) return;

        setImagenActual((prev) =>
            prev === 0 ? imagenes.length - 1 : prev - 1
        );
    };

    return(
        <div className={styles.vehicleFileImagesCarrouselProperties}>
            {imagenes.length >= 1 && (
                <Image
                src={imagenes[imagenActual].url}
                alt={`Imagen ${imagenActual + 1}`}
                fill
                style={{objectFit: 'cover'}}
                priority={imagenActual === 0}
            />
            ) || imagenes.length == 0 && (
                <Image
                    src={"/backgrounds/imageNotFound.png"}
                    alt={`Imagen ${imagenActual + 1}`}
                    fill
                    style={{objectFit: 'cover'}}
                    priority={imagenActual === 0}
                    />
            )}

            {imagenes.length > 1 && (
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

            {imagenes.length >= 1 && (
            <div className={styles.contadorProperties}>
                {imagenActual + 1} / {imagenes.length}
            </div>
            )}
        </div>
    );
}