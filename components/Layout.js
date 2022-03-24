import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import Head from "next/head";
const Center = styled.div`
  width: 85%;
  margin: 0 5% 0 10%;
`;
const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head> {title}</Head>
      <Navbar />
      <Center>{children}</Center>
    </div>
  );
};

Layout.defaultProps = {
  title: "Conspiracy Blog",
  description: "Blogs about common conspiracies",
  keywords: "matrix, conspiracy, blog, nwo",
};

export default Layout;
