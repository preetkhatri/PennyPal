import React from "react"
import "./footer.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container" id="footer">
          <div className="icon-list">
            <div className="icon-item"><a href=""><LinkedInIcon /></a></div>
            <div className="icon-item"><a href=""><GitHubIcon /></a></div>
            <div className="icon-item"><a href=""><XIcon /></a></div>
            <div className="icon-item"><a href=""><InstagramIcon /></a></div>
          </div>
          <div className="legal">
              2024 © PennyPal by <span>Preet Khatri</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
