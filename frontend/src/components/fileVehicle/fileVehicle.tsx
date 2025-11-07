"use client";
import {useEffect, useState} from "react";
import styles from "./fileVehicle.module.css";
import Carrousel from "@/components/fileVehicle/carrousel/carrousel";
import MainInfo from "@/components/fileVehicle/mainInfo/mainInfo";
import SecondInfo from "@/components/fileVehicle/secondInfo/secondInfo";
import ItemCharacteristic from "@/components/fileVehicle/itemCharacteristic/itemCharacteristic";
import ConsultButton from "@/components/buttons/consultButton/consultButton";
import Recommended from "@/components/recommended/recommended";
import EditableText from "@/components/fileVehicle/editableText/editableText";
import EditButton from "@/components/fileVehicle/editButton/editButton";

type Prop = {
    id: string;
    mode: 'view' | 'create' | 'edit'
}

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

export default function FileVehicle({id, mode}: Prop){
    const [vehiculo, setVehiculo] = useState<Vehiculo | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<string | null>(null);
    const isEmptyFile = mode === "create";
    const isEditableFile = mode === "edit";

    useEffect(() => {
        fetch(`http://localhost:8080/api/vehiculos/${id}`)
            .then((response) =>{
                if(!response.ok){
                    throw new Error("Error al cargar los vehículos");
                }
                return response.json();
            })
            .then(data => {
                setVehiculo(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("El error fue: " + error);
                setLoading(false);
            });
    }, [id]);

    const initialVehicle = vehiculo || {
        imagenes: [],
        marca: "Marca",
        modelo: "Modelo",
        km: "Kilómetros",
        precio: 0,
        descripcion: "Descripción",
        tipo: "Tipo",
        estado: "Estado",
        anio: "Año",
        fechaPublicacion: new Date().getFullYear(),
    }

    const [localVehicle, setLocalVehicle] = useState<Vehiculo>(initialVehicle);

    if(loading) return <div>Cargando...</div>;
    if(!vehiculo) return <div>No se encontró el vehículo</div>;
    if(!vehiculo.imagenes || vehiculo.imagenes.length === 0) {
        return <p>No hay imágenes disponibles</p>;
    }

    const handleSaveAddress = async (value: string) => {
        console.log(`Guardando address:`, value);
        setVehiculo(prev => prev ? { ...prev, descripcion: value } : null);
        setEditingField(null);
    };

    const handleCancelEdit = () => {
        console.log(`Cancelando edición`);
        setEditingField(null);
    };

    const handleStartEdit = (fieldName: keyof Vehiculo) => {
        setEditingField(fieldName);
    };

    const handleSaveField = (fieldName: keyof Vehiculo, value: string | number) => {
        setVehiculo(prev => prev ? { ...prev, [fieldName]: value } : null);
        setEditingField(null);
    };

    const handleStartEditHeader = () => setEditingField('descripcion');

    return(
        <section className={styles.vehicleFileSectionContainerProperties}>
            <div className={styles.carrouselAndVehicleInformationProperties}>
                <Carrousel imagenes={vehiculo.imagenes}/>
                <MainInfo
                    vehiculo={vehiculo}
                    isEditable={isEditableFile}
                    editingField={editingField}
                    onStartEdit={handleStartEdit}
                    onCancelEdit={handleCancelEdit}
                    onSaveField={handleSaveField}
                    classname={styles.inputProperties}
                />

            </div>
            <div className={styles.secondContainerProperties}>
                <div className={styles.secondInfoContainerProperties}>
                    <div>
                        <SecondInfo modelo={vehiculo.modelo} descripcion={vehiculo.descripcion} combustible={" "} kilometros={vehiculo.km}/>
                    </div>
                    <div className={styles.aditionalInfoContainerProperties}>
                        <h3>Datos adicionales</h3>
                        <ItemCharacteristic id={vehiculo.id}/>
                    </div>
                    <div className={styles.descriptionContainerProperties}>
                        <div className={styles.titleAndEditButtonProperties}>
                            <h3>Descripción</h3>
                            <EditButton
                                onStartEdit={() => handleStartEditHeader()}
                                onEndEdit={() => handleSaveAddress(localVehicle.descripcion)}
                                isEditing={editingField === 'descripcion'}
                                className={styles.editButtonProperties}
                                show={isEditableFile || isEmptyFile}
                                img={'/icons/editIcon.png'}
                            />
                        </div>
                        {(isEmptyFile || isEditableFile) && editingField === 'descripcion' ? (
                            <EditableText
                                value={vehiculo.descripcion}
                                isEditing={true}
                                type={"text"}
                                onSave={(value) => handleSaveAddress(value)}
                                onCancel={handleCancelEdit}
                                className={styles.inputProperties}
                            />
                        ) : (
                            <div onClick={() => handleStartEditHeader()} style={{ cursor: 'pointer' }}>
                                {vehiculo.descripcion}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.recommendedContainerProperties}>
                    <Recommended vehicleId={vehiculo.id} />
                </div>
            </div>
            <div className={styles.buttonContainerProperties}>
                <ConsultButton message={"Consultar por este vehículo"}/>
            </div>
        </section>
    );
}