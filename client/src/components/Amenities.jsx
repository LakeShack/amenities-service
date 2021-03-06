import React from 'react';
import Modal from 'react-modal';
import {Header, BlueLink, GrayDivider, Text, BoldText, List} from '../style.js';
import Fork from 'react-icons/lib/io/fork';
import Wifi from 'react-icons/lib/md/wifi';
import HotWater from 'react-icons/lib/ti/coffee';

Modal.setAppElement('body');

const spacing = {
  lineHeight: '2px',
  paddingBottom: '5px'
};

const roundButton = {
  borderRadius: '50%'
};

const center = {
  textAlign: 'center', 
  marginTop: '2.5px'
};

const Amenities = (props) => {
  const amenities = Object.entries(props.amenities);
  let amenitiesOffered = [];
  amenities.forEach((value) => { 
    if (value[1] === false) {
      return;
    }
    let amenity = value[0].split(/(?=[A-Z])/).join(' ');
    amenity = amenity.charAt(0).toUpperCase() + amenity.slice(1);
    amenitiesOffered.push(amenity);
  });
  const filteredList = amenitiesOffered.map((value) => 
    <Text key={value.toString()}>{value}</Text>
  );

  let amenitiesNotOffered = [];
  amenities.forEach((value) => { 
    if (value[1] === true) {
      return;
    }
    let amenity = value[0].split(/(?=[A-Z])/).join(' ');
    amenity = amenity.charAt(0).toUpperCase() + amenity.slice(1);
    amenitiesNotOffered.push(amenity);
  });
  const notOffered = amenitiesNotOffered.map((value) => 
    <Text key={value.toString()}>{value}</Text>
  );

  return (  
    <div>
      <BoldText>Amenities</BoldText>
      <List style={spacing}>
        {filteredList}
      </List>
      <BlueLink onClick={props.openModal2()}>
          Show all {filteredList.length} amenities
      </BlueLink>
      <GrayDivider></GrayDivider>
      <Modal isOpen={props.isOpen2}>
        <button onClick={props.closeModal2()} style={roundButton}><Text style={center}>X</Text></button>
        <Header>Amenities</Header>
        <BoldText>Included</BoldText>
        <List style={spacing}>{filteredList}</List>
        <BoldText>Not included</BoldText>
        <List style={spacing}>{notOffered}</List>
      </Modal>
    </div>
  );
};

export default Amenities;