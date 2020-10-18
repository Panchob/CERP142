import React, { Component } from 'react';
import './style/App.scss';
import { Hamburger } from './components/Hamburger';
import { Stats } from './components/Stats';

import logoHeader from "./style/images/CERP142_LogoHeader.svg"
import logoMain from "./style/images/CERP142_LogoPrincipal.svg"
import logoAPropos from "./style/images/CERP142_APropos.svg"
import logoAppels from "./style/images/CERP142_AppelsAction.svg"


export default class App extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
      isLoading: false,
      stats: {},
      popup:false,
      sections: []
    }

    this.handleHamClick = this.handleHamClick.bind(this)
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

  async fetchData() {
    fetch(`https://cerp142-api.herokuapp.com/sections`)
      .then((res) => res.json())
      .then((data) => this.setState({sections: data.sections}))

    fetch(`https://cerp142-api.herokuapp.com/stats`)
      .then((res) => res.json())
      .then((data) => this.setState({stats: data.stats}))
  }

  componentDidMount() {

    this.setState({isLoading:true})
    this.fetchData()
      .then(() => this.setState({isLoading: false}))
  }


  togglePop = () => {
    this.setState({
      popup: !this.state.popup
    })
  }

  render () {

    if(this.state.isLoading) {
      return(
        <h1>LOADING...</h1>
      )
    }

    const sections = this.state.sections;
    const stats = this.state.stats;
    
    return (
      <div className="App grid">
        <div id="side" className={`sidebar ${this.state.open ? "opens" : ""}`}>
          <div className="section-links">
            <a href="#Apropos">À propos</a>
            <div className="line"></div>
            {sections.map((s, i) => {
              return(
                <a href={`#section${i}`} key={i}>{s.name}</a>
              )
            })}
            <div className="line"></div>
          </div>
        </div>
        <div className="banner">
          <img className="logo-header" src={logoHeader} alt="logoHeader"/>
          <img className="logo-main" src={logoMain} alt="logoMain"/>
        </div>
        <Hamburger handleHamClick={() => this.handleHamClick()}/>
        <section id="Apropos" className="a-propos">
          <img className="logo-a-propos" src={logoAPropos} alt="logoAPropos"></img>
          <p>
            En tant que regroupement formé d’anciens membres de l’équipe de la Commission d’enquête sur les relations entre les Autochtones et certains services
            publics (commission Viens), nous appelons fermement le gouvernement du Québec à véritablement mettre en œuvre les 142 appels à l'action énoncés dans ce rapport 
            déposé le 30 septembre 2019.
            <br/>
            <br/>
            Dans son rapport, le commissaire Viens affirme que « de nombreuses lois, politiques, normes ou pratiques institutionnelles 
            en place sont source de discrimination et d’iniquité au point d’entacher sérieusement la qualité des services offerts aux Premières Nations et aux Inuits ». 
            Cela l’amène à conclure qu’il lui semble « impossible de nier la discrimination systémique dont sont victimes les membres des Premières Nations et les Inuits ». 
            <br/>
            <br/>
            Nous sommes loin du bilan positif évoqué par le gouvernement même en interprétant de manière très généreuse les appels à l’action qui auraient pu être simplement 
            « mis en chantier » de manière préliminaire.
            <br/>
            <br/>
            En attendant la mise en place d’un mécanisme de suivi indépendant pour s’assurer de la mise en œuvre du rapport, tel que le propose l’appel à l’action 138, 
            nous avons décidé de mettre sur pieds bénévolement ce site web qui servira temporairement de guide de référence quant aux actions prises par le gouvernement du Québec.
            <br/>
            <br/>
            Please note that an English version of this website will follow.
          </p>
        </section>
        <div id="floater" className="side-image"></div>
        <div className="total-text">
          <p>NOMBRE DE JOURS DEPUIS LA REMISE DU RAPPORT</p>
        </div>
        <div className="total">
          <h1>{this.dateSinceRemission()}</h1>
        </div>
        <Stats stats={stats}/>
        <small className="note">* Selon nos sources</small>
        <main className="recommendations">
          <img className="logo-appels" src={logoAppels} alt="logoAppels"></img>
          {sections.map((s, i) => {
            return(
              <div key={i}>
                <h1 id={`section${i}`}className="section-title">{s.name}</h1>
                {s.recommendations.map((r) => {
                  return(
                    <div key={r.number} className="r-card">
                      <div className={`circle ${r.status}`}></div>
                      <div className="small-line"></div>
                      <p className="r-card-title">{`${r.number}.`}</p>
                      <p className="r-card-text">{r.text}</p>
                      <br></br>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </main>
        <footer/>
      </div>
    );
  }
}
