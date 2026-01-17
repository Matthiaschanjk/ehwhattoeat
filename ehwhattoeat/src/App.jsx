import './App.css'

function App() {
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
            <form className="mt-0">
              <div className="mb-5">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  What's in your fridge?
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="one box of pasta"
                />
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
