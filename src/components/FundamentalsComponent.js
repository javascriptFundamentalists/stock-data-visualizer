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
          <table id="fundamentalsTable" class="fundamentalsTable">
            <thead>
              <tr class="text-left">
                <th>Indicator</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody id="fundamentalsTableBody">
            </tbody>
          </table>
          <h4 id="nofundamentals" class="hidden">No data for this stock</h4>
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
      const body = document.getElementById('fundamentalsTableBody');
      const nodata = document.getElementById('nofundamentals');

      // remove old
      nodata.classList.add('hidden');
      while ( body.firstChild ) {
        body.removeChild(body.firstChild);
      }

      // add new
      // remove header row
      const [ ,...lines] = data.data.split('\n');
      console.log(lines);
      if ( !lines ) {
        nodata.classList.remove('hidden');
      }
      lines.forEach(line => {
        // handle empty line
        if ( line ) {
          const trow = document.createElement('tr');

          const [cik, rawLabel, rawValue] = line.split(',');
          // split e.g. 'IndicatorLabel' into 'Indicator Label'
          const label = rawLabel.replace(/([A-Z])/g, ' $1');
          const labelTd = document.createElement('td')
          labelTd.textContent = label;
          labelTd.classList.add('text-left');

          // string format currency hack
          const srallod = rawValue.split('').reverse().join('').replace(/([0-9]{3})/g, '$1,') + '$'
          const dollars = srallod.split('').reverse().join('').replace(/(\$)\,([0-9])/, '$1$2');
          const valueTd = document.createElement('td');
          valueTd.textContent = dollars;

          // add to the row
          [labelTd, valueTd].forEach(td => {
            trow.appendChild(td);
          });

          body.appendChild(trow);
        }
      });
    });
  }

  toggleSlideIn (e) {
    const fundamentals = document.querySelector('#fundamentalsPanel');
    fundamentals.classList.toggle('in');
  }

}


