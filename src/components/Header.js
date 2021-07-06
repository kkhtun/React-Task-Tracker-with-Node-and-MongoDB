import React from 'react'

const Header = ({ toggleForm, showForm }) => {
    return (
        <div className="header">
            <h1>&#x269B; React Task Tracker</h1>
            <hr />
            <button className="btn btn-light btn-block" onClick={()=> toggleForm()}>{ showForm ? <span>&times; Close</span> : '+ Add Task'}</button>
        </div>
    )
}

export default Header
