import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Input,
  Button,
  Header,
  Warning,
} from "./SignUpForm.styles";
import SeverApi from "../../api/api";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idOk, setIdOk] = useState(false);
  const [passwordOk, setPasswordOk] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/home");
    }
  }, [navigate]);

  const isValidEmail = (username) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(username);
  };

  const containsSpecialCharacter = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(username)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    if (!containsSpecialCharacter(password)) {
      alert("비밀번호에는 최소 1개의 특수 문자가 포함되어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(`${SeverApi}/signup/`, {
        username,
        password,
        name,
      });
      alert("회원가입 성공");
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.data.detail === "Username already registered") {
        alert("아이디가 이미 존재합니다.");
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>회원가입</Header>
        <Input
          type='text'
          style={{ margin: "0" }}
          placeholder='아이디(이메일)'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (isValidEmail(e.target.value)) {
              setIdOk(true);
            } else {
              setIdOk(false);
            }
          }}
          required
        />
        {!idOk ? (
          <Warning>반드시 이메일 형식이어야 합니다.</Warning>
        ) : (
          <div style={{ marginBottom: "10px" }} />
        )}
        <Input
          type='password'
          style={{ margin: "0" }}
          placeholder='비밀번호'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (containsSpecialCharacter(e.target.value)) {
              setPasswordOk(true);
            } else {
              setPasswordOk(false);
            }
          }}
          required
        />
        {!passwordOk ? (
          <Warning>반드시 특수문자 1개 이상 포함해야 합니다.</Warning>
        ) : (
          <div style={{ marginBottom: "10px" }} />
        )}
        <Input
          type='password'
          placeholder='비밀번호 확인'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Input
          type='text'
          placeholder='이름'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type='submit'>Sing up</Button>
      </Form>
    </Container>
  );
};

export default SignUpForm;
