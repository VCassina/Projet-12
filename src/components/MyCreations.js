import React, { useState, useEffect, useRef } from "react";
import data from "../datas/creationsSlider.json";
import AnchorTarget from "../items/AnchorTarget";
import CreationsUpperArticle from "../components/CreationsUpperArticle";
import CreationsBottomArticle from "../components/CreationsBottomArticle";
import titleAnimationHelper from "../helpers/titleAnimationHelper";
import bankArgent from "../assets/BankArgent.webp";
import ninaCarducci from "../assets/NinaCarducci.webp";
import devBootes from "../assets/BootesDev.webp";
import { useStore } from '../store';


function MyCreations() {
  const isLowTabletteDisplay = useStore((state) => state.isLowTabletteDisplay);
  console.log()

  const imgSrc = [bankArgent, ninaCarducci, devBootes];
  const dataSlider = data;
  const sleepingRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);
  const [nextElement, setNextElement] = useState(null);
  const [newData, setNewData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  titleAnimationHelper(
    "creations_content_upper-title-sleepingAnimation",
    sleepingRef
  );

  const handleElementChange = (index) => {
    if (selectedElement === index) {
      return null;
    }

    setAnimateOut(true);
    setSelectedElement(index);

    setTimeout(() => {
      setSelectedImage(index);
      setAnimateOut(false);
    }, 350);
  };

  useEffect(() => {
    let timeoutId = null;

    if (selectedElement !== null) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        setNewData(dataSlider[selectedElement]);
      }, 350);
    }

    return () => clearTimeout(timeoutId);
  }, [selectedElement, dataSlider]);

  return (
    <article className="creations_container">
      <AnchorTarget id="creations" />
      <div className="importantComponent">
        <div className="creations_content">
          <div className="creations_content_upper">
            <h2 className="creations_content_upper-title">
              <span>_</span>
              <span ref={sleepingRef} className="">
                Nos réalisations
              </span>
            </h2>
            <nav className="creations_content_upper-nav">
              {dataSlider.map((item, index) => (
                <CreationsUpperArticle
                  key={index}
                  item={item}
                  index={index}
                  handleElementChange={() => handleElementChange(index)}
                  selectedElement={selectedElement}
                />
              ))}
            </nav>
          </div>
          {!isLowTabletteDisplay ? (
            <div className="creations_content_carrousel">
              <CreationsBottomArticle
                webSiteScreen={imgSrc[selectedImage]}
                altScreen={newData?.altScreen}
                description={newData?.description}
                title={newData?.title}
                siteUrl={newData?.siteUrl}
                gitUrl={newData?.gitUrl}
                animateOut={animateOut}
                nextElement={nextElement}
                setNextElement={setNextElement}
              />
            </div>
          ) : (
            <div className="creations_content_carrousel_wrapper">
              <div className="creations_content_carrousel_items">
                {data.map((newData, index) => (
                  <CreationsBottomArticle
                    key={index}
                    webSiteScreen={imgSrc[index]}
                    altScreen={newData?.altScreen}
                    description={newData?.description}
                    title={newData?.title}
                    siteUrl={newData?.siteUrl}
                    gitUrl={newData?.gitUrl}
                    nextElement={nextElement}
                    setNextElement={setNextElement}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default MyCreations;