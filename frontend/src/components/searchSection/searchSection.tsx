import styles from "./searchSection.module.css";
import Image from "next/image";

export default function searchSection(){
    return(
        <section className={styles.searchSectionContainerProperties}>
            <div className={styles.searchProperties}>
                <div className={styles.presentationProperties}>
                    <h3>Compra y vende con confianza.</h3>
                    <h3 className={styles.searchPropertiesSubtitleProperties}>Vehículos certificados, tranquilidad asegurada.</h3>
                </div>
                <input className={styles.inputProperties} placeholder={"Busca tu próximo vehículo acá"}/>
                <button className={styles.searchIconProperties}>
                    <Image src={"/icons/searchIcon.png"} alt={"Search icon"} width={20} height={20} />
                </button>
            </div>
        </section>
    );
}