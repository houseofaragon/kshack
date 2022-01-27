import styled from 'styled-components'
import { Link } from 'react-router-dom'

const TopLeft = styled.div`
  position: absolute;
  top: 6vw;
  left: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  display: flex;
  flex-direction: row;
`
const Logo = styled.div`
    height: 60px;
    width: 60px;
    margin-right: 1vw;
    background-image: url("/kshack-logo.jpg");
`

const Menu = styled.div`
    display: flex;
    flex-direction: row;
`
const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', sans-serif;
  font-size: 12px;
  line-height: 0.9em;
`

const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`

const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-family: 'Inter, sans-serif';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`

const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '0px' : '50%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`

const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 6vw;
  right: 6vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #252525;
    margin-bottom: 6px;
  }
`

export function Home() {
  return (
    <>
      <TopLeft>
        {/* <i>K</i>
        <br />
        Shack */}
        <Logo />
        <Menu>
            <Link to="/artists">Artists</Link>
        </Menu>
      </TopLeft>
      <BottomLeft>
        <Link to="/artists">Soundcloud</Link>
      </BottomLeft>
      <BottomRight>
        Art by Hatnim Lee
      </BottomRight>
      <LeftMiddle>An excellent shack.</LeftMiddle>
      <Bar />
      <Bar vertical />
    </>
  )
}
