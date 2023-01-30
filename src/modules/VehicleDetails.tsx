export const VehicleDetails = (props) => {
    return (
        <div className='first-component-div'>
            {props.makeObjectState?.map((ele) =>
                <div className='sub-item-div'>
                    <div>{ele.make}</div>
                    <div>{ele.percentage}%</div>
                </div>
            )}
        </div>
    )
}