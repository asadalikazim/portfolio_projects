import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
} from "@material-ui/core"
import Button from "../../ui-components/home/ButtonComponent/index"
import Rating from "@material-ui/lab/Rating"
import { navigate } from "gatsby"

const useStyles = makeStyles({
  root: {
    minWidth: 290,
    borderColor: "#A78EC3",
    borderRadius: "0.3cm",
  },
  title: {
    fontSize: 35,
    fontFamily: "Roboto,Helvica,Times New Roman",
    color: "#4d4e6b",
    fontWeight: "bold",
  },
  pos: {
    marginBottom: "35%",
    marginLeft: "65%",
    marginTop: "-2%",
  },
  content: {
    padding: "3.5%",
  },
  description: {
    fontSize: 23,
    color: "#4d484c",
    fontFamily: "Roboto,Arial",
  },
  volunteerIcon: {
    fill: "green",
    marginTop: "2.5%",
    marginLeft: "-18%",
    height: "40px",
    width: "40px",
  },
  volunteer: {
    padding: "2.5px",
    paddingBottom: "-2.5%",
  },
  volunteerText: {
    padding: "10px",
    fontFamily: "Roboto,Times New Roman",
    fontSize: "26px",
  },
  descriptionHeading: {
    fontFamily: "Roboto,Times New Roman",
    fontWeight: "bold",
    fontSize: "25px",
  },
})

export default function Class(props) {
  const style = useStyles()
  const { organization } = props
  const [rating, setRating] = useState(organization.rating)

  const handleLearnMore = () => {
    console.log(organization);
    navigate(`/app/orgs/${organization._id}`);
  }

  return (
    <Card className={style.root} elevation={3} variant="outlined">
      <CardContent className={style.content}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={7}>
                <Typography className={style.title}>
                  {organization.name}
                </Typography>
                <Rating
                  name="orgRating"
                  value={rating}
                  defaultValue={5}
                  precision={0.25}
                  onChange={(event, newValue) => {
                    const newRating = (newValue + organization.rating) / 2
                    setRating(newRating)
                    organization.rating = newRating
                    console.log(newRating)
                  }}
                  size="large"
                />
              </Grid>
              <Grid item xs={5}>
                <CardMedia
                  component="img"
                  image={organization.imgUrl}
                  title={organization.name}
                />
              </Grid>
            </Grid>

            <Card elevation={0}>
              <CardContent>
                <Typography className={style.descriptionHeading}>
                  Description
                </Typography>
                <Typography className={style.description} variant="body1">
                  {organization.about}
                </Typography>
                <Typography className={style.descriptionHeading}>
                  Website
                </Typography>
                <Typography className={style.description} variant="body1">
                  <Link
                    href={"https://" + organization.website}
                    target="_blank"
                    rel="noopener"
                    underline="hover"
                  >
                    {organization.website}
                  </Link>
                </Typography>
                <Typography className={style.descriptionHeading}>
                  Contact number
                </Typography>
                <Typography className={style.description} variant="body1">
                  {organization.phoneNum}
                </Typography>
                <Typography className={style.descriptionHeading}>
                  Address
                </Typography>
                <Typography className={style.description} variant="body1">
                  {organization.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={style.pos}>
        <Button message={"Learn More"} onClick={handleLearnMore}></Button>
      </CardActions>
    </Card>
  )
}
