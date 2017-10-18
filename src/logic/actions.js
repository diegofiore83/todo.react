import { ADD_ITEM, REMOVE_ITEM, COMPLETE_ITEM } from './constants';

export const addItem = content => {
  return { type: ADD_ITEM, content };
};

export const removeItem = id => {
  return { type: REMOVE_ITEM, id };
};

export const completeItem = (id, completed) => {
  return { type: COMPLETE_ITEM, id, completed };
};
