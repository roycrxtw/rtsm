
import React, { Component } from 'react';

import './TrafficTable.css';

export default class TrafficTable extends Component {
  getTrafficTable = () => {
    if(!this.props.data){
      return (<div id='trafficTable'>No data</div>);
    }

    let content = (
      <div id='trafficTable'>
        <div className='time'>查詢時間: {this.props.data.updatedAt}</div>
        <div className='motorwayName'>{this.props.data.name}</div>
        <div className='d-row'>
          <span className='d-name'>路段</span>
          {/* 0: N-S direction, 1: E-W direction. */}
          <span className='direction-label'>
            {(this.props.data.direction === 0)? '南向': '東向'}
          </span>
          <span className='direction-label'>
            {(this.props.data.direction === 0)? '北向': '西向'}
          </span>
        </div>

        {
          // map every traffic data
          (this.props.data.traffic).map( item => {
            return (
              <div className='d-row' key={item.name}>
                <div className='d-name'>{item.name}</div>
                <div className={this.getSpeedColour(item.speedA)} data-value={item.speedA}>
                  {item.speedA}
                </div>
                <div className={this.getSpeedColour(item.speedB)} data-value={item.speedB}>
                  {item.speedB}
                </div>
              </div>
            )
          })
        }
      </div>
    );
    return content;
  }

  getSpeedColour = speed => {
    if(speed > 80){
      return 'd-speed goodSpeed';
    }else if(speed < 50){
      return 'd-speed badSpeed';
    }else{
      return 'd-speed mediumSpeed';
    }
  }

  render() {
    return (
      <div>{this.getTrafficTable()}</div>
    );
  }
}
