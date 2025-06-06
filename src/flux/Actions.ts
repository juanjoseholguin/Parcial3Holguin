import { AppDispatcher } from './Dispatcher';
import { getPostsDb, addColorPostDb, deleteColorPostDb, getUsersDb, registerUserDb } from '../services/firebase';
import { Post } from './Store';

export const auth = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  LOGOUT: 'LOGOUT',
};

export enum Screen {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
}

export const screenActionType = {
  CHANGE_SCREEN: 'CHANGE_SCREEN',
};

export const posts = {
  GET_COLOR_POSTS: 'GET_COLOR_POST',
  AD_COLOR_POST: 'AD_COLOR_POST',
  DELETE_POST: 'DELETE_COLOR_POST',
}



export const authActions = {
  login: async (username: string) => {
    const userData = await getUsersDb();
    userData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        AppDispatcher.dispatch({
          type: auth.LOGIN,
          payload: user
        });
        console.log("User logueado", user);
      } else {
        console.log("no encontre el usuaio :c", username);
      }
    });
  },
  register: async (username: string, letter: string) => {
    const usersData = await getUsersDb();
    let userExists = false;
    usersData.docs.forEach((doc: any) => {
      const user = doc.data();
      if (user.username === username) {
        userExists = true;
        console.log("este user ya existeee", username);
      }
    });

    if(!userExists) {
      const userId = await registerUserDb(username, letter);
      AppDispatcher.dispatch({
        type: auth.REGISTER,
        payload: { username, letter }
      });
      console.log("ya lo registre el usuari", { username, letter, userId });
    }
    else {
      console.log("paila, este usuario ya existe", username);
    }
  },
  logout: async () => {
    AppDispatcher.dispatch({
      type: auth.LOGOUT,
      payload: null
    });
    console.log("Usuario deslogueado");
  }
}

export const postsActions = {
  getPosts: async () => {
    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id; 
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.GET_COLOR_POSTS,
      payload: postList
    });
  },
  addPost: async (post: any) => {
    await addColorPostDb(post);

    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id; 
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.AD_COLOR_POST,
      payload: postList
    });
  },
  deletePost: async (postId: string) => {
    await deleteColorPostDb(postId);
    
    const postData = await getPostsDb();
    const postList: Post[] = [];
    postData.docs.forEach((doc: any) => {
      const post = doc.data();
      post.postId = doc.id;
      postList.push(post);
    });

    AppDispatcher.dispatch({
      type: posts.AD_COLOR_POST,
      payload: postList
    });
  }
}


export const screenActions = {
  changeScreen: (newScreen: Screen) => {
    AppDispatcher.dispatch({
      type: screenActionType.CHANGE_SCREEN,
      payload: newScreen
    });
  }
}
