import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { forwardRef, useRef, useImperativeHandle } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card_id:  props.card_id,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      },
      duration: 2 * 60 * 1000,
      timer: null,

    };
    this.startTimer = this.start.bind(this);
  }

  msToTime(duration) {
    let milliseconds = parseInt((duration % 1000));
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    return {
      hours,
      minutes,
      seconds,
    };
  }

  childMethod() {
    alert('Hello World');
  }

  componentDidMount() {
    this.start();
  }

  start() {
    if (!this.state.timer) {
      this.state.startTime = Date.now();
      this.timer = window.setInterval(() => this.run(), 10);
    }
  }



  run() {
    const diff = Date.now() - this.state.startTime;
    this.setState(() => ({
     time: this.msToTime(diff)
    }));

  }

  render() {
    return (
      <div >
      {
        this.state.time.hours
      }: {
        this.state.time.minutes
      }: {
        this.state.time.seconds
      }
      <
      /div>
    );
  }
}



export default Timer;

