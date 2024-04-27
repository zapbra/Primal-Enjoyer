import COLORS from "../../../../data/colors";


const Ingredients = ({food_instances}) => {
    return (
        <div>
            <h5 className="mb-4 res-heading-sm font-bold">
                Ingredients{" "}
                <span className='res-text-base text-slate-400 font-normal'>
          servings (4)
        </span>
            </h5>
            <div className="grey-line mar-bottom-16"></div>
            <div className="mar-left-16 ingredients">
                {food_instances.map((food_instance, index) => {
                    return (
                        <div className="mb-4 flex justify-between" key={index}>
                            <div className="flex align-center mar-right-16">
                                <p className='text-slate-400 mr-4'>({index + 1})</p>
                                <p className="mr-4">{food_instance.food_id.name}</p>
                            </div>
                            <div className='min-w-32'>
                                <p className="text-slate-400 res-text-xs">({food_instance.quantity})</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Ingredients;
