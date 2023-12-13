import { ListItemButton, ListItemText } from '@mui/material'
import React from 'react'

function Todo(props) {
  return (
    <div>
      <center>
        <ListItemButton component="a" href="#simple-list">
          <ListItemText primary={props.text} />
        </ListItemButton>
      </center>

    </div>
  )
}

export default Todo
