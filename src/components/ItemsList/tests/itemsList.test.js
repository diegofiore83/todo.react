import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
  onCompleted: f => f,
  onRemove: f => f,
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should render a delete input button foreach item', () => {
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('.itemDelete-button')).toHaveLength(2);
  });

  it('should call onRemove on the selected item', () => {
    const onRemoveMock = jest.fn();
    const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
    const renderedItem = mount(
      <ItemsList {...defaultProps} items={items} onRemove={onRemoveMock} />
    );
    renderedItem.find('#itemDelete-button-1').simulate('click');
    expect(onRemoveMock.mock.calls.length).toBe(1);
  });

  // Unable to simulate the change

  // it('should call onCompleted on the selected item checkbox', () => {
  //   const onCompletedMock = jest.fn();
  //   const items = [{ id: 1, content: 'Test 1', completed: false }, { id: 2, content: 'Test 2', completed: false }];
  //   const renderedItem = mount(
  //     <ItemsList {...defaultProps} items={items} onCompleted={onCompletedMock} />
  //   );
  //   renderedItem.find('#itemComplete-button-1').simulate('change');
  //   expect(onCompletedMock.mock.calls.length).toBe(1);
  // });
});
