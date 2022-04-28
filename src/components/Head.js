import React from 'react';
import { Helmet } from 'react-helmet';

const Head = (props) => {
    return(
        <Helmet>
          <title>{props.company_name}</title>
          <meta name="description" content={props.content}></meta>
          <link rel="icon"  href="/heating.png"/>
        </Helmet>
      )
}

export default Head;