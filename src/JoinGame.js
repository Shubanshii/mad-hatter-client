import React, { Component } from 'react';

class JoinGame extends Component {
  render() {
    return (
      <div className="App">
        <form id="record-dream">
           <div class="form-section">
             <label for="table-name">Table Name</label>
             <input type="text" name="table-name" placeholder="DeNiro's Dragon" required />
           </div>
           <div class="form-section">
             <label for="table-password">Table Password</label>
             <input type="text" name="table-password" placeholder="Must be at least 12 characters" required />
           </div>

           <button type="submit">Submit</button>
           <button type="reset">Reset</button>
         </form>
      </div>
    );
  }
}

export default JoinGame;
