"use client";
import styles from "./alertMessage.module.css";
import Image from "next/image";

type AlertProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

export default function AlertMessage({ message, type, onClose }: AlertProps) {
    return (
        <div className={styles.main}>
            <div className={`${styles.alertBox} ${styles[type]}`}>
                <button className={styles.button} onClick={onClose}>✖</button>
                <p>{message}</p>
                <div className={styles.logo}>
                    <Image
                        src={'/logo/vertical.png'}
                        alt={'TuGarage logo'}
                        width={80}
                        height={54}
                    />
                </div>
            </div>
        </div>
    );
}