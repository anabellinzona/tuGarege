import styles from "./formEdit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import {authService} from "@/service/authService";

type Prop = {
    marca: string,
    modelo: string,
    km: number,
    anio: number,
    idV: number
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
    anio: number;
    imagenes: { id: number; url: string }[];
}

export default function FormEdit({ marca, modelo, km, anio, idV }: Prop) {
    const [closeButton, setCloseButton] = useState(false);
    const [editedVehiculo, setEditedVehiculo] = useState<Vehiculo | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Inicializar editedVehiculo con los props
    useEffect(() => {
        setEditedVehiculo({
            id: idV,
            marca,
            modelo,
            km,
            anio,
            precio: 0,
            moneda: '',
            descripcion: '',
            tipo: '',
            fechaPublicacion: '',
            destacado: false,
            estado: '',
            imagenes: []
        });
    }, [marca, modelo, km, anio, idV]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editedVehiculo) return;
        const { name, value } = e.target;

        const finalValue = name === 'km' || name === 'anio' ? Number(value) : value;

        setEditedVehiculo({ ...editedVehiculo, [name]: finalValue });
    };

    const handleSave = async () => {
        console.log("ENTRÉ A LA FUNCIÓN", editedVehiculo);
        if (!editedVehiculo) return;

        try {
            const body = {
                marca: editedVehiculo.marca,
                modelo: editedVehiculo.modelo,
                km: editedVehiculo.km,
                anio: editedVehiculo.anio
            };

            const token = authService.getToken();

            console.log(token);

            console.log("ESTO MANDO POR EL BODY", body);

            const response = await fetch(`${API_URL}/vehiculos/${idV}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(body)
            });

            if (response.status === 204) {
                setCloseButton(true);
                alert("Cambios guardados correctamente");
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Error al guardar los cambios");
            }

            const updated = await response.json();
            setCloseButton(true);
            alert("Cambios guardados correctamente");
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudieron guardar los cambios. Inténtelo nuevamente.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // ← Previene recarga
        await handleSave();
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // ← Previene recarga
        setCloseButton(true);
    };

    if (closeButton) return null; // O muestra algo diferente

    return (
        <form onSubmit={handleSubmit} className={styles.formProperties}>
            <div className={styles.formComponentsProperties}>
                <div className={styles.inputsAndLabelProperties}>
                    <label>Marca</label>
                    <input
                        placeholder={marca}
                        type="text"
                        name="marca"
                        value={editedVehiculo?.marca || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputsAndLabelProperties}>
                    <label>Modelo</label>
                    <input
                        placeholder={modelo}
                        type="text"
                        name="modelo"
                        value={editedVehiculo?.modelo || ""}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputsAndLabelProperties}>
                    <label>Kilómetros</label>
                    <input
                        placeholder={km.toString()}
                        type="number"
                        name="km"
                        value={editedVehiculo?.km || 0}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputsAndLabelProperties}>
                    <label>Año</label>
                    <input
                        placeholder={anio.toString()}
                        type="number"
                        name="anio"
                        value={editedVehiculo?.anio || 0}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className={styles.modifeButton}
                >
                    Modificar
                </button>
            </div>

            <div className={styles.closesButtonProperties}>
                <button
                    type="button"  // ← MUY IMPORTANTE
                    onClick={handleClose}
                >
                    <Image
                        src="/icons/close.png"
                        alt="Button to close"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </form>
    );
}