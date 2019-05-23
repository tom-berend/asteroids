
export const assert = (expression: boolean, description?: string): void => {
    if (!expression) {
        // outdiv and output might be null
        const assertdiv = document.getElementById("assertdiv");
        const output = document.getElementById('output');

        if (assertdiv && output) {  // either HTMLElement or null
            assertdiv.style.display = "block";
            assertdiv.style.backgroundColor = "yellow";
            var li = document.createElement('li');
            li.innerHTML = "<span style='color:red;font-weight:bold;'>FAIL</span> " +
                description;

            output.appendChild(li);
        }
        // we also print to the console in error colours so we can get the line number
        // hide the display warnings in production by removing the <div>,
        // but don't turn off console errors
        console.log('%c' + description, 'background: yellow; color: red')
    }
}

