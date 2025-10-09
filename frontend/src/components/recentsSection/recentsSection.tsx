import styles from './recentsSection.module.css';
import SellButton from "@/components/buttons/sellButton/SellButton";
import StandardCard from "@/components/standardCard/standardCard";

export default function RecentsSection() {
    return (
        <section className={styles.main}>
            <div className={styles.recents}>
                <h2>Más recientes</h2>
                <SellButton/>
            </div>
            <div className={styles.cardsGrid}>
                <StandardCard/>
                <StandardCard/>
                <StandardCard/>
            </div>
        </section>
    )
}