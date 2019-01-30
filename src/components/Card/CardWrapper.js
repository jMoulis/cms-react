import styled from '@emotion/styled';

const CardWrapper = styled.div`
  label: CardsWrapper;
  display: flex;
  ${({ styleOptions }) => {
    return { ...styleOptions };
  }}
`;

export default CardWrapper;
