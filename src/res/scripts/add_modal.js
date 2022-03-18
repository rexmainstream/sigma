//Creted by Alex
//Adds the modal to the DOM
let current_position

export function create_modal(modal_content_width, dark_background, content, include_close_button) {
        const modal = document.createElement('div');
		const content_wrapper = document.createElement('div');
		const close_button = document.createElement('button');
		const body = document.querySelector('body');
		current_position = window.scrollY;
		if(include_close_button === true) {
			modal.append(content_wrapper, close_button);
		} else {
			modal.append(content_wrapper);
		}

		content_wrapper.append(content);

        modal.classList.add('modal', 'open_modal');
		close_button.className = 'exit_button';
		content_wrapper.classList.add('modal_content_wrapper', 'show_modal_content')       
        body.append(modal);
		
		//Removes scrolling ability
		body.classList.add('prevent_scroll');
		body.style.top = `-${current_position}px`
		modal.style.top = `${current_position}px`;

		close_button.setAttribute('title', 'Back');

		//Makes background darker
		if (dark_background === true) {
			//console.log('darker background');
			modal.style.background = `rgba(0,0,0,0.15)`
		}

		//Makes content wrapper as large as specified
		content_wrapper.style.inlineSize = modal_content_width;

		//If user clicks close, closes the modal
		close_button.addEventListener('click', exit_modal);

		/*
		//If user clicks the modal (not including content) closes the modal
		modal.addEventListener('click', () => {
			//modal.classList.remove('open_modal');
			modal.classList.add('fade_out_modal');
			content_wrapper.classList.remove('show_modal_content');
			content_wrapper.classList.add('close_modal');
			//Removes modal if animation ends
			modal.onanimationend = () => {
				body.removeChild(modal);
				//Enables scrolling
				body.style.top = '0';
				body.classList.remove('prevent_scroll');
				if (window.scrollY !== 0) {
					document.querySelector('header').style.opacity = `0`;
				}
				window.scrollBy(0,current_position);
			}
		})

		//Stops the bubbling process
		content_wrapper.addEventListener('click', (e)=>{
			e.stopPropagation();
		})
		*/
}

//modal is exited
export function exit_modal(e) {
	const modal = document.querySelector('.modal');
	const content_wrapper = document.querySelector('.modal_content_wrapper');
	const body = document.querySelector('body');
	//modal.classList.remove('open_modal');
	modal.classList.add('fade_out_modal');
	content_wrapper.classList.remove('show_modal_content');
	content_wrapper.classList.add('close_modal');
	//Removes modal if animation ends	
	modal.onanimationend = () => {
		body.removeChild(modal);
		//Enables scrolling
		body.style.top = '0';
		body.classList.remove('prevent_scroll');
		document.querySelector('header').style.opacity = `0`;
		window.scrollBy(0,current_position);
		
		//remove event listeners for performance
		e.removeEventListener('click', exit_modal);

	}		
}