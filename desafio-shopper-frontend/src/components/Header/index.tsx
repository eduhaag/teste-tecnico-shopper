import './styles.module.css'

import Logo from '../../assets/images/logo.png'

export function Header () {
  return (
    <header>
      <img src={Logo} alt="" />
    </header>
  )
}