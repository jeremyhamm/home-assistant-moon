import "https://unpkg.com/dayjs@1.8.21/dayjs.min.js";

class MoonPhasesCard {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  render() {
    const now = dayjs().format();
    console.log(now);
    return html`
      <div>
        
      </div>
    `;
  }

  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return this.config.entities.length + 1;
  }

  static get styles() {
    return css`
      :host {
        font-family: "Gloria Hallelujah", cursive;
      }
      wired-card {
        background-color: white;
        padding: 16px;
        display: block;
        font-size: 18px;
      }
      .state {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        align-items: center;
      }
      .not-found {
        background-color: yellow;
        font-family: sans-serif;
        font-size: 14px;
        padding: 8px;
      }
      wired-toggle {
        margin-left: 8px;
      }
    `;
  }
}
customElements.define("moon", MoonPhasesCard);