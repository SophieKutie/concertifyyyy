import React from "react"

function Show(props)  {
    return (
        <div className="show">
            <img src={props.imgUrl}/>
        </div>
    )
}

export default Show