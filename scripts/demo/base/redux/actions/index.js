import { UPDATE_TITLE } from '@%system_name%/constants/ActionTypes';

export function update_title_Action(text) {
  return {
    value: text,
    type: UPDATE_TITLE
  }
}