import MainMenu from "./gamecore/main-menu"

document.addEventListener("DOMContentLoaded", () => {
    console.log('Document was loaded');
    let mainMenu = new MainMenu();
    mainMenu.build('renderTarget'); 
});