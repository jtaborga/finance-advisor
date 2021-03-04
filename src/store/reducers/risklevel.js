import { RiskLevelActions } from "../actions/risklevel";

const INITIAL_STATE = {
  activeRiskNumber: {},
  activeRiskRow:[
    { id: 'Bonds', label: 'Bonds',     value: 0 },
    { id: 'Large Cap', label: 'Large Cap', value: 0 },
    { id: 'Mid Cap', label: 'Mid Cap',   value: 0 },
    { id: 'Foreign', label: 'Foreign',   value: 0 },
    { id: 'Small Cap', label: 'Small Cap', value: 0 }
  ],
  riskColumns: [
    { header: 'Bonds'},
    { header: 'Large Cap'},
    { header: 'Mid Cap'},
    { header: 'Foreign'},
    { header: 'Small Cap'},
  ],
  riskLevels: [
    {
      id: 1,
      values:[
        { id: 'Bonds', label: 'Bonds',     value: 80 },
        { id: 'Large Cap', label: 'Large Cap', value: 20 },
        { id: 'Mid Cap', label: 'Mid Cap',   value:  0 },
        { id: 'Foreign', label: 'Foreign',   value:  0 },
        { id: 'Small Cap', label: 'Small Cap', value:  0 },
      ]
    },
    {
      id: 2,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 70 },
        { id: 'Large Cap', label: 'Large Cap', value: 15 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 15 },
        { id: 'Foreign', label: 'Foreign',   value:  0 },
        { id: 'Small Cap', label: 'Small Cap', value:  0 },
      ]
    },
    {
      id: 3,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 60 },
        { id: 'Large Cap', label: 'Large Cap', value: 15 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 15 },
        { id: 'Foreign', label: 'Foreign',   value: 10 },
        { id: 'Small Cap', label: 'Small Cap', value:  0 },
      ]
    },
    {
      id: 4,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 50 },
        { id: 'Large Cap', label: 'Large Cap', value: 20 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 20 },
        { id: 'Foreign', label: 'Foreign',   value: 10 },
        { id: 'Small Cap', label: 'Small Cap', value:  0 },
      ]
    },
    {
      id: 5,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 40 },
        { id: 'Large Cap', label: 'Large Cap', value: 20 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 20 },
        { id: 'Foreign', label: 'Foreign',   value: 20 },
        { id: 'Small Cap', label: 'Small Cap', value:  0 },
      ]
    },
    {
      id: 6,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 35 },
        { id: 'Large Cap', label: 'Large Cap', value: 25 },
        { id: 'Mid Cap', label: 'Mid Cap',   value:  5 },
        { id: 'Foreign', label: 'Foreign',   value: 30 },
        { id: 'Small Cap', label: 'Small Cap', value:  5 },
      ]
    },
    {
      id: 7,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 20 },
        { id: 'Large Cap', label: 'Large Cap', value: 25 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 25 },
        { id: 'Foreign', label: 'Foreign',   value: 25 },
        { id: 'Small Cap', label: 'Small Cap', value:  5 },
      ]
    },
    {
      id: 8,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 10 },
        { id: 'Large Cap', label: 'Large Cap', value: 20 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 40 },
        { id: 'Foreign', label: 'Foreign',   value: 20 },
        { id: 'Small Cap', label: 'Small Cap', value: 10 },
      ]
    },
    {
      id: 9,
      values: [
        { id: 'Bonds', label: 'Bonds',     value:  5 },
        { id: 'Large Cap', label: 'Large Cap', value: 15 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 40 },
        { id: 'Foreign', label: 'Foreign',   value: 25 },
        { id: 'Small Cap', label: 'Small Cap', value: 15 },
      ]
    },
    {
      id: 10,
      values: [
        { id: 'Bonds', label: 'Bonds',     value: 0  },
        { id: 'Large Cap', label: 'Large Cap', value:  5 },
        { id: 'Mid Cap', label: 'Mid Cap',   value: 25 },
        { id: 'Foreign', label: 'Foreign',   value: 30 },
        { id: 'Small Cap', label: 'Small Cap', value: 40 },
      ]
    },
  ],
  riskCustomColumns:[
    { header: ''},
    { header: 'Current Amount'},
    { header: 'Difference'},
    { header: 'New Amount'},
    { header: 'Recommended Transfers'},
  ],
  riskCustomAmounts: [
    { id: 'Bonds', label: 'Bonds',     value: 0 },
    { id: 'Large Cap', label: 'Large Cap', value: 0 },
    { id: 'Mid Cap', label: 'Mid Cap',   value: 0 },
    { id: 'Foreign', label: 'Foreign',   value: 0 },
    { id: 'Small Cap', label: 'Small Cap', value: 0 }
  ],
  chart: false,
  showAmount: true,
  difference: [0, 0, 0, 0, 0],
};

export default function risklevel(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RiskLevelActions.TOGGLE_RISK:
      const { values } = state.riskLevels[action.risklevel-1];
      return {
        ...state, 
        activeRiskNumber: action.risklevel,
        activeRiskRow: values,
      }
    case RiskLevelActions.TOGGLE_CHART:
      return {
        ...state,
        chart: action.chart,
      }
    case RiskLevelActions.SAVE_RISK_DATA:
      return {
        ...state, 
        riskCustomAmounts: action.riskdata,
      }
    case RiskLevelActions.SAVE_RISK_DIFFERENCE:
      return {
        ...state,
        difference: action.riskDifference,
      }
    default:
      break;
  }
  
  return state;
}