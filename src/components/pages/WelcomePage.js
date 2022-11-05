import { Link } from "react-router-dom"

const WelcomePage = () => {
  return (
    <div>
       <img src="./assets/images/logo-easyjob.svg" alt="logo-easyjob"/>
       <Link to='/jobboard'>Next</Link>
    </div>
  )
}

export default WelcomePage