import Hero from "../components/home/Hero";
import EditorialBanner from "../components/home/EditorialBanner";
import CollectionHighlight from "../components/home/CollectionHighlight";
import TrendingSection from "../components/home/TrendingSection";
import ProductGrid from "../components/product/ProductGrid";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import Footer from "../components/layout/Footer";

const Home = () => (
  <>
    <Hero />
    <EditorialBanner />
    <CollectionHighlight
      id="bridal"
      label="Bridal Edit"
      title="Forever starts at your feet"
      subtitle="Pearl finishes, delicate straps, and heels made for the aisle — designed to carry you through the most beautiful day."
      image="https://images.unsplash.com/photo-1515347619252-60a4bf4f0ccd?w=900&q=85"
      imageAlt="Bridal wedding heels"
      accent="from-rose/50 to-peach/40"
    />
    <CollectionHighlight
      id="casual"
      label="Everyday Luxe"
      title="Effortless casual elegance"
      subtitle="Soft mules, refined flats, and walkable silhouettes that elevate your daily rhythm without trying too hard."
      image="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=900&q=85"
      imageAlt="Casual luxury footwear"
      reverse
      accent="from-mist/50 to-sage/40"
    />
    <TrendingSection />
    <ProductGrid />
    <Testimonials />
    <Newsletter />
    <Footer />
  </>
);

export default Home;
