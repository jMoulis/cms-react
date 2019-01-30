import styled from '@emotion/styled';
import animations from './animations';

const Animate = styled.div`
  label: Animate;
  animation-name: ${({ animate }) => animations[animate]};
  animation-duration: ${({ duration }) => duration || '300ms'};
  animation-direction: ${({ fill }) => fill || 'normal'};
  animation-fill-mode: ${({ fill }) => fill || 'none'};
  animation-delay: ${({ delay }) => delay || '0s'};
`;

export default Animate;
