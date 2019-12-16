import { html } from 'lit-html';
import { Component } from './Component';
import axios from 'axios';


/**
 * The app component is the global source of data. It handles all of the i/o
 * operations and passes data down to it's children to be rendered.
 */
export class AppComponent extends Component {
  template (data) {
    return html`
      <nav class="appbar appbar-primary">
        <div class="padded">
          <a class="appbar-link" href="#">App Bar</a>
        </div>
      </nav>
      <div id="sidebar" class="sidebar sidebar-primary"></div>
      <div id="content" ></div>
    `;
  }

  events () {
    return [
      {type: 'name-change', selector: '#root', handler: this.updateUser}
    ]
  }

  async updateUser (e) {
    console.log(e);
    const rid = e.detail.id;
    const userData = await this.fetchUserData(rid);
    this.update({name: userData.data.data.first_name});
  }

  async fetchUserData (id) {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}

