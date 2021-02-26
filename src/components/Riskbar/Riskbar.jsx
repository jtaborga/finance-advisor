import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BasicCallout from '../BasicCallout';

import { Button, Cell, Colors, Sizes, Grid } from 'react-foundation';

import * as riskLevelActions from '../../store/actions/risklevel';
import './style.css';

const Riskbar = ({ risk, riskNumber, toggleRisk, history }) => {
    return (
      <section>
        <Grid className="display">
          <Cell small={2} large={2}></Cell>
          <Cell small={8} large={8}>
            <BasicCallout title="Please Select A Risk Level For Your Investment Portfolio"></BasicCallout>
            <Grid className="display">
              <Cell small={10} large={10}>                
                <ul id="riskbar">
                  {
                    risk.map(riskrow => (
                        <li className={ (riskrow.id === riskNumber) ? "active" : null } key={`btn${riskrow.id}`} name={`btn${riskrow.id}`} onClick={()=> toggleRisk(riskrow.id)}>{riskrow.id}</li>
                    ))
                  }
                  
                </ul>
              </Cell>
              <Cell small={2} large={2}>
                <Button size={Sizes.SMALL} color={Colors.PRIMARY} id="btnContinue" isDisabled={isNaN(riskNumber)} onClick={()=> !isNaN(riskNumber) ? history.push("/calculator") : null }>Continue</Button>
              </Cell>
            </Grid>
          </Cell>
          <Cell small={2} large={2}></Cell>
        </Grid>
      </section>
    )
};

const mapStateToProps = state => ({
  risk: state.risklevel.riskLevels,
  riskNumber: state.risklevel.activeRiskNumber,
})

const mapDispatchToProps = dispatch => bindActionCreators(riskLevelActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Riskbar);