import React, { useEffect } from "react"
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined"
import MaterialUISwitch from "../../MUI/MaterialUISwitch";
import axiosInstance from "../../helper/axios";
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom"

const Head = ({ dark, setMode }) => {

  const [userName, setUserName] = React.useState("");

  const getUsername = async () => {
    const response = await axiosInstance.get("http://localhost:5000/api/v1/userdetails");
    const username = response.data.username;
    setUserName(username)
  }

  useEffect(() => {
    getUsername();
  }, [])

  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      window.localStorage.removeItem("auth-token")
      navigate("/login")
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const styleSX = {
    "&:hover": {
      cursor: "pointer"
    },
    marginLeft: 2
  }


  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='left'>
            {/* Logo add krna hai baadme */}
            <div className='logo'>
              <img src='./test.jpg' alt='!found' />
            </div>
          </div>
          <div className='right flexCenter'>
            <div className='profile flexCenter'>
              <img className='imageCircle' src='https://cdn.artphotolimited.com/images/647ddd6dbd40b8de8b992582/1000x1000/the-peaky-blinders-thrilling-debut-boxing-match.jpg' alt='Not Found' />
              <span><h3>Hello {userName}</h3></span>
              <KeyboardArrowDownOutlinedIcon className='iconHead' />
            </div>
            <button onClick={() => setMode(!dark)}>
              <MaterialUISwitch />
            </button>
            <LogoutIcon
              sx={styleSX}
              onClick={handleLogOut} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
