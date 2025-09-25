import HeroSection from "./HeroSection";
import iphone from "../../../assets/iphone-14-pro.webp";
import mac from "../../../assets/mac-system-cut.jfif";
import FeateredProducts from "./FeateredProducts";
const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Buy Iphone 14 Pro"
        subtitle="Experience the power of the latest iphone 14 with our most Pro camera ever."
        link="/"
        image={iphone}
      />
      {/* featured products */}
      <FeateredProducts />
      {/* Hero Section */}
      <HeroSection
        title="Build the ultimate setup"
        subtitle=" You can add Studio Display and color-matched Magic accessories to your bag  after you configure your Mac mini."
        link="/"
        image={mac}
      />
    </div>
  );
};

export default HomePage;
