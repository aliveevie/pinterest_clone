class Login extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM for this custom element
       
    }

    connectedCallback() {
        // Move the HTML content into the shadow DOM
        this.innerHTML = ` 
              
                <div class="login-box">
                    <a href="#" id="hide" onclick="hideLogin()" >X</a>
                    <img class="logo" src="./icons/pin.png" alt="Pinterest Logo">
                    <form action="/login"  method="post" > 
                    <input class="form-input" type="email" placeholder="Email" name='email' >
                    <input class="form-input" type="password" placeholder="Password" name='password' >
                    <div id="error">Invalid Username or Password</div>
                    <button class="login-btn" id="login" >Login</button>
                    <div class="social-login">
                        <a href="#" class="social-btn">Login with Facebook</a>
                        <a href="/auth/github" class="social-btn">Login with GitHub</a>
                        <a href="/auth/google" class="social-btn">Login with Google</a>
                    </div>
                    </form>
                </div>
               
        `;

    // Now, you can access the elements within the shadow DOM

    }

}



customElements.define('login-element', Login);
