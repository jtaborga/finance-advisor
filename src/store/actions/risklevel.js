const TOGGLE_RISK = 'TOGGLE_RISK';
const SAVE_RISK_DATA = 'SAVE_RISK_DATA';
const SAVE_RISK_DIFFERENCE = 'SAVE_RISK_DIFFERENCE';

export const RiskLevelActions = {
  TOGGLE_RISK,
  SAVE_RISK_DATA,
  SAVE_RISK_DIFFERENCE,
};

export function toggleRisk(risklevel) {
  return {
    type: RiskLevelActions.TOGGLE_RISK,
    risklevel,
  };
}

export function saveCustomRisk(riskdata){
  return {
    type: RiskLevelActions.SAVE_RISK_DATA,
    riskdata
  };
}

export function saveDifference(riskDifference){
  console.log(riskDifference);
  return {
    type: RiskLevelActions.SAVE_RISK_DIFFERENCE,
    riskDifference
  };
}