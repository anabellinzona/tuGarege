"use client";

import { useState } from "react";
import styles from "./orderButton.module.css";

interface Props {
    onSelect: (order: string) => void;
}

export default function OrderButton({ onSelect }: Props) {
    const [open, setOpen] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value);
        setOpen(false);
    };

    return(
        <main className={styles.orderWrapper}>
            <button
                className={styles.orderButton}
                onClick={() => setOpen(!open)}
            >
                Ordenar ▼
            </button>

            {open && (
                <div className={styles.dropdown}>
                    <p onClick={() => handleSelect("precio-asc")}>Menor precio</p>
                    <p onClick={() => handleSelect("precio-desc")}>Mayor precio</p>
                    <p onClick={() => handleSelect("km-asc")}>Menor kilometraje</p>
                    <p onClick={() => handleSelect("km-desc")}>Mayor kilometraje</p>
                    <p onClick={() => handleSelect("anio-asc")}>Menor año de fabricación</p>
                    <p onClick={() => handleSelect("anio-desc")}>Mayor año de fabricación</p>
                </div>
            )}
        </main>
    )
}