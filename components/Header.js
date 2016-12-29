/**
 * Created by miguhruiz on 24/12/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

function Header() {
  return (
    <a href="/" style={{ textDecoration: 'none' }}>
      <AppBar
        title="SpotifyReact"
        iconElementLeft=""
      />
    </a>
  );
}

export default Header;
