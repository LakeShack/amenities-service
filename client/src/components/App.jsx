import React from 'react';
import axios from 'axios';
import Rules from './Rules.jsx';
import Sleeping from './Sleeping.jsx';
import Amenities from './Amenities.jsx';
import Heading from './Heading.jsx';
import Description from './Description.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      homeId: 1,
      home: {},
      amenities: {},
      rooms: {},
      host: {},
      modal1IsOpen: false,
      modal2IsOpen: false, 
      expanded: false, 
      truncated: false
    };
  }

  fetchHomes(id) {
    axios.get(`http://127.0.0.1:3002/amenities/${id}`)
      .then((response) => {
        this.setState({
          home: response.data,
          amenities: response.data.amenities,
          rooms: response.data.rooms,
          host: response.data.host,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  openModal1() {
    this.setState({modal1IsOpen: true});
  }
  
  closeModal1() {
    this.setState({modal1IsOpen: false});
  }
  
  openModal2() {
    this.setState({modal2IsOpen: true});
  }

  closeModal2() {
    this.setState({modal2IsOpen: false});
  }

  handleTruncate(truncated) {
    if (this.state.truncated !== truncated) {
      this.setState({
        truncated
      });
    }
  }

  toggleExpandedText(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  componentDidMount() {
    let app = this;
    this.fetchHomes(app.state.homeId);
  }

  render() {
    return (
      <div>
        <Heading home={this.state.home} host={this.state.host} rooms={this.state.rooms} />
        <Description
          home={this.state.home} 
          host={this.state.host}
          isOpen1={this.state.modal1IsOpen}
          openModal1={() => this.openModal1.bind(this)} 
          closeModal1={() => this.closeModal1.bind(this)} 
          expanded={this.state.expanded}
          truncated={this.state.truncated}
          toggleText={(e) => this.toggleExpandedText.bind(this)}
          handleTruncate={() => this.handleTruncate.bind(this)}
        />
        <Amenities 
          amenities={this.state.amenities}
          isOpen2={this.state.modal2IsOpen}
          openModal2={() => this.openModal2.bind(this)} 
          closeModal2={() => this.closeModal2.bind(this)} 
        />
        <Sleeping />
        <Rules 
          rules={this.state.home} 
          expanded={this.state.expanded}
          truncated={this.state.truncated}
          toggleText={(e) => this.toggleExpandedText.bind(this)}
          handleTruncate={() => this.handleTruncate.bind(this)}
        />
      </div>
    );
  }
}

export default App;