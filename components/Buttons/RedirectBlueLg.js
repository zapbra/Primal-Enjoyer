import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 32px;
  border: 2px solid ${(props) => props.colors.darkBlue};
  &:hover {
    h3 {
      text-decoration: underline;
    }
  }
`;
const RedirectBlue = ({ text, link }) => {
  return (
    <Link href={link}>
      <Cont colors={COLORS}>
        <h3 className="mar-right-8">{text}</h3>
        <FontAwesomeIcon icon={faPaperPlane} className="icon-blue icon-ssm" />
      </Cont>
    </Link>
  );
};

export default RedirectBlue;
