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
        <a className="hero_link" href={link}>
          Buy Now
        </a>
      </div>
      <div>
        <img src={image} alt="" className="hero_image" />
      </div>
    </section>
  );
};

export default HeroSection;
