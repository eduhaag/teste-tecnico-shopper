import { HeaderContainer } from './styles'

import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export function Header () {
  return (
    <HeaderContainer>
      <div>
        <Link to='/'>
          <img src={Logo} alt="Logo da Shopper.com.br" />
        </Link>
        <h2>Atualização de preços em massa</h2>
      </div>
    </HeaderContainer>
  )
}