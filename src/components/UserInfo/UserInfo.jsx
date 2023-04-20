import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeverApi from "../../api/api";
import styled from "styled-components";

export const Title = styled.div`
  font-size: 30px;
  padding: 20px;
  font-weight: 600;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding: 20px;
  border: 1px solid #eee;
  margin-left: 20px;
  border-radius: 5px;
  box-shadow: 10px 5px 5px #eee;
  span {
    font-size: 12px;
    color: #bbb;
  }
  input {
    padding: 8px 3px;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    outline: 1px solid #bbb;
    &::placeholder {
      font-size: 14px;
    }
  }
  input:focus {
    outline: 2px solid #333;
  }
  div {
    margin-bottom: 20px;
  }
`;

export const Button = styled.button`
  border-radius: 5px;
  background-color: white;
  border: none;
  outline: 1px solid #bbb;
  width: 100%;
  padding: 8px 5px;
  transition: all 0.2s;
  color: #333;
  font-weight: bold;
  &:first-of-type {
    margin-bottom: 5px;
  }
  &:hover {
    background-color: #333;
    color: white;
  }
`;

const UserInfo = ({ onLogout }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    axios
      .get(`${SeverApi}/users/${localStorage.getItem("id")}`)
      .then((response) => {
        console.log(response.data);
        setName(response.data);
        setUserName(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `${SeverApi}/users/${localStorage.getItem("id")}`
      );
      console.log(response);
      onLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const EditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${SeverApi}/users/${localStorage.getItem("id")}?name=${name}`,
        { Username: name }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Title>회원정보</Title>

      <Form onSubmit={handleSubmit}>
        <div>
          <span>Username</span>
          <input
            placeholder='Username'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type='text'
          />
        </div>
        <div style={{ borderTop: "1px solid #ddd" }}></div>
        <Button type='button' onClick={EditUser}>
          회원수정
        </Button>
        <Button type='submit'>회원탈퇴</Button>
      </Form>
    </div>
  );
};

export default UserInfo;
