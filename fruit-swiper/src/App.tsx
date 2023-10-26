import { useState, useEffect } from 'react';
import './App.css';
import texts from './assets/titles/text';
import { strawArr, berryArr, caramelArr } from './assets/images/images';

const fruitData = [
  { image: strawArr, title: 'Strawberry', color: 'straw' },
  { image: berryArr, title: 'Blackberry', color: 'berry' },
  { image: caramelArr, title: 'Caramel', color: 'caramel' }
];

const App = () => {
  const [index, setIndex] = useState(0);
  const [isTranslated, setIsTranslated] = useState(false);
  const [active, setActive] = useState(21);
  const { image, title, color } = fruitData[index];

  const handleNext = () => {
    const nextIndex = (index + 1) % fruitData.length;
    updateFruitData(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (index - 1 + fruitData.length) % fruitData.length;
    updateFruitData(prevIndex);
  };

  const updateFruitData = (newIndex:number) => {
    setIsTranslated(true);
    setTimeout(() => {
      setIsTranslated(false);
    }, 200);
    setIndex(newIndex);
    setActive(newIndex * 30 + 20);
  };

  useEffect(() => {
    document.body.style.background = `var(--${color})`;
  }, [color]);

  return (
    <>
      <div className="images-up">
        <img
          src={image[0]}
          alt=""
          className={`img-up left ${isTranslated ? 'translated-upLeft' : 'translated'}`}
        />
        <img
          src={image[2]}
          alt=""
          className={`img-up right ${isTranslated ? 'translated-upRight' : 'translated'}`}
        />
      </div>
      <div className={`info ${isTranslated ? 'translated-up' : 'translated'}`}>
        <h2 className="title">{title} Pie</h2>
        <p className="text">{texts[index]}</p>
      </div>
      <div className="pies">
        {fruitData.map((fruit, idx) => (
          <p key={idx} className="pie-element" onClick={() => updateFruitData(idx)}>
            {fruit.title}
          </p>
        ))}
        <span className="active" style={{ left: `${active}%` }}></span>
      </div>
      <div className="bottom">
        <button className="left-arrow arrow" onClick={handlePrev}>
          &lt;
        </button>
        <img
          src={image[1]}
          alt="Pie"
          className={`img-bottom pie ${isTranslated ? 'translated-down' : 'translated'}`}
        />
        <button className="right-arrow arrow" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default App;