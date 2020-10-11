import React, { Component } from 'react';

export class SameStatus extends Component {
  constructor(props) {
    super()
    this.state = {
      recommendations: [],
      status: props.location.state.status,
      isLoading: true
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`https://cerp142-api.herokuapp.com/recommendations/${this.state.status}`)
      .then((response) => response.json())
      .then((data) => this.setState({recommendations: data.recommendations}))
    
    this.setState({isLoading: false})
    
  }

  statusTitle() {
    const status = this.state.status
    if(status === "done") {
      return("TERMINÉES")
    
    } else if(status === "ongoing")
    {
      return("EN COURS")
    } else {
      return("PAS COMMENCÉES")
    }
  }

  render() {

    if (this.state.isLoading) {
      return(
        <div className="App">
          LOADING...
        </div>
      )
    }
    
    console.log(this.state.recommendations)
    return(
      <div className="sections-wrapper">
        <h1>ACTIONS {this.statusTitle()}</h1>
        <div className="recommendations-wrapper">
          {this.state.recommendations.map((r) => {
            return (
              <div key={r.number} className={`recommendation-card`}>
                <h3>APPEL À L'ACTION {r.number}</h3>
                <p>{r.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

