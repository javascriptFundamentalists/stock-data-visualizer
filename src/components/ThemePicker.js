import { html } from "lit-html";
import { Component } from "./Component";


export class ThemeComponent extends Component {
  template(data) {
    return html`
      <span>Theme Picker:</span>
      <input type="radio" name="themeColor" value="primary" checked>Grey</input>
      <input type="radio" name="themeColor" value="blue">Blue</input>
      <input type="radio" name="themeColor" value="red">Red</input>
      <input type="radio" name="themeColor" value="pink">Pink</input>
    `
  }

  events() {
    return [
      {type: "change", selector: "[name='themeColor']", handler: this.reSkinApp},
    ]
  }

  /**
   * Switch color themes
   */
  reSkinApp(e) {
    const themedElements = [...document.querySelectorAll("[data-theme^=theme-]")];
    const themeRadios = [...document.querySelectorAll("[name=themeColor]")];
    const newTheme = "theme-" + themeRadios.find(themeEl => themeEl.checked).value
    themedElements.forEach(el => {
      el.setAttribute('data-theme', newTheme);
    });
  }
}
