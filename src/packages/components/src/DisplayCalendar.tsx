import React, { Component } from "react";
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    Modal, 
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity
     } from "react-native";
import Calendar from "./Calendar";
import { PRIMARY } from "./constants";
import { PRIMARY_COLOR, TEXT_COLOR } from "../../blocks/landingpage/src/assets";

interface Props {
  isFullWidth?: boolean;
  dropdownStyle?: any;
  children: any;
  setSelectedDay?: (date: string) => void;
  selectedDate: string;
  onDayPress?: (date: string) => void;
  markedDates?: any;
  onClose?: () => void;
  minDate?: any;
  shouldCloseCalendar?: ()=>'no' | 'yes';
}

interface State {
    showDropdown:boolean;
}

export default class DisplayCalendar extends Component<Props, State> {
    constructor(props:any){
        super(props);
        this._button = null;
        this._buttonFrame = null;
        this.state = {
            showDropdown:false,
        };
    }
  _buttonFrame: any;
  _button:any;
  _calcPosition() {
    const { dropdownStyle } = this.props;
    const dimensions = Dimensions.get("window");
    const windowWidth = dimensions.width;
    const windowHeight = dimensions.height;
    const dropdownHeight =
      dropdownStyle && StyleSheet.flatten(dropdownStyle).height;
    const bottomSpace =
      windowHeight - this._buttonFrame.y - this._buttonFrame.h;
    const rightSpace = windowWidth - this._buttonFrame.x;
    const showInBottom =
      bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
    const showInLeft = rightSpace >= this._buttonFrame.x;
    const positionStyle: any = {
      height: dropdownHeight,
      top: showInBottom
        ? this._buttonFrame.y + this._buttonFrame.h
        : Math.max(0, this._buttonFrame.y - dropdownHeight),
    };
    return positionStyle;
  }


  show() {    
    this._updatePosition(() => {
      this.setState({
        showDropdown: true,
      });
    });
  }
  _updatePosition(callback:any) {
    if (this?._button?.measure && callback) {
      this._button.measure((_:any, __:any, width:any, height:any, px:any, py:any) => {
        this._buttonFrame = {
          x: px,
          y: py,
          w: width,
          h: height,
        };
        callback();
      });
    }
  }
  _onButtonPress(){
    this.show()
  }
  _renderModal(){
    const position = this._calcPosition();
    const markedDate:any = {}
    markedDate[this.props.selectedDate]={ color: PRIMARY_COLOR, textColor: TEXT_COLOR } 
    return (
    <Modal transparent visible>
        <TouchableWithoutFeedback onPress={() => {
          if (this.props.shouldCloseCalendar && this.props.shouldCloseCalendar() === 'no') {
            return;
          }
          if (this.props.onClose) {
            this.props.onClose()
          }
          this.setState({ showDropdown: false })
        }} style={{ flex: 1 }}>
            <View style={{flex:1}}>
                <View style={{position:"absolute",...position,width:'100%',paddingHorizontal:20}}>
                    <TouchableHighlight >
                <Calendar
                  markedDate={this.props.markedDates ? this.props.markedDates : markedDate}
                  minDate={this.props.minDate}
                  onDayPress={(date) => {
                    if (this.props.onDayPress) {
                      this.props.onDayPress(date);
                      return
                    }
                    if (this.props.setSelectedDay) {
                      this.props.setSelectedDay(date);
                    }
                    this.setState({showDropdown:false})
                  }} />
                    </TouchableHighlight>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>)
  }
  render() {
    
    return (<>
    <TouchableOpacity
    ref={(button) => (this._button = button)}>
        {this.props.children}
    </TouchableOpacity>
    {this.state.showDropdown && this._renderModal()}
    </>)
  }
}
