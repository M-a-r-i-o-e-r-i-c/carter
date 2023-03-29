import {Wrapper} from './Header.styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {NavLink} from 'react-router-dom'

const Header: React.FC<{}> =()=> {
    return(
        <Wrapper>
        <header>
            <NavLink to="/">
                <p>CAR</p><AddShoppingCartIcon/><p>ER</p>
            </NavLink>
            {/* <input type="text" placeholder="search for a product"/> */}
        </header>

        </Wrapper>
    )
}

export default Header;