import SearchSection from "../components/searchSection/searchSection";
import InfoCard from "../components/infoCards/infoCards";
import FeatureCards from "../components/featuredCards/featuredCards";
import RecentsSection from "@/components/recentsSection/recentsSection";

export default function Home() {
  return (
      <main>
          <SearchSection />
          <InfoCard />
          <FeatureCards />
          <RecentsSection/>
      </main>
  );
}
