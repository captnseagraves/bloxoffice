import React, { Component } from 'react'
import ProfileFormContainer from '../../ui/profileform/ProfileFormContainer'

class Profile extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Edit your account details here.</p>
            <ProfileFormContainer />
          </div>
          <div className="pure-u-1-1">
            <h1>Your Ticekts</h1>
            <p>User tickets will appear here</p>
        
          </div>
        </div>
      </main>
    )
  }
}

export default Profile
