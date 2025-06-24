import { useEffect, useState } from 'react'

function App() {

  const [politics, setPolitics] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3333/politicians`)
      .then(res => res.json())
      .then(data => setPolitics(data))
  }, [])

  console.log(politics);




  return (
    <>
      <h1>Politicians List </h1>

      <div className="container">
        <div className="row row-cols-3 gy-4">
          {politics.map(item => (
            <div key={item.id} className="col">
              <div className="card h-100">
                <div className="card-header">
                  <h2>{item.name}</h2>
                </div>
                <div className="card-img">
                  <img src={item.image} alt="" />
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
