import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { useEffect, useState } from "react";
import { fetchUserById } from "../../../../utils/supabaseFunction";

const Cont = styled.div`
  background: #fff;

  border: 4px solid ${(props) => props.colors.ultraLightGrey};
  padding: 8px;
  text-align: center;
  height: 240px;

  overflow: hidden;
  border-style: outset;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    border-style: inset;
  }
  &:active {
    background-color: ${(props) => props.colors.lightGrey};
  }
  h5 {
    margin-bottom: 4px;
  }
`;
const Anecdote = ({
  title,
  content,
  showPopup,
  anecdote_id,
  anecdote_real_id,
  date,
  name,
}) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (anecdote_id != undefined) {
      fetchUserById(anecdote_id).then((res) => setUsername(res[0].username));
    } else {
      setUsername(name);
    }
  }, []);
  return (
    <Cont
      onClick={() =>
        showPopup(title, content, anecdote_id, anecdote_real_id, date, name)
      }
      colors={COLORS}
    >
      <h5 className="text-shadow">{title}</h5>
      <p className="small green">u/{username}</p>
      <p className="contrast small">{content}</p>
    </Cont>
  );
};

export default Anecdote;
