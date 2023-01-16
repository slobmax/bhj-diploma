/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {  
  const xhr = new XMLHttpRequest();   
  const formData = new FormData();
  xhr.responseType = 'json';  

  if(options.method !== 'GET') {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
  } else if (options.method === 'GET' && options.data) {
    options.url += ('?' + Object.entries(options.data).map(([key, value]) => `${key}=${value}`).join('&'));
  };

  try {
    xhr.open(options.method, options.url);
    options.method === 'GET' ?
    xhr.send() :
    xhr.send(formData);    
  } catch(error) {
    options.callback(error);
  };  

  xhr.onload = () => {
    const response = xhr.response;
    const error = xhr.statusText;    
    options.callback(error, response);
  };
};
