import styled from "styled-components";
import Link from "next/link";
import COLORS from "../../data/colors";
const Cont = styled.div`
  background: yellow;
  margin-right: auto;
  margin-left: auto;
  border-radius: 32px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.25s ease;
  border: 4px solid red;

  h5 {
    margin: 0 !important;
    color: red !important;
  }
  &:hover {
    box-shadow: none;
  }
  max-width: 600px;
`;

const DonationButton = () => {
  return (
    <Link href="https://buy.stripe.com/3csg2oeQp1DaeYgdQQ">
      <Cont colors={COLORS} className="box-shadow cursor mar-bottom-16">
        <h5 className="text-shadow">DONATE</h5>
      </Cont>
    </Link>
  );
};

export default DonationButton;
