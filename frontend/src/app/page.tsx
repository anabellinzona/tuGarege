import SearchSection from "../components/searchSection/searchSection";
import InfoCard from "../components/infoCards/infoCards";
import RecentsSection from "@/components/recentsSection/recentsSection";

export default function Home() {
  return (
      <main>
          <SearchSection />
          <InfoCard />
          <RecentsSection/>
      </main>
  );
}
