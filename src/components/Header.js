import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  top: 4vw;
  position: relative;
`
const Logo = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 1vw;
  cursor: pointer;
  background-image: url("/kshack-logo.jpg");
`
const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 1vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #252525;
    margin-bottom: 6px;
  }
`

export function Header() {
  return (
    <>
      <Menu>
        <Link to="/"><Logo /></Link>
        <Link to="/artists">Artists</Link>
        <Hamburger>
          <div />
          <div />
          <div />
        </Hamburger>
      </Menu>
    </>
  )
}
