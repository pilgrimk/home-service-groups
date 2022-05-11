import './App.css'
import Head from './components/Head'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FindProperties from './pages/FindProperties'
import TOS from './pages/TOS'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

var company_name_value = "Home Service Groups"
var content_value = "Home Services."
var llc_name_value = "Home Service Groups LLC"
var llc_url_value = "https://homeservicegroups.com"
var phone_value = "801-759-9947"
var city_value = "Phoenix"
var state_short_value = "AZ"

const App = () => {
    return (
        <Router>
            <Head
                company_name={company_name_value}
                content={content_value} />

            <Navbar
                company_name={company_name_value}
                phone={phone_value} />

            <div className="content-container">
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/find-properties' exact element={<FindProperties />} />
                    <Route path="/tos"
                        element={<TOS
                            llc_name={llc_name_value}
                            llc_url={llc_url_value} />}
                    />
                    <Route path="/privacy"
                        element={<Privacy
                            company_name={company_name_value}
                            llc_name={llc_name_value}
                            llc_url={llc_url_value}
                            city={city_value}
                            state_short={state_short_value} />}
                    />
                    <Route path='/:pageName' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;