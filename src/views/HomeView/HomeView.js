import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import bahamas from '../../config/FormInformation/bahamas.json';


export default class HomeView extends Component {
  constructor() {
    super();
    // temporary solution while it's not dynamic
    this.state = {
      changeCell1: true,
      changeCell2: true,
      changeCell3: true,
      changeCell4: true,
      changeCell5: true,
      changeCell6: true,
      changeCell7: true,
      changeCell8: true,
      changeCell9: true,
      changeCell10: true,
      changeCell11: true,
      changeCell12: true,
      changeCell13: true,
      changeCell14: true,
    }
    // bind this to this.handleClick
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
    this.handleClick6 = this.handleClick6.bind(this);
    this.handleClick7 = this.handleClick7.bind(this);
    this.handleClick8 = this.handleClick8.bind(this);
    this.handleClick9 = this.handleClick9.bind(this);
    this.handleClick10 = this.handleClick10.bind(this);
    this.handleClick11 = this.handleClick11.bind(this);
    this.handleClick12 = this.handleClick12.bind(this);
    this.handleClick13 = this.handleClick13.bind(this);
    this.handleClick14 = this.handleClick14.bind(this);

  }
// highlight buttons

  // Question 1
  handleClick1(){if(document.getElementById("button1")){this.setState({ changeCell1:!this.state.changeCell1 }),this.setState({ changeCell2:true})}}
  handleClick2(){if(document.getElementById("button2")){this.setState({ changeCell2:!this.state.changeCell2 }),this.setState({ changeCell1:true})}}
  // Question 4
  handleClick3(){if(document.getElementById("button3")){this.setState({ changeCell3:!this.state.changeCell3 }),this.setState({ changeCell4:true}),this.setState({ changeCell5:true})}}
  handleClick4(){if(document.getElementById("button4")){this.setState({ changeCell4:!this.state.changeCell4 }),this.setState({ changeCell3:true}),this.setState({ changeCell5:true})}}
  handleClick5(){if(document.getElementById("button5")){this.setState({ changeCell5:!this.state.changeCell5 }),this.setState({ changeCell3:true}),this.setState({ changeCell4:true})}}
 // question 5
  handleClick6(){if(document.getElementById("button6")){this.setState({ changeCell6:!this.state.changeCell6 }),this.setState({ changeCell7:true}),this.setState({ changeCell8:true})}}
  handleClick7(){if(document.getElementById("button7")){this.setState({ changeCell7:!this.state.changeCell7 }),this.setState({ changeCell6:true}),this.setState({ changeCell8:true})}}
  handleClick8(){if(document.getElementById("button8")){this.setState({ changeCell8:!this.state.changeCell8 }),this.setState({ changeCell6:true}),this.setState({ changeCell7:true})}}
 // question 6
  handleClick9(){if(document.getElementById("button9")){this.setState({ changeCell9:!this.state.changeCell9 }),this.setState({ changeCell10:true}),this.setState({ changeCell11:true})}}
  handleClick10(){if(document.getElementById("button10")){this.setState({ changeCell10:!this.state.changeCell10 }),this.setState({ changeCell9:true}),this.setState({ changeCell11:true})}}
  handleClick11(){if(document.getElementById("button11")){this.setState({ changeCell11:!this.state.changeCell11 }),this.setState({ changeCell9:true}),this.setState({ changeCell10:true})}}
 // question 7
  handleClick12(){if(document.getElementById("button12")){this.setState({ changeCell12:!this.state.changeCell12 }),this.setState({ changeCell13:true}),this.setState({ changeCell14:true})}}
  handleClick13(){if(document.getElementById("button13")){this.setState({ changeCell13:!this.state.changeCell13 }),this.setState({ changeCell12:true}),this.setState({ changeCell14:true})}}
  handleClick14(){if(document.getElementById("button14")){this.setState({ changeCell14:!this.state.changeCell14 }),this.setState({ changeCell12:true}),this.setState({ changeCell13:true})}}


