function changeButton(clickedIcon) {
    // Get all the play icons
    const allIcons = document.querySelectorAll('.play-icon');


    // Reset all icons to play state
    allIcons.forEach(icon => {
        icon.classList.remove('fa-circle-pause');
        icon.classList.add('fa-circle-play');
        icon.classList.remove('active-song')
    });

    // Toggle the clicked icon
    if (clickedIcon.classList.contains('fa-circle-play')) {
        clickedIcon.classList.remove('fa-circle-play');
        clickedIcon.classList.add('fa-circle-pause');
        clickedIcon.classList.add('active-song');


    } else {
        clickedIcon.classList.remove('fa-circle-pause');
        clickedIcon.classList.add('fa-circle-play');
        clickedIcon.classList.remove('active-song');
    }
}

function changeColor() {
    if (clickedIcon.classList.contains('fa-circle-play')) {
        document.getElementById('daSongs').style.color = 'red';
    }
    else {
        document.getElementById('daSongs').style.color = 'blue';
    }
}
