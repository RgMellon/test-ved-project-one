import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

import { calculateDiscount } from './discount.utils';

export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.quantity * item.product.price });
      let discount = Money({ amount: 0 });

      if (item.conditional) {
        discount = calculateDiscount(amount, item.quantity, item.conditional);
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;
    const formatted = total.toFormat('$0,0.00');

    return {
      formatted,
      total,
      items,
    };
  }

  checkout() {
    const { items, total } = this.summary();

    this.items = [];

    return {
      total: total.getAmount(),
      items,
    };
  }
}
