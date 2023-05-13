import { useState, useRef, useEffect } from 'react';
import countPrimeNumbers from '../prime';

export default function CounterFunction({ userName }) {
  const [counter, setCounter] = useState(3);
  const [lastAction, setLastAction] = useState('none');
  const [maxNumber, setMaxNumber] = useState(null);
  const [primeNumbers, setPrimeNumbers] = useState(null);
  const [isCalculating, setIsCalculating] = useState(true);

  useEffect(() => {
    console.log('Function component mounted');

    let count = 0;
    const timer = setInterval(() => {
      count++;
      console.log('Count: ', count);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('Function component unmounted');
    };
  }, []);

  const inputIncrease = useRef();
  const inputDecrease = useRef();

  const handleIncrementClick = () => {
    setCounter(counter + 1);
    setLastAction('Incresed');
    inputIncrease.current.focus();
  };

  const handleDecrementClick = () => {
    setCounter(counter - 1);
    setLastAction('Decreased');
    inputDecrease.current.focus();
  };

  console.log('Function Component rendered');

  return (
    <div>
      {isCalculating && (
        <div>
          <strong>Calculating prime numbers. Please, wait...</strong>
        </div>
      )}
      {primeNumbers !== null && (
        <div>
          There are {primeNumbers} prime numbers between 2 and {maxNumber}.
        </div>
      )}
      Counter for {userName}: {counter}
      <div>Last Action: {lastAction}</div>
      <input
        type="text"
        placeholder="Focus on increase"
        ref={inputIncrease}
      />
      <button onClick={handleIncrementClick}>Increase</button>
      <button onClick={handleDecrementClick}>Decrease</button>
      <input
        type="text"
        placeholder="Focus on increase"
        ref={inputDecrease}
      />
    </div>
  );
}
