//Creted by Alex
//Adds the modal to the DOM
export function create_modal(modal_content_width, dark_background, content) {
        const modal = document.createElement('div');
		const content_wrapper = document.createElement('div');
		const close_button = document.createElement('button');
		const body = document.querySelector('body');
		const current_position = window.scrollY;

        modal.append(content_wrapper);
		content_wrapper.append(close_button);
		content_wrapper.append(content);

        modal.classList.add('modal', 'open_modal');
		close_button.className = 'exit_button';
		close_button.innerHTML = 'Back';
		content_wrapper.classList.add('modal_content_wrapper', 'center_vertical', 'show_modal_content')       
        body.append(modal);
		
		//Removes scrolling ability
		body.classList.add('prevent_scroll');
		body.style.top = `-${current_position}px`
		modal.style.top = `${current_position}px`;

		//Makes background darker
		if (dark_background === true) {
			//console.log('darker background');
			modal.style.background = `rgba(0,0,0,0.15)`
		}

		//Makes content wrapper as large as specified
		content_wrapper.style.inlineSize = modal_content_width;

		//If user clicks close, closes the modal
		close_button.addEventListener('click', () => {
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

			}		
		});

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
}
