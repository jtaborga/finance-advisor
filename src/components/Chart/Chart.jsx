import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResponsivePieCanvas } from '@nivo/pie'
import { Cell, Grid } from 'react-foundation';

import './style.css';

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
                        margin={{ top: 10, right: 95, bottom: 40, left: 95 }}
                        innerRadius={0.6}
                        padAngle={0.3}
                        cornerRadius={1}
                        colors={{ scheme: 'category10' }}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                        radialLabelsSkipAngle={16}
                        radialLabelsTextColor="#333"
                        radialLabelsLinkColor={{ from: 'color' }}
                        sliceLabelsSkipAngle={16}
                        sliceLabelsTextColor="#fff"                        
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: true,                                
                                translateX: 0,
                                translateY: 16,
                                itemsSpacing: 0,
                                itemWidth: 55,
                                itemHeight: 38,
                                itemTextColor: '#000',
                                itemDirection: 'top-to-bottom',
                                itemOpacity: 1,
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#999'
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