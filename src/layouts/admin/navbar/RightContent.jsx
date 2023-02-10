import React, { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";

const Rightcontent = () => {
  const { setShoeSidebar } = useContext(AdminContext);
  return (
    <div className="right_content h-100 py-1 bg-dark">
      <a className="navbar-brand h-100" href="/" title="داشبورد">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5eb48d3fef49df153d320521/61b49a53-b7c8-4e37-86c8-21f0a1666197/MikeToad24Nov.jpg?format=750w"
          alt="logo"
          className="h-100"
        />
      </a>
      <div className="form-check form-switch mx-4 d-none d-md-block">
        <input
          id="handle_toggle_sidemenu"
          className="form-check-input pointer"
          type="checkbox"
          onChange={(e) => setShoeSidebar(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Rightcontent;
