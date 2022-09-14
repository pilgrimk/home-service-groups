import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import {
  AboutUs,
  ContactUs,
  FindProperties,
  Home,
  NotFound,
  Privacy,
  Products,
  TOS
} from './pages'
import { Navbar } from './components'

function App() {
  const company_name_value = "Home Service Groups"
  const llc_name_value = "Home Service Groups LLC"
  const llc_url_value = "https://homeservicegroups.com"
  //const phone_value = "801-759-9947"
  const city_value = "Phoenix"
  const state_short_value = "AZ"

  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/about-us" element={<AboutUs />}></Route>
          <Route path="/contact-us" element={<ContactUs />}></Route>
          <Route path="/find-properties" element={<FindProperties />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/tos"
            element={<TOS
              llc_name={llc_name_value}
              llc_url={llc_url_value} />}>
          </Route>
          <Route path="/privacy"
            element={<Privacy
              company_name={company_name_value}
              llc_name={llc_name_value}
              llc_url={llc_url_value}
              city={city_value}
              state_short={state_short_value}
            />}>
          </Route>
          <Route path='/:pageName' element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;