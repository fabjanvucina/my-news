import classNames from 'classnames'
import { CloseIcon, handleKeyboardEvent } from '../util'
import { Logo } from './Logo'
import { Navigation } from './Navigation'
import { SearchBar } from './SearchBar'

type Props = {
  isExpanded: boolean
  onClose: () => void
}

export function MobileMenu(props: Props) {
  return (
    <div
      className={classNames('mobile-menu', {
        expanded: props.isExpanded,
      })}
    >
      <div className="flex justify-end">
        <CloseIcon
          className="close-icon tab-focus"
          tabIndex={0}
          onClick={props.onClose}
          onKeyDown={(e) => handleKeyboardEvent(e, props.onClose)}
        />
      </div>
      <Logo />
      <SearchBar onSubmit={props.onClose} />
      <Navigation onClickItem={props.onClose} />
    </div>
  )
}
