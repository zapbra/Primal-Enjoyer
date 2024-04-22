const About = () => {

    return (
        <div className='grid grid-cols-2  max-w-7xl mx-auto sm:px-4'>
            {/** First grid row */}
            <div className="pr-2">
                <h2 className="res-heading-base mb-8">
                    What Is the Raw Primal Diet
                </h2>

                <p className="mb-2 font-bold">Creator</p>
                <p className="mb-4">
                    The Raw Primal diet is a diet created by Aajonus Vonderplanitz
                    in which the majority of your diet is raw meat, raw dairy and
                    raw eggs.
                </p>

                <p className="mb-2 font-bold">
                    Cooked Food
                </p>
                <p className="mb-4">
                    Aajonus believes cooked foods are one of the main causes of
                    disease in modern society. He thinks uncooked foods in their
                    most natural state are what is healthiest for humans.
                </p>

                <div className="mb-2 font-bold">
                    Nutrients
                </div>
                <p className="mb-4">
                    When food is cooked it can damage the enzymes, making it
                    harder to digest. The minerals can become damaged as well.
                    When you consume pasteurized dairy the calcium is less
                    assimilable by your body and when it is heated to 141°, 50%
                    of the calcium will be destroyed.
                </p>
            </div>

            <div>
                <img src='images/homepage/sashimi_640_457.jpg' alt='sashimi'/>
            </div>

            {/** End of first grid row */}

            {/** Second grid row */}
            <div>
                <img src="images/homepage/steak_tartare_640_426.jpg" alt="steak tartare"/>
            </div>

            <div className="pl-8 pt-8">
                <h2 className="res-heading-base mb-8">
                    What Foods Do You Eat on the Primal Diet
                </h2>

                <div className="mb-4 flex border-bottom border-b-2 pb-4 border--primary items-center">
                    <img src="images/homepage/milk_icon_32.png" alt='milk icon' className='mr-4'/>
                    <p className="res-text-lg">
                        Raw Dairy (Milk, Butter, Cream, & Cheese)
                    </p>
                </div>

                <div className="mb-4 flex items-center border-bottom border-b-2 pb-4 border--primary">
                    <img src="images/homepage/beef_icon_32.png" alt="beef icon" className='mr-4'/>
                    <p className="res-text-lg">
                        Raw Beef, Chicken, Pork & More
                    </p>
                </div>

                <div className="mb-4 flex items-center border-bottom border-b-2 pb-4 border--primary">
                    <img src="images/homepage/honey_icon_32.png" alt="honey icon" className='mr-4'/>
                    <p className="res-text-lg">
                        Raw Unheated Honey
                    </p>
                </div>

                <div className="mb-4 flex items-center border-bottom border-b-2 pb-4 border--primary">
                    <img src="images/homepage/juice_icon_32.png" alt="juice icon" className='mr-4'/>
                    <p className="res-text-lg">
                        Raw Vegetable Juice
                    </p>
                </div>

            </div>
            {/** End of second row */}

            {/** Third row */}
            <div className='pr-8 pt-8'>
                <h2 className="res-heading-base mb-8">
                    Other Foods Include...
                </h2>

                <p className="mb-4">
                    <b>Fruits: </b> watermelon, pineapple, papaya, etc
                </p>

                <p className="mb-4">
                    <b>Fats & Oils: </b>
                    Coconut, olive oil, nuts
                </p>

                <p className="mb-4">
                    <b>Vegetables: </b>
                    Small amounts of vegetables like onions, & bland fruits like cucumber, tomato.
                </p>

                <p className="mb-4">
                    <b>Grains & Starches: </b>
                    Starches aren’t necessarily
                    recommended because they are cooked and
                    form toxic byproducts, such as acrylamides
                    which can cause cancer and aging.
                    Although, they are able to bind with excess
                    neurological hormones to make you relax.
                </p>
            </div>

            <div>
                <img src="images/homepage/food_groups_640_920.jpg" alt='food groups'/>
            </div>


            {/** End of third row */}
        </div>
    )
};

export default About;