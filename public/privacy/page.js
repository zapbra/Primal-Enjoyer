"use client";

import styled from "styled-components";

const Cont = styled.div`
  min-height: 100vh;
  margin-top: 70px;
  background: #fff;
  padding: 32px;
  @media only screen and (max-width: 600px) {
    padding: 32px 0 0 0;
  }
`;

const privacy = () => {
  return (
    <Cont>
      <div className="center-inline mar-bottom-one">
        <h1 className="text-shadow">Privacy Policy</h1>
      </div>
      <div className="shallow-cont box-shadow">
        <p>
          When you sign up or use Primal Enjoyer, you give us certain
          information voluntarily. This includes your name, email address,
          posts, comments, likes, and any other information you give us. If you
          link your Facebook, Instagram, Reddit or other accounts from third
          party services to Primal Enjoye, we also get information from those
          accounts. The infomrmation we get from those services depends on your
          settings and their privacy policies, so please check what those are.
        </p>
      </div>
    </Cont>
  );
};

export default privacy;
