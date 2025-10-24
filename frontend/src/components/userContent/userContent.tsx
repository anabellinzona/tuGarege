"use client";

import {useState, useContext, useEffect} from "react";
import styles from "./userContent.module.css";
import Image from "next/image";
import PostCard from "@/components/postCard/postCard";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";

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

export default function UserContent() {
    const [activeTab, setActiveTab] = useState("posts");
    const { theme } = useContext(ThemeContext);
    const [vendedor, setVendedor] = useState<Vendedor>();

    useEffect(() => {
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
    }, []);

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
                            <Link href={`https://${vendedor?.telefono}`}>
                                <Image
                                    src={"/icons/phone.png"}
                                    alt={"Phone icon"}
                                    width={24}
                                    height={24}
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
