import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Input, Button, Header } from "./LoginForm.styles";
import HomeForm from "../HomeForm/HomeFrom";
import { useNavigate } from "react-router-dom";
import SeverApi from "../../api/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${SeverApi}/login/`, {
        username,
        password,
      });
      console.log(response);
      alert("로그인 성공");
      navigate("/home");
      localStorage.setItem("id", response.data.username);
      // localStorage.setItem("username", response.data.name);
    } catch (error) {
      alert("아이디나 비밀번호를 다시 확인해주세요.");
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>로그인</Header>
        <Input
          type='text'
          placeholder='Id'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type='submit'>Sign in</Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
