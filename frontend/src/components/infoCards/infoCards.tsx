import styles from "./infoCards.module.css";
import Image from "next/image";

export default function infoCards(){
    return(
        <section className={styles.infoCardsContainerProperties}>
            <div className={styles.infoCardsProperties}>
                <div className={styles.imageNumberProperties}>
                    <Image src={"/icons/numberOneInfoCard.png"} alt={"Number one info card"} width={88} height={104} />
                </div>
                <div className={styles.infoProperties}>
                    <h1>Asesorate</h1>
                    <span className={styles.defaultText}>Definí qué necesitas</span>

                    <span className={styles.hoverText}>Te orientamos para que elijas el tipo de vehículo que mejor se adapta vos.</span>
                </div>
            </div>
            <div className={styles.infoCardsProperties}>
                <div className={styles.imageNumberProperties}>
                    <Image src={"/icons/numberTwoInfoCard.png"} alt={"Number one info card"} width={88} height={104} />
                </div>
                <div className={styles.infoProperties}>
                    <h1>Buscá</h1>
                    <span className={styles.defaultText}>Explorá las opciones disponibles</span>

                    <span className={styles.hoverText}>Usá nuestros filtros para explorar las mejores opciones según tus necesidades.</span>
                </div>
            </div>
            <div className={styles.infoCardsProperties}>
                <div className={styles.imageNumberProperties}>
                    <Image src={"/icons/numberThreeInfoCard.png"} alt={"Number one info card"} width={88} height={104} />
                </div>
                <div className={styles.infoProperties}>
                    <h1>Contactá</h1>
                    <span className={styles.defaultText}>Hablá con el vendedor</span>

                    <span className={styles.hoverText}>Usá nuestros filtros para explorar las mejores opciones según tus necesidades.</span>
                </div>
            </div>
        </section>
    );
}