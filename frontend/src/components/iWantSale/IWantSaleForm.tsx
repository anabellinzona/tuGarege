import styles from "./IWantSaleForm.module.css";
import Image from "next/image";
import FormSale from "@/components/iWantSale/form/form";

export default function IWantSaleForm(){
    return(
        <section className={styles.formSaleContainerProperties}>
            <div className={styles.formSaleProperties}>
                <div className={styles.formContainerProperties}>
                   <FormSale title={"Quiero vender"} message={"Completá el formulario para registrarte o iniciar sesión y empezá a publicar tus vehículos de forma fácil y rápida"} camp1={"Usuario"} camp2={"Contraseña"} infoButton={"Iniciar sesión"} advertationMessage={"¿No tenés cuenta?"} whatDo={"Registrate"}/>
                    <div className={styles.instructionsContainerProperties}>
                        <div className={styles.titleInstructionsPropertes}>
                            <div className={styles.imageInstructionsPropertes}>
                                <Image src={"/icons/startIcon.png"} alt={"Start icon"} width={30} height={30} />
                            </div>
                            <h3>Publicá tu vehículo en destacados</h3>
                        </div>
                        <div className={styles.instructionsProperties}>
                            <p>
                                Al publicar tu vehículo, podes elegir la modalidad <span>destacado</span>.
                            </p>
                            <p>
                                Con un pago único y accesible, tu anuncio aparecerá en la sección <span>destacados durante 30 días</span>, obteniendo mayor visibilidad y aumentando tus posibilidades de venta.
                            </p>
                            <p>
                                Finalizado el plazo, podrás renovar facilmente para seguir destacando tu vehículo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}