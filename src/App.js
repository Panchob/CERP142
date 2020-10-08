import React, { Component } from 'react';
import './style/App.scss';
import {sections} from './data/recommandations.json'
import { Hamburger } from './Components/Hamburger';

export default class App extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false
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

  handleHamClick = () => {
    this.setState({open: !this.state.open})
  }

  render () {
    return (
      <div className="App">
        <div id="side" className={`sidebar ${this.state.open ? "opens" : ""}`}>
          <div className="section-links">
            {sections.map((s, i) => {
              return(
                <a href={`#section${i}`} key={s.nom}>{s.nom}</a>
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
            <div className="stats-grid">
              <div className="stats-card">
                <h1>Pas commencé</h1>
                <h1>93</h1>
              </div>
              <div className="stats-card">
                <h1>En cours</h1>
                <h1>30</h1>
              </div>
              <div className="stats-card">
                <h1>Terminé</h1>
                <h1>3</h1>
              </div>
            </div>
          </section>
          <section className="sections-wrapper">
            {sections.map((s, i) => {
              return(
                <div className="recommendations-wrapper" key={s.nom}>
                  <h1 id={`section${i}`}className="section-title">
                    {s.nom}
                  </h1>
                  {s.recommandations.map((r) => {
                    return (
                      <div key={r.no} className="recommendation-card">
                        <h3>APPEL À L'ACTION {r.no}</h3>
                        <p>{r.texte}</p>
                        {this.displayList(r)}
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
