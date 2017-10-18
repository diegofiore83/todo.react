import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { completeItem, removeItem } from '../../logic/actions';
import './styles.css';

export const ItemsList = ({ items, onCompleted, onRemove }) => {
  return (
    <div>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map(item => 
          <li key={item.id}>
            <input 
              id={'itemComplete-button-' + item.id}
              type="checkbox" 
              defaultChecked={item.completed} 
              onClick={() => {onCompleted(item.id, !item.completed);}}
            />
            {item.content}
            <input
              id={'itemDelete-button-' + item.id}
              className={'itemDelete-button'}
              type="button"
              value={'Delete'}
              onClick={() => {onRemove(item.id);}}
            />
          </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

const mapDispatchToProps = dispatch => ({
  onCompleted: (id, completed) => dispatch(completeItem(id, completed)),
  onRemove: id => dispatch(removeItem(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
