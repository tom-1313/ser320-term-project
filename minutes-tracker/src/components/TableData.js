import React from 'react'

//TODO: Display modal after click
function TableData(props) {
  return (
    <td onClick={() => console.log(props.entry)}>
     {props.entry.project + props.entry.homework + props.entry.study} 
    </td>
  )
}

export default TableData

