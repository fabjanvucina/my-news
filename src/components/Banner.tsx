import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from './Button'

export function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  const navigate = useNavigate()

  // there is no universal support for this due to security reasons, and it's generally frowned upon
  // the recommended way is to navigate to a page with the instructions on how to set the homepage manually
  function handleSetAsHomepage(): void {
    navigate('/set-as-homepage') //TODO: implement this page when we have the design
  }

  return (
    <div
      className={classNames('banner', {
        visible: isVisible,
      })}
    >
      <div className="banner-content">
        <div className="banner-content__title">Make MyNews your homepage</div>
        <div className="banner-content__subtitle">
          Every day discover what’s trending on the internet!
        </div>
        <div className="banner-content__actions">
          <Button variant="secondary" onClick={handleSetAsHomepage}>
            Get
          </Button>
          <Button variant="text" onClick={() => setIsVisible(false)}>
            No, thanks
          </Button>
        </div>
      </div>
    </div>
  )
}
