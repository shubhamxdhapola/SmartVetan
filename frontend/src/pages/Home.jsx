import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Home
      <Link to="/register" >Register</Link>
      <Link to="/login" >Login</Link>
    </div>
  )
}

export default Home
