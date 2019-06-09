import store from './redux/store';

const contextPath = 'http://localhost:3000/api/v1';


const addParams = (url: string, params: {} | undefined) => {
  if (!params)
    return url;
  let paramsArray = [] as any;
  Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
  url += '?' + paramsArray.join('&');
  return url
}


export async function fetchToken(params: { username: any, password: any }) {
  const res = await fetch(`${contextPath}/auth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ username: 'aaaa', password: '123456' })
    // body: JSON.stringify(params)
  })
    .then((msg) => {
      if (msg.status * 1 === 200) {
        return { ok: true, data: JSON.parse(msg._bodyInit) }
      } else {
        return { ok: false, data: msg.status }
      }
    }).catch(() => {
      return { ok: false, data: 'request failed' }
    });
  return res;
}

export function fetchChannels() {
  return fetch(`${contextPath}/channels`, {
    method: 'GET',
    headers: {
      'X-BLACKCAT-TOKEN': store.getState().token,
      'content-type': 'application/json'
    }
  })
}

export function fetchEvents(params: any) {
  let url = addParams(`${contextPath}/events`, params);
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-BLACKCAT-TOKEN': store.getState().token,
      'content-type': 'application/json'
    }
  })
}

export function fetchDetail(id: number | string) {
  let url = `${contextPath}/events/${id}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-BLACKCAT-TOKEN': store.getState().token,
      'content-type': 'application/json'
    }
  })
}

export function eventGoing(id: number | string, type: string) {
  let url: string = `${contextPath}/events/${id}/participants`,
    config: any = {
      method: type || 'GET',
      headers: {
        'X-BLACKCAT-TOKEN': store.getState().token,
        'content-type': 'application/json'
      }
    }
  if (config.method === 'POST' || config.method === 'DELETE') {
    config.body = JSON.stringify({})
  }
  return fetch(url, config)
}

export function eventLike(id: number | string, type: string) {
  let url = `${contextPath}/events/${id}/likes`,
    config: any = {
      method: type || 'GET',
      headers: {
        'X-BLACKCAT-TOKEN': store.getState().token,
        'content-type': 'application/json'
      }
    }
  if (config.method === 'POST' || config.method === 'DELETE') {
    config.body = JSON.stringify({})
  }
  return fetch(url, config)
}

export function userEvents(type: string) {
  let url = `${contextPath}/user/events?type=${type}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-BLACKCAT-TOKEN': store.getState().token,
      'content-type': 'application/json'
    }
  })
}

export function userDetail() {
  return fetch(`${contextPath}/user`, {
    method: 'GET',
    headers: {
      'X-BLACKCAT-TOKEN': store.getState().token,
      'content-type': 'application/json'
    }
  })
}

export function comments(eventId:string|number, type:string, msg:string|undefined){
  let url = `${contextPath}/events/${eventId}/comments`,
    config: any = {
      method: type || 'GET',
      headers: {
        'X-BLACKCAT-TOKEN': store.getState().token,
        'content-type': 'application/json'
      }
    }
  if (config.method === 'POST') {
    config.body = JSON.stringify({comment:msg})
  }
  return fetch(url, config)
}
