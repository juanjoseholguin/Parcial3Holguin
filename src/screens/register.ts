import { authActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Regster extends HTMLElement{
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if(!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <h1>aqui te registrasss</h1>
            <div class="botones">
                <button id="logueate">Login</button>
                <button id="este es el dashboard">Dashboard</button>
            </div>
            <form id="register-form">
                <input type="text" id="username" placeholder="nombre de usuario" required />
                <select type="select" id="user-type" placeholder="User Type" required />
                    <option value="hombre">hombre</option>
                    <option value="mujer">mujer</option>
                </select>
                <button type="submit">Register</button>
            </form>
        `

        const loginButton = this.shadowRoot.querySelector('#login')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.LOGIN);
        });
        const dashboardButton = this.shadowRoot.querySelector('#dashboard')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.DASHBOARD);
        });

        const registerForm = this.shadowRoot.querySelector('#register-form') as HTMLFormElement;
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLInputElement;
            const letterSelect = this.shadowRoot?.querySelector('#user-type') as HTMLSelectElement;

            if (usernameInput && letterSelect) {
                const username = usernameInput.value;
                const letter = letterSelect.value;

                authActions.register(username, letter);
                
                screenActions.changeScreen(Screen.LOGIN);
            }
        });
    }
};

export default Regster;