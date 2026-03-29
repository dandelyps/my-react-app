import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Navbar() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link>
      <Link to="/matches">⚽ Matches</Link>
      <Link to="/about">👤 About</Link>
    </nav>
  )
}

function FriendCard({ name, age, city }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  )
}

function Home() {
  const friends = [
    { name: "Budi", age: 20, city: "Jakarta" },
    { name: "Siti", age: 22, city: "Bandung" },
    { name: "Andi", age: 21, city: "Surabaya" }
  ]

  return (
    <div className="page">
      <h1>Welcome Dandely! 👋</h1>
      <h2>My Friends</h2>
      {friends.map((friend) => (
        <FriendCard
          key={friend.name}
          name={friend.name}
          age={friend.age}
          city={friend.city}
        />
      ))}
    </div>
  )
}

function MatchCard({ home, away, homeBadge, awayBadge, date, time, venue }) {
  return (
    <div className="card">
      <div className="match-teams">
        <img src={homeBadge} alt={home} />
        <strong>{home}</strong>
        <span className="vs">VS</span>
        <strong>{away}</strong>
        <img src={awayBadge} alt={away} />
      </div>
      <p>📅 {date} | ⏰ {time}</p>
      <p>🏟️ {venue}</p>
    </div>
  )
}

function Matches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    async function loadMatches() {
      const response = await fetch("https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328")
      const data = await response.json()
      setMatches(data.events)
    }
    loadMatches()
  }, [])

  return (
    <div className="page">
      <h1>Upcoming Matches ⚽</h1>
      {matches.map((match) => (
        <MatchCard
          key={match.idEvent}
          home={match.strHomeTeam}
          away={match.strAwayTeam}
          homeBadge={match.strHomeTeamBadge}
          awayBadge={match.strAwayTeamBadge}
          date={match.dateEvent}
          time={match.strTime}
          venue={match.strVenue}
        />
      ))}
    </div>
  )
}

function About() {
  return (
    <div className="page">
      <h1>About Me 👤</h1>
      <div className="about-card">
        <p>⚽ My name is Dandely</p>
        <p>📍 From Lampung, Indonesia</p>
        <p>💻 Currently learning React</p>
        <p>🏆 Favorite league: Premier League</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  )
}

export default App