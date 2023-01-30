import React from "react"

export const VehicleDetails = (props) => {
    return (
        <div className='first-component-div'>
            {props.makeObjectState?.map((ele) =>
                <div className='sub-item-div'>
                    <div>{ele.make}</div>
                    <div>{ele.percentage}%</div>
                </div>
            )}
            <div>
            <h2 className="text-green">{props.uniqueModelItems}</h2>
<h4>unique values</h4>
            </div>
        </div>
    )
}