"use client";

import styles from "./NavBar.module.css";
import SellButton from "@/components/buttons/sellButton/SellButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function NavBar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className={styles.main}>
            <div>
                <Image
                    src={"/logo/horizontal.png"}
                    alt={"logo de TuGarage"}
                    width={230}
                    height={53}
                />
            </div>

            <div className={styles.links}>
                <Link
                    href="/"
                    className={pathname === "/" ? styles.activeLink : ""}
                >
                    <h5>Inicio</h5>
                </Link>

                <Link
                    href="/Vehicles"
                    className={pathname === "/Vehicles" ? styles.activeLink : ""}
                >
                    <h5>Vehículos</h5>
                </Link>

                <Link
                    href="/FormSale"
                    className={pathname === "/FormSale" ? styles.activeLink : ""}
                >
                    <h5>Iniciar sesión</h5>
                </Link>
            </div>

            <div className={styles.actions}>
                <SellButton nameButton={"QUIERO VENDER"} link={"/FormSale"}/>
                <button
                    onClick={toggleTheme}
                    className={styles.darkModeButton}
                    aria-label="Cambiar modo de tema"
                >
                    <Image
                        src={theme === "light" ? "/icons/darkMode.png" : "/icons/lightMode.png"}
                        alt={"Cambiar modo de tema"}
                        width={40}
                        height={40}
                    />
                </button>
            </div>
        </nav>
    );
}
