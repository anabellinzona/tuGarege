"use client";

import {useState, useContext, useEffect} from "react";
import styles from "./userContent.module.css";
import Image from "next/image";
import PostCard from "@/components/postCard/postCard";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import {authService} from "@/service/authService";
import {useParams} from "next/navigation";

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

export default function UserContent({idV}: Prop) {
    const [activeTab, setActiveTab] = useState("posts");
    const { theme } = useContext(ThemeContext);
    const [vendedor, setVendedor] = useState<Vendedor>();
    const [safeVendedorId, setSafeVendedorId] = useState<string | number | null>(null); // Nuevo estado
    const params = useParams();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        let idFromAuth: number | null = null;
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

            fetch(`${API_URL}/api/vendedores/${finalVendedorId}`)
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
                    console.error("El error fue: " + error);
                })
        }
    }, [idV, params?.id]);

    return (
        <main className={styles.main}>
            <div className={styles.bar}>
                <div
                    className={`${styles.iconContainer} ${activeTab === "posts" ? styles.active : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    <Image
                        src={theme === "light" ? "/icons/postDark.png" : "/icons/postLight.png"}
                        alt="posts icon"
                        width={30}
                        height={30}
                    />
                </div>

                <div
                    className={`${styles.iconContainer} ${activeTab === "info" ? styles.active : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    <Image
                        src={theme === "light" ? "/icons/infoDark.png" : "/icons/infoLight.png"}
                        alt="info icon"
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            {activeTab === "posts" ? (
                <div className={styles.postsGrid}>
                    {/* 5. Nota: Si PostCard necesita el ID, debes pasarlo como prop */}
                    {/* <PostCard vendedorId={safeVendedorId} /> */}
                    <PostCard />
                </div>
            ) : (
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <div className={styles.contactImage}>
                            <Link href={`https://wa.me/${vendedor?.telefono}`}>
                                <Image
                                    src={"/icons/wp.png"}
                                    alt={"WhatsApp icon"}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </Link>
                        </div>
                        <h3>{vendedor?.telefono}</h3>
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.contactImageRed}>
                            <Link href={`tel:${vendedor?.telefono}`}>
                                <Image
                                    src={"/icons/white-phone.png"}
                                    alt={"Phone icon"}
                                    width={40}
                                    height={40}
                                />
                            </Link>
                        </div>
                        <h3>{vendedor?.telefono}</h3>
                    </div>
                </div>
            )}
        </main>
    );
}