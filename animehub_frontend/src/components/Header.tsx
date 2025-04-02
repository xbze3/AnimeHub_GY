import "../component_css/Header.css";
import AnimeHub1 from "../assets/anime_hub_1.png";
import Transition from "../assets/transition.png";

function Header() {
    return (
        <>
            <section id="header_section">
                <div id="header_text">
                    <h1>
                        Elevate your <br /> Fandom Experience
                    </h1>
                </div>
                <img
                    src={AnimeHub1}
                    alt="Anime Hub Logo"
                    id="anime_hub_1_img"
                />
            </section>
            <img src={Transition} alt="Transition" className="transition" />
        </>
    );
}

export default Header;
