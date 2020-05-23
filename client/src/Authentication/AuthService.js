import decode from 'jwt-decode';

export default class AuthService {
    constructor(domain){
        this.domain = domain || 'http://localhost:4100' //API Service
        this.fetch  = this.fetch.bind(this);
        this.submit  = this.submit.bind(this);
        this.getProfile = this.getProfile.bind(this); 
    }

    submit(email , password)  {
        return this.fetch(`${this.domain}`,{
           method: 'POST',
           body : JSON.stringify({
            email ,
            password
           }) 
        }).then(res=>{
            console.log('resToken',res);
            this.setToken(res.token) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }

    loggedIn(){
        const token = this.getToken() //Getting Token From LocalStorage
        if(token!== null && token!==undefined && token!== ''){
            return !!token
        }
    }

    setToken(idToken){
        //Save User token to Localstorage
        localStorage.setItem('token',idToken)
    }

    getToken(){
      // Retrieves the user token from localStorage
        return localStorage.getItem('token');
    }

    logout(){
        localStorage.removeItem('token');
    }

    getProfile(){
        return decode(this.getToken());
    }

    fetch(url, options){
        const headers = {
            'Accept' : 'application/json',
            'Content_type' : 'application/json'
        }
        if(this.loggedIn()){
            headers['Authorization']  = 'Bearer' + this.getToken()
        }

        return fetch (url,{
            headers,
            ...options
        })

        .then(this._checkStatus)
        .then(responsse => responsse.json())
    }

    _checkStatus(response){
          // raises an error in case response status is not a success
          if (response.status >= 200 && response.status <300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}
