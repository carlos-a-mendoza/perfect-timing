import "./Header.scss";
import logo from "../../assets/logo/Logo.JPG";



function Header () {
    return(
        <div className="header">
            <div className="header__container">
            <a href="/" className="header__logo"><img src={logo} alt="Perfect Timing Logo"></img></a>
            </div>
            <div className="header__nav">
                <a href="/my-calendar" className="header__link"><p>My Calendar</p></a>
                <a href="/my-profile" className="header__link"><p>My Profile</p></a>
                <a href="/my-events" className="header__link"><p>All Events</p></a>
            </div>
        </div>
    )
}

export default Header;