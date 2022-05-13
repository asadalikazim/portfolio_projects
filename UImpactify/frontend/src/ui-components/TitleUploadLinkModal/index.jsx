import { Grid, Typography, TextField, Modal } from "@material-ui/core"
import React, { useState } from "react"
import PublishIcon from "@material-ui/icons/Publish"
import "./styles.css"
import SubmissionCalls from "../../axios/SubmissionCalls";

const TotalUploadLinkModal = ({ title, aId, sId }) => {
    const [link, setLink] = useState("");

    const handleUpload = async () => {
        try {
            console.log(sId, aId, link);
            if (link === "") {
                alert("Submission was empty!");
                return;
            }
            const response = await SubmissionCalls.addSubmission(sId, aId, link);
            if (response.status=== 200) alert("Submission successful");
            else if (response.status === 201) alert("Submission updated!");
            else if (response.status === 400) alert("Submission missing!")
        } catch (err) {
            if (err.response.status == 409) alert("Submission already submitted!");
        }
    }
  return (
    <Grid container className="component-title-upload-modal">
      <Grid container item style={{ margin: "0.25rem" }}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid container item style={{ margin: "0.25rem" }}>
        <TextField variant="outlined" style={{ width: "25rem" }} onInput={ e=>setLink(e.target.value)}>
          {title}
        </TextField>
        <button
          type="button"
          className="component-title-upload-submit-button"
          onClick={() => handleUpload()}
        >
          <PublishIcon size="medium" />
        </button>
      </Grid>
    </Grid>
  )
}

export default TotalUploadLinkModal
