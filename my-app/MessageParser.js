import axios from "axios";
import React from "react";
class MessageParser extends React.Component {
    constructor(actionProvider, state) {
        super()
      this.actionProvider = actionProvider;
      this.state = state;
      this.state = {... this.state ,reply:""}
    }
    componentDidMount(){
        this.clickMe = this.clickMe.bind(this);
      }
      clickMe (answer) {
        this.setState({
          reply: answer
        })
       }
  
    parse(message) {
        const jsons = {msg : message}
      axios.post(`http://localhost:8080/msg`,jsons).then(({data}) => {
          this.state.reply = data;
          this.actionProvider.getAnswer(this.state.reply);
      })
      
    }
  }
  export default MessageParser;