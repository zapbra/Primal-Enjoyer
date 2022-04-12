import React from "react";
import styled from "styled-components";
import Link from "next/link";
const NavCont = styled.nav`
  display: flex;
  height: 70px;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
  margin-bottom: 2rem;
  h3 {
    text-shadow: 2px 2px 2px rgba(1, 1, 1, 0.25);
    cursor: pointer;
    padding: 10px;
    &:nth-of-type(2) {
      border-right: 1px solid black;
      border-left: 1px solid black;
    }
    &:nth-of-type(3) {
      border-right: 1px solid black;
    }
    &:hover {
      background-color: #fff;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
`;
const Title = styled.h1`
  text-shadow: 3px 3px 5px rgba(1, 1, 1, 0.5);
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;
const Navbar = () => {
  return (
    <NavCont>
      <Link passHref href="/" clasName="link">
        <Title>Aajonus World</Title>
      </Link>
      <NavRight>
        <Link passHref href="/course" className="link">
          <h3>Course</h3>
        </Link>
        <Link passHref href="/documents" className="link">
          <h3>Documents</h3>
        </Link>
        <Link passHref href="/search" className="link">
          <h3>Search</h3>
        </Link>
        <Link passHref href="/resources" className="link">
          <h3>Resources</h3>
        </Link>
      </NavRight>
    </NavCont>
  );
};

export default Navbar;
