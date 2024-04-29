import Link from "next/link";
import {
    ArrowRightIcon,
    XIcon,
} from "@heroicons/react/solid";
import {faHeart, faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import COLORS from "../../data/colors";
import {fetchDaysDiff} from "../../utils/Functions";

const Notification = ({
                          id,
                          username,
                          created_at,
                          link,
                          field,
                          type,
                          deleteNotificationFunctional,
                          article,
                          comment,
                      }) => {
    return (
        <div className="notification" colors={COLORS}>
            <XIcon
                onClick={() => deleteNotificationFunctional(id)}
                className="red hero-icon-sm mar-right-4 delete flex-no-shrink"
            />
            <Link passHref href={link}>
                <div className="flex select-spec">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className="icon-blue hero-icon-sm mar-right-4 "
                    />
                    <p className="mar-right-4">
            <span className="mar-right-8 contrast">
              {fetchDaysDiff(created_at)}
            </span>
                        <span className="red">{username}</span> has {type} your {field}{" "}
                        {comment !== null && (
                            <span className="small blue">"{comment?.content}" </span>
                        )}
                        {article !== null && (
                            <span className="small green">"{article?.title}"</span>
                        )}
                    </p>
                    <ArrowRightIcon className="icon-blue hero-icon-sm flex-no-shrink"/>
                </div>
            </Link>
        </div>
    );
};

export default Notification;
