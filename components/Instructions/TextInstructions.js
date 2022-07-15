import React from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import {
  CursorClickIcon,
  TrashIcon,
  SearchCircleIcon,
  TagIcon,
} from "@heroicons/react/solid";

const Content = styled.div`
  padding: 1rem;
  width: 100%;

  -webkit-box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
  box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
  .icon {
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background-color: ${(props) => props.colors.green};
    display: flex;
    align-items: center;
    justify-content: center;
    h5 {
    }
  }
`;

const List = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 0.5rem;
`;

const TextInstructions = () => {
  return (
    <Content colors={COLORS}>
      <List>
        <ListItem>
          <div className="icon">
            <h5>1</h5>
          </div>
          <p>Click Tags To Add Them</p>
          <CursorClickIcon className="main-icon" />
        </ListItem>

        <ListItem>
          <div className="icon">
            <h5>2</h5>
          </div>
          <p>Click Tags To Remove Them</p>
          <TrashIcon className="main-icon" />
        </ListItem>

        <ListItem>
          <div className="icon">
            <h5>3</h5>
          </div>
          <p>Type In The Search Bar and Enter To Autofill</p>
          <SearchCircleIcon className="main-icon" />
        </ListItem>

        <ListItem>
          <div className="icon">
            <h5>4</h5>
          </div>
          <p>Add Multiple Tags To Narrow Down Searches</p>
          <TagIcon className="main-icon" />
        </ListItem>
      </List>
    </Content>
  );
};

export default TextInstructions;
