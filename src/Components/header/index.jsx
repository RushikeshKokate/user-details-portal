import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Button } from '@mui/material';
import './header.css';
import { auth } from '../../firebase';

const Header = (props) => {
    const navigate = useNavigate();
    const [themeMode, setThemeMode] = useState('light');

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const handleLogout = () => {
        auth.signOut();
        navigate("/UserForm")
    };

    return (
        <div className='nav'>
            <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
                <CssBaseline />
                <div className='navbar'>
                    <Button
                        className='dark-mode-btn'
                        variant="contained"
                        onClick={toggleTheme}
                        sx={{
                            backgroundColor: themeMode === 'light' ? '#32bfe6' : '#32bfe6',
                            margin: '10px'
                        }}
                    >
                        <img src="./night-mode.png" height={24} width={24} alt="" />
                    </Button>
                    {props.name ? (
                        <>
                            <Link className='nav-link' onClick={handleLogout}>Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className='nav-link' to='/userForm'>Home</Link>
                            <Link className='nav-link' to='/Login'>Login</Link>
                            <Link className='nav-link' to='/Signup'>Sign Up</Link>
                        </>
                    )}
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Header;
