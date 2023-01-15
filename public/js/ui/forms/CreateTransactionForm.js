/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super (element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountList = this.element.querySelector('.accounts-select');

    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        accountList.replaceChildren();

        if (response.data.length > 0) {
            response.data.forEach((element) => {
              addAccount(element);
            });
        } else {
          const emptyOption = document.createElement('option');
          emptyOption.textContent = 'Нет данных';
          accountList.appendChild(emptyOption);
        }
      });

      function addAccount(item) {
        const accountOption = document.createElement('option');
        accountOption.value = item.id;
        accountOption.textContent = item.name;
        accountList.appendChild(accountOption);
      }
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      }
    });
  }
}
