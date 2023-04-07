import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'text'
  className?: string
  submit?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function Button(props: Props) {
  return (
    <button
      className={classNames('button tab-focus', props.variant, props.className)}
      type={props.submit ? 'submit' : 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
