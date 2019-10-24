import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layouts/Navbar.js';
import ListDevices from './components/devices/ListDevices';
import DeviceInfo from './components/devices/DeviceInfo';
import Requests from './components/requests/Request';
import NewDevice from './components/devices/NewDevice.js';
import DeviceEdition from './components/devices/DeviceEdition';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="container">
            <div className="row mt-3">
              <Navbar />
            </div>
            <div className="row my-4">
              <Switch>
                <Route exact path="/" component={ListDevices} />
                <Route exact path="/requests" component={Requests} />
                <Route exact path="/device/new" component={NewDevice} />
                <Route exact path="/device/:id" component={DeviceInfo} />
                <Route
                  exact
                  path="/device/edit/:id"
                  component={DeviceEdition}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
