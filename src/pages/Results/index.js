import React, { Component } from 'react';
import { Grid, Cell } from 'react-foundation';

import Navbar from '../../components/Navbar';
import BasicCallout from '../../components/BasicCallout';
import TableSingleRow from '../../components/TableSingleRow/TableSingleRow';
import TableBudget from '../../components/TableBudget/TableBudget';

class ResultsView extends Component {
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
          <Navbar history={history}/>
          <Grid className="display">
            <Cell small={2} large={2}></Cell>
            <Cell small={8} large={8}>
              <section>
                <BasicCallout title="Personalized Portfolio"></BasicCallout>                
                <TableSingleRow></TableSingleRow>
                <TableBudget history={history}></TableBudget>
              </section>
            </Cell>
            <Cell small={2} large={2}></Cell>
          </Grid>
        </div>
      </>
    )
  }
}

export default ResultsView;