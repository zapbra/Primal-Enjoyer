import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Link from "next/link";
import Image from "next/image";

const Cont = styled.div`
  max-width: 1000px;
  margin: 0 auto;

  li {
    margin-left: 32px;
    margin-bottom: 8px;
  }
  h5.red {
    color: red !important;
  }
  .image-cont {
    width: 100%;
    height: 300px;
    @media only screen and (max-width: 700px) {
      flex: auto;
    }
    .relative {
      width: 100%;
      height: 100%;
    }
  }
  .flex-cont {
    @media only screen and (max-width: 700px) {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: 400px) {
    .padding-8 {
      padding: 0;
    }
  }
  .blue-bg {
    background-color: ${(props) => props.colors.darkBlue};
    padding: 16px;
    h4,
    h5 {
      color: #fff;
    }
  }
`;

const CreateTestimonial = () => {
  return (
    <Cont colors={COLORS}>
      <div className="">
        <div className="blue-bg">
          <h4 className="black mar-bottom-16 text-shadow">
            Do you follow the primal diet?
          </h4>
          <h4 className="mar-bottom-16 text-shadow">
            Do you want to share your story?
          </h4>
          <h5 className="black light mar-bottom-16 text-shadow">
            Share your story below and inspire others to follow this way of
            life.
          </h5>
          <h5 className="black light mar-bottom-16 text-shadow">
            Others might be able to learn from you.
          </h5>
        </div>
        <div className="grey-line mar-bottom-32"></div>
        <div className=" flex flex-cont align-center">
          <div className="flex-one padding-8">
            <div className="blue-bg-btn mar-bottom-16">
              <h5 className="white text-shadow">
                Some things to include are...
              </h5>
            </div>
            <ul>
              <li>photos</li>
              <li>how long you’ve been doing the diet</li>
              <li>what your diet/health was like before the diet</li>
              <li>what you eat when you started and what you eat now</li>
              <li>what the benefits of the diet have been for you</li>
              <li>anything else you feel important to include</li>
            </ul>
          </div>
          <div className="image-cont relative flex-one padding-8">
            <div className="relative">
              <Image
                src={"/images/testimonials/healing.jpg"}
                fill
                style={{ objectFit: "cover" }}
                alt="healing"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="sm-spacer"></div>
      <div className="mar-bottom-32"></div>
      <div className="blue-bg-btn center-inline mar-bottom-16">
        <h3 className="text-shadow">Share your story below</h3>
      </div>
      <div className="center-inline mar-bottom-48">
        <h4 className="black mar-bottom-8">
          Completely anonymous or share your name or contact info and photos if
          you want.{" "}
        </h4>
        <h5 className="black light">
          <Link href="/signup">
            <span className="link-blue mar-right-4">Sign up/in</span>
          </Link>
          if you would like to edit it in the future or simply email
          primalenjoyer@hotmail.com with any edits you may have
        </h5>
      </div>
      <div className="mar-bottom-32"></div>
    </Cont>
  );
};

export default CreateTestimonial;
