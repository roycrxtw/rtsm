import React, { Component } from 'react';
import Scroll from 'react-scroll';

import TrafficTable from './TrafficTable';
import './App.css';

let Element = Scroll.Element;
let scroller = Scroll.scroller;

let mid = 'm1';


function BtnSearch(props){
  return (
    <div className="tile tile-submit" id='btnSearch' onClick={props.onSubmit} disabled={props.isLoading}>
      {(props.isLoading)? 'Loading...': 'Search'}
    </div>
  );
}

function Demo(props){
  return (
    <div className='demo-tile'>
      <div className="demo-header">圖例</div>
      <span className="goodSpeed demo-block">速度良好</span>
      <span className="mediumSpeed demo-block">速度一般</span>
      <span className="badSpeed demo-block">交通壅塞</span>
    </div>
  );
}

function Footer(props){
  return (
    <footer>
      RTSM Project T2109 2017. 
      by <a href='https://royvbtw.uk'>Roy Lu</a>, <a href='https://github.com/royvbtw/rtsm'>royvbtw@github</a>
    </footer>
  );
}

function MotorwayMenu(props){
  function menuHandler(event){
    mid = event.target.value;
  }

  return (
    <select id='menu-motorways' className='tile block-motorway-menu' onChange={menuHandler}> 
      <option value="m1">國道1號</option>
      <option value='m1e'>國道1號高架段</option>
      <option value='m2'>國道2號</option>
      <option value='m3'>國道3號</option>
      <option value="m3a">國道3甲</option>
      <option value="t2f">港西聯外道路(台2己線)</option>
      <option value="nar">南港聯絡道</option>
      <option value="m4">國道4號</option>
      <option value="m5">國道5號</option>
      <option value="m6">國道6號</option>
      <option value='m8'>國道8號</option>
      <option value="m10">國道10號</option>
      <option value="e62">快速公路62號</option>
      <option value="e64">快速公路64號</option>
      <option value="e66">快速公路66號</option>
      <option value="e68">快速公路68號</option>
      <option value="e72">快速公路72號</option>
      <option value="e74">快速公路74號</option>
      <option value="e76">快速公路76號</option>
      <option value="e78">快速公路78號</option>
      <option value="e82">快速公路82號</option>
      <option value="e84">快速公路84號</option>
      <option value="e86">快速公路86號</option>
      <option value="e88">快速公路88號</option>
    </select>
  );
}


export default class App extends Component {
  constructor(props){
    super(props);

    this.state = ({
      isLoading: false,
      trafficData: null
    });
  }


  setTrafficData = trafficData => {
    this.setState({
      trafficData
    });
  }

  
  /**
   * Do the actual job that query data from the RTSM API service.
   * 
   * This function will use fetch api to query data from the RTSM API service.
   * The response data will save in the App state.
   * @param {number} viewOffset
   */
  doSubmit = ({viewOffset = null} = {}) => {
    if(this.state.isLoading){
      return;
    }
    this.setState({
      isLoading: true
    });
        
    const url = 'https://rtsmapi.royvbtw.uk/data/' + mid;

    fetch(url).then( res => 
      res.json()
    ).then( json => {
      this.setTrafficData(json);
      this.setState({
        isLoading: false
      });

      // scroll view to table or specified position
      const scrollerOpts = {
        duration: 800,
        delay: 100,
        smooth: true
      };
      if(viewOffset){
        //scroller.scrollTo(viewOffset, scrollerOpts);
      }else{
        scroller.scrollTo('tableAnchor', scrollerOpts);
      }
    });
  }

  
  /**
   * Refresh page with cached mid.
   */
  refreshPage = () => {
    const viewOffset = window.scrollY;
    this.doSubmit({viewOffset});
  }
  

  // A wrapper function for doSubmit()
  shortcut = argMid => {
    if(argMid){
      mid = argMid;
      this.doSubmit();
    }
  }
  
  render() {
    return (
      <div className="App">
        {(this.state.isLoading) && (<div id='spinner'></div>)}
        
        <div className="menu-container">
          <div className="main-block">
            <div className='tile app-title'>國道速度資訊RTSM</div>
            <div className="tile block-motorway-label">選擇國道</div>
            <MotorwayMenu />
            <BtnSearch isLoading={this.state.isLoading} onSubmit={this.doSubmit} />
          </div>

          <div className='shortcut-block'>
            <div className="tile-shortcut bg-pink" onClick={e => this.shortcut('m1')}>
              M1<br/>國道1號
            </div>
            <div className="tile-shortcut bg-darkpink" onClick={e => this.shortcut('m3')}>
              M3<br/>國道3號
            </div>
            <div className="tile-shortcut bg-orange" onClick={e => this.shortcut('m5')}>
              M5<br/>國道5號
            </div>
            <Demo />
          </div>
        </div>

        <Element name='tableAnchor'></Element>
        <TrafficTable data={this.state.trafficData} />
        <Footer />
        <div id='btnRefresh' onClick={this.refreshPage}>
          {(this.state.isLoading)? 'loading': 'Refresh'}
        </div>
      </div>
    );
  }
}
