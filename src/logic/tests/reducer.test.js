import reducer, { initialState } from '../reducer';
import { addItem, removeItem, completeItem } from '../actions';

describe('reducer', () => {
  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);
    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);
    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ]
    }
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('should remove an items by id on DELETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
        { id: 3, content: 'third' },
      ]
    }
    const mockAction = removeItem(2);
    const result = reducer(state, mockAction);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].id).toEqual(1);
    expect(result.items[1].id).toEqual(3);
    expect(result.items[0].content).toEqual('first');
    expect(result.items[1].content).toEqual('third');
  });

  it('should complete an items by id on COMPLETE_ITEM', () => {
    const state = {
      items: [
        { id: 1, content: 'first', completed: true },
        { id: 2, content: 'second', completed: false },
        { id: 3, content: 'third', completed: false },
      ]
    }
    const mockAction = completeItem(2, true);
    const result = reducer(state, mockAction);
    expect(result.items[1].completed).toEqual(true);
  });
});
