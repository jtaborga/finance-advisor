import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Colors, Sizes, Grid, Cell } from 'react-foundation';
import { bindActionCreators } from 'redux';

import { rebalance, round, findDiff } from '../../util/rebalance'; 

import * as riskLevelActions from '../../store/actions/risklevel';
import $ from 'jquery';

import './style.css';


class TableBudget extends Component {

  constructor(props){
    super(props);

    this.state = {
      showAmount: true,
      suggestions: [],
      difference: [0,0,0,0,0],
      targetValues: {
        'Bonds':     0,
        'Large Cap': 0,
        'Mid Cap':   0,
        'Foreign':   0,
        'Small Cap': 0
      }
    }
  }

  handleActiveClass(id, risknumber){
    return (id === risknumber) ? "active" : "";
  }
  
  renderTableData() {
    let values = this.props.risk;
    let riskNumber = this.props.riskNumber;

    return values.map((riskrow, index) => {
      return (
        <tr key={index} className={ this.handleActiveClass(riskrow.id, riskNumber) } >
          <td>{riskrow.id}</td>
          {
            riskrow.values.map((row, index) => {
              const { riskvalue } = row ;
              return <td key={`val${index}`}>{ riskvalue }</td>
            })
          }
        </tr>
      )
    })
  }

  renderTableHeader() {
    let header = this.props.riskCustomColumns;
    return header.map((column, index) => {
      return <th key={index}>{column.header}</th>
    })
  }

  handleClearFields = (riskdata) => {
    riskdata[0].value = parseFloat(0);
    riskdata[1].value = parseFloat(0);
    riskdata[2].value = parseFloat(0);
    riskdata[3].value = parseFloat(0);
    riskdata[4].value = parseFloat(0);
    $("input[name='Bonds']").val('');
    $("input[name='Large Cap']").val('');
    $("input[name='Mid Cap']").val('');
    $("input[name='Foreign']").val('');
    $("input[name='Small Cap']").val('');

    this.setState({
      suggestions: [],
      difference: [0,0,0,0,0],
      targetValues: {
        'Bonds':     0,
        'Large Cap': 0,
        'Mid Cap':   0,
        'Foreign':   0,
        'Small Cap': 0
      }
    });
  }

  handleGoBackButton() {
    this.props.history.push("/");
  }

  saveCustomRisk = (riskdata) => {  
    riskdata[0].value = parseFloat($("input[name='Bonds']").val());
    riskdata[1].value = parseFloat($("input[name='Large Cap']").val());
    riskdata[2].value = parseFloat($("input[name='Mid Cap']").val());
    riskdata[3].value = parseFloat($("input[name='Foreign']").val());
    riskdata[4].value = parseFloat($("input[name='Small Cap']").val());

    let indexed = riskdata.reduce((acc, el) => (
      {
        ...acc,
          [el.label]: el.value,
      }), {});

    let targetValues = {
      'Bonds':     this.calcTargetAmount('Bonds', this.props.risk),
      'Large Cap': this.calcTargetAmount('Large Cap', this.props.risk),
      'Mid Cap':   this.calcTargetAmount('Mid Cap', this.props.risk),
      'Foreign':   this.calcTargetAmount('Foreign', this.props.risk),
      'Small Cap': this.calcTargetAmount('Small Cap', this.props.risk)
    };
    
    let difference = findDiff(Object.values(targetValues), Object.values(indexed));

    riskLevelActions.saveCustomRisk(riskdata);

    this.setState({
      suggestions: rebalance(Object.values(difference), this.props.riskColumns),
      difference: findDiff(Object.values(targetValues), Object.values(indexed)),
      targetValues: {
        'Bonds':     this.calcTargetAmount('Bonds', this.props.risk),
        'Large Cap': this.calcTargetAmount('Large Cap', this.props.risk),
        'Mid Cap':   this.calcTargetAmount('Mid Cap', this.props.risk),
        'Foreign':   this.calcTargetAmount('Foreign', this.props.risk),
        'Small Cap': this.calcTargetAmount('Small Cap', this.props.risk)
      },
    });
  }

  getTotalAmount(riskdata){
    return riskdata.reduce((accum, value) => accum + (value['value']), 0)
  }

  calcTargetAmount = (field, targetPercentage) => {
    const indexed = targetPercentage.reduce((acc, el) => (
      {
          ...acc,
          [el.label]: el.value,
      }), {});
    
    const inputSum = Object.values(this.props.riskCustomAmounts).reduce((a,c) => a + c['value'], 0);
    
    return round(inputSum * (indexed[field]/100));
  }

  render() {

    let difference = this.state.difference;
    let suggestions = this.state.suggestions;
    let options = this.props.riskCustomAmounts;
    let targetValues = this.state.targetValues;
    let showAmount = this.props.showAmount;

    return (
      <section>
        <Grid className="display">
          <Cell small={12} large={12}>
            <Button className='btn-chart' size={Sizes.SMALL} color={Colors.SECONDARY} onClick={()=> this.handleClearFields(options) }>Clear</Button>
            <Button className='btn-chart' size={Sizes.SMALL} color={Colors.PRIMARY} onClick={()=> this.saveCustomRisk(options) }>Rebalance</Button>
            <Button className='btn-chart' size={Sizes.SMALL} color={Colors.ALERT} onClick={()=>this.handleGoBackButton()}>Go Back</Button>
          </Cell>
        </Grid>
        <Grid className="display">
          <Cell small={12} large={6}>
            <div className='input-container' >
              <div className='input'>
                  <li></li>
                  <li className='current-amt'>Current Amount</li>
                  <li>Difference</li>
                  <li>New Amount</li>
              </div>
              { options.map((option, idx) => {
                  const displayDiff = (difference[idx] === 0) ?
                      difference[idx] : (difference[idx] > 0) ?
                      `+ $${difference[idx]}` :
                      `- $${difference[idx] * -1}`;
                  const displayDiffColor = difference[idx] !== 0 ?
                      difference[idx] < 0 ?
                          'red' : 'green' : '';
                  return (
                    <div key={idx} className='input'>
                        <li>{option.label} $:</li>
                        <li>
                          <div className='input-wrapper'>
                            <span></span>
                            <input type="number" id='userInput' name={option.label} className='current-amt'/>
                          </div>
                        </li>
                        <li className={displayDiffColor}>{showAmount ? displayDiff : null}</li>
                        <li>{showAmount ? `$${targetValues[option.label]}` : null}</li>
                    </div>
                  )
              })}
            </div>
          </Cell>
          <Cell small={12} large={6}>
            <div className='suggestion-container'>
                <h5>Suggested Transactions</h5>
                <ul>
                { suggestions.map((str, idx) => {
                    return <li key={idx}>{str}</li>
                })}
                </ul>
            </div>
          </Cell>
        </Grid>        
      </section>
    )
  }
}

const mapStateToProps = state => ({
  riskColumns: state.risklevel.riskColumns,
  risk: state.risklevel.activeRiskRow,
  riskNumber: state.risklevel.activeRiskNumber,
  riskCustomColumns: state.risklevel.riskCustomColumns,
  riskCustomAmounts: state.risklevel.riskCustomAmounts,
  riskContainer: state.risklevel,
  showAmount: state.risklevel.showAmount,
  difference: state.risklevel.difference,
})

const mapDispatchToProps = dispatch => bindActionCreators(riskLevelActions, dispatch);

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(TableBudget);