import { html } from 'lit-html'
import { Component } from './Component';
import axios from 'axios';


export class ContentComponent extends Component {
  template (data) {
    return html`
      <h1>Hello ${data.name}</h1>
      <button id="button1" type="button">Click Me!</button>
    `;
  }

  events () {return [
      {type: 'click', selector: '#button1', handler: () => this.updateUser() },
  ]}

  async updateUser () {
    const userData = await this.fetchUserData(2);
    this.update({name: userData.data.data.first_name});
  }

  async fetchUserData (id) {
    try {
      const response = await axios.get(`https://reqres.in/api/users/2`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

