import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  .holder {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .pagination-icon {
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 8px;
    margin-left: 8px;
    &:hover {
      cursor: pointer;
      border-bottom: 1px solid black;
      border-spacing: 4px;
      font-weight: bold;
    }
  }
  .selected {
    border-bottom: 1px solid black;
    border-spacing: 4px;
    &:hover {
      cursor: default;
      font-weight: 400;
    }
  }
  .contrast {
    &:hover {
      color: ${(props) => props.colors.black} !important;
      cursor: pointer;
    }
  }
  .sort-box {
    border: 2px solid ${(props) => props.colors.darkBlue};
    padding: 8px 16px;
    border-radius: 16px;
    margin-bottom: 16px;
    cursor: pointer;
  }
  .active-sort-box {
    background-color: ${(props) => props.colors.darkBlue};
    cursor: default;
    outline: 2px solid ${(props) => props.colors.green};
    outline-offset: 3px;
    border-radius: 16px;
    h5 {
      color: #fff;
    }
  }
`;

const Pagination = ({
  pages,
  page,
  setPage,
  sortNew,
  sortOld,
  sortRandom,
  showFilters = true,
}) => {
  const [dotsRight, setDotsRight] = useState(true);
  const [pageElems, setPageElems] = useState(() => {
    let maxIndex = pages < 5 ? pages : 5;

    let line;
    const pageArr = [];
    for (let i = 1; i <= maxIndex; i++) {
      line = (
        <div onClick={() => setPage(i)} className="pagination-icon">
          <p>{i}</p>
        </div>
      );
      pageArr.push(line);
    }
    pageArr[0] = (
      <div className="pagination-icon selected">
        <p>{1}</p>
      </div>
    );
    return pageArr;
  });

  const updateFilters = (textField) => {
    setPage(1);

    switch (textField) {
      case "Newest":
        sortNew();
        break;
      case "Oldest":
        sortOld();
        break;
      case "Random":
        sortRandom();
        break;
      default:
        break;
    }

    setSortFilters(
      ["Newest", "Oldest", "Random"].map((text, index) => {
        return (
          <div
            key={index}
            onClick={() => updateFilters(text)}
            className={
              textField == text
                ? "sort-box active-sort-box mar-right-8 mar-left-8"
                : "sort-box mar-right-8 mar-left-8"
            }
          >
            <h5>{text}</h5>
          </div>
        );
      })
    );
  };
  const [sortFilters, setSortFilters] = useState(
    ["Newest", "Oldest", "Random"].map((text, index) => {
      return (
        <div
          key={index}
          onClick={() => updateFilters(text)}
          className={
            text == "Newest"
              ? "sort-box active-sort-box mar-right-8 mar-left-8"
              : "sort-box mar-right-8 mar-left-8"
          }
        >
          <h5>{text}</h5>
        </div>
      );
    })
  );
  useEffect(() => {
    setPageElems((prev) => {
      let maxIndex =
        pages < 5
          ? pages
          : pages - page <= 5
          ? page + (pages - page)
          : page + 5;

      let line;
      const pageArr = [];
      const pageStart =
        pages - page < 5 && pages < 5
          ? 1
          : pages - page <= 5
          ? page - (5 - (pages - page))
          : page;
      let offSet = pages - page > 4 ? 3 : 0;

      for (let i = pageStart - 3; i <= maxIndex - offSet; i++) {
        if (i < 1) continue;
        line = (
          <div
            onClick={() => setPage(i)}
            className={
              i == page ? "pagination-icon selected" : "pagination-icon"
            }
          >
            <p>{i}</p>
          </div>
        );
        pageArr.push(line);
      }
      /* pageArr[page] = (
        <div className="pagination-icon selected">
          <p>{page}</p>
        </div>
      ); */
      if (page > 5) {
        pageArr.unshift(
          <div className="mar-right-8 mar-left-8">
            <p>...</p>
          </div>
        );
        pageArr.unshift(
          <div onClick={() => setPage(1)} className="pagination-icon">
            <p>1</p>
          </div>
        );
      }
      if (pages - page > 4) {
        pageArr.push(
          <div className="mar-right-8 mar-left-8">
            <p>...</p>
          </div>
        );
        pageArr.push(
          <div onClick={() => setPage(pages)} className="pagination-icon">
            <p>{pages}</p>
          </div>
        );
      } else {
      }

      return pageArr;
    });
  }, [page, pages]);
  return (
    <Cont colors={COLORS}>
      <div className="holder mar-bottom-16">
        {page > 1 && (
          <FontAwesomeIcon
            onClick={() => setPage(page - 1)}
            icon={faChevronLeft}
            className="contrast icon-sssm mar-right-16"
          />
        )}
        {pageElems}{" "}
        {page < pages && (
          <FontAwesomeIcon
            onClick={() => setPage(page + 1)}
            icon={faChevronRight}
            className="contrast icon-sssm mar-left-16"
          />
        )}
      </div>
      {showFilters && (
        <div className="flex justify-center flex-wrap">{sortFilters}</div>
      )}
    </Cont>
  );
};

export default Pagination;
