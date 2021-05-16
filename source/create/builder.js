class Request { 
  constructor() { 
    this.url = ''; 
    this.method = ''; 
    this.data = null; 
  } 
} 

class RequestBuilder { 
  constructor() { 
    this.request = new Request(); 
  } 
  forUrl(url) { 
    this.request.url = url; 
    return this; 
  } 
  
  useMethod(method) { 
    this.request.method = method; 
    return this; 
  } 
  
  setData(data) { 
    this.request.data = data; 
    return this; 
  } 
  
  build() { 
    return this.request; 
  } 
} 

let getRequest = new RequestBuilder() 
  .forUrl('https://blog.naver.com/pjt3591oo') 
  .useMethod('GET') 
  .build(); 
  
let postRequest = new RequestBuilder() 
    .forUrl('https://blog.naver.com/pjt3591oo') 
    .useMethod('POST') 
    .setData({ id: 'hg', password: 1234 }) 
    .build();