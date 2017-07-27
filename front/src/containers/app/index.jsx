import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Stage from '../stage'
import { AppBar, IconMenu, MenuItem, IconButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Grid } from 'react-flexbox-grid';

export default class App extends Component {
  render() {
    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem
          primaryText="Accueil"
          containerElement={<Link to="/" />}
        />
        <MenuItem
          primaryText="Scènes"
          containerElement={<Link to="/stage/list" />}
        />
      </IconMenu>
    )

    return (
      <div>
        <AppBar
          title="EPE Douai"
          iconElementLeft={<Logged />}
        />
        <Grid fluid>
          <main>
            <Route exact path="/" component={ Stage } />
            <Route path="/stage" component={ Stage } />
          </main>
        </Grid>
      </div>
    )
  }
}
