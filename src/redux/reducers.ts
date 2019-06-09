import defaultState from './state';

export default function todos(state = defaultState, action:any) {
  switch (action.type) {
    case 'TOKEN_FETCH_SUCCEEDED':
      {
        if (action.info.ok) {
          let data = action.info.data;
          return Object.assign({}, state, {
            isLogin: true,
            token: data.token,
            id: data.user.id,
            avatar: data.user.avatar,
            info: data.user
          });
        } else {
          return state
        }
      }
    case 'COMMENT_STATUS_CHANGE':{
      return Object.assign({},state,{comment:action.info})
    }

    default:
      return state
  }
}