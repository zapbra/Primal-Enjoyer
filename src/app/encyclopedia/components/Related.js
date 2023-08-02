import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  margin-bottom: 32px;

  h3 {
    margin-right: 16px;
  }
  .flex {
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    width: 100%;
    margin-bottom: 16px;
    padding-bottom: 4px;
    align-items: center;
  }
  .flex-links {
    display: flex;
    column-gap: 6px;
    row-gap: 6px;
    flex-wrap: wrap;
  }
  .plus-cont-sm {
    margin-right: 100%;
    margin-top: 32px;
  }
`;
const Related = ({ links }) => {
  const linkElems = links.map((link, index) => {
    if (link.url === "") {
      return <p>{link.title},</p>;
    }
    return (
      <Link key={index} href={{ pathname: link.url }}>
        <p className="red">{link.title},</p>
      </Link>
    );
  });

  return (
    <Cont colors={COLORS}>
      <div className="flex">
        <h3 className="light">Related Articles</h3>
        <FontAwesomeIcon icon={faNewspaper} className="icon-blue icon-lg" />
      </div>
      <div className="flex-links">{linkElems}</div>
    </Cont>
  );
};

export default Related;
