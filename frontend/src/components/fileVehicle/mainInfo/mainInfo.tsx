import styles from "@/components/fileVehicle/mainInfo/mainInfo.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import EditableText from "@/components/fileVehicle/editableText/editableText";
import EditButton from "@/components/fileVehicle/editButton/editButton";
import EditableNumeric from "@/components/fileVehicle/editableNumeric/editableNumeric";

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
    moneda?: string;
    descripcion: string;
    tipo: string;
    fechaPublicacion?: string;
    destacado?: boolean;
    estado: string;
    imagenes: Imagen[];
    logoMarca?: string;
    anio: number;
    vendedorId: number;
}

type Prop = {
    vehiculo: Vehiculo | null;
    isEditable: boolean;
    editingField: string | null;
    onStartEdit: (field: keyof Vehiculo) => void;
    onCancelEdit: () => void;
    onSaveField: (field: keyof Vehiculo, value: string | number) => void;
    classname: string;
};

interface Vendedor {
    id: number;
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

export default function MainInfo({
                                     vehiculo,
                                     isEditable,
                                     onCancelEdit,
                                     onStartEdit,
                                     editingField,
                                     onSaveField,
                                     classname
                                 }: Prop) {
    const [vendedor, setVendedor] = useState<Vendedor>();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!vehiculo?.vendedorId) return;
        fetch(`${API_URL}/api/vendedores/${vehiculo.vendedorId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar el vendedor");
                }
                return response.json();
            })
            .then(data => setVendedor(data))
            .catch(error => console.log("El error fue: " + error));
    }, [vehiculo?.vendedorId]);

    if (!vehiculo) return null;

    return (
        <div className={styles.vehicleInformationProperties}>
            <button>Editar</button>
            <div className={styles.vehicleMainInfortationProperties}>
                <div className={styles.editableField}>
                    <h1>{vehiculo.marca}</h1>
                    <h1>{vehiculo.modelo}</h1>
                </div>

                {/* Kilómetros */}
                <div className={styles.editableField}>
                    <p>{vehiculo.km} km</p>
                    <span>|</span>
                    <p>{vehiculo.anio}</p>
                </div>
            </div>

            <div className={styles.priceInformationProperties}>
                <div className={styles.editableField}>
                    <h1>Precio</h1>
                </div>
                <span>${vehiculo.precio}</span>
            </div>

            <div className={styles.sallerInformationProperties}>
                <h1>Vendedor</h1>
                <Link href={`/perfil/${vendedor?.id}`}>
                    <span>{vendedor?.nombre}</span>
                </Link>
            </div>

            <Link href={`https://wa.me/${vendedor?.telefono}`}>
                <ConsultButton message={"Consultar"} />
            </Link>
        </div>
    );
}
