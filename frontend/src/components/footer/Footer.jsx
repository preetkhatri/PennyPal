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
            <div className="icon-item"><a href="https://www.linkedin.com/in/preet-khatri-6b16b024b" target="_blank" ><LinkedInIcon /></a></div>
            <div className="icon-item"><a href="https://github.com/preetkhatri" target="_blank"><GitHubIcon /></a></div>
            <div className="icon-item"><a href="https://twitter.com/pique_blinder1" target="_blank"><XIcon /></a></div>
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
