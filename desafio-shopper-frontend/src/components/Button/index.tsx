import {ButtonContainer} from './styles'

interface IButtonProps {
  children: React.ReactNode,
  type: 'submit' | 'button',
  level?: 'primary' | 'secondary',
  disabled?: boolean,
  onClick?: () => void
}

export function Button({
  children, 
  type, 
  onClick, 
  disabled,
  level = 'primary'
}: IButtonProps) {
  return (
    <ButtonContainer 
      className={level=== 'primary' ? 'primary-button': 'secondary-button'}
      type={type} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children} 
    </ButtonContainer>
  )
}