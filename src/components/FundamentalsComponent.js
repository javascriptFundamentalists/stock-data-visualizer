import { html } from 'lit-html';
import { getCompaniesData, getFundamentalsData } from '../usfundamentals/usfundamentals';
import { Component } from './Component';

export class FundamentalsComponent extends Component {
  postMount () {
    getCompaniesData().then(data => { 
      const fundamentalsForm = document.getElementById('fundamentalsForm');
      const spinner = document.querySelector('.lds-spinner');
      data.data.forEach(companyOption => {
        const option = document.createElement('option');
        option.textContent = companyOption.name_latest;
        option.value = companyOption.company_id;
        fundamentalsSelect.appendChild(option);
      });
      spinner.classList.add('hidden');
      fundamentalsForm.classList.remove('hidden');
    });
  }

  template (data) {
    return html`
      <div id="fundamentalsContainer" class="fundamentalsContainer">
        <img class="fundamentals-logo-img" src="newspaper-solid.svg" alt="fundamentals-logo">
          <span>Company Fundamentals</span>
        </img>
      </div>
      <div id="fundamentalsFormContainer" class="fundamentalsFormContainer">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <form id="fundamentalsForm" class="hidden">
          <select id="fundamentalsSelect" name="fundamentalsSelect"
          class="fundamentalsSelect form-control">
            <option value="">-- Select a Company --</option>
          </select>
          <table class="fundamentalsTable">
            <thead>
              <tr class="text-left">
                <th>Indicator</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Current Assets</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="text-left">Current Liabilities</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="text-left">Total Assets</td>
                <td>-</td>
              </tr>
              <tr>
                <td class="text-left">Total Liabilities</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    `;
  }

  events() {
    return [
      {type: "click", selector: "#fundamentalsContainer", handler: this.toggleSlideIn },
      {type: "change", selector: "#fundamentalsSelect", handler: this.getShowIndicators }
    ]
  }

  getShowIndicators (e) {
    const fundamentalsSelectEl = e.currentTarget;
    const cik = fundamentalsSelectEl.value;
    getFundamentalsData(cik).then(data => {
      // TODO: parse and tabulize the csv response
      console.log(data);
    });
  }

  toggleSlideIn (e) {
    const fundamentals = document.querySelector('#fundamentalsPanel');
    fundamentals.classList.toggle('in');
  }

}


