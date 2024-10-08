// Fetch data from the JSON file
async function fetchMembers() {
    const response = await fetch('./data/members.json');
    const members = await response.json();
    displayMembers(members, 'grid'); // Default view is 'grid'
    
    // Store members data globally for reuse
    window.membersData = members;
}

// Function to display members in a grid or list view
function displayMembers(members, view) {
    const container = document.getElementById('members-container');
    container.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member-card');

        memberDiv.innerHTML = `
            <img src="./images/${member.image}" alt="${member.name} Logo" class="member-logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
            <p>${member.description}</p>
        `;

        container.appendChild(memberDiv);
    });
}

// Function to translate membership level to text
function getMembershipLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Function to toggle view
function toggleView(view) {
    // Remove 'active-view' class from the currently active button
    const currentView = document.querySelector('.active-view');
    if (currentView) currentView.classList.remove('active-view');

    // Add 'active-view' class to the clicked button
    const newViewButton = document.getElementById(view + '-view');
    if (newViewButton) newViewButton.classList.add('active-view');

    // Change the layout of the members container based on the selected view
    const container = document.getElementById('members-container');
    container.className = view; // Set the class to 'grid' or 'list'
}

// Initialize fetch
fetchMembers();

// Event listeners for toggling between grid and list view
document.getElementById('grid-view').addEventListener('click', () => {
    toggleView('grid');
    displayMembers(window.membersData, 'grid');
});
document.getElementById('list-view').addEventListener('click', () => {
    toggleView('list');
    displayMembers(window.membersData, 'list');
});
