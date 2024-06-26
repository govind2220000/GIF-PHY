import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";

const AppLayout = ({ user }) => {
  const location = useLocation();

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto ">
        {" "}
        {/* if we apply margin on top and bottom here so it will also apply this
      margin to parent div due to a CSS concept of margin collapse to overcome
      this we can use flex or grid */}
        {/* <Login></Login> */}
        {(location.pathname !== "/login" ||
          location.pathname !== "/register") &&
          user && <Header user={user}></Header>}
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
