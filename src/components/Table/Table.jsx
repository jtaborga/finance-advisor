import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell, Button, Colors, Sizes } from 'react-foundation';

import './style.css';
import Chart from '../Chart/Chart';

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
    return this.state.chart ? "showActive" : "hideActive";
  }

  handleActiveTableClass(){
    return this.state.chart ? "hideActive" : "showActive";
  }

  toggleChartButtonText(){
    return this.state.chart ? "View Data" : "View Graphics";
  }

  toggleChartButtonImage(){
    if(this.state.chart){
      return <img src="table.png" height="24" width="24" alt="table" />;
    }else{
      return <img src="doughnut.png" height="24" width="24" alt="doughnut" />;
    }
  }

  toggleChartView(){
    let value = this.props.chart;
    this.props.chart = !value
    console.log(value)
    return this.props.chart
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
          <Cell small={2} large={2}></Cell>
          <Cell small={8} large={8}>
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
          <Cell small={2} large={2}>
            <Button id="btnChart" size={Sizes.SMALL} color={Colors.WARNING} isDisabled={isNaN(this.props.riskNumber)} onClick={() => !isNaN(this.props.riskNumber) ? this.setState({ chart: !this.state.chart }) : null }>{ this.toggleChartButtonImage() }</Button>
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
  chart: false,
})

const mapDispatchToProps = dispatch => ({});

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(Table);
  