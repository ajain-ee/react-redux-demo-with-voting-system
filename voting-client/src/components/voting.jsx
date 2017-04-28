import React from 'react';
import Winner from './winner';
import Vote from './vote';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export class Voting extends React.PureComponent {
  render() {
    return (
        <div>
        { 
          (this.props.winner) ?
          <Winner ref="winner" winner={this.props.winner} /> :
          <Vote {...this.props} />
        }  
        </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner'),
    hasVoted: state.get('hasVoted'),
  };
}

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);