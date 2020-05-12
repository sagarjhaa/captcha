import React,{Component} from 'react';
import '../src/image.css';

class Image extends Component{
  constructor(props){
    super(props);
    this.state = {
      isSelected : false
    }
  }
  handleClick(e){
    var isSelected = !this.state.isSelected;
    this.setState({isSelected: isSelected});
    this.props.click();
  }

  render(){
    var {isSelected} = this.state;
    return (
      <div className={`${isSelected ? "disabled" :""}` } >
      <img onClick={(e) => this.handleClick(e)} 
      className={`box ${isSelected ? "selected" :""}` } 
      src={this.props.url} width='150px' height='150px'/>
      </div>
    )
  }

  
}

export default Image;