import { ADD_ITEM, REMOVE_ITEM, COMPLETE_ITEM } from './constants';

export const initialState = {
  items: [
    { id: 1, content: 'Call mum', completed: false },
    { id: 2, content: 'Buy cat food', completed: true },
    { id: 3, content: 'Water the plants', completed: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const nextId = state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
        completed: false
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }
         
    case REMOVE_ITEM: {
      const indexToDelete = state.items.findIndex((element) => element.id === action.id);
      
      return {
        ...state,
        items: [...state.items.slice(0, indexToDelete), ...state.items.slice(indexToDelete + 1)],
      };
    }
      
    case COMPLETE_ITEM: {
      const indexToDelete = state.items.findIndex((element) => element.id === action.id);
      const item = state.items[indexToDelete];

      item.completed = action.completed;

      return {
        ...state,
        items: [...state.items.slice(0, indexToDelete), item ,...state.items.slice(indexToDelete + 1)],
      };
    }
         
    default:
      return state;
  }
};

export default reducer;
