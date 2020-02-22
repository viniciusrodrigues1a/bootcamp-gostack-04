import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  state = {
    techs: [],
    newTech: '',
  }

  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { techs } = this.state;
    if (prevState.state !== techs) {
      localStorage.setItem('techs', JSON.stringify(techs));
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { techs, newTech } = this.state;
    this.setState({ 
      techs: [...techs, newTech],
      newTech: '',
    });
  }

  handleDelete = (tech, index) => {
    const { techs } = this.state;
    this.setState({ techs: techs.filter((t, i) => t !== tech || i !== index) });
  }
  
  render() {
    const { techs, newTech } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {techs.map((tech, index) => (
            <TechItem 
              key={`${tech}-${index}`} 
              tech={tech} 
              onDelete={() => this.handleDelete(tech, index)} 
            />
          ))}
        </ul>
        <input 
          type="text" 
          onChange={this.handleInputChange} 
          value={newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList
