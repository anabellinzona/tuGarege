import SearchSection from "../components/searchSection/searchSection";
import InfoCard from "../components/infoCards/infoCards";
import FeatureCards from "../components/featuredCards/featuredCards";

export default function Home() {
  return (
      <main>
        <SearchSection />
          <InfoCard />
          <FeatureCards />
      </main>
  );
}
