import React, { Component } from 'react';
import './style/App.scss';
import { Hamburger } from './components/Hamburger';
import { Link } from 'react-router-dom';

export default class App extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
      isLoading: false
    }

    this.handleHamClick = this.handleHamClick.bind(this)
  }

  displayList = (recommandation) => {
    
    if (recommandation.liste !== undefined) {
      return(
        <ul>
            { recommandation.liste.map((message, index) => {
              return(
                <li key={index}>{message}</li>
              )
          })}
        </ul>

      )
    }
  }

  dateSinceRemission = () => {
    let today = new Date();
    const remission = new Date("09/30/2019")

    const diffInTime = today.getTime() - remission.getTime();

    return( parseInt(diffInTime / (1000 * 3660 * 24)))
  }

  cardClass = (r) => {
    let response = ""
    if(r.done) {
      response = "done";
    } else if (r.ongoing){
      response = "ongoing";
    } else {
      response = "not-started";
    }

    return response;

  }

  handleHamClick = () => {
    this.setState({open: !this.state.open})
  }

  componentDidMount() {

    this.setState({isLoading:true})
    fetch(`http://localhost:5000/sections`)
      .then((res) => res.json())
      .then((data) => this.setState({sections: data.sections, isLoading: false}))

  }

  render () {

    if(this.state.isLoading || this.state.sections === undefined) {
      return(
        <h1>LOADING...</h1>
      )
    }

    const sections = this.state.sections;
    console.log(this.state.sections)
    return (
      <div className="App">
        <div id="side" className={`sidebar ${this.state.open ? "opens" : ""}`}>
          <div className="section-links">
            {sections.map((s, i) => {
              return(
                <a href={`#section${i}`} key={i}>{s.name}</a>
              )
            })}
          </div>
        </div>
        <main id="main" className={this.state.open ? "sidebar-open": ""}>
          <Hamburger handleHamClick={() => this.handleHamClick()}/>
          <section className="mission">
            <h1>CERP142</h1>
          </section>
          <section className="stats-wrapper">
            <h1>Nombre de jours depuis la remise du rapport: {this.dateSinceRemission()}</h1>
            <div className="stats-grid">
              <div className="stats-card not-started">
                <h1>Pas commencé</h1>
                <h1>99</h1>
              </div>
              <div className="stats-card ongoing">
                <h1>En cours</h1>
                <h1>40</h1>
              </div>
              <div className="stats-card done">
                <Link to={{
                  pathname:"status",
                  state: {status: "done"}
                }} >Complétées</Link>
                <h1>3</h1>
              </div>
            </div>
          </section>
          <section className="sections-wrapper">
            {sections.map((s, i) => {
              return(
                <div className="recommendations-wrapper" key={s.name}>
                  <h1 id={`section${i}`}className="section-title">
                    {s.name}
                  </h1>
                  {s.recommendations.map((r) => {
                    return (
                      <div key={r.number} className={`recommendation-card ${this.cardClass(r)}`}>
                        <h3>APPEL À L'ACTION {r.number}</h3>
                        <p>{r.text}</p>
                       
                    </div>
                  )
                })}
                </div>
              )
            })}
          </section>
        </main>
      </div>
    );
  }

}
