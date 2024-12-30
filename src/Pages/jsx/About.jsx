import banner from "./../assets/banner.png";
import aboutcss from "./../css/about.module.css";
import { about_text, about_navLinks } from "../../constants";

const About = () => {
  return (
    <div className={aboutcss["about"]}>
      <div>
        <img className={aboutcss["banner-icon"]} alt="" src={banner} />
      </div>
      <div className={aboutcss["main-layout"]}>
        <div className={aboutcss["container-content"]}>
          {about_text.map((element, index) => {
            return (
              <div className={aboutcss["reason-why"]}>
                <div
                  className={aboutcss["About-big-questions"]}
                  id={element.id}
                >
                  {element.title}
                </div>
                <div className={aboutcss["answer"]}>
                  {element.answer}
                  {element.question}
                  {element.list_answer?.map((term, term_index) => {
                    return (
                      <p className={aboutcss["terms-of-use-content"]}>
                        {term}
                        {term_index == 13 &&
                          <a href={element.law_link}>
                            {element.law}
                          </a>
                        }
                      </p>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className={aboutcss["sections"]}>
          <div className={aboutcss["line"]} />
          <div className={aboutcss["container1"]}>
            {about_navLinks.map((ele, index) => {
              return (
                <div className={aboutcss["point-div"]}>
                  <a className={aboutcss["point"]} href={ele.link}>
                    {ele.title}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
        <br style={{ clear: "both" }} /> {/* DO NOT DELETE THIS LINE-BREAK*/}
        {/* WHY? TL:DR IT'D BREAK THE FOOTER */}
        {/* I needed .content-container and .sections to be on different columns.
         The modern way to do this is to use either Flexbox or CSS Grid. I thought
          doing so would be far too complicated and likely overkill for such a 
          simple implementation. I was wrong.
          I used the old method - float. It looked like it worked, but turns out
          a div does not expand to fit floated child elements, meaning the parent
          div containing everything does not expand to fit .content-container and
          .sections, and it would only be the size of div containing the image,
          as that was not floated. I was aware of this since way before, but decided
          that it was not an issue. I would later find that it was.
          The first sign of trouble came when the Navbar would not remain in its
          fixed position at the top of the screen when scrolling past the image.
          This is because we were using position: sticky and putting it at the
          top of the screen instead of the doing it the proper way and using
          position: fixed, as that would cause other problems related to
          scrolling. This entire debacle would eventually be sidestepped altogether
          when I implemented the auto-hiding Navbar. 
          But the actual issue had still not been addressed, and it would come up
          again when I tried to implement a Footer. You see, the Footer has to be
          below the entire page, so it has to clear (foreshadowing) everything on
          the page. The problem was that the page was not expanding to fit
          .content-container and .sections, meaning those elements were overflowing
          and the wrapping div itself was only a few hundred pixels in height,
          as it only expanded to fit the image's div. This meant the Footer would
          sit right in the middle of the page.
          But I would eventually find a solution, which is seen right above this
          overly lengthy comment. Apparently you need to add an element - any
          element - that does not float and make it go below (i.e. clear) the
          floating ones, which is why I have added a line-break with some
          inline styles, doing exactly that. */}
      </div>
    </div>
  );
};

export default About;
