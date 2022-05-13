import React from "react"
import { Grid, Typography, Box } from "@material-ui/core"

import QuestionAnswer from "./components"

import "./styles.css"

/**
 * Component to answer common questions abuot company
 *
 * @example
 * return(
 *  <Questions/>
 * )
 */

const Questions = () => {
  const questans = [
    {
      key: 1,
      question:
        "What additional features or benefits does U-Impactify Learning provide?",
      answer: "Not sure but we are working on it",
    },
    {
      key: 2,
      question: "What happens at the end of my free trial?",
      answer: "After your free trial, you automatically will be charged for a \
      subscription on a monthly or annual basis (at your choice) unless you cancel.",
    },
    {
      key: 3,
      question: "How will you bill me?",
      answer: "We offer both monthly and annual billing. Depending on what option you choose, \
      your subscription will be renewed at the end of \each month or at the end of each year. \
      If you choose to pay annually, you’ll save up to 29% compared to paying monthly.",
    },
    {
      key: 4,
      question: "Can I change or cancel my plan later on?",
      answer: "Yes. You can downgrade or cancel anytime from your settings page. If you cancel, \
      you will lose your Premium features at the end of your billing cycle. Be sure you use all\
      your InMail messages before the cancellation goes into effect.",
    },
    {
      key: 5,
      question: "What is your refund policy?",
      answer: "U-Impactify does not offer refunds except in certain situations \
      and jurisdictions, as noted in our refund policy.",
    },
    {
      key: 6,
      question: "Can I expense my membership?",
      answer: "Many employers find U-Impactify so valuable that they’ll pay for their employees’ \
      subscriptions. At the end of your purchase, you’ll receive the receipt in your email that you can use to file an expense report.",
    },
  ]

  return (
    <Box pt={10}>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="option-grid"
        direction="column"
        m={20}
      >
        <Typography variant="h4">Frequently Asked Questions</Typography>

        <Box
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          align="center"
          px={50}
          pt={5}
        >
          {questans.map(profile => (
            <QuestionAnswer key={profile.key} data={profile} />
          ))}
        </Box>
      </Grid>
    </Box>
  )
}

export default Questions
