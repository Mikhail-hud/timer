import React, { useState, useEffect } from 'react';
import style from './Timer.module.css';
import { Row, Col } from 'react-bootstrap';

const Timer = () => {
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hours, setHours] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  const resetTimer = () => {
    setIsActive(true);
    setCounter(0);
    setSecond('00');
    setMinute('00');
    setHours('00');
  };
  const startStopTimer = (isActive) => {
    if (isActive === false) {
      setIsActive(true);
    }
    if (isActive === true) {
      setIsActive(false);
      setCounter(0);
      setSecond('00');
      setMinute('00');
      setHours('00');
    }
  };

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const hoursCounter = Math.floor(counter / 3600);
        const minuteCounter = Math.floor((counter - hoursCounter * 3600) / 60);
        const secondCounter = counter - hoursCounter * 3600 - minuteCounter * 60;
        const computedSecond =
          String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
        const computedMinute =
          String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;
        const computedHour = String(hoursCounter).length === 1 ? `0${hoursCounter}` : hoursCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHours(computedHour);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  return (
    <Row className={style.timer__container}>
      <Col xs={8} className={style.timer__block}>
        <div className={style.time}>
          <span>{hours}:</span>
          <span>{minute}:</span>
          <span>{second}</span>
        </div>
        <div>
          <button
            onClick={() => startStopTimer(isActive)}
            className={isActive ? `${style.stop}` : `${style.start}`}>
            {isActive ? 'Stop' : 'Start'}
          </button>
          <button onClick={resetTimer} className={style.reset}>
            Reset
          </button>
          <button
            onDoubleClick={() => setIsActive(false)}
            className={style.wait}
            disabled={!isActive}>
            Wait
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Timer;
