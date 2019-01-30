import React from 'react';
import styled from '@emotion/styled';
import image from 'assets/image/no_hotlinking.png';

const Root = styled.div`
  label: Card;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  ${({ styleOptions }) => {
    return { ...styleOptions };
  }}
`;

const Header = styled.header`
  label: CardHeader;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  label: CardImage;
  width: 150px;
  height: auto;
`;

const Card = ({ title, content, href, children, styleOptions }) => {
  return (
    <Root styleOptions={styleOptions}>
      <Header>
        <h3>{title || 'Title'}</h3>
        {href && <Image src={href || image} alt="test" />}
      </Header>
      <div>{children || content}</div>
      <footer>Card Footer</footer>
    </Root>
  );
};
export default Card;
