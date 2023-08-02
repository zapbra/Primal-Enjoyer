import styled from "styled-components";
import Notification from "./Notification";
const Cont = styled.div`
  padding: 0;
  max-height: 331px;
  width: 100%;
  overflow-y: scroll;

  .notification {
    &:first-of-type {
      border-radius: 8px 8px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 8px 8px;
      border: none;
    }
  }
`;
const Notifications = ({ notifications, deleteNotificationFunctional }) => {
  const notificationElems = notifications.map((notification, index) => {
    return (
      <Notification
        key={index}
        id={notification.id}
        username={notification.sender_id.username}
        created_at={notification.created_at}
        link={notification.link}
        field={notification.field}
        type={notification.type}
        deleteNotificationFunctional={deleteNotificationFunctional}
        article={notification.article_id}
        comment={notification.comment_id}
      />
    );
  });
  return <Cont className="box-light">{notificationElems}</Cont>;
};

export default Notifications;
