import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {useRouter, usePathname} from "next/navigation";
import {useState, useCallback, useRef, useEffect, useContext} from "react";
import {
    MenuIcon,
    SearchIcon,
    HomeIcon,
    UserIcon,
    MailIcon,
} from "@heroicons/react/solid";
import COLORS from "../data/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faChevronDown,
    faUserCircle,
    faBook,
    faFolderTree,
    faSquarePollVertical,
    faNotesMedical,
    faHome,
    faSort,
    faEye,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../src/app/layout";
import {getLocalStorage, checkFavorite} from "../utils/Functions";
import supabase from "../utils/supabaseClient";

const NavCont = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  height: 70px;
  transition: opacity 0.5s ease;
  padding: 0 5%;

  .active-dropdown {
    transform: translateY(1px);
  }
  @media only screen and (max-width: 665px) {
    .tablet {
      display: none !important;
    }
  }
  @media only screen and (min-width: 665px) {
    .mobile-2 {
      display: none !important;
    }
  }
  @media only screen and (max-width: 850px) {
    .desktop {
      display: none;
    }
  }
  .account-nav {
    border-left: 1px solid black;
    border-right: 1px solid transparent;
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      border: 1px solid black;

      .icon-blue {
        //color: ${(props) => props.colors.green};
      }
    }
    @media only screen and (max-width: 240px) {
      padding-right: 0;
    }
  }
  .account-nav-image {
    position: relative;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;
    padding-left: 10px;
    padding-right: 10px;
    border-left: 1px solid black;
  }
  .image-cont {
    width: 40px;
    height: 40px;

    position: relative;
    border-radius: 50%;
    overflow: hidden;
    &:hover {
      opacity: 0.9;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mobile-2 {
    .account-nav {
      margin-right: 10px;
      border: none;
      .icon-blue {
        transition: none;
      }
      &:hover {
        .icon-blue {
          color: ${(props) => props.colors.green};
        }
      }
    }
  }
  border-bottom: 1px solid black;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
  margin-bottom: 2rem;
  background-color: ${(props) => props.colors.ultraLightBlue};
  z-index: 5;
  .white {
    background-color: #fff;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-left: 1px solid black;
    &:hover {
      color: #fff;
      background-color: ${(props) => props.colors.darkBlue};
    }
  }
  .nav-flex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .nav-white {
    &:hover {
      background-color: #fff;
    }
  }
  h4 {
    text-shadow: 2px 2px 2px rgba(1, 1, 1, 0.25);
    cursor: pointer;
    padding: 10px;
  }
  @media only screen and (max-width: 767px) {
    padding: 0 0;
  }
  .nav-box {
    width: 48px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: ${(props) => props.colors.green};
    }
  }
  .bg-green {
    background-color: ${(props) => props.colors.green};
  }
`;

const NavRight = styled.div`
  display: flex;
  ul {
    list-style: none;
  }
  @media only screen and (max-width: 850px) {
    margin: 0 auto;
  }
  @media only screen and (max-width: 600px) {
    h3 {
      font-size: 4vw;
    }
  }
  .dropdown-holder {
    background-color: #fff;
    border: 1px solid black;
    width: 200px;
    text-align: center;
    position: relative;
    li {
      &:hover {
        background-color: ${(props) => props.colors.ultraLightBlue};
      }
    }
  }
  .more {
    &:hover {
      background-color: ${(props) => props.colors.ultraLightBlue};
      h4 {
        color: #fff;
      }
    }
    &:active {
      background-color: ${(props) => props.colors.darkBlue};
    }
  }
  .dropdown {
    position: absolute;
    background: #fff;
    width: 200px;
    border: 1px solid black;
    left: -1px;
    h5 {
      font-weight: 500;
    }
    li {
      border-bottom: 1px solid black;
      padding: 4px;
      &:last-of-type {
        border: none;
      }
    }
  }
  .flex-center {
    cursor: pointer;
    justify-content: center;
    column-gap: 4px;
    &:hover {
    }
  }
`;

const Title = styled.h2`
  text-shadow: 3px 3px 5px rgba(1, 1, 1, 0.5);
  cursor: pointer;
  line-height: 1;
  &:hover {
    background-color: #fff;
  }
  @media only screen and (max-width: 892px) {
    font-size: 1.953rem;
  }
`;
const MobileNav = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${(props) => props.colors.ultraLightBlue};
  z-index: 101;
  .nav-hamburger {
    border: 2px solid ${(props) => props.colors.darkBlue};
    &:hover {
      cursor: pointer;
    }
  }

  .lrg-icon {
    transition: transform 0.25s ease;
    &:hover {
      color: ${(props) => props.colors.green};
      transform: translateY(-2px);
    }
  }
`;

const NavDropdown = styled.div`
  position: absolute;
  z-index: 1;
  transform: translateY(-100%);
  right: 0px;
  width: 100%;

  border: 4px solid ${(props) => props.colors.grey};
  border-style: outset;
  transition: transform 0.5s ease;
  background-color: ${(props) => props.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .nav-line {
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;

    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid ${(props) => props.colors.ultraLightBlue};

    .nav-icon {
      color: ${(props) => props.colors.veryLightBlue};
    }
    &:hover {
      cursor: pointer;
      h5 {
        color: ${(props) => props.colors.green};
      }
      .nav-icon {
        color: ${(props) => props.colors.green};
      }
    }
    h5 {
      color: ${(props) => props.colors.veryLightBlue};
    }
    .line {
      width: 50%;
      height: 4px;
      background-color: ${(props) => props.colors.veryLightBlue};
    }
  }
`;

export async function getServerSideProps() {
}

const Navbar = () => {
    const [active, setActive] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const navRef = useRef();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    console.log("pathname");
    console.log(pathname);
    // Hide and show navbar on scroll
    let prevY = 0;
    const controlNavbar = () => {
        if (window.scrollY > prevY && window.scrollY > 100) {
            prevY = window.scrollY;
            setShow(true);
        } else {
            prevY = window.scrollY;
            setShow(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, []);
    const dropdownEl = useRef();

    function ToggleDropdown() {
        setActive(!active);
    }

    // Dropdown function
    const handleClickOutside = useCallback(
        (e) => {
            if (
                showDropdown &&
                e.target.closest(".dropdown-holder") !== dropdownEl.current
            ) {
                setShowDropdown(false);
            }
        },
        [showDropdown, setShowDropdown, dropdownEl]
    );
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    function Focus(e) {
        setShowDropdown(true);
    }

    useEffect(() => {
        const updateSession = async () => {
            const {data, error} = await supabase.auth.getSession();
            setUser(data?.session?.user);
        };
        updateSession();
    }, []);

    return (
        <NavCont
            className={show ? "hide-nav" : ""}
            ref={navRef}
            id="nav"
            colors={COLORS}
            name="top"
        >
            <div className="nav-flex-header tablet">
                <div className="desktop">
                    <Link
                        href={{
                            pathname: `/`,
                        }}
                    >
                        <Title>Primal Enjoyer</Title>
                    </Link>
                </div>
                <NavRight colors={COLORS} className="tablet">
                    <div ref={dropdownEl} onClick={Focus} className="dropdown-holder">
                        <div className="flex-center more">
                            <h4>More</h4>
                            <FontAwesomeIcon icon={faChevronDown} className="icon-blue"/>
                        </div>
                        {showDropdown && (
                            <div className="dropdown">
                                <ul>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Home</h5>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/recipes`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Recipes</h5>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/encyclopedia`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Encyclopedia</h5>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/testimonials`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Testimonials</h5>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/polls`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Polls</h5>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href={{
                                                pathname: `/contact`,
                                            }}
                                        >
                                            <h5 className="light opacity-anim">Contact</h5>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link
                        href={{
                            pathname: `/search`,
                        }}
                    >
                        <div
                            style={{
                                paddingLeft: "8px",

                                cursor: "pointer",
                            }}
                            className="flex-center nav-white"
                        >
                            <FontAwesomeIcon className="icon-blue" icon={faSearch}/>
                            <h4>Search</h4>
                        </div>
                    </Link>
                    <Link
                        href={{
                            pathname: `/categories`,
                        }}
                    >
                        <h4
                            style={{
                                borderLeft: "1px solid black",
                            }}
                            className="nav-white"
                        >
                            Categories
                        </h4>
                    </Link>
                    <Link
                        href={{
                            pathname: `/timecodes`,
                        }}
                    >
                        <h4
                            style={{
                                borderLeft: "1px solid black",
                                whiteSpace: "nowrap",
                            }}
                            className="nav-white hide-1000"
                        >
                            View All
                        </h4>
                    </Link>
                    {/*
          <div className="mobile-sm">
            <Link
              href={{
                pathname: `/contact`,
              }}
              passHref
            >
              <a title="Contact" rel="noopener noreferrer">
                <h4 className="nav-white">Contact</h4>
              </a>
            </Link>
          </div>
            */}
                    <Link
                        href={{
                            pathname: `/account`,
                        }}
                    >
                        <div className="account-nav">
                            <div className="image-cont">
                                {user ? (
                                    <div className="image-cont">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${user?.user_metadata.avatar_url}`}
                                            style={{objectFit: "cover"}}
                                            size="100%"
                                            fill
                                        />
                                    </div>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        className="icon-blue icon-lg"
                                    />
                                )}
                            </div>
                        </div>
                    </Link>
                </NavRight>
            </div>

            <MobileNav colors={COLORS} className="mobile-2">
                {(!active && (
                    <>
                        <Link
                            href={{
                                pathname: `/search`,
                            }}
                        >
                            <div
                                className={
                                    router.route == "/articles" ? "nav-box  bg-green" : "nav-box "
                                }
                            >
                                <FontAwesomeIcon
                                    className="icon-blue icon-ssm"
                                    icon={faSearch}
                                />
                            </div>
                        </Link>
                        <div className="flex">
                            <Link
                                href={{
                                    pathname: `/timecodes`,
                                }}
                            >
                                <div
                                    className={
                                        pathname == "/search"
                                            ? "nav-box hide-360 bg-green"
                                            : "nav-box hide-360"
                                    }
                                >
                                    <FontAwesomeIcon icon={faEye} className="icon-blue icon-sm"/>
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: `/recipes`,
                                }}
                            >
                                <div
                                    className={
                                        pathname == "/recipes"
                                            ? "nav-box hide-310 bg-green"
                                            : "nav-box hide-310"
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faUtensils}
                                        className="icon-blue icon-sm"
                                    />
                                </div>
                            </Link>
                            <Link href="/">
                                <div
                                    className={
                                        pathname == "/"
                                            ? "nav-box hide-260 bg-green"
                                            : "nav-box hide-260"
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faHome}
                                        className="icon-blue icon-sm "
                                    />
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: `/account`,
                                }}
                            >
                                <div className="account-nav ">
                                    {user ? (
                                        <div className="image-cont">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${user?.user_metadata.avatar_url}`}
                                                objectFit="cover"
                                                size="100%"
                                                layout="fill"
                                            />
                                        </div>
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faUserCircle}
                                            className="icon-blue icon-lg"
                                        />
                                    )}
                                </div>
                            </Link>

                            <MenuIcon
                                onClick={ToggleDropdown}
                                className="lrg-icon nav-hamburger"
                            />
                        </div>
                    </>
                )) || (
                    <>
                        <div></div>
                        <div onClick={ToggleDropdown} className="arrow-up"></div>
                    </>
                )}
            </MobileNav>
            <NavDropdown
                className={active ? "active-dropdown mobile-2" : "mobile-2"}
                colors={COLORS}
            >
                {" "}
                <Link href="/search">
                    <div className="nav-line" onClick={ToggleDropdown}>
                        <SearchIcon className="mar-right-8 nav-icon hero-icon-sm"/>
                        <h5>Search</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/">
                    <div className="nav-line">
                        <HomeIcon className="nav-icon hero-icon-sm mar-right-8"/>
                        <h5>Home</h5>
                    </div>
                </Link>
                <Link href="/recipes">
                    <div onClick={ToggleDropdown} className="nav-line">
                        <FontAwesomeIcon
                            icon={faUtensils}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5>Recipes</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                {/* End of nav line*/}
                <Link href="/categories">
                    <div onClick={ToggleDropdown} className="nav-line">
                        <FontAwesomeIcon
                            icon={faFolderTree}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5>Categories</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/timecodes">
                    <div className="nav-line" onClick={ToggleDropdown}>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5>View All</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/encyclopedia">
                    <div onClick={ToggleDropdown} className="nav-line">
                        <FontAwesomeIcon
                            icon={faBook}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5>Encyclopedia</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/testimonials">
                    <div className="nav-line" onClick={ToggleDropdown}>
                        <FontAwesomeIcon
                            icon={faNotesMedical}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5 className="">Testimonials</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/polls">
                    <div className="nav-line">
                        <FontAwesomeIcon
                            icon={faSquarePollVertical}
                            className="nav-icon icon-ssm mar-right-8"
                        />
                        <h5>Polls</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/account">
                    <div className="nav-line">
                        <UserIcon className="nav-icon hero-icon-sm mar-right-8"/>
                        <h5>Account</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
                <Link href="/contact">
                    <div className="nav-line">
                        <MailIcon className="nav-icon hero-icon-sm mar-right-8"/>
                        <h5>Contact</h5>
                    </div>
                </Link>
                {/* End of nav line*/}
            </NavDropdown>
        </NavCont>
    );
};

export default Navbar;
