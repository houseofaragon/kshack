import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 4vw;
  position: relative;
  font-size: 12px;
`
const Logo = styled.div`
  height: 60px;
  width: 60px;
  margin-right: 1vw;
  cursor: pointer;
  background-image: url("/kshack-logo.jpg");
`

export function Header() {
  return (
    <div className="header">
      <Menu>
        <Link to="/"><Logo /></Link>
        <Link to="/artists">Artists</Link>
      </Menu>
    </div>
  )
}
