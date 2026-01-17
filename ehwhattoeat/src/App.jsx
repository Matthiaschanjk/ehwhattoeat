import './App.css'
import { useState } from 'react'


function App() {
  const [item, setItem] = useState('')
  const [fridgeItems, setFridgeItems] = useState([])

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img
            src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
            width="30"
            height="30"
            alt="Bootstrap"
          />
        </a>
      </nav>

      <div className="container mt-4">
        <div className="row align-items-center">
          
          {/* Image column */}
          <div className="col-md-6">
            <img
              src="mainpage.png"
              width ="auto"
              height= "700px"
              className="img-fluid"
              alt="mainpage"
            />
          </div>

          {/* Form column */}
          <div className="col-md-6">
            <form
                className="mb-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (item.trim() === '') return
                  setFridgeItems([...fridgeItems, item])
                  setItem('')
                }}
              >

              <div className="mb-5">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  What's in your fridge?
                </label>
                <div className="d-flex">
                <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="one box of pasta"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <button className='ml-2'>Add</button>
              </div>
              </div>
            </form>
                  <div className="d-flex flex-wrap gap-5">
        {fridgeItems.map((food, index) => (
          <div key={index} className="sticky-note mr-2 mb-2">
            {food}
          </div>
        ))}
      </div>
          </div>

        </div>
        <button onClick="" class="btn btn-warning btn-lg mb-5">Start Cooking</button>
      </div>
    </>
  )
}

export default App
