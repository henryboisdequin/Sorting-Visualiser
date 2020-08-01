import React from "react";
// Styles
import "./Visualizer.css";
import "tachyons";
// Sorting Algorithms
import { getMergeSortAnimations } from "../Algorithms/MergeSort";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getInsertionSortAnimations } from "../Algorithms/InsertionSort";
import { getQuickSortAnimations } from "../Algorithms/QuickSort";

// Make responsive on all screens
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

let anSpeed = 1; // animation speed
if (screenWidth < 700) {
  anSpeed = 3;
}

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    // Util variables
    this.animationSpeed = anSpeed;
    this.numberOfBars = screenWidth / 4 - 20;
    this.primaryColor = "aqua";
    this.secondaryColor = "red";
    this.barHeight = screenHeight - 100;

    // State
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    // On reload or visit page
    this.resetArray();
  }

  resetArray() {
    // Resets an array with random numbers
    const array = [];
    for (let i = 0; i < this.numberOfBars; i++) {
      array.push(getRandomNumber(5, this.barHeight));
    }
    this.setState({ array });
  }

  mergeSort() {
    // Handles displaying merge sort animations
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const ifColorChange = i % 3 !== 2;
      if (ifColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? this.secondaryColor : this.primaryColor;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
  }

  quickSort() {
    // Handles displaying quick sort animations
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1"
            ? this.secondaryColor
            : this.primaryColor;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        const [, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
  }

  insertionSort() {
    // Handles displaying insertion sort animations
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1"
            ? this.secondaryColor
            : this.primaryColor;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        const [, barIndex, newHeight] = animations[i];
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
  }

  bubbleSort() {
    // Handles displaying bubble sort animations
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("array-bar");
      if (isColorChange) {
        const color =
          animations[i][0] === "comparison1"
            ? this.secondaryColor
            : this.primaryColor;
        const [, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.animationSpeed);
      } else {
        const [, barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * this.animationSpeed);
      }
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, index) => (
          <div
            className="array-bar"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        {/* BUTTONS Note: all css classes except for button-sort come from tachyons */}
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-red button-sort"
          onClick={() => this.resetArray()}
        >
          Generate New Array
        </button>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-red button-sort"
          onClick={() => this.mergeSort()}
        >
          Merge Sort
        </button>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-red button-sort"
          onClick={() => this.quickSort()}
        >
          Quick Sort
        </button>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-red button-sort"
          onClick={() => this.insertionSort()}
        >
          Insertion Sort
        </button>
        <button
          className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-light-red button-sort"
          onClick={() => this.bubbleSort()}
        >
          Bubble Sort
        </button>
      </div>
    );
  }
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
