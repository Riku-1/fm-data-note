import React, {useState} from "react"
import {TextareaAutosize} from "@mui/material";

export const TextInput = (props) => {

    const handleChange = (event) => {
        const colId = props.column.colId
        props.node.setDataValue(colId, event.target.value)
    }

    const [onEdit, setOnEdit] = useState<boolean>(false)

    const handleClick = (event) => {
        if (event.detail === 2) {
            setOnEdit(true)
        }
    }

    const getBreakLinedText = (text: string) => {
        return (
            text.split(/(\n)/g).map((t, i) => (t === '\n')?<br key={i}/>:t)
        )
    }

    return (
        <div>
            {
                onEdit
                    ? <TextareaAutosize
                        value={props.value}
                        onChange={handleChange}
                        onBlur={_ => {setOnEdit(false)}}
                        autoFocus={true}
                        maxRows="30"
                    />
                    : <div
                        className="new-line-text"
                        onClick={handleClick}>{getBreakLinedText(props.value) || "No Text" }
                    </div>
            }
        </div>
    )
}