"use client"
import styles from "./formEdit.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { authService } from "@/service/authService";
import { useRouter } from "next/navigation"

interface Imagen {
    id?: number;
    url: string;
}

interface Campo {
    name: string;
    value: string | number | boolean | Imagen[];
    type: 'text' | 'number' | 'textarea' | 'checkbox' | 'option' | 'file';
    label: string;
}

type Prop = {
    campos: Campo[];
    idV?: number;
    mode: 'edit' | 'create';
    onCloseForm: () => void;
    onVehiculoUpdated: (v: any) => void;
};


export default function FormEdit({ idV, mode, onCloseForm, campos, onVehiculoUpdated }: Prop) {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        const initialValues: Record<string, any> = {};

        campos.forEach(campo => {
            initialValues[campo.name] = campo.value;
        });

        initialValues.imagenes = initialValues.imagenes || [];

        setFormData(initialValues);
    }, [campos]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let finalValue: any = value;

        if (type === "number") finalValue = Number(value);
        if (type === "checkbox") finalValue = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

     const uploadImageToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "vehiculos_unsigned");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dv2synj8w/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        console.log("URL IMAGEN: " + data.secure_url);
        return data.secure_url;
     };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const token = authService.getToken();

            if (!token) {
                alert("Debes iniciar sesión.");
                window.location.href = '/login';
                return;
            }

            if (!token.startsWith("eyJ")) {
                alert("Token inválido, vuelve a iniciar sesión.");
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }

            // const endpoint = `${API_URL}/api/vehiculos/${idV}`;

            const endpoint =
                mode === "create"
                    ? `${API_URL}/api/vehiculos`
                    : `${API_URL}/api/vehiculos/${idV}`;

            const method = mode === "create" ? "POST" : "PUT";

            console.log("📡 URL FINAL DEL PUT:", endpoint);

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            console.log("📬 HEADERS:", headers);

            console.log("➡️ HACIENDO FETCH PUT...");


            const response = await fetch(endpoint, {
                method,
                headers,
                body: JSON.stringify(formData)
            });

            console.log("📥 STATUS DEL BACKEND:", response.status);
            console.log("📩 RESPONSE COMPLETA:", response);

            const responseText = await response.text();
            console.log("📄 RESPONSE TEXT:", responseText);

            if (!response.ok) {
                console.log("❌ ERROR EN RESPONSE");
                throw new Error(responseText || "Error desconocido");
            }

            alert("Cambios guardados correctamente");

            if (mode === "create") {
                const nuevoVehiculo = JSON.parse(responseText);
                router.push(`/fichaVehiculo/${nuevoVehiculo.id}?mode=view`);
                return;
            } else {
                const updated = await fetch(`${API_URL}/api/vehiculos/${idV}`);
                const vehiculoActualizado = await updated.json();
                onVehiculoUpdated(vehiculoActualizado);
                onCloseForm();
            }

        } catch (error) {
            console.log("🔥 ERROR CAPTURADO:", error);
            alert("Error al guardar los cambios.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSave();
    };


    if (!formData || Object.keys(formData).length === 0) {
        return <p>Cargando...</p>;
    }

    return (
        <form onSubmit={handleSubmit} className={mode === "create" ? styles.formPropertiesCreate : styles.formProperties}>
            <div className={mode === "create" ? styles.formComponentsPropertiesCreate : styles.formComponentsProperties}>
                {campos.map((campo) => (
                    <div key={campo.name} className={styles.inputsAndLabelProperties}>
                        <label>{campo.label}</label>

                        {campo.type === 'textarea' ? (
                            <textarea
                                name={campo.name}
                                value={formData[campo.name] ?? ""}
                                onChange={handleChange}
                            />
                        ) : campo.type === 'checkbox' ? (
                            <input
                                type="checkbox"
                                name={campo.name}
                                checked={formData[campo.name] ?? false}
                                placeholder={formData[campo.name] ?? false}
                                onChange={handleChange}
                            />
                        ) : campo.type === 'option' ? (
                            campo.name === 'estado' ? (
                                <select
                                    name={campo.name}
                                    value={formData[campo.name] ?? ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="Usado">Usado</option>
                                    <option value="Nuevo">Nuevo</option>
                                </select>
                            ) : (
                                <select
                                    name={campo.name}
                                    value={formData[campo.name] ?? ""}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Camioneta">Camioneta</option>
                                    <option value="Moto">Moto</option>
                                </select>
                            )
                        ) : campo.type === 'file' ? (
                            <div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={async (e) => {
                                        if (!e.target.files) return;

                                        setUploadingImages(true);

                                        const nuevas: { url: string }[] = [];

                                        for (const file of Array.from(e.target.files)) {
                                            const url = await uploadImageToCloudinary(file);
                                            nuevas.push({ url });
                                        }

                                        setFormData(prev => ({
                                            ...prev,
                                            imagenes: [
                                                ...(prev.imagenes || []), // mantiene viejas (PUT)
                                                ...nuevas                 // agrega nuevas (POST y PUT)
                                            ]
                                        }));

                                        setUploadingImages(false);
                                    }}

                                />
                                {formData.imagenes?.map((img: any, i: number) => (
                                    <div key={i}>
                                        <Image src={img.url} height={120} width={120} alt={"Vehicle image"} />
                                        <button onClick={() => {setFormData(prev => ({
                                            ...prev,
                                            imagenes: prev.imagenes.filter((_:any, index: number) => index !== i)
                                        }))}}>❌</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <input
                                type={campo.type}
                                name={campo.name}
                                placeholder={formData[campo.name] ?? (campo.type === "number" ? 0 : "")}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className={styles.modifeButton}
                    disabled={isLoading || uploadingImages}
                >
                    {uploadingImages ? "Subiendo imágenes..." :
                        isLoading ? "Guardando..." :
                            mode === 'edit' ? 'Modificar' : 'Crear'}
                </button>
            </div>

            <div className={styles.closesButtonProperties}>
                <button type="button" onClick={onCloseForm}>
                    <Image
                        src="/icons/close.png"
                        alt="Cerrar"
                        width={20}
                        height={20}
                    />
                </button>
            </div>
        </form>
    );
}
