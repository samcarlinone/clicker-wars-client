import React, { Component } from 'react';
import { Link } from 'react-router';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Header extends Component {
  getLinks() {
    if(this.props.authenticated) {
      return [['/game','Game']];
    } else {
      return [['/','Home']];
    }
  }

  signout() {
    this.props.signoutUser();
  }

  renderLinks() {
    const links = this.getLinks().map(data => {
      return (
        <li className="nav-item" key={data[0]}>
          <Link className="nav-link" activeClassName="active" to={data[0]}>{data[1]}</Link>
        </li>
      );
    });

    if(this.props.authenticated) {
      links.unshift(<li className="nav-item" key="-1999" onClick={() => this.signout()}>
        <span className="nav-link">Logout</span>
      </li>);
    }

    return links;
  }

  render () {
    return (
      <nav className="navbar navbar-light bg-faded">
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps, actions)(Header);
