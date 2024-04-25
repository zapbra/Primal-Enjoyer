import styled from "styled-components";
import COLORS from "../../../../../data/colors";
import Edit from "./Edit";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  background: #fff;
  border-radius: 32px;
  padding: 32px;
  animation-name: opacity;
  animation-duration: 0.25s;
  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
  .edits-holder {
    max-height: 800px;
    overflow: auto;
  }
`;

const ViewEdits = ({
  edits,
  deletePostEditFunctional,
  post_user_id,
  user_id,
  overwriteEdit,
}) => {
  const editElems = edits.map((edit, index) => {
    return (
      <Edit
        key={index}
        index={index}
        username={edit.user_id.username}
        content={edit.content}
        created_at={edit.created_at}
        id={edit.id}
        deletePostEditFunctional={deletePostEditFunctional}
        post_user_id={post_user_id}
        user_id={user_id}
        overwriteEdit={overwriteEdit}
      />
    );
  });
  return (
    <Cont className="box-shadow" colors={COLORS}>
      <div className="flex justify-center align-center mar-bottom-one">
        <h2 className="mar-right-8">View Edits</h2>
        <h4 className="light blue">({edits.length})</h4>
      </div>
      <div className="edits-holder">{editElems}</div>
    </Cont>
  );
};

export default ViewEdits;
