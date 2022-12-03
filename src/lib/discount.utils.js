import Dinero from 'dinero.js';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  if (
    item.conditional?.percentage &&
    item.quantity > item.conditional.minimum
  ) {
    return amount.percentage(item.conditional.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0;

  if (item.conditional?.quantity && item.quantity > item.conditional.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }

  return Money({ amount: 0 });
};

export const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(currentCondition => {
      if (currentCondition.percentage) {
        return calculatePercentageDiscount(amount, {
          conditional: currentCondition,
          quantity,
        }).getAmount();
      } else if (currentCondition.quantity) {
        return calculateQuantityDiscount(amount, {
          conditional: currentCondition,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Money({ amount: higherDiscount });
};
