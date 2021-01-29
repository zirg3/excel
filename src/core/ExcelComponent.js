import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }
  // Настраиваем компонент до init
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  // Уведомляем слуш. про событие
  $emit(e, ...args) {
    this.emitter.emit(e, ...args)
  }
  // Подписываемся на событие e
  $on(e, fn) {
    const unsub = this.emitter.subscribe(e, fn)
    this.unsubscribers.push(unsub)
  }

  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаляем DOM и чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
