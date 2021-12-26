import React from "react";
import { withRouter } from "react-router";
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl }) => (
    <div className={`${size} menu-item`} onClick={()=>history.push(`${linkUrl}`)} >
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }}/>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <a className="subtitle">Shop Now</a>
        </div>
    </div>
)

export default withRouter(MenuItem) // by wrapping the menuItem with the withrouter, now we have access to the history