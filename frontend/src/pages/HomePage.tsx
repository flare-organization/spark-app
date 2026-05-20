import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">Go to About</Link>
    </div>
  )
}