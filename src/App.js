import React, { useState } from 'react';

import './App.css';

function App() {
  const [state, setState] = useState({
    buffetName: '',
    bookedOn: '',
    emailId: '',
    plateCount: ''
  });
  const [formErrors, setFormErrors] = useState({
    buffetNameError: '',
    emailIdError: '',
    plateCountError: '',
    bookedOnError: ''
  });
  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [Messages] = useState({
    "EMAILID_ERROR": "PLEASE ENTER VALID EMAIL",
    'PLATE_COUNT_ERROR': 'PLATE COUNT SHOULD BE ONE OR MORE',
    'BUFFET_NAME_ERROR': 'PLEASE SELECT BUFFET TYPE',
    'BOOKED_ON_ERROR': 'BOOKING DATE SHOULD BE AFTRE TODAYS DATE',
    'ERROR': 'SOMETHING WENT WRONG',
    'MANDATORY': 'ENTER ALL THE FORM FIELDS'
  });

  

  const handelChange = (event) => {
    let attrName = event.target.name;
    let attValue = event.target.value
    if (attrName === 'buffetName') {
      setState({
        ...state,
        buffetName: attValue
      })
    } else if (attrName === 'emailId') {
      setState({
        ...state,
        emailId: attValue
      })
    } else if (attrName === 'plateCount') {
      setState({
        ...state,
        plateCount: attValue
      })
    } else if (attrName === 'bookedOn') {
      setState({
        ...state,
        bookedOn: attValue
      })
    }
  };

  const validateField = () => {
    const date = new Date()
    if (state.buffetName.length===0 && state.emailId.trim().length===0 && state.plateCount.trim().length<=0 ) {
      setMandatory(true)
    } else   if (state.buffetName.trim().length === 0) {
      setFormErrors({
        ...formErrors,
        buffetNameError: Messages.BUFFET_NAME_ERROR
      })
      }
      else if (state.emailId.trim().length === 0) {
      setFormErrors({
        ...formErrors,
        emailIdError: Messages.EMAILID_ERROR
      })
      }  else if (state.plateCount <= 0) {
      setFormErrors({
        ...formErrors,
        plateCountError: Messages.PLATE_COUNT_ERROR
      })
    } else if (new Date(state.bookedOn).getTime() <= date.getTime() || state.bookedOn.length === 0) {
      setFormErrors({
        ...formErrors,
        bookedOnError: Messages.BOOKED_ON_ERROR
      })
    } else {
      setFormErrors({
        ...formErrors,
        buffetNameError: '',
        emailIdError: '',
        bookedOnError: '',
        plateCountError:''
      })
      setMandatory(false)
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    validateField()
    const formData = {
      buffetName:state.buffetName,
      emailId:state.emailId,
      plateCount:state.plateCount,
      bookedOn:state.bookedOn
    }
    console.log(formData)
    //do api call here
  };

  return (
    <div className="App">
      <h1>Form</h1>
      <form onSubmit={handelSubmit}>
        <lable>BuffetName: </lable>
        <select name='buffetName' onChange={handelChange} value={state.buffetName}>
          <option value=''>select</option>
          <option value='chicken'>chicken</option>
          <option value='fish'>fish</option>
          <option value='veg'>veg</option>
        </select>
        <span>{formErrors.buffetNameError}</span>
        <br></br>

        <lable>email id:    </lable>
        <input type='email' name='emailId' onChange={handelChange} value={state.emailId} />
        <span>{formErrors.emailIdError}</span>
        <br></br>

        <lable>plate Count: </lable>
        <input type='number' name='plateCount' onChange={handelChange} value={state.plateCount} />
        <span>{formErrors.plateCountError}</span>
        <br></br>

        <lable>booking Date: </lable>
        <input type='date' name='bookedOn' onChange={handelChange} value={state.bookedOn} />
        <span>{formErrors.bookedOnError}</span>
        <br></br>

        {mandatory && <span>{ Messages.MANDATORY}</span>}
        <input type='submit' value="Submit" name='active' />
        {valid ? <span>{successMessage}</span> : <span>{ errorMessage}</span>}
      </form>
    </div>
  );
}

export default App;
