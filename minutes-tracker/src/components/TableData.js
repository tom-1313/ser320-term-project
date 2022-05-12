import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function TableData(props) {
  return (
    <td className="td-highlight">
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit" className="text-center">
              {props.header ? (
                <strong>Lesson</strong>
              ) : (
                <strong>Details</strong>
              )}
            </Typography>

            {props.header ? (
              <p className="text-center">{props.lesson}</p>
            ) : (
              <table className="table text-center">
                <thead>
                  <tr>
                    <td>
                      <strong>Activity</strong>
                    </td>
                    <td>
                      <strong>Time (minutes)</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Study</td>
                    <td>{props.entry.study}</td>
                  </tr>
                  <tr>
                    <td>Homework</td>
                    <td>{props.entry.homework}</td>
                  </tr>
                  <tr>
                    <td>Project</td>
                    <td>{props.entry.project}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </React.Fragment>
        }
      >
        {props.header ? (
          <p>{props.lesson}</p>
        ) : (
          <p>
            {props.entry.project + props.entry.homework + props.entry.study}
          </p>
        )}
      </HtmlTooltip>
    </td>
  );
}

export default TableData;
