import React, { Component } from 'react';

import Navbar from '../../components/Navbar';
import Table from '../../components/Table';
import Riskbar from '../../components/Riskbar';

class HomeView extends Component {
  constructor(props){
    super(props);

    this.state = {
      routing: false,
    }
  }

  render () {
    const { history } = this.props;

    return (
      <>
        <div>
          <Navbar />
          <Riskbar history={history} />
          <Table />
        </div>
      </>
    )
  }
}

export default HomeView;