// Get input from infor fields
const profile_inputs = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    headline: document.getElementById('headline-input'),
    description: document.getElementById('description-input'),
    website: document.getElementById('website-input'),
    x: document.getElementById('x-input'),
    linkedIn: document.getElementById('linkedin-input'),
    youtube: document.getElementById('youtube-input'),
    facebook: document.getElementById('facebook-input')
};

// Auto save function
function saveProfile() {
    const profile_data = {
        firstName: profile_inputs.firstName.value,
        lastName: profile_inputs.lastName.value,
        headline: profile_inputs.headline.value,
        description: profile_inputs.description.value,
        website: profile_inputs.website.value,
        x: profile_inputs.x.value,
        linkedIn: profile_inputs.linkedIn.value,
        youtube: profile_inputs.youtube.value,
        facebook: profile_inputs.facebook.value
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profile_data));
    console.log("Saved profile data to LocalStorage."); 
}

// Load profile data on input fields
function loadProfileData() {
    const savedData = localStorage.getItem('userProfile');
    
    if (savedData) {
        const profile = JSON.parse(savedData);
        // Loop through our input object and apply saved values
        Object.keys(profile_inputs).forEach(key => {
            if (profile_inputs[key] && profile[key]) {
                profile_inputs[key].value = profile[key];
            }
        });
        console.log("Loaded data successfully.");
    }
}

loadProfileData();

// Listen for changes in any of the infor fields
Object.values(profile_inputs).forEach(inputElement => {
    inputElement.addEventListener('input', saveProfile);
});