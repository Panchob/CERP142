import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_AS_ASCII'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:61785@localhost:5432/CERP142_dev?client_encoding=UTF8'
db = SQLAlchemy(app)
CORS(app)


class Section(db.Model):
  __tablename__ = 'sections'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  recommendations = db.relationship("Recommendation")

  def format(self):
      return {
          'id': self.id,
          'name': self.name
        }

class Recommendation(db.Model):
  __tablename__ = 'recommendations'
  # TODO: change last 3 columns by one with status as a string.
  id = db.Column(db.Integer, primary_key=True)
  section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
  text = db.Column(db.String)
  number = db.Column(db.Integer)
  ongoing = db.Column(db.Boolean)
  unsure = db.Column(db.Boolean)
  done = db.Column(db.Boolean)

  def format(self):
      return {
          'id': self.id,
          'section_id':  self.section_id,
          'text': self.text,
          'number': self.number,
          'ongoing': self.ongoing,
          'unsure': self.unsure,
          'done': self.done
      }

db.create_all()

@app.route('/sections')
def fetch_sections():
    selection = Section.query.join(Recommendation).all()
    res = []
    for s in selection:
        dic = {'name': s.name}
        dic['recommendations'] = []
        for r in s.recommendations:
            reco = {
                'number': r.number,
                'done': r.done,
                'ongoing': r.ongoing,
                'unsure': r.unsure,
                'text': r.text
            }
            dic['recommendations'].append(reco)

        dic['recommendations'] = sorted(dic["recommendations"], key=lambda x: x['number'])
        res.append(dic)

    return jsonify({
        'success': True,
        'sections': res
    })

@app.route('/recommendations/done')
def fetch_done():
    selection = Recommendation.query.filter(Recommendation.done == True).all()
    recommendations = [recommendation.format() for recommendation in selection]

    return jsonify({
        'success': True,
        'recommendations': recommendations
    })

@app.route('/recommendations/ongoing')
def fetch_ongoing():
    selection = Recommendation.query.filter(Recommendation.ongoing == True).all()
    recommendations = [recommendation.format() for recommendation in selection]

    return jsonify({
        'success': True,
        'recommendations': recommendations
    })

@app.route('/recommendations/notStarted')
def fetch_notStarted():
    selection = Recommendation.query.filter(Recommendation.ongoing == False and Recommendation.done == False).all()
    recommendations = [recommendation.format() for recommendation in selection]

    return jsonify({
        'success': True,
        'recommendations': recommendations
    })



if __name__ == "__main__":
    app.run()