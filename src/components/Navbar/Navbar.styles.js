import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  position: relative;
  z-index: 1;
`;

export const Brand = styled.div`
  color: #fff;
  font-weight: bold;
`;

export const NavButtons = styled.div`
  display: flex;
`;

export const Button = styled.button`
  margin-left: 10px;
  background-color: transparent;
  border: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserName = styled.span`
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const ClickUser = styled.ul`
  position: absolute;
  border: 1px solid black;
  background-color: white;
  margin-top: 10px;
  border-radius: 3px;
  right: 0;
  display: flex;
  flex-direction: column;
  padding-left: 0;
`;

export const UserListForm = styled.div`
  padding: 10px 25px;
  color: #333;
  &:not(:last-of-type) {
    border-bottom: 1px solid black;
  }
  &:last-of-type {
    color: red;
  }
`;

export const UserList = styled.li`
  list-style: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Home = styled.span`
  color: white;
  cursor: pointer;
  padding: 15px;
  &:hover {
    text-decoration: underline;
  }
`;
