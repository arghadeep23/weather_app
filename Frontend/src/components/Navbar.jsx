import "../styles/Navbar.scss";
import { useState } from 'react';
export default function Navbar({ handleChange, handleSubmit, location }) {
    return (
        <>
            <header>
                <div className="left">
                    <h2>WeatherMan</h2>
                </div>
                <div className="right">
                    <form action="" onSubmit={(event) => handleSubmit(event)}>
                        <input type="text" placeholder="Kudasan,Gujarat" value={location} onChange={(event) => handleChange(event)} />
                        <button type="submit">Go</button>
                    </form>
                </div>
            </header>
        </>
    )

}