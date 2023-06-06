let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors();
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showError(input, check)
            }
        }

        if(send) {
            form.submit();
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        
                    break;
                    /*case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break; */
                }
            }
        }

        return true;
    },
    showError:(input, error) => {

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors:()=>{
        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        };
    }
};

let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit)