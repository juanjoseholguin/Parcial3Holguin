import { postsActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Dashboard extends HTMLElement{
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
            <style>
                .post-list {
                    display: flex;   
                }
                li { 
                    margin: 10px 0;
                    border: #642;
                    border-radius: 5px;    
                }
            </style>

           
            <div class="botones">
                <button id="login">Logueate</button>
                <button id="register">Registrate</button>
            </div>
            <form id="post-form">
                <input type="text" id="post-title" placeholder="escribe la letra" required />
                < id="letter" placeholder="letter" required></>
                 <color id="color" placeholder="color" required></color>
                <textarea id="post-caption" placeholder="escribe aqui el color" required></textarea>
                <button type="submit">crea el postt</button>
            </form>
            <ul class="post-list">
                ${state.postList.map(post => `
                    <li>
                        <h2>${post.letter}</h2>
                        <p>${post.caption}</p>
                        ${state.currentUser?.username === 'admin' ? `<button class="delete-post" data-id="${post.postId}">Delete</button>` : ''}
                    </li>
                `).join('')}
            </ul>
        `
        
        const loginButton = this.shadowRoot.querySelector('#login')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.LOGIN);
        });
        const registerButton = this.shadowRoot.querySelector('#register')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.REGISTER);
        });

        const postForm = this.shadowRoot.querySelector('#post-form') as HTMLFormElement;
        postForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const titleInput = this.shadowRoot?.querySelector('#post-title') as HTMLInputElement;
            const captionInput = this.shadowRoot?.querySelector('#post-caption') as HTMLTextAreaElement;

            if (titleInput && captionInput) {
                const newPost = {
                    title: titleInput.value,
                    caption: captionInput.value,
                };
                postsActions.addPost(newPost);
            }
        })

        const deleteButtons = this.shadowRoot.querySelectorAll('.delete-post');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const postId = (event.target as HTMLButtonElement).getAttribute('data-id');
                if (postId) {
                    postsActions.deletePost(postId);
                }
            });
        })
    }
};

export default Dashboard;