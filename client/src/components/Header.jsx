import chefIcon from "../assets/chefIcon.png";

export default function Header() {
  return (
    <header className="header">
      <div className="headerBrand">
        <img src={ chefIcon } alt="chefIcon" className="headerIcon"></img>
        <span className="headerTitle">ChefMate</span>
      </div>
    </header>
  )
}
