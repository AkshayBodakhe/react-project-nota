//import eCarehealth from "../../assets/logo/eCarehealth.svg";
// import eCarehealthWhite from "../../assets/logo/eCarehealthwhite.svg";
import { useNavigate } from "react-router-dom";
// import thinkEMR from "../../assets/logo/thinkEMR.svg";
import notaLogo from "../../assets/logo/Navala_Logo.svg";
import { adminConstants } from "../../constants/admin";

type LogoProps = {
  source: string;
};

const Logo = (props: LogoProps) => {
  const { source } = props;
  const { PATIENT, PROVIDER } = adminConstants;
  const navigate = useNavigate();

  const handleLogoClick = () =>{
    // if(source === "preAuthLogo"){
    //   return;
    // }
    // navigate("/",{ replace: true });
  }
  const isLogin = location.href.includes('/auth/login')
  return (
    <div onClick={handleLogoClick}>
      <img
        src={
          source === "preAuthLogo"
            ? notaLogo
            : source === PROVIDER || source === PATIENT
            ? notaLogo
            : notaLogo
        }
        style={{
          height: isLogin ? "100px" : "40px",
          width: isLogin ? "250px" : "120px",
          marginTop: 1,
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default Logo;
