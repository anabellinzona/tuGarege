import styles from "@/components/fileVehicle/mainInfo/mainInfo.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConsultButton from "@/components/buttons/consultButton/consultButton";

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
    onEditClick: () => void;
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
                                     onEditClick,
                                 }: Prop) {

    const [vendedor, setVendedor] = useState<Vendedor>();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!vehiculo?.vendedorId) return;
        fetch(`${API_URL}/api/vendedores/${vehiculo.vendedorId}`)
            .then(response => response.json())
            .then(data => setVendedor(data))
            .catch(error => console.log("El error fue: " + error));
    }, [vehiculo?.vendedorId]);

    if (!vehiculo) return null;

    return (
        <div className={styles.vehicleInformationProperties}>
            <div className={styles.vehicleMainInforationProperties}>
                <div className={styles.editableField}>
                    <h1>{vehiculo.marca}</h1>
                    <h1>{vehiculo.modelo}</h1>
                </div>

                <div className={styles.editableField}>
                    <p>{vehiculo.km} km</p>
                    <span>|</span>
                    <p>{vehiculo.anio}</p>
                </div>
            </div>

            <div className={styles.priceInformationProperties}>
                <div className={styles.editableField}>
                    <h4>Precio</h4>
                </div>
                <span>${vehiculo.precio}</span>
            </div>

            <div className={styles.sallerInformationProperties}>
                <h4>Vendedor</h4>
                <Link href={`/perfil/${vendedor?.id}`}>
                    <span>{vendedor?.nombre}</span>
                </Link>
            </div>

            {isEditable ? (
                <button
                    onClick={onEditClick}
                    className={styles.modifeButtonProperties}
                >
                    Editar
                </button>
            ) : (
                <div className={styles.consultButton}>
                    <Link href={`https://wa.me/${vendedor?.telefono}`}>
                        <ConsultButton message={"Consultar"} />
                    </Link>
                </div>
            )}
        </div>
    );
}
