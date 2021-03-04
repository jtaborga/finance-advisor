import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BasicCallout from '../BasicCallout';

import { Button, Cell, Colors, Sizes, Grid } from 'react-foundation';

import * as riskLevelActions from '../../store/actions/risklevel';
import './style.css';

class Riskbar extends Component {
  constructor(props){
    super(props);

    this.state = {
      chart: false,
    }
  }

  toggleChartButtonImage(){
    if(this.props.chart){
      return <img src="table.png" height="24" width="24" alt="table" />;
    }else{
      return <img src="doughnut.png" height="24" width="24" alt="doughnut" />;
    }
  }

  render(){
    let risk = this.props.risk;
    let riskNumber = this.props.riskNumber;
    let history = this.props.history;
    let chart = this.props.chart;

    return (
      <section>
        <Grid className="display">
          <Cell small={1} large={1}></Cell>
          <Cell small={10} large={10}>
            <BasicCallout 
              title="Please Select A Risk Level For Your Investment Portfolio">
            </BasicCallout>

            <Grid className="display">
              <Cell small={12} large={12}>                
                <ul id="riskbar">
                  {
                    risk.map(riskrow => (
                        <li className={ (riskrow.id === riskNumber) ? "active" : null } 
                            key={`btn${riskrow.id}`} name={`btn${riskrow.id}`} 
                            onClick={()=> this.props.toggleRisk(riskrow.id)}>
                              {riskrow.id}
                        </li>
                    ))
                  }
                </ul>
                <Button size={Sizes.SMALL} color={Colors.PRIMARY} id="btnContinue" 
                        isDisabled={isNaN(riskNumber)} 
                        onClick={()=> !isNaN(riskNumber) ? history.push("/calculator") : null }>
                          Continue
                </Button>
                <Button size={Sizes.SMALL} color={Colors.WARNING} id="btnChart" 
                        isDisabled={isNaN(riskNumber)} 
                        onClick={() => !isNaN(riskNumber) ? this.props.toggleChart(!chart) : null }>
                          { this.toggleChartButtonImage() }
                </Button>
              </Cell>
            </Grid>
          </Cell>
          <Cell small={1} large={1}>
          </Cell>
        </Grid>
      </section>
    )
  }
};

const mapStateToProps = state => ({
  risk: state.risklevel.riskLevels,
  riskNumber: state.risklevel.activeRiskNumber,
  chart: state.risklevel.chart,
})

const mapDispatchToProps = dispatch => bindActionCreators(riskLevelActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Riskbar);