// ==========================================
// 1. Reusable HTML Loader Function
// ==========================================
function loadHTML(filePath, containerId) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = data;
            } else {
                console.error(`Container with ID "${containerId}" not found.`);
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// ==========================================
// 2. Tab Navigation Function
// ==========================================
function openTab(evt, tabName) {
    // 1. Hide all tab contents
    var contents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }

    // 2. Remove "active" class from all tab buttons
    var buttons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    // 3. Reset the dropdown and display area back to default state
    const dropdown = document.getElementById('file-dropdown');
    const contentDisplay = document.getElementById('file-content');
    if (dropdown && contentDisplay) {
        dropdown.value = ""; // Reset dropdown selection to "Select a file..."
        contentDisplay.innerHTML = '<p>Select an option from the menu above to view content.</p>'; // Reset display container
    }

    // 4. Show current tab and set active button
    var selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add("active");
    }

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}
// ==========================================
// 3. Hide/Show Paragraph Function
// ==========================================
function showParagraph() {
    var allParas = document.getElementsByClassName('content');
    for (var i = 0; i < allParas.length; i++) {
        allParas[i].classList.remove('active');
    }
    var selectedId = document.getElementById('options') ? document.getElementById('options').value : null;
    if (selectedId) {
        var selectedElement = document.getElementById(selectedId);
        if (selectedElement) {
            selectedElement.classList.add('active');
        }
    }
}

// ==========================================
// 4. Dropdown Listener & Reset
// ==========================================
window.addEventListener('pageshow', function() {
    var dropdown = document.getElementById('file-dropdown');
    if (dropdown) {
        dropdown.selectedIndex = 0;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('file-dropdown');
    const contentDisplay = document.getElementById('file-content');

    if (dropdown && contentDisplay) {
        dropdown.addEventListener('change', function() {
            const pathOrUrl = this.value;

            if (!pathOrUrl) {
                contentDisplay.innerHTML = '<p>Content will appear here when selected...</p>';
                return;
            }

            // If it's a Google Slides link (or HTTP URL), render an iframe
            if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
                contentDisplay.innerHTML = `
                    <iframe 
                        src="${pathOrUrl}" 
                        frameborder="0" 
                        width="100%" 
                        height="500" 
                        allowfullscreen="true">
                    </iframe>`;
            } 
            // If it's a PDF or local file path, open or embed the PDF
            else if (pathOrUrl.endsWith('.pdf')) {
                contentDisplay.innerHTML = `
                    <iframe 
                        src="${pathOrUrl}" 
                        width="100%" 
                        height="600px">
                    </iframe>`;
            } 
            // For HTML snippets or other local content
            else {
                fetch(pathOrUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('File not found.');
                        return response.text();
                    })
                    .then(text => {
                        contentDisplay.innerHTML = text;
                    })
                    .catch(error => {
                        contentDisplay.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
                    });
            }
        });
    }
});
