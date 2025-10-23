import styles from './searchBar.module.css';
import Image from "next/image";

type Props = {
    className: string;
}

export default function SearchBar({ className }: Props) {
    return (
        <main className={styles[className]}>
            <input className={styles.inputProperties} placeholder={"Busca tu próximo vehículo acá"}/>
            <button className={styles.searchIconProperties}>
                <Image src={"/icons/searchIcon.png"} alt={"Search icon"} width={20} height={20}/>
            </button>
        </main>
    )
}