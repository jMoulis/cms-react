import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Root = styled.div`
  label: ModalRoot;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${({ shoudDisplayChildren }) =>
      shoudDisplayChildren ? fadeIn : fadeOut}
    ${({ delay }) => `${delay}ms`} ease forwards;
`;

export default Root;
