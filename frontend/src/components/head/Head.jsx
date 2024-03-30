import React from "react"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import MaterialUISwitch from "../../MUI/MaterialUISwitch";

const Head = ({ dark, setMode }) => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            {/* Logo add krna hai baadme */}
            <div className='logo'>
              <img src='../../../public/assets/images/test.jpg' alt='Not Found' />
            </div>
          </div>
          <div className='right flexCenter'>
            <NotificationsNoneIcon className='iconHead' />
            <div className='profile flexCenter'>
              <img className='imageCircle' src='https://cdn.artphotolimited.com/images/647ddd6dbd40b8de8b992582/1000x1000/the-peaky-blinders-thrilling-debut-boxing-match.jpg' alt='Not Found' />
              <span>Shelby</span>
              <KeyboardArrowDownOutlinedIcon className='iconHead' />
            </div>
            <button onClick={() => setMode(!dark)}>
              <MaterialUISwitch />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
