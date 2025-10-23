import styles from './searchBar.module.css';
import Image from "next/image";

export default function SearchBar() {
    return (
        <main className={styles.main}>
            <input className={styles.inputProperties} placeholder={"Busca tu próximo vehículo acá"}/>
            <button className={styles.searchIconProperties}>
                <Image src={"/icons/searchIcon.png"} alt={"Search icon"} width={20} height={20}/>
            </button>
        </main>
    )
}