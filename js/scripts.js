function showParagraph() {
    var allParas = document.getElementsByClassName('content');
    for (var i = 0; i < allParas.length; i++) {
        allParas[i].classList.remove('active');
    }
    var selectedId = document.getElementById('options').value;
    if (selectedId) {
        document.getElementById(selectedId).classList.add('active');
    }
}

const dropdown = document.getElementById('file-dropdown');
const contentDisplay = document.getElementById('file-content');

// Listen for when the user selects a different item in the dropdown
dropdown.addEventListener('change', function() {
    const filePath = this.value;

    // If the user selects the default empty option, clear the display
    if (!filePath) {
        contentDisplay.textContent = 'Content will appear here...';
        return;
    }

    // Show a loading message while the file is being fetched
    contentDisplay.textContent = 'Loading...';

    // Fetch the file content
    fetch(filePath)
        .then(response => {
            // Check if the file was successfully found
            if (!response.ok) {
                throw new Error('Could not load the file. Check if it exists.');
            }
            return response.text();
        })
        .then(text => {
            // Display the text inside the div
            contentDisplay.textContent = text;
        })
        .catch(error => {
            // Display any errors (e.g., file not found)
            contentDisplay.textContent = 'Error: ' + error.message;
            contentDisplay.style.color = 'red';
        });
});

// Function to handle the tab switching logic
function openTab(evt, tabName) {
    
    // 1. Get all elements with the class 'tab-content'
    var contents = document.getElementsByClassName("tab-content");
    
    // 2. Hide all content elements by removing 'active' class
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 3. Get all buttons with the class 'tab-button'
    var buttons = document.getElementsByClassName("tab-button");
    
    // 4. Remove 'active' class from all buttons
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // 5. SHOW THE SELECTED CONTENT:
    // Find the specific content element using its ID (e.g., 'news')
    document.getElementById(tabName).classList.add("active");

    // 6. MARK THE SELECTED BUTTON AS ACTIVE:
    // Add 'active' class to the clicked button
    evt.currentTarget.classList.add("active");
}

// OPTIONAL: Ensure that the correct tab is active on initial load (especially if the HTML structure changes)
// The HTML structure already handles this by adding the 'active' class to the first button and content.
