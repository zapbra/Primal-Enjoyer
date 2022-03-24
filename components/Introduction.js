import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;
  padding: 20px;

  .main-title {
    width: 90%;
    margin: 0 auto 3rem;
    text-align: center;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
  }
  ul{
      margin-left:20px;
      
  }
`;

const ContainWidth = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Article = styled.article`
  margin-bottom: 5rem;
  .title {
    padding: 5px 20px;
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
    background-color: ${(props) => props.colors.ultraLightBlue};
    margin-bottom: 2rem;
    display: inline-block;
  }
  .content {
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgba(1, 1, 1, 0.5);
    border-radius: 0.5rem;
    padding: 10px;
    p {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 1rem;
    }
    li{
        p{
            margin-bottom:0.5rem;
        }
    }
  }
`;

const BulletPoint = styled.div`
  p {
      padding-left: 1rem;
    &:nth-of-type(1) {
      font-weight: bold;
      font-size: 20px;
      padding:0;
    }
    
  }
`;

const Introduction = (props) => {
  return (
    <Container colors={props.colors}>
        <ContainWidth>
      <div className="main-title">
        <h1>Welcome To The Primal Diet</h1>
      </div>
      <Article colors={props.colors}>
        <div className="title">
          <h1>Introduction</h1>
        </div>
        <div className="content">
          <p>
            This is the unoffical Raw Primal Diet website. Sharing many articles
            with Aajonus's first hand knowledge. Aajonus's information is always
            the best resource, but I will also be sharing my experience with the
            diet and provide some of my experimentation. Feel free to browse
            many of the recent articles, read the pure documentation, take the
            free course (unfinished) or search for any health issue/question you
            have in the search page.
          </p>
        </div>
      </Article>
      <Article colors={props.colors}>
        <div className="title">
          <h1>What Is The Raw Primal Diet</h1>
        </div>
        <div className="content">
          <p>
            It is a diet completely consisting of raw meat (beef, chicken,
            pork), raw dairy, eggs and vegetable juices.
          </p>

          <p>
            The logic behind it is when you cook foods the enzymes, proteins,
            fats, and nutrients are damaged or destroyed. Advanced glycation end
            products are formed in the cooking process, which lead to rapid
            aging of the body. Additionally, a high carbohydrate diet of fruit
            or especially grains leads to a buildup of AGES (advanced glycation
            end-products) in the process of using sugar for energy.
          </p>

          <p>
            Raw uncooked meats, dairy, and eggs are also much higher in
            beneficial bacteria to help your cells function and feed the
            bacteria in your body. An extra benefit of this “good” bacteria is
            that it will make you feel much happier because you are feeding your
            body what it needs.
          </p>

          <p>
            Humans originated on raw meat many “hundreds of thouands” of years
            ago and no other animal eats cooked foods except humans. No tribes
            living on their natural diet experience chronic illness whatsoever,
            even tribes who eat cooked meat live without serious disease. They
            may get a little arthritis or muscle degeneration in old age and not
            function as well, but they do not experience severe disease seen in
            modern society. 1/2 males and 1/3 women will get cancer in their
            lifetime, do you want to take those chances on the standard american
            diet?
          </p>

          <p>
            By eating proteins, and fats in their raw state, you can preserve
            the nutrients
          </p>

          <p>
            By eating a diet of 15-20% protein, 75-80%fat, an 5% carbohydrates
            you will reduce the production of advanced glycation end products.
            The body can handle 8% carbohydates without forming advanced
            glycation end products.
          </p>

          <p>
            Raw protein from meats to build the body, raw fats to detox the
            poisons and to use as energy, and sugars from fruit/honey/milk to
            help use the fat for fuel, aid in detox and help digest the
            proteins.
          </p>

          <p>
            Officially created by Aajonus Vonderplanitz in 1997 after his
            release of the book, “We Want To Live”. He had already been
            experimenting with raw meat since 1976 and had cured 100s of
            patients at this point.
          </p>
        </div>
      </Article>

      <Article colors={props.colors}>
        <div className="title">
          <h1> How Can You Start?</h1>
        </div>
        <div className="content">
          <BulletPoint>
            <p>
              (1) Read The Book "We Want To Live", By Aajonus Vonderplanitz.
            </p>
            <p>
              Linked here is the PDF version of We Want To Live. You don’t need
              to read the whole thing, but it is a good introduction to what the
              diet is and how it can help you.
            </p>
          </BulletPoint>

          <BulletPoint>
            <p>(2) Listen To The Aajonus Workshop.</p>
            <p>
              This is a video of one of the many Aajonus Vonderplanitz
              workshops. It’s best to listen right from the source and he will
              teach you must more than I will be able to. It goes into
              parasites, cooked vs raw foods, bacteria, and how to do the diet
              correctly.
            </p>
          </BulletPoint>

          <BulletPoint>
            <p>(3) Listen To Atleast One Q&A. (optional)</p>

            <p>
              By This point you are ready to eat raw meat <i>(of course you can just eat it)</i>. </p>
              <p>For extra credit I
              have linked all the direct Aajonus content in my resources section
              of the website.
              </p>
              <p>
               Athough, the easiest way to consume these is
              through the Mantysalo channel on youtube linked here. 
              <p>
              <a target = '_blank' href = 'https://www.youtube.com/channel/UCdHSzt83x7LjGcdNTJu2LSA?app=desktop'>
                  Mantysalo Youtube
              </a>
              </p>
              These go
              into specific questions to teach you a greater understanding of
              the specifics.
              </p>
              
            
          </BulletPoint>
          <BulletPoint>
              <p>(4) Find Farms Near You or Good Qualit Butcher</p>
              <p>Feel free to read this article <b>-insert article-</b> on how to find farms near you or this webpage <b>-insert webpage-</b> with all the online resources to find farms near you</p>
              <p>Just literally look up organic/grass fed farms near me, organic/grass fed butcher near me. Worst case scenario, you can buy some at the grocery store. Go on messaging boards, contact local people
                  in your areas, go on websites like Kijiji, try to find the best quality you can. Also, ask your farmer about people they know.
              </p>
              <p>Don't feel bad to ask questions and possibly stop purchasing from certain farmers if they don't fit your criteria. Product quality is driven by consumer demand.</p>
              <p>The only problem with buying from the grocery store is you can't verify the quality. It's often quite old and sprayed with various chemicals. The issue with buying from certain farms 
                  is they freeze the meat which damages the nutrients and bacteria. Although, it is still better than nothing. </p>

          </BulletPoint>
        </div>
      </Article>
                <Article colors = {props.colors}>
                    <div className="title">
                        <h1>(5) Finally!! You Can Eat Raw Meat Now</h1>
                    </div>
                    <div className="content">
                        <p>I would personally suggest just diving right into your first raw meal. Here is a good steak tartare recipe <b>-recipe link -</b></p>
                        <p>Some foods which should be easy to get started with include...</p>
                        <ul>
                            <li> <p>Milkshakes (raw milk, eggs, fruit, honey) <b>- Recipe Link -</b></p> </li>
                            <li><p>Fresh red meat (feel free to put this sauce on it) <b>- recipe link -</b></p></li>
                            <li><p>Raw fish (try this recipe) <b>- Recipe link -</b></p></li>
                            <li><p>Oysters. Try to buy these by the package. They are often $1.50-$2.00 CAD ea. Compared to $0.65-$1.00 by the package/box</p></li>
                            <li><p>Raw dairy (raw cheese, butter)</p></li>
                            <li><p>Raw Ice Cream</p></li>
                        </ul>
                    </div>
                </Article>

      </ContainWidth>
    </Container>
  );
};

export default Introduction;
