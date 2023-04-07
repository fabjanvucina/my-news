import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

type Props = {
  to: string
  item: string
  icon: React.ReactElement
  onClick?: () => void
}

export function NavigationItem(props: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames('navigation-item', {
          active: isActive,
        })
      }
      to={props.to}
      end={true}
      onClick={props.onClick}
    >
      {props.icon}
      {props.item}
    </NavLink>
  )
}
