import React, { Component } from "react"
import ongoingLogo from "../style/images/CERP142_Logo_EnCours.svg"
import notStartedLogo from "../style/images/CERP142_Logo_EnAttente.svg"
import doneLogo from "../style/images/CERP142_Logo_Completees.svg"
import unsureLogo from "../style/images/CERP142_Logo_PasVraimentEnCours.svg"


export class Stats extends Component {
  constructor()
  {
    super()
    this.state = {
      statuses: ["notStarted", "ongoing", "unsure", "done"],
    }
  }

  textRenderer(status) {
    const parser = {
      "ongoing": "EN COURS",
      "done": "COMPLÉTÉES",
      "unsure": "PAS VRAIMENT EN COURS*",
      "notStarted": "EN ATTENTE"
    }

    return parser[status]
  }

  pictureRenderer(status) {
    const parser = {
      "ongoing": ongoingLogo,
      "done": doneLogo,
      "unsure": unsureLogo,
      "notStarted": notStartedLogo
    }

    return parser[status]
  }

  render() {

    return(
      <section className="stats-banner">
        <div className="stats">
          {this.state.statuses.map((s) => {
            return(
              <div key={s} className="stat-card">
                <img src={this.pictureRenderer(s)} alt={`${s}Logo`}/>
                <strong>{this.props.stats[s]}</strong>
                <p>{this.textRenderer(s)}</p>
              </div>
            )
          })}
        </div>
    </section>
    )
  }
}