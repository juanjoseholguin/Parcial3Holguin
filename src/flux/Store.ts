import { AppDispatcher } from './Dispatcher';
import { Action } from './Dispatcher';
import {auth, posts, postsActions, Screen, screenActionType } from './Actions';

type Callback = () => void;


export type Post = {
  name: string,
  caption: string,
  postId: string,
   letter: string, 
  color: string,
}

export type User = {
   username: string,
   password: string, 
  
}

export type State = {
  currentUser: User | null,
  postList: Post[],
  screen: Screen,
}

export type idLetter = {
  
}

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
      currentUser: null,
      postList: [],
      screen: Screen.REGISTER,
  }

  private _listeners: Listener[] = [];

  constructor() {
      AppDispatcher.register(this._handleActions.bind(this));  
  }

  getState() {
      return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      

      case posts.GET_COLOR_POSTS:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case posts.AD_COLOR_POST:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case posts.DELETE_COLOR_POSTS:
        this._myState.postList = action.payload as Post[];
        this._emitChange();
        break;
      case screenActionType.CHANGE_SCREEN:
        this._myState.screen = action.payload as Screen;
        this._emitChange();
        break;
      case auth.LOGIN:
        this._myState.currentUser = action.payload as User;
        this._myState.screen = Screen.DASHBOARD; 
        this._emitChange();
        break;
      case auth.LOGOUT:
        this._myState.currentUser = null;
        this._myState.screen = Screen.LOGIN; 
        this._emitChange();
        break;
      default:
        break;
    }
    this.persist();
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
        listener(state);
    }
  }

  
  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState()); 
  }

  
  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      this._myState = JSON.parse(persistedState);
      this._emitChange(); 
    }
  }
}
export const store = new Store();
