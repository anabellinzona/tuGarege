"use client";

import styles from "./NavBar.module.css";
import SellButton from "@/components/buttons/sellButton/SellButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {authService} from "@/service/authService";

export default function NavBar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(auth);

        const handleStorageChange = () => {
            const authStatus = localStorage.getItem("isAuthenticated") === "true";
            localStorage.setItem("isAuthenticated", "true");
            setIsAuthenticated(authStatus);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = () => {
        authService.logout();
        localStorage.setItem("isAuthenticated", "false");
        setIsAuthenticated(false);
        window.location.href = "/";
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

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

            <div className={styles.navContent}>
                <Link
                    href="/"
                    className={pathname === "/" ? styles.activeLink : ""}
                >
                    <h5>Inicio</h5>
                </Link>

                <Link
                    href="/vehiculos"
                    className={pathname === "/vehiculos" ? styles.activeLink : ""}
                >
                    <h5>Vehículos</h5>
                </Link>

                {isAuthenticated ? (
                        <Link href={"/perfil"} >
                            <h5>Mi perfil</h5>
                        </Link>
                ) : (
                    <Link
                        href="/formularioVenta"
                        className={pathname === "/formularioVenta" ? styles.activeLink : ""}
                    >
                        <h5>Iniciar sesión</h5>
                    </Link>
                )}
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

                    {isAuthenticated ? (
                        <Link href={"/perfil"} >
                            <h5>Mi perfil</h5>
                        </Link>
                    ) : (
                        <Link
                            href="/formularioVenta"
                            className={pathname === "/formularioVenta" ? styles.activeLink : ""}
                        >
                            <h5>Iniciar sesión</h5>
                        </Link>
                    )}
                </div>

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <button onClick={handleLogout}>
                            <SellButton nameButton={"CERRAR SESIÓN"} link={"/"} />
                        </button>
                    ) : (
                        <SellButton nameButton={"QUIERO VENDER"} link={"/formularioVenta"} />
                    ) }
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
