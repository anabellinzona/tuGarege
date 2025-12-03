import styles from './searchBar.module.css';
import Image from "next/image";

type Props = {
    className: string;
    value: string;
    onChange: (value: string) => void;
    onSearch?: () => void;
}

export default function SearchBar({ className, value, onChange, onSearch }: Props) {
    return (
        <main className={styles[className]}>
            <input
                className={styles.inputProperties}
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Busca tu próximo vehículo acá"
            />

            <button
                className={styles.searchIconProperties}
                onClick={onSearch}
            >
                <Image src="/icons/searchIcon.png" alt="Search icon" width={20} height={20}/>
            </button>
        </main>
    );
}