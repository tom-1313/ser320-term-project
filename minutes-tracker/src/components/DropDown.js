import React, { useState, useEffect } from 'react'
import Select from "@mui/material/Select";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import { getNotEnrolled, getAllCourses } from '../services/userService';


function DropDown(props) {
    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    function getStyles(course, selectedCourses, theme) {
    return {
        fontWeight:
        selectedCourses.indexOf(course) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
    };
    }
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (props.userId === undefined) {
        getAllCourses().then((res) => {
          const data = res.data;
          setCourses(data);
        })

    } else {
        getNotEnrolled(props.userId).then((res) => {
          const data = res.data;
          setCourses(data);
        })

    }
      });

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Courses</InputLabel>
              <Select id="courseSelect"
                  labelId="course-select"
                  multiple
                  name="courses"
                  value={props.selectedCourse}
                  input={<OutlinedInput
                  label="course" />}
                  onChange={props.handleSelect}
                  MenuProps={MenuProps}
                  >
                  {courses.map((course, index) => {
                      return (
                      <MenuItem key={index} value={course._id} style={getStyles(course.name, props.selectedCourse, theme)} name="courses">
                          {course.name}
                      </MenuItem>
                      );
                  })}
              </Select>
        </FormControl>
    )
}

export default DropDown
