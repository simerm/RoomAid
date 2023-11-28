import React from 'react'
import "./NavBar.css"


const NavBar = () => {
  return (
    <div className = "nav">
        <div className = "format">
            <img alt="logo" className="logo" src={`/icon.png`} />
            <a className = "link" href="/">Task List</a>
            <a className = "link" href="/grocery">Grocery</a>
            <a className = "link" href="/calendar">Calendar</a>
        </div>
    </div>
  )
}

export default NavBar