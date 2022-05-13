import React from "react"
import {
  Grid,
  Typography,
  Box,
  GridSpacing,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

/**
 * Component to list each commonly asked questions and answers
 *
 * @param {Object} props
 * @param {Object} props.data Question data
 *
 * @example
 * return(
 *  <QuestionAnswer
 *   data={}
 *  />
 * )
 */

const QuestionAnswer = ({ data }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={data.key}>{data.question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{data.answer}</Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default QuestionAnswer
