// Fetch data from the JSON file
async function fetchMembers() {
    const response = await fetch('./data/members.json');
    const members = await response.json();

    displaySpotlight(members); // Default view is 'grid'
    
    // Store members data globally for reuse
    window.membersData = members;
}


const spotlight = document.getElementById("members-spotlight")

function filterMember(members){
    const membersSpotlight = []

    members.forEach(member => {

        
        if (member.membership_level >= 2) {
            membersSpotlight.push(member)
        };

    });
    
    return membersSpotlight
};

function choseRandomMember(members){
    const membersSpotlight = filterMember(members)
    const totalMembersSelected = []

    const numberOfMembers = Math.floor(Math.random()*2)+2;

    while (totalMembersSelected.length < numberOfMembers){
        const memberSelected = membersSpotlight[Math.floor(Math.random()*membersSpotlight.length)];
        if (!totalMembersSelected.includes(memberSelected)){
            totalMembersSelected.push(memberSelected)
        }
    }

    return totalMembersSelected
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

function displaySpotlight(member){
    spotlight.innerHTML = "";

    const premiumMembers = filterMember(member)
    const membersSelected = choseRandomMember(premiumMembers)

    membersSelected.forEach(member => {
        const memberDiv = document.createElement("div");
        memberDiv.classList.add("member-card");

        memberDiv.innerHTML = `
            <img src="./images/${member.image}" alt="${member.name} Logo" class="member-logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
        `;

        spotlight.appendChild(memberDiv)
    });
};


// Initialize fetch
fetchMembers();