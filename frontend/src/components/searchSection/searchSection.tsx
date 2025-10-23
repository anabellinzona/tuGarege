import styles from "./searchSection.module.css";
import Image from "next/image";
import SearchBar from "@/components/searchBar/searchBar";

export default function searchSection(){
    return(
        <section className={styles.searchSectionContainerProperties}>
            <div className={styles.searchProperties}>
                <div className={styles.presentationProperties}>
                    <h3>Compra y vende con confianza.</h3>
                    <h3 className={styles.searchPropertiesSubtitleProperties}>Vehículos certificados, tranquilidad asegurada.</h3>
                </div>
                <SearchBar
                    className={'main40'}
                />
            </div>
        </section>
    );
}