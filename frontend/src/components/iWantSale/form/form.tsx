"use client";

import styles from "@/components/iWantSale/form/form.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/service/authService";

// <button onClick={() => {
//     authService.logout();
//     window.location.href = '/';
// }}>
//     Cerrar sesión
// </button>

export default function FormSale(){
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [registerStep, setRegisterStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [loginData, setLoginData] = useState({
        email: "",
        contrasenia: ""
    });

    const [registerData, setRegisterData] = useState({
        nombre: "",
        email: "",
        contrasenia: "",
        confirmarContrasenia: ""
    });

    const handleToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLogin(!isLogin);
        setRegisterStep(1);
        setError(null);
        setSuccess(null);
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await authService.login(loginData);

            setSuccess("¡Inicio de sesión exitoso! Redirigiendo...");

            setTimeout(() => {
                router.push('/Profile');
            }, 1000);

        } catch (err) {
            setError(err instanceof Error ? err.message : "Error en el inicio de sesión");
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterStep1 = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setRegisterStep(2);
    };

    const handleRegisterStep2 = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (registerData.contrasenia !== registerData.confirmarContrasenia) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        try {
            const result = await authService.register(registerData);
            setSuccess("¡Registro exitoso! Ahora podés iniciar sesión");

            setTimeout(() => {
                setIsLogin(true);
                setRegisterStep(1);
                setRegisterData({
                    nombre: "",
                    email: "",
                    contrasenia: "",
                    confirmarContrasenia: ""
                });
                setSuccess(null);
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error en el registro");
        } finally {
            setLoading(false);
        }
    };

    if (isLogin) {
        return(
            <div className={styles.sectionFormAndInstructions}>
                <div className={styles.infoProperties}>
                    <h2>Quiero vender</h2>
                    <p>Completá el formulario para registrarte o iniciar sesión y empezá a publicar tus vehículos de forma fácil y rápida.</p>
                </div>
                <form onSubmit={handleLoginSubmit}>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    {success && <div className={styles.successMessage}>{success}</div>}

                    <label>Usuario (e-mail)</label>
                    <input
                        placeholder="Usuario"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        required
                        disabled={loading}
                    />

                    <label>Contraseña</label>
                    <input
                        placeholder="Contraseña"
                        type="password"
                        value={loginData.contrasenia}
                        onChange={(e) => setLoginData({...loginData, contrasenia: e.target.value})}
                        required
                        disabled={loading}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>

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

    if (registerStep === 1) {
        return(
            <div className={styles.sectionFormAndInstructions}>
                <div className={styles.infoProperties}>
                    <h2>Registrarse</h2>
                    <p>Creá una cuenta para empezar a publicar tus vehículos y ponerte en contacto con otros vendedores.</p>
                </div>
                <form onSubmit={handleRegisterStep1}>
                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <label>Nombre y Apellido <span className={styles.required}>*</span></label>
                    <input
                        placeholder="Nombre y Apellido"
                        value={registerData.nombre}
                        onChange={(e) => setRegisterData({...registerData, nombre: e.target.value})}
                        required
                    />

                    <label>E-mail <span className={styles.required}>*</span></label>
                    <input
                        placeholder="E-mail"
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        required
                    />

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
            <form onSubmit={handleRegisterStep2}>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {success && <div className={styles.successMessage}>{success}</div>}

                <label>Contraseña <span className={styles.required}>*</span></label>
                <input
                    placeholder="Contraseña"
                    type="password"
                    value={registerData.contrasenia}
                    onChange={(e) => setRegisterData({...registerData, contrasenia: e.target.value})}
                    required
                    disabled={loading}
                />

                <label>Confirmar contraseña <span className={styles.required}>*</span></label>
                <input
                    placeholder="Confirmar contraseña"
                    type="password"
                    value={registerData.confirmarContrasenia}
                    onChange={(e) => setRegisterData({...registerData, confirmarContrasenia: e.target.value})}
                    required
                    disabled={loading}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Confirmar registro"}
                </button>

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