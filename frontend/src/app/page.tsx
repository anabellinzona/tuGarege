"use client"; // si estás en app router

import SearchSection from "../components/searchSection/searchSection";
import InfoCard from "../components/infoCards/infoCards";
import FeatureCards from "../components/featuredCards/featuredCards";
import RecentsSection from "@/components/recentsSection/recentsSection";

export default function Home() {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  return (
      <main>
          <SearchSection />
          <InfoCard />
          <FeatureCards />
          <RecentsSection/>
      </main>
  );
}
