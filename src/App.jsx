import { useEffect, useState, useMemo } from 'react'

function App() {

  const [politics, setPolitics] = useState([])
  const [query, setQuery] = useState('')


  const filteredPoliticians = useMemo(() => {
    return politics.filter(p => p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.biography?.toLowerCase().includes(query.toLowerCase()))
  }, [politics, query])

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then(res => res.json())
      .then(data => setPolitics(data))
  }, [])


  return (
    <>
      <h1 className='text-center m-4 fw-bolder'>Politicians List </h1>

      {/* Searchbar */}
      <div className="container">
        <div className="searchbar text-center my-4 w-100">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Cosa stai cercando...'
            className='p-2 w-100'
          />
        </div>
      </div>

      {/* Politicians Cards */}
      <div className="container">
        <div className="row row-cols-3 gy-4">
          {filteredPoliticians.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100">
                <div className="card-header">
                  <h2>{item.name}</h2>
                </div>
                <div className="card-body">
                  <p className='fw-bold'>{item.position}</p>
                  <p>{item.biography}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
