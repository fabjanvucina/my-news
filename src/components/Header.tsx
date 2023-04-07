import { useState } from 'react'
import { handleKeyboardEvent, MenuIcon } from '../util'
import { Logo } from './Logo'
import { SearchBar } from './SearchBar'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false)

  function handleExpandMenu() {
    setIsMenuExpanded(true)
    document.body.style.overflow = 'hidden'
  }

  function handleCloseMenu() {
    setIsMenuExpanded(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <header>
      <div className="flex justify-between items-center">
        <Logo />
        <MenuIcon
          className="menu-icon tab-focus"
          tabIndex={0}
          onClick={handleExpandMenu}
          onKeyDown={(e) => handleKeyboardEvent(e, handleExpandMenu)}
        />
      </div>
      <SearchBar />
      <MobileMenu isExpanded={isMenuExpanded} onClose={handleCloseMenu} />
    </header>
  )
}
