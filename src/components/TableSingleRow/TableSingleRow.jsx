import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-foundation';

import './style.css';

class TableSingleRow extends Component {
  
  renderTableData() {
    let values = this.props.activeRow;
    return values.map((row, index) => (<td key={`val${index}`}>{ `${row.value} %` }</td>))
  }

  renderTableHeader() {
    let header = this.props.riskColumns;
    return header.map((column, index) => {
      return <th key={index}>{`${column.header}`}</th>
    })
  }

  render() {
    let riskNumber = this.props.riskNumber;

    return (
      <section>
        <Grid className="display">
          <Cell small={12} large={12}>
            <h5>Risk Level: { isNaN(riskNumber) ? 'Not Selected' : riskNumber }</h5>
            <table>
              <thead>
                <tr>
                {this.renderTableHeader()}
                </tr>                  
              </thead>
              <tbody>
                <tr>
                {this.renderTableData()}
                </tr>
              </tbody>
            </table>
          </Cell>
        </Grid>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  riskColumns: state.risklevel.riskColumns,
  activeRow: state.risklevel.activeRiskRow,
  riskNumber: state.risklevel.activeRiskNumber,
})

const mapDispatchToProps = dispatch => ({});

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(TableSingleRow);