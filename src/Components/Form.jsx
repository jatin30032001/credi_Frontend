import React, { useState, useRef } from "react";
import styles from "./Form.module.scss";
import { Fab, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { MuiTelInput } from "mui-tel-input";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";

const Form = () => {
  const [UEN, setUEN] = useState("-1");
  const [CName, setCName] = useState("-1");
  const [Name, setName] = useState("-1");
  const [Position, setPosition] = useState("-1");
  const [Email, setEmail] = useState("-1");
  const [ReEmail, setReEmail] = useState("-1");
  const [Mobile, setMobile] = useState("+65");
  const [File, setFile] = useState("-1");
  const [checked, setChecked] = useState(false);

  const [validation, setValidation] = useState({
    UEN: false,
    CName: false,
    Name: false,
    Position: false,
    Email: false,
    ReEmail: false,
    Mobile: false,
    File: false,
    tnc: false,
  });
  const fileInputRef = useRef(null);
  function hasValidFormat(inputString) {
    const pattern = /^\d{8}[A-Z]/;
    return pattern.test(inputString);
  }

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setValidation((prev) => ({
        ...prev,
        File: true,
      }));
    }
  };
  const handleChange = (event) => {
    console.log(event);

    setChecked(event.target.checked);
    setValidation((prev) => ({
      ...prev,
      tnc: event.target.checked,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.set("uen",UEN);
    formData.set("cname",CName);
    formData.set("name",Name);
    formData.set("position",Position);
    formData.set("email",Email);
    formData.set("mobile",Mobile);
    formData.set("files",File);
    const config={headers:{"Content-Type":"multipart/form-data"}};
    try{
    const response = await axios.post(`https://credi-backend-fqtk-6h456mqk3-jrsaini2090-gmailcom.vercel.app/add`,formData,config);
    window.location.href ="http://localhost:3000/table";
    console.log(response);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.form_main}>
        <div className={styles.box1}>
          <div className={styles.box1_top}>
            {console.log(validation)}
            <div
              className={`${
                validation.UEN && validation.CName ? styles.green : styles.red
              } ${styles.box1_top_dot}`}
            >
              {validation.UEN && validation.CName ? <DoneIcon /> : <p>1</p>}
            </div>
            <div className={styles.box1_top_heading}>Company Information</div>
          </div>
          <div className={styles.box1_bottom}>
            <div className={styles.box1_bottom_line}></div>
            <div className={styles.box1_bottom_form}>
              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  className={styles.box1_bottom_form_input}
                  color={
                    UEN !== "" && hasValidFormat(UEN)
                      ? ""
                      : UEN === "-1"
                      ? ""
                      : "error"
                  }
                  onChange={(e) => {
                    setUEN(e.target.value);
                    if (hasValidFormat(e.target.value)) {
                      console.log("in");
                      setValidation((prev) => ({
                        ...prev,
                        UEN: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        UEN: false,
                      }));
                    }
                  }}
                  placeholder="Enter your company UEN"
                  id="outlined-basic"
                  label="Company UEN"
                  variant="outlined"
                />
                <p>
                  {UEN === "-1"
                    ? ""
                    : UEN === ""
                    ? "UEN Required"
                    : !hasValidFormat(UEN)
                    ? "Invalid UEN"
                    : ""}
                </p>
              </div>
              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  className={styles.box1_bottom_form_input}
                  color={CName.length < 2 ? "error" : ""}
                  onChange={(e) => {
                    setCName(e.target.value);
                    if (e.target.value.length > 2) {
                      setValidation((prev) => ({
                        ...prev,
                        CName: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        CName: false,
                      }));
                    }
                  }}
                  placeholder="Enter your company Name"
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                />
                <p>
                  {CName === "-1"
                    ? ""
                    : CName === ""
                    ? "Company Name Required"
                    : CName.length < 2
                    ? "Minimum 2 characters required"
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box1}>
          <div className={styles.box1_top}>
            {console.log(validation)}
            <div
              className={`${
                validation.UEN && validation.CName
                  ? validation.Name &&
                    validation.Position &&
                    validation.Email &&
                    validation.ReEmail &&
                    validation.Mobile
                    ? styles.green
                    : styles.red
                  : styles.gray
              } ${styles.box1_top_dot}`}
            >
              {validation.Name &&
              validation.Position &&
              validation.Email &&
              validation.ReEmail &&
              validation.Mobile ? (
                <DoneIcon />
              ) : (
                <p>2</p>
              )}
            </div>
            <div className={styles.box1_top_heading}>Applicant Information</div>
          </div>
          <div className={styles.box1_bottom}>
            <div className={styles.box1_bottom_line}></div>
            <div className={styles.box1_bottom_form}>
              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  className={styles.box1_bottom_form_input}
                  disabled={!(validation.UEN && validation.CName)}
                  color={Name !== "" ? "" : Name === "-1" ? "" : "error"}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value) {
                      setValidation((prev) => ({
                        ...prev,
                        Name: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        Name: false,
                      }));
                    }
                  }}
                  placeholder="Full Name"
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                />
                <p>
                  {Name === "-1" ? "" : Name === "" ? "Name is Required" : ""}
                </p>
              </div>
              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  disabled={!(validation.UEN && validation.CName)}
                  className={styles.box1_bottom_form_input}
                  color={
                    Position !== "" ? "" : Position === "-1" ? "" : "error"
                  }
                  onChange={(e) => {
                    setPosition(e.target.value);
                    if (e.target.value) {
                      setValidation((prev) => ({
                        ...prev,
                        Position: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        Position: false,
                      }));
                    }
                  }}
                  placeholder="Position within Company"
                  id="outlined-basic"
                  label="Position within Company"
                  variant="outlined"
                />
                <p>
                  {Position === "-1"
                    ? ""
                    : Position !== ""
                    ? ""
                    : "Position is Required"}
                </p>
              </div>

              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  disabled={!(validation.UEN && validation.CName)}
                  className={styles.box1_bottom_form_input}
                  color={
                    Email !== "" && isValidEmail(Email)
                      ? ""
                      : Email === "-1"
                      ? ""
                      : "error"
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isValidEmail(e.target.value)) {
                      setValidation((prev) => ({
                        ...prev,
                        Email: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        Email: false,
                      }));
                    }
                  }}
                  placeholder="Email Address"
                  id="outlined-basic"
                  label="Email Address"
                  variant="outlined"
                />
                <p style={{ marginBottom: "3px" }}>
                  {Email === "-1"
                    ? ""
                    : Email === ""
                    ? "Email is Required"
                    : !isValidEmail(Email)
                    ? "Invalid Email"
                    : ""}
                </p>
                <p
                  style={{
                    color: "rgb(96, 26, 121)",
                    marginTop: "0px",
                    marginBottom: "20px",
                  }}
                >
                  The report will be delivered on this email address
                </p>
              </div>

              <div className={styles.box1_bottom_form_validity}>
                <TextField
                  disabled={!(validation.UEN && validation.CName)}
                  className={styles.box1_bottom_form_input}
                  color={
                    ReEmail !== "" && isValidEmail(ReEmail)
                      ? ""
                      : ReEmail === "-1"
                      ? ""
                      : "error"
                  }
                  onChange={(e) => {
                    setReEmail(e.target.value);
                    if (
                      isValidEmail(e.target.value) &&
                      e.target.value === Email
                    ) {
                      setValidation((prev) => ({
                        ...prev,
                        ReEmail: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        ReEmail: false,
                      }));
                    }
                  }}
                  placeholder="Re-enter Email Address"
                  id="outlined-basic"
                  label="Re-enter Email Address"
                  variant="outlined"
                />
                <p>
                  {ReEmail === "-1"
                    ? ""
                    : ReEmail === ""
                    ? "Email is Required"
                    : ReEmail !== Email
                    ? " Email does not match"
                    : ""}
                </p>
              </div>

              <div className={styles.box1_bottom_form_validity}>
                <MuiTelInput
                  disabled={!(validation.UEN && validation.CName)}
                  className={styles.box1_bottom_form_input}
                  defaultCountry="si"
                  color={Mobile !== "" ? "" : Mobile === "-1" ? "" : "error"}
                  onChange={(e) => {
                    setMobile(e);
                    if (e) {
                      setValidation((prev) => ({
                        ...prev,
                        Mobile: true,
                      }));
                    } else {
                      setValidation((prev) => ({
                        ...prev,
                        Mobile: false,
                      }));
                    }
                  }}
                  label="Mobile No"
                  value={Mobile}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box1}>
          <div className={styles.box1_top}>
            {console.log(validation)}
            <div
              className={`${
                validation.Name &&
                validation.Position &&
                validation.Email &&
                validation.ReEmail &&
                validation.Mobile
                  ? validation.File
                    ? styles.green
                    : styles.red
                  : styles.gray
              } ${styles.box1_top_dot}`}
            >
              {validation.Name &&
              validation.Position &&
              validation.Email &&
              validation.ReEmail &&
              validation.Mobile &&
              validation.File ? (
                <DoneIcon />
              ) : (
                <p>3</p>
              )}
            </div>
            <div className={styles.box1_top_heading}>Upload Documents</div>
          </div>

          <div className={styles.box1_bottom}>
            <div className={styles.box1_bottom_line}></div>
            <div className={styles.box1_bottom_form}>
              <div className={styles.box1_bottom_form_Upload}>
                {!(
                  validation.Name &&
                  validation.Position &&
                  validation.Email &&
                  validation.ReEmail &&
                  validation.Mobile
                ) ? (
                  <div className={styles.mask1}></div>
                ) : null}
                <div
                  className={styles.box1_bottom_form_Upload_File}
                  onClick={handleImageClick}
                >
                  <input
                    accept="application/pdf"
                    multiple=""
                    type="file"
                    tabindex="-1"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <div className={styles.box1_bottom_form_Upload_File_1}>
                    <div>
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-style-lhdu5k"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="UploadFileIcon"
                    >
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11z"></path>
                    </svg>
                    </div>
                  </div>

                  <div className={styles.box1_bottom_form_Upload_File_2}>
                    <span style={{"borderBottom":"2px solid rgb(0, 0, 84)"}}>Click to upload</span> or drag and drop Bank Statements
                  </div>
                </div>
              </div>
              <div className={styles.box1_bottom_form_Info}>
                <div>
                  <DoneIcon />
                  <p>
                    PDFs (not scanned copies) of company's operating bank
                    current account(s) statements for the past 6 months.
                    Example: If today is 28 Oct 23, then please upload bank
                    statements from Apr 23 to Sep 23 (both months inclusive)
                  </p>
                </div>
                <div>
                  <DoneIcon />
                  <p>
                    If your company is multi-banked, then please upload 6 months
                    bank statements for each bank account
                  </p>
                </div>
                <div>
                  <DoneIcon />
                  <p>
                    If your file is password protected, we request you to remove
                    the password and upload the file to avoid submission failure
                  </p>
                </div>
                <div>
                  <DoneIcon />
                  <p>
                    In case if you are facing any issue while uploading bank
                    statements, Please contact us on <a href="mailto:support@credilinq.ai">support@credilinq.ai</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.box1}>
          <div className={styles.box1_top}>
            {console.log(validation)}
            <div
              className={`${
                validation.File
                  ? validation.tnc
                    ? styles.green
                    : styles.red
                  : styles.gray
              } ${styles.box1_top_dot}`}
            >
              {validation.tnc ? <DoneIcon /> : <p>4</p>}
            </div>
            <div className={styles.box1_top_heading}>Terms & Conditions</div>
          </div>
          <div className={styles.box1_under}>
            <div className={styles.box1_under_checkbox}>
              <Checkbox
                disabled={
                  !(
                    validation.UEN &&
                    validation.CName &&
                    validation.Name &&
                    validation.Position &&
                    validation.Email &&
                    validation.ReEmail &&
                    validation.Mobile &&
                    validation.File
                  )
                }
                onChange={handleChange}
              />
              <p>
                By ticking, you are confirming that you have understood and are
                agreeing to the details mentioned:
              </p>
            </div>
            <div className={styles.box1_under_condition}>
              <div>
                <DoneIcon />
                <p>
                  I confirm that I am the authorized person to upload bank
                  statements on behalf of my company
                </p>
              </div>
              <div>
                <DoneIcon />
                <p>
                  I assure you that uploaded bank statements and provided
                  company information match and are of the same company, if
                  there is a mismatch then my report will not be generated
                </p>
              </div>
              <div>
                <DoneIcon />
                <p>
                  I understand that this is a general report based on the bank
                  statements and Credilinq is not providing a solution or
                  guiding me for my business growth
                </p>
              </div>
              <div>
                <DoneIcon />
                <p>I have read and understand the <a href="https://smehealthcheck.credilinq.ai/terms-and-conditions">Terms & Conditions</a></p>
              </div>
              <div className={styles.box1_under_condition_submit}>
                <Button
                  variant="contained"
                  disabled={
                    !(
                      validation.UEN &&
                      validation.CName &&
                      validation.Name &&
                      validation.Position &&
                      validation.Email &&
                      validation.ReEmail &&
                      validation.Mobile &&
                      validation.File &&
                      validation.tnc
                    )
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
