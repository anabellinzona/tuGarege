'use client'

import styles from './Footer.module.css';
import SellButton from "@/components/buttons/sellButton/SellButton";
import Image from 'next/image';
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer className={styles.main}>
            <div className={styles.filters}>
                <div>
                    <h4>Marcas</h4>

                    <Link href={`/vehiculos?search=Toyota`}>
                        <h6>Toyota</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Ford`}>
                        <h6>Ford</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Chevrolet`}>
                        <h6>Chevrolet</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Fiat`}>
                        <h6>Fiat</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Renault`}>
                        <h6>Renault</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Volkswagen`}>
                        <h6>Volkswagen</h6>
                    </Link>
                    <Link href={`/vehiculos?search=Peugeot`}>
                        <h6>Peugeot</h6>
                    </Link>
                    <Link
                        href="/vehiculos"
                        className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Todas las marcas</h6>
                    </Link>
                </div>

                <div>
                    <h4>Año</h4>

                    <Link href={`/vehiculos?search=2025`}>
                        <h6>2025</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2024`}>
                        <h6>2024</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2023`}>
                        <h6>2023</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2022`}>
                        <h6>2022</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2021`}>
                        <h6>2021</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2020`}>
                        <h6>2020</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2019`}>
                        <h6>2019</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2018`}>
                        <h6>2018</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2017`}>
                        <h6>2017</h6>
                    </Link>
                    <Link href={`/vehiculos?search=2016`}>
                        <h6>2016</h6>
                    </Link>
                    <Link
                        href="/vehiculos"
                        className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Todas las marcas</h6>
                    </Link>
                </div>

                <div>
                    <h4>Carrocería</h4>

                    <Link href="/vehiculos"
                          className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Auto</h6>
                    </Link>
                    <Link href="/vehiculos"
                          className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Camioneta</h6>
                    </Link>
                    <Link href="/vehiculos"
                          className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Motos</h6>
                    </Link>
                    <Link
                        href="/vehiculos"
                        className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Todas las carrocerías</h6>
                    </Link>
                </div>

                <div>
                <h4>Estado</h4>

                    <Link href="/vehiculos"
                          className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Nuevo</h6>
                    </Link>
                    <Link href="/vehiculos"
                          className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Usado</h6>
                    </Link>
                    <Link
                        href="/vehiculos"
                        className={pathname === "/vehiculos" ? styles.activeLink : ""}
                    >
                        <h6>Todos los estados</h6>
                    </Link>
                </div>
            </div>

            <div className={styles.buttonDesktop}>
                <SellButton nameButton={"QUIERO VENDER"} link={"/"}/>
            </div>

            <div>
                <Image
                    src={'/logo/vertical.png'}
                    alt={'Logo TuGarage vertical'}
                    width={266}
                    height={180}
                />
            </div>

            <div className={styles.buttonMobile}>
                <SellButton nameButton={"QUIERO VENDER"} link={"/"}/>
            </div>
        </footer>
    )
}