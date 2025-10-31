import styles from "@/components/fileVehicle/mainInfo/mainInfo.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import ConsultButton from "@/components/buttons/consultButton/consultButton";

type Prop = {
    marca: string,
    km: number,
    modelo: string;
    anio: number;
    precio: number;
    vendedorId: number;
}

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

export default function MainInfo({marca, km, modelo, anio, precio, vendedorId}: Prop){
    const [vendedor, setVendedor] = useState<Vendedor>();

    useEffect(() => {
        fetch(`http://localhost:8080/api/vendedores/${vendedorId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVendedor(data)
                console.log(data);
            })
            .catch(error => {
                console.log("El error fue: " + error);
            })
    }, []);

    return(
        <div className={styles.vehicleInformationProperties}>
            <div className={styles.vehicleMainInfortationProperties}>
                <h1>{marca} {modelo}</h1>
                <span>{km}km | {anio}</span>
            </div>
            <div className={styles.priceInformationProperties}>
                <h1>Precio</h1>
                <span>${precio}</span>
            </div>
            <div className={styles.sallerInformationProperties}>
                <h1>Vendedor</h1>
                <Link href={`/perfil/${vendedor?.id}`} >
                    <span>{vendedor?.nombre}</span>
                </Link>
            </div>
            <Link href={`https://wa.me/${vendedor?.telefono}`}>
                <ConsultButton message={"Consultar"} />
            </Link>
        </div>
    )
}