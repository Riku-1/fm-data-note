import React from "react"

export const AgGridCheckBox = (props) => {

    const checkHandler = (event) => {
        const checked = event.target.checked
        const colId = props.column.colId
        props.node.setDataValue(colId, checked)
    }

    return (
        <input type="checkbox" checked={props.value} onClick={event => {checkHandler(event)}}/>
    )
}