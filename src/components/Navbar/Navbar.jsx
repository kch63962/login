import React, { useEffect, useState } from "react";
import {
  Nav,
  Brand,
  NavButtons,
  Button,
  UserName,
  ClickUser,
  UserList,
  UserListForm,
  Home,
} from "./Navbar.styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "개인정보",
      onClick: () => {
        navigate(`/home/${localStorage.getItem("id")}`);
        setClickUser(false);
      },
    },
    {
      text: "나의 이미지 보기",
      onClick: () => {
        navigate(`/home/${localStorage.getItem("id")}/image`);
        setClickUser(false);
      },
    },
    {
      text: "Logout",
      onClick: () => {
        localStorage.clear();
        navigate("/");
        setClickUser(false);
      },
    },
  ];
  const [clickUser, setClickUser] = useState(false);

  const UserInfo = () => {
    setClickUser(!clickUser);
  };
  return (
    <Nav>
      {localStorage.getItem("id") ? (
        <Link to='/home'>
          <Brand>LoginPage</Brand>
        </Link>
      ) : (
        <Link to='/'>
          <Brand>LoginPage</Brand>
        </Link>
      )}

      <NavButtons>
        {location.pathname === "/signup" ? (
          <Link to='/'>
            <Button>Sign in</Button>
          </Link>
        ) : location.pathname === "/" ? (
          <Link to='/signup'>
            <Button>Sign up</Button>
          </Link>
        ) : (
          <div>
            <div>
              <Home
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Home>
              <UserName onClick={UserInfo}>
                {localStorage.getItem("id")}
              </UserName>
              {clickUser && (
                <ClickUser>
                  {menuItems.map((item, index) => (
                    <UserListForm key={index}>
                      <UserList onClick={item.onClick}>{item.text}</UserList>
                    </UserListForm>
                  ))}
                </ClickUser>
              )}
            </div>
          </div>
        )}
      </NavButtons>
    </Nav>
  );
};

export default Navbar;
