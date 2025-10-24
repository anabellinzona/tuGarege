"use client"
import styles from './profileDescription.module.css'
import Image from 'next/image';
import {useEffect, useState} from "react";
import Link from "next/link";
import SellButton from "@/components/buttons/sellButton/SellButton";

interface Imagen {
    id: number;
    url: string;
}

interface Vehiculo {
    id: number;
    marca: string;
    modelo: string;
    km: number;
    precio: number;
    moneda: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion: string;
    destacado: boolean;
    estado: string;
    imagenes: Imagen[];
    logoMarca?: string;
}

interface Vendedor {
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
    contrasena: string;
    instagram: string;
    descripcion: string;
    fotoPerfil: string;
    ciudad: string;
}

export default function ProfileDescription() {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [vendedor, setVendedor] = useState<Vendedor>();

    useEffect(() => {
        const fetchVehiculo= async () => {
            fetch('http://localhost:8080/api/vehiculos/vendedor/1')
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al cargar los vehículos");
                    }
                    return response.json();
                })
                .then(data => {
                    setVehiculos(data)
                })
                .catch(error => {
                    console.log("El error fue: " + error);
                })
        }
        fetchVehiculo();
    }, []);

    useEffect(() => {
        const fetchVendedor = async () => {
            fetch('http://localhost:8080/api/vendedores/1')
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error al cargar los vehículos");
                    }
                    return response.json();
                })
                .then(data => {
                    setVendedor(data)
                })
                .catch(error => {
                    console.log("El error fue: " + error);
                })
        }
        fetchVendedor();
    }, []);

    return(
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.profileImage}>
                    <Image
                        src={vendedor?.fotoPerfil || "/logo/vertical.png"}
                        alt={'user profile image'}
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <div className={styles.description}>
                    <h3>{vendedor?.nombre}</h3>

                    <div className={styles.contactPlusPosts}>
                        <div className={styles.contactsWrapper}>
                            <div className={styles.contact}>
                                <Link href={`https://wa.me/${vendedor?.telefono}`}>
                                    <Image
                                        src={'/icons/wp.png'}
                                        alt={'WhatsApp icon'}
                                        fill
                                        style={{objectFit: 'cover'}}
                                    />
                                </Link>
                            </div>
                            <div className={styles.contactRed}>
                                <Link href={`https://wa.me/${vendedor?.telefono}`}>
                                    <Image
                                        src={'/icons/phone.png'}
                                        alt={'user profile image'}
                                        width={22}
                                        height={22}
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className={styles.postsQuantity}>
                            <h5>{vehiculos.length}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.moreInfo}>
                <h5>{vendedor?.direccion} Instragram: {vendedor?.instagram}</h5>
            </div>
        </main>
    )
}