  render() {
    console.log(this.state.changeCell1)
    return (
      <div className="Main">
        <div className="homeContainer">
          <div className="container">
            <div className="header"/>
            <div className="content-calculator">
              <h1>{bahamas.form.title}</h1>
              <h2>{bahamas.form.subTitle}</h2>
              {/* Scroll area */ }
              <Scrollbars
                autoHeight
                autoHeightMax={550}
                renderView={(props) => <div {...props} className="view" />}
                renderTrackVertical={(props) => <div {...props} className="vtrack" />}
                renderThumbVertical={(props) => <div {...props} className="vthumb" />}
              >
                {/* Timeline */ }
                <div className="timeline">
                  {/* START Timeline Items */ }
                  <div className="timeline-items"> 
                    {/* Question 1 */ }
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].one.title}</h3>
                        </div>
                        <div className="cell-item">
                          <div id="button1" className={this.state.changeCell1 ? "cellOneEnabled": "cellOneDisabled"}>
                            <a onClick={this.handleClick1}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-1-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].one.options[0].date}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button2" className={this.state.changeCell2 ? "cellTwoEnabled": "cellTwoDisabled"}>
                            <a onClick={this.handleClick2}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-2-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].one.options[1].date}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    {/* Timeline Item (2) */ }
                    {/* Timeline Item (dropdown) */ }
                    <div className="timeline-item">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].two.title}</h3>
                        </div>
                        <div className="dropdown">
                          <select name="nights" id="nights" className="dropdown-select">
                            <option value="1">{bahamas.form.items[0].two.options[0].nights[0].one.text}</option>
                            <option value="2">{bahamas.form.items[0].two.options[0].nights[0].two.text}</option>
                            <option value="3">{bahamas.form.items[0].two.options[0].nights[0].three.text}</option>
                            <option value="4">{bahamas.form.items[0].two.options[0].nights[0].four.text}</option>
                            <option value="5">{bahamas.form.items[0].two.options[0].nights[0].five.text}</option>
                            <option value="6">{bahamas.form.items[0].two.options[0].nights[0].six.text}</option>
                            <option value="7">{bahamas.form.items[0].two.options[0].nights[0].seven.text}</option>
                            <option value="8">{bahamas.form.items[0].two.options[0].nights[0].eight.text}</option>
                            <option value="9">{bahamas.form.items[0].two.options[0].nights[0].nine.text}</option>
                            <option value="10">{bahamas.form.items[0].two.options[0].nights[0].ten.text}</option>
                            <option value="11">{bahamas.form.items[0].two.options[0].nights[0].eleven.text}</option>
                            <option value="12">{bahamas.form.items[0].two.options[0].nights[0].twelve.text}</option>
                            <option value="13">{bahamas.form.items[0].two.options[0].nights[0].thirteen.text}</option>
                            <option value="14">{bahamas.form.items[0].two.options[0].nights[0].fourteen.text}</option>
                            <option value="21">{bahamas.form.items[0].two.options[0].nights[0].threeWeeks.text}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Timeline Item (3) */ }
                    {/* Timeline Item (dropdown) */ }
                    <div className="timeline-item">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].three.title}</h3>
                        </div>
                        <div className="dropdown-people">
                          <select name="rooms" id="rooms" className="dropdown-select">
                            <option value="1">{bahamas.form.items[0].three.people[0].one.text}</option>
                            <option value="2">{bahamas.form.items[0].three.people[0].two.text}</option>
                            <option value="3">{bahamas.form.items[0].three.people[0].three.text}</option>
                            <option value="4">{bahamas.form.items[0].three.people[0].four.text}</option>
                            <option value="5">{bahamas.form.items[0].three.people[0].five.text}</option>
                            <option value="6">{bahamas.form.items[0].three.people[0].six.text}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Timeline Item (4) */ }
                    {/* Timeline Item (dropdown) */ }
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].four.title}</h3>
                        </div>
                        <div className="cell-item">
                          <div id="button3" className={this.state.changeCell3 ? "cellThreeEnabled": "cellThreeDisabled"}>
                            <a onClick={this.handleClick3}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-3-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].four.stars}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button4" className={this.state.changeCell4 ? "cellFourEnabled": "cellFourDisabled"}>
                            <a onClick={this.handleClick4}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-4-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].four.stars}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div id="button5" className="cell-item">
                          <div className={this.state.changeCell5 ? "cellFiveEnabled": "cellFiveDisabled"}>
                            <a onClick={this.handleClick5}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-5-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].four.stars}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].five.title}</h3>
                        </div>
                        <div className="cell-item">
                          <div id="button6" className={this.state.changeCell6 ? "cellSixEnabled": "cellSixDisabled"}>
                            <a onClick={this.handleClick6}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-6-image"/>                                
                                  </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].five.options[0].one.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button7" className={this.state.changeCell7 ? "cellSevenEnabled": "cellSevenDisabled"}>
                            <a onClick={this.handleClick7}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-7-image"/>                                
                                  </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].five.options[0].two.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button8" className={this.state.changeCell8 ? "cellEightEnabled": "cellEightDisabled"}>
                            <a onClick={this.handleClick8}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-8-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].five.options[0].three.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].six.title}</h3>
                        </div>
                        <div className="cell-item">
                          <div id="button9" className={this.state.changeCell9 ? "cellNineEnabled": "cellNineDisabled"}>
                            <a onClick={this.handleClick9}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-9-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].six.options[0].one.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button10" className={this.state.changeCell10 ? "cellTenEnabled": "cellTenDisabled"}>
                            <a onClick={this.handleClick10}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-10-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].six.options[0].two.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button11" className={this.state.changeCell11 ? "cellElevenEnabled": "cellElevenDisabled"}>
                            <a onClick={this.handleClick11}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-11-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].six.options[0].three.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].seven.title}</h3>
                        </div>
                        <div className="cell-item">
                          <div id="button12" className={this.state.changeCell12 ? "cellTwelveEnabled": "cellTwelveDisabled"}>
                            <a onClick={this.handleClick12}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-12-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].seven.options[0].three.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button13" className={this.state.changeCell13 ? "cellThirteenEnabled": "cellThirteenDisabled"}>
                            <a onClick={this.handleClick13}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-13-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].seven.options[0].three.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="cell-item">
                          <div id="button14" className={this.state.changeCell14 ? "cellFourteenEnabled": "cellFourteenDisabled"}>
                            <a onClick={this.handleClick14}>
                              <div className="cell-select">
                                <div className="cell-icon" style={{ paddingLeft: '0px', paddingTop: '3px'}}>
                                  <div className="cell-icon-14-image"/>
                                </div>
                                <div className="cell-text">
                                  <p>{bahamas.form.items[0].seven.options[0].three.text}</p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" name="share" id="share"/>
                    <input id="textFieldID" type="hidden" value="TextValue"/>
                    {/* Comparison */ }
                    <div className="timeline-item-cell">
                      <div className="timeline-dot">
                        <div className="timeline-inner-dot"/>
                      </div>
                      <div className="timeline-item-content">
                        <div className="timeline-title">
                          <h3>{bahamas.form.items[0].eight.title}</h3>
                        </div>
                        <div id="breezes-price">
                          <p>$...</p>
                          <div id="breezes-sub-info">
                            <p>Breezes, for .. nights, .. persons (all inclusive)</p>
                          </div>
                        </div>
                        <div id="other-hotel">
                          <p>$...</p>
                          <div id="hotel-sub-info">
                            <p>Hotel X, for .. nights, .. persons</p>
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div> {/* timeline items */}
                </div> {/* END Timeline */ }
              </Scrollbars>{/* END Scroll area */ }
            </div> {/* content-calculator */}
          </div> {/* container */}
        </div> {/* homeContainer*/}
      </div>
    );
  }
}