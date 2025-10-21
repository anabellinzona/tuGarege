"use client";

import styles from "@/components/iWantSale/form/form.module.css";
import Link from "next/link";
import { useState } from "react";

export default function FormSale( ){
    const [isLogin, setIsLogin] = useState(true);
    const [registerStep, setRegisterStep] = useState(1);

    const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setRegisterStep(1);
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLogin && registerStep === 1) {
            setRegisterStep(2);
        } else {
            //lógica de submit del formulario
            console.log("Formulario enviado");
        }
    };


    if (isLogin) {
        return(
            <div className={styles.sectionFormAndInstructions}>
                <div className={styles.infoProperties}>
                    <h2>Quiero vender</h2>
                    <p>Completá el formulario para registrarte o iniciar sesión y empezá a publicar tus vehículos de forma fácil y rápida</p>
                </div>
                <form onSubmit={handleNextStep}>
                    <label>Usuario</label>
                    <input placeholder="Usuario" required/>

                    <label>Contraseña</label>
                    <input placeholder="Contraseña" type="password" required/>

                    <button type="submit">Iniciar sesión</button>

                    <h6 className={styles.advertationProperties}>
                        ¿No tenés cuenta?{" "}
                        <Link href="#" onClick={handleToggle}>
                            <span>Registrate</span>
                        </Link>
                    </h6>
                </form>
            </div>
        );
    }
1
    if (registerStep === 1) {
        return(
            <div className={styles.sectionFormAndInstructions}>
                <div className={styles.infoProperties}>
                    <h2>Registrarse</h2>
                    <p>Creá una cuenta para empezar a publicar tus vehículos y ponerte en contacto con otros vendedores.</p>
                </div>
                <form onSubmit={handleNextStep}>
                    <label>Nombre y Apellido <span className={styles.required}>*</span></label>
                    <input placeholder="Nombre y Apellido" required/>

                    <label>E-mail <span className={styles.required}>*</span></label>
                    <input placeholder="E-mail" type="email" required/>

                    <button type="submit">Siguiente</button>

                    <h6 className={styles.advertationProperties}>
                        ¿Ya tenés cuenta?{" "}
                        <Link href="#" onClick={handleToggle}>
                            <span>Iniciá sesión aquí</span>
                        </Link>
                    </h6>
                </form>
            </div>
        );
    }

    return(
        <div className={styles.sectionFormAndInstructions}>
            <div className={styles.infoProperties}>
                <h2>Registrarse</h2>
                <p>Creá una cuenta para empezar a publicar tus vehículos y ponerte en contacto con otros vendedores.</p>
            </div>
            <form onSubmit={handleNextStep}>
                <label>Contraseña <span className={styles.required}>*</span></label>
                <input placeholder="Contraseña" type="password" required/>

                <label>Confirmar contraseña <span className={styles.required}>*</span></label>
                <input placeholder="Confirmar contraseña" type="password" required/>

                <button type="submit">Confirmar registro</button>

                <h6 className={styles.advertationProperties}>
                    ¿Ya tenés cuenta?{" "}
                    <Link href="#" onClick={handleToggle}>
                        <span>Iniciá sesión aquí</span>
                    </Link>
                </h6>
            </form>
        </div>
    );
}