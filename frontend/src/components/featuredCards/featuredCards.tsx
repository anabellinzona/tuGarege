"use client"

import Image from "next/image";
import styles from "./featuredCards.module.css";
import CardVehicle from "@/components/featuredCards/cardVehicle/cardVehicle";

export default function featuredCards(){
    return(
        <section className={styles.featuredCardsContainerProperties}>
            <div className={styles.titleProperties}>
                <h1>Destacados</h1>
            </div>

            <div className={styles.carouselContainer}>
                <CardVehicle/>
            </div>

        </section>
    );
}