import classNames from 'classnames'
import { ArticlesDisplayMode } from '../enums'
import { handleKeyboardEvent } from '../util'

type Props = {
  displayMode: ArticlesDisplayMode
  isActive: boolean
  onClick: () => void
}

export function ArticlesDisplayModeButton(props: Props) {
  return (
    <button
      className={classNames('tab-focus', {
        active: props.isActive,
      })}
      tabIndex={0}
      onClick={props.onClick}
      onKeyDown={(e) => handleKeyboardEvent(e, props.onClick)}
    >
      {props.displayMode}
    </button>
  )
}
