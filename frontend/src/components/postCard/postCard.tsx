"use client";

import { useState } from "react";
import styles from "./postCard.module.css";
import Image from "next/image";

export default function PostCard() {
    const imgs = [
        "/test/camioneta.jpeg",
        "/test/camioneta2.jpeg",
        "/test/camioneta3.jpeg",
    ];

    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? imgs.length - 1 : prevIndex - 1));
    };

    const next = () => {
        setIndex((prevIndex) => (prevIndex === imgs.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <Image
                    key={index}
                    src={imgs[index]}
                    alt="Vehículo descripto en la publicación"
                    fill
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className={styles.controls} role="group" aria-label="Controles del carrusel">
                <button className={styles.chev} onClick={prev} aria-label="Anterior">
                    ‹
                </button>

                <div className={styles.dots} role="tablist" aria-label="Paginación">
                    {imgs.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === index ? styles.active : ""}`}
                            onClick={() => setIndex(i)}
                            aria-label={`Ir a la imagen ${i + 1}`}
                            aria-current={i === index ? "true" : undefined}
                        />
                    ))}
                </div>

                <button className={styles.chev} onClick={next} aria-label="Siguiente">
                    ›
                </button>
            </div>
        </main>
    );
}
