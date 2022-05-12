import React from "react";
import TableData from "./TableData";

function TableHeader(props) {
  return (
    <thead>
      <tr>
        {[...Array(props.lessons)].map((e, i) => {
          return (
            <TableData key={i} header={true} lesson={i + 1}>
              {i + 1}
            </TableData>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
