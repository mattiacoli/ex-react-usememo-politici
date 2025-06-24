import { useEffect, useState, useMemo, memo } from 'react'

const Card = memo(({ p }) => {

  // console.log('componente renderizzato', p.name);

  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-header">
          <h2>{p.name}</h2>
        </div>
        <div className="card-body">
          <p className='fw-bold'>{p.position}</p>
          <p>{p.biography}</p>
        </div>
      </div>
    </div>
  )
})


function App() {

  const [politics, setPolitics] = useState([])
  const [query, setQuery] = useState('')
  const [selectedPostition, setSelectedPosition] = useState('')

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then(res => res.json())
      .then(data => setPolitics(data))
  }, [])

  const filteredPoliticians = useMemo(() => {
    const userQuery = query.toLowerCase()
    const userSelect = selectedPostition.toLowerCase()

    return politics.filter(p => {
      const matchesSearch = p.name?.toLowerCase().includes(userQuery) ||
        p.biography?.toLowerCase().includes(userQuery)
      const matchesPosition = !userSelect || p.position.toLowerCase() === userSelect

      return matchesSearch && matchesPosition
    })

  }, [politics, query, selectedPostition])


  const positions = politics.reduce((acc, p) =>
    acc.includes(p.position) ? acc : ([...acc, p.position])
    , [])


  return (
    <>
      <h1 className='text-center m-4 fw-bolder'>Politicians List </h1>
      <div className="container d-flex gap-1">

        {/* Searchbar */}
        <div className="searchbar text-center my-4 w-50">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Cosa stai cercando...'
            className='form-control p-2 w-100'
          />
        </div>

        {/* Select */}
        <div className="select w-50">
          <div className="form-group">
            <label htmlFor=""></label>
            <select
              className="form-control p-2"
              value={selectedPostition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">All Position</option>
              {positions.map((o, i) =>
                <option key={i} value={o}>{o}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Politicians Cards */}
      <div className="container">
        <div className="row row-cols-3 gy-4">
          {filteredPoliticians.map(item => (
            <Card key={item.id} p={item} />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
