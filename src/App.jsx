import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px", padding: "20px", background: "#333" }}>
      <Link to="/" style={{ color: "white" }}>Home</Link>
      <Link to="/matches" style={{ color: "white" }}>Matches ⚽</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
    </nav>
  )
}

function FriendCard({ name, age, city }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px", borderRadius: "8px" }}>
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
    <div style={{ padding: "20px" }}>
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
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px", borderRadius: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={homeBadge} style={{ width: "40px" }} />
        <strong>{home}</strong>
        <span>vs</span>
        <strong>{away}</strong>
        <img src={awayBadge} style={{ width: "40px" }} />
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
    <div style={{ padding: "20px" }}>
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
    <div style={{ padding: "20px" }}>
      <h1>About Me 👋</h1>
      <p>My name is Dandely. I'm learning web development!</p>
      <p>Currently learning React ⚛️</p>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App