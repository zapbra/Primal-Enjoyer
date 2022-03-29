import styled from "styled-components";
import Link from "next/link";
const IconHolder = styled.div``;

const Icon = (props) => {
  return (
    <IconHolder>
      <Link href="/">
        <p>hello</p>
      </Link>
    </IconHolder>
  );
};

export default Icon;
