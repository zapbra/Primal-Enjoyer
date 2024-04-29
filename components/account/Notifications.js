import Notification from "./Notification";

const Notifications = ({notifications, deleteNotificationFunctional}) => {
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
    return <div className="box-light">{notificationElems}</div>;
};

export default Notifications;
