class Sign extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM for this custom element
       
    }

    connectedCallback() {
        // Move the HTML content into the shadow DOM
        this.innerHTML = ` 
                <div class="login-box">
                    <a href="#" id="hide" onclick="hideSign()" >X</a>
                    <img class="logo" src="./icons/pin.png" alt="Pinterest Logo">
                    <form method="post" action="/sign">
                    <input class="form-input" type="email" placeholder="Email" name='email' >
                    <input class="form-input" type="password" placeholder="Create Password" name='password' >
                    <button class="login-btn" id="login" >Continue</button>
                    <p>OR </p>
                    <div class="social-login">
                        <a href="#" class="social-btn">Continue with Facebook</a>
                        <a href="/auth/github" class="social-btn">Continue with GitHub</a>
                        <a href="/auth/google" class="social-btn">Continue with Google</a>
                    </div>
                    </form>
                </div>
        `;
        // Now, you can access the elements within the shadow DOM
    }

  
}



customElements.define('signup-element', Sign);
