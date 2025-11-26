import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = ({
  title,
  subtitle,
  link,
  image,
}: {
  title: string;
  subtitle: string;
  link: string;
  image: string;
}) => {
  return (
    <section className="hero_section">
      <div>
        <h2 className="hero_title">{title}</h2>
        <p className="hero_subtitle">{subtitle}</p>
        <Link className="hero_link" to={link}>
          Buy Now
        </Link>
      </div>
      <div>
        <img src={image} alt="" className="hero_image" />
      </div>
    </section>
  );
};

export default HeroSection;
