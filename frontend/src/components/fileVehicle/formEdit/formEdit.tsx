import styles from "./formEdit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import {authService} from "@/service/authService";

type Prop = {
    parametrosForm: string[],
    marca: string,
    modelo: string,
    km: number,
    anio: number,
    idV: number,
    onCloseForm: () => void
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

export default function FormEdit({ marca, modelo, km, anio, idV, onCloseForm, parametrosForm }: Prop) {
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
        if (!editedVehiculo) return;

        try {
            const body = {
                marca: editedVehiculo.marca,
                modelo: editedVehiculo.modelo,
                km: editedVehiculo.km,
                anio: editedVehiculo.anio
            };

            const token = authService.getToken();

            if (!token) {
                alert("Debes iniciar sesión para modificar vehículos");
                window.location.href = '/login';
                return;
            }

            // Verificar que el token tenga el formato correcto
            if (!token.startsWith('eyJ')) {
                alert("Token inválido. Por favor, vuelve a iniciar sesión.");
                localStorage.removeItem('token');
                window.location.href = '/login';
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const response = await fetch(`${API_URL}/api/vehiculos/${idV}`, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify(body)
            });

            // Intentar leer el body del error
            const responseText = await response.text();

            if (response.status === 204) {
                setCloseButton(true);
                alert("Cambios guardados correctamente");
                window.location.href = `/fichaVehiculo/${idV}`;
                return;
            }

            if (!response.ok) {
                throw new Error(responseText || "Error al guardar los cambios");
            }

            const updated = JSON.parse(responseText);
            setCloseButton(true);
            alert("Cambios guardados correctamente");
        } catch (error) {
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
                {parametrosForm.map(parametro => (
                    <div className={styles.inputsAndLabelProperties}>
                        <label>{parametro}</label>
                        <input
                            placeholder={parametro}
                            type="text"
                            name={parametro}
                            value={parametro || ""}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                {/*<div className={styles.inputsAndLabelProperties}>*/}
                {/*    <label>Modelo</label>*/}
                {/*    <input*/}
                {/*        placeholder={modelo}*/}
                {/*        type="text"*/}
                {/*        name="modelo"*/}
                {/*        value={editedVehiculo?.modelo || ""}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className={styles.inputsAndLabelProperties}>*/}
                {/*    <label>Kilómetros</label>*/}
                {/*    <input*/}
                {/*        placeholder={km.toString()}*/}
                {/*        type="number"*/}
                {/*        name="km"*/}
                {/*        value={editedVehiculo?.km || 0}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div className={styles.inputsAndLabelProperties}>*/}
                {/*    <label>Año</label>*/}
                {/*    <input*/}
                {/*        placeholder={anio.toString()}*/}
                {/*        type="number"*/}
                {/*        name="anio"*/}
                {/*        value={editedVehiculo?.anio || 0}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</div>*/}

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
                    onClick={onCloseForm}
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