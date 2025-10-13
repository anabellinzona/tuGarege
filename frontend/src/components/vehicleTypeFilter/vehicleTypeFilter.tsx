"use client";
import styles from "./vehicleTypeFilter.module.css";
import Image from "next/image";

type Prop = {
    filtro: string;
    image: string;
    isSelected?: boolean
}

export default function VehicleTypeFilter({filtro, image, isSelected}: Prop){
    return(
        <div className={`${styles.vehicleTypeFilterCardProperties} ${isSelected ? styles.selected : ''}`}>
            <Image
                src={image}
                alt={"Vehicle filter image"}
                fill
                style={{ objectFit: "contain" }}
            />
            <div className={styles.imageOverlay}></div>
            <h3 className={styles.filterTitle}>{filtro}</h3>
        </div>
    );
}