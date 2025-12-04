"use client";
import styles from './profileDescription.module.css'
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authService } from "@/service/authService";

interface Vendedor {
    id?: number;
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
    imagenes: { id: number; url: string }[];
}

type Prop = {
    idV?: string;
};

export default function ProfileDescription({ idV }: Prop) {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [vendedor, setVendedor] = useState<Vendedor | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [editedVendedor, setEditedVendedor] = useState<Vendedor | null>(null);
    const [isOwner, setIsOwner] = useState(false);

    const params = useParams();
    const vendedorId = idV || params?.id || authService.getUserData()?.id;
    const loggedUserId = authService.getUserData()?.id;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const numericVendedorId = Number(vendedorId);
    const numericLoggedId = Number(loggedUserId);

    useEffect(() => {
        if (numericLoggedId && numericVendedorId && numericLoggedId === numericVendedorId) {
            setIsOwner(true);
        }
    }, [numericLoggedId, numericVendedorId]);

    useEffect(() => {
        if (!vendedorId) return;

        fetch(`${API_URL}/api/vendedores/${vendedorId}`)
            .then(res => res.json())
            .then(data => {
                setVendedor(data);
                setEditedVendedor(data);
            })
            .catch(err => console.log("Error:", err));

        fetch(`${API_URL}/api/vehiculos/vendedor/${vendedorId}`)
            .then(res => res.json())
            .then(data => setVehiculos(data))
            .catch(err => console.log("Error:", err));
    }, [vendedorId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editedVendedor) return;
        const { name, value } = e.target;
        setEditedVendedor({ ...editedVendedor, [name]: value });
    };

    console.log("Guardando vendedor:", editedVendedor);
    const handleSave = async () => {
        console.log("Guardando vendedor:", editedVendedor);
        if (!editedVendedor) return;

        try {
            const id = Number(vendedorId);
            const token = authService.getToken();

            const body = {
                nombre: editedVendedor.nombre,
                direccion: editedVendedor.direccion,
                telefono: editedVendedor.telefono,
                email: editedVendedor.email,
                instagram: editedVendedor.instagram,
                descripcion: editedVendedor.descripcion,
                ciudad: editedVendedor.ciudad,
                fotoPerfil: editedVendedor.fotoPerfil,
            };

            console.log("Token enviado:", token);
            const response = await fetch(`${API_URL}/api/vendedores/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(body),
            });

            if (response.status === 204) {
                setVendedor(editedVendedor);
                setEditMode(false);
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Error al guardar los cambios");
            }

            const updated = await response.json();
            setVendedor(updated);
            setEditedVendedor(updated);
            setEditMode(false);

            alert("Cambios guardados correctamente");

        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudieron guardar los cambios. Intentelo nuevamente.");
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.profileImage}>
                    <Image
                        src={vendedor?.fotoPerfil || "/logo/vertical.png"}
                        alt={'user profile image'}
                        fill
                        style={{objectFit: 'cover'}}
                        priority
                    />
                </div>

                <div className={styles.description}>
                    {editMode ? (
                        <input
                            type="text"
                            name="nombre"
                            value={editedVendedor?.nombre || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                        />
                    ) : (
                        <h3>{vendedor?.nombre}</h3>
                    )}

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
                                <Link href={`tel:${vendedor?.telefono}`}>
                                    <Image
                                        src={'/icons/white-phone.png'}
                                        alt={'phone icon'}
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
                {editMode ? (
                    <>
                        <input
                            type="text"
                            name="direccion"
                            value={editedVendedor?.direccion || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="Dirección"
                        />

                        <input
                            type="text"
                            name="telefono"
                            value={editedVendedor?.telefono || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="Teléfono"
                        />

                        <input
                            type="email"
                            name="email"
                            value={editedVendedor?.email || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="Email"
                        />

                        <input
                            type="text"
                            name="instagram"
                            value={editedVendedor?.instagram || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="Instagram"
                        />

                        <input
                            type="text"
                            name="ciudad"
                            value={editedVendedor?.ciudad || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="Ciudad"
                        />

                        <textarea
                            name="descripcion"
                            value={editedVendedor?.descripcion || ""}
                            onChange={handleChange}
                            className={styles.textareaEdit}
                            placeholder="Descripción"
                        />

                        <input
                            type="text"
                            name="fotoPerfil"
                            value={editedVendedor?.fotoPerfil || ""}
                            onChange={handleChange}
                            className={styles.inputEdit}
                            placeholder="URL de foto de perfil"
                        />
                    </>
                ) : (
                    <h5>
                        {vendedor?.direccion} — {vendedor?.ciudad}<br/>
                        Instagram: {vendedor?.instagram}<br/>
                        Email: {vendedor?.email}<br/>
                        Tel: {vendedor?.telefono}<br/><br/>
                        {vendedor?.descripcion}
                    </h5>
                )}
            </div>



            {isOwner && (
                <div className={styles.editButtons}>
                    {!editMode ? (
                        <button onClick={() => setEditMode(true)} className={styles.editBtn}>
                            Editar perfil
                        </button>
                    ) : (
                        <button onClick={handleSave} className={styles.saveBtn}>
                            Guardar cambios
                        </button>
                    )}
                </div>
            )}
        </main>
    );
}
