import Telescope from '../../../lib'
import React from 'react'

let ReactMapboxGl = require("react-mapbox-gl")

let Layer = ReactMapboxGl.Layer
let Feature = ReactMapboxGl.Feature

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoidHJ1anVuemhhbmciLCJhIjoiY2lndXVpdGN4MGJ5cXZrbTV4dDkzdjJyZSJ9.asejSyEjXWl35MdbAHUNkQ"
})

const PostsPageMap = ({post}) => {


  return (
    <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
      <Layer
        type="symbol"
        id="marker"
        layout={{"icon-image": "marker-15"}}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
      </Layer>
    </Map>
  )
}

export default PostsPageMap
