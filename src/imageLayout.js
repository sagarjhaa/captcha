import React,{Component} from 'react';
import '../src/imageLayout.css';
import Image from './image';
import {checkImage} from './services';

class ImageLayout extends Component{
  constructor(props){
    super(props);
    this.state = {
      imageUrl:[],
      chance:3,
      totalImages:6,
      urls:[]
    }
    this.generateTable = this.generateTable.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  componentDidMount(){
    this.generateTable();
  }

  async handleCheckImage(url){
    var r = await checkImage(url);
    if(!r){
      var count = this.state.chance -1;
      if (count > 0){
        this.setState({chance:count});
      }
      if(count === 0){
        this.generateTable();
      }
    }
    else{
      alert('Yah!!!! you selected pie');
      this.generateTable();
    }
  }

  async getImages(index) {
    var promise = await fetch('https://xtima6ctq9.execute-api.us-east-1.amazonaws.com/dev');
    var response = await promise.json();
    let url = response.imageUrl;
    
    if (this.state.urls.includes(url)){
      console.log('exists');
      this.getImages(index)
    }
    else{
      let image = <Image url={url} click={() => this.handleCheckImage(url)} key={index}/>;
      this.setState({imageUrl:[...this.state.imageUrl,image],urls:[...this.state.urls,url]})
    }
    
  }

  generateTable(){
    this.setState({imageUrl:[],urls:[]});
    for(let i=0;i<this.state.totalImages;i++){
      this.getImages(i);
    }
  }

  render(){
    return (
      <div>
        <h1>Select a pie</h1>
        <h3>{this.state.chance} <span className='small'>chance left</span></h3>
      <div className='wrapper'>
        {this.state.imageUrl}
      </div>
      <button className='btn' onClick={this.generateTable}>Refresh</button>
      </div>
    )
  }

  
}

export default ImageLayout;