/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarBtn = document.querySelector('.sidebar-toggle');  
    // const body = document.querySelector('.skin-blue');  
    sidebarBtn.onclick = () => {
      body.classList.toggle('sidebar-open')&&('sidebar-collapse');      
    }   
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {    
    const regElement = App.getModal('register').element;
    const loginElement = App.getModal('login').element;
    const sidebarButtons = Array.from(document.querySelectorAll('.menu-item'));
    const loginModal = new Modal(loginElement);
    const regModal = new Modal(regElement); 

    sidebarButtons.forEach(el => el.onclick = () => {      
      if(el.classList.contains('menu-item_login')) {
        loginModal.open(loginElement);       
      } else if(el.classList.contains('menu-item_register')) {
        regModal.open(regElement);       
      } else if(el.classList.contains('menu-item_logout')) {
        User.logout(() => {          
          App.setState('init');
        });               
      }
    });        
  }
}
