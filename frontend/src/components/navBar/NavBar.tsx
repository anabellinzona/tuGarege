"use client";

import styles from "./NavBar.module.css";
import SellButton from "@/components/buttons/sellButton/SellButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function NavBar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className={styles.main}>
            <div className={styles.left}>
                <Image
                    src={"/logo/horizontal.png"}
                    alt={"logo de TuGarage"}
                    width={180}
                    height={42}
                    className={styles.logo}
                />
            </div>

            <button
                className={styles.menuButton}
                onClick={toggleMenu}
                aria-label="Abrir menú"
            >
                <Image
                    src={menuOpen ? "/icons/close.png" : "/icons/menu.png"}
                    alt={"Menú"}
                    width={30}
                    height={30}
                />
            </button>

            <div className={styles.linksDesktop}>
                <Link href="/" className={pathname === "/" ? styles.activeLink : ""}>
                    <h5>Inicio</h5>
                </Link>

                <Link href="/vehiculos" className={pathname === "/vehiculos" ? styles.activeLink : ""}>
                    <h5>Vehículos</h5>
                </Link>

                <Link href="/formularioVenta" className={pathname === "/formularioVenta" ? styles.activeLink : ""}>
                    <h5>Iniciar sesión</h5>
                </Link>
            </div>

            <div
                className={`${styles.navContent} ${menuOpen ? styles.open : ""}`}
            >
                <div className={styles.linksMobile}>
                    <Link href="/" className={pathname === "/" ? styles.activeLink : ""}>
                        <h5>Inicio</h5>
                    </Link>

                    <Link href="/vehiculos" className={pathname === "/vehiculos" ? styles.activeLink : ""}>
                        <h5>Vehículos</h5>
                    </Link>

                    <Link href="/formularioVenta" className={pathname === "/formularioVenta" ? styles.activeLink : ""}>
                        <h5>Iniciar sesión</h5>
                    </Link>
                </div>

                <div className={styles.actions}>
                    <SellButton nameButton={"QUIERO VENDER"} link={"/formularioVenta"}/>
                    <button
                        onClick={toggleTheme}
                        className={styles.darkModeButton}
                        aria-label="Cambiar modo de tema"
                    >
                        <Image
                            src={theme === "light" ? "/icons/darkMode.png" : "/icons/lightMode.png"}
                            alt={"Cambiar modo de tema"}
                            width={35}
                            height={35}
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
}
