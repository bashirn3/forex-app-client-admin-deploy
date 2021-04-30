import React from 'react'
import './SideBarOption.css';


function SideBarOption({ active, text, Icon }) {
    return (
        <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
            <div className='icon-container'>
                <Icon size='1.3em' />
            </div>
            <h3>{text}</h3>
        </div>
    )
}

export default SideBarOption;