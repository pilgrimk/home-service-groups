import React from 'react'
import { Helmet } from 'react-helmet'

export default function Head(props) {
  return (
    <Helmet>
      <title>{props.company_name}</title>
      <meta name="description" content={props.content}></meta>
      <link rel="icon" href="/heating.png" />

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet"></link>
    </Helmet>
  )
}
