import { Button, TextField, Typography, Box } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {  
  const naviagte=useNavigate()
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    let data = "";
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => (data = res.data)).then(data=>console.log(data))
      .catch((err) => console.log(err));
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      await sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authActions.login())).then(()=>naviagte("/blogs"))
        // .then((data) => console.log(data));
    } else {
      await sendRequest() 
        .  then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispath(authActions.login())) 
         .then(()=>naviagte("/blogs"))
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px  #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            type={"email"}
            value={inputs.email}
            placeholder="email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type={"password"}
            value={inputs.password}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
