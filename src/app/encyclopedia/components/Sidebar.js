import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointer,
  faChevronCircleLeft,
  faChevronCircleRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import AlphaLine from "./AlphaLine";
import supabase from "../../../../utils/supabaseClient";

const Cont = styled.div`
  z-index: 2;
  background-color: ${(props) => props.colors.ultraLightBlue};
  width: 240px;
  min-height: 100vh;
  float: left;
  position: absolute;
  transition: left 0.5s ease;
  left: 0px;
  @media only screen and (max-width: 256px) {
    width: 100%;
  }
  .abs {
    position: absolute;
  }
  .header {
    margin: 0 auto;
    justify-content: center;
    border-bottom: 3px solid ${(props) => props.colors.darkBlue};
    padding: 32px 8px;

    h4 {
      margin-left: 8px;
    }
  }
  .green {
    cursor: pointer;
    transition: transform 0.5s ease;
    border: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 50%;
    background: ${(props) => props.colors.darkBlue};
    &:hover {
      background: ${(props) => props.colors.green};
      color: ${(props) => props.colors.darkBlue};
    }
  }
  .posts {
    display: flex;
  }
  .posts-flex {
    width: 100%;
  }

  .hide-sidebar {
    width: 16px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    background: ${(props) => props.colors.green};
    border-right: 2px solid ${(props) => props.colors.darkBlue};
    border-left: 2px solid ${(props) => props.colors.darkBlue};
    border-bottom: 3px solid ${(props) => props.colors.darkBlue};
    border-top: none;
    cursor: pointer;
    transition: background-color 0.25s ease;
    .icon-blue {
      transition: color 0.25s ease;
    }
    &:hover {
      background-color: ${(props) => props.colors.darkBlue};
      .icon-blue {
        color: ${(props) => props.colors.green};
      }
    }
  }
`;

const ShowSidebar = styled.div`
  z-index: 1;
  position: fixed;
  background-color: ${(props) => props.colors.ultraLightBlue};
  border: 1px solid black;
  border-left: none;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  display: flex;
  justify-content: flex-end;
  padding: 4px;
  top: 70px;

  left: 0px;
  .green {
    cursor: pointer;
    border: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 50%;
    background: ${(props) => props.colors.darkBlue};
    &:hover {
      background: ${(props) => props.colors.green};
      color: ${(props) => props.colors.darkBlue};
    }
  }
`;
const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [arr, letARr] = useState([]);
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("alphabet")
        .select("*, post(title)");
      if (error) {
        setFetchError(error);
        setPosts([]);
      }

      if (data) {
        setPosts(
          data.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          })
        );

        setFetchError(null);
      }
    };
    fetchPosts();
  }, []);

  const postElems = posts.map((post, index) => {
    return <AlphaLine key={index} alphabet={post.title} posts={post.post} />;
  });
  const [sidebarLeft, setSidebarLeft] = useState(
    `-${sidebarRef?.current?.clientWidth - 16}px`
  );

  const updateSidebar = () => {
    setSidebarLeft(`-${sidebarRef?.current?.clientWidth - 16}px`);
  };
  useEffect(() => {
    setSidebarLeft(`-${sidebarRef?.current?.clientWidth - 16}px`);
    window.addEventListener("resize", updateSidebar);
    return () => {
      window.removeEventListener("resize", updateSidebar);
    };
  }, []);

  return (
    <>
      {/*
      <ShowSidebar colors={COLORS}>
        <FontAwesomeIcon
          onClick={toggleSidebar}
          icon={faChevronCircleRight}
          className=" box-shadow icon-lg green mobile-icon"
          style={{
            transform: sidebarVisible ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s ease",
          }}
        />
      </ShowSidebar>
        */}
      <Cont
        ref={sidebarRef}
        colors={COLORS}
        style={{
          left: sidebarVisible ? "0px" : sidebarLeft,
        }}
      >
        <div className="header flex-center">
          <FontAwesomeIcon
            icon={faHandPointer}
            className="icon-blue icon-med"
          />

          <h4 className="text-shadow">Alphabet Index</h4>
          <FontAwesomeIcon
            onClick={toggleSidebar}
            icon={faChevronCircleLeft}
            className=" box-shadow icon-lg green"
            style={{
              transform: sidebarVisible ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </div>
        <div className="posts">
          <div className="posts-flex">{postElems}</div>
          <div className="hide-sidebar" onClick={toggleSidebar}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="icon-sm icon-blue"
              style={{
                transform: !sidebarVisible ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="icon-sm icon-blue"
              style={{
                transform: !sidebarVisible ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="icon-sm icon-blue"
              style={{
                transform: !sidebarVisible ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.5s ease",
              }}
            />
          </div>
        </div>
      </Cont>
    </>
  );
};

export default Sidebar;
