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
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');    
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
    document.querySelector('.menu-item_register').onclick = () => {
      App.getModal('register').open();
    }

    document.querySelector('.menu-item_login').onclick = () => {
      App.getModal('login').open();
    }

    document.querySelector('.menu-item_logout').onclick = () => {
      const callback = (err, response) => {
        if (response.success) {
          App.setState('init');
        };
      }

      User.logout(callback);
    };
  }
}