import { LitElement, html, css } from "lit";
import page from "page";
import { Base } from "../Base";
import { createUser } from "../firebase";

export class AppLogin extends Base {
  async handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector("input[type=email]").value;
    const pwd = e.target.querySelector("input[type=password]").value;

    const user = await createUser(email, pwd);
    if (user) {
      page("/");
    }
  }
  render() {
    return html`
      <form @submit="${this.handleLogin}">
        <input type="email" />
        <input type="password" />
        <button>Register</button>
      </form>
    `;
  }
}
customElements.define("app-login", AppLogin);
