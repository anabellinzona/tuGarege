"use client";

import { useState, useContext } from "react";
import styles from "./userContent.module.css";
import Image from "next/image";
import PostCard from "@/components/postCard/postCard";
import { ThemeContext } from "@/context/ThemeContext";

export default function UserContent() {
    const [activeTab, setActiveTab] = useState("posts");
    const { theme } = useContext(ThemeContext);

    return (
        <main className={styles.main}>
            <div className={styles.bar}>
                <div
                    className={`${styles.iconContainer} ${activeTab === "posts" ? styles.active : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    <Image
                        src={theme === "light" ? "/icons/postDark.png" : "/icons/postLight.png"}
                        alt="posts icon"
                        width={30}
                        height={30}
                    />
                </div>

                <div
                    className={`${styles.iconContainer} ${activeTab === "info" ? styles.active : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    <Image
                        src={theme === "light" ? "/icons/infoDark.png" : "/icons/infoLight.png"}
                        alt="info icon"
                        width={30}
                        height={30}
                    />
                </div>
            </div>

            {activeTab === "posts" ? (
                <div className={styles.postsGrid}>
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            ) : (
                <div className={styles.contacts}>
                    <div className={styles.contact}>
                        <div className={styles.contactImage}>
                            <Image
                                src={"/icons/wp.png"}
                                alt={"WhatsApp icon"}
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                        <h3>+54 9 2494629889</h3>
                    </div>

                    <div className={styles.contact}>
                        <div className={styles.contactImageRed}>
                            <Image
                                src={"/icons/phone.png"}
                                alt={"Phone icon"}
                                width={40}
                                height={40}
                            />
                        </div>
                        <h3>+54 9 2494629889</h3>
                    </div>
                </div>
            )}
        </main>
    );
}
