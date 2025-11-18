"use client"
import styles from './profileDescription.module.css'
import Image from 'next/image';
import {useEffect, useState} from "react";
import Link from "next/link";
import {authService} from "@/service/authService";
import {useParams} from "next/navigation";

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

type Prop = {
    idV?: string;
}

export default function ProfileDescription({idV}: Prop) {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [vendedor, setVendedor] = useState<Vendedor>();
    const [safeVendedorId, setSafeVendedorId] = useState<string | null>(null);
    const params = useParams();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        let idFromAuth: string | null = null;
        if (typeof window !== 'undefined') {
            const userData = authService.getUserData();
            if (userData && userData.id) {
                idFromAuth = userData.id;
            }
        }

        const paramId = (params?.id as string | undefined);
        const finalVendedorId = idV || paramId || idFromAuth;

        if (finalVendedorId) {
            setSafeVendedorId(finalVendedorId);

            fetch(`${API_URL}/api/vehiculos/vendedor/${finalVendedorId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error al cargar los vehículos");
                    }
                    return response.json();
                })
                .then(data => {
                    setVehiculos(data);
                })
                .catch(error => {
                    console.error("Error al cargar vehículos: " + error);
                });
        }
    }, [idV, params?.id]);

    useEffect(() => {
        const fetchVendedor = async () => {
            if (safeVendedorId) {
                fetch(`http://localhost:8080/api/vendedores/${safeVendedorId}`)
                    .then(response => {
                        if(!response.ok){
                            throw new Error("Error al cargar los datos del vendedor");
                        }
                        return response.json();
                    })
                    .then(data => {
                        setVendedor(data)
                    })
                    .catch(error => {
                        console.error("Error al cargar vendedor: " + error);
                    })
            }
        }
        fetchVendedor();
    }, [safeVendedorId]);
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
                            <h5>{vehiculos.length} publicaciones</h5>
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