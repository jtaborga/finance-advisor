import React, { Component } from 'react';

import { connect } from 'react-redux';
import { ResponsivePieCanvas } from '@nivo/pie'
import './style.css';
import { Cell, Grid } from 'react-foundation';

class Chart extends Component {

  render () {
    const data = this.props.data;

    return (
      <>
        <Grid className="display">
            <Cell small={12} large={12}>
                <div className="pieCv">
                    <ResponsivePieCanvas 
                        data={data}
                        margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
                        innerRadius={0.6}
                        padAngle={0.7}
                        cornerRadius={1}
                        colors={{ scheme: 'category10' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabelsSkipAngle={16}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkColor={{ from: 'color' }}
                        sliceLabelsSkipAngle={16}
                        sliceLabelsTextColor="#333333"                        
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,                                
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 0,
                                itemWidth: 80,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </Cell>   
        </Grid>
      </>
    )
  }
}

const mapStateToProps = state => ({
  risk: state.risklevel.riskLevels,
  riskNumber: state.risklevel.activeRiskNumber,
  data: state.risklevel.activeRiskRow,
})

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);