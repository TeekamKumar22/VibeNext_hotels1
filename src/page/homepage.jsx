import React from 'react'
import Banner from '../components/Banner'
import Destination from '../components/Destination'
import Nextpage from '../components/Next';
import TripCard from '../components/TripCard';
import TripCard1 from '../components/TripCard1';
import Feedback from '../components/Feadback';

const Homepage = () => {
  return (
    <div>
      <Banner />
      <Destination />
      <Nextpage />
      <TripCard1 />
      <TripCard />
      <Feedback />
    </div>
  )
}

export default Homepage
