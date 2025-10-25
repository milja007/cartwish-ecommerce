import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";
const LinkWithIcon = ({
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
    <NavLink
      to={link}
      className={sidebar ? "align-center sidebar_link" : "align-center"}
    >
      {title} <img src={emoji} alt="rocket" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
