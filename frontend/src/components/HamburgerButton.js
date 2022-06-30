import React from 'react';

function HamburgerButton(props) {
    return (
        <div className='hamburger-btn' onClick={props.click}>
            &#9776; Open
        </div>
    );
}

export default HamburgerButton;