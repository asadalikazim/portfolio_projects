import React from "react"
import { Button, Typography } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"

const ButtonComponent = ({ message, variant, onClick }) => {
  const ColorButton = withStyles(() => ({
    root: {
      color: "#FFFFFF",
      backgroundColor: "#A78EC3",
      "&:hover": {
        backgroundColor: "#A78EC3",
      },
      variant: { variant },
      margin: "0.5rem",
      boxShadow: "0rem 0.5rem 1.5rem rgba(120, 98, 188, 0.16)",
      padding: "0.5rem",
      borderRadius: "0.5rem",
    },
  }))(Button)

  return (
    <ColorButton onClick={onClick}>
      <Typography variant="subtitle2">{message}</Typography>
    </ColorButton>
  )
}

export default ButtonComponent
