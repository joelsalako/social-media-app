import React, { createRef } from 'react';
//import countPrimeNumbers from './../prime';

export default class CounterClass extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 3,
      lastAction: 'none',
      maxNumber: null,
      primeNumbers: null,
      isCalculating: false,
    };
    this.inputIncrease = createRef();
    this.inputDecrease = createRef();

    console.log('---Class component constructed ---');
  }

  componentDidMount() {
    // setTimeout(() => {
    //   const maxNumber = 200;
    //   const primeNumbers = countPrimeNumbers(maxNumber);
    //   this.setState({
    //     isCalculating: false,
    //     maxNumber: maxNumber,
    //     primeNumbers: primeNumbers,
    //   });
    // }, 10);

    let count = 0;
    this.timer = setInterval(() => {
      count++;
      console.log('Count: ', count);
    }, 1000);

    console.log('Class Component mounted');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    console.log('Class component destroyed');
  }

  render() {
    //const { name, age } = this.props; //same as const name = this.props.name & const age = this.props.age;
    //Increment
    const handleIncrementClick = () => {
      this.setState({
        counter: this.state.counter + 1,
        lastAction: 'Increased',
      });
      this.inputIncrease.current.focus();
    };

    //Decrement
    const handleDecrementClick = () => {
      this.setState({
        counter: this.state.counter - 1,
        lastAction: 'Decreased',
      });
      this.inputDecrease.current.focus();
    };

    console.log('Class Component rendered');

    return (
      <div>
        {this.state.isCalculating && (
          <div>
            <strong>Calculating prime numbers. Please, wait...</strong>
          </div>
        )}
        {this.state.primeNumbers !== null && (
          <div>
            There are {this.state.primeNumbers} prime numbers between 2 and{' '}
            {this.state.maxNumber}.
          </div>
        )}
        <div>
          Counter for {this.props.userName}: {this.state.counter}
        </div>
        <div> Last Action: {this.state.lastAction} </div>
        <input
          type="text"
          placeholder="Focus on increase"
          ref={this.inputIncrease}
        />
        <button onClick={handleIncrementClick}>Increase</button>
        <button onClick={handleDecrementClick}>Decrease</button>
        <input
          type="text"
          placeholder="Focus on decrease"
          ref={this.inputDecrease}
        />
      </div>
    );
  }

  componentDidUpdate(prveProps, prevState) {
    console.log('Class component updated');
    if (this.state.lastAction !== prevState.lastAction) {
      console.log('Todo: Save data ...');
    }
  }
}
