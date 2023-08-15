import styled from "styled-components";
import Link from "next/link";
import SectionTwo from "./SectionTwo";
import SectionThree from "./sectionThree";
import SectionFour from "./sectionFour";
import SubmitBtn from "../../components/Buttons/SubmitBtn";
import Image from "next/image";
import DonationButtonSmall from "../Buttons/DonationButtonSmall";
import COLORS from "../../data/colors";
import Explore from "./Explore";
import Schedule from "./Schedule/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PrimalRecipes from "./PrimalRecipes/Index";

const Content = styled.div`
  padding-top: 6rem;
  background-color: #fff;
  text-align: center;

  .button-spec {
    display: none;
  }
  .donation-holder {
    border: 1px solid ${(props) => props.colors.grey};
    padding: 8px;
  }
  .view-lectures {
    border: 1px solid ${(props) => props.colors.grey};
    padding: 32px;
    background-color: ${(props) => props.colors.lightGrey};
  }
`;

const SectionOne = styled.div`
  max-width: 640px;
  margin: 0 auto;

  top: 0;
  & > * {
    margin-bottom: 2rem;
  }
  .hero {
    position: relative;
    margin: 0 auto;
    margin-top: 6rem;
    width: 100%;
    height: 360px;
  }
`;

const Introduction = (props) => {
  return (
    <Content colors={COLORS}>
      <SectionOne className="section">
        <h1 className="text-shadow">Welcome Primal Enjoyer</h1>
        <p className="contrast">
          {" "}
          Primal diet officially created by Aajonus Vonderplanitz. Aajonus ate
          his first bite of raw meat in September of 1976. He had released his
          first book, "We Want To Live" in 1997, and had been working with 100s
          of patients at this point.
        </p>
        <SubmitBtn
          text="Primal Search"
          link="/search"
          className="button-spec"
        />
        <div className="mar-bottom-16"></div>
        <br />
        <br />
        <div className="view-lectures">
          <h3 className="text-shadow mar-bottom-32">View lectures (new)</h3>
          <Link href="/timecodes">
            <div className="gradient-blue-btn">
              <h5 className="mar-right-16">View all</h5>
              <FontAwesomeIcon icon={faEye} className="icon-sm white" />
            </div>
          </Link>
        </div>
        <div className="sm-spacer"></div>
        {/* <TestimonialHeader /> */}

        <div className="hero ">
          <Image
            src="/logo.jpg"
            alt="Aajonus Vondeplanitz"
            layout="fill"
            objectFit="cover"
            quality="100"
            priority
          />
        </div>
        <div></div>
        <div className="donation-holder">
          <h5 className="mar-bottom-8">
            Consider donating to support future development
          </h5>
          <p>You can email me with any requests</p>
          <a href="mailto:primalenjoyer@hotmail.com">
            <p className="link mar-bottom-8">primalenjoyer@hotmail.com</p>{" "}
          </a>
          <DonationButtonSmall />
        </div>
      </SectionOne>
      <PrimalRecipes recipes={props.recipesFetch} />
      <Explore />
      <Schedule />
      {/* <UserHelp filesFetch={props.files} user={props.user} /> */}
      <SectionTwo />
      <SectionThree />

      <SectionFour data={props.data} />
    </Content>
  );
};

export default Introduction;
