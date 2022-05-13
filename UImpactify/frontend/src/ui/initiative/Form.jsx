import React, {useState, useContext, useEffect} from "react"
import { Paper, Grid, TextField,Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import Button from "../../ui-components/home/ButtonComponent/index"
import Auth from "../../services/authorization/sign-in";
import OrgCalls from "../../axios/OrgCalls";
import {navigate} from "gatsby";

const useStyles = makeStyles(() => ({
  textField: {
    width: "95%",
    margin: 8,
  },
  SubmitBtn: {
    backgroundColor: "#ccccff",
    position: "center",
    marginLeft: "42.5%",
    textColor: "white",
  },
  checkBox: {
    color: "black",
  },
}))

const Form = () => {
  const [orgName, setOrgName] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNum, setPhoneNum] = useState(-1);
  const [rating, setRating] = useState(0);
  const [user, setUser] = React.useState(null);
  useEffect(   () => {
    const fetchData = async () => {
      try {
        const response = await Auth.getAuthUser((user) => setUser(user));
        if (response.status === 200) setUser(response.data);
      } catch (err){
        console.log(err);
        setUser(null);
      }
    };
    fetchData();
  }, []);

  const style = useStyles();

  const handleSubmit = async (event) => {
    /**axios controller submit to backend */

    const finalObject = {
      name: orgName,
      about,
      website,
      rating,
      phoneNum,
      address,
      ownerId: user.id
    };
    console.log(finalObject);
    await OrgCalls.addOrg(finalObject);
    alert("Your organization has been made!")
    navigate('/dashboard');
    event.preventDefault();
  }

  return (
    <Container className={style.root}>
      <Paper variant="elevation" elevation={2}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="orgName"
              className={style.textField}
              label="Organisation Name"
              placeholder="Red Cross Society"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setOrgName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="about"
              label="About the Organisation"
              className={style.textField}
              style={{ margin: 8 }}
              placeholder={
                "This company is about providing relief care for anybody around the world"
              }
              helperText="Enter a small description about the type of work your organisation does"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setAbout(e.target.value)}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="website"
              className={style.textField}
              label="Website"
              placeholder="www.redcross.org"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setWebsite(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address"
              className={style.textField}
              label="Address"
              placeholder="12 Bradford Avenue,Pittsburgh,New York"
              helperText="Enter the address of HQ of the organisation"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="phoneNum"
              className={style.textField}
              label="Contact Number"
              placeholder="9866540876"
              helperText="Enter a contact number for the organisation"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setPhoneNum(parseInt(e.target.value, 10))}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="rating"
              className={style.textField}
              label="Rating"
              placeholder="4"
              helperText="Enter a rating for your organisation"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={e => setRating(e.target.value)}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Button
              startIcon={AddIcon}
              onClick={handleSubmit}
              message={"Create Organisation"}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Form
