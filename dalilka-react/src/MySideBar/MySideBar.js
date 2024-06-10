import React from 'react';
import { Nav } from 'react-bootstrap';
import styles from './MySideBar.module.css';

export default function MySideBar() {
    return (
        <div className={styles.sidebar}>
          <Nav className={styles.flexColumn}>
            <Nav.Link href="#home" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link href="#features" className={styles.navLink}>Features</Nav.Link>
            <Nav.Link href="#pricing" className={styles.navLink}>Pricing</Nav.Link>
            <Nav.Link href="#about" className={styles.navLink}>About</Nav.Link>
          </Nav>
          <div></div>
        </div>
      );
};