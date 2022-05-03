import React from 'react';
import { Helmet } from 'react-helmet';

const Head = (props) => {
  return (
    <Helmet>
      <title>{props.company_name}</title>
      <meta name="description" content={props.content}></meta>
      <link rel="icon" href="/heating.png" />

      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    </Helmet>
  )
}

export default Head;