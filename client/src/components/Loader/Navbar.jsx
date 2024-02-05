import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const user = null;

    if (user) {
        return (
            <>
            </>
        )
    }
    else {
        return (
            <>
                <div className='navbar'>
                    <div className="logo">
                        <Link to="/">
                            <img src="https://s3-alpha.figma.com/hub/file/1913095808/a7bdc469-cd70-4ea1-bb57-b59204ad8182-cover.png" alt='logo' />
                        </Link>
                    </div>

                    <ul>
                        <li>
                            <Link to="/signin">
                                <button class="button">
                                    Sign in
                                    <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                                        <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Navbar