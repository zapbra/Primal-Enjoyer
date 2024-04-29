import Link from "next/link";


const ArticleLink = ({title, id, removeFromCollectionFunctional}) => {
    return (
        <div className="box-shadow">
            <Link
                href={{
                    pathname: `/article/${title}`,
                }}
            >
                <div className="flex text-flex">
                    <p className="small">{title.replace(/%20/g, " ")}</p>
                </div>
            </Link>
            <div className="flex-right close">
                {/*<FontAwesomeIcon*/}
                {/*    onClick={() => removeFromCollectionFunctional(id, title)}*/}
                {/*    icon={faClose}*/}
                {/*    className="delete-btn icon-sm"*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default ArticleLink;
