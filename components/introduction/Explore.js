import Link from "next/link";
import {useState} from "react";
import COLORS from "../../data/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";


const Explore = () => {
    const [links, setLinks] = useState([
        "Complete%20Diet%20Schedule",
        "Are%20Organs%20More%20Concentrated%20In%20Nutrients",
        "Vegetable%20Juice%20Recipe",
        "Should%20You%20Force%20Detox",
        "No%20Milk%20-%20Mineral%20Deficient",
        "Eating%20Schedule%20For%20Weight%20Loss",
    ]);

    const [linkElems, setLinkElems] = useState(
        links.map((link, index) => {
            return (
                <Link key={index} href={`/article/${link}`}>
                    <div className="blue-btn align-center link-item mar-right-16 mar-left-16 mar-bottom-16 mar-top-16">
                        <FontAwesomeIcon
                            icon={faLink}
                            className="blue icon-ssm mar-right-8"
                        />
                        <h5 className="blue">{link.replaceAll("%20", " ")}</h5>
                    </div>
                </Link>
            );
        })
    );
    return (
        <div>
            <h3 className="text-shadow mar-bottom-16">Explore</h3>

            <h4 className="light contrast mar-bottom-16">
                These are some of the best articles
            </h4>
            <div>{linkElems}</div>
        </div>
    );
};

export default Explore;
