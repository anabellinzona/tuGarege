"use client"
import styles from "./searchSection.module.css";
import SearchBar from "@/components/searchBar/searchBar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchSection() {
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!searchValue.trim()) return;
        router.push(`/vehiculos?search=${encodeURIComponent(searchValue)}`);
    };

    return (
        <section className={styles.searchSectionContainerProperties}>
            <div className={styles.searchProperties}>
                <div className={styles.presentationProperties}>
                    <h3>Compra y vende con confianza.</h3>
                    <h3 className={styles.searchPropertiesSubtitleProperties}>
                        Vehículos certificados, tranquilidad asegurada.
                    </h3>
                </div>

                <SearchBar
                    className="main40"
                    value={searchValue}
                    onChange={setSearchValue}
                    onSearch={handleSearch}
                />
            </div>
        </section>
    );
}
