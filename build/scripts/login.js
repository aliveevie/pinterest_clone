class Login extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        this.innerHTML = `
        <div class="login-box">
        <img class="logo" src="./icons/pin.png" alt="Pinterest Logo">
        <input class="form-input" type="email" placeholder="Email">
        <input class="form-input" type="password" placeholder="Password">
        <button class="login-btn">Login</button>
        <div class="social-login">
            <a href="#" class="social-btn">Login with Facebook</a>
            <a href="#" class="social-btn">Login with GitHub</a>
            <a href="#" class="social-btn">Login with Google</a>
        </div>
    </div>
        `
    }
}
console.log('This is showing please!')

customElements.define('login-element', Login);