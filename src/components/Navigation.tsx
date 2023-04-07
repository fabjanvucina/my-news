import {
  BookmarkOutlineIcon,
  BusinessIcon,
  HealthIcon,
  HomeIcon,
  ScienceIcon,
  SportsIcon,
  TechIcon,
} from '../util'
import { NavigationItem } from './NavigationItem'

type Props = {
  onClickItem?: () => void
}

export function Navigation(props: Props) {
  return (
    <nav>
      <NavigationItem
        to="/"
        item="Home"
        icon={<HomeIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/business"
        item="Business"
        icon={<BusinessIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/health"
        item="Health"
        icon={<HealthIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/science"
        item="Science"
        icon={<ScienceIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/sports"
        item="Sports"
        icon={<SportsIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/technology"
        item="Technology"
        icon={<TechIcon />}
        onClick={props.onClickItem}
      />
      <NavigationItem
        to="/favorites"
        item="Favorites"
        icon={<BookmarkOutlineIcon />}
        onClick={props.onClickItem}
      />
    </nav>
  )
}
