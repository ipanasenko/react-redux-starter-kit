import React from 'react';
import styles from './hi.styl';
import 'styles/_base.styl';

export default class Hi extends React.Component {
  render () {
    return (
      <h1 className={styles.hi}>Hi!</h1>
    );
  }
}
