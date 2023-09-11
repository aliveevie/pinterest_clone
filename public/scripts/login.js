class Login extends HTMLElement {
    constructor() {
        super();
        // Create a shadow DOM for this custom element
       
    }

    connectedCallback() {
        // Move the HTML content into the shadow DOM
        this.innerHTML = ` 
            <div id="show">
                <div class="login-box">
                    <a href="#" id="hide">X</a>
                    <img class="logo" src="./icons/pin.png" alt="Pinterest Logo">
                    <input class="form-input" type="email" placeholder="Email">
                    <input class="form-input" type="password" placeholder="Password">
                    <button class="login-btn" id="login" onclick=showLogin() >Login</button>
                    <div class="social-login">
                        <a href="#" class="social-btn">Login with Facebook</a>
                        <a href="#" class="social-btn">Login with GitHub</a>
                        <a href="#" class="social-btn">Login with Google</a>
                    </div>
                </div>
            </div>
        `;

        // Now, you can access the elements within the shadow DOM
    }

  
}

function  showLogin(){
    var x = document.getElementById('show')
        if(x.style.display === "none"){
            x.style.display = "block"
        }else{
            x.style.display = "none"
        }
}



customElements.define('login-element', Login);
