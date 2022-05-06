import React from "react";

function TableData(props) {
  return (
    <td onClick={() => props.openModal(props.entry)}>
      {props.entry.project + props.entry.homework + props.entry.study}
    </td>
  );
}

export default TableData;
