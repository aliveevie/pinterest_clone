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
                    <input class="form-input" type="email" placeholder="Email">
                    <input class="form-input" type="password" placeholder="Password">
                    <button class="login-btn" id="login" >Login</button>
                    <div class="social-login">
                        <a href="#" class="social-btn">Login with Facebook</a>
                        <a href="#" class="social-btn">Login with GitHub</a>
                        <a href="#" class="social-btn">Login with Google</a>
                    </div>
                </div>
               
          
        `;

        // Now, you can access the elements within the shadow DOM
    }

  
}



customElements.define('login-element', Login);
