import React from "react";
import "./Footer.css"; // CSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Job Portal. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
