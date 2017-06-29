import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container" id="wrapper">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className="App">

              <h1 className="neon">BloxOffice</h1>
              <h4 className="homeText">Never buy a fake ticket. Never pay more than face value. Never pay a "convenience" fee ever again.</h4>
              <h4 className="homeText">The future of ticket sales is here. Welcome.</h4>
              <div className="moveCenter">
                <button className="pure-button home-button neonSmall center">SignUp</button>
                <button className="pure-button home-button neonSmall center">Login</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
