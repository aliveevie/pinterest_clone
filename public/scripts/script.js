const x = document.getElementById('show');
        const y = document.getElementById('signup');
        const z = document.getElementById('error');

        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'none';

        function showLogin() {     
        if (x.style.display === 'none') {
            x.style.display = 'block'
            document.body.style.overflow = 'hidden';
        } 
    }
        
        function hideLogin(){
        if (x.style.display === 'block') {
            x.style.display = 'none';
          
        }
    }

    
    function showSign() {     
        if (y.style.display === 'none') {
            y.style.display = 'block'
        } 
    }
        
        function hideSign(){
        if (y.style.display === 'block') {
            y.style.display = 'none'
        }  
    }

   function fetchData(){
            x.addEventListener('submit', async (e) => {
               
            const response = await fetch('/home')
            if(response.status===200){
                z.style.display = 'block'
                x.style.display = 'block'
            }
        });
    }

    fetchData();
