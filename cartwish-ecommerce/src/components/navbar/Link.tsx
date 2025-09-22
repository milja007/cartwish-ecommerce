import "./Link.css";
const Link = ({
  title,
  link,
  emoji,
}: {
  title: string;
  link: string;
  emoji: string;
}) => {
  return (
    <a href={link} className="align-center">
      {title} <img src={emoji} alt="rocket" className="link_emoji" />
    </a>
  );
};

export default Link;
