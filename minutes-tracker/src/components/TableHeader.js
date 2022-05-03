import React from "react";

function TableHeader(props) {
  return (
    <thead>
      <tr>
        {[...Array(props.lessons)].map((e, i) => {
          return <td key={i}>{i + 1}</td>;
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
