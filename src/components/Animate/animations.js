import { keyframes } from '@emotion/core';

const animations = {
  moveInLeft: keyframes`
    0% {
      opacity: 0;
      transform: translateX(-10rem);
    }
    80% {
      transform: translate(1rem);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `,
  moveOutLeft: keyframes`
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translate(-10rem);
    }
  `,
  moveInRight: keyframes`
    0% {
      opacity: 0;
      transform: translateX(10rem);
    }
    80% {
      transform: translate(-1rem);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  `,
  moveOutRight: keyframes`
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translate(10rem);
    }
  `,
  moveInBtn: keyframes`
    0% {
      opacity: 0;
      transform: translateY(3rem);
    }
  100% {
      opacity: 1;
      transform: translate(0);
    }
  `,
  fadeIn: keyframes`
    0% {
      opacity: 0;
    }
  100% {
      opacity: 1;
    }
  `,
};

export default animations;
