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
            <div className={styles.carouselWrapper}>
                <button className={`${styles.arrowButton} ${styles.arrowLeft}`}>
                    <Image src={"/icons/arrowLeft.png"} alt={"arrow left"} width={24} height={24}/>
                </button>

                <div className={styles.carouselContainer}>
                   <CardVehicle/>
                </div>

                <button className={`${styles.arrowButton} ${styles.arrowRight}`}>
                    <Image src={"/icons/arrowRight.png"} alt={"arrow right"} width={24} height={24}/>
                </button>
            </div>
        </section>
    );
}