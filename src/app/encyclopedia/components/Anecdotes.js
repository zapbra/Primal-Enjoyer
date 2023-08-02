import React from "react";
import styled from "styled-components";
import { PlusIcon } from "@heroicons/react/solid";
import COLORS from "../../../../data/colors";
import Anecdote from "./Anecdote";

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
  .grid-anecdotes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-column-gap: 6px;
    grid-row-gap: 6px;
    max-height: 1000px;
    overflow-y: auto;
  }
  .plus-cont-sm {
    margin: 32px 0 0 0;
  }
  .edit-holder {
    display: flex;
    justify-content: flex-start;
  }
`;

const Anecdotes = ({ anecdotes, showPopup, toggleAnecdoteCreate }) => {
  const anecdoteElems = anecdotes.map((anecdote, index) => {
    return (
      <Anecdote
        key={index}
        showPopup={showPopup}
        title={anecdote.title}
        content={anecdote.content}
        date={anecdote.created_at}
        anecdote_id={anecdote.user_id}
        anecdote_real_id={anecdote.id}
        name={anecdote.name}
      />
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="flex">
        <h3 className="light">Anecdotes</h3>
      </div>
      <div className="grid-anecdotes">{anecdoteElems}</div>
      <div className="edit-holder">
        <div className="plus-cont-sm" onClick={toggleAnecdoteCreate}>
          <PlusIcon className="icon-misc" />
        </div>
      </div>
    </Cont>
  );
};

export default Anecdotes;
