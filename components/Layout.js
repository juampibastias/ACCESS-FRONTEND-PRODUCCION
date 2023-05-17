import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";

function Layout({ children }) {
  return (
    <div className="container">
      <NavBar />
      <Notify />
      {children}
      <Modal />
    </div>
  );
}

export default Layout;
