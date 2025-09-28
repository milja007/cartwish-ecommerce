import "./Link.css";
const Link = ({
  title,
  link,
  emoji,
  sidebar,
}: {
  title: string;
  link: string;
  emoji: string;
  sidebar: boolean;
}) => {
  return (
    <a
      href={link}
      className={sidebar ? "align-center sidebar_link" : "align-center"}
    >
      {title} <img src={emoji} alt="rocket" className="link_emoji" />
    </a>
  );
};

export default Link;
