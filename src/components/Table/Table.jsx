import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-foundation';

import Chart from '../Chart/Chart';

import './style.css';

class Table extends Component {

  constructor(props){
    super(props);

    this.state = {
      chart: false
    }
  }

  handleActiveClass(id, risknumber){
    return (id === risknumber) ? "active" : null;
  }

  handleActiveChartClass(){
    return this.props.chart ? "showActive" : "hideActive";
  }

  handleActiveTableClass(){
    return this.props.chart ? "hideActive" : "showActive";
  }

  toggleChartButtonText(){
    return this.props.chart ? "View Data" : "View Graphics";
  }

  toggleChartButtonImage(){
    if(this.props.chart){
      return <img src="table.png" height="24" width="24" alt="table" />;
    }else{
      return <img src="doughnut.png" height="24" width="24" alt="doughnut" />;
    }
  }

  toggleChartView(){
    let value = this.props.chart;
    this.props.chart = !value;
    return this.props.chart;
  }
    
  renderTableData() {
    let values = this.props.risk;
    let riskNumber = this.props.riskNumber;

    return values.map((riskrow, index) => {
      return (
        <tr className={ this.handleActiveClass(riskrow.id, riskNumber) } key={index}>
        <td>{riskrow.id}</td>
        {
          riskrow.values.map((row, index) => {
            const { value } = row ;
            return <td key={`val${index}`}>{ value }</td>
          })
        }
      </tr>
      )
    })
  }

  renderTableHeader() {
    let header = this.props.riskColumns;
    return header.map((column, index) => {
      return <th key={index}>{`${column.header} %`}</th>
    })
  }

  render() {
    return (
      <section>
        <Grid className="display">
          <Cell small={1} large={1}></Cell>
          <Cell small={10} large={10}>
            <div className={this.handleActiveTableClass()}>
              <table>
                <thead>
                  <tr>
                    <th>Risk</th>
                    {this.renderTableHeader()}
                  </tr>                  
                </thead>
                <tbody>
                    {this.renderTableData()}
                </tbody>
              </table>
            </div>
            
            <div className={this.handleActiveChartClass()}>
              <Chart/>
            </div>
            
          </Cell>
          <Cell small={1} large={1}>
          </Cell>
        </Grid>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  riskColumns: state.risklevel.riskColumns,
  risk: state.risklevel.riskLevels,
  riskNumber: state.risklevel.activeRiskNumber,
  chart: state.risklevel.chart,
})

const mapDispatchToProps = dispatch => ({});

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(Table);
  