import styled from 'styled-components';

const Container = styled.div`
    background-color: white;
    box-shadow:0 2px 5px 2px rgba(1,1,1,.5);
    border-radius:.5rem;
    padding:20px;
    
    .main-title{
        width: 90%;
        margin: 0 auto 3rem;
        text-align: center;
        border-bottom: 2px solid ${props => props.colors.darkBlue};
    }
`;

const Article = styled.article`
    margin-bottom: 5rem;
    .title{
        padding: 5px 20px;
        border-radius: .5rem;
        box-shadow:0 2px 5px 2px rgba(1,1,1,.5);
        background-color: ${props => props.colors.ultraLightBlue};
        margin-bottom: 2rem;
        display:inline-block;
    }
    .content{
        background-color: #fff;
        box-shadow:0 2px 5px 1px rgba(1,1,1,.5);
        border-radius: .5rem;
        padding:10px;
        p{
            font-weight:500;
            font-size:18px;
            margin-bottom:1rem;
        }
    }
`;

const BulletPoint = styled.div`
    p{
        &:nth-of-type(1){
            font-weight:bold;
            font-size:20px;
        }
        &:nth-of-type(2){
            padding-left:1rem;
        }
    }
`;

const Introduction = (props) => {
  return (
    <Container colors = {props.colors}>
        <div className = 'main-title'>
            <h1>
                Welcome To The Primal Diet
            </h1>
        </div>
        <Article colors = {props.colors}>
            <div className = 'title'>
                <h1>Introduction</h1>
            </div>
            <div className = 'content'>
                <p>This is the unoffical Raw Primal Diet website. Sharing many articles
                    with Aajonus's first hand knowledge. Aajonus's information is always the best resource,
                    but I will also be sharing my experience with the diet and provide some of my experimentation.
                    Feel free to browse many of the recent articles, read the pure documentation, take the free course 
                    (unfinished) or search for any health issue/question you have in the search page.
                </p>
            </div>
        </Article>
        <Article colors = {props.colors}>
            <div className = 'title'>
                <h1>What Is The Raw Primal Diet</h1>
            </div>
            <div className = 'content'>
                <p>
                It is a diet completely consisting of raw meat (beef, chicken, pork), raw dairy, eggs and vegetable juices. 

                </p>

                <p>
                    The logic behind it is when you cook foods the enzymes, proteins, fats, and nutrients are damaged or destroyed. 
                    Advanced glycation end products are formed in the cooking process, which lead to rapid aging of the body. Additionally, a high carbohydrate diet of fruit 
                    or especially grains leads to a buildup of AGES (advanced glycation end-products) in the process of using sugar for energy. 
                </p>

                <p>
                    Raw uncooked meats, dairy, and eggs are also much higher in beneficial bacteria to help your cells function and feed the bacteria in your body. An extra benefit
                    of this “good” bacteria is that it will make you feel much happier because you are feeding your body what it needs. 
                </p>

                <p>
                    Humans originated on raw meat many “hundreds of thouands” of years ago and no other animal eats cooked foods except humans. No tribes living on their natural 
                    diet experience chronic illness whatsoever, even tribes who eat cooked meat live without serious disease. They may get a little arthritis or muscle 
                    degeneration in old age and not function as well, but they do not experience severe disease seen in modern society. 
                    1/2 males and 1/3 women will get cancer in their lifetime, do you want to take those chances on the standard american diet?
                </p>

                <p>
                    By eating proteins, and fats in their raw state, you can preserve the nutrients 
                </p>

                <p>
                    By eating a diet of 15-20% protein, 75-80%fat, an 5% carbohydrates you will reduce the production of advanced glycation end products. The body can handle 
                    8% carbohydates without forming advanced glycation end products.
                </p>

                <p>
                    Raw protein from meats to build the body, raw fats to detox the poisons and to use as energy, and sugars from fruit/honey/milk to help use the fat for fuel, aid in
                    detox and help digest the proteins.
                </p>

                <p>
                    Officially created by Aajonus Vonderplanitz in 1997 after his release of the book, “We Want To Live”. He had already been experimenting with raw meat since 1976 and had cured 100s 
                    of patients at this point. 
                </p>

            </div>
        </Article>

        <Article colors = {props.colors}>
            <div className = 'title'>
                <h1> How Can You Start?</h1>
                
            </div>
            <div className = 'content'>
                    <BulletPoint>
                        <p>
                            (1) Read The Book "We Want To Live", By Aajonus Vonderplanitz. 
                        </p>
                        <p>
                            Linked here is the PDF version of We Want To Live. You don’t need to 
                            read the whole thing, but it is a good introduction to what the diet is
                            and how it can help you.
                        </p>
                    </BulletPoint>

                    <BulletPoint>
                        <p>
                            (2) Listen To The Aajonus Workshop.
                        </p>
                        <p>
                            This is a video of one of the many Aajonus Vonderplanitz workshops. 
                            It’s best to listen right from the source and he will teach you must more than I will be able to. 
                            It goes into parasites, cooked vs raw foods, bacteria, and how to do the diet correctly.
                        </p>
                    </BulletPoint>
                    
                    <BulletPoint>
                        <p>
                            (3) Listen To Atleast One Q&A. (optional)
                        </p> 

                        <p>
                        By This point you are ready to eat raw meat. For extra credit I have linked all the direct Aajonus content in my resources
                        section of the website. Athough, the easiest way to consume these is through the Mantysalo channel on youtube linked here.
                        These go into specific questions to teach you a greater understanding of the specifics. 
                        </p>
                    </BulletPoint>
                </div>
        </Article>
    </Container>
  )
}

export default Introduction