export const CHANGE_STEP = 'change-step';

export function changeStep(nextStep) {
  return { type: CHANGE_STEP, nextStep };
}
