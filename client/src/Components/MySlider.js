import React from 'react';
import Slider from 'rc-slider';
import store from '../index';
import {connect} from 'react-redux';
import 'rc-slider/assets/index.css';
import axios from 'axios';
class MySlider extends React.Component {

  Range = Slider.createSliderWithTooltip(Slider.Range);

  handleOnRelease = (values) => {
    //In the future push the values to the redux state so that the page can be
    //Rerendered with the correct information -> try to connect with remote server to pull more information
    store.dispatch({type: "SLIDER_VAL",
                    name: this.props.name,
                    values: values,
                    });
    store.dispatch({type: "LOAD_LISTINGS",
                    loadListings: false,
                    });
    //Send axios request to refresh search for houses on page based on redux filter vals
    let req = this.props.sliderVal
    //Update certain vals in request to reflect correct query
    req[this.props.name] = values;
    //Gets a list that is then used to replace the list here
    axios.post(`http://localhost:5000/listings`, req )
      .then(res => {
        console.log(res.data)
        if (typeof(res.data) !== "string")
        {
          store.dispatch({type: "CURR_LISTINGS",
                          listings: res.data,
                          });
        }
        else
        {
          console.log("There is nothing")
          console.log(res.data);
        }
        setTimeout(()=>{store.dispatch({type: "LOAD_LISTINGS",
                                loadListings: true,
                                });
                        this.forceUpdate()},1000);
      })
  }

  render()
  {
    return(
      <div className="customSlider">
        <h6>{this.props.name}</h6>
        <this.Range  min={this.props.min} max={this.props.max}
                defaultValue={this.props.defaultValue}
                marks= {this.props.marks}
                onAfterChange={(value) => this.handleOnRelease(value)}
                tipFormatter={value => `${this.props.prefix?this.props.prefix:""}
                ${value}
                ${this.props.suffix?this.props.suffix:""}`}/>
      </div>
    )
  }

  componentWillMount()
  {
    //On first mount, update the values to be the current values, else just wait for
    //handleOnRelease to handle the value changes

  }
}
const mapStateToProps = state => {
  return {
    sliderVal: state.sliderVal,
  }
}

MySlider = connect(mapStateToProps)(MySlider);


export default MySlider;
